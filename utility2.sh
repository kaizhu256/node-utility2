#!/bin/bash
shAesDecrypt () {
  ## this function decrypts base64-encode stdin to stdout using aes-256-cbc
  ## save stdin to $TEXT
  local TEXT=$(cat /dev/stdin)
  ## init $IV from first 44 base64-encoded bytes of $TEXT
  local IV=$(printf ${TEXT:0:44} | base64 --decode)
  ## decrypt remaining base64-encoded bytes of $TEXT to stdout using aes-256-cbc
  printf "${TEXT:44}" | base64 --decode | openssl enc -aes-256-cbc -d -K $AES_256_KEY -iv $IV
}

shAesEncrypt () {
  ## this function encrypts stdin to base64-encode stdout,
  ## with a random iv prepended using aes-256-cbc
  ## init $IV from random 16 bytes
  local IV=$(openssl rand -hex 16)
  ## printf base64-encoded $IV to stdout
  printf $(printf "$IV " | base64)
  ## encrypt stdin and stream to stdout using aes-256-cbc with base64-encoding
  openssl enc -aes-256-cbc -K $AES_256_KEY -iv $IV | base64 | tr -d "\n"
}

shCiBuildInit () {
  ## this function inits the ci build
  ## eval encrypted script
  if [ "$AES_256_KEY" ]
    then eval $(shAesDecrypt < .install/.aes-encrypted.sh)
  fi
  ## codeship.io env
  if [ "$CODESHIP" ]
    ## export $CI_BUILD_DIR
    then export CI_BUILD_DIR=/build.codeship.io
  ## travis-ci.org env
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
  fi
  ## export CI_* vars
  if [ ! "$CI_BRANCH" ]
    then export CI_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  fi
  ## add random salt to CI_BUILD_NUMBER to prevent conflict
  ## when re-running saucelabs with same CI_BUILD_NUMBER
  if [ "$CI_BRANCH" == browser ]
    then export CI_BUILD_NUMBER="$CI_BUILD_NUMBER.$(openssl rand -hex 4)"
  fi
  if [ ! "$CI_COMMIT_ID" ]
    then export CI_COMMIT_ID="$(git rev-parse --verify HEAD)"
  fi
  if [ ! "$CI_COMMIT_MESSAGE" ]
    then export CI_COMMIT_MESSAGE="$(git log -1 --pretty=%s)"
  fi
  if [ ! "$CI_COMMIT_INFO" ]
    then export CI_COMMIT_INFO="$CI_COMMIT_ID $CI_COMMIT_MESSAGE"
  fi
  if [ ! "$CI_REPO" ]
    then export CI_REPO="$(git config --get remote.origin.url | perl -ne 's/.*?([\w\-]+\/[^\/]+)\.git$/$1/; print')"
  fi
  if [ ! "$CI_REPO_URL" ]
    then export CI_REPO_URL="https://github.com/$CI_REPO/tree/$CI_BRANCH"
  fi
  if [ "$GIT_SSH_KEY" ]
    ## export $GIT_SSH_* vars
    then export GIT_SSH="$UTILITY2_DIR/.install/git-ssh.sh"
    if [ ! "$GIT_SSH_KEY_FILE" ]
      then export GIT_SSH_KEY_FILE=$(mktemp /tmp/.git-ssh-key-file-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX)
    fi
    ## create $GIT_SSH_KEY_FILE
    chmod 600 $GIT_SSH_KEY_FILE\
    && echo $GIT_SSH_KEY | base64 --decode > $GIT_SSH_KEY_FILE\
    && chmod 600 $GIT_SSH_KEY_FILE
    ## init $HEROKU_* vars
    HEROKU_REPO=$(perl -ne 'print $1 if /git\@heroku.com:([^.]+)/' < .install/.git-config)
    HEROKU_TEST_URL=https://$HEROKU_REPO.herokuapp.com/
  fi

  case $CI_BRANCH in
  ## run headless saucelabs browser tests
  browser)
    SCRIPT="$SCRIPT && $UTILITY2_JS"
    SCRIPT="$SCRIPT --mode-cli=headlessSaucelabsPlatformsList"
    SCRIPT="$SCRIPT $3"
    SCRIPT="$SCRIPT < .install/saucelabs-test-platforms-list.json"
    ;;
  npm)
    ## build npm package utility2
    ## install and test package in /tmp dir with no external npm dependencies */
    SCRIPT="$SCRIPT && cd /tmp && rm -fr node_modules $NODEJS_PACKAGE_JSON_NAME"
    ## npm install package
    SCRIPT="$SCRIPT && npm install $NODEJS_PACKAGE_JSON_NAME"
    ## cd into package
    SCRIPT="$SCRIPT && cd node_modules/$NODEJS_PACKAGE_JSON_NAME"
    ## npm test package
    SCRIPT="$SCRIPT && npm test"
    ;;
  *)
    ## npm test
    SCRIPT="$SCRIPT && npm test"
    if [ "$GIT_SSH_KEY_FILE" ]
      ## init .git/config
      then SCRIPT="$SCRIPT && (cp .install/.git-config .git/config || :)"
      ## unshallow git repo
      SCRIPT="$SCRIPT && echo $GIT_SSH"
      SCRIPT="$SCRIPT && echo && echo ci-build - unshallowing local repo ..."
      SCRIPT="$SCRIPT && git fetch --depth=99999999 origin $CI_BRANCH"
      ## deploy to heroku
      SCRIPT="$SCRIPT && echo && echo ci-build - deploying to git@heroku.com:$HEROKU_REPO.git ..."
      SCRIPT="$SCRIPT && git push -f heroku $CI_BRANCH:master"
      ## test heroku webpage
      SCRIPT="$SCRIPT && echo && echo ci-build - testing access to webpage $HEROKU_TEST_URL ..."
      SCRIPT="$SCRIPT && curl -3iLs $HEROKU_TEST_URL > /dev/null"
      ## exit on non-zero exit code
      SCRIPT="$SCRIPT || (echo failed && exit 1)"
      SCRIPT="$SCRIPT && echo passed"
      ## run browser tests
      SCRIPT="$SCRIPT && git push -f origin $CI_BRANCH:browser"
    fi
    ;;
  esac
  ## save $EXIT_CODE
  SCRIPT="$SCRIPT; EXIT_CODE=\$?"
  if [ "$CI_BUILD_DIR" ] && [ "$CI_BUILD_UPLOAD" != false ]
    ## upload build to $CI_BUILD_DIR/latest.$CI_BRANCH on github
    then SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO db-github-dir-update $CI_REPO/gh-pages $CI_BUILD_DIR/latest.$CI_BRANCH .build)"
    ## upload build to $CI_BUILD_DIR/$CI_BUILD_NUMBER.$CI_BRANCH.$CI_COMMIT_ID on github
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO db-github-dir-update $CI_REPO/gh-pages $CI_BUILD_DIR/$CI_BUILD_NUMBER.$CI_BRANCH.$CI_COMMIT_ID .build)"
    ## exit on non-zero exit code
    SCRIPT="$SCRIPT || exit 1"
  fi
  ## exit on non-zero exit code
  SCRIPT="$SCRIPT; if [ \$EXIT_CODE != 0 ]"
    SCRIPT="$SCRIPT; then exit \$EXIT_CODE"
  SCRIPT="$SCRIPT; fi"
}

