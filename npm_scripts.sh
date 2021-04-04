#!/bin/sh
# jslint utility2:true

shMain() {(set -e
# this function will run the main program
    local ARG1
    printf "# start - 'npm run-script $*'\n" 1>&2
    UTILITY2_BIN=utility2
    if [ -f lib.utility2.sh ]
    then
        UTILITY2_BIN="$PWD/lib.utility2.sh"
    fi
    ARG1="$1"
    # run cmd - custom
    case "$1" in
    esac
    # run cmd - default
    case "$ARG1" in
    build-ci)
        "$UTILITY2_BIN" shReadmeEval build_ci.sh
        ;;
    eval)
        shift
        "$@"
        ;;
    heroku-postbuild)
        if [ ! -f lib.utility2.sh ]
        then
            npm install kaizhu256/node-utility2#alpha --prefix .
        fi
        "$UTILITY2_BIN" shDeployHeroku
        ;;
    start)
        export PORT=${PORT:-8080}
        if [ -f assets.app.js ]
        then
            node assets.app.js
        else
            "$UTILITY2_BIN" start test.js
        fi
        ;;
    test)
        export PORT=$($UTILITY2_BIN shServerPortRandom)
        "$UTILITY2_BIN" test test.js
        ;;
    utility2)
        "$@"
        ;;
    esac
    printf "# end - 'npm run-script $*'\n" 1>&2
)}

# run cmd
shMain "$npm_lifecycle_event" "$@"
