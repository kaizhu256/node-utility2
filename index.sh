#/bin/sh

shAesDecrypt() {
    # this function will decrypt base64-encoded stdin to stdout using aes-256-cbc
    local IV STRING || return $?
    # save stdin to $STRING
    STRING="$(cat /dev/stdin)" || return $?
    # init $IV from first 44 base64-encoded bytes of $STRING
    IV="$(printf $STRING | cut -c1-44 | base64 --decode)" || return $?
    # decrypt remaining base64-encoded bytes of $STRING to stdout using aes-256-cbc
    printf "$STRING" | \
        cut -c45-9999 | \
        base64 --decode | \
        openssl enc -aes-256-cbc -d -K "$AES_256_KEY" -iv "$IV" || return $?
}

shAesEncrypt() {
    # this function will encrypt stdin to base64-encoded stdout,
    # with a random iv prepended using aes-256-cbc
    local IV || return $?
    # init $IV from random 16 bytes
    IV="$(openssl rand -hex 16)" || return $?
    # print base64-encoded $IV to stdout
    printf "$(printf "$IV" | base64)" || return $?
    # encrypt stdin and stream to stdout using aes-256-cbc with base64-encoding
    openssl enc -aes-256-cbc -K "$AES_256_KEY" -iv "$IV" | base64 | tr -d "\n" || return $?
}

shBaseInit() {
    # this function will init the base bash-login env, and is intended for aws-ec2 setup
    local FILE || return $?
    # init $PATH_BIN
    if [ "$PATH_BIN" = "" ]
    then
        export PATH_BIN=\
"$HOME/bin:$HOME/node_modules/.bin:/usr/local/bin:/usr/local/sbin" || return $?
        export PATH="$PATH_BIN:$PATH" || return $?
    fi
    # init $PATH_EMSCRIPTEN
    if [ "$PATH_EMSCRIPTEN" = "" ]; then
        export PATH_EMSCRIPTEN="$HOME/src/emsdk_portable/emscripten/latest" || return $?
        export PATH="$PATH_EMSCRIPTEN:$PATH" || return $?
    fi
    # init $PATH_OS
    case "$(uname)" in
    Darwin)
        if [ "$PATH_OS" = "" ]
        then
            export PATH_OS="$HOME/bin/darwin" || return $?
            export PATH="$PATH_OS:$PATH" || return $?
        fi
        ;;
    Linux)
        if [ "$PATH_OS" = "" ]
        then
            export PATH_OS="$HOME/bin/linux" || return $?
            export PATH="$PATH_OS:$PATH" || return $?
        fi
        ;;
    esac
    # init index.sh and .bashrc2
    for FILE in "$HOME/index.sh" "$HOME/.bashrc2"
    do
        # source $FILE
        if [ -f "$FILE" ]
        then
            . "$FILE" || return $?
        fi
    done
    # init ubuntu .bashrc
    shUbuntuInit || return $?
}

shBaseInstall() {
    # this function will install .bashrc, .screenrc, .vimrc, and index.sh in $HOME,
    # and is intended for aws-ec2 setup
    # curl https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/index.sh > $HOME/index.sh && . $HOME/index.sh && shBaseInstall
    local FILE || return $?
    for FILE in .screenrc .vimrc index.sh
    do
        curl -s "https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/$FILE" > \
            "$HOME/$FILE" || return $?
    done
    # create .bashrc
    printf '. $HOME/index.sh && shBaseInit' > "$HOME/.bashrc"
    # init .ssh/authorized_keys.root
    if [ -f "$HOME/.ssh/authorized_keys.root" ]
    then
        mv "$HOME/.ssh/authorized_keys.root" "$HOME/.ssh/authorized_keys" || return $?
    fi
}

shBrowserTest() {
    # this function will spawn an electron process to test the given $URL,
    # and merge the test-report into the existing test-report
    shBuildPrint "${MODE_BUILD:-electronTest}" \
        "electron.${modeBrowserTest} - $url" || return $?
    node -e "
        'use strict';
        require('$npm_config_dir_utility2/index.js').browserTest({
            modeBrowserTest: '$modeBrowserTest',
            modeTestAdd: '$modeTestAdd',
            timeoutDefault: '$timeoutDefault',
            timeoutScreenCapture: '$timeoutScreenCapture',
            url: '$url'
        }, process.exit);
    " || return $?
}

shBuildGithubUpload() {
    # this function will upload build-artifacts to github
    local DIR || return $?
    if [ "$GIT_SSH" = "" ]
    then
        return $?
    fi
    shBuildPrint githubUpload \
        "uploading build-artifacts to git@github.com:$GITHUB_REPO.git" || return $?
    shGitRepoBranchUpdateLocal() {
        # this function will locally-update git-repo-branch
        # copy build-artifacts to gh-pages
        cp -a "$npm_config_dir_build" . || return $?
        DIR="build..$CI_BRANCH..$CI_HOST" || return $?
        rm -fr "$DIR" && cp -a "$npm_config_dir_build" "$DIR" || return $?
        git add . || return $?
    }
    shGitRepoBranchCommand update "git@github.com:$GITHUB_REPO.git" gh-pages || return $?
}

