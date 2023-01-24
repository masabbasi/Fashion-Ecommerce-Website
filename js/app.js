const $ = document;
const hamburgerMenu = $.querySelector(".hamburgerMenu");
const menuNav = $.querySelector(".menu nav");
const themeBtn = $.querySelector(".themeBtn");
const review = $.querySelector(".review");

hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("hamburgerMenuOpen");
  menuNav.classList.toggle("navInMobile");
});


//Dark Mode
if (localStorage.getItem("theme") === "dark-theme") {
	document.documentElement.classList.add("dark-theme");
	themeBtn.innerHTML= '<img src="./assets/images/sun.svg">';
	if ((window.matchMedia("(min-width: 768px)")).matches) {
		review.style.backgroundImage= 'url(../assets/images/reviews-rectangle-dark.svg)';
	} else {
		review.style.backgroundImage= '';
	}
}

themeBtn.addEventListener("click",function(){
	document.documentElement.classList.toggle("dark-theme");
	if (document.documentElement.classList.contains("dark-theme")) {
		localStorage.setItem("theme","dark-theme");
		this.innerHTML=  '<img src="./assets/images/sun.svg">';
		if ((window.matchMedia("(min-width: 768px)")).matches) {
			review.style.backgroundImage= 'url(../assets/images/reviews-rectangle-dark.svg)';
			console.log("Hi");
		} else {
			review.style.backgroundImage= '';
		}
	} else {
		localStorage.setItem("theme","light-theme")
		this.innerHTML=  '<img src="./assets/images/moon.svg">';
		if ((window.matchMedia("(min-width: 768px)")).matches) {
			review.style.backgroundImage= 'url(../assets/images/reviews-rectangle.svg)';
		} else {
			review.style.backgroundImage= '';
		}
	}
})

// swiper Bundle
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
