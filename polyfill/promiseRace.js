function promiseRace(promises) {
  if (typeof promises[Symbol.iterator] !== "function") {
    throw new Error("Argument is not iterable");
  }

  return new Promise((resolve, reject) => {
    if (promises.length === 0) resolve();
    for (const promise of promises) {
      if (promise instanceof Promise) {
        promise.then(resolve).catch(reject);
      } else {
        resolve(promise);
      }
    }
  });
}

const p1 = new Promise((resolve) => setTimeout(() => resolve("p1"), 200));
const p2 = new Promise((_, reject) => setTimeout(() => reject("p2"), 100));
const promises = [p1, p2];
Promise.race(promises).then(console.log).catch(console.log);
promiseRace(promises).then(console.log).catch(console.log);
