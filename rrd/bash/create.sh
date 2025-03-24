#!/bin/sh

export TIME=$(date +%s%3N)

rrdtool create test.rrd \
    --start now-2h --step 1s \
    DS:speed:GAUGE:5m:0:24000 \
    RRA:AVERAGE:0.5:1s:5m