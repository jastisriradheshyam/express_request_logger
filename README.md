# Express request logger

Logs the request and response to MySQL database.

## Features

- Logs
    - Request hit time
    - URL
    - Headers
    - IP
    - HTTP Method
    - Request Body
    - Request total time to respond
    - Response body ( subject to send function usage )
    - Response initiate time
- Async request and response logging
- MySQL as database

## Drawbacks

- requires `express` and `body-parser` or similar package.
- cannot store the response body of piped responses

## Contributors

- Jasti Sri Radhe Shyam ([@jastisriradheshyam](https://github.com/jastisriradheshyam))