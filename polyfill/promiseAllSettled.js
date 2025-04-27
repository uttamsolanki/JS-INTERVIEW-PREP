function promiseAllSettled(promises) {
  if (
    promises == undefined ||
    typeof promises[Symbol.iterator] !== "function"
  ) {
    throw new Error("Argument is not iterable");
  }

  const results = [];
  results.length = promises.length;
  let count = 0;
  return new Promise((resolve) => {
    if (count === results.length) {
      resolve(results);
      return;
    }

    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      if (promise instanceof Promise) {
        promise
          .then((rep) => {
            results[i] = { status: "fulfilled", value: rep };
            count++;
          })
          .catch((error) => {
            results[i] = { status: "rejected", reason: error };
            count++;
          })
          .finally(() => {
            if (count === results.length) {
              resolve(results);
              return;
            }
          });
      } else {
        results[i] = { status: "filfilled", value: promise };
        count++;
        if (count === results.length) {
          resolve(results);
          return;
        }
      }
    }
  });
}

const p1 = Promise.resolve("1");
const p2 = Promise.reject("2");
const p3 = Promise.resolve("3");
const promises = [p1, p2, p3];
Promise.allSettled(promises).then(console.log).catch(console.log);
promiseAllSettled(promises).then(console.log).catch(console.log);
