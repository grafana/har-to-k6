const test = require('ava')
const { js, unquote, from } = require('../../../src/codegen')

const opts = { validate: true }

test('should return same template when interpolation is not used', t => {
  const template = js`let test = "hello"`
  const result = template({}, opts)

  t.is('let test = "hello"', result)
})

test('should splice undefined value', t => {
  const template = js`let test = ${undefined}`
  const result = template({}, opts)

  t.is('let test = undefined', result)
})

test('should splice null value', t => {
  const template = js`let test = ${null}`
  const result = template({}, opts)

  t.is('let test = null', result)
})
test('should splice value of number value', t => {
  const template = js`let test = ${3}`
  const result = template({}, opts)

  t.is('let test = 3', result)
})

test('should splice value of boolean value', t => {
  const template = js`let test = ${false}`
  const result = template({}, opts)

  t.is('let test = false', result)
})

test('should splice value of string value', t => {
  const template = js`let test = ${'hello'}`
  const result = template({}, opts)

  t.is('let test = "hello"', result)
})

test('should splice value of array literal', t => {
  const template = js`let test = ${[1, 2, 3]}`
  const result = template({}, opts)

  t.is('let test = [1,2,3]', result)
})

test('should splice value of object literal', t => {
  const template = js`let test = ${{ a: 1, b: 2, c: 3 }}`
  const result = template({}, opts)

  t.is('let test = {a:1,b:2,c:3}', result)
})

test(`should pass context on to functions passed to interpolation`, t => {
  const template = js`let test = ${({ a, b }) => a + b}`
  const result = template({ a: 1, b: 2 })

  t.is('let test = 3', result)
})

test(`two templates should compose`, t => {
  const first = js`() => myFunc()`
  const second = js`let test = ${first}`

  const result = second({}, opts)

  t.is('let test = () => myFunc()', result)
})

test(`context should be propagated to both composed templates`, t => {
  const first = js`() => myFunc(${({ a }) => a})`
  const second = js`let test = ${first}`

  const result = second({ a: 'hello' }, opts)

  t.is('let test = () => myFunc("hello")', result)
})

test(`calling unquote should insert unescaped value`, t => {
  const template = js`let ${unquote('test')} = true`
  const result = template({ a: 'hello' }, opts)

  t.is('let test = true', result)
})

test(`calling map on template should allow changes to the context`, t => {
  const template = js`let test = ${a => a}`.map(a => a + 1)
  const result = template(1, opts)

  t.is('let test = 2', result)
})

test(`calling inContext on template should replace context with the given context`, t => {
  const template = js`let test = ${a => a}`.inContext(2)
  const result = template(1, opts)

  t.is('let test = 2', result)
})

test(`calling assign on template should extend the given context with values of given object literal`, t => {
  const template = js`let test = ${({ a, b }) => a + b}`.assign({ b: 2 })
  const result = template({ a: 1 }, opts)

  t.is('let test = 3', result)
})

test('using from function in interpolation should insert value of property from the context', t => {
  const template = js`let test = ${from('myProp')}`
  const result = template({ myProp: true }, opts)

  t.is('let test = true', result)
})

test('using from function in interpolation should insert default value when property does not exist in context', t => {
  const template = js`let test = ${from('myProp', false)}`
  const result = template({}, opts)

  t.is('let test = false', result)
})
