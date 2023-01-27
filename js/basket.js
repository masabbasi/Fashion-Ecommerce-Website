console.log("basket.js");
import {basket} from "./app.js";
import {products} from './products.js';
const $ = document;
const hamburgerMenu = $.querySelector(".hamburgerMenu");
const menu = $.querySelector(".menu");
const menuNav = $.querySelector(".menu nav");
const themeBtn = $.querySelector(".themeBtn");

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
  }
});

//Dark Mode
let x = window.matchMedia("(min-width: 768px)");
if (localStorage.getItem("theme") === "dark-theme") {
  document.documentElement.classList.add("dark-theme");
  themeBtn.innerHTML = '<img src="./assets/images/sun.svg">';
}
themeBtn.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark-theme");
  if (document.documentElement.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark-theme");
    this.innerHTML = '<img src="./assets/images/sun.svg">';
    }
   else {
    localStorage.setItem("theme", "light-theme");
    this.innerHTML = '<img src="./assets/images/moon.svg">';
    }
		
  }
);

let basketFull = [];
// let basket = [1,2];

function showBasket() {
  basketFull = products.filter((item) => basket.includes(item.id));
  const basketContainer = $.querySelector(".basketTable tbody");
	if (basketFull.length === 0) {basketContainer.innerHTML = "Not Found";}
  for (let product of basketFull) {
		const {images, title, price} = product;
    const createProduct = `<tr>
		<td class="removeProduct">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M14 16.91C13.81 16.91 13.62 16.84 13.47 16.69L9.50998 12.73C9.21998 12.44 9.21998 11.96 9.50998 11.67C9.79998 11.38 10.28 11.38 10.57 11.67L14.53 15.63C14.82 15.92 14.82 16.4 14.53 16.69C14.38 16.83 14.19 16.91 14 16.91Z"
					fill="#292D32" />
				<path
					d="M9.99994 16.9501C9.80994 16.9501 9.61994 16.8801 9.46994 16.7301C9.17994 16.4401 9.17994 15.9601 9.46994 15.6701L13.4299 11.7101C13.7199 11.4201 14.1999 11.4201 14.4899 11.7101C14.7799 12.0001 14.7799 12.4801 14.4899 12.7701L10.5299 16.7301C10.3799 16.8801 10.1899 16.9501 9.99994 16.9501Z"
					fill="#292D32" />
				<path
					d="M14 6.75H10C9.04 6.75 7.25 6.75 7.25 4C7.25 1.25 9.04 1.25 10 1.25H14C14.96 1.25 16.75 1.25 16.75 4C16.75 4.96 16.75 6.75 14 6.75ZM10 2.75C9.01 2.75 8.75 2.75 8.75 4C8.75 5.25 9.01 5.25 10 5.25H14C15.25 5.25 15.25 4.99 15.25 4C15.25 2.75 14.99 2.75 14 2.75H10Z"
					fill="#292D32" />
				<path
					d="M15 22.7501H9C3.38 22.7501 2.25 20.1701 2.25 16.0001V10.0001C2.25 5.44005 3.9 3.49005 7.96 3.28005C8.38 3.26005 8.73 3.57005 8.75 3.99005C8.77 4.41005 8.45 4.75005 8.04 4.77005C5.2 4.93005 3.75 5.78005 3.75 10.0001V16.0001C3.75 19.7001 4.48 21.2501 9 21.2501H15C19.52 21.2501 20.25 19.7001 20.25 16.0001V10.0001C20.25 5.78005 18.8 4.93005 15.96 4.77005C15.55 4.75005 15.23 4.39005 15.25 3.98005C15.27 3.57005 15.63 3.25005 16.04 3.27005C20.1 3.49005 21.75 5.44005 21.75 9.99005V15.9901C21.75 20.1701 20.62 22.7501 15 22.7501Z"
					fill="#292D32" />
			</svg>
	
		</td>
		<td>
			<img src=./assets/images/${images[0]}>
		</td>
		<td>${title}</td>
		<td>1</td>
		<td>${price.main}</td>
	</tr>
		`;
		basketContainer.innerHTML += createProduct;
  }
};

showBasket();