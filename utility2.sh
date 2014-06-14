#!/bin/sh
shAesDecrypt() {
  ## this function decrypts base64-encode stdin to stdout using aes-256-cbc
  ## save stdin to $TEXT
  local TEXT=$(cat /dev/stdin)
  ## init $IV from first 44 base64-encoded bytes of $TEXT
  local IV=$(printf ${TEXT:0:44} | base64 --decode)
  ## decrypt remaining base64-encoded bytes of $TEXT to stdout using aes-256-cbc
  printf "${TEXT:44}" | base64 --decode | openssl enc -aes-256-cbc -d -K $AES_256_KEY -iv $IV
}

shAesEncrypt() {
  ## this function encrypts stdin to base64-encode stdout,
  ## with a random iv prepended using aes-256-cbc
  ## init $IV from random 16 bytes
  local IV=$(openssl rand -hex 16)
  ## print base64-encoded $IV to stdout
  printf $(printf "$IV " | base64)
  ## encrypt stdin and stream to stdout using aes-256-cbc with base64-encoding
  openssl enc -aes-256-cbc -K $AES_256_KEY -iv $IV | base64 | tr -d "\n" || return $?
}

shCiBuildLog() {
  ## this function logs output about ci build state
  export MODE_CI_BUILD=$1
  printf "\n[MODE_CI_BUILD=$MODE_CI_BUILD] - $2\n\n" || return $?
}

shGitDeploy() {
  ## this function copies the app to /tmp/app with only the bare git repo files and public dir
  ## and then deploys it
  ## rm old /tmp/app
  rm -fr /tmp/app && mkdir -p /tmp/app || return $?
  ## tar / untar repo contents to /tmp/app, since we can't git clone a shallow repo
  git ls-tree -r HEAD --name-only | xargs tar -czf - | tar -C /tmp/app -xzvf - || return $?
  ## copy public dir
  cp -a public /tmp/app || return $?
  cd /tmp/app || return $?
  ## init .git and .git/config
  git init && cp $CWD/.install/git-config .git/config || return $?
  ## git commit /tmp/app
  rm -f .gitignore && git add . && git commit -am 'utility2 deploy' || return $?
  ## git deploy
  git push -f $1 HEAD:$2 || return $?
}

shModuleEval() {
  ## this function evals the module $1
  local FILE=$UTILITY2_DIR/utility2.js2
  local MODULE=$1
  ## init $SCRIPT
  local SCRIPT="var ii, script; global.state = { modeModuleEval: true, modeNodejs: true };"
  SCRIPT="$SCRIPT var script = require('fs').readFileSync(\"$FILE\", 'utf8');"
  SCRIPT="$SCRIPT ii = script.indexOf('\\n(function $MODULE() {\\n');"
  ## preserve lineno
  SCRIPT="$SCRIPT script = script.slice(0, ii).replace(/.*/g, '') + script.slice(ii);"
  SCRIPT="$SCRIPT script = script.slice(0, script.indexOf('\\n}') + 6);"
  SCRIPT="$SCRIPT require('vm').runInThisContext(script, \"$FILE\");"
  ## eval $SCRIPT
  node -e "$SCRIPT" "$@"
}

