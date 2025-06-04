# Docker Postgresql

```shell
docker pull postgres:15
docker run --name my-postgres -e POSTGRES_PASSWORD=12345 -d -p 5432:5432 postgres:15
```
