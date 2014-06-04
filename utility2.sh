#!/bin/bash
function shAesDecrypt () {
  ## this function decrypts base64-encode stdin to stdout using aes-256-cbc
  ## save stdin to $TEXT
  local TEXT=$(cat /dev/stdin)
  ## init $IV from first 44 base64-encoded bytes of $TEXT
  local IV=$(printf ${TEXT:0:44} | base64 --decode)
  ## decrypt remaining base64-encoded bytes of $TEXT to stdout using aes-256-cbc
  printf "${TEXT:44}" | base64 --decode | openssl enc -aes-256-cbc -d -K $AES_256_KEY -iv $IV
}

function shAesEncrypt () {
  ## this function encrypts stdin to base64-encode stdout,
  ## with a random iv prepended using aes-256-cbc
  ## init $IV from random 16 bytes
  local IV=$(openssl rand -hex 16)
  ## printf base64-encoded $IV to stdout
  printf $(printf "$IV " | base64)
  ## encrypt stdin and stream to stdout using aes-256-cbc with base64-encoding
  openssl enc -aes-256-cbc -K $AES_256_KEY -iv $IV | base64 | tr -d "\n"
}

function shCiBuildAppCopy () {
  ## this function copies the app to /tmp/app with only the bare repo files
  ## rm old /tmp/app
  rm -fr /tmp/app && mkdir -p /tmp/app || return $?
  ## tar / untar repo contents to /tmp/app, since we can't git clone a shallow repo
  git ls-tree -r HEAD --name-only | xargs tar -czf - | tar -C /tmp/app -xzvf -
}

function shCiBuildExit () {
  ## this function exits the ci build
  ## cleanup $GIT_SSH_KEY_FILE
  SCRIPT="$SCRIPT; rm -f $GIT_SSH_KEY_FILE"
  ## push build artifact to github
  for FILE in $CI_BUILD_DIR_COMMIT $CI_BUILD_DIR_LATEST
  do
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO db-github-dir-update\
      $GITHUB_REPO/gh-pages $FILE .build)"
  done
  shScriptEval "$SCRIPT" || exit $?
  exit $EXIT_CODE
}

function shCiBuildHerokuDeploy () {
  ## this function deploys the app to heroku
  ## export $GIT_SSH
  export GIT_SSH=$UTILITY2_DIR/.install/git-ssh.sh
  ## export and create $GIT_SSH_KEY_FILE
  export GIT_SSH_KEY_FILE=$(mktemp /tmp/.git-ssh-key-file-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX)\
    && echo $GIT_SSH_KEY | base64 --decode > $GIT_SSH_KEY_FILE\
    && chmod 600 $GIT_SSH_KEY_FILE\
    || return $?
  local HEROKU_URL=http://$(perl -ne 'print $1 if /git\@heroku\.com:(.*)\.git$/'\
    .install/.git-config).herokuapp.com
  SCRIPT="$SCRIPT && shCiBuildLog herokuDeploy 'deploy local app to heroku ...'"
  ## init clean repo in /tmp/app
  SCRIPT="$SCRIPT && shCiBuildAppCopy"
  SCRIPT="$SCRIPT && cd /tmp/app"
  SCRIPT="$SCRIPT && git init"
  ## copy .install/.git-config which contains required heroku url and user name / email
  SCRIPT="$SCRIPT && cp $CWD/.install/.git-config .git/config"
  ## rm .gitignore so we can git add everything
  SCRIPT="$SCRIPT && rm -f .gitignore"
  ## git add everything
  SCRIPT="$SCRIPT && git add ."
  ## git commit
  SCRIPT="$SCRIPT && git commit -am 'initial commit'"
  ## git push to heroku
  SCRIPT="$SCRIPT && git push -f heroku HEAD:master"
  ## check deployed webpage on heroku
  SCRIPT="$SCRIPT && shCiBuildLog herokuDeploy"
  SCRIPT="$SCRIPT 'check deployed webpage $HEROKU_URL ...'"
  SCRIPT="$SCRIPT && (curl -3Ls $HEROKU_URL > /dev/null"
  SCRIPT="$SCRIPT && echo ... check succeeded"
  SCRIPT="$SCRIPT || (echo ... check failed && shReturn 1))"
  shScriptEval "$SCRIPT" || shCiBuildExit
}