shBuildPrint() {
    # this function will print debug info about the build state
    local MESSAGE || return $?
    MESSAGE="$2" || return $?
    export MODE_BUILD="$1" || return $?
    printf "\n[MODE_BUILD=$MODE_BUILD] - $(shDateIso) - $MESSAGE\n\n" || return $?
}

shDateIso() {
    # this function will print the current date in ISO format
    date -u "+%Y-%m-%dT%H:%M:%SZ"
}

shDebugArgv() {
    # this function will print each element in $@ in a separate line
    local ARG || return $?
    for ARG in "$@"
    do
        printf "'$ARG'\n"
    done
}

shDocApiCreate() {
    # this function will create the api-doc
    # init $npm_config_dir_build
    mkdir -p "$npm_config_dir_build/coverage.html" || return $?
    node -e "
        'use strict';
        var options;
        options = "$@";
        options.fs = require('fs');
        options.utility2 = require('$npm_config_dir_utility2');
        // init example
        options.example = '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';
        options.exampleFileList.forEach(function (file) {
            var dir;
            file = '$CWD/' + file;
            try {
                // read file
                options.example += options.fs.readFileSync(file, 'utf8') +
                    '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';
            } catch (errorCaught) {
                // read dir
                dir = file;
                options.fs.readdirSync(dir).sort().forEach(function (file) {
                    if (file.slice(-3) === '.js') {
                        file = dir + '/' + file;
                        try {
                            // read file
                            options.example += options.fs.readFileSync(file, 'utf8') +
                                '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';
                        } catch (ignore) {
                        }
                    }
                });
            }
        });
        // create doc.api.html
        options.fs.writeFileSync(
            '$npm_config_dir_build/doc.api.html',
            options.utility2.docApiCreate(options)
        );
    " || return $?
    shBuildPrint docApiCreate \
        "created api-doc file://$npm_config_dir_build/doc.api.html" || return $?
    # screen-capture api-doc
    modeBrowserTest=screenCapture \
        url="file://$npm_config_dir_build/doc.api.html" shBrowserTest || return $?
}

shDockerInstall() {
    # this function will install docker
    # http://docs.docker.com/installation/ubuntulinux
    wget -qO- https://get.docker.com/ | /bin/sh || return $?
    # test docker
    docker run hello-world || return $?
}

shDockerRestart() {
    # this function will restart the docker-container
    shDockerRm "$1" || true
    shDockerStart "$@" || return $?
}

shDockerRestartNginx() {
    # this function will restart the nginx docker-container
    local FILE || return $?
    # init /root/etc.nginx.htpasswd
    FILE=/root/etc.nginx.htpasswd || return $?
    if [ ! -f "$FILE" ]
    then
        printf "foo:$(openssl passwd -crypt bar)" > $FILE || return $?
    fi
    # init /root/etc.nginx.nginx.conf
    # https://www.nginx.com/resources/wiki/start/topics/examples/full/#nginx-conf
    FILE=/root/etc.nginx.nginx.conf || return $?
    if [ ! -f "$FILE" ]
    then
        printf '
user nginx;
events {
    worker_connections 1024;
}
http {
    default_type application/octet-stream;
    include /etc/nginx/mime.types;
    log_format main '"'"'$remote_addr - $remote_user [$time_local] $status '"'"'
        '"'"'"$request" $body_bytes_sent "$http_referer" '"'"'
        '"'"'"$http_user_agent" "$http_x_forwarded_for"'"'"';
    sendfile on;
    tcp_nopush on;
    # http server
    server {
        listen 80;
        # redirect to https
        location / {
            rewrite ^ https://$host$request_uri permanent;
        }
    }
    # https server
    # https://www.nginx.com/resources/wiki/start/topics/examples/SSL-Offloader/#sslproxy-conf
    server {
        listen 443;
        root /root/usr.share.nginx.html;
        ssl_certificate /root/etc.nginx.ssl.pem;
        ssl_certificate_key /root/etc.nginx.ssl.key;
        ssl on;
        ssl_prefer_server_ciphers on;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        location / {
            index index.html index.htm;
        }
        location /private {
            auth_basic on;
            auth_basic_user_file /root/etc.nginx.htpasswd;
            autoindex on;
        }
    }
}' > "$FILE" || return $?
    fi
    # init /root/etc.nginx.ssl
    # http://superuser.com/questions/226192/openssl-without-prompt
    FILE=/root/etc.nginx.ssl || return $?
    if [ ! -f "$FILE.pem" ]
    then
        openssl req -days 365 -keyout "$FILE.key" -new -newkey rsa:4096 -nodes -out "$FILE.pem" \
            -subj "/C=AU" -x509 || return $?
    fi
    # init /root/usr.share.nginx.html
    mkdir -p /root/usr.share.nginx.html || return $?
    shDockerRm nginx || true
    # https://registry.hub.docker.com/_/nginx/
    docker run --name nginx -d -p 80:80 -p 443:443 \
        -v "$HOME:/root" -v /root/etc.nginx.nginx.conf:/etc/nginx/nginx.conf:ro \
        nginx || return $?
}

