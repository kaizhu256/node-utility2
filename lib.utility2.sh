#!/bin/sh
# jslint utility2:true

# POSIX test utility
# http://pubs.opengroup.org/onlinepubs/9699919799/utilities/test.html

# useful sh one-liners
# http://sed.sourceforge.net/sed1line.txt
# git config --global diff.algorithm histogram
# git fetch origin alpha beta master --tags
# git ls-remote --heads origin
# npm_package_private=1 GITHUB_REPO=aa/node-aa-bb-pro shCryptoWithGithubOrg aa shCryptoTravisEncrypt
# shCryptoWithGithubOrg aa shTravisRepoCreate aa/node-aa-bb
# shCryptoWithGithubOrg aa shGithubApiRateLimitGet
# shCryptoWithGithubOrg aa shGithubRepoTouch aa/node-aa-bb "touch" alpha
# DOCKER_V_GAME=1 DOCKER_V_HOME=1 DOCKER_PORT=4065 shDockerRestart work kaizhu256/node-utility2
# shGitAddTee npm test --mode-coverage --mode-test-case2=_testCase_webpage_default,testCase_nop_default
# shGitAddTee shUtility2DependentsSync
# utility2 shReadmeTest example.js

shBaseInit () {
# this function will init the base bash-login env, and is intended for aws-ec2 setup
    local FILE || return "$?"
    # PATH=/usr/local/bin:/usr/bin:/bin
    # init $PATH_BIN
    if [ ! "$PATH_BIN" ]
    then
        export PATH_BIN="$HOME/bin:$HOME/node_modules/.bin\
:/usr/local/n/bin:/usr/local/bin:/usr/local/sbin" || return "$?"
        export PATH="$PATH_BIN:$PATH" || return "$?"
    fi
    # init $PATH_OS
    case "$(uname)" in
    Darwin)
        if [ ! "$PATH_OS" ]
        then
            export PATH_OS="$HOME/bin/darwin" || return "$?"
            export PATH="$PATH_OS:$PATH" || return "$?"
        fi
        ;;
    Linux)
        if [ ! "$PATH_OS" ]
        then
            export PATH_OS="$HOME/bin/linux" || return "$?"
            export PATH="$PATH_OS:$PATH" || return "$?"
        fi
        ;;
    esac
    # init lib.utility2.sh and .bashrc2
    for FILE in "$HOME/lib.utility2.sh" "$HOME/.bashrc2"
    do
        # source $FILE
        if [ -f "$FILE" ]
        then
            . "$FILE" || return "$?"
        fi
    done
    # init ubuntu .bashrc
    shUbuntuInit || return "$?"
    # init custom alias
    alias lld="ls -adlF" || return "$?"
}

shBaseInstall () {
# this function will install .bashrc, .screenrc, .vimrc, and lib.utility2.sh in $HOME,
# and is intended for aws-ec2 setup
# example usage:
# curl -o "$HOME/lib.utility2.sh" https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/lib.utility2.sh && . "$HOME/lib.utility2.sh" && shBaseInstall
    for FILE in .screenrc .vimrc lib.utility2.sh
    do
        curl -Lfs -o "$HOME/$FILE" \
"https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/$FILE" ||
            return "$?"
    done
    # backup .bashrc
    if [ -f "$HOME/.bashrc" ] && [ ! -f "$HOME/.bashrc.00" ]
    then
        cp "$HOME/.bashrc" "$HOME/.bashrc.00" || return "$?"
    fi
    # create .bashrc
    printf '. "$HOME/lib.utility2.sh" && shBaseInit\n' > "$HOME/.bashrc" ||
        return "$?"
    # init .ssh/authorized_keys.root
    if [ -f "$HOME/.ssh/authorized_keys.root" ]
    then
        mv "$HOME/.ssh/authorized_keys.root" "$HOME/.ssh/authorized_keys" ||
            return "$?"
    fi
    # source .bashrc
    . "$HOME/.bashrc" || return "$?"
}

shBrowserScreenshot () {(set -e
# this function will run headless-chromium to screenshot url "$1"
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
let opt;
opt = {};
opt.argv = process.argv;
opt.cwd = process.cwd();
opt.timeStart = Date.now();
opt.url = opt.argv[1];
if (!(
    /^\w+?:/
).test(opt.url)) {
    opt.url = require("path").resolve(opt.url);
}
opt.file = require("url").parse(opt.url).pathname;
if (opt.file.indexOf(opt.cwd) === 0) {
    opt.file = opt.file.replace(opt.cwd, "");
}
opt.file = (
    process.env.npm_config_dir_build
    + "/screenshot."
    + process.env.MODE_BUILD + ".browser."
    + encodeURIComponent(opt.file.replace(
        "/build.." + process.env.CI_BRANCH + ".." + process.env.CI_HOST,
        "/build"
    ))
    + ".png"
);
opt.argList = [
    "--headless",
    "--incognito",
    "--screenshot",
    "--timeout=30000",
    "-screenshot=" + opt.file,
    opt.url
];
opt.command = process.env.CHROME_BIN;
if (opt.argv[2] === "--debug") {
    console.error(JSON.stringify(opt, null, 4));
}
process.on("exit", function (exitCode) {
    if (typeof exitCode === "object" && exitCode) {
        console.error(exitCode);
        exitCode = 1;
    }
    console.error(
        "\nshBrowserScreenshot"
        + " - " + (Date.now() - opt.timeStart) + " ms"
        + " - exitCode " + exitCode
        + " - " + opt.url
        + "\n"
    );
});
process.on("uncaughtException", process.exit);
require("child_process").spawn(opt.command, opt.argList, {
    stdio: [
        "ignore", 1, 2
    ]
});
}());
' "$1" "$2"
)}

shBrowserTest () {(set -e
# this function will spawn google-puppeteer-process to test url $1,
# and merge the test-report into the existing test-report
    shBuildInit
    export MODE_BUILD="${MODE_BUILD:-browserTest}"
    shBuildPrint "shBrowserTest $*"
    # run browser-test
    lib.utility2.js utility2.browserTest "$1"
    # create test-report artifacts
    lib.utility2.js utility2.testReportCreate
)}

shBuildApidoc () {(set -e
# this function will build the apidoc
    shEnvSanitize
    export MODE_BUILD=buildApidoc
    npm test --mode-coverage="" --mode-test-case=testCase_buildApidoc_default
)}

shBuildApp () {(set -e
# this function will build the app
    shEnvSanitize
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
    for FILE in .gitignore .travis.yml LICENSE npm_scripts.sh
    do
        if [ ! -f "$FILE" ]
        then
            curl -Lfs -O \
"https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/$FILE"
        fi
    done
    # create file package.json
    node -e "$UTILITY2_MACRO_JS"'
/* jslint utility2:true */
(function (local) {
"use strict";
let result;
result = Object.assign({
    "description": "the greatest app in the world!",
    "main": "lib." + process.env.npm_package_nameLib + ".js",
    "name": process.env.npm_package_name,
    "scripts": {
        "test": "./npm_scripts.sh"
    },
    "version": "0.0.1"
}, JSON.parse(require("fs").readFileSync("package.json")));
result.scripts.test = result.scripts.test || "./npm_scripts.sh";
require("fs").writeFileSync(
    "package.json",
    local.jsonStringifyOrdered(result, null, 4) + "\n"
);
}(globalThis.globalLocal));
'
    # create files README.md, lib.$npm_package.nameLib.js, test.js
    node -e '
/* jslint utility2:true */
(function (local) {
"use strict";
let tmp;
if (!local.fs.existsSync("README.md", "utf8")) {
    local.fs.writeFileSync("README.md", local.templateRenderMyApp(
        local.assetsDict["/assets.readme.template.md"],
        {}
    ));
}
if (!local.fs.existsSync(
    "lib." + process.env.npm_package_nameLib + ".js",
    "utf8"
)) {
    tmp = local.assetsDict["/assets.my_app.template.js"];
    if (local.fs.existsSync("assets.utility2.rollup.js")) {
        tmp = tmp.replace(
            "    // || globalThis.utility2_rollup_old || ",
            "    || globalThis.utility2_rollup_old || "
        );
    }
    local.fs.writeFileSync(
        "lib." + process.env.npm_package_nameLib + ".js",
        local.templateRenderMyApp(tmp, {})
    );
}
if (!local.fs.existsSync("test.js", "utf8")) {
    tmp = local.assetsDict["/assets.test.template.js"];
    if (local.fs.existsSync("assets.utility2.rollup.js")) {
        tmp = tmp.replace(
            "require(\u0027utility2\u0027)",
            "require(\u0027./assets.utility2.rollup.js\u0027)"
        );
    }
    local.fs.writeFileSync("test.js", local.templateRenderMyApp(tmp, {}));
}
}(require(process.env.npm_config_dir_utility2)));
'
    chmod 755 "lib.$npm_package_nameLib.js" npm_scripts.sh
    if [ "$npm_package_nameLib" != utility2 ]
    then
        shBuildAppSync
    fi
    npm test --mode-coverage="" --mode-test-case=testCase_buildApp_default
)}

shBuildAppSync () {
# this function will sync files with utility2
# optimization - do not run in subshell and do not call shBuildInit
    # update .travis.yml
    if [ -f "$npm_config_dir_utility2/.travis.yml" ]
    then
        shFileCustomizeFromToRgx \
            "$npm_config_dir_utility2/.travis.yml" \
            ".travis.yml" \
            '\n    - secure: .*? # CRYPTO_AES_KEY\n'
    fi
    # update npm_scripts.sh
    shFileCustomizeFromToRgx \
        "$npm_config_dir_utility2/npm_scripts.sh" \
        "npm_scripts.sh" \
        '\n    # run command - custom\n[\S\s]*?\n    esac\n' \
        '\n\)\}\n[\S\s]*?\n# run command\n'
    # hardlink .gitignore
    if [ -f "$npm_config_dir_utility2/.travis.yml" ]
    then
        ln -f "$npm_config_dir_utility2/.gitignore" . || true
    fi
    # hardlink assets.utility2.rollup.js
    if [ -f "assets.utility2.rollup.js" ] &&
        [ \
            -f \
            "$npm_config_dir_utility2/tmp/build/app/assets.utility2.rollup.js" \
        ]
    then
        ln -f \
            "$npm_config_dir_utility2/tmp/build/app/assets.utility2.rollup.js" \
            . || true
    fi
}

shBuildCi () {(set -e
# this function will run the main build
    shBuildInit
    export MODE_BUILD=buildCi
    # init travis-ci.org env
    if [ "$TRAVIS" ]
    then
        export CI_HOST="${CI_HOST:-travis-ci.org}"
        git remote remove origin 2>/dev/null || true
        git remote add origin "https://github.com/$GITHUB_REPO"
    fi
    # init default env
    export CI_COMMIT_ID="${CI_COMMIT_ID:-$(git rev-parse --verify HEAD)}"
    export CI_HOST="${CI_HOST:-127.0.0.1}"
    # save $CI_BRANCH
    export CI_BRANCH_OLD="${CI_BRANCH_OLD:-$CI_BRANCH}"
    # init $CI_COMMIT_*
    export CI_COMMIT_INFO="$CI_COMMIT_ID - $CI_COMMIT_MESSAGE"
    export CI_COMMIT_MESSAGE="$(git log -1 --pretty=%s)"
    export CI_COMMIT_MESSAGE_META=\
"$(git log -1 --pretty=%s | grep  -E "\[.*\]" | sed -e "s/\].*//" -e "s/\[//")"
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
    shBuildPrint \
"shBuildCi CI_BRANCH=$CI_BRANCH CI_COMMIT_MESSAGE_META=\"$CI_COMMIT_MESSAGE\""
    case "$CI_BRANCH" in
    alpha)
        case "$CI_COMMIT_MESSAGE" in
        "[build app]"*)
            node -e '
/* jslint utility2:true */
(function (local) {
"use strict";
["assets.utility2.rollup.js"].forEach(function (file) {
    if (local.fs.existsSync(file)) {
        local.fs.writeFileSync(file, local.assetsDict["/" + file]);
    }
});
}(require("utility2")));
'
            shBuildApp
            ;;
        # example usage:
        # shCryptoWithGithubOrg kaizhu256 shGithubRepoTouch kaizhu256/node-swgg-github-misc "[git squashPop HEAD~1] [npm publishAfterCommitAfterBuild]"
        "[git squashPop "*)
            shGitSquashPop \
                "$(shGithubRepoBranchId $(
                    printf "$CI_COMMIT_MESSAGE_META" | sed -e "s/.* //"
                ))" \
                "$(printf "$CI_COMMIT_MESSAGE" | sed -e "s/\[[^]]*\] //")"
            shGitCommandWithGithubToken push \
                "https://github.com/$GITHUB_REPO" -f HEAD:alpha
            return
            ;;
        # example usage:
        # shCryptoWithGithubOrg npmdoc shGithubRepoTouch "npmdoc/node-npmdoc-mysql npmdoc/node-npmdoc-mysql" "[npm publishAfterCommitAfterBuild]"
        "[npm publishAfterCommitAfterBuild]"*)
            if [ ! "$GITHUB_TOKEN" ]
            then
                shBuildPrint "no GITHUB_TOKEN"
                return 1
            fi
            # pre-build app for first-time
            if [ ! -f test.js ]
            then
                shBuildApp
            fi
            # shBuildAppSync
            rm -rf "$npm_config_dir_utility2"
            git clone https://github.com/kaizhu256/node-utility2 \
                "$npm_config_dir_utility2" \
                --branch=alpha --single-branch --depth=50
            mkdir -p "$npm_config_dir_utility2/tmp/build/app"
            curl -Lfs https://raw.githubusercontent.com\
/kaizhu256/node-utility2/gh-pages/build..alpha..travis-ci.org/app\
/assets.utility2.rollup.js > \
"$npm_config_dir_utility2/tmp/build/app/assets.utility2.rollup.js"
            ;;
        esac
        shBuildCiInternal
        ;;
    beta)
        case "$CI_COMMIT_MESSAGE" in
        "[npm publishAfterCommitAfterBuild]"*)
            ;;
        *)
            shBuildCiInternal
            ;;
        esac
        ;;
    cron)
        [ ! -f .task.sh ] || /bin/sh .task.sh
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
        if (grep -q -E '    shNpmTestPublished' README.md)
        then
            # npm publish
            shNpmPublishAlias || true
        else
            shBuildPrint "skip npm-publish"
        fi
        # security - cleanup .npmrc
        rm -f "$HOME/.npmrc"
        shSleep 5
        shBuildCiInternal
        ;;
    task)
        case "$CI_COMMIT_MESSAGE" in
        "[\$ "*)
            eval "$(printf "$CI_COMMIT_MESSAGE_META" | sed -e "s/^..//")"
            ;;
        # example usage:
        # shCryptoWithGithubOrg kaizhu256 shGithubRepoTouch kaizhu256/node-sandbox2 "[debug travis@proxy.com root]" task
        "[debug "*)
            if [ ! "$SSH_KEY" ]
            then
                shBuildPrint "no SSH_KEY"
                return 1
            fi
            # init id_rsa
            (
            cd "$HOME/.ssh"
            printf "$SSH_KEY" | base64 --decode > id_rsa && chmod 600 id_rsa
            ssh-keygen -y -f id_rsa > authorized_keys
            )
            # ssh reverse-tunnel local-machine to middleman
            eval "$(
                printf "$CI_COMMIT_MESSAGE_META" | sed -e "s/debug/shSsh5022R/"
            )"
            PID="$(pgrep -n -f ssh)"
            while (kill -0 "$PID" 2>/dev/null)
            do
                shSleep 60
            done
            ;;
        # example usage:
        # shCryptoWithGithubOrg kaizhu256 shGithubRepoTouch kaizhu256/node-swgg-github-misc "[git push origin beta:master]" task
        "[git push origin "*)
            git fetch --depth=50 origin "$(
                printf "$CI_COMMIT_MESSAGE_META" |
                sed -e "s/:.*//" -e "s/.* //"
            )"
            eval "$(printf "$CI_COMMIT_MESSAGE_META" | sed \
                -e "s/git/shGitCommandWithGithubToken/" \
                -e "s/\([^ ]*:\)/origin\/\1/")"
            return;
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
            shPackageJsonVersionUpdate today publishedIncrement
            # update file touch.txt
            printf "$(shDateIso)\n" > .touch.txt
            git add -f .touch.txt
            # git commit and push
            git commit -am "[ci skip] $CI_COMMIT_MESSAGE"
            shGitCommandWithGithubToken push \
                "https://github.com/$GITHUB_REPO" -f HEAD:alpha
            npm run build-ci
            return
            ;;
        "[npm publish]"*)
            shGitCommandWithGithubToken push \
                "https://github.com/$GITHUB_REPO" HEAD:publish
            ;;
        "[npm publishAfterCommit]"*)
            export CI_BRANCH=publish
            export CI_BRANCH_OLD=publish
            find node_modules -name .git -print0 | xargs -0 rm -rf
            npm run build-ci
            ;;
        "[npm publishAfterCommitAfterBuild]"*)
            # increment $npm_package_version
            shPackageJsonVersionUpdate today publishedIncrement
            # update file touch.txt
            printf "$(shDateIso)\n" > .touch.txt
            git add -f .touch.txt
            # git commit and push
            git add .
            git rm --cached -f .travis.yml
            git commit -am "[npm publishAfterCommit]"
            shGitCommandWithGithubToken push \
                "https://github.com/$GITHUB_REPO" -f HEAD:alpha
            export CI_COMMIT_ID="$(git rev-parse --verify HEAD)"
            find node_modules -name .git -print0 | xargs -0 rm -rf
            npm run build-ci
            ;;
        esac
        ;;
    beta)
        ;;
    master)
        git tag "$npm_package_version" || true
        shGitCommandWithGithubToken push \
            "https://github.com/$GITHUB_REPO" "$npm_package_version" || true
        ;;
    publish)
        if (grep -q -E '    shNpmTestPublished' README.md)
        then
            # init .npmrc
            printf "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > \
                "$HOME/.npmrc"
            # npm-publish aliases
            for NAME in $npm_package_nameAliasPublish
            do
                shNpmPublishAlias . "$NAME" || true
            done
            shSleep 5
            # npm-test published aliases
            for NAME in $npm_package_nameAliasPublish
            do
                shNpmTestPublished "$NAME"
            done
        else
            shBuildPrint "skip npm-publish"
        fi
        # security - cleanup .npmrc
        rm -f "$HOME/.npmrc"
        case "$CI_COMMIT_MESSAGE" in
        "[npm publishAfterCommit]"*)
            shGitSquashPop HEAD~1 \
