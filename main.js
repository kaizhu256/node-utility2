#!/usr/bin/env node
/*jslint bitwise: true, browser: true, indent:2, node: true, nomen: true, regexp: true, stupid: true*/
// declare module vars
var exports, required, state;



(function submoduleUtility2Nodejs() {
  /*
    this nodejs submodule exports the utility2 api
  */
  'use strict';
  var local = {
    _name: 'proxy-lite.submoduleUtility2Nodejs',

    _init: function () {
      /*
        this function inits the submodule
      */
      // init export object
      exports = module.exports = require(__dirname + '/utility2.js');
      // export __dirname
      exports.__dirname = __dirname;
      // export __filename
      exports.__filename = __filename;
      // init this submodule
      exports.initSubmodule(local);
      // init required object
      required = exports.required;
      // init state object
      state = exports.state;
    }

  };
  local._init();
}());
