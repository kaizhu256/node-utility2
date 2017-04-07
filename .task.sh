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

#!! [ '2017.02.28 istanbul-lite',
  #!! '2017.03.07 electron-lite',
  #!! '2017.03.16 apidoc-lite',
  #!! '2017.03.19 swagger-ui-lite',
  #!! '2017.03.28 uglifyjs-lite',
  #!! '2017.03.29 db-lite',
  #!! '2017.03.29 swgg',
  #!! '2017.04.06 jslint-lite',
  #!! '2017.04.06 utility2' ]

#!! II=2450
#!! while [ "$II" -lt 3000 ]
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
npmdoc/node-npmdoc-bell
npmdoc/node-npmdoc-co-prompt
npmdoc/node-npmdoc-fs.extra
npmdoc/node-npmdoc-react-sticky
npmdoc/node-npmdoc-laravel-elixir
npmdoc/node-npmdoc-reqwest
npmdoc/node-npmdoc-updtr
npmdoc/node-npmdoc-react-select
npmdoc/node-npmdoc-httpster
npmdoc/node-npmdoc-airsonos
npmdoc/node-npmdoc-component
npmdoc/node-npmdoc-composition
npmdoc/node-npmdoc-mjml
npmdoc/node-npmdoc-config-chain
npmdoc/node-npmdoc-gulp-rigger
npmdoc/node-npmdoc-connect-busboy
npmdoc/node-npmdoc-react-toolbox
npmdoc/node-npmdoc-express-domain-middleware
npmdoc/node-npmdoc-connect-ensure-login
npmdoc/node-npmdoc-connect-livereload
npmdoc/node-npmdoc-express-cluster
npmdoc/node-npmdoc-re-base
npmdoc/node-npmdoc-tween.js
npmdoc/node-npmdoc-ibm_db
npmdoc/node-npmdoc-angular-animate
npmdoc/node-npmdoc-tunnel
npmdoc/node-npmdoc-to-markdown
npmdoc/node-npmdoc-everyauth
npmdoc/node-npmdoc-velocity-react
npmdoc/node-npmdoc-urijs
npmdoc/node-npmdoc-tiny-lr
npmdoc/node-npmdoc-release-it
npmdoc/node-npmdoc-connect-modrewrite
npmdoc/node-npmdoc-react-tooltip
npmdoc/node-npmdoc-etag
npmdoc/node-npmdoc-image-resizer
npmdoc/node-npmdoc-image-to-ascii
npmdoc/node-npmdoc-image-type
npmdoc/node-npmdoc-image-webpack-loader
npmdoc/node-npmdoc-react-ui-builder
npmdoc/node-npmdoc-chartist
npmdoc/node-npmdoc-react-virtualized
npmdoc/node-npmdoc-any-promise
npmdoc/node-npmdoc-anyproxy
npmdoc/node-npmdoc-aphrodite
npmdoc/node-npmdoc-api-benchmark
npmdoc/node-npmdoc-api-mock
npmdoc/node-npmdoc-apiai
npmdoc/node-npmdoc-apicache
npmdoc/node-npmdoc-globalize
npmdoc/node-npmdoc-charm
npmdoc/node-npmdoc-changelog
npmdoc/node-npmdoc-app-root-path
npmdoc/node-npmdoc-arangojs
npmdoc/node-npmdoc-connect-pg-simple
npmdoc/node-npmdoc-chai-http
npmdoc/node-npmdoc-arduino-firmata
npmdoc/node-npmdoc-argon2
npmdoc/node-npmdoc-mongoose-auto-increment
npmdoc/node-npmdoc-args
npmdoc/node-npmdoc-argv
npmdoc/node-npmdoc-array-flatten
npmdoc/node-npmdoc-asar
npmdoc/node-npmdoc-ascii-chart
npmdoc/node-npmdoc-images
npmdoc/node-npmdoc-imap-simple
npmdoc/node-npmdoc-imdb-api
npmdoc/node-npmdoc-react-waypoint
npmdoc/node-npmdoc-inert
npmdoc/node-npmdoc-gitignore
npmdoc/node-npmdoc-cfork
npmdoc/node-npmdoc-tachyons
npmdoc/node-npmdoc-cfenv
npmdoc/node-npmdoc-html-to-json
npmdoc/node-npmdoc-ccap
npmdoc/node-npmdoc-url-join
npmdoc/node-npmdoc-cca
npmdoc/node-npmdoc-catw
npmdoc/node-npmdoc-ios-sim
npmdoc/node-npmdoc-prerender-node
npmdoc/node-npmdoc-read
npmdoc/node-npmdoc-casual
npmdoc/node-npmdoc-castnow
npmdoc/node-npmdoc-cassandra-driver
npmdoc/node-npmdoc-postcss-cssnext
npmdoc/node-npmdoc-snyk
npmdoc/node-npmdoc-cash
npmdoc/node-npmdoc-cardinal
npmdoc/node-npmdoc-grunt-eslint
npmdoc/node-npmdoc-captchapng
npmdoc/node-npmdoc-url-pattern
npmdoc/node-npmdoc-urllib
npmdoc/node-npmdoc-sails-mongo
npmdoc/node-npmdoc-pixi.js
npmdoc/node-npmdoc-read-package-json
npmdoc/node-npmdoc-dropzone
npmdoc/node-npmdoc-camelcase
npmdoc/node-npmdoc-line-reader
npmdoc/node-npmdoc-readdirp
npmdoc/node-npmdoc-cool-ascii-faces
npmdoc/node-npmdoc-copy-paste
npmdoc/node-npmdoc-cordova-plugin-firebase
npmdoc/node-npmdoc-passport-remember-me
npmdoc/node-npmdoc-gulp-scss-lint
npmdoc/node-npmdoc-karma-sinon
npmdoc/node-npmdoc-readline
npmdoc/node-npmdoc-foreman
npmdoc/node-npmdoc-readline-sync
npmdoc/node-npmdoc-karma-coverage
npmdoc/node-npmdoc-stream-buffers
npmdoc/node-npmdoc-realm
npmdoc/node-npmdoc-lockfile
npmdoc/node-npmdoc-npm-install-webpack-plugin
npmdoc/node-npmdoc-base64-url
npmdoc/node-npmdoc-redis-commander
npmdoc/node-npmdoc-basscss
npmdoc/node-npmdoc-gulp-sprite-generator
npmdoc/node-npmdoc-source-map-support
npmdoc/node-npmdoc-gulp-ssh
npmdoc/node-npmdoc-yosay
npmdoc/node-npmdoc-webworkify
npmdoc/node-npmdoc-beeper
npmdoc/node-npmdoc-upstarter
npmdoc/node-npmdoc-bell.js
npmdoc/node-npmdoc-ndarray
npmdoc/node-npmdoc-splittable
npmdoc/node-npmdoc-openlayers
npmdoc/node-npmdoc-bignum
npmdoc/node-npmdoc-bignumber.js
npmdoc/node-npmdoc-bigrig
npmdoc/node-npmdoc-binary-csv
npmdoc/node-npmdoc-bindings
npmdoc/node-npmdoc-bitcoin
npmdoc/node-npmdoc-bitcore
npmdoc/node-npmdoc-bittorrent-dht
npmdoc/node-npmdoc-flatpickr
npmdoc/node-npmdoc-spritesmith
npmdoc/node-npmdoc-bleno
npmdoc/node-npmdoc-gulp-jsdoc
npmdoc/node-npmdoc-redux-actions
npmdoc/node-npmdoc-sqs-consumer
npmdoc/node-npmdoc-blue-tape
npmdoc/node-npmdoc-blueimp-file-upload-expressjs
"

shListUnflattenAndApplyFunction() {(set -e
    LIST="$1"
    export TRAVIS_REPO_CREATE_FORCE=1
    shNpmdocRepoListCreate "$LIST"
    #!! shGithubRepoListTouch "$LIST" '[npm publishAfterCommitAfterBuild]'
    #!! shGithubRepoListCreate "$LIST" npmdoc
)}
shListUnflattenAndApply "$LIST" 16

)
