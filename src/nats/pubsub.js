const nats = require('./natsClient')

// Simple Publisher
nats.publish('foo', 'Hello World!')

// Simple Subscriber
nats.subscribe('foo', function(msg) {
  console.log('Client1 Received a message: ' + msg)
})

nats.subscribe('foo', function(msg) {
  console.log('Client2 Received a message: ' + msg)
})
