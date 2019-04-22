function imports (spec) {
  if (any(spec)) {
    const lines = []
    k6(spec, lines)
    http(spec, lines)
    compat(spec, lines)
    return lines.join(`\n`)
  } else {
    return null
  }
}

function any (spec) {
  return Object.values(spec).find(value => value)
}

function k6 (spec, lines) {
  if (spec.check || spec.group) {
    const items = []
    if (spec.check) {
      items.push('check')
    }
    if (spec.group) {
      items.push('group')
    }
    const content = items.join(`, `)
    lines.push(`import { ${content} } from "k6";`)
  }
}

function http (spec, lines) {
  if (spec.http) {
    lines.push(`import http from "k6/http";`)
  }
}

function compat (spec, lines) {
  if (spec.formUrlEncode || spec.jsonpath || spec.MimeBuilder) {
    const items = []
    if (spec.formUrlEncode) {
      items.push('formUrlEncode')
    }
    if (spec.jsonpath) {
      items.push('jsonpath')
    }
    if (spec.MimeBuilder) {
      items.push('MimeBuilder')
    }
    const content = items.join(`, `)
    lines.push(`import { ${content} } from "./compat.js";`)
  }
}

module.exports = imports
