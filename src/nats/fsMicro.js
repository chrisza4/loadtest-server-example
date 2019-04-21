const nats = require('nats')

let _client = null
function connect (url) {
  _client = nats.connect(url)
}

function endpoint (topic, func) {
  _client.subscribe(topic, async (msg, replyTo) => {
    const result = await func(msg)
    _client.publish(replyTo, result)
  })
}

function request (topic, msg) {
  return new Promise((resolve, reject) => {
    _client.request(topic, msg, function (response) {
      resolve(response)
    })
  })
}

function disconnect () {
  _client.close()
}

module.exports = {
  connect, request, endpoint, disconnect
}
