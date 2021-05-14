#!/bin/sh
: '
/* jslint utility2:true */
'

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
# shDockerRestartUtility2 work kaizhu256/node-utility2
# shDockerSh work 'PORT=4065 npm start'
# vim rgx-lowercase \L\1\e

# windows_terminal_settings.json
: '
// ~/AppData/Local/Packages/Microsoft.WindowsTerminal_8wekyb3d8bbwe/LocalState/settings.json
{
    "defaultProfile": "{00000000-0000-6170-ba54-000000000001}",
    "profiles":
    {
        "defaults":
        {
            // Put settings here that you want to apply to all profiles.
            // https://docs.microsoft.com/en-us/windows/terminal/customize-settings/profile-settings
            "acrylicOpacity" : 0.5, // default 0.5
            "closeOnExit" : "graceful", // default "graceful"
            "colorScheme" : "Campbell Powershell", // default "Campbell"
            "cursorColor" : "#0f0",
            "cursorShape" : "vintage", // default "bar"
            "fontFace" : "Lucida Console", // default "Cascadia Mono"
            "fontSize" : 6, // default 12
            "historySize" : 9001, // default 9001
            "padding" : "0, 0, 0, 0", // default "8, 8, 8, 8"
            "snapOnInput" : true, // defaut true
            "useAcrylic" : false, // default false
        },
        "list":
        [
            // https://stackoverflow.com/questions/56839307/adding-git-bash-to-the-new-windows-terminal
            {
                "commandline": "%PROGRAMFILES%/git/usr/bin/bash.exe -i -l",
                // "commandline": "%USERPROFILE%/AppData/Local/Programs/Git/bin/bash.exe -l -i",
                // "commandline": "%USERPROFILE%/scoop/apps/git/current/usr/bin/bash.exe -l -i",
                "guid": "{00000000-0000-6170-ba54-000000000001}",
                "icon": "%PROGRAMFILES%/Git/mingw64/share/git/git-for-windows.ico",
                // "icon": "%USERPROFILE%/AppData/Local/Programs/Git/mingw64/share/git/git-for-windows.ico",
                // "icon": "%USERPROFILE%/apps/git/current/usr/share/git/git-for-windows.ico",
                "name" : "Bash",
                "startingDirectory" : "%USERPROFILE%",
            }
        ]
    },
}
'

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
    if [ ! "$PATH_OS" ]
    then
        case "$(uname)" in
        Darwin)
            export PATH_OS="$HOME/bin/darwin" || return "$?"
            export PATH="$PATH_OS:$PATH" || return "$?"
            ;;
        Linux)
            export PATH_OS="$HOME/bin/linux" || return "$?"
            export PATH="$PATH_OS:$PATH" || return "$?"
            ;;
        MSYS*)
            export PATH_OS="$HOME/bin/win32" || return "$?"
            export PATH="$PATH_OS:$PATH" || return "$?"
            ;;
        esac
    fi
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

shDockerRestartUtility2() {(set -e
# this function will restart docker-container $1 $2 with utility2 env
    local DOCKER_V_GAME
    docker rm -fv "$1" || true
    case "$(uname)" in
    Darwin)
        LOCALHOST="${LOCALHOST:-192.168.99.100}"
        ;;
    MSYS*)
        HOME="$USERPROFILE"
        ;;
    *)
        LOCALHOST="${LOCALHOST:-127.0.0.1}"
        ;;
    esac
    if [ -d /g/ ]
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
        [ -d /usr/local/share/ca-certificates/ ] &&
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
    node -e '
