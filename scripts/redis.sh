#!/bin/sh

docker run --name rdb -d -p 6379:6379 redis:5
docker exec -it rdb redis-cli
