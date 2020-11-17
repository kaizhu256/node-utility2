#!/bin/sh
# jslint utility2:true

# POSIX reference
# http://pubs.opengroup.org/onlinepubs/9699919799/utilities/test.html
# http://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html
# curl with custom CA certificates
# https://gist.github.com/olih/a50ce2181a657eefb041

# useful sh one-liners
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
# npm_package_private=1 GITHUB_FULLNAME=aa/node-aa-bb-pro shCryptoWithGithubOrg aa shCryptoTravisEncrypt
# openssl rand -base64 32 # random key
# printf "$USERNAME:$(openssl passwd -apr1 "$PASSWD")\n" # htpasswd
# shCryptoWithGithubOrg aa shCryptoTravisDecrypt ciphertext.txt
# shCryptoWithGithubOrg aa shCryptoTravisEncrypt plaintext.txt
# shCryptoWithGithubOrg aa shTravisRepoCreate aa/node-aa-bb
# shCryptoWithGithubOrg aa shTravisRepoTrigger aa/node-aa-bb alpha
# shCryptoWithGithubOrg aa shGithubApiRateLimitGet
# shCryptoWithGithubOrg aa shGithubRepoTouch aa/node-aa-bb alpha "[build app]"
# shDockerRestartUtility2 work kaizhu256/node-utility2
# shDockerSh work 'cd ~/Documents/utility2 && PORT=4065 npm start'
# shDockerSh work 'shUtility2DependentsShellEval shBuildApp'
# npm test --mode-coverage --mode-test-case2=_testCase_webpage_default,testCase_nop_default
# utility2 shReadmeEval example.js
# vim rgx-lowercase \L\1\e

shBaseInit () {
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

shBaseInstall () {
# this function will install .bashrc, .screenrc, .vimrc, and lib.utility2.sh in $HOME,
# and is intended for aws-ec2 setup
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

shBashrcDebianInit () {
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

shBrowserScreenshot () {(set -e
# this function will run headless-chromium to screenshot url "$1"
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let file;
    let timeStart;
    let url;
    timeStart = Date.now();
    url = process.argv[1];
    if (!(
        /^\w+?:/
    ).test(url)) {
        url = require("path").resolve(url);
    }
    file = require("url").parse(url).pathname;
    if (String(
        file + require("path").sep
    ).indexOf(process.cwd() + require("path").sep) === 0) {
        file = file.replace(process.cwd(), "");
    }
    file = require("path").resolve(
        process.env.npm_config_dir_build
        + "/screenshot."
        + process.env.MODE_BUILD + ".browser."
        + encodeURIComponent(file.replace(
            "/build.." + process.env.CI_BRANCH + ".." + process.env.CI_HOST,
            "/build"
        ))
        + ".png"
    );
    process.on("exit", function (exitCode) {
        if (typeof exitCode === "object" && exitCode) {
            console.error(exitCode);
            exitCode = 1;
        }
        console.error(
            "\nshBrowserScreenshot"
            + " - " + (Date.now() - timeStart) + " ms"
            + " - exitCode " + exitCode
            + " - " + url
            + " - " + file
            + "\n"
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
        "-screenshot=" + file,
        url
    ], {
        stdio: [
            "ignore", 1, 2
        ]
    });
}());
' "$1" "$2" # '
)}

shBrowserTest () {(set -e
# this function will spawn google-chrome-process to test url $1,
# and merge test-report into existing test-report
    export MODE_BUILD="${MODE_BUILD:-browserTest}"
    shBuildPrint "shBrowserTest $*"
    # run browser-test
    lib.utility2.js utility2.browserTest "$1"
    # create test-report artifacts
    lib.utility2.js utility2.testReportCreate
)}

shBuildApidoc () {(set -e
# this function will build apidoc
    shEnvSanitize
    export MODE_BUILD=buildApidoc
    npm test --mode-coverage="" --mode-test-case=testCase_buildApidoc_default
)}

shBuildApp () {(set -e
# this function will build app in "$PWD" with name "$1"
    # if windows-env, then run inside docker
    case "$(uname)" in
    MINGW*)
        shDockerSh work shBuildApp
        return
        ;;
    esac
    shEnvSanitize
    export MODE_BUILD=buildApp
    # cleanup empty-file
    find . -maxdepth 1 -empty | xargs rm -f
    # update app-name to "$1"
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
    # hardlink file .gitignore, lib.xxx, assets.utility2.rollup.js
    # hardlink file ~/lib.utility2.sh, bin/utility2
    # bin/utility2-apidoc, bin/utility2-istanbul, bin/utility2-jslint
    # update file .travis.yml, npm_scripts.sh
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let dirBin;
    let dirDev;
    let fs;
    let path;
    function onErrorThrow(err) {
    /*
     * this function will throw <err> if exists
     */
        if (err) {
            throw err;
        }
    }
    fs = require("fs");
    path = require("path");
    dirBin = path.resolve(process.env.HOME + "/bin") + path.sep;
    dirDev = path.resolve(process.env.HOME + "/Documents/utility2") + path.sep;
    if (!fs.existsSync(dirDev + "lib.utility2.js")) {
        return;
    }
    // hardlink file ~/lib.utility2.sh, bin/utility2
    // bin/utility2-apidoc, bin/utility2-istanbul, bin/utility2-jslint
    [
        [
            dirDev + "lib.utility2.sh", path.resolve(
                process.env.HOME + "/lib.utility2.sh"
            )
        ],
        [
            dirDev + "lib.utility2.sh", dirBin + "utility2"
        ],
        [
            dirDev + "lib.apidoc.js", dirBin + "utility2-apidoc"
        ],
        [
            dirDev + "lib.istanbul.js", dirBin + "utility2-istanbul"
        ],
        [
            dirDev + "lib.jslint.js", dirBin + "utility2-jslint"
        ]
    ].forEach(function ([
        aa, bb
    ]) {
        fs.unlink(bb, function (ignore) {
            fs.link(aa, bb, function (err) {
                onErrorThrow(err);
                console.error("shBuildApp - hardlink - " + bb);
            });
        });
    });
    if (process.cwd() === path.resolve(dirDev)) {
        return;
    }
    // hardlink file .gitignore, lib.xxx, assets.utility2.rollup.js
    fs.readdir(dirDev, function (err, fileList) {
        onErrorThrow(err);
        fileList.concat([
            "assets.utility2.rollup.js"
        ]).forEach(function (file) {
            if (!(
                file === ".gitignore"
                || file === "assets.utility2.rollup.js"
                || file.indexOf("lib.") === 0
            )) {
                return;
            }
            fs.access(file, function (notExist) {
                if (notExist) {
                    return;
                }
                fs.unlink(file, function (err) {
                    onErrorThrow(err);
                    fs.link((
                        file === "assets.utility2.rollup.js"
                        ? path.resolve(
                            dirDev + ".tmp/build/app/assets.utility2.rollup.js"
                        )
                        : dirDev + file
                    ), file, function (err) {
                        onErrorThrow(err);
                        console.error("shBuildApp - hardlink - " + file);
                    });
                });
            });
        });
    });
    // update file .travis.yml, npm_scripts.sh
    [
        ".travis.yml", "npm_scripts.sh"
    ].forEach(function (file) {
        let aa;
        let bb;
        fs.readFile(file, "utf8", function (err, data) {
            if (err) {
                return;
            }
            bb = data;
            fs.readFile(dirDev + file, "utf8", function (err, data) {
                onErrorThrow(err);
                aa = data;
                [
                    (
                        /\n\u0020{4}-\u0020secure:\u0020.*?\u0020#\u0020CRYPTO_AES_KEY\n/
                    ), (
                        /\n\u0020{4}#\u0020run\u0020command\u0020-\u0020custom\n[\S\s]*?\n\u0020{4}esac\n/
                    ), (
                        /\n\)\}\n[\S\s]*?\n#\u0020run\u0020command\n/
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
                    fs.writeFile(file, aa, onErrorThrow);
                    console.error("shBuildApp - modified - " + file);
                }
            });
        });
    });
}());
' # '
    # create file if not exists
    # .gitignore, .travis.yml, LICENSE, npm_scripts.sh
    # package.json
    # README.md, lib.$npm_package.nameLib.js, test.js
    node -e '
