const userService = require("../services/user.service");

// register
exports.registerUser = (req, res) => {
	// Validate request
	if (!req.body.emailAddress) {
		res.status(422).send({ message: "Email can not be empty!" });
		return;
	}

	return userService.register(req, res);
};

// login
exports.loginUser = (req, res) => {
	return userService.login(req, res);
};

// update user
exports.updateUser = (req, res) => {
	return userService.updateUser(req, res);
};

// get user
exports.getUser = (req, res) => {
	return userService.getUser(req, res);
};

// get all users
exports.getUsers = (req, res) => {
	return userService.getUsers(req, res);
};
