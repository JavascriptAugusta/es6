# es6
Examples of ECMAScript 6 features

Old way:
```JavaScript
var numbers = [1, 5, 10, 15];
var doubles = numbers.map(function(x) {
   return x * 2;
});
```
New way:
```JavaScript
var numbers = [1, 5, 10, 15];
var doubles = numbers.map(x => x * 2);
```
