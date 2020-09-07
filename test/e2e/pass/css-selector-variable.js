import { sleep } from "k6";
import http from "k6/http";

export const options = {};

export default function main() {
  let response;

  const vars = {};

  response = http.get("https://test.k6.io/my_messages.php");

  vars["entireForm"] = response
    .html()
    .find("form")
    .html();

  vars["redir"] = response
    .html()
    .find("input[name=redir]")
    .first()
    .attr("value");

  response = http.post(
    "https://test.k6.io/my_messages.php",
    {
      username: "admin",
      password: "123",
      redir: `${vars["redir"]}`,
      extra: `${vars["entireForm"]}`
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  // Automatically added sleep
  sleep(1);
}
