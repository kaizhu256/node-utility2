shAesDecrypt() {
    # this function will decrypt base64-encoded stdin to stdout using aes-256-cbc
    local STRING || return $?
    local IV || return $?
    # save stdin to $STRING
    STRING=$(cat /dev/stdin) || return $?
    # init $IV from first 44 base64-encoded bytes of $STRING
    IV=$(printf $STRING | cut -c1-44 | base64 --decode) || return $?
    # decrypt remaining base64-encoded bytes of $STRING to stdout using aes-256-cbc
    printf $STRING | \
        cut -c45-9999 | \
        base64 --decode | \
        openssl enc -aes-256-cbc -d -K $AES_256_KEY -iv $IV || return $?
}

shAesEncrypt() {
    # this function will encrypt stdin to base64-encoded stdout,
    # with a random iv prepended using aes-256-cbc
    local IV || return $?
    # init $IV from random 16 bytes
    IV=$(openssl rand -hex 16) || return $?
    # print base64-encoded $IV to stdout
    printf $(printf "$IV " | base64) || return $?
    # encrypt stdin and stream to stdout using aes-256-cbc with base64-encoding
    openssl enc -aes-256-cbc -K $AES_256_KEY -iv $IV | base64 | tr -d "\n" || return $?
}

shBuildGithubUpload() {
    # this function will upload build-artifacts to github
    local DIR || return $?
    if [ ! "$CI_BRANCH" ] || [ "$CI_BRANCH" = undefined ] || \
        [ ! "$GIT_SSH_KEY" ] || [ "$MODE_OFFLINE" ]
    then
        return
    fi
    shBuildPrint githubUpload \
        "uploading build-artifacts to git@github.com:$GITHUB_REPO.git" || return $?
    # clone gh-pages branch
    rm -fr $npm_config_dir_tmp/gh-pages || return $?
    git clone git@github.com:$GITHUB_REPO.git \
        --branch=gh-pages --single-branch $npm_config_dir_tmp/gh-pages || return $?
    cd $npm_config_dir_tmp/gh-pages || return $?
    # copy build-artifacts to gh-pages
    cp -a $npm_config_dir_build . || return $?
    DIR=build..$CI_BRANCH..$CI_HOST || return $?
    rm -fr $DIR && cp -a $npm_config_dir_build $DIR || return $?
    # init .git/config
    printf "\n[user]\nname=nobody\nemail=nobody" >> .git/config || return $?
    # cleanup dir
    shBuildGithubUploadCleanup || return $?
    # update gh-pages
    git add -A || return $?
    git commit -am "[skip ci] update gh-pages" || return $?
    git push origin gh-pages || return $?
    # if number of commits > $COMMIT_LIMIT, then squash HEAD to the earliest commit
    shGitBackupAndSquashAndPush $COMMIT_LIMIT || return $?
}

shBuildGithubUploadCleanup() {
    # this function will cleanup build-artifacts in local gh-pages repo
    return
}

shBuildPrint() {
    # this function will print debug info about the build state
    local MESSAGE || return $?
    MESSAGE="$2" || return $?
    export MODE_BUILD=$1 || return $?
    printf "\n[MODE_BUILD=$MODE_BUILD] - $(shDateIso) - $MESSAGE\n\n" || return $?
}

shDateIso() {
    # this function will print the current date in ISO format
    date -u "+%Y-%m-%dT%H:%M:%SZ"
}

shDebugArgv() {
    # this function will print each element in $@ in a separate line
    local ARG || return $?
    for ARG in "$1" "$2" "$3" "$4" "$5" "$6" "$7" "$8"
    do
        printf "'$ARG'\n"
    done
}

shExitCodeSave() {
    # this function will save the global $EXIT_CODE and restore the global $CWD
    # save $EXIT_CODE
    if [ ! "$EXIT_CODE" ] || [ "$EXIT_CODE" = 0 ]
    then
        EXIT_CODE=$1 || return $?
    fi
    if [ -d $npm_config_dir_tmp ]
    then
        printf "$EXIT_CODE" > $npm_config_file_tmp || return $?
    fi
    # restore $CWD
    cd $CWD || return $?
}