"[ci skip] [npm published \
$(node -e 'process.stdout.write(require("./package.json").version)')]"
            shGitCommandWithGithubToken push \
                "https://github.com/$GITHUB_REPO" -f HEAD:alpha
            ;;
        *)
            shGitCommandWithGithubToken push \
                "https://github.com/$GITHUB_REPO" HEAD:beta
            ;;
        esac
        ;;
    esac
    # sync with $npm_package_githubRepoAlias
    if [ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ]
    then
        for GITHUB_REPO_ALIAS in $npm_package_githubRepoAlias
        do
            shGithubRepoCreate "$GITHUB_REPO_ALIAS"
            shGitCommandWithGithubToken push \
                "https://github.com/$GITHUB_REPO_ALIAS" --tags -f "$CI_BRANCH"
            if [ "$CI_BRANCH" = alpha ] && [ "$npm_package_description" ]
            then
                shGithubRepoDescriptionUpdate "$GITHUB_REPO_ALIAS" \
                "$npm_package_description" || true
            fi
        done
    fi
)}

shBuildCiInternal () {(set -e
# this function will run the internal build
    shBuildInit
    # run build-ci-before
    if (type shBuildCiBefore > /dev/null 2>&1)
    then
        shBuildCiBefore
    fi
    export npm_config_file_test_report_merge=\
"$npm_config_dir_build/test-report.json"



    # npm-test
    (
    shEnvSanitize
    export MODE_BUILD=npmTest
    shBuildPrint "$(
        du -ms node_modules | awk '{print "npm install - " $1 " megabytes"}'
    )"
    npm test --mode-coverage
    )
    # create apidoc
    shBuildApidoc
    # create npmPackageListing
    shNpmPackageListingCreate
    shNpmPackageDependencyTreeCreate "$npm_package_name" "$GITHUB_REPO#alpha"
    # create npmPackageCliHelp
    shNpmPackageCliHelpCreate
    # create recent changelog of last 50 commits
    MODE_BUILD=gitLog shRunWithScreenshotTxt git log -50 --pretty="%ai\\u000a%B"



    # screenshot coverage
    FILE="$(
        find "$npm_config_dir_build" -name *.js.html 2>/dev/null | tail -n 1
    )"
    if [ -f "$FILE" ]
    then
        cp "$FILE" "$npm_config_dir_build/coverage.lib.html"
    fi
    for FILE in apidoc.html coverage.lib.html test-report.html
    do
        FILE="$npm_config_dir_build/$FILE"
        if [ -f "$FILE" ]
        then
            MODE_BUILD=buildCi shBrowserScreenshot "file://$FILE" &
        fi
    done



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
    # list $npm_config_dir_build
    find "$npm_config_dir_build" | sort
    # upload build-artifacts to github
    # and if number of commits > $COMMIT_LIMIT
    # then squash older commits
    if [ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ]
    then
        COMMIT_LIMIT=20 shBuildGithubUpload
    fi
    shGitInfo | head -n 4096 || true
    # validate http-links embedded in README.md
    if [ ! "$npm_package_private" ] &&
        ! (
            printf "$CI_COMMIT_MESSAGE_META" |
            grep -q -E "^npm publishAfterCommitAfterBuild"
        )
    then
        shSleep 60
        shReadmeLinkValidate
    fi
)}

shBuildGithubUpload () {(set -e
# this function will upload build-artifacts to github
    export MODE_BUILD="${MODE_BUILD:-buildGithubUpload}"
    shBuildPrint "uploading build-artifacts to https://github.com/$GITHUB_REPO"
    URL="https://github.com/$GITHUB_REPO"
    # init $DIR
    DIR="$npm_config_dir_tmp/buildGithubUpload"
    rm -rf "$DIR"
    shGitCommandWithGithubToken clone "$URL" --single-branch -b gh-pages "$DIR"
    cd "$DIR"
    # cleanup screenshot
    rm -f build/*127.0.0.1*
    case "$CI_COMMIT_MESSAGE" in
    "[build clean]"*)
        shBuildPrint "[build clean]"
        rm -rf build
        ;;
    esac
    # copy build-artifacts
    cp -a "$npm_config_dir_build" .
    rm -rf "build..$CI_BRANCH..$CI_HOST"
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
    if [ "$COMMIT_LIMIT" ] &&
        [ "$(git rev-list HEAD --count)" -gt "$COMMIT_LIMIT" ]
    then
        shGitCommandWithGithubToken push "$URL" -f HEAD:gh-pages.backup
        shGitSquashShift "$(($COMMIT_LIMIT / 2))"
    fi
    shGitCommandWithGithubToken push "$URL" -f HEAD:gh-pages
    if [ "$CI_BRANCH" = alpha ] && [ "$npm_package_description" ]
    then
        shGithubRepoDescriptionUpdate \
            "$GITHUB_REPO" "$npm_package_description" || true
    fi
)}

shBuildInit () {
# this function will init the env
    # init $CHROME_BIN
    CHROME_BIN="${CHROME_BIN:-$(which google-chrome-stable 2>/dev/null)}" ||
        true
    local FILE
    for FILE in \
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
        "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" \
        "C:\Program Files\Google\Chrome\Application\chrome.exe"
    do
        if [ ! "$CHROME_BIN" ] && [ -f "$FILE" ]
        then
            CHROME_BIN="$FILE"
        fi
    done
    export CHROME_BIN
    # init $CI_BRANCH
    export CI_BRANCH="${CI_BRANCH:-$TRAVIS_BRANCH}"
    export CI_BRANCH="${CI_BRANCH:-alpha}"
    # init $npm_config_dir_utility2
    if [ ! "$npm_config_dir_utility2" ]
    then
        if [ -f lib.utility2.js ]
        then
            export npm_config_dir_utility2="$PWD"
        elif [ -f "$HOME/Documents/utility2/lib.utility2.js" ]
        then
            export npm_config_dir_utility2="$HOME/Documents/utility2"
        fi
        export npm_config_dir_utility2="${npm_config_dir_utility2:-\
$(shModuleDirname utility2)}" || return "$?"
        export npm_config_dir_utility2="${npm_config_dir_utility2:-\
$HOME/node_modules/utility2}" || return "$?"
        export PATH="$PATH\
:$npm_config_dir_utility2:$npm_config_dir_utility2/../.bin" || return "$?"
    fi
    # init $npm_package_*
    if [ -f package.json ]
    then
        eval "$(node -e '
/* jslint utility2:true */
(function () {
"use strict";
let packageJson;
let value;
packageJson = require("./package.json");
Object.keys(packageJson).forEach(function (key) {
    value = packageJson[key];
    if (!(
        /\W/g
    ).test(key) && typeof value === "string" && !(
        /[\n$]/
    ).test(value)) {
        process.stdout.write(
            "export npm_package_" + key + "=\u0027"
            + value.replace((
                /\u0027/g
            ), "\u0027\"\u0027\"\u0027") + "\u0027;"
        );
    }
});
value = String(
    (packageJson.repository && packageJson.repository.url)
    || packageJson.repository
    || ""
).split(":").slice(-1)[0].toString().split("/").slice(-2).join("/").replace((
    /\.git$/
), "");
if ((
    /^[^\/]+\/[^\/]+$/
).test(value)) {
    value = value.split("/");
    if (!process.env.GITHUB_REPO) {
        process.env.GITHUB_REPO = value.join("/");
        process.stdout.write(
            "export GITHUB_REPO=" + JSON.stringify(process.env.GITHUB_REPO)
            + ";"
        );
    }
    if (!process.env.GITHUB_ORG) {
        process.env.GITHUB_ORG = value[0];
        process.stdout.write(
            "export GITHUB_ORG=" + JSON.stringify(process.env.GITHUB_ORG)
            + ";"
        );
    }
}
}());
')" || return "$?"
    else
        export npm_package_name=my-app-lite || return "$?"
        export npm_package_version=0.0.1 || return "$?"
    fi
    export npm_package_nameLib="${npm_package_nameLib:-$(
        printf "$npm_package_name" | sed -e "s/[^0-9A-Z_a-z]/_/g"
    )}" || return "$?"
    # init $npm_config_*
    export npm_config_dir_build="${npm_config_dir_build:-$PWD/tmp/build}" ||
        return "$?"
    mkdir -p "$npm_config_dir_build/coverage.html" || return "$?"
    export npm_config_dir_tmp="$PWD/tmp" || return "$?"
    mkdir -p "$npm_config_dir_tmp" || return "$?"
    export npm_config_file_tmp="${npm_config_file_tmp:-$PWD/tmp/tmpfile}" ||
        return "$?"
    # extract and save the scripts embedded in README.md to tmp/
    if [ -f README.md ]
    then
        node -e '
/* jslint utility2:true */
(function () {
"use strict";
require("fs").readFileSync("README.md", "utf8").replace((
    /```\w*?(\n[\W\s]*?(\w\S*?)[\n"][\S\s]*?)\n```/g
), function (match0, match1, match2, ii, text) {
    // preserve lineno
    match0 = text.slice(0, ii).replace((
        /.+/g
    ), "") + match1.replace((
        // parse "\" line-continuation
        /(?:.*\\\n)+.*/g
    ), function (match0) {
        return match0.replace((
            /\\\n/g
        ), "") + match0.replace((
            /.+/g
        ), "");
    });
    // trim json-file
    if (match2.slice(-5) === ".json") {
        match0 = match0.trim();
    }
    require("fs").writeFileSync(
        "tmp/README." + match2,
        match0.trimEnd() + "\n"
    );
});
}());
'
    fi
}

shBuildInsideDocker () {(set -e
# this function will run the build inside docker
    shEnvSanitize
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
    rm -rf tmp
    # cleanup build
    shDockerBuildCleanup
)}

shBuildPrint () {(set -e
# this function will print debug info about the build state
    printf '%b' \
        "\n\x1b[35m[MODE_BUILD=$MODE_BUILD]\x1b[0m - $(shDateIso) - $*\n\n" 1>&2
)}

shChromeSocks5 () {(set -e
# this function will run chrome with socks5 proxy
# https://sites.google.com/a/chromium.org/dev/developers/design-documents/network-stack/socks-proxy
    if [ "$1" = "canary" ]
    then
"/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary" \
        --proxy-bypass-list="127.*;192.*;localhost"\
        --proxy-server="socks5://localhost:5080"\
        --host-resolver-rules="MAP * 0.0.0.0, EXCLUDE localhost" "$@" ||
        return "$?"
    else
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
        --proxy-bypass-list="127.*;192.*;localhost"\
        --proxy-server="socks5://localhost:5080"\
        --host-resolver-rules="MAP * 0.0.0.0, EXCLUDE localhost" "$@" ||
        return "$?"
    fi
)}

shCryptoAesXxxCbcRawDecrypt () {(set -e
# this function will inplace aes-xxx-cbc decrypt stdin with given hex-key $1
# example usage:
# printf 'hello world\n' | shCryptoAesXxxCbcRawEncrypt 0123456789abcdef0123456789abcdef | shCryptoAesXxxCbcRawDecrypt 0123456789abcdef0123456789abcdef
    node -e "$UTILITY2_MACRO_JS"'
/* jslint utility2:true */
(function (local) {
"use strict";
let chunkList;
chunkList = [];
process.stdin.on("data", function (chunk) {
    chunkList.push(chunk);
});
process.stdin.on("end", function () {
    local.cryptoAesXxxCbcRawDecrypt({
        data: (
            process.argv[2] === "base64"
            ? Buffer.concat(chunkList).toString()
            : Buffer.concat(chunkList)
        ),
        key: process.argv[1],
        mode: process.argv[2]
    }, function (err, data) {
        local.assertOrThrow(!err, err);
        Object.setPrototypeOf(data, Buffer.prototype);
        process.stdout.write(data);
    });
});
}(globalThis.globalLocal));
' "$@"
)}

shCryptoAesXxxCbcRawEncrypt () {(set -e
# this function will inplace aes-xxx-cbc encrypt stdin with given hex-key $1
# example usage:
# printf 'hello world\n' | shCryptoAesXxxCbcRawEncrypt 0123456789abcdef0123456789abcdef | shCryptoAesXxxCbcRawDecrypt 0123456789abcdef0123456789abcdef
    node -e "$UTILITY2_MACRO_JS"'
/* jslint utility2:true */
(function (local) {
"use strict";
let chunkList;
chunkList = [];
process.stdin.on("data", function (chunk) {
    chunkList.push(chunk);
});
process.stdin.on("end", function () {
    local.cryptoAesXxxCbcRawEncrypt({
        data: Buffer.concat(chunkList),
        key: process.argv[1],
        mode: process.argv[2]
    }, function (err, data) {
        local.assertOrThrow(!err, err);
        Object.setPrototypeOf(data, Buffer.prototype);
        process.stdout.write(data);
    });
});
}(globalThis.globalLocal));
' "$@"
)}

shCryptoTravisDecrypt () {(set -e
# this function will use $CRYPTO_AES_KEY to decrypt $SH_ENCRYPTED to stdout
    shBuildInit
    export MODE_BUILD=cryptoTravisDecrypt
    if [ ! "$CRYPTO_AES_KEY" ]
    then
        eval "CRYPTO_AES_KEY=$(printf "\$CRYPTO_AES_KEY_$GITHUB_ORG")"
    fi
    if [ ! "$CRYPTO_AES_KEY" ]
    then
        shBuildPrint "no CRYPTO_AES_KEY"
        return 1
    fi
    # decrypt CRYPTO_AES_SH_ENCRYPTED_$GITHUB_ORG
    URL="https://raw.githubusercontent.com\
/kaizhu256/node-utility2/gh-pages/CRYPTO_AES_SH_ENCRYPTED_$GITHUB_ORG"
    shBuildPrint "decrypting $URL ..."
    printf "${1:-"$(curl -#Lf "$URL")"}" |
        shCryptoAesXxxCbcRawDecrypt "$CRYPTO_AES_KEY" base64
)}

shCryptoTravisEncrypt () {(set -e
# this function will encrypt $CRYPTO_AES_SH_ENCRYPTED to .travis.yml,
# and use $CRYPTO_AES_KEY to encrypt $FILE to stdout
    shBuildInit
    export MODE_BUILD=cryptoTravisEncrypt
    if [ ! "$CRYPTO_AES_KEY" ]
    then
        shBuildPrint "no CRYPTO_AES_KEY"
        return 1
    fi
    if [ ! "$1" ] && [ -f .travis.yml ]
    then
        TMPFILE="$(mktemp)"
        URL="https://api.${TRAVIS_DOMAIN:-travis-ci.org}/repos/$GITHUB_REPO/key"
        shBuildPrint "fetch $URL"
        curl -#Lf -H "Authorization: token $TRAVIS_ACCESS_TOKEN" "$URL" |
            sed -n -e \
"s/.*-----BEGIN [RSA ]*PUBLIC KEY-----\(.*\)-----END [RSA ]*PUBLIC KEY-----.*/\
-----BEGIN PUBLIC KEY-----\\1-----END PUBLIC KEY-----/" \
            -e "s/\\\\n/%/gp" |
            tr "%" "\n" > "$TMPFILE"
        CRYPTO_AES_KEY_ENCRYPTED="$(
            printf "CRYPTO_AES_KEY=$CRYPTO_AES_KEY" |
            openssl rsautl -encrypt -pubin -inkey "$TMPFILE" |
            base64 |
            tr -d "\n"
        )"
        rm "$TMPFILE"
        if [ ! "$CRYPTO_AES_KEY_ENCRYPTED" ]
        then
            shBuildPrint "no CRYPTO_AES_KEY_ENCRYPTED"
        else
            sed -in -e \
"s|\(- secure: \).*\( # CRYPTO_AES_KEY$\)|\\1$CRYPTO_AES_KEY_ENCRYPTED\\2|" \
                .travis.yml
            rm -f .travis.ymln
            shBuildPrint "updated .travis.yml with CRYPTO_AES_KEY_ENCRYPTED"
        fi
    fi
    if [ ! -f "$FILE" ]
    then
        return
    fi
    # encrypt CRYPTO_AES_SH_ENCRYPTED_$GITHUB_ORG
    shBuildPrint "CRYPTO_AES_SH_ENCRYPTED:"
    cat "$FILE" | shCryptoAesXxxCbcRawEncrypt "$CRYPTO_AES_KEY" base64
)}

shCryptoWithGithubOrg () {(set -e
# this function will run "$@" with private $GITHUB_ORG-env
    export GITHUB_ORG="$1"
    shift
    . "$HOME/.ssh/.CRYPTO_AES_SH_DECRYPTED_$GITHUB_ORG"
    if [ "$npm_package_private" ] && [ "$TRAVIS_ACCESS_TOKEN_PRO" ]
    then
        export TRAVIS_ACCESS_TOKEN="$TRAVIS_ACCESS_TOKEN_PRO"
        export TRAVIS_DOMAIN=travis-ci.com
    fi
    "$@"
)}

shDateIso () {(set -e
# this function will print current date in ISO format with given offset $1 in ms
    node -e 'console.log(
        new Date(Date.now() + Number(process.argv[1])).toISOString()
    )' "$1"
)}

shDeployCustom () {
# this function will do nothing
    return
}

