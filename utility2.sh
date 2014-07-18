#!/bin/sh
shAesDecrypt() {
  ## this function decrypts base64-encode stdin to stdout using aes-256-cbc
  ## save stdin to $TEXT
  local TEXT=$(cat /dev/stdin) || return $?
  ## init $IV from first 44 base64-encoded bytes of $TEXT
  local IV=$(printf $TEXT | cut -c1-44 | base64 --decode) || return $?
  ## decrypt remaining base64-encoded bytes of $TEXT to stdout using aes-256-cbc
  printf $TEXT |\
    cut -c45-9999 |\
    base64 --decode |\
    openssl enc -aes-256-cbc -d -K $AES_256_KEY -iv $IV || return $?
}

shAesDecryptTravis() {
  ## this function decrypts $AES_ENCRYPTED_SH in .travis.yml to stdout
  perl -ne "print \$2 if /(- AES_ENCRYPTED_SH: )(.*)( ## AES_ENCRYPTED_SH\$)/" .travis.yml |\
    shAesDecrypt || return $?
}

shAesEncrypt() {
  ## this function encrypts stdin to base64-encode stdout,
  ## with a random iv prepended using aes-256-cbc
  ## init $IV from random 16 bytes
  local IV=$(openssl rand -hex 16) || return $?
  ## print base64-encoded $IV to stdout
  printf $(printf "$IV " | base64) || return $?
  ## encrypt stdin and stream to stdout using aes-256-cbc with base64-encoding
  openssl enc -aes-256-cbc -K $AES_256_KEY -iv $IV | base64 | tr -d "\n" || return $?
}

shAesEncryptTravis() {
  ## this function encrypts the script $1 to $AES_ENCRYPTED_SH and stores it in .travis.yml
  ## init $FILE
  local FILE=$1/aes-decrypted.$(echo $GITHUB_REPO | perl -pe "s/\//./").sh || return $?
  if [ ! -f "$FILE" ]
  then
    printf "## non-existent file $FILE\n" || return $?
    return 1
  fi
  printf "## sourcing file $FILE ...\n" || return $?
  . $FILE || return $?
  if [ ! "$AES_256_KEY" ]
  then
    printf "## no \$AES_256_KEY detected in env - creating new AES_256_KEY ...\n" || return $?
    AES_256_KEY=$(openssl rand -hex 32) || return $?
    printf "## a new \$AES_256_KEY for encrypting data has been created.\n" || return $?
    printf "## you may want to copy the following to your .bashrc script\n" || return $?
    printf "## so you can run builds locally:\n" || return $?
    printf "export AES_256_KEY=$AES_256_KEY\n\n" || return $?
  fi
  printf "## travis-encrypting \$AES_256_KEY for $GITHUB_REPO ...\n" || return $?
  AES_256_KEY_ENCRYPTED=$(shTravisEncrypt $GITHUB_REPO \$AES_256_KEY=$AES_256_KEY) || return $?
  ## return non-zero exit code if $AES_256_KEY_ENCRYPTED is empty string
  if [ ! "$AES_256_KEY_ENCRYPTED" ]
  then
    return 1
  fi
  printf "## updating .travis.yml with encrypted key ...\n" || return $?
  perl -i -pe\
    "s%(- secure: )(.*)( ## AES_256_KEY$)%\$1$AES_256_KEY_ENCRYPTED\$3%"\
    .travis.yml || return $?

  printf "## updating .travis.yml with encrypted script ...\n" || return $?
  perl -i -pe\
    "s%(- AES_ENCRYPTED_SH: )(.*)( ## AES_ENCRYPTED_SH$)%\$1$(shAesEncrypt < $FILE)\$3%"\
    .travis.yml || return $?
}

