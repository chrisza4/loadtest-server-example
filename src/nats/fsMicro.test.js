const fsMicro = require('./fsMicro')

async function test () {
  fsMicro.connect('localhost:4222')

  fsMicro.endpoint('plusOne', msg => {
    return String(parseInt(msg) + 1)
  })

  const response = await fsMicro.request('plusOne', '3')
  if (response === '4') {
      console.log('Test Passed')
  } else {
    console.log('Test Failed')
  }
}

test().then(c => console.log('Done deal')).catch(err => console.log(err))
