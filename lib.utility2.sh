#!/bin/sh
# jslint utility2:true

# POSIX reference
# http://pubs.opengroup.org/onlinepubs/9699919799/utilities/test.html
# http://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html

# curl with custom CA certificates
# openssl x509 -in a00.pem -text
# openssl verify --verbose -CAfile ca.pem a00.pem
# openssl x509 -outform der -in a00.pem -out a00.crt
# cp a00.crt /usr/local/share/ca-certificates/
# update-ca-certificates

# sh one-liner
# http://sed.sourceforge.net/sed1line.txt
# apt list --installed
# export NODE_TLS_REJECT_UNAUTHORIZED=0 # use with caution
# git branch -d -r origin/aa
# git config --global diff.algorithm histogram
# git fetch origin alpha beta master --tags
# git ls-files --stage | sort
# git ls-remote --heads origin
# git update-index --chmod=+x aa.js
# gpupdate /force
# npm test --mode-coverage --mode-test-case2=_testCase_webpage_default,testCase_nop_default
# openssl rand -base64 32 # random key
# printf "$USERNAME:$(openssl passwd -apr1 "$PASSWD")\n" # htpasswd
# shCryptoWithGithubOrg aa shGithubApiRateLimitGet
# shCryptoWithGithubOrg aa shGithubRepoTouch aa/node-aa-bb alpha "[build app]"
# shDockerRestartUtility2 work kaizhu256/node-utility2
# shDockerSh work 'PORT=4065 npm start'
# shDockerSh work 'shUtility2DependentsShellEval shBuildApp'
# utility2 shReadmeEval example.js
# vim rgx-lowercase \L\1\e

shBaseInit() {
# this function will init bash-login base-env, and is intended for aws-ec2 setup
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
    shBashrcDebianInit || return "$?"
    # init custom alias
    alias lld="ls -adlF" || return "$?"
}

shBaseInstall() {
# this function will automate installing .bashrc, .screenrc, .vimrc, and
# lib.utility2.sh in $HOME
# example use:
# curl -Lf -o "$HOME/lib.utility2.sh" https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/lib.utility2.sh && . "$HOME/lib.utility2.sh" && shBaseInstall
    for FILE in .screenrc .vimrc lib.utility2.sh
    do
        curl -Lf -o "$HOME/$FILE" \
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

shBashrcDebianInit() {
# this function will init debian:stable /etc/skel/.bashrc
# https://sources.debian.org/src/bash/4.4-5/debian/skel.bashrc/
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
    [ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

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
        #alias fgrep='fgrep --color=auto'
        #alias egrep='egrep --color=auto'
    fi

    # colored GCC warnings and errors
    #export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

    # some more ls aliases
    alias ll='ls -alF'
    #alias la='ls -A'
    #alias l='ls -CF'

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

shBrowserScreenshot() {(set -e
# this function will screenshot url "$1" with headless-chrome
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let file;
    let sep;
    let timeStart;
    let url;
    let {
        CI_BRANCH,
        CI_HOST,
        MODE_CI,
        UTILITY2_DIR_BUILD
    } = process.env;
    sep = require("path").sep;
    timeStart = Date.now();
    url = process.argv[1];
    if (!(
        /^\w+?:/
    ).test(url)) {
        url = require("path").resolve(url);
    }
    file = require("url").parse(url).pathname;
    // remove prefix $PWD from file
    if (String(file + sep).indexOf(process.cwd() + sep) === 0) {
        file = file.replace(process.cwd(), "");
    }
    file = require("path").resolve(
        UTILITY2_DIR_BUILD + "/screenshot." + MODE_CI + ".browser." +
        encodeURIComponent(file.replace(
            "/build.." + CI_BRANCH + ".." + CI_HOST + "/",
            "/build/"
        )) + ".png"
    );
    process.on("exit", function (exitCode) {
        if (typeof exitCode === "object" && exitCode) {
            console.error(exitCode);
            exitCode = 1;
        }
        console.error(
            "\nshBrowserScreenshot" + " - " + (Date.now() - timeStart) + " ms" +
            " - EXIT_CODE=" + exitCode + " - " + url + " - " + file + "\n"
        );
    });
    process.on("uncaughtException", process.exit);
    process.on("unhandledRejection", process.exit);
    require("child_process").spawn((
        process.platform === "darwin"
        ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        : process.platform === "win32"
        ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
        : "/usr/bin/google-chrome-stable"
    ), [
        "--headless",
        "--incognito",
        "--screenshot",
        "--timeout=30000",
        "--window-size=800x600",
        "-screenshot=" + file,
        (
            process.platform === "linux"
            ? "--no-sandbox"
            : ""
        ),
        url
    ], {
        stdio: [
            "ignore", 1, 2
        ]
    });
}());
' "$1" "$2" # '
)}

shBrowserTest() {(set -e
# this function will spawn google-chrome-process to test url $1,
# and merge test-report into existing test-report
    shCiPrint "shBrowserTest - $1"
    # run browser-test
    lib.utility2.js utility2.browserTest "$1"
    # create test-report artifacts
    lib.utility2.js utility2.testReportCreate
)}

shBuildApidoc() {(set -e
# this function will build apidoc
    shEnvSanitize
    npm test --mode-coverage="" --mode-test-case=testCase_buildApidoc_default
)}

shBuildApp() {(set -e
# this function will build app in "$PWD"
    shEnvSanitize
    shCiInit
    # cleanup empty-file
    find . -maxdepth 1 -empty | xargs rm -f
    # hardlink file .gitignore, lib.xxx, assets.utility2.rollup.js
    # hardlink file ~/lib.utility2.sh, bin/utility2
    # bin/utility2-apidoc, bin/utility2-istanbul, bin/utility2-jslint
    # update file .travis.yml, npm_scripts.sh
    node -e '
/* jslint utility2:true */
(async function () {
    "use strict";
    let dirBin;
    let dirDev;
    let fileList;
    let fs;
    let path;
    fs = require("fs");
    path = require("path");
    dirBin = process.env.HOME + "/bin";
    dirDev = process.env.HOME + "/Documents/utility2";
    try {
        await fs.promises.access(dirDev + "/lib.utility2.js");
    } catch (ignore) {
        return;
    }
    // hardlink file $HOME/lib.utility2.sh, $HOME/bin/utility2-xxx
    [
        [
            dirDev + "/lib.utility2.sh", process.env.HOME + "/lib.utility2.sh"
        ],
        [
            dirDev + "/lib.utility2.sh", dirBin + "/utility2"
        ],
        [
            dirDev + "/lib.apidoc.js", dirBin + "/utility2-apidoc"
        ],
        [
            dirDev + "/lib.istanbul.js", dirBin + "/utility2-istanbul"
        ],
        [
            dirDev + "/lib.jslint.js", dirBin + "/utility2-jslint"
        ]
    ].forEach(function ([
        aa, bb
    ], ii) {
        // hardlink file $HOME/lib.utility2.sh synchronously to prevent
        // race-condition with hardlink file $HOME/bin/utility2
        if (ii === 0) {
            try {
                fs.unlinkSync(bb);
            } catch (ignore) {}
            fs.linkSync(aa, bb);
        } else {
            fs.unlink(bb, function (ignore) {
                fs.link(aa, bb, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            });
        }
        console.error("shBuildApp - hardlink - " + path.resolve(bb));
    });
    if (process.cwd() === path.resolve(dirDev)) {
        return;
    }
    // hardlink file .gitignore, lib.xxx, assets.utility2.rollup.js
    fileList = await fs.promises.readdir(dirDev);
    fileList.concat("assets.utility2.rollup.js").forEach(async function (file) {
        if (!(
            file === ".gitignore" ||
            file === "assets.utility2.rollup.js" ||
            file.indexOf("lib.") === 0
        )) {
            return;
        }
        try {
            await fs.promises.access(file);
        } catch (ignore) {
            return;
        }
        await fs.promises.unlink(file);
        await fs.promises.link((
            file === "assets.utility2.rollup.js"
            ? dirDev + "/.tmp/build/app/assets.utility2.rollup.js"
            : dirDev + "/" + file
        ), file);
        console.error("shBuildApp - hardlink - " + path.resolve(file));
    });
    // update file .travis.yml, npm_scripts.sh
    [
        ".travis.yml", "npm_scripts.sh"
    ].forEach(async function (file) {
        let aa;
        let bb;
        let data;
        try {
            data = await fs.promises.readFile(file, "utf8");
        } catch (ignore) {
            return;
        }
        bb = data;
        aa = await fs.promises.readFile(dirDev + "/" + file, "utf8");
        [
            (
                /\n\u0020{4}-\u0020secure:\u0020.*?\u0020#\u0020CRYPTO_AES_KEY\n/
            ), (
                /\n\u0020{4}#\u0020run\u0020cmd\u0020-\u0020custom\n[\S\s]*?\n\u0020{4}esac\n/
            ), (
                /\n\)\}\n[\S\s]*?\n#\u0020run\u0020cmd\n/
            )
        ].forEach(function (rgx) {
            bb.replace(rgx, function (match2) {
                aa.replace(rgx, function (match1) {
                    aa = aa.replace(match1, function () {
                        return match2;
                    });
                    return "";
                });
                return "";
            });
        });
        if (aa !== bb) {
            await fs.promises.writeFile(file, aa);
            console.error("shBuildApp - updated - " + path.resolve(file));
        }
    });
}());
' # '
    # create file if not exists
    # .gitignore, .travis.yml, LICENSE, npm_scripts.sh
    # package.json
    # README.md, lib.$npm_package.nameLib.js, test.js
    node -e '
/* jslint utility2:true */
(async function (local) {
    "use strict";
    let fs;
    let modeUtility2Rollup;
    fs = require("fs");
    // fetch file .gitignore, .travis.yml, LICENSE, npm_scripts.sh
    [
        ".gitignore", ".travis.yml", "LICENSE", "npm_scripts.sh"
    ].forEach(async function (file) {
        try {
            await fs.promises.access(file);
        } catch (ignore) {
            return;
        }
        require("https").request((
            "https://raw.githubusercontent.com/kaizhu256/node-utility2" +
            "/alpha/" + file
        ), function (res) {
            res.pipe(fs.createWriteStream(file).on("close", async function () {
                if (file === "npm_scripts.sh") {
                    await fs.promises.chmod(file, 0o755);
                }
            }));
        }).end();
    });
    // create file package.json
    (async function () {
        let aa;
        let bb;
        aa = await fs.promises.readFile("package.json", "utf8");
        bb = JSON.stringify(local.objectDeepCopyWithKeysSorted(
            Object.assign({
                "description": "the greatest app in the world!",
                "main": "lib." + process.env.npm_package_nameLib + ".js",
                "name": process.env.npm_package_name,
                "scripts": {
                    "test": "./npm_scripts.sh"
                },
                "version": "0.0.1"
            }, JSON.parse(aa))
        ), undefined, 4) + "\n";
        if (bb !== aa) {
            await fs.promises.writeFile("package.json", bb);
            console.error("shBuildApp - modified - package.json");
        }
    }());
    // create file README.md, lib.$npm_package.nameLib.js, test.js
    try {
        await fs.promises.access("assets.utility2.rollup.js");
        modeUtility2Rollup = true;
    } catch (ignore) {
        return;
    }
    [
        "README.md",
        "lib." + process.env.npm_package_nameLib + ".js",
        "test.js"
    ].forEach(async function (file) {
        try {
            await fs.promises.access(file);
        } catch (ignore) {
            return;
        }
        await fs.promises.writeFile(file, local.templateRenderMyApp((
            file === "README.md"
            ? local.assetsDict["/assets.readme.template.md"]
            : file === "test.js"
            ? local.assetsDict["/assets.test.template.js"]
            : local.assetsDict["/assets.my_app.template.js"]
        ).replace("require(\u0027utility2\u0027)", function (match0) {
            return (
                modeUtility2Rollup
                ? "require(\u0027./assets.utility2.rollup.js\u0027)"
                : match0
            );
        })).trimRight() + "\n");
        console.error("shBuildApp - modified - " + file);
    });
}(require(process.env.UTILITY2_DIR_BIN)));
' # '
    # build app
    npm test --mode-coverage="" --mode-test-case=testCase_buildApp_default
    # git diff
    if [ -d .git ]
    then
        git --no-pager diff HEAD
    fi
)}

