import { sleep, check } from "k6";
import http from "k6/http";

import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export const options = {};

export default function main() {
  let response;

  const vars = {};

  response = http.post("http://test.k6.io");

  vars["token"] = jsonpath.query(response.json(), "$.userToken")[0];

  response = http.get("http://test.k6.io");
  check(response, {
    "status equals ${token}": response =>
      response.status.toString() === `${vars["token"]}`,
    "$.token contains ${token}": response =>
      jsonpath
        .query(response.json(), "$.token")
        .some(values => values.includes(vars["token"])),
    "body matches /${token}/": response => {
      const expr = new RegExp(`${vars["token"]}`);
      return expr.test(response.body);
    },
  });

  // Automatically added sleep
  sleep(1);
}
