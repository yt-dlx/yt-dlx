#!/bin/sh

cd "$(dirname "$0")" || exit 1
echo $(python main.py $1)
