import test from 'ava'
import mockRequire from 'mock-require'
import sinon from 'sinon'
const format = sinon.stub()
const moment = sinon.stub()
let cookie

function makeSpec () {
  return new Map()
}

test.before(t => {
  mockRequire('../../../src/format', format)
  mockRequire('moment', moment)
  cookie = require('parse/cookie')
})

test.serial('basic', t => {
  const spec = makeSpec()
  cookie({ name: 'session' }, spec)
  t.deepEqual(spec, new Map().set('session', {}))
})

test.serial('value', t => {
  const spec = makeSpec()
  cookie({ name: 'session', value: 'abc123' }, spec)
  t.deepEqual(spec, new Map().set('session', { value: 'abc123' }))
})

test.serial('path', t => {
  const spec = makeSpec()
  cookie({ name: 'session', path: '/member' }, spec)
  t.deepEqual(spec, new Map().set('session', { path: '/member' }))
})

test.serial('domain', t => {
  const spec = makeSpec()
  cookie({ name: 'session', domain: 'example.com' }, spec)
  t.deepEqual(spec, new Map().set('session', { domain: 'example.com' }))
})

test.serial('httpOnly true', t => {
  const spec = makeSpec()
  cookie({ name: 'session', httpOnly: true }, spec)
  t.deepEqual(spec, new Map().set('session', { httpOnly: true }))
})

test.serial('httpOnly false', t => {
  const spec = makeSpec()
  cookie({ name: 'session', httpOnly: false }, spec)
  t.deepEqual(spec, new Map().set('session', { httpOnly: false }))
})

test.serial('secure true', t => {
  const spec = makeSpec()
  cookie({ name: 'session', secure: true }, spec)
  t.deepEqual(spec, new Map().set('session', { secure: true }))
})

test.serial('secure false', t => {
  const spec = makeSpec()
  cookie({ name: 'session', secure: false }, spec)
  t.deepEqual(spec, new Map().set('session', { secure: false }))
})

test.serial('comment', t => {
  const spec = makeSpec()
  cookie({ name: 'session', comment: 'Test authenticated' }, spec)
  t.deepEqual(spec, new Map().set('session', {
    comment: 'Test authenticated'
  }))
})

test.serial('multiple', t => {
  const spec = makeSpec()
  cookie({ name: 'session', value: 'abc123' }, spec)
  cookie({ name: 'theme', value: 'aqua' }, spec)
  cookie({ name: 'layout', value: '3column' }, spec)
  t.deepEqual(
    spec,
    new Map()
      .set('session', { value: 'abc123' })
      .set('theme', { value: 'aqua' })
      .set('layout', { value: '3column' })
  )
})
