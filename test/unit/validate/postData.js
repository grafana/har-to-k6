import test from 'ava'
import isolate from 'helper/isolate'
import { assay as makeAssay } from 'make'
const [ postData, { params } ] =
  isolate(test, 'validate/postData', { params: 'validate/params' })

test.serial('missing type', t => {
  t.throws(() => {
    postData({}, 0, makeAssay())
  }, { name: 'MissingPostDataType' })
})

test.serial('invalid type', t => {
  t.throws(() => {
    postData({ mimeType: 5 }, 0, makeAssay())
  }, { name: 'InvalidPostDataType' })
})

test.serial('invalid params', t => {
  t.throws(() => {
    postData({ mimeType: 'text/plain', params: 5 }, 0, makeAssay())
  }, { name: 'InvalidPostDataParams' })
})

test.serial('invalid text', t => {
  t.throws(() => {
    postData({ mimeType: 'text/plain', text: 5 }, 0, makeAssay())
  }, { name: 'InvalidPostDataText' })
})

test.serial('invalid comment', t => {
  t.throws(() => {
    postData({ mimeType: 'text/plain', comment: 5 }, 0, makeAssay())
  }, { name: 'InvalidComment' })
})

test.serial('content conflict', t => {
  t.throws(() => {
    postData({
      mimeType: 'text/plain',
      params: [ {} ],
      text: 'Message in text'
    }, 0, makeAssay())
  }, { name: 'PostDataConflict' })
})

test.serial('valid minimal', t => {
  postData({ mimeType: 'text/plain' })
  t.true(params.notCalled)
})

test.serial('valid full params', t => {
  postData({
    mimeType: 'multipart/form-data',
    params: [ {} ],
    comment: 'Send a body with parameters'
  }, 0, makeAssay())
  t.true(params.calledOnce)
})

test.serial('valid full text', t => {
  postData({
    mimeType: 'text/plain',
    text: 'Message in text',
    comment: 'Send a text body'
  }, 0, makeAssay())
  t.true(params.notCalled)
})
