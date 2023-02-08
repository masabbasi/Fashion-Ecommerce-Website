const logOut = document.querySelector(".logOut");
let users = [];
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}

let userOnline = [];
if (localStorage.getItem("userOnline") != null) {
  userOnline = JSON.parse(localStorage.getItem("userOnline"));
}

logOut.addEventListener("click", function () {
  let newUsers = users.find((item) =>item.id === userOnline.id);
	console.log(newUsers);
			newUsers.shop.basket = JSON.parse(localStorage.getItem("basket")),
		newUsers.shop.favorite = JSON.parse(localStorage.getItem("favorite"))
	console.log(newUsers);
	let userss = users.map((item)=>{if (item.id === newUsers.id) {
		return newUsers
	} else {
		return item
	}

	})
  localStorage.setItem("users", JSON.stringify(userss));
  let userLogin = false;
  let basket = [];
  let favorite = [];
  userOnline = [];
  localStorage.setItem("userLogin", JSON.stringify(userLogin));
  localStorage.setItem("basket", JSON.stringify(basket));
  localStorage.setItem("favorite", JSON.stringify(favorite));
  localStorage.setItem("userOnline", JSON.stringify(userOnline));
  window.location.replace("./index.html");
});