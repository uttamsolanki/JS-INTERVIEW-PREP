// Apply argument to given functions
function currying(func) {
  return function carried(...args) {
    if (func.length <= args.length) {
      return func.apply(this, args);
    }
    return carried.bind(this, ...args);
  };
}

//using apply
// function currying(func) {
//   return function carried(...args) {
//     if (func.length <= args.length) {
//       return func.apply(this, args);
//     }
//     return (arg) => {
//       if (arg !== undefined) {
//         return carried.apply(this, [...args, arg]);
//       } else {
//         return carried.apply(this, args);
//       }
//     };
//   };
// }

//using call
// function currying(func) {
//   return function carried(...args) {
//     if (func.length <= args.length) {
//       return func.call(this, ...args);
//     }
//     return (arg) => {
//       if (arg !== undefined) {
//         return carried.call(this, ...args, arg);
//       } else {
//         return carried.call(this, ...args);
//       }
//     };
//   };
// }

function add(a, b) {
  return a + b;
}

const curriedAdd = currying(add);
console.log(curriedAdd(3)(4));

const alreadyAddedThree = curriedAdd(3);
console.log(alreadyAddedThree(4));
