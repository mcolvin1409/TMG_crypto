#!/bin/sh

if [ -z "$1" ]
  then
    echo "No START stamp supplied"
    exit 1;
fi

if [ -z "$2" ]
  then
    echo "No END stamp supplied"
    exit 1;
fi

cd ../scripts

# rrdtool fetch test.rrd AVERAGE --start $1 --end $2
rrdtool fetch test.rrd AVERAGE --start $1 --end $2 | awk '{printf "%s %.1f\n", $1, $2;}'