shDeployGithub () {(set -e
# this function will deploy the app to $GITHUB_REPO
# and run a simple curl check for $TEST_URL
# and test $TEST_URL
    export MODE_BUILD=deployGithub
    export TEST_URL="https://$(
        printf "$GITHUB_REPO" | sed -e "s/\//.github.io\//"
    )/build..$CI_BRANCH..travis-ci.org/app"
    shBuildPrint "deployed to $TEST_URL"
    # verify deployed app''s main-page returns status-code < 400
    shSleep 15
    if [ "$(
        curl --connect-timeout 60 -Ls -o /dev/null -w "%{http_code}" "$TEST_URL"
    )" -lt 400 ]
    then
        shBuildPrint "curl test passed for $TEST_URL"
    else
        shBuildPrint "curl test failed for $TEST_URL"
        return 1
    fi
    # screenshot deployed app
    shBrowserScreenshot "$TEST_URL" &
    shBrowserScreenshot "$TEST_URL/assets.swgg.html" &
    # test deployed app
    MODE_BUILD="${MODE_BUILD}Test" \
        shBrowserTest "$TEST_URL?modeTest=1&timeExit={{timeExit}}"
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
        rm -rf tmp
        return
    fi
    export MODE_BUILD=deployHeroku
    export TEST_URL="https://$npm_package_nameHeroku-$CI_BRANCH.herokuapp.com"
    shBuildPrint "deployed to $TEST_URL"
    # verify deployed app''s main-page returns status-code < 400
    shSleep 15
    if [ "$(
        curl --connect-timeout 60 -Ls -o /dev/null -w "%{http_code}" "$TEST_URL"
    )" -lt 400 ]
    then
        shBuildPrint "curl test passed for $TEST_URL"
    else
        shBuildPrint "curl test failed for $TEST_URL"
        return 1
    fi
    # screenshot deployed app
    shBrowserScreenshot "$TEST_URL" &
    shBrowserScreenshot "$TEST_URL/assets.swgg.html" &
    # test deployed app
    MODE_BUILD="${MODE_BUILD}Test" \
        shBrowserTest "$TEST_URL?modeTest=1&timeExit={{timeExit}}"
)}

shDockerBuildCleanup () {(set -e
# this function will cleanup the docker build
# apt list --installed
    rm -rf \
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

shDockerRestart () {(set -e
# this function will restart the docker-container
    docker rm -fv "$1" || true
    shDockerStart "$@"
)}

shDockerRestartNginx () {(set -e
# this function will restart the docker-container nginx
    # init htpasswd
    # printf "aa:$(openssl passwd -crypt bb)\n" > \
        "$HOME/docker/etc.nginx.htpasswd.private"
    # printf "aa:$(openssl passwd -crypt bb)\n" > \
        "$HOME/docker/etc.nginx.htpasswd.share"
    for FILE in private share
    do
        FILE="$HOME/docker/etc.nginx.htpasswd.$FILE"
        if [ ! -f "$FILE" ]
        then
            printf "aa:openssl passwd -crypt $(
                cat /dev/urandom | head --bytes 8
            )\n" > "$FILE"
        fi
    done
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
    root /root;
    ssl_certificate /root/docker/etc.nginx.ssl.pem;
    ssl_certificate_key /root/docker/etc.nginx.ssl.key;
    ssl on;
    ssl_prefer_server_ciphers on;
    ssl_protocols TLSv1.2;
    location /public {
        index index.html index.htm;
    }
    location /private/docker {
        deny all;
        return 404;
    }
    location /private {
        alias /root;
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
        openssl req \
            -days 365 \
            -keyout "$FILE.key" \
            -new \
            -newkey rsa:4096 \
            -nodes \
            -out "$FILE.pem" \
            -subj "/C=AU" -x509
    fi
    for DIR in public share
    do
        mkdir -p "$HOME/$DIR"
    done
    docker rm -fv nginx || true
    # https://registry.hub.docker.com/_/nginx/
    docker run --name nginx -d -e debian_chroot=nginx \
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
# this function will restart the docker-container transmission
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
# this function will rm the docker-containers "$@"
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

shDockerRmiUntagged () {(set -e
# this function will rm all untagged docker images
    docker rmi $(docker images -aqf dangling=true) 2>/dev/null || true
)}

shDockerSh () {(set -e
# this function will run /bin/bash in the docker-container $NAME
# http://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html
    NAME="$1"
    docker start "$NAME"
    case "$(uname)" in
    MINGW*)
        winpty docker exec -it "$NAME" ${2:-bash}
        ;;
    *)
        docker exec -it "$NAME" ${2:-/bin/bash}
        ;;
    esac
)}

shDockerStart () {(set -e
# this function will start docker-container $IMAGE:$NAME with command "$@"
    case "$(uname)" in
    Linux)
        LOCALHOST="${LOCALHOST:-127.0.0.1}"
        ;;
    MINGW*)
        export HOME="$USERPROFILE"
        ;;
    *)
        LOCALHOST="${LOCALHOST:-192.168.99.100}"
        ;;
    esac
    NAME="$1"
    shift
    IMAGE="$1"
    shift
    if [ "$DOCKER_V_GAME" ] && [ -d /g ]
    then
        DOCKER_OPTIONS="$DOCKER_OPTIONS -v g:/:/mnt"
    fi
    if [ "$DOCKER_V_HOME" ]
    then
        DOCKER_OPTIONS="$DOCKER_OPTIONS -v $HOME:/root"
    fi
    if [ "$DOCKER_PORT" ]
    then
        DOCKER_OPTIONS="$DOCKER_OPTIONS -p $LOCALHOST:$DOCKER_PORT:$DOCKER_PORT"
    fi
    docker run --name "$NAME" -dt -e debian_chroot="$NAME" $DOCKER_OPTIONS \
        "$IMAGE" "$@"
)}

shDuList () {(set -e
# this function will du $1 and sort its subdir by size
    du -md1 "$1" | sort -nr
)}

shEnvSanitize () {
# this function will unset password-env, e.g.
# (export CRYPTO_AES_SH=abcd1234; shEnvSanitize; printf "$CRYPTO_AES_SH\n")
# undefined
    eval "$(node -e '
/* jslint utility2:true */
(function () {
"use strict";
console.log(Object.keys(process.env).sort().map(function (key) {
    return (
        ((
            /(?:\b|_)(?:crypt|decrypt|key|pass|private|secret|token)/i
        ).test(key) || (
            (
                /Crypt|Decrypt|Key|Pass|Private|Secret|Token/
            ).test(key)
        ))
        ? "unset " + key + "; "
        : ""
    );
}).join("").trim());
}());
')"
}

shFileCustomizeFromToRgx () {(set -e
# this function will customize segment of file $2 with segment of file $1,
# with rgx-list $3...
    node -e "$UTILITY2_MACRO_JS"'
/* jslint utility2:true */
(function (local) {
"use strict";
let dataFrom;
let dataTo;
dataFrom = require("fs").readFileSync(process.argv[2], "utf8");
dataTo = require("fs").readFileSync(process.argv[1], "utf8");
process.argv.slice(3).forEach(function (rgx) {
    dataTo = local.stringMerge(dataTo, dataFrom, new RegExp(rgx));
});
require("fs").writeFileSync(process.argv[2], dataTo);
}(globalThis.globalLocal));
' "$@"
)}

shGitAddTee () {(set -e
# this function will run "git add ." and "$@ 2>&1 | tee -a ..."
    git add .
    mkdir -p tmp
    printf "\n\n\n\n$(shDateIso) - shGitAddTee\n\n" 2>&1 |
        tee -a tmp/shGitAddTee.diff
    "$@" 2>&1 | tee -a /tmp/shGitAddTee.diff
    git diff 2>&1 | tee -a /tmp/shGitAddTee.diff
    git status 2>&1 | tee -a /tmp/shGitAddTee.diff
)}

shGitCommandWithGithubToken () {(set -e
# this function will run git $COMMAND with $GITHUB_TOKEN
# http://stackoverflow.com/questions/18027115/committing-via-travis-ci-failing
    export MODE_BUILD="${MODE_BUILD:-shGitCommandWithGithubToken}"
    # security - filter basic-auth
    shBuildPrint "$(
        printf "shGitCommandWithGithubToken $*" |
        sed -e "s/:\/\/[^@]*@/:\/\/...@/"
    )"
    COMMAND="$1"
    shift
    URL="$1"
    shift
    if [ ! "$GITHUB_TOKEN" ] || ! (printf "$URL" | grep -q -E "^https:\/\/")
    then
        git "$COMMAND" "$URL" "$@"
        return
    fi
    case "$URL" in
    .)
        git "$COMMAND" "$URL" "$@"
        return
        ;;
    https://github.com/*)
        URL="$(printf "$URL" | sed -e "s/github.com/$GITHUB_TOKEN@github.com/")"
        ;;
    origin)
        URL="https://$GITHUB_TOKEN@github.com/$GITHUB_REPO"
        ;;
    esac
    # hide $GITHUB_TOKEN in case of err
    git "$COMMAND" "$URL" "$@" 2>/dev/null
)}

shGitDirCommitAndPush () {(set -e
# this function will git-commit and git-push dir $1 with msg $2
    cd "$1"
    git commit -am "$2" || true
    git push
)}

shGitGc () {(set -e
# this function will gc unreachable .git objects
# http://stackoverflow.com/questions/3797907/how-to-remove-unused-objects-from-a-git-repository
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
    git grep -E '[^!]!\! ' || true
    printf "\n"
    git grep -E '\becho\b' *.sh || true
    printf "\n"
    git grep -E '\bset -\w*x\b' *.sh || true
)}

shGitInitBase () {(set -e
# this function will git init && git fetch utility2 base
    git init
    git remote add utility2 https://github.com/kaizhu256/node-utility2
    git fetch utility2 base
    git reset utility2/base
    git checkout -b alpha
    git add .
    git commit -am "initial commit"
    curl https://raw.githubusercontent.com/kaizhu256/node-utility2\
/alpha/.gitconfig > .git/config
)}

shGitLsTree () {(set -e
# this function will list all files committed in HEAD
# example usage:
# shGitLsTree | sort -nrk2 -nrk3 # sort by date
# shGitLsTree | sort -nrk5 # sort by size
    printf "$(git ls-tree --name-only -r HEAD | head -n 4096)" | awk '{
    ii += 1
    file = $0
    cmd = "git log -1 --format=\"%ai\" -- " file
    (cmd | getline date)
    close(cmd)
    cmd = "ls -ln '\''" file "'\'' | awk \"{print \\$5}\""
    (cmd | getline size)
    close(cmd)
    sizeTotal += size
    printf("%-4s  %s %9s bytes %s\n", ii, date, size, file)
} END {
    ii = 0
    file = "."
    cmd = "git log -1 --format=\"%ai\" -- " file
    (cmd | getline date)
    close(cmd)
    size = sizeTotal
    printf("%-4s  %s %9s bytes %s\n", ii, date, size, file)
    }' | sed -e "s/ /./"
)}

shGitLsTreeSort () {(set -e
# this function will sort git-lstree by size
    printf "# 0\n" > .gitlstree
    shGitLsTree | sed -e "s/^.\{31\}//" >> .gitlstree
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
let dict;
dict = {};
require("fs").readFileSync(".gitlstree", "utf8").replace((
    /(.*?)\u0020bytes\u0020(.*?)$/gm
), function (ignore, match1, match2) {
    dict[match1] = dict[match1] || [];
    dict[match1].push(match2);
});
[
    1,
    2
].forEach(function (ii) {
    console.log("# " + ii);
    Object.keys(dict).sort().reverse().forEach(function (key) {
        if (dict[key].length < ii) {
            return;
        }
        console.log(key.replace((
            /\u0020/g
        ), "_"));
        dict[key].forEach(function (elem) {
            console.log("    " + JSON.stringify(elem));
        });
    });
});
}());
' >> .gitlstree
    printf "#\n" >> .gitlstree
)}

shGitSquashPop () {(set -e
# this function will squash HEAD to given $COMMIT
# http://stackoverflow.com/questions/5189560
# /how-can-i-squash-my-last-x-commits-together-using-git
    COMMIT="$1"
    MESSAGE="$2"
    # reset git to previous $COMMIT
    git reset "$COMMIT"
    git add .
    # commit HEAD immediately after previous $COMMIT
    git commit -am "$MESSAGE" || true
)}

shGitSquashShift () {(set -e
# this function will squash $RANGE to the first commit
    BRANCH="$(git rev-parse --abbrev-ref HEAD)"
    RANGE="$1"
    git checkout -q "HEAD~$RANGE"
    git reset -q "$(git rev-list --max-parents=0 HEAD)"
    git add .
    git commit -m squash > /dev/null || true
    git cherry-pick -X theirs --allow-empty --strategy=recursive \
        "$BRANCH~$RANGE..$BRANCH"
    git push . "HEAD:$BRANCH" -f
    git checkout "$BRANCH"
)}

shGithubApiRateLimitGet () {(set -e
# this function will the rate-limit for the $GITHUB_TOKEN
    curl -I https://api.github.com -H "Authorization: token $GITHUB_TOKEN"
)}

shGithubDateCommitted () {(set -e
# this function will fetch the commit-date for the github-commit-url $1
# example usage:
# shGithubDateCommitted https://github.com/kaizhu256/node-utility2/commits/master
    printf "shGithubDateCommitted $1 # "
    curl -Lfs "$1" | grep -m 1 -o -E \
        "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z"
)}

shGithubRepoBranchId () {(set -e
# this function will print the $COMMIT_ID for $GITHUB_REPO:#$BRANCH
    BRANCH="$1"
    curl -H "user-agent: undefined" -Lfs "https://api.github.com\
/repos/$GITHUB_REPO/commits?access_token=$GITHUB_TOKEN&sha=$BRANCH" |
        sed -e 's/^\[{"sha":"//' -e 's/".*//'
)}

shGithubRepoCreate () {(set -e
# this function will create base github-repo https://github.com/$GITHUB_REPO
    GITHUB_REPO="$1"
    export MODE_BUILD="${MODE_BUILD:-shGithubRepoCreate}"
    # init /tmp/githubRepo/kaizhu256/base
    if [ ! -d /tmp/githubRepo/kaizhu256/base ]
    then
    (
        git clone https://github.com/kaizhu256/base \
            /tmp/githubRepo/kaizhu256/base
        cd /tmp/githubRepo/kaizhu256/base
        git checkout -b alpha origin/alpha || true
        git checkout -b beta origin/beta || true
        git checkout -b gh-pages origin/gh-pages || true
        git checkout -b master origin/master || true
        git checkout -b publish origin/publish || true
        git checkout alpha
    )
    fi
    rm -rf "/tmp/githubRepo/$GITHUB_REPO"
    mkdir -p "/tmp/githubRepo/$(printf "$GITHUB_REPO" | sed -e "s/\/.*//")"
    cp -a /tmp/githubRepo/kaizhu256/base "/tmp/githubRepo/$GITHUB_REPO"
    cd "/tmp/githubRepo/$GITHUB_REPO"
    curl -Lfs \
https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/.gitconfig |
        sed -e "s|kaizhu256/node-utility2|$GITHUB_REPO|" > .git/config
    # create github-repo
    node -e "$UTILITY2_MACRO_JS"'
/* jslint utility2:true */
(function (local) {
"use strict";
local.ajax({
    data: "{\"name\":\"" + process.argv[1].split("/")[1] + "\"}",
    headers: {
        Authorization: "token " + process.env.GITHUB_TOKEN,
        "User-Agent": "undefined"
    },
    method: "POST",
    url: (
        "https://api.github.com/orgs/"
        + process.argv[1].split("/")[0]
        + "/repos"
    )
}, function (err, xhr) {
    if (xhr.statusCode !== 404) {
        local.onErrorDefault(err && xhr && (
            "https://github.com/" + process.argv[1] + " - " + xhr.responseText
        ));
        return;
    }
    local.ajax({
        data: "{\"name\":\"" + process.argv[1].split("/")[1] + "\"}",
        headers: {
            Authorization: "token " + process.env.GITHUB_TOKEN,
            "User-Agent": "undefined"
        },
        method: "POST",
        url: "https://api.github.com/user/repos"
    }, function (err, xhr) {
        local.onErrorDefault(err && xhr && (
            "https://github.com/" + process.argv[1] + " - " + xhr.responseText
        ));
        return;
    });
});
}(globalThis.globalLocal));
' "$GITHUB_REPO"
    # set default-branch to beta
    shGitCommandWithGithubToken push \
        "https://github.com/$GITHUB_REPO" beta || true
    # push all branches
    shGitCommandWithGithubToken push \
        "https://github.com/$GITHUB_REPO" --all || true
)}

shGithubRepoDescriptionUpdate () {(set -e
# this function will update github-repo description
    shSleep 5
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

shGithubRepoTouch () {(set -e
# this function will touch the $GITHUB_REPO $LIST with the $CI_COMMIT_MESSAGE
    LIST="$1"
    CI_COMMIT_MESSAGE="$2"
    BRANCH="${3:-alpha}"
    LIST2=""
    for GITHUB_REPO in $LIST
    do
        LIST2="$LIST2,https://github.com/$GITHUB_REPO/blob/$BRANCH/package.json"
    done
    utility2-github-crud touch "$LIST2" "$CI_COMMIT_MESSAGE"
)}

shGrep () {(set -e
# this function will recursively grep $DIR for the $REGEXP
    DIR="$1"
    shift
    REGEXP="$1"
    shift
    FILE_FILTER="\
/\\.|~\$|/(obj|release)/|(\\b|_)(\\.\\d|\
archive|artifact|\
bower_component|build|\
coverage|\
doc|\
external|\
fixture|\
git_module|\
jquery|\
log|\
min|misc|mock|\
node_module|\
raw|\rollup|\
swp|\
tmp|\
vendor)s{0,1}(\\b|_)\
"
    find "$DIR" -type f |
        grep -v -E "$FILE_FILTER" |
        tr "\n" "\000" |
        xargs -0 grep -HIn -E "$REGEXP" "$@" || true
    find "$DIR" -name .travis.yml |
        tr "\n" "\000" |
        xargs -0 grep -HIn -E "$REGEXP" "$@" || true
)}

shGrepReplace () {(set -e
# this function will save the grep-and-replace lines in file $1
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
let dict;
dict = {};
require("fs").readFileSync(
    process.argv[1],
    "utf8"
).split("\n").forEach(function (element) {
    element = (
        /^(.+?):(\d+?):(.+?)$/
    ).exec(element);
    if (!element) {
        return;
    }
    dict[element[1]] = (
        dict[element[1]]
        || require("fs").readFileSync(element[1], "utf8").split("\n")
    );
    dict[element[1]][element[2] - 1] = element[3];
});
Object.keys(dict).forEach(function (key) {
    require("fs").writeFileSync(key, dict[key].join("\n"));
});
}());
' "$@"
)}

