#/bin/sh
# jslint-utility2

# POSIX test utility
# http://pubs.opengroup.org/onlinepubs/9699919799/utilities/test.html

shBaseInit () {
# this function will init the base bash-login env, and is intended for aws-ec2 setup
    local FILE || return $?
    # PATH=/usr/local/bin:/usr/bin:/bin
    # init $PATH_BIN
    if [ ! "$PATH_BIN" ]
    then
        export PATH_BIN="$HOME/bin:$HOME/node_modules/.bin:/usr/local/bin:/usr/local/sbin" || \
            return $?
        export PATH="$PATH_BIN:$PATH" || return $?
    fi
    # init $PATH_OS
    case "$(uname)" in
    Darwin)
        if [ ! "$PATH_OS" ]
        then
            export PATH_OS="$HOME/bin/darwin" || return $?
            export PATH="$PATH_OS:$PATH" || return $?
        fi
        ;;
    Linux)
        if [ ! "$PATH_OS" ]
        then
            export PATH_OS="$HOME/bin/linux" || return $?
            export PATH="$PATH_OS:$PATH" || return $?
        fi
        ;;
    esac
    # init lib.utility2.sh and .bashrc2
    for FILE in "$HOME/lib.utility2.sh" "$HOME/.bashrc2"
    do
        # source $FILE
        if [ -f "$FILE" ]
        then
            . "$FILE" || return $?
        fi
    done
    # init ubuntu .bashrc
    eval shUbuntuInit || return $?
    # init custom alias
    alias lld="ls -adlF" || return $?
}

shBaseInstall () {
# this function will install .bashrc, .screenrc, .vimrc, and lib.utility2.sh in $HOME,
# and is intended for aws-ec2 setup
# example usage:
# curl -o "$HOME/lib.utility2.sh" https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/lib.utility2.sh && . $HOME/lib.utility2.sh && shBaseInstall
    for FILE in .screenrc .vimrc lib.utility2.sh
    do
        curl -Lfs -o "$HOME/$FILE" \
            "https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/$FILE" || return $?
    done
    # backup .bashrc
    if [ -f "$HOME/.bashrc" ] && [ ! -f "$HOME/.bashrc.00" ]
    then
        cp $HOME/.bashrc $HOME/.bashrc.00 || return $?
    fi
    # create .bashrc
    printf '. $HOME/lib.utility2.sh && shBaseInit\n' > "$HOME/.bashrc" || return $?
    # init .ssh/authorized_keys.root
    if [ -f "$HOME/.ssh/authorized_keys.root" ]
    then
        mv "$HOME/.ssh/authorized_keys.root" "$HOME/.ssh/authorized_keys" || return $?
    fi
    # source .bashrc
    . "$HOME/.bashrc" || return $?
}

shBrowserTest () {(set -e
# this function will spawn an electron process to test the given url $LIST,
# and merge the test-report into the existing test-report
    LIST="$1"
    export modeBrowserTest="$2"
    shBuildInit
    export MODE_BUILD="${MODE_BUILD:-browserTest}"
    shBuildPrint "electron.${modeBrowserTest} - $LIST"
    # run browser-test
    lib.utility2.js utility2.browserTest "$LIST"
    if [ "$modeBrowserTest" = test ]
    then
        # create test-report artifacts
        lib.utility2.js utility2.testReportCreate
    fi
)}

shBuildApidoc () {(set -e
# this function will build the apidoc
    shPasswordEnvUnset
    export MODE_BUILD=buildApidoc
    npm test --mode-coverage="" --mode-test-case=testCase_buildApidoc_default
)}

shBuildApp () {(set -e
# this function will build the app
    shPasswordEnvUnset
    export MODE_BUILD=buildApp
    if [ "$1" ]
    then
        unset npm_package_nameLib
        if [ ! -f package.json ]
        then
            printf "{\"name\":\"$1\"}\n" > package.json
        fi
        sed -in -e "s/\"name\": *\".*\"\(,*\)/\"name\":\"$1\"\1/" package.json
        rm -f package.jsonn
    fi
    shBuildInit
    # create file .gitignore .travis.yml LICENSE
    for FILE in .gitignore .travis.yml LICENSE
    do
        if [ ! -f "$FILE" ]
        then
            curl -Lfs -O "https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/$FILE"
        fi
    done
    # create file package.json
    shFileJsonNormalize package.json "{
    \"description\": \"the greatest app in the world!\",
    \"main\": \"lib.$npm_package_nameLib.js\",
    \"name\": \"$npm_package_name\",
    \"scripts\": {
        \"test\": \
\"(set -e; export PORT=\$(utility2 shServerPortRandom); utility2 test test.js)\"
    },
    \"version\": \"0.0.1\"
}"
    # create files README.md lib.js
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var local, tmp;
local = require('$npm_config_dir_utility2');
if (!local.fs.existsSync('README.md', 'utf8')) {
    local.fs.writeFileSync('README.md', local.templateRenderJslintLite(
        local.assetsDict['/assets.readme.template.md'],
        {}
    ));
}
if (!local.fs.existsSync('lib.$npm_package_nameLib.js', 'utf8')) {
    tmp = local.assetsDict['/assets.lib.template.js'];
    if (local.fs.existsSync('assets.utility2.rollup.js')) {
        tmp = tmp.replace(
            '        if (!local) {\n',
            '        if (local) {\n'
        );
    }
    local.fs.writeFileSync('lib.$npm_package_nameLib.js', local.templateRenderJslintLite(tmp, {}));
}
if (!local.fs.existsSync('test.js', 'utf8')) {
    tmp = local.assetsDict['/assets.test.template.js'];
    if (local.fs.existsSync('assets.utility2.rollup.js')) {
        tmp = tmp.replace(
            'require(\\u0027utility2\\u0027)',
            'require(\\u0027./assets.utility2.rollup.js\\u0027)'
        );
    }
    local.fs.writeFileSync('test.js', local.templateRenderJslintLite(tmp, {}));
}
// </script>
"
    # sync master swagger.json
    if [ -f assets.swgg.swagger.json ] &&
        [ -f "../swgg-$npm_package_swggAll/assets.swgg.swagger.json" ] &&
        [ ! assets.swgg.swagger.json -ef "../swgg-$npm_package_swggAll/assets.swgg.swagger.json" ]
    then
        cp "../swgg-$npm_package_swggAll/assets.swgg.swagger.json" .
    fi
    npm test --mode-coverage="" --mode-test-case=testCase_buildApp_default
)}

shBuildAppSwgg0 () {(set -e
# this function will build the swgg-app from scratch
# example usage:
# shBuildAppSwgg0 github-misc
# TRAVIS_REPO_CREATE_FORCE=1 shCryptoWithGithubOrg kaizhu256 shCustomOrgRepoListCreateSyncCreate kaizhu256/node-swgg-github-misc
# shNpmPublishV0 swgg-github-misc
# shCryptoWithGithubOrg kaizhu256 shGithubRepoListTouch kaizhu256/node-swgg-github-misc "[build app] npm_package_swggAll=github-all"
# update README.md
# shCryptoWithGithubOrg kaizhu256 shGithubRepoListTouch kaizhu256/node-swgg-github-misc "[git squashPop HEAD] [npm publishAfterCommitAfterBuild]"
# shCryptoWithGithubOrg kaizhu256 shGithubRepoListTouch kaizhu256/node-swgg-github-misc "[git push origin beta:master]"
    NAME="$1"
    shBuildInit
    # init swgg files
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var local;
local = require('utility2');
// init README.md
local.fs.writeFileSync('README.md', local.assetsDict['/assets.readmeCustomOrg.swgg.template.md']);
// init assets
['assets.swgg.swagger.json', 'assets.utility2.rollup.js'].forEach(function (file) {
    if (!local.fs.existsSync(file)) {
        local.fs.writeFileSync(file, local.assetsDict['/' + file]);
    }
});
// </script>
"
    sed -in \
        -e "s/github-misc/$NAME/g" \
        -e "s/github_misc/$(printf "$NAME" | tr - _)/g" \
        -e "s/    \"nameAliasPublish\": \".*\",/    \"nameAliasPublish\": \"\",/" \
        -e "s/    \"swggAll\": \".*\",/    \"swggAll\": \"$SWGG_ALL\",/" \
        README.md
    rm -f README.mdn
    shBuildApp "swgg-$NAME"
)}

shBuildCi () {(set -e
# this function will run the main build
    shBuildInit
    # init travis-ci.org env
    if [ "$TRAVIS" ]
    then
        export CI_BRANCH="${CI_BRANCH:-$TRAVIS_BRANCH}"
        export CI_HOST="${CI_HOST:-travis-ci.org}"
        git remote remove origin 2>/dev/null || true
        git remote add origin "https://github.com/$GITHUB_REPO"
    fi
    # init default env
    export CI_BRANCH="${CI_BRANCH:-alpha}"
    export CI_COMMIT_ID="${CI_COMMIT_ID:-$(git rev-parse --verify HEAD)}"
    export CI_HOST="${CI_HOST:-127.0.0.1}"
    # save $CI_BRANCH
    export CI_BRANCH_OLD="${CI_BRANCH_OLD:-$CI_BRANCH}"
    # init $CI_COMMIT_*
    export CI_COMMIT_INFO="$CI_COMMIT_ID - $CI_COMMIT_MESSAGE"
    export CI_COMMIT_MESSAGE="$(git log -1 --pretty=%s)"
    export CI_COMMIT_MESSAGE_META="$(printf "$(git log -1 --pretty=%s)" | \
        sed -e "s/\].*//" -e "s/\[//")"
    # decrypt and exec encrypted data
    if [ "$CRYPTO_AES_KEY" ]
    then
        eval "$(shCryptoTravisDecrypt)"
    fi
    # init git config
    if (! git config user.email > /dev/null 2>&1)
    then
        git config --global user.email nobody
        git config --global user.name nobody
    fi
    case "$CI_BRANCH" in
    alpha)
        case "$CI_COMMIT_MESSAGE" in
        "[build app]"*)
            case "$npm_package_name" in
            # build app.swgg
            "swgg-"*)
                if [ ! -f assets.swgg.swagger.json ]
                then
                    shBuildAppSwgg0 "$(printf "$GITHUB_REPO" | sed -e "s/.*\/node-swgg-//")"
                    shBuildInit
                fi
                if (printf "$CI_COMMIT_MESSAGE" | grep -e " npm_package_swggAll=")
                then
                    export npm_package_swggAll="$(printf "$CI_COMMIT_MESSAGE" | \
                        sed -e "s/.* npm_package_swggAll=//" -e "s/ .*//")"
                    for FILE in README.md package.json
                    do
                        sed -in \
-e "s|    \"swggAll\": \".*\",|    \"swggAll\": \"$npm_package_swggAll\",|" \
                            "$FILE"
                        rm -f "$FILE"n
                    done
                fi
                if [ "$npm_package_swggAll" ]
                then
                    (set -e
                    shGitCommandWithGithubToken clone --branch=alpha --depth=50 --single-branch \
                        "https://github.com/kaizhu256/node-swgg-$npm_package_swggAll" \
                        "../swgg-$npm_package_swggAll"
                    cd "../swgg-$npm_package_swggAll"
                    npm install
                    npm run apidocRawFetch
                    npm run apidocRawCreate
                    shBuildApp
                    )
                    shBuildApp
                    rm -fr "../swgg-$npm_package_swggAll"
                else
                    npm run apidocRawFetch
                    npm run apidocRawCreate
                    shBuildApp
                fi
                ;;
            esac
            node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var local;
local = require('utility2');
['assets.utility2.rollup.js'].forEach(function (file) {
    if (local.fs.existsSync(file)) {
        local.fs.writeFileSync(file, local.assetsDict['/' + file]);
    }
});
// </script>
"
            shBuildApp
            ;;
        "[git push origin "*)
            git fetch --depth=50 origin "$(printf "$CI_COMMIT_MESSAGE_META" | sed \
                -e "s/:.*//" -e "s/.* //")"
            eval "$(printf "$CI_COMMIT_MESSAGE_META" | sed \
                -e "s/git/shGitCommandWithGithubToken/" \
                -e "s/\([^ ]*:\)/origin\/\1/")"
            return;
            ;;
        "[git squashPop "*)
            shGitSquashPop \
                "$(shGithubRepoBranchId $(printf "$CI_COMMIT_MESSAGE_META" | sed -e "s/.* //"))" \
                "$(printf "$CI_COMMIT_MESSAGE" | sed -e "s/\[[^]]*\] //")"
            shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" -f HEAD:alpha
            return
            ;;
        "[npm publishAfterCommit]"*)
            return
            ;;
        "[npm publishAfterCommitAfterBuild]"*)
            if [ ! "$GITHUB_TOKEN" ]
            then
                shBuildPrint "no GITHUB_TOKEN"
                return 1
            fi
            shBuildCiInternal
            ;;
        *)
            shBuildCiInternal
            ;;
        esac
        ;;
    beta)
        shBuildCiInternal
        ;;
    cron)
        if [ -f .task.sh ]
        then
            /bin/sh .task.sh
        fi
        ;;
    docker.*)
        export CI_BRANCH=alpha
        shBuildCiInternal
        ;;
    master)
        shBuildCiInternal
        ;;
    publish)
        export CI_BRANCH=alpha
        # init .npmrc
        printf "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > "$HOME/.npmrc"
        if [ "$NPM_TOKEN" ] && [ ! "$npm_package_isPrivate" ]
        then
            # npm publish
            (eval shNpmPublishAlias) || true
        else
            shBuildPrint "skip npm-publish"
        fi
        # security - cleanup .npmrc
        rm -f "$HOME/.npmrc"
        case "$CI_COMMIT_MESSAGE" in
        "[npm publishAfterCommit]"*)
            shGitSquashPop HEAD~1 "[ci skip] npm published"
            shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" -f HEAD:alpha
            return
            ;;
        *)
            shSleep 5
            shBuildCiInternal
            ;;
        esac
        ;;
    task)
        case "$CI_COMMIT_MESSAGE" in
        "[\$ "*)
            eval "$(printf "$CI_COMMIT_MESSAGE_META" | sed -e "s/^...//")"
            ;;
        esac
        return
        ;;
    esac
    # restore $CI_BRANCH
    export CI_BRANCH="$CI_BRANCH_OLD"
    if [ ! "$GITHUB_TOKEN" ]
    then
        return
    fi
    case "$CI_BRANCH" in
    alpha)
        case "$CI_COMMIT_MESSAGE" in
        "[build app"*)
            # rm file package-lock.json
            rm -f package-lock.json
            git add .
            # increment $npm_package_version
            shFilePackageJsonVersionUpdate today publishedIncrement
            # update file touch.txt
            printf "$(shDateIso)\n" > .touch.txt
            git add -f .touch.txt
            # git commit and push
            git commit -am "[ci skip] $CI_COMMIT_MESSAGE"
            shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" -f HEAD:alpha
            npm run build-ci
            return
            ;;
        "[npm publish]"*)
            shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" HEAD:publish
            ;;
        "[npm publishAfterCommitAfterBuild]"*)
            # increment $npm_package_version
            shFilePackageJsonVersionUpdate today publishedIncrement
            # update file touch.txt
            printf "$(shDateIso)\n" > .touch.txt
            # git commit and push
            git add -f .touch.txt
            git commit -am "[npm publishAfterCommit]"
            export CI_BRANCH=publish
            export CI_BRANCH_OLD=publish
            export CI_COMMIT_ID="$(git rev-parse --verify HEAD)"
            find node_modules -name .git -print0 | xargs -0 rm -fr
            npm run build-ci
            ;;
        esac
        ;;
    beta)
        ;;
    master)
        git tag "$npm_package_version" || true
        shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" "$npm_package_version" || true
        ;;
    publish)
        if [ "$NPM_TOKEN" ] && [ ! "$npm_package_isPrivate" ]
        then
            # init .npmrc
            printf "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > "$HOME/.npmrc"
            shNpmPublishAliasList . "$npm_package_nameAliasPublish"
            shSleep 5
            shNpmTestPublishedList "$npm_package_nameAliasPublish"
            shSleep 5
            shNpmDeprecateAliasList "$npm_package_nameAliasDeprecate"
        else
            shBuildPrint "skip npm-publish"
        fi
        # security - cleanup .npmrc
        rm -f "$HOME/.npmrc"
        case "$CI_COMMIT_MESSAGE" in
        "[npm publishAfterCommit]"*)
            shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" -f HEAD:alpha
            shSleep 5
            shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" -f HEAD:beta
            ;;
        *)
            shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" HEAD:beta
            ;;
        esac
        ;;
    esac
    # sync with $npm_package_githubRepoAlias
    if [ "$CI_BRANCH" = alpha ] || [ "$CI_BRANCH" = beta ] || [ "$CI_BRANCH" = master ]
    then
        for GITHUB_REPO_ALIAS in $npm_package_githubRepoAlias
        do
            shGithubRepoBaseCreate "$GITHUB_REPO_ALIAS"
            shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO_ALIAS" --tags -f \
                "$CI_BRANCH"
            if [ "$CI_BRANCH" = alpha ] && [ "$npm_package_description" ]
            then
                shGithubRepoDescriptionUpdate "$GITHUB_REPO_ALIAS" "$npm_package_description"
            fi
        done
    fi