shNodejsInstall () {
  ## this function installs nodejs / npm if necesary
  if [ ! "$(which npm)" ]
    ## init $NODEJS_* vars
    then NODEJS_PROCESS_ARCH=$(uname -m | perl -ne "s/arm.*/arm/i; s/i.86.*/i386/i;\
      s/amd64/x64/i; s/x86_64/x64/i; print lc")
    NODEJS_PROCESS_PLATFORM=$(uname | perl -ne "s/.*bsd$/bsd/i; print lc")
    NODEJS_VERSION=node-v0.10.26-$NODEJS_PROCESS_PLATFORM-$NODEJS_PROCESS_ARCH
    if [ ! -f /tmp/$NODEJS_VERSION/bin/npm ]
      then echo installing nodejs and npm to /tmp/$NODEJS_VERSION/bin
      curl -3Ls http://nodejs.org/dist/v0.10.26/$NODEJS_VERSION.tar.gz\
        | tar -C /tmp/ -xzf -
    fi
    ## export $PATH with nodejs / npm path
    export PATH=/tmp/$NODEJS_VERSION/bin:$PATH
  fi
}

shScriptEval () {
  ## this function evals $SCRIPT
  ## echo $SCRIPT
  if [ "$MODE_ECHO" ] || [ "$SCRIPT" != ":" ]
    then echo $SCRIPT
  fi
  ## eval $SCRIPT
  if [ ! "$MODE_ECHO" ]
    ## save cwd
    then pushd "$(pwd)" > /dev/null
    ## eval $SCRIPT
    eval "$SCRIPT"
    ## save $EXIT_CODE
    EXIT_CODE=$?
    ## restore cwd
    popd > /dev/null
    ## return $EXIT_CODE
    return $EXIT_CODE;
  fi
}

