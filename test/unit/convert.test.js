const test = require('ava')
const convert = require('convert')

// Should only include Scenario info if an array was passed to convert
test('throw with scenario info', async t => {
  await t.throwsAsync(() => convert(['']), {
    message: /^Archive\((\d)\):/,
  })
})

test('throw without scenario info', async t => {
  await t.throwsAsync(() => convert(''), {
    message: /^(?!Archive\((\d)\):).*/,
  })
})
