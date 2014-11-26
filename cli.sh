#!/bin/sh
shAesDecrypt() {
  # this function decrypts base64-encode stdin to stdout using aes-256-cbc
  # save stdin to $TEXT
  local TEXT=$(cat /dev/stdin) || return $?
  # init $IV from first 44 base64-encoded bytes of $TEXT
  local IV=$(printf $TEXT | cut -c1-44 | base64 --decode) || return $?
  # decrypt remaining base64-encoded bytes of $TEXT to stdout using aes-256-cbc
  printf $TEXT |\
    cut -c45-9999 |\
    base64 --decode |\
    openssl enc -aes-256-cbc -d -K $AES_256_KEY -iv $IV || return $?
}

shAesDecryptTravis() {
  # this function decrypts $AES_ENCRYPTED_SH in .travis.yml to stdout
  perl -ne "print \$1 if /- AES_ENCRYPTED_SH: (.*) # AES_ENCRYPTED_SH\$/" .travis.yml |\
    shAesDecrypt || return $?
}

shAesEncrypt() {
  # this function encrypts stdin to base64-encode stdout,
  # with a random iv prepended using aes-256-cbc
  # init $IV from random 16 bytes
  local IV=$(openssl rand -hex 16) || return $?
  # print base64-encoded $IV to stdout
  printf $(printf "$IV " | base64) || return $?
  # encrypt stdin and stream to stdout using aes-256-cbc with base64-encoding
  openssl enc -aes-256-cbc -K $AES_256_KEY -iv $IV | base64 | tr -d "\n" || return $?
}

shAesEncryptTravis() {
  # this function encrypts the script $1 to $AES_ENCRYPTED_SH and stores it in .travis.yml
  # init $FILE
  local FILE=$1/aes-decrypted.$(printf $GITHUB_REPO | perl -pe "s/\//./").sh || return $?
  if [ ! -f "$FILE" ]
  then
    printf "# non-existent file $FILE\n" || return $?
    return 1
  fi
  printf "# sourcing file $FILE ...\n" || return $?
  . $FILE || return $?
  if [ ! "$AES_256_KEY" ]
  then
    printf "# no \$AES_256_KEY detected in env - creating new AES_256_KEY ...\n" || return $?
    AES_256_KEY=$(openssl rand -hex 32) || return $?
    printf "# a new \$AES_256_KEY for encrypting data has been created.\n" || return $?
    printf "# you may want to copy the following to your .bashrc script\n" || return $?
    printf "# so you can run builds locally:\n" || return $?
    printf "export AES_256_KEY=$AES_256_KEY\n\n" || return $?
  fi
  printf "# travis-encrypting \$AES_256_KEY for $GITHUB_REPO ...\n" || return $?
  AES_256_KEY_ENCRYPTED=$(shTravisEncrypt $GITHUB_REPO \$AES_256_KEY=$AES_256_KEY) || return $?
  # return non-zero exit code if $AES_256_KEY_ENCRYPTED is empty string
  if [ ! "$AES_256_KEY_ENCRYPTED" ]
  then
    return 1
  fi
  printf "# updating .travis.yml with encrypted key ...\n" || return $?
  perl -i -pe\
    "s%(- secure: )(.*)( # AES_256_KEY$)%\$1$AES_256_KEY_ENCRYPTED\$3%"\
    .travis.yml || return $?

  printf "# updating .travis.yml with encrypted script ...\n" || return $?
  perl -i -pe\
    "s%(- AES_ENCRYPTED_SH: )(.*)( # AES_ENCRYPTED_SH$)%\$1$(shAesEncrypt < $FILE)\$3%"\
    .travis.yml || return $?
}

shBuildPrint() {
  # this function prints debug info about the build state
  export MODE_CI_BUILD=$1 || return $?
  local MESSAGE="$2" || return $?
  printf "\n[MODE_CI_BUILD=$MODE_CI_BUILD] - $MESSAGE\n\n" || return $?
}

