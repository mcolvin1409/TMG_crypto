#!/bin/sh

cd $(dirname $0)
rrdtool update test.rrd $1
echo "$1"