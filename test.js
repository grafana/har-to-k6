const { InvalidArchiveError, validate } = require("./src/index");

const archive = {
  "log": {
    "comment": "20",
    "entries": [
      {
        "index": 0,
        "pageref": "20",
        "request": {
          "method": "POST",
          "httpVersion": "HTTP/1.1",
          "url": "https:///www.google.lt",
          "cookies": [{
            "name": "20",
            "value": "20",
            httpOnly: true,
            secure: true,
            comment: "true"
          }],
          "postData": {
            "mimeType": "application/x-www-form-urlencoded",
            "params": [
              {
                "name": "login",
                "contentType": "20"
              },
              {
                "name": "password",
                "comment": "20"
              },
              20
            ]
          }
        },
        "checks": [
          {
            "type": 1,
            "expression": "user.name",
            "condition": 2,
            "value": "Batman"
          },
          {
            "type": 0,
            "subject": 2,
            "condition": 0,
            "value": "20",
          },
          {
            "type": 0,
            "subject": 2,
            "condition": 2,
            "value": "200"
          },
        ],

      },
    ],

  }
}


try {
  validate(archive);
} catch (error) {
  if (error instanceof InvalidArchiveError) {
    console.log(error)
  } else {
    throw error;
  }
}
