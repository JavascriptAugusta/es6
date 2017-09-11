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

Result is: 

Maria knows Nancy
Maria knows Annette
Maria knows John

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
Result is:

Bob knows Nancy
Bob knows Annette
Bob knows John
