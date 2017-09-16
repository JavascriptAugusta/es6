# es6
Examples of ECMAScript 6 features

<b>Arrow feature</b>

Old way:
```JavaScript
var numbers = [1, 5, 10, 15];
var numTimesIndex = numbers.map(function(x, i) {
   return x * i;
});
```
New way with ES6 arrow feature - we can get rid of function and return keywords:
```JavaScript
var numTimesIndex = numbers.map((x, i) => x * i);
```

If we only have one argument, we don't need parentheses around argument list:
```JavaScript
var doubles = numbers.map(x => x * 2);
```

<b>Lexical this</b>

Unlike functions, arrows share the same lexical this as their surrounding code.

Old way - since the thisArg parameter (this) is provided to forEach(), it is passed to callback each time it's invoked, for use as its this value. It's confusing:
```JavaScript
var maria = {
            _name: "Maria",
            _friends: ["Nancy", "Annette", "John"],
            printFriends: function() {
                this._friends.forEach(function (element) {
                    document.writeln(this._name + " knows " + element + "<br>")
                }, this);
            }
        }
        var maria1 = Object.create(maria);
        maria1.printFriends();
```

New way - the thisArg parameter can be omitted as arrow functions lexically bind the this value:

```JavaScript
 var bob = {
            _name: "Bob",
            _friends: ["Nancy", "Annette", "John"],
            printFriends() {
            this._friends.forEach(f =>
            document.writeln(this._name + " knows " + f +"<br>"));
            }
        }
        var bob1 = Object.create(bob);
        bob1.printFriends();
```
<b>Promises</b>

Promises are basically objects which can be in one of the following 3 states:
•	pending: waiting for the operation to finish. This is the initial state when creating a promise.
•	fulfilled: the operation finished successfully.
•	rejected: the operation failed.
Every Promise receives a callback function as a parameter. This callback function gets two parameters: a fullfill function, i.e. the operation finished successfully, and a reject function, i.e. the operation failed.

Old way:
```JavaScript
 var request = new XMLHttpRequest();
        //onload and onerror are event handlers
        request.onload = function () {
            var data = JSON.parse(this.responseText);
            //do stuff with data
            document.writeln("Old way<br>");
            document.writeln("Name: " + data.name);
        };

        request.onerror = function () {
            alert('There was a problem with the request');
        }
        request.open('get', 'https://swapi.co/api/people/1/', true);
        request.send();
 ```
 New way:
 ```JavaScript
 function get(url) {
            // Return a new promise.
            return new Promise((resolve, reject) => {
                // Do the usual XHR stuff
                var request = new XMLHttpRequest();
                request.open('GET', url);

                request.onload = () => {
                    if (request.status == 200) {
                        // Resolve the promise with the response text
                        resolve(request.response);
                    }
                    else {
                        // Otherwise reject with the status text
                        reject(Error(request.statusText));
                    }
                };

                // Handle network errors
                request.onerror = () => {
                    reject(Error("Network Error"));
                };

                // Make the request
                request.send();
            });
        }

        get('https://swapi.co/api/people/y/').then((response) => {
            //console.log("Success!", response);
            var data = JSON.parse(response);
            //do stuff with data
            document.writeln("New way<br>");
            document.writeln("Name: " + data.name);
        }, (error) => {
            alert('There was a problem with the request: ' + error);
            //console.error("Failed!", error);
        })
  ```
