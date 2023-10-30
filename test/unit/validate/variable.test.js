const test = require('ava')
const variable = require('validate/variable')
const { VariableType } = require('enum')
const { extrinsic } = require('aid')
const { assay: makeAssay } = require('make')

test('missing name', t => {
  t.throws(
    () => {
      variable({}, 0, 0, makeAssay())
    },
    { name: 'MissingVariableName' }
  )
})

test('invalid name type', t => {
  t.throws(
    () => {
      variable({ name: 5 }, 0, 0, makeAssay())
    },
    {
      name: 'InvalidVariableName',
      message: 'Variable name must be a string',
    }
  )
})

test('invalid name character', t => {
  t.throws(
    () => {
      variable({ name: 'badname{badbadname}' }, 8, 2, makeAssay())
    },
    {
      name: 'InvalidVariableName',
      message: "Variable name may not contain '}'",
    }
  )
})

test('missing type', t => {
  t.throws(
    () => {
      variable({ name: 'a' }, 0, 0, makeAssay())
    },
    { name: 'MissingVariableType' }
  )
})

test('invalid type type', t => {
  t.throws(
    () => {
      variable({ name: 'a', type: 3.1415 }, 0, 0, makeAssay())
    },
    {
      name: 'InvalidVariableType',
      message: 'Variable type must be a non-negative integer',
    }
  )
})

test('invalid type undefined', t => {
  const type = extrinsic(VariableType)
  t.throws(
    () => {
      variable({ name: 'a', type }, 0, 0, makeAssay())
    },
    {
      name: 'InvalidVariableType',
      message: `Variable type must be one of 0 (JSON Path), 1 (Regex), 2 (CSS Selector)`,
    }
  )
})

test('missing expression', t => {
  t.throws(
    () => {
      variable({ name: 'a', type: VariableType.JSONPath }, 0, 0, makeAssay())
    },
    { name: 'MissingVariableExpression' }
  )
})

test('invalid expression', t => {
  t.throws(
    () => {
      variable(
        {
          name: 'a',
          type: VariableType.JSONPath,
          expression: 5,
        },
        0,
        0,
        makeAssay()
      )
    },
    { name: 'InvalidVariableExpression' }
  )
})

test('invalid comment', t => {
  t.throws(() => {
    variable(
      {
        name: 'a',
        type: VariableType.JSONPath,
        expression: 'user.token',
        comment: 5,
      },
      0,
      0,
      makeAssay()
    )
  })
})

test('invalid attribute name', t => {
  t.throws(() => {
    variable(
      {
        name: 'a',
        type: VariableType.CSSSelector,
        expression: 'abcd',
        attribute: '',
      },
      0,
      0,
      makeAssay()
    )
  })
})

test('valid JSONPath', t => {
  t.notThrows(() => {
    variable(
      {
        name: 'a',
        type: VariableType.JSONPath,
        expression: 'user.token',
        comment: 'Extract session token',
      },
      0,
      0,
      makeAssay()
    )
  })
})

test('valid Regex', t => {
  t.notThrows(() => {
    variable(
      {
        name: 'a',
        type: VariableType.Regex,
        expression: 'token=([^\n]+)\n',
        comment: 'Extract session token',
      },
      0,
      0,
      makeAssay()
    )
  })
})

test('valid attribute name', t => {
  t.notThrows(() => {
    variable(
      {
        name: 'a',
        type: VariableType.CSSSelector,
        expression: 'abcd',
        attribute: 'name',
      },
      0,
      0,
      makeAssay()
    )
  })
})

test('attribute name is null', t => {
  t.notThrows(() => {
    variable(
      {
        name: 'a',
        type: VariableType.CSSSelector,
        expression: 'abcd',
        attribute: null,
      },
      0,
      0,
      makeAssay()
    )
  })
})

test('attribute name is undefined', t => {
  t.notThrows(() => {
    variable(
      {
        name: 'a',
        type: VariableType.CSSSelector,
        expression: 'abcd',
      },
      0,
      0,
      makeAssay()
    )
  })
})