return 0
)}

shBuildCiInternal () {(set -e
# this function will run the internal build
    shBuildInit
    # run build-ci-before
    if (type shBuildCiBefore > /dev/null 2>&1)
    then
        shBuildCiBefore
    fi
    export npm_config_file_test_report_merge="$npm_config_dir_build/test-report.json"



    # npm-test
    (
    shPasswordEnvUnset
    export MODE_BUILD=npmTest
    shBuildPrint "$(du -ms node_modules | awk '{print "npm install - " $1 " megabytes"}')"
    if [ "$npm_package_buildCustomOrg" ]
    then
        export npm_config_timeout_default=120000
        rm -fr "node_modules/$npm_package_buildCustomOrg/.git"
        case "$GITHUB_ORG" in
        scrapeitall)
            ;;
        *)
            (eval shNpmInstallWithPeerDependencies "$npm_package_buildCustomOrg" --prefix .) || true
            if [ ! -d "$(shModuleDirname $npm_package_buildCustomOrg)" ]
            then
                shBuildPrint "fallback to $npm_package_buildCustomOrg tarball"
                shNpmInstallTarball "$npm_package_buildCustomOrg"
            fi
            ;;
        esac
        rm -f test.js
        shBuildApp
        case "$GITHUB_ORG" in
        npmdoc)
            npm test
            ;;
        npmtest)
            npm test --mode-coverage=all \
                --mode-coverage-dir="$(shModuleDirname $npm_package_buildCustomOrg)"
            ;;
        esac
    else
        npm test --mode-coverage
    fi
    )
    # create apidoc
    shBuildApidoc
    # create npmPackageListing
    if [ "$npm_package_buildCustomOrg" ]
    then
        shNpmPackageListingCreate "node_modules/$npm_package_buildCustomOrg"
        shNpmPackageDependencyTreeCreate "$npm_package_buildCustomOrg"
    else
        shNpmPackageListingCreate
        shNpmPackageDependencyTreeCreate "$npm_package_name"
    fi
    # create npmPackageCliHelp
    shNpmPackageCliHelpCreate
    # create recent changelog of last 50 commits
    MODE_BUILD=gitLog shRunWithScreenshotTxt git log -50 --pretty="%ai\\u000a%B"



    # screenshot coverage
    for FILE in "$npm_config_dir_build/coverage.html\
/node-$GITHUB_ORG-$npm_package_buildCustomOrg/node_modules/$npm_package_buildCustomOrg" \
        "$npm_config_dir_build/coverage.html"
    do
        FILE="$(find "$FILE" -name *.js.html 2>/dev/null | tail -n 1)"
        if [ -f "$FILE" ]
        then
            cp "$FILE" "$npm_config_dir_build/coverage.lib.html"
            break
        fi
    done
    # bug-workaround - travis-ci cannot run node in certain subprocesses
    LIST=""
    for FILE in apidoc.html coverage.lib.html test-report.html
    do
        if [ -f "$npm_config_dir_build/$FILE" ]
        then
            LIST="$LIST $npm_config_dir_build/$FILE"
        fi
    done
    MODE_BUILD=buildCi shBrowserTest "$LIST" screenshot
    if [ "$npm_package_buildCustomOrg" ]
    then
        case "$GITHUB_ORG" in
        npmtest)
            shBuildApp
            ;;
        esac
        rm -fr "$npm_package_buildCustomOrg"
    fi



    if [ ! "$GITHUB_TOKEN" ]
    then
        shBuildPrint "no GITHUB_TOKEN"
        return
    fi
    # build and deploy app to github
    shBuildApp && shBuildGithubUpload && shSleep 15
    # run build-ci-after
    if (type shBuildCiAfter > /dev/null 2>&1)
    then
        shBuildCiAfter
    fi
    # wait for background tasks to finish
    shSleep 15
    # list $npm_config_dir_build
    find "$npm_config_dir_build" | sort
    # upload build-artifacts to github, and if number of commits > $COMMIT_LIMIT,
    # then squash older commits
    if [ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ]
    then
        COMMIT_LIMIT=20 shBuildGithubUpload
    fi
    # validate http-links embedded in README.md
    shSleep 60
    [ "$npm_package_isPrivate" ] || shReadmeLinkValidate
    shGitInfo
)}

shBuildGithubUpload () {(set -e
# this function will upload build-artifacts to github
    export MODE_BUILD="${MODE_BUILD:-buildGithubUpload}"
    shBuildPrint "uploading build-artifacts to https://github.com/$GITHUB_REPO"
    URL="https://github.com/$GITHUB_REPO"
    # init $DIR
    DIR="$npm_config_dir_tmp/buildGithubUpload"
    rm -fr "$DIR"
    shGitCommandWithGithubToken clone "$URL" --single-branch -b gh-pages "$DIR"
    cd "$DIR"
    # cleanup screenshot
    rm -f build/*127.0.0.1*
    case "$CI_COMMIT_MESSAGE" in
    "[build clean]"*)
        shBuildPrint "[build clean]"
        rm -fr build
        ;;
    esac
    # copy build-artifacts
    cp -a "$npm_config_dir_build" .
    rm -fr "build..$CI_BRANCH..$CI_HOST"
    cp -a "$npm_config_dir_build" "build..$CI_BRANCH..$CI_HOST"
    # disable github-jekyll
    touch .nojekyll
    # git-add .
    git add .
    # git-commit
    git commit -am "[ci skip] update gh-pages" || true
    # if number of commits > $COMMIT_LIMIT,
    # then backup current git-repo-branch to git-repo-branch.backup,
    # and then squash to $COMMIT_LIMIT/2 in git-repo-branch
    if [ "$COMMIT_LIMIT" ] && [ "$(git rev-list HEAD --count)" -gt "$COMMIT_LIMIT" ]
    then
        shGitCommandWithGithubToken push "$URL" -f HEAD:gh-pages.backup
        shGitSquashShift "$(($COMMIT_LIMIT/2))"
    fi
    shGitCommandWithGithubToken push "$URL" -f HEAD:gh-pages
    if [ "$CI_BRANCH" = alpha ] && [ "$npm_package_description" ]
    then
        shGithubRepoDescriptionUpdate "$GITHUB_REPO" "$npm_package_description"
    fi
)}

shBuildInit () {
# this function will init the env
    # init $npm_config_dir_electron
    if [ ! "$npm_config_dir_electron" ]
    then
        [ ! -f lib.electron.js ] || export npm_config_dir_electron="$PWD"
        export npm_config_dir_electron="${npm_config_dir_electron:-\
$(shModuleDirname electron-lite)}" || return $?
        export npm_config_dir_electron="${npm_config_dir_electron:-\
$HOME/node_modules/electron-lite}" || return $?
        export PATH="$PATH:$npm_config_dir_electron:$npm_config_dir_electron/../.bin" || \
            return $?
    fi
    # init $npm_config_dir_utility2
    if [ ! "$npm_config_dir_utility2" ]
    then
        [ ! -f lib.utility2.js ] || export npm_config_dir_utility2="$PWD"
        export npm_config_dir_utility2="${npm_config_dir_utility2:-\
$(shModuleDirname utility2)}" || return $?
        export npm_config_dir_utility2="${npm_config_dir_utility2:-\
$HOME/node_modules/utility2}" || return $?
        export PATH="$PATH:$npm_config_dir_utility2:$npm_config_dir_utility2/../.bin" || \
            return $?
    fi
    # init $npm_package_*
    if [ -f package.json ]
    then
        eval "$(node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var packageJson, value;
packageJson = require('./package.json');
Object.keys(packageJson).forEach(function (key) {
    value = packageJson[key];
    if (!(/\W/g).test(key) && typeof value === 'string' && !(/[\n\$]/).test(value)) {
        process.stdout.write('export npm_package_' + key + '=\'' +
            value.replace((/'/g), '\'\"\'\"\'') + '\';');
    }
});
value = String((packageJson.repository && packageJson.repository.url) ||
    packageJson.repository ||
    '')
    .split(':').slice(-1)[0].toString()
    .split('/')
    .slice(-2)
    .join('/')
    .replace((/\.git\$/), '');
if ((/^[^\/]+\/[^\/]+\$/).test(value)) {
    value = value.split('/');
    if (!process.env.GITHUB_REPO) {
        process.env.GITHUB_REPO = value.join('/');
        process.stdout.write('export GITHUB_REPO=' + JSON.stringify(process.env.GITHUB_REPO) +
            ';');
    }
    if (!process.env.GITHUB_ORG) {
        process.env.GITHUB_ORG = value[0];
        process.stdout.write('export GITHUB_ORG=' + JSON.stringify(process.env.GITHUB_ORG) +
            ';');
    }
    if (!process.env.npm_package_buildCustomOrg &&
            value.join('/').indexOf(value[0] + '/node-' + value[0] + '-') === 0) {
        process.env.npm_package_buildCustomOrg = value
            .join('/')
            .replace(value[0] + '/node-' + value[0] + '-', '');
        process.stdout.write('export npm_package_buildCustomOrg=' +
            JSON.stringify(process.env.npm_package_buildCustomOrg) + ';');
    }
}
// </script>
")" || return $?
    else
        export npm_package_name=my-app || return $?
        export npm_package_version=0.0.1 || return $?
    fi
    export npm_package_nameLib=\
"${npm_package_nameLib:-$(printf "$npm_package_name" | sed \
        -e "s/[^0-9A-Z_a-z]/_/g")}" || return $?
    # init $npm_config_*
    export npm_config_dir_build="${npm_config_dir_build:-$PWD/tmp/build}" || return $?
    mkdir -p "$npm_config_dir_build/coverage.html" || return $?
    export npm_config_dir_tmp="$PWD/tmp" || return $?
    mkdir -p "$npm_config_dir_tmp" || return $?
    export npm_config_file_tmp="${npm_config_file_tmp:-$PWD/tmp/tmpfile}" || return $?
    # extract and save the scripts embedded in README.md to tmp/
    if [ -f README.md ] && [ ! "$npm_package_buildCustomOrg" ]
    then
        node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
require('fs').readFileSync('README.md', 'utf8').replace((
    /\`\`\`\\w*?(\n[\\W\\s]*?(\w\S*?)[\n\"][\\S\\s]+?)\n\`\`\`/g
), function (match0, match1, match2, ii, text) {
    // preserve lineno
    match0 = text.slice(0, ii).replace((/.+/g), '') + match1
        // parse '\' line-continuation
        .replace((/(?:.*\\\\\n)+.*/g), function (match0) {
            return match0.replace((/\\\\\n/g), '') + match0.replace((/.+/g), '');
        });
    // trim json-file
    if (match2.slice(-5) === '.json') {
        match0 = match0.trim();
    }
    require('fs').writeFileSync('tmp/README.' + match2, match0.trimRight() + '\n');
});
// </script>
"
    fi
}

shBuildInsideDocker () {(set -e
# this function will run the build inside docker
    shPasswordEnvUnset
    export npm_config_unsafe_perm=1
    # start xvfb
    shXvfbStart
    # bug-workaround - Cannot read property 'target' of null #10686
    # https://github.com/npm/npm/issues/10686
    sed -in -e 's/  "_requiredBy":/  "_requiredBy_":/' package.json
    rm -f package.jsonn
    # npm-install
    npm install
    # npm-test
    npm test --mode-coverage
    # cleanup tmp
    rm -fr tmp
    # cleanup build
    shDockerBuildCleanup
)}

shBuildPrint () {(set -e
# this function will print debug info about the build state
    printf '%b' "\n\033[35m[MODE_BUILD=$MODE_BUILD]\033[0m - $(shDateIso) - $@\n\n" 1>&2
)}

shChromeSocks5 () {(set -e
# this function will run chrome with socks5 proxy
# https://sites.google.com/a/chromium.org/dev/developers/design-documents/network-stack/socks-proxy
    if [ "$1" = "canary" ]
    then
        /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary\
            --proxy-bypass-list="127.*;192.*;localhost"\
            --proxy-server="socks5://localhost:2080"\
            --host-resolver-rules="MAP * 0.0.0.0, EXCLUDE localhost" "$@" || return $?
    else
        /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome\
            --proxy-bypass-list="127.*;192.*;localhost"\
            --proxy-server="socks5://localhost:2080"\
            --host-resolver-rules="MAP * 0.0.0.0, EXCLUDE localhost" "$@" || return $?
    fi
)}

