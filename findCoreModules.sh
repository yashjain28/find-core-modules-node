#!/bin/sh
curr="$(pwd)"
tempDir=$(printf '%s' "$1" | md5)
logFile=log_$tempDir.txt
outFile="$curr/$logFile"
rm "$outFile"
#echo "$hash"
rm -r "$tempDir"
mkdir "$tempDir"
cd "$tempDir"
#echo "$curr"
npm init -y 2>&1 >/dev/null && npm i --loglevel=error "$1"
if [ $? -ne 0 ]; then
    echo "Wrong package name"
    rm -r "$tempDir"
    exit 1
fi
cd node_modules
echo "Creating a temporary directory and a log file, the core modules will be listed here $logFile, if there are any"
touch "$outFile"
libs=(net fs async_hooks assert buffer child_process console constants crypto cluster dgram dns domain events fs http http2 https inspector module net os path perf_hooks process punycode querystring readline repl stream string_decoder sys timers tls tty url util v8 vm zlib)
echo "Currently checking for these core modules of node:\n\n ${libs[@]}\n"
for i in "${libs[@]}"; do
	searchString="require\(\'$i\'\)"
	ag $searchString --ignore-dir="*.md" >> $outFile
    #echo "$?"
done
cd ../..
#echo "$(pwd)"
rm -r "$tempDir"
if [[ -s "$outFile" ]]; then
    echo "Red Flag - has few core modules, check $logFile"
    if [ "$2" == "--rmlog" ]; then
        rm $outFile 
    fi
    exit 1
else
    echo "GREEN Flag - This package is free of core modules"
    rm "$outFile"
    exit 0
fi