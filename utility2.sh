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
    if [ ! -f "/tmp/$NODEJS_VERSION/bin/npm" ]
      then curl -3Ls http://nodejs.org/dist/v0.10.26/$NODEJS_VERSION.tar.gz\
        | tar -C /tmp/ -xzf -
    fi
    ## export PATH var with nodejs / npm path
    export PATH=/tmp/$NODEJS_VERSION/bin:$PATH
  fi
}

shMain () {
  ## this function is the main program

  ## CI_BRANCH
  if [ ! "$CI_BRANCH" ]; then CI_BRANCH=TRAVIS_BRANCH; fi
  ## install nodejs / npm if necessary
  shNodejsInstall
  ## utility2 root directory
  ## if statement to avoid recursion loop
  if [ ! "$UTILITY2_DIR" ]
    then UTILITY2_DIR=$( cd "$( dirname "$0" )" && pwd )
    ## export nodejs env
    eval "$($UTILITY2_DIR/utility2.js --mode-cli=exportEnv --mode-silent)"
  fi
  # ## saucelabs vars
  # SAUCELABS_PID_FILE=/tmp/.saucelabs.pid
  # SAUCELABS_READY_FILE=/tmp/.saucelabs.ready
  # SAUCELABS_VERSION=$(echo $NODEJS_PROCESS_PLATFORM | perl -ne "s/darwin/osx/i; print")
  ## script var
  SCRIPT=":"
  ## utility2 vars
  UTILITY2_EXTERNAL_TAR_GZ=utility2_external.$NODEJS_PACKAGE_JSON_VERSION.tar.gz
  UTILITY2_JS=$UTILITY2_DIR/utility2.js
  UTILITY2_SH=$UTILITY2_DIR/utility2.sh
  UTILITY2_SH_ECHO="$UTILITY2_DIR/utility2.sh --mode-echo"

  ## parse argv
  ## http://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash
  while [[ $# > 0 ]]
  do
  case $1 in
  --mode-echo)
    MODE_ECHO=1
    ;;

  ## delete github file
  --github-file-delete)
    SCRIPT="$SCRIPT && $UTILITY2_JS"
    SCRIPT="$SCRIPT --dbGithubBranchFile=$2"
    SCRIPT="$SCRIPT --mode-cli=dbGithubBranchFileDelete"
    SCRIPT="$SCRIPT --mode-db-github=$GITHUB_OWNER_REPO_BRANCH"
    SCRIPT="$SCRIPT --mode-extra"
    SCRIPT="$SCRIPT --mode-silent"
    ;;

  ## update github file
  --github-file-update)
    SCRIPT="$SCRIPT && cat $3 | $UTILITY2_JS"
    SCRIPT="$SCRIPT --dbGithubBranchFile=$2"
    SCRIPT="$SCRIPT --mode-cli=dbGithubBranchFileUpdate"
    SCRIPT="$SCRIPT --mode-db-github=$GITHUB_OWNER_REPO_BRANCH"
    SCRIPT="$SCRIPT --mode-extra"
    SCRIPT="$SCRIPT --mode-silent"
    ;;

  # ## restart saucelabs
  # --saucelabs-restart)
    # ## stop saucelabs
    # SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO --saucelabs-stop)"
    # ## start saucelabs
    # SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO --saucelabs-start)"
    # ;;

  # ## start saucelabs if necessary
  # --saucelabs-start)
    # ## exit with error if saucelabs doesn't exist
    # SCRIPT="$SCRIPT && if [ ! -f $UTILITY2_DIR/.install/sc ]; then exit 1; fi"
    # ## perform a loop creating a sc connection until one succeeds
    # SCRIPT="$SCRIPT && while [ ! -f '$SAUCELABS_READY_FILE' ]"
      # SCRIPT="$SCRIPT; do eval '$UTILITY2_DIR/.install/sc --readyfile $SAUCELABS_READY_FILE &'"
      # SCRIPT="$SCRIPT; sleep 10"
    # SCRIPT="$SCRIPT; done"
    # ;;

  # ## stop saucelabs
  # --saucelabs-stop)
    # ## kill any script trying to start saucelabs connect to prevent race condition
    # SCRIPT="$SCRIPT; kill '$([ -f '$SAUCELABS_PID_FILE' ] && cat $SAUCELABS_PID_FILE)' 2>/dev/null"
    # ## kill old saucelabs connect
    # SCRIPT="$SCRIPT; killall sc 2>/dev/null"
    # ## save current script's pid
    # SCRIPT="$SCRIPT; echo $$ > $SAUCELABS_PID_FILE"
    # ## remove ready file
    # SCRIPT="$SCRIPT; rm -f $SAUCELABS_READY_FILE"
    # ;;

  # ## test url / platform combo with saucelabs
  # --saucelabs-test)
    # $UTILITY2_SH --saucelabs-start \
    # && curl -sX POST https://saucelabs.com/rest/v1/$SAUCE_USERNAME/js-tests \
      # -d @- -H 'Content-Type: application/json' -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY
    # ;;

  ## build utility2
  --utility2-build)
    case $CI_BRANCH in
    npm)
      ## install and test utility2 in /tmp dir with no external npm dependencies */
      SCRIPT="$SCRIPT && cd /tmp && rm -fr node_modules utility2"
      SCRIPT="$SCRIPT && npm install utility2 && cd node_modules/utility2 && npm test"
      ;;
    *)
      if [ "$CODESHIP" ]
        ## npm install
        then SCRIPT="$SCRIPT && npm install"
        # ## start saucelabs
        # ## https://saucelabs.com/docs/connect
        # SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO --saucelabs-restart)"
        ## npm test
        SCRIPT="$SCRIPT && npm test"
        ## test headless slimerjs
        SCRIPT="$SCRIPT --utility2-mode-headless-slimerjs=slimerjs"
        ## test github db
        SCRIPT="$SCRIPT --utility2-mode-db-github=kaizhu256/blob/unstable"
        ## test postgres db
        SCRIPT="$SCRIPT --utility2-mode-db-postgres=\$POSTGRES_LOGIN"
        # ## use saucelabs-friendly port
        # SCRIPT="$SCRIPT --utility2-server-port=49221"
        ## publish build
        SCRIPT="$SCRIPT && ./utility2.sh --utility2-publish-build"
        SCRIPT="$SCRIPT /utility2.build.codeship.io/latest.$CI_BRANCH"
        SCRIPT="$SCRIPT && ./utility2.sh --utility2-publish-build"
        SCRIPT="$SCRIPT /utility2.build.codeship.io/$CI_BUILD_NUMBER.$CI_BRANCH.$CI_COMMIT_ID"
      elif [ "$TRAVIS" ]
        ## npm install
        then SCRIPT="$SCRIPT && npm install"
        ## npm test
        SCRIPT="$SCRIPT && npm test"
        # ## test headless slimerjs
        # SCRIPT="$SCRIPT --utility2-mode-headless-slimerjs=slimerjs"
        # ## test github db
        # SCRIPT="$SCRIPT --utility2-mode-db-github=kaizhu256/blob/unstable"
        # ## test postgres db
        # SCRIPT="$SCRIPT --utility2-mode-db-postgres=\$POSTGRES_LOGIN"
        ## publish build
        SCRIPT="$SCRIPT && ./utility2.sh --utility2-publish-build"
        SCRIPT="$SCRIPT /utility2.build.travis-ci.org/latest.$TRAVIS_BRANCH"
        SCRIPT="$SCRIPT && ./utility2.sh --utility2-publish-build"
        SCRIPT="$SCRIPT /utility2.build.travis-ci.org/$TRAVIS_BUILD_NUMBER.$TRAVIS_BRANCH.$TRAVIS_COMMIT"
      else
        ## npm install
        SCRIPT="$SCRIPT && npm install"
        ## npm test
        SCRIPT="$SCRIPT && npm test"
      fi
      ;;
    esac
    ;;

  ## called by npm run-script build
  --utility2-external-build)
    ## build utility2_external
    SCRIPT="$SCRIPT && ./utility2.js"
    SCRIPT="$SCRIPT --mode-extra"
    SCRIPT="$SCRIPT --mode-silent"
    SCRIPT="$SCRIPT --rollup-file-list"
    SCRIPT="$SCRIPT=.install/public/utility2_external.browser.css"
    SCRIPT="$SCRIPT,.install/public/utility2_external.browser.js"
    SCRIPT="$SCRIPT,.install/public/utility2_external.shared.js"
    SCRIPT="$SCRIPT --tmpdir=true"
    SCRIPT="$SCRIPT && tar -czvf .install/$UTILITY2_EXTERNAL_TAR_GZ"
    SCRIPT="$SCRIPT .install/public/utility2_external.browser.rollup.css"
    SCRIPT="$SCRIPT .install/public/utility2_external.browser.rollup.js"
    SCRIPT="$SCRIPT .install/public/utility2_external.browser.rollup.min.css"
    SCRIPT="$SCRIPT .install/public/utility2_external.browser.rollup.min.js"
    SCRIPT="$SCRIPT .install/public/utility2_external.shared.rollup.js"
    SCRIPT="$SCRIPT .install/public/utility2_external.shared.rollup.min.js"
    ;;

  ## publish utility2_external on github
  --utility2-external-publish)
    SCRIPT="$SCRIPT && $UTILITY2_SH --github-file-update /utility2_external/$UTILITY2_EXTERNAL_TAR_GZ .install/$UTILITY2_EXTERNAL_TAR_GZ"
    ;;

  ## called by npm run-script install
  --utility2-npm-install)
    SCRIPT="$SCRIPT && mkdir -p .install/public"
    SCRIPT="$SCRIPT && ./utility2.js --mode-cli=utility2NpmInstall"
    ## install utility2_external
    if [ ! -f .install/public/utility2_external.shared.rollup.js ]
      then SCRIPT="$SCRIPT && curl -3Ls https://kaizhu256.github.io/blob/utility2_external"
      SCRIPT="$SCRIPT/$UTILITY2_EXTERNAL_TAR_GZ"
      SCRIPT="$SCRIPT | tar -xzvf -"
    fi
    # ## install saucelabs if necessary
    # if [ ! -f .install/sc ]
      # then case $NODEJS_PROCESS_PLATFORM in
      # linux)
        # SCRIPT="$SCRIPT && curl -3Ls https://saucelabs.com/downloads/sc-4.0-latest-$SAUCELABS_VERSION.tar.gz"
        # SCRIPT="$SCRIPT | tar -C .install -xzf -"
        # ;;
      # *)
        # SCRIPT="$SCRIPT && curl -3Ls https://saucelabs.com/downloads/sc-4.0-latest-$SAUCELABS_VERSION.zip"
        # SCRIPT="$SCRIPT > .install/sc.zip && unzip -q .install/sc.zip -d .install"
        # ;;
      # esac
      # SCRIPT="$SCRIPT && cp .install/sc-4.1-$SAUCELABS_VERSION/bin/sc .install/sc"
    # fi
    ;;

  ## called by npm run-script start
  --utility2-npm-start)
    SCRIPT="$SCRIPT && ./utility2.js --mode-extra --mode-repl --server-port=random --tmpdir=true"
    ;;

  ## called by npm run-script test
  --utility2-npm-test)
    ARGS="--mode-npm-test"
    ARGS="$ARGS --mode-extra"
    ARGS="$ARGS --mode-repl"
    ARGS="$ARGS --server-port=random"
    ARGS="$ARGS --test-module-dict={\\\"utility2\\\":true}"
    ARGS="$ARGS --tmpdir=tmp"
    ## npm test
    SCRIPT="$SCRIPT && ./utility2.js $ARGS"
    SCRIPT="$SCRIPT --mode-coverage='\\butility2\\.'"
    SCRIPT="$SCRIPT --mode-debug-process"
    SCRIPT="$SCRIPT; EXIT_CODE=\$?"
    ## if test failed, then redo without code coverage
    SCRIPT="$SCRIPT; if [ \"\$EXIT_CODE\" != 0 ]"
      SCRIPT="$SCRIPT; then ./utility2.js $ARGS"
    SCRIPT="$SCRIPT; fi"
    SCRIPT="$SCRIPT; exit \$EXIT_CODE"
    ;;

  ## publish build to github
  --utility2-publish-build)
    ## generage coverage badge
    SCRIPT="$SCRIPT && ./utility2.js"
    SCRIPT="$SCRIPT --mode-cli=coverageBadgeGenerate --mode-extra --tmpdir=tmp"
    ## publish build
    SCRIPT="$SCRIPT && for FILE in"
    SCRIPT="$SCRIPT cobertura-coverage.xml"
    SCRIPT="$SCRIPT coverage_summary.txt"
    SCRIPT="$SCRIPT coverage_badge.svg"
    SCRIPT="$SCRIPT lcov.info"
    SCRIPT="$SCRIPT lcov-report/index.html"
    SCRIPT="$SCRIPT lcov-report/prettify.css"
    SCRIPT="$SCRIPT lcov-report/prettify.js"
    SCRIPT="$SCRIPT lcov-report/utility2/index.html"
    SCRIPT="$SCRIPT lcov-report/utility2/utility2.js.html"
    SCRIPT="$SCRIPT lcov-report/utility2/utility2.js2.html"
    SCRIPT="$SCRIPT; do [ \$? == 0 ] && echo updating $2/\$FILE && cat tmp/\$FILE"
    SCRIPT="$SCRIPT | ./utility2.js"
    SCRIPT="$SCRIPT --dbGithubBranchFile=$2/\$FILE"
    SCRIPT="$SCRIPT --mode-cli=dbGithubBranchFileUpdate"
    SCRIPT="$SCRIPT --mode-db-github=kaizhu256/blob/gh-pages"
    SCRIPT="$SCRIPT --mode-extra"
    SCRIPT="$SCRIPT --mode-silent"
    SCRIPT="$SCRIPT; done"
    ;;

  ## unknown option
  *)
    ;;

  esac
  shift
  done
  ## echo script
  if ([ "$MODE_ECHO" ] || [ "$SCRIPT" != ":" ]); then echo $SCRIPT; fi
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

shMain $1 $2 $3 $4

