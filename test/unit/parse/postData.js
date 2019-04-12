import test from 'ava'
import isolate from 'helper/isolate'
const [ postData, { params } ] =
  isolate(test, 'parse/postData', { params: 'parse/params' })

function makeSpec () {
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
  postData({
    mimeType: 'application/x-www-form-urlencoded',
    params: [ {}, {}, {} ]
  }, spec)
  t.deepEqual(spec, {
    type: 'application/x-www-form-urlencoded',
    params: new Map()
  })
  t.true(params.calledOnce)
})

test.serial('comment', t => {
  const spec = makeSpec()
  postData({ mimeType: 'text/plain', comment: 'Test post body' }, spec)
  t.deepEqual(spec, { type: 'text/plain', comment: 'Test post body' })
})
