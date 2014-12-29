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

shBuildGithubUpload() {
  # this function uploads the ./build dir to github
  # cleanup $TMPDIR2/build
  find $TMPDIR2/build -path "*.json" -print0 | xargs -0 rm -f || return $?
  # add black border around phantomjs screenshot
  if (mogrify --version > /dev/null 2>&1)
  then
    ls $TMPDIR2/build/*.phantomjs.png $TMPDIR2/build/*.slimerjs.png 2>/dev/null |\
      xargs -n 1 mogrify -frame 1 -mattecolor black || return $?
  fi
  if [ "$MODE_OFFLINE" ] || [ ! "$GIT_SSH_KEY" ]
  then
    return
  fi
  # clone gh-pages branch
  rm -fr $TMPDIR2/gh-pages && cd $TMPDIR2 && git clone git@github.com:$GITHUB_REPO.git\
    --branch=gh-pages --single-branch $TMPDIR2/gh-pages && cd $TMPDIR2/gh-pages || return $?
  # copy build artifacts to .
  cp $TMPDIR2/build/build.badge.svg . || return $?
  cp $TMPDIR2/build/screenshot.* . || return $?
  mkdir -p $CI_BUILD_DIR || return $?
  for DIR in\
    $CI_BUILD_DIR/$CI_BRANCH\
    $CI_BUILD_DIR/$CI_BRANCH.$CI_BUILD_NUMBER.$CI_COMMIT_ID
  do
    rm -fr $DIR && cp -a $TMPDIR2/build $DIR || return $?
  done
  # init .git/config
  printf "\n[user]\nname=nobody\nemail=nobody\n" > .git/config || return $?
  # git squash gh-pages branch
  git add -A && shGitSquash $(git rev-list --max-parents=0 HEAD) "[skip ci] squash" > /dev/null\
    || return $?
  # update gh-pages
  git push -f git@github.com:$GITHUB_REPO.git gh-pages || return $?
}

shBuildPrint() {
  # this function prints debug info about the build state
  export MODE_CI_BUILD=$1 || return $?
  local MESSAGE="$2" || return $?
  printf "\n[MODE_CI_BUILD=$MODE_CI_BUILD] - $MESSAGE\n\n" || return $?
}

shExitCodeSave() {
  # this function saves the global $EXIT_CODE and restores the global $CWD
  # save $EXIT_CODE
  EXIT_CODE=$1 || return $?
  if [ -d $TMPDIR2 ]
  then
    printf "$EXIT_CODE" > $TMPFILE2 || return $?
  fi
  # restore $CWD
  cd $CWD || return $?
}

shGitSquash () {
  # this function squashes the HEAD to the specified commit $1
  # git squash
  # http://stackoverflow.com/questions/5189560/how-can-i-squash-my-last-x-commits-together-using-git
  local COMMIT=$1
  local MESSAGE=${2-squash}
  # commit any uncommitted data
  git commit -am "$MESSAGE"
  # reset git to previous $COMMIT
  git reset --hard $COMMIT || return $?
  # reset files to current HEAD
  git merge --squash HEAD@{1} || return $?
  # commit HEAD immediately after previous $COMMIT
  git commit -am "$MESSAGE" || return $?
}

shHerokuDeploy() {
  # this function deploys the app to heroku
  if [ "$MODE_OFFLINE" ] || [ ! "$GIT_SSH_KEY" ] || [ ! "$HEROKU_REPO" ]
  then
    return
  fi
  # init $TEST_SECRET
  export TEST_SECRET=$(openssl rand -hex 32) || return $?
  # init $HEROKU_HOSTNAME
  export HEROKU_HOSTNAME=$HEROKU_REPO.herokuapp.com || return $?
  shBuildPrint herokuDeploy "deploying to https://$HEROKU_HOSTNAME ..." || return $?
  # init clean repo in /tmp/app.copy
  shTmpAppCopy && cd /tmp/app.copy || return $?
  # npm install dependencies
  rm -fr /tmp/node_modules && npm install || return $?
  # init .git
  git init || return $?
  # init .git/config
  printf "\n[user]\nname=nobody\nemail=nobody\n" > .git/config || return $?
  # rm .gitignore so we can git add everything
  rm -f .gitignore || return $?
  # git add everything
  git add . || return $?
  # init Procfile
  node -e "var fs;
    fs = require('fs');
    fs.writeFileSync(
      'Procfile',
      require('$DIRNAME').textFormat(fs.readFileSync('Procfile', 'utf8'), process.env)
    );"
  # git commit
  git commit -am "heroku deploy" > /dev/null || return $?
  # deploy the app to heroku
  git push -f git@heroku.com:$HEROKU_REPO.git HEAD:master || return $?
  # wait for deployment to finish
  sleep 10 || return $?
  # check deployed webpage on heroku
  shBuildPrint herokuDeploy "checking deployed webpage https://$HEROKU_HOSTNAME ..." ||\
    return $?
  curl -fLSs https://$HEROKU_HOSTNAME > /dev/null
  # save $EXIT_CODE and restore $CWD
  shExitCodeSave $? || return $?
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
    shTestPhantom "$TEST_URL" || return $?
  fi
}

shInit() {
  # this function inits the env
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
  # init $PATH with $CWD/node_modules/.bin
  export PATH=$CWD/node_modules/phantomjs-lite:$CWD/node_modules/.bin:$PATH || return $?
  # init $DIRNAME
  export DIRNAME=$(node -e "try {
    console.log(require('utility2').__dirname)
  } catch (errorCaught) {
    console.log(require('./index.js').__dirname)
  }") || return $?
  # init $GIT_SSH
  if [ "$GIT_SSH_KEY" ]
  then
    export GIT_SSH=$DIRNAME/git-ssh.sh || return $?
  fi
  # init $PACKAGE_JSON_*
  if [ -f package.json ]
  then
    eval $(node -e "var dict, value;
      dict = require('./package.json');
      console.log(Object.keys(dict).map(function (key) {
        value = dict[key];
        return typeof value === 'string' ? 'export PACKAGE_JSON_' + key.toUpperCase() + '='
            + JSON.stringify(value.split('\n')[0])
          : ':';
      }).join(';'))") || return $?
  fi
  # init $TMPDIR2
  export TMPDIR2=$CWD/.tmp || return $?
  # init $TMPFILE2
  export TMPFILE2=$TMPDIR2/tmpfile || return $?
  # auto-detect slimerjs
  if slimerjs undefined > /dev/null 2>&1
  then
    export npm_config_mode_slimerjs=1 || return $?
  fi
}

shIstanbulCover() {
  # this function runs the command with istanbul code-coverage
  local ARGS=$1 || return $?
  shift || return $?
  ARGS="$ARGS --dir=$TMPDIR2/build/coverage-report.html" || return $?
  ARGS="$ARGS --print=none" || return $?
  ARGS="$ARGS --report=json" || return $?
  istanbul cover $ARGS -- $@ || return $?
}

shIstanbulReport() {
  # this function merges $COVERAGE into $TMPDIR2/build/coverage-report.html/coverage.json,
  # and creates $TMPDIR2/build/coverage-report.html
  local COVERAGE=$1 || return $?
  if [ "$COVERAGE" ]
  then
    node -e "var fs;
      fs = require('fs');
      fs.writeFileSync(
        '$TMPDIR2/build/coverage-report.html/coverage.json',
        JSON.stringify(require('$DIRNAME').coverageMerge(
          require('$TMPDIR2/build/coverage-report.html/coverage.json'),
          require('./$COVERAGE')
        ))
      );" || return $?
  fi
  istanbul report --dir=$TMPDIR2/build/coverage-report.html\
    --include=$TMPDIR2/build/coverage-report.html/coverage.json html text || return $?
}

shNpmTest() {
  # this function runs npm test
  shBuildPrint "${MODE_CI_BUILD:-npmTest}" "npm testing $CWD ..." || return $?
  # init $TMPDIR2 dir
  mkdir -p $TMPDIR2/build/coverage-report.html || return $?
  # init random server port
  export npm_config_server_port=$(shServerPortRandom) || return $?
  # init npm test mode
  export npm_config_mode_npm_test=1 || return $?
  # if coverage-mode is disabled, then run npm test without coverage
  if [ "$npm_config_mode_no_coverage" ]
  then
    node $@
    return $?
  fi
  # cleanup old coverage
  rm -f $TMPDIR2/build/coverage-report.html/coverage.* || return $?
  # run npm test with coverage
  shIstanbulCover $@
  # save $EXIT_CODE and restore $CWD
  shExitCodeSave $? || return $?
  # create coverage-report
  shIstanbulReport || return $?
  printf "\ncreated test-report file:///$TMPDIR2/build/test-report.html\n" || return $?
  printf "created coverage-report file:///$TMPDIR2/build/coverage-report.html/index.html\n\n"\      || return $?
  # create coverage-report badge
  node -e "require('$DIRNAME')
    .coverageBadge(require('$TMPDIR2/build/coverage-report.html/coverage.json'))" || return $?
  # if npm test failed, then run it again without coverage
  if [ "$EXIT_CODE" != 0 ]
  then
    node $@
  fi
  return $EXIT_CODE
}

shRun() {
  # this function runs the command $@ and restores $CWD on exit
  # eval argv forever
  if [ "$npm_config_mode_forever" ]
  then
    eval "shRunForever $@"
  # eval argv
  else
    $@
  fi
  # save $EXIT_CODE and restore $CWD
  shExitCodeSave $? || return $?
  # return $EXIT_CODE
  return $EXIT_CODE
}

shRunForever() {
  # this function runs the command $@ and auto-respawns on exit
  # kill old forever process
  kill $(cat $TMPDIR2/forever.pid) > /dev/null 2>&1
  sleep 2 || return $?
  # kill old forever process forcefully
  kill $(cat $TMPDIR2/forever.pid) -s9 2>/dev/null
  # record new forever pid
  printf "$$" > $TMPDIR2/forever.pid || return $?
  printf "\nprocess $$ - running '$@' ...\n" >&2 || return $?
  until npm_config_pid_parent=$$ $@
  do
    printf "\nprocess $$ - '$@' exited with code $?. respawning ...\n" >&2 || return $?
    sleep 2 || return $?
  done
}

shRunScreenshot() {
  # this function runs the command $@ and creates a screenshot of the output
  # http://www.cnx-software.com/2011/09/22/how-to-convert-a-command-line-result-into-an-image-in-linux/
  export MODE_CI_BUILD_SCREENSHOT=screenshot.$MODE_CI_BUILD.png
  shRun $@ 2>&1 | tee $TMPDIR2/screenshot.txt || return $?
  # save $EXIT_CODE and restore $CWD
  shExitCodeSave $(cat $TMPFILE2) || return $?
  if (convert --version > /dev/null 2>&1)
  then
    # word-wrap $TMPDIR2/screenshot.txt to 80 characters
    fold $TMPDIR2/screenshot.txt |\
      # convert $TMPDIR2/screenshot.txt to png screenshot image
      convert -background gray40 -border 4 -bordercolor gray40\
      -fill palegreen -font Courier-Bold\
      -pointsize 10\
      label:@- $TMPDIR2/build/$MODE_CI_BUILD_SCREENSHOT || return $?
  fi
  return $EXIT_CODE
}

shServerPortRandom() {
  # this function prints a random port in the inclusive range 0x1000 to 0xffff
  printf $(($(hexdump -n 2 -e '/2 "%u"' /dev/urandom)|32768))
}

shTestPhantom() {
  # this function runs phantomjs tests on the specified $URL,
  # and merge it into the existing test-report
  local URL=$1 || return $?
  shBuildPrint "${MODE_CI_BUILD:-testPhantom}" "phantom testing $URL ..." || return $?
  node -e "var local;
    local = require('$DIRNAME');
    local._testReport = require('$TMPDIR2/build/test-report.json');
    local.testPhantom('$URL', function (error) {
      local.fs.writeFileSync(
        '$TMPDIR2/build/test-report.html',
        local.testMerge(local._testReport, {})
      );
      process.exit(!!error);
    });" || return $?
}

shTestExample() {
  # this function tests the example script in README.md
  if [ "$MODE_OFFLINE" ]
  then
    return
  fi
  # read and parse script from README.md
  node -e "console.log(
    (/\n## example code\n\`\`\`\n([\S\s]+?)\`\`\`/)
      .exec(require('fs').readFileSync('README.md', 'utf8'))[1]
  );" > /tmp/example.js || return $?
  shBuildPrint testExample "testing /tmp/example.js ..." || return $?
  # cleanup /tmp/node_modules
  cd /tmp && rm -fr /tmp/node_modules || return $?
  # npm install package
  npm install $PACKAGE_JSON_NAME || return $?
  # test /tmp/example.js
  printf "node /tmp/example.js\n" && node /tmp/example.js || return $?
}

shTestQuickstart() {
  # this function tests the quickstart script in README.md
  if [ "$MODE_OFFLINE" ]
  then
    return
  fi
  # read and parse script from README.md
  node -e "console.log(
    (/\n## quickstart\n\`\`\`\n([\S\s]+?)\`\`\`/)
      .exec(require('fs').readFileSync('README.md', 'utf8'))[1]
  );" > /tmp/quickstart.sh || return $?
  shBuildPrint testQuickstart "testing /tmp/quickstart.sh ..." || return $?
  # cleanup /tmp/node_modules
  cd /tmp && rm -fr /tmp/node_modules || return $?
  # test /tmp/quickstart.sh
  cat /tmp/quickstart.sh && /bin/sh /tmp/quickstart.sh || return $?
}

shTestTravis() {
  # this function tests the travis script in .travis.yml
  if [ "$MODE_OFFLINE" ]
  then
    return
  fi
  # read and parse script from .travis.yml
  node -e "console.log(
    'shTestTravis() {\n' + (/\nscript:\n([\S\s]+)/)
      .exec(require('fs').readFileSync('.travis.yml', 'utf8'))[1]
      .replace((/^[ \-]*/gm), '')
      .replace((/^(.+)/gm), '\$1 || EXIT_CODE=\$?') + '\nexit \$EXIT_CODE\n}\nshTestTravis'
  );" > /tmp/travis.sh || return $?
  # test /tmp/travis.sh
  cat /tmp/travis.sh && /bin/sh /tmp/travis.sh || return $?
}

