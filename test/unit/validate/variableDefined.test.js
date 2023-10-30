/* eslint-disable no-template-curly-in-string */

const test = require('ava')
const variableDefined = require('validate/variableDefined')
const { VariableType } = require('enum')

test('undefined method', t => {
  t.throws(
    () => {
      const entries = [
        { request: { method: '${method}', url: 'http://example.com' } },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Request method referenced undefined variable: method',
    }
  )
})

test('undefined url', t => {
  t.throws(
    () => {
      const entries = [
        { request: { method: 'GET', url: 'example.com/${path}' } },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Request URL referenced undefined variable: path',
    }
  )
})

test('undefined queryItem name', t => {
  t.throws(
    () => {
      const queryString = [{ name: '${key}' }]
      const entries = [
        {
          request: { method: 'GET', url: 'http://example.com', queryString },
        },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Query item name referenced undefined variable: key',
    }
  )
})

test('undefined queryItem value', t => {
  t.throws(
    () => {
      const queryString = [{ name: 'search', value: '${search}' }]
      const entries = [
        {
          request: { method: 'GET', url: 'http://example.com', queryString },
        },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Query item value referenced undefined variable: search',
    }
  )
})

test('undefined header name', t => {
  t.throws(
    () => {
      const headers = [{ name: '${header}', value: '*/*' }]
      const entries = [
        {
          request: { method: 'GET', url: 'http://example.com', headers },
        },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Header name referenced undefined variable: header',
    }
  )
})

test('undefined header value', t => {
  t.throws(
    () => {
      const headers = [{ name: 'Allow', value: '${contentType}' }]
      const entries = [
        {
          request: { method: 'GET', url: 'http://example.com', headers },
        },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Header value referenced undefined variable: contentType',
    }
  )
})

test('undefined cookie name', t => {
  t.throws(
    () => {
      const cookies = [{ name: '${cookie}' }]
      const entries = [
        {
          request: { method: 'GET', url: 'http://example.com', cookies },
        },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Cookie name referenced undefined variable: cookie',
    }
  )
})

test('undefined cookie value', t => {
  t.throws(
    () => {
      const cookies = [{ name: 'session', value: '${session}' }]
      const entries = [
        {
          request: { method: 'GET', url: 'http://example.com', cookies },
        },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Cookie value referenced undefined variable: session',
    }
  )
})

test('undefined cookie path', t => {
  t.throws(
    () => {
      const cookies = [{ name: 'theme', path: '${path}' }]
      const entries = [
        {
          request: { method: 'GET', url: 'http://example.com', cookies },
        },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Cookie path referenced undefined variable: path',
    }
  )
})

test('undefined cookie domain', t => {
  t.throws(
    () => {
      const cookies = [{ name: 'theme', domain: '${host}' }]
      const entries = [
        {
          request: { method: 'GET', url: 'http://example.com', cookies },
        },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Cookie domain referenced undefined variable: host',
    }
  )
})

test('undefined post text', t => {
  t.throws(
    () => {
      const postData = { mimeType: 'text/plain', text: '${body}' }
      const entries = [
        {
          request: { method: 'POST', url: 'http://example.com', postData },
        },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Post text referenced undefined variable: body',
    }
  )
})

test('undefined param name', t => {
  t.throws(
    () => {
      const params = [{ name: '${param}' }]
      const postData = { mimeType: 'text/plain', params }
      const entries = [
        {
          request: { method: 'POST', url: 'http://example.com', postData },
        },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Param name referenced undefined variable: param',
    }
  )
})

test('undefined param value', t => {
  t.throws(
    () => {
      const params = [{ name: 'search', value: '${search}' }]
      const postData = { mimeType: 'text/plain', params }
      const entries = [
        {
          request: { method: 'POST', url: 'http://example.com', postData },
        },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Param value referenced undefined variable: search',
    }
  )
})

test('undefined param file name', t => {
  t.throws(
    () => {
      const params = [{ name: 'data', fileName: '${file}' }]
      const postData = { mimeType: 'text/csv', params }
      const entries = [
        {
          request: { method: 'POST', url: 'http://example.com', postData },
        },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Param file name referenced undefined variable: file',
    }
  )
})

test('undefined param type', t => {
  t.throws(
    () => {
      const params = [{ name: 'data', contentType: '${type}' }]
      const postData = { mimeType: 'text/csv', params }
      const entries = [
        {
          request: { method: 'POST', url: 'http://example.com', postData },
        },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Param content type referenced undefined variable: type',
    }
  )
})

test('undefined after defined', t => {
  t.throws(
    () => {
      const variables = [
        { name: 'token', type: VariableType.JSONPath, expression: 'token' },
        { name: 'session', type: VariableType.JSONPath, expression: 'session' },
      ]
      const entries = [
        {
          comment: 'Get credentials',
          request: { method: 'POST', url: 'http://example.com/login' },
          variables,
        },
        {
          comment: 'Authenticated request',
          request: {
            method: 'POST',
            url: 'http://example.com/member',
            cookies: [
              { name: 'session', value: '${session}' },
              { name: 'token', value: '${token}' },
              { name: 'theme', value: '${theme}' },
            ],
          },
        },
      ]
      variableDefined({ log: { entries } })
    },
    {
      name: 'UndefinedVariable',
      message: 'Cookie value referenced undefined variable: theme',
    }
  )
})

test('valid no references', t => {
  t.notThrows(() => {
    const entries = [{ request: { method: 'GET', url: 'http://example.com' } }]
    variableDefined({ log: { entries } })
  })
})

test('valid references', t => {
  t.notThrows(() => {
    const variables = [
      { name: 'one', type: VariableType.JSONPath, expression: 'one' },
      { name: 'two', type: VariableType.JSONPath, expression: 'two' },
      { name: 'three', type: VariableType.JSONPath, expression: 'three' },
      { name: 'four', type: VariableType.JSONPath, expression: 'four' },
    ]
    const entries = [
      {
        comment: 'Get values',
        request: { method: 'GET', url: 'http://example.com/values' },
        variables,
      },
      {
        comment: 'Use values',
        request: {
          method: '${one}',
          url: 'http://${one}${two}',
          queryString: [{ name: '${one}', value: '${two}' }],
          headers: [{ name: '${three}', value: '${four}' }],
          cookies: [
            {
              name: '${one}',
              value: '${two}',
              path: '${three}',
              domain: '${three}.${two}.${one}',
            },
          ],
          postData: {
            mimeType: 'text/plain',
            params: [
              {
                name: '${one}',
                value: '${two}',
                fileName: '${three}',
                contentType: '${three}/${one}',
              },
            ],
          },
        },
      },
    ]
    variableDefined({ log: { entries } })
  })
})
