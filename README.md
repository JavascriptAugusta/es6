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
```JavaScript
var bob = {
  _name: "Bob",
  _friends: ["Nancy", "Annette", "John"],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
}
```
