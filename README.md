# es6
Examples of ECMAScript 6 features

Old way:
```JavaScript
var numbers = [1, 5, 10, 15];
var plusIndex = numbers.map(function(x, i) {
   return x + i;
});
```
New way with ES6 arrow feature - we can get rid of function keyword:
```JavaScript
var numbers = [1, 5, 10, 15];
var plusIndex = numbers.map((x, m) => return x + i);
```

Even shorter - get rid of return keyword:
```JavaScript
var numbers = [1, 5, 10, 15];
var plusIndex = numbers.map((x, i) => x + i);
```

If we only have one argument, we don't need parentheses around argument list:
```JavaScript
var numbers = [1, 5, 10, 15];
var doubles = numbers.map(x => x * 2);
```
