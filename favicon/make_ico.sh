#!/bin/sh
convert 32.png -resize 16x16 16.png
convert 16.png 32.png favicon.ico
cp favicon.ico ../public
