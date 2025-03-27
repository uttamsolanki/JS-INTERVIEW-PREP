// Problem : Number of Vowels in a String

const countVowels = (str) => {
  if (typeof str !== "string") {
    return 0;
  }

  const vowels = "aeiouAEIOU";
  let cnt = 0;

  //Using for loop
  //   for (let i = 0; i < str.length; i++) {
  //     if (vowels.includes(str[i])) {
  //       cnt++;
  //     }
  //   }
  //   return cnt;

  //using map
  //return [...str].filter((ch) => vowels.includes(ch)).length;

  //using reduce
  return [...str].reduce(
    (count, ch) => (vowels.includes(ch) ? count + 1 : count),
    0
  );
};

console.log(countVowels("Uttam"));
