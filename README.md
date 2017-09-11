# es6
Examples of ECMAScript 6 features

Old way:
```JavaScript
var numbers = [1, 5, 10, 15];
var multiples = numbers.map(function(x, m) {
   return x * m;
});
```
New way with ES6 arrow feature - we can get rid of function keyword:
```JavaScript
var numbers = [1, 5, 10, 15];
var multiples = numbers.map((x, m) => return x * m);
```

Even shorter - get rid of return keyword:
```JavaScript
var numbers = [1, 5, 10, 15];
var multiples = numbers.map((x, m) => x * m);
```

If we only have one argument, we don't need parenthesis around argument list:
```JavaScript
var numbers = [1, 5, 10, 15];
var doubles = numbers.map(x => x * 2);
```
