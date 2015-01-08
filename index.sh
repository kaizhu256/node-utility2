shAesDecrypt() {
  # this function decrypts base64-encoded stdin to stdout using aes-256-cbc
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
  # this function encrypts stdin to base64-encoded stdout,
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

shBuildCi() {
  # this function runs the build-ci script in README.md
  # init $TMPDIR2
  mkdir -p $TMPDIR2/build/coverage-report.html || return $?
  local FILE=$TMPDIR2/build-ci.sh || return $?
  shBuildPrint buildCi "building $FILE ..." || return $?
  # read and parse script from README.md
  node -e "console.log(
    (/\`\`\`\n(# build-ci.sh\n[\S\s]+?)\`\`\`/).exec(
      require('fs').readFileSync('$CWD/README.md', 'utf8')
    )[1]
  );" > $FILE || return $?
  # test $FILE
  cat $FILE && /bin/sh $FILE || return $?
}

shBuildGithubUpload() {
  # this function uploads the ./build dir to github
  shBuildPrint githubUpload\
    "uploading build artifacts to git@github.com:$GITHUB_REPO.git ..." || return $?
  # cleanup $TMPDIR2/build
  find $TMPDIR2/build -path "*.json" -print0 | xargs -0 rm -f || return $?
  # add black border around phantomjs screenshot
  local FILE_LIST="$(ls\
    $TMPDIR2/build/screenshot.*.phantomjs*.png\
    $TMPDIR2/build/screenshot.*.slimerjs*.png\
    2>/dev/null)" || return $?
  if [ "$FILE_LIST" != "" ] && (mogrify --version > /dev/null 2>&1)
  then
    printf "$FILE_LIST" | xargs -n 1 mogrify -frame 1 -mattecolor black || return $?
  fi
  if [ ! "$CI_BRANCH" ] || [ ! "$GIT_SSH_KEY" ] || [ "$MODE_OFFLINE" ]
  then
    return
  fi
  # clone gh-pages branch
  rm -fr $TMPDIR2/gh-pages && cd $TMPDIR2 && git clone git@github.com:$GITHUB_REPO.git\
    --branch=gh-pages --single-branch $TMPDIR2/gh-pages && cd $TMPDIR2/gh-pages || return $?
  # copy build artifacts to .
  cp $TMPDIR2/build/build.badge.svg . > /dev/null 2>&1
  cp $TMPDIR2/build/screenshot.* . > /dev/null 2>&1
  mkdir -p $CI_BUILD_DIR || return $?
  for DIR in\
    $CI_BUILD_DIR/$CI_BRANCH\
    $CI_BUILD_DIR/$CI_BRANCH.$(shDateIso).$CI_BUILD_NUMBER.$CI_COMMIT_ID
  do
    rm -fr $DIR && cp -a $TMPDIR2/build $DIR || return $?
  done
  # init .git/config
  printf "\n[user]\nname=nobody\nemail=nobody\n" > .git/config || return $?
  git add -A || return $?
  git commit -am "[skip ci] update gh-pages" || return $?
  # update gh-pages
  git push git@github.com:$GITHUB_REPO.git gh-pages || return $?
}

shBuildPrint() {
  # this function prints debug info about the build state
  export MODE_CI_BUILD=$1 || return $?
  local MESSAGE="$2" || return $?
  printf "\n[MODE_CI_BUILD=$MODE_CI_BUILD] - $(shDateIso) - $MESSAGE\n\n"\
    || return $?
}

shDateIso() {
  # this function prints the date in ISO format
  date -u "+%Y-%m-%dT%H:%M:%SZ"
}

shExitCodeSave() {
  # this function saves the global $EXIT_CODE and restores the global $CWD
  # save $EXIT_CODE
  if [ ! "$EXIT_CODE" ] || [ "$EXIT_CODE" = 0 ]
  then
    EXIT_CODE=$1 || return $?
  fi
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
  local COMMIT=$1 || return $?
  local MESSAGE="${2-squash}" || return $?
  # commit any uncommitted data
  git commit -am "$MESSAGE"
  # reset git to previous $COMMIT
  git reset --hard $COMMIT || return $?
  # reset files to current HEAD
  git merge --squash HEAD@{1} || return $?
  # commit HEAD immediately after previous $COMMIT
  git commit -am "$MESSAGE" || return $?
}

shGitSquashGhPages() {
  # this function squashes the HEAD to the earliest commit
  shGitSquash $(git rev-list --max-parents=0 HEAD) "[skip ci] squash"
}

shGrep() {
  # this function recursively greps the regex $1 in the current directory
  local FILE_FILTER="/\\.\\" || return $?
  FILE_FILTER="$FILE_FILTER|.*\\b\\(\\.\\d\\" || return $?
  FILE_FILTER="$FILE_FILTER|archive\\" || return $?
  FILE_FILTER="$FILE_FILTER|artifacts\\" || return $?
  FILE_FILTER="$FILE_FILTER|bower_components\\" || return $?
  FILE_FILTER="$FILE_FILTER|build\\" || return $?
  FILE_FILTER="$FILE_FILTER|coverage\\" || return $?
  FILE_FILTER="$FILE_FILTER|docs\\" || return $?
  FILE_FILTER="$FILE_FILTER|external\\" || return $?
  FILE_FILTER="$FILE_FILTER|git_modules\\" || return $?
  FILE_FILTER="$FILE_FILTER|jquery\\" || return $?
  FILE_FILTER="$FILE_FILTER|log\\" || return $?
  FILE_FILTER="$FILE_FILTER|logs\\" || return $?
  FILE_FILTER="$FILE_FILTER|min\\" || return $?
  FILE_FILTER="$FILE_FILTER|node_modules\\" || return $?
  FILE_FILTER="$FILE_FILTER|rollup.*\\" || return $?
  FILE_FILTER="$FILE_FILTER|swp\\" || return $?
  FILE_FILTER="$FILE_FILTER|tmp\\)\\b" || return $?
  find . -type f | grep -v "$FILE_FILTER" | tr "\n" "\000" | xargs -0 grep -in "$1"
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
  # init $PACKAGE_JSON_*
  if [ -f package.json ]
  then
    eval $(node -e "var dict, value;
      dict = require('./package.json');
      Object.keys(dict).forEach(function (key) {
        value = dict[key];
        if (typeof value === 'string') {
          process.stdout.write('export PACKAGE_JSON_' + key.toUpperCase() + '='
            + JSON.stringify(value.split('\n')[0]) + ';');
        }
      });
      value = (/\bgithub\.com\/(.*)\.git\$/).exec(dict.repository && dict.repository.url);
      if (process.env.GITHUB_REPO === undefined && value) {
        process.stdout.write('export GITHUB_REPO=' + JSON.stringify(value[1]) + ';');
      }") || return $?
  else
    export PACKAGE_JSON_NAME=undefined || return $?
    export PACKAGE_JSON_VERSION=undefined || return $?
  fi
  # init $PATH with $CWD/node_modules/.bin
  export PATH=$CWD/node_modules/phantomjs-lite:$CWD/node_modules/.bin:$PATH || return $?
  # init $TMPDIR2
  export TMPDIR2=$CWD/.tmp || return $?
  # init $TMPFILE2
  export TMPFILE2=$TMPDIR2/tmpfile || return $?
  # init $DIRNAME
  if [ "$PACKAGE_JSON_NAME" = utility2 ]
  then
    export DIRNAME=$CWD || return
  else
    export DIRNAME=$(node -e "console.log(require('utility2').__dirname);") || return $?
  fi
  # init $GIT_SSH
  if [ "$GIT_SSH_KEY" ]
  then
    export GIT_SSH=$DIRNAME/git-ssh.sh || return $?
  fi
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
  # init $TMPDIR2
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
  printf "\ncreated test-report file://$TMPDIR2/build/test-report.html\n" || return $?
  printf "created coverage-report file://$TMPDIR2/build/coverage-report.html/index.html\n\n"\
    || return $?
  # create coverage-report badge
  node -e "require('$DIRNAME')
    .coverageBadge(require('$TMPDIR2/build/coverage-report.html/coverage.json'));" || return $?
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
  # init $TMPDIR2
  mkdir -p $TMPDIR2/build/coverage-report.html || return $?
  export MODE_CI_BUILD_SCREENSHOT=screenshot.$MODE_CI_BUILD.png
  shRun $@ 2>&1 | tee $TMPDIR2/screenshot.txt || return $?
  # save $EXIT_CODE and restore $CWD
  shExitCodeSave $(cat $TMPFILE2) || return $?
  if (convert -list font | grep "\bCourier-Bold\b" > /dev/null 2>&1) &&\
    (fold package.json > /dev/null 2>&1)
  then
    # word-wrap $TMPDIR2/screenshot.txt to 96 characters
    fold -w 96 $TMPDIR2/screenshot.txt |\
      # convert $TMPDIR2/screenshot.txt to png screenshot image
      convert -background gray25 -border 4 -bordercolor gray25\
      -depth 4\
      -fill palegreen -font Courier\
      -pointsize 12\
      -quality 90\
      -type Palette\
      label:@- $TMPDIR2/build/$MODE_CI_BUILD_SCREENSHOT || return $?
  fi
  return $EXIT_CODE
}

shServerPortRandom() {
  # this function prints a random port in the inclusive range 0x1000 to 0xffff
  printf $(($(hexdump -n 2 -e '/2 "%u"' /dev/urandom)|32768))
}

shTestExampleJs() {
  # this function tests the example script in README.md
  shBuildPrint testExampleJs "testing example.js ..." || return $?
  # init /tmp/app
  if [ ! "$MODE_OFFLINE" ]
  then
    rm -fr /tmp/app /tmp/node_modules && mkdir -p /tmp/app && cd /tmp/app || return $?
  fi
  # cd /tmp/app
  cd /tmp/app || return $?
  # read and parse script from README.md
  node -e "console.log(
    (/\`\`\`\n(\/\/ example.js\n[\S\s]+?)\`\`\`/).exec(
      require('fs').readFileSync('$CWD/README.md', 'utf8')
    )[1]
  );" > example.js || return $?
  # jslint example.js
  local SCRIPT="npm install jslint-lite > /dev/null && node_modules/.bin/jslint-lite example.js"
  if [ "$MODE_OFFLINE" ]
  then
    SCRIPT=$(node -e "console.log('$SCRIPT'.replace('npm install', 'echo'));")
  fi
  eval "$SCRIPT" || return $?
  # test example.js
  SCRIPT=$(node -e "console.log(
    (/ \\$ (.*)/).exec(
      require('fs').readFileSync('example.js', 'utf8')
    )[1]
  );")
  if [ "$MODE_OFFLINE" ]
  then
    SCRIPT=$(node -e "console.log('$SCRIPT'.replace('npm install', 'echo'));")
  fi
  printf "$SCRIPT\n\n" && eval "$SCRIPT" || return $?
}

shTestHeroku() {
  # this function deploys the app to heroku and then test it
  if [ ! "$GIT_SSH_KEY" ] || [ ! "$HEROKU_REPO" ]
  then
    return
  fi
  # init $TEST_SECRET
  export TEST_SECRET=$(openssl rand -hex 32) || return $?
  # init $HEROKU_HOSTNAME
  export HEROKU_HOSTNAME=$HEROKU_REPO.herokuapp.com || return $?
  shBuildPrint testHeroku "deploying to https://$HEROKU_HOSTNAME ..." || return $?
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
  # save $EXIT_CODE and restore $CWD
  shExitCodeSave $? || return $?
  # wait 10 seconds for deployment to finish
  sleep 10 || return $?
  # test url with phantomjs
  if [ "$TEST_URL" ]
  then
    shTestPhantom "$TEST_URL" || return $?
  fi
}

shTestPhantom() {
  # this function runs phantomjs tests on the specified $URL,
  # and merge it into the existing test-report
  local URL="$1" || return $?
  shBuildPrint "${MODE_CI_BUILD:-testPhantom}" "testing $URL with phantomjs ..." || return $?
  node -e "var local;
    local = require('$DIRNAME');
    local.testReport = require('$TMPDIR2/build/test-report.json');
    local.testPhantom({ url: '$URL' }, function (error) {
      local.fs.writeFileSync(
        '$TMPDIR2/build/test-report.html',
        local.testMerge(local.testReport, {})
      );
      process.exit(!!error);
    });" || return $?
}

shTestQuickstartSh() {
  # this function tests the quickstart script in README.md
  shBuildPrint testQuickstartSh "testing quickstart.sh ..." || return $?
  # init /tmp/app
  rm -fr /tmp/app /tmp/node_modules && mkdir -p /tmp/app && cd /tmp/app || return $?
  # read and parse script from README.md
  node -e "console.log(
    (/\`\`\`\n(# quickstart.sh\n[\S\s]+?)\`\`\`/).exec(
      require('fs').readFileSync('$CWD/README.md', 'utf8')
    )[1]
  );" > quickstart.sh || return $?
  # test quickstart.sh
  cat quickstart.sh && /bin/sh quickstart.sh || return $?
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
  # init $TMPDIR2 dir
  mkdir -p $TMPDIR2/build/coverage-report.html || return $?
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
