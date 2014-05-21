#### todo
- add example_hello.js2
- integrate angularjs into /test/test.html
- add usage documentation
- add html linter

#### 2014.05.18
- add commit message in test report
- remove test code from browser content in production mode
- add list comprehension utility2.textFormat
- add test case skip state
- add test case / platform pending state

#### 2014.05.14
- add example usage instructions to README.md
- add utility2 bin to package.json
- revamp utility2.fsWatch with onEventError2
- merge utility2_headlessPhantomjs.js into utility2.js
- revamp try catch handling in code coverage
- add chrome34 windows saucelabs test
- fix ajaxProgress display none

#### 2014.05.12
- faster browser tests
- remove qunit dependency
- remove .install/public/utility2_external.browser.css and friends

#### 2014.05.10
- fix saucelabs tests
- replace all http assets with https ones in README.md
- remove jquery and bootstrap dependency
- defer loading utility2.js in browser until utility2_external dependency is loaded
- display json data in /test/testSaucelabsHelloWorld.html
- rename utility2_external.shared.rollup.js to utility2_external.nodejs.rollup.js
- add utility2.userAgent function for getting user agent info of both browsers and nodejs

#### 2014.05.08
- auto-calculate totalPassed from testCaseList
- auto-calculate totalFailed from testCaseList
- fail remaining jobs in headlessSaucelabs
- add modeTestReportMerge for merging test report between different processes
- merge various test state items into state.testReport
- add configurable timeoutDefault in /test/test.html and headless testing
- add headless saucelabs testing

#### 2014.05.02
- add html test report artifact
- publish build artifacts even on failed npm test
- revamp code coverage file structure
- auto-detect postgres for testing
- near 100% code coverage for both linux / mac builds

#### 2014.04.22
- auto-detect slimerjs for testing
- add angularjs support
- add mocks using cached ajax responses

#### 2014.04.20
- add native code coverage artifact upload to github
- add sha hash check to prevent dbGithubBranch from updating identical files
- expand utility2 core with more extras

#### 2014.04.14
- add github db api
- add slimerjs test
- add code coverage in js2 file
- add ability to do self npm test

#### 2014.04.12
- add postgres stateOverride option for heroku apps
- verify modulePostgresNodejs with tests
- stop infinite loop in saucelabs start if file does not exist
- move modeNpmTestUtility2 flag from utility2.js to utility2.sh
- garbage collect testCallbackId in phantomjs
- merge .gitignore and .gitconfig into utility2.js2

#### 2014.04.06
- add CHANGELOG.md and utility2.sh
- colorize for failed tests
- merge evel / evalJs2 / shell
- give better explanation of why tests fail
- remove connect dependency

#### 2014.04.03
- enable sauce-connect from commandline

#### 2014.03.28
- integrate saucelabs
- add github_release file delete / upload feature
- integrating node-pre-gyp
- add codeship heroku deploy
- decouple jQuery from ajaxBrowser

#### 2014.03.21
- fix test idempotency bug caused by http agent socket pooling
- revamp untilReadyUtility2 with onEventMulti
- cache createDbTable and createPostgresTable
- integrate full-featured mimeLookup into browser
- add moduleAdminBrowser and moduleAdminNodejs
- add testWatch browser feature

#### 2014.03.19
- add nodejs.url to utility2-external

