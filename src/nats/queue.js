const nats = require('./natsClient')

nats.subscribe('foo', {'queue':'job.workers'}, function(msg) {
  console.log(`Worker 1: I am working on msg "${msg}"`)
})

nats.subscribe('foo', {'queue':'job.workers'}, function(msg) {
  console.log(`Worker 2: I am working on msg "${msg}"`)
})

nats.subscribe('foo', {'queue':'job.workers'}, function(msg) {
  console.log(`Worker 3: I am working on msg "${msg}"`)
})

// nats.subscribe('foo', function(msg) {
//   console.log('Foo published. I am excited!!')
// })

for (let i = 0; i < 12; i++) {
  nats.publish('foo', `Job number ${i}`)
}
