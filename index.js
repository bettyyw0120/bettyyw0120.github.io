class ScrollNavigator {
  constructor() {
    this.pages = {
      "home": "main",
      "aboutme": "gradientDark",
      "experience": "gradientMedium",
      "projects": "gradientLight"
    };
  }

  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  updateNavigation() {
    let scrollY = window.pageYOffset;
    document.querySelectorAll("section").forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = (current.getBoundingClientRect().top + window.pageYOffset) - 75;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`a[href*="${sectionId}"]`).classList.add("active");
        document.querySelector("#navbar").classList = "";
        document.querySelector("#navbar").classList.add(this.pages[sectionId]);
        if (sectionId === "aboutme") {
          document.querySelector(".bio").classList.add("bounceZoom");
        }
      } else {
        document.querySelector(`a[href*="${sectionId}"]`).classList.remove("active");
        if (sectionId === "home") {
          document.querySelector("#navbar").classList.add(this.pages[sectionId]);
        }
      }
    });

    document.querySelectorAll(".experiencePosition").forEach((current) => {
      if (this.isElementInViewport(current)) {
        current.classList.add("bounceRight");
      }
    });

    document.querySelectorAll(".timelineEntry").forEach((current) => {
      if (this.isElementInViewport(current)) {
        current.classList.add("bounceRight");
      }
    });
  }

  showSlide(n) {
    document.querySelectorAll(".slide").forEach((current) => {
      const slide = "slide" + n;
      const currentSlide = current.getAttribute("id");

      if (currentSlide === slide) {
        current.classList.remove("notActive");
      } else {
        current.classList.add("notActive");
      }
    });

    document.querySelectorAll(".dot").forEach((current) => {
      const dot = "project" + n;
      const currentDot = current.getAttribute("id");

      if (currentDot === dot) {
        current.classList.add("activeDot");
      } else {
        current.classList.remove("activeDot");
      }
    });
  }

  init() {
    window.addEventListener("scroll", this.updateNavigation.bind(this));
    window.addEventListener("load", this.updateNavigation.bind(this));
  }
}

const navigator = new ScrollNavigator();
navigator.init();
