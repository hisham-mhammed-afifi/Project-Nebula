document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle Functionality
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.querySelector(".hero__theme-icon");

  // Get saved theme from localStorage or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";
  body.classList.add(`theme--${savedTheme}`);

  // Set initial icon based on theme
  updateThemeIcon(savedTheme);

  // Theme toggle event listener
  themeToggle.addEventListener("click", () => {
    const isLight = body.classList.contains("theme--light");

    if (isLight) {
      body.classList.remove("theme--light");
      body.classList.add("theme--dark");
      localStorage.setItem("theme", "dark");
      updateThemeIcon("dark");
    } else {
      body.classList.remove("theme--dark");
      body.classList.add("theme--light");
      localStorage.setItem("theme", "light");
      updateThemeIcon("light");
    }

    // Add click animation
    themeToggle.style.transform = "scale(0.9)";
    setTimeout(() => {
      themeToggle.style.transform = "scale(1)";
    }, 150);
  });

  function updateThemeIcon(theme) {
    themeIcon.textContent = theme === "light" ? "🌙" : "☀️";
  }

  // Scroll Animations with Intersection Observer
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section--visible");

        // Add staggered animation for feature cards
        if (entry.target.classList.contains("features")) {
          const featureItems = entry.target.querySelectorAll(".features__item");
          featureItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.transform = "translateY(0)";
              item.style.opacity = "1";
            }, index * 100);
          });
        }

        // Add staggered animation for gallery items
        if (entry.target.classList.contains("gallery")) {
          const galleryItems = entry.target.querySelectorAll(".gallery__item");
          galleryItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.transform = "translateY(0) scale(1)";
              item.style.opacity = "1";
            }, index * 150);
          });
        }

        // Add staggered animation for review items
        if (entry.target.classList.contains("reviews")) {
          const reviewItems = entry.target.querySelectorAll(".reviews__item");
          reviewItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.transform = "translateY(0)";
              item.style.opacity = "1";
            }, index * 200);
          });
        }

        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    observer.observe(section);

    // Set initial styles for staggered animations
    if (section.classList.contains("features")) {
      const featureItems = section.querySelectorAll(".features__item");
      featureItems.forEach((item) => {
        item.style.transform = "translateY(30px)";
        item.style.opacity = "0";
        item.style.transition = "transform 0.6s ease, opacity 0.6s ease";
      });
    }

    if (section.classList.contains("gallery")) {
      const galleryItems = section.querySelectorAll(".gallery__item");
      galleryItems.forEach((item) => {
        item.style.transform = "translateY(30px) scale(0.9)";
        item.style.opacity = "0";
        item.style.transition = "transform 0.6s ease, opacity 0.6s ease";
      });
    }

    if (section.classList.contains("reviews")) {
      const reviewItems = section.querySelectorAll(".reviews__item");
      reviewItems.forEach((item) => {
        item.style.transform = "translateY(30px)";
        item.style.opacity = "0";
        item.style.transition = "transform 0.6s ease, opacity 0.6s ease";
      });
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add parallax effect to hero background
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".hero__background");

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });

    ticking = false;
  }

  function requestParallaxUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestParallaxUpdate);

  // Add hover sound effects simulation (visual feedback)
  const interactiveElements = document.querySelectorAll(
    "button, .features__item, .gallery__item, .reviews__item"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.transition = "all 0.2s ease";
    });

    element.addEventListener("mouseleave", () => {
      element.style.transition = "all 0.3s ease";
    });
  });

  // Performance optimization: Reduce animations on mobile
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    // Disable some animations on mobile for better performance
    const style = document.createElement("style");
    style.textContent = `
            .hero__stars { animation: none; }
            .hero__nebula { animation: none; }
        `;
    document.head.appendChild(style);
  }

  // Add loading animation completion
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");

    // Trigger hero section visibility immediately
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      heroSection.classList.add("section--visible");
    }
  });
});
