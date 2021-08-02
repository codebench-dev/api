# codebench-api

The CodeBench main API.

## Requirements

- NodeJS v16+
- PostgreSQL (cf `docker-compose.yml`)

### Linters

- [`pylint`](https://www.pylint.org/)
- [`golangci-lint`](https://github.com/golangci/golangci-lint)
- [`clang-tidy`](https://clang.llvm.org/extra/clang-tidy/)

## Run API

Dev with hot-reloading:

```sh
npm run dev
```

Prod:

```sh
npm start
```

## Architecture

### Submission jobs execution flow

![](./doc/assets/submission.svg)

| Component | Action                                                                                                                                  |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `Worker`  | Launch and maintain pool of X prebooted microVMs in the background                                                                      |
| `Worker`  | Bind to RabbitMQ queue `jobs_q` on `jobs_ex` exchange and `jobs_rk` routing key                                                         |
| `API`     | Bind to RabbitMQ queue `jobs_status_q` on `jobs_status_ex` exchange and `jobs_status_rk` routing key                                    |
| `Front`   | `POST /submissions`                                                                                                                     |
| `Front`   | Poll `GET /submissions/:id` every 500 ms                                                                                                |
| `API`     | Send job to RabbitMQ on `jobs_ex` direct exchange with `jobs_rk` routing key.                                                           |
| `Worker`  | Receive job, get ready microVM from pool, send job to agent in microVM                                                                  |
| `Agent`   | Compile/Run code, return result                                                                                                         |
| `Worker`  | During two previous steps, send status of jobs on `jobs_status_ex` exchange with `jobs_status_rk` routing key                           |
| `API`     | Receive each new status on `jobs_status_q`, and insert them into DB and in-memory cache, so that the polling can get the latest status. |
| `Front`   | Get the final result, stop polling and display it.                                                                                      |

## Contribute

### Manage database with TypeORM

Delete schema:

```sh
npm run db:drop
```

Run all migrations:

```sh
npm run db:migrate
```

Reset db (combination of drop and migrate)

```sh
npm run db:reset
```

```sh
npm run typeorm migration:generate -- -n xxx
```

Create migration:

```sh
# After editing or adding an Entity
npm run typeorm migration:generate -- -n AddNewEntity
```

### Code Style

Available commands for eslint/prettier:

```sh
npm run lint:check
npm run lint:fix
npm run format:check
npm run format:fix
```
