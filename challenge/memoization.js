/**
 * Given a function fn, return a memoized version of that function.
 * */

function memoize(fn) {
  let map = new Map();

  const serialize = (value) => {
    if (typeof value === "object" && value !== null) {
      const sortedKey = Object.keys(value).sort();
      return sortedKey
        .map((key) => `"${key}":${JSON.stringify(value[key])}`)
        .join(",");
    }
    return JSON.stringify(value);
  };

  return function (...args) {
    const key = args.map(serialize).join("|");
    if (!map.has(key)) {
      console.log("Cache miss");
      map.set(key, fn.apply(this, args));
    }
    return map.get(key);
  };
}

const sum = (obj) => Object.values(obj).join("TEST");
const memoizedSum = memoize(sum);
console.log(memoizedSum({ a: 1, b: 2 }));
console.log(memoizedSum({ b: 2, a: 1 }));
