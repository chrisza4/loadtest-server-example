const axios = require('axios')

async function generateRandomTokens () {
  const { data } = await axios.get('https://randomuser.me/api/?results=100')
  for (let user in data) {

  }
  return
}

generateRandomTokens().then(c => console.log('Done'))