shTmpAppCopy() {
  # this function copies the app to /tmp/app.copy with only the bare git repo files
  # init /tmp/app.copy
  rm -fr /tmp/app.copy && mkdir -p /tmp/app.copy || return $?
  # tar / untar repo contents to /tmp/app.copy, since we can't git clone a shallow repo
  git ls-tree -r HEAD --name-only | xargs tar -czf - | tar -C /tmp/app.copy -xzvf - || return $?
}

shTravisEncrypt() {
  # this function travis-encrypts github repo $1's secret $2
  local GITHUB_REPO=$1 || return $?
  local SECRET=$2 || return $?
  # get public rsa key from https://api.travis-ci.org/repos/<owner>/<repo>/key
  curl -fLSs https://api.travis-ci.org/repos/$GITHUB_REPO/key > $TMPFILE2 || return $?
  perl -pi -e "s/[^-]+(.+-).+/\$1/; s/\\\\n/\n/g; s/ RSA / /g" $TMPFILE2 || return $?
  # rsa-encrypt $SECRET and print it
  printf "$SECRET" | openssl rsautl -encrypt -pubin -inkey $TMPFILE2 | base64 | tr -d "\n" ||\
    return $?
}

# if the first argument $1 is shRun, then run the command $@
if [ "$1" = shRun ]
then
  shInit && $@
fi
