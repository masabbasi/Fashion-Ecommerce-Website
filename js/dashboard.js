// import { userLogin } from "./login.js";
const logOut = document.querySelector (".logOut");
let basket = [];
let favorite = [];
let userLogin;
logOut.addEventListener("click",function(){
	userLogin = false;
	localStorage.setItem("userLogin", JSON.stringify(userLogin))
	localStorage.setItem("basket", JSON.stringify(basket));
	localStorage.setItem("favorite", JSON.stringify(favorite));
	window.location.replace("./index.html");
})