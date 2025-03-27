// How would you implement a function for infinite currying that accumulates
// values passed in successive calls and returns the result when called without
// arguments?

function currying(a) {
  return function (b) {
    if (!b) {
      return a;
    }
    return currying(a + b);
  };
}

//console.log(currying(1)(2)(3)(4)());

// accumulates value but argument can be single or multiple
function currying2(...a) {
  return function (...b) {
    if (b.length == 0) {
      return a.reduce((acc, curr) => acc + parseInt(curr), 0);
    }
    return currying2.apply(this, [...a, ...b]);
  };
}

//console.log(currying2(1, 2)(3)());
