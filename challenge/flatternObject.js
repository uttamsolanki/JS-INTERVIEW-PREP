const flattenObject = (obj, prefix = "", result = {}) => {
  if (obj && Array.isArray(obj)) {
    obj.forEach((value, index) => {
      const key = prefix ? `${prefix}_${index}` : index;
      flattenObject(value, key, result);
    });
  } else if (obj && obj.constructor === Object) {
    for (const [index, value] of Object.entries(obj)) {
      const key = prefix ? `${prefix}_${index}` : index;
      flattenObject(value, key, result);
    }
  } else {
    result[prefix] = obj;
  }
};

const user = {
  name: "Vishal",
  age: null,
  address: {
    primary: {
      house: "109",
      street: {
        main: "21",
        cross: null,
      },
    },
    secondary: null,
  },
  phones: [
    { type: "home", number: "1234567890" },
    { type: "work", number: null },
  ],
  preferences: null,
};
let result = {};
flattenObject(user, "user", result);

console.log(result);

// TODO
// learn array and object iterator
