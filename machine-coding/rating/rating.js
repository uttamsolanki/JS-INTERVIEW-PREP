const onDomLoad = () => {
  const ratingContainer = document.getElementById("rating-container");
  let selectedRating = -1;

  const stars = 10;

  const init = () => {
    creatStarts();
    initListener();
  };

  const creatStarts = () => {
    let html = "";
    for (let i = 0; i < stars; i++) {
      html += `<div class="star" data-value=${i}></div>`;
    }
    ratingContainer.innerHTML = html;
  };

  const initListener = () => {
    ratingContainer.addEventListener("mouseover", (event) => {
      updateRating(event.target.dataset.value);
    });

    ratingContainer.addEventListener("mouseout", () => {
      updateRating(selectedRating);
    });

    ratingContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("star")) {
        selectedRating = event.target.dataset.value;
      }
    });
  };

  const updateRating = (ratingValue) => {
    const children = document.querySelectorAll(".star");
    children.forEach((child) => {
      if (child.dataset.value <= ratingValue) {
        child.classList.add("active");
      } else {
        child.classList.remove("active");
      }
    });
  };

  init();
};

document.addEventListener("DOMContentLoaded", onDomLoad);
