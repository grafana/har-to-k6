import test from 'ava'
import creator from 'validate/creator'
import { makeAssay } from 'aid'

test('invalid name', t => {
  t.throws(() => {
    creator({ name: 5 }, makeAssay())
  }, { name: 'InvalidCreatorName' })
})

test('invalid version', t => {
  t.throws(() => {
    creator({ name: 'WebTracer', version: 5 }, makeAssay())
  }, { name: 'InvalidCreatorVersion' })
})

test('invalid comment', t => {
  t.throws(() => {
    creator({ name: 'WebTracer', version: '5', comment: 5 }, makeAssay())
  }, { name: 'InvalidComment' })
})

test('valid empty', t => {
  t.notThrows(() => {
    creator({}, makeAssay())
  })
})

test('valid full', t => {
  t.notThrows(() => {
    creator(
      { name: 'WebTracer', version: '5', comment: 'Build 20150607' },
      makeAssay()
    )
  })
})
