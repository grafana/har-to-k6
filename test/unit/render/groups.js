import test from 'ava'
import isolate from 'helper/isolate'
import { ExternalScope } from 'sym'
const [ groups, { group } ] =
  isolate(test, 'render/groups', { group: 'render/group' })

test.serial('empty', t => {
  const result = groups({ flow: [] })
  t.is(result, null)
})

test.serial('1', t => {
  group.returns(`// Group`)
  const result = groups({
    flow: [ { id: 'page1', entries: [] } ]
  })
  t.is(result, '// Group')
})

test.serial('3', t => {
  group.returns(`// Group`)
  const result = groups({ flow: [
    { id: 'page1', entries: [] },
    { id: 'page2', entries: [] },
    { id: 'page3', entries: [] }
  ] })
  t.is(result, '' +
`// Group

// Group

// Group`)
})

test.serial('external', t => {
  group.returns(`// Group`)
  const result = groups({ flow: [
    { id: ExternalScope, entries: [] },
    { id: 'page1', entries: [] },
    { id: 'page2', entries: [] },
    { id: 'page3', entries: [] }
  ] })
  t.is(result, '' +
`// Group

// Group

// Group`)
})