function shCiBuildInit () {
  ## this function inits the ci build
  if [ ! "$NODEJS_PACKAGE_JSON_NAME" ]
    then shCiBuildLog init "could not read package.json"
    exit 1
  fi
  ## decrypt and eval .aes-encrypted.sh
  shCiBuildLog aesDecrypt "shasum - $(printf $AES_256_KEY | shasum) \$AES_256_KEY"
  shCiBuildLog aesDecrypt "shasum - $(shasum .aes-encrypted.sh)"
  ## security - sensitive data - avoid $SCRIPT macro
  eval "$(shAesDecrypt < .aes-encrypted.sh)"
  ## init codeship.io env
  if [ "$CODESHIP" ]
    ## export $CI_BUILD_DIR
    then export CI_BUILD_DIR=/build.codeship.io
  ## init travis-ci.org env
  elif [ "$TRAVIS" ]
    ## export $CI_BUILD_DIR
    then export CI_BUILD_DIR=/build.travis-ci.org
    ## export TRAVIS_* vars as CI_* vars
    if [ ! "$CI_BRANCH" ]
      then export CI_BRANCH=$TRAVIS_BRANCH
    fi
    if [ ! "$CI_BUILD_NUMBER" ]
      then export CI_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER
    fi
    if [ ! "$CI_COMMIT_ID" ]
      then export CI_COMMIT_ID=$TRAVIS_COMMIT
    fi
  else
    export CI_BUILD_DIR=/build.local
  fi
  ## export CI_* vars
  if [ ! "$CI_BRANCH" ]
    then export CI_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  fi
  if [ ! "$CI_COMMIT_ID" ]
    then export CI_COMMIT_ID="$(git rev-parse --verify HEAD)"
  fi
  if [ ! "$CI_COMMIT_MESSAGE" ]
    then export CI_COMMIT_MESSAGE="$(git log -1 --pretty=%s)"
  fi
  if [ ! "$CI_COMMIT_INFO" ]
    then export CI_COMMIT_INFO="$CI_COMMIT_ID - $CI_COMMIT_MESSAGE"
  fi
  export CI_BUILD_DIR_COMMIT=$CI_BUILD_DIR/$CI_BUILD_NUMBER.$CI_BRANCH.$CI_COMMIT_ID
  export CI_BUILD_DIR_LATEST=$CI_BUILD_DIR/latest.$CI_BRANCH
  ## update coverage / test report badges with loading icon
  for FILE in $CI_BUILD_DIR_LATEST/coverage-report/coverage-report.badge.svg\
    $CI_BUILD_DIR_LATEST/test-report.badge.svg
  do
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO db-github-file-update $GITHUB_REPO/gh-pages $FILE\
      $UTILITY2_DIR/.install/public/utility2-loading.svg $FILE)"
  done
  shScriptEval "$SCRIPT" || shCiBuildExit
}

function shCiBuildLog () {
  ## this function logs output about ci build state
  export MODE_CI_BUILD=$1
  printf "\n[MODE_CI_BUILD=$MODE_CI_BUILD] - $2\n"
}

function shCiBuildNpmPublish () {
  ## this function npm publishes the app if the version changed
  ## security - sensitive data - avoid $SCRIPT macro
  printf "_auth = $NPM_AUTH\nemail = $NPM_EMAIL\n" > $HOME/.npmrc
  ## init clean repo in /tmp/app
  SCRIPT="$SCRIPT && shCiBuildAppCopy"
  SCRIPT="$SCRIPT && cd /tmp/app"
  SCRIPT="$SCRIPT && shCiBuildLog npmPublish 'npm publish $NODEJS_PACKAGE_JSON_NAME ...'"
  SCRIPT="$SCRIPT && npm install"
  SCRIPT="$SCRIPT && ./$NODEJS_PACKAGE_JSON_NAME.sh npm-publish"
  SCRIPT="$SCRIPT && shCiBuildLog npmPublish 'npm publish succeeded'"
  ## wait awhile for npm registry to sync
  SCRIPT="$SCRIPT && sleep 10"
  shScriptEval "$SCRIPT" || shCiBuildExit
}

