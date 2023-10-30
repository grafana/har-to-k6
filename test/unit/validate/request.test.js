const test = require('ava')
const { assay: makeAssay } = require('make')
const request = require('validate/request')

const init = requestBody =>
  Object.assign(
    {},
    {
      method: 'GET',
      url: 'http://example.com',
      queryString: [],
      headers: [],
      cookies: [],
      postData: {},
      comment: 'Load front page',
    },
    requestBody
  )

test('missing method', t => {
  t.throws(() => request(init({ method: null }), 0, makeAssay()), {
    name: 'MissingRequestMethod',
  })
})

test('invalid method', t => {
  t.throws(() => request(init({ method: 5 }), 0, makeAssay()), {
    name: 'InvalidRequestMethod',
  })
})

test('missing url', t => {
  t.throws(() => request(init({ method: 'GET', url: null }), 0, makeAssay()), {
    name: 'MissingRequestUrl',
  })
})

test('invalid url type', t => {
  t.throws(() => request(init({ method: 'GET', url: 5 }), 0, makeAssay()), {
    name: 'InvalidRequestUrl',
    message: 'Request URL must be a string',
  })
})

test('invalid url format', t => {
  t.throws(
    () => request(init({ method: 'GET', url: 'example.com' }), 0, makeAssay()),
    {
      name: 'InvalidRequestUrl',
      message: 'Request URL must be absolute or start with variable',
    }
  )
})

test('invalid queryString', t => {
  t.throws(
    () =>
      request(
        {
          method: 'GET',
          url: 'http://example.com',
          queryString: 5,
        },
        0,
        makeAssay()
      ),
    { name: 'InvalidRequestQuery' }
  )
})

test('invalid headers', t => {
  t.throws(
    () =>
      request(
        {
          method: 'GET',
          url: 'http://example.com',
          headers: 5,
        },
        0,
        makeAssay()
      ),
    { name: 'InvalidRequestHeaders' }
  )
})

test('invalid cookies', t => {
  t.throws(
    () =>
      request(
        {
          method: 'GET',
          url: 'http://example.com',
          cookies: 5,
        },
        0,
        makeAssay()
      ),
    { name: 'InvalidRequestCookies' }
  )
})

test('invalid postData', t => {
  t.throws(
    () =>
      request(
        {
          method: 'GET',
          url: 'http://example.com',
          postData: 5,
        },
        0,
        makeAssay()
      ),
    { name: 'InvalidRequestData' }
  )
})

test('invalid comment', t => {
  t.throws(
    () =>
      request(
        {
          method: 'GET',
          url: 'http://example.com',
          comment: 5,
        },
        0,
        makeAssay()
      ),
    { name: 'InvalidRequestComment' }
  )
})

test('GET with body', t => {
  t.notThrows(() => {
    request(
      {
        method: 'GET',
        url: 'http://example.com',
        postData: { mimeType: 'text/csv' },
      },
      0,
      makeAssay()
    )
  })
})

test('inconsistent Content-Type', t => {
  t.notThrows(() =>
    request(
      init({
        method: 'POST',
        url: 'http://example.com',
        headers: [{ name: 'Content-Type', value: 'text/plain' }],
        postData: { mimeType: 'text/csv' },
      }),
      0,
      makeAssay()
    )
  )
})

test('consistent Content-Type', t => {
  t.notThrows(() =>
    request(
      {
        method: 'POST',
        url: 'http://example.com',
        headers: [{ name: 'Content-Type', value: 'text/csv; charset=utf-8' }],
        postData: { mimeType: 'text/csv' },
      },
      0,
      makeAssay()
    )
  )
})

test('valid http url', t => {
  t.notThrows(() => {
    request(init({ method: 'GET', url: 'http://example.com' }), 0, makeAssay())
  })
})

test('valid https url', t => {
  t.notThrows(() => {
    request(init({ method: 'GET', url: 'https://example.com' }), 0, makeAssay())
  })
})

test('valid ftp url', t => {
  t.notThrows(() => {
    request(init({ method: 'GET', url: 'ftp://example.com' }), 0, makeAssay())
  })
})

test('valid variable url', t => {
  /* eslint-disable-next-line no-template-curly-in-string */
  t.notThrows(() => {
    request(init({ method: 'GET', url: '${base}/index.html' }), 0, makeAssay())
  })
})

test('valid full', t => {
  t.notThrows(() => {
    request(
      init({
        method: 'GET',
        url: 'http://example.com',
        queryString: [],
        headers: [],
        cookies: [],
        postData: {},
        comment: 'Load front page',
      }),
      0,
      makeAssay()
    )
  })
})