(function () {
    "use strict";
    let result;
    // get file, mode, size
    result = require("child_process").spawnSync("git", [
        "ls-tree", "-lr", "HEAD"
    ], {
        encoding: "utf8",
        stdio: [
            "ignore", "pipe", 2
        ]
    }).stdout;
    result = Array.from(result.matchAll(
        /^(\S+?)\u0020+?\S+?\u0020+?\S+?\u0020+?(\S+?)\t(\S+?)$/gm
    )).map(function ([
        ignore, mode, size, file
    ]) {
        return {
            file,
            mode: mode.slice(-3),
            size: Number(size)
        };
    });
    result = result.sort(function (aa, bb) {
        return aa.file > bb.file || -1;
    });
    result = result.slice(0, 1000);
    result.unshift({
        file: ".",
        mode: "755",
        size: 0
    });
    // get date
    result.forEach(function (elem) {
        result[0].size += elem.size;
        require("child_process").spawn("git", [
            "log", "--max-count=1", "--format=%at", elem.file
        ], {
            stdio: [
                "ignore", "pipe", 2
            ]
        }).stdout.on("data", function (chunk) {
            elem.date = new Date(
                Number(chunk) * 1000
            ).toISOString().slice(0, 19) + "Z";
        });
    });
    process.on("exit", function () {
        let iiPad;
        let sizePad;
        iiPad = String(result.length).length + 1;
        sizePad = String(Math.ceil(result[0].size / 1024)).length;
        process.stdout.write(result.map(function (elem, ii) {
            return (
                String(ii + ".").padStart(iiPad, " ") +
                "  " + elem.mode +
                "  " + elem.date +
                "  " + String(
                    Math.ceil(elem.size / 1024)
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
        xargs -0 grep -HIn -E "$REGEXP" "$@" |
        tee /tmp/shGrep.txt || true
)}

shGrepReplace() {(set -e
# this function will inline grep-and-replace /tmp/shGrep.txt
    node -e '
(function () {
    "use strict";
    let dict;
    dict = {};
    require("fs").readFileSync("/tmp/shGrep.txt", "utf8").replace((
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
' # '
)}

shHttpFileServer() {(set -e
# this function will run simple node http-file-server on port $PORT
    if [ ! "$npm_config_mode_auto_restart" ]
    then
        local EXIT_CODE
        EXIT_CODE=0
        export npm_config_mode_auto_restart=1
        while true
        do
            printf "\n"
            git diff --color 2>/dev/null | cat || true
            printf "\nshHttpFileServer - (re)starting $*\n"
            (shHttpFileServer "$@") || EXIT_CODE="$?"
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
        return
    fi
    node -e '
// init debugInline
if (!globalThis.debugInline) {
    let consoleError;
    consoleError = console.error;
    globalThis.debugInline = function (...argList) {
    /*
     * this function will both print <argList> to stderr and
     * return <argList>[0]
     */
        consoleError("\n\ndebugInline");
        consoleError(...argList);
        consoleError("\n");
        return argList[0];
    };
}
(function jslintDir() {
/*
 * this function will jslint current-directory
 */
    "use strict";
    require("fs").stat((
        process.env.HOME + "/lib.utility2_jslint.js"
    ), function (ignore, exists) {
        if (exists) {
            require("child_process").spawn("node", [
                process.env.HOME + "/lib.utility2_jslint.js", "."
            ], {
                stdio: [
                    "ignore", 1, 2
                ]
            });
        }
    });
}());
(function httpFileServer() {
/*
 * this function will start http-file-server
 */
    "use strict";
    if (process.argv[1]) {
        require(require("path").resolve(process.argv[1]));
    }
    process.env.PORT = process.env.PORT || "8080";
    console.error("http-file-server listening on port " + process.env.PORT);
    require("http").createServer(function (req, res) {
        let file;
        let pathname;
        let timeStart;
        // init timeStart
        timeStart = Date.now();
        // init pathname
        pathname = require("url").parse(req.url).pathname;
        // debug - serverLog
        res.on("close", function () {
            if (pathname === "/favicon.ico") {
                return;
            }
            console.error(
                "serverLog - " +
                new Date(timeStart).toISOString() + " - " +
                (Date.now() - timeStart) + "ms - " +
                (res.statusCode | 0) + " " + req.method + " " + pathname
            );
        });
        // debug - echo request
        if (pathname === "/echo") {
            res.write(JSON.stringify(req.headers, undefined, 4) + "\n");
            req.pipe(res);
            return;
        }
        // replace trailing "/" with "/index.html"
        file = pathname.slice(1).replace((
            /\/$/
        ), "/index.html");
        // resolve file
        file = require("path").resolve(file);
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
(function replStart() {
/*
 * this function will start repl-debugger
 */
    "use strict";
    let that;
    // start repl
    that = require("repl").start({
        useGlobal: true
    });
    // init history
    that.setupHistory(require("path").resolve(
        process.env.HOME + "/.node_repl_history"
    ), function () {
        return;
    });
    // save eval-function
    that.evalDefault = that.eval;
    // hook custom-eval-function
    that.eval = function (script, context, file, onError) {
        script.replace((
            /^(\S+)\u0020(.*?)\n/
        ), function (ignore, match1, match2) {
            switch (match1) {
            // syntax-sugar - run shell-cmd
            case "$":
                switch (match2.split(" ").slice(0, 2).join(" ")) {
                // syntax-sugar - run git diff
                case "git diff":
                    match2 += " --color";
                    break;
                // syntax-sugar - run git log
                case "git log":
                    match2 += " -n 10";
                    break;
                // syntax-sugar - run ll
                case "ll":
                    match2 = "ls -Fal";
                    break;
                }
                match2 = match2.replace((
                    /^git\u0020/
                ), "git --no-pager ");
                // source lib.utility2.sh
                match2 = (
                    (
                        process.platform !== "win32" &&
                        process.env.UTILITY2_BIN && (match2 !== ":")
                    )
                    ? ". " + process.env.UTILITY2_BIN + "; " + match2
                    : match2
                );
                // run shell-cmd
                console.error("$ " + match2);
                require("child_process").spawn(match2, {
                    shell: true,
                    stdio: [
                        "ignore", 1, 2
                    ]
                // print exitCode
                }).on("exit", function (exitCode) {
                    console.error("$ EXIT_CODE=" + exitCode);
                    that.evalDefault("\n", context, file, onError);
                });
                script = "\n";
                break;
            // syntax-sugar - map text with charCodeAt
            case "charCode":
                console.error(
                    match2.split("").map(function (chr) {
                        return (
                            "\\u" +
                            chr.charCodeAt(0).toString(16).padStart(4, 0)
                        );
                    }).join("")
                );
                script = "\n";
                break;
            // syntax-sugar - sort chr
            case "charSort":
                console.error(JSON.stringify(match2.split("").sort().join("")));
                script = "\n";
                break;
            // syntax-sugar - list obj-keys, sorted by item-type
            // console.error(Object.keys(global).map(function(key){return(typeof global[key]==='"'"'object'"'"'&&global[key]&&global[key]===global[key]?'"'"'global'"'"':typeof global[key])+'"'"' '"'"'+key;}).sort().join('"'"'\n'"'"')) // jslint ignore:line
            case "keys":
                script = (
                    "console.error(Object.keys(" + match2 +
                    ").map(function(key){return(" +
                    "typeof " + match2 + "[key]==='"'"'object'"'"'&&" +
                    match2 + "[key]&&" +
                    match2 + "[key]===global[key]" +
                    "?'"'"'global'"'"'" +
                    ":typeof " + match2 + "[key]" +
                    ")+'"'"' '"'"'+key;" +
                    "}).sort().join('"'"'\\n'"'"'))\n"
                );
                break;
            // syntax-sugar - print String(val)
            case "print":
                script = "console.error(String(" + match2 + "))\n";
                break;
            }
        });
        // eval script
        that.evalDefault(script, context, file, onError);
    };
}());
(function watchDir() {
/*
 * this function will watch current-directory for changes
 */
    "use strict";
    require("fs").readdir(".", function (ignore, fileList) {
        fileList.forEach(function (file) {
            if (file[0] === ".") {
                return;
            }
            require("fs").stat(file, function (ignore, stats) {
                if (!(stats && stats.isFile())) {
                    return;
                }
                require("fs").watchFile(file, {
                    interval: 1000,
                    persistent: false
                }, function () {
                    console.error("watchFile - modified - " + file);
                    setTimeout(process.exit.bind(undefined, 77), 1000);
                });
            });
        });
    });
}());
' "$@" # '
)}

shImageToDataUri() {(set -e
# this function will convert image $1 to data-uri string
    node -e '
(function () {
    "use strict";
    let file;
    let result;
    file = process.argv[1];
    if ((
        /^https?:\/\//
    ).test(file)) {
        require(file.split(":")[0]).request(file, function (res) {
            let chunkList;
            chunkList = [];
            res.on("data", function (chunk) {
                chunkList.push(chunk);
            }).on("end", function () {
                result = Buffer.concat(chunkList);
            });
        }).end();
    } else {
        require("fs").readFile(file, function (ignore, data) {
            result = data;
        });
    }
    process.on("exit", function () {
        console.log(
            "data:image/" + require("path").extname(file).slice(1) +
            ";base64," + result.toString("base64")
        );
    });
}());
' "$1" # '
)}

shJsonNormalize() {(set -e
# this function will
# 1. read json-data from file $1
# 2. normalize json-data
# 3. write normalized json-data back to file $1
    node -e '
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
        JSON.stringify(objectDeepCopyWithKeysSorted(JSON.parse(
            require("fs").readFileSync(process.argv[1], "utf8").replace((
                /^\ufeff/
            ), "")
        )), undefined, 4) + "\n"
    );
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
    node -e '
(function () {
    "use strict";
    let matchObj;
    let repoDict;
    // init debugInline
    if (!globalThis.debugInline) {
        let consoleError;
        consoleError = console.error;
        globalThis.debugInline = function (...argList) {
        /*
         * this function will both print <argList> to stderr and
         * return <argList>[0]
         */
            consoleError("\n\ndebugInline");
            consoleError(...argList);
            consoleError("\n");
            return argList[0];
        };
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
    // init matchObj
    matchObj = (
        /^\/\*\u0020jslint\u0020ignore:start\u0020\*\/\n\/\*\nshRawLibFetch\n(\{\n[\S\s]*?\n\})([\S\s]*?)\n\*\/\n/m
    ).exec(require("fs").readFileSync(process.argv[1], "utf8"));
    // JSON.parse match1 with comment
    let {
        fetchList,
        replaceList = []
    } = JSON.parse(matchObj[1]);
    // init repoDict, fetchList
    repoDict = {};
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
        require("https").get(elem.url2 || elem.url.replace(
            "https://github.com/",
            "https://raw.githubusercontent.com/"
        ).replace("/blob/", "/"), function (res) {
            // http-redirect
            if (res.statusCode === 302) {
                require("https").get(res.headers.location, function (res) {
                    onResponse(res, elem, "data");
                });
                return;
            }
            onResponse(res, elem, "data");
        });
    });
    // parse fetched data
    process.on("exit", function () {
        let header;
        let result0;
        let result;
        result = "";
        fetchList.forEach(function (elem, ii, list) {
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
            list[ii].exports = prefix + "_" + require("path").basename(
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
                    ).exec(elem.dateCommitted.toString())[0] + "\n" +
                    "*/"
                );
            }
            // mangle module.exports
            result += (
                "\n\n\n/*\nfile " + elem.url + "\n*/\n" +
                elem.data.toString().trim()
            );
        });
        result = result.trim() + "\n\n/*\nfile none\n*/\n";
        // comment #!
        result = result.replace((
            /^#!/gm
        ), "// $&");
        // normalize newline
        result = result.replace((
            /\r\n|\r/g
        ), "\n");
        // remove trailing-whitespace
        result = result.replace((
            /[\t\u0020]+$/gm
        ), "");
        // remove leading-newline before ket
        result = result.replace((
            /\n+?(\n\u0020*?\})/g
        ), "$1");
        // eslint - no-multiple-empty-lines
        // https://github.com/eslint/eslint/blob/v7.2.0/docs/rules/no-multiple-empty-lines.md
        result = result.replace((
            /\n{4,}/g
        ), "\n\n\n");
        // replace from replaceList
        replaceList.forEach(function ({
            aa,
            bb,
            flags
        }) {
            result0 = result;
            result = result.replace(new RegExp(aa, flags), bb);
            if (result0 === result) {
                throw new Error(
                    "shRawLibFetch - cannot find-and-replace snippet " +
                    JSON.stringify(aa)
                );
            }
        });
        // init header
        header = (
            matchObj.input.slice(0, matchObj.index) +
            "/* jslint ignore:start */\n/*\nshRawLibFetch\n" +
            JSON.stringify(JSON.parse(matchObj[1]), undefined, 4) + "\n" +
            matchObj[2].split("\n\n").filter(function (elem) {
                return elem.trim();
            }).map(function (elem) {
                return elem.trim().replace((
                    /\*\//g
                ), "*\\\\/").replace((
                    /\/\*/g
                ), "/\\\\*") + "\n";
            }).sort().join("\n") + "*/\n/* jslint ignore:end */\n\n\n"
        );
        // replace from header-diff
        header.replace((
            /((?:^-.*?\n)+?)((?:^\+.*?\n)+)/gm
        ), function (ignore, aa, bb) {
            aa = "\n" + aa.replace((
                /^-/gm
            ), "").replace((
                /\*\\\\\//g
            ), "*/").replace((
                /\/\\\\\*/g
            ), "/*");
            bb = "\n" + bb.replace((
                /^\+/gm
            ), "").replace((
                /\*\\\\\//g
            ), "*/").replace((
                /\/\\\\\*/g
            ), "/*");
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
        fetchList.forEach(function ({
            contentType,
            data,
            exports,
            type
        }) {
            if (type !== "dataUri") {
                return;
            }
            data = (
                "data:" + contentType + ";base64," +
                data.toString("base64")
            );
            result0 = result;
            result = result.replace(
                new RegExp("^" + exports + "$", "gm"),
                // disable $-escape in replacement-string
                function () {
                    return data;
                }
            );
            if (result0 === result) {
                throw new Error(
                    "shRawLibFetch - cannot find-and-replace snippet " +
                    JSON.stringify(exports)
                );
            }
        });
        // init footer
        result = header + result;
        matchObj.input.replace((
            /\n\/\*\nfile\u0020none\n\*\/\n([\S\s]+)/
        ), function (ignore, match1) {
            result += "\n\n" + match1.trim() + "\n";
        });
        // write to file
        require("fs").writeFileSync(process.argv[1], result);
    });
}());
' "$@" # '
    git diff 2>/dev/null || true
)}

shReadmeLinkValidate() {(set -e
# this function will validate http-links embedded in README.md
    node -e '
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
        ), "/build..alpha..github.com/");
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

shSource() {
# this function will source .bashrc
    if [ -d "$HOME/Documents/utility2/" ]
    then
        for FILE in lib.utility2.sh lib.utility2_jslint.js
        do
            if [ -f "$HOME/$FILE" ]
            then
                rm -f "$HOME/Documents/utility2/$FILE"
                ln "$HOME/$FILE" "$HOME/Documents/utility2/$FILE"
            fi
        done
    fi
    . "$HOME/.bashrc"
    # . lib.utility2.sh
}

shUtility2FncStat() {(set -e
# this function will print histogram of utility2-fnc code-frequency
# in current dir
    node -e '
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
        /\bsh[A-Z]\w*?\b/g
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
