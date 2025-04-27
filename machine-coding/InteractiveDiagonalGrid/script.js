const cols = [];
const rows = [];
const gridSize = 20;
function highlightDiagonals(rowIndex, colIndex, size) {
  const directions = [
    [-1, -1], // top-left
    [-1, 1], // top-right
    [1, -1], // bottom-left
    [1, 1], // bottom-right
  ];

  for (const [dx, dy] of directions) {
    let i = rowIndex + dx;
    let j = colIndex + dy;

    while (i >= 0 && j >= 0 && i < size && j < size) {
      cols[i][j].style.backgroundColor = "red";
      i += dx;
      j += dy;
    }
  }
}

function buildGrid(size) {
  const grid = document.getElementsByClassName("main__grid")[0];
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("main__grid__row");
    rows.push(row);

    const colarray = [];
    for (let j = 0; j < size; j++) {
      const col = document.createElement("div");
      col.classList.add("main__grid__row__col");
      row.appendChild(col);
      colarray.push(col);
    }
    grid.appendChild(row);
    cols.push(colarray);
  }
}

function resetGridcolor() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      cols[i][j].style.backgroundColor = "white";
    }
  }
}
function addListeners() {
  const grid = document.getElementsByClassName("main__grid")[0];
  const btn = document.getElementsByClassName("main__btn")[0];
  grid.addEventListener("click", ({ target }) => {
    const parent = target.parentElement;

    const row = rows.indexOf(parent);
    const col = cols[row].indexOf(target);
    resetGridcolor();
    highlightDiagonals(row, col, gridSize);
    cols[row][col].style.backgroundColor = "yellow";
  });

  btn.addEventListener("click", () => {
    resetGridcolor();
  });
}
function onLoad() {
  buildGrid(gridSize);
  addListeners();
}
document.addEventListener("DOMContentLoaded", onLoad);
