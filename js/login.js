import { users } from "./users.js";
import { setBasketBallet, setFavoriteBallet } from "./app.js";

const $ = document;
const hamburgerMenu = $.querySelector(".hamburgerMenu");
const menu = $.querySelector(".menu");
const menuNav = $.querySelector(".menu nav");
const themeBtn = $.querySelector(".themeBtn");
export let userLogin = false;

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

if (signUpLink != null) {
  signUpLink.addEventListener("click", function () {
    contents[0].style.display = "none";
    tabs[0].classList.remove("activeTab");
    contents[1].style.display = "flex";
    tabs[1].classList.add("activeTab");
  });
}

if (signInLink != null) {
  signInLink.addEventListener("click", function () {
    contents[1].style.display = "none";
    tabs[1].classList.remove("activeTab");
    contents[0].style.display = "flex";
    tabs[0].classList.add("activeTab");
  });
}

const passwords = $.querySelectorAll("#password");
const showpasswords = $.querySelectorAll("#showpassword");

if (showpasswords != null) {
  showpasswords[0].addEventListener("click", function () {
    if (passwords[0].type === "password") {
      passwords[0].type = "text";
    } else {
      passwords[0].type = "password";
    }
  });
}

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
    console.log("Log In Success"); //redirect to homepage
    findUser.login = true;
    userLogin = true;
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
    localStorage.setItem("users", JSON.stringify(users));
    const userId = users.find((item) => {
      item.id === findUser.id;
    });
    console.log(userId.id);
    console.log(findUser.id);
    window.location.replace("./dashboard.html");
  } else {
    const signInMsg = ($.querySelector(".signInMsg").innerHTML =
      "Email or Password is wrong");
  }
});

signUpBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const signInMsg = $.querySelector(".signUpMsg");
  const emailRegEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  if (
    firstName.value.trim() != "" &&
    lastName.value.trim() != "" &&
    email[1].value.trim() != "" &&
    passwords[1].value.trim() != ""
  ) {
    if (emailRegEx.test(email[1].value)) {
			console.log("HI");
      const findUser = users.find((item) => {
        return item.profile.email === emails[1].value;
      });
      if (findUser === undefined) {
        signInMsg.style.color = "rgb(47, 216, 75)";
        signInMsg.innerHTML = "Registration was successful; Please Login.";
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
      } else {
        signInMsg.style.color = "rgb(194, 47, 47)";
        signInMsg.innerHTML = "This Email has already been registered.";
      }
    } else {
      signInMsg.style.color = "rgb(194, 47, 47)";
      signInMsg.innerHTML = "Enter a valid email.";
    }
  } else {
    signInMsg.style.color = "rgb(194, 47, 47)";
    signInMsg.innerHTML = "Please fill in all items.";
  }
});