shCryptoTravisDecrypt () {(set -e
# this function will use $CRYPTO_AES_KEY to decrypt $SH_ENCRYPTED to stdout
    shBuildInit
    export MODE_BUILD=cryptoTravisDecrypt
    FILE="$HOME/.ssh/CRYPTO_AES_SH_DECRYPTED_$GITHUB_ORG"
    if [ ! "$CRYPTO_AES_KEY" ] && [ -f "$FILE" ]
    then
        shBuildPrint ". $FILE"
        . "$FILE"
    fi
    if [ ! "$CRYPTO_AES_KEY" ]
    then
        eval "CRYPTO_AES_KEY=$(printf "\$CRYPTO_AES_KEY_$GITHUB_ORG")"
    fi
    if [ ! "$CRYPTO_AES_KEY" ]
    then
        shBuildPrint "no CRYPTO_AES_KEY"
        return 1
    fi
    # init $SH_ENCRYPTED
    SH_ENCRYPTED="${1:-"$(curl -#Lf "https://raw.githubusercontent.com\
/kaizhu256/node-utility2/gh-pages/CRYPTO_AES_SH_ENCRYPTED_$GITHUB_ORG")"}"
    # init $IV from first 44 base64-encoded bytes of $SH_ENCRYPTED
    IV="$(printf "$SH_ENCRYPTED" | cut -c1-44 | base64 --decode)"
    # decrypt remaining base64-encoded bytes of $SH_ENCRYPTED to stdout using aes-256-cbc
    printf "$SH_ENCRYPTED" | \
        cut -c45-9999 | \
        base64 --decode | \
        openssl enc -aes-256-cbc -d -K "$CRYPTO_AES_KEY" -iv "$IV"
)}

shCryptoTravisEncrypt () {(set -e
# this function will encrypt $CRYPTO_AES_SH_ENCRYPTED to .travis.yml,
# and use $CRYPTO_AES_KEY to encrypt $FILE to stdout
    shBuildInit
    export MODE_BUILD=cryptoTravisEncrypt
    FILE="$HOME/.ssh/CRYPTO_AES_SH_DECRYPTED_$GITHUB_ORG"
    if [ ! "$CRYPTO_AES_KEY" ] && [ -f "$FILE" ]
    then
        shBuildPrint ". $FILE"
        . "$FILE"
    fi
    if [ ! "$CRYPTO_AES_KEY" ]
    then
        shBuildPrint "no CRYPTO_AES_KEY"
        return 1
    fi
    if [ -f .travis.yml ]
    then
        URL="https://api.travis-ci.org/repos/$GITHUB_REPO/key"
        shBuildPrint "fetch $URL"
        curl -#Lf "$URL" | \
            sed -n \
                -e "s/.*-----BEGIN [RSA ]*PUBLIC KEY-----\(.*\)-----END [RSA ]*PUBLIC KEY-----.*/\
-----BEGIN PUBLIC KEY-----\\1-----END PUBLIC KEY-----/" \
                -e "s/\\\\n/%/gp" | \
            tr "%" "\n" > "$npm_config_file_tmp"
        CRYPTO_AES_KEY_ENCRYPTED="$(printf "CRYPTO_AES_KEY=$CRYPTO_AES_KEY" | \
            openssl rsautl -encrypt -pubin -inkey "$npm_config_file_tmp" | \
            base64 | \
            tr -d "\n")"
        if [ ! "$CRYPTO_AES_KEY_ENCRYPTED" ]
        then
            shBuildPrint "no CRYPTO_AES_KEY_ENCRYPTED"
            return 1
        fi
        sed -in \
            -e "s|\(- secure: \).*\( # CRYPTO_AES_KEY$\)|\\1$CRYPTO_AES_KEY_ENCRYPTED\\2|" \
            .travis.yml
        rm -f .travis.ymln
        shBuildPrint "updated .travis.yml with CRYPTO_AES_KEY_ENCRYPTED"
    fi
    if [ ! -f "$FILE" ]
    then
        return
    fi
    shBuildPrint "CRYPTO_AES_SH_ENCRYPTED:"
    # init $IV from random 16 bytes
    IV="$(openssl rand -hex 16)"
    # print base64-encoded $IV to stdout
    printf "$(printf "$IV" | base64)"
    # encrypt $FILE to stdout using aes-256-cbc with base64-encoding
    openssl enc -aes-256-cbc -K "$CRYPTO_AES_KEY" -in "$FILE" -iv "$IV" | base64 | tr -d "\n"
    printf "\n"
)}

shCryptoWithGithubOrg () {(set -e
# this function will run $@ with private $GITHUB_ORG-env
    export GITHUB_ORG="$1"
    shift
    . "$HOME/.ssh/CRYPTO_AES_SH_DECRYPTED_$GITHUB_ORG"
    "$@"
)}

shCustomOrgBuildCi () {(set -e
# this function will run build-ci on the customOrg GITHUB_REPO
    # reset env
    unset CI_BRANCH
    unset CI_BRANCH_OLD
    unset CI_COMMIT_ID
    unset CI_COMMIT_INFO
    unset CI_COMMIT_MESSAGE
    unset CI_COMMIT_MESSAGE_META
    unset CI_HOST
    unset GITHUB_REPO
    unset GITHUB_ORG
    unset MODE_BUILD
    eval "$(env | sort | grep -oe "^npm_\w*" | sed -e "s/\(\w*\)/unset \1/")"
    # git-clone $GITHUB_REPO
    export GITHUB_REPO="$1"
    DIR="/tmp/$GITHUB_REPO"
    mkdir -p "$DIR"
    rm -fr "/tmp/$GITHUB_REPO"
    git clone --branch=alpha --depth=50 --single-branch "https://github.com/$GITHUB_REPO" "$DIR"
    cd "$DIR"
    if (
        export CI_BRANCH=alpha
        printf "$(shDateIso)\n" > .touch.txt
        git add -f .touch.txt
        git commit -m "[npm publishAfterCommitAfterBuild]"
        # npm-install
        npm install
        # build-ci
        npm run build-ci
    )
    then
        printf "$(shDateIso)\n" > .touch.txt
        git add -f .touch.txt
        git commit -m "[npm publishAfterCommit]"
    else
        printf "$(shDateIso)\n" > .touch.txt
        git add -f .touch.txt
        git commit -m "[npm publishAfterCommitAfterBuild]"
    fi
    shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" -f HEAD:alpha
)}

shCustomOrgNameNormalize () {(set -e
# this function will normalize the customOrg name $1
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
console.log(process.argv[1]
    .toLowerCase()
    .replace((/$GITHUB_ORG\/node-$GITHUB_ORG-/g), '')
    .replace((/\S+/g), function (match0) {
        return match0.length >= 64 || new RegExp('[^\\\\w\\\\-.]|(?:^(?:[^a-z]|' +
            'npmclassic|' +
            'npmdoc|' +
            'npmlite|' +
            'npmstable|' +
            'npmtest|' +
            'scrapeitall))').exec(match0)
            ? ''
            : '$GITHUB_ORG/node-$GITHUB_ORG-' + match0;
    })
    .replace((/\s{2,}/), '\n')
    .trimLeft());
// </script>
" "$@"
)}