shCiInit() {
# this function will init env
    export CI_BRANCH="${CI_BRANCH:-$(
        git rev-parse --abbrev-ref HEAD 2>/dev/null
    )}"
    if [ "$CI_BRANCH" ]
    then
        export CI_COMMIT_ID="$(git rev-parse --verify HEAD)"
        export CI_COMMIT_MESSAGE="$(git log -1 --pretty=%s)"
        export CI_HOST=127.0.0.1
    fi
    # init env - $GITHUB_ACTIONS
    if [ "$GITHUB_ACTIONS" ]
    then
        export CI_BRANCH="$(printf "$GITHUB_REF" | grep -Eo "[^/]*$")"
        export CI_HOST=github.com
    fi
    # init env - $TRAVIS
    if [ "$TRAVIS" ]
    then
        export CI_BRANCH="$TRAVIS_BRANCH"
        export CI_HOST=travis-ci.com
    fi
    eval "$(node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let cmd;
    let dataReadme;
    let fs;
    let packageJson;
    let path;
    let {
        HOME,
        UTILITY2_DIR_BUILD,
        CI_BRANCH,
        CI_COMMIT_ID,
        CI_COMMIT_MESSAGE,
        NODE_OPTIONS = ""
    } = process.env;
    function exportVar(key, val) {
    /*
     * this function will export "key=val" to shell-env
     */
        cmd += "export " + key + "=\u0027" + String(val || "").replace((
            /\u0027/g
        ), "\u0027\"\u0027\"\u0027") + "\u0027\n";
    }
    fs = require("fs");
    path = require("path");
    cmd = "";
    cmd += "# shCiInit env\n";
    cmd += "# ";
    exportVar("PWD", process.cwd());
    // init packageJson
    packageJson = (
        fs.existsSync("package.json")
        ? JSON.parse(fs.readFileSync("package.json"))
        : {
            name: "my-app",
            version: "0.0.1"
        }
    );
    // init $npm_package_*
    [
        "description",
        "homepage",
        "main",
        "name",
        "nameLib",
        "nameOriginal",
        "private",
        "version"
    ].forEach(function (key) {
        switch (key) {
        case "nameLib":
            exportVar("npm_package_nameLib", String(
                packageJson.nameLib || packageJson.name
            ).replace((
                /\W/g
            ), "_"));
            break;
        default:
            exportVar("npm_package_" + key, packageJson[key]);
        }
    });
    // init $GITHUB_FULLNAME, $GITHUB_OWNER, $GITHUB_REPO
    String(
        (packageJson.repository && packageJson.repository.url) ||
        packageJson.repository ||
        ""
    ).replace((
        /([^\/]+?)\/([^\/]+?)(?:\.git)?$/
    ), function (ignore, owner, repo) {
        exportVar("GITHUB_FULLNAME", owner + "/" + repo);
        exportVar("GITHUB_OWNER", owner);
        exportVar("GITHUB_REPO", repo);
    });
    // init $UTILITY2_BIN, $UTILITY2_DIR_*
    Array.from([
        process.cwd(),
        path.resolve(HOME + "/Documents/utility2"),
        (function () {
            try {
                return path.dirname(require.resolve("utility2"));
            } catch (ignore) {}
        }()),
        path.resolve(HOME + "/node_modules/utility2")
    ]).some(function (dir) {
        if (!dir || !fs.existsSync(dir + "/lib.utility2.js")) {
            return;
        }
        exportVar("UTILITY2_BIN", path.resolve(dir + "/lib.utility2.sh"));
        exportVar("UTILITY2_DIR_BIN", dir);
        exportVar(
            "UTILITY2_DIR_BUILD",
            path.resolve(UTILITY2_DIR_BUILD || ".tmp/build")
        );
        // interpolate $PATH
        cmd += (
            "export PATH=\"$PATH:" +
            dir + ":" + path.resolve(dir + "/../.bin") + "\"\n"
        );
        // mkdir $UTILITY2_DIR_BUILD
        dir = path.resolve(".tmp/build");
        fs.mkdirSync(dir, {
            recursive: true
        });
        console.error("shCiInit - mkdir - " + dir);
        return true;
    });
    // init $CI_xxx, $NODE_OPTIONS
    exportVar("CI_BRANCH", CI_BRANCH);
    exportVar("CI_COMMIT_ID", CI_COMMIT_ID);
    exportVar("CI_COMMIT_MESSAGE", CI_COMMIT_MESSAGE);
    exportVar("NODE_OPTIONS", (
        NODE_OPTIONS.indexOf("--unhandled-rejections=") >= 0
        ? NODE_OPTIONS
        : String(NODE_OPTIONS + " --unhandled-rejections=throw").trim()
    ));
    process.stderr.write(cmd);
    process.stdout.write(cmd);
    // extract embedded-scripts from README.md to .tmp/README.xxx
    dataReadme = "";
    try {
        dataReadme = require("fs").readFileSync("README.md", "utf8");
    } catch (ignore) {}
    dataReadme.replace((
        /\n```\w*?(\n[#*\/\s]*?(\w[\w\-]*?\.\w*?)[\n"][\S\s]*?\n)```\n/g
    ), function (ignore, dataEmbedded, file, ii, dataReadme) {
        dataEmbedded = (
            // preserve lineno
            dataReadme.slice(0, ii).replace((
                /.*/g
            ), "") + "\n" +
            dataEmbedded.replace((
                // parse "\" line-continuation
                /\\\n/g
            ), "")
        );
        file = require("path").resolve(".tmp/README." + file);
        require("fs").writeFile(file, dataEmbedded.trimEnd() + "\n", function (
            err
        ) {
            if (err) {
                throw err;
            }
            console.error("shCiInit - wrote - " + file);
        });
        return "";
    });
}());
')" || return "$?" # '
}

