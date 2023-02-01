import { users } from "./users.js";
import { products } from "./products.js";
import { showProduct } from "./showProduct.js";

const $ = document;
const hamburgerMenu = $.querySelector(".hamburgerMenu");
const menu = $.querySelector(".menu");
const menuNav = $.querySelector(".menu nav");
const themeBtn = $.querySelector(".themeBtn");
const reviews = $.querySelectorAll(".review");

let basket = [];
if (localStorage.getItem("basket") != null) {
  basket = JSON.parse(localStorage.getItem("basket"));
}

//Mobile Menu
hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("hamburgerMenuOpen");
  menuNav.classList.toggle("navInMobile");
  menu.classList.toggle("menuMobileActive");
});
window.addEventListener("resize", function () {
  if (this.innerWidth > 768) {
    hamburgerMenu.classList.remove("hamburgerMenuOpen");
    menuNav.classList.remove("navInMobile");
    menu.classList.remove("menuMobileActive");
    if (localStorage.getItem("theme") === "dark-theme") {
      if (reviews != null) {
        reviews.style.backgroundImage = "none";
      }
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

showProduct(products);

const productBags = $.querySelectorAll(".productBag").forEach((item) => {
  item.addEventListener("click", () => addToCart(+item.dataset.index));
});

const addToCart = (productIndex) => {
  const product = products[productIndex];

  let existingProduct = false;

  let newCartItems = basket.reduce((state, item) => {
    if (item.id === product.id) {
      existingProduct = true;

      const newItem = {
        ...item,
        qty: item.qty + 1,
        total: (item.qty + 1) * item.price.off,
      };

      return [...state, newItem];
    }

    return [...state, item];
  }, []);

  if (!existingProduct) {
    newCartItems.push({
      ...product,
      qty: 1,
      total: product.price.off,
    });
  }

  basket = newCartItems;

  localStorage.setItem("basket", JSON.stringify(basket));
  setBasketBallet();
};

export function setBasketBallet() {
  if (localStorage.getItem("basket") != null) {
    basket = JSON.parse(localStorage.getItem("basket"));
  }
  const menuIconBasket = document.querySelectorAll(".menuIconImage")[1];
  if (basket.length != 0) {
    menuIconBasket.classList.add("menuIconBasket");
    document.documentElement.style.setProperty(
      `--Basket`,
      `"${basket.length}"`
    );
  } else {
    menuIconBasket.classList.remove("menuIconBasket");
  }
}

setBasketBallet();

console.log("EndApp");
