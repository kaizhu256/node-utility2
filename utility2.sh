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

function shAesDecryptScript () {
  ## this function decrypts .aes-encrypted.sh to stdout
  shAesDecrypt < .aes-encrypted.sh || return $?
}

function shAesEncrypt () {
  ## this function encrypts stdin to base64-encode stdout,
  ## with a random iv prepended using aes-256-cbc
  ## init $IV from random 16 bytes
  local IV=$(openssl rand -hex 16)
  ## print base64-encoded $IV to stdout
  printf $(printf "$IV " | base64)
  ## encrypt stdin and stream to stdout using aes-256-cbc with base64-encoding
  openssl enc -aes-256-cbc -K $AES_256_KEY -iv $IV | base64 | tr -d "\n" || return $?
}

function shAesEncryptScript () {
  ## this function encrypts the script $1 to .aes-encrypted.sh
  FILE=$1
  if [ ! -f "$FILE" ]
  then
    printf "## non-existent file $FILE\n"
    return 1
  fi
  if [ ! "$AES_256_KEY" ]
  then
    printf "## no \$AES_256_KEY detected in env - creating new AES_256_KEY ...\n"
    AES_256_KEY=$(openssl rand -hex 32)
    printf "## a new \$AES_256_KEY for encrypting data has been created.\n"
    printf "## you may want to copy the following to your $HOME/.bashrc script\n"
    printf "## so it can be used on local ci builds:\n"
    printf "export AES_256_KEY=$AES_256_KEY\n\n"
  fi
  printf "## travis-encrypting \$AES_256_KEY ...\n"
  AES_256_KEY_ENCRYPTED=$(shTravisEncrypt $GITHUB_REPO \$AES_256_KEY=$AES_256_KEY)
  printf "## updating .travis.yml with encrypted key ...\n"
  perl -i -pe\
    "s|(^\s*- secure: )(.*)( ## AES_256_KEY$)|\$1$AES_256_KEY_ENCRYPTED\$3|"\
    .travis.yml\
    || return $?
  printf "## encrypting $FILE to .aes-encrypted.sh ...\n"
  shAesEncrypt < $FILE | fold > .aes-encrypted.sh || return $?
}

