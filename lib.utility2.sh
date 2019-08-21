#!/bin/sh
# jslint utility2:true

# POSIX test utility
# http://pubs.opengroup.org/onlinepubs/9699919799/utilities/test.html

# useful sh one-liners
# http://sed.sourceforge.net/sed1line.txt
# git config --global diff.algorithm histogram
# git fetch origin alpha beta master --tags
# git ls-remote --heads origin
# shCryptoWithGithubOrg aa shTravisRepoCreate aa/node-aa-bb
# shCryptoWithGithubOrg aa shGithubApiRateLimitGet
# shCryptoWithGithubOrg aa shGithubRepoTouch aa/bb "touch" alpha
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
"https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/$FILE" \
            || return "$?"
    done
    # backup .bashrc
    if [ -f "$HOME/.bashrc" ] && [ ! -f "$HOME/.bashrc.00" ]
    then
        cp "$HOME/.bashrc" "$HOME/.bashrc.00" || return "$?"
    fi
    # create .bashrc
    printf '. "$HOME/lib.utility2.sh" && shBaseInit\n' > "$HOME/.bashrc" || return "$?"
    # init .ssh/authorized_keys.root
    if [ -f "$HOME/.ssh/authorized_keys.root" ]
    then
        mv "$HOME/.ssh/authorized_keys.root" "$HOME/.ssh/authorized_keys" || return "$?"
    fi
    # source .bashrc
    . "$HOME/.bashrc" || return "$?"
}

shBaseInstallLinode () {(set -e
# this function will base-install a linode debian-box
    if ! (node --version > /dev/null 2>&1)
    then
# install nodejs
# https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
(set -e; \
    export DEBIAN_FRONTEND=noninteractive; \
    apt-get update; \
    apt-get install --no-install-recommends -y \
        apt-utils \
        busybox \
        ca-certificates \
        curl \
        git \
        gnupg; \
    (busybox --list | xargs -n1 /bin/sh -c 'ln -s /bin/busybox /bin/$0 2>/dev/null' || true); \
    curl -#L https://deb.nodesource.com/setup_8.x | /bin/bash -; \
    apt-get install -y nodejs; \
    (cd /usr/lib && npm install sqlite3@3); \
)
    fi
    # install docker
    if [ ! -f /etc/apt/sources.list.d/docker.list ]
    then
        printf 'deb https://apt.dockerproject.org/repo debian-stretch main' > \
            /etc/apt/sources.list.d/docker.list
        wget -qO - https://apt.dockerproject.org/gpg | apt-key add -
        export DEBIAN_FRONTEND=noninteractive
        apt-get update
        apt-get install -y docker-engine=1.13.1-0~debian-stretch
        cp -a /var/lib/docker /var.lib.docker.00
    fi
    # install extra
    if ! (aptitude --version > /dev/null 2>&1)
    then
        export DEBIAN_FRONTEND=noninteractive
        apt-get update
        apt-get install --no-install-recommends -y \
            aptitude \
            net-tools \
            screen
    fi
    # reset iptables
    shIptablesReset
    # cleanup
    apt-get clean
    rm -fr /var/cache/* /var/tmp/*
    # mount /mnt/data
    if [ -b /dev/sdc ] && ! (grep -q -E '/mnt/data' /etc/fstab)
    then
        printf '
/dev/sdc /mnt/data ext4 defaults,noatime 0 0
/mnt/data/root /root none bind
/mnt/data/tmp /tmp none bind
/mnt/data/var.lib.docker /var/lib/docker none bind
' >> /etc/fstab
        mkdir -p /mnt/data && mount /mnt/data
        mkdir -p \
            /mnt/data/root /root \
            /mnt/data/root/.ssh \
            /mnt/data/root/docker \
            /mnt/data/tmp /tmp \
            /mnt/data/var.lib.docker /var/lib/docker \
            /mnt/old
        chmod 700 /mnt/data/root/.ssh
        touch /mnt/data/root/.ssh/authorized_keys
        chmod 600 /mnt/data/root/.ssh/authorized_keys
        chmod 1777 /mnt/data/tmp
        if [ -d /var.lib.docker.00/volumes ] && [ ! -d /mnt/data/var.lib.docker/volumes ]
        then
            cp -a /var.lib.docker.00 /mnt/data/var.lib.docker
        fi
        ln -fs /tmp /mnt/data/root/tmp
        ln -fs /mnt/data/var.lib.docker /mnt/data/root/var.lib.docker
        /etc/init.d/docker stop
        mount -a
        /etc/init.d/docker start
        # shBaseInstall
        curl -o "$HOME/lib.utility2.sh" https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/lib.utility2.sh && . "$HOME/lib.utility2.sh" && shBaseInstall
    fi
)}

shBrowserScreenshot () {(set -e
# this function will run headless-chromium to screenshot url "$1"
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
var opt;
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
    "--disable-gpu",
    "--headless",
    "--incognito",
    "--screenshot",
    "--timeout=30000",
    //!! "--window-size=1024,768",
    //!! "--gl-composited-overlay-candidate-quad-border",
    //!! "--show-composited-layer-borders",
    //!! "--show-mac-overlay-borders",
    //!! "--show-paint-rects",
    //!! "--ui-show-composited-layer-borders",
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
require("child_process").spawn(opt.command, opt.argList.concat("--dump-dom"), {
    stdio: [
        "ignore", "pipe", 2
    ]
}).stdout.pipe(require("fs").createWriteStream(opt.file.replace((
    /\.png$/
), ".html")));
}());
' "$1" "$2"
)}

shBrowserTest () {(set -e
# this function will spawn an electron process to test given url $LIST,
# and merge the test-report into the existing test-report
    LIST="$1"
    export modeBrowserTest="$2"
    shBuildInit
    export MODE_BUILD="${MODE_BUILD:-browserTest}"
    shBuildPrint "shBrowserTest $*"
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
            curl -Lfs -O "https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/$FILE"
        fi
    done
    # create file package.json
    shFileJsonNormalize package.json "{
    \"description\": \"the greatest app in the world!\",
    \"main\": \"lib.$npm_package_nameLib.js\",
    \"name\": \"$npm_package_name\",
    \"scripts\": {
        \"test\": \"\$PWD/npm_scripts.sh\"
    },
    \"version\": \"0.0.1\"
}"
    # create files README.md, lib.$npm_package.nameLib.js, test.js
    node -e '
/* jslint utility2:true */
(function (local) {
"use strict";
var tmp;
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
        shFileCustomizeFromToRgx "$npm_config_dir_utility2/.travis.yml" ".travis.yml" \
            '\n    - secure: .*? # CRYPTO_AES_KEY\n'
    fi
    # update npm_scripts.sh
    shFileCustomizeFromToRgx "$npm_config_dir_utility2/npm_scripts.sh" "npm_scripts.sh" \
        '\n    # run command - custom\n[\S\s]*?\n    esac\n' \
        '\n\)\}\n[\S\s]*?\n# run command\n'
    # hardlink .gitignore
    if [ -f "$npm_config_dir_utility2/.travis.yml" ]
    then
        ln -f "$npm_config_dir_utility2/.gitignore" .
    fi
    # hardlink assets.utility2.rollup.js
    if [ -f "assets.utility2.rollup.js" ] &&
            [ -f "$npm_config_dir_utility2/tmp/build/app/assets.utility2.rollup.js" ]
    then
        ln -f "$npm_config_dir_utility2/tmp/build/app/assets.utility2.rollup.js" .
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
                "$(shGithubRepoBranchId $(printf "$CI_COMMIT_MESSAGE_META" | sed -e "s/.* //"))" \
                "$(printf "$CI_COMMIT_MESSAGE" | sed -e "s/\[[^]]*\] //")"
            shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" -f HEAD:alpha
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
            rm -fr "$npm_config_dir_utility2"
            git clone https://github.com/kaizhu256/node-utility2 "$npm_config_dir_utility2" \
                --branch=alpha --single-branch --depth=50
            mkdir -p "$npm_config_dir_utility2/tmp/build/app"
            curl -Lfs https://raw.githubusercontent.com\
/kaizhu256/node-utility2/gh-pages/build..alpha..travis-ci.org/app/assets.utility2.rollup.js > \
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
            eval "$(printf "$CI_COMMIT_MESSAGE_META" | sed -e "s/debug/shSsh5022R/")"
            PID="$(pgrep -n -f ssh)"
            while (kill -0 "$PID" 2>/dev/null)
            do
                shSleep 60
            done
            ;;
        # example usage:
        # shCryptoWithGithubOrg kaizhu256 shGithubRepoTouch kaizhu256/node-swgg-github-misc "[git push origin beta:master]" task
        "[git push origin "*)
            git fetch --depth=50 origin "$(printf "$CI_COMMIT_MESSAGE_META" | sed \
                -e "s/:.*//" -e "s/.* //")"
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
        "[npm publishAfterCommit]"*)
            export CI_BRANCH=publish
            export CI_BRANCH_OLD=publish
            find node_modules -name .git -print0 | xargs -0 rm -fr
            npm run build-ci
            ;;
        "[npm publishAfterCommitAfterBuild]"*)
            # increment $npm_package_version
            shFilePackageJsonVersionUpdate today publishedIncrement
            # update file touch.txt
            printf "$(shDateIso)\n" > .touch.txt
            git add -f .touch.txt
            # git commit and push
            git add .
            git rm --cached -f .travis.yml
            git commit -am "[npm publishAfterCommit]"
            shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" \
                -f HEAD:alpha
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
        shGitCommandWithGithubToken push \
            "https://github.com/$GITHUB_REPO" \
            "$npm_package_version" || true
        ;;
    publish)
        if (grep -q -E '    shNpmTestPublished' README.md)
        then
            # init .npmrc
            printf "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > "$HOME/.npmrc"
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
            shGitSquashPop HEAD~1 "[ci skip] [npm published \
$(node -e 'process.stdout.write(require("./package.json").version)')]"
            shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" \
                -f HEAD:alpha
            shSleep 5
            shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" \
                -f HEAD:alpha
            ;;
        *)
            shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" \
                HEAD:beta
            ;;
        esac
        ;;
    esac
    # sync with $npm_package_githubRepoAlias
    if [ "$CI_BRANCH" = alpha ] \
        || [ "$CI_BRANCH" = beta ] \
        || [ "$CI_BRANCH" = master ]
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
    export npm_config_file_test_report_merge="$npm_config_dir_build/test-report.json"



    # npm-test
    (
    shEnvSanitize
    export MODE_BUILD=npmTest
    shBuildPrint "$(du -ms node_modules | awk '{print "npm install - " $1 " megabytes"}')"
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
    FILE="$(find "$npm_config_dir_build" -name *.js.html 2>/dev/null \
        | tail -n 1)"
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
    shGitInfo | head -n 4096 || true
    # validate http-links embedded in README.md
    if [ ! "$npm_package_private" ] &&
        ! (printf "$CI_COMMIT_MESSAGE_META" \
            | grep -q -E "^npm publishAfterCommitAfterBuild")
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
        shGitSquashShift "$(($COMMIT_LIMIT / 2))"
    fi
    shGitCommandWithGithubToken push "$URL" -f HEAD:gh-pages
    if [ "$CI_BRANCH" = alpha ] && [ "$npm_package_description" ]
    then
        shGithubRepoDescriptionUpdate "$GITHUB_REPO" "$npm_package_description" || true
    fi
)}

