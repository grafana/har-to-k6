function imports(spec) {
  if (any(spec)) {
    const lines = []
    k6(spec, lines)
    http(spec, lines)
    k6JsLibs(spec, lines)
    return lines.join(`\n`)
  } else {
    return null
  }
}

function any(spec) {
  return Object.values(spec).find((value) => value)
}

function k6(spec, lines) {
  const items = []

  if (spec.check || spec.group || spec.sleep) {
    if (spec.sleep) {
      items.push('sleep')
    }
    if (spec.check) {
      items.push('check')
    }
    if (spec.group) {
      items.push('group')
    }
  }

  const content = items.join(`, `)
  if (items.length > 0) {
    lines.push(`import { ${content} } from "k6";`)
  }
}

function http(spec, lines) {
  if (spec.http) {
    lines.push(`import http from "k6/http";`)
  }
}

const K6_JS_LIBS = (() => {
  const BASE_URL = 'https://jslib.k6.io'
  return {
    jsonpath: `import jsonpath from "${BASE_URL}/jsonpath/1.0.2/index.js"`,
    formurlencoded: `import formurlencoded from "${BASE_URL}/form-urlencoded/3.0.0/index.js"`,
    // FIXME change to `import { URL } from "${BASE_URL}/url/0.0.1/index.js"`,
    url: `import { URL } from "./url.js"`,
  }
})()

function k6JsLibs(spec, lines) {
  if (spec.formUrlEncode || spec.jsonpath || spec.MimeBuilder) {
    if (lines.length > 0) {
      lines.push('\n')
    }

    if (spec.formUrlEncode) {
      lines.push(K6_JS_LIBS.formurlencoded)
    }

    if (spec.jsonpath) {
      lines.push(K6_JS_LIBS.jsonpath)
    }

    if (spec.url) {
      lines.push(K6_JS_LIBS.url)
    }
  }
}

module.exports = imports