function shCiBuild () {
  ## this function builds the app
  ## init ci build
  if [ ! "$NODEJS_PACKAGE_JSON_NAME" ]
  then
    shCiBuildLog init "could not read package.json"
    exit 1
  fi
  ## decrypt and eval .aes-encrypted.sh
  shCiBuildLog aesDecrypt "shasum - $(printf $AES_256_KEY | shasum) \$AES_256_KEY"
  shCiBuildLog aesDecrypt "shasum - $(shasum .aes-encrypted.sh)"
  ## eval .aes-encrypted.sh
  eval "$(shAesDecrypt < .aes-encrypted.sh)" || exit $?
  ## init codeship.io env
  if [ "$CODESHIP" ]
  then
    ## export $CI_BUILD_DIR
    export CI_BUILD_DIR=/build.codeship.io
  ## init travis-ci.org env
  elif [ "$TRAVIS" ]
  then
    ## export $CI_BUILD_DIR
    export CI_BUILD_DIR=/build.travis-ci.org
    ## export TRAVIS_* vars as CI_* vars
    if [ ! "$CI_BRANCH" ]
    then
      export CI_BRANCH=$TRAVIS_BRANCH
    fi
    if [ ! "$CI_BUILD_NUMBER" ]
    then
      export CI_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER
    fi
    if [ ! "$CI_COMMIT_ID" ]
    then
      export CI_COMMIT_ID=$TRAVIS_COMMIT
    fi
  else
    export CI_BUILD_DIR=/build.local
  fi
  ## export CI_* vars
  if [ ! "$CI_BRANCH" ]
  then
    export CI_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  fi
  if [ ! "$CI_COMMIT_ID" ]
  then
    export CI_COMMIT_ID=$(git rev-parse --verify HEAD)
  fi
  if [ ! "$CI_COMMIT_MESSAGE" ]
  then
    export CI_COMMIT_MESSAGE="$(git log -1 --pretty=%s)"
  fi
  if [ ! "$CI_COMMIT_INFO" ]
  then
    export CI_COMMIT_INFO="$CI_COMMIT_ID - $CI_COMMIT_MESSAGE"
  fi
  export CI_BUILD_DIR_COMMIT=$CI_BUILD_DIR/$CI_BUILD_NUMBER.$CI_BRANCH.$CI_COMMIT_ID
  export CI_BUILD_DIR_LATEST=$CI_BUILD_DIR/latest.$CI_BRANCH
  ## used in test report summary
  export GITHUB_REPO_URL="https://github.com/$GITHUB_REPO/tree/$CI_BRANCH"
  if [ "$CI_BRANCH" != local ]
  then
    ## update coverage / test report badges with loading icon
    for FILE in $CI_BUILD_DIR_LATEST/coverage-report/coverage-report.badge.svg\
      $CI_BUILD_DIR_LATEST/test-report.badge.svg
    do
      ## update build artifiact with loading icon
      $UTILITY2_JS\
        --db-github-file=$FILE\
        --mode-cli=dbGithubFileUpdate\
        --mode-db-github=$GITHUB_REPO/gh-pages\
        < $UTILITY2_DIR/.install/public/utility2-loading.svg\
        || shCiBuildExit $?
    done
  fi
  ## npm test local app
  shCiBuildNpmTestLocal || shCiBuildExit $?
  if [ "$CI_BRANCH" != local ]
  then
    ## deploy app to heroku
    if [ "$GIT_SSH_KEY" ]
    then
      shCiBuildHerokuDeploy || shCiBuildExit $?
    fi
    ## run saucelabs tests on heroku server
    if [ "$SAUCE_ACCESS_KEY" ] && [ "$SAUCE_USERNAME" ]
    then
      shCiBuildSaucelabsTest || shCiBuildExit $?
    fi
    ## npm publish app if version changed
    if [ "$NODEJS_PACKAGE_JSON_VERSION" ]\
      && [ "$NPM_AUTH" ]\
      && shSemverGreaterThan\
      "$NODEJS_PACKAGE_JSON_VERSION"\
      $(npm info $NODEJS_PACKAGE_JSON_NAME version 2>/dev/null)
    then
      shCiBuildNpmPublish || shCiBuildExit $?
    fi
    ## npm test latest published app
    shCiBuildNpmTestPublished
    ## save $EXIT_CODE
    EXIT_CODE=$?
    ## copy merged test-report.json into current directory
    cp .build/test-report.json $CWD/.build || shCiBuildExit $?
    ## restore $CWD
    cd $CWD || shCiBuildExit $?
    ## merge test report into $CWD
    $UTILITY2_JS --mode-cli=testReportMerge || shCiBuildExit $?
    shCiBuildLog npmTestPublished "npm test of latest published package passed"
  fi
  ## gracefully exit ci build
  shCiBuildExit $EXIT_CODE
}

function shCiBuildAppCopy () {
  ## this function copies the app to /tmp/app with only the bare git repo files
  ## rm old /tmp/app
  rm -fr /tmp/app && mkdir -p /tmp/app || return $?
  ## tar / untar repo contents to /tmp/app, since we can't git clone a shallow repo
  git ls-tree -r HEAD --name-only | xargs tar -czf - | tar -C /tmp/app -xzvf - || return $?
}

