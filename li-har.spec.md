# LI-HAR config format
The specification describes a JSON config format to act as a static representation of a K6 script.  
The proposed format is an extension of [HAR 1.2](http://www.softwareishard.com/blog/har-12-spec/)  
Items deviating from the HAR spec are:

- [options](#options)
- `entries` list order is significant.
- [checks](#checks)
- [variables](#variables)


## Table of Contents
1. [Log](#log)
2. [Options](#options)
3. [Pages](#pages)
4. [Entries](#entries)  
4.1 [PageRef](#pageref)  
4.2 [Request](#request)  
&nbsp;&nbsp;&nbsp;&nbsp;4.2.1 [Url](#url)  
&nbsp;&nbsp;&nbsp;&nbsp;4.2.2 [Headers](#headers)  
&nbsp;&nbsp;&nbsp;&nbsp;4.2.3 [QueryString](#querystring)  
&nbsp;&nbsp;&nbsp;&nbsp;4.2.4 [PostData](#postdata)  
4.3 [Checks](#checks)  
4.4 [Variables](#variables)
5. [Examples](#examples)



## Log
This object represents the root of exported data.  

```javascript
type Log = {
  version: String // Version number of the format
  creator: String // Name and version info of the log creator application
  options?: JSONObject // K6 configuration object
  pages?: Array // List of exported pages
  entries?: Array // List of exported requests
  comment?: Check // A comment provided by the user or the application
}
```


## Options
Options allow you to configure how K6 will behave during test execution, duration, execution mode etc.  
If any (embedded in [_log_](#log) object).   
```javascript
type Options = {
  // ... see K6 docs
}
```
[K6 options docs](https://docs.k6.io/docs/options)


## Pages
This object represents list of pages/groups.  
Pages are a way to couple entries together. Pages can be referenced from an entry via the _pageref_ property and need to match the page objects _id_.  
```javascript
{
  pages: [
    {
      id: "group_0",
      title: "Group 0"
    }
  ]
}
```

```javascript
type Page = {
  id: String, // Unique identifier referenceable from entry.pageref
  title: String // Name or description of the page/group
}
```


## Entries
This object represents an array with all HTTP requests that should be executed,
presented in execution order.

Entries and groups are executed in the order presented in the `entries` list.
An entry without a `pageref` is executed outside any group in list order.
Groups are ordered to the location of their first entry. If the entries of a
group are split they're moved to the location of the first entry in list order.

```javascript
{
  entries: [
    {
      request: {},
      comment: "",
      pageref: "page_0",
      checks: [],
      variables: []
    }
  ]
}
```

Optional properties are denoted with "?"
```javascript
type Entry = {
  request: Array, // Detailed info about the request
  comment?: String, // Used as a name or description of the request
  pageref?: String, // Reference to a page/group
  checks?: Check, // List of check objects
  variables?: Variable // List of variable objects
}
```



### Pageref
`pageref` is a property that specified which _[page](#pages)_ a given entry belongs to. Two entries specifying the same pageref should always end up in the same _[K6 group](https://docs.k6.io/docs/tags-and-groups)_.  

The same order criterion applies in the case of not specifying a _pageref_ or specifying a _pageref_ that does not match any of the _[page](#pages)_ objects ids will


#### Example

```javascript
// HAR configuration

{
  pages: [
    {
      id: "group_0",
      title: "Group 0",
    },
    {
      id: "group_1",
      title: "Group 1",
    } 
  ],
  entries: [
    {
      pageref: "group_0",
      request: {
        method: "POST",
        url: "http://test.loadimpact.com/login",
      }
    },
    {
      pageref: "group_0",
      request: {
        method: "GET",
        url: "http://test.loadimpact.com/users",
      }
    }
    },
    {
      pageref: "group_1",
      request: {
        method: "GET",
        url: "http://test.loadimpact.com/items",
      }
    }
    },
    {
      pageref: "group_1",
      request: {
        method: "POST",
        url: "http://test.loadimpact.com/checkout",
      }
    }
  ]
}


// K6 script equivalent

import { group } from "k6";

export default function() {
  group("Group 0", function() {
    http.post("http://test.loadimpact.com/login");
    http.get("http://test.loadimpact.com/users");
  });

  group("Group 1", function() {
    http.get("http://test.loadimpact.com/items");
    http.post("http://test.loadimpact.com/checkout");
  });
};
```


## Request
This object contains detailed info about performed request.  

```javascript
{
  request: {
    method: "GET",
    url: "http://test.loadimpact.com/path/?param=value",
    httpVersion: "HTTP/1.1",
    headers: [],
    queryString: [],
    postData : {}
  }
}
```

_Optional properties are denoted with "?"_
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

### URL
Url of the request to be performed. The url must include a valid protocol e.g. `http://`.  
_[Variables](#variables)_ can be referenced in the URL like:  
`http://test.loadimpact.com/?someParam=${variableName}`  
`http://test.loadimpact.com/users/${userId}/profile`

### Headers
List of request headers, if any (embedded in [_request_](#request) object).   
If the `value` property includes a variable notation like `${accessToken}`, this means that the header tries to access a _[variable](#variables)_ defined by another _[entry](#entries)_ and should be replaced with the variables assigned value.
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

```javascript
[
  {
    name: "utm_source",
    value: "loadimpact.com"
  },
  {
    name: "color",
    value: "red"
  },
  {
    name: "token",
    value: "${accessToken}"
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
Just like _[headers](#headers)_, _[variables](#headers)_ can also be used in the request body.
```javascript
{
  postData: {
    mimeType: "application/json",
    text: "{\"user\":\"${user_uuid}\",\"email\":\"email@email.email\"}"
  }
}
```


#### Examples with different payload types

##### application/json

```javascript
{
  postData: {
    "mimeType": "application/json",
    "text": "{\"foo\":\"bar\",\"hello\":\"world!\"}"
  }
}
```

##### application/x-www-form-urlencoded

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

##### text/plain

```javascript
{
  postData: {
    "mimeType": "text/plain",
    "text": "Hello world"
  }
}
```

##### text/xml

```javascript
{
  postData: {
    "mimeType": "text/xml",
    "text": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<note>\r\n  <to>Foo</to>\r\n  <from>Bar</Ffrom>\r\n  <heading>Reminder</heading>\r\n  <body>Hello world!</body>\r\n</note>\r\n"
  }
}
```

##### image/png
```javascript
// HAR configuration
{
  postData: {
    "mimeType": "image/png",
    "text": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAKz2lDQ1BJQ0MgUHJvZmlsZQAASImVlwdUU2k"
  }
}


// Generated K6 script
import http from "k6/http";

let binFile = open("./mypicture.png", "b");

export default function() {
  var res = http.post("https://api.example.com/upload", {
    file: http.file(binFile, "mypicture.png")
  });
}
```


## Checks

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
  | Regex = 3;

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

Some fields wont always be present, for example condition and value does not make sense when check is of type _Regex_.  
Check type `JSONPathValue` and `JSONPath` should assume `CheckSubjectVariant.ResponseBody`.

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
The variable should be referenceable in subsequent entries.
Properties that can reference variables are _[headers](#headers)_, _[postData](#postdata)_, _[url](#url)_ and _[queryString](#querystring)_.  
A variable named `access_token` is referenced as `${access_token}`.

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
