utility2 [![npm version](https://img.shields.io/npm/v/utility2.svg?style=flat)](https://npmjs.org/package/utility2)
========
#### nodejs test and coverage utility
## build status
[![saucelabs.com selenium test status](https://saucelabs.com/browser-matrix/utility2-kaizhu256.svg)](https://saucelabs.com/u/utility2-kaizhu256)

 test server | test report | coverage report | build log | build artifact
:-----------:|:-----------:|:---------------:|:---------:|:--------------:
[![heroku.com test server](https://d1lpkba4w1baqt.cloudfront.net/heroku-logo-light-88x31.png)](https://utility2.herokuapp.com/test/test.html) | [![utility2 test report](https://kaizhu256.github.io/utility2/build.travis-ci.org/latest.unstable/test-report.badge.svg)](https://kaizhu256.github.io/utility2/build.travis-ci.org/latest.unstable/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/utility2/build.travis-ci.org/latest.unstable/coverage-report/coverage-report.badge.svg)](https://kaizhu256.github.io/utility2/build.travis-ci.org/latest.unstable/coverage-report/utility2/index.html) | [![travis.ci-org build status](https://api.travis-ci.org/kaizhu256/utility2.svg?branch=unstable)](https://travis-ci.org/kaizhu256/utility2?branch=unstable) | [![build artifacts](https://kaizhu256.github.io/public/file/glyphicons_free/glyphicons/png/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/utility2/tree/gh-pages/build.travis-ci.org/latest.unstable)



## installation and usage example

#### installation
```
npm install -g utility2
```

#### quickstart - create new build project
- https://github.com/kaizhu256/utility2/wiki/quickstart

#### start interactive sandbox server
```
utility2 start --server-port=8080
> serverListen - listening on port 8080
> /* open http://localhost:8080 in browser */
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
- https://github.com/kaizhu256/utility2/blob/unstable/CHANGELOG.md



## admin
- [edit README.md](https://github.com/kaizhu256/utility2/edit/gh-pages/README.md)
- counter 3