function shCiBuildExit () {
  ## this function gracefully exits the ci build
  ## save exit code
  local EXIT_CODE=$?
  ## restore $CWD
  cd $CWD
  ## cleanup $GIT_SSH_KEY_FILE
  rm -f $GIT_SSH_KEY_FILE
  if [ "$CI_BRANCH" != local ]
  then
    ## init $GITHUB_GH_PAGES
    local GITHUB_GH_PAGES=$(echo $GITHUB_REPO | perl -pe "s/\//.github.io\//")
    ## push build artifact to github
    for FILE in $CI_BUILD_DIR_COMMIT $CI_BUILD_DIR_LATEST
    do
      shCiBuildLog buildExit\
        "uploading test report https://$GITHUB_GH_PAGES/$FILE/test-report.html ..."
      shCiBuildLog buildExit\
        "uploading coverage report https://$GITHUB_GH_PAGES/$FILE/coverage-report/index.html\
..."
      ## update build artifact with test and coverage reports
      $UTILITY2_JS\
        --db-github-file=$FILE\
        --db-github-local=.build\
        --mode-cli=dbGithubDirUpdate\
        --mode-db-github=$GITHUB_REPO/gh-pages || exit $?
    done
  fi
  ## exit with exit code
  exit $EXIT_CODE
}

function shCiBuildHerokuDeploy () {
  ## this function deploys the app to heroku
  shCiBuildLog herokuDeploy "deploying $NODEJS_PACKAGE_JSON_NAME to heroku ..."
  ## export $GIT_SSH
  export GIT_SSH=$UTILITY2_DIR/.install/git-ssh.sh
  ## export and create $GIT_SSH_KEY_FILE
  export GIT_SSH_KEY_FILE=$(mktemp /tmp/.git-ssh-key-file-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX)
  ## save $GIT_SSH_KEY to $GIT_SSH_KEY_FILE
  echo $GIT_SSH_KEY | base64 --decode > $GIT_SSH_KEY_FILE || return $?
  ## secure $GIT_SSH_KEY_FILE
  chmod 600 $GIT_SSH_KEY_FILE || return $?
  ## init $HEROKU_URL
  local HEROKU_URL=http://$HEROKU_APP.herokuapp.com
  ## init clean repo in /tmp/app
  shCiBuildAppCopy && cd /tmp/app || return $?
  ## init .git
  git init || return $?
  ## init .git/config
  printf "\n[user]\nname=nobody\nemail=nobody\n" > .git/config || return $?
  ## rm .gitignore so we can git add everything
  rm -f .gitignore || return $?
  ## git add everything
  git add . || return $?
  ## git commit
  git commit -am "utility2 deploy" || return $?
  ## git push to heroku
  git push -f git@heroku.com:$HEROKU_APP.git HEAD:master || return $?
  ## check deployed webpage on heroku
  shCiBuildLog herokuDeploy "checking deployed webpage $HEROKU_URL ..."
  (
    curl -3Ls $HEROKU_URL > /dev/null\
      && shCiBuildLog herokuDeploy "check passed"\
      || (shCiBUildLog herokuDeploy "check failed"; return 1)
  )
  ## restore $CWD
  cd $CWD || return $?
}

function shCiBuildLog () {
  ## this function logs output about ci build state
  export MODE_CI_BUILD=$1
  printf "\n[MODE_CI_BUILD=$MODE_CI_BUILD] - $2\n\n" || return $?
}

function shCiBuildNpmPublish () {
  ## this function npm publishes the app if the version changed
  shCiBuildLog npmPublish "npm publish $NODEJS_PACKAGE_JSON_NAME ..."
  ## init .npmrc
  printf "_auth = $NPM_AUTH\nemail = nobody\n" > $HOME/.npmrc || return $?
  ## init clean repo in /tmp/app
  shCiBuildAppCopy && cd /tmp/app || return $?
  ## npm install
  npm install || return $?
  ## publish npm package
  npm publish || return $?
  shCiBuildLog npmPublish "npm publish succeeded"
  ## wait awhile for npm registry to sync
  sleep 10 || return $?
}

function shCiBuildNpmTestLocal () {
  ## this function runs npm test on the local app
  shCiBuildLog npmTestLocal "npm test $CWD ..."
  ## npm test
  npm test || return $?
  shCiBuildLog npmTestLocal "npm test passed"
}