shBuild() {
  ## this function builds the package
  ## decrypt and exec encrypted data
  eval "$(shAesDecryptTravis)" || return $?
  ## try to init travis-ci.org env
  if [ "$TRAVIS" ]
  then
    ## init xvfb
    ## http://docs.travis-ci.com/user/gui-and-headless-browsers/
    export DISPLAY=:99.0 && sh -e /etc/init.d/xvfb start || return $?
    export CI_BUILD_DIR=build.travis-ci.org || return $?
    export CI_BRANCH=$TRAVIS_BRANCH || return $?
    export CI_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER || return $?
    export CI_COMMIT_ID=$TRAVIS_COMMIT || return $?
  ## else init default env
  else
    export CI_BUILD_DIR=build.local || return $?
    export CI_BRANCH=local || return $?
    export CI_BUILD_NUMBER=0 || return $?
    export CI_COMMIT_ID=$(git rev-parse --verify HEAD) || return $?
  fi
  export CI_COMMIT_MESSAGE="$(git log -1 --pretty=%s)" || return $?
  export CI_COMMIT_INFO="$CI_COMMIT_ID - $CI_COMMIT_MESSAGE" || return $?
  ## run local npm test
  shBuildPrint npmTestLocal "npm testing $CWD ..." || return $?
  npm test || shBuildExit
  ## deploy app to heroku
  shBuildHerokuDeploy || shBuildExit
  ## run saucelabs test
  shBuildPrint saucelabsTest "running saucelabs tests ..." || shBuildExit
  export CI_BUILD_NUMBER_SAUCELABS=$CI_BUILD_NUMBER.$(openssl rand -hex 8) || shBuildExit
  node main.js --mode-cli=saucelabsTest --modeTestReportMerge || shBuildExit
  ## npm publish app if its version is greater than the published version
  shBuildNpmPublish || shBuildExit
  ## gracefully exit build
  shBuildExit
}

shBuildAppCopy() {
  ## this function copies the app to /tmp/app with only the bare git repo files
  ## init /tmp/app
  rm -fr /tmp/app && mkdir -p /tmp/app || return $?
  ## tar / untar repo contents to /tmp/app, since we can't git clone a shallow repo
  git ls-tree -r HEAD --name-only | xargs tar -czf - | tar -C /tmp/app -xzvf - || return $?
}

shBuildExit() {
  ## this function gracefully exits the build
  ## save $EXIT_CODE
  EXIT_CODE=$? || exit $?
  ## restore $CWD
  cd $CWD || exit $?
  ## cleanup $TMPFILE
  rm -f $TMPFILE || exit $?
  ## upload build to github
  if [ "$CI_BRANCH" != local ]
  then
    for DIR in\
      $CI_BUILD_DIR/latest.$CI_BRANCH\
      $CI_BUILD_DIR/$CI_BUILD_NUMBER.$CI_BRANCH.$CI_COMMIT_ID
    do
      for FILE in $(find .build -type f)
      do
        node utility2.js --mode-cli=githubContentsFilePush $FILE .build $DIR || exit $?
        ## throttle github file push
        sleep 1 || exit $?
      done
    done
  fi
  ## exit with $EXIT_CODE
  exit $EXIT_CODE
}