shCustomOrgRepoListCreate () {(set -e
# this function will create and push the customOrg-repo $GITHUB_ORG/node-$GITHUB_ORG-$LIST[ii]
# https://docs.travis-ci.com/api
# example usage:
# TRAVIS_REPO_CREATE_FORCE=1 shCryptoWithGithubOrg kaizhu256 shCustomOrgRepoListCreate "kaizhu256/node-sandbox2 kaizhu256/node-sandbox3"
# sleep 5
# shCryptoWithGithubOrg kaizhu256 shTravisSync
# sleep 5
# TRAVIS_REPO_CREATE_FORCE=1 shCryptoWithGithubOrg kaizhu256 shCustomOrgRepoListCreate kaizhu256/node-sandbox2
    LIST="$1"
    export MODE_BUILD=shCustomOrgRepoListCreate
    cd /tmp



    if [ ! "$TRAVIS_REPO_CREATE_FORCE" ]
    then
        shBuildPrint "filtering non-existent or active travis-repos from $LIST ..."
        LIST2=""
        for GITHUB_REPO in $LIST
        do
            LIST2="$LIST2
if (curl -Lfs https://api.travis-ci.org/repos/$GITHUB_REPO | \
    grep -e ',\"active\":' | \
    grep -qve ',\"active\":true'); \
then \
    printf \"$GITHUB_REPO\n\"; \
fi
"
        done
        LIST="$(shOnParallelListExec "$LIST2")"
        shBuildPrint "... filtered non-existent or active travis-repos from $LIST"
    fi



    if [ ! "$LIST" ]
    then
        return
    fi



    shBuildPrint "creating github-repos $LIST ..."
    # init /tmp/githubRepoBase
    if [ ! -d /tmp/githubRepoBase ]
    then
    (
        git clone https://github.com/kaizhu256/base /tmp/githubRepoBase
        cd /tmp/githubRepoBase
        git checkout -b alpha origin/alpha || true
        git checkout -b beta origin/beta || true
        git checkout -b gh-pages origin/gh-pages || true
        git checkout -b master origin/master || true
        git checkout -b publish origin/publish || true
        git checkout alpha
    )
    fi
    LIST2=""
    for GITHUB_REPO in $LIST
    do
        LIST2="$LIST2
shGithubRepoBaseCreate $GITHUB_REPO"
    done
    shOnParallelListExec "$LIST2"
    shBuildPrint "... created github-repos $LIST"



    # bug-workaround - travis-ci cannot run node in certain subprocesses
    shBuildPrint "creating $GITHUB_ORG-repos $LIST ..."
    shSleep 5
    LIST2=""
    for GITHUB_REPO in $LIST
    do
        NAME="$(printf "$GITHUB_REPO" | sed -e "s/^$GITHUB_ORG\/node-//")"
        LIST2="$LIST2
(set -e; \
shBuildPrint \"creating $GITHUB_ORG-repo $GITHUB_REPO ...\"; \
TRAVIS_REPO_ID=\"\$(curl -#Lf https://api.travis-ci.org/repos/$GITHUB_REPO | \
    grep -oe '\"id\":[^,]*' | \
    sed -e 's/.*://')\"; \
if [ ! \$TRAVIS_REPO_ID ]; \
then \
    shBuildPrint \"error - travis-repo not found - $GITHUB_REPO\" 1>&2; \
    exit; \
fi; \
curl -#Lf \
    -H \"Authorization: token $TRAVIS_ACCESS_TOKEN\" \
    -H \"Content-Type: application/json; charset=UTF-8\" \
    -X PUT \
    -d '{\"hook\":{\"active\":true}}' \
    \"https://api.travis-ci.org/hooks/\$TRAVIS_REPO_ID\"; \
sleep 5; \
curl -#Lf \
    -H \"Authorization: token $TRAVIS_ACCESS_TOKEN\" \
    -H \"Content-Type: application/json; charset=UTF-8\" \
    -H \"Travis-API-Version: 3\" \
    -X PATCH \
    -d '{\"setting.value\":true}' \
    \"https://api.travis-ci.org/repo/\$TRAVIS_REPO_ID/setting/builds_only_with_travis_yml\"; \
sleep 1; \
curl -#Lf \
    -H \"Authorization: token $TRAVIS_ACCESS_TOKEN\" \
    -H \"Content-Type: application/json; charset=UTF-8\" \
    -H \"Travis-API-Version: 3\" \
    -X PATCH \
    -d '{\"setting.value\":true}' \
    \"https://api.travis-ci.org/repo/\$TRAVIS_REPO_ID/setting/auto_cancel_pushes\"; \
sleep 1; \
if [ ! -d /tmp/$GITHUB_REPO ]; \
then \
    shGithubRepoBaseCreate $GITHUB_REPO; \
fi; \
cd /tmp/$GITHUB_REPO; \
touch README.md; \
curl -Lfs -O https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/.gitignore; \
curl -Lfs -O https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/.travis.yml; \
printf '{ \
    \"devDependencies\": { \
        \"electron-lite\": \"kaizhu256/node-electron-lite#alpha\", \
        \"utility2\": \"kaizhu256/node-utility2#alpha\" \
    }, \
    \"name\":\"$NAME\", \
    \"homepage\": \"https://github.com/$GITHUB_REPO\", \
    \"repository\": { \
        \"type\": \"git\", \
        \"url\": \"https://github.com/$GITHUB_REPO.git\" \
    }, \
    \"scripts\": { \
        \"build-ci\": \"utility2 shReadmeTest build_ci.sh\" \
    }, \
    \"version\": \"0.0.1\" \
}' > package.json; \
sed -in -e 's/kaizhu256-kaizhu256.//' package.json; \
rm -f package.jsonn; \
sed -in -e 's/.*CRYPTO_AES_SH_ENCRYPTED.*//' .travis.yml; \
rm -f .travis.ymln; \
shCryptoTravisEncrypt; \
git add -f . .gitignore .travis.yml; \
git commit -am \"[npm publishAfterCommitAfterBuild]\"; \
shGitCommandWithGithubToken push https://github.com/$GITHUB_REPO -f alpha; \
shBuildPrint \"... created $GITHUB_ORG-repo $GITHUB_REPO\"; \
)"
    done
    shOnParallelListExec "$LIST2"
    shBuildPrint "... created $GITHUB_ORG-repos $LIST"
)}

shCustomOrgRepoListCreateSyncCreate () {(set -e
# this function will create, sync, create the customOrg-repo $GITHUB_ORG/node-$GITHUB_ORG-$LIST[ii]
# example usage:
# TRAVIS_REPO_CREATE_FORCE=1 shCryptoWithGithubOrg kaizhu256 shCustomOrgRepoListCreateSyncCreate kaizhu256/node-sandbox2
    LIST="$1"
    shCustomOrgRepoListCreate "$LIST"
    shSleep 5
    shTravisSync
    shSleep 5
    shCustomOrgRepoListCreate "$LIST"
)}

shDateIso () {(set -e
# this function will print the current date in ISO format with the given $OFFSET in ms
    OFFSET="$1"
    node -e "console.log(new Date(Date.now() + Number($OFFSET)).toISOString())"
)}

shDebugArgv () {
# this function will print $1 $2 $3 $4 in separte lines
    DEBUG_ARG1="$1"
    DEBUG_ARG2="$2"
    DEBUG_ARG3="$3"
    DEBUG_ARG4="$4"
    DEBUG_ARG5="$5"
    DEBUG_ARG6="$6"
    DEBUG_ARG7="$7"
    DEBUG_ARG8="$8"
    DEBUG_ARG9="$9"
    printf "DEBUG_ARG1='$DEBUG_ARG1'
DEBUG_ARG2='$DEBUG_ARG2'
DEBUG_ARG3='$DEBUG_ARG3'
DEBUG_ARG4='$DEBUG_ARG4'
DEBUG_ARG5='$DEBUG_ARG5'
DEBUG_ARG6='$DEBUG_ARG6'
DEBUG_ARG7='$DEBUG_ARG7'
DEBUG_ARG8='$DEBUG_ARG8'
DEBUG_ARG9='$DEBUG_ARG9'
"
}

shDeployCustom () {
# this function will do nothing
    return
}

shDeployGithub () {(set -e
# this function will deploy the app to $GITHUB_REPO
# and run a simple curl check for $TEST_URL
# and test $TEST_URL
    export MODE_BUILD=deployGithub
    export TEST_URL=\
"https://$(printf "$GITHUB_REPO" | sed -e "s/\//.github.io\//")/build..$CI_BRANCH..travis-ci.org/app"
    shBuildPrint "deployed to $TEST_URL"
    # verify deployed app's main-page returns status-code < 400
    shSleep 15
    if [ "$(curl --connect-timeout 60 -Ls -o /dev/null -w "%{http_code}" "$TEST_URL")" -lt 400 ]
    then
        shBuildPrint "curl test passed for $TEST_URL"
    else
        shBuildPrint "curl test failed for $TEST_URL"
        return 1
    fi
    # screenshot deployed app
    shBrowserTest "$TEST_URL $TEST_URL/assets.swgg.html" screenshot
    # test deployed app
    MODE_BUILD="${MODE_BUILD}Test" shBrowserTest "$TEST_URL?modeTest=1&timeExit={{timeExit}}" \
        test
)}

shDeployHeroku () {(set -e
# this function will deploy the app to heroku
# and run a simple curl check for $TEST_URL
# and test $TEST_URL
    export npm_package_nameHeroku=\
"${npm_package_nameHeroku:-$(printf "h1-$npm_package_nameLib" | tr "_" "-")}"
    # build app inside heroku
    if [ "$npm_lifecycle_event" = heroku-postbuild ]
    then
        shBuildApp
        cp "$npm_config_dir_build"/app/*.js .
        printf "web: npm_config_mode_backend=1 node assets.app.js\n" > Procfile
        rm -fr tmp
        return
    fi
    export MODE_BUILD=deployHeroku
    export TEST_URL="https://$npm_package_nameHeroku-$CI_BRANCH.herokuapp.com"
    shBuildPrint "deployed to $TEST_URL"
    # verify deployed app's main-page returns status-code < 400
    shSleep 15
    if [ "$(curl --connect-timeout 60 -Ls -o /dev/null -w "%{http_code}" "$TEST_URL")" -lt 400 ]
    then
        shBuildPrint "curl test passed for $TEST_URL"
    else
        shBuildPrint "curl test failed for $TEST_URL"
        return 1
    fi
    # screenshot deployed app
    shBrowserTest "$TEST_URL $TEST_URL/assets.swgg.html" screenshot
    # test deployed app
    MODE_BUILD="${MODE_BUILD}Test" shBrowserTest "$TEST_URL?modeTest=1&timeExit={{timeExit}}" \
        test
)}

shDockerBuildCleanup () {(set -e
# this function will cleanup the docker build
# apt list --installed
    rm -fr \
        /root/.npm \
        /tmp/.* \
        /tmp/* \
        /var/cache/apt \
        /var/lib/apt/lists \
        /var/log/.* \
        /var/log/* \
        /var/tmp/.* \
        /var/tmp/* \
        2>/dev/null || true
)}

shDockerCopyFromImage () {(set -e
# this function will copy the $FILE_FROM from the docker $IMAGE to $FILE_TO
# http://stackoverflow.com/questions/25292198
# /docker-how-can-i-copy-a-file-from-an-image-to-a-host
    IMAGE="$1"
    FILE_FROM="$2"
    FILE_TO="$3"
    # create $CONTAINER from $IMAGE
    CONTAINER="$(docker create "$IMAGE")"
    docker cp "$CONTAINER:$FILE_FROM" "$FILE_TO"
    # cleanup $CONTAINER
    docker rm -fv "$CONTAINER"
)}

shDockerInstall () {(set -e
# this function will install docker
    mkdir -p "$HOME/docker"
    curl -Lfs https://get.docker.com/ | /bin/sh
    # test docker
    docker run hello-world
)}

shDockerLogs () {(set -e
# this function log the docker container $1
    docker logs --tail=256 -f "$1"
)}

shDockerNpmRestart () {(set -e
# this function will npm-restart the app inside the docker-container $IMAGE:$NAME
    NAME="$1"
    IMAGE="$2"
    DIR="$3"
    DOCKER_PORT="$4"
    shDockerRestart $NAME $IMAGE /bin/sh -c "set -e
        curl -Lfs \
            https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/lib.utility2.sh \
            > /tmp/lib.utility2.sh
        . /tmp/lib.utility2.sh
        cd $DIR
        PORT=$DOCKER_PORT npm start
"
)}

shDockerRestart () {(set -e
# this function will restart the docker-container
    docker rm -fv "$1" || true
    shDockerStart "$@"
)}

shDockerRestartElasticsearch () {(set -e
# this function will restart the elasticsearch docker-container
# https://hub.docker.com/_/elasticsearch/
    case "$(uname)" in
    Linux)
        LOCALHOST="${LOCALHOST:-127.0.0.1}"
        ;;
    *)
        LOCALHOST="${LOCALHOST:-192.168.99.100}"
        ;;
    esac
    docker rm -fv elasticsearch || true
    mkdir -p "$HOME/docker/elasticsearch.data"
    docker run --name elasticsearch -d \
        -p "$LOCALHOST:9200:9200" \
        -v "$HOME/docker/elasticsearch.data:/elasticsearch/data" \
        kaizhu256/node-utility2:elasticsearch \
    /bin/sh -c "set -e
        printf '
server {
    listen 9200;
    location / {
        client_max_body_size 256M;
        proxy_pass http://127.0.0.1:9201\$request_uri;
    }
    location /assets {
        root /elasticsearch/data;
        sendfile off;
    }
    location /kibana {
        root /;
    }
    location /swagger-ui {
        root /;
    }
}
' > /etc/nginx/conf.d/default.conf
        mkdir -p /var/log/nginx
        touch /var/log/nginx/access.log
        tail -f /var/log/nginx/access.log &
        touch /var/log/nginx/error.log
        tail -f /dev/stderr /var/log/nginx/error.log &
        /etc/init.d/nginx start
        sed -in -e 's/http:\/\/petstore.swagger.io\/v2/\/assets/' /swagger-ui/index.html
        rm -f /swagger-ui/index.htmln
        /elasticsearch/bin/elasticsearch -Des.http.port=9201
        sleep infinity
"
)}

shDockerRestartNginx () {(set -e
# this function will restart the nginx docker-container
    # init $HOME/docker/etc.nginx.htpasswd.private
    FILE="$HOME/docker/etc.nginx.htpasswd.private"
    if [ ! -f "$FILE" ]
    then
        printf "foo:$(openssl passwd -crypt bar)\n" > $FILE
    fi
    # init $HOME/docker/etc.nginx.htpasswd.share
    FILE="$HOME/docker/etc.nginx.htpasswd.share"
    if [ ! -f "$FILE" ]
    then
        printf "foo:$(openssl passwd -crypt bar)\n" > $FILE
    fi
    # init $HOME/docker/etc.nginx.conf.d.default.conf
    # https://www.nginx.com/resources/wiki/start/topics/examples/full/#nginx-conf
    FILE="$HOME/docker/etc.nginx.conf.d/default.conf"
    if [ ! -f "$FILE" ]
    then
        mkdir -p "$HOME/docker/etc.nginx.conf.d"
        printf '
# http server
server {
    listen 8080;
    # redirect to https
    location / {
        rewrite ^ https://$host$request_uri permanent;
    }
}
# https server
# https://www.nginx.com/resources/wiki/start/topics/examples/SSL-Offloader/#sslproxy-conf
server {
    listen 443;
    root /root/docker/usr.share.nginx.html;
    ssl_certificate /root/docker/etc.nginx.ssl.cert.pem;
    ssl_certificate_key /root/docker/etc.nginx.ssl.key.pem;
    ssl on;
    ssl_prefer_server_ciphers on;
    ssl_protocols TLSv1.2;
    location / {
        index index.html index.htm;
    }
    location /private {
        auth_basic on;
        auth_basic_user_file /root/docker/etc.nginx.htpasswd.private;
        autoindex on;
    }
    location /share {
        auth_basic on;
        auth_basic_user_file /root/docker/etc.nginx.htpasswd.share;
        autoindex on;
    }
}
' > "$FILE"
    fi
    # init $HOME/docker/etc.nginx.ssl
    # http://superuser.com/questions/226192/openssl-without-prompt
    FILE="$HOME/docker/etc.nginx.ssl"
    if [ ! -f "$FILE.pem" ]
    then
        openssl req -days 365 -keyout "$FILE.key" -new -newkey rsa:4096 -nodes \
            -out "$FILE.pem" -subj "/C=AU" -x509
    fi
    # init $HOME/docker/usr.share.nginx.html
    mkdir -p "$HOME/docker/usr.share.nginx.html"
    docker rm -fv nginx || true
    # https://registry.hub.docker.com/_/nginx/
    docker run --name nginx -d \
        -p 80:8080 \
        -p 443:443 \
        -v "$HOME:/root:ro" \
        -v "$HOME/docker/etc.nginx.conf.d:/etc/nginx/conf.d:ro" \
        kaizhu256/node-utility2:latest \
    /bin/sh -c "set -e
        mkdir -p /var/log/nginx
        touch /var/log/nginx/access.log
        tail -f /var/log/nginx/access.log &
        touch /var/log/nginx/error.log
        tail -f /dev/stderr /var/log/nginx/error.log &
        /etc/init.d/nginx start
        sleep infinity
"
)}

shDockerRestartTransmission () {(set -e
# this function will restart the transmission docker-container
# http://transmission:transmission@127.0.0.1:9091
    case "$(uname)" in
    Linux)
        LOCALHOST="${LOCALHOST:-127.0.0.1}"
        ;;
    *)
        LOCALHOST="${LOCALHOST:-192.168.99.100}"
        ;;
    esac
    mkdir -p "$HOME/downloads"
    docker rm -fv transmission || true
    docker run --name transmission -d \
        -p "$LOCALHOST:9091:9091" \
        -v "$HOME/downloads:/root" \
        kaizhu256/node-utility2:latest \
    /bin/sh -c "transmission-daemon \
        --allowed \\* \
        --download-dir /root/complete \
        --encryption-required \
        --foreground \
        --global-seedratio 0 \
        --incomplete-dir /root/incomplete \
        --log-info \
        --no-auth \
        --no-portmap
"
)}

shDockerRm () {(set -e
# this function will rm the docker-containers $@
    docker rm -fv "$@" || true
)}

shDockerRmAll () {(set -e
# this function will rm all docker-containers
    docker rm -fv $(docker ps -aq) || true
)}

shDockerRmExited () {(set -e
# this function will rm all docker-containers that have exited
    docker rm -fv $(docker ps -aqf status=exited) || true
)}

shDockerRmSince () {(set -e
# this function will rm all docker-containers since $NAME
    NAME="$1"
    docker rm -fv $(docker ps -aq --since="$NAME") || true
)}

shDockerRmiUntagged () {(set -e
# this function will rm all untagged docker images
    docker rmi $(docker images -aqf dangling=true) 2>/dev/null || true
)}

shDockerSh () {(set -e
# this function will run /bin/bash in the docker-container $NAME
# http://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html
    NAME="$1"
    COMMAND="${2:-/bin/bash}"
    docker start "$NAME"
    docker exec -it "$NAME" $COMMAND
)}

shDockerStart () {(set -e
# this function will start the docker-container $IMAGE:$NAME with the command $@
    case "$(uname)" in
    Linux)
        LOCALHOST="${LOCALHOST:-127.0.0.1}"
        ;;
    *)
        LOCALHOST="${LOCALHOST:-192.168.99.100}"
        ;;
    esac
    NAME="$1"
    shift
    IMAGE="$1"
    shift
    if [ "$DOCKER_PORT" ]
    then
        DOCKER_OPTIONS="$DOCKER_OPTIONS -p $LOCALHOST:$DOCKER_PORT:$DOCKER_PORT"
    fi
    DOCKER_ROOT="${DOCKER_HOME:-$HOME}"
    if [ ! "$DOCKER_SANDBOX" ]
    then
        DOCKER_OPTIONS="$DOCKER_OPTIONS -v $DOCKER_ROOT:/root"
    fi
    docker run --name "$NAME" -dt -e debian_chroot="$NAME" \
        $DOCKER_OPTIONS \
        "$IMAGE" "$@"
)}

shDuList () {(set -e
# this function will run du, and create a list of all child dir in $1 sorted by size
    du -md1 $1 | sort -nr
)}

shFileGrepReplace () {(set -e
# this function will save the grep-and-replace lines in file $1
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var dict;
dict = {};
require('fs').readFileSync(process.argv[1], 'utf8').split('\n').forEach(function (element) {
    element = (/^(.+?):(\d+?):(.+?)$/).exec(element);
    if (!element) {
        return;
    }
    dict[element[1]] = dict[element[1]] ||
        require('fs').readFileSync(element[1], 'utf8').split('\n');
    dict[element[1]][element[2] - 1] = element[3];
});
Object.keys(dict).forEach(function (key) {
    require('fs').writeFileSync(key, dict[key].join('\n'));
});
// </script>
" "$@"
)}

shFileJsonNormalize () {(set -e
# this function will
# 1. read the json-data from file $1
# 2. normalize the json-data
# 3. write the normalized json-data back to file $1
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var local, tmp;
local = {};
(function () {
    (function () {
        local.jsonStringifyOrdered = function (jsonObj, replacer, space) {
        /*
         * this function will JSON.stringify the jsonObj,
         * with object-keys sorted and circular-references removed
         */
            var circularList, stringify, tmp;
            stringify = function (jsonObj) {
            /*
             * this function will recursively JSON.stringify the jsonObj,
             * with object-keys sorted and circular-references removed
             */
                // if jsonObj is not an object or function, then JSON.stringify as normal
                if (!(jsonObj &&
                        typeof jsonObj === 'object' &&
                        typeof jsonObj.toJSON !== 'function')) {
                    return JSON.stringify(jsonObj);
                }
                // ignore circular-reference
                if (circularList.indexOf(jsonObj) >= 0) {
                    return;
                }
                circularList.push(jsonObj);
                // if jsonObj is an array, then recurse its jsonObjs
                if (Array.isArray(jsonObj)) {
                    return '[' + jsonObj.map(function (jsonObj) {
                        // recurse
                        tmp = stringify(jsonObj);
                        return typeof tmp === 'string'
                            ? tmp
                            : 'null';
                    }).join(',') + ']';
                }
                // if jsonObj is not an array, then recurse its items with object-keys sorted
                return '{' + Object.keys(jsonObj)
                    // sort object-keys
                    .sort()
                    .map(function (key) {
                        // recurse
                        tmp = stringify(jsonObj[key]);
                        if (typeof tmp === 'string') {
                            return JSON.stringify(key) + ':' + tmp;
                        }
                    })
                    .filter(function (jsonObj) {
                        return typeof jsonObj === 'string';
                    })
                    .join(',') + '}';
            };
            circularList = [];
            // try to derefernce all properties in jsonObj
            (function () {
                try {
                    jsonObj = JSON.parse(JSON.stringify(jsonObj));
                } catch (ignore) {
                }
            }());
            return JSON.stringify(typeof jsonObj === 'object' && jsonObj
                // recurse
                ? JSON.parse(stringify(jsonObj))
                : jsonObj, replacer, space);
        };
        local.objectSetDefault = function (arg0, defaults, depth) {
        /*
         * this function will recursively set defaults for undefined-items in arg0
         */
            arg0 = arg0 || {};
            defaults = defaults || {};
            Object.keys(defaults).forEach(function (key) {
                var arg2, defaults2;
                arg2 = arg0[key];
                // handle misbehaving getter
                try {
                    defaults2 = defaults[key];
                } catch (ignore) {
                }
                if (defaults2 === undefined) {
                    return;
                }
                // init arg0[key] to default value defaults[key]
                switch (arg2) {
                case '':
                case null:
                case undefined:
                    arg0[key] = defaults2;
                    return;
                }
                // if arg2 and defaults2 are both non-null and non-array objects,
                // then recurse with arg2 and defaults2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        typeof arg2 === 'object' && arg2 && !Array.isArray(arg2) &&
                        // defaults2 is a non-null and non-array object
                        typeof defaults2 === 'object' && defaults2 && !Array.isArray(defaults2)) {
                    // recurse
                    local.objectSetDefault(arg2, defaults2, depth - 1);
                }
            });
            return arg0;
        };
        local.objectSetOverride = function (arg0, overrides, depth, env) {
        /*
         * this function will recursively set overrides for items in arg0
         */
            arg0 = arg0 || {};
            env = env || (typeof process === 'object' && process.env) || {};
            overrides = overrides || {};
            Object.keys(overrides).forEach(function (key) {
                var arg2, overrides2;
                arg2 = arg0[key];
                overrides2 = overrides[key];
                if (overrides2 === undefined) {
                    return;
                }
                // if both arg2 and overrides2 are non-null and non-array objects,
                // then recurse with arg2 and overrides2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        typeof arg2 === 'object' && arg2 && !Array.isArray(arg2) &&
                        // overrides2 is a non-null and non-array object
                        typeof overrides2 === 'object' && overrides2 &&
                        !Array.isArray(overrides2)) {
                    local.objectSetOverride(arg2, overrides2, depth - 1, env);
                    return;
                }
                // else set arg0[key] with overrides[key]
                arg0[key] = arg0 === env
                    // if arg0 is env, then overrides falsey value with empty string
                    ? overrides2 || ''
                    : overrides2;
            });
            return arg0;
        };
    }());
}());
tmp = JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8'));
if (process.argv[2]) {
    local.objectSetDefault(tmp, JSON.parse(process.argv[2]), Infinity);
}
if (process.argv[3]) {
    local.objectSetOverride(tmp, JSON.parse(process.argv[3]), Infinity);
}
require('fs').writeFileSync(process.argv[1], local.jsonStringifyOrdered(tmp, null, 4) + '\n');
// </script>
" "$@"
)}

