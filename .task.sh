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
npmdoc/node-npmdoc-up
npmdoc/node-npmdoc-updtr
npmdoc/node-npmdoc-upstarter
npmdoc/node-npmdoc-urijs
npmdoc/node-npmdoc-url-join
npmdoc/node-npmdoc-urllib
npmdoc/node-npmdoc-url-pattern
npmdoc/node-npmdoc-ursa
npmdoc/node-npmdoc-usage
npmdoc/node-npmdoc-usb-detection
npmdoc/node-npmdoc-utils-merge
npmdoc/node-npmdoc-validate
npmdoc/node-npmdoc-validate.js
npmdoc/node-npmdoc-validatorjs
npmdoc/node-npmdoc-valid-url
npmdoc/node-npmdoc-vinyl-ftp
npmdoc/node-npmdoc-vinyl-map
npmdoc/node-npmdoc-vinyl-transform
npmdoc/node-npmdoc-vision
npmdoc/node-npmdoc-vk-io
npmdoc/node-npmdoc-vogels
npmdoc/node-npmdoc-voxel-engine
npmdoc/node-npmdoc-vtop
npmdoc/node-npmdoc-vue-cli
npmdoc/node-npmdoc-vue-loader
npmdoc/node-npmdoc-vue-router
npmdoc/node-npmdoc-walk
npmdoc/node-npmdoc-walkdir
npmdoc/node-npmdoc-warning
npmdoc/node-npmdoc-wavi
npmdoc/node-npmdoc-waypoints
npmdoc/node-npmdoc-weak
npmdoc/node-npmdoc-webcomponents.js
npmdoc/node-npmdoc-webdriver-manager
npmdoc/node-npmdoc-webfontloader
npmdoc/node-npmdoc-webpack-dev-middleware
npmdoc/node-npmdoc-webpack-isomorphic-tools
npmdoc/node-npmdoc-webpack-load-plugins
npmdoc/node-npmdoc-webpack-manifest-plugin
npmdoc/node-npmdoc-webpack-notifier
npmdoc/node-npmdoc-webpack-visualizer-plugin
npmdoc/node-npmdoc-web-push
npmdoc/node-npmdoc-website-scraper
npmdoc/node-npmdoc-web-terminal
npmdoc/node-npmdoc-wechat-api
npmdoc/node-npmdoc-wechat-oauth
npmdoc/node-npmdoc-which
npmdoc/node-npmdoc-wifi-password
npmdoc/node-npmdoc-windows-build-tools
npmdoc/node-npmdoc-windows-cpu
npmdoc/node-npmdoc-winston-daily-rotate-file
npmdoc/node-npmdoc-winston-mongodb
npmdoc/node-npmdoc-wkhtmltopdf
npmdoc/node-npmdoc-wordpress
npmdoc/node-npmdoc-wordwrap
npmdoc/node-npmdoc-worker-farm
npmdoc/node-npmdoc-workshopper
npmdoc/node-npmdoc-world-countries
npmdoc/node-npmdoc-wpapi
npmdoc/node-npmdoc-wrtc
npmdoc/node-npmdoc-wzrd
npmdoc/node-npmdoc--xlsjs
npmdoc/node-npmdoc-xls-to-json
npmdoc/node-npmdoc-xlsx-to-json
npmdoc/node-npmdoc-xmlbuilder
npmdoc/node-npmdoc-xmlhttprequest
npmdoc/node-npmdoc-xml-js
npmdoc/node-npmdoc-xml-writer
npmdoc/node-npmdoc-xss
npmdoc/node-npmdoc-xss-filters
npmdoc/node-npmdoc-yaml
npmdoc/node-npmdoc-yar
npmdoc/node-npmdoc-yauzl
npmdoc/node-npmdoc-youtube-node
npmdoc/node-npmdoc-yo-yo
npmdoc/node-npmdoc-yui
npmdoc/node-npmdoc-zerorpc
npmdoc/node-npmdoc-zone.js
npmdoc/node-npmdoc-zookeeper
npmdoc/node-npmdoc-zxcvbn
"

