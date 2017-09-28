//------ main.js ------
var square = require('./lib').square;
var diag = require('./lib').diag;
console.log("Square of 11 is " + square(11)); // 121
console.log("Diagonal of 4 and 3 is " + diag(4, 3)); // 5