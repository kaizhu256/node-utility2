(set -e
# shCryptoAesWithGithubOrg npmdoc /bin/sh "$HOME/src/sandbox2/.task.sh"
# shCryptoAesWithGithubOrg kaizhu256 shTravisTaskPush "$HOME/src/sandbox2/.task.sh"
# shCryptoAesWithGithubOrg kaizhu256 shGithubRepoListTouch npmdoc/node-npmdoc-npm '[npm publishAfterCommitAfterBuild]'
# [$ /bin/sh .task.sh]

cd /tmp
if [ "$TRAVIS" ]
then
    npm install "kaizhu256/node-utility2#alpha"
    . ./node_modules/.bin/utility2
    eval "$(shTravisCryptoAesDecryptYml $CRYPTO_AES_KEY_npmdoc npmdoc)"
fi
. ./node_modules/.bin/utility2
export PATH="/tmp/node_modules/.bin:$PATH"
export npm_config_dir_utility2="/tmp/node_modules/utility2"
shInit

#!! [ '01.02.01 cron',
  #!! '2017.02.19 uglifyjs-lite',
  #!! '2017.02.20 swgg',
  #!! '2017.02.27 jslint-lite',
  #!! '2017.02.28 istanbul-lite',
  #!! '2017.03.07 electron-lite',
  #!! '2017.03.16 apidoc-lite',
  #!! '2017.03.16 db-lite',
  #!! '2017.03.19 swagger-ui-lite',
  #!! '2017.03.21 utility2' ]

#!! II=2450
#!! while [ "$II" -lt 3000 ]
#!! do
    #!! LIST="https://www.npmjs.com/browse/star?offset=$II"
    #!! printf "$LIST\n"
    #!! LIST="$(shNpmNameListGetFromUrl "$LIST")"
    #!! LIST2=""
    #!! for NAME in $LIST
    #!! do
        #!! NAME="$(shNpmNameNormalize $NAME)"
        #!! if [ "$NAME" ]
        #!! then
            #!! LIST2="$LIST2
#!! npmdoc/node-npmdoc-$NAME"
        #!! fi
    #!! done
    #!! LIST="$LIST2"
    #!! printf "$LIST\n"
    #!! shGithubRepoListCreate "$LIST" npmdoc
    #!! II="$((II+32))"
#!! done

#!! II=850
#!! while [ "$II" -lt 1000 ]
#!! II=1000
#!! while [ "$II" -lt 1001 ]
#!! do
    #!! LIST="https://www.npmjs.com/browse/star?offset=$II"
    #!! printf "$LIST\n"
    #!! #!! export TRAVIS_REPO_CREATE_FORCE=1
    #!! shNpmdocRepoListCreate "$LIST"
    #!! II="$((II+32))"
#!! done

LIST="
npmdoc/node-npmdoc-assemble
npmdoc/node-npmdoc-assert-plus
npmdoc/node-npmdoc-asyncawait
npmdoc/node-npmdoc-async-each
npmdoc/node-npmdoc-asynquence
npmdoc/node-npmdoc-atlasboard
npmdoc/node-npmdoc-atomify
npmdoc/node-npmdoc-autobind-decorator
npmdoc/node-npmdoc-auto-launch
npmdoc/node-npmdoc-autosize
npmdoc/node-npmdoc-awesome-angular2
npmdoc/node-npmdoc-axe-core
npmdoc/node-npmdoc-axon
npmdoc/node-npmdoc-azure-cli
npmdoc/node-npmdoc-babel-plugin-import
npmdoc/node-npmdoc-babel-plugin-lodash
npmdoc/node-npmdoc-babel-plugin-react-transform
npmdoc/node-npmdoc-babel-plugin-transform-async-to-generator
npmdoc/node-npmdoc-babel-plugin-transform-object-assign
npmdoc/node-npmdoc-babel-plugin-transform-runtime
npmdoc/node-npmdoc-babel-preset-react-hmre
npmdoc/node-npmdoc-babel-preset-stage-0
npmdoc/node-npmdoc-babili
npmdoc/node-npmdoc-babylon
npmdoc/node-npmdoc-babyparse
npmdoc/node-npmdoc-baconjs
npmdoc/node-npmdoc-base64-img
npmdoc/node-npmdoc-base64-url
npmdoc/node-npmdoc-basscss
npmdoc/node-npmdoc-beeper
npmdoc/node-npmdoc-bell
npmdoc/node-npmdoc-bell.js
npmdoc/node-npmdoc-bignum
npmdoc/node-npmdoc-bignumber.js
npmdoc/node-npmdoc-bigrig
npmdoc/node-npmdoc-binary-csv
npmdoc/node-npmdoc-bindings
npmdoc/node-npmdoc-bitcoin
npmdoc/node-npmdoc-bitcore
npmdoc/node-npmdoc-bittorrent-dht
npmdoc/node-npmdoc-bleno
npmdoc/node-npmdoc-blueimp-file-upload-expressjs
npmdoc/node-npmdoc-blue-tape
npmdoc/node-npmdoc-bluetooth-serial-port
npmdoc/node-npmdoc-bodybuilder
npmdoc/node-npmdoc-bootstrap-loader
npmdoc/node-npmdoc-bootswatch
npmdoc/node-npmdoc-botbuilder
npmdoc/node-npmdoc-bottlejs
npmdoc/node-npmdoc-bouncy
npmdoc/node-npmdoc-bower-update
npmdoc/node-npmdoc-bows
npmdoc/node-npmdoc-bpmn
npmdoc/node-npmdoc-brace
npmdoc/node-npmdoc-braintree
npmdoc/node-npmdoc-broken-link-checker
npmdoc/node-npmdoc-browserify-hmr
npmdoc/node-npmdoc-browser-perf
npmdoc/node-npmdoc-browser-repl
npmdoc/node-npmdoc-browser-request
npmdoc/node-npmdoc-brunch
npmdoc/node-npmdoc-bs-html-injector
npmdoc/node-npmdoc-bson
npmdoc/node-npmdoc-buble
npmdoc/node-npmdoc-bundle-collapser
npmdoc/node-npmdoc-bunyan-middleware
npmdoc/node-npmdoc-byline
npmdoc/node-npmdoc-bytes
npmdoc/node-npmdoc-bytewise
npmdoc/node-npmdoc-cacheman
npmdoc/node-npmdoc-callsite
npmdoc/node-npmdoc-camelcase
npmdoc/node-npmdoc-captchapng
npmdoc/node-npmdoc-cardinal
npmdoc/node-npmdoc-cash
npmdoc/node-npmdoc-cassandra-driver
npmdoc/node-npmdoc-castnow
npmdoc/node-npmdoc-casual
npmdoc/node-npmdoc-catw
npmdoc/node-npmdoc-cca
npmdoc/node-npmdoc-cfenv
npmdoc/node-npmdoc-cfork
npmdoc/node-npmdoc-chai-http
npmdoc/node-npmdoc-changelog
npmdoc/node-npmdoc-charm
npmdoc/node-npmdoc-chartist
npmdoc/node-npmdoc-check-dependencies
npmdoc/node-npmdoc-check-types
npmdoc/node-npmdoc-chess.js
npmdoc/node-npmdoc-child-process-promise
npmdoc/node-npmdoc-circuit-breaker-js
npmdoc/node-npmdoc-clam
npmdoc/node-npmdoc-clean-webpack-plugin
npmdoc/node-npmdoc-clear
npmdoc/node-npmdoc-client-oauth2
npmdoc/node-npmdoc-cli-table2
npmdoc/node-npmdoc-cloudinary
npmdoc/node-npmdoc-clui
npmdoc/node-npmdoc-cmake-js
npmdoc/node-npmdoc-cnpm
npmdoc/node-npmdoc-coap
npmdoc/node-npmdoc-co-body
npmdoc/node-npmdoc-coffeeify
npmdoc/node-npmdoc-collections
npmdoc/node-npmdoc-color-convert
npmdoc/node-npmdoc-colors.css
npmdoc/node-npmdoc-color-thief
npmdoc/node-npmdoc-combine-css
npmdoc/node-npmdoc-common-errors
npmdoc/node-npmdoc-complexity-report
npmdoc/node-npmdoc-component
npmdoc/node-npmdoc-composition
npmdoc/node-npmdoc-config-chain
npmdoc/node-npmdoc-connect-busboy
npmdoc/node-npmdoc-connect-ensure-login
npmdoc/node-npmdoc-connect-livereload
npmdoc/node-npmdoc-connect-modrewrite
npmdoc/node-npmdoc-connect-pg-simple
npmdoc/node-npmdoc-connect-roles
npmdoc/node-npmdoc-connect-session-sequelize
npmdoc/node-npmdoc-connect-timeout
npmdoc/node-npmdoc-consign
npmdoc/node-npmdoc-console.table
npmdoc/node-npmdoc-consul
npmdoc/node-npmdoc-content-disposition
npmdoc/node-npmdoc-conventional-changelog
npmdoc/node-npmdoc-co-prompt
npmdoc/node-npmdoc-copy-paste
npmdoc/node-npmdoc-cordova-gen-icon
npmdoc/node-npmdoc-cordova-plugin-calendar
"
#!! export TRAVIS_REPO_CREATE_FORCE=1
shNpmdocRepoListCreate "$LIST"
#!! shGithubRepoListTouch "$LIST" '[npm publishAfterCommitAfterBuild]'
#!! shGithubRepoListCreate "$LIST" npmdoc
)
