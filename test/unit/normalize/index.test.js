import test from 'ava'
import normalize from '../../../src/normalize'
import { SleepPlacement } from '../../../src/enum'

const mockSleep = [{ [SleepPlacement.After]: 10000 }]

function createArchive() {
  return {
    log: {
      // Reversed order
      pages: [
        { id: 'page_3', startedDateTime: '2021-01-01T00:00:20.000Z' },
        { id: 'page_2', startedDateTime: '2021-01-01T00:00:10.000Z' },
        { id: 'page_1', startedDateTime: '2021-01-01T00:00:00.000Z' },
      ],
      // Wonky order
      entries: [
        { pageref: 'page_3', startedDateTime: '2021-01-01T00:00:22.000Z' },
        { pageref: 'page_3', startedDateTime: '2021-01-01T00:00:22.400Z' }, // less than 500ms after preceding entry
        { pageref: 'page_3', startedDateTime: '2021-01-01T00:00:21.000Z' },

        { pageref: 'page_2', startedDateTime: '2021-01-01T00:00:12.000Z' },
        { pageref: 'page_2', startedDateTime: '2021-01-01T00:00:12.400Z' }, // less than 500ms after preceding entry
        {
          pageref: 'page_2',
          startedDateTime: '2021-01-01T00:00:11.000Z',
          sleep: mockSleep,
        },

        { pageref: 'page_1', startedDateTime: '2021-01-01T00:00:02.000Z' },
        { pageref: 'page_1', startedDateTime: '2021-01-01T00:00:02.400Z' }, // less than 500ms after preceding entry
        { pageref: 'page_1', startedDateTime: '2021-01-01T00:00:01.000Z' },
      ],
    },
  }
}

test('falsy archive', (t) => {
  // Unmodified archive is returned
  t.is(normalize(-1), -1)
})

test('falsy archive.log', (t) => {
  const invalid = { test: true }
  // Unmodified archive is returned
  t.is(normalize(invalid), invalid)
})

test('falsy archive.log.pages', (t) => {
  const invalid = { log: { entries: [] } }
  // Unmodified archive is returned
  t.is(normalize(invalid), invalid)
})

test('falsy archive.log.entries', (t) => {
  const invalid = { log: { pages: [] } }
  // Unmodified archive is returned
  t.is(normalize(invalid), invalid)
})

test('pages are sorted', (t) => {
  const archive = createArchive()
  const result = normalize(archive)
  t.deepEqual(result.log.pages[2], archive.log.pages[0])
})

test('entries are sorted', (t) => {
  const archive = createArchive()
  const result = normalize(archive)
  t.deepEqual(result.log.entries[0], archive.log.entries[8])
})

test('option.addSleep=true', (t) => {
  const archive = createArchive()
  const result = normalize(archive, { addSleep: true })
  t.deepEqual(result.log.entries[3].sleep, mockSleep) // already has sleep (dont modify)
  t.deepEqual(result.log.entries[6].sleep, undefined) // first chile (no sleep)
  t.deepEqual(result.log.entries[7].sleep, [{ [SleepPlacement.Before]: 1000 }]) // 1000ms
  t.deepEqual(result.log.entries[8].sleep, undefined) // 400ms (no sleep)
})
