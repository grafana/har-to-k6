const test = require('ava')
const isolate = require('helper/isolate')
const [prime, { content }] = isolate(test, 'render/template/prime', {
  content: 'render/template/content',
})

test.serial('basic', t => {
  /* eslint-disable-next-line no-template-curly-in-string */
  content.returns('token=${vars["token"]}')
  /* eslint-disable-next-line no-template-curly-in-string */
  t.is(prime('token=${token}'), '`token=${vars["token"]}`')
})