shFilePackageJsonVersionUpdate () {(set -e
# this function will increment the package.json version before npm-publish
    node -e '
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
"use strict";
var packageJson, versionList;
packageJson = require("./package.json");
// jslint-hack
versionList = [
    process.argv[1] || packageJson.version,
    process.argv[2] || "0.0.0"
].map(function (element) {
    if (element === "today") {
        element = new Date().toISOString().replace((/T.*?$/), "").replace((/-0?/g), ".");
    }
    return element.split(/\W/).slice(0, 3)
        .map(function (element) {
            return Number(element) || 0;
        })
        .concat([element.split("-").slice(1).join("-").replace((/(.)/), "-$1")]);
});
versionList[1][2] += 1;
if (versionList[0][0] < versionList[1][0] ||
        (versionList[0][0] === versionList[1][0] &&
        versionList[0][1] < versionList[1][1]) ||
        (versionList[0][0] === versionList[1][0] &&
        versionList[0][1] === versionList[1][1] &&
        versionList[0][2] < versionList[1][2])) {
    versionList[0] = versionList[1];
}
packageJson.version = versionList[0].slice(0, 3).join(".") + versionList[0][3];
// update package.json
require("fs").writeFileSync("package.json", JSON.stringify(packageJson, null, 4) + "\n");
// update README.md
require("fs").writeFileSync(
    "README.md",
    require("fs").readFileSync("README.md", "utf8").replace(
        (/^(#### changelog |- npm publish | {4}"version": ")\d+?\.\d+?\.\d[^\n",]*/gm),
        "$1" + packageJson.version
    )
);
console.error("shFilePackageJsonVersionUpdate - " + packageJson.version);
// </script>
' "$1" "$([ "$2" = publishedIncrement ] && npm info "" version 2>/dev/null)"
)}

shFileTrimLeft () {(set -e
# this function will remove all leading blank-lines from top of file $1
# http://stackoverflow.com/questions/1935081/remove-leading-whitespace-from-file
    sed -in '/./,$!d' "$1"
    rm -f "$1"n
)}

shGitCommandWithGithubToken () {(set -e
# this function will run the git-command using $GITHUB_TOKEN
# http://stackoverflow.com/questions/18027115/committing-via-travis-ci-failing
    export MODE_BUILD="${MODE_BUILD:-shGitCommandWithGithubToken}"
    shBuildPrint "shGitCommandWithGithubToken $*"
    if [ ! "$GITHUB_TOKEN" ]
    then
        git "$@"
        return
    fi
    COMMAND="$1"
    shift
    URL="$1"
    shift
    case "$URL" in
    https://github.com/*)
        URL="$(printf "$URL" | sed -e "s/github.com/$GITHUB_TOKEN@github.com/")"
        ;;
    origin)
        URL="https://$GITHUB_TOKEN@github.com/$GITHUB_REPO"
        ;;
    esac
    # hide $GITHUB_TOKEN in case of error
    git "$COMMAND" "$URL" "$@" 2>/dev/null
)}

shGitGc () {(set -e
# this function will gc unreachable .git objects
# http://stackoverflow.com/questions/3797907/how-to-remove-unused-objects-from-a-git-repository
    # git remote rm origin || true
    # git branch -D in || true
    # (cd .git && rm -fr refs/remotes/ refs/original/ *_HEAD logs/) || return $?
    # git for-each-ref --format="%(refname)" refs/original/ | xargs -n1 --no-run-if-empty git update-ref -d
    git \
        -c gc.reflogExpire=0 \
        -c gc.reflogExpireUnreachable=0 \
        -c gc.rerereresolved=0 \
        -c gc.rerereunresolved=0 \
        -c gc.pruneExpire=now \
        gc
)}

shGitInfo () {(set -e
# this function will run checks before npm-publish
    git diff HEAD
    printf "\n"
    git status
    printf "\n"
    shGitLsTree
    printf "\n"
    git grep -e '!\! ' || true
    printf "\n"
    git grep -e '\becho\b' *.sh || true
    printf "\n"
    git grep -e '\bset -\w*x\b' *.sh || true
)}

shGitLsTree () {(set -e
# this function will list all files committed in HEAD
    printf "$(git ls-tree --name-only -r HEAD | head -n 4096)" | awk '{
    ii += 1
    file = $0
    cmd = "git log -1 --format=\"%ai\" -- " file
    (cmd | getline date)
    close(cmd)
    cmd = "ls -ln " file " | awk \"{print \\$5}\""
    (cmd | getline size)
    close(cmd)
    sizeTotal += size
    printf("%-3s  %s %8s bytes  %s\n", ii, date, size, file)
} END {
    ii = 0
    file = "."
    cmd = "git log -1 --format=\"%ai\" -- " file
    (cmd | getline date)
    close(cmd)
    size = sizeTotal
    printf("%-3s  %s %8s bytes  %s\n", ii, date, size, file)
    }' | sed -e "s/ /./"
)}

shGitSquashPop () {(set -e
# this function will squash HEAD to the given $COMMIT
# http://stackoverflow.com/questions/5189560
# /how-can-i-squash-my-last-x-commits-together-using-git
    COMMIT="$1"
    MESSAGE="$2"
    # reset git to previous $COMMIT
    git reset "$COMMIT"
    git add .
    # commit HEAD immediately after previous $COMMIT
    git commit -am "$MESSAGE"
)}

shGitSquashShift () {(set -e
# this function will squash $RANGE to the first commit
    BRANCH="$(git rev-parse --abbrev-ref HEAD)"
    RANGE="$1"
    git checkout -q "HEAD~$RANGE"
    git reset -q "$(git rev-list --max-parents=0 HEAD)"
    git add .
    git commit -m squash > /dev/null || true
    git cherry-pick -X theirs --allow-empty --strategy=recursive "$BRANCH~$RANGE..$BRANCH"
    git push -f . "HEAD:$BRANCH"
    git checkout "$BRANCH"
)}

shGithubApiRateLimitGet () {(set -e
# this function will the rate-limit for the $GITHUB_TOKEN
    curl -I https://api.github.com -H "Authorization: token $GITHUB_TOKEN"
)}

shGithubCrudRepoListCreate () {(set -e
# this function will create the $GITHUB_REPO in $LIST with $GITHUB_TOKEN
    LIST="$1"
    export MODE_BUILD="${MODE_BUILD:-shGithubCrudRepoListCreate}"
    URL=https://api.github.com/user/repos
    # init $GITHUB_ORG
    GITHUB_ORG="$(printf "$LIST" | head -n 1 | sed -e "s/\/.*//")"
    if (printf "$GITHUB_ORG" | grep -qe '^\(npmdoc\|npmtest\|scrapeitall\|swgg-io\)$')
    then
        URL="https://api.github.com/orgs/$GITHUB_ORG/repos"
    fi
    LIST2=""
    for GITHUB_REPO in $LIST
    do
        NAME="$(printf "$GITHUB_REPO" | sed -e "s/.*\///")"
        LIST2="$LIST2
if (! curl -ILfs -o /dev/null https://github.com/$GITHUB_REPO); \
then \
    printf 'creating github-repo $GITHUB_REPO\n' 1>&2; \
    curl -#Lf -H 'Authorization: token $GITHUB_TOKEN' -X POST -d '{\"name\":\"$NAME\"}' \
        -o /dev/null $URL; \
fi"
    done
    shOnParallelListExec "$LIST2"
)}

shGithubFileCommitDate () {(set -e
# this function will print the commit-date for the github file url $1
    curl -Lfs "$1" | grep -e "datetime=" | grep -oe "\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d*Z"
    printf "$1\n"
)}

shGithubRepoBaseCreate () {(set -e
# this function will create the base github-repo https://github.com/$GITHUB_REPO
# example usage:
# shGithubRepoBaseCreate kaizhu256/sandbox2
    GITHUB_REPO="$1"
    export MODE_BUILD="${MODE_BUILD:-shGithubRepoBaseCreate}"
    # init /tmp/githubRepoBase
    if [ ! -d /tmp/githubRepoBase ]
    then
    (
        git clone https://github.com/kaizhu256/base /tmp/githubRepoBase
        cd /tmp/githubRepoBase
        git checkout -b alpha origin/alpha || true
        git checkout -b beta origin/beta || true
        git checkout -b gh-pages origin/gh-pages || true
        git checkout -b master origin/master || true
        git checkout -b publish origin/publish || true
        git checkout alpha
    )
    fi
    rm -fr "/tmp/$GITHUB_REPO"
    mkdir -p "/tmp/$(printf "$GITHUB_REPO" | sed -e "s/\/.*//")"
    cp -a /tmp/githubRepoBase "/tmp/$GITHUB_REPO"
    cd "/tmp/$GITHUB_REPO"
    curl -Lfs https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/.gitconfig | \
        sed -e "s|kaizhu256/node-utility2|$GITHUB_REPO|" > .git/config
    (eval shGithubCrudRepoListCreate "$GITHUB_REPO") || true
    # set default-branch to beta
    shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" beta || true
    # push all branches
    shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" --all || true
)}

shGithubRepoBranchId () {(set -e
# this function will print the $COMMIT_ID for $GITHUB_REPO:#$BRANCH
    BRANCH="$1"
    curl -H "user-agent: undefined" -Lfs \
"https://api.github.com/repos/$GITHUB_REPO/commits?access_token=$GITHUB_TOKEN&sha=$BRANCH" | \
        sed -e 's/^\[{"sha":"//' -e 's/".*//'
)}

shGithubRepoDescriptionUpdate () {(set -e
# this function will update the github-repo's description
    GITHUB_REPO="$1"
    DESCRIPTION="$2"
    shBuildPrint "update $GITHUB_REPO description"
    curl -#Lf \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    -H "User-Agent: undefined" \
    -X PATCH \
    -d "{
        \"default_branch\": \"beta\",
        \"description\": \"$(printf "$DESCRIPTION" | sed -e 's/"/\\\\"/')\",
        \"name\": \"$(printf "$GITHUB_REPO" | sed -e "s/.*\///")\"
    }" \
    -o /dev/null \
    "https://api.github.com/repos/$GITHUB_REPO"
)}

shGithubRepoListTouch () {(set -e
# this function will touch the $GITHUB_REPO $LIST with the $CI_COMMIT_MESSAGE
# example usage:
# shCryptoWithGithubOrg npmdoc shGithubRepoListTouch "npmdoc/node-npmdoc-sandbox2 npmdoc/node-npmdoc-sandbox2" "[npm publishAfterCommitAfterBuild]"
    LIST="$1"
    CI_COMMIT_MESSAGE="$2"
    LIST2=""
    for GITHUB_REPO in $LIST
    do
        LIST2="$LIST2,https://github.com/$GITHUB_REPO/blob/alpha/package.json"
    done
    utility2-github-crud touchList "$LIST2" "$CI_COMMIT_MESSAGE"
)}

