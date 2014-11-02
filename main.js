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
var mainApp;



(function submoduleMainNodejs() {
  /*
    this nodejs submodule exports the main api
  */
  'use strict';
  var local = {
    _name: 'main.submoduleMainNodejs',

    _init: function () {
      /*
        this function inits this submodule
      */
      // init main app
      mainApp = module.exports = require(__dirname + '/utility2.js');
      // init this submodule
      mainApp.initSubmodule(local);
      // run nodejs tests
      if (mainApp.modeNpmTest) {
        setTimeout(mainApp.testRun);
      }
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
        this function inits this submodule
      */
      if (mainApp.modeNodejs) {
        return;
      }
      // init this submodule
      mainApp.initSubmodule(local);
      // run browser tests
      if (mainApp.modeTest) {
        window.addEventListener('load', mainApp.testRun);
      }
    },

    ngApp_main_controller_MainController: ['$scope', function ($scope) {
      /*
        this function inits the main angularjs controller
      */
      // export $scope to local object for testing
      local._$scope = $scope;
      mainApp.setDefault($scope, {
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
      $scope = mainApp.scope = local._$scope;
      $scope.exampleMethod();
      // validate $scope.exampleModel
      mainApp.assert($scope.exampleModel === 'bye model', $scope.exampleModel);
      onEventError();
    }

  };
  local._init();
}());