shDockerRestartPptpd() {
    # this function will restart the pptpd docker-container
    # https://github.com/whuwxl/docker-repos/tree/master/pptpd
    local FILE PASSWORD USERNAME || return $?
    FILE="$HOME/pptpd.etc.ppp.chap-secrets" || return $?
    PASSWORD="$2" || return $?
    USERNAME="$1" || return $?
    # init /etc/ppp/chap-secrets
    if [ ! -f "$FILE" ]
    then
        printf "$USERNAME * $PASSWORD *" >> "$FILE" || return $?
        chmod 600 "$FILE" || return $?
    fi
    shDockerRm pptpd || true
    docker run --name pptpd --privileged -d -p 1723:1723 \
        -v "$HOME:/root" -v "$FILE:/etc/ppp/chap-secrets:ro" \
        whuwxl/pptpd || return $?
}

shDockerRestartTransmission() {
    # this function will restart the transmission docker-container
    # https://hub.docker.com/r/dperson/transmission/
    local DIR || return $?
    DIR="$HOME/downloads" || return $?
    mkdir -p "$DIR" || return $?
    shDockerRm transmission || true
    docker run --name transmission -d -e TRPASSWD=admin -e TRUSER=admin -e TZ=EST5EDT \
        -p 9091:9091 \
        -v "$HOME:/root" -v "$DIR:/var/lib/transmission-daemon" \
        dperson/transmission || return $?
}

shDockerRm() {
    # this function will stop and rm the docker-container $IMAGE:$NAME
    docker stop "$@" || true
    docker rm "$@" || return $?
}

shDockerSh() {
    # this function will run /bin/bash in the docker-container $image:$name
    local NAME || return $?
    NAME="$1" || return $?
    docker start "$NAME" || return $?
    docker exec -it "$NAME" /bin/bash || return $?
}

shDockerStart() {
    # this function will start the docker-container $image:$name
    local IMAGE NAME || return $?
    NAME="$1" || return $?
    shift || return $?
    IMAGE="$1" || return $?
    shift || return $?
    docker run --name "$NAME" -dt -e debian_chroot="$NAME" \
        -v "$HOME:/root" \
        "$@" "$IMAGE" /bin/bash || return $?
}

shDockerStopAll() {
    # this function will stop all docker-containers
    docker stop $(docker ps -aq) || return $?
}

shDsStoreRm() {
    # this function will recursively rm .DS_Store from the current dir
    # http://stackoverflow.com/questions/2016844/bash-recursively-remove-files
    find . -name "._*" -print0 | xargs -0 rm || return $?
    find . -name ".DS_Store" -print0 | xargs -0 rm || return $?
    find . -name "npm-debug.log" -print0 | xargs -0 rm || return $?
}

