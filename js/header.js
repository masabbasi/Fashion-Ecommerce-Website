import { products } from "./products.js";
const allMenu = `			<div class="container menuContainer">
<div class="logo">
	<a href="./index.html"><span>Fashion</span><span>Era</span></a>
</div>
<nav>
	<ul>
		<a href="#">
			<li>Men</li>
		</a>
		<a href="#">
			<li>Women</li>
		</a>
		<a href="#">
			<li>Kids</li>
		</a>
		<a href="#">
			<li>Winter</li>
		</a>
		<a href="#">
			<li>Lifestyle</li>
		</a>
	</ul>
	<div class="search">
		<input type="search" id="searchInput" placeholder="Search...">
		<img src="./assets/images/Search.svg">
		<div class="search-result"></div>
	</div>
</nav>
<div class="menuIcon">
	<div class="menuIconImage themeBtn"><img src="./assets/images/moon.svg"></div>
	<a href="./basket.html"><div class="menuIconImage"><img src="./assets/images/Buy.svg"></div></a>
	<a href="./favorite.html">
		<div class="menuIconImage"><img src="./assets/images/Heart.svg"></div>
	</a>
	<a class="logInLink">
		<div class="menuIconImage"><img src="./assets/images/User.svg"><span class="welcomeText">Sign In/Up</span></div>
	</a>
	<div class="hamburgerMenu">
		<div class="hamburgerMenuLine"></div>
	</div>
</div>
</div>`;

const $ = document;
const menu = $.querySelector(".menu");
menu.innerHTML=allMenu;
let basket = [];
let favorite = [];
let userLogin = false;
if (localStorage.getItem("userLogin") != null) {
  userLogin = JSON.parse(localStorage.getItem("userLogin"));
}

const logInLink = $.querySelector(".logInLink");
if (userLogin) {
	logInLink.setAttribute("href","./dashboard.html")
} else {
	logInLink.setAttribute("href","./login.html")
}

const hamburgerMenu = $.querySelector(".hamburgerMenu");
const menuNav = $.querySelector(".menu nav");
const themeBtn = $.querySelector(".themeBtn");
const reviews = $.querySelectorAll(".review");
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

let userOnline = JSON.parse(localStorage.getItem("userOnline"));
const welcomeText = $.querySelector(".welcomeText");
if (userLogin) {
	welcomeText.innerHTML = `Hi ${userOnline.profile.firstName}`;
} else {
	welcomeText.innerHTML = "Sign In/Up";
}

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

//Search
const search = document.querySelector("#searchInput");
const searchResult = document.querySelector(".search-result");

search.addEventListener("input", updateResult);

function updateResult() {
  searchResult.style.display = "block";
  let keyword = search.value;
  if (keyword.length > 0 && keyword.length < 3) {
    searchResult.innerHTML = "Enter at least 3 letters...";
  } else if (keyword.length >= 3) {
    searchResult.innerHTML = "";
		const resultItems = products.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()));
    createResult(resultItems);
  } else {
    searchResult.style.display = "none";
  }

  function createResult(data) {
    if (data.length === 0) {
      searchResult.innerHTML = "Not Found!";
    } else {
      for (let i = 0; i < data.length; i++) {
        let a = document.createElement("a");
        a.classList.add("link-result");
        a.setAttribute("href", "./products.html");
        let div1 = document.createElement("div");
        div1.classList.add("search-result-item");
        let div2 = document.createElement("div");
        div2.classList.add("search-result-img");
        let img = document.createElement("img");
        let src = `./assets/images/${data[i].images[0]}`;
        img.setAttribute("src", `${src}`);
        let div3 = document.createElement("div");
        div3.classList.add("search-result-name");
        div3.innerText = `${data[i].title}`;
        div2.appendChild(img);
        div1.appendChild(div2);
        div1.appendChild(div3);
        a.appendChild(div1);
        searchResult.appendChild(a);
      }
    }
  }
}