shBuildHerokuDeploy() {
  ## this function deploys the app to heroku
  ## init $HEROKU_REPO
  local HEROKU_REPO=$(git config --file .git-config --get remote.heroku.url |\
    perl -ne "print \$1 if /([^:]+)\.git$/") || return $?
  if [ ! "$GIT_SSH_KEY" ] || [ ! "$HEROKU_REPO" ]
  then
    return
  fi
  ## init $HEROKU_URL
  export HEROKU_URL=https://$HEROKU_REPO.herokuapp.com || return $?
  ## this function deploys the app to heroku
  shBuildPrint herokuDeploy "deploying $HEROKU_URL ..." || return $?
  ## export $GIT_SSH
  export GIT_SSH=$CWD/.install/git-ssh.sh || return $?
  ## export and create $GIT_SSH_KEY_FILE
  export GIT_SSH_KEY_FILE=$TMPFILE || return $?
  ## save $GIT_SSH_KEY to $GIT_SSH_KEY_FILE
  echo $GIT_SSH_KEY | base64 --decode > $GIT_SSH_KEY_FILE || return $?
  ## secure $GIT_SSH_KEY_FILE
  chmod 600 $GIT_SSH_KEY_FILE || return $?
  ## init clean repo in /tmp/app
  shBuildAppCopy && cd /tmp/app || return $?
  ## npm run-script install
  npm run-script install
  ## init .git
  git init || return $?
  ## init .git/config
  printf "\n[user]\nname=nobody\nemail=nobody\n" > .git/config || return $?
  ## rm .gitignore so we can git add everything
  rm -f .gitignore || return $?
  ## git add everything
  git add . || return $?
  ## git commit
  git commit -am "heroku deploy" || return $?
  if [ "$CI_BRANCH" != local ]
  then
    ## deploy app to heroku
    git push -f git@heroku.com:$HEROKU_REPO.git HEAD:master || return $?
    ## wait for deployment to finish
    sleep 10 || return $?
    ## check deployed webpage on heroku
    shBuildPrint herokuDeploy "checking deployed webpage $HEROKU_URL ..." || return $?
    curl -3fLs $HEROKU_URL > /dev/null
    ## save $EXIT_CODE
    EXIT_CODE=$? || return $?
    if [ "$EXIT_CODE" = 0 ]
    then
      shBuildPrint herokuDeploy "check passed" || return $?
    else
      shBuildPrint herokuDeploy "check failed" || return $?
    fi
  fi
  ## restore $CWD
  cd $CWD || return $?
  ## return $EXIT_CODE
  return $EXIT_CODE
}

shBuildNpmPublish() {
  ## this function npm publishes the app if its version is greater than the published version
  ## init $NODEJS_PACKAGE_JSON_NAME
  local NODEJS_PACKAGE_JSON_NAME=$(shPackageJsonGetItem name) || return $?
  ## init $NODEJS_PACKAGE_JSON_VERSION
  local NODEJS_PACKAGE_JSON_VERSION=$(shPackageJsonGetItem version) || return $?
  if [ "$CI_BRANCH" = local ] || [ ! "$NPM_AUTH" ]
  then
    return
  fi
  if shSemverGreaterThan\
    "$NODEJS_PACKAGE_JSON_VERSION"\
    "$(npm info $NODEJS_PACKAGE_JSON_NAME version 2>/dev/null)"
  then
    shBuildPrint npmPublish\
      "npm publishing $NODEJS_PACKAGE_JSON_NAME@$NODEJS_PACKAGE_JSON_VERSION ..." || return $?
    ## init .npmrc
    printf "_auth = $NPM_AUTH\nemail = nobody\n" > $HOME/.npmrc || return $?
    ## init clean repo in /tmp/app
    shBuildAppCopy && cd /tmp/app || return $?
    ## npm publish app
    npm publish || return $?
    shBuildPrint npmPublish "npm publish succeeded" || return $?
    ## wait for npm registry to sync
    sleep 10 || return $?
  fi
  shBuildPrint npmPublishedInstall\
    "npm installing published app $NODEJS_PACKAGE_JSON_NAME ..." || return $?
  ## npm install app in /tmp dir with no external npm dependencies
  ## cleanup /tmp
  cd /tmp && rm -fr node_modules $NODEJS_PACKAGE_JSON_NAME || return $?
  ## npm install app
  npm install $NODEJS_PACKAGE_JSON_NAME || return $?
  ## cd into app
  cd node_modules/$NODEJS_PACKAGE_JSON_NAME || return $?
  ## copy previous test-report.json into .build dir
  mkdir -p .build && cp $CWD/.build/test-report.json .build || return $?
  shBuildPrint npmPublishedTest\
    "npm testing published app $NODEJS_PACKAGE_JSON_NAME ..." || return $?
  ## npm test app and merge result into previous test-report.json
  npm test --mode-test-report-merge || return $?
  cp .build/test-report.* $CWD/.build
  ## restore $CWD
  cd $CWD
}

shBuildPrint() {
  ## this function prints info about the build state
  export MODE_CI_BUILD=$1 || return $?
  local MESSAGE="$2" || return $?
  printf "\n[MODE_CI_BUILD=$MODE_CI_BUILD] - $MESSAGE\n\n" || return $?
}

