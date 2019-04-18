const fs = require('fs')
const path = require('path')
const { Pool } = require('pg')

async function initDb () {
  console.log(`Reset database...`)
  const pool = new Pool({
    connectionString: 'postgresql://postgres:postgres@localhost:5432/postgres'
  })
  const q = await pool.query(`SELECT 1 FROM pg_database WHERE datname = 'loadtest'`)
  if (q.rowCount === 1) {
    await pool.query('DROP DATABASE loadtest')
  }
  await pool.query('CREATE DATABASE loadtest')
  await pool.end()
  console.log(`Inserting data...`)
  const fileContent = fs.readFileSync(path.join(__dirname, '../user-tokens.csv'), { encoding: 'utf8' })
  const data = fileContent.split('\n').filter(c => !!c).map(c => {
    const row = c.split(',')
    return {
      token: row[0],
      username: row[1]
    }
  })

  const loadTestPool =  new Pool({
    connectionString: 'postgresql://postgres:postgres@localhost:5432/loadtest'
  })
  await loadTestPool.query(`CREATE TABLE tokens (
    id serial PRIMARY KEY,
    token VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(50)
  )`)
  for (const token of data) {
    await loadTestPool.query(`INSERT INTO tokens (token, username) VALUES ('${token.token}', '${token.username}')`)
  }
  console.log('Postgresql database initialized')
  return loadTestPool.end()
}

module.exports = initDb
