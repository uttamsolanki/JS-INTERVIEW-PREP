const data = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Grapes",
  "Mango",
  "Pineapple",
  "Strawberry",
  "Blueberry",
  "Raspberry",
  "Blackberry",
  "Watermelon",
  "Cantaloupe",
  "Peach",
  "Plum",
  "Kiwi",
  "Apricot",
  "Lime",
  "Lemon",
  "Orange",
  "Pear",
  "Fig",
  "Guava",
  "Papaya",
  "Dragonfruit",
  "Lychee",
  "Pomegranate",
  "Coconut",
  "Tangerine",
  "Jackfruit",
  "Starfruit",
  "Passionfruit",
  "Persimmon",
  "Avocado",
  "Cranberry",
  "Gooseberry",
  "Honeydew",
  "Durian",
  "Mulberry",
  "Nectarine",
  "Quince",
  "Pomelo",
];

function debouncing(callback) {
  let timer = null;

  return function (search) {
    clearTimeout(timer);
    timer = setTimeout(callback, 500, search);
  };
}

const onLoad = () => {
  const search = document.getElementById("search");
  const resultContainer = document.getElementById("result");
  const cache = new Map();

  const appendSearchResult = (searchData) => {
    let html = "";
    searchData.forEach((element) => {
      html += `<li>${element}</li>`;
    });
    resultContainer.innerHTML = html;
  };
  const fetchData = (value) => {
    value = value.toLowerCase();
    let searchResult = [];
    if (value) {
      if (cache.has(value)) {
        console.log("cache hit");
        searchResult = cache.get(value);
      } else {
        searchResult = data.filter(
          (v) => value && v.toLowerCase().includes(value)
        );
        if (searchResult.length > 0) {
          cache.set(value, searchResult);
        }
      }
    }

    appendSearchResult(searchResult);
  };
  const searchData = debouncing(fetchData);

  search.addEventListener("keyup", ({ target }) => {
    searchData(target.value);
  });
  search.addEventListener("keydown", ({ target }) => {
    searchData(target.value);
  });
};

document.addEventListener("DOMContentLoaded", onLoad);
