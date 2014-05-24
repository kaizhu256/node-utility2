#!/usr/bin/env node
/*jslint browser: true, indent: 2, maxerr: 8, node: true, nomen: true, regexp: true*/
/*global global, required, state, utility2*/
(function moduleCoverageNodejs() {
  /*
    this nodejs module exports the coverage api
  */
  'use strict';
  /*jslint stupid: true*/
  var local;
  local = {

    _name: 'utility2.moduleCoverageNodejs',

    _init: function () {
      /* check if platform is nodejs */
      if (typeof global === 'object'
          && global.process
          && process.versions
          && process.versions.node) {
        local._initNodejs(global);
      }
    },

    __init_nop_test: function (onEventError) {
      /*
        this function tests _init's nop handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { process: null }]
      ], function (onEventError) {
        local._init();
        onEventError();
      });
    },

    _initNodejs: function (global2) {
      /*
        this function inits code coverage in nodejs
      */
      var required, state, utility2;
      /* export global objects */
      state = global2.state = global2.state || {};
      required = global2.required = global2.required || {};
      utility2 = global2.utility2 = global2.required.utility2 = global2.utility2 || {};
      /* export require */
      utility2.require = utility2.require || require;
      /* require builtin nodejs modules */
      [
        'child_process', 'crypto',
        'fs',
        'http', 'https',
        'module',
        'os',
        'path',
        'repl',
        'stream',
        'url',
        'util',
        'vm'
      ].forEach(function (module) {
        required[module] = required[module] || utility2.require(module);
      });
      /* export utility2.assert */
      utility2.assert = utility2.assert || console.assert;
      /* export utility2.__dirname */
      process.env.UTILITY2_DIR = utility2.__dirname = utility2.__dirname || __dirname;
      /* export utility2 objects */
      Object.keys(local).forEach(function (key) {
        if (key[0] !== '_') {
          utility2[key] = local[key];
        }
      });
      switch (state.modeCoverageInit || 0) {
      /* load utility2.js with code coverage */
      case 0:
        local._initOnceUtility2Js(global2);
        break;
      /* load utility2.js2 with code coverage */
      case 1:
        local._initOnceUtility2Js2(global2);
        break;
      /* initModule */
      default:
        utility2.initModule(module, local);
      }
    },

    __initNodejs_init_test: function (onEventError) {
      /*
        this function tests _initNodejs's init handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { __dirname: null, require: utility2.nop }],
        [local, { _initOnceUtility2Js: utility2.nop }]
      ], function (onEventError) {
        var global2;
        global2 = {};
        /* init local._initNodejs with blank global2 state */
        local._initNodejs(global2);
        /* assert global2.required was created */
        utility2.assert(global2.required, global2);
        /* assert global2.state was created */
        utility2.assert(global2.state, global2);
        /* assert global2.utility2 was created */
        utility2.assert(global2.utility2, global2);
        onEventError();
      });
    },

    _initOnceCli: function () {
      var tmp, value;
      /* init state.fsDirBuild */
      state.fsDirBuild = state.fsDirBuild || process.cwd() + '/.build';
      /* load package.json file */
      state.packageJson = state.packageJson || {};
      try {
        state.packageJson = JSON.parse(required.fs.readFileSync(process.cwd()
          + '/package.json'));
        state.packageJson.versionShort = state.packageJson.version.replace((/-.*/), '');
      } catch (ignore) {
      }
      switch (state.modeCli) {
      case 'exportEnv':
        tmp = {
          NODEJS_PROCESS_PID: process.pid,
          UTILITY2_DIR: utility2.__dirname
        };
        /* save process vars to env */
        ['argv', 'cwd', 'pid', 'platform', 'versions'].forEach(function (key) {
          value = process[key];
          /* traverse down one level for sub-dict */
          if (typeof value === 'object') {
            Object.keys(value).forEach(function (key2) {
              tmp['NODEJS_PROCESS_' + key.toUpperCase() + '_' + key2.toUpperCase()]
                = String(value[key2]);
            });
          } else {
            tmp['NODEJS_PROCESS_' + key.toUpperCase()]
              /* set value to return value of function */
              = String(typeof value === 'function' ? value() : value);
          }
        });
        /* save package.json vars to env */
        Object.keys(state.packageJson).forEach(function (key) {
          value = state.packageJson[key];
          if (typeof value === 'string') {
            tmp['NODEJS_PACKAGE_JSON_' + key.toUpperCase()] = value;
          }
        });
        /* export env */
        console.log(Object.keys(tmp).sort().map(function (key) {
          return 'export ' + key + '=' + JSON.stringify(tmp[key]);
        }).join(' && '));
        process.exit();
        break;
      }
    },

    __initOnceCli_default_test: function (onEventError) {
      /*
        this function tests _initOnceCli's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, {
          /* test state.modeCoverageRegexp handling behavior */
          process: { argv: [null], cwd: utility2.nop, exit: null },
          state: { modeCli: 'exportEnv' }
        }],
        [required, {
          fs: { readFileSync: function () {
            /* test state.packageJson handling behavior */
            return '{"aa":"bb","cc":null}';
          } }
        }]
      ], function (onEventError) {
        process.exit = onEventError;
        local._initOnceCli();
      });
    },

    _initOnceCoverage: function () {
      /*
        this function inits code coverage
      */
      if (!state.modeCoverageRegexp) {
        return;
      }
      global.__coverage__ = global.__coverage__ || {};
      /* init istanbul */
      required.istanbul = required.istanbul || utility2.require('istanbul');
      /* init code coverage require hook */
      required.istanbul.hook.hookRequire(
        utility2.coverageInstrumentFileCheck,
        function (code, file) {
          return utility2.coverageInstrumentFileCode(file, code);
        }
      );
      /* on exit, create code coverage report */
      process.on('exit', local._coverageReportGenerate);
    },

    __initOnceCoverage_default_test: function (onEventError) {
      /*
        this function tests _initOnceCoverage's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, {
          __coverage__: null,
          process: { on: utility2.nop },
          state: { modeCoverageRegexp: null }
        }],
        [required, { istanbul: null }],
        [utility2, {
          coverageInstrumentFileCode: utility2.nop,
          __filename: null,
          /* test required.istanbul.hook.hookRequire handling behavior */
          require: function () {
            return { hook: { hookRequire: utility2.applyArgList1([]) } };
          }
        }]
      ], function (onEventError) {
        /* test no code coverage handling behavior */
        local._initOnceCoverage();
        /* test code coverage handling behavior */
        state.modeCoverageRegexp = true;
        local._initOnceCoverage();
        /* assert required.istanbul exists */
        utility2.assert(required.istanbul, required.istanbul);
        onEventError();
      });
    },

    _initOnceUtility2Js: function () {
      /*
        this function loads utility2.js with code coverage
      */
      var match;
      state.modeCoverageInit = 1;
      state.loadModule = utility2.__dirname + '/utility2.js';
      /* parse process.argv */
      process.argv.forEach(function (arg) {
        /* get --load-module arg */
        match = (/^--load-module=(.+)/).exec(arg);
        if (match) {
          state.loadModule = match[1];
        }
        /* get --mode-cli arg */
        match = (/^--mode-cli=(.+)/).exec(arg);
        if (match) {
          state.modeCli = match[1];
        }
        /* get --mode-coverage arg */
        match = (/^--mode-coverage=(.+)/).exec(arg);
        if (match) {
          state.modeCoverageRegexp = new RegExp(match[1]);
        }
      });
      /* init cli mode */
      local._initOnceCli();
      /* init code coverage */
      local._initOnceCoverage();
      /* load utility2.js with code coverage */
      utility2.__filename = utility2.__filename || utility2.__dirname + '/utility2.js';
      required.fs.readFile(utility2.__filename, 'utf8', function (error, data) {
        /* assert no error occurred */
        utility2.assert(!error, error);
        required.vm.runInThisContext(
          utility2.coverageInstrumentFileCode(utility2.__filename, '//' + data),
          utility2.__filename
        );
      });
    },

    __initOnceUtility2Js_default_test: function (onEventError) {
      /*
        this function tests _initOnceUtility2Js's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, {
          /* test various process.argv options handling behavior */
          process: { argv: ['node', '--mode-cli=1', '--load-module=1', '--mode-coverage=1'] },
          state: { loadModule: null, modeCoverageInit: null }
        }],
        [local, {
          _initOnceCli: utility2.nop,
          _initOnceCoverage: utility2.nop,
          _initOnceUtility2Js: local._initOnceUtility2Js
        }],
        [required, {
          fs: { readFile: utility2.applyArgList2([]) },
          vm: { runInThisContext: utility2.nop }
        }],
        [utility2, { __filename: null }]
      ], function (onEventError) {
        local._initOnceUtility2Js();
        /* assert state.modeCoverageInit === 1 */
        utility2.assert(state.modeCoverageInit === 1, state.modeCoverageInit);
        /* assert state.modeCoverageRegexp exists */
        utility2.assert(state.modeCoverageRegexp, state.modeCoverageRegexp);
        onEventError();
      });
    },

    _initOnceUtility2Js2: function () {
      /*
        this function loads utility2.js2 with code coverage
      */
      var ii, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error, data) {
        /* assert no error occurred */
        utility2.assert(!error, error);
        mode += 1;
        switch (mode) {
        case 1:
          /* load utility2.js2 */
          required.fs.readFile(utility2.__filename + 2, 'utf8', onEventError2);
          break;
        case 2:
          ii = data.indexOf('/* MODULE_BEGIN { "actionList": ["lint", "eval"],'
            + ' "file": "/public/file/utility2.js" } */');
          /* preserve utility2.js2 lineno */
          data = data.slice(0, ii).replace(/.*/g, '') + data.slice(ii);
          required.vm.runInThisContext(
            utility2.coverageInstrumentFileCode(utility2.__filename + 2, data),
            utility2.__filename + 2
          );
          state.modeCoverageInit += 1;
          utility2.fsWatch({
            actionList: ['lint', 'eval'],
            file: state.loadModule
          }, onEventError2);
          break;
        case 3:
          /* watch files */
          utility2.fsWatch({
            actionList: ['lint', 'eval'],
            file: utility2.__dirname + '/utility2.js2'
          }, utility2.onEventErrorDefault);
          /* initModule */
          local._init();
          break;
        }
      };
      onEventError2();
    },

    coverageInstrumentFileCheck: function (file) {
      /*
        this function checks to see if the file should be instrumented or not
      */
      return state.modeCoverageRegexp && state.modeCoverageRegexp.test(file);
    },

    coverageInstrumentFileCode: function (file, code) {
      /*
        this function instruments the code with the given file name
      */
      var instrumenter;
      /* check if file matches state.modeCoverageRegexp */
      if (utility2.coverageInstrumentFileCheck(file)) {
        utility2.jsonLog('coverageInstrumentFileCode ' + file);
        instrumenter = new required.istanbul.Instrumenter();
        code = instrumenter.instrumentSync(code, file);
      }
      return code;
    },

    _coverageInstrumentFileCode_default_test: function (onEventError) {
      /*
        this function tests coverageInstrumentFileCode's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: {
          modeCoverageRegexp: /^_coverageInstrumentFileCode_default_test\.js$/
        } }],
        [required, { istanbul: { Instrumenter: function () {
          this.instrumentSync = function () {
            return '';
          };
        } } }]
      ], function (onEventError) {
        var code;
        /* test no code coverage handling behavior */
        code = utility2.coverageInstrumentFileCode(
          '_.js',
          '"_coverageInstrumentFileCode_default_test"'
        );
        /* assert code was not instrumented */
        utility2.assert(code === '"_coverageInstrumentFileCode_default_test"', code);
        /* test code coverage handling behavior */
        code = utility2.coverageInstrumentFileCode(
          '_coverageInstrumentFileCode_default_test.js',
          '"_coverageInstrumentFileCode_default_test"'
        );
        /* assert code was instrumented */
        utility2.assert(code !== '"_coverageInstrumentFileCode_default_test"', code);
        onEventError();
      });
    },

    _coverageReportGenerate: function () {
      /*
        this function generates a code coverage report when nodejs exits
      */
      var collector, data;
      collector = new required.istanbul.Collector();
      collector.add(global.__coverage__);
      /* save lcov and html report */
      utility2.jsonLog('generating code report file://' + state.fsDirBuild
        + '/coverage-report/index.html');
      required.istanbul.Report
        .create('lcov', { dir: state.fsDirBuild })
        .writeReport(collector, true);
      /* print text report */
      required.istanbul.Report
        .create('text')
        .writeReport(collector);
      /* save cobertura report */
      required.istanbul.Report
        .create('cobertura', { dir: state.fsDirBuild })
        .writeReport(collector, true);
      /* remove old coverage-report */
      utility2.tryCatch(function () {
        required.fs.renameSync(
          state.fsDirBuild + '/coverage-report',
          state.tmpdir + '/cache/' + utility2.uuid4()
        );
      }, utility2.nop);
      /* rename coverage files */
      [
        ['lcov-report', 'coverage-report'],
        ['cobertura-coverage.xml', 'coverage-report/coverage-report.cobertura.xml'],
        ['lcov.info', 'coverage-report/coverage-report.lcov.info']
      ].forEach(function (rename) {
        required.fs.renameSync(
          state.fsDirBuild + '/' + rename[0],
          state.fsDirBuild + '/' + rename[1]
        );
      });
      /* get coverage percentage from cobertura report */
      data = required.fs.readFileSync(
        state.fsDirBuild + '/coverage-report/coverage-report.cobertura.xml',
        'utf8'
      );
      data = Number((/\bline-rate="([^"]+)"/).exec(data)[1]);
      /* create coverage badge */
      data = state.fsWatchDict['/test/modeAjaxOffline/https%3A%2F%2Fimg.shields.io'
        + '%2Fbadge%2Fcoverage-100.0%25-00dd00.svg%3Fstyle%3Dflat%23GET'].contentBrowser
        .replace('100.0', (100 * data).toFixed(1))
        .replace('0d0', ('0' + Math.round((1 - data) * 221).toString(16)).slice(-2)
          + ('0' + Math.round(data * 221).toString(16)).slice(-2)
          + '00');
      /* write coverage badge */
      required.fs.writeFileSync(
        state.fsDirBuild + '/coverage-report/coverage-report.badge.svg',
        data
      );
    },

    __coverageReportGenerate_default_test: function (onEventError) {
      /*
        this function tests _coverageReportGenerate's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: {
          fsWatchDict: {
            '/test/modeAjaxOffline/https%3A%2F%2Fimg.shields.io%2Fbadge%2Fcoverage-100.0%25-00dd00.svg%3Fstyle%3Dflat%23GET': {
              contentBrowser: ''
            }
          }
        } }],
        [required, {
          fs: {
            readFileSync: function () {
              return 'line-rate="0"';
            },
            renameSync: utility2.nop,
            writeFileSync: utility2.nop
          },
          istanbul: {
            Collector: function () {
              this.add = utility2.nop;
            },
            Report: { create: function () {
              return { writeReport: utility2.nop };
            } }
          }
        }]
      ], function (onEventError) {
        local._coverageReportGenerate();
        onEventError();
      });
    },

    jsonLog: function (arg) {
      /*
        this function is a stub for the real function
      */
      console.log(arg);
    }

  };
  local._init();
}());



