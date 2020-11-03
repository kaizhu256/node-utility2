#!/bin/sh
# jslint utility2:true

shMain () {(set -e
# this function will run the main program
    printf "running command 'npm run $*' ...\n" 1>&2
    UTILITY2_BIN=utility2
    local ARG1
    if [ -f lib.utility2.sh ]
    then
        UTILITY2_BIN="$PWD/lib.utility2.sh"
    fi
    ARG1="$1"
    # run command - custom
    case "$1" in
    esac
    # run command - default
    case "$ARG1" in
    build-ci)
        "$UTILITY2_BIN" shReadmeTest build_ci.sh
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
            if [ -f lib.utility2.sh ]
            then
                export npm_config_mode_auto_restart=1
                "$UTILITY2_BIN" shRun shIstanbulCover test.js
                return
            fi
            "$UTILITY2_BIN" start test.js
        fi
        ;;
    test)
        if [ -f lib.utility2.sh ]
        then
            export npm_config_mode_auto_restart=1
        fi
        export PORT=$(UTILITY2_BIN shServerPortRandom)
        "$UTILITY2_BIN" test test.js
        ;;
    utility2)
        "$@"
        ;;
    esac
    printf "... finished running command 'npm run $*'\n" 1>&2
)}

# run command
shMain "$npm_lifecycle_event" "$@"
