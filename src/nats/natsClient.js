const NATS = require('nats')
const nats = NATS.connect()
// console.log('==N:', nats)
module.exports = nats
