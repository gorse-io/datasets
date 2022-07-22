# Developers Guide

This chapter will show how to work on Gorse source code.

## Setup Develop Environment

These following installations are required:

- **Go** (>= 1.18): Since Go features from 1.18 are used in Gorse, the version of the compiler must be greater than 1.18. GoLand or Visual Studio Code is highly recommended as the IDE to develop Gorse.
- **Docker Compose**: Multiple databases are required for unit tests. It's convenient to manage databases on Docker Compose. 

```bash
cd misc/database_test
docker-compose up -d
```

## Run Unit Tests

Most logics in Gorse are covered by unit tests. Run unit tests by the following command:

```bash
go test -v ./...
```

The default database URLs are directed to these databases in `misc/database_test/docker-compose.yml`. Test databases could be overrode by setting following environment variables:

| Environment Value | Default Value |
|-|-|
| `MYSQL_URI` | `mysql://root:password@tcp(127.0.0.1:3306)/` |
| `POSTGRES_URI` | `postgres://gorse:gorse_pass@127.0.0.1/` |
| `MONGO_URI` | `mongodb://root:password@127.0.0.1:27017/` |
| `CLICKHOUSE_URI` | `clickhouse://127.0.0.1:8123/` |
| `REDIS_URI` | `redis://127.0.0.1:6379/` |

For example, use TiDB as a test database by:

```bash
MYSQL_URI=mysql://root:password@tcp(127.0.0.1:4000)/ go test -v ./...
```
