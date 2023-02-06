import { users } from "./users.js";

const $ = document;
const hamburgerMenu = $.querySelector(".hamburgerMenu");
const menu = $.querySelector(".menu");
const menuNav = $.querySelector(".menu nav");
const themeBtn = $.querySelector(".themeBtn");

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

const tabs = $.querySelectorAll(".signTab");
const contents = $.querySelectorAll(".signTabContent");
const signUpLink = $.querySelector(".signUpLink");
const signInLink = $.querySelector(".signInLink");

tabs.forEach(function (tab, tabIndex) {
  tab.addEventListener("click", function () {
    tabs[0].classList.remove("activeTab");
    tabs[1].classList.remove("activeTab");
    contents.forEach(function (content, contentIndex) {
      content.style.display = "none";
      if (tabIndex == contentIndex) {
        tab.classList.add("activeTab");
        content.style.display = "flex";
      }
    });
  });
});

signUpLink.addEventListener("click", function () {
  contents[0].style.display = "none";
  tabs[0].classList.remove("activeTab");
  contents[1].style.display = "flex";
  tabs[1].classList.add("activeTab");
});

signInLink.addEventListener("click", function () {
  contents[1].style.display = "none";
  tabs[1].classList.remove("activeTab");
  contents[0].style.display = "flex";
  tabs[0].classList.add("activeTab");
});

const passwords = $.querySelectorAll("#password");
const showpasswords = $.querySelectorAll("#showpassword");

showpasswords[0].addEventListener("click", function () {
  if (passwords[0].type === "password") {
    passwords[0].type = "text";
  } else {
    passwords[0].type = "password";
  }
});

showpasswords[1].addEventListener("click", function () {
  if (passwords[1].type === "password") {
    passwords[1].type = "text";
  } else {
    passwords[1].type = "password";
  }
});

const signInBtn = $.querySelector(".signInBtn");
const signUpBtn = $.querySelector(".signUpBtn");
const emails = $.querySelectorAll("#email");
const firstName = $.querySelector("#firstname");
const lastName = $.querySelector("#lastname");

signInBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const findUser = users.find((item) => {
    return (
      item.profile.email === emails[0].value &&
      item.password === passwords[0].value
    );
  });
  if (findUser != null) {
    console.log("Log In Success");
		// findUser[0].login = true;
  } else {
    console.log("Wrong");
  }
});

signUpBtn.addEventListener("click", function (e) {
  // e.preventDefault();
  // const findUser = users.find((item)=>{
  // 	return ((item.profile.email === emails[1].value))
  // })
  // console.log(findUser);
  // if (findUser.length === 0) {
  // 	console.log("new User");
  const newUser = {
    id: Date.now(),
    login: false,
    profile: {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email[1].value,
    },
    password: passwords[1].value,
    shop: {
      favorite: favorite,
      basket: basket,
    },
  };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  // }
});