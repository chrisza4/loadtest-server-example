const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/some-failed', (req, res) => {
  if (Math.random() > 0.8) {
    return res.status(500).send('Error')
  }
  return res.send('Success')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
