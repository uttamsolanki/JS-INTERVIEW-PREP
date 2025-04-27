const onload = () => {
  const percentage = document.getElementById("percentage");
  let w = 0;

  percentage.innerHTML = `${w}%`;
  percentage.style.width = `${w}%`;
  let timer = setInterval(() => {
    w++;
    if (w == 100) {
      clearInterval(timer);
    }
    percentage.innerHTML = `${w}%`;
    percentage.style.width = `${w}%`;
  }, 500);
};
document.addEventListener("DOMContentLoaded", onload);
