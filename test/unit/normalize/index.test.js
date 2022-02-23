import test from 'ava'
import normalize from '../../../src/normalize'
import { SleepPlacement } from '../../../src/enum'

class MockArchive {
  constructor() {
    this.archive = { log: { pages: [], entries: [] } }
  }

  addPage(props = {}) {
    this.archive.log.pages.push({
      id: '',
      ...props,
    })

    return this
  }

  addEntry(props = {}) {
    this.archive.log.entries.push({
      pageref: '',
      ...props,
    })

    return this
  }
}

test('falsy archive', t => {
  // Unmodified archive is returned
  t.is(normalize(-1), -1)
})

test('falsy archive.log', t => {
  const invalid = { test: true }
  // Unmodified archive is returned
  t.is(normalize(invalid), invalid)
})

test('falsy archive.log.pages', t => {
  const archive = new MockArchive()
    .addEntry({
      id: 'last',
      startedDateTime: '1982-06-06T00:00:10.000Z',
    })
    .addEntry({
      id: 'first',
      startedDateTime: '1982-06-06T00:00:00.000Z',
    })
    .addEntry({
      id: 'middle',
      startedDateTime: '1982-06-06T00:00:05.000Z',
    }).archive
  delete archive.pages

  const result = normalize(archive)
  t.notDeepEqual(result, archive)
})

test('falsy archive.log.entries', t => {
  const invalid = { log: { pages: [] } }
  // Unmodified archive is returned
  t.is(normalize(invalid), invalid)
})

test('entries are sorted', t => {
  const archive = new MockArchive()
    .addEntry({
      id: 'last',
      startedDateTime: '1982-06-06T00:00:10.000Z',
    })
    .addEntry({
      id: 'first',
      startedDateTime: '1982-06-06T00:00:00.000Z',
    })
    .addEntry({
      id: 'middle',
      startedDateTime: '1982-06-06T00:00:05.000Z',
    }).archive
  const result = normalize(archive)
  t.is(result.log.entries[0].id, 'first')
  t.is(result.log.entries[1].id, 'middle')
  t.is(result.log.entries[2].id, 'last')
})

test('option.addSleep=true', t => {
  const archive = new MockArchive()
    .addPage({ id: 'page_2' })
    .addPage({ id: 'page_1' })
    .addEntry({
      id: 'last',
      pageref: 'page_2',
      startedDateTime: '1982-06-06T00:00:10.509Z',
    })
    .addEntry({
      id: 'third',
      pageref: 'page_2',
      startedDateTime: '1982-06-06T00:00:10.000Z',
    })
    .addEntry({
      id: 'first',
      pageref: 'page_1',
      startedDateTime: '1982-06-06T00:00:00.000Z',
    })
    .addEntry({
      id: 'second',
      pageref: 'page_1',
      startedDateTime: '1982-06-06T00:00:00.400Z',
    }).archive

  const result = normalize(archive, { addSleep: true })
  t.deepEqual(result.log.entries[0].sleep, undefined) // less than 500ms to next entry (MIN_SLEEP)
  t.deepEqual(result.log.entries[1].sleep, [{ [SleepPlacement.After]: 9600 }]) // first chile (no sleep)
  t.deepEqual(result.log.entries[2].sleep, [{ [SleepPlacement.After]: 500 }]) // rounded
  t.deepEqual(result.log.entries[3].sleep, undefined) // last entry has no sleep
})

test('x-www-form-urlencoded values are decoded once', t => {
  const archive = new MockArchive().addEntry({
    request: {
      postData: {
        mimeType: 'application/x-www-form-urlencoded',
        params: [
          {
            name: 'name',
            value: '80%25',
          },
        ],
      },
    },
  }).archive

  const normalized = normalize(archive)
  const normalizedTwice = normalize(normalized)

  t.is(normalized.log.entries[0].request.postData.params[0].value, '80%')
  t.is(normalizedTwice.log.entries[0].request.postData.params[0].value, '80%')
})