LIST="
npmdoc/node-npmdoc-moment
npmdoc/node-npmdoc-mongoose
npmdoc/node-npmdoc-morgan
npmdoc/node-npmdoc-mssql
npmdoc/node-npmdoc-multer
npmdoc/node-npmdoc-mysql
npmdoc/node-npmdoc-natural
npmdoc/node-npmdoc-nedb
npmdoc/node-npmdoc-nock
npmdoc/node-npmdoc-nconf
npmdoc/node-npmdoc-nodemon
npmdoc/node-npmdoc-nodemailer
npmdoc/node-npmdoc-nopt
npmdoc/node-npmdoc-optimist
npmdoc/node-npmdoc-npmdoc
npmdoc/node-npmdoc-passport
npmdoc/node-npmdoc-pg
npmdoc/node-npmdoc-phantomjs
npmdoc/node-npmdoc-pm2
npmdoc/node-npmdoc-postcss
npmdoc/node-npmdoc-promise
npmdoc/node-npmdoc-progress
npmdoc/node-npmdoc-prompt
npmdoc/node-npmdoc-pug
npmdoc/node-npmdoc-q
npmdoc/node-npmdoc-qs
npmdoc/node-npmdoc-react
npmdoc/node-npmdoc-redis
npmdoc/node-npmdoc-redux
npmdoc/node-npmdoc-request
npmdoc/node-npmdoc-rimraf
npmdoc/node-npmdoc-restify
npmdoc/node-npmdoc-sandbox2
npmdoc/node-npmdoc-sails
npmdoc/node-npmdoc-shortid
npmdoc/node-npmdoc-sequelize
npmdoc/node-npmdoc-semver
npmdoc/node-npmdoc-shelljs
npmdoc/node-npmdoc-slug
npmdoc/node-npmdoc-sinon
npmdoc/node-npmdoc-should
npmdoc/node-npmdoc-sinopia
npmdoc/node-npmdoc-standard
npmdoc/node-npmdoc-sqlite3
npmdoc/node-npmdoc-superagent
npmdoc/node-npmdoc-stylus
npmdoc/node-npmdoc-supertest
npmdoc/node-npmdoc-supervisor
npmdoc/node-npmdoc-through2
npmdoc/node-npmdoc-tape
npmdoc/node-npmdoc-through
npmdoc/node-npmdoc-twitter
npmdoc/node-npmdoc-underscore
npmdoc/node-npmdoc-uuid
npmdoc/node-npmdoc-validator
npmdoc/node-npmdoc-uglifyjs
npmdoc/node-npmdoc-utility2
npmdoc/node-npmdoc-watchify
npmdoc/node-npmdoc-vue
npmdoc/node-npmdoc-webpack
npmdoc/node-npmdoc-winston
npmdoc/node-npmdoc-xlsx
npmdoc/node-npmdoc-ws
npmdoc/node-npmdoc-xml2js
npmdoc/node-npmdoc-yargs
npmdoc/node-npmdoc-cors
npmdoc/node-npmdoc-cron
npmdoc/node-npmdoc-csurf
npmdoc/node-npmdoc-csv
npmdoc/node-npmdoc-del
npmdoc/node-npmdoc-dotenv
npmdoc/node-npmdoc-debug
npmdoc/node-npmdoc-d3
npmdoc/node-npmdoc-bunyan
npmdoc/node-npmdoc-firebase
npmdoc/node-npmdoc-less
npmdoc/node-npmdoc-yo
npmdoc/node-npmdoc-aws-sdk
npmdoc/node-npmdoc-body-parser
npmdoc/node-npmdoc-coffee-script
npmdoc/node-npmdoc-concat-stream
npmdoc/node-npmdoc-browser-sync
npmdoc/node-npmdoc-babel-core
npmdoc/node-npmdoc-connect-mongo
npmdoc/node-npmdoc-connect-redis
npmdoc/node-npmdoc-cookie-parser
npmdoc/node-npmdoc-grunt-contrib-watch
npmdoc/node-npmdoc-cross-env
npmdoc/node-npmdoc-eslint-config-airbnb
npmdoc/node-npmdoc-event-stream
npmdoc/node-npmdoc-crypto-js
npmdoc/node-npmdoc-gulp-filter
npmdoc/node-npmdoc-express-session
npmdoc/node-npmdoc-grunt-contrib-cssmin
npmdoc/node-npmdoc-grunt-contrib-clean
npmdoc/node-npmdoc-fs-extra
npmdoc/node-npmdoc-gulp-clean-css
npmdoc/node-npmdoc-gulp-clean
npmdoc/node-npmdoc-grunt-contrib-jshint
npmdoc/node-npmdoc-gulp-autoprefixer
npmdoc/node-npmdoc-gulp-jshint
npmdoc/node-npmdoc-grunt-contrib-uglify
npmdoc/node-npmdoc-gulp-if
npmdoc/node-npmdoc-gulp-imagemin
npmdoc/node-npmdoc-gulp-jade
npmdoc/node-npmdoc-gulp-load-plugins
npmdoc/node-npmdoc-gulp-minify-html
npmdoc/node-npmdoc-grunt-contrib-concat
npmdoc/node-npmdoc-gulp-replace
npmdoc/node-npmdoc-gulp-livereload
npmdoc/node-npmdoc-gulp-plumber
npmdoc/node-npmdoc-gulp-minify-css
npmdoc/node-npmdoc-gulp-notify
npmdoc/node-npmdoc-gulp-rev
npmdoc/node-npmdoc-gulp-connect
npmdoc/node-npmdoc-gulp-concat
npmdoc/node-npmdoc-gulp-changed
npmdoc/node-npmdoc-gulp-file-include
npmdoc/node-npmdoc-gulp-babel
npmdoc/node-npmdoc-gulp-useref
npmdoc/node-npmdoc-gulp-htmlmin
npmdoc/node-npmdoc-gulp-sass
npmdoc/node-npmdoc-gulp-inject
npmdoc/node-npmdoc-gulp-watch
npmdoc/node-npmdoc-http-proxy
npmdoc/node-npmdoc-gulp-util
npmdoc/node-npmdoc-gulp-html-replace
npmdoc/node-npmdoc-gulp-sourcemaps
npmdoc/node-npmdoc-gulp-rename
npmdoc/node-npmdoc-gulp-uglify
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
