// How can you implement a retry mechanism for fetching data?

// function retryPromise(fn, retries = 3, delay = 1000) {
//     // write code here
// }

function retryPromise(fn, retries = 3, delay = 1000) {
  return new Promise((res, rej) => {
    const tryAgain = async (i) => {
      fn()
        .then(res)
        .catch((e) => {
          i++;
          if (i == retries) {
            rej(e);
            return;
          }
          setTimeout(tryAgain, delay, i);
        });
    };

    tryAgain(0);
  });
}

// mock fetch data
const fetchData = () => {
  return new Promise((resolve, reject) => {
    // Simulate a request that might fail
    const success = Math.random() > 0.5 && false; // 50% chance of success
    console.log(success, "success");
    if (success) {
      resolve("Data fetched successfully!");
    } else {
      reject("Failed to fetch data");
    }
  });
};

retryPromise(fetchData, 3, 1000)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