shHtpasswdCreate () {(set -e
# this function will create and print htpasswd to stdout
    USERNAME="$1"
    PASSWD="$2"
    printf "$USERNAME:$(openssl passwd -apr1 "$PASSWD")\n"
)}

shHttpFileServer () {(set -e
# this function will run a simple node http-file-server on port $PORT
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
let processCwd;
processCwd = process.cwd() + (
    process.platform === "win32"
    ? "\\"
    : "/"
);
process.env.PORT = process.env.PORT || "8080";
console.error("http-file-server listening on port " + process.env.PORT);
require("http").createServer(function (req, res) {
    let file;
    file = require("path").resolve(
        processCwd,
        require("url").parse(req.url).pathname.slice(1)
    );
    // security - disable parent-directory lookup
    if (file.indexOf(processCwd) !== 0) {
        res.statusCode = 404;
        res.end();
        return;
    }
    require("fs").readFile(file, function (err, data) {
        if (err) {
            res.statusCode = 404;
            res.end();
            return;
        }
        res.end(data);
    });
}).listen(process.env.PORT);
}());
'
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
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
console.log(
    "data:image/"
    + require("path").extname(process.argv[1]).slice(1)
    + ";base64,"
    + require("fs").readFileSync(process.argv[1]).toString("base64")
);
}());
' "$FILE"
)}

shIstanbulCover () {(set -e
# this function will run command "$NODE_BINARY" "$@" with istanbul-coverage
    export NODE_BINARY="${NODE_BINARY:-node}"
    if [ "$npm_config_mode_coverage" ]
    then
        "$NODE_BINARY" "$npm_config_dir_utility2/lib.istanbul.js" cover "$@"
        return "$?"
    fi
    if [ "$npm_config_mode_inspect" ]
    then
        "$NODE_BINARY" inspect "$@"
        return "$?"
    fi
    if [ "$npm_config_mode_winpty" ] &&
        [ "$MSYSTEM" ] &&
        (winpty --version > /dev/null 2>&1)
    then
        winpty "$NODE_BINARY" "$@"
        return "$?"
    fi
    "$NODE_BINARY" "$@"
)}

shJsonNormalize () {(set -e
# this function will
# 1. read json-data from file $1
# 2. normalize json-data
# 3. write normalized json-data back to file $1
    node -e "$UTILITY2_MACRO_JS"'
/* jslint utility2:true */
(function (local) {
"use strict";
console.error("shJsonNormalize - " + process.argv[1]);
require("fs").writeFileSync(process.argv[1], local.jsonStringifyOrdered(
    JSON.parse(require("fs").readFileSync(process.argv[1])),
    null,
    4
) + "\n");
}(globalThis.globalLocal));
' "$1"
)}

shMacAddressSpoof () {(set -e
# this function will spoof mac-address $1
    MAC_ADDRESS="${1-$(openssl rand -hex 6 | sed 's/\(..\)/\1:/g; s/.$//')}"
    printf "spoofing mac address $MAC_ADDRESS\n"
    sudo ifconfig en0 ether "$MAC_ADDRESS"
    # sudo ifconfig en0 ether Wi-Fi "$MAC_ADDRESS"
    ifconfig en0
)}

shMediaHlsEncrypt () {(set -e
# this function encrypt the hls-media with given hls.m3u8 file
# example usage:
# CRYPTO_AES_KEY_MEDIA=0123456789abcdef0123456789abcdef shMediaHlsEncrypt
    node -e "$UTILITY2_MACRO_JS"'
/* jslint utility2:true */
(function (local) {
"use strict";
let data;
let ii;
data = require("fs").readFileSync("hls.m3u8", "utf8");
ii = 1;
data = data.replace((
    /^[^#].*?$/gm
), function (match0, match1) {
    ii += 1;
    match1 = "aa." + ("0000" + ii).slice(-4) + ".bin";
    require("fs").readFile(match0, function (err, data) {
        console.assert(!err, err);
        local.cryptoAesXxxCbcRawEncrypt({
            data,
            key: process.env.CRYPTO_AES_KEY_MEDIA
        }, function (err, data) {
            console.assert(!err, err);
            require("fs").writeFile(match1, data, function (err) {
                console.assert(!err, err);
                console.error("encrypted file " + match0 + " to " + match1);
            });
        });
    });
    return match1;
});
local.cryptoAesXxxCbcRawEncrypt({
    data: Buffer.from(data),
    key: process.env.CRYPTO_AES_KEY_MEDIA,
    mode: "base64"
}, function (
    err,
    data
) {
    console.assert(!err, err);
    require("fs").writeFile("aa.0001.bin", data, function (err) {
        console.assert(!err, err);
        console.error("encrypted file hls.m3u8 to aa.0001.bin");
    });
});
}(globalThis.globalLocal));
' "$@"
)}

shMediaHlsFromMp4 () {(set -e
# this function convert the media $1 to hls
# example usage:
# shMediaHlsFromMp4 a00.mp4
    ffmpeg \
        -i "$1" \
        -c:v copy \
        -c:a copy \
        -hls_list_size 0 \
        -hls_time 6 \
        -hls_segment_filename hls.%04d.ts \
        -y \
        hls.m3u8
)}

shModuleDirname () {(set -e
# this function will print the __dirname of the module $1
    MODULE="$1"
    node -e "$UTILITY2_MACRO_JS"'
/* jslint utility2:true */
(function (local) {
"use strict";
console.log(local.moduleDirname(process.argv[1], module.paths));
}(globalThis.globalLocal));
' "$1"
)}

shNpmDeprecateAlias () {(set -e
# this function will deprecate the npm-package $NAME with given $MESSAGE
# example usage:
# shNpmDeprecateAlias deprecated-package
    shEnvSanitize
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
    rm -rf "$DIR" && mkdir -p "$DIR" && cd "$DIR"
    npm install "$NAME" --prefix .
    cd "node_modules/$NAME"
    # update README.md
    printf "$MESSAGE\n" > README.md
    # update package.json
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
let packageJson;
packageJson = require("./package.json");
packageJson.description = process.argv[1];
Object.keys(packageJson).forEach(function (key) {
    if (key[0] === "_") {
        delete packageJson[key];
    }
});
require("fs").writeFileSync(
    "package.json",
    JSON.stringify(packageJson, null, 4) + "\n"
);
}());
' "$MESSAGE"
    shPackageJsonVersionUpdate "" publishedIncrement
    npm publish
    npm deprecate "$NAME" "$MESSAGE"
)}

shNpmInstallTarball () {(set -e
# this function will npm-install the tarball instead of the full module
    NAME="$1"
    mkdir -p "node_modules/$NAME"
    curl -Lfs "$(
        npm view "$NAME" dist.tarball
    )" | tar --strip-components 1 -C "node_modules/$NAME" -xzf -
)}

shNpmPackageCliHelpCreate () {(set -e
# this function will create a svg cli-help npm-package
    shBuildInit
    export MODE_BUILD=npmPackageCliHelp
    shBuildPrint "creating npmPackageCliHelp ..."
    FILE="$(node -e '
/* jslint utility2:true */
(function () {
"use strict";
let dict;
dict = require("./package.json").bin || {};
process.stdout.write(String(dict[Object.keys(dict)[0]]));
}());
')"
    shRunWithScreenshotTxt printf none
    if [ -f "./$FILE" ]
    then
        shRunWithScreenshotTxt "./$FILE" --help
    fi
    shBuildPrint "... created npmPackageCliHelp"
)}

shNpmPackageDependencyTreeCreate () {(set -e
# this function will create a svg dependency-tree of the npm-package
    if [ -f README.md ] && ! (grep -q -E "https://nodei.co/npm/$1\b" README.md)
    then
        return
    fi
    shEnvSanitize
    # init /tmp/node_modules
    if [ -d /tmp/node_modules ]
    then
        rm -rf /tmp/node_modules.00
        mv /tmp/node_modules /tmp/node_modules.00
        export PATH="$PATH:/tmp/node_modules.00/.bin"
    fi
    DIR=/tmp/npmPackageDependencyTreeCreate
    rm -rf "$DIR" && mkdir -p "$DIR" && cd "$DIR"
    shBuildInit
    export MODE_BUILD=npmPackageDependencyTree
    shBuildPrint "creating npmDependencyTree ..."
    npm install "${2:-$1}" --prefix . || true
    shRunWithScreenshotTxtAfter () {(set -e
        du -ms "$DIR" |
            awk '{print "npm install - " $1 " megabytes\n\nnode_modules"}' \
            > "$npm_config_file_tmp"
        grep -E '^ *[│└├]' "$npm_config_dir_tmp/runWithScreenshotTxt" \
            >> "$npm_config_file_tmp"
        mv "$npm_config_file_tmp" "$npm_config_dir_tmp/runWithScreenshotTxt"
    )}
    shRunWithScreenshotTxt npm ls || true
    if [ -d /tmp/node_modules.00 ]
    then
        rm -rf /tmp/node_modules
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
# this function will npm-publish $DIR as $NAME@$VERSION with a clean repo
    cd "$1"
    NAME="$2"
    VERSION="$3"
    export MODE_BUILD=npmPublishAlias
    shBuildPrint "npm-publish alias $NAME"
    DIR=/tmp/npmPublishAlias
    rm -rf "$DIR" && mkdir -p "$DIR"
    # clean-copy . to $DIR
    git ls-tree --name-only -r HEAD | xargs tar -czf - | tar -C "$DIR" -xvzf -
    cd "$DIR"
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
let name;
let packageJson;
let version;
name = process.argv[1];
version = process.argv[2];
packageJson = require("./package.json");
packageJson.nameOriginal = packageJson.name;
packageJson.name = name || packageJson.name;
packageJson.version = version || packageJson.version;
require("fs").writeFileSync(
    "package.json",
    JSON.stringify(packageJson, null, 4) + "\n"
);
}());
' "$NAME" "$VERSION"
    npm publish
)}

shNpmPublishV0 () {(set -e
# this function will npm-publish the name $1 with a bare package.json
    DIR=/tmp/npmPublishV0
    rm -rf "$DIR" && mkdir -p "$DIR" && cd "$DIR"
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
        ("$NODE_BINARY" "$@") || EXIT_CODE="$?"
    # npm-test with coverage
    else
        # cleanup old coverage
        rm -f "$npm_config_dir_build/coverage.html/"coverage.*.json
        # npm-test with coverage
        (shIstanbulCover "$@") || EXIT_CODE="$?"
        # if $EXIT_CODE != 0, then debug covered-test by re-running it uncovered
        if [ "$EXIT_CODE" != 0 ] && [ "$EXIT_CODE" != 130 ]
        then
            npm_config_mode_coverage="" "$NODE_BINARY" "$@" || true
        fi
    fi
    # create test-report artifacts
    (lib.utility2.js utility2.testReportCreate) || EXIT_CODE="$?"
    shBuildPrint "EXIT_CODE - $EXIT_CODE"
    return "$EXIT_CODE"
)}

shNpmTestPublished () {(set -e
# this function will npm-test the published npm-package $npm_package_name
    export MODE_BUILD=npmTestPublished
    if [ "$TRAVIS" ] && ([ ! "$NPM_TOKEN" ] || (
        [ "$CI_BRANCH" = alpha ] &&
        (printf "$CI_COMMIT_MESSAGE" | grep -q -E "^\[npm publish")
    ))
    then
        shBuildPrint "skip npm-testing published-package $npm_package_name"
        return
    fi
    shEnvSanitize
    if [ "$1" ]
    then
        export npm_package_name="$1"
    fi
    shBuildPrint "npm-testing published-package $npm_package_name"
    DIR=/tmp/npmTestPublished
    rm -rf "$DIR" && mkdir -p "$DIR" && cd "$DIR"
    # npm-install package
    npm install "${npm_package_name_github:-$npm_package_name}" --prefix .
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

shPackageJsonVersionUpdate () {(set -e
# this function will increment the package.json version before npm-publish
    node -e "$UTILITY2_MACRO_JS"'
/* jslint utility2:true */
(function (local) {
"use strict";
let aa;
let bb;
let packageJson;
packageJson = require("./package.json");
aa = String(process.argv[1] || packageJson.version).replace((
    /^today$/
), new Date().toISOString().replace((
    /T.*?$/
), "").replace((
    /-0?/g
), "."));
bb = String(process.argv[2] || "0.0.0").replace((
    /^(\d+?\.\d+?\.)(\d+)(\.*?)$/
), function (ignore, match1, match2, match3) {
    return match1 + (Number(match2) + 1) + match3;
});
packageJson.version = (
    local.semverCompare(aa, bb) === 1
    ? aa
    : bb
);
console.error([
    aa, bb, packageJson.version
]);
// update package.json
require("fs").writeFileSync(
    "package.json",
    JSON.stringify(packageJson, null, 4) + "\n"
);
// update README.md
require("fs").writeFileSync(
    "README.md",
    require("fs").readFileSync("README.md", "utf8").replace((
        /^(####\u0020changelog\u0020|-\u0020npm\u0020publish\u0020|\u0020{4}"version":\u0020")\d+?\.\d+?\.\d[^\n",]*/gm
    ), "$1" + packageJson.version, null)
);
console.error("shPackageJsonVersionUpdate - " + packageJson.version);
}(globalThis.globalLocal));
' "$1" "$([ "$2" = publishedIncrement ] && npm info "" version 2>/dev/null)"
)}

shPasswordRandom () {(set -e
# this function will create random-password
    openssl rand -base64 32
)}

shRawLibDiff () {(set -e
# this function will diff-compare raw.xxx.js to lib.xxx.js
    diff -u "$(
        printf "$1" | sed -e "s/lib/raw/"
    )" "$1" > /tmp/shRawLibDiff.diff || true
    vim -R /tmp/shRawLibDiff.diff
)}

shRawLibFetch () {(set -e
# this function will fetch raw-lib from $LIST
    export DIR="tmp/raw.lib"
    export LIST="$1"
    rm -rf "$DIR" && mkdir -p "$DIR"
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
let normalizeWhitespace;
let opt;
let repoDict;
normalizeWhitespace = function (aa) {
    return aa.replace((
        /\r\n|\r/g
    ), "\n").replace((
        /[\t\u0020]+$/gm
    ), "").replace((
        /\n{3,}/g
    ), function (match0) {
        if (match0.length === 3) {
            return "\n\n";
        }
        return "\n\n\n\n";
    });
};
repoDict = {};
opt = JSON.parse(process.argv[1].replace((
    /^\u0020*?\/\/.*?$/gm
), ""));
opt.urlList.forEach(function (url, repo) {
    repo = url.split("/").slice(0, 7).join("/");
    if (!repoDict.hasOwnProperty(repo)) {
        repoDict[repo] = {
            urlList: []
        };
        require("https").request(repo.replace(
            "/blob/",
            "/commits/"
        ), function (res) {
            repo.dateCommitted = "";
            res.on("data", function (buf) {
                repo.dateCommitted += buf.toString();
            });
            res.on("end", function () {
                repo.dateCommitted = repo.dateCommitted.match(
                    /\b\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ\b/
                )[0];
            });
        }).end();
    }
    repo = repoDict[repo];
    repo.urlList.push(url);
});
Object.entries(repoDict).forEach(function ([
    prefix, repo
], ii) {
    repo.prefix = prefix;
    repo.urlList.forEach(function (url, jj) {
        require("https").request(url.replace(
            "https://github.com/",
            "https://raw.githubusercontent.com/"
        ).replace("/blob/", "/"), function (res) {
            res.pipe(require("fs").createWriteStream(
                process.env.DIR
                + "/"
                + String(ii).padStart(2, "0")
                + "__"
                + String(jj).padStart(2, "0")
                + "__"
                + url.split("/").slice(7).join("__")
            ));
        }).end();
    });
});
process.on("exit", function () {
    let aa;
    let repoPrefix0;
    let requireDict;
    aa = "";
    requireDict = {};
    require("fs").readdirSync(process.env.DIR).sort().forEach(function (data) {
        let exports;
        let file;
        let prefix;
        let repo;
        repo = Object.values(repoDict)[Number(data.slice(0, 2))];
        file = repo.urlList[Number(data.slice(4, 6))];
        // init prefix
        prefix = "exports_" + require("path").dirname(file).replace(
            "https://github.com/",
            ""
        ).replace((
            /\/blob\/[^\/]*/
        ), "/").replace((
            /\W/g
        ), "_").replace((
            /(_)_+|_+$/g
        ), "$1");
        exports = prefix + "_" + require("path").basename(file).replace((
            /\.js$/
        ), "").replace((
            /\W/g
        ), "_");
        if (repo.prefix !== repoPrefix0) {
            repoPrefix0 = repo.prefix;
            aa += (
                "\n\n\n\n/*\n"
                + "repo " + repo.prefix.replace("/blob/", "/tree/") + "\n"
                + "committed " + repo.dateCommitted + "\n"
                + "*/"
            );
        }
        // mangle module.exports
        data = require("fs").readFileSync(process.env.DIR + "/" + data, "utf8");
        if (!opt.isCommonJs) {
            aa += "\n\n\n\n/*\nfile " + file + "\n*/\n" + data.trim();
            return;
        }
        data = data.replace((
            /\bmodule\.exports\b|(^\u0020*?)exports\b/gm
        ), "$1" + exports);
        // inline require(...)
        data = data.replace((
            /\brequire\(.\.[.\/]*?\/(\w.*?).\)/gm
        ), function (ignore, match1) {
            return prefix + "_" + match1.replace((
                /\.js$/
            ), "").replace((
                /\W/g
            ), "_");
        });
        aa += "\n\n\n\n/*\nfile " + file + "\n*/\n(function () {\n";
        if ((
            /\bpackage\.json$/
        ).test(file)) {
            aa += exports + " = ";
        }
        aa += data.trim() + "\n}());";
    });
    // comment #!
    aa = aa.replace((
        /^#!/gm
    ), "// $&");
    // normalize whitespace
    aa = normalizeWhitespace(aa);
    // replaceList
    opt.replaceList = opt.replaceList || [];
    opt.replaceList.forEach(function (elem) {
        aa = aa.replace(new RegExp(elem.source, elem.flags), elem.replace);
    });
    if (!opt.isCommonJs) {
        console.log(aa.trim() + "\n\n\n\n/*\nfile none\n*/");
        return;
    }
    // comment ... = require(...)
    aa = aa.replace((
        /^\u0020*?[$A-Z_a-z].*?\brequire\(.*$/gm
    ), function (match0) {
        requireDict[match0.replace((
            /\bconst\b|\bvar\b/
        ), "let").trim()] = "";
        return "// " + match0;
    });
    aa = aa.replace((
        /^\u0020*?(?:const|let|var)\u0020(?:\w+?|\{[^}]+?\})\u0020=\u0020exports_.*$/gm
    ), function (match0) {
        requireDict[match0.replace((
            /\bconst\b|\bvar\b/
        ), "let").trim()] = "";
        return match0.replace((
            /^/gm
        ), "// ");
    });
    // normalize whitespace
    aa = normalizeWhitespace(aa);
    // normalize requireDict - let exports_... = {}
    aa.replace((
        /\bexports_\w+/g
    ), function (match0) {
        requireDict["let " + match0 + " = {};"] = "";
        return "";
    });
    // normalize requireDict - let {...} = exports_...
    Object.keys(requireDict).forEach(function (key) {
        if (key.indexOf("let {") === 0) {
            delete requireDict[key];
            key = key.split(" = ");
            key[1] = key[1].trim().replace(";", "");
            key[0].split("{")[1].replace((
                /\w+/g
            ), function (match0) {
                requireDict[`let ${match0} = ${key[1]}.${match0};`] = "";
                return "";
            });
            return;
        }
        if (key.slice(-1) !== ";") {
            delete requireDict[key];
            requireDict[key + ";"] = "";
        }
    });
    // normalize requireDict - collate let
    Object.keys(requireDict).forEach(function (key, val) {
        val = key;
        key = key.split(" ")[1];
        requireDict[key] = requireDict[key] || [];
        requireDict[key].push(val);
    });
    // normalize requireDict - comment duplicate in code
    aa.replace((
        /^\u0020*?(?:class|const|function|let|var)\u0020(\w+?)\b/gm
    ), function (ignore, match1) {
        Array.from(requireDict[match1] || []).forEach(function (key) {
            requireDict[key] = "// ";
        });
        delete requireDict[match1];
        return "";
    });
    // normalize requireDict - comment duplicate in let
    Object.entries(requireDict).forEach(function ([
        key, val
    ]) {
        if (Array.isArray(val)) {
            delete requireDict[key];
            val.sort().slice(1).forEach(function (key) {
                requireDict[key] = "// ";
            });
        }
    });
    console.log("(function () {\n\"use strict\";");
    console.log(Object.keys(requireDict).map(function (key) {
        return (
            key.indexOf(" = exports_") >= 0
            ? ""
            : key.indexOf(" = require(") >= 0
            ? "1\u0000" + key
            : "2\u0000" + key
        );
    }).filter(function (elem) {
        return elem;
    }).sort().map(function (key) {
        key = key.split("\u0000")[1];
        return requireDict[key] + key;
    }).join("\n"));
    console.log(aa.trim());
    console.log(Object.keys(requireDict).map(function (key) {
        return (
            key.indexOf(" = exports_") >= 0
            ? key.replace((
                /(.*?)\u0020=\u0020(.*?)$/gm
            ), function (ignore, match1, match2) {
                return (
                    match2 + "\u0000"
                    + match1.padEnd(19, " ") + " = " + match2
                );
            })
            : ""
        );
    }).filter(function (elem) {
        return elem;
    }).sort().map(function (key) {
        key = key.split("\u0000")[1];
        return requireDict[key.replace((
            /\u0020{2,}/
        ), " ")] + key;
    }).join("\n"));
    console.log("}());\n\n\n\n/*\nfile none\n*/");
});
}());
' "$LIST"
)}

