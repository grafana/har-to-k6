const test = require('ava')
const aid = require('aid')

test('extrinsic', t => {
  const enumeration = {
    First: 0,
    Second: 1,
    Third: 2,
  }
  const value = aid.extrinsic(enumeration)
  t.false(Object.values(enumeration).includes(value))
})

test('isMultipartFormData', t => {
  t.true(
    aid.isMultipartFormData({
      request: {
        postData: {
          mimeType: 'multipart/form-data',
        },
      },
    })
  )

  t.false(
    aid.isMultipartFormData({
      request: {
        postData: {
          mimeType: 'application/json',
        },
      },
    })
  )

  t.false(
    aid.isMultipartFormData({
      request: {},
    })
  )

  t.false(
    aid.isMultipartFormData({
      request: {
        postData: {
          mimeType: null,
        },
      },
    })
  )
})
