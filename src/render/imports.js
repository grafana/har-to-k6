function imports (spec) {
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

// NOTE: Update mappings when remote lib is up.
const K6_JS_LIBS = (() => {
  const BASE_URL = 'lib.k6.io';
  return {
    jsonpath: `import jsonpath from "${BASE_URL}/jsonpath/2.0.1/index.js"`,
    formUrlEncoded: `import formUrlEncoded from "${BASE_URL}/form-urlencoded/1.0.0/index.js"`,
    mimeBuilder: `import MimeBuilder from "${BASE_URL}/mimebuilder/4.0.0/main.js"`,
  }
})();

function k6JsLibs (spec, lines) {
  if (spec.formUrlEncode || spec.jsonpath || spec.MimeBuilder) {
    if (lines.length > 0) {
      lines.push('\n')
    }

    if (spec.formUrlEncode) {
      lines.push(K6_JS_LIBS.formUrlEncoded)
    }
    if (spec.jsonpath) {
      lines.push(K6_JS_LIBS.jsonpath)
    }
    if (spec.MimeBuilder) {
      lines.push(K6_JS_LIBS.mimeBuilder)
    }
  }
}

module.exports = imports
