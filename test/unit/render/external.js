import test from 'ava'
import isolate from 'helper/isolate'
import { ExternalScope } from 'sym'
const [ external, { entries } ] =
  isolate(test, 'render/external', { entries: 'render/entries' })

test.serial('nonextant', t => {
  const result = external({ flow: [] })
  t.is(result, null)
  t.true(entries.notCalled)
})

test.serial('empty', t => {
  const result = external({
    flow: [ { id: ExternalScope, entries: [] } ]
  })
  t.is(result, null)
  t.true(entries.notCalled)
})

test.serial('nonempty', t => {
  const rendered = Symbol('rendered')
  entries.returns(rendered)
  const result = external({
    flow: [ { id: ExternalScope, entries: [ {}, {}, {} ] } ]
  })
  t.is(result, rendered)
  t.true(entries.calledOnce)
})
