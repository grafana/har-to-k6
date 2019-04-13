import test from 'ava'
import flow from 'parse/flow'
import { makeResult } from 'aid'
import { ExternalScope } from 'sym'

function makeEntry (index, method, url) {
  return {
    index,
    request: {
      method,
      address: url,
      query: new Map(),
      headers: new Map(),
      cookies: new Map(),
      post: new Map()
    },
    checks: new Map(),
    variables: new Map()
  }
}

function makeEntries (count) {
  const entries = []
  for (let i = 0; i < count; i++) {
    const entry = makeEntry(i, 'GET', `http://${i}.example.com`)
    entries.push(entry)
  }
  return entries
}

test('external', t => {
  const entries = makeEntries(3)
  const result = makeResult()
  result.scopes.set(ExternalScope, new Set([
    entries[0], entries[2], entries[1]
  ]))
  flow(result)
  t.deepEqual(result.flow, [
    { id: ExternalScope, entries: [ entries[0], entries[1], entries[2] ] }
  ])
})

test('explicit', t => {
  const entries = makeEntries(3)
  const result = makeResult()
  result.pages.set('page1', { name: 'Page 1', index: 0 })
  result.scopes.set('page1', new Set([ entries[0], entries[2], entries[1] ]))
  flow(result)
  t.deepEqual(result.flow, [
    { id: 'page1', entries: [ entries[0], entries[1], entries[2] ] }
  ])
})

test('implicit', t => {
  const entries = makeEntries(3)
  const result = makeResult()
  result.scopes.set('page1', new Set([ entries[0], entries[2], entries[1] ]))
  flow(result)
  t.deepEqual(result.flow, [
    { id: 'page1', entries: [ entries[0], entries[1], entries[2] ] }
  ])
})

test('mixed', t => {
  const entries = makeEntries(3 * 3)
  const result = makeResult()
  result.pages.set('page1', { name: 'Page 1', index: 0 })
  result.scopes.set('page2', new Set([ entries[3], entries[5], entries[4] ]))
  result.scopes.set(ExternalScope, new Set([
    entries[6], entries[8], entries[7]
  ]))
  result.scopes.set('page1', new Set([ entries[0], entries[2], entries[1] ]))
  flow(result)
  t.deepEqual(result.flow, [
    { id: ExternalScope, entries: [ entries[6], entries[7], entries[8] ] },
    { id: 'page1', entries: [ entries[0], entries[1], entries[2] ] },
    { id: 'page2', entries: [ entries[3], entries[4], entries[5] ] }
  ])
})