function shCiBuildNpmTestPublished () {
  ## this function npm tests the latest published version of the app
  shCiBuildLog npmTestPublished\
    "npm install and test published package $NODEJS_PACKAGE_JSON_NAME ..."
  ## install and test latest npm package in /tmp dir with no external npm dependencies
  ## cleanup /tmp
  cd /tmp && rm -fr node_modules $NODEJS_PACKAGE_JSON_NAME || return $?
  ## npm install package
  npm install $NODEJS_PACKAGE_JSON_NAME || return $?
  ## cd into package
  cd node_modules/$NODEJS_PACKAGE_JSON_NAME || return $?
  ## list package content
  shCiBuildLog npmTestPublished "listing npm package contents ..."
  find . -path ./node_modules -prune -o -type f -print || return $?
  ## copy previous test-report.json into .build dir
  mkdir -p .build && cp $CWD/.build/test-report.json .build || return $?
  ## npm test package and merge result into previous test-report.json
  npm test --utility2-mode-test-report-merge || return $?
}

function shCiBuildSaucelabsTest () {
  ## this function runs headless saucelabs browser tests
  shCiBuildLog saucelabsTest "running headless saucelabs browser tests ..."
  ## add random salt to CI_BUILD_NUMBER to prevent conflict
  ## when re-running saucelabs with same CI_BUILD_NUMBER
  export CI_BUILD_NUMBER_SAUCELABS="$CI_BUILD_NUMBER.$(openssl rand -hex 8)"
  ## run saucelabs tests
  $UTILITY2_JS --mode-cli=headlessSaucelabsPlatformsList\
    < .install/saucelabs-test-platforms-list.json || return $?
  shCiBuildLog saucelabsTest "saucelabs tests passed"
}

function shSaucelabsDebug () {
  ## this function fetches debug info on the given saucelabs test id $1
  local ID=$!
  curl -X POST https://saucelabs.com/rest/v1/$SAUCE_USERNAME/js-tests/status\
    --data "{\"js tests\": [\"$ID\"]}"\
    -H "Content-Type: application/json"\
    -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY\
    || return $?
  echo
}

function shSemverGreaterThan() {
  ## function echoes 1 if semver $1 is greater than semver $2 or 0 otherwise
  local REGEXP="([0-9]+)\.([0-9]+)\.([0-9]+)([0-9A-Za-z-]*)"
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
  then
    return 1
  ## return 1 if $MAJOR1 < $MAJOR2
  elif [ $MAJOR1 -lt $MAJOR2 ]
  then
    return 1
  ## return 0 if $MAJOR1 > $MAJOR2
  elif [ $MAJOR1 -gt $MAJOR2 ]
  then
    return 0
  ## return 1 if $MINOR1 < $MINOR2
  elif [ $MINOR1 -lt $MINOR2 ]
  then
    return 1
  ## return 0 if $MINOR1 > $MINOR2
  elif [ $MINOR1 -gt $MINOR2 ]
  then
    return 0
  ## return 1 if $PATCH1 < $PATCH2
  elif [ $PATCH1 -lt $PATCH2 ]
  then
    return 1
  ## return 0 if $PATCH1 > $PATCH2
  elif [ $PATCH1 -gt $PATCH2 ]
  then
    return 0
  ## return 1 if $SPECIAL1 < $SPECIAL2
  elif [ "$SPECIAL1" ] && [ ! "$SPECIAL2" ]
  then
    return 1
  elif [ "$SPECIAL1" \< "$SPECIAL2" ]
  then
    return 1
  ## return 0 if $SPECIAL1 > $SPECIAL2
  elif [ "$SPECIAL1" \> $SPECIAL2 ]
  then
    return 0
  ## return 1 otherwise
  else
    return 1
  fi
}

function shTravisEncrypt () {
  ## this function travis-encrypts the secret $2 for github repo $1
  local GITHUB_REPO="$1"
  local SECRET="$2"
  ## get public rsa key from https://api.travis-ci.org/repos/<owner>/<repo>/key
  curl -3Ls https://api.travis-ci.org/repos/$GITHUB_REPO/key\
    | perl -pe "s/[^-]+(.+-).+/\$1/; s/\\\\n/\n/g; s/ RSA / /g"\
    > /tmp/id_rsa.pub\
    || return $?
  ## rsa-encrypt $SECRET and print it
  printf "$SECRET"\
    | openssl rsautl -encrypt -pubin -inkey /tmp/id_rsa.pub\
    | base64\
    | tr -d "\n"\
    || return $?
}

