// Templates
const MODAL_TEMPLATE = ` <div id="modal-container">
<div id="btn-container">
  <button type="button" id="prev" class="carousel-btn">
    <i class="arrow left"></i>
  </button>
  <button type="button" id="next" class="carousel-btn">
    <i class="arrow right"></i>
  </button>
</div>
<div id="img-container">
  <img />
</div>
<div id="dots-container"></div>
</div>
<button type="button" id="close-modal">X</button>`;

const GALLERY_TEMPLATE = `<div id="gallery-container"></div>`;

// Storage Key
const RATING_STORAGE_KEY = "RATING_STORAGE";
let filltedImages = [];
function getRatingFromStorage(imageId) {
  let storageValue = localStorage.getItem(RATING_STORAGE_KEY) || "{}";
  return JSON.parse(storageValue)[imageId] || -1;
}

function saveRatingToStorage(imageId, rating) {
  try {
    let storageValue = JSON.parse(
      localStorage.getItem(RATING_STORAGE_KEY) || "{}"
    );
    storageValue[imageId] = rating;
    localStorage.setItem(RATING_STORAGE_KEY, JSON.stringify(storageValue));
  } catch (e) {
    console.error("Error saving rating:", e?.message);
  }
}

function renderRatingStars(container) {
  const imageId = container.closest(".img-container")?.dataset.id;
  let selectedRating = getRatingFromStorage(imageId);
  const starCount = 5;
  let starElements = [];

  function createStars() {
    let html = "";
    for (let i = 0; i < starCount; i++) {
      html += `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="star" data-value=${i}>
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" stroke="black" stroke-width="1"/>
</svg>`;
    }
    container.innerHTML = html;
  }

  function attachListeners() {
    container.addEventListener("mouseover", ({ target }) => {
      const star = target.closest("svg");
      if (star) updateStarVisuals(star.dataset.value);
    });

    container.addEventListener("mouseout", () => {
      updateStarVisuals(selectedRating);
    });

    container.addEventListener("click", ({ target }) => {
      const star = target.closest("svg");
      if (star) {
        selectedRating = star.dataset.value;
        saveRatingToStorage(imageId, selectedRating);
      }
    });
  }

  function updateStarVisuals(value) {
    starElements.forEach((star) => {
      star.classList.toggle("selected", star.dataset.value <= value);
    });
  }

  createStars();
  attachListeners();
  starElements = container.querySelectorAll(".star");
  updateStarVisuals(selectedRating);
}

function createImageCarouselModal(images, onIndexChange) {
  const modal = document.getElementById("modal");
  modal.innerHTML = MODAL_TEMPLATE;

  const closeBtn = document.getElementById("close-modal");
  const dotsContainer = document.getElementById("dots-container");
  const imgContainer = document.getElementById("img-container");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  let index = 0;

  function attachListeners() {
    dotsContainer.addEventListener("click", ({ target }) => {
      if (target.classList.contains("dot")) {
        index = Array.from(dotsContainer.children).indexOf(target);
        updateCarouselImage();
      }
    });

    closeBtn.addEventListener("click", hideModal);

    window.addEventListener("click", (e) => {
      if (e.target === modal) hideModal();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") hideModal();
    });

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % images.length;
      updateCarouselImage();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + images.length) % images.length;
      updateCarouselImage();
    });
  }

  function hideModal() {
    modal.style.display = "none";
  }

  function showModal(i) {
    index = i;
    modal.style.display = "block";
    updateCarouselImage();
  }

  function renderDots() {
    dotsContainer.innerHTML = images
      .map(() => `<div class="dot"></div>`)
      .join("");
  }

  function updateCarouselImage() {
    const img = imgContainer.querySelector("img");
    img.src = images[index].img;
    highlightActiveDot();
    onIndexChange(index);
  }

  function highlightActiveDot() {
    dotsContainer.querySelector(".active")?.classList.remove("active");
    dotsContainer.children[index]?.classList.add("active");
  }

  attachListeners();
  renderDots();

  return { showModal };
}