shCiInternal() {(set -e
# this function will run internal-ci
    local FILE
    (
        shEnvSanitize
        # run shCiBefore
        if (type shCiBefore > /dev/null 2>&1)
        then
            shCiBefore
        fi
        export npm_config_mode_test_report_merge=1

        # npm-test
        export MODE_CI=npmTest
        npm test --mode-coverage

        # create apidoc.html
        export MODE_CI=buildApidoc
        shBuildApidoc

        # create screenshot.npmPackageListing.svg
        export MODE_CI=npmPackageListing
        shRunWithScreenshotTxt eval \
            "printf \"package files\n\n\" && shGitLsTree"

        # create screenshot.npmPackageDependencyTree.svg
        shNpmPackageDependencyTreeCreate "$npm_package_name" \
            "$GITHUB_FULLNAME#alpha"

        # create screenshot.npmPackageCliHelp.svg
        export MODE_CI=npmPackageCliHelp
        shRunWithScreenshotTxt eval "$(node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let file;
    try {
        file = require("path").resolve(Object.values(JSON.parse(
            require("fs").readFileSync("package.json", "utf8")
        ).bin)[0]);
        if (require("fs").existsSync(file)) {
            process.stdout.write(file + " --help");
        }
    } catch (ignore) {}
    process.stdout.write("printf none");
}());
')" # '

        # create screenshot.gitLog.svg
        export MODE_CI=gitLog
        shRunWithScreenshotTxt git log -50 --pretty="%ai\\u000a%B"

        # screenshot apidoc.html, coverage.lib.html, test-report.html
        export MODE_CI=ci
        FILE="$(
            find "$UTILITY2_DIR_BUILD" -name *.js.html 2>/dev/null | tail -n 1
        )"
        cp "$FILE" "$UTILITY2_DIR_BUILD/coverage.lib.html"
        for FILE in apidoc.html coverage.lib.html test-report.html
        do
            FILE="$UTILITY2_DIR_BUILD/$FILE"
            shBrowserScreenshot "file://$FILE" &
        done
    )


    if [ ! "$GITHUB_TOKEN" ]
    then
        shCiPrint "no GITHUB_TOKEN"
        return
    fi
    export npm_config_mode_test_report_merge=1
    # build and deploy app to github
    (export MODE_CI=buildApp && shBuildApp && shCiUpload && shSleep 15)
    # run shCiAfter
    if (type shCiAfter > /dev/null 2>&1)
    then
        shCiAfter
    fi
    # list $UTILITY2_DIR_BUILD
    find "$UTILITY2_DIR_BUILD" | sort
    # upload $UTILITY2_DIR_BUILD to github-gh-pages and
    # if number of commits > $COMMIT_LIMIT, then squash older commits
    if [ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ]
    then
        COMMIT_LIMIT=100 shCiUpload
    fi
    shGitInfo
    # validate http-link in README.md
    shSleep 60
    shReadmeLinkValidate
)}

shCiMain() {(set -e
# this function will run main-ci
    export MODE_CI=ci
    # init env - $TRAVIS
    if [ "$TRAVIS" ]
    then
        git remote remove origin 2>/dev/null || true
        git remote add origin "https://github.com/$GITHUB_FULLNAME"
        # decrypt and exec encrypted data
        if [ "$CRYPTO_AES_KEY" ]
        then
            eval "$(shCryptoTravisDecrypt)"
        fi
    fi
    # init env - $GITHUB_ACTIONS
    if [ "$GITHUB_ACTIONS" ]
    then
        git remote remove origin 2>/dev/null || true
        git remote add origin "https://github.com/$GITHUB_FULLNAME"
    fi
    # init git config
    if (! git config user.email > /dev/null 2>&1)
    then
        git config --global user.email ci
        git config --global user.name ci
    fi
    case "$CI_BRANCH" in
    alpha)
        shCiInternal
        ;;
    beta)
        shCiInternal
        ;;
    docker.*)
        export CI_BRANCH=alpha
        shCiInternal
        ;;
    master)
        shCiInternal
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
            shCiPrint "skip npm-publish"
        fi
        # security - cleanup .npmrc
        rm -f "$HOME/.npmrc"
        shSleep 5
        shCiInternal
        ;;
    esac
    if [ ! "$GITHUB_TOKEN" ]
    then
        return
    fi
    case "$CI_BRANCH" in
    alpha)
        case "$CI_COMMIT_MESSAGE" in
        "[npm publish]"*)
            shGitCmdWithGithubToken push "https://github.com/$GITHUB_FULLNAME" \
                HEAD:publish
            ;;
        esac
        ;;
    beta)
        ;;
    master)
        git tag "$npm_package_version" || true
        shGitCmdWithGithubToken push "https://github.com/$GITHUB_FULLNAME" \
            "$npm_package_version" || true
        ;;
    publish)
        # security - cleanup .npmrc
        rm -f "$HOME/.npmrc"
        shGitCmdWithGithubToken push "https://github.com/$GITHUB_FULLNAME" \
            HEAD:beta
        ;;
    esac
)}

shCiPrint() {(set -e
# this function will print debug-info about current ci-state
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    process.stderr.write(
        "\n\u001b[35m[MODE_CI=" + process.env.MODE_CI + "]\u001b[0m - " +
        new Date().toISOString() + " - " + process.argv[1] + "\n\n"
    );
}());
' "$1" # '
)}

