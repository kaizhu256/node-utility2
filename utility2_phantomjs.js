/*jslint indent: 2, node: true, nomen: true*/
(function moduleInitPhantomjs() {
  /*
    this phantomjs module opens a webpage
  */
  'use strict';
  var local;
  local = {

    _init: function () {
      var page, state;
      /* init state object */
      state = JSON.parse(global.atob(require('system').args[1]));
      /* assert state.timeoutDefault is finite number */
      local.assert(isFinite(Number(state.timeoutDefault)));
      /* set timeout */
      setTimeout(function () {
        if (state.modeOpenStatus !== 'success') {
          console.error('phantomjs - timeout', state.modeOpenStatus, state.url);
        }
        global.phantom.exit();
      }, state.timeoutDefault);
      /* open requested webpage */
      page = require('webpage').create();
      page.onConsoleMessage = function () {
        console.log.apply(console, arguments);
      };
      page.open(state.url, function (status) {
        state.modeOpenStatus = status;
        console.log('phantomjs - opened', status, state.url);
      });
    },

    assert: function (passed, message) {
      /*
        this function throws an error if the assertion fails
      */
      if (!passed) {
        setTimeout(function () {
          global.phantom.exit(1);
        });
        throw new Error(message ? 'assertion error - ' + message : 'assertion error');
      }
    }

  };
  local._init();
}());
