String.prototype.Repeat = function (count) {
  if (count < 0) {
    throw new Error("Range error");
  } else if (this.length == 0 || count === 0) {
    return "";
  } else {
    let str = "";
    while (count-- > 0) {
      str += this;
    }
    return str;
  }
};

const str = "a";
console.log(str.Repeat(1));
console.log(str.repeat(2));
