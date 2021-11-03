import test from 'ava'
import convert from 'convert'

// Should only include Scenario info if an array was passed to convert
test('throw with scenario info', async (t) => {
  await t.throwsAsync(() => convert(['']), {
    message: /^Scenario\((\d)\):/,
  })
})

test('throw without scenario info', async (t) => {
  await t.throwsAsync(() => convert(''), {
    message: /^(?!Scenario\((\d)\):).*/,
  })
})
