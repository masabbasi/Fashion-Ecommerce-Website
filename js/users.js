let users = [];
if (localStorage.getItem("users") != null) {
	users = JSON.parse(localStorage.getItem("users"));
} else {
	users = [
		{
			id: 1,
			profile: {
				firstName: "admin",
				lastName: "admini",
				email: "admin@gmail.com",
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
