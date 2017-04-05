#/bin/sh

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
    eval shUbuntuInit || return $?
    # init custom alias
    alias lld="ls -adlF" || return $?
}

shBaseInstall() {
# this function will install .bashrc, .screenrc, .vimrc, and lib.utility2.sh in $HOME,
# and is intended for aws-ec2 setup
# curl https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/lib.utility2.sh > $HOME/lib.utility2.sh && . $HOME/lib.utility2.sh && shBaseInstall
    for FILE in .screenrc .vimrc lib.utility2.sh
    do
        curl -Lfs "https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/$FILE" > \
            "$HOME/$FILE" || return $?
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

shBrowserTest() {(set -e
# this function will spawn an electron process to test the given $URL,
# and merge the test-report into the existing test-report
    export modeBrowserTest="$1"
    export url="$2"
    shInit
    export MODE_BUILD="${MODE_BUILD:-browserTest}"
    shBuildPrint "electron.${modeBrowserTest} - $url"
    # run browser-test
    "$npm_config_dir_utility2/lib.utility2.js" browserTest
    if [ "$modeBrowserTest" = test ]
    then
        # create test-report artifacts
        shTestReportCreate
    fi
)}

shBuildApidoc() {(set -e
# this function will build the apidoc
    shPasswordEnvUnset
    export MODE_BUILD=buildApidoc
    npm test --mode-coverage="" --mode-test-case=testCase_buildApidoc_default
)}

shBuildApp() {(set -e
# this function will build the app
    shPasswordEnvUnset
    export MODE_BUILD=buildApp
    shInit
    if [ "$1" ] && [ ! -f package.json ]
    then
        printf "{\"name\":\"$1\"}\n" > package.json
    fi
    shInit
    for FILE in .gitignore .travis.yml LICENSE
    do
        if [ ! -f "$FILE" ]
        then
            cp "$npm_config_dir_utility2/$FILE" "$FILE"
        fi
    done
    shFileJsonNormalize package.json "{
    \"description\": \"example module\",
    \"main\": \"lib.$npm_package_nameAlias.js\",
    \"name\": \"example\",
    \"scripts\": {
        \"test\": \
\"(set -e; export PORT=\$(utility2 shServerPortRandom); utility2 test test.js)\"
    },
    \"version\": \"0.0.1\"
}"
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
local = require('$npm_config_dir_utility2');
try {
    local.assert(local.fs.readFileSync('README.md', 'utf8'));
} catch (errorCaught) {
    local.fs.writeFileSync('README.md', local.templateRenderJslintLite(
        local.assetsDict['/assets.readme.template.md'],
        {}
    ));
}
try {
    local.assert(local.fs.readFileSync('lib.$npm_package_nameAlias.js', 'utf8'));
} catch (errorCaught) {
    local.fs.writeFileSync('lib.$npm_package_nameAlias.js', local.templateRenderJslintLite(
        local.assetsDict['/assets.lib.template.js'],
        {}
    ));
}
try {
    local.assert(local.fs.readFileSync('test.js', 'utf8'));
} catch (errorCaught) {
    local.fs.writeFileSync('test.js', local.templateRenderJslintLite(
        local.assetsDict['/assets.test.template.js'],
        {}
    ));
}
// </script>
    "
    npm test --mode-coverage="" --mode-test-case=testCase_buildApp_default
)}

shBuildCi() {(set -e
# this function will run the main build
    shInit
    # decrypt and exec encrypted data
    if [ "$CRYPTO_AES_KEY" ]
    then
        eval "$(shTravisCryptoAesDecryptYml $CRYPTO_AES_KEY $GITHUB_ORG)"
    fi
    # init git config
    if (! git config user.email > /dev/null 2>&1)
    then
        git config --global user.email nobody
        git config --global user.name nobody
    fi
    case "$CI_BRANCH" in
    alpha)
        case "$CI_COMMIT_MESSAGE_META" in
        "[npm publishAfterCommit]")
            return
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
        ;;
    docker.base)
        export CI_BRANCH=alpha
        shBuildCiInternal
        ;;
    docker.latest)
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
        (eval shNpmPublishAlias) || true
        # security - cleanup .npmrc
        rm "$HOME/.npmrc"
        shSleep 15
        shBuildCiInternal
        ;;
    task)
        case "$CI_COMMIT_MESSAGE_META" in
        \[\$\ *\])
            eval "$(printf "$CI_COMMIT_MESSAGE_META" | sed -e s/^...// -e s/.\$//)"
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
        case "$CI_COMMIT_MESSAGE_META" in
        "[npm publish]")
            shGithubPush "git@github.com:$GITHUB_REPO.git" HEAD:publish
            ;;
        "[npm publishAfterCommitAfterBuild]")
            shFilePackageJsonVersionIncrement
            printf "$(shDateIso)\n" > touch.txt
            git add .
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
        shGithubPush "git@github.com:$GITHUB_REPO.git" "$npm_package_version" || true
        ;;
    publish)
        # init .npmrc
        printf "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > "$HOME/.npmrc"
        shNpmPublishAliasList . "$npm_package_nameAliasPublish"
        shSleep 15
        shNpmTestPublishedList "$npm_package_nameAliasPublish"
        shSleep 15
        shNpmDeprecateAliasList "$npm_package_nameAliasDeprecate" \
            "this package is deprecated and superseded by \
[$npm_package_name](https://www.npmjs.com/package/$npm_package_name)"
        case "$CI_COMMIT_MESSAGE_META" in
        "[npm publishAfterCommit]")
            shGitSquashPop HEAD~1 "[ci skip] npm published"
            shGithubPush -f "git@github.com:$GITHUB_REPO.git" HEAD:alpha
            ;;
        *)
            shGithubPush "git@github.com:$GITHUB_REPO.git" HEAD:beta
            ;;
        esac
        # security - cleanup .npmrc
        rm "$HOME/.npmrc"
        ;;
    esac
)}

shBuildCiInternal() {(set -e
# this function will run the internal build
    # run pre-build
    if (type shBuildCiPre > /dev/null 2>&1)
    then
        shBuildCiPre
    fi
    export npm_config_file_test_report_merge="$npm_config_dir_build/test-report.json"
    # run npm-test
    (
    shPasswordEnvUnset
    export MODE_BUILD=npmTest
    shRunScreenCaptureTxt npm test --mode-coverage
    )
    # create apidoc
    shBuildApidoc
    if [ "$npm_package_buildNpmdoc" ]
    then
        shNpmPackageListingCreate "node_modules/$npm_package_buildNpmdoc"
        shNpmPackageDependencyTreeCreate "$npm_package_buildNpmdoc"
    else
        shNpmPackageListingCreate
        shNpmPackageDependencyTreeCreate "$npm_package_name"
    fi
    # create recent changelog of last 50 commits
    (
    export MODE_BUILD=gitLog
    shRunScreenCaptureTxt git log -50 --pretty="%ai\u000a%B"
    )
    if [ ! "$GITHUB_TOKEN" ]
    then
        return
    fi
    # run post-build
    if (type shBuildCiPost > /dev/null 2>&1)
    then
        shBuildCiPost
    fi
    # upload build-artifacts to github, and if number of commits > $COMMIT_LIMIT,
    # then squash older commits
    if [ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ]
    then
        (
        export COMMIT_LIMIT=20
        shBuildGithubUpload
        )
    fi
)}

shBuildGithubUpload() {(set -e
# this function will upload build-artifacts to github
    if [ ! "$GITHUB_TOKEN" ]
    then
        return
    fi
    export MODE_BUILD="${MODE_BUILD:-buildGithubUpload}"
    shBuildPrint "uploading build-artifacts to https://github.com/$GITHUB_REPO"
    URL="git@github.com:$GITHUB_REPO.git"
    # init /tmp/buildGithubUpload
    rm -fr /tmp/buildGithubUpload
    git clone "$URL" --single-branch -b gh-pages /tmp/buildGithubUpload
    cd /tmp/buildGithubUpload
    case "$CI_COMMIT_MESSAGE_META" in
    "[build clean]")
        shBuildPrint "[build clean]"
        rm -fr build
        ;;
    esac
    # copy build-artifacts
    cp -a "$npm_config_dir_build" .
    rm -fr "build..$CI_BRANCH..$CI_HOST"
    cp -a "$npm_config_dir_build" "build..$CI_BRANCH..$CI_HOST"
    # git add .
    git add .
    # git commit
    git commit -am "[ci skip] update gh-pages" || true
    # if number of commits > $COMMIT_LIMIT,
    # then backup current git-repo-branch to git-repo-branch.backup,
    # and then squash to $COMMIT_LIMIT/2 in git-repo-branch
    if [ "$COMMIT_LIMIT" ] && [ "$(git rev-list HEAD --count)" -gt "$COMMIT_LIMIT" ]
    then
        shGithubPush -f "$URL" HEAD:gh-pages.backup
        shGitSquashShift "$(($COMMIT_LIMIT/2))"
    fi
    shGithubPush -f "$URL" HEAD:gh-pages
)}