function shUtility2ExternalBuild () {
  ## this function builds utility2-external
  shUtility2NpmInstall || return $?
  ## create utility2-external rollup files
  ARGS=""
  ARGS="$ARGS --mode-cli=rollupFileList"
  ARGS="$ARGS --mode-silent"
  ARGS="$ARGS --rollup-file-list"
  ARGS="$ARGS=.install/public/utility2-external.browser.js"
  ARGS="$ARGS,.install/public/utility2-external.nodejs.js"
  ARGS="$ARGS --tmpdir=tmp"
  $UTILITY2_JS $ARGS || return $?
  ## tar utility2-external build
  tar -czvf .install/$UTILITY2_EXTERNAL_TAR_GZ\
    .install/public/utility2-external.browser.rollup.js\
    .install/public/utility2-external.browser.rollup.min.js\
    .install/public/utility2-external.nodejs.rollup.js\
    .install/public/utility2-external.nodejs.rollup.min.js\
    || return $?
}

function shUtility2ExternalBuildPublish () {
  ## this function publishes the utility2-external build
  ## upload $UTILITY2_EXTERNAL_TAR_GZ to github
  $UTILITY2_JS\
    --db-github-file=/utility2-external/$UTILITY2_EXTERNAL_TAR_GZ\
    --mode-cli=dbGithubFileUpdate\
    --mode-db-github=kaizhu256/utility2/gh-pages\
    < .install/$UTILITY2_EXTERNAL_TAR_GZ\
    || return $?
}

function shUtility2NpmInstall () {
  ## this function runs npm install
  ## mkdir .install/public
  mkdir -p .install/public || return $?
  ## extract files from utility2.js2
  $UTILITY2_JS --mode-cli=npmInstall $@ || return $?
  ## run extra npm install code for utility2
  if [ "$NODEJS_PACKAGE_JSON_NAME" = utility2 ]
  then
    shUtility2NpmInstallUtility2 || return $?
  fi
}

function shUtility2NpmInstallUtility2 () {
  ## this function runs extra npm install code for utility2
  ## init $FILE
  local FILE
  ## chmod 755 .install/git-ssh.sh
  chmod 755 .install/git-ssh.sh || return $?
  ## install phantomjs
  if [ ! -d ".install/phantomjs" ]
  then
    shCiBuildLog npmInstallUtility2 "installing phantomjs ..."
    case $NODEJS_PROCESS_PLATFORM in
    darwin)
      FILE=phantomjs-1.9.7-macosx
      ## fetch phantomjs
      if [ ! -f "/tmp/$FILE.zip" ]
      then
        curl -#3L https://bitbucket.org/ariya/phantomjs/downloads/$FILE.zip\
          > /tmp/$FILE.zip || return $?
      fi
      ## unzip phantomjs
      unzip -q /tmp/$FILE.zip -d .install || return $?
      ;;
    linux)
      FILE=phantomjs-1.9.7-linux-x86_64
      ## fetch phantomjs
      if [ ! -f "/tmp/$FILE.tar.bz2" ]
      then
        curl -#3L https://bitbucket.org/ariya/phantomjs/downloads/$FILE.tar.bz2\
          > /tmp/$FILE.tar.bz2 || return $?
      fi
      ## untar phantomjs
      tar -C .install -xjf /tmp/$FILE.tar.bz2 || return $?
      ;;
    esac
    mv .install/$FILE .install/phantomjs || return $?
  fi
  ## install slimerjs
  if [ ! -d ".install/slimerjs" ]
  then
    shCiBuildLog npmInstallUtility2 "installing slimerjs ..."
    case $NODEJS_PROCESS_PLATFORM in
    darwin)
      FILE=slimerjs-0.9.1-mac
      ;;
    linux)
      FILE=slimerjs-0.9.1-linux-x86_64
      ;;
    esac
    ## fetch slimerjs
    if [ ! -f "/tmp/$FILE.tar.bz2" ]
    then
      curl -#3L http://download.slimerjs.org/releases/0.9.1/$FILE.tar.bz2\
        > /tmp/$FILE.tar.bz2 || return $?
    fi
    ## untar slimerjs
    tar -C .install -xjf /tmp/$FILE.tar.bz2 || return $?
    mv .install/slimerjs-0.9.1 .install/slimerjs || return $?
  fi
  ## install utility2-external
  if [ ! -f ".install/public/utility2-external.nodejs.rollup.js" ]
  then
    curl -#3L\
      https://kaizhu256.github.io/utility2/utility2-external/$UTILITY2_EXTERNAL_TAR_GZ\
      | tar -xzvf -\
      || return $?
  fi
}