shTravisEncrypt() {
  ## this function travis-encrypts github repo $1's secret $2
  local GITHUB_REPO="$1"
  local SECRET="$2"
  ## get public rsa key from https://api.travis-ci.org/repos/<owner>/<repo>/key
  curl -3fLs https://api.travis-ci.org/repos/$GITHUB_REPO/key\
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

shUtility2ExternalBuild() {
  ## this function builds utility2-external
  ## create utility2-external rollup files
  ## init $ARGS
  local ARGS=""
  ARGS="$ARGS --mode-cli=rollupFileList"
  ARGS="$ARGS --mode-silent"
  ARGS="$ARGS --rollup-file-list"
  ARGS="$ARGS=public/utility2/utility2-external.browser.js"
  ARGS="$ARGS,public/utility2/utility2-external.nodejs.js"
  ARGS="$ARGS --tmpdir=tmp"
  $UTILITY2_JS $ARGS || return $?
  ## tar utility2-external build
  tar -czvf .install/$UTILITY2_EXTERNAL_TAR_GZ\
    public/utility2/utility2-external.browser.rollup.js\
    public/utility2/utility2-external.browser.rollup.min.js\
    public/utility2/utility2-external.nodejs.rollup.js\
    public/utility2/utility2-external.nodejs.rollup.min.js\
    || return $?
}

shUtility2ExternalBuildPublish() {
  ## this function publishes the utility2-external build
  ## upload $UTILITY2_EXTERNAL_TAR_GZ to github
  $UTILITY2_JS\
    --github-file=/utility2-external/$UTILITY2_EXTERNAL_TAR_GZ\
    --mode-cli=githubFileUpdate\
    --mode-github=kaizhu256/utility2/gh-pages\
    < .install/$UTILITY2_EXTERNAL_TAR_GZ\
    || return $?
}

shUtility2NpmInstall() {
  ## this function runs npm install
  ## mkdir .install public/utility2
  mkdir -p .install public/utility2 || return $?
  ## extract files from utility2.js2
  $UTILITY2_JS --mode-cli=npmInstall $@ || return $?
  ## run extra npm install code for utility2
  shUtility2NpmInstallUtility2 || return $?
}

shUtility2NpmInstallUtility2() {
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
        curl -3fLs https://bitbucket.org/ariya/phantomjs/downloads/$FILE.zip\
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
        curl -3fLs https://bitbucket.org/ariya/phantomjs/downloads/$FILE.tar.bz2\
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
      curl -3fLs http://download.slimerjs.org/releases/0.9.1/$FILE.tar.bz2\
        > /tmp/$FILE.tar.bz2 || return $?
    fi
    ## untar slimerjs
    tar -C .install -xjf /tmp/$FILE.tar.bz2 || return $?
    mv .install/slimerjs-0.9.1 .install/slimerjs || return $?
  fi
  ## install utility2-external
  if [ ! -f "public/utility2/utility2-external.nodejs.rollup.js" ]
  then
    echo curl -3fLs https://kaizhu256.github.io/utility2/utility2-external/$UTILITY2_EXTERNAL_TAR_GZ
    curl -3fLs https://kaizhu256.github.io/utility2/utility2-external/$UTILITY2_EXTERNAL_TAR_GZ\
      | tar -xzvf -\
      || return $?
  fi
}
shUtility2NpmStart() {
  ## this function runs npm start
  $UTILITY2_JS --mode-repl --server-port=random --tmpdir $@ || return $?
}

shUtility2NpmTest() {
  ## this function runs npm test
  ## init $ARGS
  local ARGS=""
  ## enable npm test mode
  ARGS="$ARGS --mode-npm-test"
  ## enable interactive repl debugger
  ARGS="$ARGS --mode-repl"
  ## enable test mode
  ARGS="$ARGS --mode-test"
  ## default to random server port
  ARGS="$ARGS --server-port=random"
  ## init tmpdir
  ARGS="$ARGS --tmpdir=tmp"
  ARGS="$ARGS $@"
  ## extra utility2 test args
  if [ "$NODEJS_PACKAGE_JSON_NAME" = utility2 ]
  then
    ## test github db
    ARGS="$ARGS --mode-github=kaizhu256/blob/unstable"
    ## offline mode
    ARGS="$ARGS --mode-offline"
  fi
  ## run npm test with coverage
  $UTILITY2_JS $ARGS --mode-coverage
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

shUtility2Main() {
  ## this function is the main program and parses argv
  ## return if argv is empty
  if [ "$#" = 0 ]
  then
    return
  fi
  ## init $UTILITY2_DIR
  if [ -f "./utility2.cli.js" ]
  then
    UTILITY2_DIR=$(pwd)
  else
    UTILITY2_DIR=$(node -e "require('utility2'); console.log(utility2.__dirname)")
  fi
  UTILITY2_JS=$UTILITY2_DIR/utility2.cli.js
  ## init nodejs env
  eval "$(shModuleEval moduleCliExportEnvNodejs)" || return $?
  UTILITY2_EXTERNAL_TAR_GZ=utility2-external.$(echo $NODEJS_PACKAGE_JSON_VERSION\
    | perl -ne "print \$1 if /(\d+\.\d+\.\d+)/").tar.gz
  ## save current dir to $CWD
  CWD="$(pwd)"
  ## init $EXIT_CODE
  EXIT_CODE=0
  ## eval argv
  "$@"
  ## save $EXIT_CODE
  EXIT_CODE=$?
  ## restore $CWD
  cd $CWD
  ## return $EXIT_CODE
  return $EXIT_CODE
}
## init utility2
shUtility2Main "$@"
