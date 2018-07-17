# Find Core modules in a package

This package helps you find the core modules used by a node package. It gives a Green Flag if the package or it's dependency doesn't use a single core module of node.

Currently, this script only runs for OSX. 
## Usage
    ./findCoreModules.sh <npm-package-name> [--rmlog]

Example: 
```
$ ./findCoreModules.sh clearblade

+ clearblade@1.12.2
added 118 packages in 4.894s
Creating a temporary directory and a log file, the core modules will be listed here log_f931da8f79fc354127a21164a10a95a6.txt, if there are any
Currently checking for these core modules of node:

 net fs async_hooks assert buffer child_process console constants crypto cluster dgram dns domain events fs http http2 https inspector module net os path perf_hooks process punycode querystring readline repl stream string_decoder sys timers tls tty url util v8 vm zlib

Red Flag - has few core modules, check log_f931da8f79fc354127a21164a10a95a6.txt
```

Contents of the log file look like:
```js
duplexify/test.js:4:var net = require('net')
forever-agent/index.js:6:  , net = require('net')
mqtt/mqtt.js:15:  net = require('net')
...
```