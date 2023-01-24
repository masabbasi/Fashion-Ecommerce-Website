const $ = document;
const hamburgerMenu = $.querySelector(".hamburgerMenu");
const menu = $.querySelector(".menu");
const menuNav = $.querySelector(".menu nav");
const themeBtn = $.querySelector(".themeBtn");
const review = $.querySelectorAll(".review");

//Mobile Menu
hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("hamburgerMenuOpen");
  menuNav.classList.toggle("navInMobile");
  menu.classList.toggle("menuMobileActive");
});
window.addEventListener("resize", function (x) {
  if (this.innerWidth > 768) {
    console.log("768");
    hamburgerMenu.classList.remove("hamburgerMenuOpen");
    menuNav.classList.remove("navInMobile");
    menu.classList.remove("menuMobileActive");
    if (localStorage.getItem("theme") === "dark-theme") {
      review.style.backgroundImage =
        "url(../assets/images/reviews-rectangle-dark.svg)";
    } else {
			review.forEach(function(item){
				item.style.backgroundImage =
        "url(../assets/images/reviews-rectangle.svg)";
			})
    }
  } else {
		review.forEach(function(item){
			item.style.backgroundImage =
			"";
		})
  }
});

//Dark Mode
let x = window.matchMedia("(min-width: 768px)");
if (localStorage.getItem("theme") === "dark-theme") {
  document.documentElement.classList.add("dark-theme");
  themeBtn.innerHTML = '<img src="./assets/images/sun.svg">';
  if (x.matches) {
		review.forEach(function(item){
			item.style.backgroundImage =
			"url(../assets/images/reviews-rectangle-dark.svg)";
		})
  } else {
		review.forEach(function(item){
			item.style.backgroundImage =
			"";
		})
  }
}
themeBtn.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark-theme");
  if (document.documentElement.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark-theme");
    this.innerHTML = '<img src="./assets/images/sun.svg">';
    if (x.matches) {
			review.forEach(function(item){
				item.style.backgroundImage =
        "url(../assets/images/reviews-rectangle-dark.svg)";
			})
    } else {
			review.forEach(function(item){
				item.style.backgroundImage =
        "";
			})
    }
  } else {
    localStorage.setItem("theme", "light-theme");
    this.innerHTML = '<img src="./assets/images/moon.svg">';
    if (x.matches) {
			review.forEach(function(item){
				item.style.backgroundImage =
        "url(../assets/images/reviews-rectangle.svg)";
			})
    } else {
			review.forEach(function(item){
				item.style.backgroundImage =
        "";
			})
    }
  }
});

// Slider
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
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

const swiper2 = new Swiper(".swiperReview", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints:
	{ 300: { slidesPerView: 1 } }
});
