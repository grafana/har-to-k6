const babel = require('prettier/parser-babel')

const BUILD = Symbol('build')
const UNQUOTED = Symbol('unquoted')

const hasOwnProperty = (obj, prop) =>
  Object.prototype.hasOwnProperty.call(obj, prop)

const makeTemplate = (build, render) => {
  render[BUILD] = build

  const map = (fn) =>
    makeTemplate(
      (ctx, ...args) => build(fn(ctx), ...args),
      (ctx) => render(fn(ctx))
    )

  const inContext = (ctx) => map(() => ctx)
  const assign = (ctx2) => map((ctx1) => Object.assign({}, ctx1, ctx2))
  const when = (propOrFn) => {
    const fn = typeof propOrFn === 'string' ? (ctx) => ctx[propOrFn] : propOrFn

    return makeTemplate(
      (ctx, result) => (fn(ctx) ? build(ctx, result) : result),
      (ctx) => render(ctx)
    )
  }

  render.map = map
  render.inContext = inContext
  render.assign = assign
  render.when = when

  return render
}

const push = (arr, value) => {
  arr.push(value)

  return arr
}

const isValidIdentifier = (key) => {
  try {
    new Function(key, `return ${key}`)

    return true
  } catch {
    return false
  }
}

const stringify = (ctx, expr, result) => {
  switch (typeof expr) {
    case 'undefined':
      return push(result, 'undefined')

    case 'string':
    case 'number':
    case 'boolean':
      return push(result, JSON.stringify(expr))

    case 'function':
      if (expr[BUILD]) {
        return expr[BUILD](ctx, result)
      }

      return expr.toString()

    case 'object': {
      if (expr === null) {
        return push(result, 'null')
      }

      if (expr[UNQUOTED]) {
        return push(result, expr.value.toString())
      }

      if (Array.isArray(expr)) {
        push(result, '[')

        for (let i = 0; i < expr.length; ++i) {
          stringify(ctx, expr[i], result)

          if (i !== expr.length - 1) {
            result.push(',')
          }
        }

        return push(result, ']')
      }

      const keys = Object.keys(expr)

      push(result, '{')

      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i]

        push(result, isValidIdentifier(key) ? key : JSON.stringify(key))
        push(result, ':')

        stringify(ctx, expr[key], result)

        if (i !== keys.length - 1) {
          push(result, ',')
        }
      }

      return push(result, '}')
    }

    default:
      return result
  }
}

const evaluate = (ctx, expr, result) => {
  if (typeof expr === 'function' && !expr[BUILD]) {
    expr = expr(ctx)
  }

  return stringify(ctx, expr, result)
}

exports.from = (prop, defaultValue = undefined) => (ctx) =>
  hasOwnProperty(ctx, prop) ? ctx[prop] : defaultValue

exports.unquote = (value) => ({
  [UNQUOTED]: true,
  value,
})

exports.js = (strings, ...expressions) => {
  const build = (ctx, result) => {
    return strings.reduce((result, str, index) => {
      result.push(str)

      if (index < expressions.length) {
        evaluate(ctx, expressions[index], result)
      }

      return result
    }, result)
  }

  return makeTemplate(
    build,
    (ctx = {}, { validate = false, output = 'string' } = {}) => {
      const script = build(ctx, []).join('')
      const ast = validate ? babel.parsers.babel.parse(script) : null

      if (output === 'string') {
        return script
      }

      if (output === 'ast') {
        return ast || babel.parsers.babel.parse(script)
      }

      throw new Error(`Invalid output type '${output}'`)
    }
  )
}
