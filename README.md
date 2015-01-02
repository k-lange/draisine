#draisine#

A simple command line tool to ask german travel discounter ltur for a list of available cheap train tickets on a given day. Very much WIP and expected to break at some point.

## cli usage ##
````
npm install -g draisine
````

````
draisine -f [station] -t [station] -o [date]

Options:
-f, --from  [required]
-t, --to    [required]
-o, --on    [default: "tomorrow"]
````

## api usage ##

```js
var draisine = require('draisine');
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

draisine({
    from: 'Hamburg Hbf',
    to: 'Berlin Hbf',
    on: tomorrow
}, function (error, results) {
    // do something with the results array
});
```

Please note that the keys in the result array's objects are parsed and thus not guarranted to be the same every time.
