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

#!! [ '2017.02.27 jslint-lite',
  #!! '2017.02.28 istanbul-lite',
  #!! '2017.03.07 electron-lite',
  #!! '2017.03.16 apidoc-lite',
  #!! '2017.03.19 swagger-ui-lite',
  #!! '2017.03.28 uglifyjs-lite',
  #!! '2017.03.29 db-lite',
  #!! '2017.03.29 swgg',
  #!! '2017.03.29 utility2' ]


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
npmdoc/node-npmdoc-gulp-uglify
npmdoc/node-npmdoc-node-fetch
npmdoc/node-npmdoc-gulp-uncss
npmdoc/node-npmdoc-node-notifier
npmdoc/node-npmdoc-node-gyp
npmdoc/node-npmdoc-lru-cache
npmdoc/node-npmdoc-node-schedule
npmdoc/node-npmdoc-js-yaml
npmdoc/node-npmdoc-http-server
npmdoc/node-npmdoc-react-router
npmdoc/node-npmdoc-html-webpack-plugin
npmdoc/node-npmdoc-jslint-lite
npmdoc/node-npmdoc-npm-check-updates
npmdoc/node-npmdoc-live-server
npmdoc/node-npmdoc-run-sequence
npmdoc/node-npmdoc-react-dom
npmdoc/node-npmdoc-isomorphic-fetch
npmdoc/node-npmdoc-request-promise
npmdoc/node-npmdoc-npm-run-all
npmdoc/node-npmdoc-npm-check
npmdoc/node-npmdoc-node-sass
npmdoc/node-npmdoc-node-inspector
npmdoc/node-npmdoc-json-server
npmdoc/node-npmdoc-uglify-js
npmdoc/node-npmdoc-passport-local
npmdoc/node-npmdoc-swagger-tools
npmdoc/node-npmdoc-require-dir
npmdoc/node-npmdoc-socket.io
npmdoc/node-npmdoc-serve-favicon
npmdoc/node-npmdoc-node-uuid
npmdoc/node-npmdoc-selenium-webdriver
npmdoc/node-npmdoc-swagger-client
npmdoc/node-npmdoc-swagger-converter
npmdoc/node-npmdoc-vinyl-source-stream
npmdoc/node-npmdoc-webpack-bundle-analyzer
npmdoc/node-npmdoc-swagger-test-templates
npmdoc/node-npmdoc-swagger-ui
npmdoc/node-npmdoc-material-ui
npmdoc/node-npmdoc-aws4
npmdoc/node-npmdoc-async
npmdoc/node-npmdoc-autoprefixer
npmdoc/node-npmdoc-axios
npmdoc/node-npmdoc-bcrypt-nodejs
npmdoc/node-npmdoc-react-redux
npmdoc/node-npmdoc-nsp
npmdoc/node-npmdoc-googleapis
npmdoc/node-npmdoc-socket.io-client
npmdoc/node-npmdoc-html-pdf
npmdoc/node-npmdoc-electron
npmdoc/node-npmdoc-electron-packager
npmdoc/node-npmdoc-gulp-angular-templatecache
npmdoc/node-npmdoc-express-validator
npmdoc/node-npmdoc-imagemin
npmdoc/node-npmdoc-minimatch
npmdoc/node-npmdoc-gulp-cssnano
npmdoc/node-npmdoc-babel-loader
npmdoc/node-npmdoc-gulp-nodemon
npmdoc/node-npmdoc-ramda
npmdoc/node-npmdoc-got
npmdoc/node-npmdoc-gulp-ruby-sass
npmdoc/node-npmdoc-node-cache
npmdoc/node-npmdoc-iconv-lite
npmdoc/node-npmdoc-swagger-editor
npmdoc/node-npmdoc-bootstrap
npmdoc/node-npmdoc-jsdoc
npmdoc/node-npmdoc-n
npmdoc/node-npmdoc-sandbox3
npmdoc/node-npmdoc-kue
npmdoc/node-npmdoc-statsd
npmdoc/node-npmdoc-babel
npmdoc/node-npmdoc-grunt-cli
npmdoc/node-npmdoc-swagger
npmdoc/node-npmdoc-font-awesome
npmdoc/node-npmdoc-grunt-contrib-copy
npmdoc/node-npmdoc-angular
npmdoc/node-npmdoc-ionic
npmdoc/node-npmdoc-gulp-less
npmdoc/node-npmdoc-whatwg-fetch
npmdoc/node-npmdoc-angular2
npmdoc/node-npmdoc-i18n
npmdoc/node-npmdoc-grunt-contrib-imagemin
npmdoc/node-npmdoc-dateformat
npmdoc/node-npmdoc-webpack-dev-server
npmdoc/node-npmdoc-gulp-shell
npmdoc/node-npmdoc-htmlparser2
npmdoc/node-npmdoc-wiredep
npmdoc/node-npmdoc-string
npmdoc/node-npmdoc-gulp-typescript
npmdoc/node-npmdoc-jshint-stylish
npmdoc/node-npmdoc-twit
npmdoc/node-npmdoc-download
npmdoc/node-npmdoc-main-bower-files
npmdoc/node-npmdoc-watch
npmdoc/node-npmdoc-split
npmdoc/node-npmdoc-express-jwt
npmdoc/node-npmdoc-opn
npmdoc/node-npmdoc-flux
npmdoc/node-npmdoc-sharp
npmdoc/node-npmdoc-serve-static
npmdoc/node-npmdoc-open
npmdoc/node-npmdoc-consolidate
npmdoc/node-npmdoc-html-minifier
npmdoc/node-npmdoc-method-override
npmdoc/node-npmdoc-oauth
npmdoc/node-npmdoc-jwt-simple
npmdoc/node-npmdoc-pre-commit
npmdoc/node-npmdoc-connect-flash
npmdoc/node-npmdoc-babelify
npmdoc/node-npmdoc-clean-css
npmdoc/node-npmdoc-babel-preset-es2015
npmdoc/node-npmdoc-serialport
npmdoc/node-npmdoc-grunt-contrib-sass
npmdoc/node-npmdoc-ms
npmdoc/node-npmdoc-update-notifier
npmdoc/node-npmdoc-grunt-contrib-less
npmdoc/node-npmdoc-cli-table
npmdoc/node-npmdoc-gulp-iconfont
npmdoc/node-npmdoc-requirejs
npmdoc/node-npmdoc-mqtt
npmdoc/node-npmdoc-rewire
npmdoc/node-npmdoc-load-grunt-tasks
npmdoc/node-npmdoc-eslint-plugin-react
npmdoc/node-npmdoc-rc
npmdoc/node-npmdoc-graceful-fs
npmdoc/node-npmdoc-react-native
npmdoc/node-npmdoc-js-beautify
npmdoc/node-npmdoc-jimp
npmdoc/node-npmdoc-soap
npmdoc/node-npmdoc-node-oauth2-server
npmdoc/node-npmdoc-johnny-five
npmdoc/node-npmdoc-gulp-webpack
npmdoc/node-npmdoc-gulp-csso
npmdoc/node-npmdoc-ssh2
npmdoc/node-npmdoc-agenda
npmdoc/node-npmdoc-gulp-ng-annotategulp-git
npmdoc/node-npmdoc-es6-promise
npmdoc/node-npmdoc-gulp-eslint
npmdoc/node-npmdoc-express-handlebars
npmdoc/node-npmdoc-ava
npmdoc/node-npmdoc-benchmark
npmdoc/node-npmdoc-loadtest
npmdoc/node-npmdoc-gulp-git
npmdoc/node-npmdoc-gulp-ng-annotate

"

shListUnflattenAndApplyFunction() {(set -e
    LIST="$1"
    #!! export TRAVIS_REPO_CREATE_FORCE=1
    #!! shNpmdocRepoListCreate "$LIST"
    shGithubRepoListTouch "$LIST" '[npm publishAfterCommitAfterBuild]'
    #!! shGithubRepoListCreate "$LIST" npmdoc
)}
shListUnflattenAndApply "$LIST" 16

)
