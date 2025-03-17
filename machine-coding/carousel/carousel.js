class Carousel {
  constructor() {
    this.nextBtn = document.getElementById("next");
    this.prevBtn = document.getElementById("prev");
    this.index = 0;
  }
  init(images = []) {
    this.images = images;
    this.addListeners();
    this.createImages();
    this.createDots();
    this.updateImage();
  }
  addListeners() {
    this.nextBtn.addEventListener("click", () => {
      this.index = (this.index + 1) % this.images.length;
      this.updateImage();
    });
    this.prevBtn.addEventListener("click", () => {
      this.index = (this.index - 1 + this.images.length) % this.images.length;
      this.updateImage();
    });
  }
  createImages() {
    const imgContainer = document.getElementById("img-container");

    this.images.forEach((imgSrc, i) => {
      //Image
      let img = document.createElement("img");
      img.src = `./images/${imgSrc}`;
      img.id = `img_${i}`;
      imgContainer.appendChild(img);
    });
  }
  createDots() {
    const dostContainer = document.getElementById("dots-container");
    this.images.forEach((_, i) => {
      //Dot
      let dot = document.createElement("div");

      //register event
      dot.addEventListener("click", () => {
        this.index = i;
        this.updateImage();
      });

      dot.id = `dot_${i}`;
      dot.className = "dot";
      dostContainer.appendChild(dot);
    });
  }
  updateImage() {
    // Update Image
    document.querySelector("img.active")?.classList.remove("active");
    document.getElementById(`img_${this.index}`).classList.add("active");

    //Update dots
    document.querySelector(".dot.active")?.classList.remove("active");
    document.getElementById(`dot_${this.index}`).classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
  ];
  const carousal = new Carousel();
  carousal.init(images);
});
