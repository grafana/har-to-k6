import { sleep } from 'k6'
import http from 'k6/http'

export const options = {}

export default function main() {
  let response

  response = http.get(
    'https://example.com/directory?param1=param1-value&param2=param2-value&json-uri=%7B%22value%22%3Atrue%7D&not-in-request=true&not-in-request=%7B%22data%22%3Atrue%7D',
  )

  response = http.get(
    'https://example.com/api/layers/layer?assetId=bdaed40b-bed9-4b6f-abc4-56093ed1a43c&assetLayer=a9f5d33e-ab3b-4435-b3f6-427bc5aeb9c1&assetLayerConfiguration={%22Fabric%22:{%22assetId%22:%22bcff95a5-1b8c-4bad-a238-d8d6ca9c76ac%22},%22Collar%22:{%22assetId%22:%224c6b7595-083c-4905-a8f9-ae62d6a89c0e%22},%22Cuff%22:{%22assetId%22:%22acba39b1-05e7-43ae-bf80-1305a3a9277e%22},%22Pocket%22:{%22assetId%22:%2223eb7c46-b9da-4b68-80fa-d12971d46a93%22}}&orgId=0f556303-22e6-4015-b3b7-17438a673967',
  )

  // Automatically added sleep
  sleep(1)
}
