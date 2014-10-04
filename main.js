#!/usr/bin/env node
/*jslint
  bitwise: true, browser: true,
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  regexp: true,
  stupid: true,
  todo: true
*/
// declare module vars
var exports, required, state, stateRestore;
stateRestore = function (state2) {
  /*
    this function is used by testMock to restore the local state var
  */
  'use strict';
  state = state2;
};



(function submoduleMainNodejs() {
  /*
    this nodejs submodule exports the main api
  */
  'use strict';
  var local = {
    _name: 'main.submoduleMainNodejs',

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



(function submoduleMainBrowser() {
  /*
    this browser submodule exports the main api
  */
  'use strict';
  var local = {
    _name: 'main.submoduleMainBrowser',

    _init: function () {
      /*
        this function inits the submodule
      */
      if (state.modeNodejs) {
        return;
      }
      // init this submodule
      exports.initSubmodule(local);
    },

    ngApp_main_controller_MainController: ['$scope', function ($scope) {
      /*
        this function inits the main angularjs controller
      */
      // export $scope to local object for testing
      local._$scope = $scope;
      exports.setDefault($scope, {
        exampleModel: 'hello model',
        exampleMethod: function () {
          /*
            this function jslint's the script in the main textarea
          */
          $scope.exampleModel = 'bye model';
        }
      });
    }],

    _ngApp_main_controller_MainController_default_test: function (onEventError) {
      /*
        this function tests ngApp_main_controller_MainController's default handling behavior
      */
      var $scope;
      $scope = state.scope = local._$scope;
      $scope.exampleMethod();
      // validate $scope.exampleModel
      exports.assert($scope.exampleModel === 'bye model', $scope.exampleModel);
      onEventError();
    }

  };
  local._init();
}());
