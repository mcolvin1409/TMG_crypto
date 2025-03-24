#!/bin/sh

# while true;
# do
#     export TIME=$(date +%s%3N)
#     export VAL=$(shuf -i 0-100 -n 1)
# 	rrdtool update test.rrd "${TIME}:${VAL}"
#     echo "${TIME}:${VAL}"
#     sleep 0.01
# done

while true;
do
    export TIME=$(date +%s)
    export VAL=$(shuf -i 0-100 -n 1)
	rrdtool update test.rrd "${TIME}:${VAL}"
    echo "${TIME}:${VAL}"
    sleep 1
done