shBuildUploadGithub() {
  # this function uploads the ./build dir to github
  if [ "$MODE_OFFLINE" ] || ! ([ "$GITHUB_BASIC" ] || [ "$GITHUB_TOKEN" ])
  then
    return
  fi
  # cleanup .build
  rm -f .build/coverage-report.html/coverage* || return $?
  find .build -path "*.json" -print0 | xargs -0 rm
  # upload build artifacts to github
  shGithubFilePut https://github.com/$GITHUB_REPO/blob/gh-pages/build.badge.svg\
    $CWD/.build/build.badge.svg > /dev/null || return $?
  for DIR in\
    $CI_BUILD_DIR/$CI_BRANCH\
    $CI_BUILD_DIR/$CI_BRANCH.$CI_BUILD_NUMBER.$CI_COMMIT_ID
  do
    for FILE in $(find .build -type f)
    do
      FILE=$(node -e "console.log('$FILE'.replace('.build/', ''))")
      printf "uploading https://github.com/$GITHUB_REPO/blob/gh-pages/$DIR/$FILE\n" || return $?
      shGithubFilePut https://github.com/$GITHUB_REPO/blob/gh-pages/$DIR/$FILE\
        $CWD/.build/$FILE > /dev/null || return $?
      # throttle github file put
      sleep 1 || return $?
    done
  done
}

shGitCopyTmp() {
  # this function copies the app to /tmp/app with only the bare git repo files
  # init /tmp/app
  rm -fr /tmp/app && mkdir -p /tmp/app || return $?
  # tar / untar repo contents to /tmp/app, since we can't git clone a shallow repo
  git ls-tree -r HEAD --name-only | xargs tar -czf - | tar -C /tmp/app -xzvf - || return $?
}

shGithubFilePut() {
  # this function puts a file into the specified github url
  local URL=$1 || return $?
  local FILE=$2 || return $?
  local SHA=${3-undefined} || return $?
  node -e "require('$DIRNAME_LIB').githubFilePut('$URL', '$FILE', $SHA)" || return $?
}

shGithubFilePost() {
  # this function posts a file into the specified github url
  shGithubFilePut $1 $2 null
}

shHerokuDeploy() {
  # this function deploys the app to heroku
  if [ ! "$GIT_SSH_KEY" ] || [ ! "$HEROKU_REPO" ]
  then
    return
  fi
  # init $HEROKU_HOSTNAME
  export HEROKU_HOSTNAME=$HEROKU_REPO.herokuapp.com || return $?
  shBuildPrint herokuDeploy "deploying to https://$HEROKU_HOSTNAME ..." || return $?
  # init clean repo in /tmp/app
  shGitCopyTmp && cd /tmp/app || return $?
  # init .git
  git init || return $?
  # init .git/config
  printf "\n[user]\nname=nobody\nemail=nobody\n" > .git/config || return $?
  # rm .gitignore so we can git add everything
  rm -f .gitignore || return $?
  # git add everything
  git add . || return $?
  # init Procfile
  node -e "var fs, utility2;\
    fs = require('fs');\
    utility2 = require('$DIRNAME_LIB');\
    fs.writeFileSync(\
      'Procfile',\
      utility2.textFormat(fs.readFileSync('Procfile', 'utf8'), process.env)\
    );"
  # git commit
  git commit -am "heroku deploy" || return $?
  # deploy the app to heroku
  git push -f git@heroku.com:$HEROKU_REPO.git HEAD:master || return $?
  # wait for deployment to finish
  sleep 10 || return $?
  # check deployed webpage on heroku
  shBuildPrint herokuDeploy "checking deployed webpage https://$HEROKU_HOSTNAME ..." ||\
    return $?
  curl -fLSs https://$HEROKU_HOSTNAME > /dev/null
  # save $EXIT_CODE and restore $CWD
  shReturn $? || return $?
  if [ "$EXIT_CODE" != 0 ]
  then
    shBuildPrint herokuDeploy "check failed"
    # return $EXIT_CODE
    return $EXIT_CODE
  fi
  shBuildPrint herokuDeploy "check passed" || return $?
  # test url
  if [ "$TEST_URL" ]
  then
    shPhantomTest "$TEST_URL" || return $?
  fi
}

