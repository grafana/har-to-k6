import test from 'ava'
import imports from 'render/imports'
import { imports as makeImports } from 'make'

test('none', t => {
  const result = imports(makeImports())
  t.is(result, null)
})

test('k6', t => {
  const spec = makeImports()
  spec.group = true
  spec.check = true
  const result = imports(spec)
  t.is(result, `import { check, group } from "k6";`)
})

test('http', t => {
  const spec = makeImports()
  spec.http = true
  const result = imports(spec)
  t.is(result, `import http from "k6/http";`)
})

test('compat', t => {
  const spec = makeImports()
  spec.jsonpath = true
  spec.formUrlEncode = true
  spec.MimeBuilder = true
  const result = imports(spec)
  t.is(
    result,
    `import { formUrlEncode, jsonpath, MimeBuilder } from "./compat.js";`
  )
})

test('combined', t => {
  const spec = makeImports()
  spec.group = true
  spec.check = true
  spec.http = true
  spec.jsonpath = true
  spec.formUrlEncode = true
  spec.MimeBuilder = true
  const result = imports(spec)
  t.is(result, '' +
`import { check, group } from "k6";
import http from "k6/http";
import { formUrlEncode, jsonpath, MimeBuilder } from "./compat.js";`)
})
