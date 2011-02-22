#!/bin/bash

file1=lscache.js
file2=yui.js
file3=accent.js
out=util.js
cat $file1 $file2 $file3 >> $out
