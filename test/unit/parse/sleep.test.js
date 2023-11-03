const test = require('ava')
const sleep = require('parse/sleep')

test('does not mutate during parse', t => {
  const result = [
    { before: 0 },
    { before: 0.2 },
    { after: 3000 },
    { after: 4000 },
  ]

  const spec = sleep(result)
  t.deepEqual(spec, result)
})
