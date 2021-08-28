import { sleep } from 'k6'
import http from 'k6/http'

import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js'
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = {}

export default function main() {
  let address, response

  const vars = {}

  // Request 1
  response = http.post(
    'https://test.k6.io/?foo=%7Bid%3A1%7D&bar=true',
    '{"proto": true}',
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  )

  vars['proto'] = jsonpath.query(response.json(), '$.proto')[0]

  address = new URL(`${vars['proto']}://bonus.apa.someurl.com/?q1=2`)

  if (!address.protocol) {
    address.protocol = 'https'
  }

  address.searchParams.append('q1', `${vars['proto']}`)
  address.searchParams.append('q2', '2')
  response = http.get(address.toString())

  // Automatically added sleep
  sleep(1)
}
