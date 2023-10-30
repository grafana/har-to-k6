const test = require('ava')
const isolate = require('helper/isolate')
const [logic, { block, declares, flow, variableSpace }] = isolate(
  test,
  'render/logic',
  {
    block: 'render/block',
    declares: 'render/declares',
    flow: 'render/flow',
    variableSpace: 'render/variableSpace',
  }
)

test.serial('empty', t => {
  block.returns('{}')
  const result = logic({})
  t.is(result, 'export default function main() {}')
  t.true(declares.calledOnce)
  t.true(variableSpace.calledOnce)
  t.true(flow.calledOnce)
  t.true(block.calledOnce)
  t.deepEqual(block.firstCall.args[0], [
    `// Automatically added sleep\nsleep(1);`,
  ])
})

test.serial('nonempty', t => {
  flow.returns(`// Flow`)
  block.returns(
    '' +
      `{
  // Flow
}`
  )
  const result = logic({})
  t.is(
    result,
    '' +
      `export default function main() {
  // Flow
}`
  )
  t.true(declares.calledOnce)
  t.true(variableSpace.calledOnce)
  t.true(flow.calledOnce)
  t.true(block.calledOnce)
  t.deepEqual(block.firstCall.args[0], [
    `// Flow`,
    `// Automatically added sleep\nsleep(1);`,
  ])
})
