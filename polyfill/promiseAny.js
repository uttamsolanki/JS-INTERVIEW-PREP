function promiseAny(promises) {
  if (
    promises == undefined ||
    typeof promises[Symbol.iterator] !== "function"
  ) {
    throw new Error("Argument is not iterable");
  }

  const errors = [];
  errors.length = promises.length;
  let count = 0;
  return new Promise((resolve, reject) => {
    if (count === errors.length) {
      reject(new AggregateError([], "All promises were rejected"));
      return;
    }

    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      if (promise instanceof Promise) {
        promise
          .then((rep) => {
            resolve(rep);
          })
          .catch((error) => {
            errors[i] = error;
            count++;
            if (count === errors.length) {
              reject(new AggregateError(errors, "All promises were rejected"));
            }
          });
      } else {
        resolve(promise);
      }
    }
  });
}

const p1 = Promise.reject("1");
const p2 = Promise.reject("2");
const p3 = Promise.resolve("3");
const promises = [p1, p2, p3];
Promise.any(promises).then(console.log).then(console.log).catch(console.log);
promiseAny(promises).then(console.log).then(console.log).catch(console.log);
