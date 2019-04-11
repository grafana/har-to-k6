import test from 'ava'
import cookie from 'validate/cookie'
import { makeAssay } from 'aid'

test('missing name', t => {
  t.throws(() => {
    cookie({}, 0, 0, makeAssay())
  }, { name: 'MissingCookieName' })
})

test('invalid name', t => {
  t.throws(() => {
    cookie({ name: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidCookieName' })
})

test('duplicate name', t => {
  const assay = makeAssay()
  cookie({ name: 'session' }, 8, 0, assay)
  t.throws(() => {
    cookie({ name: 'session' }, 8, 1, assay)
  }, { name: 'DuplicateCookieName' })
})

test('invalid value', t => {
  t.throws(() => {
    cookie({ name: 'session', value: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidCookieValue' })
})

test('invalid path', t => {
  t.throws(() => {
    cookie({ name: 'session', path: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidCookiePath' })
})

test('invalid domain', t => {
  t.throws(() => {
    cookie({ name: 'session', domain: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidCookieDomain' })
})

test('invalid expires type', t => {
  t.throws(() => {
    cookie({ name: 'session', expires: 5 }, 0, 0, makeAssay())
  }, {
    name: 'InvalidCookieExpiration',
    message: 'Invalid cookie expiration (0:0): must be string'
  })
})

test('invalid expires format', t => {
  t.throws(() => {
    cookie({ name: 'session', expires: '5 Feb 2020' }, 0, 0, makeAssay())
  }, {
    name: 'InvalidCookieExpiration',
    message: 'Invalid cookie expiration (0:0): must be ISO 8601 datetime'
  })
})

test('invalid httpOnly', t => {
  t.throws(() => {
    cookie({ name: 'session', httpOnly: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidCookieHttpOnly' })
})

test('invalid secure', t => {
  t.throws(() => {
    cookie({ name: 'session', secure: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidCookieSecure' })
})

test('invalid comment', t => {
  t.throws(() => {
    cookie({ name: 'session', comment: 5 }, 0, 0, makeAssay())
  }, { name: 'InvalidComment' })
})

test('valid minimal', t => {
  t.notThrows(() => {
    cookie({ name: 'session' }, 0, 0, makeAssay())
  })
})

test('valid empty value', t => {
  t.notThrows(() => {
    cookie({ name: 'session', value: '' }, 0, 0, makeAssay())
  })
})

test('valid full', t => {
  t.notThrows(() => {
    cookie({
      name: 'session',
      value: '123876',
      path: '/',
      domain: 'example.com',
      expires: new Date().toISOString(),
      httpOnly: true,
      secure: true,
      cookie: 'Perform operation under an active session'
    }, 0, 0, makeAssay())
  })
})
