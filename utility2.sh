#!/bin/bash

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
      then curl -3Ls http://nodejs.org/dist/v0.10.26/$NODEJS_VERSION.tar.gz\
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
  ## if statement to avoid recursion loop
  if [ ! "$UTILITY2_DIR" ]
    then UTILITY2_DIR=$( cd "$( dirname "$0" )" && pwd )
    ## export nodejs env
    eval "$($UTILITY2_DIR/utility2.js --mode-cli=exportEnv --mode-silent)"
  fi

  ## init $SCRIPT var
  SCRIPT=":"

  ## $UTILITY2_* vars
  UTILITY2_EXTERNAL_TAR_GZ=utility2_external.$NODEJS_PACKAGE_JSON_VERSION.tar.gz
  UTILITY2_JS=$UTILITY2_DIR/utility2.js
  UTILITY2_SH=$UTILITY2_DIR/utility2
  if [ ! -f "$UTILITY2_SH" ]
    then UTILITY2_SH=$UTILITY2_SH.sh
  fi
  UTILITY2_SH_ECHO="$UTILITY2_SH mode-echo"

  ## parse argv
  ## http://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash
  while [[ $# > 0 ]]
  do
  case $1 in
  mode-echo)
    MODE_ECHO=1
    ;;

  ## delete github file
  db-github-branch-file-delete)
    SCRIPT="$SCRIPT && echo deleting"
    SCRIPT="$SCRIPT https://raw.githubusercontent.com/$2$3"
    SCRIPT="$SCRIPT --db-github-branch-file=$3"
    SCRIPT="$SCRIPT --mode-cli=dbGithubBranchFileDelete"
    SCRIPT="$SCRIPT --mode-db-github=$2"
    SCRIPT="$SCRIPT --mode-silent"
    ;;

  ## update github file
  db-github-branch-file-update)
    SCRIPT="$SCRIPT && echo updating"
    SCRIPT="$SCRIPT https://raw.githubusercontent.com/$2$3"
    SCRIPT="$SCRIPT && cat $4 | $UTILITY2_JS"
    SCRIPT="$SCRIPT --db-github-branch-file=$3"
    SCRIPT="$SCRIPT --mode-cli=dbGithubBranchFileUpdate"
    SCRIPT="$SCRIPT --mode-db-github=$2"
    SCRIPT="$SCRIPT --mode-silent"
    SCRIPT="$SCRIPT --mode-timeout-default=120000"
    SCRIPT="$SCRIPT ${@:2}"
    ;;

  ## github merge head branch $4 to base branch $3 in user/repo $2
  db-github-branch-merge)
    ## security - avoid $SCRIPT macro to hide $GITHUB_TOKEN
    curl https://api.github.com/repos/$2/merges\
      --data-binary "{\"base\":\"$3\",\"head\":\"$4\"}"\
      --dump-header -\
      --header "Authorization: token $GITHUB_TOKEN"\
    && exit $?
    ;;

  ## install saucelabs
  saucelabs-install)
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
      SCRIPT="$SCRIPT && cp .install/sc-4.1-$SAUCELABS_VERSION/bin/sc .install/sc"
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

  ## start interactive utility2
  start)
    SCRIPT="$SCRIPT && $UTILITY2_JS --mode-repl --server-port=random --tmpdir=true"
    SCRIPT="$SCRIPT ${@:2}"
    ;;

  ## build utility2
  utility2-build)
    if [ "$CODESHIP" ]
      ## init $ARTIFACT_DIR var
      then ARTIFACT_DIR=/utility2.build.codeship.io
      ## init postgres
      export POSTGRES_LOGIN=postgres://$PG_USER:$PG_PASSWORD@localhost/test
    elif [ "$TRAVIS" ]
      ## init $ARTIFACT_DIR var
      then ARTIFACT_DIR=/utility2.build.travis-ci.org
      ## export CI_* vars
      export CI_BRANCH=$TRAVIS_BRANCH
      export CI_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER
      export CI_COMMIT_ID=$TRAVIS_COMMIT
      ## install postgres
      SCRIPT="$SCRIPT && curl -3Ls"
      SCRIPT="$SCRIPT https://github.com/PostgresApp/PostgresApp/releases"
      SCRIPT="$SCRIPT/download/9.3.4.1/Postgres-9.3.4.1.zip"
      SCRIPT="$SCRIPT > /tmp/postgres.zip"
      SCRIPT="$SCRIPT && unzip -q /tmp/postgres.zip -d /Applications"
      ## init postgres
      SCRIPT="$SCRIPT && eval '/Applications/Postgres.app/Contents/MacOS/Postgres&'"
      export POSTGRES_LOGIN=postgres://localhost/$USER
      ## install slimerjs
      SCRIPT="$SCRIPT && curl -3Ls"
      SCRIPT="$SCRIPT http://download.slimerjs.org/v0.9/0.9.1/slimerjs-0.9.1-mac.tar.bz2"
      SCRIPT="$SCRIPT | tar -C /tmp -xzf -"
      ## add slimerjs to PATH
      SCRIPT="$SCRIPT && export PATH=\$PATH:/tmp/slimerjs-0.9.1"
    else
      ## export CI_* vars
      export CI_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
      export CI_COMMIT_ID="$(git rev-parse --verify HEAD)"
    fi
    case $CI_BRANCH in
    ## run headless saucelabs browser tests
    browser)
      if [ ! "$CODESHIP" ]
        then exit
      fi
      ## add random salt to CI_BUILD_NUMBER to prevent conflict in re-runs
      export CI_BUILD_NUMBER="$CI_BUILD_NUMBER.$(openssl rand -base64 6)"
      ## set test url
      HEADLESS_SAUCELABS_URL="https://utility2-unstable.herokuapp.com/test/test.html#modeTest=1"
      ## npm install
      SCRIPT="$SCRIPT && npm install"
      ## spin up heroku dyno if it's sleeping
      SCRIPT="$SCRIPT && curl -3Ls $HEADLESS_SAUCELABS_URL > /dev/null"
      ## remove old test report
      SCRIPT="$SCRIPT && rm -f tmp/test_report.json"
      ## run saucelabs tests for each of the given os platforms
      SCRIPT="$SCRIPT && for FILE in"
      SCRIPT="$SCRIPT .install/utility2_saucelabs.android.json"
      SCRIPT="$SCRIPT .install/utility2_saucelabs.ios.json"
      SCRIPT="$SCRIPT .install/utility2_saucelabs.linux.json"
      SCRIPT="$SCRIPT .install/utility2_saucelabs.osx.json"
      SCRIPT="$SCRIPT .install/utility2_saucelabs.windows.json"
        SCRIPT="$SCRIPT; do $($UTILITY2_SH_ECHO saucelabs-test \$FILE)"
        SCRIPT="$SCRIPT --headless-saucelabs-url=$HEADLESS_SAUCELABS_URL"
        SCRIPT="$SCRIPT --mode-test-report-merge"
      SCRIPT="$SCRIPT; done"
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
    ## save EXIT_CODE
    SCRIPT="$SCRIPT; EXIT_CODE=\$?"
    if [ $ARTIFACT_DIR ]
      ## publish build to $ARTIFACT_DIR/latest.$CI_BRANCH
      then SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO utility2-build-publish $ARTIFACT_DIR/latest.$CI_BRANCH)"
      ## publish build to $ARTIFACT_DIR/$CI_BUILD_NUMBER.$CI_BRANCH.$CI_COMMIT_ID
      SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO utility2-build-publish $ARTIFACT_DIR/$CI_BUILD_NUMBER.$CI_BRANCH.$CI_COMMIT_ID)"
      ## exit with error if publish fails
      SCRIPT="$SCRIPT || exit \$?"
    fi
    SCRIPT="$SCRIPT; exit \$EXIT_CODE"
    ;;

  ## publish utility2 build to github
  utility2-build-publish)
    ## publish files
    SCRIPT="$SCRIPT && for FILE in"
    SCRIPT="$SCRIPT coverage_report/coverage_report.badge.svg"
    SCRIPT="$SCRIPT coverage_report/coverage_report.cobertura.xml"
    SCRIPT="$SCRIPT coverage_report/coverage_report.lcov.info"
    SCRIPT="$SCRIPT coverage_report/index.html"
    SCRIPT="$SCRIPT coverage_report/prettify.css"
    SCRIPT="$SCRIPT coverage_report/prettify.js"
    SCRIPT="$SCRIPT coverage_report/utility2/index.html"
    SCRIPT="$SCRIPT coverage_report/utility2/utility2.js.html"
    SCRIPT="$SCRIPT coverage_report/utility2/utility2.js2.html"
    SCRIPT="$SCRIPT test_report.badge.svg"
    SCRIPT="$SCRIPT test_report.html"
    SCRIPT="$SCRIPT test_report.json"
      ## exit loop if file update fails
      SCRIPT="$SCRIPT; do [ \$? == 0 ]"
      ## check if file exists
      SCRIPT="$SCRIPT && if [ -f tmp/\$FILE ]"
        ## add delay interval between file updates to prevent race conditions
        SCRIPT="$SCRIPT; then sleep 1"
        ## update file
        SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO db-github-branch-file-update kaizhu256/blob/gh-pages $2/\$FILE tmp/\$FILE)"
      SCRIPT="$SCRIPT; fi"
    SCRIPT="$SCRIPT; done"
    ;;

  ## called by npm run-script build
  utility2-external-build)
    ## build utility2_external
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO utility2-npm-install)"
    SCRIPT="$SCRIPT && ./utility2.js"
    SCRIPT="$SCRIPT --mode-cli=rollupFileList"
    SCRIPT="$SCRIPT --mode-silent"
    SCRIPT="$SCRIPT --rollup-file-list"
    SCRIPT="$SCRIPT .install/public/utility2_external.browser.js"
    SCRIPT="$SCRIPT,.install/public/utility2_external.nodejs.js"
    SCRIPT="$SCRIPT --tmpdir=tmp"
    SCRIPT="$SCRIPT && tar -czvf .install/$UTILITY2_EXTERNAL_TAR_GZ"
    SCRIPT="$SCRIPT .install/public/utility2_external.browser.rollup.js"
    SCRIPT="$SCRIPT .install/public/utility2_external.browser.rollup.min.js"
    SCRIPT="$SCRIPT .install/public/utility2_external.nodejs.rollup.js"
    SCRIPT="$SCRIPT .install/public/utility2_external.nodejs.rollup.min.js"
    ;;

  ## publish utility2_external on github
  utility2-external-build-publish)
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO db-github-branch-file-update kaizhu256/blob/gh-pages /utility2_external/$UTILITY2_EXTERNAL_TAR_GZ .install/$UTILITY2_EXTERNAL_TAR_GZ)"
    ;;

  ## called by npm run-script install
  utility2-npm-install)
    SCRIPT="$SCRIPT && mkdir -p .install/public"
    SCRIPT="$SCRIPT && ./utility2.js --mode-cli=utility2NpmInstall"
    ## install utility2_external
    if [ ! -f .install/public/utility2_external.nodejs.rollup.js ]
      then SCRIPT="$SCRIPT && curl -3Ls"
      SCRIPT="$SCRIPT https://kaizhu256.github.io/blob/utility2_external"
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
    SCRIPT="$SCRIPT && ./utility2.js $NPM_TEST_ARGS"
    SCRIPT="$SCRIPT --mode-coverage='\\butility2\\.'"
    SCRIPT="$SCRIPT --mode-debug-process"
    SCRIPT="$SCRIPT; EXIT_CODE=\$?"
    ## if test failed, then redo without code coverage
    SCRIPT="$SCRIPT; if [ \"\$EXIT_CODE\" != 0 ]"
      SCRIPT="$SCRIPT; then ./utility2.js $NPM_TEST_ARGS"
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

shMain $@