shDuList () {
    # this function will run du, and create a list of all child dir in $1 sorted by size
    du -ms $1/* | sort -nr || return $?
}

shExitCodeSave() {
    # this function will save the global $EXIT_CODE and restore the global $CWD
    # save $EXIT_CODE
    if [ "$EXIT_CODE" = "" ] || [ "$EXIT_CODE" = 0 ]
    then
        EXIT_CODE="$1" || return $?
    fi
    if [ -d "$npm_config_dir_tmp" ]
    then
        printf "$EXIT_CODE" > "$npm_config_file_tmp" || return $?
    fi
    # restore $CWD
    cd "$CWD" || return $?
}

shGitLsTree() {
    # this function will list all files committed in HEAD
    git ls-tree --name-only -r HEAD | while read file
    do
        printf "%10s bytes    $(git log -1 --format="%ai  " -- "$file")  $file\n\n" \
            "$(ls -ln "$file" | awk "{print \$5}")" || return $?
    done
}

shGitRepoBranchCommand() {
    # this fuction will copy / move / update git-repo-branch
    shGitRepoBranchCommandInternal "$@"
    # save $EXIT_CODE and restore $CWD
    shExitCodeSave $? || return $?
    # reset shGitRepoBranchUpdateLocal
    unset -f shGitRepoBranchUpdateLocal || return $?
    return "$EXIT_CODE"
}

shGitRepoBranchCommandInternal() {
    # this fuction will copy / move / update git-repo-branch
    local BRANCH1 BRANCH2 COMMAND MESSAGE RANGE REPO1 REPO2 || return $?
    # http://superuser.com/questions/897148/shell-cant-shift-that-many-error
    COMMAND="$1" || return $?
    shift $(( $# > 0 ? 1 : 0 )) || return $?
    REPO1="$1" || return $?
    shift $(( $# > 0 ? 1 : 0 )) || return $?
    BRANCH1="$1" || return $?
    shift $(( $# > 0 ? 1 : 0 )) || return $?
    REPO2="${1:-$REPO1}" || return $?
    shift $(( $# > 0 ? 1 : 0 )) || return $?
    BRANCH2="${1:-$BRANCH1}" || return $?
    shift $(( $# > 0 ? 1 : 0 )) || return $?
    MESSAGE="$@" || return $?
    # cleanup /tmp/git.repo.branch
    rm -fr /tmp/git.repo.branch || return $?
    # init /tmp/git.repo.branch
    case "$COMMAND" in
    copyPwdA)
        cp -a "$PWD" /tmp/git.repo.branch || return $?
        ;;
    copyPwdLsTree)
        mkdir -p /tmp/git.repo.branch || return $?
        git ls-tree --name-only -r HEAD | \
            xargs tar -czf - | \
            tar -C /tmp/git.repo.branch -xzvf - || return $?
        ;;
    *)
        git clone "$REPO1" "--branch=$BRANCH1" --single-branch /tmp/git.repo.branch || return $?
        ;;
    esac
    cd /tmp/git.repo.branch || return $?
    # init git
    git init 2>/dev/null || true
    if [ "$(git config user.email)" = "" ]
    then
        git config user.email nobody || return $?
        git config user.name nobody || return $?
    fi
    # update git-repo-branch
    if (type shGitRepoBranchUpdateLocal > /dev/null 2>&1)
    then
        shGitRepoBranchUpdateLocal || return $?
    fi
    if [ "$MESSAGE" ]
    then
        git commit -am "$MESSAGE" 2>/dev/null || true
    else
        git commit -am "[skip ci]" \
            -m "$(shDateIso)" \
            -m "$COMMAND $REPO1#$BRANCH1 to $REPO2#$BRANDH2" \
            -m "$(uname -a)" 2>/dev/null || true
    fi
    # if number of commits > $COMMIT_LIMIT,
    # then backup current git-repo-branch to git-repo-branch.backup,
    # and then squash $RANGE to the first commit in git-repo-branch
    if [ "$COMMIT_LIMIT" ] && [ "$(git rev-list HEAD --count)" -gt "$COMMIT_LIMIT" ]
    then
        RANGE="$(($COMMIT_LIMIT/2))" || return $?
        git push -f "$REPO2" "$BRANCH2:$BRANCH2.backup" || return $?
        shGitSquashShift "$RANGE" || return $?
    fi
    git push -f "$REPO2" "$BRANCH1:$BRANCH2" || return $?
    case "$COMMAND" in
    # move git-repo-branch1 to git-repo-branch2
    move)
        git push "$REPO1" :"$BRANCH1" || return $?
        ;;
    esac
}

shGitSquashPop() {
    # this function will squash HEAD to the given $COMMIT
    # http://stackoverflow.com/questions/5189560
    # /how-can-i-squash-my-last-x-commits-together-using-git
    local COMMIT MESSAGE || return $?
    COMMIT="$1" || return $?
    MESSAGE="${2:-$(git log -1 --pretty=%s)}" || return $?
    # commit any uncommitted data
    git commit -am "$MESSAGE" || true
    # reset git to previous $COMMIT
    git reset --hard "$COMMIT" || return $?
    # reset files to current HEAD
    git merge --squash HEAD@{1} || return $?
    # commit HEAD immediately after previous $COMMIT
    git commit -am "$MESSAGE" || return $?
}

shGitSquashShift() {
    # this function will squash $RANGE to the first commit
    local BRANCH RANGE || return $?
    BRANCH="$(git rev-parse --abbrev-ref HEAD)" || return $?
    RANGE="$1" || return $?
    git checkout -q "HEAD~$RANGE" || return $?
    git reset -q "$(git rev-list --max-parents=0 HEAD)" || return $?
    git add . || return $?
    git commit -m squash > /dev/null || true
    git cherry-pick -X theirs --allow-empty --strategy=recursive "$BRANCH~$RANGE..$BRANCH" || \
        return $?
    git push -f . "HEAD:$BRANCH" || return $?
    git checkout "$BRANCH" || return $?
}

shGrep() {
    # this function will recursively grep $DIR for the $REGEXP
    local DIR FILE_FILTER REGEXP || return $?
    DIR="$1" || return $?
    REGEXP="$2" || return $?
    FILE_FILTER="$FILE_FILTER/\\.\\|.*\\(\\b\\|_\\)\\(\\.\\d\\" || return $?
    FILE_FILTER="$FILE_FILTER|archive\\|artifact\\" || return $?
    FILE_FILTER="$FILE_FILTER|bower_component\\|build\\" || return $?
    FILE_FILTER="$FILE_FILTER|coverage\\" || return $?
    FILE_FILTER="$FILE_FILTER|doc\\" || return $?
    FILE_FILTER="$FILE_FILTER|external\\" || return $?
    FILE_FILTER="$FILE_FILTER|fixture\\" || return $?
    FILE_FILTER="$FILE_FILTER|git_module\\" || return $?
    FILE_FILTER="$FILE_FILTER|jquery\\" || return $?
    FILE_FILTER="$FILE_FILTER|log\\" || return $?
    FILE_FILTER="$FILE_FILTER|min\\|mock\\" || return $?
    FILE_FILTER="$FILE_FILTER|node_module\\" || return $?
    FILE_FILTER="$FILE_FILTER|rollup.*\\" || return $?
    FILE_FILTER="$FILE_FILTER|swp\\" || return $?
    FILE_FILTER="$FILE_FILTER|tmp\\)\\(\\b\\|[_s]\\)" || return $?
    find "$DIR" -type f | \
        grep -v "$FILE_FILTER" | \
        tr "\n" "\000" | \
        xargs -0 grep -Iine "$REGEXP" || true
}

shGrepFileReplace() {
    # this function will save the grep-and-replace lines in $FILE
    local FILE || return $?
    FILE=$1
    node -e "
        'use strict';
        var options;
        options = {};
        options.fs = require('fs');
        options.fileDict = {};
        options.fs.readFileSync('$FILE', 'utf8').split('\n').forEach(function (element) {
            element = (/^(.+?):(\d+?):(.+?)$/).exec(element);
            if (!element) {
                return;
            }
            options.fileDict[element[1]] = options.fileDict[element[1]] ||
                options.fs.readFileSync(element[1], 'utf8').split('\n');
            options.fileDict[element[1]][element[2] - 1] = element[3];
        });
        Object.keys(options.fileDict).forEach(function (key) {
            options.fs.writeFileSync(key, options.fileDict[key].join('\n'));
        });
    " || return $?
}

shHerokuDeploy() {
    # this function will deploy the app to $HEROKU_REPO,
    # and run a simple curl check for the main-page
    local HEROKU_REPO || return $?
    HEROKU_REPO="$1" || return $?
    if [ "$GIT_SSH" = "" ]
    then
        return $?
    fi
    # init $HEROKU_HOSTNAME
    export HEROKU_HOSTNAME="$HEROKU_REPO.herokuapp.com" || return $?
    shBuildPrint herokuDeploy "deploying to https://$HEROKU_HOSTNAME" || return $?
    # git push $PWD to heroku
    shGitRepoBranchUpdateLocal() {
        # rm .gitignore so we can git add everything
        rm -f .gitignore || return $?
        # git add everything
        git add . || return $?
    }
    shGitRepoBranchCommand copyPwdLsTree local HEAD "git@heroku.com:$HEROKU_REPO.git" master \
        || return $?
    # wait 10 seconds for heroku to deploy app
    sleep 10 || return $?
    # verify deployed app's main-page returns status-code < 400
    [ $(
        curl -Ls -o /dev/null -w "%{http_code}" https://$HEROKU_HOSTNAME
    ) -lt 400 ] || return $?
    # screen-capture deployed server
    modeBrowserTest=screenCapture url="https://$HEROKU_HOSTNAME" shBrowserTest || return $?
}

shInit() {
    # this function will init the env
    # init CI_*
    if [ -d .git ]
    then
        # init travis-ci.org env
        if [ "$TRAVIS" ]
        then
            export CI_BRANCH="$TRAVIS_BRANCH" || return $?
            export CI_COMMIT_ID="$TRAVIS_COMMIT" || return $?
            export CI_HOST=travis-ci.org || return $?
            # decrypt and exec encrypted data
            if [ "$AES_256_KEY" ]
            then
                eval "$(shTravisDecryptYml)" || return $?
            fi
        # init default env
        else
            export CI_BRANCH=alpha || return $?
            export CI_COMMIT_ID="$(git rev-parse --verify HEAD)" || return $?
            export CI_HOST=localhost || return $?
        fi
        # init $CI_COMMIT_*
        export CI_COMMIT_MESSAGE="$(git log -1 --pretty=%s)" || return $?
        export CI_COMMIT_INFO="$CI_COMMIT_ID - $CI_COMMIT_MESSAGE" || return $?
    fi
    # init $CWD
    CWD="$(pwd)" || return $?
    # init $npm_package_*
    if [ -f package.json ]
    then
        eval $(node -e "
            'use strict';
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
    export npm_config_dir_build="$CWD/tmp/build" || return $?
    export npm_config_dir_tmp="$CWD/tmp" || return $?
    export npm_config_file_tmp="$CWD/tmp/tmpfile" || return $?
    # init $npm_config_dir_utility2
    shInitNpmConfigDirUtility2 || return $?
    # init $GIT_SSH
    if [ "$GIT_SSH_KEY" ] && [ ! "$MODE_OFFLINE" ]
    then
        export GIT_SSH="$npm_config_dir_utility2/git-ssh.sh" || return $?
    fi
    # init $PATH
    export PATH="$CWD/node_modules/.bin:$PATH" || return $?
}

shInitNpmConfigDirUtility2() {
    # this function will get the absolute dir for the
    # this function will init $npm_config_dir_utility2
    local DIR SOURCE || return $?
    # init $npm_config_dir_utility2
    if [ "$npm_package_name" = utility2 ]
    then
        export npm_config_dir_utility2="$CWD" || return $?
    else
        export npm_config_dir_utility2="$(node -e "
            'use strict';
            console.log(require('utility2').__dirname);
        " 2>/dev/null)" || return $?
    fi
    if [ ! -d "$npm_config_dir_utility2" ]
    then
        export npm_config_dir_utility2="$(dirname "$(readlink -f "$0" 2>/dev/null)")" || \
            return $?
    fi
    if [ ! -d "$npm_config_dir_utility2" ]
    then
        # http://stackoverflow.com/questions/59895
        # /can-a-bash-script-tell-what-directory-its-stored-in
        SOURCE="$0" || return $?
        # resolve $SOURCE until the file is no longer a symlink
        while [ -h "$SOURCE" ]; do
          DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )" || return $?
          SOURCE="$(readlink "$SOURCE")" || return $?
          # if $SOURCE was a relative symlink,
          # we need to resolve it relative to the path where the symlink file was located
          [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" || true
        done
        DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
        export npm_config_dir_utility2="$DIR" || return $?
    fi
}

shIptablesDockerInit() {
    # this function will create an iptables DOCKER chain
    # https://github.com/docker/docker/issues/1871
    iptables -t nat -N DOCKER
    iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL -j DOCKER
    iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL ! --dst 127.0.0.0/8 -j DOCKER
    iptables-save > /etc/iptables/rules.v4
    ip6tables-save > /etc/iptables/rules.v6
}

shIptablesInit() {
    # this function will init iptables, and is intended for aws-ec2 setup

    # reset iptables
    # http://www.cyberciti.biz/tips/linux-iptables-how-to-flush-all-rules.html
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
    # Allows all loopback (lo0) traffic and drop all traffic to 127/8 that doesn't use lo0
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

    # open iptables to pptp
    # https://wiki.archlinux.org/index.php/PPTP_server#iptables_firewall_configuration
    # Accept incoming connections to port 1723 (PPTP)
    iptables -A INPUT -i ppp+ -j ACCEPT
    iptables -A OUTPUT -o ppp+ -j ACCEPT
    # Accept incoming connections to port 1723 (PPTP)
    iptables -A INPUT -p tcp --dport 1723 -j ACCEPT
    # Accept GRE packets
    iptables -A INPUT -p 47 -j ACCEPT
    iptables -A OUTPUT -p 47 -j ACCEPT
    # Enable IP forwarding
    iptables -F FORWARD
    iptables -A FORWARD -j ACCEPT
    # Enable NAT for eth0 и ppp* interfaces
    iptables -A POSTROUTING -t nat -o eth0 -j MASQUERADE
    iptables -A POSTROUTING -t nat -o ppp+ -j MASQUERADE

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
}

shIstanbulCover() {
    # this function will run the command $@ with istanbul coverage
    local COMMAND || return $?
    if [ "$npm_config_mode_coverage" = "" ]
    then
        "$@"
        return $?
    fi
    COMMAND="$1" || return $?
    shift || return $?
    "$COMMAND" $npm_config_dir_utility2/lib.istanbul.js cover "$@" || return $?
}

shJsonFilePrettify() {
    # this function will
    # 1. read the json-data from $FILE
    # 2. prettify the json-data
    # 3. write the prettified json-data back to $FILE
    local FILE || return $?
    FILE="$1" || return $?
    node -e "
        'use strict';
        require('fs').writeFileSync(
            '$FILE',
            JSON.stringify(JSON.parse(require('fs').readFileSync('$FILE')), null, 4)
        );
    " || return $?
}

shMountData() {
    # this function will mount /dev/xvdf to /root, and is intended for aws-ec2 setup
    local IFS_OLD TMP || return $?
    # mount optional /dev/xvdb
    mkdir -p /mnt/local || return $?
    mount /dev/xvdb /mnt/local -o noatime || true
    # mount data /dev/xvdf
    mount /dev/xvdf /root -o noatime || true
    # mount bind
    # http://stackoverflow.com/questions/9713104/loop-over-tuples-in-bash
    # save IFS
    IFS_OLD="$IFS" || return $?
    IFS="," || return $?
    for TMP in /root/tmp,/tmp /root/var.lib.docker,/var/lib/docker
    do
        set "$TMP" || return $?
        mkdir -p "$1" "$2" || return $?
        mount "$1" "$2" -o bind || true
    done
    chmod 1777 /tmp || true
    # restore IFS
    IFS_OLD="$IFS" || return $?
}

shNpmTest() {
    # this function will run npm-test
    shBuildPrint "${MODE_BUILD:-npmTest}" "npm-testing $CWD" || return $?
    # cleanup $npm_config_dir_tmp/*.json
    rm -f "$npm_config_dir_tmp/"*.json || return $?
    # cleanup old electron pages
    rm -f "$npm_config_dir_tmp/"electron.*.html || return $?
    # init $npm_config_dir_build
    mkdir -p "$npm_config_dir_build/coverage.html" || return $?
    # init npm-test-mode
    export npm_config_mode_npm_test=1 || return $?
    # if coverage-mode is disabled, then run npm-test without coverage
    if [ "$npm_config_mode_coverage" = "" ]
    then
        "$@"
        return $?
    fi
    # cleanup old coverage
    rm -f "$npm_config_dir_build/coverage.html/"coverage.*.json || return $?
    # run npm-test with coverage
    shIstanbulCover "$@"
    # save $EXIT_CODE and restore $CWD
    shExitCodeSave $? || return $?
    # debug covered-test by re-running it uncovered
    if [ "$EXIT_CODE" != 0 ]
    then
        npm_config_mode_coverage="" "$@"
    fi
    return "$EXIT_CODE"
}

shNpmTestPublished() {
    # this function will run npm-test on the published package
    shBuildPrint npmTestPublished "npm-testing published package $npm_package_name" || return $?
    # init /tmp/app
    rm -fr /tmp/app /tmp/node_modules && mkdir -p /tmp/app || return $?
    # cd /tmp/app
    cd /tmp/app || return $?
    # npm-install package
    npm install "$npm_package_name" || return $?
    cd "node_modules/$npm_package_name" || return $?
    npm install || return $?
    # npm-test package
    npm_config_mode_coverage=1 npm test || return $?
}

shReadmeBuild() {
    # this function will run the internal build-script embedded in README.md
    # init $npm_config_dir_build
    mkdir -p "$npm_config_dir_build/coverage.html" || return $?
    # run shell script from README.md
    MODE_BUILD=build shReadmeTestSh "$npm_config_dir_tmp/build.sh" || return $?
}

shReadmeExportFile() {
    # this function will extract and save the script $1 embedded in README.md to $2
    node -e "
        'use strict';
        require('fs').writeFileSync(
            '$2',
            require('fs')
                .readFileSync('$CWD/README.md', 'utf8')
                // support syntax-highlighting
                .replace((/[\\S\\s]+?\n.*?$1\s*?\`\`\`\\w*?\n/), function (match0) {
                    // preserve lineno
                    return '$MODE_LINENO' === '0'
                        ? ''
                        : match0.replace((/.+/g), '');
                })
                .replace((/\n\`\`\`[\\S\\s]+/), '')
                // parse '\' line-continuation
                .replace((/(?:.*\\\\\n)+.*/g), function (match0) {
                    return match0.replace((/\\\\\n/g), '') + match0.replace((/.+/g), '');
                })
        );
    " || return $?
}

