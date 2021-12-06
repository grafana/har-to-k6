import { sleep, check } from 'k6'
import http from 'k6/http'

import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = {}

export default function main() {
  let response

  const vars = {}

  response = http.get('http://test.k6.io')

  vars['firstName'] = jsonpath.query(response.json(), '$.first_name')[0]

  vars['lastName'] = jsonpath.query(response.json(), '$.last_name')[0]

  response = http.get('http://test.k6.io')
  check(response, {
    '$.mixed equals ${firstName} bar': response =>
      jsonpath
        .query(response.json(), '$.mixed')
        .some(value => value === `${vars['firstName']} bar`),
    '$.first_name equals ${firstName}': response =>
      jsonpath
        .query(response.json(), '$.first_name')
        .some(value => value === vars['firstName']),
    '$.full_name equals ${firstName} ${lastName}': response =>
      jsonpath
        .query(response.json(), '$.full_name')
        .some(value => value === `${vars['firstName']} ${vars['lastName']}`),
    "$.full_name_plus_random_strings equals Hello ${firstName}-${lastName}, what's up?": response =>
      jsonpath
        .query(response.json(), '$.full_name_plus_random_strings')
        .some(
          value =>
            value ===
            `Hello ${vars['firstName']}-${vars['lastName']}, what's up?`,
        ),
  })

  // Automatically added sleep
  sleep(1)
}
