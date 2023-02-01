import { users } from "./users.js";
import { products } from "./products.js";
import { showProduct } from "./showProduct.js";
import { showTrendingProduct } from "./showTrendingProduct.js";

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
    if (localStorage.getItem("theme") === "dark-theme") {
      if (reviews != null) {
        reviews.style.backgroundImage = "none";
      }
    } else {
      reviews.forEach(function (item) {
        if (reviews != null) {
          item.style.backgroundImage =
            "url(../assets/images/reviews-rectangle.svg)";
        }
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

let sortedProducts = products;
sortedProducts.sort((p1, p2) =>
  p1.sale < p2.sale ? 1 : p1.sale > p2.sale ? -1 : 0
);

showProduct(products);
showTrendingProduct(sortedProducts);

const productBags = $.querySelectorAll(".productBag").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.add("productBasketNotification");
    setTimeout(() => item.classList.remove("productBasketNotification"), 500);
    addToCart(+item.dataset.id);
  });
});

const productFavorite = $.querySelectorAll(".productFavorite").forEach((item) => {
    item.addEventListener("click", (e) =>{
			item.classList.add("productFavoriteNotification");
    setTimeout(() => item.classList.remove("productFavoriteNotification"), 500);
      addToFavorite(+e.currentTarget.dataset.id)
		});
  }
);

export const addToCart = (productId) => {
  const findProduct = products.find((item) => item.id === productId);
  const product = findProduct;

  // const product = products[productIndex];

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

export const addToFavorite = (productId) => {
  const findProduct = products.find((item) => item.id === productId);
  const product = findProduct;
	if ((favorite.find((item) => item.id === productId))!=null) {
		const findFavoriteProduct = favorite.find((item) => item.id === productId);
		const productFavorite = findFavoriteProduct;
    
			const indexProduct = favorite.indexOf(product);
			favorite.splice(indexProduct, 1);
		
	} else {
		favorite.push(product)
	}

  localStorage.setItem("favorite", JSON.stringify(favorite));
  setFavoriteBallet();
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

export function setFavoriteBallet() {
  if (localStorage.getItem("favorite") != null) {
    favorite = JSON.parse(localStorage.getItem("favorite"));
  }
  const menuIconFavorite = document.querySelectorAll(".menuIconImage")[2];
  if (favorite.length != 0) {
    menuIconFavorite.classList.add("menuIconFavorite");
    document.documentElement.style.setProperty(
      `--Favorite`,
      `"${favorite.length}"`
    );
  } else {
    menuIconFavorite.classList.remove("menuIconFavorite");
  }
}

setBasketBallet();
setFavoriteBallet();
