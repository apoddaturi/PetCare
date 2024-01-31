const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = db.users;
const config = require("../config/auth.config.js");

// Create and register new user
exports.register = async (req, res) => {
	try {
		const { emailAddress } = req.body;
		let getUser = await User.findOne({ emailAddress: emailAddress });
		console.log(getUser);
		if (getUser) {
			return res.status(409).send("User already registered, please login.");
		} else {
			let newUser = await User.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				emailAddress: req.body.emailAddress,
				password: req.body.password,
				phone: req.body.phone,
				userType: req.body.userType,
				dogName: req.body.dogName,
				dogBreed: req.body.dogBreed,
				services: req.body.services,
			});
			const token = jwt.sign(
				{
					id: newUser._id,
					email: newUser.emailAddress,
					fname: newUser.firstName,
					lname: newUser.lastName,
					phone: newUser.phone,
				},
				config.secret,
				{
					expiresIn: "2h",
				}
			);
			return res.status(200).json({
				message: "User registered successfully",
				user: newUser,
				token: token,
			});
		}
	} catch (err) {
		console.log(err);
	}
};

// Login
exports.login = async (req, res) => {
	try {
		let getUser = await User.findOne({ emailAddress: req.body.emailAddress });
		if (!(req.body.emailAddress && req.body.password)) {
			res.status(400).send("All input is required");
		}

		if (
			getUser &&
			(await bcrypt.compare(req.body.password, getUser.password))
		) {
			// Create token
			const token = jwt.sign(
				{
					id: getUser._id,
					email: getUser.emailAddress,
					fname: getUser.firstName,
					lname: getUser.lastName,
					phone: getUser.phone,
				},
				config.secret,
				{
					expiresIn: "2h",
				}
			);
			// save user token
			res.status(200).send({
				message: "Login successful",
				user: getUser,
				accessToken: token,
			});
		} else {
			res.status(400).send("Invalid Credentials");
		}
	} catch (err) {
		console.log(err);
	}
};

// Update
exports.updateUser = async (req, res) => {
	try {
		const id = req.params.id;

		userData = {
			// need to update this if update user implemented
		};

		User.findByIdAndUpdate(id, userData, { useFindAndModify: false })
			.then((data) => {
				if (!data) {
					res.status(404).send({
						message: `Cannot update User with id=${id}.`,
					});
				} else
					res.send({
						message: "User was updated successfully.",
						data,
					});
			})
			.catch((err) => {
				res.status(500).send({
					message: "Error updating User with id=" + id,
				});
			});
	} catch (err) {
		console.log(err);
	}
};

// Get user by id
exports.getUser = async (req, res) => {
	try {
		const id = req.params.id;

		User.findById({ _id: id })
			.then((data) => {
				if (!data) {
					res.status(404).send({
						message: `Cannot find user with id=${id}.`,
					});
				} else
					res.send({
						data: data,
					});
			})
			.catch((err) => {
				res.status(500).send({
					message: "Error fetching user with id=" + id,
				});
			});
	} catch (err) {
		console.log(err);
	}
};

// Get user by type
exports.getUsers = async (req, res) => {
	try {
		const userType = req.params.userType;

		User.find({ userType })
			.then((data) => {
				if (!data) {
					res.status(404).send({
						message: `Cannot find users of type=${userType}.`,
					});
				} else
					res.send({
						data: data,
					});
			})
			.catch((err) => {
				res.status(500).send({
					message: "Error fetching users of type=${userType}.",
				});
			});
	} catch (err) {
		console.log(err);
	}
};