(function moduleHeadlessPhantomjs() {
  /*
    this phantomjs module opens a webpage
  */
  'use strict';
  /*global phantom*/
  var local;
  local = {

    _name: 'utility2.moduleHeadlessPhantomjs',

    _init: function () {
      if (typeof phantom === 'object' && typeof window === 'object') {
        local._initPhantomjs(window);
      }
      if (typeof global === 'object' && global.utility2 && utility2.initModule) {
        utility2.initModule(module, local);
      }
    },

    __init_phantomjs_test: function (onEventError) {
      /*
        this function tests _init's phantomjs handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { phantom: {}, window: {} }],
        [local, { _initPhantomjs: utility2.nop }],
        [utility2, { initModule: null }]
      ], function (onEventError) {
        local._init();
        onEventError();
      });
    },

    _initPhantomjs: function (global) {
      var page;
      /* phantomjs error handling - http://phantomjs.org/api/phantom/handler/on-error.html */
      phantom.onError = function (msg, trace) {
        var msgStack = ['PHANTOM ERROR: ' + msg];
        if (trace && trace.length) {
          msgStack.push('PHANTOM TRACE:');
          trace.forEach(function (t) {
            msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line
              + (t.function ? ' (in function ' + t.function + ')' : ''));
          });
        }
        console.error('\n\n\n\n' + msgStack.join('\n') + '\n');
        phantom.exit(1);
      };
      /* init state object */
      global.state = JSON.parse(global.atob(require('system').args[1]));
      /* set timeout for phantomjs */
      setTimeout(function () {
        if (state.modeOpenStatus !== 'success') {
          console.error('phantomjs - timeout', state.modeOpenStatus, state.url);
        }
        phantom.exit();
      }, Number(state.timeoutDefault) || 300000);
      page = state.page = require('webpage').create();
      /* page error handling - http://phantomjs.org/api/webpage/handler/on-error.html */
      page.onError = function (msg, trace) {
        var msgStack = ['ERROR: ' + msg];
        if (trace && trace.length) {
          msgStack.push('TRACE:');
          trace.forEach(function (t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line
              + (t.function ? ' (in function "' + t.function + '")' : ''));
          });
        }
        console.error('\n\n\n\n' + msgStack.join('\n') + '\n');
      };
      /* pipe page's console.log to stdout */
      page.onConsoleMessage = function () {
        console.log.apply(console, arguments);
      };
      /* open requested webpage */
      page.open(state.url, function (status) {
        state.modeOpenStatus = status;
        console.log('phantomjs - opened', status, state.url);
      });
    },

    __initPhantomjs_default_test: function (onEventError) {
      /*
        this function tests _initPhantomjs's default handling behavior
      */
      utility2.testMock(onEventError, [
        [console, { error: utility2.nop }],
        [global, {
          atob: function () {
            return JSON.stringify(global.state);
          },
          phantom: { exit: utility2.nop },
          require: function (module) {
            return { system: { args: [] }, webpage: { create: function () {
              return {
                open: utility2.applyArgList1([])
              };
            } } }[module];
          },
          setTimeout: utility2.applyArgList0([]),
          state: null
        }],
        [utility2, { initModule: null }]
      ], function (onEventError) {
        /* test state.modeOpenStatus !== 'success' handling behavior */
        global.state = { modeOpenStatus: null };
        local._initPhantomjs(global);
        /* test state.modeOpenStatus === 'success' handling behavior */
        global.state = { modeOpenStatus: 'success' };
        local._initPhantomjs(global);
        /* test page.onConsoleMessage handling behavior */
        global.state.page.onConsoleMessage();
        /* test page.onError with no trace handling behavior */
        global.state.page.onError();
        /* test page.onError with trace handling behavior */
        global.state.page.onError(null, [{}, { function: true }]);
        /* test phantom.onError with no trace handling behavior */
        global.phantom.onError();
        /* test phantom.onError with trace handling behavior */
        global.phantom.onError(null, [{}, { function: true }]);
        onEventError();
      });
    }

  };
  local._init();
}());