shIstanbulCover() {
  # this function runs the command with istanbul code-coverage
  local ARGS=$1 || return $?
  shift || return $?
  ARGS="$ARGS --dir=.build/coverage-report.html" || return $?
  ARGS="$ARGS --print=none" || return $?
  ARGS="$ARGS --report=json" || return $?
  istanbul cover $ARGS -- $@ || return $?
}

shIstanbulReport() {
  # this function merges $COVERAGE into .build/coverage-report.html/coverage.json,
  # and creates .build/coverage-report.html
  local COVERAGE=$1 || return $?
  if [ "$COVERAGE" ]
  then
    node -e "var fs;\
      fs = require('fs');\
      fs.writeFileSync(\
        '.build/coverage-report.html/coverage.json',\
        JSON.stringify(require('$DIRNAME_LIB').coverageMerge(\
          require('./.build/coverage-report.html/coverage.json'),\
          require('./$COVERAGE')\
        ))\
      );" || return $?
  fi
  istanbul report --dir=.build/coverage-report.html\
    --include=.build/coverage-report.html/coverage.json html text || return $?
}

shNpmTest() {
  # this function runs npm test
  shBuildPrint "${MODE_CI_BUILD:-localNpmTest}" "npm testing $CWD ..." || return $?
  # init .build dir
  mkdir -p .build/coverage-report.html || return $?
  # init random server port
  export npm_config_server_port=$(node -e 'console.log((Math.random() * 0x10000) | 0x8000)') ||\
    return $?
  # init npm test mode
  export npm_config_mode_npm_test=1 || return $?
  # if coverage-mode is disabled, then run npm test without coverage
  if [ "$npm_config_mode_no_coverage" ]
  then
    node $@
    return $?
  fi
  # cleanup old coverage
  rm -f .build/coverage-report.html/coverage.*
  # run npm test with coverage
  npm_config_mode_coverage=1 shIstanbulCover $@
  # save $EXIT_CODE and restore $CWD
  shReturn $? || return $?
  # create coverage-report
  shIstanbulReport || return $?
  printf "\ncreated test-report file:///$CWD/.build/test-report.html\n" || return $?
  printf "created coverage-report file:///$CWD/.build/coverage-report.html/index.html\n\n" ||\
    return $?
  # create coverage-report badge
  node -e "require('$DIRNAME_LIB')\
    .coverageBadge(require('./.build/coverage-report.html/coverage.json'))" || return $?
  if [ "$EXIT_CODE" != 0 ]
  # if npm test failed, then run it again without coverage
  then
    node $@ || return $?
  fi
  return $EXIT_CODE
}

shNpmTestPublished() {
  # this function runs npm test on the lastest published version of this app
  shNpmTestPublishedTmp
  shReturn $?
}

shNpmTestPublishedTmp() {
  # this function runs npm test on the lastest published version of this app in the tmp dir
  if [ "$MODE_OFFLINE" ]
  then
    return
  fi
  shBuildPrint publishedNpmTest\
    "npm testing published app $NODEJS_PACKAGE_JSON_NAME ..." || return $?
  cd /tmp && rm -fr /tmp/node_modules && npm install $PACKAGE_JSON_NAME || return $?
  cd /tmp/node_modules/$PACKAGE_JSON_NAME && npm install && npm test || return $?
}

shPhantomTest() {
  # this function runs phantomjs tests on the specified $URL,
  # and merge it into the existing test-report
  local URL=$1 || return $?
  shBuildPrint "${MODE_CI_BUILD:-remotePhantomTest}" "phantom testing $URL ..." || return $?
  node -e "var mainApp;\
    mainApp = require('utility2');\
    mainApp._testReport = require('$CWD/.build/test-report.json');\
    mainApp.testPhantom('$URL', function (error) {\
      mainApp.fs.writeFileSync(\
        '$CWD/.build/test-report.html',\
        mainApp.testMerge(mainApp._testReport, {})\
      );\
      process.exit(!!error);
    });" || return $?
}

