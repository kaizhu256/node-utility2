#!/bin/bash
shCiBuildInit () {
  ## this function inits the ci build
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
    then export CI_COMMIT_INFO="$CI_COMMIT_ID $CI_COMMIT_MESSAGE"
  fi
  if [ ! "$CI_REPO" ]
    then export CI_REPO="$(git config --get remote.origin.url | perl -ne 's/.*?([\w\-]+\/[^\/]+)\.git$/$1/; print')"
  fi
  if [ ! "$CI_REPO_URL" ]
    then export CI_REPO_URL="https://github.com/$CI_REPO/tree/$CI_BRANCH"
  fi
  ## init local script
  local SCRIPT=":"
  ## save EXIT_CODE
  SCRIPT="$SCRIPT; EXIT_CODE=\$?"
  if [ $CI_BUILD_DIR ]
    ## upload build to $3/latest.$CI_BRANCH
    then SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO db-github-dir-update $CI_REPO/gh-pages $CI_BUILD_DIR/latest.$CI_BRANCH .build)"
    ## upload build to $3/$CI_BUILD_NUMBER.$CI_BRANCH.$CI_COMMIT_ID
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO db-github-dir-update $CI_REPO/gh-pages $CI_BUILD_DIR/$CI_BUILD_NUMBER.$CI_BRANCH.$CI_COMMIT_ID .build)"
    ## save EXIT_CODE if non-zero
    SCRIPT="$SCRIPT || EXIT_CODE=\$?"
  fi
  ## exit with EXIT_CODE
  SCRIPT="$SCRIPT; exit \$EXIT_CODE"
  ## export CI_BUILD_SCRIPT_UPLOAD, which uploads ci build to github
  CI_BUILD_SCRIPT_UPLOAD=$SCRIPT
}

shNodejsInstall () {
  ## this function installs nodejs / npm if necesary
  if [ ! "$(which npm)" ]
    ## nodejs cpu architecture
    then NODEJS_PROCESS_ARCH=$(uname -m | perl -ne "s/arm.*/arm/i; s/i.86.*/i386/i;\
      s/amd64/x64/i; s/x86_64/x64/i; print lc")
    ## nodejs os platform
    NODEJS_PROCESS_PLATFORM=$(uname | perl -ne "s/.*bsd$/bsd/i; print lc")
    ## nodejs version
    NODEJS_VERSION=node-v0.10.26-$NODEJS_PROCESS_PLATFORM-$NODEJS_PROCESS_ARCH
    if [ ! -f /tmp/$NODEJS_VERSION/bin/npm ]
      then echo "install nodejs npm to /tmp/$NODEJS_VERSION/bin"
      curl -3Ls http://nodejs.org/dist/v0.10.26/$NODEJS_VERSION.tar.gz\
        | tar -C /tmp/ -xzf -
    fi
    ## export PATH var with nodejs / npm path
    export PATH=/tmp/$NODEJS_VERSION/bin:$PATH
  fi
}

