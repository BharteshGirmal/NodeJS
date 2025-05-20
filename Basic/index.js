const math = require("./math");
const fs = require("./filereading");
const { fstat } = require("node:fs");

console.log("------------- Node JS -------------");
console.log("Addition : ", math.addtion(1, 2));
console.log("subtraction : ", math.subtraction(13, 2));
console.log("Multiplication : ", math.multiplication(10, 2));
console.log("Division : ", math.division(67, 2));
// console.log(fs);

const MYfs = require("fs");
const { log } = require("node:console");

const file = MYfs.writeFileSync("filetesting.txt", "File IO Oprations...");

console.log("------------- Blocking Code Starts -------------");
const file2 = MYfs.readFileSync("./filetesting.txt", "utf-8");
console.log(file2);

console.log("------------- Blocking Code Ends -------------");
console.log("------------- Non Blocking Code starts -------------");
MYfs.readFile("./filetesting.txt", "utf-8", (err, msg) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(msg);
  }
});
console.log("------------- Non Blocking Code Ends -------------");
