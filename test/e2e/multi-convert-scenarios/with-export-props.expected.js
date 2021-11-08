import { sleep, group } from 'k6'
import http from 'k6/http'

import { FormData } from 'https://jslib.k6.io/formdata/0.0.1/index.js'

export const options = {
  scenarios: {
    scenario_1: {
      executor: 'constant-vus',
      vus: 50,
      duration: '5m',
      gracefulStop: '0s',
      tags: { test_type: 'website' },
    },
    scenario_2: {
      executor: 'constant-arrival-rate',
      rate: 90,
      timeUnit: '1m',
      duration: '5m',
      preAllocatedVUs: 10,
      maxVUs: 10,
      tags: { test_type: 'api' },
      env: { MY_CROC_ID: '1' },
      exec: 'scenario2',
    },
  },
  discardResponseBodies: true,
  thresholds: {
    'http_req_duration{test_type:api}': ['p(95)<250', 'p(99)<350'],
    'http_req_duration{test_type:website}': ['p(99)<500'],
    'http_req_duration{scenario:scenario1}': ['p(99)<300'],
  },
}

export function scenario1a() {
  let response

  // This is from Scenario 1
  group('page_1', function () {
    response = http.get('http://test.k6.io/scenario=1')
  })

  // Automatically added sleep
  sleep(1)
}

export function scenario2() {
  let formData, response

  // Request 1
  formData = new FormData()
  formData.boundary = '---boundary'
  formData.append('hello', { data: 'world', content_type: 'text/plain' })

  response = http.post('http://test.k6.io/value-pairs', formData.body(), {
    headers: {
      'content-type': 'multipart/form-data; boundary=---boundary',
    },
  })

  // Request 2
  formData = new FormData()
  formData.boundary = '---boundary'
  formData.append('file', {
    data:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T',
    filename: 'jpeg-quality-30.jpg',
    content_type: 'image/jpeg',
  })

  response = http.post('http://test.k6.io/image', formData.body(), {
    headers: {
      'content-type': 'multipart/form-data; boundary=---boundary',
    },
  })

  // Request 3
  formData = new FormData()
  formData.boundary = '---boundary'
  formData.append('hello', {
    data: '`\'"world"\'`*!',
    content_type: 'text/plain',
  })

  response = http.post('http://test.k6.io/value-pairs-chars', formData.body(), {
    headers: {
      'content-type': 'multipart/form-data; boundary=---boundary',
    },
  })

  // Request 4
  formData = new FormData()
  formData.boundary = '---boundary'
  formData.append('file', {
    data:
      'data:text/csv;base64,77u/ImZhciIsImhhcHBpbHkiLCJ3YXRjaCIsImNhcmVmdWxseSIsImdvdmVybm1lbnQiLCJzYX',
    filename: 'random.csv',
    content_type: 'text/csv',
  })

  response = http.post('http://test.k6.io/csv', formData.body(), {
    headers: {
      'content-type': 'multipart/form-data; boundary=---boundary',
    },
  })

  // Request 5
  formData = new FormData()
  formData.boundary = '---boundary'
  formData.append('hello', { data: 'world', content_type: 'text/plain' })
  formData.append('hola', { data: 'amigo', content_type: 'text/plain' })
  formData.append('labas', { data: 'pasauli', content_type: 'text/plain' })

  response = http.post(
    'http://test.k6.io/multiple-value-pairs',
    formData.body(),
    {
      headers: {
        'content-type': 'multipart/form-data; boundary=---boundary',
      },
    }
  )

  // Automatically added sleep
  sleep(1)
}
