/* jshint node:true */
'use strict';

var port;
var http   = require('http');
var server = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('It works!\n');
});

function getRandomPort() {
	var min = 3000;
	var max = 65535;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function serverSetPort(server) {
	port = getRandomPort();
	server.listen(port);
}

server.on('error', function(err) {
	if (err && err.code === 'EADDRINUSE') {
		return serverSetPort(server);
	}
	console.error(err);
});

server.on('listening', function() {
	console.log('Server listening on http://0.0.0.0:%d', port);
});

serverSetPort(server);

