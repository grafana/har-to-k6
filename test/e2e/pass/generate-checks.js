import { sleep, check } from "k6";
import http from "k6/http";

import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export const options = {};

export default function main() {
  let response;

  response = http.post(
    "http://test.loadimpact.com/login",
    '{"user":"admin","password":"123"}',
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  check(response, {
    "status equals 200": response => response.status.toString() === "200",
    "$.value does not contain hello": response =>
      jsonpath
        .query(response.json(), "$.value")
        .some(values => !values.includes("hello")),
    "$.value is string": response =>
      jsonpath
        .query(response.json(), "$.value")
        .some(value => typeof value === "string"),
    "$.value is null": response =>
      jsonpath.query(response.json(), "$.value").some(value => value === null),
    "$.value is array": response =>
      jsonpath
        .query(response.json(), "$.value")
        .some(value => Array.isArray(value)),
    "$.value exists": response =>
      jsonpath.query(response.json(), "$.value").length > 0,
  });

  // Automatically added sleep
  sleep(1);
}
