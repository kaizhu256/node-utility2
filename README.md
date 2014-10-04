utility2 [![NPM](https://img.shields.io/npm/v/utility2.svg?style=flat-square)](https://www.npmjs.org/package/utility2)
========
lightweight nodejs module for testing and covering browser-side code



## demo server
[![heroku.com test server](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/test-report.screenshot.heroku.png)](https://hrku01-utility2-beta.herokuapp.com/?modeTest=1)



## build status [![travis.ci-org build status](https://api.travis-ci.org/kaizhu256/node-utility2.svg)](https://travis-ci.org/kaizhu256/node-utility2)

[![build commit status](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/build.badge.svg)](https://travis-ci.org/kaizhu256/node-utility2)

[![saucelabs.com selenium test status](https://saucelabs.com/browser-matrix/sclb01-utility2.svg)](https://saucelabs.com/u/sclb01-utility2)

 git branch | test server | test report | coverage report | build artifact
:----------:|:-----------:|:-----------:|:---------------:|:--------------:
[master](https://github.com/kaizhu256/node-utility2/tree/master) | [![heroku.com test server](https://kaizhu256.github.io/public/heroku-logo-light-88x31.png)](https://hrku01-utility2-master.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/public/glyphicons_free/glyphicons/png/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/master)
[beta](https://github.com/kaizhu256/node-utility2/tree/beta) | [![heroku.com test server](https://kaizhu256.github.io/public/heroku-logo-light-88x31.png)](https://hrku01-utility2-beta.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/public/glyphicons_free/glyphicons/png/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/beta)
[alpha](https://github.com/kaizhu256/node-utility2/tree/alpha) | [![heroku.com test server](https://kaizhu256.github.io/public/heroku-logo-light-88x31.png)](https://hrku01-utility2-alpha.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/public/glyphicons_free/glyphicons/png/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/alpha)



## installation and quickstart
```
## install utility2
npm install utility2 && cd node_modules/utility2
## run browser tests and create test and coverage reports on self
npm test
## start utility2 test server on port 8080 with test mode enabled
npm start --mode-test=true --server-port=8080
```



## library usage example
```
// example.js
/*jslint
  bitwise: true,
  indent:2,
  node: true
*/
(function () {
  'use strict';
  var port, server, utility2;
  // require utility2 module
  try {
    utility2 = require('utility2');
  } catch (error) {
    utility2 = require('./main.js');
  }
  // create random port in the inclusive range 0x8000 - 0xffff
  port = (Math.random() * 0xffff) | 0x8000;
  console.log('example test server starting on random port ' + port);
  // init server with example middleware
  server = require('http').createServer(function (request, response) {
    utility2.serverMiddleware(request, response, function (error) {
      utility2.serverRespondDefault(response, error ? 500 : 404, error);
    });
  });
  // set server to listen on the specified port
  server.listen(port, function () {
    console.log('example test server started on port ' + port);
    setTimeout(function () {
      server.close();
      console.log('example test server closed after 1 second');
    }, 1000);
  });
}());
```



## description of files
- .build/
  - auto-created directory where test and coverage reports are generated
- .install/
  - auto-created directory where npm postinstall files are generated
- .travis.yml
  - travis-ci config file
  - contains encrypted credentials used by travis-ci
- README.md
  - this readme file
- example.js
  - example nodejs script demonstrating how to use this app
- main.data
  - data file containing embedded resources for this app
- main.js
  - this app's main program / library
- package.json
  - npm config file
- utility2.data
  - data file containing embedded resources for testing this app
- utility2.js
  - nodejs build script
- utility2.sh
  - shell build script used by travis-ci to do the following:
    - run local phantomjs and slimerjs browser tests on local server
    - deploy to heroku after passing local browser tests
    - run saucelabs browser tests on deployed heroku server
    - on version change, publish this app to npm registry after passing saucelabs browser tests
    - upload tests, coverages, screenshots, and other build artifacts to github



## npm dependencies
- headless-browser-lite v2014.x.x (dev-dependency)
- istanbul v0.2.x (dev-dependency)
- jslint-lite v2014.x.x (dev-dependency)



## todo
- optionally install main.data to improve cli startup (e.g. node-jslint-lite)
- add csslint
- add server stress test using phantomjs
- minify /public/main.data.js and /public/utility2.data.js



## changelog
#### 2014.9.22
- auto-detect slimerjs testing
- add url query-param feature modeErrorIgnore=1 to ignore test-simulated errors
- move main.* and utility2.* assets to /public/cache path
- fix code coverage for failed tests
- remove global dependencies in nodejs env
- create ./build/test-report.xml for jenkins
- merge phantomjs and slimerjs dependencies into headless-browser package
- remove coverage.json when pushing build artifact to github

#### 2014.7.29
- add github basic auth for building private repo
- revamp ajax redirect in nodejs code
- integrate browser tests into main page
- add offline mode for shBuild
- add dummy failed tests in npm test for code coverage
- add file update feature for data files
- add test flag in heroku Procfile
- add caching for scripts
- migrate from unstable -> master workflow to alpha -> beta -> master workflow
- add build commit badge in README.md
- merge node-utility2-data gh-pages repo into node-utility2
- add exportBrowserScript
- replace serving msin.data.js and main.js with {{name}}.data.js and {{name}}.js
- exit build on decrypt error
- add magic to auto-config state.repoGithub and state.repoHeroku
- enable testReportUpload only through command-line

#### 2014.7.18
- add description of files in README.md
- add code coverage for saucelabs test routine
- automatically capture browser screenshots via phantomjs / slimerjs / saucelabs
- add basic auth for test-report upload
- rename exports.initLocal to exports.initSubmodule

#### 2014.7.12
- automate saucelabs testing in build

#### 2014.7.11
- add browser-side code coverage
- automate phantomjs and slimerjs headless browser testing
- implement browser-side ajax
- update browser test-report status every 1000 ms until finished
- redirect main page to test.html
- watch and auto-jslint main.js and utility2.js

#### 2014.7.3
- initial commit