shReadmeTestJs() {
    # this function will extract, save, and test the js script $FILE embedded in README.md
    local FILE SCRIPT || return $?
    FILE="$1" || return $?
    shBuildPrint "$MODE_BUILD" "testing $FILE" || return $?
    if [ "$MODE_OFFLINE" = "" ]
    then
        # init /tmp/app
        rm -fr /tmp/app /tmp/node_modules && mkdir -p /tmp/app || return $?
    fi
    # cd /tmp/app
    cd /tmp/app || return $?
    # read and parse js script from README.md
    shReadmeExportFile "$FILE" "$FILE" || return $?
    # jslint $FILE
    if [ "$MODE_OFFLINE" = "" ] && [ "$npm_config_mode_jslint" != 0 ]
    then
        "$npm_config_dir_utility2/lib.jslint.js" "$FILE" || return $?
    fi
    # test $FILE
    SCRIPT="$(node -e "
        'use strict';
        console.log((/\n *\\$ (.*)/).exec(require('fs').readFileSync('$FILE', 'utf8'))[1]);
    ")" || return $?
    if [ "$MODE_OFFLINE" ]
    then
        SCRIPT="$(node -e "
            'use strict';
            console.log('$SCRIPT'.replace('npm install', 'echo'));
        ")" || return $?
    fi
    printf "$SCRIPT\n\n" && eval "$SCRIPT" || return $?
}

