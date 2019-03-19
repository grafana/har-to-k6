# LI-HAR config format
The specification describes a JSON config format to act as a static representation of a K6 script.  
The proposed format is an extension of [HAR 1.2](http://www.softwareishard.com/blog/har-12-spec/)  
fields deviating from the HAR spec are:

- [checks](#checks)
- [variables](#variables)
- [index](#Entries)


## Entries
This object represents an array with all exported HTTP requests sorted by `index`. However the reader application should always make sure the array is sorted.  
This field deviates from [HAR 1.2 request](http://www.softwareishard.com/blog/har-12-spec/#request), additional properties have been added (_checks_, _variables_, _index_).  
<small>_Commented out are fields that are currently out of the scope of this spec._</small>
<!-- startedDateTime (starting from the oldest) is preferred way how to export data since it can make importing faster. However the reader application should always make sure the array is sorted (if required for the import). -->
```javascript
{
  entries: [
    {
      index: 0,
      comment: "",
      pageref: "page_0",
      request: {},
      checks: [],
      variables: []
      // "time": 50,
      // "response": {...},
      // "cache": {...},
      // "timings": {},
      // "serverIPAddress": "10.0.0.1",
      // "startedDateTime": "2009-04-16T12:07:23.596Z",
      // "connection": "52492",
    }
  ]
}
```

Optional properties are denoted with "?"
```javascript
type Entry = {
  index: Integer, // Used to determine the execution order of requests
  comment: String, // Used as a name or description of the request
  pageref?: String, // Reference to a group of entries. Leave out this field if the application does not support grouping by entries. 
  request?: Array, // Detailed info about the request.
  checks?: Check, // List of check objects.
  variables?: Variable // List of variable objects.
}
```


## Request
This object contains detailed info about performed request.  
This field does not deviate from [HAR 1.2 request](http://www.softwareishard.com/blog/har-12-spec/#request), however not all fields are necessary for this application.  
<small>_Commented out are fields that are currently out of the scope of this spec._</small>
```javascript
{
  request: {
    method: "GET",
    url: "http://test.loadimpact.com/path/?param=value",
    httpVersion: "HTTP/1.1",
    headers: [],
    queryString: [],
    postData : {},
    // "cookies": [],
    // "headersSize" : 150,
    // "bodySize" : 0,
    // "comment" : ""
  }
}
```

Optional properties are denoted with "?"
```javascript
type Request = {
  method: String, // Request method (GET, POST, ...)
  url: String, // Absolute URL of the request (fragments are not included)
  headers?: Array, // List of header objects.
  queryString?: Array, // List of query parameter objects.
  postData?: PostDataType, // Posted data info.
  httpVersion?: String, // Request HTTP Version.
}
```

### Headers
List of request headers, if any (embedded in [_request_](#request) object).   
If the _value_ property includes a variable notation like `${accessToken}`, this means that the header tries to access a previously set _[variable](#variables)_ and should be replaced with the value which the variable is assigned.
```javascript
[
  {
    name: "Content-Type",
    value: "application/json"
  },
  {
    name: "Authorization",
    value: "Bearer ${accessToken}"
  }
]
```

### QueryString
This object contains list of all parameters & values parsed from a query string, if any (embedded in [_request_](#request) object).  
<!-- List of request headers, if any (embedded in [_request_](#request) object).   
If the _value_ property includes a variable notation like `${accessToken}`, this means that the header tries to access a previously set _[variable](#variables)_ and should be replaced with the value which the variable is assigned. -->
```javascript
[
  {
    name: "utm_source",
    value: "loadimpact.com"
  },
  {
    name: "color",
    value: "red"
  }
]
```


### PostData
This object describes posted data, if any (embedded in [_request_](#request) object).  
```javascript
{
  postData: {
    mimeType: "application/json",
    text : "plain posted data",
    params: []
    // comment: ""
  }
}
```

```javascript
type PostData = {
  mimeType: String, // Mime type of posted data
  params?: Array, // List of posted parameters (in case of URL encoded parameters)
  text: Array, // Plain text posted data. Can be stringified JSON, XML, HTML, base64encoded data etc.
}
```

#### Referencing variables
Just like headers, _[variables](#headers)_ can also be used in the request body.
```javascript
{
  postData: {
    mimeType: "application/json",
    text: "{\"user\":\"${user_uuid}\",\"email\":\"email@email.email\"}"
  }
}
```


<!-- > __Requirement__: A text based body with selection for common text content types (application/json, text/xml, text/plain etc.) -->
<!-- HAR path: `log.entries[0].request.postData` -->

### Examples with different payload types

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

## Checks

<!-- > __Requirement__: Support for adding assertions (which would become k6 checks) by looking for string, JSON expression or regex in a choice of:
>
> - Response headers
> - Response body -->
This property represents an array with checks (assertions) to be done, if any (embedded in [_entry_](#entries) object).  
The properties present in the _check_ object will differ depending on the _type_ of the check.  
Here is a mapping of the type - fields relation:

```javascript
type === CheckTypeVariant.Text
  subject
  condition
  value

// CheckSubjectVariant.ResponseBody should be assumed.
type === CheckTypeVariant.JSONPathValue
  expression
  condition
  value

// CheckSubjectVariant.ResponseBody should be assumed.
type === CheckTypeVariant.JSONPath
  expression

type === CheckTypeVariant.Regex
  subject
  expression
```



```javascript
type Check = {
  type: CheckTypeVariant,
  subject?: CheckSubjectVariant,
  condition?: CheckConditionVariant,
  expression?: String,
  value?: String
}

type CheckTypeVariant =
  | Text = 0
  | JSONPathValue = 1
  | JSONPath = 2
  | Regex = 3
  // | ResponseTime = 4;

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
      type: 1,
      expression: "user.name",
      condition: 2,
      value: "Batman"
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
      type: 3,
      subject: 0,
      expression: "[0-9]+(\s{1})?%"
    }
  ]
}
```
### Generated K6 script
The above config would generate

```javascript
check(res, {
  "user.name equals Batman": (r) => r.body.user.name === "Batman"
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


## variables

List of variables, if any (embedded in [_entry_](#entries) object).  
The object defines instructions for data that should be extracted from the responseBody and be reusable in subsequent requests.  
The variable should be referenceable in entries with a higher _index_ than the entry which the variable definition is embedded in.  
Properties that can reference variables are _[headers](#headers)_, _[postData](#postdata)_, _[url](#url)_ and _[queryString](#querystring)_.  
A variable named `access_token` is referenced as `${access_token}`.
<!-- > __Requirement__: Support for extracting a piece of data from a response into a variable name (would become a JS variable in k6 script) by using regex or JSON expression in a choice of:
> - Response body
> - ~~Response headers~~ (Skipped) -->

<!-- Extend [entry](#har-entry) with custom field `variables` -->
### Type definition
```javascript
type Variable = {
  name: String,
  type: VariableTypeVariant,
  expression: String
}

type VariableTypeVariant =
  | JSONPath = 0
  | Regex = 1;
```

### Expression match, variable initialization
If the variables _JSONPath or RegEx expression_ cannot be resolved with the returned response, the variable should still be declared and initialized.
When there are multiple matches for a _Regex expression_ then `$1` will be the assigned value.

### Variable overrides
If multilple entries define the same variable names then the variable will be overridden according to the execution order of the entries.

### HAR example

<!-- HAR path: `log.entries[0].variables` -->

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
