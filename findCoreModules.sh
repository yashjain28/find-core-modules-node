#!/bin/sh
curr="$(pwd)"
tempDir=$(printf '%s' "$1" | md5)
outFile="$curr/log_$tempDir.txt"
rm -f "$outFile"
touch "$outFile"
#echo "$hash"
rm -rf "$tempDir"
mkdir "$tempDir"
cd "$tempDir"
echo "$curr"
npm init -y &> /dev/null
npm i "$1" &> /dev/null
cd node_modules
libs=(net fs async_hooks assert buffer child_process console constants crypto cluster dgram dns domain events fs http http2 https inspector module net os path perf_hooks process punycode querystring readline repl stream string_decoder sys timers tls tty url util v8 vm zlib)
for i in "${libs[@]}"; do
	searchString="require\(\'$i\'\)"
	ag $searchString >> $outFile
    #echo "$?"
done
cd ../..
#echo "$(pwd)"
rm -rf "$tempDir"
if [[ -s "$outFile" ]]; then
    echo "Red Flag"
    #rm -f $outFile 
    exit 1
else
    echo "GREEN Flag"
    #rm -f $outFile
    exit 0
fi        
