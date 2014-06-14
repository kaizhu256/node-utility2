#!/bin/bash
shCiBuild() {
  ## this function builds the app
  ## init ci build
  if [ ! "$NODEJS_PACKAGE_JSON_NAME" ]
  then
    shCiBuildLog init "could not read package.json"
    exit 1
  fi
  shCiBuildLog aesDecrypt "shasum - $(printf $AES_256_KEY | shasum) \$AES_256_KEY"
  ## decrypt and eval $AES_ENCRYPTED_SH
  eval "$(shUtility2Decrypt)" || exit $?
  if [ ! "$GITHUB_TOKEN" ]
  then
    exit 1
  fi
  ## init codeship.io env
  if [ "$CODESHIP" ]
  then
    ## export $CI_BUILD_DIR
    export CI_BUILD_DIR=/build.codeship.io
  ## init travis-ci.org env
  elif [ "$TRAVIS" ]
  then
    ## export $CI_BUILD_DIR
    export CI_BUILD_DIR=/build.travis-ci.org
    ## export TRAVIS_* vars as CI_* vars
    if [ ! "$CI_BRANCH" ]
    then
      export CI_BRANCH=$TRAVIS_BRANCH
    fi
    if [ ! "$CI_BUILD_NUMBER" ]
    then
      export CI_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER
    fi
    if [ ! "$CI_COMMIT_ID" ]
    then
      export CI_COMMIT_ID=$TRAVIS_COMMIT
    fi
  else
    export CI_BUILD_DIR=/build.local
  fi
  ## export CI_* vars
  if [ ! "$CI_BRANCH" ]
  then
    export CI_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  fi
  if [ ! "$CI_COMMIT_ID" ]
  then
    export CI_COMMIT_ID=$(git rev-parse --verify HEAD)
  fi
  if [ ! "$CI_COMMIT_MESSAGE" ]
  then
    export CI_COMMIT_MESSAGE="$(git log -1 --pretty=%s)"
  fi
  if [ ! "$CI_COMMIT_INFO" ]
  then
    export CI_COMMIT_INFO="$CI_COMMIT_ID - $CI_COMMIT_MESSAGE"
  fi
  export CI_BUILD_DIR_COMMIT=$CI_BUILD_DIR/$CI_BUILD_NUMBER.$CI_BRANCH.$CI_COMMIT_ID
  export CI_BUILD_DIR_LATEST=$CI_BUILD_DIR/latest.$CI_BRANCH
  ## used in test report summary
  export GITHUB_REPO_URL="https://github.com/$GITHUB_REPO/tree/$CI_BRANCH"
  ## npm test local app
  shCiBuildNpmTestLocal || shCiBuildExit $?
  if [ "$CI_BRANCH" != local ]
  then
    ## deploy app to heroku
    if [ "$GIT_SSH_KEY" ]
    then
      shCiBuildHerokuDeploy || shCiBuildExit $?
    fi
    ## run saucelabs tests on heroku server
    if [ "$SAUCE_ACCESS_KEY" ] && [ "$SAUCE_USERNAME" ]
    then
      shCiBuildSaucelabsTest || shCiBuildExit $?
    fi
    if [ "$NPM_AUTH" ]
    then
      ## npm publish app if version changed
      if shSemverGreaterThan\
        "$NODEJS_PACKAGE_JSON_VERSION"\
        $(npm info $NODEJS_PACKAGE_JSON_NAME version 2>/dev/null)
      then
        shCiBuildNpmPublish || shCiBuildExit $?
      fi
      ## npm test latest published app
      shCiBuildNpmTestPublished
    fi
    ## save $EXIT_CODE
    EXIT_CODE=$?
    ## copy merged test-report.json into current directory
    cp .build/test-report.json $CWD/.build || shCiBuildExit $?
    ## restore $CWD
    cd $CWD || shCiBuildExit $?
    ## merge test report into $CWD
    $UTILITY2_JS --mode-cli=testReportMerge || shCiBuildExit $?
    shCiBuildLog npmTestPublished "npm test of latest published package passed"
  fi
  ## gracefully exit ci build
  shCiBuildExit $EXIT_CODE
}

shCiBuildExit() {
  ## this function gracefully exits the ci build
  ## save exit code
  local EXIT_CODE=$?
  ## restore $CWD
  cd $CWD
  ## cleanup $GIT_SSH_KEY_FILE
  rm -f $GIT_SSH_KEY_FILE
  if [ "$CI_BRANCH" != local ]
  then
    ## init $GITHUB_GH_PAGES
    local GITHUB_GH_PAGES=$(echo $GITHUB_REPO | perl -pe "s/\//.github.io\//")
    ## push build artifact to github
    for FILE in $CI_BUILD_DIR_COMMIT $CI_BUILD_DIR_LATEST
    do
      shCiBuildLog buildExit\
        "uploading test report https://$GITHUB_GH_PAGES/$FILE/test-report.html ..."
      shCiBuildLog buildExit\
        "uploading coverage report https://$GITHUB_GH_PAGES/$FILE/coverage-report/index.html\
..."
      ## update build artifact with test and coverage reports
      $UTILITY2_JS\
        --github-file=$FILE\
        --github-local=.build\
        --mode-cli=dbGithubDirUpdate\
        --mode-github=$GITHUB_REPO/gh-pages || exit $?
    done
  fi
  ## exit with exit code
  exit $EXIT_CODE
}

