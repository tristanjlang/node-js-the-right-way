'use strict';
const
  zmq = require('zmq'),
  cluster = require('cluster');

if (cluster.isMaster) {
  let pusher = zmq.socket('push').bind('ipc://master-pusher.ipc');
  let puller = zmq.socket('pull').bind('ipc://master-puller.ipc');
  let readyWorkers = 0;
  
  puller.on('message', function(data) {
    let msg = JSON.parse(data.toString());
    if (Object.keys(msg)[0] === 'ready') {
      readyWorkers++;
      if (readyWorkers == 3) {
        for (let i=0; i < 30; i++) {
          pusher.send(JSON.stringify({
            job: "details about this job.",
          }));
        }
      }
    }
    
    if (Object.keys(msg)[0] === 'result') {
      console.log(JSON.stringify(msg));
    }
  });

  for (let i=0; i < 3; i++) {
    cluster.fork();
  }

}
else {
  let pusher = zmq.socket('push').connect('ipc://master-puller.ipc');
  let puller = zmq.socket('pull').connect('ipc://master-pusher.ipc');

  puller.on('message', function(data) {
    pusher.send(JSON.stringify({
      result: "result of this job by worker "+process.pid,
    }));
  });

  pusher.send(JSON.stringify({
    ready: "this worker is ready, "+process.pid,
  }));
}

