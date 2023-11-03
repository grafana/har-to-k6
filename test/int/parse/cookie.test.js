const test = require('ava')
const cookie = require('parse/cookie')
const format = require('format')
const moment = require('moment')

function makeSpec() {
  return new Map()
}

test('expires', t => {
  const time = moment.utc()
  const spec = makeSpec()
  cookie({ name: 'theme', expires: format.date.iso8601(time) }, spec)
  t.deepEqual(
    spec,
    new Map().set('theme', {
      expires: format.date.http(time),
    })
  )
})