shGithubContentsDirPush() {
  ## this function pushes the local DIR1 $1 to the remote github DIR2 $2
  local DIR1=$1 || return $?
  local DIR2=$2 || return $?
  local FILE1 || return $?
  for FILE1 in $(find $DIR1 -type f)
  do
    node utility2.js --mode-cli=githubContentsFilePush $FILE1 $DIR1 $DIR2 || return $?
    ## throttle github file updates
    sleep 1 || return $?
  done
}

shPackageJsonGetItem() {
  ## this function prints the value for the given KEY $1 in package.json
  local KEY=$1 || return $?
  perl -ne "print \$1 if /  \"$KEY\": \"([^\"]+)/" package.json || return $?
}

shNpmInstall() {
  ## this function runs after npm install
  ## init .build .install dir
  mkdir -p .build .install || return $?
  ## install files from utility
  node utility2.js --mode-cli=npmInstall || return $?
  ## make .install/git-ssh.sh executable
  chmod 755 .install/git-ssh.sh || return $?
}

shNpmStart() {
  ## jslint example.js / main.js / utility2.js
  jslint-lite example.js main.js utility2.js
  ## this function runs npm start
  node main.js --mode-repl --server-port=$npm_config_server_port
}

shNpmTest() {
  ## this function runs npm test
  ## jslint example.js / main.js / utility2.js
  jslint-lite example.js main.js utility2.js
  ## npm install dev dependencies
  npm install || return $?
  ## run example.js
  node example.js || return $?
  ## init $ARGS
  local ARGS="main.js" || return $?
  ARGS="$ARGS --dir=.build/coverage-report" || return $?
  ARGS="$ARGS --print=detail" || return $?
  ARGS="$ARGS --report=html" || return $?
  ARGS="$ARGS --" || return $?
  ARGS="$ARGS --mode-cli=npmTest" || return $?
  ARGS="$ARGS --mode-repl" || return $?
  ARGS="$ARGS --server-port=random" || return $?
  ## create random authentication string for uploading test reports
  export MODE_TEST_REPORT_UPLOAD=$(openssl rand -hex 64) || return $?
  ## disable code coverage
  if [ "$npm_config_disable_coverage" ]
  then
    istanbul test $ARGS || return $?
    return $?
  fi
  ## remove old coverage report
  rm -fr .build/coverage-report || return $?
  ## npm test with coverage
  istanbul cover $ARGS --mode-coverage
  ## save $EXIT_CODE
  EXIT_CODE=$? || return $?
  ## create coverage badge
  node utility2.js --mode-cli=coverageReportBadgeCreate || return $?
  ## re-run npm test without coverage if tests failed,
  ## so we can debug line numbers in stack trace
  if [ "$EXIT_CODE" != 0 ]
  then
    ## npm test without coverage
    istanbul test $ARGS || return $?
  fi
  ## return $EXIT_CODE
  return $EXIT_CODE
}

shSandbox() {
  ## this function is for sandboxing
  ## decrypt and exec encrypted data
  eval "$(shAesDecryptTravis)" || return $?
}

