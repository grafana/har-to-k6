const test = require('ava')
const template = require('species/string/template')

test('pass', t => {
  /* eslint-disable-next-line no-template-curly-in-string */
  t.true(template('Authorization: Bearer ${token}'))
})

test('fail', t => {
  t.false(template('Content-Type'))
})
