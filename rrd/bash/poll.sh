#!/bin/sh

echo What timestamp should it start at?
read START

while true;
do
    export TIME=$(date +%s%3N)
    bash graph.sh $START $TIME
    sleep 1
done