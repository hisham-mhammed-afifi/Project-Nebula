class Carousel {
  constructor(selector, config = {}) {
    this.container = document.querySelector(selector);
    if (!this.container)
      throw new Error(`Carousel: Container not found for "${selector}"`);

    this.config = {
      slidesToShow: config.slidesToShow || 1,
      autoplay: config.autoplay || false,
      autoplaySpeed: config.autoplaySpeed || 3000,
      loop: config.loop !== false,
    };

    this.slides = Array.from(this.container.children);
    this.totalSlides = this.slides.length;
    this.currentIndex = 0;
    this.intervalId = null;

    this.setupCarousel();
    this.attachEvents();
    if (this.config.autoplay) this.startAutoplay();
  }

  setupCarousel() {
    // Prepare elements
    this.track = document.createElement("div");
    this.track.className = "carousel-track";
    this.track.style.display = "flex";
    this.track.style.transition = "transform 0.5s ease-in-out";
    this.track.style.willChange = "transform";

    this.slides.forEach((slide) => {
      slide.classList.add("carousel-slide");
      slide.style.flex = `0 0 ${100 / this.config.slidesToShow}%`;
      this.track.appendChild(slide);
    });

    const wrapper = document.createElement("div");
    wrapper.className = "carousel-wrapper";
    wrapper.style.overflow = "hidden";
    wrapper.appendChild(this.track);

    this.container.innerHTML = "";
    this.container.classList.add("carousel-container");
    this.container.appendChild(wrapper);

    // Add navigation buttons
    this.prevBtn = document.createElement("button");
    this.nextBtn = document.createElement("button");
    this.prevBtn.innerHTML = "‹";
    this.nextBtn.innerHTML = "›";
    this.prevBtn.className = "carousel-prev";
    this.nextBtn.className = "carousel-next";
    this.container.appendChild(this.prevBtn);
    this.container.appendChild(this.nextBtn);

    this.updateControls();
    this.updatePosition();
  }

  attachEvents() {
    this.nextBtn.addEventListener("click", () => this.nextSlide());
    this.prevBtn.addEventListener("click", () => this.prevSlide());

    this.container.addEventListener("mouseenter", () => this.stopAutoplay());
    this.container.addEventListener("mouseleave", () => {
      if (this.config.autoplay) this.startAutoplay();
    });

    window.addEventListener("resize", () => this.updatePosition());
  }

  nextSlide() {
    const maxIndex = this.config.loop
      ? this.totalSlides
      : this.totalSlides - this.config.slidesToShow;
    this.currentIndex = (this.currentIndex + 1) % maxIndex;
    this.updatePosition();
    this.updateControls();
  }

  prevSlide() {
    const maxIndex = this.totalSlides;
    this.currentIndex = (this.currentIndex - 1 + maxIndex) % maxIndex;
    this.updatePosition();
    this.updateControls();
  }

  updatePosition() {
    const totalWidth = 100;
    const slideWidth = totalWidth / this.config.slidesToShow;
    const centerOffset =
      this.config.slidesToShow % 2 === 0 ? slideWidth / 2 : 0;

    const translateX = -this.currentIndex * slideWidth + centerOffset;
    this.track.style.transform = `translateX(${translateX}%)`;
  }

  updateControls() {
    const maxIndex = this.totalSlides - this.config.slidesToShow;
    this.prevBtn.disabled = !this.config.loop && this.currentIndex === 0;
    this.nextBtn.disabled = !this.config.loop && this.currentIndex >= maxIndex;
  }

  startAutoplay() {
    this.intervalId = setInterval(
      () => this.nextSlide(),
      this.config.autoplaySpeed
    );
  }

  stopAutoplay() {
    clearInterval(this.intervalId);
  }
}