shReadmeTestSh() {
    # this function will extract, save, and test the shell script $FILE embedded in README.md
    local FILE FILE_BASENAME || return $?
    FILE="$1" || return $?
    FILE_BASENAME="$(node -e "
        'use strict';
        console.log(require('path').basename('$FILE'));
    ")" || return $?
    shBuildPrint "$MODE_BUILD" "testing $FILE" || return $?
    if [ "$MODE_BUILD" != "build" ]
    then
        if [ "$MODE_OFFLINE" = "" ]
        then
            # init /tmp/app
            rm -fr /tmp/app /tmp/node_modules && mkdir -p /tmp/app || return $?
        fi
        # cd /tmp/app
        cd /tmp/app || return $?
    fi
    # read and parse script from README.md
    shReadmeExportFile "$FILE_BASENAME" "$FILE" || return $?
    # display file
    node -e "
        'use strict';
        console.log(require('fs').readFileSync('$FILE', 'utf8').trimLeft());
    " || return $?
    # test $FILE
    /bin/sh "$FILE" || return $?
}

shRun() {
    # this function will run the command $@ and restore $CWD on exit
    # eval argv and auto-restart on non-zero exit, unless exited by SIGINT
    if [ "$npm_config_mode_auto_restart" ] && [ ! "$npm_config_mode_auto_restart_child" ]
    then
        export npm_config_mode_auto_restart_child=1
        while true
        do
            printf "(re)starting $*" || return $?
            printf "\n" || return $?
            "$@"
            # save $EXIT_CODE
            EXIT_CODE="$?" || return $?
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
        "$@"
    fi
    # save $EXIT_CODE and restore $CWD
    shExitCodeSave $? || return $?
    return "$EXIT_CODE"
}