shBuildInit () {
# this function will init the env
    # init $CHROME_BIN
    CHROME_BIN="${CHROME_BIN:-$(which chromium-browser 2>/dev/null)}" || true
    CHROME_BIN="${CHROME_BIN:-$(which google-chrome-stable 2>/dev/null)}" \
        || true
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
    # init $npm_config_dir_electron
    if [ ! "$npm_config_dir_electron" ]
    then
        if [ -f lib.electron.js ]
        then
            export npm_config_dir_electron="$PWD"
        elif [ -f "$HOME/Documents/electron-lite/lib.electron.js" ]
        then
            export npm_config_dir_electron="$HOME/Documents/electron-lite"
        fi
        export npm_config_dir_electron="${npm_config_dir_electron:-\
$(shModuleDirname electron-lite)}" || return "$?"
        export npm_config_dir_electron="${npm_config_dir_electron:-\
$HOME/node_modules/electron-lite}" || return "$?"
        export PATH="$PATH\
:$npm_config_dir_electron:$npm_config_dir_electron/../.bin" || return "$?"
    fi
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
var packageJson;
var value;
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
    export npm_config_dir_build="${npm_config_dir_build:-$PWD/tmp/build}" || return "$?"
    mkdir -p "$npm_config_dir_build/coverage.html" || return "$?"
    export npm_config_dir_tmp="$PWD/tmp" || return "$?"
    mkdir -p "$npm_config_dir_tmp" || return "$?"
    export npm_config_file_tmp="${npm_config_file_tmp:-$PWD/tmp/tmpfile}" || return "$?"
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
        match0.trimRight() + "\n"
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
    rm -fr tmp
    # cleanup build
    shDockerBuildCleanup
)}

shBuildPrint () {(set -e
# this function will print debug info about the build state
    printf '%b' "\n\x1b[35m[MODE_BUILD=$MODE_BUILD]\x1b[0m - $(shDateIso) - $*\n\n" 1>&2
)}

