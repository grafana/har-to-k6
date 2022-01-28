import { sleep } from 'k6'
import http from 'k6/http'

import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js'
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = {}

export default function main() {
  let response

  const vars = {}

  // POST data with percent-encoded name and value fields
  response = http.post(
    'https://httpbin.test.k6.io/post',
    {
      'field[1]': 'value[1]',
      'field[2]': 'value[2]',
      'field[3]': 'value[3]',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )

  vars['accessToken'] = jsonpath.query(response.json(), 'user.token')[0]

  // POST data with plural percent-encoded name and value fields
  response = http.post(
    'https://httpbin.test.k6.io/post',
    'field%5B1%5D=value%5B1%5D%2Cvalue%5B1%5D&field%5B2%5D=value%5B2%5D',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )

  // POST data with plural percent-encoded name and value fields and variables
  response = http.post(
    'https://httpbin.test.k6.io/post',
    new URLSearchParams({
      [`field[${vars['accessToken']}]`]: [
        `value[${vars['accessToken']}]`,
        `value[${vars['accessToken']}]`,
        `value[${vars['accessToken']}]`,
      ],
    }).toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )

  // Automatically added sleep
  sleep(1)
}