shCiUpload() {(set -e
# this function will upload dir $UTILITY2_DIR_BUILD to github-gh-pages
    local DIR
    local URL
    shCiPrint "shCiUpload - upload - $UTILITY2_DIR_BUILD to \
https://github.com/$GITHUB_FULLNAME/tree/gh-pages/build..$CI_BRANCH..$CI_HOST"
    URL="https://github.com/$GITHUB_FULLNAME"
    # init $DIR
    DIR=/tmp/shCiUpload
    rm -rf "$DIR"
    shGitCmdWithGithubToken clone "$URL" --single-branch -b gh-pages "$DIR"
    cd "$DIR"
    # cleanup screenshot
    rm -f build/*127.0.0.1*
    case "$CI_COMMIT_MESSAGE" in
    "[build clean]"*)
        shCiPrint "shCiUpload - [build clean]"
        rm -rf build
        ;;
    esac
    # copy $UTILITY2_DIR_BUILD
    cp -a "$UTILITY2_DIR_BUILD" .
    rm -rf "build..$CI_BRANCH..$CI_HOST"
    cp -a "$UTILITY2_DIR_BUILD" "build..$CI_BRANCH..$CI_HOST"
    # disable github-jekyll
    touch .nojekyll
    git add .
    git commit -am "[ci skip] update gh-pages" || true
    # if number of commits > $COMMIT_LIMIT, then
    # backup gh-pages to gh-pages.backup, and then
    # squash to $COMMIT_LIMIT/2 in git-repo-branch
    if [ "$COMMIT_LIMIT" ] &&
        [ "$(git rev-list HEAD --count)" -gt "$COMMIT_LIMIT" ]
    then
        shGitCmdWithGithubToken push "$URL" -f HEAD:gh-pages.backup
        shGitSquashShift "$(($COMMIT_LIMIT / 2))"
    fi
    shGitCmdWithGithubToken push "$URL" -f HEAD:gh-pages
    if [ "$CI_BRANCH" = alpha ] && [ "$npm_package_description" ]
    then
        shGithubRepoDescriptionUpdate \
            "$GITHUB_FULLNAME" "$npm_package_description" || true
    fi
)}

shCryptoAesXxxCbcRawDecrypt() {(set -e
# this function will inplace aes-xxx-cbc decrypt stdin with given hex-key $1
# example use:
# printf 'hello world\n' | shCryptoAesXxxCbcRawEncrypt 0123456789abcdef0123456789abcdef | shCryptoAesXxxCbcRawDecrypt 0123456789abcdef0123456789abcdef
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let bufList;
    function cryptoAesXxxCbcRawDecrypt(opt, onError) {
    /*
     * this function will aes-xxx-cbc decrypt with given <opt>
     * example use:
        data = new Uint8Array([1,2,3]);
        key = '"'"'0123456789abcdef0123456789abcdef'"'"';
        mode = undefined;
        cryptoAesXxxCbcRawEncrypt({
            data,
            key,
            mode
        }, function (err, data) {
            console.assert(!err, err);
            cryptoAesXxxCbcRawDecrypt({
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
            data = Buffer.from(data, "base64");
        }
        // normalize data
        if (Object.prototype.toString.call(data) !== "[object Uint8Array]") {
            data = new Uint8Array(data);
        }
        // init iv
        iv = data.slice(0, 16);
        // optimization - create resized-view of data
        data = data.slice(16);
        try {
            crypto = require("crypto");
        } catch (ignore) {
            crypto = globalThis.crypto;
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
            return;
        }
        setTimeout(function () {
            cipher = crypto.createDecipheriv(
                "aes-" + (8 * key.byteLength) + "-cbc",
                key,
                iv
            );
            onError(undefined, Buffer.concat([
                cipher.update(data), cipher.final()
            ]));
        });
    }
    bufList = [];
    process.stdin.on("data", function (chunk) {
        bufList.push(chunk);
    });
    process.stdin.on("end", function () {
        cryptoAesXxxCbcRawDecrypt({
            data: (
                process.argv[2] === "base64"
                ? Buffer.concat(bufList).toString()
                : Buffer.concat(bufList)
            ),
            key: process.argv[1],
            mode: process.argv[2]
        }, function (err, data) {
            if (err) {
                throw err;
            }
            Object.setPrototypeOf(data, Buffer.prototype);
            process.stdout.write(data);
        });
    });
}());
' "$@" # '
)}

shCryptoTravisDecrypt() {(set -e
# this function will use $CRYPTO_AES_KEY to decrypt $SH_ENCRYPTED to stdout
    export MODE_CI=cryptoTravisDecrypt
    if [ ! "$CRYPTO_AES_KEY" ]
    then
        eval "CRYPTO_AES_KEY=$(printf "\$CRYPTO_AES_KEY_$GITHUB_OWNER")"
    fi
    if [ ! "$CRYPTO_AES_KEY" ]
    then
        shCiPrint "no CRYPTO_AES_KEY"
        return 1
    fi
    local FILE="$1"
    if [ -f "$FILE" ]
    then
        cat "$FILE" | shCryptoAesXxxCbcRawDecrypt "$CRYPTO_AES_KEY" base64
        return
    fi
    # decrypt CRYPTO_AES_SH_ENCRYPTED_$GITHUB_OWNER
    URL="https://raw.githubusercontent.com\
/kaizhu256/node-utility2/gh-pages/.CRYPTO_AES_SH_ENCRYPTED_$GITHUB_OWNER"
    shCiPrint "decrypting $URL ..."
    curl -Lf "$URL" | shCryptoAesXxxCbcRawDecrypt "$CRYPTO_AES_KEY" base64
)}

shCryptoWithGithubOrg() {(set -e
# this function will run "$@" with private $GITHUB_OWNER-env
    export GITHUB_OWNER="$1"
    shift
    . "$HOME/.ssh/.CRYPTO_AES_SH_DECRYPTED_$GITHUB_OWNER"
    "$@"
)}

shDeployCustom() {
# this function will do nothing
    return
}

shDeployGithub() {(set -e
# this function will deploy app to $GITHUB_FULLNAME
# and run simple curl-check for $TEST_URL
# and test $TEST_URL
    export MODE_CI=deployGithub
    export TEST_URL="https://$(
        printf "$GITHUB_FULLNAME" | sed -e "s/\//.github.io\//"
    )/build..$CI_BRANCH..travis-ci.com/app"
    shCiPrint "deployed to $TEST_URL"
    # verify deployed app''s main-page returns status-code < 400
    shSleep 15
    if [ "$(
        curl -L --connect-timeout 60 -o /dev/null -w "%{http_code}" "$TEST_URL"
    )" -lt 400 ]
    then
        shCiPrint "curl test passed for $TEST_URL"
    else
        shCiPrint "curl test failed for $TEST_URL"
        return 1
    fi
    # screenshot deployed app
    shBrowserScreenshot "$TEST_URL" &
    # test deployed app
    MODE_CI="${MODE_CI}Test" shBrowserTest "$TEST_URL?npm_config_mode_test=1"
)}

shDeployHeroku() {(set -e
# this function will deploy app to heroku
# and run simple curl-check for $TEST_URL
# and test $TEST_URL
    export npm_package_nameHeroku=\
"${npm_package_nameHeroku:-$(printf "h1-$npm_package_nameLib" | tr "_" "-")}"
    # build app inside heroku
    if [ "$npm_lifecycle_event" = heroku-postbuild ]
    then
        shCiInit
        shBuildApp
        cp "$UTILITY2_DIR_BUILD"/app/*.js .
        printf "web: npm_config_mode_backend=1 node assets.app.js\n" > Procfile
        # cleanup .tmp
        rm -rf .tmp
        return
    fi
    export MODE_CI=deployHeroku
    export TEST_URL="https://$npm_package_nameHeroku-$CI_BRANCH.herokuapp.com"
    shCiPrint "deployed to $TEST_URL"
    # verify deployed app''s main-page returns status-code < 400
    shSleep 15
    if [ "$(
        curl -L --connect-timeout 60 -o /dev/null -w "%{http_code}" "$TEST_URL"
    )" -lt 400 ]
    then
        shCiPrint "curl test passed for $TEST_URL"
    else
        shCiPrint "curl test failed for $TEST_URL"
        return 1
    fi
    # screenshot deployed app
    shBrowserScreenshot "$TEST_URL" &
    # test deployed app
    MODE_CI="${MODE_CI}Test" shBrowserTest "$TEST_URL?npm_config_mode_test=1"
)}

shDockerRestartNginx() {(set -e
# this function will restart docker-container nginx
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

shDockerRestartTransmission() {(set -e
# this function will restart docker-container transmission
# http://transmission:transmission@127.0.0.1:9091
    case "$(uname)" in
    Darwin)
        LOCALHOST="${LOCALHOST:-192.168.99.100}"
        ;;
    *)
        LOCALHOST="${LOCALHOST:-127.0.0.1}"
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

shDockerRestartUtility2() {(set -e
# this function will restart docker-container $1 $2 with utility2 env
    local DOCKER_V_GAME
    docker rm -fv "$1" || true
    case "$(uname)" in
    Darwin)
        LOCALHOST="${LOCALHOST:-192.168.99.100}"
        ;;
    MINGW*)
        HOME="$USERPROFILE"
        ;;
    MSYS*)
        HOME="$USERPROFILE"
        ;;
    *)
        LOCALHOST="${LOCALHOST:-127.0.0.1}"
        ;;
    esac
    if [ -d /g ]
    then
        DOCKER_V_GAME="-v g:/:/mnt"
    fi
    docker run --name "$1" -dt \
        -e debian_chroot="$1" \
        -p "$LOCALHOST:4065:4065" \
        -p "$LOCALHOST:9229:9229" \
        -v "$HOME:/root" \
        $DOCKER_V_GAME \
        "$2"
)}

shDockerRm() {(set -e
# this function will rm docker-containers "$@"
    docker rm -fv "$@" || true
)}

shDockerRmAll() {(set -e
# this function will rm all docker-containers
    docker rm -fv $(docker ps -aq) || true
)}

shDockerRmExited() {(set -e
# this function will rm all docker-containers that have exited
    docker rm -fv $(docker ps -aqf status=exited) || true
)}

shDockerRmiUntagged() {(set -e
# this function will rm all untagged docker images
    docker rmi $(docker images -aqf dangling=true) 2>/dev/null || true
)}

shDockerSh() {
# this function will run /bin/bash in docker-container $1
    # run outside vm
    if [ "$1" != init ]
    then
        (set -e
        CMD="[ -f ~/lib.utility2.sh ] && . ~/lib.utility2.sh && shBaseInit"
        CMD="$CMD && shDockerSh init;"
        CMD="$CMD ${2:-bash}"
        docker start "$1"
        docker exec \
            -e HOST_HOME="$HOME" \
            -e HOST_PWD="$PWD" \
            -e PORT="$PORT" \
            -it "$1" \
            sh -c "$CMD"
        )
        return "$?"
    fi
    # run inside vm
    # cd $HOST_PWD inside docker
    eval "$(node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let cmd;
    let dirCd;
    let dirHome;
    let dirPwd;
    cmd = "# shDockerSh init\n";
    // cd $PWD
    dirCd = process.env.PWD;
    dirHome = process.env.HOST_HOME + "/";
    dirPwd = process.env.HOST_PWD + "/";
    // cd $HOME/...
    if (dirHome.length > 1 && dirPwd.indexOf(dirHome) === 0) {
        dirCd = process.env.HOME + "/" + dirPwd.replace(dirHome, "");
    // cd G:/...
    } else if (dirPwd.indexOf("G:/") === 0) {
        dirCd = dirPwd.replace("G:/", "/mnt/");
    }
    cmd += "cd " + require("path").resolve(dirCd) + "\n";
    process.stderr.write(cmd);
    process.stdout.write(cmd);
}());
')" || return "$?" # '
    # init $CURL_CA_BUNDLE
    if [ -f "$HOME/.curl-ca-bundle.crt" ]
    then
        export CURL_CA_BUNDLE="$HOME/.curl-ca-bundle.crt" || return "$?"
        export NODE_EXTRA_CA_CERTS="$HOME/.curl-ca-bundle.crt" || return "$?"
    fi
    # update-ca-certificates
    if [ -f "$CURL_CA_BUNDLE" ] &&
        [ -d /usr/local/share/ca-certificates ] &&
        [ ! -f /usr/local/share/ca-certificates/.curl-ca-bundle.crt ]
    then
        cp "$CURL_CA_BUNDLE" \
            /usr/local/share/ca-certificates/.curl-ca-bundle.crt || return "$?"
        update-ca-certificates || return "$?"
    fi
}

shDuList() {(set -e
# this function will du $1 and sort its subdir by size
    du -md1 "$1" | sort -nr
)}

shEnvSanitize() {
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
')" # '
}

shGitCmdWithGithubToken() {(set -e
# this function will run git $CMD with $GITHUB_TOKEN
    local CMD
    local URL
    # security - filter basic-auth
    shCiPrint "$(
        printf "shGitCmdWithGithubToken - $*" | sed -e "s|://[^@]*@|://...@|"
    )"
    CMD="$1"
    shift
    URL="$1"
    shift
    URL="$(
        printf "$URL" |
        sed -e \
"s|^https://github.com/|https://x-access-token:$GITHUB_TOKEN@github.com/|" \
        -e \
"s|^origin$|https://x-access-token:$GITHUB_TOKEN@github.com/$GITHUB_FULLNAME|"
    )"
    # hide $GITHUB_TOKEN in case of err
    git "$CMD" "$URL" "$@" 2>/dev/null
)}

shGitGc() {(set -e
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

shGitInfo() {(set -e
# this function will run checks before npm-publish
    git diff HEAD
    printf "\n"
    git status
    printf "\n"
    shGitLsTree
    printf "\n"
    cat package.json
    printf "\n"
    git grep -E '[^!]!\! ' || true
    printf "\n"
    git grep -E '\bcurl [^-].* -' *.sh || true
    printf "\n"
    git grep -E '\becho\b' *.sh || true
    printf "\n"
    git grep -E '\bset -\w*x\b' *.sh || true
)}

shGitInitBase() {(set -e
# this function will git init && git fetch utility2 base
    git init
    if [ "$DOS2UNIX" ]
    then
        git config core.autocrlf input
    fi
    git remote add utility2 https://github.com/kaizhu256/node-utility2
    git fetch utility2 base
    git reset utility2/base
    git checkout -b alpha
    git add .
    git commit -am "initial commit"
    curl -Lf -o .git/config \
https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/.gitconfig
)}

shGitLsTree() {(set -e
# this function will "git ls-tree" all files committed in HEAD
# example use:
# shGitLsTree | sort -rk3 # sort by date
# shGitLsTree | sort -rk4 # sort by size
    git ls-tree -lr HEAD | LC_COLLATE=C sort -k5 | node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let list;
    list = [];
    require("readline").createInterface({
        input: process.stdin
    }).on("line", function (line) {
        line.replace((
            /(\S+?)\u0020+?\S+?\u0020+?\S+?\u0020+?(\S+?)\t(\S+?)$/
        ), function (ignore, mode, size, file) {
            let ii;
            ii = list.length;
            list.push({
                date: "0000-00-00T00:00:00Z",
                file,
                mode,
                size: Number(size)
            });
            list[0].size += Number(size);
            if (ii > 1024) {
                return;
            }
            require("child_process").spawn("git", [
                "log", "--max-count=1", "--format=%at", file
            ], {
                stdio: [
                    "ignore",
                    "pipe",
                    2
                ]
            }).stdout.on("data", function (chunk) {
                list[ii].date = new Date(
                    Number(chunk) * 1000
                ).toISOString().slice(0, 19) + "Z";
            });
        });
    }).emit("line", "100755 . . 0\t.");
    process.on("exit", function () {
        let iiPad;
        let sizePad;
        iiPad = String(list.length).length + 1;
        sizePad = String(Math.ceil(Number(list[0].size) / 1024)).length;
        process.stdout.write(list.map(function (elem, ii) {
            return (
                String(ii + ".").padStart(iiPad, " ") +
                "  " + elem.mode +
                "  " + elem.date +
                "  " + String(
                    Math.ceil(Number(elem.size) / 1024)
                ).padStart(sizePad, " ") + " KB" +
                "  " + elem.file +
                "\n"
            );
        }).join(""));
    });
}());
' # '
)}

shGitSquashPop() {(set -e
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

shGitSquashShift() {(set -e
# this function will squash $RANGE to first commit
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

shGithubApiRateLimitGet() {(set -e
# this function will fetch current rate-limit with given $GITHUB_TOKEN
    curl -Lf -H "Authorization: token $GITHUB_TOKEN" -I https://api.github.com
)}

shGithubRepoCreate() {(set -e
# this function will create base github-repo https://github.com/$GITHUB_FULLNAME
    local GITHUB_FULLNAME="$1"
    export MODE_CI="${MODE_CI:-shGithubRepoCreate}"
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
    rm -rf "/tmp/githubRepo/$GITHUB_FULLNAME"
    mkdir -p "/tmp/githubRepo/$(printf "$GITHUB_FULLNAME" | sed -e "s/\/.*//")"
    cp -a /tmp/githubRepo/kaizhu256/base "/tmp/githubRepo/$GITHUB_FULLNAME"
    cd "/tmp/githubRepo/$GITHUB_FULLNAME"
    curl -Lf \
https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/.gitconfig |
        sed -e "s|kaizhu256/node-utility2|$GITHUB_FULLNAME|" > .git/config
    # create github-repo
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    [
        (
            "https://api.github.com/orgs/" +
            process.argv[1].split("/")[0] +
            "/repos"
        ),
        "https://api.github.com/user/repos"
    ].forEach(function (url) {
        require("https").request(url, {
            headers: {
                Authorization: "token " + process.env.GITHUB_TOKEN,
                "User-Agent": "undefined"
            },
            method: "POST"
        }).end("{\"name\":\"" + process.argv[1].split("/")[1] + "\"}");
    });
}());
' "$GITHUB_FULLNAME" # '
    # set default-branch to beta
    shGitCmdWithGithubToken push "https://github.com/$GITHUB_FULLNAME" beta ||
        true
    # push all branches
    shGitCmdWithGithubToken push "https://github.com/$GITHUB_FULLNAME" --all ||
        true
)}

