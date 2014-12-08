'use strict'
const
  events = require('events'),
  util = require('util'),
  fs = require('fs'),

  WatcherSocket = function(filename) {
    events.EventEmitter.call(this);
    let self = this;

    fs.watch(filename, function() {
      self.emit('changed', 'File "' + filename + '" changed: ' + Date.now() + '\n');
    });
  };

util.inherits(WatcherSocket, events.EventEmitter);

exports.WatcherSocket = WatcherSocket;
exports.connect = function(filename) {
  return new WatcherSocket(filename);
};
exports.close = function(watcher) {
  watcher.close();
};
