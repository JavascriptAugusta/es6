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

Promises are basically objects which can be in one of 3 states:
•	pending
•	fulfilled
•	rejected

A Promise gets a callback function as a parameter. In turn, the callback function gets two parameters - a fulfill function if the operation succeeds, and a reject function if the operation failed.

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

        get('https://swapi.co/api/people/2/').then((response) => {
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
<b>Classes</b>

ES6 doesn’t really change how JavaScript handles its “classes“ to an object-oriented inheritance model. Strictly speaking, JavaScript does not have classes. It still has prototype-based inheritance. ES6 <b>does</b> provide a cleaner syntax to create objects and deal with inheritance.

Old way of creating classes:
 ```JavaScript
        function Vehicle(type, color) { 
            this.type = type;
            this.color = color;
        }

        var car = new Vehicle("Honda", "silver");
        document.writeln("Old way<br>");
        document.writeln("Car type is " + car.type);
        document.writeln("Car color is " + car.color);
```

New way of creating classes:
 ```JavaScript
           class Vehicle {
            constructor(type, color) {
                this.type = type;
                this.color = color;
            }

            getColor() {
                return this.color;
            }
        }

        let car = new Vehicle("Honda", "silver");
        document.writeln("New way<br>");
        document.writeln("Car type is " + car.type);
        document.writeln("Car color is " + car.getColor());
```

Class inheritance in ES5 was really complicated, so a lot of developers didn't bother with it. ES6 provides a much easier way to extend a class. 

Old way of inheritance:
 ```JavaScript
      // Vehicle constructor function
      function Vehicle(type, color) { 
            this.type = type;
            this.color = color;
        }
      // Car constructor function
        // when called with the "new" operator,
        // a new Car object is created

        function Car(maxSpeed, type, color) {
            // the "new" operator sets the reference of "this" to
            // a new object, the new object is then passed to the
            // Vehicle constructor function through the use of call,
            // so the type and color properties can be set
            this._super.call(this, type, color);
            this.maxSpeed = maxSpeed;
        }

        // cars will inherit from a new object
        // which inherits from the parent
        Car.prototype = Object.create(Vehicle.prototype);

        // set the constructor property back to the Car
        // constructor function
        Car.prototype.constructor = Car;

        // "_super" is NOT part of ES5, its a convention
        // defined by the developer
        // set the "_super" to the Vehicle constructor function
        Car.prototype._super = Vehicle;

        // this will exist on the car's prototype object
        Car.prototype.getMaxSpeedFormatted = function() {
            return this.maxSpeed + "km/h";
        }
        // instantiate a new Car object
        var car2 = new Car(200, "Corvette", "red");

        // invoking function on parent prototype
        document.writeln("Car type is " + car2.type +", color is "+ car2.color);

        // invoking function on child prototype
        // output "1 Smith, Bob"
        document.writeln("Car max speed is "+ car2.getMaxSpeedFormatted());
 ```
New way of inheritance:
Note that in ES6 you must use "super" to call the parent constructor if you are overriding the constructor.

```JavaScript
         class Vehicle {
            constructor(type, color) {
                this.type = type;
                this.color = color;
            }

            getColor() {
                return this.color;
            }
        }
        
        class Car extends Vehicle {
            constructor(color, maxSpeed) {
                super("car", color);
                this.maxSpeed = maxSpeed;
            }

            getMaxSpeedFormatted() {
                return this.maxSpeed + "km/h";
            }
        }

        let car1 = new Car("blue", 200);
        document.writeln("New way of inheritance:<br>");
        document.writeln("We have a " + car1.getColor() + " car with a max speed of " + car1.getMaxSpeedFormatted());
```

<b>Modules</b>

JavaScript has had modules for a long time. However, they were implemented via libraries, not built into the language. ES6 is the first time that JavaScript has built-in modules.

In ES5, you had two widely used approaches for modules: CommonJS and AMD. 

CommonJS exports specific objects with free variable “exports” and the keyword “require” is used to import the exports of other modules.
This approach is server-side-oriented.

```JavaScript
//------ main.js ------
var square = require('./lib').square;
var diag = require('./lib').diag;
console.log("Square of 11 is " + square(11)); // 121
console.log("Diagonal of 4 and 3 is " + diag(4, 3)); // 5

//------ lib.js ------
var sqrt = Math.sqrt;
function square(x) {
    return x * x;
}
function diag(x, y) {
    return sqrt(square(x) + square(y));
}
module.exports = {
    sqrt: sqrt,
    square: square,
    diag: diag,
};
```

Modules are loaded synchronously the JavaScript thread stops until code has been loaded and blocks browser from running anything else until it finishes loading. You need a library like Browserify if you are using the CommonJS syntax in the browser.

With AMD – Asynchronous Module Definition – you load modules asynchronously in the background and you define a callback function to execute once the dependencies are loaded. You need a library like RequireJS to run this.

Note you can't import modules directly from inside a <script> tag. 

```JavaScript
//------ main.js ------
require(['apps/mathLib'], function (mathLib) {
    alert("Square of 11 is "+ mathLib.square(11));
});
//------ apps/mathLib.js ------
define([], function () {
    return {
        square: function (x) {
            return x * x;
        }
    };
});
```

Here is the HTML to call the script:
```JavaScript
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
   <head>
     <meta charset="utf-8" />
     <title></title>
       <script data-main="scripts/main" src="scripts/require.js"></script> 
   </head>
   <body>
   </body>
</html>
```
In ES 6, the goal was to create format users of both approaches could be happy with.

-	Compact syntax AND direct support for asynchronous loading and configurable module loading

-	Structure can be statically analyzed

-	Support for cyclic dependencies better than CommonJS

-	Standard has two parts – declarative syntax for import/export and programmatic loader API

```JavaScript
//------ main_es6.js ------
import { square, diag } from 'lib_es6';
alert("ES6 way - square of 11 is "+ square(11)); // 121
alert("ES6 way - diagonal of 4 and 3 is "+ diag(4, 3)); // 5

//------ lib_es6.js ------
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
```

BUT I didn't find browser support for ES6 modules in Chrome or Firefox as of this writing (Sept 2017).