shRunScreenCapture() {
    # this function will run the command $@ and screen-capture the output
    # http://www.cnx-software.com/2011/09/22
    # /how-to-convert-a-command-line-result-into-an-image-in-linux/
    # init $npm_config_dir_build
    mkdir -p "$npm_config_dir_build/coverage.html" || return $?
    export MODE_BUILD_SCREEN_CAPTURE="screen-capture.${MODE_BUILD:-undefined}.svg" || return $?
    shRun "$@" 2>&1 | tee $npm_config_dir_tmp/screen-capture.txt || return $?
    # save $EXIT_CODE and restore $CWD
    shExitCodeSave "$(cat $npm_config_file_tmp)" || return $?
    # format text-output
    node -e "
        'use strict';
        var options;
        options = {};
        options.fs = require('fs');
        options.wordwrap = function (line, ii) {
            if (ii && !line) {
                return '';
            }
            options.yy += 16;
            return '<tspan x=\"10\" y=\"' + options.yy + '\">' + line
                .replace((/&/g), '&amp;')
                .replace((/</g), '&lt;')
                .replace((/>/g), '&gt;') + '</tspan>\n';
        };
        options.yy = 10;
        options.result = (options.fs
            .readFileSync('$npm_config_dir_tmp/screen-capture.txt', 'utf8')
            // remove ansi escape-code
            .replace((/\u001b.*?m/g), '')
            // format unicode
            .replace((/\\\\u[0-9a-f]{4}/g), function (match0) {
                return String.fromCharCode('0x' + match0.slice(-4));
            })
            .trimRight() + '\n')
            .replace((/(.*)\n/g), function (match0, line) {
                return line
                    .replace((/.{0,96}/g), options.wordwrap)
                    .replace((/(<\/tspan>\n<tspan)/g), '\\\\\$1');
            });
        options.result = '<svg height=\"' + (options.yy + 20) +
            '\" width=\"720\" xmlns=\"http://www.w3.org/2000/svg\">\n' +
            '<rect height=\"' + (options.yy + 20) +
                '\" fill=\"#555\" width=\"720\"></rect>\n' +
            '<text fill=\"#7f7\" font-family=\"Courier New\" font-size=\"12\" ' +
            'xml:space=\"preserve\">\n' +
            options.result + '</text>\n</svg>\n';
        options.fs
            .writeFileSync('$npm_config_dir_build/$MODE_BUILD_SCREEN_CAPTURE', options.result);
    " || return $?
    return "$EXIT_CODE"
}

