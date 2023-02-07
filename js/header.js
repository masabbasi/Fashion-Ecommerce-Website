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
		<input type="search" id="searchInput" placeholder="Search">
		<img src="./assets/images/Search.svg">
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

function setBasketBallet() {
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

function setFavoriteBallet() {
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