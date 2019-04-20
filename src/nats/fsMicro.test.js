const fsMicro = require('./fsMicro')

afterAll(() => {
  fsMicro.disconnect()
})
test('should works', async () => {
  fsMicro.connect('localhost:4222')

  fsMicro.endpoint('plusOne', msg => {
    return String(parseInt(msg) + 1)
  })

  const response = await fsMicro.request('plusOne', '3')
  expect(response).toEqual('4')
})