shServerPortRandom() {
    # this function will print a random port in the inclusive range 0x8000 to 0xffff
    printf "$(($(hexdump -n 2 -e '/2 "%u"' /dev/urandom)|32768))"
}

shSource() {
    # this function will source .bashrc
    . "$HOME/.bashrc" || return $?
}

shTravisDecryptYml() {
    # this function will decrypt $AES_ENCRYPTED_SH in .travis.yml to stdout
    perl -ne "print \$1 if /- AES_ENCRYPTED_SH: (.*) # AES_ENCRYPTED_SH\$/" .travis.yml | \
        shAesDecrypt || return $?
}

shTravisEncrypt() {
    # this function will travis-encrypt $SECRET for the $GITHUB_REPO
    local GITHUB_REPO SECRET || return $?
    GITHUB_REPO="$1" || return $?
    SECRET="$2" || return $?
    # init $npm_config_dir_build dir
    mkdir -p "$npm_config_dir_build/coverage.html" || return $?
    # get public rsa key from https://api.travis-ci.org/repos/<owner>/<repo>/key
    curl -fLSs "https://api.travis-ci.org/repos/$GITHUB_REPO/key" > "$npm_config_file_tmp" || \
        return $?
    perl -i -pe "s/[^-]+(.+-).+/\$1/; s/\\\\n/\n/g; s/ RSA / /g" "$npm_config_file_tmp" || \
        return $?
    # rsa-encrypt $SECRET and print it
    printf "$SECRET" | \
        openssl rsautl -encrypt -pubin -inkey "$npm_config_file_tmp" | \
        base64 | \
        tr -d "\n" || return $?
}

shTravisEncryptYml() {
    # this function will travis-encrypt $FILE to $AES_ENCRYPTED_SH and embed it in .travis.yml
    local AES_256_KEY_ENCRYPTED FILE || return $?
    FILE="$1" || return $?
    if [ ! -f "$FILE" ]
    then
        printf "# non-existent file $FILE\n" || return $?
        return 1
    fi
    printf "# sourcing file $FILE\n" || return $?
    . "$FILE" || return $?
    if [ "$AES_256_KEY" = "" ]
    then
        printf "# no \$AES_256_KEY detected in env - creating new AES_256_KEY\n" || return $?
        AES_256_KEY="$(openssl rand -hex 32)" || return $?
        printf "# created new \$AES_256_KEY for encrypting data.\n" || return $?
        printf "# you may want to copy the following to your .bashrc script\n" || return $?
        printf "# so you can run builds locally:\n" || return $?
        printf "export AES_256_KEY=$AES_256_KEY\n\n" || return $?
    fi
    printf "# travis-encrypting \$AES_256_KEY for $GITHUB_REPO\n" || return $?
    AES_256_KEY_ENCRYPTED="$(shTravisEncrypt $GITHUB_REPO \$AES_256_KEY=$AES_256_KEY)" || \
        return $?
    # return non-zero exit-code if $AES_256_KEY_ENCRYPTED is empty string
    if [ "$AES_256_KEY_ENCRYPTED" = "" ]
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

shUbuntuInit() {
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

shXvfbStart() {
    export DISPLAY=:99.0 || return $?
    (Xvfb "$DISPLAY" &) > /dev/null 2>&1 || true
}

shMain() {
    # this function will run the main program
    local COMMAND || return $?
    if [ "$1" = "" ]
    then
      return $?
    fi
    COMMAND="$1" || return $?
    shift || return $?
    case "$COMMAND" in
    grep)
        shGrep "$1" "$2" || return $?
        ;;
    shRun)
        shInit && "$COMMAND" "$@" || return $?
        ;;
    shRunScreenCapture)
        shInit && "$COMMAND" "$@" || return $?
        ;;
    shServerPortRandom)
        shServerPortRandom || return $?
        ;;
    start)
        shInit && npm_config_mode_auto_restart=1 shRun node \
            "$npm_config_dir_utility2/test.js" "$@" || return $?
        ;;
    test)
        shInit && shNpmTest "$@" || return $?
        ;;
    utility2Dirname)
        shInit && printf "$npm_config_dir_utility2" || return $?
        ;;
    *)
        "$COMMAND" "$@" || return $?
        ;;
    esac
}
shMain "$@"
