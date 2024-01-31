module.exports = (app) => {
	const user = require("../controllers/user.controller");

	var router = require("express").Router();

	// route for register
	router.post("/register", user.registerUser);

	// route for login
	router.post("/login", user.loginUser);

	// route for get user by id
	router.get("/:id", user.getUser);

	// route for get all users by user type
	router.get("/users/:userType", user.getUsers);

	// route for update user
	router.put("/update/:id", user.updateUser);

	// base path
	app.use("/api/user", router);

};
