function promiseAll(promises) {
  if (
    promises == undefined ||
    typeof promises[Symbol.iterator] !== "function"
  ) {
    throw new Error("Argument is not iterable");
  }

  const results = [];
  results.length = promises.length;
  let count = 0;
  return new Promise((resolve, reject) => {
    if (count === results.length) {
      resolve(results);
      return;
    }

    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      if (promise instanceof Promise) {
        promise
          .then((rep) => {
            results[i] = rep;
            count++;
            if (count === results.length) {
              resolve(results);
              return;
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        results[i] = promise;
        count++;
        if (count === results.length) {
          resolve(results);
          return;
        }
      }
    }
  });
}

// const p1 = Promise.resolve("1");
// const p2 = Promise.reject("2");
// const p3 = Promise.resolve("3");
const promises = "15";
Promise.all(promises).then(console.log).catch(console.log);
promiseAll(promises).then(console.log).catch(console.log);
