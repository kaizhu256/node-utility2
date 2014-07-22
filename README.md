utility2
==========
lightweight nodejs test and coverage utility

[![heroku.com test server](https://kaizhu256.github.io/node-utility2-data/build.travis-ci.org/latest.unstable/test-report.screenshot.heroku.png)](https://hrku01-utility2.herokuapp.com/test/test.html)

## build status
[![saucelabs.com selenium test status](https://saucelabs.com/browser-matrix/sclb01-utility2.svg)](https://saucelabs.com/u/sclb01-utility2)

 test server | test report | coverage report | build log | build artifact
:-----------:|:-----------:|:---------------:|:---------:|:--------------:
[![heroku.com test server](https://kaizhu256.github.io/public/heroku-logo-light-88x31.png)](https://hrku01-utility2.herokuapp.com/test/test.html) | [![test report](https://kaizhu256.github.io/node-utility2-data/build.travis-ci.org/latest.unstable/test-report.badge.svg)](https://kaizhu256.github.io/node-utility2-data/build.travis-ci.org/latest.unstable/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-utility2-data/build.travis-ci.org/latest.unstable/coverage-report.badge.svg)](https://kaizhu256.github.io/node-utility2-data/build.travis-ci.org/latest.unstable/coverage-report.html/node-utility2/index.html) | [![travis.ci-org build status](https://api.travis-ci.org/kaizhu256/node-utility2.svg)](https://travis-ci.org/kaizhu256/node-utility2) | [![build artifacts](https://kaizhu256.github.io/public/glyphicons_free/glyphicons/png/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-utility2-data/tree/gh-pages/build.travis-ci.org/latest.unstable)

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
/*jslint bitwise: true, indent:2, node: true*/
(function () {
  'use strict';
  var example, port, server;
  port = (Math.random() * 0xffff) | 0x8000;
  example = require('./main.js');
  console.log('example test server starting on random port ' + port);
  server = require('http').createServer(function (request, response) {
    example.serverMiddleware(request, response, function (error) {
      example.serverRespondDefault(response, error ? 500 : 404, error);
    });
  });
  // listen on the specified port
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
- minify angularjs

## changelog
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
