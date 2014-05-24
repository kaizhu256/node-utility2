# utility2 [![npm version](https://img.shields.io/npm/v/utility2.svg?style=flat)](https://npmjs.org/package/utility2)
#### nodejs test and code coverage utility

## build status
[![saucelabs.com selenium test status](https://saucelabs.com/browser-matrix/utility2-kaizhu256.svg)](https://saucelabs.com/u/utility2-kaizhu256)

 platform | test report | code coverage report
:--------:|:-----------:|:--------------------:
linux on [![codeship.io build status](https://www.codeship.io/projects/6d1392c0-94e7-0131-971e-16be0a303db9/status?branch=unstable)](https://www.codeship.io/projects/16743?branch=unstable) | [![utility2 test status](https://kaizhu256.github.io/utility2/utility2.build.codeship.io/latest.unstable/test-report.badge.svg)](https://kaizhu256.github.io/utility2/utility2.build.codeship.io/latest.unstable/test-report.html) | [![istanbul code coverage status](https://kaizhu256.github.io/utility2/utility2.build.codeship.io/latest.unstable/coverage-report/coverage-report.badge.svg)](https://kaizhu256.github.io/utility2/utility2.build.codeship.io/latest.unstable/coverage-report/utility2/index.html)
osx on [![travis.ci-org build status](https://api.travis-ci.org/kaizhu256/utility2.svg?branch=unstable)](https://travis-ci.org/kaizhu256/utility2?branch=unstable) | [![utility2 test status](https://kaizhu256.github.io/utility2/utility2.build.travis-ci.org/latest.unstable/test-report.badge.svg)](https://kaizhu256.github.io/utility2/utility2.build.travis-ci.org/latest.unstable/test-report.html) | [![istanbul code coverage status](https://kaizhu256.github.io/utility2/utility2.build.travis-ci.org/latest.unstable/coverage-report/coverage-report.badge.svg)](https://kaizhu256.github.io/utility2/utility2.build.travis-ci.org/latest.unstable/coverage-report/utility2/index.html)
browser on [![saucelabs selenium test status](https://saucelabs.com/buildstatus/utility2-kaizhu256)](https://saucelabs.com/u/utility2-kaizhu256) | [![utility2 test status](https://kaizhu256.github.io/utility2/utility2.build.codeship.io/latest.browser/test-report.badge.svg)](https://kaizhu256.github.io/utility2/utility2.build.codeship.io/latest.browser/test-report.html) | n/a

## build artifacts
- [https://github.com/kaizhu256/utility2/tree/gh-pages](https://github.com/kaizhu256/utility2/tree/gh-pages)
- [https://github.com/kaizhu256/utility2/tree/gh-pages/utility2.build.codeship.io](https://github.com/kaizhu256/utility2/tree/gh-pages/utility2.build.codeship.io)
- [https://github.com/kaizhu256/utility2/tree/gh-pages/utility2.build.travis-ci.org](https://github.com/kaizhu256/utility2/tree/gh-pages/utility2.build.travis-ci.org)

## build test server
- [https://utility2-unstable.herokuapp.com/test/test.html#modeTest=1](https://utility2-unstable.herokuapp.com/test/test.html#modeTest=1)

## installation and example usage
#### installation
```
npm install -g utility2
```
#### debug interactive test server
```
utility2 start --server-port=8080
> serverListen - listening on port 8080
> /* open http://localhost:8080#modeTest=1 in browser */
> /* inspect state.debugServerResponse */
> state.debugServerResponse
{
  "_events": { "finish": [[]] },
  "_hangupClose": false,
  "_hasBody": true,
  "_header": "HTTP/1.1 200 OK\r\ncontent-type: text/html\r\n\r\n",
  "_headerNames": { "content-type": "content-type" },
  "_headerSent": true,
  "_headers": { "content-type": "text/html" },
  "_last": false,
  "_maxListeners": 10,
  "_trailer": "",
  "chunkedEncoding": true,
  "connection": null,
  "domain": null,
  "finished": true,
  "output": [],
  "outputEncodings": [],
  "sendDate": true,
  "shouldKeepAlive": true,
  "socket": null,
  "statusCode": 200,
  "useChunkedEncodingByDefault": true,
  "writable": true
}
```

## changelog
- [https://github.com/kaizhu256/utility2/blob/unstable/CHANGELOG.md](https://github.com/kaizhu256/utility2/blob/unstable/CHANGELOG.md)