function shCiBuildNpmTestLocal () {
  ## this function npm tests the local app
  SCRIPT="$SCRIPT && shCiBuildLog npmTestLocal 'npm test $CWD ...'"
  SCRIPT="$SCRIPT && npm test"
  SCRIPT="$SCRIPT && shCiBuildLog npmTestLocal 'npm test succeeded'"
  shScriptEval "$SCRIPT" || shCiBuildExit
}

function shCiBuildNpmTestPublished () {
  ## this function npm tests the latest published version of the app
  SCRIPT="$SCRIPT && shCiBuildLog npmTestPublished"
  SCRIPT="$SCRIPT 'npm install and test published package $NODEJS_PACKAGE_JSON_NAME ...'"
  ## install and test latest npm package in /tmp dir with no external npm dependencies */
  ## cleanup /tmp
  SCRIPT="$SCRIPT && cd /tmp && rm -fr node_modules $NODEJS_PACKAGE_JSON_NAME"
  ## npm install package
  SCRIPT="$SCRIPT && npm install $NODEJS_PACKAGE_JSON_NAME"
  ## cd into package
  SCRIPT="$SCRIPT && cd node_modules/$NODEJS_PACKAGE_JSON_NAME"
  ## list package content
  SCRIPT="$SCRIPT && shCiBuildLog npmTestPublished"
  SCRIPT="$SCRIPT 'list $NODEJS_PACKAGE_JSON_NAME npm package contents ...'"
  SCRIPT="$SCRIPT && find . -path ./node_modules -prune -o -type f -print"
  ## copy previous test-report.json into .build dir
  SCRIPT="$SCRIPT && mkdir -p .build"
  SCRIPT="$SCRIPT && cp $CWD/.build/test-report.json .build"
  ## npm test package and merge result into previous test-report.json
  SCRIPT="$SCRIPT && npm test --utility2-mode-test-report-merge"
  ## save $EXIT_CODE
  SCRIPT="$SCRIPT; EXIT_CODE=\$?"
  ## copy merged test-report.json into current directory
  SCRIPT="$SCRIPT; cp .build/test-report.json $CWD/.build"
  ## merge test report into $CWD
  SCRIPT="$SCRIPT && cd $CWD"
  SCRIPT="$SCRIPT && $UTILITY2_JS --mode-cli=testReportMerge"
  SCRIPT="$SCRIPT && shCiBuildLog 'npm test of latest published package succeeded'"
  ## return $EXIT_CODE
  SCRIPT="$SCRIPT && shReturn \$EXIT_CODE"
  shScriptEval "$SCRIPT" || shCiBuildExit
}

function shCiBuildSaucelabsTest () {
  ## this function runs headless saucelabs browser tests
  ## add random salt to CI_BUILD_NUMBER to prevent conflict
  ## when re-running saucelabs with same CI_BUILD_NUMBER
  export CI_BUILD_NUMBER_SAUCELABS="$CI_BUILD_NUMBER.$(openssl rand -hex 8)"
  ## run saucelabs tests
  SCRIPT="$SCRIPT && shCiBuildLog saucelabsTest 'run headless saucelabs browser tests ...'"
  SCRIPT="$SCRIPT && $UTILITY2_JS --mode-cli=headlessSaucelabsPlatformsList"
  SCRIPT="$SCRIPT < .install/saucelabs-test-platforms-list.json"
  SCRIPT="$SCRIPT && shCiBuildLog saucelabsTest 'saucelabs tests succeeded'"
  shScriptEval "$SCRIPT" || shCiBuildExit
}

