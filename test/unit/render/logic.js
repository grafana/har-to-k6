import test from 'ava'
import isolate from 'helper/isolate'
const [ logic, { block, declares, flow, variableSpace } ] =
  isolate(test, 'render/logic', {
    block: 'render/block',
    declares: 'render/declares',
    flow: 'render/flow',
    variableSpace: 'render/variableSpace'
  })

test.serial('empty', t => {
  block.returns('{}')
  const result = logic({})
  t.is(result, 'export default function() {}')
  t.true(declares.calledOnce)
  t.true(variableSpace.calledOnce)
  t.true(flow.calledOnce)
  t.true(block.calledOnce)
  t.deepEqual(block.firstCall.args[0], [`sleep(1);`])
})

test.serial('nonempty', t => {
  flow.returns(`// Flow`)
  block.returns('' +
`{
  // Flow
}`)
  const result = logic({})
  t.is(result, '' +
`export default function() {
  // Flow
}`)
  t.true(declares.calledOnce)
  t.true(variableSpace.calledOnce)
  t.true(flow.calledOnce)
  t.true(block.calledOnce)
  t.deepEqual(block.firstCall.args[0], [`// Flow`, `sleep(1);`])
})
