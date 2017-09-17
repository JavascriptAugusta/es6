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