shChromeSocks5 () {(set -e
# this function will run chrome with socks5 proxy
# https://sites.google.com/a/chromium.org/dev/developers/design-documents/network-stack/socks-proxy
    if [ "$1" = "canary" ]
    then
        /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary\
            --proxy-bypass-list="127.*;192.*;localhost"\
            --proxy-server="socks5://localhost:5080"\
            --host-resolver-rules="MAP * 0.0.0.0, EXCLUDE localhost" "$@" || return "$?"
    else
        /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome\
            --proxy-bypass-list="127.*;192.*;localhost"\
            --proxy-server="socks5://localhost:5080"\
            --host-resolver-rules="MAP * 0.0.0.0, EXCLUDE localhost" "$@" || return "$?"
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
var chunkList;
chunkList = [];
process.stdin.on("data", function (chunk) {
    chunkList.push(chunk);
});
process.stdin.on("end", function () {
    local.cryptoAesXxxCbcRawDecrypt({
        data: (
            // ternary-operator
            process.argv[2] === "base64"
            ? Buffer.concat(chunkList).toString()
            : Buffer.concat(chunkList)
        ),
        key: process.argv[1],
        mode: process.argv[2]
    }, function (err, data) {
        local.assertThrow(!err, err);
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
var chunkList;
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
        local.assertThrow(!err, err);
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
    # decrypt CRYPTO_AES_SH_ENCRYPTED_$GITHUB_ORG
    URL="https://raw.githubusercontent.com\
/kaizhu256/node-utility2/gh-pages/CRYPTO_AES_SH_ENCRYPTED_$GITHUB_ORG"
    shBuildPrint "decrypting $URL ..."
    printf "${1:-"$(curl -#Lf "$URL")"}" \
        | shCryptoAesXxxCbcRawDecrypt "$CRYPTO_AES_KEY" base64
)}

shCryptoTravisEncrypt () {(set -e
# this function will encrypt $CRYPTO_AES_SH_ENCRYPTED to .travis.yml,
# and use $CRYPTO_AES_KEY to encrypt $FILE to stdout
    shBuildInit
    export MODE_BUILD=cryptoTravisEncrypt
    FILE="${1:-$HOME/.ssh/CRYPTO_AES_SH_DECRYPTED_$GITHUB_ORG}"
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
    if [ ! "$1" ] && [ -f .travis.yml ]
    then
        TMPFILE="$(mktemp)"
        URL="https://api.${TRAVIS_DOMAIN:-travis-ci.org}/repos/$GITHUB_REPO/key"
        shBuildPrint "fetch $URL"
        curl -#Lf -H "Authorization: token $TRAVIS_ACCESS_TOKEN" "$URL" \
            | sed -n -e \
"s/.*-----BEGIN [RSA ]*PUBLIC KEY-----\(.*\)-----END [RSA ]*PUBLIC KEY-----.*/\
-----BEGIN PUBLIC KEY-----\\1-----END PUBLIC KEY-----/" \
            -e "s/\\\\n/%/gp" \
            | tr "%" "\n" > "$TMPFILE"
        CRYPTO_AES_KEY_ENCRYPTED="$(printf "CRYPTO_AES_KEY=$CRYPTO_AES_KEY" \
            | openssl rsautl -encrypt -pubin -inkey "$TMPFILE" \
            | base64 \
            | tr -d "\n")"
        rm "$TMPFILE"
        if [ ! "$CRYPTO_AES_KEY_ENCRYPTED" ]
        then
            shBuildPrint "no CRYPTO_AES_KEY_ENCRYPTED"
        else
            sed -in \
                -e "s|\(- secure: \).*\( # CRYPTO_AES_KEY$\)|\\1$CRYPTO_AES_KEY_ENCRYPTED\\2|" \
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
    . "$HOME/.ssh/CRYPTO_AES_SH_DECRYPTED_$GITHUB_ORG"
    "$@"
)}

shDateIso () {(set -e
# this function will print the current date in ISO format with given offset $1 in ms
    node -e 'console.log(new Date(Date.now() + Number(process.argv[1])).toISOString())' "$1"
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
    export TEST_URL="https://$(printf "$GITHUB_REPO" \
        | sed -e "s/\//.github.io\//")/build..$CI_BRANCH..travis-ci.org/app"
    shBuildPrint "deployed to $TEST_URL"
    # verify deployed app''s main-page returns status-code < 400
    shSleep 15
    if [ "$(curl --connect-timeout 60 -Ls -o /dev/null -w "%{http_code}" "$TEST_URL")" -lt 400 ]
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
        shBrowserTest "$TEST_URL?modeTest=1&timeExit={{timeExit}}" test
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
    # verify deployed app''s main-page returns status-code < 400
    shSleep 15
    if [ "$(curl --connect-timeout 60 -Ls -o /dev/null -w "%{http_code}" "$TEST_URL")" -lt 400 ]
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
        shBrowserTest "$TEST_URL?modeTest=1&timeExit={{timeExit}}" test
)}

shDiffRaw () {(set -e
# this function will diff-compare raw.xxx.js -> lib.xxx.js
    diff -u "$(printf "$1" | sed -e "s/lib/raw/")" "$1" > /tmp/shDiffRaw.diff || true
    vim -R /tmp/shDiffRaw.diff
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

shDockerLogs () {(set -e
# this function log the  $1
    docker logs --tail=256 -f "$1"
)}

shDockerMssqlcommand () {(set -e
# this function will restart the docker-container mssql
# http://transmission:transmission@127.0.0.1:9091
    case "$(uname)" in
    Linux)
        LOCALHOST="${LOCALHOST:-127.0.0.1}"
        ;;
    *)
        LOCALHOST="${LOCALHOST:-192.168.99.100}"
        ;;
    esac
    sqlcmd \
        -S "$LOCALHOST,1433" \
        -P "${SA_PASSWORD:-yourStrong(\!)Passw0rd}" \
        -U SA
)}

shDockerNpmRestart () {(set -e
# this function will npm-restart the app
# inside the docker-container $IMAGE:$NAME
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
# this function will restart the docker-container elasticsearch
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

shDockerRestartMssql () {(set -e
# this function will restart the docker-container mssql
# http://transmission:transmission@127.0.0.1:9091
    case "$(uname)" in
    Linux)
        LOCALHOST="${LOCALHOST:-127.0.0.1}"
        ;;
    *)
        LOCALHOST="${LOCALHOST:-192.168.99.100}"
        ;;
    esac
    docker rm -fv mssql || true
    mkdir -p "$HOME/docker/mssql.data"
    docker run --name mssql -d \
        -e "ACCEPT_EULA=Y" \
        -e "SA_PASSWORD=${SA_PASSWORD:-yourStrong(\!)Passw0rd}" \
        -p "$LOCALHOST:1433:1433" \
        -v "$HOME/docker/mssql.data:/var/opt/mssql" \
        mcr.microsoft.com/mssql/server:2017-latest
)}

shDockerRestartNginx () {(set -e
# this function will restart the docker-container nginx
    # init htpasswd
    # printf "aa:$(openssl passwd -crypt bb)\n" > "$HOME/docker/etc.nginx.htpasswd.private"
    # printf "aa:$(openssl passwd -crypt bb)\n" > "$HOME/docker/etc.nginx.htpasswd.share"
    for FILE in private share
    do
        FILE="$HOME/docker/etc.nginx.htpasswd.$FILE"
        if [ ! -f "$FILE" ]
        then
            printf "aa:openssl passwd -crypt $(cat /dev/urandom | head --bytes 8)\n" > "$FILE"
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
# this function will start the docker-container $IMAGE:$NAME with the command "$@"
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
    du -md1 "$1" | sort -nr
)}

shEnvSanitize () {
# this function will unset the password-env, e.g.
# (export CRYPTO_AES_SH=abcd1234; shEnvSanitize; printf "$CRYPTO_AES_SH\n")
# undefined
    eval "$(node -e '
/* jslint utility2:true */
(function () {
"use strict";
console.log(Object.keys(process.env).sort().map(function (key) {
    return (
        // ternary-operator
        ((
            /(?:\b|_)(?:crypt|decrypt|key|pass|private|secret|token)/i
        ).test(key) || (
            // ternary-operator
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
# this function will customize a segment of file $2 with a segment of file $1, with given rgx
    node -e "$UTILITY2_MACRO_JS"'
/* jslint utility2:true */
(function (local) {
"use strict";
var dataFrom;
var dataTo;
dataFrom = require("fs").readFileSync(process.argv[2], "utf8");
dataTo = require("fs").readFileSync(process.argv[1], "utf8");
process.argv.slice(3).forEach(function (rgx) {
    dataTo = local.stringMerge(dataTo, dataFrom, new RegExp(rgx));
});
require("fs").writeFileSync(process.argv[2], dataTo);
}(globalThis.globalLocal));
' "$@"
)}

shFileJsonNormalize () {(set -e
# this function will
# 1. read the json-data from file $1
# 2. normalize the json-data
# 3. write the normalized json-data back to file $1
    node -e "$UTILITY2_MACRO_JS"'
/* jslint utility2:true */
(function (local) {
"use strict";
console.error("shFileJsonNormalize " + process.argv[1]);
var tmp;
tmp = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8").trim());
if (process.argv[2]) {
    local.objectSetDefault(tmp, JSON.parse(process.argv[2]), Infinity);
}
if (process.argv[3]) {
    local.objectSetOverride(tmp, JSON.parse(process.argv[3]), Infinity);
}
require("fs").writeFileSync(
    process.argv[1],
    local.jsonStringifyOrdered(tmp, null, 4) + "\n"
);
}(globalThis.globalLocal));
' "$@"
)}

shFilePackageJsonVersionUpdate () {(set -e
# this function will increment the package.json version before npm-publish
    node -e "$UTILITY2_MACRO_JS"'
/* jslint utility2:true */
(function (local) {
"use strict";
var aa;
var bb;
var packageJson;
packageJson = require("./package.json");
aa = (process.argv[1] || packageJson.version).replace((
    /^today$/
), new Date().toISOString().replace((
    /T.*?$/
), "").replace((
    /-0?/g
), "."));
bb = (process.argv[2] || "0.0.0").replace((
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
console.error("shFilePackageJsonVersionUpdate - " + packageJson.version);
}(globalThis.globalLocal));
' "$1" "$([ "$2" = publishedIncrement ] && npm info "" version 2>/dev/null)"
)}

shFileTrimLeft () {(set -e
# this function will remove all leading blank-lines from top of file $1
# http://stackoverflow.com/questions/1935081/remove-leading-whitespace-from-file
    sed -in -e '/./,$!d' "$1"
    rm -f "$1"n
)}

shGitAddTee () {(set -e
# this function will run "git add ." and "$@ 2>&1 | tee -a ..."
    git add .
    printf "\n\n\n\n$(shDateIso) - shGitAddTee\n\n" 2>&1 | tee -a /tmp/shGitAddTee.diff
    "$@" 2>&1 | tee -a /tmp/shGitAddTee.diff
    git diff 2>&1 | tee -a /tmp/shGitAddTee.diff
    git status 2>&1 | tee -a /tmp/shGitAddTee.diff
)}

shGitBranchPush () {(set -e
# this function will run "git push ./origin $COMMIT:$BRANCH"
    COMMIT="$(printf "$1" | sed -e "s/:.*//")"
    BRANCH="$(printf "$1" | sed -e "s/.*://")"
    shift
    # git push ./origin :$BRANCH
    if [ ! "$COMMIT" ]
    then
        if (git show-ref "$BRANCH" --heads --tags 2>&1 > /dev/null)
        then
            shGitCommandWithGithubToken push . ":$BRANCH"
        fi
        shGitCommandWithGithubToken push origin ":$BRANCH"
        return
    fi
    if ! (git show-ref "$COMMIT" --heads --tags 2>&1 > /dev/null)
    then
        shBuildPrint "commit does not exist - $COMMIT"
        return 1
    fi
    # git tag $BRANCH $COMMIT
    if (git show-ref "$COMMIT" --tags 2>&1 > /dev/null) ||
        (git show-ref "$BRANCH" --tags 2>&1 > /dev/null)
    then
        shGitCommandWithGithubToken tag "$BRANCH" "$COMMIT" "$@"
    # git push . $COMMIT:$BRANCH
    elif (git show-ref "$BRANCH" --heads 2>&1 > /dev/null)
    then
        shGitCommandWithGithubToken push . "$COMMIT:$BRANCH" "$@"
    # git push . $BRANCH
    else
        shGitCommandWithGithubToken push . "HEAD:$BRANCH"
        shGitCommandWithGithubToken push . "$COMMIT:$BRANCH" -f
    fi
    # git push origin $BRANCH
    shGitCommandWithGithubToken push origin "$BRANCH" "$@"
)}

shGitBranchRename () {(set -e
# this function will rename in . and origin, $BRANCH1 -> $BRANCH2
    BRANCH1="$(printf "$1" | sed -e "s/:.*//")"
    BRANCH2="$(printf "$1" | sed -e "s/.*://")"
    if [ "$BRANCH1" ]
    then
        shGitBranchPush "$BRANCH1:$BRANCH2" -f
    fi
    shGitBranchPush ":$BRANCH1"
)}

shGitCommandWithGithubToken () {(set -e
# this function will run the git-command using $GITHUB_TOKEN
# http://stackoverflow.com/questions/18027115/committing-via-travis-ci-failing
    export MODE_BUILD="${MODE_BUILD:-shGitCommandWithGithubToken}"
    # security - filter basic-auth
    shBuildPrint "$(printf "shGitCommandWithGithubToken $*" | sed -e "s/:\/\/[^@]*@/:\/\/...@/")"
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

shGitGc () {(set -e
# this function will gc unreachable .git objects
# http://stackoverflow.com/questions/3797907/how-to-remove-unused-objects-from-a-git-repository
    # git remote rm origin || true
    # git branch -D in || true
    # (cd .git && rm -fr refs/remotes/ refs/original/ *_HEAD logs/) || return "$?"
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
var dict;
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
    git cherry-pick -X theirs --allow-empty --strategy=recursive "$BRANCH~$RANGE..$BRANCH"
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
    curl -Lfs "$1" | grep -m 1 -o -E "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z"
)}

shGithubRepoBranchId () {(set -e
# this function will print the $COMMIT_ID for $GITHUB_REPO:#$BRANCH
    BRANCH="$1"
    curl -H "user-agent: undefined" -Lfs \
"https://api.github.com/repos\
/$GITHUB_REPO/commits?access_token=$GITHUB_TOKEN&sha=$BRANCH" \
        | sed -e 's/^\[{"sha":"//' -e 's/".*//'
)}

shGithubRepoCreate () {(set -e
# this function will create the base github-repo https://github.com/$GITHUB_REPO
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
    rm -fr "/tmp/githubRepo/$GITHUB_REPO"
    mkdir -p "/tmp/githubRepo/$(printf "$GITHUB_REPO" | sed -e "s/\/.*//")"
    cp -a /tmp/githubRepo/kaizhu256/base "/tmp/githubRepo/$GITHUB_REPO"
    cd "/tmp/githubRepo/$GITHUB_REPO"
    curl -Lfs \
https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/.gitconfig \
        | sed -e "s|kaizhu256/node-utility2|$GITHUB_REPO|" > .git/config
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
    shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" beta \
        || true
    # push all branches
    shGitCommandWithGithubToken push "https://github.com/$GITHUB_REPO" --all \
        || true
)}

shGithubRepoDescriptionUpdate () {(set -e
# this function will update the github-repo''s description
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
/\\.|(\\b|_)(\\.\\d|\
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
    find "$DIR" -type f \
        | grep -v -E "$FILE_FILTER" \
        | tr "\n" "\000" \
        | xargs -0 grep -HIn -E "$REGEXP" "$@" || true
    find "$DIR" -name .travis.yml \
        | tr "\n" "\000" \
        | xargs -0 grep -HIn -E "$REGEXP" "$@" || true
)}

shGrepReplace () {(set -e
# this function will save the grep-and-replace lines in file $1
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
var dict;
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
var processCwd;
processCwd = process.cwd() + (
    process.platform === "win32"
    ? "\\"
    : "/"
);
process.env.PORT = process.env.PORT || "8080";
console.error("http-file-server listening on port " + process.env.PORT);
require("http").createServer(function (req, res) {
    var file;
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

shIptablesReset () {(set -e
# this function will reset iptables
    if ! (iptables-restore /etc/iptables/rules.v4.00 > /dev/null 2>&1)
    then
        export DEBIAN_FRONTEND=noninteractive
        apt-get update
        apt-get install --no-install-recommends -y iptables-persistent
    fi
    printf '
# https://wiki.debian.org/iptables
*filter

# Allows all loopback (lo0) traffic and drop all traffic to 127/8 that does not use lo0
-A INPUT -i lo -j ACCEPT
-A INPUT ! -i lo -d 127.0.0.0/8 -j REJECT

# Accepts all established inbound connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allows all outbound traffic
# You could modify this to only allow certain traffic
-A OUTPUT -j ACCEPT

# Allows HTTP and HTTPS connections from anywhere (the normal ports for websites)
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT

# Allows SSH connections
# The --dport number is the same as in /etc/ssh/sshd_config
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT
-A INPUT -p tcp -m state --state NEW --dport 5022 -j ACCEPT

# Now you should read up on iptables rules and consider whether ssh access
# for everyone is really desired. Most likely you will only allow access from certain IPs.

# Allow ping
#  note that blocking other types of icmp packets is considered a bad idea by some
#  remove -m icmp --icmp-type 8 from this line to allow all kinds of icmp:
#  https://security.stackexchange.com/questions/22711
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

# log iptables denied calls (access via "dmesg" command)
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7

# allow forwarding between docker0 and eth0
# https://blog.andyet.com/2014/09/11/docker-host-iptables-forwarding
# Forward chain between docker0 and eth0
-A FORWARD -i docker0 -o eth0 -j ACCEPT
-A FORWARD -i eth0 -o docker0 -j ACCEPT

# Reject all other inbound - default deny unless explicitly allowed policy:
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT

*nat
# https://github.com/moby/moby/issues/1871#issuecomment-28139275
:DOCKER - [0:0]
-A PREROUTING -m addrtype --dst-type LOCAL -j DOCKER
-A PREROUTING -m addrtype --dst-type LOCAL ! --dst 127.0.0.0/8 -j DOCKER
COMMIT
' > /etc/iptables/rules.v4.00
    iptables-restore < /etc/iptables/rules.v4.00
    printf '
# disable ipv6
*filter
-A INPUT -j REJECT
-A FORWARD -j DROP
-A OUTPUT -j REJECT
COMMIT
' > /etc/iptables/rules.v6.00
    ip6tables-restore < /etc/iptables/rules.v6.00
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
    if [ "$npm_config_mode_winpty" ] \
        && [ "$MSYSTEM" ] \
        && (winpty --version > /dev/null 2>&1)
    then
        winpty "$NODE_BINARY" "$@"
        return "$?"
    fi
    "$NODE_BINARY" "$@"
)}

shKillallElectron () {(set -e
# this function will killall electron
    killall Electron electron
)}

shListUnflattenAndApply () {(set -e
# this function will unflatten $LIST into $SUB_LIST with given $LENGTH,
# and apply shListUnflattenAndApplyFunction to $SUB_LIST
    LIST="$1"
    LENGTH="${2:-6}"
    II=0
    SUB_LIST=""
    for ELEMENT in $LIST
    do
        SUB_LIST="$SUB_LIST
$ELEMENT"
        II="$((II + 1))"
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
var data;
var ii;
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
                console.error("encrypted file " + match0 + " -> " + match1);
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
        console.error("encrypted file hls.m3u8 -> aa.0001.bin");
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

shMkisofs () {(set -e
# this function will mkisofs .
    mkdir -p tmp
    if [ ! -f .gitginore ]
    then
        touch .gitignore
    fi
    # mkisofs plain-cd
    if [ ! "$2" ]
    then
        mkisofs \
            -J \
            -R \
            -V "$1" \
            -exclude .git \
            -exclude tmp \
            -exclude-list .gitignore \
            -joliet-long \
            -o "tmp/$1.iso" \
            .
        return
    fi
    # mkisofs boot-cd
    cp "$2" "$2.modified"
    mkisofs \
        -J \
        -R \
        -V "$1" \
        -exclude .git \
        -exclude tmp \
        -exclude-list .gitignore \
        -exclude "$2" \
        -joliet-long \
        -o "tmp/$1.iso" \
        -b "$2.modified" \
        -boot-info-table \
        -boot-load-size 4 \
        -no-emul-boot \
        .
    rm "$2.modified"
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
    rm -fr "$DIR" && mkdir -p "$DIR" && cd "$DIR"
    npm install "$NAME" --prefix .
    cd "node_modules/$NAME"
    # update README.md
    printf "$MESSAGE\n" > README.md
    # update package.json
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
var packageJson;
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
    shFilePackageJsonVersionUpdate "" publishedIncrement
    npm publish
    npm deprecate "$NAME" "$MESSAGE"
)}

shNpmInstallTarball () {(set -e
# this function will npm-install the tarball instead of the full module
    NAME="$1"
    mkdir -p "node_modules/$NAME"
    curl -Lfs "$(npm view "$NAME" dist.tarball)" \
        | tar --strip-components 1 -C "node_modules/$NAME" -xzf -
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
var dict;
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
        rm -fr /tmp/node_modules.00
        mv /tmp/node_modules /tmp/node_modules.00
        export PATH="$PATH:/tmp/node_modules.00/.bin"
    fi
    DIR=/tmp/npmPackageDependencyTreeCreate
    rm -fr "$DIR" && mkdir -p "$DIR" && cd "$DIR"
    shBuildInit
    export MODE_BUILD=npmPackageDependencyTree
    shBuildPrint "creating npmDependencyTree ..."
    npm install "${2:-$1}" --prefix . || true
    shRunWithScreenshotTxtAfter () {(set -e
        du -ms "$DIR" \
            | awk '{print "npm install - " $1 " megabytes\n\nnode_modules"}' \
            > "$npm_config_file_tmp"
        grep -E '^ *[│└├]' "$npm_config_dir_tmp/runWithScreenshotTxt" \
            >> "$npm_config_file_tmp"
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
    cd "$1"
    NAME="$2"
    VERSION="$3"
    export MODE_BUILD=npmPublishAlias
    shBuildPrint "npm-publish alias $NAME"
    DIR=/tmp/npmPublishAlias
    rm -fr "$DIR" && mkdir -p "$DIR"
    # clean-copy . to $DIR
    git ls-tree --name-only -r HEAD | xargs tar -czf - | tar -C "$DIR" -xvzf -
    cd "$DIR"
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
var name;
var packageJson;
var version;
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
    if [ "$TRAVIS" ] && ([ ! "$NPM_TOKEN" ] ||
        ([ "$CI_BRANCH" = alpha ] && (printf "$CI_COMMIT_MESSAGE" | grep -q -E "^\[npm publish")))
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

shPasswordRandom () {(set -e
# this function will create a random password
    openssl rand -base64 32
)}

shPidByPort () {(set -e
# this function will print the process pid for given port $1
# https://stackoverflow.com/questions/4421633/who-is-listening-on-a-given-tcp-port-on-mac-os-x
# https://unix.stackexchange.com/questions/106561/finding-the-pid-of-the-process-using-a-specific-port
    case "$(uname)" in
    Darwin)
        lsof -n -i:"$1" | grep -E LISTEN
        ;;
    Linux)
        netstat -nlp | grep -E 9000
        ;;
    esac
)}

shRandomIntegerInRange () {(set -e
# this function will print a random number in the interval [$1..$2)
    LC_CTYPE=C tr -cd 0-9 </dev/urandom \
        | head -c 9 \
        | awk "{ printf(\"%s\n\", $1 + (\$0 % ($2 - $1))); }"
)}

shReadmeLinkValidate () {(set -e
# this function will validate http-links embedded in README.md
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
var set;
set = new Set();
require("fs").readFileSync("README.md", "utf8").replace((
    /\b(https?):\/\/.*?[)\]]/g
), function (match0, match1) {
    var req;
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
        rm -fr "$DIR" && mkdir -p "$DIR"
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
        sed -in -e "s|git clone git@github.com:|git clone https://$GITHUB_TOKEN@github.com/|g" \
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
    shSleep 15
    ! shKillallElectron 2>/dev/null
    shBuildPrint "... finished running command 'shReadmeTest $*'"
)}

shReplClient () {(set -e
# this function will connect the repl-client to tcp-port $1
# https://gist.github.com/TooTallNate/2209310
    node -e '
/* jslint utility2:true */
(function () {
"use strict";
var socket;
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
        find . -iname "$NAME" -print0 | xargs -0 rm || true
    done
)}

shRun () {(set -e
# this function will run the command "$@" with auto-restart
    EXIT_CODE=0
    # eval argv
    if [ ! "$npm_config_mode_auto_restart" ] \
        || [ "$npm_config_mode_auto_restart_child" ]
    then
        "$@"
        return "$?"
    fi
    # eval argv and auto-restart on non-zero exit-code, unless exited by SIGINT
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
var result;
var wordwrap;
var yy;
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
}).trimRight().split("\n").map(function (line) {
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

shSsh5022F () {(set -e
# this function will ssh the reverse-tunnel-client
# to the middleman $USER_HOST:5022
# example usage:
# shSsh5022F travis@proxy.com -D 5080
    USER_HOST="$1"
    shift
    ssh-keygen -R "[$(printf "$USER_HOST" | sed -e "s/.*\@//")]:5022" > /dev/null 2>&1 || true
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
    ssh "$USER_REMOTE@$HOST" -Tf -R 5022:127.0.0.1:22 -o StrictHostKeyChecking=no "
ssh-keygen -R [127.0.0.1]:5022 > /dev/null 2>&1
ssh $USER@127.0.0.1 -p 5022 -L $HOST:5022:127.0.0.1:22 -NTf -o StrictHostKeyChecking=no"
)}

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
        "https://api.${TRAVIS_DOMAIN:-travis-ci.org}/hooks?$1"
)}

shTravisRepoBuildCancel () {(set -e
# this function will cancel the travis-repo build
# https://docs.travis-ci.com/api#builds
    GITHUB_REPO="$1"
    BUILD_ID="$(curl -#Lf "https://api.${TRAVIS_DOMAIN:-travis-ci.org}/repos/$GITHUB_REPO/builds" \
        | grep -o -E "[0-9]{1,}" | head -n 1)"
    curl -H "Authorization: token $TRAVIS_ACCESS_TOKEN" -#Lf -X POST \
        "https://api.${TRAVIS_DOMAIN:-travis-ci.org}/builds/$BUILD_ID/cancel"
)}

shTravisRepoBuildRestart () {(set -e
# this function will restart the travis-repo build
# https://docs.travis-ci.com/api#builds
    GITHUB_REPO="$1"
    BUILD_ID="$(curl -#Lf "https://api.${TRAVIS_DOMAIN:-travis-ci.org}/repos/$GITHUB_REPO/builds" \
        | grep -o -E "[0-9]{1,}" | head -n 1)"
    curl -H "Authorization: token $TRAVIS_ACCESS_TOKEN" -#Lf -X POST \
        "https://api.${TRAVIS_DOMAIN:-travis-ci.org}/builds/$BUILD_ID/restart"
)}

shTravisRepoCreate () {(set -e
# this function will create the travis-repo https://github.com/$GITHUB_REPO
    export GITHUB_REPO="$1"
    export MODE_BUILD="${MODE_BUILD:-shGithubRepoCiCreate}"
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
var onParallel;
var opt;
opt = {};
local.gotoNext(opt, function (err, data) {
    switch (opt.gotoState) {
    case 1:
        opt.shBuildPrintPrefix = (
            "\n\u001b[35m[MODE_BUILD=shCustomOrgRepoCreate]\u001b[0m - "
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
        onParallel.counter += 1;
        onParallel.counter += 1;
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
        onParallel.counter += 1;
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
        onParallel.counter += 1;
        onParallel.counter += 1;
        local.ajax({
            url: (
                "https://raw.githubusercontent.com"
                + "/kaizhu256/node-utility2/alpha/.gitignore"
            )
        }, function (err, xhr) {
            local.assertThrow(!err, err);
            local.fs.writeFile(
                "/tmp/githubRepo/" + process.env.GITHUB_REPO + "/.gitignore",
                xhr.responseText,
                onParallel
            );
        });
        onParallel.counter += 1;
        local.ajax({
            url: (
                "https://raw.githubusercontent.com"
                + "/kaizhu256/node-utility2/alpha/.travis.yml"
            )
        }, function (err, xhr) {
            local.assertThrow(!err, err);
            local.fs.writeFile(
                "/tmp/githubRepo/" + process.env.GITHUB_REPO + "/.travis.yml",
                xhr.responseText,
                onParallel
            );
        });
        onParallel.counter += 1;
        local.fs.open("README.md", "w", function (err, fd) {
            local.assertThrow(!err, err);
            local.fs.close(fd, onParallel);
        });
        onParallel.counter += 1;
        local.fs.writeFile(
            "/tmp/githubRepo/" + process.env.GITHUB_REPO + "/package.json",
            JSON.stringify({
                devDependencies: {
                    "electron-lite":
                    "kaizhu256/node-electron-lite#alpha",
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

shTravisTaskPush () {(set -e
# this function will push the shell-task-script $1 with the message $2 to travis
# example usage:
# shCryptoWithGithubOrg kaizhu256 shTravisTaskPush "$HOME/Documents/sandbox2/.task.sh"
    utility2-github-crud put https://github.com/kaizhu256/node-sandbox2/blob/task/.task.sh \
        "$1" "[\$ /bin/sh .task.sh] $2"
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
    # shBuildApp
    for DIR in $UTILITY2_DEPENDENTS
    do
        if [ -d "$DIR" ] && [ "$DIR" != utility2 ]
        then
            printf "\n\n\n\n$DIR\n\n\n\n"
            (cd "$DIR" && rm -fr node_modules && shBuildApp)
        fi
    done
    shUtility2GitDiff
)}

shUtility2Dependents () {(set -e
# this function will return a list of utility2 dependents
    cd "$HOME/Documents" 2>/dev/null || true
printf "
apidoc-lite
bootstrap-lite
db-lite
electron-lite
github-crud
istanbul-lite
jslint-lite
swagger-ui-lite
swagger-validate-lite
swgg
utility2
"
)}

shUtility2DependentsSync () {(set -e
# this function will sync files between utility2 and its dependents
    CWD="$PWD"
    cd "$HOME/Documents/utility2" && shBuildApp
    cd "$HOME/Documents"
    ln -f "utility2/lib.utility2.sh" "$HOME"
    if [ -d "$HOME/bin" ]
    then
        ln -f "utility2/lib.apidoc.js" "$HOME/bin/utility2-apidoc"
        ln -f "utility2/lib.github_crud.js" "$HOME/bin/utility2-github_crud"
        ln -f "utility2/lib.istanbul.js" "$HOME/bin/utility2-istanbul"
        ln -f "utility2/lib.jslint.js" "$HOME/bin/utility2-jslint"
        ln -f "utility2/lib.utility2.sh" "$HOME/bin/utility2"
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
            ln -f "utility2/lib.$LIB.js" "$DIR"
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

shUtility2GitCommitAndPush () {(set -e
# this function will git-commit and git-push $UTILITY2_DEPENDENTS with given $MESSAGE
    # init $MESSAGE
    MESSAGE="$1"
    for DIR in $UTILITY2_DEPENDENTS
    do
        cd "$HOME/Documents/$DIR" || continue
        printf "\n\n\n\n$PWD\n"
        git commit -am "'$MESSAGE'" || true
        git push || true
    done
)}

shUtility2GitDiffHead () {(set -e
# this function will print the git-status of $UTILITY2_DEPENDENTS to stdout
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
    for DIR in $UTILITY2_DEPENDENTS $(cd "$HOME/Documents"; ls -d swgg-* 2>/dev/null)
    do
        DIR="$HOME/Documents/$DIR"
        if [ -d "$DIR" ]
        then
            shGrep "$DIR" "$@"
        fi
    done
)}

shUtility2GrepTravisYml () {(set -e
# this function will recursively grep .travis.yml in $UTILITY2_DEPENDENTS for the regexp $REGEXP
    REGEXP="$1"
    for DIR in $UTILITY2_DEPENDENTS
    do
        DIR="$HOME/Documents/$DIR"
        if [ -d "$DIR" ]
        then
            grep -HIin -E "$REGEXP" "$DIR/.travis.yml" || true
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

# run main-program
export UTILITY2_GIT_BASE_ID=9fe8c2255f4ac330c86af7f624d381d768304183
export UTILITY2_DEPENDENTS="$(shUtility2Dependents)"
export UTILITY2_MACRO_JS='
/* istanbul instrument in package utility2 */
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    var consoleError;
    var local;
    // init globalThis
    (function () {
        try {
            globalThis = Function("return this")(); // jslint ignore:line
        } catch (ignore) {}
    }());
    globalThis.globalThis = globalThis;
    // init debug_inline
    if (!globalThis["debug\u0049nline"]) {
        consoleError = console.error;
        globalThis["debug\u0049nline"] = function () {
        /*
         * this function will both print <arguments> to stderr
         * and return <arguments>[0]
         */
            var argList;
            argList = Array.from(arguments); // jslint ignore:line
            // debug arguments
            globalThis["debug\u0049nlineArguments"] = argList;
            consoleError("\n\ndebug\u0049nline");
            consoleError.apply(console, argList);
            consoleError("\n");
            // return arg0 for inspection
            return argList[0];
        };
    }
    // init local
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    // init isBrowser
    local.isBrowser = (
        typeof window === "object"
        && window === globalThis
        && typeof window.XMLHttpRequest === "function"
        && window.document
        && typeof window.document.querySelector === "function"
    );
    // init function
    local.assertThrow = function (passed, message) {
    /*
     * this function will throw err.<message> if <passed> is falsy
     */
        var err;
        if (passed) {
            return;
        }
        err = (
            // ternary-operator
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
                : JSON.stringify(message, null, 4)
            )
        );
        throw err;
    };
    local.functionOrNop = function (fnc) {
    /*
     * this function will if <fnc> exists,
     * them return <fnc>,
     * else return <nop>
     */
        return fnc || local.nop;
    };
    local.identity = function (value) {
    /*
     * this function will return <value>
     */
        return value;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (target, source) {
    /*
     * this function will if items from <target> are
     * null, undefined, or empty-string,
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
}(this));



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



local.TextDecoder = globalThis.TextDecoder || function () {
/*
 * this function will polyfill TextDecoder
 */
    return;
};

local.TextDecoder.prototype.decode = (
    local.TextDecoder.prototype.decode || function (bff) {
        /*
         * this function will polyfill TextDecoder.prototype.decode
         */
        return (
            (bff && bff.length)
            ? String(Object.setPrototypeOf(bff, Buffer.prototype))
            : ""
        );
    }
);

globalThis.TextDecoder = local.TextDecoder;

local.TextEncoder = globalThis.TextEncoder || function () {
/*
 * this function will polyfill TextEncoder
 */
    return;
};

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
    var ajaxProgressUpdate;
    var bufferValidateAndCoerce;
    var isDone;
    var local2;
    var onError2;
    var onEvent;
    var stack;
    var streamCleanup;
    var timeout;
    var tmp;
    var xhr;
    var xhrInit;
    // init local2
    local2 = opt.local2 || local.utility2 || {};
    // init function
    ajaxProgressUpdate = local2.ajaxProgressUpdate || local.nop;
    bufferValidateAndCoerce = local2.bufferValidateAndCoerce || function (
        bff,
        mode
    ) {
    /*
     * this function will validate and coerce/convert <bff> -> Buffer
     * (or String if <mode> = "string")
     */
        // coerce ArrayBuffer -> Buffer
        if (Object.prototype.toString.call(bff) === "[object ArrayBuffer]") {
            bff = new Uint8Array(bff);
        }
        // convert Buffer -> utf8
        if (mode === "string" && typeof bff !== "string") {
            bff = String(bff);
        }
        return bff;
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
            // decrement ajaxProgressCounter
            local2.ajaxProgressCounter = Math.max(
                local2.ajaxProgressCounter - 1,
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
                    // ternary-operator
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
                ), function (ignore, match1, match2) {
                    xhr.resHeaders[match1.toLowerCase()] = match2;
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
                }));
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
        var err;
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
        // coerce Uint8Array -> Buffer
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
            var chunkList;
            chunkList = [];
            xhr.resHeaders = resStream.resHeaders || resStream.headers;
            xhr.resStream = resStream;
            xhr.statusCode = resStream.statusCode;
            resStream.dataLength = 0;
            resStream.on("data", function (chunk) {
                chunkList.push(chunk);
            });
            resStream.on("end", function () {
                xhr.response = (
                    local.isBrowser
                    ? chunkList[0]
                    : Buffer.concat(chunkList)
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
    // increment ajaxProgressCounter
    local2.ajaxProgressCounter = local2.ajaxProgressCounter || 0;
    local2.ajaxProgressCounter += 1;
    // init event-handling
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
    local.assertThrow(aa === bb, message || [
        aa, bb
    ]);
};

local.assertJsonNotEqual = function (aa, bb, message) {
/*
 * this function will assert jsonStringifyOrdered(<aa>) !== JSON.stringify(<bb>)
 */
    aa = local.jsonStringifyOrdered(aa);
    bb = JSON.stringify(bb);
    local.assertThrow(aa !== bb, [
        aa
    ], message || aa);
};

local.base64FromBuffer = function (bff) {
/*
 * this function will convert Uint8Array <bff> to base64
 * https://developer.mozilla.org/en-US/Add-ons/Code_snippets/StringView#The_code
 */
    var ii;
    var mod3;
    var text;
    var uint24;
    var uint6ToB64;
    // convert utf8 -> Uint8Array
    if (typeof bff === "string") {
        bff = new TextEncoder().encode(bff);
    }
    bff = bff || [];
    text = "";
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
    while (ii < bff.length) {
        mod3 = ii % 3;
        uint24 |= bff[ii] << (16 >>> mod3 & 24);
        if (mod3 === 2 || bff.length - ii === 1) {
            text += String.fromCharCode(
                uint6ToB64(uint24 >>> 18 & 63),
                uint6ToB64(uint24 >>> 12 & 63),
                uint6ToB64(uint24 >>> 6 & 63),
                uint6ToB64(uint24 & 63)
            );
            uint24 = 0;
        }
        ii += 1;
    }
    return text.replace((
        /A(?=A$|$)/gm
    ), "=");
};

local.base64ToBuffer = function (b64, mode) {
/*
 * this function will convert <b64> to Uint8Array
 * https://gist.github.com/wang-bin/7332335
 */
    var bff;
    var byte;
    var chr;
    var ii;
    var jj;
    var map64;
    var mod4;
    b64 = b64 || "";
    bff = new Uint8Array(b64.length); // 3/4
    byte = 0;
    jj = 0;
    map64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    mod4 = 0;
    ii = 0;
    while (ii < b64.length) {
        chr = map64.indexOf(b64[ii]);
        if (chr >= 0) {
            mod4 %= 4;
            if (mod4 === 0) {
                byte = chr;
            } else {
                byte = byte * 64 + chr;
                bff[jj] = 255 & (byte >> ((-2 * (mod4 + 1)) & 6));
                jj += 1;
            }
            mod4 += 1;
        }
        ii += 1;
    }
    // optimization - create resized-view of bff
    bff = bff.subarray(0, jj);
    return local.bufferValidateAndCoerce(bff, mode);
};

local.base64ToUtf8 = function (b64) {
/*
 * this function will convert <b64> -> utf8
 */
    return local.base64ToBuffer(b64, "string");
};

local.bufferValidateAndCoerce = function (bff, mode) {
/*
 * this function will validate and coerce/convert <bff> -> Buffer
 * (or String if <mode> = "string")
 */
    // validate not 0
    if (bff !== 0) {
        bff = bff || "";
    }
    if (typeof bff === "string" && mode === "string") {
        return bff;
    }
    // convert utf8 -> Uint8Array
    if (typeof bff === "string") {
        bff = (
            local.isBrowser
            ? new TextEncoder().encode(bff)
            : Buffer.from(bff)
        );
    // validate instanceof Uint8Array
    } else if (Object.prototype.toString.call(bff) !== "[object Uint8Array]") {
        throw new Error(
            "bufferValidateAndCoerce - value is not instanceof "
            + "ArrayBuffer, String, or Uint8Array"
        );
    }
    // convert Uint8Array -> utf8
    if (mode === "string") {
        return new TextDecoder().decode(bff);
    }
    // coerce Uint8Array -> Buffer
    if (!local.isBrowser && !Buffer.isBuffer(bff)) {
        Object.setPrototypeOf(bff, Buffer.prototype);
    }
    return bff;
};

local.childProcessSpawnWithTimeout = function (command, args, opt) {
/*
 * this function will run like child_process.spawn,
 * but with auto-timeout after timeout milliseconds
 * example usage:
    var child = local.childProcessSpawnWithTimeout(
        "/bin/sh",
        ["-c", "echo hello world"],
        {stdio: ["ignore", 1, 2], timeout: 5000}
    );
    child.on("error", console.error);
    child.on("exit", function (exitCode) {
        console.error("exitCode " + exitCode);
    });
 */
    var child;
    var child_process;
    var timerTimeout;
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
    mode = null;
    local.cryptoAesXxxCbcRawEncrypt({
        data: data,
        key: key,
        mode: mode
    }, function (err, data) {
        console.assert(!err, err);
        local.cryptoAesXxxCbcRawDecrypt({
            data: data,
            key: key,
            mode: mode
        }, console.log);
    });
 */
    var cipher;
    var crypto;
    var data;
    var ii;
    var iv;
    var key;
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
            onError(null, Buffer.concat([
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
            onError(null, new Uint8Array(data));
        }).catch(onError);
    }).catch(onError);
};

local.cryptoAesXxxCbcRawEncrypt = function (opt, onError) {
/*
 * this function will aes-xxx-cbc encrypt with given <opt>
 * example usage:
    data = new Uint8Array([1,2,3]);
    key = '"'"'0123456789abcdef0123456789abcdef'"'"';
    mode = null;
    local.cryptoAesXxxCbcRawEncrypt({
        data: data,
        key: key,
        mode: mode
    }, function (err, data) {
        console.assert(!err, err);
        local.cryptoAesXxxCbcRawDecrypt({
            data: data,
            key: key,
            mode: mode
        }, console.log);
    });
 */
    var cipher;
    var crypto;
    var data;
    var ii;
    var iv;
    var key;
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
            onError(null, iv);
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
            onError(null, iv);
        }).catch(onError);
    }).catch(onError);
};

local.fsReadFileOrEmptyStringSync = function (file, opt) {
/*
 * this function will try to read file or return empty-string, or
 * if <opt> === "json", then try to JSON.parse file or return null
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

local.fsRmrSync = function (dir) {
/*
 * this function will synchronously "rm -fr" dir
 */
    local.child_process.execFileSync("rm", [
        "-fr", local.path.resolve(process.cwd(), dir)
    ], {
        stdio: [
            "ignore", 1, 2
        ]
    });
};

local.fsWriteFileWithMkdirpSync = function (file, data, mode) {
/*
 * this function will synchronously "mkdir -p" and write <data> to <file>
 */
    try {
        if (
            mode === "noWrite"
            || typeof require("fs").writeFileSync !== "function"
        ) {
            return;
        }
    } catch (ignore) {
        return;
    }
    // try to write to file
    try {
        require("fs").writeFileSync(file, data);
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
        // re-write to file
        require("fs").writeFileSync(file, data);
    }
};

local.gotoNext = function (opt, onError) {
/*
 * this function will wrap onError inside recursive-function <opt>.gotoNext,
 * and append the current-stack to any err
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
                local.assertThrow(null, opt.errCaught);
            }
            opt.errCaught = errCaught;
            opt.gotoNext(errCaught, data, meta);
        }
    });
    return opt;
};

local.isNullOrUndefined = function (arg0) {
/*
 * this function will test if arg0 is null or undefined
 */
    return arg0 === null || arg0 === undefined;
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
    var circularSet;
    var stringify;
    var tmp;
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
        // if obj is an array, then recurse its items
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

local.moduleDirname = function (module, modulePathList) {
/*
 * this function will search modulePathList for the module'"'"'s __dirname
 */
    var result;
    // search process.cwd()
    if (!module || module === "." || module.indexOf("/") >= 0) {
        return require("path").resolve(process.cwd(), module || "");
    }
    // search modulePathList
    [
        "node_modules"
    ].concat(modulePathList).concat(require("module").globalPaths).concat([
        process.env.HOME + "/node_modules", "/usr/local/lib/node_modules"
    ]).some(function (modulePath) {
        try {
            result = require("path").resolve(
                process.cwd(),
                modulePath + "/" + module
            );
            result = require("fs").statSync(result).isDirectory() && result;
            return result;
        } catch (ignore) {
            result = null;
        }
        return result;
    });
    return result || "";
};

local.objectSetDefault = function (dict, defaults, depth) {
/*
 * this function will recursively set defaults for undefined-items in dict
 */
    dict = dict || {};
    defaults = defaults || {};
    Object.keys(defaults).forEach(function (key) {
        var defaults2;
        var dict2;
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
        // if dict2 and defaults2 are both non-null and non-array objects,
        // then recurse with dict2 and defaults2
        if (
            depth > 1
            // dict2 is a non-null and non-array object
            && typeof dict2 === "object" && dict2 && !Array.isArray(dict2)
            // defaults2 is a non-null and non-array object
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
        var dict2;
        var overrides2;
        dict2 = dict[key];
        overrides2 = overrides[key];
        if (overrides2 === undefined) {
            return;
        }
        // if both dict2 and overrides2 are non-null and non-array objects,
        // then recurse with dict2 and overrides2
        if (
            depth > 1
            // dict2 is a non-null and non-array object
            && typeof dict2 === "object" && dict2 && !Array.isArray(dict2)
            // overrides2 is a non-null and non-array object
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
 * this function will create wrapper around <onError>
 * that will append current-stack to err.stack
 */
    var onError2;
    var stack;
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
 * 2. if counter === 0 or err occurred, then call onError(err)
 */
    var onParallel;
    onError = local.onErrorWithStack(onError);
    onEach = onEach || local.nop;
    onRetry = onRetry || local.nop;
    onParallel = function (err, data) {
        if (onRetry(err, data)) {
            return;
        }
        // decrement counter
        onParallel.counter -= 1;
        // validate counter
        if (!(onParallel.counter >= 0 || err || onParallel.err)) {
            err = new Error(
                "invalid onParallel.counter = " + onParallel.counter
            );
        // ensure onError is run only once
        } else if (onParallel.counter < 0) {
            return;
        }
        // handle err
        if (err) {
            onParallel.err = err;
            // ensure counter <= 0
            onParallel.counter = -Math.abs(onParallel.counter);
        }
        // call onError when isDone
        if (onParallel.counter <= 0) {
            onError(err, data);
            return;
        }
        onEach();
    };
    // init counter
    onParallel.counter = 0;
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
    var isListEnd;
    var onEach2;
    var onParallel;
    opt.list = opt.list || [];
    onEach2 = function () {
        while (true) {
            if (!(onParallel.ii + 1 < opt.list.length)) {
                isListEnd = true;
                return;
            }
            if (!(onParallel.counter < opt.rateLimit + 1)) {
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
                onParallel.counter -= 1;
                onEach(data, onParallel);
            }, 1000);
            return true;
        }
        // restart if opt.list has grown
        if (isListEnd && (onParallel.ii + 1 < opt.list.length)) {
            isListEnd = null;
            onEach2();
        }
    });
    onParallel.ii = -1;
    opt.rateLimit = Number(opt.rateLimit) || 6;
    opt.rateLimit = Math.max(opt.rateLimit, 1);
    opt.retryLimit = Number(opt.retryLimit) || 2;
    onParallel.counter += 1;
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
 */
    return [
        aa, bb
    ].map(function (aa) {
        aa = aa.split("-");
        return [
            aa[0], aa.slice(1).join("-") || "\u00ff"
        ].map(function (aa) {
            return aa.split(".").map(function (aa) {
                return ("0000000000000000" + aa).slice(-16);
            }).join(".");
        }).join("-");
    }).reduce(function (aa, bb) {
        return (
            aa === bb
            ? 0
            : aa < bb
            ? -1
            : 1
        );
    });
};

local.stringHtmlSafe = function (text) {
/*
 * this function will make the text html-safe
 * https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html
 */
    return text.replace((
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
        });
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
