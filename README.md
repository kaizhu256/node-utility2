utility2
==========
lightweight nodejs / browser test and coverage utility

[![heroku.com test server](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/test-report.screenshot.heroku.png)](https://hrku01-utility2-beta.herokuapp.com/test/test.html)



## build status ![build commit](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/commit.badge.svg) [![travis.ci-org build status](https://api.travis-ci.org/kaizhu256/node-utility2.svg)](https://travis-ci.org/kaizhu256/node-utility2)

[![saucelabs.com selenium test status](https://saucelabs.com/browser-matrix/sclb01-utility2.svg)](https://saucelabs.com/u/sclb01-utility2)

 branch | test server | test report | coverage report | build artifact
:------:|:-----------:|:-----------:|:---------------:|:--------------:
master | [![heroku.com test server](https://kaizhu256.github.io/public/heroku-logo-light-88x31.png)](https://hrku01-utility2.herokuapp.com/test/test.html) | [![test report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/master/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/public/glyphicons_free/glyphicons/png/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/master)
beta | [![heroku.com test server](https://kaizhu256.github.io/public/heroku-logo-light-88x31.png)](https://hrku01-utility2-beta.herokuapp.com/test/test.html) | [![test report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/beta/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/public/glyphicons_free/glyphicons/png/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/beta)
alpha | [![heroku.com test server](https://kaizhu256.github.io/public/heroku-logo-light-88x31.png)](https://hrku01-utility2-alpha.herokuapp.com/test/test.html) | [![test report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2/build.travis-ci.org/alpha/coverage-report.html/node-utility2/index.html) | [![build artifacts](https://kaizhu256.github.io/public/glyphicons_free/glyphicons/png/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2/tree/gh-pages/build.travis-ci.org/alpha)



## quickstart
```
npm install utility2
cd node_modules/utility2
## start utility2 server on port 8080
npm start --server-port=8080
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
  // create random port in the inclusive range 0x8000 - 0xffff
  port = (Math.random() * 0xffff) | 0x8000;
  try {
    utility2 = require('utility2');
  } catch (error) {
    utility2 = require('./main.js');
  }
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
- .travis.yml
  - travis-ci config file
  - can contain encrypted credentials used by travis-ci to
    - deploy to heroku after passing npm test
    - run saucelabs browser tests on deployed heroku server
    - publish this app to npm registry after passing browser tests,
      and detecting a version change in package.json
    - upload tests / coverages / screenshots to a separate github build repo
- README.md
  - readme file
- example.js
  - example nodejs script demonstrating how to use this app
- main.data
  - data file containing embedded resources specific to this app
- main.js
  - this app's main program / library
  - may contain features and utilities provided by utility2.js
- package.json
  - npm config file
- utility2.data
  - data file containing embedded resources used by travis-ci
- utility2.js
  - nodejs build script used by travis-ci
- utility2.sh
  - shell build script used by travis-ci
  - can
    - run npm test with integrated phantomjs / slimerjs browser testing
    - deploy to heroku after passing npm test
    - run saucelabs browser tests on deployed heroku server
    - publish this app to npm registry after passing browser tests,
      and detecting a version change in package.json
    - npm install and test the published app in a clean environment
    - upload tests / coverages / screenshots to a separate github build repo



## todo
- add test flag in heroku Procfile
- simulate real test failure in npm test for code coverage
- add server stress test using phantomjs
- modularize shBuild
- implement proper promise in browser init
- add caching for scripts
- replace external istanbul dependency with istanbul-lite
- add file update feature for data files
- minify /public/main.data.js and /public/utility2.data.js



## changelog
#### 2014.7.29
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
- add basic auth for test report upload
- rename exports.initLocal to exports.initSubmodule

#### 2014.7.12
- automate saucelabs testing in build

#### 2014.7.11
- add browser-side code coverage
- automate phantomjs and slimerjs headless browser testing
- implement browser-side ajax
- update browser test report status every 1000 ms until finished
- redirect main page to test.html
- watch and auto-jslint main.js and utility2.js

#### 2014.7.3
- initial commit