/* jslint utility2:true */
(function (local) {
    "use strict";
    let fs;
    let modeUtility2Rollup;
    function onErrorThrow(err) {
    /*
     * this function will throw <err> if exists
     */
        if (err) {
            throw err;
        }
    }
    fs = require("fs");
    // fetch file .gitignore, .travis.yml, LICENSE, npm_scripts.sh
    [
        ".gitignore", ".travis.yml", "LICENSE", "npm_scripts.sh"
    ].forEach(function (file) {
        fs.access(file, function (notExist) {
            if (!notExist) {
                return;
            }
            require("https").request((
                "https://raw.githubusercontent.com/kaizhu256/node-utility2"
                + "/alpha/" + file
            ), function (res) {
                res.pipe(fs.createWriteStream(file).on("close", function () {
                    if (file === "npm_scripts.sh") {
                        fs.chmod(file, 0o755, onErrorThrow);
                    }
                }));
            }).end();
        });
    });
    // create file package.json
    fs.readFile("package.json", "utf8", function (err, aa) {
        let bb;
        onErrorThrow(err);
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
            fs.writeFile("package.json", bb, onErrorThrow);
            console.error("shBuildApp - modified - package.json");
        }
    });
    // create file README.md, lib.$npm_package.nameLib.js, test.js
    modeUtility2Rollup = fs.existsSync("assets.utility2.rollup.js");
    [
        "README.md",
        "lib." + process.env.npm_package_nameLib + ".js",
        "test.js"
    ].forEach(function (file) {
        fs.access(file, function (notExist) {
            if (!notExist) {
                return;
            }
            fs.writeFile(file, local.templateRenderMyApp((
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
            }), {}).trimRight() + "\n", function (err) {
                onErrorThrow(err);
                console.error("shBuildApp - modified - " + file);
            });
        });
    });
}(require(process.env.npm_config_dir_utility2)));
' # '
    # build app
    npm test --mode-coverage="" --mode-test-case=testCase_buildApp_default
    # git diff
    if [ -d .git ]
    then
        git --no-pager diff HEAD
    fi
)}

shBuildCi () {(set -e
# this function will run main-build
    shBuildInit
    export MODE_BUILD=buildCi
    # init travis-ci.com env
    if [ "$TRAVIS" ]
    then
        export CI_HOST="${CI_HOST:-travis-ci.com}"
        git remote remove origin 2>/dev/null || true
        git remote add origin "https://github.com/$GITHUB_FULLNAME"
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
        "[build app"*)
            node -e '
/* jslint utility2:true */
(function (local) {
    "use strict";
    if (require("fs").existsSync("assets.utility2.rollup.js")) {
        require("fs").writeFileSync(
            "assets.utility2.rollup.js",
            local.assetsDict["/assets.utility2.rollup.js"]
        );
    }
}(require("utility2")));
' # '
            shBuildApp
            ;;
        # example use:
        # shCryptoWithGithubOrg kaizhu256 shGithubRepoTouch kaizhu256/node-swgg-github-misc alpha "[git squashPop HEAD~1] [npm publishAfterCommitAfterBuild]"
        "[git squashPop "*)
            shGitSquashPop \
                "$(shGithubRepoBranchId $(
                    printf "$CI_COMMIT_MESSAGE_META" | sed -e "s/.* //"
                ))" \
                "$(printf "$CI_COMMIT_MESSAGE" | sed -e "s/\[[^]]*\] //")"
            shGitCommandWithGithubToken push \
                "https://github.com/$GITHUB_FULLNAME" -f HEAD:alpha
            return
            ;;
        # example use:
        # shCryptoWithGithubOrg npmdoc shGithubRepoTouch "npmdoc/node-npmdoc-mysql npmdoc/node-npmdoc-mysql" alpha "[npm publishAfterCommitAfterBuild]"
        "[npm publishAfterCommitAfterBuild]"*)
            if [ ! "$GITHUB_TOKEN" ]
            then
                shBuildPrint "no GITHUB_TOKEN"
                return 1
            fi
            shBuildApp
            rm -rf "$npm_config_dir_utility2"
            git clone https://github.com/kaizhu256/node-utility2 \
                "$npm_config_dir_utility2" \
                --branch=alpha --single-branch --depth=50
            mkdir -p "$npm_config_dir_utility2/.tmp/build/app"
            curl -Lf -o \