shBuildInsideDocker() {(set -e
# this function will run the build inside docker
    shPasswordEnvUnset
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

shBuildLib() {(set -e
# this function will build the lib
    shPasswordEnvUnset
    export MODE_BUILD=buildLib
    npm test --mode-coverage="" --mode-test-case=testCase_buildLib_default
)}

shBuildNpmdoc() {(set -e
# this function will build the npmdoc for the npm-package $NAME
    NAME="$1"
    if [ "$NAME" ]
    then
        NAME="$(printf "$NAME" | sed -e "s/^npmdoc\/node-npmdoc-//")"
        GITHUB_REPO="npmdoc/node-npmdoc-$NAME"
        # build and push initial repo to npmdoc/node-npmdoc-$NAME#alpha
        # init /tmp/$GITHUB_REPO
        if [ ! -d "/tmp/$GITHUB_REPO" ]
        then
            shGithubRepoBaseCreate "$GITHUB_REPO" "$GITHUB_ORG"
        fi
        cd "/tmp/$GITHUB_REPO"
        touch README.md
        for FILE in .gitignore .travis.yml LICENSE
        do
            if [ ! -f "$FILE" ]
            then
                curl -Lfs -O \
                    "https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/$FILE"
            fi
        done
        # init package.json
        printf "{
    \"buildNpmdoc\":\"$NAME\",
    \"devDependencies\": {
        \"$NAME\": \"*\",
        \"electron-lite\": \"kaizhu256/node-electron-lite#alpha\",
        \"utility2\": \"kaizhu256/node-utility2#alpha\"
    },
    \"name\":\"npmdoc-$NAME\",
    \"repository\": {
        \"type\": \"git\",
        \"url\": \"https://github.com/$GITHUB_REPO\"
    },
    \"scripts\": {
        \"build-ci\": \"utility2 shReadmeTest build_ci.sh\"
    },
    \"version\": \"0.0.1\"
}\n" > package.json
        # update .travis.yml
        sed -in -e s/.*CRYPTO_AES_ENCRYPTED_SH.*// .travis.yml
        rm -f .travis.ymln
        shTravisCryptoAesEncryptYml
        # git commit and push
        git add .
        git add -f .gitignore .travis.yml
        git commit -am "[npm publishAfterCommitAfterBuild]"
        shGithubPush -f "git@github.com:$GITHUB_REPO.git" alpha
        return
    fi
    shPasswordEnvUnset
    export MODE_BUILD=buildNpmdoc
    export npm_config_timeout_default=60000
    npm test --mode-coverage="" --mode-test-case=testCase_buildApidoc_default
)}

shBuildPrint() {(set -e
# this function will print debug info about the build state
    printf '%b' "\n\033[35m[MODE_BUILD=$MODE_BUILD]\033[0m - $(shDateIso) - $1\n\n" 1>&2
)}

shBuildReadme() {(set -e
# this function will build the app
    shPasswordEnvUnset
    export MODE_BUILD=buildReadme
    npm test --mode-coverage="" --mode-test-case=testCase_buildReadme_default
)}

shBuildTest() {(set -e
# this function will build the test
    shPasswordEnvUnset
    export MODE_BUILD=buildTest
    npm test --mode-coverage="" --mode-test-case=testCase_buildTest_default
)}

shCryptoAesDecrypt() {(set -e
# this function will decrypt base64-encoded stdin to stdout using aes-256-cbc
    # save stdin to $STRING
    STRING="$(cat /dev/stdin)"
    # init $IV from first 44 base64-encoded bytes of $STRING
    IV="$(printf "$STRING" | cut -c1-44 | base64 --decode)"
    # decrypt remaining base64-encoded bytes of $STRING to stdout using aes-256-cbc
    printf "$STRING" | \
        cut -c45-9999 | \
        base64 --decode | \
        openssl enc -aes-256-cbc -d -K "$CRYPTO_AES_KEY" -iv "$IV"
)}

shCryptoAesEncrypt() {(set -e
# this function will encrypt stdin to base64-encoded stdout,
# with a random iv prepended using aes-256-cbc
    # init $IV from random 16 bytes
    IV="$(openssl rand -hex 16)"
    # print base64-encoded $IV to stdout
    printf "$(printf "$IV" | base64)"
    # encrypt stdin and stream to stdout using aes-256-cbc with base64-encoding
    openssl enc -aes-256-cbc -K "$CRYPTO_AES_KEY" -iv "$IV" | base64 | tr -d "\n"
)}

shDateIso() {(set -e
# this function will print the current date in ISO format
    date -u "+%Y-%m-%dT%H:%M:%SZ"
)}

shDebugArgv() {
# this function will print $1 $2 $3 $4 in separte lines
    printf "\$1 - $1\n"
    printf "\$2 - $2\n"
    printf "\$3 - $3\n"
    printf "\$4 - $4\n"
}

shDeployGithub() {(set -e
# this function will deploy the app to $GITHUB_REPO
# and run a simple curl check for $TEST_URL
# and test $TEST_URL
    if [ ! "$GITHUB_TOKEN" ]
    then
        return
    fi
    export MODE_BUILD=deployGithub
    export TEST_URL="https://$(printf "$GITHUB_REPO" | \
        sed 's/\//.github.io\//')/build..$CI_BRANCH..travis-ci.org/app/index.html"
    shBuildPrint "deploying to $TEST_URL"
    # build app
    shBuildApp
    # upload app
    shBuildGithubUpload
    shSleep 15
    # verify deployed app's main-page returns status-code < 400
    if [ $(curl --connect-timeout 60 -Ls -o /dev/null -w "%{http_code}" "$TEST_URL") -lt 400 ]
    then
        shBuildPrint "curl test passed for $TEST_URL"
    else
        shBuildPrint "curl test failed for $TEST_URL"
        return 1
    fi
    # test deployed app
    (
    export MODE_BUILD=${MODE_BUILD}Test
    shBrowserTest test "$TEST_URL?modeTest=1&timeExit={{timeExit}}"
    )
    # screenCapture deployed app
    shBrowserTest screenCapture "$TEST_URL"
)}