shCiBuildHerokuDeploy() {
  ## this function deploys the app to heroku
  shCiBuildLog herokuDeploy "deploying $NODEJS_PACKAGE_JSON_NAME to heroku ..."
  ## export $GIT_SSH
  export GIT_SSH=$UTILITY2_DIR/.install/git-ssh.sh
  ## export and create $GIT_SSH_KEY_FILE
  export GIT_SSH_KEY_FILE=$(mktemp /tmp/.git-ssh-key-file-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX)
  ## save $GIT_SSH_KEY to $GIT_SSH_KEY_FILE
  echo $GIT_SSH_KEY | base64 --decode > $GIT_SSH_KEY_FILE || return $?
  ## secure $GIT_SSH_KEY_FILE
  chmod 600 $GIT_SSH_KEY_FILE || return $?
  ## init clean repo in /tmp/app
  shCiBuildAppCopy && cd /tmp/app || return $?
  ## init .git
  git init || return $?
  ## init .git/config
  printf "\n[user]\nname=nobody\nemail=nobody\n" > .git/config || return $?
  ## rm .gitignore so we can git add everything
  rm -f .gitignore || return $?
  ## git add everything
  git add . || return $?
  ## git commit
  git commit -am "utility2 deploy" || return $?
  ## git push to heroku
  git push -f git@heroku.com:$NODEJS_PACKAGE_JSON_NAME-unstable.git HEAD:master || return $?
  ## init $HEROKU_URL
  local HEROKU_URL=http://$NODEJS_PACKAGE_JSON_NAME-unstable.herokuapp.com
  ## check deployed webpage on heroku
  shCiBuildLog herokuDeploy "checking deployed webpage $HEROKU_URL ..."
  (
    curl -3fLs $HEROKU_URL > /dev/null\
      && shCiBuildLog herokuDeploy "check passed"\
      || (shCiBUildLog herokuDeploy "check failed"; return 1)
  )
  ## restore $CWD
  cd $CWD || return $?
}

shCiBuildNpmPublish() {
  ## this function npm publishes the app if the version changed
  shCiBuildLog npmPublish "npm publish $NODEJS_PACKAGE_JSON_NAME ..."
  ## init .npmrc
  printf "_auth = $NPM_AUTH\nemail = nobody\n" > $HOME/.npmrc || return $?
  ## init clean repo in /tmp/app
  shCiBuildAppCopy && cd /tmp/app || return $?
  ## publish npm package
  npm publish || return $?
  shCiBuildLog npmPublish "npm publish succeeded"
  ## wait awhile for npm registry to sync
  sleep 10 || return $?
}

shCiBuildNpmTestLocal() {
  ## this function runs npm test on the local app
  shCiBuildLog npmTestLocal "npm test $CWD ..."
  ## npm test
  npm test || return $?
  shCiBuildLog npmTestLocal "npm test passed"
}

shCiBuildNpmTestPublished() {
  ## this function npm tests the latest published version of the app
  shCiBuildLog npmTestPublished\
    "npm install and test published package $NODEJS_PACKAGE_JSON_NAME ..."
  ## install and test latest npm package in /tmp dir with no external npm dependencies
  ## cleanup /tmp
  cd /tmp && rm -fr node_modules $NODEJS_PACKAGE_JSON_NAME || return $?
  ## npm install package
  npm install $NODEJS_PACKAGE_JSON_NAME || return $?
  ## cd into package
  cd node_modules/$NODEJS_PACKAGE_JSON_NAME || return $?
  ## copy previous test-report.json into .build dir
  mkdir -p .build && cp $CWD/.build/test-report.json .build || return $?
  ## npm test package and merge result into previous test-report.json
  npm test --utility2-mode-test-report-merge || return $?
}

shCiBuildSaucelabsTest() {
  ## this function runs headless saucelabs browser tests
  shCiBuildLog saucelabsTest "running headless saucelabs browser tests ..."
  ## add random salt to CI_BUILD_NUMBER to prevent conflict
  ## when re-running saucelabs with same CI_BUILD_NUMBER
  export CI_BUILD_NUMBER_SAUCELABS="$CI_BUILD_NUMBER.$(openssl rand -hex 8)"
  ## run saucelabs tests
  $UTILITY2_JS --mode-cli=headlessSaucelabsPlatformsList\
    < .install/saucelabs-test-platforms-list.json || return $?
  shCiBuildLog saucelabsTest "saucelabs tests passed"
}

shGitSquash() {
  ## this function squashes the HEAD to the specified commit $1
  ## git squash
  ## http://stackoverflow.com/questions/5189560/how-can-i-squash-my-last-x-commits-together-using-git
  local COMMIT=$1
  local MESSAGE=${2-squash}
  git reset --hard $COMMIT && git merge --squash HEAD@{1} && git commit -am "$MESSAGE"
}

