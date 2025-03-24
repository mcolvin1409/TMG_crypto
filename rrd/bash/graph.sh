#!/bin/sh

rrdtool graph speed.png                 \
    --start $1 --end $2                 \
    DEF:myspeed=test.rrd:speed:AVERAGE  \
    LINE2:myspeed#FF0000