function renderImageGallery(images) {
  document.getElementById("main-gallery").innerHTML = GALLERY_TEMPLATE;
  const galleryContainer = document.getElementById("gallery-container");
  let index = 0;

  const updateIndex = (i) => {
    index = i;
    highlightGalleryImage();
  };

  galleryContainer.addEventListener("click", ({ target }) => {
    if (target.tagName === "IMG") {
      const allImages = Array.from(galleryContainer.querySelectorAll("img"));
      const { showModal } = createImageCarouselModal(images, updateIndex);
      index = allImages.indexOf(target);
      highlightGalleryImage();
      showModal(index);
    }
  });

  function createImageCard(image) {
    return `<div class="img-container" data-id=${image.id}>
              <img src="${image.img}" />
              <div class="img-caption">
                <span class="title">${image.name} | ${new Intl.DateTimeFormat(
      "en-US"
    ).format(image.date)}</span>
                <span class="rating-container"></span>
              </div>
            </div>`;
  }

  function renderGallery() {
    galleryContainer.innerHTML = images.map(createImageCard).join("");
    highlightGalleryImage();
  }

  function highlightGalleryImage() {
    galleryContainer.querySelector(".active")?.classList.remove("active");
    galleryContainer
      .querySelectorAll(".img-container")
      [index]?.classList.add("active");
  }

  function attachRatings() {
    galleryContainer
      .querySelectorAll(".rating-container")
      .forEach(renderRatingStars);
  }

  renderGallery();
  attachRatings();
}

function createPaginationControls(images) {
  const paginationContainer = document.getElementById("pagination-container");
  const pageList = paginationContainer.querySelector("ul");
  const nextBtn = document.getElementById("pNext");
  const prevBtn = document.getElementById("pPrev");

  const PAGE_SIZE = 5;
  let currentPage = 1;
  const totalPages = Math.ceil(images.length / PAGE_SIZE);
  let pageElements = [];

  function renderPages() {
    pageList.innerHTML = Array.from(
      { length: totalPages },
      (_, i) => `<li data-value=${i + 1}>${i + 1}</li>`
    ).join("");
    pageElements = Array.from(pageList.querySelectorAll("li"));
  }

  function attachListeners() {
    nextBtn.addEventListener("click", () => {
      currentPage++;
      updatePageContent();
    });

    prevBtn.addEventListener("click", () => {
      currentPage--;
      updatePageContent();
    });

    pageList.addEventListener("click", ({ target }) => {
      if (target.tagName === "LI" && !target.classList.contains("active")) {
        currentPage = parseInt(target.dataset.value);
        updatePageContent();
      }
    });
  }

  function updatePageContent() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    pageList.querySelector(".active")?.classList.remove("active");
    pageElements[currentPage - 1].classList.add("active");

    const offset = (currentPage - 1) * PAGE_SIZE;
    renderImageGallery(images.slice(offset, offset + PAGE_SIZE));
  }

  renderPages();
  attachListeners();
  updatePageContent();
}

async function fetchImages() {
  try {
    const response = await fetch(
      "http://127.0.0.1:5500/machine-coding/carousel_rating_pagination/images.json"
    );
    return await response.json();
  } catch (e) {
    console.error("Failed to fetch images");
    return [];
  }
}

function debounce(callback, delay = 500) {
  let timer;
  return function (value) {
    clearTimeout(timer);
    timer = setTimeout(() => callback(value.toLowerCase()), delay);
  };
}

function handleSearchInput(value) {
  filltedImages = images.filter((img) =>
    img.name.toLowerCase().includes(value)
  );
  if (!filltedImages.length) {
    filltedImages = [...images];
  }
  populateData();
}

function initSearchFunctionality() {
  const searchInput = document.querySelector(
    ".main__search__container--search"
  );
  const debouncedSearch = debounce(handleSearchInput);

  searchInput.addEventListener("keyup", (e) =>
    debouncedSearch(e.currentTarget.value)
  );
  searchInput.addEventListener("keydown", (e) =>
    debouncedSearch(e.currentTarget.value)
  );
}

function initSortFunctionality() {
  const sortBtn = document.getElementsByClassName(
    "main__search__container--sort__btn__image"
  )[0];

  sortBtn.addEventListener("click", () => {
    images.reverse();
    filltedImages.reverse();
    populateData();
  });
}
function populateData() {
  createPaginationControls(filltedImages);
}

document.addEventListener("DOMContentLoaded", async () => {
  images = await fetchImages();
  if (images.length) {
    images = images.map((img) => ({ ...img, date: new Date(img.date) }));

    images = images.sort((a, b) => a.date - b.date);
    filltedImages = [...images];
    populateData();
  }
  initSearchFunctionality();
  initSortFunctionality();
});
