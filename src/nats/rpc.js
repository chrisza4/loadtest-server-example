const NATS = require('nats')
const nats = require('./natsClient')

// Request Streams
let sid = nats.request('request', 'I am GROOT!!', function(response) {
  console.log('Got a response in msg stream: ' + response)
})

nats.subscribe('request', function(msg, replyTo) {
  console.log('ReplyTo:', replyTo)
  nats.publish(replyTo, msg + ': pardon?')
  nats.publish(replyTo, 'Again?')
})

// Request with Auto-Unsubscribe. Will unsubscribe after
// the first response is received via {'max':1}
nats.request('help', null, {'max':1}, function(response) {
  console.log('Got a response for help: ' + response)
})

nats.subscribe('help', function(request, replyTo) {
  nats.publish(replyTo, 'I can help!')
})

// Request for single response with timeout.
nats.requestOne('help', null, {}, 1000, function(response) {
  // `NATS` is the library.
  if(response instanceof NATS.NatsError && response.code === NATS.REQ_TIMEOUT) {
    console.log('Request for help timed out.')
    return
  }
  console.log('Got a response for help: ' + response)
})

// Close connection
// nats.close()
