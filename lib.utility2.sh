#/bin/sh

shAesDecrypt() {(set -e
# this function will decrypt base64-encoded stdin to stdout using aes-256-cbc
    # save stdin to $STRING
    STRING="$(cat /dev/stdin)"
    # init $IV from first 44 base64-encoded bytes of $STRING
    IV="$(printf "$STRING" | cut -c1-44 | base64 --decode)"
    # decrypt remaining base64-encoded bytes of $STRING to stdout using aes-256-cbc
    printf "$STRING" | \
        cut -c45-9999 | \
        base64 --decode | \
        openssl enc -aes-256-cbc -d -K "$AES_256_KEY" -iv "$IV"
)}

shAesEncrypt() {(set -e
# this function will encrypt stdin to base64-encoded stdout,
# with a random iv prepended using aes-256-cbc
    # init $IV from random 16 bytes
    IV="$(openssl rand -hex 16)"
    # print base64-encoded $IV to stdout
    printf "$(printf "$IV" | base64)"
    # encrypt stdin and stream to stdout using aes-256-cbc with base64-encoding
    openssl enc -aes-256-cbc -K "$AES_256_KEY" -iv "$IV" | base64 | tr -d "\n"
)}

shBaseInit() {
# this function will init the base bash-login env, and is intended for aws-ec2 setup
    local FILE || return $?
    # init $PATH_BIN
    if [ ! "$PATH_BIN" ]
    then
        export PATH_BIN=\
"$HOME/bin:$HOME/node_modules/.bin:/usr/local/bin:/usr/local/sbin" || return $?
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
    shUbuntuInit || return $?
    # init custom alias
    alias lld="ls -adlF" || return $?
}

shBaseInstall() {
# this function will install .bashrc, .screenrc, .vimrc, and lib.utility2.sh in $HOME,
# and is intended for aws-ec2 setup
# curl https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/lib.utility2.sh > $HOME/lib.utility2.sh && . $HOME/lib.utility2.sh && shBaseInstall
    for FILE in .screenrc .vimrc lib.utility2.sh
    do
        curl -s "https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/$FILE" > \
            "$HOME/$FILE" || return $?
    done
    # backup .bashrc
    if [ -f "$HOME/.bashrc" ] && [ ! -f "$HOME/.bashrc.00" ]
    then
        cp $HOME/.bashrc $HOME/.bashrc.00 || return $?
    fi
    # create .bashrc
    printf '. $HOME/lib.utility2.sh && shBaseInit' > "$HOME/.bashrc" || return $?
    # init .ssh/authorized_keys.root
    if [ -f "$HOME/.ssh/authorized_keys.root" ]
    then
        mv "$HOME/.ssh/authorized_keys.root" "$HOME/.ssh/authorized_keys" || return $?
    fi
    # source .bashrc
    . "$HOME/.bashrc" || return $?
}

shBrowserTest() {(set -e
# this function will spawn an electron process to test the given $URL,
# and merge the test-report into the existing test-report
    export MODE_BUILD="${MODE_BUILD:-browserTest}"
    shBuildPrint "electron.${modeBrowserTest} - $url"
    # run browser-test
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
require('$npm_config_dir_utility2/lib.utility2.js').browserTest({
    modeBrowserTest: '$modeBrowserTest',
    timeoutDefault: '$timeoutDefault',
    timeoutScreenCapture: '$timeoutScreenCapture',
    url: '$url'
}, function (error) {
    process.exit(error && 1);
});
// </script>
    "
    if [ "$modeBrowserTest" = test ]
    then
        # create test-report artifacts
        shTestReportCreate
    fi
)}

shBuildApp() {(set -e
# this function will build the app
    npm test --mode-test-case=testCase_build_app
)}

shBuildCiDefault() {(set -e
# this function will run the default build-ci
    # run pre-test build
    if (type shBuildCiTestPre > /dev/null 2>&1)
    then
        shBuildCiTestPre || return $?
    fi
    # init test-report.json
    cp "/tmp/app/node_modules/$npm_package_name/tmp/build/test-report.json" \
        "$npm_config_dir_build" > /dev/null 2>&1 || true
    export npm_config_file_test_report_merge="$npm_config_dir_build/test-report.json"
    # run npm-test
    (export MODE_BUILD=npmTest &&
        shRunScreenCapture npm test --mode-coverage) || return $?
    # run post-test build
    if (type shBuildCiTestPost > /dev/null 2>&1)
    then
        shBuildCiTestPost || return $?
    fi
    # create api-doc
    (export MODE_BUILD=docApiCreate &&
        shBuildDoc) || return $?
    # create package-listing
    (export MODE_BUILD=gitLsTree &&
        shRunScreenCapture shGitLsTree) || return $?
    # create recent changelog of last 50 commits
    (export MODE_BUILD=gitLog &&
        shRunScreenCapture git log -50 --pretty="%ai\u000a%B") || return $?
    # if running legacy-node, then do not continue
    [ "$(node --version)" \< "v7.0" ] && return || true
    # upload build-artifacts to github, and if number of commits > $COMMIT_LIMIT,
    # then squash older commits
    (export MODE_BUILD=buildGithubUpload &&
        shBuildGithubUpload) || return $?
)}

shBuildDoc() {(set -e
# this function will build the doc
    npm test --mode-test-case=testCase_build_doc --mode-coverage=""
)}