shUtility2Init () {
  ## this function inits utility2
  ## init $SCRIPT
  SCRIPT=":"
  ## init utility2 env
  UTILITY2_JS=$UTILITY2_DIR/utility2.js
  UTILITY2_SH=$UTILITY2_DIR/utility2.sh
  UTILITY2_SH_ECHO="$UTILITY2_SH mode-echo"
  UTILITY2_EXTERNAL_TAR_GZ=utility2-external.$NODEJS_PACKAGE_JSON_VERSIONSHORT.tar.gz
}

shMain () {
  ## this function is the main program and parse argv

  ## install nodejs / npm if necessary
  shNodejsInstall
  ## init nodejs env
  if [ -f "./utility2.js" ]
    then eval $(node --eval "global.state = { modeCli: 'exportEnv' }; require('./utility2.js');")
  else
    eval $(node --eval "global.state = { modeCli: 'exportEnv' }; require('utility2');")
  fi
  ## init utility2
  shUtility2Init

  ## parse argv
  ## http://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash
  while [[ $# > 0 ]]
  do
  case $1 in

  ## aes encrypt file $2
  aes-encrypt)
    shAesEncrypt < $2
    echo
    ;;

  ## ci build utility2
  ci-build)
    ## npm install
    npm install
    ## init ci build
    shCiBuildInit
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

  ## create ssh key pair for git
  git-ssh-key-create)
    SCRIPT="$SCRIPT && ssh-keygen -C 'git' -f id_rsa.git -N '' -t rsa"
    SCRIPT="$SCRIPT; printf '\nexport GIT_SSH_KEY=\"'"
    SCRIPT="$SCRIPT && base64 < id_rsa.git | tr -d '\n'"
    SCRIPT="$SCRIPT && printf '\"\n\nexport GIT_SSH_KEY_PUB=\"'"
    SCRIPT="$SCRIPT && cat id_rsa.git.pub | tr -d '\n'"
    SCRIPT="$SCRIPT && printf '\"\n\n'"
    ;;

  ## echo mode
  mode-echo)
    MODE_ECHO=1
    ;;

  ## called by npm run-script install
  npm-install)
    SCRIPT="$SCRIPT && mkdir -p .install/public"
    SCRIPT="$SCRIPT && $UTILITY2_JS --mode-cli=npmInstall"
    SCRIPT="$SCRIPT ${@:2}"
    SCRIPT="$SCRIPT && chmod 755 .install/git-ssh.sh"
    ## install utility2-external
    if [ "$NODEJS_PACKAGE_JSON_NAME" == utility2 ]\
        && [ ! -f .install/public/utility2-external.nodejs.rollup.js ]
      then SCRIPT="$SCRIPT && curl -3Ls"
      SCRIPT="$SCRIPT https://kaizhu256.github.io/utility2/utility2-external"
      SCRIPT="$SCRIPT/$UTILITY2_EXTERNAL_TAR_GZ"
      SCRIPT="$SCRIPT | tar -xzvf -"
    fi
    ;;

  ## start interactive utility2
  npm-start | start)
    SCRIPT="$SCRIPT && $UTILITY2_JS"
    SCRIPT="$SCRIPT --mode-repl"
    SCRIPT="$SCRIPT --server-port=random"
    SCRIPT="$SCRIPT --tmpdir=true"
    SCRIPT="$SCRIPT ${@:2}"
    ;;

  ## called by npm run-script test
  npm-test)
    ## init $NPM_TEST_ARGS
    NPM_TEST_ARGS=""
    NPM_TEST_ARGS="$NPM_TEST_ARGS --mode-npm-test"
    ## enable interactive repl debugger during test
    NPM_TEST_ARGS="$NPM_TEST_ARGS --mode-repl"
    NPM_TEST_ARGS="$NPM_TEST_ARGS --mode-test"
    ## default to random server port
    NPM_TEST_ARGS="$NPM_TEST_ARGS --server-port=random"
    NPM_TEST_ARGS="$NPM_TEST_ARGS --tmpdir=tmp"
    NPM_TEST_ARGS="$NPM_TEST_ARGS ${@:2}"
    ## extra utility2 test args
    if [ "$NODEJS_PACKAGE_JSON_NAME" == utility2 ]
      ## test github db
      then NPM_TEST_ARGS="$NPM_TEST_ARGS --mode-db-github=kaizhu256/blob/unstable"
      ## offline mode
      NPM_TEST_ARGS="$NPM_TEST_ARGS --mode-offline"
    fi
    ## run npm test with code coverage
    SCRIPT="$SCRIPT && $UTILITY2_JS $NPM_TEST_ARGS"
    ## use regular expression to filter files needing code coverage
    SCRIPT="$SCRIPT --mode-coverage"
    SCRIPT="$SCRIPT; EXIT_CODE=\$?"
    ## re-run npm test without code coverage if tests failed
    ## so we can debug line numbers in stack trace
    SCRIPT="$SCRIPT; if [ \$EXIT_CODE != 0 ]"
      SCRIPT="$SCRIPT; then $UTILITY2_JS $NPM_TEST_ARGS"
      SCRIPT="$SCRIPT --mode-test-report-merge"
    SCRIPT="$SCRIPT; fi"
    ## exit on non-zero exit code
    SCRIPT="$SCRIPT; if [ \$EXIT_CODE != 0 ]"
      SCRIPT="$SCRIPT; then exit \$EXIT_CODE"
    SCRIPT="$SCRIPT; fi"
    ;;

  ## debug saucelabs job id
  saucelabs-debug)
    ## security - do not use SCRIPT macro to avoid leaking sensitive info
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
        SCRIPT="$SCRIPT && curl -3Ls"
        SCRIPT="$SCRIPT https://d2nkw87yt5k0to.cloudfront.net/downloads"
        SCRIPT="$SCRIPT/sc-latest-$SAUCELABS_VERSION.tar.gz"
        SCRIPT="$SCRIPT | tar -C .install -xzf -"
        ;;
      *)
        SCRIPT="$SCRIPT && curl -3Ls"
        SCRIPT="$SCRIPT https://d2nkw87yt5k0to.cloudfront.net/downloads"
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
    SCRIPT="$SCRIPT && if [ ! -f $SAUCELABS_READY_FILE ]"
      ## install saucelabs if necessary
      SCRIPT="$SCRIPT; then $($UTILITY2_SH_ECHO saucelabs-install)"
      ## create sauclabs tunnel in a loop until one succeeds
      SCRIPT="$SCRIPT && while [ ! -f $SAUCELABS_READY_FILE ]"
        SCRIPT="$SCRIPT; do eval"
        SCRIPT="$SCRIPT '$UTILITY2_DIR/.install/sc --readyfile $SAUCELABS_READY_FILE &'"
        SCRIPT="$SCRIPT; sleep 10"
      SCRIPT="$SCRIPT; done"
    SCRIPT="$SCRIPT; fi"
    ;;

  ## stop saucelabs
  saucelabs-stop)
    SAUCELABS_PID_FILE=/tmp/.saucelabs.pid
    SAUCELABS_READY_FILE=/tmp/.saucelabs.ready
    ## kill any script trying to start saucelabs connect to prevent race condition
    SCRIPT="$SCRIPT; kill '$(cat $SAUCELABS_PID_FILE 2>/dev/null)'"
    SCRIPT="$SCRIPT 2>/dev/null"
    ## kill old saucelabs connect
    SCRIPT="$SCRIPT; killall sc 2>/dev/null"
    ## save current script's pid
    SCRIPT="$SCRIPT; echo $$ > $SAUCELABS_PID_FILE"
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
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO db-github-file-update kaizhu256/utility2/gh-pages /utility2-external/$UTILITY2_EXTERNAL_TAR_GZ .install/$UTILITY2_EXTERNAL_TAR_GZ)"
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