function shUtility2NpmPublish () {
  ## this function runs after npm publish
  ## build utility2-external
  shUtility2ExternalBuild || return $?
  ## publish utility2-external
  shUtility2ExternalBuildPublish || return $?
}

function shUtility2NpmStart () {
  ## this function runs npm start
  $UTILITY2_JS --mode-repl --server-port=random --tmpdir $@ || return $?
}

function shUtility2NpmTest () {
  ## this function runs npm test
  ## init $ARGS
  ARGS=""
  ARGS="$ARGS --mode-npm-test"
  ## enable interactive repl debugger during test
  ARGS="$ARGS --mode-repl"
  ARGS="$ARGS --mode-test"
  ## default to random server port
  ARGS="$ARGS --server-port=random"
  ARGS="$ARGS --tmpdir=tmp"
  ARGS="$ARGS $@"
  ## extra utility2 test args
  if [ "$NODEJS_PACKAGE_JSON_NAME" = utility2 ]
  then
    ## test github db
    ARGS="$ARGS --mode-db-github=kaizhu256/blob/unstable"
    ## offline mode
    ARGS="$ARGS --mode-offline"
  fi
  ## run npm test with coverage
  $UTILITY2_JS $ARGS --mode-coverage || return $?
  ## save $EXIT_CODE
  EXIT_CODE=$?
  ## re-run npm test without coverage if tests failed,
  ## so we can debug line numbers in stack trace
  if [ "$EXIT_CODE" != 0 ]
  then
    $UTILITY2_JS $ARGS --mode-test-report-merge || return $?
  fi
  ## return $EXIT_CODE
  return $EXIT_CODE
}

function shUtility2Main () {
  ## this function is the main program and parses argv

  ## don't do anything if no args are provided
  if [ ! "$1" ]
  then
    return
  fi

  ## init nodejs env
  if [ -f "./utility2.js" ]
  then
    eval $(node --eval "global.state = { modeCli: 'exportEnv' }; require('./utility2.js');")
  else
    eval $(node --eval "global.state = { modeCli: 'exportEnv' }; require('utility2');")
  fi

  ## init utility2
  ## save current dir to $CWD
  CWD=$(pwd)
  ## save executable dir to $EXEC_DIR
  EXEC_DIR=$( cd "$( dirname "$0" )" && pwd )
  ## init $EXIT_CODE
  EXIT_CODE=0
  ## init $GITHUB_REPO
  if [ ! "$GITHUB_REPO" ]
  then
    export GITHUB_REPO=$(git config --get remote.origin.url\
      | perl -ne "print \$1 if /([\w-]+\/[^.]+)/")
  fi
  ## init utility2 env
  UTILITY2_JS=$UTILITY2_DIR/utility2.js
  UTILITY2_EXTERNAL_TAR_GZ=utility2-external.$(echo $NODEJS_PACKAGE_JSON_VERSION\
    | perl -ne "print \$1 if /(\d+\.\d+\.\d+)/").tar.gz

  ## eval args
  eval "${@:1}"
  ## save $EXIT_CODE
  EXIT_CODE=$?
  ## restore $CWD
  cd $CWD
  ## return $EXIT_CODE
  return $EXIT_CODE
}
## run main program with argv
shUtility2Main $@