shMain () {
  ## this function is the main program

  ## install nodejs / npm if necessary
  shNodejsInstall

  ## utility2 root directory
  UTILITY2_DIR=$( cd "$( dirname "$0" )" && pwd )
  ## export nodejs env
  eval "$($UTILITY2_DIR/utility2.js --mode-cli=exportEnv --mode-silent)"

  ## init $UTILITY2_* vars
  UTILITY2_EXTERNAL_TAR_GZ=utility2-external.$NODEJS_PACKAGE_JSON_VERSIONSHORT.tar.gz
  UTILITY2_JS=$UTILITY2_DIR/utility2.js
  UTILITY2_SH=$UTILITY2_DIR/utility2
  if [ ! -f "$UTILITY2_SH" ]
    then UTILITY2_SH=$UTILITY2_SH.sh
  fi
  UTILITY2_SH_ECHO="$UTILITY2_SH mode-echo"

  ## init $SCRIPT var
  SCRIPT=":"

  ## parse argv
  ## http://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash
  while [[ $# > 0 ]]
  do
  case $1 in

  ## init ci build
  ci-build-init)
    SCRIPT="$SCRIPT && $CI_BUILD_SCRIPT_UPLOAD"
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
    SCRIPT="$SCRIPT ${@:2}"
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
    SCRIPT="$SCRIPT && cat $4 | $UTILITY2_JS"
    SCRIPT="$SCRIPT --db-github-file=$3"
    SCRIPT="$SCRIPT --mode-cli=dbGithubFileUpdate"
    SCRIPT="$SCRIPT --mode-db-github=$2"
    SCRIPT="$SCRIPT ${@:2}"
    ;;

  ## echo mode
  mode-echo)
    MODE_ECHO=1
    ;;

  postgres-install)
    if [ ! "$(which postgres)" ]
      then case $NODEJS_PROCESS_PLATFORM in
      darwin)
        ## install postgres
        SCRIPT="$SCRIPT && curl -3Ls"
        SCRIPT="$SCRIPT https://github.com/PostgresApp/PostgresApp/releases"
        SCRIPT="$SCRIPT/download/9.3.4.1/Postgres-9.3.4.1.zip"
        SCRIPT="$SCRIPT > /tmp/postgres.zip"
        SCRIPT="$SCRIPT && unzip -q /tmp/postgres.zip -d /Applications"
        ;;
      esac
    fi
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
    ## start saucelabs only if $SAUCELABS_READY_FILE doesn't exist
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
    SCRIPT="$SCRIPT; kill '$([ -f '$SAUCELABS_PID_FILE' ] && cat $SAUCELABS_PID_FILE)'"
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
    SCRIPT="$SCRIPT && cat $2 | $UTILITY2_JS"
    SCRIPT="$SCRIPT --mode-cli=headlessSaucelabs"
    SCRIPT="$SCRIPT --mode-npm-test"
    SCRIPT="$SCRIPT --server-port=49221"
    SCRIPT="$SCRIPT --tmpdir=tmp"
    SCRIPT="$SCRIPT $3"
    ;;

  ## test saucelabs
  saucelabs-test-platforms-list)
    SCRIPT="$SCRIPT && cat $2 | $UTILITY2_JS"
    SCRIPT="$SCRIPT --mode-cli=headlessSaucelabsPlatformsList"
    SCRIPT="$SCRIPT $3"
    ;;

  ## install slimerjs
  slimerjs-install)
    if [ ! "$(which slimerjs)" ]
      then SCRIPT="$SCRIPT && curl -3Ls"
      SCRIPT="$SCRIPT http://download.slimerjs.org/v0.9/0.9.1/slimerjs-0.9.1-"
      SCRIPT="$SCRIPT$(echo $NODEJS_PROCESS_PLATFORM | perl -ne 's/.*darwin$/mac/; s/linux/linux-x86_64/; print')"
      SCRIPT="$SCRIPT.tar.bz2"
      SCRIPT="$SCRIPT | tar -C /tmp -xjf -"
      ## add slimerjs to PATH
      SCRIPT="$SCRIPT && export PATH=\$PATH:/tmp/slimerjs-0.9.1"
    fi
    ;;

  ## start interactive utility2
  start)
    SCRIPT="$SCRIPT && $UTILITY2_JS --mode-repl --server-port=random --tmpdir=true"
    SCRIPT="$SCRIPT ${@:2}"
    ;;

  ## build utility2
  utility2-build)
    ## install postgres
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO postgres-install)"
    ## export POSTGRES_LOGIN
    if [ ! "$POSTGRES_LOGIN" ]
      then export POSTGRES_LOGIN=postgres://localhost/$USER
    fi
    ## install slimerjs
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO slimerjs-install)"
    if [ "$CODESHIP" ]
      ## export $CI_BUILD_DIR var
      then export CI_BUILD_DIR=/utility2.build.codeship.io
      ## init postgres
      export POSTGRES_LOGIN=postgres://$PG_USER:$PG_PASSWORD@localhost/test
    elif [ "$TRAVIS" ]
      ## export $CI_BUILD_DIR var
      then export CI_BUILD_DIR=/utility2.build.travis-ci.org
      ## export CI_* vars
      export CI_BRANCH=$TRAVIS_BRANCH
      export CI_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER
      export CI_COMMIT_ID=$TRAVIS_COMMIT
      ## init postgres
      SCRIPT="$SCRIPT && eval '/Applications/Postgres.app/Contents/MacOS/Postgres &'"
      export POSTGRES_LOGIN=postgres://localhost/$USER
    fi
    ## init ci build
    shCiBuildInit
    case $CI_BRANCH in
    ## run headless saucelabs browser tests
    browser)
      if [ ! "$CODESHIP" ]
        then exit
      fi
      ## add random salt to CI_BUILD_NUMBER to prevent conflict in re-runs
      export CI_BUILD_NUMBER="$CI_BUILD_NUMBER.$(openssl rand -hex 4)"
      ## npm install
      SCRIPT="$SCRIPT && npm install"
      ## spin up heroku dyno if it's sleeping
      SCRIPT="$SCRIPT && curl -3Ls"
      SCRIPT="$SCRIPT '$(echo $HEADLESS_SAUCELABS_URL | perl -ne 's/{.*//i; print')'"
      SCRIPT="$SCRIPT > /dev/null"
      ## run headless saucelabs browser tests
      SCRIPT="$SCRIPT; $($UTILITY2_SH_ECHO saucelabs-test-platforms-list .install/utility2-saucelabs.json)"
      ;;
    npm)
      ## install and test utility2 in /tmp dir with no external npm dependencies */
      SCRIPT="$SCRIPT && cd /tmp && rm -fr node_modules utility2"
      ## npm install utility2
      SCRIPT="$SCRIPT && npm install utility2"
      ## npm test utility2
      SCRIPT="$SCRIPT && cd node_modules/utility2 && npm test"
      ;;
    *)
      ## npm install
      SCRIPT="$SCRIPT && npm install"
      ## npm test
      SCRIPT="$SCRIPT && npm test"
      ;;
    esac
    ## upload ci build to github
    SCRIPT="$SCRIPT && $CI_BUILD_SCRIPT_UPLOAD"
    ;;

  ## build utility2-external
  utility2-external-build)
    ## build utility2-external
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

  ## called by npm run-script install
  utility2-npm-install)
    SCRIPT="$SCRIPT && mkdir -p .install/public"
    SCRIPT="$SCRIPT && $UTILITY2_JS --mode-cli=utility2NpmInstall"
    ## install utility2-external
    if [ ! -f .install/public/utility2-external.nodejs.rollup.js ]
      then SCRIPT="$SCRIPT && curl -3Ls"
      SCRIPT="$SCRIPT https://kaizhu256.github.io/utility2/utility2-external"
      SCRIPT="$SCRIPT/$UTILITY2_EXTERNAL_TAR_GZ"
      SCRIPT="$SCRIPT | tar -xzvf -"
    fi
    ;;

  ## called by npm run-script test
  utility2-npm-test)
    export SAUCE_USERNAME=kaizhu256
    NPM_TEST_ARGS="--mode-npm-test"
    ## test github db
    NPM_TEST_ARGS="$NPM_TEST_ARGS --mode-db-github=kaizhu256/blob/unstable"
    ## test postgres db
    NPM_TEST_ARGS="$NPM_TEST_ARGS --mode-db-postgres=\$POSTGRES_LOGIN"
    ## offline mode
    NPM_TEST_ARGS="$NPM_TEST_ARGS --mode-offline"
    ## test repl
    NPM_TEST_ARGS="$NPM_TEST_ARGS --mode-repl"
    NPM_TEST_ARGS="$NPM_TEST_ARGS --mode-test"
    ## use random server port
    NPM_TEST_ARGS="$NPM_TEST_ARGS --server-port=random"
    NPM_TEST_ARGS="$NPM_TEST_ARGS --test-module-dict={\\\"utility2\\\":true}"
    NPM_TEST_ARGS="$NPM_TEST_ARGS --tmpdir=tmp"
    ## npm test
    SCRIPT="$SCRIPT && $UTILITY2_JS $NPM_TEST_ARGS"
    SCRIPT="$SCRIPT --mode-coverage='\\butility2\\.'"
    SCRIPT="$SCRIPT --mode-debug-process"
    SCRIPT="$SCRIPT; EXIT_CODE=\$?"
    ## if test failed, then redo without code coverage
    SCRIPT="$SCRIPT; if [ \"\$EXIT_CODE\" != 0 ]"
      SCRIPT="$SCRIPT; then $UTILITY2_JS $NPM_TEST_ARGS"
      SCRIPT="$SCRIPT --mode-test-report-merge"
    SCRIPT="$SCRIPT; fi"
    SCRIPT="$SCRIPT; exit \$EXIT_CODE"
    ;;

  ## unknown option
  *)
    ;;

  esac
  shift
  done
  ## echo script
  if ([ "$MODE_ECHO" ] || [ "$SCRIPT" != ":" ])
    then echo $SCRIPT
  fi
  ## eval script
  if [ ! "$MODE_ECHO" ]
    ## save cwd
    then pushd "$(pwd)" > /dev/null
    eval "$SCRIPT"
    ## save exit code
    EXIT_CODE=$?
    ## restore cwd
    popd > /dev/null
    ## restore exit code
    exit $EXIT_CODE
  fi
}

shMain "$@"

