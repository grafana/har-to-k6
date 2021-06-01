import { sleep, check } from "k6";
import http from "k6/http";

import { URL } from "https://jslib.k6.io/url/1.0.0/index.js";
import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export const options = {
  stages: [
    { duration: "1m", target: 20 },
    { duration: "3m", target: 20 },
    { duration: "1m", target: 0 },
  ],
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
      },
    },
  },
};

export default function main() {
  let address, response;

  const vars = {};

  response = http.get("http://test.k6.io/");

  vars["firstName"] = jsonpath.query(response.json(), "$.first_name")[0];

  vars["lastName"] = jsonpath.query(response.json(), "$.last_name")[0];

  address = new URL("http://test.k6.io/");
  address.searchParams.append(
    "fullname",
    `${vars["firstName"]}-${vars["lastName"]}`
  );
  response = http.get(address.toString());
  check(response, {
    "$.full_name equals ${firstName} ${lastName}": response =>
      jsonpath
        .query(response.json(), "$.full_name")
        .some(value => value === `${vars["firstName"]} ${vars["lastName"]}`),
  });

  // Automatically added sleep
  sleep(1);
}