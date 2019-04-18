const fs = require('fs')
const path = require('path')
const redis = require('redis')

const client = redis.createClient()

function findByToken (token) {
  return new Promise((resolve, reject) => {
    client.get(token, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

async function initRedis () {
  const fileContent = fs.readFileSync(path.join(__dirname, '../user-tokens.csv'), { encoding: 'utf8' })
  const data = fileContent.split('\n').filter(c => !!c).map(c => {
    const row = c.split(',')
    return {
      token: row[0],
      username: row[1]
    }
  })
  for (const token of data) {
    client.set(`token-${token.token}`, token.username)
  }
}

initRedis().then(c => console.log('Redis initialized'))
module.exports = {
  findByToken
}
