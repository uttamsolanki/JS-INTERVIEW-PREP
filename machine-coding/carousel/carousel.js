document.addEventListener("DOMContentLoaded", async (event) => {
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("close-modal");
  //dotContainer
  const dotsContainer = document.getElementById("dots-container");
  const imgContainer = document.getElementById("img-container");
  const gallaryContainer = document.getElementById("img-gallary");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  let images = [];
  let index = 0;

  const init = async () => {
    // fetch images
    images = await fetchImages();

    if (images.length !== 0) {
      createGallary();
      addListeners();
      createDots();
      updateImage();
    }
  };

  // fetch images
  const fetchImages = async () => {
    try {
      const resp = await fetch(
        "http://127.0.0.1:5500/machine-coding/carousel/images.json"
      );
      const json = await resp.json();
      return json;
    } catch (e) {
      return [];
    }
  };

  const addListeners = () => {
    gallaryContainer.addEventListener("click", (event) => {
      if (event.target.tagName === "IMG") {
        //get Active Index
        const images = Array.from(gallaryContainer.getElementsByTagName("img"));
        // Get the index of the clicked image
        index = images.indexOf(event.target);

        updateImage();

        //open modal
        openModal();
      }
    });

    dotsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("dot")) {
        //get Active Index
        const images = Array.from(dotsContainer.getElementsByClassName("dot"));
        // Get the index of the clicked image
        index = images.indexOf(event.target);

        updateImage();
      }
    });

    closeBtn.addEventListener("click", () => {
      closeModal();
    });

    window.addEventListener("click", (e) => {
      if (e.target == modal) {
        closeModal();
      }
    });

    window.onkeydown = function (evt) {
      if (evt.key == "Escape") {
        closeModal();
      }
    };

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % images.length;
      updateImage();
    });
    prevBtn.addEventListener("click", () => {
      index = (index - 1 + images.length) % images.length;
      updateImage();
    });
  };

  const closeModal = () => {
    modal.style.display = "none";
  };

  const openModal = () => {
    modal.style.display = "block";
  };

  const createGallary = () => {
    for (let i = 0; i < images.length; i++) {
      const img = document.createElement("img");
      img.src = `${images[i]}`;
      gallaryContainer.appendChild(img);
    }
    activateGallaryImage();
  };

  const createDots = () => {
    images.forEach((_, i) => {
      //Dot
      const dot = document.createElement("div");
      dot.className = "dot";
      dotsContainer.appendChild(dot);
    });
  };

  const updateImage = () => {
    let img = imgContainer.getElementsByTagName("img")[0];
    if (!img) {
      img = document.createElement("img");
      imgContainer.appendChild(img);
    }
    console.log(index);
    img.src = `${images[index]}`;

    activateGallaryImage();

    updateDots();
  };

  const activateGallaryImage = () => {
    const activeImg = gallaryContainer.getElementsByClassName("active")[0];
    activeImg?.classList.remove("active");

    const nextActive = gallaryContainer.getElementsByTagName("img")[index];
    nextActive?.classList.add("active");
  };

  const updateDots = () => {
    const activeImg = dotsContainer.getElementsByClassName("active")[0];
    activeImg?.classList.remove("active");

    const nextActive = dotsContainer.getElementsByClassName("dot")[index];
    nextActive?.classList.add("active");
  };

  init();
});
