#!/bin/bash
http-server 2>&1 &
gulp watch  2>&1 &
wait
