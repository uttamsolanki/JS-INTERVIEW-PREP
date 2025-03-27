// const stringify = (obj) => {
//   let str = "";
//   if (obj && obj.constructor === Object) {
//     str += "{";
//     for (const [key, value] of Object.entries(obj)) {
//       str += `"${key}":` + stringify(value) + ",";
//     }
//     str = str.slice(0, -1);
//     str += "}";
//     return str;
//   } else if (obj && Array.isArray(obj)) {
//     str += "[";
//     obj.forEach((value) => {
//       str += stringify(value) + ",";
//     });
//     str = str.slice(0, -1);
//     str += "]";
//     return str;
//   }

//   return obj;
// };

const stringify = (obj) => {
  if (obj && obj.constructor === Object) {
    const arr = [];
    for (const [key, value] of Object.entries(obj)) {
      if (value === undefined) continue;
      arr.push([`"${key}"`, stringify(value)].join(":"));
    }
    return `{${arr.join(",")}}`;
  } else if (obj && Array.isArray(obj)) {
    const arr = [];
    obj.forEach((value) => {
      arr.push(stringify(value));
    });
    return `[${arr.join(",")}]`;
  } else if (obj === "") {
    return "''";
  } else if (!obj && obj !== "") {
    return "null";
  }

  return obj;
};

const obj = {
  name: "Vishal",
  age: null,
  address: {
    primary: {
      house: "109",
      street: {
        main: "21",
        cross1: null,
        cross2: undefined,
        cross3: NaN,
        cross4: "",
      },
    },
    secondary: null,
  },
  phones: [
    1,
    2,
    3,
    "Utam",
    null,
    undefined,
    "",
    NaN,
    { type: "home", number: "1234567890" },
    { type: "work", number: null },
  ],
  preferences: null,
};
console.log(stringify(obj));
