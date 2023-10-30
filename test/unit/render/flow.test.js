const test = require('ava')
const isolate = require('helper/isolate')
const { FlowItemType } = require('enum')
const { result: makeResult } = require('make')
const [flow, { entry, group }] = isolate(test, 'render/flow', {
  entry: 'render/entry',
  group: 'render/group',
})

test.serial('1 external', t => {
  entry.returns(`// External`)
  const result = makeResult()
  result.flow.push({ type: FlowItemType.External, entry: {} })
  t.is(flow(result), `// External`)
  t.true(entry.calledOnce)
  t.true(group.notCalled)
})

test.serial('3 external', t => {
  entry.returns(`// External`)
  const result = makeResult()
  result.flow.push({ type: FlowItemType.External, entry: {} })
  result.flow.push({ type: FlowItemType.External, entry: {} })
  result.flow.push({ type: FlowItemType.External, entry: {} })
  t.is(
    flow(result),
    '' +
      `// External

// External

// External`
  )
  t.true(entry.calledThrice)
  t.true(group.notCalled)
})

test.serial('1 group', t => {
  group.returns(`// Group`)
  const result = makeResult()
  result.flow.push({ type: FlowItemType.Group })
  t.is(flow(result), `// Group`)
  t.true(group.calledOnce)
  t.true(entry.notCalled)
})

test.serial('3 group', t => {
  group.returns(`// Group`)
  const result = makeResult()
  result.flow.push({ type: FlowItemType.Group })
  result.flow.push({ type: FlowItemType.Group })
  result.flow.push({ type: FlowItemType.Group })
  t.is(
    flow(result),
    '' +
      `// Group

// Group

// Group`
  )
  t.true(group.calledThrice)
  t.true(entry.notCalled)
})

test.serial('mixed', t => {
  entry.returns(`// External`)
  group.returns(`// Group`)
  const result = makeResult()
  result.flow.push({ type: FlowItemType.External, entry: {} })
  result.flow.push({ type: FlowItemType.Group })
  result.flow.push({ type: FlowItemType.External, entry: {} })
  result.flow.push({ type: FlowItemType.Group })
  result.flow.push({ type: FlowItemType.External, entry: {} })
  t.is(
    flow(result),
    '' +
      `// External

// Group

// External

// Group

// External`
  )
  t.true(entry.calledThrice)
  t.true(group.calledTwice)
})
