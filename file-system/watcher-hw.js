'use strict';

const
  fs = require('fs'),
  spawn = require('child_process').spawn,
  commands = process.argv.slice(2, process.argv.length);

if (commands.length == 0) throw Error('Commands invalid');
const filename = commands[commands.length-1];

fs.watch(filename, function() {
  let 
    ls = spawn(commands[0], commands.slice(1, commands.length)),
    output = '';
  
  ls.stdout.on('data', function(chunk) {
    output += chunk.toString();
  });
  
  ls.on('close', function() {
    let parts = output.split(/\s+/);
//      console.dir(parts);
    console.dir([parts[0], parts[4], parts[8]]);
  });
});
console.log('Now watching ' + filename + ' for changes...');

