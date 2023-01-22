const $ = document;
const hamburgerMenu = $.querySelector(".hamburgerMenu");
const menuNav = $.querySelector(".menu nav");

hamburgerMenu.addEventListener("click",()=>{
	hamburgerMenu.classList.toggle("hamburgerMenuOpen");
	menuNav.classList.toggle("navInMobile");
});