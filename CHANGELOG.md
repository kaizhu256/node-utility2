#### todo
- print to stdout build artifacts that fail to upload to github
- allow saucelabs testing of deployed gh-pages
- replace utility2.callArgListX with simpler utility2.callArgX
- add usage documentation
- add html linter

#### 2014.6.6
- reintroduce CHANGELOG.md
- remove deadcode for npm post-publish
- merge .aes-encrypted.sh into .travis.yml
- combine iphone with osx and android with linux to speed up testing

#### 2014.6.1 - 39b322499377028937a836f23c57af484059f7ce
- disable loading icon on README.md when building, due to github caching issues
- remove phantomjs and slimerjs npm dependencies
- add shTravisEncrypt shell function
- change to new versioning scheme
- add semverGreaterThan comparison operator in utility2.sh for testing whether to npm publish

#### 2014.5.26
- move encrypted content from utility2.js2 to separate file .aes-encrypted.sh
- add aes-encrypt-credential encryption tool
- merge browser testing / npm publish / npm package testing into a single build
- update README.md with loading icons for test / coverage reports when building
- auto test latest npm package in ci-build
- deploy to utility2.herokuapp.com instead of utility2-unstable.herokuapp.com
- update saucelabs job's pass / fail status after attempting recovery
- add fault tolerance to recover from saucelabs internal errors
- merge .encrypted file into utility2.js2
- update shAesDecrypt / shAesEncrypt to full base64 input / output in utility2.sh
- add state.modeUtility2Update feature which will update utility2 from github for specified branch

#### 2014.5.20
- remove postgres dead code
- refine build script api for external apps
- automate saucelabs testing for multi-platform for external apps
- automate build upload to github for external apps
- add _Branch_prototype_branchMerge for moduleDbGithubNodejs
- rename utility2_external to utility2-external

#### 2014.5.18
- add commit message in test report
- remove test code from browser content in production mode
- add list comprehension utility2.textFormat
- add test case skip state
- add test case / platform pending state

#### 2014.5.14
- add example usage instructions to README.md
- add utility2 bin to package.json
- revamp utility2.fsWatch with onEventError2
- merge utility2_headlessPhantomjs.js into utility2.js
- revamp try catch handling in code coverage
- add chrome34 windows saucelabs test
- fix ajaxProgress display none

#### 2014.5.12
- faster browser tests
- remove qunit dependency
- remove .install/public/utility2_external.browser.css and friends

#### 2014.5.10
- fix saucelabs tests
- replace all http assets with https ones in README.md
- remove jquery and bootstrap dependency
- defer loading utility2.js in browser until utility2_external dependency is loaded
- display json data in /test/testSaucelabsHelloWorld.html
- rename utility2_external.shared.rollup.js to utility2_external.nodejs.rollup.js
- add utility2.userAgent function for getting user agent info of both browsers and nodejs

#### 2014.5.8
- auto-calculate totalPassed from testCaseList
- auto-calculate totalFailed from testCaseList
- fail remaining jobs in headlessSaucelabs
- add modeTestReportMerge for merging test report between different processes
- merge various test state items into state.testReport
- add configurable timeoutDefault in /test/test.html and headless testing
- add headless saucelabs testing

#### 2014.5.2
- add html test report artifact
- publish build artifacts even on failed npm test
- revamp code coverage file structure
- auto-detect postgres for testing
- near 100% code coverage for both linux / mac builds

#### 2014.4.22
- auto-detect slimerjs for testing
- add angularjs support
- add mocks using cached ajax responses

#### 2014.4.20
- add native code coverage artifact upload to github
- add sha hash check to prevent dbGithubBranch from updating identical files
- expand utility2 core with more extras

#### 2014.4.14
- add github db api
- add slimerjs test
- add code coverage in js2 file
- add ability to do self npm test

#### 2014.4.12
- add postgres stateOverride option for heroku apps
- verify modulePostgresNodejs with tests
- stop infinite loop in saucelabs start if file does not exist
- move modeNpmTestUtility2 flag from utility2.js to utility2.sh
- garbage collect testCallbackId in phantomjs
- merge .gitignore and .gitconfig into utility2.js2

#### 2014.4.6
- add CHANGELOG.md and utility2.sh
- colorize for failed tests
- merge evel / evalJs2 / shell
- give better explanation of why tests fail
- remove connect dependency

#### 2014.4.3
- enable sauce-connect from commandline

#### 2014.3.28
- integrate saucelabs
- add github_release file delete / upload feature
- integrating node-pre-gyp
- add codeship heroku deploy
- decouple jQuery from ajaxBrowser

#### 2014.3.21
- fix test idempotency bug caused by http agent socket pooling
- revamp untilReadyUtility2 with onEventMulti
- cache createDbTable and createPostgresTable
- integrate full-featured mimeLookup into browser
- add moduleAdminBrowser and moduleAdminNodejs
- add testWatch browser feature

#### 2014.3.19
- add nodejs.url to utility2-external
