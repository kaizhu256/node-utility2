#!/bin/bash

shNodejsInstall () {
  ## this function installs nodejs / npm if necesary
  if [ ! "$(which npm)" ]
    ## nodejs cpu architecture
    then NODEJS_PROCESS_ARCH=$(uname -m | perl -ne "s/arm.*/arm/i; s/i.86.*/i386/i; s/amd64/x64/i; s/x86_64/x64/i; print lc")
    ## nodejs os platform
    NODEJS_PROCESS_PLATFORM=$(uname | perl -ne "s/.*bsd$/bsd/i; print lc")
    ## nodejs version
    NODEJS_VERSION=node-v0.10.26-$NODEJS_PROCESS_PLATFORM-$NODEJS_PROCESS_ARCH
    if [ ! -f "/tmp/$NODEJS_VERSION/bin/npm" ]
      then curl -3Ls http://nodejs.org/dist/v0.10.26/$NODEJS_VERSION.tar.gz | tar -C /tmp/ -xzf -
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
  [ "$UTILITY2_DIR" ] || UTILITY2_DIR=$( cd "$( dirname "$0" )" && pwd )
  ## export nodejs env
  eval "$($UTILITY2_DIR/utility2.js --mode-cli=exportEnv)"
  ## saucelabs vars
  SAUCELABS_PID_FILE=/tmp/.saucelabs.pid
  SAUCELABS_READY_FILE=/tmp/.saucelabs.ready
  SAUCELABS_VERSION=$(echo $NODEJS_PROCESS_PLATFORM | perl -ne "s/darwin/osx/i; print")
  ## script var
  SCRIPT=":"
  ## utility2 vars
  UTILITY2_EXTERNAL_TAR_GZ=utility2_external.$NODEJS_PACKAGE_JSON_VERSION.tar.gz
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

  ## restart saucelabs
  --saucelabs-restart)
    ## stop saucelabs
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO --saucelabs-stop)"
    ## start saucelabs
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO --saucelabs-start)"
    ;;

  ## start saucelabs if necessary
  --saucelabs-start)
    ## perform a loop creating a sc connection until one succeeds
    SCRIPT="$SCRIPT && while [ ! -f '$SAUCELABS_READY_FILE' ]"
      SCRIPT="$SCRIPT; do eval '$UTILITY2_DIR/.install/sc --readyfile $SAUCELABS_READY_FILE &'"
      SCRIPT="$SCRIPT; sleep 10"
    SCRIPT="$SCRIPT; done"
    ;;

  ## stop saucelabs
  --saucelabs-stop)
    ## kill any script trying to start saucelabs connect to prevent race condition
    SCRIPT="$SCRIPT; kill '$([ -f '$SAUCELABS_PID_FILE' ] && cat $SAUCELABS_PID_FILE)' 2>/dev/null"
    ## kill old saucelabs connect
    SCRIPT="$SCRIPT; killall sc 2>/dev/null"
    ## save current script's pid
    SCRIPT="$SCRIPT; echo $$ > $SAUCELABS_PID_FILE"
    ## remove ready file
    SCRIPT="$SCRIPT; rm -f $SAUCELABS_READY_FILE"
    ;;

  # ## test url / platform combo with saucelabs
  # --saucelabs-test)
    # $UTILITY2_SH --saucelabs-start \
    # && curl -sX POST https://saucelabs.com/rest/v1/$SAUCE_USERNAME/js-tests \
      # -d @- -H 'Content-Type: application/json' -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY
    # ;;

  ## build utility2 on codeship.io - part 1
  --utility2-build-codeship)
    if [ "$CI_BRANCH" == test ]
      then SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO --utility2-update)"
    fi
    SCRIPT="$SCRIPT && $UTILITY2_SH --utility2-build-codeship2"
    ;;

  ## build utility2 on codeship.io - part 2
  --utility2-build-codeship2)
    ## npm install
    ## start saucelabs
    SCRIPT="$SCRIPT && npm install"
    SCRIPT="$SCRIPT && npm install coveralls"
    SCRIPT="$SCRIPT && $($UTILITY2_SH_ECHO --saucelabs-restart)"
    ## use saucelabs-friendly port
    ## https://saucelabs.com/docs/connect
    SCRIPT="$SCRIPT && npm test --utility2-timeout-default=300000 --utility2-server-port=49221"
    ## upload coverage info to coveralls.io
    SCRIPT="$SCRIPT && cat tmp/lcov.info | node_modules/.bin/coveralls"
    ;;

  ## called by npm run-script build
  --utility2-build-external)
    ## build utility2_external
    SCRIPT="$SCRIPT && cd '$UTILITY2_DIR'"
    SCRIPT="$SCRIPT && ./utility2.js --mode-silent --rollup-file-list"
    SCRIPT="$SCRIPT .install/public/utility2_external.browser.css"
    SCRIPT="$SCRIPT,.install/public/utility2_external.browser.js"
    SCRIPT="$SCRIPT,.install/public/utility2_external.shared.js"
    SCRIPT="$SCRIPT && tar -czvf .install/$UTILITY2_EXTERNAL_TAR_GZ"
    SCRIPT="$SCRIPT .install/public/utility2_external.browser.rollup.css"
    SCRIPT="$SCRIPT .install/public/utility2_external.browser.rollup.js"
    SCRIPT="$SCRIPT .install/public/utility2_external.browser.rollup.min.css"
    SCRIPT="$SCRIPT .install/public/utility2_external.browser.rollup.min.js"
    SCRIPT="$SCRIPT .install/public/utility2_external.shared.rollup.js"
    SCRIPT="$SCRIPT .install/public/utility2_external.shared.rollup.min.js"
    ;;

  ## build utility2 on travis-ci.org - part 1
  --utility2-build-travis)
    SCRIPT="$SCRIPT && if [ '$TRAVIS_BRANCH' == test ]"
    SCRIPT="$SCRIPT; then $($UTILITY2_SH_ECHO --utility2-update); fi"
    SCRIPT="$SCRIPT && $UTILITY2_SH --utility2-build-travis2"
    ;;

  ## build utility2 on travis-ci.org - part 2
  --utility2-build-travis2)
    ## npm install
    SCRIPT="$SCRIPT && npm install"
    SCRIPT="$SCRIPT && npm test"
    ;;

  ## called by npm run-script install
  --utility2-npm-install)
    SCRIPT="$SCRIPT && ./utility2.js --utility2-npm-install"
    ## install utility2_external
    SCRIPT="$SCRIPT && curl -3Ls https://github.com/kaizhu256/kaizhu256.github.io/releases/download/file/$UTILITY2_EXTERNAL_TAR_GZ | tar -xzvf -"
    ## install saucelabs if necessary
    if [ ! -f .install/sc ]
      then case $NODEJS_PROCESS_PLATFORM in
      linux)
        SCRIPT="$SCRIPT && curl -3Ls https://saucelabs.com/downloads/sc-4.0-latest-$SAUCELABS_VERSION.tar.gz"
        SCRIPT="$SCRIPT | tar -C .install -xzf -"
        ;;
      *)
        SCRIPT="$SCRIPT && curl -3Ls https://saucelabs.com/downloads/sc-4.0-latest-$SAUCELABS_VERSION.zip"
        SCRIPT="$SCRIPT > .install/sc.zip && unzip -q .install/sc.zip -d .install"
        ;;
      esac
      SCRIPT="$SCRIPT && cp .install/sc-4.0-$SAUCELABS_VERSION/bin/sc .install/sc"
    fi
    ;;

  ## called by npm run-script start
  --utility2-npm-start)
    SCRIPT="$SCRIPT && ./utility2.js --mode-extra --mode-repl --server-port random"
    ;;

  ## called by npm run-script test
  --utility2-npm-test)
    SCRIPT="$SCRIPT && ./utility2.js --mode-coverage '\\butility2\\.js$' --mode-npm-test-utility2"
    SCRIPT="$SCRIPT && ./utility2.js --mode-coverage '\\butility2\\.js$' --mode-extra --mode-npm-test-utility2"
    SCRIPT="$SCRIPT; EXIT_STATUS=\$?"
    ## if test failed, then redo without code coverage
    SCRIPT="$SCRIPT; if [ '\$EXIT_STATUS' != 0 ]"
      SCRIPT="$SCRIPT; then ./utility2.js --mode-extra --mode-npm-test-utility2"
    SCRIPT="$SCRIPT; fi"
    SCRIPT="$SCRIPT; exit \$EXIT_STATUS"
    ;;

  ## publish utility2_external on github
  --utility2-publish-external)
    SCRIPT="$SCRIPT && cd '$UTILITY2_DIR'"
    SCRIPT="$SCRIPT && ./utility2.js --github-release-upload-file-list .install/$UTILITY2_EXTERNAL_TAR_GZ"
    ;;

  ## update utility2
  --utility2-update)
    SCRIPT="$SCRIPT && cd $UTILITY2_DIR"
    ## update utility2.js2
    SCRIPT="$SCRIPT && curl -3Ls https://raw.githubusercontent.com/kaizhu256/kaizhu256.github.io/master/utility2.js2 > utility2.js2"
    ## update utility2.sh
    SCRIPT="$SCRIPT && curl -3Ls https://raw.githubusercontent.com/kaizhu256/kaizhu256.github.io/master/utility2.sh > utility2.sh"
    SCRIPT="$SCRIPT && chmod 755 utility2.sh"
    ;;

  ## unknown option
  *)
    ;;

  esac
  shift
  done
  ## echo script
  if [ "$SCRIPT" != ":" ] || [ "$MODE_ECHO" ]; then echo $SCRIPT; fi
  ## eval script
  if [ "$SCRIPT" != ":" ] && [ ! "$MODE_ECHO" ]; then eval "$SCRIPT"; fi
}

shMain $1 $2 $3 $4