"$npm_config_dir_utility2/.tmp/build/app/assets.utility2.rollup.js" \
https://raw.githubusercontent.com\
/kaizhu256/node-utility2/gh-pages/build..alpha..travis-ci.com/app\
/assets.utility2.rollup.js
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
        # example use:
        # shCryptoWithGithubOrg kaizhu256 shGithubRepoTouch kaizhu256/node-sandbox2 task "[debug travis@proxy.com root]"
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
        # example use:
        # shCryptoWithGithubOrg kaizhu256 shGithubRepoTouch kaizhu256/node-swgg-github-misc task "[git push origin beta:master]"
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
            # increment $npm_package_version
            shPackageJsonVersionIncrement today
            # git commit and push
            git add .
            git commit -am "[ci skip] $CI_COMMIT_MESSAGE"
            shGitCommandWithGithubToken push \
                "https://github.com/$GITHUB_FULLNAME" -f HEAD:alpha
            npm run build-ci
            return
            ;;
        "[npm publish]"*)
            shGitCommandWithGithubToken push \
                "https://github.com/$GITHUB_FULLNAME" HEAD:publish
            ;;
        "[npm publishAfterCommit]"*)
            export CI_BRANCH=publish
            export CI_BRANCH_OLD=publish
            find node_modules -name .git -print0 | xargs -0 rm -rf
            npm run build-ci
            ;;
        "[npm publishAfterCommitAfterBuild]"*)
            # increment $npm_package_version
            shPackageJsonVersionIncrement today
            # git commit and push
            git add .
            git commit -am "[npm publishAfterCommit]"
            shGitCommandWithGithubToken push \
                "https://github.com/$GITHUB_FULLNAME" -f HEAD:alpha
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
            "https://github.com/$GITHUB_FULLNAME" "$npm_package_version" || true
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
                "https://github.com/$GITHUB_FULLNAME" -f HEAD:alpha
            ;;
        *)
            shGitCommandWithGithubToken push \
                "https://github.com/$GITHUB_FULLNAME" HEAD:beta
            ;;
        esac
        ;;
    esac
    # sync with $npm_package_githubRepoAlias
    if [ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ]
    then
        for GITHUB_FULLNAME_ALIAS in $npm_package_githubRepoAlias
        do
            shGithubRepoCreate "$GITHUB_FULLNAME_ALIAS"
            shGitCommandWithGithubToken push \
                "https://github.com/$GITHUB_FULLNAME_ALIAS" --tags -f "$CI_BRANCH"
            if [ "$CI_BRANCH" = alpha ] && [ "$npm_package_description" ]
            then
                shGithubRepoDescriptionUpdate "$GITHUB_FULLNAME_ALIAS" \
                "$npm_package_description" || true
            fi
        done
    fi
)}

shBuildCiInternal () {(set -e
# this function will run internal-build
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
    shNpmPackageDependencyTreeCreate "$npm_package_name" "$GITHUB_FULLNAME#alpha"
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
        COMMIT_LIMIT=100 shBuildGithubUpload
    fi
    shGitInfo | head -n 4096 || true
    # validate http-links embedded in README.md
    if [ ! "$npm_package_private" ] && ! (
        printf "$CI_COMMIT_MESSAGE_META" |
        grep -q -E "^build app|^npm publishAfterCommitAfterBuild"
    )
    then
        shSleep 60
        shReadmeLinkValidate
    fi
)}

shBuildGithubUpload () {(set -e
# this function will upload build-artifacts to github
    export MODE_BUILD="${MODE_BUILD:-buildGithubUpload}"
    shBuildPrint "uploading build-artifacts to https://github.com/$GITHUB_FULLNAME"
    URL="https://github.com/$GITHUB_FULLNAME"
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
            "$GITHUB_FULLNAME" "$npm_package_description" || true
    fi
)}

shBuildInit () {
# this function will init env
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
        else
            export npm_config_dir_utility2="$(node -e '
/* jslint utility2:true */
try {
    process.stdout.write(require("path").dirname(require.resolve("utility2")));
} catch (ignore) {
    process.stdout.write(require("path").resolve(
        process.env.HOME + "/node_modules/utility2"
    ));
}
')" # '
        fi
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
    let cmd;
    let packageJson;
    function export2(key, val) {
    /*
     * this function will export "key=val" to shell-env
     */
        return "export " + key + "=\u0027" + String(val || "").replace((
            /\u0027/g
        ), "\u0027\"\u0027\"\u0027") + "\u0027\n";
    }
    packageJson = require("./package.json");
    cmd = "# shBuildInit env\n";
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
        cmd += export2("npm_package_" + key, packageJson[key]);
    });
    String(
        (packageJson.repository && packageJson.repository.url)
        || packageJson.repository
        || ""
    ).replace((
        /([^\/]+?)\/([^\/]+?)(?:\.git)?$/
    ), function (ignore, user, project) {
        if (!process.env.GITHUB_FULLNAME) {
            cmd += export2("GITHUB_FULLNAME", user + "/" + project);
        }
        if (!process.env.GITHUB_ORG) {
            cmd += export2("GITHUB_ORG", user);
        }
    });
    process.stdout.write(cmd);
    process.stderr.write(cmd);
}());
')" || return "$?" # '
    else
        export npm_package_name=my-app-lite || return "$?"
        export npm_package_version=0.0.1 || return "$?"
    fi
    export npm_package_nameLib="${npm_package_nameLib:-$(
        printf "$npm_package_name" | sed -e "s/[^0-9A-Z_a-z]/_/g"
    )}" || return "$?"
    # init $npm_config_*
    export npm_config_dir_build="${npm_config_dir_build:-$PWD/.tmp/build}" ||
        return "$?"
    mkdir -p "$npm_config_dir_build/coverage" || return "$?"
    export npm_config_dir_tmp="$PWD/.tmp" || return "$?"
    mkdir -p "$npm_config_dir_tmp" || return "$?"
    export npm_config_file_tmp="${npm_config_file_tmp:-$PWD/.tmp/tmpfile}" ||
        return "$?"
    # extract and save scripts embedded in README.md to .tmp/
    if [ -f README.md ]
    then
        node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    require("fs").readFileSync("README.md", "utf8").replace((
        /```\w*?(\n[\s#*\/]*?(\w[\w\-]*?\.\w*?)[\n"][\S\s]*?)\n```/g
    ), function (match0, match1, match2, ii, text) {
        let filename;
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
        filename = require("path").resolve(".tmp/README." + match2);
        require("fs").writeFile(filename, match0.trimEnd() + "\n", function (
            err
        ) {
            if (err) {
                throw err;
            }
            console.error("shBuildInit - wrote " + filename);
        }
);
    });
}());
' # '
    fi
}

