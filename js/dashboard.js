const logOut = document.querySelector (".logOut");
let users = [];
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}

let userOnline = [];
if (localStorage.getItem("userOnline") != null) {
  userOnline = JSON.parse(localStorage.getItem("userOnline"));
}

logOut.addEventListener("click",function(){
	let newUsers = users.map((item)=>{
		console.log(users);
		console.log(item);
		if (item.id === userOnline.id) {
			console.log("Dakhel");
			item.shop.basket = JSON.parse(localStorage.getItem("basket"));
			item.shop.favorite = JSON.parse(localStorage.getItem("favorite"));
	}});
	console.log(newUsers);
	// localStorage.setItem("users", JSON.stringify(newUsers));
	let userLogin = false;
	let basket = [];
 	let favorite = [];
	userOnline = [];
	localStorage.setItem("userLogin", JSON.stringify(userLogin))
	localStorage.setItem("basket", JSON.stringify(basket));
	localStorage.setItem("favorite", JSON.stringify(favorite));
	localStorage.setItem("userOnline", JSON.stringify(userOnline))
	window.location.replace("./index.html");
})