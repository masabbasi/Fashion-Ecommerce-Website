export let users = [
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
      favorite: [11, 22, 33],
      basket: [11, 44],
    },
  },
]

if (localStorage.getItem("users") != null) {
	users = JSON.parse(localStorage.getItem("users"));
}