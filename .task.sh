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

shListUnflattenAndApplyFunction() {(set -e
    LIST="$1"
    #!! export TRAVIS_REPO_CREATE_FORCE=1
    shNpmdocRepoListCreate "$LIST"
    #!! shGithubRepoListTouch "$LIST" '[npm publishAfterCommitAfterBuild]'
    #!! shGithubRepoListCreate "$LIST" npmdoc
)}
shListUnflattenAndApply "$LIST" 16

)
