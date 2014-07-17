// example.js
/*jslint bitwise: true, indent:2, node: true*/
(function () {
  'use strict';
  var example, port, server;
  port = (Math.random() * 0xffff) | 0x8000;
  example = require('./main.js');
  console.log('example test server starting on random port ' + port);
  server = require('http').createServer(function (request, response) {
    example.serverMiddleware(request, response, function (error) {
      example.serverRespondDefault(response, error ? 500 : 404, error);
    });
  });
  // listen on the specified port
  server.listen(port, function () {
    console.log('example test server started on port ' + port);
    setTimeout(function () {
      server.close();
      console.log('example test server closed after 1 second');
    }, 1000);
  });
}());