shGitBackupAndSquashAndPush() {
    # this function will, if number of commits > $COMMIT_LIMIT,
    # 1. backup current $BRANCH to origin/$BRANCH.backup
    # 2. squash $RANGE to the first commit in $BRANCH
    # 3. push squashed $BRANCH to origin/$BRANCH
    local COMMIT_LIMIT || return $?
    COMMIT_LIMIT=$1 || return $?
    # if number of commits > $COMMIT_LIMIT
    if [ ! "$COMMIT_LIMIT" ] || [ ! $(git rev-list HEAD --count) -gt $COMMIT_LIMIT ]
    then
        return
    fi
    local BRANCH || return $?
    local RANGE || return $?
    BRANCH=$(git rev-parse --abbrev-ref HEAD) || return $?
    RANGE=$(($COMMIT_LIMIT/2)) || return $?
    # 1. backup current $BRANCH to origin/$BRANCH.backup
    git push -f origin $BRANCH:$BRANCH.backup || return $?
    # 2. squash $RANGE to the first commit in $BRANCH
    shGitSquashShift $RANGE || return $?
    # 3. push squashed $BRANCH to origin/$BRANCH
    git push -f origin $BRANCH || return $?
}

shGitLsTree() {
    # this function will list all files committed in HEAD
    git ls-tree --name-only -r HEAD | while read file
    do
        printf "%10s bytes    $(git log -1 --format="%ai  " -- $file)  $file\n\n" \
            $(ls -ln $file | awk "{print \$5}") || return $?
    done
}

shGitSquashPop() {
    # this function will squash HEAD to the specified $COMMIT
    # http://stackoverflow.com/questions/5189560
    # /how-can-i-squash-my-last-x-commits-together-using-git
    local COMMIT || return $?
    local MESSAGE || return $?
    COMMIT=$1 || return $?
    MESSAGE="${2-$(git log -1 --pretty=%s)}" || return $?
    # commit any uncommitted data
    git commit -am "$MESSAGE" || :
    # reset git to previous $COMMIT
    git reset --hard $COMMIT || return $?
    # reset files to current HEAD
    git merge --squash HEAD@{1} || return $?
    # commit HEAD immediately after previous $COMMIT
    git commit -am "$MESSAGE" || return $?
}

shGitSquashShift() {
    # this function will squash $RANGE to the first commit
    local BRANCH || return $?
    local RANGE || return $?
    BRANCH=$(git rev-parse --abbrev-ref HEAD) || return $?
    RANGE=$1 || return $?
    git checkout -q HEAD~$RANGE || return $?
    git reset -q $(git rev-list --max-parents=0 HEAD) || return $?
    git add . || return $?
    git commit -m squash > /dev/null || :
    git cherry-pick -X theirs --allow-empty --strategy=recursive $BRANCH~$RANGE..$BRANCH || \
        return $?
    git push -f . HEAD:$BRANCH || return $?
    git checkout $BRANCH || return $?
}

shGrep() {
    # this function will recursively grep $DIR for the $REGEXP
    local DIR || return $?
    local FILE_FILTER || return $?
    local REGEXP || return $?
    DIR=$1 || return $?
    REGEXP=$2 || return $?
    FILE_FILTER="/\\.\\" || return $?
    FILE_FILTER="$FILE_FILTER|.*\\b\\(\\.\\d\\" || return $?
    FILE_FILTER="$FILE_FILTER|archive\\" || return $?
    FILE_FILTER="$FILE_FILTER|artifacts\\" || return $?
    FILE_FILTER="$FILE_FILTER|bower_components\\" || return $?
    FILE_FILTER="$FILE_FILTER|build\\" || return $?
    FILE_FILTER="$FILE_FILTER|coverage\\" || return $?
    FILE_FILTER="$FILE_FILTER|docs\\" || return $?
    FILE_FILTER="$FILE_FILTER|external\\" || return $?
    FILE_FILTER="$FILE_FILTER|fixtures\\" || return $?
    FILE_FILTER="$FILE_FILTER|git_modules\\" || return $?
    FILE_FILTER="$FILE_FILTER|jquery\\" || return $?
    FILE_FILTER="$FILE_FILTER|log\\" || return $?
    FILE_FILTER="$FILE_FILTER|logs\\" || return $?
    FILE_FILTER="$FILE_FILTER|min\\" || return $?
    FILE_FILTER="$FILE_FILTER|node_modules\\" || return $?
    FILE_FILTER="$FILE_FILTER|rollup.*\\" || return $?
    FILE_FILTER="$FILE_FILTER|swp\\" || return $?
    FILE_FILTER="$FILE_FILTER|tmp\\)\\b" || return $?
    find "$DIR" -type f | \
        grep -v "$FILE_FILTER" | \
        tr "\n" "\000" | \
        xargs -0 grep -Iine "$REGEXP" || :
}