shBuildGithubUpload() {(set -e
# this function will upload build-artifacts to github
    if [ ! "$GIT_SSH" ]
    then
        return
    fi
    export MODE_BUILD=buildGithubUpload
    shBuildPrint "uploading build-artifacts to git@github.com:$GITHUB_REPO.git"
    if ! (type shGitRepoBranchUpdateLocal > /dev/null 2>&1)
    then
        shGitRepoBranchUpdateLocal() {
        # this function will local-update git-repo-branch
            # run $BUILD_GITHUB_UPLOAD_PRE_SH
            if [ "$BUILD_GITHUB_UPLOAD_PRE_SH" ]
            then
                $BUILD_GITHUB_UPLOAD_PRE_SH
            fi
            # copy build-artifacts to gh-pages
            cp -a "$npm_config_dir_build" .
            DIR="build..$CI_BRANCH..$CI_HOST"
            rm -fr "$DIR" && cp -a "$npm_config_dir_build" "$DIR"
        }
    fi
    (shGitRepoBranchCommand update "git@github.com:$GITHUB_REPO.git" gh-pages) || return $?
)}

shBuildInsideDocker() {(set -e
# this function will run the build inside docker
    export npm_config_unsafe_perm=1
    # start xvfb
    shXvfbStart
    # https://github.com/npm/npm/issues/10686
    # bug-workaround - Cannot read property 'target' of null #10686
    sed -in -e 's/  "_requiredBy":/  "_requiredBy_":/' package.json
    rm -f package.jsonn
    # npm install
    npm install
    # npm test
    npm test --mode-coverage
    # cleanup tmp
    rm -fr tmp
    # cleanup build
    shDockerBuildCleanup
)}

shBuildPrint() {
# this function will print debug info about the build state
    printf '%b' "\n\033[35m[MODE_BUILD=$MODE_BUILD]\033[0m - $(shDateIso) - $1\n\n" || return $?
}

shDateIso() {(set -e
# this function will print the current date in ISO format
    date -u "+%Y-%m-%dT%H:%M:%SZ"
)}

shDebugArgv() {(set -e
# this function will print each element in $@ in a separate line
    for ARG in "$@"
    do
        printf "'$ARG'\n"
    done
)}

