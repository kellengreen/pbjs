#!/bin/bash
http-server -c-1 &
gulp watch &
wait