shGrepFileReplace() {
    # this function will save the grep-and-replace lines in $FILE
    local FILE || return $?
    FILE=$1
    node -e "
        var local;
        local = {};
        local.fs = require('fs');
        local.fileDict = {};
        local.fs.readFileSync('$FILE', 'utf8').split('\n').forEach(function (element) {
            element = (/^(.+?):(\d+?):(.+?)$/).exec(element);
            if (!element) {
                return;
            }
            local.fileDict[element[1]] = local.fileDict[element[1]] ||
                local.fs.readFileSync(element[1], 'utf8').split('\n');
            local.fileDict[element[1]][element[2] - 1] = element[3];
        });
        Object.keys(local.fileDict).forEach(function (key) {
            local.fs.writeFileSync(key, local.fileDict[key].join('\n'));
        });
    " || return $?
}

shHerokuDeploy() {
    # this function will deploy the app to $HEROKU_REPO,
    # and run a simple curl check for the main-page
    local HEROKU_REPO || return $?
    HEROKU_REPO=$1 || return $?
    if [ ! "$GIT_SSH_KEY" ]
    then
        return
    fi
    # init $TEST_SECRET
    export TEST_SECRET=$(openssl rand -hex 32) || return $?
    # init $HEROKU_HOSTNAME
    export HEROKU_HOSTNAME=$HEROKU_REPO.herokuapp.com || return $?
    shBuildPrint testHeroku "deploying to https://$HEROKU_HOSTNAME" || return $?
    # init clean repo in /tmp/app
    shTmpAppCopy && cd /tmp/app || return $?
    # init .git
    git init || return $?
    # init .git/config
    printf "\n[user]\nname=nobody\nemail=nobody\n" > .git/config || return $?
    # init Procfile
    node -e "
        require('fs').writeFileSync(
            'Procfile',
            require('$npm_config_dir_utility2').stringFormat(
                require('fs').readFileSync('Procfile', 'utf8'), process.env
            )
        );
    " || return $?
    # rm .gitignore so we can git add everything
    rm -f .gitignore || return $?
    # git add everything
    git add . || return $?
    # git commit
    git commit -aqm "heroku deploy" || return $?
    # git push app to heroku
    git push -f git@heroku.com:$HEROKU_REPO.git HEAD:master || return $?
    # wait 10 seconds for heroku to deploy app
    sleep 10 || return $?
    # verify deployed app's main-page returns status-code < 400
    [ $(
        curl -Ls -o /dev/null -w "%{http_code}" https://$HEROKU_HOSTNAME
    ) -lt 400 ] || return $?
}