shSaucelabsDebug() {
  ## this function fetches debug info on the given saucelabs test id $1
  local ID=$!
  curl -3fLs -X POST https://saucelabs.com/rest/v1/$SAUCE_USERNAME/js-tests/status\
    --data "{\"js tests\": [\"$ID\"]}"\
    -H "Content-Type: application/json"\
    -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY\
    || return $?
  echo
}

shSemverGreaterThan() {
  ## function echoes 1 if semver $1 is greater than semver $2 or 0 otherwise
  local REGEXP="([0-9]+)\.([0-9]+)\.([0-9]+)([0-9A-Za-z-]*)"
  MAJOR1=$(echo $1 | perl -ne "print \$1 if /$REGEXP/")
  MINOR1=$(echo $1 | perl -ne "print \$2 if /$REGEXP/")
  PATCH1=$(echo $1 | perl -ne "print \$3 if /$REGEXP/")
  SPECIAL1=$(echo $1 | perl -ne "print \$4 if /$REGEXP/")
  MAJOR2=$(echo $2 | perl -ne "print \$1 if /$REGEXP/")
  MINOR2=$(echo $2 | perl -ne "print \$2 if /$REGEXP/")
  PATCH2=$(echo $2 | perl -ne "print \$3 if /$REGEXP/")
  SPECIAL2=$(echo $2 | perl -ne "print \$4 if /$REGEXP/")
  ## return 1 if invalid semver $1 or semver $2
  if [ ! "$MAJOR1" ] || [ ! "$MAJOR2" ]
  then
    return 1
  ## return 1 if $MAJOR1 < $MAJOR2
  elif [ $MAJOR1 -lt $MAJOR2 ]
  then
    return 1
  ## return 0 if $MAJOR1 > $MAJOR2
  elif [ $MAJOR1 -gt $MAJOR2 ]
  then
    return 0
  ## return 1 if $MINOR1 < $MINOR2
  elif [ $MINOR1 -lt $MINOR2 ]
  then
    return 1
  ## return 0 if $MINOR1 > $MINOR2
  elif [ $MINOR1 -gt $MINOR2 ]
  then
    return 0
  ## return 1 if $PATCH1 < $PATCH2
  elif [ $PATCH1 -lt $PATCH2 ]
  then
    return 1
  ## return 0 if $PATCH1 > $PATCH2
  elif [ $PATCH1 -gt $PATCH2 ]
  then
    return 0
  ## return 1 if $SPECIAL1 < $SPECIAL2
  elif [ "$SPECIAL1" ] && [ ! "$SPECIAL2" ]
  then
    return 1
  elif [ "$SPECIAL1" \< "$SPECIAL2" ]
  then
    return 1
  ## return 0 if $SPECIAL1 > $SPECIAL2
  elif [ "$SPECIAL1" \> $SPECIAL2 ]
  then
    return 0
  ## return 1 otherwise
  else
    return 1
  fi
}

shUtility2Decrypt() {
  ## this function decrypts $AES_ENCRYPTED_SH in .travis.yml to stdout
  perl -ne "print \$2 if /(- AES_ENCRYPTED_SH: )(.*)( ## AES_ENCRYPTED_SH\$)/" .travis.yml\
    | shAesDecrypt\
    || return $?
}

shUtility2Encrypt() {
  ## this function encrypts the script $1 to $AES_ENCRYPTED_SH and stores it in .travis.yml
  ## init $FILE
  local FILE=$1
  if [ ! -f "$FILE" ]
  then
    printf "## non-existent file $FILE\n"
    return 1
  fi
  if [ ! "$AES_256_KEY" ]
  then
    printf "## no \$AES_256_KEY detected in env - creating new AES_256_KEY ...\n"
    AES_256_KEY=$(openssl rand -hex 32)
    printf "## a new \$AES_256_KEY for encrypting data has been created.\n"
    printf "## you may want to copy the following to your .bashrc script\n"
    printf "## so you can run ci builds locally:\n"
    printf "export AES_256_KEY=$AES_256_KEY\n\n"
  fi
  printf "## travis-encrypting \$AES_256_KEY for $GITHUB_REPO ...\n"
  AES_256_KEY_ENCRYPTED=$(shTravisEncrypt $GITHUB_REPO \$AES_256_KEY=$AES_256_KEY)
  ## return non-zero exit code if $AES_256_KEY_ENCRYPTED is empty string
  if [ ! "$AES_256_KEY_ENCRYPTED" ]
  then
    return 1
  fi
  printf "## updating .travis.yml with encrypted key ...\n"
  perl -i -pe\
    "s%(- secure: )(.*)( ## AES_256_KEY$)%\$1$AES_256_KEY_ENCRYPTED\$3%"\
    .travis.yml\
    || return $?

  printf "## updating .travis.yml with encrypted script ...\n"
  perl -i -pe\
    "s%(- AES_ENCRYPTED_SH: )(.*)( ## AES_ENCRYPTED_SH$)%\$1$(shAesEncrypt < $FILE)\$3%"\
    .travis.yml\
    || return $?
}