shGrep () {(set -e
# this function will recursively grep $DIR for the $REGEXP
    DIR="$1"
    REGEXP="$2"
    FILE_FILTER="\
/\\.\\|\\(\\b\\|_\\)\\(\\.\\d\\|\
archive\\|artifact\\|\
bower_component\\|build\\|\
coverage\\|\
doc\\|\
external\\|\
fixture\\|\
git_module\\|\
jquery\\|\
log\\|\
min\\|mock\\|\
node_module\\|\
rollup\\|\
swp\\|\
tmp\\|\
vendor\\)s\\{0,1\\}\\(\\b\\|_\\)\
"
    find "$DIR" -type f | \
        grep -ve "$FILE_FILTER" | \
        tr "\n" "\000" | \
        xargs -0 grep -HIine "$REGEXP" || true
    find "$DIR" -name .travis.yml | \
        tr "\n" "\000" | \
        xargs -0 grep -HIine "$REGEXP" || true
)}

shHtpasswdCreate () {(set -e
# this function will create and print htpasswd to stdout
    USERNAME="$1"
    PASSWD="$2"
    printf "$USERNAME:$(openssl passwd -apr1 "$PASSWD")\n"
)}

shHttpFileServer () {(set -e
# this function will run a simple node http-file-server on http-port $PORT
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
require('http').createServer(function (request, response) {
    require('fs').readFile(
        require('url').parse(request.url).pathname.slice(1),
        function (error, data) {
            response.end(error
                ? error.stack
                : data);
        }
    );
}).listen(process.env.PORT);
// </script>
"
)}

shImageToDataUri () {(set -e
# this function will convert the image $FILE to a data-uri string
    case "$1" in
    http://*)
        FILE=/tmp/shImageToDataUri.png
        curl -#Lf -o "$FILE" "$1"
        ;;
    https://*)
        FILE=/tmp/shImageToDataUri.png
        curl -#Lf -o "$FILE" "$1"
        ;;
    *)
        FILE="$1"
        ;;
    esac
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
console.log('data:image/' +
    require('path').extname('$FILE').slice(1) +
    ';base64,' +
    require('fs').readFileSync('$FILE').toString('base64'));
// </script>
"
)}

shIptablesDockerInit () {(set -e
# this function will create an iptables DOCKER chain
# https://github.com/docker/docker/issues/1871
    iptables -t nat -N DOCKER
    iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL -j DOCKER
    iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL ! --dst 127.0.0.0/8 -j DOCKER
    iptables-save > /etc/iptables/rules.v4
    ip6tables-save > /etc/iptables/rules.v6
)}

shIptablesInit () {(set -e
# this function will init iptables, and is intended for aws-ec2 setup
    # http://www.cyberciti.biz/tips/linux-iptables-how-to-flush-all-rules.html
    # reset iptables
    iptables -F
    iptables -X
    iptables -t nat -F
    iptables -t nat -X
    iptables -t mangle -F
    iptables -t mangle -X
    iptables -P INPUT ACCEPT
    iptables -P FORWARD ACCEPT
    iptables -P OUTPUT ACCEPT

    # https://wiki.debian.org/iptables
    # Allows all loopback (lo0) traffic and drop all traffic to 127/8 that doesn''t use lo0
    iptables -A INPUT -i lo -j ACCEPT
    iptables -A INPUT ! -i lo -d 127.0.0.0/8 -j REJECT
    # Accepts all established inbound connections
    iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
    # Allows all outbound traffic
    # You could modify this to only allow certain traffic
    iptables -A OUTPUT -j ACCEPT
    # Allows HTTP and HTTPS connections from anywhere (the normal ports for websites)
    iptables -A INPUT -p tcp --dport 80 -j ACCEPT
    iptables -A INPUT -p tcp --dport 443 -j ACCEPT
    # Allows SSH connections
    # The --dport number is the same as in /etc/ssh/sshd_config
    iptables -A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT
    # Now you should read up on iptables rules and consider whether ssh access
    # for everyone is really desired. Most likely you will only allow access from certain IPs.
    # Allow ping
    #  note that blocking other types of icmp packets is considered a bad idea by some
    #  remove -m icmp --icmp-type 8 from this line to allow all kinds of icmp:
    #  https://security.stackexchange.com/questions/22711
    iptables -A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

    # allow forwarding between docker0 and eth0
    # https://blog.andyet.com/2014/09/11/docker-host-iptables-forwarding
    # Forward chain between docker0 and eth0
    iptables -A FORWARD -i docker0 -o eth0 -j ACCEPT
    iptables -A FORWARD -i eth0 -o docker0 -j ACCEPT
    # IPv6 chain if needed
    ip6tables -A FORWARD -i docker0 -o eth0 -j ACCEPT
    ip6tables -A FORWARD -i eth0 -o docker0 -j ACCEPT
    # create iptables DOCKER chain
    # https://github.com/docker/docker/issues/1871
    iptables -t nat -N DOCKER
    iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL -j DOCKER
    iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL ! --dst 127.0.0.0/8 -j DOCKER

    # log iptables denied calls (access via 'dmesg' command)
    iptables -A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " \
        --log-level 7
    # Reject all other inbound - default deny unless explicitly allowed policy:
    iptables -A INPUT -j REJECT
    iptables -A FORWARD -j REJECT
    # iptables --list
    iptables -t nat -L -n -v
    iptables -L -n -v
    # install iptables-persistent
    if [ ! -f /etc/iptables/rules.v4 ]
    then
        apt-get install -y iptables-persistent
    fi
    # save iptables
    iptables-save > /etc/iptables/rules.v4
    ip6tables-save > /etc/iptables/rules.v6
    # iptables-restore < /etc/iptables/rules.v4
    # iptables-restore < /etc/iptables/rules.v6
)}

shIstanbulCover () {(set -e
# this function will run the command $@ with istanbul-coverage
    export NODE_BINARY="${NODE_BINARY:-node}"
    if [ ! "$npm_config_mode_coverage" ]
    then
        "$NODE_BINARY" "$@"
        return
    fi
    "$NODE_BINARY" "$npm_config_dir_utility2/lib.istanbul.js" cover "$@"
)}

shKillallElectron () {(set -e
# this function will killall electron
    killall Electron electron
)}

shListUnflattenAndApply () {(set -e
# this function will unflatten $LIST into $SUB_LIST with the given $LENGTH,
# and apply shListUnflattenAndApplyFunction to $SUB_LIST
    LIST="$1"
    LENGTH="${2:-6}"
    II=0
    SUB_LIST=""
    for ELEMENT in $LIST
    do
        SUB_LIST="$SUB_LIST
$ELEMENT"
        II="$((II+1))"
        if [ "$II" -ge "$LENGTH" ]
        then
            sleep 1
            shListUnflattenAndApplyFunction "$SUB_LIST"
            II=0
            SUB_LIST=""
        fi
    done
    if [ "$SUB_LIST" ]
    then
        sleep 1
        shListUnflattenAndApplyFunction "$SUB_LIST"
    fi
)}

shMain () {
# this function will run the main program
    export UTILITY2_GIT_BASE_ID=9fe8c2255f4ac330c86af7f624d381d768304183
    export UTILITY2_DEPENDENTS="$(shUtility2Dependents)"
(set -e
    if [ ! "$1" ]
    then
        return
    fi
    COMMAND="$1"
    shift
    case "$COMMAND" in
    -*)
        shBuildInit
        lib.utility2.js "$COMMAND" "$@"
        ;;
    utility2.*)
        shBuildInit
        lib.utility2.js "$COMMAND" "$@"
        ;;
    help)
        shBuildInit
        lib.utility2.js "$COMMAND" "$@"
        ;;
    source)
        shBuildInit
        printf ". $npm_config_dir_utility2/lib.utility2.sh\n"
        ;;
    start)
        shBuildInit
        if [ "$1" ]
        then
            FILE="$1"
        else
            export npm_config_mode_start="1"
            FILE="$npm_config_dir_utility2/test.js"
        fi
        shift || true
        export npm_config_mode_auto_restart=1
        shBuildInit
        shRun shIstanbulCover "$FILE" "$@"
        ;;
    test)
        shBuildInit
        shRunWithScreenshotTxt shNpmTest "$@"
        ;;
    utility2Dirname)
        shBuildInit
        printf "$npm_config_dir_utility2\n"
        ;;
    *)
        shBuildInit
        "$COMMAND" "$@"
        ;;
    esac
)}

shModuleDirname () {(set -e
# this function will print the __dirname of the $MODULE
    MODULE="$1"
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var local;
local = {};
(function () {
    (function () {
        local.moduleDirname = function (module, modulePathList) {
        /*
         * this function will search modulePathList for the module's __dirname
         */
            var result;
            // search process.cwd()
            if (!module || module === '.' || module.indexOf('/') >= 0) {
                return require('path').resolve(process.cwd(), module || '');
            }
            // search modulePathList
            ['node_modules']
                .concat(modulePathList)
                .concat(require('module').globalPaths)
                .concat([process.env.HOME + '/node_modules', '/usr/local/lib/node_modules'])
                .some(function (modulePath) {
                    try {
                        result = require('path').resolve(process.cwd(), modulePath + '/' + module);
                        result = require('fs').statSync(result).isDirectory() && result;
                        return result;
                    } catch (errorCaught) {
                        result = null;
                    }
                    return result;
                });
            return result || '';
        };
    }());
}());
console.log(local.moduleDirname('$MODULE', module.paths));
// </script>
"
)}

shMountData () {(set -e
# this function will mount $1 to /mnt/data, and is intended for aws-ec2 setup
# $ shMountData /dev/sdc
# /dev/sdc /mnt/data ext4 defaults,noatime 0 0
# /mnt/data /root none bind
# /mnt/data/tmp /tmp none bind
# /mnt/data/var.lib.docker /var/lib/docker none bind
    # mount data $1
    mkdir -p /mnt/data
    mount "$1" /mnt/data -o noatime || true
    mount "$1" /mnt/data -o noatime || true
    # mount bind
    # http://stackoverflow.com/questions/9713104/loop-over-tuples-in-bash
    IFS=","
    for TMP in /mnt/data,/root /mnt/data/tmp,/tmp /mnt/data/var.lib.docker,/var/lib/docker
    do
        set $TMP
        mkdir -p "$1" "$2"
        mount "$1" "$2" -o bind || true
    done
    chmod 1777 /tmp
)}

shNpmDeprecateAlias () {(set -e
# this function will deprecate the npm-package $NAME with the given $MESSAGE
    shPasswordEnvUnset
    NAME="$1"
    MESSAGE="$2"
    shBuildInit
    if [ ! "$MESSAGE" ]
    then
        MESSAGE="this package is deprecated and superseded by \
[$npm_package_name](https://www.npmjs.com/package/$npm_package_name)"
    fi
    export MODE_BUILD=npmDeprecate
    shBuildPrint "npm-deprecate $NAME"
    DIR=/tmp/npmDeprecate
    rm -fr "$DIR" && mkdir -p "$DIR" && cd "$DIR"
    npm install "$NAME" --prefix .
    cd "node_modules/$NAME"
    # update README.md
    printf "$MESSAGE\n" > README.md
    # update package.json
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var packageJson;
packageJson = require('./package.json');
packageJson.description = '$MESSAGE';
Object.keys(packageJson).forEach(function (key) {
    if (key[0] === '_') {
        delete packageJson[key];
    }
});
require('fs').writeFileSync('package.json', JSON.stringify(packageJson, null, 4) + '\n');
// </script>
"
    shFilePackageJsonVersionUpdate
    npm publish
    npm deprecate "$NAME" "$MESSAGE"
)}

shNpmDeprecateAliasList () {(set -e
# this function will deprecate the npm $LIST of packages with the given $MESSAGE
    LIST="$1"
    MESSAGE="$2"
    for NAME in $LIST
    do
        shNpmDeprecateAlias "$NAME" "$MESSAGE"
    done
)}

shNpmInstallTarball () {(set -e
# this function will npm-install the tarball instead of the full module
    NAME="$1"
    mkdir -p "node_modules/$NAME"
    curl -Lfs "$(npm view "$NAME" dist.tarball)" | \
        tar --strip-components 1 -C "node_modules/$NAME" -xzf -
)}

shNpmInstallWithPeerDependencies () {(set -e
# this function will npm-install $@ with peer-dependencies auto-installed
    shPasswordEnvUnset
    export MODE_BUILD=shNpmInstallWithPeerDependencies
    shBuildPrint "npm-installing with peer-dependencies ..."
    FILE="$npm_config_dir_tmp/npmInstallWithPeerDependencies"
    npm install "$@" | tee "$FILE"
    eval "$(node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var dict;
dict = {};
require('fs').readFileSync('$FILE', 'utf8').replace((
    / UNMET PEER DEPENDENCY (\S+)/g
), function (match0, match1) {
    match0 = match1.split('@');
    dict[match0[0]] = dict[match0[0]] || (match0[1] || '').trim();
});
Object.keys(dict).forEach(function (key) {
    console.error('npm install ' + key + '@' + dict[key]);
    console.log('npm install ' + key + '@' + dict[key]);
});
console.log('true');
// </script>
")"
    npm install "$@"
    shBuildPrint "... npm-installed with peer-dependencies"
)}

shNpmPackageCliHelpCreate () {(set -e
# this function will create a svg cli-help npm-package
    shBuildInit
    export MODE_BUILD=npmPackageCliHelp
    shBuildPrint "creating npmPackageCliHelp ..."
    FILE="$(node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var dict;
dict = require('./package.json').bin || {};
process.stdout.write(String(dict[Object.keys(dict)[0]]));
// </script>
")"
    if [ -f "./$FILE" ]
    then
        shRunWithScreenshotTxt "./$FILE" --help
    else
        shRunWithScreenshotTxt printf none
    fi
    shBuildPrint "... created npmPackageCliHelp"
)}

