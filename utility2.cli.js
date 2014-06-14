#!/usr/bin/env node
/*jslint browser: true, indent: 2, maxerr: 8, node: true, nomen: true, regexp: true, stupid: true*/
/*global global, required, state, utility2*/
(function moduleCoverageNodejs() {
  /*
    this nodejs module exports the coverage api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleCoverageNodejs',

    _init: function () {
      /* check if platform is nodejs */
      if (typeof global === 'object'
          && global.process
          && process.versions
          && process.versions.node) {
        local._initOnce();
      }
    },

    __init_default_test: function (onEventError) {
      /*
        this function tests _init's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { process: null, state: 0 }],
        /* test state change behavior */
        [local, { _initOnce: function () {
          global.state += 1;
        } }]
      ], function (onEventError) {
        /* test nop handling behavior */
        global.process = null;
        local._init();
        /* assert state has not changed */
        utility2.assert(global.state === 0, global.state);
        /* test default handling behavior */
        global.process = { versions: { node: true } };
        local._init();
        /* assert state has changed */
        utility2.assert(global.state === 1, global.state);
        onEventError();
      });
    },

    _initOnce: function () {
      /*
        this function inits coverage in nodejs
      */
      var tmp;
      if (global.state && state.modeCoverageInit) {
        utility2.initLocal(local);
        return;
      }
      /* init state object */
      global.state = global.state || {
        builddir: process.cwd() + '/.build',
        modeCoverageInit: 1,
        modeNodejs: true
      };
      /* init required object */
      global.required = global.required || {
        fs: require('fs'),
        path: require('path'),
        vm: require('vm')
      };
      /* init utility2 object */
      global.utility2 = required.utility2 = global.utility2 || {
        assert: console.assert,
        __dirname: __dirname,
        require: require
      };
      if (process.argv.length <= 2) {
        return;
      }
      /* init utility2 items */
      Object.keys(local).forEach(function (key) {
        if (key[0] !== '_') {
          utility2[key] = local[key];
        }
      });
      /* load package.json file */
      tmp = JSON.parse(required.fs.readFileSync(process.cwd() + '/package.json'));
      Object.keys(tmp).forEach(function (key) {
        /* merge package.json items into state object */
        state[key] = tmp[key];
      });
      /* init coverage */
      if (process.argv.indexOf('--mode-coverage') >= 0) {
        /* init state.modeCoverageRegexp */
        // state.modeCoverageRegexp = new RegExp('\\b' + state.name + '\\.');
        state.modeCoverageRegexp = new RegExp('\\b' + 'utility2' + '\\.');
        /* init __coverage__ object */
        global.__coverage__ = global.__coverage__ || {};
        /* require istanbul */
        required.istanbul = required.istanbul || utility2.require('istanbul');
        /* on exit, create coverage report */
        process.on('exit', local._coverageReportCreate);
      }
      /* cover utility2.js2 */
      local._coverageFile(utility2.__dirname + '/utility2.js2');
    },

    _coverageFile: function (file) {
      /*
        this function inits coverage for the file
      */
      var ii, script;
      script = required.fs.readFileSync(file, 'utf8');
      if (required.path.extname(file) === '.js2') {
        ii = script.indexOf('/* MODULE_BEGIN { "actionList": ["lint", "eval"],'
          + ' "file": "/public/utility2/' + required.path.basename(file).replace('.js2', '.js')
          + '" } */');
        /* preserve utility2.js2 lineno */
        script = script.slice(0, ii).replace(/.*/g, '') + script.slice(ii);
      }
      required.vm.runInThisContext(utility2.scriptInstrument(file, script), file);
    },

    _coverageReportCreate: function () {
      /*
        this function creates a coverage report in state.builddir/coverage-report
      */
      var collector;
      collector = new required.istanbul.Collector();
      collector.add(global.__coverage__);
      console.log('creating coverage report file://' + state.builddir
        + '/coverage-report/index.html');
      ['html', 'text'].forEach(function (report) {
        required.istanbul.Report
          .create(report, { dir: state.builddir + '/coverage-report' })
          .writeReport(collector, true);
      });
    },

    __coverageReportCreate_default_test: function (onEventError) {
      /*
        this function tests _coverageReportCreate's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { required: {
          istanbul: {
            Collector: function () {
              this.add = utility2.nop;
            },
            Report: { create: function () {
              return { writeReport: utility2.nop };
            } }
          }
        } }]
      ], function (onEventError) {
        local._coverageReportCreate();
        onEventError();
      });
    },

    scriptInstrument: function (file, script) {
      /*
        this function instruments the script with the given file name
      */
      var instrumenter;
      /* comment out shell shebang */
      script = script.replace(/(^#!.*)/, '//$1');
      /* check if file matches state.modeCoverageRegexp */
      if (state.modeCoverageRegexp && state.modeCoverageRegexp.test(file)) {
        console.log('scriptInstrument ' + file);
        instrumenter = new required.istanbul.Instrumenter();
        script = instrumenter.instrumentSync(script, file);
      }
      return script;
    },

    _scriptInstrument_default_test: function (onEventError) {
      /*
        this function tests scriptInstrument's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: {
          modeCoverageRegexp: /^_scriptInstrument_default_test\.js$/
        } }],
        [required, { istanbul: { Instrumenter: function () {
          this.instrumentSync = function () {
            return '';
          };
        } } }]
      ], function (onEventError) {
        var code;
        /* test coverage disabled handling behavior */
        code = utility2.scriptInstrument(
          '_.js',
          '"_scriptInstrument_default_test"'
        );
        /* assert code was not instrumented */
        utility2.assert(code === '"_scriptInstrument_default_test"', code);
        /* test coverage enabled handling behavior */
        code = utility2.scriptInstrument(
          '_scriptInstrument_default_test.js',
          '"_scriptInstrument_default_test"'
        );
        /* assert code was instrumented */
        utility2.assert(code !== '"_scriptInstrument_default_test"', code);
        onEventError();
      });
    }

  };
  local._init();
}());



(function modulePhantomjs() {
  /*
    this phantomjs module opens a webpage
  */
  'use strict';
  /*global phantom*/
  var local;
  local = {

    _name: 'utility2.modulePhantomjs',

    _init: function () {
      if (typeof phantom === 'object' && typeof window === 'object') {
        local._initPhantomjs(window, require);
      }
      if (typeof global === 'object' && global.utility2 && utility2.initLocal) {
        utility2.initLocal(local);
      }
    },

    __init_phantomjs_test: function (onEventError) {
      /*
        this function tests _init's phantomjs handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { phantom: {}, window: {} }],
        [local, { _initPhantomjs: utility2.nop }],
        [utility2, { initLocal: null }]
      ], function (onEventError) {
        local._init();
        onEventError();
      });
    },

    _initPhantomjs: function (global, require) {
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
      var require;
      utility2.testMock(onEventError, [
        [console, { error: utility2.nop }],
        [global, {
          atob: function () {
            return JSON.stringify(global.state);
          },
          phantom: { exit: utility2.nop },
          setTimeout: utility2.callArg0,
          state: { modeOpenStatus: 'success' }
        }],
        [utility2, { initLocal: null }]
      ], function (onEventError) {
        require = function (module) {
          return { system: { args: [] }, webpage: { create: function () {
            return {
              open: utility2.callArg1
            };
          } } }[module];
        };
        /* test state.modeOpenStatus === 'success' handling behavior */
        local._initPhantomjs(global, require);
        /* test state.modeOpenStatus !== 'success' handling behavior */
        state.modeOpenStatus = null;
        local._initPhantomjs(global, require);
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
