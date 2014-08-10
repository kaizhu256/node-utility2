// example.js
/*jslint
  bitwise: true,
  indent:2,
  node: true
*/
(function () {
  'use strict';
  var port, server, utility2;
  // require utility2 module
  try {
    utility2 = require('utility2');
  } catch (error) {
    utility2 = require('./main.js');
  }
  // create random port in the inclusive range 0x8000 - 0xffff
  port = (Math.random() * 0xffff) | 0x8000;
  console.log('example test server starting on random port ' + port);
  // init server with example middleware
  server = require('http').createServer(function (request, response) {
    utility2.serverMiddleware(request, response, function (error) {
      utility2.serverRespondDefault(response, error ? 500 : 404, error);
    });
  });
  // set server to listen on the specified port
  server.listen(port, function () {
    console.log('example test server started on port ' + port);
    setTimeout(function () {
      server.close();
      console.log('example test server closed after 1 second');
    }, 1000);
  });
}());