shDeployHeroku() {(set -e
# this function will deploy the app to heroku
# and run a simple curl check for $TEST_URL
# and test $TEST_URL
    export npm_package_nameHeroku=\
"${npm_package_nameHeroku:-$(printf "h1-$npm_package_nameAlias" | tr "_" "-")}"
    # build app inside heroku
    if [ "$npm_lifecycle_event" = heroku-postbuild ]
    then
        shBuildApp
        cp "$npm_config_dir_build"/app/*.js .
        printf "web: npm_config_mode_backend=1 node assets.app.js\n" > Procfile
        rm -fr tmp
        return
    fi
    if [ ! "$GITHUB_TOKEN" ]
    then
        return
    fi
    export MODE_BUILD=deployHeroku
    export TEST_URL="https://$npm_package_nameHeroku-$CI_BRANCH.herokuapp.com"
    # verify deployed app's main-page returns status-code < 400
    if [ $(curl --connect-timeout 60 -Ls -o /dev/null -w "%{http_code}" "$TEST_URL") -lt 400 ]
    then
        shBuildPrint "curl test passed for $TEST_URL"
    else
        shBuildPrint "curl test failed for $TEST_URL"
        return 1
    fi
    # test deployed app
    (
    export MODE_BUILD=${MODE_BUILD}Test
    shBrowserTest test "$TEST_URL?modeTest=1&timeExit={{timeExit}}"
    )
    # screenCapture deployed app
    shBrowserTest screenCapture "$TEST_URL"
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
    IMAGE="$1"
    FILE_FROM="$2"
    FILE_TO="$3"
    # create $CONTAINER from $IMAGE
    CONTAINER="$(docker create "$IMAGE")"
    docker cp "$CONTAINER:$FILE_FROM" "$FILE_TO"
    # cleanup $CONTAINER
    docker rm -fv "$CONTAINER"
)}

shDockerInstall() {(set -e
# this function will install docker
    mkdir -p "$HOME/docker"
    curl -Lfs https://get.docker.com/ | /bin/sh
    # test docker
    docker run hello-world
)}

shDockerLogs() {(set -e
# this function log the docker container $1
    docker logs -f --tail=256 "$1"
)}

shDockerNpmRestart() {(set -e
# this function will npm-restart the app inside the docker-container $IMAGE:$NAME
    NAME="$1"
    IMAGE="$2"
    DIR="$3"
    DOCKER_PORT="$4"
    shDockerRestart $NAME $IMAGE /bin/bash -c "set -e
        curl -Lfs \
            https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/lib.utility2.sh > \
            /tmp/lib.utility2.sh
        . /tmp/lib.utility2.sh
        cd $DIR
        PORT=$DOCKER_PORT npm start
    "
)}

shDockerRestart() {(set -e
# this function will restart the docker-container
    docker rm -fv "$1" || true
    shDockerStart "$@"
)}

shDockerRestartElasticsearch() {(set -e
# https://hub.docker.com/_/elasticsearch/
# this function will restart the elasticsearch docker-container
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
    /bin/bash -c "(set -e
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
        sed -in -e 's#http://petstore.swagger.io/v2#/assets#' /swagger-ui/index.html
        rm -f /swagger-ui/index.htmln
        /elasticsearch/bin/elasticsearch -Des.http.port=9201
        sleep infinity
    )"
)}

shDockerRestartNginx() {(set -e
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
    # https://www.nginx.com/resources/wiki/start/topics/examples/full/#nginx-conf
    # init $HOME/docker/etc.nginx.conf.d.default.conf
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
# https://www.nginx.com/resources/wiki/start/topics/examples/SSL-Offloader/#sslproxy-conf
# https server
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
    docker rm -fv nginx || true
    # https://registry.hub.docker.com/_/nginx/
    docker run --name nginx -d \
        -p 80:8080 \
        -p 443:443 \
        -v "$HOME:/root:ro" \
        -v "$HOME/docker/etc.nginx.conf.d:/etc/nginx/conf.d:ro" \
        kaizhu256/node-utility2:latest \
    /bin/bash -c "(set -e
        mkdir -p /var/log/nginx
        touch /var/log/nginx/access.log
        tail -f /var/log/nginx/access.log &
        touch /var/log/nginx/error.log
        tail -f /dev/stderr /var/log/nginx/error.log &
        /etc/init.d/nginx start
        sleep infinity
    )"
)}

shDockerRestartTransmission() {(set -e
# http://transmission:transmission@127.0.0.1:9091
# this function will restart the transmission docker-container
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
    /bin/bash -c "transmission-daemon \
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

shDockerRm() {(set -e
# this function will rm the docker-containers $@
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

shDockerRmSince() {(set -e
# this function will rm all docker-containers since $NAME
    NAME="$1"
    docker rm -fv $(docker ps -aq --since="$NAME") || true
)}

shDockerRmiUntagged() {(set -e
# this function will rm all untagged docker images
    docker rmi $(docker images -aqf dangling=true) 2>/dev/null || true
)}

shDockerSh() {(set -e
# this function will run /bin/bash in the docker-container $NAME
    # http://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html
    NAME="$1"
    COMMAND="${2:-/bin/bash}"
    docker start "$NAME"
    docker exec -it "$NAME" $COMMAND
)}

shDockerStart() {(set -e
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
    docker run --name "$NAME" -dt -e debian_chroot="$NAME" \
        -v "$DOCKER_ROOT:/root" \
        $DOCKER_OPTIONS \
        "$IMAGE" "$@"
)}

shDuList() {(set -e
# this function will run du, and create a list of all child dir in $1 sorted by size
    du -md1 $1 | sort -nr
)}

shFileJsonNormalize() {(set -e
# this function will
# 1. read the json-data from $FILE
# 2. normalize the json-data
# 3. write the normalized json-data back to $FILE
    FILE="$1"
    DEFAULTS="$2"
    OVERRIDES="$3"
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
local.jsonStringifyOrdered = function (element, replacer, space) {
/*
 * this function will JSON.stringify the element,
 * with object-keys sorted and circular-references removed
 */
    var circularList, stringify, tmp;
    stringify = function (element) {
    /*
     * this function will recursively JSON.stringify the element,
     * with object-keys sorted and circular-references removed
     */
        // if element is an object, then recurse its items with object-keys sorted
        if (element &&
                typeof element === 'object' &&
                typeof element.toJSON !== 'function') {
            // ignore circular-reference
            if (circularList.indexOf(element) >= 0) {
                return;
            }
            circularList.push(element);
            // if element is an array, then recurse its elements
            if (Array.isArray(element)) {
                return '[' + element.map(function (element) {
                    // recurse
                    tmp = stringify(element);
                    return typeof tmp === 'string'
                        ? tmp
                        : 'null';
                }).join(',') + ']';
            }
            return '{' + Object.keys(element)
                // sort object-keys
                .sort()
                .map(function (key) {
                    // recurse
                    tmp = stringify(element[key]);
                    if (typeof tmp === 'string') {
                        return JSON.stringify(key) + ':' + tmp;
                    }
                })
                .filter(function (element) {
                    return typeof element === 'string';
                })
                .join(',') + '}';
        }
        // else JSON.stringify as normal
        return JSON.stringify(element);
    };
    circularList = [];
    return JSON.stringify(element && typeof element === 'object'
        // recurse
        ? JSON.parse(stringify(element))
        : element, replacer, space);
};
local.objectSetDefault = function (arg, defaults, depth) {
/*
 * this function will recursively set defaults for undefined-items in the arg
 */
    arg = arg || {};
    defaults = defaults || {};
    Object.keys(defaults).forEach(function (key) {
        var arg2, defaults2;
        arg2 = arg[key];
        // handle misbehaving getter
        try {
            defaults2 = defaults[key];
        } catch (ignore) {
        }
        if (defaults2 === undefined) {
            return;
        }
        // init arg[key] to default value defaults[key]
        if (!arg2) {
            arg[key] = defaults2;
            return;
        }
        // if arg2 and defaults2 are both non-null and non-array objects,
        // then recurse with arg2 and defaults2
        if (depth > 1 &&
                // arg2 is a non-null and non-array object
                arg2 &&
                typeof arg2 === 'object' &&
                !Array.isArray(arg2) &&
                // defaults2 is a non-null and non-array object
                defaults2 &&
                typeof defaults2 === 'object' &&
                !Array.isArray(defaults2)) {
            // recurse
            local.objectSetDefault(arg2, defaults2, depth - 1);
        }
    });
    return arg;
};
local.objectSetOverride = function (arg, overrides, depth, env) {
/*
 * this function will recursively set overrides for items in the arg
 */
    arg = arg || {};
    env = env || (typeof process === 'object' && process.env) || {};
    overrides = overrides || {};
    Object.keys(overrides).forEach(function (key) {
        var arg2, overrides2;
        arg2 = arg[key];
        overrides2 = overrides[key];
        if (overrides2 === undefined) {
            return;
        }
        // if both arg2 and overrides2 are non-null and non-array objects,
        // then recurse with arg2 and overrides2
        if (depth > 1 &&
                // arg2 is a non-null and non-array object
                (arg2 &&
                typeof arg2 === 'object' &&
                !Array.isArray(arg2)) &&
                // overrides2 is a non-null and non-array object
                (overrides2 &&
                typeof overrides2 === 'object' &&
                !Array.isArray(overrides2))) {
            local.objectSetOverride(arg2, overrides2, depth - 1, env);
            return;
        }
        // else set arg[key] with overrides[key]
        arg[key] = arg === env
            // if arg is env, then overrides falsey value with empty string
            ? overrides2 || ''
            : overrides2;
    });
    return arg;
};
local.file = process.argv[1];
local.defaults = process.argv[2];
local.overrides = process.argv[3];
local.data = {};
try {
    local.data = JSON.parse(local.fs.readFileSync(local.file, 'utf8'));
} catch (ignore) {
}
if (local.defaults) {
    local.objectSetDefault(local.data, JSON.parse(local.defaults), 10);
}
if (local.overrides) {
    local.objectSetOverride(local.data, JSON.parse(local.overrides), 10);
}
local.fs.writeFileSync(local.file, local.jsonStringifyOrdered(local.data, null, 4) + '\n');
// </script>
    " "$FILE" "$DEFAULTS" "$OVERRIDES"
)}

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
console.log('var aa = [\\n\"\",' + require('fs').readFileSync('$FILE', 'utf8')
/* jslint-ignore-begin */
    // escape backslash and double-quote
    .replace((/[\"\\\\]/g), '#')
    // remove newline
    .replace((/\\n{2,}/gm), '\\n')
    // add js
    .replace((/^ {0,8}(\\w[^\\n ]*? =(?:| .*?))$/gm), '\"\$1\",')
    // add js-env
    .replace((/^ {4}.. (.*? js-env .*?)$/gm), '\"\$1\",')
    // add sh
    .replace((/^(\\w+?\\(\\) \\{.*?)$/gm), '\"\$1\",')
    // remove non-match
    .replace((/^(?:[^\\n\"]|\"\W|\"\").*/gm), '')
    // remove newline
    .replace((/\\n{2,}/gm), '\\n') + '];\n\
aa = aa.slice(0, aa.indexOf(\"\"));\n\
var bb = aa.slice().sort();\n\
aa.forEach(function (aa, ii) {\n\
    console.log(ii, aa === bb[ii], aa, bb[ii]);\n\
});\n\
console.assert(JSON.stringify(aa) === JSON.stringify(bb));\n\
'
/* jslint-ignore-end */
    );
// </script>
    "
)}

shFilePackageJsonVersionIncrement() {(set -e
# this function will increment the package.json version before npm publish
VERSION="${VERSION:-$1}"
VERSION="${VERSION:-$(npm info "" version 2>/dev/null)}" || true
VERSION="${VERSION:-0.0.0}"
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
local.packageJson = JSON.parse(local.fs.readFileSync('package.json'));
local.versionList = [
    '$VERSION',
    local.packageJson.version
].map(function (element) {
    return element.replace((/[^.]+/g), function (element) {
        return ('          ' + element).slice(-10);
    });
});
if (local.versionList[0] < local.versionList[1]) {
    console.log(local.versionList[1].replace((/ +/g), ''));
    process.exit();
}
local.versionList[0] = local.versionList[0].split('.').map(Number);
local.versionList[0][2] += 1;
local.versionList[0] = local.versionList[0].join('.');
local.packageJson.version = local.versionList[0];
local.fs.writeFileSync('package.json', JSON.stringify(local.packageJson, null, 4) + '\n');
console.log(local.packageJson.version);
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
// </script>
    "
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
        gc
)}

shGitInfo() {(set -e
# this function will run checks before npm-publixh
    git diff HEAD
    printf "\n"
    git status
    printf "\n"
    shGitLsTree
    printf "\n"
    git grep '!\! ' || true
    printf "\n"
    git grep '#alpha' || true
    printf "\n"
    git grep '\becho\b' *.sh || true
)}

shGitLsTree() {(set -e
# this function will list all files committed in HEAD
    printf "$(git ls-tree --name-only -r HEAD)" | awk '{
    ii += 1
    file = $0
    cmd = "git log -1 --format=\"%ai\" -- " file
    (cmd | getline date)
    close(cmd)
    cmd = "ls -ln " file " | awk \"{print \\$5}\""
    (cmd | getline size)
    close(cmd)
    sizeTotal += size
    printf("%3s.  %s %8s byte  %s\n", ii, date, size, file)
} END {
    ii = 0
    file = "."
    cmd = "git log -1 --format=\"%ai\" -- " file
    (cmd | getline date)
    close(cmd)
    size = sizeTotal
    printf("%3s.  %s %8s byte  %s\n", ii, date, size, file)
    }'
)}

shGitRemotePromote() {(set -e
# this function will clone and promote the remote git $REPO#$BRANCH1 -> $BRANCH2
    export MODE_BUILD="${MODE_BUILD:-shGitRemotePromote}"
    REPO="$1"
    BRANCH1="$2"
    BRANCH2="$3"
    # init /tmp/gitRemotePromote
    rm -fr /tmp/gitRemotePromote
    git clone --branch="$BRANCH1" --single-branch "$REPO" /tmp/gitRemotePromote
    cd /tmp/gitRemotePromote
    shGithubPush -f "$REPO" "$BRANCH1":"$BRANCH2"
)}

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

shGithubPush() {(set -e
    # this function will push to github using $GITHUB_TOKEN
    # http://stackoverflow.com/questions/18027115/committing-via-travis-ci-failing
    EXIT_CODE=0
    export MODE_BUILD="${MODE_BUILD:-shGithubPush}"
    #!! if [ "$GITHUB_TOKEN" ] && [ ! "$GIT_SSH" ]
    #!! then
        #!! # init github-authentication
        #!! git config credential.helper "store --file=.git/tmp"
        #!! printf "https://nobody:$GITHUB_TOKEN@github.com\n" > .git/tmp
    #!! fi
    shBuildPrint "git push $*"
    git push "$@" || EXIT_CODE=$?
    # security - cleanup github-authentication
    rm -f .git/tmp
    return "$EXIT_CODE"
)}

shGithubRepoBaseCreate() {(set -e
# this function will create the base github-repo https://github.com/$GITHUB_REPO
    if [ ! "$GITHUB_TOKEN" ]
    then
        return
    fi
    GITHUB_REPO="$1"
    GITHUB_ORG="$2"
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
    shGithubRepoListCreate "$GITHUB_REPO" "$GITHUB_ORG"
    # set default-branch to alpha
    shGithubPush "git@github.com:$GITHUB_REPO.git" alpha || true
    # push all branches
    shGithubPush --all "git@github.com:$GITHUB_REPO.git" || true
)}

shGithubRepoListCreate() {(set -e
# this function will create the $GITHUB_REPO in $LIST with $GITHUB_TOKEN
    LIST="$1"
    GITHUB_ORG="$2"
    export MODE_BUILD="${MODE_BUILD:-shGithubRepoListCreate}"
    URL=https://api.github.com/user/repos
    # init github $GITHUB_ORG url
    if [ "$GITHUB_ORG" ]
    then
        URL="https://api.github.com/orgs/$GITHUB_ORG/repos"
    fi
    LIST2=""
    for GITHUB_REPO in $LIST
    do
        NAME="$(printf "$GITHUB_REPO" | sed -e s/.*\\///)"
        LIST2="$LIST2
if (! curl -ILfs -o /dev/null https://github.com/$GITHUB_REPO); \
then printf 'creating github-repo $GITHUB_REPO\n' 1>&2; \
curl -#Lf -H 'Authorization: token $GITHUB_TOKEN' -X POST -d '{\"name\":\"$NAME\"}' \
-o /dev/null $URL; fi"
    done
    shOnParallelListSpawn "$LIST2"
)}

shGithubRepoListTouch() {(set -e
# this function will touch the $GITHUB_REPO $LIST with the $CI_COMMIT_MESSAGE
    LIST="$1"
    CI_COMMIT_MESSAGE="$2"
    LIST2=""
    for GITHUB_REPO in $LIST
    do
        LIST2="$LIST2 https://github.com/$GITHUB_REPO/blob/alpha/package.json"
    done
    utility2-github-crud touchList "$LIST2" "$CI_COMMIT_MESSAGE"
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
tmp\\|\
vendor\\)\\(\\b\\|[_s]\\)\
"
    find "$DIR" -type f | \
        grep -v "$FILE_FILTER" | \
        tr "\n" "\000" | \
        xargs -0 grep -HIine "$REGEXP" || true
)}

shGrepFileReplace() {(set -e
# this function will save the grep-and-replace lines in $FILE
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
var local;
local = {};
local.fileDict = {};
local.fs = require('fs');
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

shHtpasswdCreate() {(set -e
# this function will create and print htpasswd to stdout
    USERNAME="$1"
    PASSWD="$2"
    printf "$USERNAME:$(openssl passwd -apr1 "$PASSWD")\n"
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

shImageToDataUri() {(set -e
# this function convert the image $1 to a data-uri string
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
console.log('data:image/' +
    require('path').extname('$1').slice(1) +
    ';base64,' +
    require('fs').readFileSync('$1').toString('base64'));
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
        # init default env
        else
            export CI_BRANCH="${CI_BRANCH:-alpha}" || return $?
            export CI_COMMIT_ID="$(git rev-parse --verify HEAD)" || return $?
            export CI_HOST=127.0.0.1 || return $?
        fi
        # save $CI_BRANCH
        export CI_BRANCH_OLD="${CI_BRANCH_OLD:-$CI_BRANCH}" || return $?
        # init $CI_COMMIT_*
        export CI_COMMIT_MESSAGE="$(git log -1 --pretty=%s)" || return $?
        export CI_COMMIT_INFO="$CI_COMMIT_ID - $CI_COMMIT_MESSAGE" || return $?
        export CI_COMMIT_MESSAGE_META="$(printf "#$CI_COMMIT_MESSAGE" | \
            sed -e "s/.*\(\[.*\]\).*/\1/")" || return $?
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
    if (typeof value === 'string' && !(/[\n\"\$]/).test(value)) {
        process.stdout.write('export npm_package_' + key.replace((/\W/g), '_') + '=' +
            JSON.stringify(value) + ';');
    }
});
value = String((dict.repository && dict.repository.url) || dict.repository || '')
    .split(':').slice(-1)[0].toString()
    .split('/')
    .slice(-2)
    .join('/')
    .replace((/\.git\$/), '');
if (!process.env.GITHUB_REPO && (/^[^\/]+\/[^\/]+\$/).test(value)) {
    process.stdout.write('export GITHUB_REPO=' + JSON.stringify(value) + ';');
}
if (!process.env.GITHUB_ORG && (/^[^\/]+\/[^\/]+\$/).test(value)) {
    process.stdout.write('export GITHUB_ORG=' + JSON.stringify(value.split('/')[0]) + ';');
}
// </script>
        ") || return $?
    else
        export npm_package_name=example || return $?
        export npm_package_version=0.0.1 || return $?
    fi
    export npm_package_nameAlias=\
"${npm_package_nameAlias:-$(printf "$npm_package_name" | sed -e s/-/_/g)}" || return $?
    # init $npm_config_*
    export npm_config_dir_build="${npm_config_dir_build:-$PWD/tmp/build}" || return $?
    mkdir -p "$npm_config_dir_build"
    export npm_config_dir_tmp="$PWD/tmp" || return $?
    mkdir -p "$npm_config_dir_tmp"
    export npm_config_file_tmp="${npm_config_file_tmp:-$PWD/tmp/tmpfile}" || return $?
    # init $npm_config_dir_build dir
    mkdir -p "$npm_config_dir_build/coverage.html"
    # init $npm_config_dir_utility2
    shInitNpmConfigDirUtility2 || return $?
    # init $GIT_SSH
    if [ "$GIT_SSH_KEY" ]
    then
        export GIT_SSH="$npm_config_dir_utility2/git_ssh.sh" || return $?
    fi
    # init $PATH
    export PATH="$PWD/node_modules/.bin:$PATH" || return $?
    # extract and save the scripts embedded in README.md to tmp/
    if [ -f README.md ] && [ "$npm_package_readmeParse" ]
    then
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
local.readme.replace((
    /\`\`\`\\w*?(\n[\\W\\s]*?(\w\S*?)[\n\"][\\S\\s]+?)\n\`\`\`/g
), function (match0, match1, match2, ii, text) {
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
    local.fs.writeFileSync('tmp/README.' + match2, match1);
});
// </script>
        "
    fi
}

shInitNpmConfigDirUtility2() {
# this function will init $npm_config_dir_utility2
    local DIR SOURCE || return $?
    if [ "$npm_config_dir_utility2" ]
    then
        return
    fi
    # init $npm_config_dir_utility2
    if [ -f lib.utility2.js ]
    then
        export npm_config_dir_utility2="$PWD" || return $?
    else
        export npm_config_dir_utility2="$(shModuleDirname utility2)" || return $?
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
# this function will run the command $@ with istanbul-coverage
    export NODE_BINARY="${NODE_BINARY:-node}"
    if [ ! "$npm_config_mode_coverage" ]
    then
        "$NODE_BINARY" "$@"
        return
    fi
    "$NODE_BINARY" "$npm_config_dir_utility2/lib.istanbul.js" cover "$@"
)}

shKillallElectron() {(set -e
# this function will killall electron
    killall Electron electron
)}

shListUnflattenAndApply() {(set -e
# this function will unflatten the list and apply it to $@
    LIST="$1"
    shift
    GROUP="$1"
    shift
    COMMAND="$1"
    shift
    LIST2=""
    II=0
    for ELEMENT in $LIST
    do
        if [ "$LIST2" ]
        then
            LIST2="$LIST2 $ELEMENT"
        else
            LIST2="$ELEMENT"
        fi
        II="$((II+1))"
        if [ "$II" -ge "$GROUP" ]
        then
            "$COMMAND" "$LIST2" "$@"
            II=0
            LIST2=""
        fi
    done
    if [ "$LIST2" ]
    then
        "$COMMAND" "$LIST2" "$@"
    fi
)}

shMain() {
# this function will run the main program
    export UTILITY2_DEPENDENTS="apidoc-lite
        db-lite
        electron-lite
        istanbul-lite
        jslint-lite
        swagger-ui-lite
        swgg
        uglifyjs-lite
        utility2"
(set -e
    if [ ! "$1" ]
    then
        return
    fi
    COMMAND="$1"
    shift
    if [ "$COMMAND" = --eval ] ||
        [ "$COMMAND" = --interactive ] ||
        [ "$COMMAND" = -e ] ||
        [ "$COMMAND" = -i ] ||
        [ "$COMMAND" = ajax ] ||
        [ "$COMMAND" = browserTest ] ||
        [ "$COMMAND" = dbTableTravisRepoCrudGetManyByQuery ] ||
        [ "$COMMAND" = dbTableTravisRepoUpdate ] ||
        [ "$COMMAND" = onParallelListSpawn ]
    then
        shInitNpmConfigDirUtility2
        "$npm_config_dir_utility2/lib.utility2.js" "$COMMAND" "$@"
        return
    fi
    case "$COMMAND" in
    source)
        shInitNpmConfigDirUtility2
        printf ". $npm_config_dir_utility2/lib.utility2.sh\n"
        ;;
    start)
        if [ ! "$1" ]
        then
            MODE_START=1
        fi
        shInitNpmConfigDirUtility2
        FILE="${1:-"$npm_config_dir_utility2/test.js"}"
        shift || true
        export npm_config_mode_auto_restart=1
        export npm_config_mode_start="$MODE_START"
        shInit
        shRun shIstanbulCover "$FILE" "$@"
        ;;
    test)
        shInit
        shNpmTest "$@"
        ;;
    utility2Dirname)
        shInitNpmConfigDirUtility2
        printf "$npm_config_dir_utility2\n"
        ;;
    *)
        shInit
        "$COMMAND" "$@"
        ;;
    esac
)}

shModuleDirname() {(set -e
# this function will print the __dirname of the $MODULE
    MODULE="$1"
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
local.moduleDirname = function (module, modulePathList) {
/*
 * this function will search modulePathList for the module's __dirname
 */
    var result, tmp;
    // search process.cwd()
    if (!module || module === '.' || module.indexOf('/') >= 0) {
        return require('path').resolve(process.cwd(), module || '');
    }
    // search builtin
    if (Object.keys(process.binding('natives')).indexOf(module) >= 0) {
        return module;
    }
    // search modulePathList
    [
        ['node_modules'],
        modulePathList,
        require('module').globalPaths
    ].some(function (modulePathList) {
        modulePathList.some(function (modulePath) {
            try {
                tmp = require('path').resolve(
                    process.cwd(),
                    modulePath + '/' + module
                );
                result = require('fs').statSync(tmp).isDirectory() && tmp;
                return result;
            } catch (ignore) {
            }
        });
        return result;
    });
    return result || '';
};
console.log(local.moduleDirname('$MODULE', module.paths));
// </script>
    "
)}

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

shNpmDeprecateAlias() {(set -e
# this function will deprecate the npm package $NAME with the given $MESSAGE
    shPasswordEnvUnset
    NAME="$1"
    MESSAGE="$2"
    export MODE_BUILD=npmDeprecate
    shBuildPrint "npm-deprecate $NAME"
    # init /tmp/npmDeprecate
    rm -fr /tmp/npmDeprecate
    mkdir -p /tmp/npmDeprecate
    cd /tmp/npmDeprecate
    npm install "$NAME"
    cd "node_modules/$NAME"
    # update README.md
    printf "$MESSAGE\n" > README.md
    # update package.json
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
local.packageJson = JSON.parse(local.fs.readFileSync('package.json'));
local.packageJson.description = '$MESSAGE';
Object.keys(local.packageJson).forEach(function (key) {
    if (key[0] === '_') {
        delete local.packageJson[key];
    }
});
local.fs.writeFileSync('package.json', JSON.stringify(local.packageJson, null, 4) + '\n');
// </script>
    "
    shFilePackageJsonVersionIncrement
    npm publish
    npm deprecate "$NAME" "$MESSAGE"
)}

shNpmDeprecateAliasList() {(set -e
# this function will deprecate the npm $LIST of packages with the given $MESSAGE
    LIST="$1"
    MESSAGE="$2"
    if [ ! "$LIST" ]
    then
        return
    fi
    for NAME in $LIST
    do
        shNpmDeprecateAlias "$NAME" "$MESSAGE"
    done
)}

shNpmInstallWithPeerDependencies() {(set -e
# this function will run npm-install $@ with peer-dependencies auto-installed
    shPasswordEnvUnset
    npm install "$@" | tee /tmp/npmInstallWithPeerDependencies
    eval "$(node -e "
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
local.dict = {};
local.file = '/tmp/npmInstallWithPeerDependencies';
local.fs = require('fs');
local.nop = function () {
    return;
};
local.rgx = (/ UNMET PEER DEPENDENCY (\S+)/g);
local.fs.readFileSync(local.file, 'utf8').replace(local.rgx, function (match0, match1) {
    // jslint-hack
    local.nop(match0);
    match1 = match1.split('@');
    local.dict[match1[0]] = local.dict[match1[0]] || (match1[1] || '').trim();
});
Object.keys(local.dict).forEach(function (key) {
    console.error('npm install ' + key + '@' + local.dict[key]);
    console.log('npm install ' + key + '@' + local.dict[key]);
});
console.log('true');
// </script>
    ")"
    npm install "$@"
)}

shNpmNameListGetFromUrl() {(set -e
# this function will scrape the $URL for the list of npm-package-names
    URL="$1"
    FILE=/tmp/shNpmNameListGetFromUrl.html
    curl -Lfs -o "$FILE" "$URL"
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
local.dict = {};
local.file = process.argv[1];
local.fs = require('fs');
local.nop = function () {
    return;
};
local.rgx = (/href=\"\/package\/(.*?)\"/g);
local.fs.readFileSync(local.file, 'utf8').replace(local.rgx, function (match0, match1) {
    // jslint-hack
    local.nop(match0);
    local.dict[match1] = true;
});
console.log(Object.keys(local.dict).join('\n'));
// </script>
    " "$FILE"
)}

shNpmNameNormalize() {(set -e
# this function will normalize the npm $NAME
    NAME="$1"
    printf "$NAME" | awk '{
    if (length($0) >= 64 ||
            /[^\-.0-9A-Z_a-z]|(^([^a-z]|npmclassic|npmdoc|npmstable|npmtest))/) {
        exit
    } else {
        print tolower($0)
    }
}'
)}

shNpmPackageDependencyTreeCreate() {(set -e
# this function will create a svg dependency-tree of the npm-package
    shPasswordEnvUnset
    # init /tmp/node_modules
    rm -fr /tmp/node_modules
    cd /tmp
    npm install "kaizhu256/node-electron-lite#alpha" "kaizhu256/node-utility2#alpha"
    # init /tmp/app
    rm -fr /tmp/app
    mkdir -p /tmp/app
    cd /tmp/app
    shInit
    export MODE_BUILD=npmPackageDependencyTree
    shRunScreenCaptureTxtPost() {(set -e
        grep -e '^ *[│└├]' "$npm_config_dir_tmp/runScreenCapture.txt" > "$npm_config_file_tmp"
        mv "$npm_config_file_tmp" "$npm_config_dir_tmp/runScreenCapture.txt"
    )}
    shRunScreenCaptureTxt npm install "$1"
)}

shNpmPackageListingCreate() {(set -e
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
        git commit -m 'initial commit'
    fi
    shInit
    export MODE_BUILD=npmPackageListing
    shRunScreenCaptureTxtPost() {(set -e
        awk '{
lineList[NR] = $0
} END {
    print lineList[NR]
    for (ii = 1; ii < NR; ii += 1) {
        print lineList[ii]
    }
        }' "$npm_config_dir_tmp/runScreenCapture.txt" > "$npm_config_file_tmp"
        mv "$npm_config_file_tmp" "$npm_config_dir_tmp/runScreenCapture.txt"
    )}
    shRunScreenCaptureTxt shGitLsTree
)}

shNpmPublish() {(set -e
# this function will npm-publish the $DIR as $NAME@$VERSION with a clean repo
    cd "$1"
    # init git
    if [ ! -d .git ]
    then
        git init
        git add .
        git rm --cached node_modules > /dev/null 2>&1 || true
        git commit -am "npm publish" > /dev/null 2>&1 || true
    fi
    shInit
    shGitInfo
    read -p "npm publish? [y/n]: " INPUT
    case "$INPUT" in
    y)
        ;;
    *)
        printf "canceled\n"
        exit
        ;;
    esac
    shNpmPublishAlias "$@"
)}

shNpmPublishAlias() {(set -e
# this function will npm-publish the $DIR as $NAME@$VERSION with a clean repo
    DIR="$1"
    NAME="$2"
    VERSION="$3"
    export MODE_BUILD=npmPublishAlias
    shBuildPrint "npm-publish alias $NAME"
    cd "$DIR"
    shInit
    # init /tmp/npmPublishAlias
    rm -fr /tmp/npmPublishAlias
    mkdir -p /tmp/npmPublishAlias
    # clean-copy git $DIR to /tmp/npmPublishAlias
    git ls-tree --name-only -r HEAD | \
        xargs tar -czf - | \
        tar -C /tmp/npmPublishAlias -xvzf -
    cd /tmp/npmPublishAlias
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
local.packageJson = JSON.parse(local.fs.readFileSync('package.json'));
// jslint-hack
local.name = '$NAME';
local.version = '$VERSION';
local.packageJson.nameOriginal = local.packageJson.name;
local.packageJson.name = local.name || local.packageJson.name;
local.packageJson.version = local.version || local.packageJson.version;
local.fs.writeFileSync('package.json', JSON.stringify(local.packageJson, null, 4) + '\n');
// </script>
    "
    npm publish
)}

shNpmPublishAliasList() {(set -e
# this function will npm-publish the $DIR as $LIST@$VERSION with a clean repo
    DIR="$1"
    LIST="$2"
    VERSION="$3"
    if [ ! "$LIST" ]
    then
        return
    fi
    for NAME in $LIST
    do
        (eval shNpmPublishAlias "$DIR" "$NAME" "$VERSION") || true
    done
)}

shNpmTest() {(set -e
# this function will run npm-test with coverage and create test-report
    EXIT_CODE=0
    export MODE_BUILD="${MODE_BUILD:-npmTest}"
    export NODE_BINARY="${NODE_BINARY:-node}"
    shBuildPrint "npm-testing $PWD"
    # cleanup tmp/*.json
    rm -f tmp/*.json
    # cleanup old electron pages
    rm -f tmp/electron.*
    # init npm-test-mode
    export NODE_ENV="${NODE_ENV:-test}"
    export npm_config_mode_test=1
    # run npm-test without coverage
    if [ ! "$npm_config_mode_coverage" ]
    then
        (eval "$NODE_BINARY" "$@") || EXIT_CODE=$?
    # run npm-test with coverage
    else
        # cleanup old coverage
        rm -f "$npm_config_dir_build/coverage.html/"coverage.*.json
        # run npm-test with coverage
        (eval shIstanbulCover "$@") || EXIT_CODE=$?
        # if $EXIT_CODE != 0, then debug covered-test by re-running it uncovered
        if [ "$EXIT_CODE" != 0 ] && [ "$EXIT_CODE" != 130 ]
        then
            npm_config_mode_coverage="" "$NODE_BINARY" "$@" || true
        fi
    fi
    # create test-report artifacts
    (eval shTestReportCreate) || EXIT_CODE=$?
    shBuildPrint "EXIT_CODE - $EXIT_CODE"
    (eval shKillallElectron 2>/dev/null) || true
    return "$EXIT_CODE"
)}

shNpmTestPublished() {(set -e
# this function will run npm-test on the published npm-package $npm_package_name
    shPasswordEnvUnset
    shInit
    if [ "$1" ]
    then
        export npm_package_name="$1"
    fi
    export MODE_BUILD=npmTestPublished
    shBuildPrint "npm-testing published-package $npm_package_name"
    # init /tmp/app
    rm -fr /tmp/app
    mkdir -p /tmp/app
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
)}

shNpmTestPublishedList() {(set -e
# this function will run npm-test on the published npm-package $LIST
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

shNpmdocRepoListCreate() {(set -e
# https://docs.travis-ci.com/api
# this function will create and push the npmdoc-repo npmdoc/node-npmdoc-$LIST[ii]
    export MODE_BUILD=shNpmdocRepoListCreate
    sleep 1
    # init npmdoc-env
    cd /tmp
    export GITHUB_ORG=npmdoc
    if [ "$CRYPTO_AES_KEY_npmdoc" ]
    then
        export CRYPTO_AES_KEY="$CRYPTO_AES_KEY_npmdoc"
        eval "$(shTravisCryptoAesDecryptYml $CRYPTO_AES_KEY_npmdoc $GITHUB_ORG)"
    fi
    LIST="$1"
    # get $LIST of $NAME from $URL
    if (printf "$LIST" | grep -qe "^https://")
    then
        LIST="$(shNpmNameListGetFromUrl "$LIST")"
    fi
    shBuildPrint "filtering npmdoc-repos $LIST"
    LIST="$(printf "$LIST" | sed -e "s/npmdoc\/node-npmdoc-//g")"
    LIST2=""
    for NAME in $LIST
    do
        NAME="$(shNpmNameNormalize $NAME)"
        if [ "$NAME" ]
        then
            LIST2="$LIST2 npmdoc/node-npmdoc-$NAME"
        fi
    done
    LIST="$LIST2"
    LIST="$(shTravisRepoListFilterForNonActive "$LIST")"
    if [ ! "$LIST" ]
    then
        return
    fi
    # init travis-repos
    shTravisRepoListCreate "$LIST" npmdoc
    shBuildPrint "creating npmdoc-repos $LIST ..."
    shSleep 30
    LIST2=""
    for GITHUB_REPO in $LIST
    do
        LIST2="$LIST2
shBuildNpmdoc $GITHUB_REPO"
    done
    shOnParallelListSpawn "$LIST2"
    shBuildPrint "... created npmdoc-repos $LIST"
)}

shOnParallelListSpawn() {(set -e
# this function will async-run the newline-separated tasks in $LIST with the given $RATE_LIMIT
    LIST="$1"
    RATE_LIMIT="$2"
    shInitNpmConfigDirUtility2
    "$npm_config_dir_utility2/lib.utility2.js" onParallelListSpawn "$LIST" "$RATE_LIMIT"
)}

shPasswordEnvUnset() {
# this function will unset the password-env, e.g.
# (export CRYPTO_AES_KEY=abcd1234; shPasswordEnvUnset; printf "$CRYPTO_AES_KEY\n")
# undefined
    eval "$(node -e "
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
local.envKeyIsSensitive = function (key) {
/*
 * this function will try to determine if the env-key is sensitive
 */
    return (/(?:\b|_)(?:decrypt|key|pass|private|secret|token)/)
        .test(key.toLowerCase()) ||
        (/Decrypt|Key|Pass|Private|Secret|Token/).test(key);
};
console.log(Object.keys(process.env).sort().map(function (key) {
    return local.envKeyIsSensitive(key)
        ? 'unset ' + key + '; '
        : '';
}).join('').trim());
// </script>
    ")" || return $?
}

shPasswordRandom() {(set -e
# this function will create a random password
    openssl rand -base64 32
)}

shReadmeBuildLinkVerify() {(set -e
# this function will verify the build-links embedded in README.md
    shInit
    find "$npm_config_dir_build" | sort
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
local.file = 'README.md';
local.fs = require('fs');
local.nop = function () {
    return;
};
local.rgx = new RegExp(
    '$GITHUB_REPO'.replace('/', '.github.io\\\\/') + '\\\\/build\\\\b.*?\\\\/(.*?)[)\\\\]]',
    'g'
);
local.fs.readFileSync(local.file, 'utf8').replace(local.rgx, function (match0, match1) {
    if (!local.fs.existsSync('$npm_config_dir_build/' + match1)) {
        throw new Error('shReadmeBuildLinkVerify - invalid link - https://' + match0);
    }
});
// </script>
    "
)}

shReadmeTest() {(set -e
# this function will extract, save, and test the script $FILE embedded in README.md
    shInit
    if [ "$npm_package_buildNpmdoc" ]
    then
        if [ ! -f test.js ]
        then
            shBuildApp
        fi
        shNpmInstallWithPeerDependencies "$npm_package_buildNpmdoc"
        shBuildNpmdoc
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
        export MODE_BUILD=build
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
        # init /tmp/app
        rm -fr /tmp/app
        mkdir -p /tmp/app
        # cp script from README.md
        shFileTrimLeft "tmp/README.$FILE"
        cp "tmp/README.$FILE" "/tmp/app/$FILE"
        cp "tmp/README.$FILE" "$npm_config_dir_build/$FILE"
        cd /tmp/app
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
var local;
local = {};
local.file = '$FILE';
local.fs = require('fs');
local.nop = function () {
    return;
};
local.rgx = (/\n *\\$ (.*)/);
local.fs.readFileSync(local.file, 'utf8').replace(local.rgx, function (match0, match1) {
    // jslint-hack
    local.nop(match0);
    console.log(match1);
});
// </script>
        ")"
    fi
    if [ "$FILE" = tmp/README.build_ci.sh ] || [ "$FILE" = example.sh ]
    then
        # display shell script
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
    fi
    export PORT=8081
    export npm_config_timeout_exit=30000
    # screenCapture server
    (
    shBuildPrint "screenCapture http://127.0.0.1:$PORT"
    shSleep 20
    shBrowserTest screenCapture "http://127.0.0.1:$PORT"
    ) &
    case "$FILE" in
    example.js)
        printf "$SCRIPT\n\n"
        shRunScreenCaptureTxt eval "$SCRIPT"
        ;;
    example.sh)
        shRunScreenCaptureTxt /bin/sh "$FILE"
        ;;
    tmp/README.build_ci.sh)
        /bin/sh "$FILE"
        ;;
    esac
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

shRmDsStore() {(set -e
# http://stackoverflow.com/questions/2016844/bash-recursively-remove-files
# this function will recursively rm .DS_Store from the current dir
    find . -name "._*" -print0 | xargs -0 rm || true
    find . -name ".DS_Store" -print0 | xargs -0 rm || true
    find . -name "npm-debug.log" -print0 | xargs -0 rm || true
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
            printf "(re)starting $*\n"
            (eval "$@") || EXIT_CODE=$?
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
        printf "EXIT_CODE - $EXIT_CODE\n"
        return "$EXIT_CODE"
    # eval argv
    else
        "$@"
    fi
)}

shRunScreenCaptureTxt() {(set -e
# http://www.cnx-software.com/2011/09/22
# /how-to-convert-a-command-line-result-into-an-image-in-linux/
# this function will run the command $@ and screenCapture the output
    EXIT_CODE=0
    export MODE_BUILD_SCREEN_CAPTURE="screenCapture.${MODE_BUILD:-undefined}.svg"
    (
    printf "0" > "$npm_config_file_tmp"
    (eval shRun "$@" 2>&1)
    printf $? > "$npm_config_file_tmp"
    ) | tee "$npm_config_dir_tmp/runScreenCapture.txt"
    EXIT_CODE="$(cat "$npm_config_file_tmp")"
    shBuildPrint "EXIT_CODE - $EXIT_CODE"
    if [ "$EXIT_CODE" != 0 ]
    then
        return "$EXIT_CODE"
    fi
    # run shRunScreenCaptureTxtPost
    if (type shRunScreenCaptureTxtPost > /dev/null 2>&1)
    then
        shRunScreenCaptureTxtPost
        unset shRunScreenCaptureTxtPost
    fi
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
    .readFileSync('$npm_config_dir_tmp/runScreenCapture.txt', 'utf8')
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
    shBuildPrint "create file://$npm_config_dir_build/$MODE_BUILD_SCREEN_CAPTURE"
)}

shServerPortRandom() {(set -e
# https://wiki.ubuntu.com/DashAsBinSh#A.24RANDOM
# this function will print a random port in the inclusive range 0x8000 to 0xffff
    if (node --version > /dev/null 2>&1)
    then
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
console.log(String(Math.random() * 0x10000 | 0x8000));
// </script>
        "
        return
    elif (busybox > /dev/null 2>&1)
    then
        HEXDUMP="busybox hexdump"
    else
        HEXDUMP=hexdump
    fi
    printf "$(($($HEXDUMP -n 2 -e '/2 "%u"' /dev/urandom)|32768))\n"
)}

shSleep() {(set -e
# this function will sleep $1
    shBuildPrint "sleep $1 ..."
    sleep "$1"
)}

shSource() {
# this function will source .bashrc
    . "$HOME/.bashrc"
}

shSshReverseTunnel() {
# this function will ssh $@ with reverse-tunneling
    ssh -R 2022:127.0.0.1:22 \
        -R 3022:127.0.0.1:2022 \
        "$@" || return $?
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
require('$npm_config_dir_utility2').testReportCreate(testReport);
// </script>
    "
)}

shTravisCryptoAesDecryptYml() {(set -e
# this function will decrypt $CRYPTO_AES_ENCRYPTED_SH in .travis.yml to stdout
    CRYPTO_AES_KEY="${1:-$CRYPTO_AES_KEY}"
    GITHUB_ORG="$2"
    if [ "$GITHUB_ORG" ]
    then
        CRYPTO_AES_ENCRYPTED_SH="$(curl -Lfs \
            https://kaizhu256.github.io/node-utility2/CRYPTO_AES_ENCRYPTED_SH_$GITHUB_ORG)"
    else
        CRYPTO_AES_ENCRYPTED_SH="$(sed -n \
            "s/.* - CRYPTO_AES_ENCRYPTED_SH: \(.*\) # CRYPTO_AES_ENCRYPTED_SH\$/\\1/p" \
            .travis.yml)"
    fi
    printf "$CRYPTO_AES_ENCRYPTED_SH" | shCryptoAesDecrypt
)}

shTravisCryptoAesEncryptYml() {(set -e
# this function will encrypt $FILE to $CRYPTO_AES_ENCRYPTED_SH and embed it in .travis.yml
    shInit
    export MODE_BUILD="${MODE_BUILD:-shTravisCryptoAesEncryptYml}"
    FILE="$1"
    if [ -f "$FILE" ]
    then
        printf "# sourcing file $FILE\n"
        . "$FILE"
    fi
    if [ ! "$CRYPTO_AES_KEY" ]
    then
        printf "# no \$CRYPTO_AES_KEY detected in env - creating new CRYPTO_AES_KEY\n"
        CRYPTO_AES_KEY="$(openssl rand -hex 32)"
        printf "# created new \$CRYPTO_AES_KEY for encrypting data:\n"
        printf "export CRYPTO_AES_KEY=$CRYPTO_AES_KEY\n\n"
    fi
    printf "# travis-encrypting \$CRYPTO_AES_KEY for $GITHUB_REPO\n"
    # get public rsa key from https://api.travis-ci.org/repos/<owner>/<repo>/key
    curl -Lfs "https://api.travis-ci.org/repos/$GITHUB_REPO/key" | \
        sed -n \
            -e "s/.*-----BEGIN [RSA ]*PUBLIC KEY-----\(.*\)-----END [RSA ]*PUBLIC KEY-----.*/\
-----BEGIN PUBLIC KEY-----\\1-----END PUBLIC KEY-----/" \
            -e "s/\\\\n/%/gp" | \
        tr "%" "\n" > \
        "$npm_config_file_tmp"
    # rsa-encrypt $CRYPTO_AES_KEY
    CRYPTO_AES_KEY_ENCRYPTED="$(printf "CRYPTO_AES_KEY=$CRYPTO_AES_KEY" | \
        openssl rsautl -encrypt -pubin -inkey "$npm_config_file_tmp" | \
        base64 | \
        tr -d "\n")"
    # assert $CRYPTO_AES_KEY_ENCRYPTED is non-empty string
    if [ ! "$CRYPTO_AES_KEY_ENCRYPTED" ]
    then
        return 1
    fi
    printf "# updating .travis.yml with encrypted key and encrypted script\n"
    sed -in \
        -e "s%\(- secure: \).*\( # CRYPTO_AES_KEY$\)%\\1$CRYPTO_AES_KEY_ENCRYPTED\\2%" \
        .travis.yml
    if [ -f "$FILE" ]
    then
        sed -in -e \
"s%\(- CRYPTO_AES_ENCRYPTED_SH: \).*\( # CRYPTO_AES_ENCRYPTED_SH$\)%\\1$(shCryptoAesEncrypt < $FILE)\\2%" \
            .travis.yml
    fi
    rm -f .travis.ymln
)}

shTravisRepoIdGet() {(set -e
# this function will get the $TRAVIS_REPO_ID from $GITHUB_REPO
    GITHUB_REPO="$1"
    node -e "console.log(
        $(curl -Lfs https://api.travis-ci.org/repos/$GITHUB_REPO).id || process.exit(1)
    )" 2>/dev/null
)}

shTravisRepoListCreate() {(set -e
# https://docs.travis-ci.com/api
# this function will create the travis-repo $LIST[ii]
    export MODE_BUILD="${MODE_BUILD:-shTravisRepoListCreate}"
    LIST="$1"
    GITHUB_ORG="$2"
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
shGithubRepoBaseCreate $GITHUB_REPO $GITHUB_ORG"
    done
    shOnParallelListSpawn "$LIST2"
    shBuildPrint "... created github-repos $LIST"
    shBuildPrint "syncing travis ..."
    shSleep 30
    curl -H "Authorization: token $TRAVIS_ACCESS_TOKEN" -#Lf -X POST \
        "https://api.travis-ci.org/users/sync" || true
    shBuildPrint "... synced travis"
    shBuildPrint "creating travis-repos $LIST ..."
    shSleep 30
    # filter-for existing travis-repos
    LIST2=""
    for GITHUB_REPO in $LIST
    do
        LIST2="$LIST2
if (shTravisRepoIdGet $GITHUB_REPO); \
then printf \"$GITHUB_REPO\n\"; fi"
    done
    # create travis-repo
    LIST="$(shOnParallelListSpawn "$LIST2")"
    LIST2=""
    for GITHUB_REPO in $LIST
    do
        LIST2="$LIST2
(set -e; \
shBuildPrint \"creating travis-repo $GITHUB_REPO\"; \
TRAVIS_REPO_ID=\"\$(shTravisRepoIdGet $GITHUB_REPO)\"; \
curl -#Lf \
    -H \"Authorization: token $TRAVIS_ACCESS_TOKEN\" \
    -H \"Content-Type: application/json; charset=UTF-8\" \
    -X PUT \
    -d '{\"hook\":{\"active\":true}}' \
    \"https://api.travis-ci.org/hooks/\$TRAVIS_REPO_ID\"; \
sleep 1; \
curl -#Lf \
    -H \"Authorization: token $TRAVIS_ACCESS_TOKEN\" \
    -H \"Content-Type: application/json; charset=UTF-8\" \
    -H \"Travis-API-Version: 3\" \
    -X PATCH \
    -d '{\"setting.value\":true}' \
    \"https://api.travis-ci.org\"\
\"/repo/\$TRAVIS_REPO_ID/setting/builds_only_with_travis_yml\"; \
sleep 1; \
curl -#Lf \
    -H \"Authorization: token $TRAVIS_ACCESS_TOKEN\" \
    -H \"Content-Type: application/json; charset=UTF-8\" \
    -H \"Travis-API-Version: 3\" \
    -X PATCH \
    -d '{\"setting.value\":true}' \
    \"https://api.travis-ci.org\"\
\"/repo/\$TRAVIS_REPO_ID/setting/auto_cancel_pushes\"; \
)"
    done
    shOnParallelListSpawn "$LIST2"
    shBuildPrint "... created travis-repos $LIST"
)}

shTravisRepoListFilterForNonActive() {(set -e
# https://docs.travis-ci.com/api
# this function will filter for non-active travis-repos from $LIST
    LIST="$1"
    export MODE_BUILD="${MODE_BUILD:-shTravisRepoListFilter}"
    shBuildPrint "filtering out non-active travis-repos in list $LIST"
    # convert $LIST toLowerCase
    LIST="$(printf "$LIST" | tr [:upper:] [:lower:])"
    LIST2=""
    # filter-for non-active travis-repos
    for GITHUB_REPO in $LIST
    do
        LIST2="$LIST2
if (curl -Lfs https://api.travis-ci.org/repos/$GITHUB_REPO | grep -qv '\"active\":true'); \
then printf \"$GITHUB_REPO\n\"; fi"
    done
    LIST="$(shOnParallelListSpawn "$LIST2")"
    printf "$LIST"
)}

shTravisTaskPush() {(set -e
# this function will push the shell-task-script $1 with the message $2 to travis
    utility2-github-crud put https://github.com/kaizhu256/node-utility2/blob/task/.task.sh \
        "$1" '[$ /bin/sh .task.sh] $2'
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

shUtility2BuildApp() {(set -e
# this function will run shBuildApp in $UTILITY2_DEPENDENTS
    shUtility2DependentsSync
    cd "$HOME/src"
    # shBuildApp
    for DIR in $UTILITY2_DEPENDENTS
    do
        if [ -d "$DIR" ] && [ "$DIR" != utility2 ]
        then
            (cd "$DIR"; shBuildApp)
        fi
    done
    shUtility2GitDiff | less
)}

shUtility2DependentsSync() {(set -e
# this function will sync files between utility2 and its dependents
    cd "$HOME/src"
    # hardlink "lib.$LIB.js"
    ln -f "utility2/lib.utility2.sh" "$HOME"
    for LIB in apidoc db istanbul jslint uglifyjs
    do
        if [ -d "$LIB-lite" ]
        then
            ln -f "utility2/lib.$LIB.js" "$LIB-lite"
        fi
    done
    # hardlink .gitignore
    for DIR in $UTILITY2_DEPENDENTS
    do
        if [ -d "$DIR" ] && [ "$DIR" != utility2 ]
        then
            ln -f utility2/.gitignore "$DIR"
        fi
    done
    (cd utility2; shBuildApp)
    # hardlink lib.swgg.js
    if [ -d swgg ]
    then
        ln -f utility2/assets.utility2.rollup.js swgg/assets.swgg.rollup.js
        ln -f utility2/lib.swgg.js swgg
    fi
)}

shUtility2GitCommit() {(set -e
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

shUtility2GitCommitAndPush() {(set -e
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

shUtility2GitDiff() {(set -e
# this function will print the git-status of $UTILITY2_DEPENDENTS to stdout
    for DIR in $UTILITY2_DEPENDENTS
    do
        cd "$HOME/src/$DIR" || continue
        printf "\n\n\n\n$(pwd)\n"
        shGitLsTree
        git status
        git diff HEAD | cat
    done
)}

shUtility2Grep() {(set -e
# this function will recursively grep $UTILITY2_DEPENDENTS for the regexp $REGEXP
    REGEXP="$1"
    for DIR in $UTILITY2_DEPENDENTS
    do
        DIR="$HOME/src/$DIR"
        if [ -d "$DIR" ]
        then
            shGrep "$DIR" "$REGEXP"
        fi
    done
)}

shUtility2GrepTravisYml() {(set -e
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

shUtility2Version() {(set -e
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

shXvfbStart() {
# this function will start xvfb
    export DISPLAY=:99.0 || return $?
    rm -f /tmp/.X99-lock || return $?
    (Xvfb "$DISPLAY" &) 2>/dev/null || true
}

shMain "$@"
