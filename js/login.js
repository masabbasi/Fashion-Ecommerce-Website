const $ = document;

let users = [];
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}

let userLogin = false;
if (localStorage.getItem("userLogin") != null) {
  userLogin = JSON.parse(localStorage.getItem("userLogin"));
}

if (userLogin) {
	window.location.replace("./dashboard.html");
}

let userOnline = [];
if (localStorage.getItem("userOnline") != null) {
  userOnline = JSON.parse(localStorage.getItem("userOnline"));
}

let basket = [];
if (localStorage.getItem("basket") != null) {
  basket = JSON.parse(localStorage.getItem("basket"));
}

let favorite = [];
if (localStorage.getItem("favorite") != null) {
  favorite = JSON.parse(localStorage.getItem("favorite"));
}

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
		userOnline = findUser;
    userLogin = true;
		localStorage.setItem("userOnline", JSON.stringify(userOnline));
		localStorage.setItem("basket", JSON.stringify(findUser.shop.basket));
		localStorage.setItem("favorite", JSON.stringify(findUser.shop.favorite));
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
    window.location.replace("./dashboard.html");
  } else {
    const signInMsg = $.querySelector(".signInMsg");
		signInMsg.style.color = "rgb(194, 47, 47)";
		signInMsg.innerHTML ="Email or Password is wrong";
  }
});

signUpBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const signUpMsg = $.querySelector(".signUpMsg");
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
        signUpMsg.style.color = "rgb(47, 216, 75)";
        signUpMsg.innerHTML = "Registration was successful; Please Login.";
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
        signUpMsg.style.color = "rgb(194, 47, 47)";
        signUpMsg.innerHTML = "This Email has already been registered.";
      }
    } else {
      signUpMsg.style.color = "rgb(194, 47, 47)";
      signUpMsg.innerHTML = "Enter a valid email.";
    }
  } else {
    signUpMsg.style.color = "rgb(194, 47, 47)";
    signUpMsg.innerHTML = "Please fill in all items.";
  }
});
