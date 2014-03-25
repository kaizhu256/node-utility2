[![coveralls.io code coverage status](https://coveralls.io/repos/kaizhu256/utility2/badge.png?branch=test)](https://coveralls.io/r/kaizhu256/utility2?branch=test)
[![travis.ci-org build status](https://travis-ci.org/kaizhu256/utility2.png?branch=test)](https://travis-ci.org/kaizhu256/utility2?branch=test)
[![codeship.io build status](https://www.codeship.io/projects/6d1392c0-94e7-0131-971e-16be0a303db9/status?branch=test)](https://www.codeship.io/projects/16743?branch=test)
[![david-dm.org npm dependency status](https://david-dm.org/kaizhu256/utility2.png?branch=test)](https://david-dm.org/kaizhu256/utility2?branch=test)
[![saucelabs.com selenium test status](https://saucelabs.com/browser-matrix/utility2.svg)](https://saucelabs.com/u/utility2)
# utility2.js
#### standalone, browser test and code coverage framework for nodejs

## usage example
```
npm install utility2.js
cd node_modules/utility2
npm test
```

## changelog
#### todo
* migrate to codeship
* test codeship.io build
* add trycatch for jsonStringifyCircular to handle dom objects
* add skip test feature
* enforce basic auth for localhost requests
* integrate saucelabs
* auto-remove test functions from module in production mode
* auto-skip tests
* emulate localStorage
* add heroku dynamic config server
* integrate forever-webui

#### 2014.03.21
* fix test idempotency bug caused by http agent socket pooling
* revamp untilReadyUtility2 with onEventMulti
* cache createDbTable and createPostgresTable
* integrate full-featured mimeLookup into browser
* add moduleAdminBrowser and moduleAdminNodejs
* add testWatch browser feature

#### 2014.03.19
* add nodejs.url to utility2-external