shGithubRepoDescriptionUpdate() {(set -e
# this function will update github-repo description
    shSleep 5
    GITHUB_FULLNAME="$1"
    DESCRIPTION="$2"
    shCiPrint \
        "shGithubRepoDescriptionUpdate - update - $GITHUB_FULLNAME description"
    curl -Lf \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Content-Type: application/json" \
        -H "User-Agent: undefined" \
        -X PATCH \
        -d "{
            \"default_branch\": \"beta\",
            \"description\": \"$(printf "$DESCRIPTION" | sed -e 's/"/\\\\"/')\",
            \"name\": \"$(printf "$GITHUB_FULLNAME" | sed -e "s/.*\///")\"
        }" \
        -o /dev/null \
    "https://api.github.com/repos/$GITHUB_FULLNAME"
)}

shGithubRepoTouch() {(set -e
# this function will touch github-repo $1, branch $2, with commit-message $2
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    require("https").request((
        "https://api.github.com/repos/" + process.argv[1] +
        "/contents/package.json?ref=" + process.argv[2]
    ), {
        headers: {
            "authorization": "token " + process.env.GITHUB_TOKEN,
            "user-agent": "undefined"
        }
    }, function (res) {
        let data;
        if (res.statusCode !== 200) {
            throw new Error(res.statusCode);
        }
        data = "";
        res.on("data", function (chunk) {
            data += chunk;
        }).on("end", function () {
            data = JSON.parse(data);
            require("https").request((

                "https://api.github.com/repos/" + process.argv[1] +
                "/contents/package.json?branch=" + process.argv[2]
            ), {
                headers: {
                    "authorization": "token " + process.env.GITHUB_TOKEN,
                    "user-agent": "undefined"
                },
                method: "PUT"
            }, function (res) {
                if (res.statusCode !== 200) {
                    throw new Error(res.statusCode);
                }
                process.exit();
            }).end(JSON.stringify({
                branch: process.argv[2],
                content: data.content,
                message: process.argv[3] || "touch",
                sha: data.sha
            }));
        }).setEncoding("utf8");
    }).end();
    process.on("exit", function (exitCode) {
        if (!exitCode) {
            console.error("shGithubRepoTouch - touched " + process.argv[1]);
        }
    });
}());
' "$@" # '
)}

shGrep() {(set -e
# this function will recursively grep $DIR for $REGEXP
    DIR="$1"
    shift
    REGEXP="$1"
    shift
    FILE_FILTER="\
/\\.|~$|/(obj|release)/|(\\b|_)(\\.\\d|\
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
old|\
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

shGrepReplace() {(set -e
# this function will inline grep-and-replace files in $1
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let dict;
    dict = {};
    require("fs").readFileSync(process.argv[1], "utf8").replace((
        /^(.+?):(\d+?):(.*?)$/gm
    ), function (ignore, file, lineno, str) {
        dict[file] = dict[file] || require("fs").readFileSync(
            require("path").resolve(file),
            "utf8"
        ).split("\n");
        dict[file][lineno - 1] = str;
        return "";
    });
    Object.entries(dict).forEach(function ([
        file, data
    ]) {
        require("fs").writeFile(file, data.join("\n"), function (err) {
            if (err) {
                throw err;
            }
        });
    });
}());
' "$@" # '
)}

shHttpFileServer() {(set -e
# this function will run simple node http-file-server on port $PORT
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    process.env.PORT = process.env.PORT || "8080";
    console.error("http-file-server listening on port " + process.env.PORT);
    require("http").createServer(function (req, res) {
        let file;
        // resolve file
        file = require("path").resolve(
            // replace trailing "/" with "/index.html"
            require("url").parse(req.url).pathname.slice(1).replace((
                /\/$/
            ), "/index.html")
        );
        // security - disable parent-directory lookup
        if (file.indexOf(process.cwd() + require("path").sep) !== 0) {
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
            switch (require("path").extname(file)) {
            case ".js":
            case ".mjs":
                res.setHeader(
                    "content-type",
                    "application/javascript; charset=utf-8"
                );
                break;
            case ".wasm":
                res.setHeader("content-type", "application/wasm");
                break;
            }
            res.end(data);
        });
    }).listen(process.env.PORT);
}());
' # '
)}

shImageToDataUri() {(set -e
# this function will convert image $FILE to data-uri string
    case "$1" in
    http://*)
        FILE=/tmp/shImageToDataUri.png
        curl -Lf -o "$FILE" "$1"
        ;;
    https://*)
        FILE=/tmp/shImageToDataUri.png
        curl -Lf -o "$FILE" "$1"
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
        "data:image/" +
        require("path").extname(process.argv[1]).slice(1) +
        ";base64," +
        require("fs").readFileSync(process.argv[1]).toString("base64")
    );
}());
' "$FILE" # '
)}

shJsonNormalize() {(set -e
# this function will
# 1. read json-data from file $1
# 2. normalize json-data
# 3. write normalized json-data back to file $1
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    function objectDeepCopyWithKeysSorted(obj) {
    /*
     * this function will recursively deep-copy <obj> with keys sorted
     */
        let sorted;
        if (typeof obj !== "object" || !obj) {
            return obj;
        }
        // recursively deep-copy list with child-keys sorted
        if (Array.isArray(obj)) {
            return obj.map(objectDeepCopyWithKeysSorted);
        }
        // recursively deep-copy obj with keys sorted
        sorted = {};
        Object.keys(obj).sort().forEach(function (key) {
            sorted[key] = objectDeepCopyWithKeysSorted(obj[key]);
        });
        return sorted;
    }
    console.error("shJsonNormalize - " + process.argv[1]);
    require("fs").writeFileSync(
        process.argv[1],
        JSON.stringify(objectDeepCopyWithKeysSorted(
            JSON.parse(require("fs").readFileSync(process.argv[1]))
        ), undefined, 4) + "\n"
    );
}());
' "$1" # '
)}

