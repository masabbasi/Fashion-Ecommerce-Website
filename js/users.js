let users = [];
if (localStorage.getItem("users") != null) {
	users = JSON.parse(localStorage.getItem("users"));
} else {
	users = [
		{
			id: 1,
			login: false,
			profile: {
				firstName: "admin",
				lastName: "admini",
				email: "admin@gmail.com",
				mobilePhone: "09359626811",
			},
			password: "1234",
			shop: {
				favorite: [],
				basket: [],
			},
		},
	]
}

localStorage.setItem("users", JSON.stringify(users));
