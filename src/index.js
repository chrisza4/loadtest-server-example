const express = require('express')
const bcrypt = require('bcrypt')
// const RedisEndpoint = require('./redis')
// const PgEndpoint = require('./postgresql')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/some-failed', (req, res) => {
  if (Math.random() > 0.8) {
    return res.status(500).send('Error')
  }
  return res.send('Success')
})

app.get('/encrypt-100', (req, res) => {
  bcrypt.hash('test', 100, () => {
    res.send('Completed')
  })
})

app.get('/encrypt-1000', (req, res) => {
  bcrypt.hash('test', 1000, () => {
    res.send('Completed')
  })
})

// app.get('/find-redis', async (req, res) => {
//   const data = await RedisEndpoint.findByToken(req.query.token)
//   res.send(data)
// })

// app.get('/find-pg', async (req, res) => {
//   const data = await PgEndpoint.findByToken(req.query.token)
//   res.send(data)
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

async function retryBy(count, func) {
  for (let retryCount = 0; retryCount < count; retryCount++) {
    const res = await func()
    if (res.success) return res
  }
  return { success: false }
}