shInit() {
    # this function will init the env
    # init CI_*
    if [ -d .git ]
    then
        # init codeship.io env
        if [ "$CI_NAME" = "codeship" ]
        then
            export CI_HOST=codeship.io || return $?
        # init travis-ci.org env
        elif [ "$TRAVIS" ]
        then
            export CI_BRANCH=$TRAVIS_BRANCH || return $?
            export CI_COMMIT_ID=$TRAVIS_COMMIT || return $?
            export CI_HOST=travis-ci.org || return $?
            # decrypt and exec encrypted data
            if [ "$AES_256_KEY" ]
            then
                eval "$(shTravisDecryptYml)" || return $?
            fi
        # init default env
        else
            export CI_BRANCH=undefined || return $?
            export CI_COMMIT_ID=$(git rev-parse --verify HEAD) || return $?
            export CI_HOST=localhost || return $?
        fi
        # init $CI_COMMIT_*
        export CI_COMMIT_MESSAGE="$(git log -1 --pretty=%s)" || return $?
        export CI_COMMIT_INFO="$CI_COMMIT_ID - $CI_COMMIT_MESSAGE" || return $?
    fi
    # init $CWD
    CWD=$(pwd) || return $?
    # init $npm_package_*
    if [ -f package.json ]
    then
        eval $(node -e "
            var dict, value;
            dict = require('./package.json');
            Object.keys(dict).forEach(function (key) {
                value = dict[key];
                if (typeof value === 'string' && value.indexOf('\n') === -1) {
                    process.stdout.write(
                        'export npm_package_' + key + '=' + JSON.stringify(value) + ';'
                    );
                }
            });
            value = (/\bgithub\.com\/(.*)\.git\$/).exec(dict.repository && dict.repository.url);
            if (process.env.GITHUB_REPO === undefined && value) {
                process.stdout.write('export GITHUB_REPO=' + JSON.stringify(value[1]) + ';');
            }
        ") || return $?
    else
        export npm_package_description=undefined || return $?
        export npm_package_name=undefined || return $?
        export npm_package_version=undefined || return $?
    fi
    # init $npm_config_*
    export npm_config_dir_build=$CWD/tmp/build || return $?
    export npm_config_dir_tmp=$CWD/tmp || return $?
    export npm_config_file_tmp=$CWD/tmp/tmpfile || return $?
    # init $npm_config_dir_utility2
    if [ "$npm_package_name" = utility2 ]
    then
        export npm_config_dir_utility2=$CWD || return
    else
        export npm_config_dir_utility2=$(node -e \
            "console.log(require('utility2').__dirname);") || return $?
    fi
    # init $GIT_SSH
    if [ "$GIT_SSH_KEY" ]
    then
        export GIT_SSH=$npm_config_dir_utility2/git-ssh.sh || return $?
    fi
    # init $PATH
    export PATH=$CWD/node_modules/phantomjs-lite:$PATH || return $?
}

shIstanbulCover() {
    # this function will run the command $@ with istanbul coverage
    if [ "$npm_config_mode_no_coverage" ]
    then
        node $@ || return $?
    else
        # init $npm_config_file_istanbul
        if [ ! "$npm_config_file_istanbul" ]
        then
            export npm_config_file_istanbul=$(cd $npm_config_dir_utility2 && \
                node -e "
                    console.log(require('istanbul-lite').__dirname);
                ")/index.js || return $?
        fi
        npm_config_dir_coverage="$npm_config_dir_build/coverage.html" \
            $npm_config_file_istanbul cover $@ || return $?
    fi
}

shJsonFilePrettify() {
    # this function will
    # 1. read the json-data from $FILE
    # 2. prettify the json-data
    # 3. write the prettified json-data back to $FILE
    local FILE || return $?
    FILE=$1 || return $?
    node -e "
        require('fs').writeFileSync(
            '$FILE',
            JSON.stringify(JSON.parse(require('fs').readFileSync('$FILE')), null, 4)
        );
    " || return $?
}

shNodeVersionMinor() {
    # this function will print the node major and minor version x.y,
    # with the patch version z stripped
    printf $(node -e "
        console.log((/\d+?\.\d+/).exec(process.version)[0]);
    ") || return $?
}

shNpmTestPublished() {
    # this function will run npm-test on the published package
    shBuildPrint npmTestPublished "npm-testing published package $npm_package_name" || return $?
    # init /tmp/app
    rm -fr /tmp/app /tmp/node_modules && mkdir -p /tmp/app || return $?
    cd /tmp/app || return $?
    # npm install package
    npm install $npm_package_name || return $?
    # npm-test package
    cd node_modules/$npm_package_name && npm install && npm test || return $?
}

shNpmTest() {
    # this function will run npm-test
    shBuildPrint ${MODE_BUILD:-npmTest} "npm-testing $CWD" || return $?
    # cleanup $npm_config_dir_tmp/*.json
    rm $npm_config_dir_tmp/*.json > /dev/null 2>&1 || :
    # init $npm_config_dir_build
    mkdir -p $npm_config_dir_build/coverage.html || return $?
    # auto-detect slimerjs
    shSlimerDetect || return $?
    # init npm-test-mode
    export npm_config_mode_npm_test=1 || return $?
    # init random server-port
    export npm_config_server_port=$(shServerPortRandom) || return $?
    # if coverage-mode is disabled, then run npm-test without coverage
    if [ "$npm_config_mode_no_coverage" ]
    then
        node $@
        return $?
    fi
    # cleanup old coverage
    rm -f $npm_config_dir_build/coverage.html/coverage.* || return $?
    # run npm-test with coverage
    shIstanbulCover $@
    # save $EXIT_CODE and restore $CWD
    shExitCodeSave $? || return $?
    # create coverage badge
    node -e "
        var coverage, percent;
        coverage = require('$npm_config_dir_build/coverage.html/coverage.json');
        percent = [0, 0];
        Object.keys(coverage).forEach(function (file) {
            file = coverage[file];
            Object.keys(file.s).forEach(function (key) {
                percent[0] += file.s[key] || file.statementMap[key].skip
                    ? 1
                    : 0;
                percent[1] += 1;
            });
        });
        percent = Math.floor((100000 * percent[0] / percent[1] + 5) / 10) / 100;
        require('fs').writeFileSync(
            '$npm_config_dir_build/coverage.badge.svg',
            // https://img.shields.io/badge/coverage-100.0%-00dd00.svg?style=flat
            '"'<svg xmlns="http://www.w3.org/2000/svg" width="117" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="117" height="20" fill="#555"/><rect rx="0" x="63" width="54" height="20" fill="#0d0"/><path fill="#0d0" d="M63 0h4v20h-4z"/><rect rx="0" width="117" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="32.5" y="15" fill="#010101" fill-opacity=".3">coverage</text><text x="32.5" y="14">coverage</text><text x="89" y="15" fill="#010101" fill-opacity=".3">100.0%</text><text x="89" y="14">100.0%</text></g></svg>'"'
                // edit coverage badge percent
                .replace((/100.0/g), percent)
                // edit coverage badge color
                .replace(
                    (/0d0/g),
                    ('0' + Math.round((100 - percent) * 2.21).toString(16)).slice(-2) +
                        ('0' + Math.round(percent * 2.21).toString(16)).slice(-2) + '00'
                )
        );
    " || return $?
    if [ "$EXIT_CODE" != 0 ]
    then
        node $@
    fi
    return $EXIT_CODE
}

shPhantomScreenCapture() {
    # this function will spawn phantomjs to screen-capture the specified $URL
    MODE_BUILD=${MODE_BUILD:-phantomScreenCapture} shPhantomTest "$1" ${2-30000} ${3-2000} \
        screenCapture || return $?
}

shPhantomTest() {
    # this function will spawn phantomjs to test the specified $URL,
    # and merge the test-report into the existing test-report
    local MODE_PHANTOM || return $?
    local TIMEOUT_DEFAULT || return $?
    local TIMEOUT_SCREEN_CAPTURE || return $?
    local URL || return $?
    MODE_PHANTOM="${4-testUrl}" || return $?
    TIMEOUT_DEFAULT="${2-30000}" || return $?
    TIMEOUT_SCREEN_CAPTURE="${3-2000}" || return $?
    URL="$1" || return $?
    shBuildPrint ${MODE_BUILD:-phantomTest} "testing $URL with phantomjs" || return $?
    # auto-detect slimerjs
    shSlimerDetect || return $?
    node -e "
        var utility2;
        utility2 = require('$npm_config_dir_utility2');
        if ('$MODE_PHANTOM' === 'testUrl') {
            utility2.testReport = require('$npm_config_dir_build/test-report.json');
        }
        utility2.phantomTest({
            modePhantom: '$MODE_PHANTOM',
            timeoutDefault: $TIMEOUT_DEFAULT,
            timeoutScreenCapture: $TIMEOUT_SCREEN_CAPTURE,
            url: '$URL'
                // format unicode
                .replace((/\\\\u[0-9a-f]{4}/g), function (match0) {
                    return String.fromCharCode('0x' + match0.slice(-4));
                })
        }, function (error) {
            if ('$MODE_PHANTOM' === 'screenCapture') {
                process.exit();
                return;
            }
            require('fs').writeFileSync(
                '$npm_config_dir_build/test-report.html',
                utility2.testMerge(utility2.testReport, {})
            );
            process.exit(!!error);
        });
    " || return $?
}

shReadmeBuild() {
    # this function will run the internal build-script embedded in README.md
    # init $npm_config_dir_build
    mkdir -p $npm_config_dir_build/coverage.html || return $?
    # run shell script from README.md
    MODE_BUILD=build shReadmeTestSh $npm_config_dir_tmp/build.sh || return $?
}

shReadmeExportFile() {
    # this function will extract and save the script $FILE_IN embedded in README.md to $FILE_OUT
    local FILE_IN || return $?
    local FILE_OUT || return $?
    FILE_IN=$1 || return $?
    FILE_OUT=$2 || return $?
    node -e "
        require('fs').writeFileSync(
            '$FILE_OUT',
            require('fs')
                .readFileSync('$CWD/README.md', 'utf8')
                // support syntax-highlighting
                .replace((/[\\S\\s]+?\n.*?$FILE_IN\s*?\`\`\`\\w*?\n/), function (match0) {
                    // preserve lineno
                    return match0.replace((/.+/g), '');
                })
                .replace((/\n\`\`\`[\\S\\s]+/), '')
        );
    " || return $?
}

shReadmeExportPackageJson() {
    # this function will extract and save the package.json file embedded in README.md
    local FILE || return $?
    shReadmeExportFile package.json $CWD/package.json || return $?
    node -e "
        require('fs').writeFileSync(
            '$CWD/package.json',
            require('fs')
                .readFileSync('$CWD/package.json', 'utf8')
                // parse '\' line-continuation
                .replace((/\\\\\n/g), '')
                // remove leading whitespace
                .trimLeft()
        );
    " || return $?
}

shReadmeTestJs() {
    # this function will extract, save, and test the js script $FILE embedded in README.md
    local FILE || return $?
    local SCRIPT || return $?
    FILE=$1 || return $?
    shBuildPrint $MODE_BUILD "testing $FILE" || return $?
    if [ ! "$MODE_OFFLINE" ]
    then
        # init /tmp/app
        rm -fr /tmp/app /tmp/node_modules && mkdir -p /tmp/app || return $?
    fi
    # cd /tmp/app
    cd /tmp/app || return $?
    # read and parse js script from README.md
    shReadmeExportFile $FILE $FILE || return $?
    # jslint $FILE
    if [ ! "$MODE_OFFLINE" ] && [ ! "$npm_config_mode_no_jslint" ]
    then
        npm install jslint-lite && node_modules/.bin/jslint-lite $FILE || return $?
    fi
    # test $FILE
    SCRIPT=$(node -e "
        console.log(
            (/\n *\\$ ([\S\s]+?[^\\\\])\n/)
                .exec(require('fs').readFileSync('$FILE', 'utf8'))[1]
                .replace((/\\\\\n */g), ' ')
        );
    ") || return $?
    if [ "$MODE_OFFLINE" ]
    then
        SCRIPT=$(node -e "
            console.log('$SCRIPT'.replace('npm install', 'echo'));
        ") || return $?
    fi
    printf "$SCRIPT\n\n" && eval "$SCRIPT" || return $?
}

shReadmeTestSh() {
    # this function will extract, save, and test the sh script $FILE embedded in README.md
    local FILE || return $?
    local FILE_BASENAME || return $?
    FILE=$1 || return $?
    FILE_BASENAME=$(node -e "
        console.log(require('path').basename('$FILE'));
    ") || return $?
    shBuildPrint $MODE_BUILD "testing $FILE" || return $?
    if [ "$MODE_BUILD" != "build" ]
    then
        if [ ! "$MODE_OFFLINE" ]
        then
            # init /tmp/app
            rm -fr /tmp/app /tmp/node_modules && mkdir -p /tmp/app || return $?
        fi
        # cd /tmp/app
        cd /tmp/app || return $?
    fi
    # read and parse script from README.md
    shReadmeExportFile $FILE_BASENAME $FILE || return $?
    # test $FILE
    /bin/sh $FILE || return $?
}

shRun() {
    # this function will run the command $@ and restore $CWD on exit
    # eval argv and auto-restart on non-zero exit, unless exited by SIGINT
    if [ "$npm_config_mode_auto_restart" ] && [ ! "$npm_config_mode_auto_restart_child" ]
    then
        export npm_config_mode_auto_restart_child=1
        while true
        do
            printf "(re)starting $@" || return $?
            printf "\n" || return $?
            $@
            # save $EXIT_CODE
            EXIT_CODE=$? || return $?
            printf "process exited with code $EXIT_CODE\n" || return $?
            # http://en.wikipedia.org/wiki/Unix_signal
            # exit-code 0 - normal exit
            if [ "$EXIT_CODE" = 0 ] || [ "$EXIT_CODE" = 128 ] || \
                # exit-code 2 - SIGINT
                [ "$EXIT_CODE" = 2 ] || [ "$EXIT_CODE" = 130 ] || \
                # exit-code 9 - SIGKILL
                [ "$EXIT_CODE" = 9 ] || [ "$EXIT_CODE" = 137 ] || \
                # exit-code 15 - SIGTERM
                [ "$EXIT_CODE" = 15 ] || [ "$EXIT_CODE" = 143 ]
            then
                break || return $?
            fi
            sleep 1 || return $?
        done
    # eval argv
    else
        $@
    fi
    # save $EXIT_CODE and restore $CWD
    shExitCodeSave $? || return $?
    # return $EXIT_CODE
    return $EXIT_CODE
}

shRunScreenCapture() {
    # this function will run the command $@ and screen-capture the output
    # http://www.cnx-software.com/2011/09/22
    # /how-to-convert-a-command-line-result-into-an-image-in-linux/
    # init $npm_config_dir_build
    mkdir -p $npm_config_dir_build/coverage.html || return $?
    export MODE_BUILD_SCREEN_CAPTURE=screen-capture.${MODE_BUILD-undefined}.png || return $?
    shRun $@ 2>&1 | \
        tee $npm_config_dir_tmp/screen-capture.txt || return $?
    # save $EXIT_CODE and restore $CWD
    shExitCodeSave $(cat $npm_config_file_tmp) || return $?
    # format text-output
    node -e "
        require('fs').writeFileSync(
            '$npm_config_dir_tmp/screen-capture.txt',
            require('fs').readFileSync('$npm_config_dir_tmp/screen-capture.txt', 'utf8')
                // remove ansi escape-code
                .replace((/\u001b.*?m/g), '')
                // format unicode
                .replace((/\\\\u[0-9a-f]{4}/g), function (match0) {
                    return String.fromCharCode('0x' + match0.slice(-4));
                })
                .trimRight()
        );
    " || return $?
    if (convert -list font | grep "\bCourier\b" > /dev/null 2>&1) && \
        (fold package.json > /dev/null 2>&1)
    then
        # word-wrap $npm_config_dir_tmp/screen-capture.txt to 96 characters,
        # and convert to png image
        fold -w 96 $npm_config_dir_tmp/screen-capture.txt | \
            convert -background gray25 -border 10 -bordercolor gray25 \
            -depth 4 \
            -fill palegreen -font Courier \
            -pointsize 12 \
            -quality 90 \
            -type Palette \
            label:@- $npm_config_dir_build/$MODE_BUILD_SCREEN_CAPTURE || return $?
    fi
    return $EXIT_CODE
}

shServerPortRandom() {
    # this function will print a random port in the inclusive range 0x1000 to 0xffff
    printf $(($(hexdump -n 2 -e '/2 "%u"' /dev/urandom)|32768))
}

shSlimerDetect() {
    # this function will auto-detect if slimerjs is installed and usable
    if [ ! "$npm_config_mode_no_slimerjs" ] &&
        [ ! "$npm_config_mode_slimerjs" ] &&
        [ "$(slimerjs $npm_config_dir_utility2/index.js hello 2>/dev/null)" = "hello" ]
    then
        export npm_config_mode_slimerjs=1 || return $?
    fi
}

shTmpAppCopy() {
    # this function will copy the bare git repo files to /tmp/app
    # init /tmp/app
    rm -fr /tmp/app /tmp/node_modules && mkdir -p /tmp/app || return $?
    # tar / untar repo contents to /tmp/app
    git ls-tree --name-only -r HEAD | xargs tar -czf - | tar -C /tmp/app -xzvf - || return $?
}

shTravisDecryptYml() {
    # this function will decrypt $AES_ENCRYPTED_SH in .travis.yml to stdout
    perl -ne "print \$1 if /- AES_ENCRYPTED_SH: (.*) # AES_ENCRYPTED_SH\$/" .travis.yml | \
        shAesDecrypt || return $?
}

shTravisEncrypt() {
    # this function will travis-encrypt $SECRET for the $GITHUB_REPO
    local GITHUB_REPO || return $?
    local SECRET || return $?
    GITHUB_REPO=$1 || return $?
    SECRET=$2 || return $?
    # init $npm_config_dir_build dir
    mkdir -p $npm_config_dir_build/coverage.html || return $?
    # get public rsa key from https://api.travis-ci.org/repos/<owner>/<repo>/key
    curl -fLSs https://api.travis-ci.org/repos/$GITHUB_REPO/key > $npm_config_file_tmp || \
        return $?
    perl -i -pe "s/[^-]+(.+-).+/\$1/; s/\\\\n/\n/g; s/ RSA / /g" $npm_config_file_tmp || \
        return $?
    # rsa-encrypt $SECRET and print it
    printf "$SECRET" | \
        openssl rsautl -encrypt -pubin -inkey $npm_config_file_tmp | \
        base64 | \
        tr -d "\n" || return $?
}

shTravisEncryptYml() {
    # this function will travis-encrypt $FILE to $AES_ENCRYPTED_SH and embed it in .travis.yml
    local AES_256_KEY_ENCRYPTED || return $?
    local FILE || return $?
    FILE=$1 || return $?
    if [ ! -f "$FILE" ]
    then
        printf "# non-existent file $FILE\n" || return $?
        return 1
    fi
    printf "# sourcing file $FILE\n" || return $?
    . $FILE || return $?
    if [ ! "$AES_256_KEY" ]
    then
        printf "# no \$AES_256_KEY detected in env - creating new AES_256_KEY\n" || return $?
        AES_256_KEY=$(openssl rand -hex 32) || return $?
        printf "# created new \$AES_256_KEY for encrypting data.\n" || return $?
        printf "# you may want to copy the following to your .bashrc script\n" || return $?
        printf "# so you can run builds locally:\n" || return $?
        printf "export AES_256_KEY=$AES_256_KEY\n\n" || return $?
    fi
    printf "# travis-encrypting \$AES_256_KEY for $GITHUB_REPO\n" || return $?
    AES_256_KEY_ENCRYPTED=$(shTravisEncrypt $GITHUB_REPO \$AES_256_KEY=$AES_256_KEY) || \
        return $?
    # return non-zero exit-code if $AES_256_KEY_ENCRYPTED is empty string
    if [ ! "$AES_256_KEY_ENCRYPTED" ]
    then
        return 1
    fi
    printf "# updating .travis.yml with encrypted key\n" || return $?
    perl -i -pe \
        "s%(- secure: )(.*)( # AES_256_KEY$)%\$1$AES_256_KEY_ENCRYPTED\$3%" \
        .travis.yml || return $?

    printf "# updating .travis.yml with encrypted script\n" || return $?
    perl -i -pe \
        "s%(- AES_ENCRYPTED_SH: )(.*)( # AES_ENCRYPTED_SH$)%\$1$(shAesEncrypt < $FILE)\$3%" \
        .travis.yml || return $?
}

shMain() {
    # this function will run the main program
    local COMMAND || return $?
    local DIR || return $?
    local SOURCE || return $?
    if [ ! "$1" ]
    then
      return
    fi
    COMMAND="$1" || return $?
    shift || return $?
    case "$COMMAND" in
    grep)
        shGrep "$1" "$2" || return $?
        ;;
    shRun)
        shInit && "$COMMAND" $@ || return $?
        ;;
    shRunScreenCapture)
        shInit && "$COMMAND" $@ || return $?
        ;;
    start)
        # http://stackoverflow.com/questions/59895
        # /can-a-bash-script-tell-what-directory-its-stored-in
        SOURCE="${BASH_SOURCE[0]}"
        while [ -h "$SOURCE" ]
        # resolve $SOURCE until the file is no longer a symlink
        do
            DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )" || return $?
            SOURCE="$(readlink "$SOURCE")" || return $?
            # if $SOURCE was a relative symlink,
            # we need to resolve it relative to the path where the symlink file was located
            [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" || return $?
        done
        npm_config_dir_utility2="$( cd -P "$( dirname "$SOURCE" )" && pwd )" || return $?
        npm_config_file_start=$1 \
        npm_config_mode_auto_restart=1 \
        shRun node -e "
            require('$npm_config_dir_utility2/test.js');
        " $@ || return $?
        ;;
    test)
        shInit && shNpmTest $@ || return $?
        ;;
    esac
}
shMain "$1" "$2" "$3" "$4" "$5" "$6" "$7" "$8"