shBuildInsideDocker () {(set -e
# this function will run build inside docker
    shEnvSanitize
    export npm_config_unsafe_perm=1
    # bug-workaround - Cannot read property 'target' of null #10686
    # https://github.com/npm/npm/issues/10686
    sed -in -e 's/  "_requiredBy":/  "_requiredBy_":/' package.json
    rm -f package.jsonn
    # npm-install
    npm install
    # npm-test
    npm test --mode-coverage
    # cleanup .tmp
    rm -rf .tmp
    # cleanup build
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

shBuildPrint () {(set -e
# this function will print debug-info about current build-state
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    process.stderr.write("\n" + (
        (process.stderr.hasColors && process.stderr.hasColors())
        ? "\u001b[35m"
        : ""
    ) + "[MODE_BUILD=" + process.env.MODE_BUILD + "]" + (
        (process.stderr.hasColors && process.stderr.hasColors())
        ? "\u001b[0m"
        : ""
    ) + " - " + new Date().toISOString() + " - " + process.argv[1] + "\n\n");
}());
' "$1" # '
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

shCryptoAesXxxCbcRawEncrypt () {(set -e
# this function will inplace aes-xxx-cbc encrypt stdin with given hex-key $1
# example use:
# printf 'hello world\n' | shCryptoAesXxxCbcRawEncrypt 0123456789abcdef0123456789abcdef | shCryptoAesXxxCbcRawDecrypt 0123456789abcdef0123456789abcdef
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let bufList;
    function assertOrThrow(passed, msg) {
    /*
     * this function will throw <msg> if <passed> is falsy
     */
        if (passed) {
            return;
        }
        throw (
            (
                msg
                && typeof msg.message === "string"
                && typeof msg.stack === "string"
            )
            // if msg is err, then leave as is
            ? msg
            : new Error(
                typeof msg === "string"
                // if msg is string, then leave as is
                ? msg
                // else JSON.stringify(msg)
                : JSON.stringify(msg, undefined, 4)
            )
        );
    }
    function cryptoAesXxxCbcRawEncrypt(opt, onError) {
    /*
     * this function will aes-xxx-cbc encrypt with given <opt>
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
        // init iv
        iv.set(crypto.getRandomValues(new Uint8Array(16)));
        crypto.subtle.importKey("raw", key, {
            name: "AES-CBC"
        }, false, [
            "encrypt"
        ]).then(function (key) {
            crypto.subtle.encrypt({
                iv: iv.slice(0, 16),
                name: "AES-CBC"
            }, key, data).then(function (data) {
                iv.set(new Uint8Array(data), 16);
                // base64
                if (opt.mode === "base64") {
                    iv = Buffer.from().toString("base64").replace((
                        /\=/g
                    ), "");
                    iv += "\n";
                }
                onError(undefined, iv);
            }).catch(onError);
        }).catch(onError);
    }
    bufList = [];
    process.stdin.on("data", function (chunk) {
        bufList.push(chunk);
    });
    process.stdin.on("end", function () {
        cryptoAesXxxCbcRawEncrypt({
            data: Buffer.concat(bufList),
            key: process.argv[1],
            mode: process.argv[2]
        }, function (err, data) {
            assertOrThrow(!err, err);
            Object.setPrototypeOf(data, Buffer.prototype);
            process.stdout.write(data);
        });
    });
}());
' "$@" # '
)}

shCryptoTravisDecrypt () {(set -e
# this function will use $CRYPTO_AES_KEY to decrypt $SH_ENCRYPTED to stdout
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
    local FILE="$1"
    if [ -f "$FILE" ]
    then
        cat "$FILE" | shCryptoAesXxxCbcRawDecrypt "$CRYPTO_AES_KEY" base64
        return
    fi
    # decrypt CRYPTO_AES_SH_ENCRYPTED_$GITHUB_ORG
    URL="https://raw.githubusercontent.com\
/kaizhu256/node-utility2/gh-pages/.CRYPTO_AES_SH_ENCRYPTED_$GITHUB_ORG"
    shBuildPrint "decrypting $URL ..."
    curl -Lf "$URL" | shCryptoAesXxxCbcRawDecrypt "$CRYPTO_AES_KEY" base64
)}

shCryptoTravisEncrypt () {(set -e
# this function will encrypt $CRYPTO_AES_SH_ENCRYPTED to .travis.yml,
# and use $CRYPTO_AES_KEY to encrypt $FILE to stdout
    export MODE_BUILD=cryptoTravisEncrypt
    if [ ! "$CRYPTO_AES_KEY" ]
    then
        shBuildPrint "no CRYPTO_AES_KEY"
        return 1
    fi
    local FILE="$1"
    if [ -f "$FILE" ]
    then
        cat "$FILE" | shCryptoAesXxxCbcRawEncrypt "$CRYPTO_AES_KEY" base64
        return
    fi
    if [ -f .travis.yml ]
    then
        TMPFILE="$(mktemp)"
        URL="https://api.travis-ci.com/repos/$GITHUB_FULLNAME/key"
        shBuildPrint "fetch $URL"
        curl -Lf -H "Authorization: token $TRAVIS_ACCESS_TOKEN" "$URL" |
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
)}

shCryptoWithGithubOrg () {(set -e
# this function will run "$@" with private $GITHUB_ORG-env
    export GITHUB_ORG="$1"
    shift
    . "$HOME/.ssh/.CRYPTO_AES_SH_DECRYPTED_$GITHUB_ORG"
    "$@"
)}

shDeployCustom () {
# this function will do nothing
    return
}

shDeployGithub () {(set -e
# this function will deploy app to $GITHUB_FULLNAME
# and run simple curl-check for $TEST_URL
# and test $TEST_URL
    export MODE_BUILD=deployGithub
    export TEST_URL="https://$(
        printf "$GITHUB_FULLNAME" | sed -e "s/\//.github.io\//"
    )/build..$CI_BRANCH..travis-ci.com/app"
    shBuildPrint "deployed to $TEST_URL"
    # verify deployed app''s main-page returns status-code < 400
    shSleep 15
    if [ "$(
        curl -L --connect-timeout 60 -o /dev/null -w "%{http_code}" "$TEST_URL"
    )" -lt 400 ]
    then
        shBuildPrint "curl test passed for $TEST_URL"
    else
        shBuildPrint "curl test failed for $TEST_URL"
        return 1
    fi
    # screenshot deployed app
    shBrowserScreenshot "$TEST_URL" &
    # test deployed app
    MODE_BUILD="${MODE_BUILD}Test" \
        shBrowserTest "$TEST_URL?modeTest=1&timeExit={{timeExit}}"
)}

shDeployHeroku () {(set -e
# this function will deploy app to heroku
# and run simple curl-check for $TEST_URL
# and test $TEST_URL
    export npm_package_nameHeroku=\
"${npm_package_nameHeroku:-$(printf "h1-$npm_package_nameLib" | tr "_" "-")}"
    # build app inside heroku
    if [ "$npm_lifecycle_event" = heroku-postbuild ]
    then
        shBuildApp
        cp "$npm_config_dir_build"/app/*.js .
        printf "web: npm_config_mode_backend=1 node assets.app.js\n" > Procfile
        # cleanup .tmp
        rm -rf .tmp
        return
    fi
    export MODE_BUILD=deployHeroku
    export TEST_URL="https://$npm_package_nameHeroku-$CI_BRANCH.herokuapp.com"
    shBuildPrint "deployed to $TEST_URL"
    # verify deployed app''s main-page returns status-code < 400
    shSleep 15
    if [ "$(
        curl -L --connect-timeout 60 -o /dev/null -w "%{http_code}" "$TEST_URL"
    )" -lt 400 ]
    then
        shBuildPrint "curl test passed for $TEST_URL"
    else
        shBuildPrint "curl test failed for $TEST_URL"
        return 1
    fi
    # screenshot deployed app
    shBrowserScreenshot "$TEST_URL" &
    # test deployed app
    MODE_BUILD="${MODE_BUILD}Test" \
        shBrowserTest "$TEST_URL?modeTest=1&timeExit={{timeExit}}"
)}

shDockerCdHostPwd () {
# this function will cd $HOST_PWD inside docker
    cd "$(node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    let chdir;
    let home;
    let pwd;
    chdir = process.env.PWD;
    home = process.env.HOST_HOME + "/";
    pwd = process.env.HOST_PWD + "/";
    if (home.length > 1 && pwd.indexOf(home) === 0) {
        chdir = require("path").resolve(
            process.env.HOME + "/" + pwd.replace(home, "")
        );
    } else if (pwd.indexOf("G:/") === 0) {
        chdir = pwd.replace("G:/", "/mnt/");
    }
    console.log(chdir);
}());
')" # '
}

shDockerRestartNginx () {(set -e
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

shDockerRestartTransmission () {(set -e
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

shDockerRestartUtility2 () {(set -e
# this function will restart docker-container $1 $2 with utility2 env
    docker rm -fv "$1" || true
    case "$(uname)" in
    Darwin)
        LOCALHOST="${LOCALHOST:-192.168.99.100}"
        ;;
    MINGW*)
        export HOME="$USERPROFILE"
        ;;
    *)
        LOCALHOST="${LOCALHOST:-127.0.0.1}"
        ;;
    esac
    if [ -d /g ]
    then
        DOCKER_V_GAME="-v g:/:/mnt"
    fi
    docker run --name "$1" -dt -e debian_chroot="$1" \
        $DOCKER_V_GAME \
        -v "$HOME:/root" \
        -p "$LOCALHOST:4065:4065" \
        -p "$LOCALHOST:9229:9229" \
        "$2"
)}

shDockerRm () {(set -e
# this function will rm docker-containers "$@"
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
# this function will run /bin/bash in docker-container $1
    local CMD;
    CMD="[ -f ~/lib.utility2.sh ] && . ~/lib.utility2.sh && shBaseInit"
    CMD="$CMD && shDockerCdHostPwd;"
    CMD="$CMD ${2:-bash}"
    docker start "$1"
    case "$(uname)" in
    MINGW*)
        winpty docker exec \
            -e HOST_HOME="$HOME" -e HOST_PWD="$PWD" \
            -it "$1" sh -c "$CMD"
        ;;
    *)
        docker exec \
            -e HOST_HOME="$HOME" -e HOST_PWD="$PWD" \
            -it "$1" sh -c "$CMD"
        ;;
    esac
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
')" # '
}

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
        URL="https://$GITHUB_TOKEN@github.com/$GITHUB_FULLNAME"
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

shGitInitBase () {(set -e
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

shGitLsTree () {(set -e
# this function will list all files committed in HEAD
# example use:
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

shGithubApiRateLimitGet () {(set -e
# this function will fetch current rate-limit with given $GITHUB_TOKEN
    curl -Lf -H "Authorization: token $GITHUB_TOKEN" -I https://api.github.com
)}

shGithubRepoCreate () {(set -e
# this function will create base github-repo https://github.com/$GITHUB_FULLNAME
    local GITHUB_FULLNAME="$1"
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
            "https://api.github.com/orgs/"
            + process.argv[1].split("/")[0]
            + "/repos"
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
    shGitCommandWithGithubToken push \
        "https://github.com/$GITHUB_FULLNAME" beta || true
    # push all branches
    shGitCommandWithGithubToken push \
        "https://github.com/$GITHUB_FULLNAME" --all || true
)}

shGithubRepoDescriptionUpdate () {(set -e
# this function will update github-repo description
    shSleep 5
    GITHUB_FULLNAME="$1"
    DESCRIPTION="$2"
    shBuildPrint "update $GITHUB_FULLNAME description"
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

shGithubRepoTouch () {(set -e
# this function will touch github-repo $1, branch $2, with commit-message $2
    node -e '
/* jslint utility2:true */
(function () {
    "use strict";
    require("https").request((
        "https://api.github.com/repos/" + process.argv[1]
        + "/contents/package.json?ref=" + process.argv[2]
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

                "https://api.github.com/repos/" + process.argv[1]
                + "/contents/package.json?branch=" + process.argv[2]
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

shGrep () {(set -e
# this function will recursively grep $DIR for $REGEXP
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

shGrepReplace () {(set -e
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

shHttpFileServer () {(set -e
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

shImageToDataUri () {(set -e
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
        "data:image/"
        + require("path").extname(process.argv[1]).slice(1)
        + ";base64,"
        + require("fs").readFileSync(process.argv[1]).toString("base64")
    );
}());
' "$FILE" # '
)}

shIstanbulCover () {(set -e
# this function will run command "$NODE_BIN" "$@" with istanbul-coverage
    export NODE_BIN="${NODE_BIN:-node}"
    if [ "$npm_config_mode_coverage" ]
    then
        "$NODE_BIN" "$npm_config_dir_utility2/lib.istanbul.js" cover "$@"
        return "$?"
    fi
    if [ "$npm_config_mode_inspect" ]
    then
        "$NODE_BIN" --inspect-brk=0.0.0.0 "$@"
        return "$?"
    fi
    if [ "$npm_config_mode_winpty" ] &&
        [ "$MSYSTEM" ] &&
        (winpty --version > /dev/null 2>&1)
    then
        winpty "$NODE_BIN" "$@"
        return "$?"
    fi
    "$NODE_BIN" "$@"
)}

shJsonNormalize () {(set -e
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

shMacAddressSpoof () {(set -e
# this function will spoof mac-address $1
    MAC_ADDRESS="${1-$(openssl rand -hex 6 | sed 's/\(..\)/\1:/g; s/.$//')}"
    printf "spoofing mac address $MAC_ADDRESS\n"
    sudo ifconfig en0 ether "$MAC_ADDRESS"
    # sudo ifconfig en0 ether Wi-Fi "$MAC_ADDRESS"
    ifconfig en0
)}

shNpmDeprecateAlias () {(set -e
# this function will deprecate npm-package $NAME with given $MESSAGE
# example use:
# shNpmDeprecateAlias deprecated-package
    shEnvSanitize
    NAME="$1"
    MESSAGE="$2"
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
        JSON.stringify(packageJson, undefined, 4) + "\n"
    );
}());
' "$MESSAGE" # '
    shPackageJsonVersionIncrement
    npm publish
    npm deprecate "$NAME" "$MESSAGE"
)}

shNpmPackageCliHelpCreate () {(set -e
# this function will create svg of cli-help in current npm-package
    export MODE_BUILD=npmPackageCliHelp
    shBuildPrint "creating npmPackageCliHelp ..."
    FILE="$(
node -e 'console.log(Object.values(require("./package.json").bin || {})[0]);
')" # '
    shRunWithScreenshotTxt printf none
    if [ -f "./$FILE" ]
    then
        shRunWithScreenshotTxt "./$FILE" --help
    fi
    shBuildPrint "... created npmPackageCliHelp"
)}

shNpmPackageDependencyTreeCreate () {(set -e
# this function will create svg-dependency-tree of npm-package
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
# this function will create svg-listing of npm-package
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
# this function will npm-publish $DIR as $NAME@$VERSION
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
        JSON.stringify(packageJson, undefined, 4) + "\n"
    );
}());
' "$NAME" "$VERSION" # '
    npm publish
)}

shNpmPublishV0 () {(set -e
# this function will npm-publish name $1 with bare package.json
    DIR=/tmp/npmPublishV0
    rm -rf "$DIR" && mkdir -p "$DIR" && cd "$DIR"
    printf "{\"name\":\"$1\",\"version\":\"0.0.1\"}" > package.json
    npm publish
)}

shNpmTest () {(set -e
# this function will npm-test with coverage and create test-report
    EXIT_CODE=0
    export MODE_BUILD="${MODE_BUILD:-npmTest}"
    export NODE_BIN="${NODE_BIN:-node}"
    shBuildPrint "npm-testing $PWD"
    # init npm-test-mode
    export NODE_ENV="${NODE_ENV:-test}"
    export npm_config_mode_test=1
    # npm-test without coverage
    if [ ! "$npm_config_mode_coverage" ]
    then
        ("$NODE_BIN" "$@") || EXIT_CODE="$?"
    # npm-test with coverage
    else
        # cleanup old coverage
        rm -f "$npm_config_dir_build/coverage/"coverage.*.json
        # npm-test with coverage
        (shIstanbulCover "$@") || EXIT_CODE="$?"
        # if $EXIT_CODE != 0, then debug covered-test by re-running it uncovered
        if [ "$EXIT_CODE" != 0 ] && [ "$EXIT_CODE" != 130 ]
        then
            npm_config_mode_coverage="" "$NODE_BIN" "$@" || true
        fi
    fi
    # create test-report artifacts
    (lib.utility2.js utility2.testReportCreate) || EXIT_CODE="$?"
    shBuildPrint "EXIT_CODE - $EXIT_CODE"
    return "$EXIT_CODE"
)}

shNpmTestPublished () {(set -e
# this function will npm-test published npm-package $npm_package_name
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

shPackageJsonVersionIncrement () {(set -e
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
            dd === undefined
            || (typeof cc !== "number" && typeof dd === "number")
        ) {
            result = bb;
            break;
        }
        if (
            cc === undefined
            || (typeof cc === "number" && typeof dd !== "number")
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

shRawLibDiff () {(set -e
# this function will diff-compare raw.xxx.js to lib.xxx.js
    diff -u "$(
        printf "$1" | sed -e "s/[^\\.]*\\./raw./"
    )" "$1" > /tmp/shRawLibDiff.diff || true
    vim -R /tmp/shRawLibDiff.diff
)}

shRawLibFetch () {(set -e
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
                    "shRawLibFetch - cannot find-and-replace snippet "
                    + JSON.stringify(elem.aa)
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
                    "shRawLibFetch - cannot find-and-replace snippet "
                    + JSON.stringify(aa)
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
                "data:" + elem.contentType + ";base64,"
                + elem.data.toString("base64")
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
                    "shRawLibFetch - cannot find-and-replace snippet "
                    + JSON.stringify(elem.exports)
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
        opt.input.slice(0, opt.index) + "/*\nshRawLibFetch\n"
        + JSON.stringify(JSON.parse(opt[1]), undefined, 4) + "\n"
        + opt[2].split("\n\n").filter(function (elem) {
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
                    "\n\n\n/*\n"
                    + "repo " + elem.prefix.replace("/blob/", "/tree/") + "\n"
                    + "committed " + (
                        /\b\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ\b/
                    ).exec(elem.dateCommitted)[0] + "\n"
                    + "*/"
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
                        match2 + "\u0000"
                        + match1.padEnd(19, " ") + " = " + match2
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

shReadmeEval () {(set -e
# this function will extract, save, and test script $FILE embedded in README.md
    export MODE_BUILD=readmeTest
    shBuildPrint "running command 'shReadmeEval $*' ..."
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
    if [ ! -f ".tmp/README.$FILE" ]
    then
        return
    fi
    case "$FILE" in
    build_ci.sh)
        FILE=.tmp/README.build_ci.sh
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
        cp ".tmp/README.$FILE" "$DIR/$FILE"
        cp ".tmp/README.$FILE" "$npm_config_dir_build/$FILE"
        # delete all leading blank lines at top of file
        # http://sed.sourceforge.net/sed1line.txt
        sed -in -e '/./,$!d' "$npm_config_dir_build/$FILE"
        rm -f "$npm_config_dir_build/$FILE"n
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
    shBuildPrint "testing $FILE ..."
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
        shRunWithScreenshotTxt eval "$SCRIPT"
        ;;
    example.sh)
        # delete all leading blank lines at top of file
        # delete all trailing blank lines at end of file
        # http://sed.sourceforge.net/sed1line.txt
        printf "# file-begin\n"
        cat "$FILE" | sed -e '/./,$!d' -e :a -e '/^\n*$/{$d;N;ba' -e '}'
        printf "\n# file-end\n\n\n"
        shRunWithScreenshotTxt /bin/sh "$FILE"
        ;;
    esac
    shBuildPrint "... finished running command 'shReadmeEval $*'"
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

shRmDsStore () {(set -e
# this function will recursively rm .DS_Store from current-dir
# http://stackoverflow.com/questions/2016844/bash-recursively-remove-files
    for NAME in "._*" ".DS_Store" "desktop.ini" "npm-debug.log" "*~"
    do
        find . -iname "$NAME" -print0 | xargs -0 rm -f || true
    done
)}

shRun () {(set -e
# this function will run command "$@" with auto-restart
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
# this function will run command "$@" and screenshot text-output
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
    let yy;
    function wordwrap(line, ii) {
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
    }
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
        + "<rect height=\"" + (yy + 20)
        + "\" fill=\"#555\" width=\"720\"></rect>\n"
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
' # '
    shBuildPrint \
"created screenshot file $npm_config_dir_build/$MODE_BUILD_SCREENSHOT_IMG"
    return "$EXIT_CODE"
)}

shServerPortRandom () {(set -e
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

shSleep () {(set -e
# this function will sleep $1
    shBuildPrint "sleep $1 ..."
    sleep "$1"
)}

shSource () {
# this function will source .bashrc
    . "$HOME/.bashrc"
}

shTravisRepoCreate () {(set -e
# this function will create travis-repo https://github.com/$GITHUB_FULLNAME
    export GITHUB_FULLNAME="$1"
    export MODE_BUILD="${MODE_BUILD:-shTravisRepoCreate}"
    shBuildPrint "$GITHUB_FULLNAME - creating ..."
    shGithubRepoCreate "$GITHUB_FULLNAME"
    node -e '
/* jslint utility2:true */
(async function () {
    "use strict";
    let tmp;
    function httpRequest(opt) {
    /*
     * this function will make simple http-request to <opt>.url
     * and return <opt>.statusCode and <opt>.responseText
     * and throw any err encountered as uncaughtException
     */
        let promise;
        let resolve;
        promise = new Promise(function (arg) {
            resolve = arg;
        });
        opt = Object.assign({
            method: "GET"
        }, opt);
        console.error("httpRequest - " + JSON.stringify({
            method: opt.method,
            hostname: require("url").parse(opt.url).hostname
        }));
        require("https").request(opt.url, opt, function (res) {
            if (!(res.statusCode < 400) && !opt.modeIgnoreStatusCode) {
                throw new Error(JSON.stringify({
                    method: opt.method,
                    hostname: require("url").parse(opt.url).hostname,
                    statusCode: res.statusCode
                }));
            }
            opt.responseText = "";
            opt.statusCode = res.statusCode;
            res.on("data", function (chunk) {
                opt.responseText += chunk;
            }).on("end", function () {
                resolve(opt);
            }).setEncoding("utf8");
        }).end(opt.data);
        return promise;
    }
    function sleep(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }
    process.on("unhandledRejection", function (err) {
        throw err;
    });
    // request github-assets
    [
        (
            "https://raw.githubusercontent.com"
            + "/kaizhu256/node-utility2/alpha/.gitignore"
        ), (
            "https://raw.githubusercontent.com"
            + "/kaizhu256/node-utility2/alpha/.travis.yml"
        )
    ].forEach(function (url) {
        httpRequest({
            url
        }).then(function (opt) {
            require("fs").promises.writeFile((
                require("os").tmpdir() + "/githubRepo/"
                + process.env.GITHUB_FULLNAME + "/" + require("path").basename(url)
            ), opt.responseText);
        });
    });
    require("fs").promises.writeFile((
        require("os").tmpdir() + "/githubRepo/"
        + process.env.GITHUB_FULLNAME + "/package.json"
    ), JSON.stringify({
        devDependencies: {
            utility2: "kaizhu256/node-utility2#alpha"
        },
        homepage: "https://github.com/" + process.env.GITHUB_FULLNAME,
        name: process.env.GITHUB_FULLNAME.replace((
            /.+?\/node-|.+?\//
        ), ""),
        repository: {
            type: "git",
            url: "https://github.com/" + process.env.GITHUB_FULLNAME + ".git"
        },
        scripts: {
            "build-ci": "utility2 shBuildCi",
            "test": "./npm_scripts.sh"
        },
        version: "0.0.1"
    }, undefined, 4));
    await sleep(5000);
    // request travis-userid
    tmp = await httpRequest({
        headers: {
            authorization: "token " + process.env.TRAVIS_ACCESS_TOKEN,
            "content-type": "application/json",
            "travis-api-version": 3
        },
        url: "https://api.travis-ci.com/user"
    });
    // sync travis-userid
    tmp = await httpRequest({
        headers: {
            authorization: "token " + process.env.TRAVIS_ACCESS_TOKEN,
            "content-type": "application/json",
            "travis-api-version": 3
        },
        method: "POST",
        url: (
            "https://api.travis-ci.com/user/" + JSON.parse(tmp.responseText).id
            + "/sync"
        )
    });
    // activate travis-repo
    while (true) {
        await sleep(2000);
        tmp = await httpRequest({
            headers: {
                authorization: "token " + process.env.TRAVIS_ACCESS_TOKEN,
                "content-type": "application/json",
                "travis-api-version": 3
            },
            method: "POST",
            modeIgnoreStatusCode: true,
            url: (
                "https://api.travis-ci.com/repo/"
                + process.env.GITHUB_FULLNAME.replace("/", "%2F")
                + "/activate"
            )
        });
        if (tmp.statusCode < 400) {
            break;
        }
    }
    // update travis-repo settings
    [
        // "auto_cancel_pull_requests",
        "auto_cancel_pushes",
        // "build_pull_requests",
        // "build_pushes",
        // "maximum_number_of_builds",
        "builds_only_with_travis_yml"
    ].forEach(function (setting) {
        httpRequest({
            data: "{\"setting.value\":true}",
            headers: {
                authorization: "token " + process.env.TRAVIS_ACCESS_TOKEN,
                "content-type": "application/json",
                "travis-api-version": 3
            },
            method: "PATCH",
            url: (
                "https://api.travis-ci.com/repo/"
                + process.env.GITHUB_FULLNAME.replace("/", "%2F")
                + "/setting/" + setting
            )
        });
    });
}());
' # '
    cd "/tmp/githubRepo/$GITHUB_FULLNAME"
    unset GITHUB_ORG
    unset GITHUB_FULLNAME
    shCryptoTravisEncrypt > /dev/null
    git add -f . .gitignore .travis.yml
    git commit -am "[npm publishAfterCommitAfterBuild]"
    shGitCommandWithGithubToken push "https://github.com/$GITHUB_FULLNAME" -f alpha
)}

shTravisRepoTrigger () {(set -e
# this function will trigger travis-repo $1, branch $2
    node -e '
/* jslint utility2:true */
(function () {
    // trigger travis-repo
    require("https").request((
        "https://api.travis-ci.com/repo/"
        + process.argv[1].replace("/", "%2F")
        + "/requests"
    ), {
        headers: {
            authorization: "token " + process.env.TRAVIS_ACCESS_TOKEN,
            "content-type": "application/json",
            "travis-api-version": 3
        },
        method: "POST"
    }, function (res) {
        if (!(res.statusCode < 400)) {
            throw new Error(res.statusCode);
        }
    }).end("{\"request\":{\"branch\":\"" + process.argv[2] + "\"}}");
}());
' "$@" # '
)}

shUtility2DependentsGitCommit () {(set -e
# this function will git-commit-and-push $UTILITY2_DEPENDENTS
    local DIR
    for DIR in $UTILITY2_DEPENDENTS
    do
        cd "$HOME/Documents/$DIR" || continue
        printf "\n\n\n#### shUtility2DependentsGitCommit - $PWD - $@ ####\n\n\n"
        git commit -am "${1:-shUtility2GitCommitAndPush}" || true
    done
)}

shUtility2DependentsGrep () {(set -e
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

shUtility2DependentsShellEval () {(set -e
# this function will shell-eval "$@" in utility2 and its dependents
    local DIR
    for DIR in $UTILITY2_DEPENDENTS
    do
        cd "$HOME/Documents/$DIR" || continue
        printf "\n\n\n#### shUtility2DependentsShellEval - $PWD - $@ ####\n\n\n"
        eval "$@"
    done
    printf "\n\n\n"
)}

shUtility2DependentsVersion () {(set -e
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
        "$COMMAND" "$@"
        ;;
    esac
)
