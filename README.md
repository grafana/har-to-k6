# Config format
The specification describes a JSON config format designed to act as a static representation of a K6 script.

The proposed format is an extension of [HAR 1.2](http://www.softwareishard.com/blog/har-12-spec/)
Fields deviating from the HAR spec are:

```
log.entries[0].checks: Array<Check>
log.entries[0].variables: Array<Variable>
```
~~log.entries[0].request.postData.file: String~~

## Request body configuration

> A text based body with selection for common text content types (application/json, text/xml, text/plain etc.)

Below are example of configuration for different mime-types.
HAR path: `log.entries[0].request.postData`

#### application/json

```
{
  postData: {
    "mimeType": "application/json; charset=UTF-8",
    "text": "{\"foo\":\"bar\",\"hello\":\"world!\"}"
  }
}
```

#### application/x-www-form-urlencoded

```
{
  postData: {
    mimeType: "application/x-www-form-urlencoded",
    text: "login=admin&password=123",
    params: [
      {
        name: "login",
        value: "admin"
      },
      {
        name: "password",
        value: "123"
      }
    ]
  }
}
```

#### text/plain

```
{
  postData: {
    "mimeType": "text/plan; charset=UTF-8",
    "text": "Hello world"
  }
}
```

#### text/xml

```
{
  postData: {
    "mimeType": "text/xml; charset=UTF-8",
    "text": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<note>\r\n  <to>Foo</to>\r\n  <from>Bar</Ffrom>\r\n  <heading>Reminder</heading>\r\n  <body>Hello world!</body>\r\n</note>\r\n"
  }
}
```

#### image/png
```
{
  postData: {
    "mimeType": "text/xml; charset=UTF-8",
    "text": base64encoded(file)
  }
}

// NOTE: Second iteration
{
  postData: {
    "mimeType": "text/xml; charset=UTF-8",
    "file": "mypicture.png" // custom field
  }
}
```

## Uploading files

> "Uploading a binary file with selection for common binary content types (and we should do basic detection of the appropriate type)"

Uploaded files will be base64encoded and added to [postData text like](#text/plain)

Add a field on k6-test model `files` or `test_files`.
The uploaded files would be packaged with the K6 archive and be referenceable in [postData](#image/png). This would then generate a K6 script like [this](#generated-k6-script).

```
{
  test_files: [
    {
      file: "mypicture.png",
      mimeType: "image/png"
    }
  ]
}
```

#### Generated K6 script

```
import http from "k6/http";
import { sleep } from "k6";

let binFile = open("./mypicture.png", "b");

export default function() {
  var res = http.post("https://api.example.com/upload", {
    file: http.file(binFile, "mypicture.png")
  });
  sleep(3);
}
```

## Assertions _(Checks)_

> Support for adding assertions (which would become k6 checks) by looking for string, JSON expression or regex in a choice of:
>
> - Response headers
> - Response body

Extend [entry](#har-entry) with custom field `checks`

### Type definition

```
type Check = {
  name: String,
  type: CheckTypeVariant,
  subject: CheckSubjectVariant,
  condition: CheckConditionVariant,
  value: String
}

type CheckTypeVariant =
  | Text
  | ResponseTime
  | Regex
  | JSONPathValue
  | JSONPath;

type CheckSubjectVariant =
  | HttpStatusCode
  | ResponseBody
  | ResponseHeaders;

type CheckConditionVariant =
  | Contains
  | NotContains
  | Equals
  | StartsWith
  | EndsWith
  | Includes;
```

### HAR example

HAR path: `log.entries[0].request.checks`

```
{
  checks: [
    {
      name: "Body includes Hello world",
      type: 0,
      subject: 1,
      condition: 5,
      value: "Hello world"
    }
  ]
}
```
### Generated K6 script
The above config would generate

```
check(res, {
  "Body includes Hello world": (r) => r.includes("Hello world")
});
```


## Global variables

> Support for extracting a piece of data from a response into a variable name (would become a JS variable in k6 script) by using regex or JSON expression in a choice of:
> - Response headers
> - Response body

Extend [entry](#har-entry) with custom field `variables`

### Type definition

```
type Variable = {
  name: String,
  type: VariableTypeVariant,
  subject: VariableSubjectVariant,
  expression: String
}

type VariableTypeVariant =
  | JSONPath
  | Regex;

type VariableSubjectVariant =
  | ResponseBody
  | ResponseHeaders;
```

### HAR example

HAR path: `log.entries[0].variables`

```
{
  variables: [
    {
      name: "accessToken",
      type: 0,
      expression: "data.user.token"
    }
  ]
}
```

## HAR entry
Path `log.entries[0]`
```
{
  pageref: "page_0",
  startedDateTime: "2009-04-16T12:07:23.596Z",
  time: 50,
  request: {},
  response: {},
  cache: {},
  timings: {},
  serverIPAddress: "10.0.0.1",
  connection: "52492",
  comment: ""
}
```

## HAR request property
Path `log.entries[0].request`
```
{
  method: "GET",
  url: "http://www.example.com/path/?param=value",
  httpVersion: "HTTP/1.1",
  cookies: [],
  headers: [],
  queryString: [],
  postData: {},
  headersSize: 150,
  bodySize: 0,
  comment: ""
}
```

## HAR postData property
Path `log.entries[0].request.postData`
```
{
  mimeType: "application/x-www-form-urlencoded",
  text: "foo=bar",
  params: [
    {
      name: "foo",
      value: "bar"
    }
  ]
}
```

## Full HAR
```
{
  log: {
    version: "1.2",
    creator: {},
    browser: {},
    pages: [],
    entries: [
      {
        pageref: "page_0",
        startedDateTime: "2009-04-16T12:07:23.596Z",
        time: 50,
        request: {
          method: "GET",
          url: "http://www.example.com/path/?param=value",
          httpVersion: "HTTP/1.1",
          cookies: [],
          headers: [],
          queryString: [],
          postData: {
            mimeType: "application/x-www-form-urlencoded",
            text: "foo=bar",
            params: [
              {
                name: "foo",
                value: "bar"
              }
            ]
          },
          headersSize: 150,
          bodySize: 0,
          comment: ""
        },
        response: {},
        cache: {},
        timings: {},
        serverIPAddress: "10.0.0.1",
        connection: "52492",
        comment: ""
      }
    ],
    comment: ""
  }
};
```

## Examples

#### Post JSON data to api

```
// Config
{
  log: {
    entries: [
      {
        request: {
          method: "POST",
          url: "http://test.loadimpact.com/login",
          httpVersion: "http/2.0",
          headers: [
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ],
          queryString: [],
          postData: {
            "mimeType": "application/json",
            "text": "{\"user\":\"admin\",\"password\":\"123\"}"
          },
        },
      }
    ],
  }
};

// Generated K6 script
import http from "k6/http";

export default function() {
  var payload = JSON.stringify({ email: "aaa", password: "bbb" });
  http.post("http://test.loadimpact.com/login", payload, {
    headers: { "Content-Type": "application/json" }
  });
}
```

#### Post JSON data with check
```
// Config
{
  log: {
    entries: [
      {
        checks: [
          {
            name: "Login success",
            type: 0,
            subject: 0,
            condition: 2,
            value: 200
          }
        ],
        request: {
          method: "POST",
          url: "http://test.loadimpact.com/login",
          httpVersion: "http/2.0",
          headers: [
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ],
          queryString: [],
          postData: {
            "mimeType": "application/json",
            "text": "{\"user\":\"admin\",\"password\":\"123\"}"
          },
        },
      }
    ],
  }
};

// Generated K6 script
import http from "k6/http";

export default function() {
  let payload = JSON.stringify({ email: "admin", password: "123" });

  let res = http.post("http://test.loadimpact.com/login", payload, {
    headers: { "Content-Type": "application/json" }
  });

  check(res, {
    "Login success": r => r.status === 200
  });
}
```

#### Set reusable variable based on request response
```
// Config
{
  log: {
    entries: [
      {
        variables: [
          {
            name: "accessToken",
            type: 0,
            subject: 0
          }
        ],
        request: {
          method: "POST",
          url: "http://test.loadimpact.com/login",
          httpVersion: "http/2.0",
          headers: [
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ],
          postData: {
            "mimeType": "application/json",
            "text": "{\"user\":\"admin\",\"password\":\"123\"}"
          },
        },
      },
      {
        request: {
          method: "GET",
          url: "http://test.loadimpact.com/my_messages",
          httpVersion: "http/2.0",
          headers: [
            {
              "name": "Authorization",
              "value": "${accessToken}"
            }
          ]
        },
      }
    ],
  }
};

// Generated K6 script
import http from "k6/http";

export default function() {
  let accessToken;

  let payload = JSON.stringify({ email: "admin", password: "123" });
  let res = http.post("http://test.loadimpact.com/login", payload, {
    headers: { "Content-Type": "application/json" }
  });

  accessToken = res.body.accessToken;

  http.get("http://test.loadimpact.com/my_messages", {
    headers: { Authorization: accessToken }
  });
}
```
