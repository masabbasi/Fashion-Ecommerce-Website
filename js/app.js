const $ = document;
const hamburgerMenu = $.querySelector(".hamburgerMenu");
const menuNav = $.querySelector(".menu nav");

hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("hamburgerMenuOpen");
  menuNav.classList.toggle("navInMobile");
});

// swiper Bundle
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
		1400: {
      slidesPerView: 4,
    },
  },
});
