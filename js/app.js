import { users } from "./users.js";
import { products } from "./products.js";
import { showProduct } from "./showProduct.js";

const $ = document;
const hamburgerMenu = $.querySelector(".hamburgerMenu");
const menu = $.querySelector(".menu");
const menuNav = $.querySelector(".menu nav");
const themeBtn = $.querySelector(".themeBtn");
const reviews = $.querySelectorAll(".review");

//Mobile Menu
hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("hamburgerMenuOpen");
  menuNav.classList.toggle("navInMobile");
  menu.classList.toggle("menuMobileActive");
});
window.addEventListener("resize", function (x) {
  if (this.innerWidth > 768) {
    hamburgerMenu.classList.remove("hamburgerMenuOpen");
    menuNav.classList.remove("navInMobile");
    menu.classList.remove("menuMobileActive");
    if (localStorage.getItem("theme") === "dark-theme") {
      reviews.style.backgroundImage =
        "url(../assets/images/reviews-rectangle-dark.svg)";
    } else {
      reviews.forEach(function (item) {
        item.style.backgroundImage =
          "url(../assets/images/reviews-rectangle.svg)";
      });
    }
  } else {
    reviews.forEach(function (item) {
      item.style.backgroundImage = "";
    });
  }
});

//Dark Mode
let x = window.matchMedia("(min-width: 768px)");
if (localStorage.getItem("theme") === "dark-theme") {
  document.documentElement.classList.add("dark-theme");
  themeBtn.innerHTML = '<img src="./assets/images/sun.svg">';
  if (x.matches) {
    reviews.forEach(function (item) {
      item.style.backgroundImage =
        "url(../assets/images/reviews-rectangle-dark.svg)";
    });
  } else {
    reviews.forEach(function (item) {
      item.style.backgroundImage = "";
    });
  }
}
themeBtn.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark-theme");
  if (document.documentElement.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark-theme");
    this.innerHTML = '<img src="./assets/images/sun.svg">';
    if (x.matches) {
      reviews.forEach(function (item) {
        item.style.backgroundImage =
          "url(../assets/images/reviews-rectangle-dark.svg)";
      });
    } else {
      reviews.forEach(function (item) {
        item.style.backgroundImage = "";
      });
    }
  } else {
    localStorage.setItem("theme", "light-theme");
    this.innerHTML = '<img src="./assets/images/moon.svg">';
    if (x.matches) {
      reviews.forEach(function (item) {
        item.style.backgroundImage =
          "url(../assets/images/reviews-rectangle.svg)";
      });
    } else {
      reviews.forEach(function (item) {
        item.style.backgroundImage = "";
      });
    }
  }
});

//create product

function bestSale() {
  let bestSale = products[0];
  for (let i = 1; i < products.length; i++) {
    if (products[i].sale > bestSale.sale) {
      bestSale = products[i];
    }
  }
}

function mostSale() {
  //
}

showProduct(products);
// mostSale ();

//Add to basket & Add favorite
const menuIconBasket = document.querySelectorAll(".menuIconImage")[1];
const menuIconFavorite = document.querySelectorAll(".menuIconImage")[2];
export let basket = [1,2];
let favorite = [];
const productBasket = document.querySelectorAll(".productBag");
const productFavorite = document.querySelectorAll(".productFavorite");

productBasket.forEach((product) =>
  product.addEventListener("click", () => addTo(product, "Basket", basket))
);

productFavorite.forEach((product) =>
  product.addEventListener("click", () => addTo(product, "Favorite", favorite))
);

function addTo(product, type, array) {
  let menuIcon = `menuIcon${type}`;
  product.classList.toggle(`product${type}Active`);
	
  if (array.indexOf(+product.dataset.id) != -1) {
    array.splice(array.indexOf(+product.dataset.id), 1);
  } else {
    array.push(+product.dataset.id);
  }

  // if (array.indexOf(product.id) != -1) {
  //   array.splice(array.indexOf(product), 1);
  // } else {
  //   array.push(products.filter((item) => item.id === +product.dataset.id));
  // }

  if (array.length != 0) {
    menuIconBasket.classList.add(menuIcon);
    document.documentElement.style.setProperty(
      `--${type}`,
      `"${array.length}"`
    );
  } else {
    menuIconBasket.classList.remove(menuIcon);
  }
}

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
  breakpoints: { 300: { slidesPerView: 1 } },
});