shNpmPackageDependencyTreeCreate () {(set -e
# this function will create a svg dependency-tree of the npm-package
    if [ -f README.md ] && ! (grep -q "https://nodei.co/npm/$1\b" README.md)
    then
        return
    fi
    shPasswordEnvUnset
    # init /tmp/node_modules
    if [ -d /tmp/node_modules ]
    then
        rm -fr /tmp/node_modules.00
        mv /tmp/node_modules /tmp/node_modules.00
        export PATH="$PATH:/tmp/node_modules.00/.bin"
    fi
    DIR=/tmp/npmPackageDependencyTreeCreate
    rm -fr "$DIR" && mkdir -p "$DIR" && cd "$DIR"
    shBuildInit
    export MODE_BUILD=npmPackageDependencyTree
    shBuildPrint "creating npmDependencyTree ..."
    npm install "$1" --prefix . || true
    shRunWithScreenshotTxtAfter () {(set -e
        du -ms "$DIR" | awk '{print "npm install - " $1 " megabytes\n\nnode_modules"}' \
            > "$npm_config_file_tmp"
        grep -e '^ *[│└├]' "$npm_config_dir_tmp/runWithScreenshotTxt" >> "$npm_config_file_tmp"
        mv "$npm_config_file_tmp" "$npm_config_dir_tmp/runWithScreenshotTxt"
    )}
    shRunWithScreenshotTxt npm ls || true
    if [ -d /tmp/node_modules.00 ]
    then
        rm -fr /tmp/node_modules
        mv /tmp/node_modules.00 /tmp/node_modules
    fi
    shBuildPrint "... created npmDependencyTree"
)}

shNpmPackageListingCreate () {(set -e
# this function will create a svg listing of the npm-package
    cd "$1"
    # init git
    if [ ! -d .git ]
    then
        printf "
*~
.*
node_modules
tmp
" > .gitignore
        git init
        git add .
        git commit -m 'initial commit' | head -n 4096
    fi
    shBuildInit
    export MODE_BUILD=npmPackageListing
    shRunWithScreenshotTxtAfter () {(set -e
        awk '{
lineList[NR] = $0
} END {
    print "package files\n"
    print lineList[NR]
    for (ii = 1; ii < NR; ii += 1) {
        print lineList[ii]
    }
        }' "$npm_config_dir_tmp/runWithScreenshotTxt" > "$npm_config_file_tmp"
        mv "$npm_config_file_tmp" "$npm_config_dir_tmp/runWithScreenshotTxt"
    )}
    shRunWithScreenshotTxt shGitLsTree
)}

shNpmPublishAlias () {(set -e
# this function will npm-publish the $DIR as $NAME@$VERSION with a clean repo
    DIR="$1"
    NAME="$2"
    VERSION="$3"
    export MODE_BUILD=npmPublishAlias
    shBuildPrint "npm-publish alias $NAME"
    cd "$DIR"
    DIR=/tmp/npmPublishAlias
    rm -fr "$DIR" && mkdir -p "$DIR"
    # clean-copy . to $DIR
    git ls-tree --name-only -r HEAD | xargs tar -czf - | tar -C "$DIR" -xvzf -
    cd "$DIR"
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var name, packageJson, version;
name = '$NAME';
version = '$VERSION';
packageJson = require('./package.json');
packageJson.nameOriginal = packageJson.name;
packageJson.name = name || packageJson.name;
packageJson.version = version || packageJson.version;
require('fs').writeFileSync('package.json', JSON.stringify(packageJson, null, 4) + '\n');
// </script>
"
    npm publish
)}

shNpmPublishAliasList () {(set -e
# this function will npm-publish the $DIR as $LIST@$VERSION with a clean repo
    DIR="$1"
    LIST="$2"
    VERSION="$3"
    for NAME in $LIST
    do
        (eval shNpmPublishAlias "$DIR" "$NAME" "$VERSION") || true
    done
)}

shNpmPublishV0 () {(set -e
# this function will npm-publish the name $1 with a bare package.json
    DIR=/tmp/npmPublishV0
    rm -fr "$DIR" && mkdir -p "$DIR" && cd "$DIR"
    printf "{\"name\":\"$1\",\"version\":\"0.0.1\"}" > package.json
    npm publish
)}

shNpmTest () {(set -e
# this function will npm-test with coverage and create test-report
    shBuildInit
    EXIT_CODE=0
    export MODE_BUILD="${MODE_BUILD:-npmTest}"
    export NODE_BINARY="${NODE_BINARY:-node}"
    shBuildPrint "npm-testing $PWD"
    # cleanup tmp/*.json
    rm -f tmp/*.json
    # init npm-test-mode
    export NODE_ENV="${NODE_ENV:-test}"
    export npm_config_mode_test=1
    # npm-test without coverage
    if [ ! "$npm_config_mode_coverage" ]
    then
        (eval "$NODE_BINARY" "$@") || EXIT_CODE=$?
    # npm-test with coverage
    else
        # cleanup old coverage
        rm -f "$npm_config_dir_build/coverage.html/"coverage.*.json
        # npm-test with coverage
        (eval shIstanbulCover "$@") || EXIT_CODE=$?
        # if $EXIT_CODE != 0, then debug covered-test by re-running it uncovered
        if [ "$EXIT_CODE" != 0 ] && [ "$EXIT_CODE" != 130 ]
        then
            npm_config_mode_coverage="" "$NODE_BINARY" "$@" || true
        fi
    fi
    # create test-report artifacts
    (eval lib.utility2.js utility2.testReportCreate) || EXIT_CODE=$?
    shBuildPrint "EXIT_CODE - $EXIT_CODE"
    return "$EXIT_CODE"
)}

shNpmTestPublished () {(set -e
# this function will npm-test the published npm-package $npm_package_name
    export MODE_BUILD=npmTestPublished
    if [ "$TRAVIS" ] && [ ! "$NPM_TOKEN" ]
    then
        shBuildPrint "skip npm-testing published-package $npm_package_name"
        return
    fi
    shPasswordEnvUnset
    if [ "$1" ]
    then
        export npm_package_name="$1"
    fi
    shBuildPrint "npm-testing published-package $npm_package_name"
    DIR=/tmp/npmTestPublished
    rm -fr "$DIR" && mkdir -p "$DIR" && cd "$DIR"
    # npm-install package
    npm install "$npm_package_name" --prefix .
    cd "node_modules/$npm_package_name"
    # bug-workaround - Cannot read property 'target' of null #10686
    # https://github.com/npm/npm/issues/10686
    sed -in -e 's/  "_requiredBy":/  "_requiredBy_":/' package.json
    rm -f package.jsonn
    # npm-install
    npm install
    # npm-test package
    npm test --mode-coverage
)}

shNpmTestPublishedList () {(set -e
# this function will npm-test the published npm-package $LIST
    LIST="$1"
    if [ ! "$LIST" ]
    then
        return
    fi
    for NAME in $LIST
    do
        shNpmTestPublished "$NAME"
    done
)}

shOnParallelListExec () {(set -e
# this function will async-run the newline-separated tasks in $LIST with the given $RATE_LIMIT
    LIST="$1"
    RATE_LIMIT="$2"
    shBuildInit
    utility2 utility2.onParallelListExec "$LIST" "$RATE_LIMIT"
)}

shPasswordEnvUnset () {
# this function will unset the password-env, e.g.
# (export CRYPTO_AES_SH=abcd1234; shPasswordEnvUnset; printf "$CRYPTO_AES_SH\n")
# undefined
    eval "$(node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var local;
local = {};
(function () {
    (function () {
        local.envKeyIsSensitive = function (key) {
        /*
         * this function will try to determine if the env-key is sensitive
         */
            return (/(?:\b|_)(?:crypt|decrypt|key|pass|private|secret|token)/)
                .test(key.toLowerCase()) ||
                (/Crypt|Decrypt|Key|Pass|Private|Secret|Token/).test(key);
        };
    }());
}());
console.log(Object.keys(process.env).sort().map(function (key) {
    return local.envKeyIsSensitive(key)
        ? 'unset ' + key + '; '
        : '';
}).join('').trim());
// </script>
")" || return $?
}

shPasswordRandom () {(set -e
# this function will create a random password
    openssl rand -base64 32
)}

shPidByPort () {(set -e
# this function will print the process pid for the given port $1
# https://stackoverflow.com/questions/4421633/who-is-listening-on-a-given-tcp-port-on-mac-os-x
# https://unix.stackexchange.com/questions/106561/finding-the-pid-of-the-process-using-a-specific-port
    case "$(uname)" in
    Darwin)
        lsof -n -i:"$1" | grep -e LISTEN
        ;;
    Linux)
        netstat -nlp | grep -e 9000
        ;;
    esac
)}

shRandomIntegerInRange () {(set -e
# this function will print a random number in the interval [$1..$2)
    LC_CTYPE=C tr -cd 0-9 </dev/urandom | \
        head -c 9 | \
        awk "{ printf(\"%s\n\", $1 + (\$0 % ($2 - $1))); }"
)}

shReadmeLinkValidate () {(set -e
# this function will validate http-links embedded in README.md
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var request, rgx;
/* jslint-ignore-next-line */
rgx = (/\\b(http|https):\\/\\/.*?[)\\]]/g);
require('fs').readFileSync('README.md', 'utf8')
    .replace(rgx, function (match0, match1) {
        match0 = match0
            .slice(0, -1)
            .replace('\u0022', '')
            .replace('\u0027', '')
            .replace((/\\bbeta\\b|\\bmaster\\b/g), 'alpha')
            .replace((/\/build\//g), '/build..alpha..travis-ci.org/');
        if (process.env.npm_package_isPrivate && match0.indexOf('https://github.com/') === 0) {
            return;
        }
        request = require(match1).request(require('url').parse(match0), function (response) {
            console.log('shReadmeLinkValidate ' + response.statusCode + ' ' + match0);
            response.destroy();
            if (!(response.statusCode < 400)) {
                throw new Error('shReadmeLinkValidate - invalid link ' + match0);
            }
        });
        request.setTimeout(30000);
        request.end();
    });
// </script>
"
)}

shReadmeTest () {(set -e
# this function will extract, save, and test the script $FILE embedded in README.md
    shBuildInit
    case "$(git log -1 --pretty=%s)" in
    "[build app"*)
        shBuildCi
        return;
        ;;
    "[git "*)
        shBuildCi
        return;
        ;;
    esac
    if [ "$npm_package_buildCustomOrg" ]
    then
        shBuildCi
        return
    fi
    FILE="$1"
    if [ ! -f "tmp/README.$FILE" ]
    then
        return
    fi
    case "$FILE" in
    build_ci.sh)
        export MODE_BUILD=buildCi
        FILE=tmp/README.build_ci.sh
        ;;
    example.js)
        export MODE_BUILD=testExampleJs
        ;;
    example.sh)
        export MODE_BUILD=testExampleSh
        ;;
    esac
    shBuildPrint "testing $FILE"
    if [ "$FILE" = example.js ] || [ "$FILE" = example.sh ]
    then
        DIR=/tmp/app
        rm -fr "$DIR" && mkdir -p "$DIR"
        # cp script from README.md
        cp "tmp/README.$FILE" "$DIR/$FILE"
        cp "tmp/README.$FILE" "$npm_config_dir_build/$FILE"
        shFileTrimLeft "$npm_config_dir_build/$FILE"
        cd "$DIR"
        if [ "$CI_BRANCH" = alpha ]
        then
            sed -in \
                -e "s|/build..beta..travis-ci.org/|/build..alpha..travis-ci.org/|g" \
                -e "s|npm install $npm_package_name|npm install $GITHUB_REPO#alpha|g" \
                -e "s| -b beta | -b alpha |g" \
                "$FILE"
            rm -f "$FILE"n
        fi
    fi
    if [ "$FILE" = tmp/README.build_ci.sh ] || [ "$FILE" = example.sh ]
    then
        # display shell script
        # http://stackoverflow.com/questions/1935081/remove-leading-whitespace-from-file
        sed -e '/./,$!d' "$FILE"
    fi
    export PORT="${PORT:-8081}"
    export npm_config_timeout_exit="${npm_config_timeout_exit:-30000}"
    # screenshot
    (
    shSleep 15
    shBrowserTest "http://127.0.0.1:$PORT" screenshot
    ) &
    case "$FILE" in
    example.js)
        SCRIPT="$(cat "$FILE" | grep -e "^ *\$ " | grep -oe "\w.*")" || true
        printf "$SCRIPT\n\n"
        shRunWithScreenshotTxt eval "$SCRIPT"
        ;;
    example.sh)
        shRunWithScreenshotTxt /bin/sh "$FILE"
        ;;
    tmp/README.build_ci.sh)
        # bug-workaround - "syntax error near unexpected token `)'"
        case "$CI_COMMIT_MESSAGE" in
        "[build app"*)
            printf "printf '\\\\n'\n" >> "$FILE"
            ;;
        esac
        /bin/sh "$FILE"
        ;;
    esac
    shSleep 15
    ! shKillallElectron 2>/dev/null
)}

shReplClient () {(set -e
# this function will connect the repl-client to tcp-port $1
# https://gist.github.com/TooTallNate/2209310
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var socket;
console.log('node repl-client connecting to tcp-port ' + process.argv[1]);
socket = require('net').connect(process.argv[1]);
process.stdin.pipe(socket);
socket.pipe(process.stdout);
socket.on('end', process.exit);
// </script>
" "$@"
)}

shRmDsStore () {(set -e
# this function will recursively rm .DS_Store from the current dir
# http://stackoverflow.com/questions/2016844/bash-recursively-remove-files
    find . -name "._*" -print0 | xargs -0 rm || true
    find . -name ".DS_Store" -print0 | xargs -0 rm || true
    find . -name "npm-debug.log" -print0 | xargs -0 rm || true
)}

shRun () {(set -e
# this function will run the command $@ with auto-restart
    EXIT_CODE=0
    # eval argv and auto-restart on non-zero exit-code, unless exited by SIGINT
    if [ "$npm_config_mode_auto_restart" ] && [ ! "$npm_config_mode_auto_restart_child" ]
    then
        export npm_config_mode_auto_restart_child=1
        while true
        do
            printf "(re)starting $*\n"
            (eval "$@") || EXIT_CODE=$?
            printf "process exited with code $EXIT_CODE\n"
            # if $EXIT_CODE != 77, then exit process
            # http://en.wikipedia.org/wiki/Unix_signal
            if [ "$EXIT_CODE" != 77 ]
            then
                break
            fi
            # else restart process after 1 second
            sleep 1
        done
        printf "EXIT_CODE - $EXIT_CODE\n"
        return "$EXIT_CODE"
    # eval argv
    else
        "$@"
    fi
)}

