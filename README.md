# codebench-api

The CodeBench main API.

## Requirements

-   NodeJS v14+

## Setup

Install dependencies:

```
npm install
```

## Run

Start the API:

```
npm start
```

## Routes

For now, one route is supported to be able to comile and run standalone C code.

-   Path: `/api/try`
-   Payload (JSON):
    -   `type`: `code`
    -   `code`: C code as escaped string

## Demo

Let's run a hello world:

```sh
curl -s -X POST 'localhost:3000/api/try' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type": "code",
    "code":"#include <stdio.h>\r\nint main() {\r\n   \/\/ printf() displays the string inside quotation\r\n   printf(\"Hello, World!\");\r\n   return 0;\r\n}"
}' | jq
{
  "message": "Code successfully sent to message broker",
  "id": "39f36622-6cf7-4d92-9857-3c383244704e",
  "stderr": "",
  "stdout": "Hello, World!"
}
```
