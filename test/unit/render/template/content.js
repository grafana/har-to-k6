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
  evaluate.returns('vars["token"]')
  /* eslint-disable-next-line no-template-curly-in-string */
  const result = content('Authorization: Bearer ${token}')
  /* eslint-disable-next-line no-template-curly-in-string */
  t.is(result, 'Authorization: Bearer ${vars["token"]}')
})