shReadmeLinkValidate () {(set -e
# this function will validate http-links embedded in README.md
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
let set;
set = new Set();
require("fs").readFileSync("README.md", "utf8").replace((
    /\b(https?):\/\/.*?[)\]]/g
), function (match0, match1) {
    let req;
    match0 = match0.slice(0, -1).replace((
        /[\u0022\u0027]/g
    ), "").replace((
        /\bbeta\b|\bmaster\b/g
    ), "alpha").replace((
        /\/build\//g
    ), "/build..alpha..travis-ci.org/");
    // ignore private-link
    if (
        process.env.npm_package_private
        && match0.indexOf("https://github.com/") === 0
    ) {
        return;
    }
    // ignore duplicate-link
    if (set.has(match0)) {
        return;
    }
    set.add(match0);
    req = require(match1).request(require("url").parse(match0), function (res) {
        console.log(
            "shReadmeLinkValidate " + res.statusCode + " " + match0
        );
        if (!(res.statusCode < 400)) {
            throw new Error("shReadmeLinkValidate - invalid link " + match0);
        }
        req.abort();
        res.destroy();
    });
    req.setTimeout(30000);
    req.end();
});
}());
'
)}

shReadmeTest () {(set -e
# this function will extract, save, and test the script $FILE embedded in README.md
    shBuildInit
    export MODE_BUILD=readmeTest
    shBuildPrint "running command 'shReadmeTest $*' ..."
    case "$(git log -1 --pretty=%s)" in
    "[build app"*)
        shBuildCi
        return;
        ;;
    esac
    case "$TRAVIS_BRANCH" in
    cron)
        shBuildCi
        return;
        ;;
    task)
        shBuildCi
        return;
        ;;
    esac
    FILE="$1"
    if [ ! -f "tmp/README.$FILE" ]
    then
        return
    fi
    case "$FILE" in
    build_ci.sh)
        FILE=tmp/README.build_ci.sh
        ;;
    example.js)
        export MODE_BUILD=testExampleJs
        ;;
    example.sh)
        export MODE_BUILD=testExampleSh
        ;;
    esac
    if [ "$FILE" = example.js ] || [ "$FILE" = example.sh ]
    then
        DIR=/tmp/app
        rm -rf "$DIR" && mkdir -p "$DIR"
        # cp script from README.md
        cp "tmp/README.$FILE" "$DIR/$FILE"
        cp "tmp/README.$FILE" "$npm_config_dir_build/$FILE"
        # delete all leading blank lines at top of file
        # http://sed.sourceforge.net/sed1line.txt
        sed -in -e '/./,$!d' "$npm_config_dir_build/$FILE"
        rm -f "$npm_config_dir_build/$FILE"n
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
        sed -in \
-e "s|git clone git@github.com:|git clone https://$GITHUB_TOKEN@github.com/|g" \
            "$FILE"
        rm -f "$FILE"n
    fi
    export PORT="${PORT:-8081}"
    export npm_config_timeout_exit="${npm_config_timeout_exit:-30000}"
    # screenshot
    (shSleep 15 && shBrowserScreenshot "http://127.0.0.1:$PORT") &
    shBuildPrint "testing $FILE ..."
    case "$FILE" in
    example.js)
        SCRIPT="$(cat "$FILE" | grep -E "^ *\\\$ " | grep -o -E "\w.*")" || true
        # delete all leading blank lines at top of file
        # delete all trailing blank lines at end of file
        # http://sed.sourceforge.net/sed1line.txt
        printf "# file-begin\n"
        printf "$SCRIPT" | sed -e '/./,$!d' -e :a -e '/^\n*$/{$d;N;ba' -e '}'
        printf "\n# file-end\n\n\n\n"
        shRunWithScreenshotTxt eval "$SCRIPT"
        ;;
    example.sh)
        # delete all leading blank lines at top of file
        # delete all trailing blank lines at end of file
        # http://sed.sourceforge.net/sed1line.txt
        printf "# file-begin\n"
        cat "$FILE" | sed -e '/./,$!d' -e :a -e '/^\n*$/{$d;N;ba' -e '}'
        printf "\n# file-end\n\n\n\n"
        shRunWithScreenshotTxt /bin/sh "$FILE"
        ;;
    tmp/README.build_ci.sh)
        # delete all leading blank lines at top of file
        # delete all trailing blank lines at end of file
        # http://sed.sourceforge.net/sed1line.txt
        printf "# file-begin\n"
        cat "$FILE" | sed -e '/./,$!d' -e :a -e '/^\n*$/{$d;N;ba' -e '}'
        printf "\n# file-end\n\n\n\n"
        unset PORT && unset npm_config_timeout_exit && /bin/sh "$FILE"
        ;;
    esac
    shBuildPrint "... finished running command 'shReadmeTest $*'"
)}

shReplClient () {(set -e
# this function will connect the repl-client to tcp-port $1
# https://gist.github.com/TooTallNate/2209310
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
let socket;
console.log("node repl-client connecting to tcp-port " + process.argv[1]);
socket = require("net").connect(process.argv[1]);
process.stdin.pipe(socket);
socket.pipe(process.stdout);
socket.on("end", process.exit);
}());
' "$@"
)}

shRmDsStore () {(set -e
# this function will recursively rm .DS_Store from the current dir
# http://stackoverflow.com/questions/2016844/bash-recursively-remove-files
    for NAME in "._*" ".DS_Store" "desktop.ini" "npm-debug.log" "*~"
    do
        find . -iname "$NAME" -print0 | xargs -0 rm -f || true
    done
)}

shRun () {(set -e
# this function will run the command "$@" with auto-restart
    EXIT_CODE=0
    # eval argv
    if [ ! "$npm_config_mode_auto_restart" ] ||
        [ "$npm_config_mode_auto_restart_child" ]
    then
        "$@"
        return "$?"
    fi
    # eval argv and auto-restart on non-zero exitCode, unless exited by SIGINT
    export npm_config_mode_auto_restart_child=1
    while true
    do
        printf "\n"
        git diff --color 2>/dev/null | cat || true
        printf "\n"
        printf "(re)starting $*\n"
        ("$@") || EXIT_CODE="$?"
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
)}

shRunWithScreenshotTxt () {(set -e
# this function will run the command "$@" and screenshot the text-output
# http://www.cnx-software.com/2011/09/22
# /how-to-convert-a-command-line-result-into-an-image-in-linux/
    EXIT_CODE=0
    export MODE_BUILD_SCREENSHOT_IMG="screenshot.${MODE_BUILD:-undefined}.svg"
    touch "$npm_config_dir_build/$MODE_BUILD_SCREENSHOT_IMG"
    (
    printf "0" > "$npm_config_file_tmp"
    shBuildPrint "(shRun "$*" 2>&1)"
    (shRun "$@" 2>&1) || printf "$?" > "$npm_config_file_tmp"
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
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
let result;
let wordwrap;
let yy;
wordwrap = function (line, ii) {
    if (ii && !line) {
        return "";
    }
    yy += 16;
    return "<tspan x=\"10\" y=\"" + yy + "\">" + line.replace((
        /&/g
    ), "&amp;").replace((
        /</g
    ), "&lt;").replace((
        />/g
    ), "&gt;") + "</tspan>\n";
};
yy = 10;
result = require("fs").readFileSync(
    process.env.npm_config_dir_tmp + "/runWithScreenshotTxt",
    "utf8"
);
// remove ansi escape-code
result = result.replace((
    /\u001b.*?m/g
), "");
// format unicode
result = result.replace((
    /\\u[0-9a-f]{4}/g
), function (match0) {
    return String.fromCharCode("0x" + match0.slice(-4));
}).trimEnd().split("\n").map(function (line) {
    return line.replace((
        /.{0,96}/g
    ), wordwrap).replace((
        /(<\/tspan>\n<tspan)/g
    ), "\\$1").slice();
}).join("\n") + "\n";
result = (
    "<svg height=\"" + (yy + 20)
    + "\" width=\"720\" xmlns=\"http://www.w3.org/2000/svg\">\n"
    + "<rect height=\"" + (yy + 20) + "\" fill=\"#555\" width=\"720\"></rect>\n"
    + "<text fill=\"#7f7\" font-family=\"Courier New\" font-size=\"12\" "
    + "xml:space=\"preserve\">\n"
    + result + "</text>\n</svg>\n"
);
require("fs").writeFileSync(
    process.env.npm_config_dir_build
    + "/" + process.env.MODE_BUILD_SCREENSHOT_IMG,
    result
);
}());
'
    shBuildPrint \
"created screenshot file $npm_config_dir_build/$MODE_BUILD_SCREENSHOT_IMG"
    return "$EXIT_CODE"
)}

shServerPortRandom () {(set -e
# this function will print random unused tcp-port in the inclusive range
# 0x8000 to 0xffff
    node -e 'console.log(Math.random() * 65536 | 0x8000);'
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

shSsh5022F () {(set -e
# this function will ssh the reverse-tunnel-client
# to the middleman $USER_HOST:5022
# example usage:
# shSsh5022F travis@proxy.com -D 5080
    USER_HOST="$1"
    shift
    ssh-keygen -R \
        "[$(printf "$USER_HOST" | sed -e "s/.*\@//")]:5022" > /dev/null 2>&1 ||
        true
    ssh "$USER_HOST" -p 5022 -o StrictHostKeyChecking=no "$@"
)}

shSsh5022R () {(set -e
# this function will ssh-reverse-tunnel the local-machine $USER@127.0.0.1
# to the middleman $USER_HOST:5022
# example usage:
# shSsh5022R travis@proxy.com root
# pkill -f "ssh $USER_REMOTE@$HOST"
    USER_HOST="$1"
    HOST="$(printf "$USER_HOST" | sed -e "s/.*@//")"
    USER="$(printf "$USER_HOST" | sed -e "s/@.*//")"
    shift
    USER_REMOTE="$1"
    shift
    printf "\nssh $USER_REMOTE@$HOST\n"
    ssh "$USER_REMOTE@$HOST" -R 5022:127.0.0.1:22 -Tf \
        -o StrictHostKeyChecking=no "
ssh-keygen -R [127.0.0.1]:5022 > /dev/null 2>&1
ssh $USER@127.0.0.1 -p 5022 -L $HOST:5022:127.0.0.1:22 -NTf \
    -o StrictHostKeyChecking=no
"
)}

shTravisRepoBuildCancel () {(set -e
# this function will cancel the travis-repo build
# https://docs.travis-ci.com/api#builds
    GITHUB_REPO="$1"
    BUILD_ID="$(
        curl -#Lf \
"https://api.${TRAVIS_DOMAIN:-travis-ci.org}/repos/$GITHUB_REPO/builds" |
        grep -o -E "[0-9]{1,}" | head -n 1
    )"
    curl -H "Authorization: token $TRAVIS_ACCESS_TOKEN" -#Lf -X POST \
        "https://api.${TRAVIS_DOMAIN:-travis-ci.org}/builds/$BUILD_ID/cancel"
)}

shTravisRepoBuildRestart () {(set -e
# this function will restart the travis-repo build
# https://docs.travis-ci.com/api#builds
    GITHUB_REPO="$1"
    BUILD_ID="$(
        curl -#Lf \
"https://api.${TRAVIS_DOMAIN:-travis-ci.org}/repos/$GITHUB_REPO/builds" |
        grep -o -E "[0-9]{1,}" | head -n 1
    )"
    curl -H "Authorization: token $TRAVIS_ACCESS_TOKEN" -#Lf -X POST \
        "https://api.${TRAVIS_DOMAIN:-travis-ci.org}/builds/$BUILD_ID/restart"
)}

