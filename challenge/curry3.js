// Implement the curry function which accepts a function as the only argument
// and returns a function that accepts a variadic number of arguments (vs only one argument at a time in Curry
// and a fixed number of arguments in Curry II) and returns a function which can be repeatedly called.

// function currying4(func) {
//   return function carried(...args) {
//     const fn = carried.bind(this, ...args);

//     fn[Symbol.toPrimitive] = () => func.apply(this, args);

//     return fn;
//   };
// }

function curry(func) {
  return function carried(...args) {
    const fn = carried.bind(this, ...args);

    fn[Symbol.toPrimitive] = () => {
      return func.apply(this, args);
    };
    return fn;
  };
}

function multiply(...numbers) {
  return numbers.reduce((a, b) => a * b, 1);
}
const curriedMultiply = curry(multiply);
const multiplyByThree = curriedMultiply(3);
console.log(Number(multiplyByThree)); // 3
console.log(+multiplyByThree(4)); // 12

const multiplyByFifteen = multiplyByThree(5);
console.log(+multiplyByFifteen); // 15
console.log(+multiplyByFifteen(2)); // 30

console.log(+curriedMultiply(1)(2)(3)(4)); // 24
console.log(+curriedMultiply(1, 2, 3, 4)); // 24
