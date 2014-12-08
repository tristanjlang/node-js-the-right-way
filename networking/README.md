#### In this module:
* `net-watcher-json-test-service.js` sends one data message in two parts
* `ldj.js` sets up the protocol to handle the data messages, combining them until a complete message has come through (one with a new line character at the end of the message)
* `net-watcher-ldj-client.js` connects to port 5432, connects the ldj client to that stream, and watches the two parts of the data message (from `net-watcher-json-test-service.js`) come through, parsing it into a single output 