shRunWithScreenshotTxt () {(set -e
# this function will run the command $@ and screenshot the text-output
# http://www.cnx-software.com/2011/09/22
# /how-to-convert-a-command-line-result-into-an-image-in-linux/
    EXIT_CODE=0
    export MODE_BUILD_SCREENSHOT_IMG="screenshot.${MODE_BUILD:-undefined}.svg"
    touch "$npm_config_dir_build/$MODE_BUILD_SCREENSHOT_IMG"
    (
    printf "0" > "$npm_config_file_tmp"
    shBuildPrint "(eval shRun $@ 2>&1)"
    (eval shRun "$@" 2>&1) || printf $? > "$npm_config_file_tmp"
    ) | tee "$npm_config_dir_tmp/runWithScreenshotTxt"
    EXIT_CODE="$(cat "$npm_config_file_tmp")"
    shBuildPrint "EXIT_CODE - $EXIT_CODE"
    # run shRunWithScreenshotTxtAfter
    if (type shRunWithScreenshotTxtAfter > /dev/null 2>&1)
    then
        shRunWithScreenshotTxtAfter
        unset shRunWithScreenshotTxtAfter
    fi
    # format text-output
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var result, wordwrap, yy;
wordwrap = function (line, ii) {
    if (ii && !line) {
        return '';
    }
    yy += 16;
    return '<tspan x=\"10\" y=\"' + yy + '\">' + line
        .replace((/&/g), '&amp;')
        .replace((/</g), '&lt;')
        .replace((/>/g), '&gt;') + '</tspan>\n';
};
yy = 10;
result = require('fs').readFileSync('$npm_config_dir_tmp/runWithScreenshotTxt', 'utf8')
    // remove ansi escape-code
    .replace((/\u001b.*?m/g), '')
    // format unicode
    .replace((/\\u[0-9a-f]{4}/g), function (match0) {
        return String.fromCharCode('0x' + match0.slice(-4));
    })
    .trimRight()
    .split('\n')
    .map(function (line) {
        return line
            .replace((/.{0,96}/g), wordwrap)
            /* jslint-ignore-next-line */
            .replace((/(<\/tspan>\n<tspan)/g), '\\\\\$1')
            .slice();
    })
    .join('\n') + '\n';
result = '<svg height=\"' + (yy + 20) +
    '\" width=\"720\" xmlns=\"http://www.w3.org/2000/svg\">\n' +
    '<rect height=\"' + (yy + 20) + '\" fill=\"#555\" width=\"720\"></rect>\n' +
    '<text fill=\"#7f7\" font-family=\"Courier New\" font-size=\"12\" ' +
    'xml:space=\"preserve\">\n' +
    result + '</text>\n</svg>\n';
require('fs').writeFileSync('$npm_config_dir_build/$MODE_BUILD_SCREENSHOT_IMG', result);
// </script>
"
    shBuildPrint "created screenshot file $npm_config_dir_build/$MODE_BUILD_SCREENSHOT_IMG"
    return "$EXIT_CODE"
)}

shScreencastToGif () {(set -e
# this function will convert the quicktime.mov $1 to the animated gif $2
# https://gist.github.com/dergachev/4627207
# https://gist.github.com/baumandm/1dba6a055356d183bbf7
    ffmpeg -y -i "$1" -vf fps=10,palettegen /tmp/palette.png
    ffmpeg -i "$1" -i /tmp/palette.png -filter_complex "fps=10,paletteuse" "$2"
)}

shServerPortRandom () {(set -e
# this function will print a random unused tcp-port in the inclusive range 0x400 to 0xffff
# http://stackoverflow.com/questions/2556190/random-number-from-a-range-in-a-bash-script
    PORT="$(shRandomIntegerInRange 32768 65536)"
    while (nc -z 127.0.0.1 "$PORT" 2>/dev/null)
    do
        PORT="$(shRandomIntegerInRange 32768 65536)"
    done
    printf "$PORT\n"
)}

shSleep () {(set -e
# this function will sleep $1
    shBuildPrint "sleep $1 ..."
    sleep "$1"
)}

shSource () {
# this function will source .bashrc
    . "$HOME/.bashrc"
}

shSshReverseTunnel () {
# this function will ssh $@ with reverse-tunneling
    ssh -R 2022:127.0.0.1:22 \
        -R 3022:127.0.0.1:2022 \
        "$@" || return $?
}

shTravisHookListGet () {(set -e
# this function will get the json-list of travis-repos with the search paramters $1
# Parameter - Default - Description
# ids - "" - list of repository ids to fetch, cannot be combined with other parameters
# member - "" - filter by user that has access to it (github login)
# owner_name - "" - filter by owner name (first segment of slug)
# slug - "" - filter by slug
# search - "" - filter by search term
# active - false - if true, will only return repositories that are enabled
# https://docs.travis-ci.com/api#repositories
    curl -H "Authorization: token $TRAVIS_ACCESS_TOKEN" -#Lf \
        "https://api.travis-ci.org/hooks?$1"
)}

shTravisRepoBuildCancel () {(set -e
# this function will cancel the travis-repo build
# https://docs.travis-ci.com/api#builds
    GITHUB_REPO="$1"
    BUILD_ID="$(curl -#Lf "https://api.travis-ci.org/repos/$GITHUB_REPO/builds" | \
        grep -oe "\d\d*" | \
        head -n 1)"
    curl -H "Authorization: token $TRAVIS_ACCESS_TOKEN" -#Lf \
        -X POST \
        "https://api.travis-ci.org/builds/$BUILD_ID/cancel"
)}

shTravisRepoBuildRestart () {(set -e
# this function will restart the travis-repo build
# https://docs.travis-ci.com/api#builds
    GITHUB_REPO="$1"
    BUILD_ID="$(curl -#Lf "https://api.travis-ci.org/repos/$GITHUB_REPO/builds" | \
        grep -oe "\d\d*" | \
        head -n 1)"
    curl -H "Authorization: token $TRAVIS_ACCESS_TOKEN" -#Lf \
        -X POST \
        "https://api.travis-ci.org/builds/$BUILD_ID/cancel"
)}

shTravisSync () {(set -e
# this function will sync travis-ci with the given $TRAVIS_ACCESS_TOKEN
# this is an expensive operation that will use up your github rate-limit quota
    curl -H "Authorization: token $TRAVIS_ACCESS_TOKEN" -#Lf -X POST \
        "https://api.travis-ci.org/users/sync"
)}

shTravisTaskPush () {(set -e
# this function will push the shell-task-script $1 with the message $2 to travis
    utility2-github-crud put https://github.com/kaizhu256/node-sandbox2/blob/task/.task.sh \
        "$1" "[\$ /bin/sh .task.sh] $2"
)}

shUbuntuInit () {
# this function will init ubuntu's default .bashrc
    # ~/.bashrc: executed by bash(1) for non-login shells.
    # see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
    # for examples

    # If not running interactively, don't do anything
    case $- in
        *i*) ;;
          *) return;;
    esac

    # don't put duplicate lines or lines starting with space in the history.
    # See bash(1) for more options
    HISTCONTROL=ignoreboth

    # append to the history file, don't overwrite it
    shopt -s histappend

    # for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
    HISTSIZE=1000
    HISTFILESIZE=2000

    # check the window size after each command and, if necessary,
    # update the values of LINES and COLUMNS.
    shopt -s checkwinsize

    # If set, the pattern "**" used in a pathname expansion context will
    # match all files and zero or more directories and subdirectories.
    #shopt -s globstar

    # make less more friendly for non-text input files, see lesspipe(1)
    # [ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

    # set variable identifying the chroot you work in (used in the prompt below)
    if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
        debian_chroot=$(cat /etc/debian_chroot)
    fi

    # set a fancy prompt (non-color, unless we know we "want" color)
    case "$TERM" in
        xterm-color) color_prompt=yes;;
    esac

    # uncomment for a colored prompt, if the terminal has the capability; turned
    # off by default to not distract the user: the focus in a terminal window
    # should be on the output of commands, not on the prompt
    #force_color_prompt=yes

    if [ -n "$force_color_prompt" ]; then
        if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
            # We have color support; assume it's compliant with Ecma-48
            # (ISO/IEC-6429). (Lack of such support is extremely rare, and such
            # a case would tend to support setf rather than setaf.)
            color_prompt=yes
        else
            color_prompt=
        fi
    fi

    if [ "$color_prompt" = yes ]; then
        PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
    else
        PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
    fi
    unset color_prompt force_color_prompt

    # If this is an xterm set the title to user@host:dir
    case "$TERM" in
    xterm*|rxvt*)
        PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
        ;;
    *)
        ;;
    esac

    # enable color support of ls and also add handy aliases
    if [ -x /usr/bin/dircolors ]; then
        test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
        alias ls='ls --color=auto'
        #alias dir='dir --color=auto'
        #alias vdir='vdir --color=auto'

        alias grep='grep --color=auto'
        alias fgrep='fgrep --color=auto'
        alias egrep='egrep --color=auto'
    fi

    # some more ls aliases
    alias ll='ls -alF'
    alias la='ls -A'
    alias l='ls -CF'

    # Add an "alert" alias for long running commands.  Use like so:
    #   sleep 10; alert
    alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

    # Alias definitions.
    # You may want to put all your additions into a separate file like
    # ~/.bash_aliases, instead of adding them here directly.
    # See /usr/share/doc/bash-doc/examples in the bash-doc package.

    if [ -f ~/.bash_aliases ]; then
        . ~/.bash_aliases
    fi

    # enable programmable completion features (you don't need to enable
    # this, if it's already enabled in /etc/bash.bashrc and /etc/profile
    # sources /etc/bash.bashrc).
    if ! shopt -oq posix; then
        if [ -f /usr/share/bash-completion/bash_completion ]; then
            . /usr/share/bash-completion/bash_completion
        elif [ -f /etc/bash_completion ]; then
            . /etc/bash_completion
        fi
    fi
}

shUtility2BuildApp () {(set -e
# this function will run shBuildApp in $UTILITY2_DEPENDENTS
    shUtility2DependentsSync
    cd "$HOME/src"
    # shBuildApp
    for DIR in \
apidoc-lite \
db-lite \
github-crud \
istanbul-lite \
jslint-lite \
swgg \
uglifyjs-lite \
utility2
    do
        if [ -d "$DIR" ] && [ "$DIR" != utility2 ]
        then
            printf "\n\n\n\n$DIR\n\n\n\n"
            (cd "$DIR" && shBuildApp)
        fi
    done
    shUtility2GitDiff | less
)}

shUtility2Dependents () {(set -e
# this function will return a list of utility2 dependents
    cd "$HOME/src" 2>/dev/null || true
printf "
apidoc-lite
db-lite
elasticsearch-lite
electron-lite
github-crud
istanbul-lite
itunes-search-lite
jslint-lite
swagger-ui-lite
swagger-validate-lite
swgg
uglifyjs-lite
utility2
"
)}

shUtility2DependentsSync () {(set -e
# this function will sync files between utility2 and its dependents
    cd "$HOME/src"
    (cd utility2 && shBuildApp)
    ln -f "utility2/lib.utility2.sh" "$HOME"
    for DIR in $UTILITY2_DEPENDENTS $(ls -d swgg-* 2>/dev/null)
    do
        if [ "$DIR" = utility2 ] || [ ! -d "$DIR" ]
        then
            continue
        fi
        # hardlink .gitignore
        ln -f utility2/.gitignore "$DIR"
        # hardlink LICENSE
        ln -f utility2/LICENSE "$DIR"
        # hardlink assets.utility2.rollup.js
        if [ -f "$DIR/assets.utility2.rollup.js" ]
        then
            ln -f utility2/tmp/build/app/assets.utility2.rollup.js "$DIR"
        fi
        # hardlink "lib.$LIB.js"
        LIB="$(printf "$DIR" | sed -e "s/-lite\$//" -e "s/-/_/g")"
        if [ -f "utility2/lib.$LIB.js" ]
        then
            ln -f "utility2/lib.$LIB.js" "$DIR"
        fi
        # sync .travis.yml
        SECURE="$(grep -m 1 -e "^    - secure: " "$DIR/.travis.yml")"
        cat utility2/.travis.yml | sed -e "s|^    - secure: .*|$SECURE|" > "$DIR/.travis.yml"
    done
)}

shUtility2GitCommit () {(set -e
# this function will git-commit $UTILITY2_DEPENDENTS with the given $MESSAGE
    # init $MESSAGE
    MESSAGE="$1"
    for DIR in $UTILITY2_DEPENDENTS
    do
        cd "$HOME/src/$DIR" || continue
        printf "\n\n\n\n$(pwd)\n"
        git commit -am "'$MESSAGE'" || true
    done
)}

shUtility2GitCommitAndPush () {(set -e
# this function will git-commit and git-push $UTILITY2_DEPENDENTS with the given $MESSAGE
    # init $MESSAGE
    MESSAGE="$1"
    for DIR in $UTILITY2_DEPENDENTS
    do
        cd "$HOME/src/$DIR" || continue
        printf "\n\n\n\n$(pwd)\n"
        git commit -am "'$MESSAGE'" || true
        git push || true
    done
)}

shUtility2GitDiff () {(set -e
# this function will print the git-status of $UTILITY2_DEPENDENTS to stdout
    for DIR in \
apidoc-lite \
db-lite \
electron-lite \
github-crud \
istanbul-lite \
jslint-lite \
swgg \
uglifyjs-lite \
utility2
    do
        cd "$HOME/src/$DIR" || continue
        printf "\n\n\n\n$(pwd)\n\n\n\n"
        shGitLsTree
        git status
        git diff HEAD | cat
    done
)}

shUtility2Grep () {(set -e
# this function will recursively grep $UTILITY2_DEPENDENTS for the regexp $REGEXP
    REGEXP="$1"
    for DIR in $UTILITY2_DEPENDENTS $(cd "$HOME/src"; ls -d swgg-* 2>/dev/null)
    do
        DIR="$HOME/src/$DIR"
        if [ -d "$DIR" ]
        then
            shGrep "$DIR" "$REGEXP"
        fi
    done
)}

shUtility2GrepTravisYml () {(set -e
# this function will recursively grep .travis.yml in $UTILITY2_DEPENDENTS for the regexp $REGEXP
    REGEXP="$1"
    for DIR in $UTILITY2_DEPENDENTS
    do
        DIR="$HOME/src/$DIR"
        if [ -d "$DIR" ]
        then
            grep -HIine "$REGEXP" "$DIR/.travis.yml" || true
        fi
    done
)}

shUtility2Version () {(set -e
# this function will print the latest versions in $UTILITY2_DEPENDENTS
    printf "[\n"
    for DIR in $UTILITY2_DEPENDENTS
    do
        printf "'$(npm info $DIR version) $DIR',\n"
    done
    printf "].map(function (element) {
    return element.replace((/(\\\\b\\\\d\\\\b)/g), '0\$1');
}).sort()\n"
)}

shXvfbStart () {
# this function will start xvfb
    if [ "$(uname)" = Linux ] && [ ! "$DISPLAY" ]
    then
        rm -f /tmp/.X99-lock && export DISPLAY=:99.0 && (Xvfb "$DISPLAY" &) 2>/dev/null || true
    fi
}

# run command
shMain "$@"
