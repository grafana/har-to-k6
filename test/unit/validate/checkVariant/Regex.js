const test = require('ava')
const Regex = require('validate/checkVariant/Regex')
const { CheckCondition, CheckSubject, CheckType } = require('enum')
const { assay: makeAssay } = require('make')

test('missing subject', t => {
  t.throws(
    () => {
      Regex({ type: CheckType.Regex }, 0, 0, makeAssay())
    },
    { name: 'MissingCheckSubject' }
  )
})

test('missing expression', t => {
  t.throws(
    () => {
      Regex(
        {
          type: CheckType.Regex,
          subject: CheckSubject.ResponseBody,
        },
        0,
        0,
        makeAssay()
      )
    },
    { name: 'MissingCheckExpression' }
  )
})

test('invalid expression', t => {
  t.throws(
    () => {
      Regex(
        {
          type: CheckType.Regex,
          subject: CheckSubject.ResponseBody,
          expression: '[',
        },
        0,
        0,
        makeAssay()
      )
    },
    { name: 'InvalidCheckExpression' }
  )
})

test('invalid condition', t => {
  t.throws(
    () => {
      Regex(
        {
          type: CheckType.Regex,
          subject: CheckSubject.ResponseBody,
          condition: CheckCondition.Contains,
          expression: 'User .+ logged in',
        },
        0,
        0,
        makeAssay()
      )
    },
    { name: 'InvalidCheckCondition' }
  )
})

test('invalid value', t => {
  t.throws(
    () => {
      Regex(
        {
          type: CheckType.Regex,
          subject: CheckSubject.ResponseBody,
          expression: 'User .+ logged in',
          value: 'User847',
        },
        0,
        0,
        makeAssay()
      )
    },
    { name: 'InvalidCheckValue' }
  )
})

test('valid', t => {
  t.notThrows(() => {
    Regex(
      {
        type: CheckType.Regex,
        subject: CheckSubject.ResponseBody,
        expression: 'User .+ logged in',
      },
      0,
      0,
      makeAssay()
    )
  })
})