shNpmPackageDependencyTreeCreate() {(set -e
# this function will create svg-dependency-tree of npm-package
    local DIR
    shEnvSanitize
    if [ -f README.md ] && ! (grep -q -E "https://nodei.co/npm/$1\b" README.md)
    then
        return
    fi
    export MODE_CI=npmPackageDependencyTree
    # cleanup /tmp/node_modules
    rm -rf /tmp/node_modules
    DIR=/tmp/npmPackageDependencyTreeCreate
    rm -rf "$DIR" && mkdir -p "$DIR" && cd "$DIR"
    npm install "${2:-$1}" --prefix . || true
    shRunWithScreenshotTxtAfter () {(set -e
        node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let result;
    result = "";
    result += (
        "npm install - " + process.argv[1].split("\t")[0] +
        " KB\n\nnode_modules\n"
    );
    require("fs").readFileSync(
        require("os").tmpdir() + "/shRunWithScreenshotTxt.txt",
        "utf8"
    ).replace((
        /^\u0020*?[+`\u2502\u2514\u251c].*?$/gm
    ), function (line) {
        result += line + "\n";
        return "";
    });
    require("fs").writeFileSync(
        require("os").tmpdir() + "/shRunWithScreenshotTxt.txt",
        result
    );
}());
' "$(du -ks "$DIR/node_modules")" # '
    )}
    shRunWithScreenshotTxt npm ls || true
)}

shNpmPublishAlias() {(set -e
# this function will npm-publish $DIR as $NAME@$VERSION
    cd "$1"
    NAME="$2"
    VERSION="$3"
    export MODE_CI=npmPublishAlias
    shCiPrint "shNpmPublishAlias - $NAME"
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
        JSON.stringify(packageJson, undefined, 4) + "\n"
    );
}());
' "$NAME" "$VERSION" # '
    npm publish
)}

shNpmPublishV0() {(set -e
# this function will npm-publish name $1 with bare package.json
    DIR=/tmp/npmPublishV0
    rm -rf "$DIR" && mkdir -p "$DIR" && cd "$DIR"
    printf "{\"name\":\"$1\",\"version\":\"0.0.1\"}" > package.json
    npm publish
)}

shNpmTest() {(set -e
# this function will npm-test with coverage and create test-report
    local EXIT_CODE
    EXIT_CODE=0
    shCiPrint "shNpmTest - (node "$*")"
    # run node normally
    if [ ! "$npm_config_mode_test" ]
    then
        if [ "$npm_config_mode_coverage" ]
        then
            node "$UTILITY2_DIR_BIN/lib.istanbul.js" cover "$@" ||
                EXIT_CODE="$?"
        else
            node "$@" || EXIT_CODE="$?"
        fi
        shCiPrint "shNpmTest - EXIT_CODE=$EXIT_CODE"
        return "$EXIT_CODE"
    fi
    # npm-test without coverage
    if [ ! "$npm_config_mode_coverage" ]
    then
        node "$@" || EXIT_CODE="$?"
    # npm-test with coverage
    else
        # cleanup old coverage
        rm -f "$UTILITY2_DIR_BUILD/coverage/"coverage.*.json
        # npm-test with coverage
        node "$UTILITY2_DIR_BIN/lib.istanbul.js" cover "$@" || EXIT_CODE="$?"
        # if $EXIT_CODE != 0, then debug covered-test by re-running it uncovered
        if [ "$EXIT_CODE" != 0 ] && [ "$EXIT_CODE" != 130 ]
        then
            npm_config_mode_coverage="" node "$@" || true
        fi
    fi
    # create test-report artifacts
    (lib.utility2.js utility2.testReportCreate) || EXIT_CODE="$?"
    shCiPrint "shNpmTest - EXIT_CODE=$EXIT_CODE"
    return "$EXIT_CODE"
)}

shNpmTestPublished() {(set -e
# this function will npm-test published npm-package $npm_package_name
    export MODE_CI=npmTestPublished
    if [ "$TRAVIS" ] && ([ ! "$NPM_TOKEN" ] || (
        [ "$CI_BRANCH" = alpha ] &&
        (printf "$CI_COMMIT_MESSAGE" | grep -q -E "^\[npm publish")
    ))
    then
        shCiPrint "skip npm-test published-package $npm_package_name"
        return
    fi
    shEnvSanitize
    if [ "$1" ]
    then
        export npm_package_name="$1"
    fi
    shCiPrint "npm-test published-package $npm_package_name"
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

shPackageJsonVersionIncrement() {(set -e
# this function will increment package.json version
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let aa;
    let bb;
    let cc;
    let dd;
    let ii;
    let packageJson;
    let result;
    function onErrorThrow(err) {
    /*
     * this function will throw <err> if exists
     */
        if (err) {
            throw err;
        }
    }
    packageJson = require("./package.json");
    // increment packageJson.version
    aa = packageJson.version.replace((
        /^(\d+?\.\d+?\.)(\d+)(\.*?)$/
    ), function (ignore, match1, match2, match3) {
        return match1 + (Number(match2) + 1) + match3;
    });
    bb = String(process.argv[1] || packageJson.version).replace((
        /^today$/
    ), new Date().toISOString().replace((
        /T.*?$/
    ), "").replace((
        /-0?/g
    ), "."));
    [
        aa, bb
    ] = [
        aa, bb
    ].map(function (aa) {
        // filter "+" metadata
        // https://semver.org/#spec-item-10
        aa = aa.split("+")[0];
        // normalize x.y.z
        aa = aa.split(".");
        while (aa.length < 3) {
            aa.push("0");
        }
        // split "-" pre-release-identifier
        // https://semver.org/#spec-item-9
        aa = [].concat(aa.slice(0, 2), aa.slice(2).join(".").split("-"));
        // normalize x.y.z
        ii = 0;
        while (ii < 3) {
            aa[ii] = String(aa[ii] | 0);
            ii += 1;
        }
        return aa.map(function (aa) {
            return (
                Number.isFinite(Number(aa))
                ? Number(aa)
                : aa
            );
        });
    });
    // compare precedence
    // https://semver.org/#spec-item-11
    result = aa;
    ii = 0;
    while (ii < Math.max(aa.length, bb.length)) {
        cc = aa[ii];
        dd = bb[ii];
        if (
            dd === undefined ||
            (typeof cc !== "number" && typeof dd === "number")
        ) {
            result = bb;
            break;
        }
        if (
            cc === undefined ||
            (typeof cc === "number" && typeof dd !== "number")
        ) {
            result = aa;
            break;
        }
        if (cc < dd) {
            result = bb;
            break;
        }
        if (cc > dd) {
            result = aa;
            break;
        }
        ii += 1;
    }
    [
        aa, bb, result
    ] = [
        aa, bb, result
    ].map(function (aa) {
        return aa[0] + "." + aa[1] + "." + aa.slice(2).join("-");
    });
    packageJson.version = result;
    console.error([
        aa, bb, result
    ]);
    // update package.json
    require("fs").writeFile(
        "package.json",
        JSON.stringify(packageJson, undefined, 4) + "\n",
        onErrorThrow
    );
    // update README.md
    require("fs").readFile("README.md", "utf8", function (err, data) {
        onErrorThrow(err);
        require("fs").writeFile("README.md", data.replace((
            /^(####\u0020changelog\u0020|-\u0020npm\u0020publish\u0020|\u0020{4}"version":\u0020")\d+?\.\d+?\.\d[^\n",]*/gm
        ), "$1" + packageJson.version), function (err) {
            onErrorThrow(err);
            console.error(
                "shPackageJsonVersionIncrement - " + packageJson.version
            );
        });
    });
}());
' "$1" # '
)}

shRawLibDiff() {(set -e
# this function will diff-compare raw.xxx.js to lib.xxx.js
    diff -u "$(
        printf "$1" | sed -e "s/[^\\.]*\\./raw./"
    )" "$1" > /tmp/shRawLibDiff.diff || true
    vim -R /tmp/shRawLibDiff.diff
)}

shRawLibFetch() {(set -e
# this function will fetch raw-lib from $1
    export DIR=".tmp/raw.lib"
    rm -rf "$DIR" && mkdir -p "$DIR"
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let fetchList;
    let footer;
    let header;
    let opt;
    let replaceList;
    let repoDict;
    let requireDict;
    let result;
    function normalizeWhitespace(str) {
    /*
     * this function will normalize whitespace
     */
        // normalize newline
        str = str.replace((
            /\r\n|\r/g
        ), "\n");
        // remove trailing-whitespace
        str = str.replace((
            /[\t\u0020]+$/gm
        ), "");
        // remove leading-newline before ket
        str = str.replace((
            /\n+?(\n\u0020*?\})/g
        ), "$1");
        // eslint - no-multiple-empty-lines
        // https://github.com/eslint/eslint/blob/v7.2.0/docs/rules/no-multiple-empty-lines.md
        str = str.replace((
            /\n{4,}/g
        ), "\n\n\n");
        return str.trim() + "\n";
    }
    function onResponse(res, dict, key) {
    /*
     * this function will concat data from <res> to <dict>[<key>]
     */
        let data;
        data = [];
        res.on("data", function (chunk) {
            data.push(chunk);
        }).on("end", function () {
            dict[key] = Buffer.concat(data);
        });
    }
    function replaceAndWriteFile() {
    /*
     * this function will replace result with replaceList and write to file
     */
        let aa;
        let bb;
        let data;
        let result0;
        // replace from replaceList
        replaceList.forEach(function (elem) {
            result0 = result;
            result = result.replace(new RegExp(elem.aa, elem.flags), elem.bb);
            if (result0 === result) {
                throw new Error(
                    "shRawLibFetch - cannot find-and-replace snippet " +
                    JSON.stringify(elem.aa)
                );
            }
        });
        // replace from header
        header.replace((
            /((?:^-.*?\n)+?)((?:^\+.*?\n)+)/gm
        ), function (ignore, match1, match2) {
            aa = "\n" + match1.replace((
                /^-/gm
            ), "");
            bb = "\n" + match2.replace((
                /^\+/gm
            ), "");
            result0 = result;
            // disable $-escape in replacement-string
            result = result.replace(aa, function () {
                return bb;
            });
            if (result0 === result) {
                throw new Error(
                    "shRawLibFetch - cannot find-and-replace snippet " +
                    JSON.stringify(aa)
                );
            }
            return "";
        });
        // replace from fetchList
        fetchList.forEach(function (elem) {
            if (elem.type !== "dataUri") {
                return;
            }
            data = (
                "data:" + elem.contentType + ";base64," +
                elem.data.toString("base64")
            );
            result0 = result;
            result = result.replace(
                new RegExp("^" + elem.exports + "$", "gm"),
                // disable $-escape in replacement-string
                function () {
                    return data;
                }
            );
            if (result0 === result) {
                throw new Error(
                    "shRawLibFetch - cannot find-and-replace snippet " +
                    JSON.stringify(elem.exports)
                );
            }
        });
        require("fs").writeFileSync(
            process.argv[1],
            normalizeWhitespace(result)
        );
    }
    // init opt
    opt = (
        /^\/\*\nshRawLibFetch\n(\{\n[\S\s]*?\n\})([\S\s]*?)\n\*\/\n/m
    ).exec(require("fs").readFileSync(process.argv[1], "utf8"));
    // init footer
    footer = (
        /\n\/\*\nfile\u0020none\n\*\/\n([\S\s]+)/
    ).exec(opt.input);
    footer = String(
        (footer && footer[1].trim())
        ? "\n\n\n" + footer[1].trim() + "\n"
        : ""
    );
    // init header
    header = (
        opt.input.slice(0, opt.index) + "/*\nshRawLibFetch\n" +
        JSON.stringify(JSON.parse(opt[1]), undefined, 4) + "\n" +
        opt[2].split("\n\n").filter(function (elem) {
            return elem.trim();
        }).map(function (elem) {
            return elem.trim() + "\n";
        }).sort().join("\n") + "*/\n\n\n"
    );
    // JSON.parse opt with comment
    opt = JSON.parse(opt[1]);
    // init replaceList
    replaceList = opt.replaceList || [];
    // init repoDict, fetchList
    repoDict = {};
    fetchList = opt.fetchList;
    fetchList.forEach(function (elem) {
        if (!elem.url) {
            return;
        }
        elem.prefix = elem.url.split("/").slice(0, 7).join("/");
        // fetch dateCommitted
        if (!repoDict.hasOwnProperty(elem.prefix)) {
            repoDict[elem.prefix] = true;
            require("https").request(elem.prefix.replace(
                "/blob/",
                "/commits/"
            ), function (res) {
                onResponse(res, elem, "dateCommitted");
            }).end();
        }
        // fetch file
        if (elem.node) {
            onResponse(require("child_process").spawn("node", [
                "-e", elem.node
            ], {
                stdio: [
                    "ignore", "pipe", 2
                ]
            }).stdout, elem, "data");
            return;
        }
        if (elem.sh) {
            onResponse(require("child_process").spawn(elem.sh, {
                shell: true,
                stdio: [
                    "ignore", "pipe", 2
                ]
            }).stdout, elem, "data");
            return;
        }
        require("https").request(elem.url2 || elem.url.replace(
            "https://github.com/",
            "https://raw.githubusercontent.com/"
        ).replace("/blob/", "/"), function (res) {
            onResponse(res, elem, "data");
        }).end();
    });
    // parse fetched data
    process.on("exit", function () {
        result = "";
        requireDict = {};
        fetchList.forEach(function (elem) {
            let data;
            let prefix;
            if (!elem.url) {
                return;
            }
            // init prefix
            prefix = "exports_" + require("path").dirname(elem.url).replace(
                "https://github.com/",
                ""
            ).replace((
                /\/blob\/[^\/]*/
            ), "/").replace((
                /\W/g
            ), "_").replace((
                /(_)_+|_+$/g
            ), "$1");
            elem.exports = prefix + "_" + require("path").basename(
                elem.url
            ).replace((
                /\.js$/
            ), "").replace((
                /\W/g
            ), "_");
            if (elem.type === "dataUri") {
                return;
            }
            if (elem.dateCommitted) {
                result += (
                    "\n\n\n/*\n" +
                    "repo " + elem.prefix.replace("/blob/", "/tree/") + "\n" +
                    "committed " + (
                        /\b\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ\b/
                    ).exec(elem.dateCommitted)[0] + "\n" +
                    "*/"
                );
            }
            // mangle module.exports
            data = elem.data.toString();
            if (!opt.isRollupCommonJs) {
                result += "\n\n\n/*\nfile " + elem.url + "\n*/\n" + data.trim();
                return;
            }
            data = data.replace((
                /\bmodule\.exports\b|(^\u0020*?)exports\b/gm
            ), "$1" + elem.exports);
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
            result += "\n\n\n/*\nfile " + elem.url + "\n*/\n";
            if ((
                /\bpackage\.json$/
            ).test(elem.url)) {
                result += elem.exports + " = ";
            }
            result += data.trim();
        });
        // comment #!
        result = result.replace((
            /^#!/gm
        ), "// $&");
        // normalize whitespace
        result = normalizeWhitespace(result);
        if (!opt.isRollupCommonJs) {
            result = (
                header + result.trim() + "\n\n\n/*\nfile none\n*/\n" + footer
            );
            replaceAndWriteFile();
            return;
        }
        // comment ... = require(...)
        result = result.replace((
            /^\u0020*?[$A-Z_a-z].*?\brequire\(.*$/gm
        ), function (match0) {
            requireDict[match0.replace((
                /\bconst\b|\bvar\b/
            ), "let").trim()] = "";
            return "// " + match0;
        });
        result = result.replace((
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
        result = normalizeWhitespace(result);
        // normalize requireDict - let exports_... = {}
        result.replace((
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
        result.replace((
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
        header += "(function () {\n\"use strict\";\n";
        Object.keys(requireDict).map(function (key) {
            return (
                key.indexOf(" = exports_") >= 0
                ? ""
                : key.indexOf(" = require(") >= 0
                ? "1\u0000" + key
                : "2\u0000" + key
            );
        }).filter(function (elem) {
            return elem;
        }).sort().forEach(function (key) {
            key = key.split("\u0000")[1];
            header += requireDict[key] + key + "\n";
        });
        result = header + result.trim() + "\n";
        Object.keys(requireDict).map(function (key) {
            return (
                key.indexOf(" = exports_") >= 0
                ? key.replace((
                    /(.*?)\u0020=\u0020(.*?)$/gm
                ), function (ignore, match1, match2) {
                    return (
                        match2 + "\u0000" +
                        match1.padEnd(19, " ") + " = " + match2
                    );
                })
                : ""
            );
        }).filter(function (elem) {
            return elem;
        }).sort().forEach(function (key) {
            key = key.split("\u0000")[1];
            result += requireDict[key.replace((
                /\u0020{2,}/
            ), " ")] + key + "\n";
        });
        result += "}());\n\n\n/*\nfile none\n*/\n";
        replaceAndWriteFile();
    });
}());
' "$@" # '
)}

shReadmeEval() {(set -e
# this function will extract, save, and test script $FILE embedded in README.md
    shCiInit
    export MODE_CI=readmeEval
    shCiPrint "start - shReadmeEval $*"
    FILE="$1"
    if [ ! -f ".tmp/README.$FILE" ]
    then
        return
    fi
    case "$FILE" in
    build_ci.sh)
        FILE=.tmp/README.build_ci.sh
        ;;
    example.js)
        export MODE_CI=readmeEvalExampleJs
        ;;
    example.sh)
        export MODE_CI=readmeEvalExampleSh
        ;;
    esac
    if [ "$FILE" = example.js ] || [ "$FILE" = example.sh ]
    then
        DIR=/tmp/app
        rm -rf "$DIR" && mkdir -p "$DIR"
        # cp script from README.md
        cp ".tmp/README.$FILE" "$DIR/$FILE"
        cp ".tmp/README.$FILE" "$UTILITY2_DIR_BUILD/$FILE"
        # delete all leading blank lines at top of file
        # http://sed.sourceforge.net/sed1line.txt
        sed -in -e '/./,$!d' "$UTILITY2_DIR_BUILD/$FILE"
        rm -f "$UTILITY2_DIR_BUILD/$FILE"n
        cd "$DIR"
        if [ "$CI_BRANCH" = alpha ]
        then
            sed -in \
-e "s|/build..beta..travis-ci.com/|/build..alpha..travis-ci.com/|g" \
-e "s|npm install $npm_package_name|npm install $GITHUB_FULLNAME#alpha|g" \
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
    shCiPrint "test $FILE"
    case "$FILE" in
    .tmp/README.build_ci.sh)
        # delete all leading blank lines at top of file
        # delete all trailing blank lines at end of file
        # http://sed.sourceforge.net/sed1line.txt
        printf "# file-begin\n"
        cat "$FILE" | sed -e '/./,$!d' -e :a -e '/^\n*$/{$d;N;ba' -e '}'
        printf "\n# file-end\n\n\n"
        unset PORT && unset npm_config_timeout_exit && /bin/sh "$FILE"
        ;;
    example.js)
        SCRIPT="$(cat "$FILE" | grep -E "^ *\\\$ " | grep -o -E "\w.*")" || true
        # delete all leading blank lines at top of file
        # delete all trailing blank lines at end of file
        # http://sed.sourceforge.net/sed1line.txt
        printf "# file-begin\n"
        printf "$SCRIPT" | sed -e '/./,$!d' -e :a -e '/^\n*$/{$d;N;ba' -e '}'
        printf "\n# file-end\n\n\n"
        shRunWithScreenshotTxt eval "$SCRIPT" || true
        ;;
    example.sh)
        # delete all leading blank lines at top of file
        # delete all trailing blank lines at end of file
        # http://sed.sourceforge.net/sed1line.txt
        printf "# file-begin\n"
        cat "$FILE" | sed -e '/./,$!d' -e :a -e '/^\n*$/{$d;N;ba' -e '}'
        printf "\n# file-end\n\n\n"
        shRunWithScreenshotTxt /bin/sh "$FILE" || [ "$?" = 15 ]
        ;;
    esac
    shCiPrint "end - shReadmeEval $*"
)}

shReadmeLinkValidate() {(set -e
# this function will validate http-links embedded in README.md
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let set;
    set = new Set();
    require("fs").readFileSync("README.md", "utf8").replace((
        /[(\[](https?):\/\/.*?[)\]]/g
    ), function (match0, match1) {
        let req;
        match0 = match0.slice(1, -1).replace((
            /[\u0022\u0027]/g
        ), "").replace((
            /\bbeta\b|\bmaster\b/g
        ), "alpha").replace((
            /\/build\//g
        ), "/build..alpha..travis-ci.com/");
        // ignore private-link
        if (
            process.env.npm_package_private &&
            match0.indexOf("https://github.com/") === 0
        ) {
            return;
        }
        // ignore duplicate-link
        if (set.has(match0)) {
            return;
        }
        set.add(match0);
        req = require(match1).request(require("url").parse(
            match0
        ), function (res) {
            console.log(
                "shReadmeLinkValidate " + res.statusCode + " " + match0
            );
            if (!(res.statusCode < 400)) {
                throw new Error(
                    "shReadmeLinkValidate - invalid link " + match0
                );
            }
            req.abort();
            res.destroy();
        });
        req.setTimeout(30000);
        req.end();
    });
}());
' # '
)}

shRmDsStore() {(set -e
# this function will recursively rm .DS_Store from current-dir
# http://stackoverflow.com/questions/2016844/bash-recursively-remove-files
    for NAME in "._*" ".DS_Store" "desktop.ini" "npm-debug.log" "*~"
    do
        find . -iname "$NAME" -print0 | xargs -0 rm -f || true
    done
)}

shRun() {(set -e
# this function will run cmd "$@" with auto-restart
    local EXIT_CODE
    EXIT_CODE=0
    # eval argv
    if [ ! "$npm_config_mode_auto_restart" ] ||
        [ "$npm_config_mode_auto_restart_child" ]
    then
        "$@"
        return "$?"
    fi
    # eval argv and auto-restart on non-zero $EXIT_CODE, unless exited by SIGINT
    export npm_config_mode_auto_restart_child=1
    while true
    do
        printf "\n"
        git diff --color 2>/dev/null | cat || true
        printf "\nshRun - (re)starting $*\n"
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
    printf "shRun - EXIT_CODE=$EXIT_CODE\n"
    return "$EXIT_CODE"
)}

shRunWithScreenshotTxt() {(set -e
# this function will run cmd "$@" and screenshot text-output
# http://www.cnx-software.com/2011/09/22/how-to-convert-a-command-line-result-into-an-image-in-linux/
    local EXIT_CODE
    local SCREENSHOT_SVG
    EXIT_CODE=0
    SCREENSHOT_SVG=\
"${UTILITY2_DIR_BUILD:-$PWD/.tmp/build}/screenshot.${MODE_CI:-undefined}.svg"
    rm -f "$SCREENSHOT_SVG"
    printf "0\n" > "$SCREENSHOT_SVG.exit_code"
    shCiPrint "shRunWithScreenshotTxt - (shRun $* 2>&1)"
    (
        (shRun "$@" 2>&1) || printf "$?\n" > "$SCREENSHOT_SVG.exit_code"
    ) | tee /tmp/shRunWithScreenshotTxt.txt
    EXIT_CODE="$(cat "$SCREENSHOT_SVG.exit_code")"
    shCiPrint "shRunWithScreenshotTxt - EXIT_CODE=$EXIT_CODE"
    # run shRunWithScreenshotTxtAfter
    if (type shRunWithScreenshotTxtAfter > /dev/null 2>&1)
    then
        eval shRunWithScreenshotTxtAfter
        unset shRunWithScreenshotTxtAfter
    fi
    # format text-output
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let result;
    let yy;
    yy = 10;
    result = require("fs").readFileSync(
        require("os").tmpdir() + "/shRunWithScreenshotTxt.txt",
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
    }).trimEnd();
    // 96 column wordwrap
    result = result.replace((
        /^.*?$/gm
    ), function (line) {
        return line.replace((
            /.{0,96}/g
        ), function (line, ii) {
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
            ), "&gt;") + "</tspan>";
        }).replace((
            /(<\/tspan><tspan)/g
        ), "\\$1").slice();
    }) + "\n";
    result = (
        "<svg height=\"" + (yy + 20) +
        "px\" width=\"720px\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "<rect height=\"" + (yy + 20) +
        "px\" fill=\"#555\" width=\"720px\"></rect>\n" +
        "<text fill=\"#7f7\" font-family=\"Consolas, Menlo, monospace\" " +
        "font-size=\"12\" xml:space=\"preserve\">\n" +
        result + "</text>\n</svg>\n"
    );
    try {
        require("fs").mkdirSync(require("path").dirname(process.argv[1]), {
            recursive: true
        });
    } catch (ignore) {}
    require("fs").writeFileSync(process.argv[1], result);
}());
' "$SCREENSHOT_SVG" # '
    shCiPrint "shRunWithScreenshotTxt - wrote - $SCREENSHOT_SVG"
    return "$EXIT_CODE"
)}

shServerPortRandom() {(set -e
# this function will print random, unused tcp-port in range [0x8000, 0xffff]
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let port;
    let server;
    function recurse(err) {
        if (server) {
            server.close();
        }
        if (!err) {
            process.stdout.write(String(port));
            return;
        }
        port = Number(
            "0x" + require("crypto").randomBytes(2).toString("hex")
        ) | 0x8000;
        server = require("net").createServer().listen(port);
        server.on("error", recurse).on("listening", recurse);
    }
    recurse(true);
}());
' # '
)}

shSleep() {(set -e
# this function will sleep $1
    shCiPrint "sleep - $1"
    sleep "$1"
)}

shSource() {
# this function will source .bashrc
    . "$HOME/.bashrc"
}

shUtility2DependentsGitCommit() {(set -e
# this function will git-commit-and-push $UTILITY2_DEPENDENTS
    local DIR
    for DIR in $UTILITY2_DEPENDENTS
    do
        cd "$HOME/Documents/$DIR" || continue
        printf "\n\n\n#### shUtility2DependentsGitCommit - $PWD - $* ####\n\n\n"
        git commit -am "${1:-shUtility2GitCommitAndPush}" || true
    done
)}

shUtility2DependentsGrep() {(set -e
# this function will grep $UTILITY2_DEPENDENTS for regexp $1
    local DIR
    for DIR in $UTILITY2_DEPENDENTS
    do
        DIR="$HOME/Documents/$DIR"
        if [ -d "$DIR" ]
        then
            shGrep "$DIR" "$@"
        fi
    done
)}

shUtility2DependentsShellEval() {(set -e
# this function will shell-eval "$@" in utility2 and its dependents
    local DIR
    for DIR in $UTILITY2_DEPENDENTS
    do
        cd "$HOME/Documents/$DIR" || continue
        printf "\n\n\n#### shUtility2DependentsShellEval - $PWD - $* ####\n\n\n"
        eval "$@"
    done
    printf "\n\n\n"
)}

shUtility2DependentsVersion() {(set -e
# this function will print latest versions of $UTILITY2_DEPENDENTS
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let list;
    list = process.env.UTILITY2_DEPENDENTS.split(
        /\s/
    ).filter(function (elem) {
        return elem;
    });
    list.forEach(function (name, ii) {
        require("https").request((
            "https://registry.npmjs.org/" + name
        ), function (res) {
            let data;
            data = "";
            res.on("data", function (chunk) {
                data += chunk;
            }).on("end", function () {
                data = JSON.parse(data);
                list[ii] = data["dist-tags"].latest.replace((
                    /\b\d\b/g
                ), "0$&") + " " + name;
            }).setEncoding("utf8");
        }).end();
    });
    process.on("exit", function (exitCode) {
        if (exitCode) {
            return;
        }
        console.error(JSON.stringify(list.sort(), undefined, 4));
    });
}());
' # '
)}

shUtility2FncStat() {(set -e
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
' # '
)}

# run main-program
export UTILITY2_GIT_BASE_ID=9fe8c2255f4ac330c86af7f624d381d768304183
export UTILITY2_DEPENDENTS='
utility2
apidoc-lite
bootstrap-lite
istanbul-lite
jslint-lite
sqlite3-lite
'
(set -e
    if [ ! "$1" ]
    then
        exit
    fi
    CMD="$1"
    shift
    case "$CMD" in
    -*)
        shCiInit
        lib.utility2.js "$CMD" "$@"
        ;;
    help)
        shCiInit
        lib.utility2.js "$CMD" "$@"
        ;;
    source)
        shCiInit
        printf ". $UTILITY2_DIR_BIN/lib.utility2.sh\n"
        ;;
    start)
        shCiInit
        if [ "$1" ]
        then
            FILE="$1"
        else
            export npm_config_mode_start=1
            FILE="$UTILITY2_DIR_BIN/test.js"
        fi
        export npm_config_mode_auto_restart=1
        shRun shNpmTest "$FILE"
        ;;
    test)
        shCiInit
        export npm_config_mode_test=1
        shRunWithScreenshotTxt shNpmTest "$@"
        ;;
    utility2.*)
        shCiInit
        lib.utility2.js "$CMD" "$@"
        ;;
    utility2Dirname)
        shCiInit
        printf "$UTILITY2_DIR_BIN\n"
        ;;
    *)
        "$CMD" "$@"
        ;;
    esac
)