shTravisRepoCreate () {(set -e
# this function will create travis-repo https://github.com/$GITHUB_REPO
    export GITHUB_REPO="$1"
    export MODE_BUILD="${MODE_BUILD:-shTravisRepoCreate}"
    export TRAVIS_DOMAIN=${TRAVIS_DOMAIN:-travis-ci.org}
    shBuildPrint "$GITHUB_REPO - creating ..."
    shGithubRepoCreate "$GITHUB_REPO"
    shSleep 5
    shTravisSync
    while true
    do
        shSleep 2
        if (curl "https://api.$TRAVIS_DOMAIN/repos/$GITHUB_REPO" \
            -H "Authorization: token $TRAVIS_ACCESS_TOKEN" -fs 2>&1 > /dev/null)
        then
            break
        fi
    done
    node -e "$UTILITY2_MACRO_JS"'
/* jslint utility2:true */
(function (local) {
"use strict";
let onParallel;
let opt;
opt = {};
local.gotoNext(opt, function (err, data) {
    switch (opt.gotoState) {
    case 1:
        opt.shBuildPrintPrefix = (
            "\n\u001b[35m[MODE_BUILD=shTravisRepoCreate]\u001b[0m - "
        );
        local.ajax({
            headers: {
                Authorization: "token " + process.env.TRAVIS_ACCESS_TOKEN
            },
            url: (
                "https://api."
                + process.env.TRAVIS_DOMAIN + "/repos/"
                + process.env.GITHUB_REPO
            )
        }, opt.gotoNext);
        break;
    case 2:
        opt.id = JSON.parse(data.responseText).id;
        setTimeout(opt.gotoNext, 5000);
        break;
    case 3:
        local.ajax({
            data: "{\"hook\":{\"active\":true}}",
            headers: {
                Authorization: "token " + process.env.TRAVIS_ACCESS_TOKEN,
                "Content-Type": "application/json; charset=utf-8"
            },
            method: "PUT",
            url: (
                "https://api."
                + process.env.TRAVIS_DOMAIN
                + "/hooks/" + opt.id
            )
        }, opt.gotoNext);
        break;
    case 4:
        setTimeout(opt.gotoNext, 5000);
        break;
    case 5:
        onParallel = local.onParallel(opt.gotoNext);
        onParallel.cnt += 1;
        onParallel.cnt += 1;
        local.ajax({
            data: "{\"setting.value\":true}",
            headers: {
                Authorization: "token " + process.env.TRAVIS_ACCESS_TOKEN,
                "Content-Type": "application/json; charset=utf-8",
                "Travis-API-Version": 3
            },
            method: "PATCH",
            url: (
                "https://api." + process.env.TRAVIS_DOMAIN + "/repo/"
                + opt.id + "/setting/builds_only_with_travis_yml"
            )
        }, onParallel);
        onParallel.cnt += 1;
        local.ajax({
            data: "{\"setting.value\":true}",
            headers: {
                Authorization: "token "
                + process.env.TRAVIS_ACCESS_TOKEN,
                "Content-Type": "application/json; charset=utf-8",
                "Travis-API-Version": 3
            },
            method: "PATCH",
            url: (
                "https://api." + process.env.TRAVIS_DOMAIN + "/repo/"
                + opt.id + "/setting/auto_cancel_pushes"
            )
        }, onParallel);
        onParallel();
        break;
    case 6:
        onParallel.cnt += 1;
        onParallel.cnt += 1;
        local.ajax({
            url: (
                "https://raw.githubusercontent.com"
                + "/kaizhu256/node-utility2/alpha/.gitignore"
            )
        }, function (err, xhr) {
            local.assertOrThrow(!err, err);
            local.fs.writeFile(
                "/tmp/githubRepo/" + process.env.GITHUB_REPO + "/.gitignore",
                xhr.responseText,
                onParallel
            );
        });
        onParallel.cnt += 1;
        local.ajax({
            url: (
                "https://raw.githubusercontent.com"
                + "/kaizhu256/node-utility2/alpha/.travis.yml"
            )
        }, function (err, xhr) {
            local.assertOrThrow(!err, err);
            local.fs.writeFile(
                "/tmp/githubRepo/" + process.env.GITHUB_REPO + "/.travis.yml",
                xhr.responseText,
                onParallel
            );
        });
        onParallel.cnt += 1;
        local.fs.open("README.md", "w", function (err, fd) {
            local.assertOrThrow(!err, err);
            local.fs.close(fd, onParallel);
        });
        onParallel.cnt += 1;
        local.fs.writeFile(
            "/tmp/githubRepo/" + process.env.GITHUB_REPO + "/package.json",
            JSON.stringify({
                devDependencies: {
                    utility2: "kaizhu256/node-utility2#alpha"
                },
                name: process.env.GITHUB_REPO.replace((
                    /.+?\/node-|.+?\//
                ), ""),
                homepage: "https://github.com/" + process.env.GITHUB_REPO,
                repository: {
                    type: "git",
                    url: "https://github.com/" + process.env.GITHUB_REPO
                    + ".git"
                },
                scripts: {
                    "build-ci": "utility2 shBuildCi"
                },
                version: "0.0.1"
            }, null, 4),
            onParallel
        );
        onParallel();
        break;
    default:
        console.error(
            opt.shBuildPrintPrefix + new Date().toISOString()
            + process.env.GITHUB_REPO + (
                err
                ? " - ... failed to create - gotoState = " + opt.gotoState
                : " - ... created"
            )
        );
    }
});
opt.gotoState = 0;
opt.gotoNext();
}(globalThis.globalLocal));
'
    cd "/tmp/githubRepo/$GITHUB_REPO"
    unset GITHUB_ORG
    unset GITHUB_REPO
    shBuildInit
    shCryptoTravisEncrypt > /dev/null
    git add -f . .gitignore .travis.yml
    git commit -am "[npm publishAfterCommitAfterBuild]"
    shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" -f alpha
)}

shTravisSync () {(set -e
# this function will sync travis-ci with given $TRAVIS_ACCESS_TOKEN
# this is an expensive operation that will use up your github rate-limit quota
    curl -H "Authorization: token $TRAVIS_ACCESS_TOKEN" -#Lf -X POST \
        "https://api.${TRAVIS_DOMAIN:-travis-ci.org}/users/sync"
)}

shUbuntuInit () {
# this function will init ubuntu's default .bashrc
# https://gist.github.com/kaizhu256/15950e6fc4a6fd6f12a8008cb9c46804
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
        xterm-color|*-256color) color_prompt=yes;;
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
    cd "$HOME/Documents"
    # shUtility2DependentsSync
    (cd utility2 && shUtility2DependentsSync)
    # shBuildApp
    for DIR in $UTILITY2_DEPENDENTS
    do
        if [ -d "$DIR" ] && [ "$DIR" != utility2 ]
        then
            printf "\n\n\n\n$DIR\n\n\n\n"
            (cd "$DIR" && shBuildApp)
        fi
    done
    shUtility2GitDiffHead
)}

shUtility2Dependents () {(set -e
# this function will return a list of utility2 dependents
    cd "$HOME/Documents" 2>/dev/null || true
printf "
apidoc-lite
bootstrap-lite
github-crud
istanbul-lite
jslint-lite
sqljs-lite
swgg
utility2
"
)}

shUtility2DependentsSync () {(set -e
# this function will
# 1. sync files between utility2 and its dependents
# 2. shBuildApp dir $HOME/Documents/$1
# 3. git commit -am $2
    CWD="${1:-$PWD}"
    cd "$HOME/Documents/utility2" && shBuildApp
    cd "$HOME/Documents"
    ln -f "utility2/lib.utility2.sh" "$HOME" || true
    if [ -d "$HOME/bin" ]
    then
        ln -f "utility2/lib.apidoc.js" "$HOME/bin/utility2-apidoc" || true
        ln -f "utility2/lib.github_crud.js" "$HOME/bin/utility2-github_crud" ||
            true
        ln -f "utility2/lib.istanbul.js" "$HOME/bin/utility2-istanbul" || true
        ln -f "utility2/lib.jslint.js" "$HOME/bin/utility2-jslint" || true
        ln -f "utility2/lib.utility2.sh" "$HOME/bin/utility2" || true
    fi
    for DIR in $UTILITY2_DEPENDENTS $(ls -d swgg-* 2>/dev/null)
    do
        if [ "$DIR" = utility2 ] || [ ! -d "$DIR" ]
        then
            continue
        fi
        cd "$DIR"
        npm_config_dir_utility2="$HOME/Documents/utility2" shBuildAppSync
        cd ..
        # hardlink "lib.$LIB.js"
        LIB="$(printf "$DIR" | sed -e "s/-lite\$//" -e "s/-/_/g")"
        if [ -f "utility2/lib.$LIB.js" ]
        then
            ln -f "utility2/lib.$LIB.js" "$DIR" || true
        fi
    done
    for DIR in $(ls -d * 2>/dev/null)
    do
        if [ "$DIR" = utility2 ] || [ ! -d "$DIR" ]
        then
            continue
        fi
        cd "$DIR"
        # hardlink assets.utility2.rollup.js
        if [ -f "assets.utility2.rollup.js" ]
        then
            ln -f "$HOME\
/Documents/utility2/tmp/build/app/assets.utility2.rollup.js" .
        fi
        cd ..
    done
    cd "$CWD" && shBuildApp
    if [ "$2" ]
    then
        git commit -am "$2"
    fi
)}

shUtility2FncStat () {(set -e
# this function will print histogram of utility2-fnc code-frequency
# in current dir
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
let dict;
dict = {};
require("child_process").spawnSync("git", [
    "grep", "-i", "local\\.\\w\\w*\\|\\<sh[A-Z]\\w*\\>"
], {
    encoding: "utf8",
    stdio: [
        "ignore", "pipe", 2
    ]
}).stdout.replace((
    /\blocal\.\w\w*?\b|\bsh[A-Z]\w*?\b/g
), function (match0) {
    dict[match0] = (dict[match0] | 0) + 1;
    return "";
});
console.log(Object.entries(dict).map(function ([
    key, val
]) {
    return String(val).padStart(8, " ") + " -- " + key;
}).sort().join("\n"));
}());
'
)}

shUtility2GitCommit () {(set -e
# this function will git-commit $UTILITY2_DEPENDENTS with given $MESSAGE
    # init $MESSAGE
    MESSAGE="$1"
    for DIR in $UTILITY2_DEPENDENTS
    do
        cd "$HOME/Documents/$DIR" || continue
        printf "\n\n\n\n$PWD\n"
        git commit -am "'$MESSAGE'" || true
    done
)}

shUtility2GitDiffHead () {(set -e
# this function will the git-status of $UTILITY2_DEPENDENTS to stdout
    rm -f /tmp/shUtility2GitDiffHead.diff
    for DIR in $UTILITY2_DEPENDENTS
    do
        cd "$HOME/Documents/$DIR" || continue
        printf "\n\n\n\n$PWD\n\n\n\n" 2>&1 >> /tmp/shUtility2GitDiffHead.diff
        shGitLsTree 2>&1 >> /tmp/shUtility2GitDiffHead.diff
        git status 2>&1 >> /tmp/shUtility2GitDiffHead.diff
        git diff HEAD 2>&1 >> /tmp/shUtility2GitDiffHead.diff
    done
    less /tmp/shUtility2GitDiffHead.diff
)}

shUtility2Grep () {(set -e
# this function will recursively grep $UTILITY2_DEPENDENTS for the regexp $1
    for DIR in $UTILITY2_DEPENDENTS \
        $(cd "$HOME/Documents"; ls -d swgg-* 2>/dev/null)
    do
        DIR="$HOME/Documents/$DIR"
        if [ -d "$DIR" ]
        then
            shGrep "$DIR" "$@"
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
        rm -f /tmp/.X99-lock &&
            export DISPLAY=:99.0 &&
            (Xvfb "$DISPLAY" &) 2>/dev/null || true
    fi
}

# run main-program
export UTILITY2_GIT_BASE_ID=9fe8c2255f4ac330c86af7f624d381d768304183
export UTILITY2_DEPENDENTS="$(shUtility2Dependents)"
export UTILITY2_MACRO_JS='
/* istanbul instrument in package utility2 */
// assets.utility2.header.js - start
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    let ArrayPrototypeFlat;
    let TextXxcoder;
    let consoleError;
    let debugName;
    let local;
    debugName = "debug" + String("Inline");
    // init globalThis
    globalThis.globalThis = globalThis.globalThis || globalThis;
    // init debug_inline
    if (!globalThis[debugName]) {
        consoleError = console.error;
        globalThis[debugName] = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            consoleError("\n\n" + debugName);
            consoleError.apply(console, argList);
            consoleError("\n");
            // return arg0 for inspection
            return argList[0];
        };
    }
    // polyfill
    ArrayPrototypeFlat = function (depth) {
    /*
     * this function will polyfill Array.prototype.flat
     * https://github.com/jonathantneal/array-flat-polyfill
     */
        depth = (
            globalThis.isNaN(depth)
            ? 1
            : Number(depth)
        );
        if (!depth) {
            return Array.prototype.slice.call(this);
        }
        return Array.prototype.reduce.call(this, function (acc, cur) {
            if (Array.isArray(cur)) {
                // recurse
                acc.push.apply(acc, ArrayPrototypeFlat.call(cur, depth - 1));
            } else {
                acc.push(cur);
            }
            return acc;
        }, []);
    };
    Array.prototype.flat = Array.prototype.flat || ArrayPrototypeFlat;
    Array.prototype.flatMap = Array.prototype.flatMap || function flatMap(
        ...argList
    ) {
    /*
     * this function will polyfill Array.prototype.flatMap
     * https://github.com/jonathantneal/array-flat-polyfill
     */
        return this.map(...argList).flat();
    };
    String.prototype.trimEnd = (
        String.prototype.trimEnd || String.prototype.trimRight
    );
    String.prototype.trimStart = (
        String.prototype.trimStart || String.prototype.trimLeft
    );
    (function () {
        try {
            globalThis.TextDecoder = (
                globalThis.TextDecoder || require("util").TextDecoder
            );
            globalThis.TextEncoder = (
                globalThis.TextEncoder || require("util").TextEncoder
            );
        } catch (ignore) {}
    }());
    TextXxcoder = function () {
    /*
     * this function will polyfill TextDecoder/TextEncoder
     * https://gist.github.com/Yaffle/5458286
     */
        return;
    };
    TextXxcoder.prototype.decode = function (octets) {
    /*
     * this function will polyfill TextDecoder.prototype.decode
     * https://gist.github.com/Yaffle/5458286
     */
        let bytesNeeded;
        let codePoint;
        let ii;
        let kk;
        let octet;
        let string;
        string = "";
        ii = 0;
        while (ii < octets.length) {
            octet = octets[ii];
            bytesNeeded = 0;
            codePoint = 0;
            if (octet <= 0x7F) {
                bytesNeeded = 0;
                codePoint = octet & 0xFF;
            } else if (octet <= 0xDF) {
                bytesNeeded = 1;
                codePoint = octet & 0x1F;
            } else if (octet <= 0xEF) {
                bytesNeeded = 2;
                codePoint = octet & 0x0F;
            } else if (octet <= 0xF4) {
                bytesNeeded = 3;
                codePoint = octet & 0x07;
            }
            if (octets.length - ii - bytesNeeded > 0) {
                kk = 0;
                while (kk < bytesNeeded) {
                    octet = octets[ii + kk + 1];
                    codePoint = (codePoint << 6) | (octet & 0x3F);
                    kk += 1;
                }
            } else {
                codePoint = 0xFFFD;
                bytesNeeded = octets.length - ii;
            }
            string += String.fromCodePoint(codePoint);
            ii += bytesNeeded + 1;
        }
        return string;
    };
    TextXxcoder.prototype.encode = function (string) {
    /*
     * this function will polyfill TextEncoder.prototype.encode
     * https://gist.github.com/Yaffle/5458286
     */
        let bits;
        let cc;
        let codePoint;
        let ii;
        let length;
        let octets;
        octets = [];
        length = string.length;
        ii = 0;
        while (ii < length) {
            codePoint = string.codePointAt(ii);
            cc = 0;
            bits = 0;
            if (codePoint <= 0x0000007F) {
                cc = 0;
                bits = 0x00;
            } else if (codePoint <= 0x000007FF) {
                cc = 6;
                bits = 0xC0;
            } else if (codePoint <= 0x0000FFFF) {
                cc = 12;
                bits = 0xE0;
            } else if (codePoint <= 0x001FFFFF) {
                cc = 18;
                bits = 0xF0;
            }
            octets.push(bits | (codePoint >> cc));
            cc -= 6;
            while (cc >= 0) {
                octets.push(0x80 | ((codePoint >> cc) & 0x3F));
                cc -= 6;
            }
            ii += (
                codePoint >= 0x10000
                ? 2
                : 1
            );
        }
        return octets;
    };
    globalThis.TextDecoder = globalThis.TextDecoder || TextXxcoder;
    globalThis.TextEncoder = globalThis.TextEncoder || TextXxcoder;
    // init local
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    // init isBrowser
    local.isBrowser = (
        typeof globalThis.XMLHttpRequest === "function"
        && globalThis.navigator
        && typeof globalThis.navigator.userAgent === "string"
    );
    // init isWebWorker
    local.isWebWorker = (
        local.isBrowser && typeof globalThis.importScript === "function"
    );
    // init function
    local.assertOrThrow = function (passed, message) {
    /*
     * this function will throw err.<message> if <passed> is falsy
     */
        let err;
        if (passed) {
            return;
        }
        err = (
            (
                message
                && typeof message.message === "string"
                && typeof message.stack === "string"
            )
            // if message is errObj, then leave as is
            ? message
            : new Error(
                typeof message === "string"
                // if message is a string, then leave as is
                ? message
                // else JSON.stringify message
                : JSON.stringify(message, undefined, 4)
            )
        );
        throw err;
    };
    local.coalesce = function (...argList) {
    /*
     * this function will coalesce null, undefined, or "" in <argList>
     */
        let arg;
        let ii;
        ii = 0;
        while (ii < argList.length) {
            arg = argList[ii];
            if (arg !== null && arg !== undefined && arg !== "") {
                break;
            }
            ii += 1;
        }
        return arg;
    };
    local.fsRmrfSync = function (dir) {
    /*
     * this function will sync "rm -rf" <dir>
     */
        let child_process;
        try {
            child_process = require("child_process");
        } catch (ignore) {
            return;
        }
        child_process.spawnSync("rm", [
            "-rf", dir
        ], {
            stdio: [
                "ignore", 1, 2
            ]
        });
    };
    local.fsWriteFileWithMkdirpSync = function (file, data) {
    /*
     * this function will sync write <data> to <file> with "mkdir -p"
     */
        let fs;
        try {
            fs = require("fs");
        } catch (ignore) {
            return;
        }
        // try to write file
        try {
            fs.writeFileSync(file, data);
        } catch (ignore) {
            // mkdir -p
            require("child_process").spawnSync(
                "mkdir",
                [
                    "-p", require("path").dirname(file)
                ],
                {
                    stdio: [
                        "ignore", 1, 2
                    ]
                }
            );
            // rewrite file
            fs.writeFileSync(file, data);
        }
    };
    local.functionOrNop = function (fnc) {
    /*
     * this function will if <fnc> exists,
     * return <fnc>,
     * else return <nop>
     */
        return fnc || local.nop;
    };
    local.identity = function (val) {
    /*
     * this function will return <val>
     */
        return val;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (target, source) {
    /*
     * this function will if items from <target> are null, undefined, or "",
     * then overwrite them with items from <source>
     */
        target = target || {};
        Object.keys(source || {}).forEach(function (key) {
            if (
                target[key] === null
                || target[key] === undefined
                || target[key] === ""
            ) {
                target[key] = target[key] || source[key];
            }
        });
        return target;
    };
    local.querySelector = function (selectors) {
    /*
     * this function will return first dom-elem that match <selectors>
     */
        return (
            typeof document === "object" && document
            && typeof document.querySelector === "function"
            && document.querySelector(selectors)
        ) || {};
    };
    local.querySelectorAll = function (selectors) {
    /*
     * this function will return dom-elem-list that match <selectors>
     */
        return (
            typeof document === "object" && document
            && typeof document.querySelectorAll === "function"
            && Array.from(document.querySelectorAll(selectors))
        ) || [];
    };
    // require builtin
    if (!local.isBrowser) {
        local.assert = require("assert");
        local.buffer = require("buffer");
        local.child_process = require("child_process");
        local.cluster = require("cluster");
        local.crypto = require("crypto");
        local.dgram = require("dgram");
        local.dns = require("dns");
        local.domain = require("domain");
        local.events = require("events");
        local.fs = require("fs");
        local.http = require("http");
        local.https = require("https");
        local.net = require("net");
        local.os = require("os");
        local.path = require("path");
        local.querystring = require("querystring");
        local.readline = require("readline");
        local.repl = require("repl");
        local.stream = require("stream");
        local.string_decoder = require("string_decoder");
        local.timers = require("timers");
        local.tls = require("tls");
        local.tty = require("tty");
        local.url = require("url");
        local.util = require("util");
        local.vm = require("vm");
        local.zlib = require("zlib");
    }
}((typeof globalThis === "object" && globalThis) || (function () {
    return Function("return this")(); // jslint ignore:line
}())));
// assets.utility2.header.js - end



