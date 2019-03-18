# LI-HAR config format
The specification describes a JSON config format designed to act as a static representation of a K6 script.

The proposed format is an extension of [HAR 1.2](http://www.softwareishard.com/blog/har-12-spec/)
Fields deviating from the HAR spec are:

```javascript
log.entries[0].checks: Array<Check>
log.entries[0].variables: Array<Variable>
```

## Request body configuration

> __Requirement__: A text based body with selection for common text content types (application/json, text/xml, text/plain etc.)

Below are example of configuration for different mime-types.
HAR path: `log.entries[0].request.postData`

#### application/json

```javascript
{
  postData: {
    "mimeType": "application/json",
    "text": "{\"foo\":\"bar\",\"hello\":\"world!\"}"
  }
}
```

#### application/x-www-form-urlencoded

```javascript
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

```javascript
{
  postData: {
    "mimeType": "text/plain",
    "text": "Hello world"
  }
}
```

#### text/xml

```javascript
{
  postData: {
    "mimeType": "text/xml",
    "text": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<note>\r\n  <to>Foo</to>\r\n  <from>Bar</Ffrom>\r\n  <heading>Reminder</heading>\r\n  <body>Hello world!</body>\r\n</note>\r\n"
  }
}
```

#### image/png
```javascript
{
  postData: {
    "mimeType": "image/png",
    "text": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAKz2lDQ1BJQ0MgUHJvZmlsZQAASImVlwdUU2k"
  }
}
```

<!-- 
## Uploading files

> __Requirement__: Uploading a binary file with selection for common binary content types (and we should do basic detection of the appropriate type)

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
``` -->

#### Generated K6 script

```javascript
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

> __Requirement__: Support for adding assertions (which would become k6 checks) by looking for string, JSON expression or regex in a choice of:
>
> - Response headers
> - Response body

<!-- Extend [entry](#har-entry) with custom field `checks` -->

### Type definition

```
type Check = {
  type: CheckTypeVariant,
  subject: CheckSubjectVariant,
  condition: CheckConditionVariant,
  expression: String,
  value: String
}

type CheckTypeVariant =
  | Text = 0
  | JSONPathValue = 1
  | JSONPath = 2
  | Regex = 3
  | ResponseTime = 4; (Not sure if this will be included)

type CheckSubjectVariant =
  | ResponseBody = 0
  | ResponseHeaders = 1
  | HttpStatusCode = 2;

type CheckConditionVariant =
  | Contains = 0
  | NotContains = 1
  | Equals = 2
  | StartsWith = 3
  | EndsWith = 4;
```

### HAR example

<!-- HAR path: `log.entries[0].request.checks` -->
Some fields wont always be present, for example condition and value does not make sense when check is of type _Regex_  
Check type _JSONPathValue_ and _JSONPath_ will always check agains body.

_NOTE: Consider adding a property __name__ or __description__ that can be used as the K6 check name._
```javascript
{
  checks: [
    {
      "type": 1,
      "expression": "user.name",
      "condition": 2,
      "value": "Simon Legander"
    },
    {
      type: 0,
      subject: 1,
      condition: 0,
      value: "Hello world"
    },
    {
      type: 0,
      subject: 2,
      condition: 2,
      value: 200
    },
    {
      "type": 3,
      "subject": 0,
      "expression": "[0-9]+(\s{1})?%"
    }
  ]
}
```
### Generated K6 script
The above config would generate

```javascript
check(res, {
  "user.name equals Simon Legander": (r) => r.body.user.name === "Simon Legander"
});

check(res, {
  "body contains Hello world": (r) => r.body.includes("Hello world")
});

check(res, {
  "HTTP status code equals 200": (r) => r.status === 200
});

check(res, {
  "body matches [0-9]+(\s{1})?%": (r) => /[0-9]+(\s{1})?%/.test(r.body)
});
```


## Global variables

> __Requirement__: Support for extracting a piece of data from a response into a variable name (would become a JS variable in k6 script) by using regex or JSON expression in a choice of:
> - Response body
> - ~~Response headers~~ (Skipped)

<!-- Extend [entry](#har-entry) with custom field `variables` -->

### Type definition

```
type Variable = {
  name: String,
  type: VariableTypeVariant,
  expression: String
}

type VariableTypeVariant =
  | JSONPath = 0
  | Regex = 1;
```

### HAR example

HAR path: `log.entries[0].variables`

```javascript
{
  "log": {
    "entries": [
      {
        "variables": [
          {
            name: "accessToken",
            type: 0,
            expression: "user.token"
          }
        ],
        "request": {
          "url": "http://api.test.com/authenticate",
          "method": "POST",
          "headers": [
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
          "postData": {
            "mimeType": "application/json",
            "text": "{\"username\":\"admin\",\"password\":\"123\"}"
          }
        }
      },
      {
        "request": {
          "url": "http://api.test.com/users",
          "method": "GET",
          "headers": [
            {
              "name": "Autorization",
              "value": "Bearer ${accessToken}"
            }
          ]
        }
      }
    ]
  }
}
```

### Generated K6 script
The above config would generate

```javascript
export default function() {
  let accessToken;
  var r = http.post("http://api.test.com/authenticate",
    JSON.stringify({
      username: "admin",
      password: "123"
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  accessToken = r.body.user.token;

  http.get("http://api.test.com/users", {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
}
```


## HAR entry
Path `log.entries[0]`
```javascript
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
```javascript
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
```javascript
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
```javascript
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

```javascript
// Config
{
  log: {
    entries: [
      {
        request: {
          method: "POST",
          url: "http://test.loadimpact.com/login",
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
```javascript
// Config
{
  log: {
    entries: [
      {
        checks: [
          {
            type: 0,
            subject: 2,
            condition: 2,
            value: 200
          }
        ],
        request: {
          method: "POST",
          url: "http://test.loadimpact.com/login",
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
    "HTTP status code equals 200": r => r.status === 200
  });
}
```


#### Set reusable variable based on request response
```javascript
// Config
{
  log: {
    entries: [
      {
        variables: [
          {
            type: 0,
            name: "accessToken",
            expression: "user.token"
          }
        ],
        request: {
          method: "POST",
          url: "http://test.loadimpact.com/login",
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
          url: "http://test.loadimpact.com/users",
          headers: [
            {
              "name": "Authorization",
              "value": "Bearer ${accessToken}"
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
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}
```