shDockerBuildCleanup() {(set -e
# this function will cleanup the docker build
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

shDockerCopyFromImage() {(set -e
# http://stackoverflow.com/questions/25292198
# /docker-how-can-i-copy-a-file-from-an-image-to-a-host
# this function will copy the $FILE_FROM from the docker $IMAGE to $FILE_TO
    FILE_FROM="$1"
    FILE_TO="$2"
    IMAGE="$3"
    # create $CONTAINER from $IMAGE
    CONTAINER="$(docker create "$IMAGE")"
    docker cp "$CONTAINER:$FILE_FROM" "$FILE_TO"
    # cleanup $CONTAINER
    docker rm -v "$CONTAINER"
)}

shDockerInstall() {(set -e
# http://docs.docker.com/installation/ubuntulinux
# this function will install docker
    mkdir -p $HOME/docker
    wget -qO- https://get.docker.com/ | /bin/sh
    # test docker
    docker run hello-world
)}

shDockerLogs() {(set -e
# this function log the docker container $1
    docker logs -f --tail=256 $1
)}

shDockerNpmRestart() {(set -e
# this function will npm-restart the app inside the docker-container $IMAGE:$NAME
    DIR="$3"
    DOCKER_PORT="$4"
    IMAGE="$2"
    NAME="$1"
    shDockerRestart $NAME $IMAGE /bin/bash -c "set -e
        curl https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/lib.utility2.sh > \
            /tmp/lib.utility2.sh
        . /tmp/lib.utility2.sh
        cd $DIR
        PORT=$DOCKER_PORT npm start
    "
)}

shDockerRestart() {(set -e
# this function will restart the docker-container
    shDockerRm "$1"
    shDockerStart "$@"
)}

shDockerRestartNginx() {(set -e
# this function will restart the nginx docker-container
    # init $HOME/docker/etc.nginx.htpasswd.private
    FILE="$HOME/docker/etc.nginx.htpasswd.private"
    if [ ! -f "$FILE" ]
    then
        printf "foo:$(openssl passwd -crypt bar)" > $FILE
    fi
    # init $HOME/docker/etc.nginx.htpasswd.share
    FILE="$HOME/docker/etc.nginx.htpasswd.share"
    if [ ! -f "$FILE" ]
    then
        printf "foo:$(openssl passwd -crypt bar)" > $FILE
    fi
    # https://www.nginx.com/resources/wiki/start/topics/examples/full/#nginx-conf
    # init $HOME/docker/etc.nginx.conf.d.default.conf
    FILE="$HOME/docker/etc.nginx.conf.d/default.conf"
    if [ ! -f "$FILE" ]
    then
        mkdir -p "$HOME/docker/etc.nginx.conf.d"
        printf '
# http server
server {
    listen 80;
    # redirect to https
    location / {
        rewrite ^ https://$host$request_uri permanent;
    }
}
# https://www.nginx.com/resources/wiki/start/topics/examples/SSL-Offloader/#sslproxy-conf
# https server
server {
    listen 443;
    root /root/docker/usr.share.nginx.html;
    ssl_certificate /root/docker/etc.nginx.ssl.pem;
    ssl_certificate_key /root/docker/etc.nginx.ssl.key;
    ssl on;
    ssl_prefer_server_ciphers on;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
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
    # http://superuser.com/questions/226192/openssl-without-prompt
    # init $HOME/docker/etc.nginx.ssl
    FILE="$HOME/docker/etc.nginx.ssl"
    if [ ! -f "$FILE.pem" ]
    then
        openssl req -days 365 -keyout "$FILE.key" -new -newkey rsa:4096 -nodes \
            -out "$FILE.pem" -subj "/C=AU" -x509
    fi
    # init $HOME/docker/usr.share.nginx.html
    mkdir -p "$HOME/docker/usr.share.nginx.html"
    shDockerRm nginx
    # https://registry.hub.docker.com/_/nginx/
    docker run --name nginx -d -p 80:80 -p 443:443 \
        -v "$HOME:/root:ro" \
        -v "$HOME/docker/etc.nginx.conf.d:/etc/nginx/conf.d:ro" \
        -v "$HOME/docker/etc.nginx.conf.d/default.conf:/etc/nginx/conf.d/default.conf:ro" \
        nginx
)}

shDockerRestartPptp() {(set -e
# https://github.com/mobtitude/docker-vpn-pptp
# this function will restart the pptp docker-container
    FILE="$HOME/docker/pptp.etc.ppp.chap-secrets"
    # init /etc/ppp/chap-secrets
    if [ ! -f "$FILE" ]
    then
        printf "foo * bar *" > "$FILE"
        chmod 600 "$FILE"
    fi
    shDockerRm pptp
    docker run --name pptp --privileged -d -p 1723:1723 \
        -v "$HOME:/root" -v "$FILE:/etc/ppp/chap-secrets:ro" \
        mobtitude/vpn-pptp
)}

shDockerRestartTransmission() {(set -e
# https://hub.docker.com/r/dperson/transmission/
# this function will restart the transmission docker-container
    DIR="$HOME/downloads"
    mkdir -p "$DIR"
    shDockerRm transmission
    docker run --name transmission -d -e TRPASSWD=admin -e TRUSER=admin -e TZ=EST5EDT \
        -p 9091:9091 \
        -v "$HOME:/root" -v "$DIR:/var/lib/transmission-daemon" \
        dperson/transmission
)}

shDockerRm() {(set -e
# this function will stop and rm the docker-containers $@
    # wait for docker-container to stop
    # docker stop "$@" || true
    docker rm -fv "$@" || true
)}

shDockerRmAll() {(set -e
# this function will stop and rm all docker-containers
    shDockerRm $(docker ps -aq)
)}

shDockerRmSince() {(set -e
# this function will stop and rm all docker-containers since $NAME
    NAME="$1"
    shDockerRm $(docker ps -aq --since="$NAME")
)}

shDockerRmiUntagged() {(set -e
# this function will rm all untagged docker images
    docker rmi $(docker images -aqf dangling=true) 2>/dev/null || true
)}

shDockerSh() {(set -e
# this function will run /bin/bash in the docker-container $NAME
    # http://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html
    COMMAND="${2:-/bin/bash}"
    NAME="$1"
    docker start "$NAME"
    docker exec -it "$NAME" $COMMAND
)}

shDockerStart() {(set -e
# this function will start the docker-container $IMAGE:$NAME with the command $@
    NAME="$1"
    shift
    IMAGE="$1"
    shift
    if [ "$DOCKER_PORT" ]
    then
        DOCKER_OPTIONS="$DOCKER_OPTIONS -p $DOCKER_PORT:$DOCKER_PORT"
    fi
    docker run --name "$NAME" -dt -e debian_chroot="$NAME" \
        -v "$HOME:/root" \
        $DOCKER_OPTIONS \
        "$IMAGE" "$@"
    shDockerLogs $NAME
)}

shDsStoreRm() {(set -e
# http://stackoverflow.com/questions/2016844/bash-recursively-remove-files
# this function will recursively rm .DS_Store from the current dir
    find . -name "._*" -print0 | xargs -0 rm || true
    find . -name ".DS_Store" -print0 | xargs -0 rm || true
    find . -name "npm-debug.log" -print0 | xargs -0 rm || true
)}

shDuList() {(set -e
# this function will run du, and create a list of all child dir in $1 sorted by size
    du -ms $1/* | sort -nr
)}

shEmscriptenInit() {
# this function will init emscripten
    export PATH_EMSCRIPTEN="/emsdk:\
/emsdk/clang/fastcomp/build_master_64/bin:\
/emsdk/emscripten/master:\
/emsdk/node/4.1.1_64bit/bin"
    export PATH="$PATH_EMSCRIPTEN:$PATH"
    emsdk activate
}

shFileKeySort() {(set -e
# this function sort the keys in the file
    FILE="$1"
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
console.log('var aa = [' + require('fs').readFileSync('$FILE', 'utf8')
/* jslint-ignore-begin */
    .replace((/\\n{2,}/gm), '\\n')
    .replace((/^( {8}\\w[^ ]*? = .*?)$/gm), '\`\"\$1\",')
    .replace((/^(\\w+?\\(\\) \\{.*?)$/gm), '\`\"\$1\",')
    .replace((/\\n[^\`].*?$/gm), '')
    .replace((/^\W.*/), '')
    .replace((/\`/g), '') + '];\n\
var bb = aa.slice().sort();\n\
aa.forEach(function (aa, ii) {\n\
    console.log(ii, aa === bb[ii], aa, bb[ii]);\n\
});\n\
JSON.stringify(aa) === JSON.stringify(bb)\n\
'
/* jslint-ignore-end */
    );
// </script>
    "
)}

shFileTrimLeft() {(set -e
# this function will inline trimLeft the $FILE
    FILE="$1"
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
require('fs').writeFileSync('$FILE', require('fs').readFileSync('$FILE', 'utf8').trimLeft());
process.stdout.write('$FILE');
// </script>
    "
)}

shFileTrimTrailingWhitespace() {(set -e
# this function will trim trailing whitespaces from the file
    # find . -type file -print0 | xargs -0 sed -i -e 's/[ ]\{1,\}$//'
    # find . -type file -print0 | xargs -0 sed -i '' -e 's/[ ]\{1,\}$//'
    sed -in -e 's/[ ]\{1,\}$//' "$1"
    rm -f "$1n"
)}

shGitDiffNameStatus() {(set -e
# this function will only show the name-status of git diff $@
    git diff --name-status $@
)}

shGitGc() {(set -e
# http://stackoverflow.com/questions/3797907/how-to-remove-unused-objects-from-a-git-repository
# this function will gc unreachable .git objects
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
        gc "$@"
)}

shGitInfo() {(set -e
# this function will run checks before npm-publixh
    shGitLsTree
    printf "\n"
    git diff HEAD
    printf "\n"
    git status
    printf "\n"
    git grep '!\! ' || true
    printf "\n"
    git grep '#alpha' || true
    printf "\n"
    git grep '\becho\b' *.sh || true
)}

shGitLsTree() {(set -e
# this function will list all files committed in HEAD
    ii=0
    git ls-tree --name-only -r HEAD | while read file
    do
        ii=$((ii+1))
        printf "%-4s    %s    %8s bytes    %s\n" \
            "$ii" \
            "$(git log -1 --format="%ai" -- "$file")" \
            "$(ls -ln "$file" | awk "{print \$5}")" \
            "$file"
    done
)}

shGitRepoBranchCommand() {
# this fuction will copy / move / update git-repo-branch
    local BRANCH1 BRANCH2 COMMAND EXIT_CODE MESSAGE RANGE REPO1 REPO2 || return $?
    EXIT_CODE=0 || return $?
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
            tar -C /tmp/git.repo.branch -xvzf - || return $?
        ;;
    *)
        git clone "$REPO1" "--branch=$BRANCH1" --single-branch /tmp/git.repo.branch || return $?
        ;;
    esac
    if [ ! "$REPO1" ]
    then
        return
    fi
    cd /tmp/git.repo.branch || return $?
    # init git
    git init 2>/dev/null || true
    if ! (git config user.email  > /dev/null 2>&1)
    then
        git config user.email nobody || return $?
        git config user.name nobody || return $?
    fi
    # update git-repo-branch
    if (type shGitRepoBranchUpdateLocal > /dev/null 2>&1)
    then
        shGitRepoBranchUpdateLocal || EXIT_CODE=$?
        # reset shGitRepoBranchUpdateLocal
        unset -f shGitRepoBranchUpdateLocal || return $?
        [ "$EXIT_CODE" = 0 ] || return "$EXIT_CODE"
    fi
    # git add .
    git add .
    # git commit
    if [ "$MESSAGE" ]
    then
        git commit -am "$MESSAGE" 2>/dev/null || true
    else
        git commit -am "[skip ci]" \
            -m "$(shDateIso)" \
            -m "$COMMAND $REPO1#$BRANCH1 to $REPO2#$BRANDH2" \
            -m "$(uname -a)" 2>/dev/null || true
    fi
    if [ ! "$REPO2" ]
    then
        return
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
        git push "$REPO1":"$BRANCH1" || return $?
        ;;
    esac
}

shGitSquashPop() {(set -e
# http://stackoverflow.com/questions/5189560
# this function will squash HEAD to the given $COMMIT
# /how-can-i-squash-my-last-x-commits-together-using-git
    COMMIT="$1"
    MESSAGE="${2:-$(git log -1 --pretty=%s)}"
    # commit any uncommitted data
    git commit -am "$MESSAGE" || true
    # reset git to previous $COMMIT
    git reset --hard "$COMMIT"
    # reset files to current HEAD
    git merge --squash HEAD@{1}
    # commit HEAD immediately after previous $COMMIT
    git commit -am "$MESSAGE"
)}

shGitSquashShift() {(set -e
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

shGithubDeploy() {(set -e
# this function will deploy the app to $GITHUB_REPO
# and run a simple curl check for the main-page
    if [ ! "$GIT_SSH" ]
    then
        return
    fi
    export MODE_BUILD=githubDeploy
    shBuildPrint "deploying to $TEST_URL"
    # build app
    shBuildApp
    # upload app
    shBuildGithubUpload
    shBuildPrint "waiting 15 seconds for $TEST_URL to finish deploying"
    sleep 15
    # verify deployed app's main-page returns status-code < 400
    # '
    if [ $(curl --connect-timeout 30 -Ls -o /dev/null -w "%{http_code}" "$TEST_URL") -lt 400 ]
    then
        shBuildPrint "curl test passed for $TEST_URL"
    else
        shBuildPrint "curl test failed for $TEST_URL"
        return 1
    fi
    # screen-capture deployed app
    export modeBrowserTest=screenCapture
    export url="$TEST_URL"
    shBrowserTest
)}

shGrep() {(set -e
# this function will recursively grep $DIR for the $REGEXP
    DIR="$1"
    REGEXP="$2"
    FILE_FILTER="\
/\\.\\|.*\\(\\b\\|_\\)\\(\\.\\d\\|\
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
tmp\\)\\(\\b\\|[_s]\\)\
"
    find "$DIR" -type f | \
        grep -v "$FILE_FILTER" | \
        tr "\n" "\000" | \
        xargs -0 grep -Iine "$REGEXP" || true
)}

shGrepFileReplace() {(set -e
# this function will save the grep-and-replace lines in $FILE
    FILE=$1
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
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
// </script>
    "
)}

shHerokuDeploy() {(set -e
# this function will deploy the app to $HEROKU_REPO,
# and run a simple curl check for the main-page
    if [ ! "$GIT_SSH" ]
    then
        return
    fi
    export MODE_BUILD=herokuDeploy
    shBuildPrint "deploying to $TEST_URL"
    # build app
    shBuildApp
    # upload app
    (shGitRepoBranchCommand copyPwdLsTree local HEAD "git@heroku.com:$HEROKU_REPO.git" master) \
        || return $?
    shBuildPrint "waiting 30 seconds for $TEST_URL to finish deploying"
    sleep 30
    # verify deployed app's main-page returns status-code < 400
    # '
    if [ $(curl --connect-timeout 30 -Ls -o /dev/null -w "%{http_code}" "$TEST_URL") -lt 400 ]
    then
        shBuildPrint "curl test passed for $TEST_URL"
    else
        shBuildPrint "curl test failed for $TEST_URL"
        return 1
    fi
    # screen-capture deployed app
    export modeBrowserTest=screenCapture
    export url="$TEST_URL"
    shBrowserTest
)}

shHtpasswdCreate() {(set -e
# this function will create and print htpasswd to stdout
    printf "$1:$(openssl passwd -apr1 "$2")"
)}

shHttpFileServer() {(set -e
# this function will run a simple node http-file-server on http-port $PORT
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
require('http').createServer(function (request, response) {
    require('fs').readFile(
        process.cwd() + require('url').parse(request.url).pathname,
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

shInit() {
# this function will init the env
    # init CI_*
    if [ -d .git ]
    then
        # init travis-ci.org env
        if [ "$TRAVIS" ]
        then
            export CI_BRANCH="${CI_BRANCH:-$TRAVIS_BRANCH}" || return $?
            export CI_COMMIT_ID="$TRAVIS_COMMIT" || return $?
            export CI_HOST=travis-ci.org || return $?
            # decrypt and exec encrypted data
            if [ "$AES_256_KEY" ]
            then
                eval "$(shTravisDecryptYml)" || return $?
            fi
        # init default env
        else
            export CI_BRANCH="${CI_BRANCH:-alpha}" || return $?
            export CI_COMMIT_ID="$(git rev-parse --verify HEAD)" || return $?
            export CI_HOST=localhost || return $?
        fi
        # init $CI_COMMIT_*
        export CI_COMMIT_MESSAGE="$(git log -1 --pretty=%s)" || return $?
        export CI_COMMIT_INFO="$CI_COMMIT_ID - $CI_COMMIT_MESSAGE" || return $?
    fi
    # extract and save the scripts embedded in README.md to tmp/
    if [ -f README.md ]
    then
        mkdir -p tmp
        node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var local;
local = {};
local.fs = require('fs');
local.nop = function () {
    return;
};
local.readme = local.fs.readFileSync('README.md', 'utf8');
local.packageJson = {};
local.packageJson.description = local.readme.split('\n')[2];
[
    (/\`\`\`json(\n[\\W\\s]*?(package.json)[\n\"][\\S\\s]+?)\n\`\`\`/g),
    (/\`\`\`\\w*?(\n[\\W\\s]*?(\w\S*?)[\n\"][\\S\\s]+?)\n\`\`\`/g)
].forEach(function (rgx) {
    local.readme.replace(rgx, function (match0, match1, match2, ii, text) {
        // jslint-hack
        local.nop(match0);
        // preserve lineno
        match1 = text.slice(0, ii).replace((/.+/g), '') + match1
            // parse '\' line-continuation
            .replace((/(?:.*\\\\\n)+.*/g), function (match0) {
                return match0.replace((/\\\\\n/g), '') + match0.replace((/.+/g), '');
            });
        // trim json-file
        if (match2.slice(-5) === '.json') {
            match1 = match1.trim();
        }
        // handle package.json
        if (match2 === 'package.json') {
            match1 = match1
                .replace((/\{\{packageJson\.description\}\}/g), local.packageJson.description);
            local.packageJson = JSON.parse(match1);
            local.readme = local.readme
                .replace((/\{\{packageJson\.([^}]+?)\}\}/g), function (match0, match1) {
                    // jslint-hack
                    local.nop(match0);
                    return local.packageJson[match1];
                });
            local.fs.writeFileSync('package.json', match1);
        }
        local.fs.writeFileSync('tmp/README.' + match2, match1);
    });
});
// </script>
"
    fi
    # init $npm_package_*
    if [ -f package.json ]
    then
        eval $(node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var dict, value;
dict = require('./package.json');
Object.keys(dict).forEach(function (key) {
    value = dict[key];
    if (typeof value === 'string' && value.indexOf('\n') === -1) {
        process.stdout.write('export npm_package_' + key + '=' + JSON.stringify(value) + ';');
    }
});
value = (/\bgithub\.com\/(.*)\.git\$/).exec(dict.repository && dict.repository.url);
if (process.env.GITHUB_REPO === undefined && value) {
    process.stdout.write('export GITHUB_REPO=' + JSON.stringify(value[1]) + ';');
}
// </script>
        ") || return $?
    else
        export npm_package_name=undefined || return $?
        export npm_package_version=0.0.1 || return $?
    fi
    # init $npm_config_*
    export npm_config_dir_build="$PWD/tmp/build" || return $?
    export npm_config_dir_tmp="$PWD/tmp" || return $?
    export npm_config_file_tmp="$PWD/tmp/tmpfile" || return $?
    # init $npm_config_dir_build dir
    mkdir -p "$npm_config_dir_build/coverage.html"
    # init $npm_config_dir_utility2
    shInitNpmConfigDirUtility2 || return $?
    # init $GIT_SSH
    if [ "$GIT_SSH_KEY" ]
    then
        export GIT_SSH="$npm_config_dir_utility2/git-ssh.sh" || return $?
    fi
    # init $PATH
    export PATH="$PWD/node_modules/.bin:$PATH" || return $?
}

shInitNpmConfigDirUtility2() {
# this function will init $npm_config_dir_utility2
    local DIR SOURCE || return $?
    if [ "$npm_config_dir_utility2" ]
    then
        return
    fi
    # init $npm_config_dir_utility2
    if [ "$npm_package_name" = utility2 ]
    then
        export npm_config_dir_utility2="$PWD" || return $?
    else
        export npm_config_dir_utility2="$(node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
console.log(require('utility2').__dirname);
// </script>
        " 2>/dev/null)" || return $?
    fi
    if [ ! -d "$npm_config_dir_utility2" ]
    then
        export npm_config_dir_utility2="$(dirname "$(readlink -f "$0" 2>/dev/null)")" ||
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

shIptablesDockerInit() {(set -e
# https://github.com/docker/docker/issues/1871
# this function will create an iptables DOCKER chain
    iptables -t nat -N DOCKER
    iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL -j DOCKER
    iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL ! --dst 127.0.0.0/8 -j DOCKER
    iptables-save > /etc/iptables/rules.v4
    ip6tables-save > /etc/iptables/rules.v6
)}

shIptablesInit() {(set -e
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
    # Allows all loopback (lo0) traffic and drop all traffic to 127/8 that doesn't use lo0
    # '
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

    # https://blog.andyet.com/2014/09/11/docker-host-iptables-forwarding
    # allow forwarding between docker0 and eth0
    # Forward chain between docker0 and eth0
    iptables -A FORWARD -i docker0 -o eth0 -j ACCEPT
    iptables -A FORWARD -i eth0 -o docker0 -j ACCEPT
    # IPv6 chain if needed
    ip6tables -A FORWARD -i docker0 -o eth0 -j ACCEPT
    ip6tables -A FORWARD -i eth0 -o docker0 -j ACCEPT
    # https://github.com/docker/docker/issues/1871
    # create iptables DOCKER chain
    iptables -t nat -N DOCKER
    iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL -j DOCKER
    iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL ! --dst 127.0.0.0/8 -j DOCKER

    # https://wiki.archlinux.org/index.php/PPTP_server#iptables_firewall_configuration
    # open iptables to pptp
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
)}

shIstanbulCover() {(set -e
# this function will run the command $@ with istanbul coverage
    if [ ! "$npm_config_mode_coverage" ]
    then
        node "$@"
        return $?
    fi
    node $npm_config_dir_utility2/lib.istanbul.js cover "$@"
)}

shJsonFileNormalize() {(set -e
# this function will
# 1. read the json-data from $FILE
# 2. normalize the json-data
# 3. write the normalizedd json-data back to $FILE
    FILE="$1"
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
require('fs').writeFileSync(
    '$FILE',
    require('utility2').jsonStringifyOrdered(JSON.parse(
        require('fs').readFileSync('$FILE')
    ), null, 4)
);
// </script>
    "
)}

shJsonFilePrettify() {(set -e
# this function will
# 1. read the json-data from $FILE
# 2. prettify the json-data
# 3. write the prettified json-data back to $FILE
    FILE="$1"
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
require('fs').writeFileSync(
    '$FILE',
    JSON.stringify(JSON.parse(require('fs').readFileSync('$FILE')), null, 4)
);
// </script>
    "
)}

shKillallElectron() {
# this function will killall electron
    killall Electron electron
}

shMountData() {(set -e
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

shNpmPublish() {(set -e
# this function will run npm-publish with a clean repo
    shInit
    shGitRepoBranchCommand copyPwdLsTree
    cd /tmp/git.repo.branch
    npm publish
)}

shNpmStartExampleJs() {(set -e
# this function will extract and run example.js from README.md
    shInit
    cp tmp/README.example.js example.js
    export PORT=8081
    node example.js
)}

shNpmStartStandalone() {(set -e
# this function will build and start the standalone app assets.app.js
    shBuildApp
    node tmp/build/app/assets.app.js
)}

shNpmTest() {(set -e
# this function will run npm-test with coverage and create test-report
    EXIT_CODE=0
    export MODE_BUILD="${MODE_BUILD:-npmTest}"
    shBuildPrint "npm-testing $PWD"
    # cleanup $npm_config_dir_tmp/*.json
    rm -f "$npm_config_dir_tmp/"*.json
    # cleanup old electron pages
    rm -f "$npm_config_dir_tmp/"electron.*.html
    # init npm-test-mode
    export NODE_ENV="${NODE_ENV:-test}"
    export npm_config_mode_test=1
    # run npm-test without coverage
    if [ ! "$npm_config_mode_coverage" ]
    then
        node "$@" || EXIT_CODE=$?
    # run npm-test with coverage
    else
        # cleanup old coverage
        rm -f "$npm_config_dir_build/coverage.html/"coverage.*.json
        # run npm-test with coverage
        shIstanbulCover "$@" || EXIT_CODE=$?
        # if $EXIT_CODE != 0, then debug covered-test by re-running it uncovered
        if [ "$EXIT_CODE" != 0 ] && [ "$EXIT_CODE" != 130 ]
        then
            npm_config_mode_coverage="" node "$@" || true
        fi
    fi
    # create test-report artifacts
    shTestReportCreate || EXIT_CODE=$?
    return "$EXIT_CODE"
)}

shNpmTestPublished() {(set -e
# this function will run npm-test on the published-package
    export MODE_BUILD=npmTestPublished
    shBuildPrint "npm-testing published-package $npm_package_name"
    # init /tmp/app
    rm -fr /tmp/app /tmp/node_modules && mkdir -p /tmp/app
    # cd /tmp/app
    cd /tmp/app
    # npm-install package
    npm install "$npm_package_name"
    cd "node_modules/$npm_package_name"
    # https://github.com/npm/npm/issues/10686
    # bug-workaround - Cannot read property 'target' of null #10686
    sed -in -e 's/  "_requiredBy":/  "_requiredBy_":/' package.json
    rm -f package.jsonn
    # npm install
    npm install
    # npm-test package
    npm test --mode-coverage
    EXIT_CODE=$?
    # save screen-capture
    cp "/tmp/app/node_modules/$npm_package_name/tmp/build/"screen-capture.*.png \
        "$npm_config_dir_build" 2>/dev/null || true
    return "$EXIT_CODE"
)}

shReadmeBuild() {(set -e
# this function will run the internal build-script embedded in README.md
    # run shell script from README.md
    export MODE_BUILD=build
    shReadmeTestSh "$npm_config_dir_tmp/README.build.sh"
)}

shReadmeTestJs() {(set -e
# this function will extract, save, and test the script $FILE embedded in README.md
    FILE="$1"
    shBuildPrint "testing $FILE"
    # init /tmp/app
    rm -fr /tmp/app /tmp/node_modules && mkdir -p /tmp/app
    # cp script from README.md
    cp "tmp/README.$FILE" "/tmp/app/$FILE"
    cp "tmp/README.$FILE" "tmp/build/$FILE"
    # cd /tmp/app
    cd /tmp/app
    # jslint $FILE
    if [ "$npm_config_mode_jslint" != 0 ]
    then
        "$npm_config_dir_utility2/lib.jslint.js" "$FILE"
    fi
    # test $FILE
    SCRIPT="$(node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
console.log((/\n *\\$ (.*)/).exec(require('fs').readFileSync('$FILE', 'utf8'))[1]);
// </script>
    ")"
    export PORT=8081
    export npm_config_timeout_exit=30000
    # screen-capture server
    (sleep 15 &&
        export modeBrowserTest=screenCapture &&
        export url="http://localhost:$PORT" &&
        shBrowserTest) &
    printf "$SCRIPT\n\n"
    eval "$SCRIPT"
    EXIT_CODE=$?
    # save screen-capture
    cp "/tmp/app/node_modules/$npm_package_name/tmp/build/"screen-capture.*.png \
        "$npm_config_dir_build" 2>/dev/null || true
    return "$EXIT_CODE"
)}

shReadmeTestSh() {(set -e
# this function will extract, save, and test the shell script $FILE embedded in README.md
    FILE="$1"
    shBuildPrint "testing $FILE"
    if [ "$MODE_BUILD" != "build" ]
    then
        # init /tmp/app
        rm -fr /tmp/app /tmp/node_modules && mkdir -p /tmp/app
        # cp script from README.md
        cp "tmp/README.$FILE" "/tmp/app/$FILE"
        cp "tmp/README.$FILE" "tmp/build/$FILE"
        # cd /tmp/app
        cd /tmp/app
    fi
    # display file
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
console.log(require('fs').readFileSync('$FILE', 'utf8').trimLeft());
// </script>
    "
    export PORT=8081
    export npm_config_timeout_exit=30000
    # screen-capture server
    (sleep 15 &&
        export modeBrowserTest=screenCapture &&
        export url="http://localhost:$PORT" &&
        shBrowserTest) &
    # test $FILE
    /bin/sh "$FILE"
    EXIT_CODE=$?
    # save screen-capture
    cp "/tmp/app/node_modules/$npm_package_name/tmp/build/"screen-capture.*.png \
        "$npm_config_dir_build" 2>/dev/null || true
    return "$EXIT_CODE"
)}

shReplClient() {(set -e
# https://gist.github.com/TooTallNate/2209310
# this function will connect the repl-client to tcp-port $1
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
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
    " $1
)}

shReturn1() {(set -e
# this function will return 1
    return 1
)}

shRun() {(set -e
# this function will run the command $@ with auto-restart
    EXIT_CODE=0
    # eval argv and auto-restart on non-zero exit-code, unless exited by SIGINT
    if [ "$npm_config_mode_auto_restart" ] && [ ! "$npm_config_mode_auto_restart_child" ]
    then
        export npm_config_mode_auto_restart_child=1
        while true
        do
            printf "(re)starting $*"
            printf "\n"
            "$@" || EXIT_CODE=$?
            printf "process exited with code $EXIT_CODE\n"
            # http://en.wikipedia.org/wiki/Unix_signal
            # if $EXIT_CODE != 77, then exit process
            if [ "$EXIT_CODE" != 77 ]
            then
                break
            fi
            # else restart process after 1 second
            sleep 1
        done
        return "$EXIT_CODE"
    # eval argv
    else
        "$@"
    fi
)}

shRunScreenCapture() {(set -e
# http://www.cnx-software.com/2011/09/22
# /how-to-convert-a-command-line-result-into-an-image-in-linux/
# this function will run the command $@ and screen-capture the output
    EXIT_CODE=0
    export MODE_BUILD_SCREEN_CAPTURE="screen-capture.${MODE_BUILD:-undefined}.svg"
    (printf "0" > "$npm_config_file_tmp" &&
        shRun "$@" 2>&1 ||
        printf $? > "$npm_config_file_tmp") | \
        tee "$npm_config_dir_tmp/screen-capture.txt"
    EXIT_CODE="$(cat "$npm_config_file_tmp")"
    # format text-output
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var local;
local = {};
local.fs = require('fs');
local.nop = function () {
    return;
};
local.wordwrap = function (line, ii) {
    if (ii && !line) {
        return '';
    }
    local.yy += 16;
    return '<tspan x=\"10\" y=\"' + local.yy + '\">' + line
        .replace((/&/g), '&amp;')
        .replace((/</g), '&lt;')
        .replace((/>/g), '&gt;') + '</tspan>\n';
};
local.yy = 10;
local.result = (local.fs
    .readFileSync('$npm_config_dir_tmp/screen-capture.txt', 'utf8')
    // remove ansi escape-code
    .replace((/\u001b.*?m/g), '')
    // format unicode
    .replace((/\\\\u[0-9a-f]{4}/g), function (match0) {
        return String.fromCharCode('0x' + match0.slice(-4));
    })
    .trimRight() + '\n')
    .replace((/(.*)\n/g), function (match0, line) {
        // jslint-hack
        local.nop(match0);
        return line
            .replace((/.{0,96}/g), local.wordwrap)
            /* jslint-ignore-next-line */
            .replace((/(<\/tspan>\n<tspan)/g), '\\\\\$1')
            .replace();
    });
local.result = '<svg height=\"' + (local.yy + 20) +
    '\" width=\"720\" xmlns=\"http://www.w3.org/2000/svg\">\n' +
    '<rect height=\"' + (local.yy + 20) + '\" fill=\"#555\" width=\"720\"></rect>\n' +
    '<text fill=\"#7f7\" font-family=\"Courier New\" font-size=\"12\" ' +
    'xml:space=\"preserve\">\n' +
    local.result + '</text>\n</svg>\n';
local.fs.writeFileSync('$npm_config_dir_build/$MODE_BUILD_SCREEN_CAPTURE', local.result);
// </script>
    "
    return "$EXIT_CODE"
)}

shServerPortRandom() {(set -e
# https://wiki.ubuntu.com/DashAsBinSh#A.24RANDOM
# this function will print a random port in the inclusive range 0x8000 to 0xffff
    if (busybox > /dev/null 2>&1)
    then
        HEXDUMP="busybox hexdump"
    else
        HEXDUMP=hexdump
    fi
    printf "$(($($HEXDUMP -n 2 -e '/2 "%u"' /dev/urandom)|32768))"
)}

shSource() {
# this function will source .bashrc
    . "$HOME/.bashrc" || return $?
}

shTestReportCreate() {(set -e
# this function will create test-report artifacts
    node -e "
// <script>
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
'use strict';
var testReport;
try {
    testReport = require('$npm_config_dir_build/test-report.json');
} catch (errorCaught) {
    testReport = { testPlatformList: [] };
}
require('$npm_config_dir_utility2/lib.utility2.js').testReportCreate(testReport);
// </script>
    "
)}

shTravisDecryptYml() {(set -e
# this function will decrypt $AES_ENCRYPTED_SH in .travis.yml to stdout
    sed -n "s/.* - AES_ENCRYPTED_SH: \(.*\) # AES_ENCRYPTED_SH\$/\\1/p" .travis.yml | \
        shAesDecrypt
)}

shTravisEncryptYml() {(set -e
# this function will travis-encrypt $FILE to $AES_ENCRYPTED_SH and embed it in .travis.yml
    shInit
    FILE="$1"
    if [ ! -f "$FILE" ]
    then
        printf "# non-existent file $FILE\n"
        return 1
    fi
    printf "# sourcing file $FILE\n"
    . "$FILE"
    if [ ! "$AES_256_KEY" ]
    then
        printf "# no \$AES_256_KEY detected in env - creating new AES_256_KEY\n"
        AES_256_KEY="$(openssl rand -hex 32)"
        printf "# created new \$AES_256_KEY for encrypting data:\n"
        printf "export AES_256_KEY=$AES_256_KEY\n\n"
    fi
    printf "# travis-encrypting \$AES_256_KEY for $GITHUB_REPO\n"
    # get public rsa key from https://api.travis-ci.org/repos/<owner>/<repo>/key
    curl -s "https://api.travis-ci.org/repos/$GITHUB_REPO/key" | \
        sed -n \
            -e "s/.*-----BEGIN [RSA ]*PUBLIC KEY-----\(.*\)-----END [RSA ]*PUBLIC KEY-----.*/\
-----BEGIN PUBLIC KEY-----\\1-----END PUBLIC KEY-----/" \
            -e "s/\\\\n/%/gp" | \
        tr "%" "\n" > \
        "$npm_config_file_tmp"
    # rsa-encrypt $AES_256_KEY
    AES_256_KEY_ENCRYPTED="$(printf "AES_256_KEY=$AES_256_KEY" | \
        openssl rsautl -encrypt -pubin -inkey "$npm_config_file_tmp" | \
        base64 | \
        tr -d "\n")"
    # return non-zero exit-code if $AES_256_KEY_ENCRYPTED is empty string
    if [ ! "$AES_256_KEY_ENCRYPTED" ]
    then
        return 1
    fi
    printf "# updating .travis.yml with encrypted key and encrypted script\n"
    sed -in \
        -e "s%\(- secure: \).*\( # AES_256_KEY$\)%\\1$AES_256_KEY_ENCRYPTED\\2%" \
-e "s%\(- AES_ENCRYPTED_SH: \).*\( # AES_ENCRYPTED_SH$\)%\\1$(shAesEncrypt < $FILE)\\2%" \
        .travis.yml
    rm -f .travis.ymln
)}

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
# this function will start xvfb
    export DISPLAY=:99.0 || return $?
    rm -f /tmp/.X99-lock || return $?
    (Xvfb "$DISPLAY" &) 2>/dev/null || true
}

shMain() {
# this function will run the main program
    local COMMAND || return $?
    if [ ! "$1" ]
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
        (shInit && "$COMMAND" "$@") || return $?
        ;;
    shRunScreenCapture)
        (shInit && "$COMMAND" "$@") || return $?
        ;;
    start)
        (shInit && export npm_config_mode_auto_restart=1 && export npm_config_mode_start=1 &&
            shRun shIstanbulCover "$npm_config_dir_utility2/test.js" "$@") || return $?
        ;;
    test)
        (shInit && shNpmTest "$@") || return $?
        ;;
    utility2Dirname)
        (shInit && printf "$npm_config_dir_utility2") || return $?
        ;;
    *)
        "$COMMAND" "$@" || return $?
        ;;
    esac
}
shMain "$@"
