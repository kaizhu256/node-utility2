#### todo
- add html linter
- auto-remove test functions from module in production mode
- add heroku dynamic config server
- integrate forever-webui

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

