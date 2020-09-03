import test from 'ava'
import flow from 'parse/flow'
import { FlowItemType } from 'enum'
import { result as makeResult } from 'make'

test('1 external', (t) => {
  const result = makeResult()
  result.entries.push({ page: null })
  flow(result)
  t.deepEqual(result.flow, [
    { type: FlowItemType.External, entry: { page: null } },
  ])
})

test('3 external', (t) => {
  const result = makeResult()
  result.entries.push({ page: null })
  result.entries.push({ page: null })
  result.entries.push({ page: null })
  flow(result)
  t.deepEqual(result.flow, [
    { type: FlowItemType.External, entry: { page: null } },
    { type: FlowItemType.External, entry: { page: null } },
    { type: FlowItemType.External, entry: { page: null } },
  ])
})

test('1 group', (t) => {
  const result = makeResult()
  result.entries.push({ page: 'page1' })
  result.entries.push({ page: 'page1' })
  result.entries.push({ page: 'page1' })
  flow(result)
  t.deepEqual(result.flow, [
    {
      type: FlowItemType.Group,
      id: 'page1',
      entries: [{ page: 'page1' }, { page: 'page1' }, { page: 'page1' }],
    },
  ])
})

test('3 groups', (t) => {
  const result = makeResult()
  result.entries.push({ page: 'page1' })
  result.entries.push({ page: 'page1' })
  result.entries.push({ page: 'page1' })
  result.entries.push({ page: 'page2' })
  result.entries.push({ page: 'page3' })
  result.entries.push({ page: 'page3' })
  flow(result)
  t.deepEqual(result.flow, [
    {
      type: FlowItemType.Group,
      id: 'page1',
      entries: [{ page: 'page1' }, { page: 'page1' }, { page: 'page1' }],
    },
    {
      type: FlowItemType.Group,
      id: 'page2',
      entries: [{ page: 'page2' }],
    },
    {
      type: FlowItemType.Group,
      id: 'page3',
      entries: [{ page: 'page3' }, { page: 'page3' }],
    },
  ])
})

test('mixed', (t) => {
  const result = makeResult()
  result.entries.push({ page: null })
  result.entries.push({ page: 'page1' })
  result.entries.push({ page: 'page1' })
  result.entries.push({ page: null })
  result.entries.push({ page: null })
  result.entries.push({ page: 'page2' })
  flow(result)
  t.deepEqual(result.flow, [
    { type: FlowItemType.External, entry: { page: null } },
    {
      type: FlowItemType.Group,
      id: 'page1',
      entries: [{ page: 'page1' }, { page: 'page1' }],
    },
    { type: FlowItemType.External, entry: { page: null } },
    { type: FlowItemType.External, entry: { page: null } },
    {
      type: FlowItemType.Group,
      id: 'page2',
      entries: [{ page: 'page2' }],
    },
  ])
})

test('split group', (t) => {
  const result = makeResult()
  result.entries.push({ page: 'page1' })
  result.entries.push({ page: null })
  result.entries.push({ page: 'page1' })
  result.entries.push({ page: 'page1' })
  flow(result)
  t.deepEqual(result.flow, [
    {
      type: FlowItemType.Group,
      id: 'page1',
      entries: [{ page: 'page1' }, { page: 'page1' }, { page: 'page1' }],
    },
    { type: FlowItemType.External, entry: { page: null } },
  ])
})
