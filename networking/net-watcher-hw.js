'use strict';
const
  fs = require('fs'),
  net = require('net'),
  ws = require('./watcher-hw.js'),
  filename = process.argv[2],
  watcher = ws.connect(filename),

  server = net.createServer(function(connection) {
    // reporting
    console.log('Subscriber connected.');
    connection.write('Now watching "' + filename + '" for changes...\n');

    watcher.on('changed', function(message) {
      connection.write(message);
    });

  // cleanup
  connection.on('close', function() {
    console.log('Subscriber disconnected.');
    });
  });

if (!filename) throw Error('No target filename was specified.');

server.listen('/tmp/watcher.sock', function() {
  console.log('Listening for subscribers...');
});