function shNodejsInstall () {
  ## this function installs nodejs / npm if necesary
  if [ ! "$(which npm)" ]
    ## init $NODEJS_* vars
    then NODEJS_PROCESS_ARCH=$(uname -m | perl -ne "s/arm.*/arm/i; s/i.86.*/i386/i;\
      s/amd64/x64/i; s/x86_64/x64/i; print lc")
    NODEJS_PROCESS_PLATFORM=$(uname | perl -ne "s/.*bsd$/bsd/i; print lc")
    NODEJS_VERSION=node-v0.10.26-$NODEJS_PROCESS_PLATFORM-$NODEJS_PROCESS_ARCH
    if [ ! -f "/tmp/$NODEJS_VERSION/bin/npm" ]
      then echo installing nodejs and npm to /tmp/$NODEJS_VERSION/bin
      curl -3Ls http://nodejs.org/dist/v0.10.26/$NODEJS_VERSION.tar.gz\
        | tar -C /tmp/ -xzf -
    fi
    ## export $PATH with nodejs / npm path
    export PATH=/tmp/$NODEJS_VERSION/bin:$PATH
  fi
}

function shReturn () {
  ## this function returns the specified exit code
  return $1
}

function shScriptEval () {
  ## this function evals $SCRIPT
  ## echo $SCRIPT
  if [ "$MODE_ECHO" ] || [ "$SCRIPT" != ":" ]
    then echo $SCRIPT
  fi
  ## eval $SCRIPT
  if [ ! "$MODE_ECHO" ]
    ## eval $SCRIPT
    then eval "$SCRIPT"
    ## save non-zero $EXIT_CODE
    if [ "$?" != 0 ]
      then EXIT_CODE=1
    fi
    ## restore $CWD
    cd $CWD
    ## reset SCRIPT
    SCRIPT=":"
    ## cleanup $TMPFILE
    rm -f $TMPFILE
    ## return $EXIT_CODE
    return $EXIT_CODE;
  fi
}

function shSemverGreaterThan() {
  ## function echoes 1 if semver $1 is greater than semver $2 or 0 otherwise
  local REGEXP='([0-9]+)\.([0-9]+)\.([0-9]+)([0-9A-Za-z-]*)'
  MAJOR1=$(echo $1 | perl -ne "print \$1 if /$REGEXP/")
  MINOR1=$(echo $1 | perl -ne "print \$2 if /$REGEXP/")
  PATCH1=$(echo $1 | perl -ne "print \$3 if /$REGEXP/")
  SPECIAL1=$(echo $1 | perl -ne "print \$4 if /$REGEXP/")
  MAJOR2=$(echo $2 | perl -ne "print \$1 if /$REGEXP/")
  MINOR2=$(echo $2 | perl -ne "print \$2 if /$REGEXP/")
  PATCH2=$(echo $2 | perl -ne "print \$3 if /$REGEXP/")
  SPECIAL2=$(echo $2 | perl -ne "print \$4 if /$REGEXP/")
  ## return 1 if invalid semver $1 or semver $2
  if [ ! "$MAJOR1" ] || [ ! "$MAJOR2" ]
    then return 1
  ## return 1 if $MAJOR1 < $MAJOR2
  elif [ $MAJOR1 -lt $MAJOR2 ]
    then return 1
  ## return 0 if $MAJOR1 > $MAJOR2
  elif [ $MAJOR1 -gt $MAJOR2 ]
    then return 0
  ## return 1 if $MINOR1 < $MINOR2
  elif [ $MINOR1 -lt $MINOR2 ]
    then return 1
  ## return 0 if $MINOR1 > $MINOR2
  elif [ $MINOR1 -gt $MINOR2 ]
    then return 0
  ## return 1 if $PATCH1 < $PATCH2
  elif [ $PATCH1 -lt $PATCH2 ]
    then return 1
  ## return 0 if $PATCH1 > $PATCH2
  elif [ $PATCH1 -gt $PATCH2 ]
    then return 0
  ## return 1 if $SPECIAL1 < $SPECIAL2
  elif [ "$SPECIAL1" ] && [ ! "$SPECIAL2" ]
    then return 1
  elif [ "$SPECIAL1" \< "$SPECIAL2" ]
    then return 1
  ## return 0 if $SPECIAL1 > $SPECIAL2
  elif [ "$SPECIAL1" \> $SPECIAL2 ]
    then return 0
  ## return 1 otherwise
  else
    return 1
  fi
}

