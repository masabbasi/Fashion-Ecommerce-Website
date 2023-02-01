import { products } from "./products.js";
import { setFavoriteBallet, addToCart } from "./app.js";

const $ = document;
const hamburgerMenu = $.querySelector(".hamburgerMenu");
const menu = $.querySelector(".menu");
const menuNav = $.querySelector(".menu nav");
const themeBtn = $.querySelector(".themeBtn");

let favorite = [];
if (localStorage.getItem("favorite") != null) {
  favorite = JSON.parse(localStorage.getItem("favorite"));
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
  }
});

//Dark Mode
if (localStorage.getItem("theme") === "dark-theme") {
  document.documentElement.classList.add("dark-theme");
  themeBtn.innerHTML = '<img src="./assets/images/sun.svg">';
}
themeBtn.addEventListener("click", function () {
  console.log("1");
  document.documentElement.classList.toggle("dark-theme");
  if (document.documentElement.classList.contains("dark-theme")) {
    console.log("2");
    localStorage.setItem("theme", "dark-theme");
    this.innerHTML = '<img src="./assets/images/sun.svg">';
  } else {
    console.log("3");
    localStorage.setItem("theme", "light-theme");
    this.innerHTML = '<img src="./assets/images/moon.svg">';
  }
});
console.log(favorite);
const renderCartItems = () => {
  if (localStorage.getItem("favorite") != null) {
    favorite = JSON.parse(localStorage.getItem("favorite"));
  }
  const cartDiv = document.querySelector(".favoriteTable tbody");
  if (cartDiv != null) {
    cartDiv.innerHTML = "";
  }

  if (favorite.length === 0) {
    if (cartDiv != null) {
      cartDiv.innerHTML = "You do not have a favorite product!";
    }
  } else {
    favorite.forEach((item) => {
      cartDiv.innerHTML += `<tr>
			<td class="deleteProduct" data-id="${item.id}">
			<svg fill="#000000" width="24px" height="24px" viewBox="-1.7 0 20.4 20.4" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><path d="M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zm-6.804.01 3.032-3.033a.792.792 0 0 0-1.12-1.12L8.494 9.173 5.46 6.14a.792.792 0 0 0-1.12 1.12l3.034 3.033-3.033 3.033a.792.792 0 0 0 1.12 1.119l3.032-3.033 3.033 3.033a.792.792 0 0 0 1.12-1.12z"/></svg>
			</td>
			<td>
				<img src=./assets/images/${item.images[0]}>
			</td>
			<td>${item.title}</td>
			<td>$${item.price.off}</td>
		</tr>
			`;
    });
  }

  const deleteProducts = $.querySelectorAll(".deleteProduct").forEach(
    (item) => {
      item.addEventListener("click", () => removeFormCart(+item.dataset.id));
    }
  );
  setFavoriteBallet();
};

renderCartItems();

const removeFormCart = (productId) => {
  let newCartItems = favorite.reduce((state, item) => {
    if (item.id === productId) {
      return state;
    }
    return [...state, item];
  }, []);
  favorite = newCartItems;
  localStorage.setItem("favorite", JSON.stringify(favorite));
  renderCartItems();
};

const clearFavorite = $.querySelector(".clearFavorite").addEventListener(
  "click",
  () => {
    favorite = [];
    localStorage.setItem("favorite", JSON.stringify(favorite));
    renderCartItems();
    setFavoriteBallet();
  }
);
