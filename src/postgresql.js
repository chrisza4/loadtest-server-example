const { Pool } = require('pg')
const loadTestPool =  new Pool({
  connectionString: 'postgresql://postgres:postgres@localhost:5432/loadtest'
})

require('./initPostgresql')()

async function findByToken (token) {
  const res = await loadTestPool.query('SELECT username from tokens WHERE token = $1', [ token ])
  if (res.rowCount === 0) {
    return null
  }
  return res.rows[0].username
}

module.exports = {
  findByToken
}