(function (local) {
"use strict";



/* istanbul ignore next */
// run shared js-env code - init-before
(function () {
// init local
local = (
    globalThis.utility2_rollup
    // || globalThis.utility2_rollup_old
    // || require("./assets.utility2.rollup.js")
    || globalThis.globalLocal
);
// init exports
if (local.isBrowser) {
    globalThis.utility2_utility2 = local;
} else {
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.utility2 = local;



/* validateLineSortedReset */
globalThis.local = local;

local.ajax = function (opt, onError) {
/*
 * this function will send an ajax-req
 * with given <opt>.url and callback <onError>
 * with err and timeout handling
 * example usage:
    local.ajax({
        data: "hello world",
        header: {"x-header-hello": "world"},
        method: "POST",
        url: "/index.html"
    }, function (err, xhr) {
        console.log(xhr.statusCode);
        console.log(xhr.responseText);
    });
 */
    let ajaxProgressUpdate;
    let bufferValidateAndCoerce;
    let isDone;
    let local2;
    let onError2;
    let onEvent;
    let stack;
    let streamCleanup;
    let timeout;
    let tmp;
    let xhr;
    let xhrInit;
    // init local2
    local2 = opt.local2 || local.utility2 || {};
    // init function
    ajaxProgressUpdate = local2.ajaxProgressUpdate || function () {
        return;
    };
    bufferValidateAndCoerce = local2.bufferValidateAndCoerce || function (
        buf,
        mode
    ) {
    /*
     * this function will validate and coerce/convert
     * <buf> to Buffer/Uint8Array, or String if <mode> = "string"
     */
        // coerce ArrayBuffer to Buffer
        if (Object.prototype.toString.call(buf) === "[object ArrayBuffer]") {
            buf = new Uint8Array(buf);
        }
        // convert Buffer to utf8
        if (mode === "string" && typeof buf !== "string") {
            buf = String(buf);
        }
        return buf;
    };
    onEvent = function (evt) {
    /*
     * this function will handle events
     */
        if (Object.prototype.toString.call(evt) === "[object Error]") {
            xhr.err = xhr.err || evt;
            xhr.onEvent({
                type: "error"
            });
            return;
        }
        // init statusCode
        xhr.statusCode = (xhr.statusCode || xhr.status) | 0;
        switch (evt.type) {
        case "abort":
        case "error":
        case "load":
            if (isDone) {
                return;
            }
            isDone = true;
            // decrement cnt
            ajaxProgressUpdate.cnt = Math.max(
                ajaxProgressUpdate.cnt - 1,
                0
            );
            ajaxProgressUpdate();
            // handle abort or err event
            switch (!xhr.err && evt.type) {
            case "abort":
            case "error":
                xhr.err = new Error("ajax - event " + evt.type);
                break;
            case "load":
                if (xhr.statusCode >= 400) {
                    xhr.err = new Error(
                        "ajax - statusCode " + xhr.statusCode
                    );
                }
                break;
            }
            // debug statusCode / method / url
            if (xhr.err) {
                xhr.statusCode = xhr.statusCode || 500;
                xhr.err.statusCode = xhr.statusCode;
                tmp = (
                    (
                        local.isBrowser
                        ? "browser"
                        : "node"
                    )
                    + " - " + xhr.statusCode + " " + xhr.method + " " + xhr.url
                    + "\n"
                );
                xhr.err.message = tmp + xhr.err.message;
                xhr.err.stack = tmp + xhr.err.stack;
            }
            // update resHeaders
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
            if (xhr.getAllResponseHeaders) {
                xhr.getAllResponseHeaders().replace((
                    /(.*?):\u0020*(.*?)\r\n/g
                ), function (ignore, key, val) {
                    xhr.resHeaders[key.toLowerCase()] = val;
                });
            }
            // debug ajaxResponse
            xhr.resContentLength = (
                xhr.response
                && (xhr.response.byteLength || xhr.response.length)
            ) | 0;
            xhr.timeElapsed = Date.now() - xhr.timeStart;
            if (xhr.modeDebug) {
                console.error("serverLog - " + JSON.stringify({
                    time: new Date(xhr.timeStart).toISOString(),
                    type: "ajaxResponse",
                    method: xhr.method,
                    url: xhr.url,
                    statusCode: xhr.statusCode,
                    timeElapsed: xhr.timeElapsed,
                    // extra
                    resContentLength: xhr.resContentLength
                }) + "\n");
            }
            // init responseType
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
            switch (xhr.response && xhr.responseType) {
            // init responseText
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText
            case "":
            case "text":
                if (typeof xhr.responseText === "string") {
                    break;
                }
                xhr.responseText = bufferValidateAndCoerce(
                    xhr.response,
                    "string"
                );
                break;
            case "arraybuffer":
                xhr.responseBuffer = bufferValidateAndCoerce(xhr.response);
                break;
            }
            // cleanup timerTimeout
            clearTimeout(xhr.timerTimeout);
            // cleanup reqStream and resStream
            streamCleanup(xhr.reqStream);
            streamCleanup(xhr.resStream);
            onError2(xhr.err, xhr);
            break;
        }
    };
    // init onError2
    stack = new Error().stack;
    onError2 = function (err, xhr) {
        if (err && typeof err.stack === "string") {
            err.stack += "\n" + stack;
        }
        onError(err, xhr);
    };
    streamCleanup = function (stream) {
    /*
     * this function will try to end or destroy <stream>
     */
        let err;
        // try to end stream
        try {
            stream.end();
        } catch (errCaught) {
            err = errCaught;
        }
        // if err, then try to destroy stream
        if (err) {
            try {
                stream.destroy();
            } catch (ignore) {}
        }
    };
    xhrInit = function () {
    /*
     * this function will init xhr
     */
        // init opt
        Object.keys(opt).forEach(function (key) {
            if (key[0] !== "_") {
                xhr[key] = opt[key];
            }
        });
        // init timeout
        timeout = xhr.timeout || local2.timeoutDefault || 30000;
        // init default
        local.objectAssignDefault(xhr, {
            corsForwardProxyHost: local2.corsForwardProxyHost,
            headers: {},
            location: (local.isBrowser && location) || {},
            method: "GET",
            responseType: ""
        });
        // init headers
        Object.keys(xhr.headers).forEach(function (key) {
            xhr.headers[key.toLowerCase()] = xhr.headers[key];
        });
        // coerce Uint8Array to Buffer
        if (
            !local.isBrowser
            && !Buffer.isBuffer(xhr.data)
            && Object.prototype.toString.call(xhr.data)
            === "[object Uint8Array]"
        ) {
            Object.setPrototypeOf(xhr.data, Buffer.prototype);
        }
        // init misc
        local2._debugXhr = xhr;
        xhr.onEvent = onEvent;
        xhr.resHeaders = {};
        xhr.timeStart = xhr.timeStart || Date.now();
    };
    // init xhr - XMLHttpRequest
    xhr = (
        local.isBrowser
        && !opt.httpReq
        && !(local2.serverLocalUrlTest && local2.serverLocalUrlTest(opt.url))
        && new XMLHttpRequest()
    );
    // init xhr - http.request
    if (!xhr) {
        xhr = local.identity(local2.urlParse || require("url").parse)(opt.url);
        // init xhr
        xhrInit();
        // init xhr - http.request
        xhr = local.identity(
            opt.httpReq
            || (local.isBrowser && local2.http.request)
            || require(xhr.protocol.slice(0, -1)).request
        )(xhr, function (resStream) {
        /*
         * this function will read <resStream>
         */
            let bufList;
            bufList = [];
            xhr.resHeaders = resStream.headers || xhr.resHeaders;
            xhr.resStream = resStream;
            xhr.statusCode = resStream.statusCode;
            resStream.dataLength = 0;
            resStream.on("data", function (buf) {
                bufList.push(buf);
            });
            resStream.on("end", function () {
                xhr.response = (
                    local.isBrowser
                    ? bufList[0]
                    : Buffer.concat(bufList)
                );
                resStream.dataLength = (
                    xhr.response.byteLength || xhr.response.length
                );
                xhr.onEvent({
                    type: "load"
                });
            });
            resStream.on("error", xhr.onEvent);
        });
        xhr.abort = function () {
        /*
         * this function will abort xhr-req
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort
         */
            xhr.onEvent({
                type: "abort"
            });
        };
        xhr.addEventListener = local.nop;
        xhr.open = local.nop;
        xhr.reqStream = xhr;
        xhr.send = xhr.end;
        xhr.setRequestHeader = local.nop;
        xhr.on("error", onEvent);
    }
    // init xhr
    xhrInit();
    // init timerTimeout
    xhr.timerTimeout = setTimeout(function () {
        xhr.err = xhr.err || new Error(
            "onTimeout - "
            + timeout + " ms - " + "ajax " + xhr.method + " " + xhr.url
        );
        xhr.abort();
        // cleanup reqStream and resStream
        streamCleanup(xhr.reqStream);
        streamCleanup(xhr.resStream);
    }, timeout);
    // increment cnt
    ajaxProgressUpdate.cnt |= 0;
    ajaxProgressUpdate.cnt += 1;
    // handle evt
    xhr.addEventListener("abort", xhr.onEvent);
    xhr.addEventListener("error", xhr.onEvent);
    xhr.addEventListener("load", xhr.onEvent);
    xhr.addEventListener("loadstart", ajaxProgressUpdate);
    xhr.addEventListener("progress", ajaxProgressUpdate);
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload
    if (xhr.upload && xhr.upload.addEventListener) {
        xhr.upload.addEventListener("progress", ajaxProgressUpdate);
    }
    // open url - corsForwardProxyHost
    if (local.functionOrNop(local2.corsForwardProxyHostIfNeeded)(xhr)) {
        xhr.open(xhr.method, local2.corsForwardProxyHostIfNeeded(xhr));
        xhr.setRequestHeader(
            "forward-proxy-headers",
            JSON.stringify(xhr.headers)
        );
        xhr.setRequestHeader("forward-proxy-url", xhr.url);
    // open url - default
    } else {
        xhr.open(xhr.method, xhr.url);
    }
    // send headers
    Object.keys(xhr.headers).forEach(function (key) {
        xhr.setRequestHeader(key, xhr.headers[key]);
    });
    // send data
    switch ((xhr.data && xhr.data.constructor) || true) {
    // Blob
    // https://developer.mozilla.org/en-US/docs/Web/API/Blob
    case local2.Blob:
    // FormData
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    case local2.FormData:
        local2.blobRead(xhr.data, function (err, data) {
            if (err) {
                xhr.onEvent(err);
                return;
            }
            // send data
            xhr.send(data);
        });
        break;
    default:
        xhr.send(xhr.data);
    }
    return xhr;
};

local.assertJsonEqual = function (aa, bb, message) {
/*
 * this function will assert jsonStringifyOrdered(<aa>) === JSON.stringify(<bb>)
 */
    aa = local.jsonStringifyOrdered(aa);
    bb = JSON.stringify(bb);
    local.assertOrThrow(aa === bb, message || [
        aa, bb
    ]);
};

local.assertJsonNotEqual = function (aa, bb, message) {
/*
 * this function will assert jsonStringifyOrdered(<aa>) !== JSON.stringify(<bb>)
 */
    aa = local.jsonStringifyOrdered(aa);
    bb = JSON.stringify(bb);
    local.assertOrThrow(aa !== bb, [
        aa
    ], message || aa);
};

local.base64FromBuffer = function (buf) {
/*
 * this function will convert Uint8Array <buf> to base64 str
 */
    let ii;
    let mod3;
    let str;
    let uint24;
    let uint6ToB64;
    // convert utf8 to Uint8Array
    if (typeof buf === "string") {
        buf = new TextEncoder().encode(buf);
    }
    buf = buf || [];
    str = "";
    uint24 = 0;
    uint6ToB64 = function (uint6) {
        return (
            uint6 < 26
            ? uint6 + 65
            : uint6 < 52
            ? uint6 + 71
            : uint6 < 62
            ? uint6 - 4
            : uint6 === 62
            ? 43
            : 47
        );
    };
    ii = 0;
    while (ii < buf.length) {
        mod3 = ii % 3;
        uint24 |= buf[ii] << (16 >>> mod3 & 24);
        if (mod3 === 2 || buf.length - ii === 1) {
            str += String.fromCharCode(
                uint6ToB64(uint24 >>> 18 & 63),
                uint6ToB64(uint24 >>> 12 & 63),
                uint6ToB64(uint24 >>> 6 & 63),
                uint6ToB64(uint24 & 63)
            );
            uint24 = 0;
        }
        ii += 1;
    }
    return str.replace((
        /A(?=A$|$)/gm
    ), "");
};

local.base64ToBuffer = function (str) {
/*
 * this function will convert base64 <str> to Uint8Array
 * https://gist.github.com/wang-bin/7332335
 */
    let buf;
    let byte;
    let chr;
    let ii;
    let jj;
    let map64;
    let mod4;
    str = str || "";
    buf = new Uint8Array(str.length); // 3/4
    byte = 0;
    jj = 0;
    map64 = (
        !(str.indexOf("-") < 0 && str.indexOf("_") < 0)
        // base64url
        ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
        // base64
        : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    );
    mod4 = 0;
    ii = 0;
    while (ii < str.length) {
        chr = map64.indexOf(str[ii]);
        if (chr !== -1) {
            mod4 %= 4;
            if (mod4 === 0) {
                byte = chr;
            } else {
                byte = byte * 64 + chr;
                buf[jj] = 255 & (byte >> ((-2 * (mod4 + 1)) & 6));
                jj += 1;
            }
            mod4 += 1;
        }
        ii += 1;
    }
    // optimization - create resized-view of buf
    return buf.subarray(0, jj);
};

local.base64ToUtf8 = function (str) {
/*
 * this function will convert base64 <str> to utf8 str
 */
    return local.bufferValidateAndCoerce(local.base64ToBuffer(str), "string");
};

local.bufferValidateAndCoerce = function (buf, mode) {
/*
 * this function will validate and coerce/convert
 * <buf> to Buffer/Uint8Array, or String if <mode> = "string"
 */
    // validate not 0
    if (buf !== 0) {
        buf = buf || "";
    }
    if (typeof buf === "string" && mode === "string") {
        return buf;
    }
    // convert utf8 to Uint8Array
    if (typeof buf === "string") {
        buf = new TextEncoder().encode(buf);
    // validate instanceof Uint8Array
    } else if (Object.prototype.toString.call(buf) !== "[object Uint8Array]") {
        throw new Error(
            "bufferValidateAndCoerce - value is not instanceof "
            + "ArrayBuffer, String, or Uint8Array"
        );
    }
    // convert Uint8Array to utf8
    if (mode === "string") {
        return new TextDecoder().decode(buf);
    }
    // coerce Uint8Array to Buffer
    if (globalThis.Buffer && Buffer.isBuffer && !Buffer.isBuffer(buf)) {
        Object.setPrototypeOf(buf, Buffer.prototype);
    }
    return buf;
};

local.childProcessSpawnWithTimeout = function (command, args, opt) {
/*
 * this function will run like child_process.spawn,
 * but with auto-timeout after timeout milliseconds
 * example usage:
    let child = local.childProcessSpawnWithTimeout(
        "/bin/sh",
        ["-c", "echo hello world"],
        {stdio: ["ignore", 1, 2], timeout: 5000}
    );
    child.on("error", console.error);
    child.on("exit", function (exitCode) {
        console.error("exitCode " + exitCode);
    });
 */
    let child;
    let child_process;
    let timerTimeout;
    child_process = require("child_process");
    // spawn child
    child = child_process.spawn(command, args, opt).on("exit", function () {
        // cleanup timerTimeout
        try {
            process.kill(timerTimeout.pid);
        } catch (ignore) {}
    });
    // init timerTimeout
    timerTimeout = child_process.spawn(
        // convert timeout to integer seconds with 2 second delay
        "sleep "
        + Math.floor(
            0.001 * (Number(opt && opt.timeout) || local.timeoutDefault)
            + 2
        )
        + "; kill -9 " + child.pid + " 2>/dev/null",
        {
            shell: true,
            stdio: "ignore"
        }
    );
    return child;
};

local.childProcessSpawnWithUtility2 = function (script, onError) {
/*
 * this function will run child_process.spawn, with lib.utility2.sh sourced
 */
    require("child_process").spawn(
        ". " + (process.env.npm_config_dir_utility2 || __dirname)
        + "/lib.utility2.sh; " + script,
        {
            shell: true,
            stdio: [
                "ignore", 1, 2
            ]
        }
    ).on("exit", function (exitCode) {
        onError(exitCode && Object.assign(new Error(), {
            exitCode
        }));
    });
};

local.cryptoAesXxxCbcRawDecrypt = function (opt, onError) {
/*
 * this function will aes-xxx-cbc decrypt with given <opt>
 * example usage:
    data = new Uint8Array([1,2,3]);
    key = '"'"'0123456789abcdef0123456789abcdef'"'"';
    mode = undefined;
    local.cryptoAesXxxCbcRawEncrypt({
        data,
        key,
        mode
    }, function (err, data) {
        console.assert(!err, err);
        local.cryptoAesXxxCbcRawDecrypt({
            data,
            key,
            mode
        }, console.log);
    });
 */
    let cipher;
    let crypto;
    let data;
    let ii;
    let iv;
    let key;
    // init key
    key = new Uint8Array(0.5 * opt.key.length);
    ii = 0;
    while (ii < key.byteLength) {
        key[ii] = parseInt(opt.key.slice(2 * ii, 2 * ii + 2), 16);
        ii += 2;
    }
    data = opt.data;
    // base64
    if (opt.mode === "base64") {
        data = local.base64ToBuffer(data);
    }
    // normalize data
    if (Object.prototype.toString.call(data) !== "[object Uint8Array]") {
        data = new Uint8Array(data);
    }
    // init iv
    iv = data.subarray(0, 16);
    // optimization - create resized-view of data
    data = data.subarray(16);
    crypto = globalThis.crypto;
    if (!local.isBrowser) {
        setTimeout(function () {
            crypto = require("crypto");
            cipher = crypto.createDecipheriv(
                "aes-" + (8 * key.byteLength) + "-cbc",
                key,
                iv
            );
            onError(undefined, Buffer.concat([
                cipher.update(data), cipher.final()
            ]));
        });
        return;
    }
    crypto.subtle.importKey("raw", key, {
        name: "AES-CBC"
    }, false, [
        "decrypt"
    ]).then(function (key) {
        crypto.subtle.decrypt({
            iv,
            name: "AES-CBC"
        }, key, data).then(function (data) {
            onError(undefined, new Uint8Array(data));
        }).catch(onError);
    }).catch(onError);
};

local.cryptoAesXxxCbcRawEncrypt = function (opt, onError) {
/*
 * this function will aes-xxx-cbc encrypt with given <opt>
 * example usage:
    data = new Uint8Array([1,2,3]);
    key = '"'"'0123456789abcdef0123456789abcdef'"'"';
    mode = undefined;
    local.cryptoAesXxxCbcRawEncrypt({
        data,
        key,
        mode
    }, function (err, data) {
        console.assert(!err, err);
        local.cryptoAesXxxCbcRawDecrypt({
            data,
            key,
            mode
        }, console.log);
    });
 */
    let cipher;
    let crypto;
    let data;
    let ii;
    let iv;
    let key;
    // init key
    key = new Uint8Array(0.5 * opt.key.length);
    ii = 0;
    while (ii < key.byteLength) {
        key[ii] = parseInt(opt.key.slice(2 * ii, 2 * ii + 2), 16);
        ii += 2;
    }
    data = opt.data;
    // init iv
    iv = new Uint8Array((((data.byteLength) >> 4) << 4) + 32);
    crypto = globalThis.crypto;
    if (!local.isBrowser) {
        setTimeout(function () {
            crypto = require("crypto");
            // init iv
            iv.set(crypto.randomBytes(16));
            cipher = crypto.createCipheriv(
                "aes-" + (8 * key.byteLength) + "-cbc",
                key,
                iv.subarray(0, 16)
            );
            data = cipher.update(data);
            iv.set(data, 16);
            iv.set(cipher.final(), 16 + data.byteLength);
            if (opt.mode === "base64") {
                iv = local.base64FromBuffer(iv);
                iv += "\n";
            }
            onError(undefined, iv);
        });
        return;
    }
    // init iv
    iv.set(crypto.getRandomValues(new Uint8Array(16)));
    crypto.subtle.importKey("raw", key, {
        name: "AES-CBC"
    }, false, [
        "encrypt"
    ]).then(function (key) {
        crypto.subtle.encrypt({
            iv: iv.subarray(0, 16),
            name: "AES-CBC"
        }, key, data).then(function (data) {
            iv.set(new Uint8Array(data), 16);
            // base64
            if (opt.mode === "base64") {
                iv = local.base64FromBuffer(iv);
                iv += "\n";
            }
            onError(undefined, iv);
        }).catch(onError);
    }).catch(onError);
};

local.fsReadFileOrEmptyStringSync = function (file, opt) {
/*
 * this function will try to read file or return empty-string, or
 * if <opt> === "json", then try to JSON.parse file or return {}
 */
    try {
        return (
            opt === "json"
            ? JSON.parse(local.fs.readFileSync(file, "utf8"))
            : local.fs.readFileSync(file, opt)
        );
    } catch (ignore) {
        return (
            opt === "json"
            ? {}
            : ""
        );
    }
};

local.gotoNext = function (opt, onError) {
/*
 * this function will wrap onError inside recursive-function <opt>.gotoNext,
 * and append current-stack to any err
 */
    opt.gotoNext = local.onErrorWithStack(function (err, data, meta) {
        try {
            opt.gotoState += (
                (err && !opt.modeErrorIgnore)
                ? 1000
                : 1
            );
            if (opt.modeDebug) {
                console.error("gotoNext - " + JSON.stringify({
                    gotoState: opt.gotoState,
                    errorMessage: err && err.message
                }));
                if (err && err.stack) {
                    console.error(err.stack);
                }
            }
            onError(err, data, meta);
        } catch (errCaught) {
            // throw errCaught to break infinite recursion-loop
            if (opt.errCaught) {
                local.assertOrThrow(undefined, opt.errCaught);
            }
            opt.errCaught = errCaught;
            opt.gotoNext(errCaught, data, meta);
        }
    });
    opt.gotoNextData = opt.gotoNext.bind(undefined, undefined);
    return opt;
};

local.isNullOrUndefined = function (val) {
/*
 * this function will test if val is null or undefined
 */
    return val === null || val === undefined;
};

local.jsonCopy = function (obj) {
/*
 * this function will deep-copy obj
 */
    return (
        obj === undefined
        ? undefined
        : JSON.parse(JSON.stringify(obj))
    );
};

local.jsonStringifyOrdered = function (obj, replacer, space) {
/*
 * this function will JSON.stringify <obj>,
 * with object-keys sorted and circular-references removed
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Syntax
 */
    let circularSet;
    let stringify;
    let tmp;
    stringify = function (obj) {
    /*
     * this function will recursively JSON.stringify obj,
     * with object-keys sorted and circular-references removed
     */
        // if obj is not an object or function, then JSON.stringify as normal
        if (!(
            obj
            && typeof obj === "object"
            && typeof obj.toJSON !== "function"
        )) {
            return JSON.stringify(obj);
        }
        // ignore circular-reference
        if (circularSet.has(obj)) {
            return;
        }
        circularSet.add(obj);
        // if obj is an array, then recurse items
        if (Array.isArray(obj)) {
            tmp = "[" + obj.map(function (obj) {
                // recurse
                tmp = stringify(obj);
                return (
                    typeof tmp === "string"
                    ? tmp
                    : "null"
                );
            }).join(",") + "]";
            circularSet.delete(obj);
            return tmp;
        }
        // if obj is not an array,
        // then recurse its items with object-keys sorted
        tmp = "{" + Object.keys(obj).sort().map(function (key) {
            // recurse
            tmp = stringify(obj[key]);
            if (typeof tmp === "string") {
                return JSON.stringify(key) + ":" + tmp;
            }
        }).filter(function (obj) {
            return typeof obj === "string";
        }).join(",") + "}";
        circularSet.delete(obj);
        return tmp;
    };
    circularSet = new Set();
    return JSON.stringify((
        (typeof obj === "object" && obj)
        // recurse
        ? JSON.parse(stringify(obj))
        : obj
    ), replacer, space);
};

local.moduleDirname = function (module, pathList) {
/*
 * this function will search <pathList> for <module>'"'"'s __dirname
 */
    let result;
    // search process.cwd()
    if (!module || module === "." || module.indexOf("/") >= 0) {
        return require("path").resolve(process.cwd(), module || "");
    }
    // search pathList
    Array.from([
        pathList,
        require("module").globalPaths,
        [
            process.env.HOME + "/node_modules", "/usr/local/lib/node_modules"
        ]
    ]).flat().some(function (path) {
        try {
            result = require("path").resolve(
                process.cwd(),
                path + "/" + module
            );
            result = require("fs").statSync(result).isDirectory() && result;
            return result;
        } catch (ignore) {
            result = "";
        }
    });
    return result;
};

local.objectSetDefault = function (dict, defaults, depth) {
/*
 * this function will recursively set defaults for undefined-items in dict
 */
    dict = dict || {};
    defaults = defaults || {};
    Object.keys(defaults).forEach(function (key) {
        let defaults2;
        let dict2;
        dict2 = dict[key];
        // handle misbehaving getter
        try {
            defaults2 = defaults[key];
        } catch (ignore) {}
        if (defaults2 === undefined) {
            return;
        }
        // init dict[key] to default value defaults[key]
        switch (dict2) {
        case "":
        case null:
        case undefined:
            dict[key] = defaults2;
            return;
        }
        // if dict2 and defaults2 are both non-undefined and non-array objects,
        // then recurse with dict2 and defaults2
        if (
            depth > 1
            // dict2 is a non-undefined and non-array object
            && typeof dict2 === "object" && dict2 && !Array.isArray(dict2)
            // defaults2 is a non-undefined and non-array object
            && typeof defaults2 === "object" && defaults2
            && !Array.isArray(defaults2)
        ) {
            // recurse
            local.objectSetDefault(dict2, defaults2, depth - 1);
        }
    });
    return dict;
};

local.objectSetOverride = function (dict, overrides, depth, env) {
/*
 * this function will recursively set overrides for items in dict
 */
    dict = dict || {};
    env = env || (typeof process === "object" && process.env) || {};
    overrides = overrides || {};
    Object.keys(overrides).forEach(function (key) {
        let dict2;
        let overrides2;
        dict2 = dict[key];
        overrides2 = overrides[key];
        if (overrides2 === undefined) {
            return;
        }
        // if both dict2 and overrides2 are non-undefined and non-array objects,
        // then recurse with dict2 and overrides2
        if (
            depth > 1
            // dict2 is a non-undefined and non-array object
            && typeof dict2 === "object" && dict2 && !Array.isArray(dict2)
            // overrides2 is a non-undefined and non-array object
            && typeof overrides2 === "object" && overrides2
            && !Array.isArray(overrides2)
        ) {
            local.objectSetOverride(dict2, overrides2, depth - 1, env);
            return;
        }
        // else set dict[key] with overrides[key]
        dict[key] = (
            dict === env
            // if dict is env, then overrides falsy-value with empty-string
            ? overrides2 || ""
            : overrides2
        );
    });
    return dict;
};

local.onErrorDefault = function (err) {
/*
 * this function will if <err> exists, then print it to stderr
 */
    if (err) {
        console.error(err);
    }
    return err;
};

local.onErrorThrow = function (err) {
/*
 * this function will if <err> exists, then throw it
 */
    if (err) {
        throw err;
    }
    return err;
};

local.onErrorWithStack = function (onError) {
/*
 * this function will wrap <onError> with wrapper preserving current-stack
 */
    let onError2;
    let stack;
    stack = new Error().stack.replace((
        /(.*?)\n.*?$/m
    ), "$1");
    onError2 = function (err, data, meta) {
        // append current-stack to err.stack
        if (
            err
            && typeof err.stack === "string"
            && err !== local.errDefault
            && String(err.stack).indexOf(stack.split("\n")[2]) < 0
        ) {
            err.stack += "\n" + stack;
        }
        onError(err, data, meta);
    };
    // debug onError
    onError2.toString = function () {
        return String(onError);
    };
    return onError2;
};

local.onParallel = function (onError, onEach, onRetry) {
/*
 * this function will create a function that will
 * 1. run async tasks in parallel
 * 2. if cnt === 0 or err occurred, then call onError(err)
 */
    let onParallel;
    onError = local.onErrorWithStack(onError);
    onEach = onEach || local.nop;
    onRetry = onRetry || local.nop;
    onParallel = function (err, data) {
        if (onRetry(err, data)) {
            return;
        }
        // decrement cnt
        onParallel.cnt -= 1;
        // validate cnt
        if (!(onParallel.cnt >= 0 || err || onParallel.err)) {
            err = new Error(
                "invalid onParallel.cnt = " + onParallel.cnt
            );
        // ensure onError is run only once
        } else if (onParallel.cnt < 0) {
            return;
        }
        // handle err
        if (err) {
            onParallel.err = err;
            // ensure cnt <= 0
            onParallel.cnt = -Math.abs(onParallel.cnt);
        }
        // call onError when isDone
        if (onParallel.cnt <= 0) {
            onError(err, data);
            return;
        }
        onEach();
    };
    // init cnt
    onParallel.cnt = 0;
    // return callback
    return onParallel;
};

local.onParallelList = function (opt, onEach, onError) {
/*
 * this function will
 * 1. async-run onEach in parallel,
 *    with given <opt>.rateLimit and <opt>.retryLimit
 * 2. call <onError> when onParallel.ii + 1 === <opt>.list.length
 */
    let isListEnd;
    let onEach2;
    let onParallel;
    opt.list = opt.list || [];
    onEach2 = function () {
        while (true) {
            if (!(onParallel.ii + 1 < opt.list.length)) {
                isListEnd = true;
                return;
            }
            if (!(onParallel.cnt < opt.rateLimit + 1)) {
                return;
            }
            onParallel.ii += 1;
            onEach({
                elem: opt.list[onParallel.ii],
                ii: onParallel.ii,
                list: opt.list,
                retry: 0
            }, onParallel);
        }
    };
    onParallel = local.onParallel(onError, onEach2, function (err, data) {
        if (err && data && data.retry < opt.retryLimit) {
            local.onErrorDefault(err);
            data.retry += 1;
            setTimeout(function () {
                onParallel.cnt -= 1;
                onEach(data, onParallel);
            }, 1000);
            return true;
        }
        // restart if opt.list has grown
        if (isListEnd && (onParallel.ii + 1 < opt.list.length)) {
            isListEnd = undefined;
            onEach2();
        }
    });
    onParallel.ii = -1;
    opt.rateLimit = Number(opt.rateLimit) || 6;
    opt.rateLimit = Math.max(opt.rateLimit, 1);
    opt.retryLimit = Number(opt.retryLimit) || 2;
    onParallel.cnt += 1;
    onEach2();
    onParallel();
};

local.semverCompare = function (aa, bb) {
/*
 * this function will compare semver versions aa ? bb and return
 * -1 if aa < bb
 *  0 if aa = bb
 *  1 if aa > bb
 * https://semver.org/#spec-item-11
 * example usage:
    semverCompare("2.2.2", "10.2.2"); // -1
    semverCompare("1.2.3", "1.2.3");  //  0
    semverCompare("10.2.2", "2.2.2"); //  1
 */
    let ii;
    let len;
    [
        aa, bb
    ] = [
        aa, bb
    ].map(function (val) {
        val = (
            /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z\-][0-9a-zA-Z\-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z\-][0-9a-zA-Z\-]*))*))?(?:\+([0-9a-zA-Z\-]+(?:\.[0-9a-zA-Z\-]+)*))?$/
        ).exec(val) || [
            "", "", "", ""
        ];
        val[4] = val[4] || "";
        return val.slice(1, 4).concat(val[4].split("."));
    });
    ii = -1;
    len = Math.max(aa.length, bb.length);
    while (true) {
        ii += 1;
        if (ii >= len) {
            return 0;
        }
        aa[ii] = aa[ii] || "";
        bb[ii] = bb[ii] || "";
        if (ii === 3 && aa[ii] !== bb[ii]) {
            // 1.2.3 > 1.2.3-alpha
            if (!aa[ii]) {
                return 1;
            }
            // 1.2.3-alpha < 1.2.3
            if (!bb[ii]) {
                return -1;
            }
        }
        if (aa[ii] !== bb[ii]) {
            aa = aa[ii];
            bb = bb[ii];
            return (
                Number(aa) < Number(bb)
                ? -1
                : Number(aa) > Number(bb)
                ? 1
                : aa < bb
                ? -1
                : 1
            );
        }
    }
};