shSemverGreaterThan() {
  ## function return 0 if semver $1 is greater than semver $2 or 1 otherwise
  local REGEXP="([0-9]+)\.([0-9]+)\.([0-9]+)([0-9A-Za-z-]*)" || return $?
  MAJOR1=$(echo $1 | perl -ne "print \$1 if /$REGEXP/") || return $?
  MINOR1=$(echo $1 | perl -ne "print \$2 if /$REGEXP/") || return $?
  PATCH1=$(echo $1 | perl -ne "print \$3 if /$REGEXP/") || return $?
  SPECIAL1=$(echo $1 | perl -ne "print \$4 if /$REGEXP/") || return $?
  MAJOR2=$(echo $2 | perl -ne "print \$1 if /$REGEXP/") || return $?
  MINOR2=$(echo $2 | perl -ne "print \$2 if /$REGEXP/") || return $?
  PATCH2=$(echo $2 | perl -ne "print \$3 if /$REGEXP/") || return $?
  SPECIAL2=$(echo $2 | perl -ne "print \$4 if /$REGEXP/") || return $?
  ## return 1 if invalid semver $1 or semver $2
  if [ ! "$MAJOR1" ] || [ ! "$MAJOR2" ]
  then
    return 1
  ## return 0 if $MAJOR1 > $MAJOR2
  elif [ $MAJOR1 -gt $MAJOR2 ]
  then
    return 0
  ## return 1 if $MAJOR1 < $MAJOR2
  elif [ $MAJOR1 -lt $MAJOR2 ]
  then
    return 1
  ## return 0 if $MINOR1 > $MINOR2
  elif [ $MINOR1 -gt $MINOR2 ]
  then
    return 0
  ## return 1 if $MINOR1 < $MINOR2
  elif [ $MINOR1 -lt $MINOR2 ]
  then
    return 1
  ## return 0 if $PATCH1 > $PATCH2
  elif [ $PATCH1 -gt $PATCH2 ]
  then
    return 0
  ## return 1 if $PATCH1 < $PATCH2
  elif [ $PATCH1 -lt $PATCH2 ]
  then
    return 1
  ## return 0 if $SPECIAL1 is empty and $SPECIAL2 is non-empty
  elif [ ! "$SPECIAL1" ] && [ "$SPECIAL2" ]
  then
    return 0
  ## return 0 if $SPECIAL1 > $SPECIAL2
  elif [ "$SPECIAL1" \> $SPECIAL2 ]
  then
    return 0
  ## return 1 otherwise
  else
    return 1
  fi
}

shSshkeygen() {
  ## this function generates a ssh key
  ssh-keygen -C "git" -f $TMPFILE -N "" -t rsa && base64 < $TMPFILE | tr -d "\n" || return $?
  ## cleanup $TMPFILE.pub
  rm -f /tmp/$TMPFILE.pub
}

shSshkeygenPublic() {
  ## this function prints the public key generated from $GIT_SSH_KEY
  printf $GIT_SSH_KEY | base64 --decode > $TMPFILE && chmod 600 $TMPFILE || return $?
  ssh-keygen -y -f $TMPFILE || return $?
}

shTravisEncrypt() {
  ## this function travis-encrypts github repo $1's secret $2
  local GITHUB_REPO=$1 || return $?
  local SECRET=$2 || return $?
  ## get public rsa key from https://api.travis-ci.org/repos/<owner>/<repo>/key
  curl -3fLs https://api.travis-ci.org/repos/$GITHUB_REPO/key |\
    perl -pe "s/[^-]+(.+-).+/\$1/; s/\\\\n/\n/g; s/ RSA / /g" >\
    $TMPFILE || return $?
  ## rsa-encrypt $SECRET and print it
  printf "$SECRET" |\
    openssl rsautl -encrypt -pubin -inkey $TMPFILE |\
    base64 |\
    tr -d "\n" || return $?
}

shMain() {
  ## this function is the main program and parses argv
  ## return if argv is empty
  if [ "$#" = 0 ]
  then
    return
  fi
  ## save $CWD
  CWD=$(pwd) || return $?
  ## init $GITHUB_REPO
  export GITHUB_REPO=$(git config --file .git-config --get remote.origin.url |\
    perl -ne "print \$1 if /([^:]+)\.git$/") || return $?
  ## init $PATH with $CWD/node_modules
  export PATH=$CWD/node_modules/.bin:$PATH || return $?
  ## init $TMPFILE
  export TMPFILE=/tmp/tmpfile.$(openssl rand -hex 8) || return $?
  ## init $EXIT_CODE
  EXIT_CODE=0 || return $?
  ## eval argv
  "$@"
  ## save $EXIT_CODE
  EXIT_CODE=$? || return $?
  ## restore $CWD
  cd $CWD || return $?
  ## cleanup $TMPFILE
  rm -f $TMPFILE || return $?
  ## return $EXIT_CODE
  return $EXIT_CODE
}
## int main routine
shMain "$@"
