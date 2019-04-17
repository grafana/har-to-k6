import test from 'ava'
import isolate from 'helper/isolate'
const [ content, { evaluate } ] =
  isolate(test, 'render/template/content', { evaluate: 'render/evaluate' })

test.serial('unchanged', t => {
  t.is(content('token'), 'token')
})

test.serial('escape', t => {
  t.is(content('val\\ue'), 'val\\\\ue')
})

test.serial('backtick', t => {
  t.is(content('val`ue'), 'val\\`ue')
})

test.serial('unterminated variable', t => {
  t.is(content('val${ue'), 'val\\${ue')
})

test.serial('nonvariable dollar', t => {
  t.is(content('val$ue'), 'val\\$ue')
})

test.serial('variable', t => {
  /* eslint-disable no-template-curly-in-string */
  evaluate.returns('vars["token"]')
  const result = content('Authorization: Bearer ${token}')
  t.is(result, 'Authorization: Bearer ${vars["token"]}')
  /* eslint-enable no-template-curly-in-string */
})