local.stringHtmlSafe = function (str) {
/*
 * this function will make <str> html-safe
 * https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html
 */
    return str.replace((
        /&/g
    ), "&amp;").replace((
        /"/g
    ), "&quot;").replace((
        /'"'"'/g
    ), "&apos;").replace((
        /</g
    ), "&lt;").replace((
        />/g
    ), "&gt;").replace((
        /&amp;(amp;|apos;|gt;|lt;|quot;)/ig
    ), "&$1");
};

local.stringMerge = function (str1, str2, rgx) {
/*
 * this function will merge <str2> into <str1>,
 * for sections where both match <rgx>
 */
    str2.replace(rgx, function (match2) {
        str1.replace(rgx, function (match1) {
            str1 = str1.replace(match1, function () {
                return match2;
            });
            return "";
        });
        return "";
    });
    return str1;
};

local.templateRenderMyApp = function (template, opt) {
/*
 * this function will render my-app-lite template with given <opt>.packageJson
 */
    opt.packageJson = local.fsReadFileOrEmptyStringSync("package.json", "json");
    local.objectSetDefault(opt.packageJson, {
        nameLib: opt.packageJson.name.replace((
            /\W/g
        ), "_"),
        repository: {
            url: (
                "https://github.com/kaizhu256/node-"
                + opt.packageJson.name
                + ".git"
            )
        }
    }, 2);
    opt.githubRepo = opt.packageJson.repository.url.replace((
        /\.git$/
    ), "").split("/").slice(-2);
    template = template.replace((
        /kaizhu256(\.github\.io\/|%252F|\/)/g
    ), opt.githubRepo[0] + ("$1"));
    template = template.replace((
        /node-my-app-lite/g
    ), opt.githubRepo[1]);
    template = template.replace((
        /\bh1-my-app\b/g
    ), (
        opt.packageJson.nameHeroku
        || ("h1-" + opt.packageJson.nameLib.replace((
            /_/g
        ), "-"))
    ));
    template = template.replace((
        /my-app-lite/g
    ), opt.packageJson.name);
    template = template.replace((
        /my_app/g
    ), opt.packageJson.nameLib);
    template = template.replace((
        /\{\{packageJson\.(\S+)\}\}/g
    ), function (ignore, match1) {
        return opt.packageJson[match1];
    });
    return template;
};

local.throwError = function () {
/*
 * this function will throw new err
 */
    throw new Error();
};
}());
}());
'
(set -e
    if [ ! "$1" ]
    then
        exit
    fi
    COMMAND="$1"
    shift
    case "$COMMAND" in
    -*)
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
        if [ "$#" != 0 ]
        then
            FILE="$1"
            shift
        else
            export npm_config_mode_start=1
            FILE="$npm_config_dir_utility2/test.js"
        fi
        export npm_config_mode_auto_restart=1
        shRun shIstanbulCover "$FILE"
        ;;
    test)
        shBuildInit
        shRunWithScreenshotTxt shNpmTest "$@"
        ;;
    utility2.*)
        shBuildInit
        lib.utility2.js "$COMMAND" "$@"
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
)