function shUtility2Init () {
  ## this function inits utility2
  ## save current dir to $CWD
  CWD=$(pwd)
  ## save executable dir to $EXEC_DIR
  EXEC_DIR=$( cd "$( dirname "$0" )" && pwd )
  ## init $EXIT_CODE
  EXIT_CODE=0
  if [ ! "$GITHUB_REPO" ]
    then export GITHUB_REPO="$(git config --get remote.origin.url\
      | perl -ne 'print $1 if /([\w-]+\/[^.]+)/')"
  fi
  ## init $SCRIPT
  SCRIPT=":"
  ## init TMPFILE
  TMPFILE=$(mktemp -u /tmp/.tmpfile-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX)
  ## init utility2 env
  UTILITY2_JS=$UTILITY2_DIR/utility2.js
  UTILITY2_SH=$UTILITY2_DIR/utility2.sh
  UTILITY2_SH_ECHO="$UTILITY2_SH mode-echo"
  UTILITY2_EXTERNAL_TAR_GZ=utility2-external.$(echo $NODEJS_PACKAGE_JSON_VERSION\
    | perl -ne 'print $1 if /(\d+\.\d+\.\d+)/').tar.gz
}

function shMain () {
  ## this function is the main program and parses argv

  ## install nodejs / npm if necessary
  shNodejsInstall
  ## init nodejs env
  if [ -f "./utility2.js" ]
    then eval $(node --eval\
      "global.state = { modeCli: 'exportEnv' }; require('./utility2.js');")
  else
    eval $(node --eval "global.state = { modeCli: 'exportEnv' }; require('utility2');")
  fi
  ## init utility2
  shUtility2Init

  ## parse argv
  ## http://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash
  while [ "$#" -gt "0" ]
  do
  case $1 in

  ## aes .aes-encrypted.sh to stdout
  aes-decrypt)
    SCRIPT="$SCRIPT && shAesDecrypt < .aes-encrypted.sh"
    ;;

  ## aes encrypt .install/.aes-decrypted.sh to .aes-encrypted.sh
  aes-encrypt)
    printf "## fetching public rsa key from https://api.travis-ci.org/repos/$GITHUB_REPO/key ...\n"
    curl -3Ls https://api.travis-ci.org/repos/$GITHUB_REPO/key\
    | perl -ne 's/[^-]*//; s/"[^"]*$//; s/\\n/\n/g; s/ RSA / /g; print'\
    > $TMPFILE
    printf "## encrypting \$AES_256_KEY with fetched public rsa key ...\n"
    AES_256_KEY_ENCRYPTED=$(printf "AES_256_KEY=$AES_256_KEY"\
      | openssl rsautl -encrypt -pubin -inkey $TMPFILE | base64 | tr -d "\n")
    if [ ! "$AES_256_KEY_ENCRYPTED" ]
      then printf "failed to encrypt \$AES_256_KEY for \$GITHU_REPO=$GITHUB_REPO\n";
      return 1
    fi
    printf "## updating .travis.yml with encrypted key ...\n"
    perl -i -pe "s|(^\s*- secure: ).*( ## AES_256_KEY$)|\$1$AES_256_KEY_ENCRYPTED\$2|" .travis.yml
    printf "## encrypting .install/.aes-decrypted.sh to .aes-encrypted.sh ...\n"
    shAesEncrypt < .install/.aes-decrypted.sh | fold > .aes-encrypted.sh
    ;;

  ## ci build utility2
  ci-build)
    ## init ci build
    shCiBuildInit
    ## npm test local app
    shCiBuildNpmTestLocal
    ## deploy app to heroku
    if [ "$GIT_SSH_KEY" ] && [ "$MODE_HEROKU_DEPLOY" != false ]
      then shCiBuildHerokuDeploy
    fi
    ## run saucelabs tests on heroku server
    if [ "$MODE_SAUCELABS_TEST" != false ] && [ "$SAUCE_ACCESS_KEY" ] && [ "$SAUCE_USERNAME" ]
      then shCiBuildSaucelabsTest
    fi
    ## npm publish app if version changed
    if [ "$MODE_NPM_PUBLISH" != false ]\
      && [ "$NPM_AUTH" ]\
      && [ "$NPM_EMAIL" ]\
      && [ "$NODEJS_PACKAGE_JSON_VERSION" ]\
      && semverGreaterThan "$NODEJS_PACKAGE_JSON_VERSION" "$(npm info $NODEJS_PACKAGE_JSON_NAME version 2>/dev/null)"
      then shCiBuildNpmPublish
    fi
    ## npm test latest published app
    shCiBuildNpmTestPublished
    ## exit ci build
    shCiBuildExit
    ;;

  ## merge head branch $3 into github base branch $2
  db-github-branch-merge)
    SCRIPT="$SCRIPT && $UTILITY2_JS"
    SCRIPT="$SCRIPT --db-github-file=$3"
    if [ "$4" ]
      then SCRIPT="$SCRIPT --db-github-message=\"$4\""
    fi
    SCRIPT="$SCRIPT --mode-cli=dbGithubBranchMerge"
    SCRIPT="$SCRIPT --mode-db-github=$2"
    ;;

  ## update github dir $3 with local dir $4
  db-github-dir-update)
    SCRIPT="$SCRIPT && $UTILITY2_JS"
    SCRIPT="$SCRIPT --db-github-file=$3"
    SCRIPT="$SCRIPT --db-github-local=$4"
    SCRIPT="$SCRIPT --mode-cli=dbGithubDirUpdate"
    SCRIPT="$SCRIPT --mode-db-github=$2"
    ;;

  ## delete github file $3
  db-github-file-delete)
    SCRIPT="$SCRIPT && $UTILITY2_JS"
    SCRIPT="$SCRIPT --db-github-file=$3"
    SCRIPT="$SCRIPT --mode-cli=dbGithubFileDelete"
    SCRIPT="$SCRIPT --mode-db-github=$2"
    ;;

  ## update github file $3 with local file $4
  db-github-file-update)
    SCRIPT="$SCRIPT && $UTILITY2_JS"
    SCRIPT="$SCRIPT --db-github-file=$3"
    SCRIPT="$SCRIPT --mode-cli=dbGithubFileUpdate"
    SCRIPT="$SCRIPT --mode-db-github=$2"
    SCRIPT="$SCRIPT < $4"
    ;;

  ## echo mode
  mode-echo)
    MODE_ECHO=1
    ;;

  ## called by npm run-script install
  npm-install)
    SCRIPT="$SCRIPT && mkdir -p .install/public"
    SCRIPT="$SCRIPT && $UTILITY2_JS --mode-cli=npmInstall ${@:2}"
    SCRIPT="$SCRIPT && chmod 755 .install/git-ssh.sh"
    ## install utility2-external
    if [ "$NODEJS_PACKAGE_JSON_NAME" = utility2 ]\
        && [ ! -f ".install/public/utility2-external.nodejs.rollup.js" ]
      then SCRIPT="$SCRIPT && curl -3Ls\
        https://kaizhu256.github.io/utility2/utility2-external"
      SCRIPT="$SCRIPT/$UTILITY2_EXTERNAL_TAR_GZ"
      SCRIPT="$SCRIPT | tar -xzvf -"
    fi
    ;;

  ## called by npm run-script publish
  npm-publish)
    SCRIPT="$SCRIPT && npm publish ${@:2}"
    ## extra utility2 code
    if [ "$NODEJS_PACKAGE_JSON_NAME" = utility2 ]
      then SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO utility2-external-build)"
      SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO utility2-external-build-publish)"
    fi
    ;;

  ## start interactive utility2
  npm-start | start)
    SCRIPT="$SCRIPT && $UTILITY2_JS"
    SCRIPT="$SCRIPT --mode-repl"
    SCRIPT="$SCRIPT --server-port=random"
    SCRIPT="$SCRIPT --tmpdir"
    SCRIPT="$SCRIPT ${@:2}"
    ;;

  ## called by npm run-script test
  npm-test)
    ## init $ARGS
    ARGS=""
    ARGS="$ARGS --mode-npm-test"
    ## enable interactive repl debugger during test
    ARGS="$ARGS --mode-repl"
    ARGS="$ARGS --mode-test"
    ## default to random server port
    ARGS="$ARGS --server-port=random"
    ARGS="$ARGS --tmpdir=tmp"
    ARGS="$ARGS ${@:2}"
    ## extra utility2 test args
    if [ "$NODEJS_PACKAGE_JSON_NAME" = utility2 ]
      ## test github db
      then ARGS="$ARGS --mode-db-github=kaizhu256/blob/unstable"
      ## offline mode
      ARGS="$ARGS --mode-offline"
    fi
    ## run npm test with code coverage
    SCRIPT="$SCRIPT && $UTILITY2_JS $ARGS --mode-coverage"
    ## save $EXIT_CODE
    SCRIPT="$SCRIPT; EXIT_CODE=\$?"
    ## re-run npm test without code coverage if tests failed
    ## so we can debug line numbers in stack trace
    SCRIPT="$SCRIPT; if [ \"\$EXIT_CODE\" != 0 ]"
      SCRIPT="$SCRIPT; then $UTILITY2_JS $ARGS --mode-test-report-merge"
    SCRIPT="$SCRIPT; fi"
    ## return $EXIT_CODE
    SCRIPT="$SCRIPT; shReturn \$EXIT_CODE"
    ;;

  ## debug saucelabs job id
  saucelabs-debug)
    ## security - sensitive data - avoid $SCRIPT macro
    curl -X POST https://saucelabs.com/rest/v1/$SAUCE_USERNAME/js-tests/status\
      --data "{\"js tests\": [\"$2\"]}"\
      -H 'Content-Type: application/json'\
      -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY
    echo
    ;;

  ## install saucelabs
  saucelabs-install)
    ## check if saucelabs has already been installed in /tmp dir
    if [ ! -f "$UTILITY2_DIR/.install/sc" ]
      then SAUCELABS_VERSION=$(echo $NODEJS_PROCESS_PLATFORM | perl -ne "s/darwin/osx/i; print")
      SCRIPT="$SCRIPT && echo installing saucelabs to $UTILITY2_DIR/.install/sc"
      SCRIPT="$SCRIPT && cd $UTILITY2_DIR"
      case $NODEJS_PROCESS_PLATFORM in
      linux)
        SCRIPT="$SCRIPT && curl -3Ls\
          https://d2nkw87yt5k0to.cloudfront.net/downloads/sc-latest-$SAUCELABS_VERSION.tar.gz"
        SCRIPT="$SCRIPT | tar -C .install -xzf -"
        ;;
      *)
        SCRIPT="$SCRIPT && curl -3Ls https://d2nkw87yt5k0to.cloudfront.net/downloads"
        SCRIPT="$SCRIPT/sc-latest-$SAUCELABS_VERSION.zip"
        SCRIPT="$SCRIPT > .install/sc.zip && unzip -q .install/sc.zip -d .install"
        ;;
      esac
      SCRIPT="$SCRIPT && cp .install/sc-*-$SAUCELABS_VERSION/bin/sc .install/sc"
    fi
    ;;

  ## restart saucelabs
  saucelabs-restart)
    ## stop saucelabs
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO saucelabs-stop)"
    ## start saucelabs
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO saucelabs-start)"
    ;;

  ## start saucelabs if not already started
  saucelabs-start)
    SAUCELABS_READY_FILE=/tmp/.saucelabs.ready
    ## start saucelabs only if SAUCELABS_READY_FILE doesn't exist
    SCRIPT="$SCRIPT && if [ ! -f \"$SAUCELABS_READY_FILE\" ]"
      ## install saucelabs if necessary
      SCRIPT="$SCRIPT; then $($UTILITY2_SH_ECHO saucelabs-install)"
      ## create sauclabs tunnel in a loop until one succeeds
      SCRIPT="$SCRIPT && while [ ! -f \"$SAUCELABS_READY_FILE\" ]"
        SCRIPT="$SCRIPT; do eval"
        SCRIPT="$SCRIPT '$UTILITY2_DIR/.install/sc --readyfile $SAUCELABS_READY_FILE &'"
        SCRIPT="$SCRIPT; sleep 10"
      SCRIPT="$SCRIPT; done"
    SCRIPT="$SCRIPT; fi"
    ;;

  ## stop saucelabs
  saucelabs-stop)
    SAUCELABS_READY_FILE=/tmp/.saucelabs.ready
    ## kill any script trying to start saucelabs connect to prevent race condition
    SCRIPT="$SCRIPT; kill '$(cat /tmp/.saucelabs.pid 2>/dev/null)'"
    SCRIPT="$SCRIPT 2>/dev/null"
    ## kill old saucelabs connect
    SCRIPT="$SCRIPT; killall sc 2>/dev/null"
    ## save current script's pid
    SCRIPT="$SCRIPT; echo $$ > /tmp/.saucelabs.pid"
    ## remove ready file
    SCRIPT="$SCRIPT; rm -f $SAUCELABS_READY_FILE"
    ;;

  ## test saucelabs
  saucelabs-test)
    SCRIPT="$SCRIPT && $UTILITY2_JS"
    SCRIPT="$SCRIPT --mode-cli=headlessSaucelabs"
    SCRIPT="$SCRIPT --mode-npm-test"
    SCRIPT="$SCRIPT --server-port=49221"
    SCRIPT="$SCRIPT --tmpdir=tmp"
    SCRIPT="$SCRIPT $3"
    SCRIPT="$SCRIPT < $2"
    ;;

  ## build utility2-external
  utility2-external-build)
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO utility2-npm-install)"
    SCRIPT="$SCRIPT && $UTILITY2_JS"
    SCRIPT="$SCRIPT --mode-cli=rollupFileList"
    SCRIPT="$SCRIPT --mode-silent"
    SCRIPT="$SCRIPT --rollup-file-list"
    SCRIPT="$SCRIPT .install/public/utility2-external.browser.js"
    SCRIPT="$SCRIPT,.install/public/utility2-external.nodejs.js"
    SCRIPT="$SCRIPT --tmpdir=tmp"
    SCRIPT="$SCRIPT && tar -czvf .install/$UTILITY2_EXTERNAL_TAR_GZ"
    SCRIPT="$SCRIPT .install/public/utility2-external.browser.rollup.js"
    SCRIPT="$SCRIPT .install/public/utility2-external.browser.rollup.min.js"
    SCRIPT="$SCRIPT .install/public/utility2-external.nodejs.rollup.js"
    SCRIPT="$SCRIPT .install/public/utility2-external.nodejs.rollup.min.js"
    ;;

  ## publish utility2-external on github
  utility2-external-build-publish)
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO db-github-file-update kaizhu256/utility2/gh-pages\
      /utility2-external/$UTILITY2_EXTERNAL_TAR_GZ .install/$UTILITY2_EXTERNAL_TAR_GZ)"
    ;;

  ## unknown arg
  *)
    ;;

  esac
  ## shift argv by 1
  shift
  done
  ## eval $SCRIPT
  shScriptEval
}
## run main program with argv
shMain "$@"