shReturn() {
  # this function restores the $CWD and then returns the last $EXIT_CODE
  # save $EXIT_CODE
  EXIT_CODE=$1 || return $?
  # restore $CWD
  cd $CWD || return $?
  # cleanup $TMPFILE
  rm -f $TMPFILE || return $?
  # return $EXIT_CODE
  return $EXIT_CODE
}

shTravisEncrypt() {
  # this function travis-encrypts github repo $1's secret $2
  local GITHUB_REPO=$1 || return $?
  local SECRET=$2 || return $?
  # get public rsa key from https://api.travis-ci.org/repos/<owner>/<repo>/key
  curl -fLSs https://api.travis-ci.org/repos/$GITHUB_REPO/key > $TMPFILE || return $?
  perl -pi -e "s/[^-]+(.+-).+/\$1/; s/\\\\n/\n/g; s/ RSA / /g" $TMPFILE || return $?
  # rsa-encrypt $SECRET and print it
  printf "$SECRET" | openssl rsautl -encrypt -pubin -inkey $TMPFILE | base64 | tr -d "\n" ||\
    return $?
}

shMain() {
  # this function is the main program and parses argv
  # init CI_*
  if [ -d .git ]
  then
    # init codeship.io env
    if [ "$CI_NAME" = "codeship" ]
    then
      export CI_BUILD_DIR=build.codeship.io || return $?
    # init travis-ci.org env
    elif [ "$TRAVIS" ]
    then
      export CI_BUILD_DIR=build.travis-ci.org || return $?
      export CI_BRANCH=$TRAVIS_BRANCH || return $?
      export CI_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER || return $?
      export CI_COMMIT_ID=$TRAVIS_COMMIT || return $?
      # decrypt and exec encrypted data
      if [ "$AES_256_KEY" ]
      then
        eval "$(shAesDecryptTravis)" || return $?
      fi
    else
      # init default env
      export CI_BUILD_DIR=build.local || return $?
      export CI_BRANCH=alpha || return $?
      export CI_BUILD_NUMBER=0 || return $?
      export CI_COMMIT_ID=$(git rev-parse --verify HEAD) || return $?
    fi
    # init $CI_COMMIT_*
    export CI_COMMIT_MESSAGE="$(git log -1 --pretty=%s)" || return $?
    export CI_COMMIT_INFO="$CI_COMMIT_ID - $CI_COMMIT_MESSAGE" || return $?
  fi
  # init $CWD
  CWD=$(pwd) || return $?
  # init $DIRNAME
  DIRNAME=$(cd "$(dirname $0)" && pwd) || return $?
  # init $DIRNAME_LIB
  DIRNAME_LIB=$DIRNAME/index.js || return $?
  # init $GIT_SSH
  if [ "$GIT_SSH_KEY" ]
  then
    export GIT_SSH=$DIRNAME/git-ssh.sh || return $?
  fi
  # init $PACKAGE_JSON_*
  eval $(node -e "var dict, value;\
    dict = require('./package.json');
    console.log(Object.keys(dict).map(function (key) {\
      value = dict[key];\
      return typeof value === 'string' ?\
        'export PACKAGE_JSON_' + key.toUpperCase() + '=' + JSON.stringify(value.split('\n')[0])\
        : ':';\
    }).join(';'))") || return $?
  # init $PATH with $CWD/node_modules/.bin
  export PATH=$CWD/node_modules/phantomjs-lite:$CWD/node_modules/.bin:$PATH || return $?
  # init $TMPFILE
  export TMPFILE=/tmp/tmpfile.$(openssl rand -hex 8) || return $?
  # auto-detect slimerjs
  if slimerjs .install/phantomjs-test.js > /dev/null 2>&1
  then
    export npm_config_mode_slimerjs=1 || return $?
  fi
  # eval argv
  $@
  # save $EXIT_CODE and restore $CWD
  shReturn $? || return $?
  # return $EXIT_CODE
  return $EXIT_CODE
}

# init main routine
shMain $@
