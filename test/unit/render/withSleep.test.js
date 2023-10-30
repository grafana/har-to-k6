const test = require('ava')
const withSleep = require('render/withSleep')

test('before', t => {
  const flow = ['// content']
  const spec = [{ before: 1200 }]
  const result = withSleep(flow, spec)

  t.deepEqual(result, ['sleep(1.2);', '// content'])
})

test('after', t => {
  const flow = ['// content']
  const spec = [{ after: 1200 }]
  const result = withSleep(flow, spec)

  t.deepEqual(result, ['// content', 'sleep(1.2);'])
})

test('before after', t => {
  const flow = ['// content']
  const spec = [{ before: 1000 }, { after: 2000 }]
  const result = withSleep(flow, spec)

  t.deepEqual(result, ['sleep(1);', '// content', 'sleep(2);'])
})

test('multiple before after', t => {
  const flow = ['// content']
  const spec = [
    { before: 100 },
    { before: 200 },
    { after: 300 },
    { after: 400 },
  ]
  const result = withSleep(flow, spec)

  t.deepEqual(result, [
    'sleep(0.1);',
    'sleep(0.2);',
    '// content',
    'sleep(0.3);',
    'sleep(0.4);',
  ])
})
