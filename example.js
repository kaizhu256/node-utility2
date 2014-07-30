// example.js
/*jslint
  bitwise: true,
  indent:2,
  node: true
*/
(function () {
  'use strict';
  var example, port, server;
  // create random port in the inclusive range 0x8000 - 0xffff
  port = (Math.random() * 0xffff) | 0x8000;
  example = require('utility2');
  console.log('example test server starting on random port ' + port);
  // init server with example middleware
  server = require('http').createServer(function (request, response) {
    example.serverMiddleware(request, response, function (error) {
      example.serverRespondDefault(response, error ? 500 : 404, error);
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
