import test from 'ava'
import isolate from 'helper/isolate'
const [postData, { params }] = isolate(test, 'parse/postData', {
  params: 'parse/params',
})

function makeSpec() {
  return {}
}

test.serial('basic', t => {
  const spec = makeSpec()
  postData({ mimeType: 'text/plain' }, spec)
  t.deepEqual(spec, { type: 'text/plain' })
  t.true(params.notCalled)
})

test.serial('text', t => {
  const spec = makeSpec()
  postData({ mimeType: 'text/plain', text: 'Great post' }, spec)
  t.deepEqual(spec, { type: 'text/plain', value: 'Great post' })
  t.true(params.notCalled)
})

test.serial('params', t => {
  const spec = makeSpec()
  postData(
    {
      mimeType: 'application/x-www-form-urlencoded',
      params: [{}, {}, {}],
    },
    spec
  )
  t.deepEqual(spec, {
    type: 'application/x-www-form-urlencoded',
    params: new Map(),
  })
  t.true(params.calledOnce)
})

test.serial('allows charset in mimeType', t => {
  const spec = makeSpec()
  postData({ mimeType: 'text/plain;charset=UTF-8', text: 'Great post' }, spec)
  t.deepEqual(spec, { type: 'text/plain;charset=UTF-8', value: 'Great post' })
})

test.serial('comment', t => {
  const spec = makeSpec()
  postData({ mimeType: 'text/plain', comment: 'Test post body' }, spec)
  t.deepEqual(spec, { type: 'text/plain', comment: 'Test post body' })
})

test.serial(
  'it should assume mime-type is text/plain when mime-type is empty',
  t => {
    const spec = makeSpec()
    postData({ mimeType: '', comment: 'Test post body' }, spec)
    t.deepEqual(spec, { type: 'text/plain', comment: 'Test post body' })
  }
)

test.serial(
  'it should assume mime-type is application/x-www-form-urlencoded when mime-type is empty when a params array is present',
  t => {
    const spec = makeSpec()
    postData({ mimeType: '', params: [{ name: 'param' }] }, spec)
    t.deepEqual(spec, {
      type: 'application/x-www-form-urlencoded',
      params: new Map(),
    })
  }
)

test.serial(
  'it should assume mime-type is application/json when text can be deserialized to a JSON-object',
  t => {
    const spec = makeSpec()
    postData({ mimeType: '', text: '{ "prop": 1 }' }, spec)
    t.deepEqual(spec, { type: 'application/json', value: '{ "prop": 1 }' })
  }
)
