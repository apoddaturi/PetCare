const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Post = db.posts;
const config = require("../config/auth.config.js");
const nodemailer = require("nodemailer");

// Service function to create post
exports.createPost = async (req, res) => {
	try {
		let newPost = await Post.create({
			service: req.body.service,
			date: req.body.date,
			postedBy: req.body.createdBy,
		});
		return res
			.status(200)
			.json({ message: "Post created successfully", post: newPost });
	} catch (err) {
		console.log(err);
	}
};

// Service function to get all posts
exports.getAllPosts = async (req, res) => {
	try {
		Post.find().then((data) => {
			if (!data) {
				res.status(404).send({
					message: `No posts found`,
				});
			} else
				res.send({
					data: data,
				});
		});
	} catch (err) {
		res.status(500).send({
			message: "Error fetching Posts",
		});
	}
};

// Service function for get single post by id
exports.getPost = async (req, res) => {
	try {
		const id = req.params.id;

		Post.findById({ _id: id })
			.populate({ path: "postedBy" })
			.then((data) => {
				if (!data) {
					res.status(404).send({
						message: `Cannot find post with id=${id}.`,
					});
				} else
					res.send({
						data: data,
					});
			})
			.catch((err) => {
				res.status(500).send({
					message: "Error fetching Post with id=" + id,
				});
			});
	} catch (err) {
		console.log(err);
	}
};

// update post
exports.updatePost = async (req, res) => {
	try {
		const id = req.params.id;

		Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
			.then((data) => {
				if (!data) {
					res.status(404).send({
						message: `Cannot update Post with id=${id}.`,
					});
				} else
					res.send({
						message: "Post was updated successfully.",
						data,
					});
			})
			.catch((err) => {
				res.status(500).send({
					message: "Error updating Post with id=" + id,
				});
			});
	} catch (err) {
		console.log(err);
	}
};

// delete post
exports.deletePost = async (req, res) => {
	try {
		const id = req.params.id;
		Post.findByIdAndRemove(id, { useFindAndModify: false })
			.then((data) => {
				if (!data) {
					res.status(404).send({
						message: `Cannot delete Post with id=${id}.`,
					});
				} else {
					res.send({
						message: "Post was deleted successfully!",
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: "Could not delete Post with id=" + id,
				});
			});
	} catch (err) {
		console.log(err);
	}
};

// send email to post creator
exports.getMail = async (req, res) => {
	try {
		let transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "priyankakhimyani01@gmail.com",
				pass: "dxgmbdcsdmilhqnz",
				secure: true,
			},
		});
		let mailOptions = {
			from: "priyankakhimyani01@gmail.com",
			to: req.body.postedByEmail,
			subject: "Service Request",
			html: `<p> Hello <b>${req.body.postedByName}</b>,</p>
			<br>
			<p>One of our Volunteers, <b>${req.body.name}</b>, is interested in providing ${req.body.service} service on ${req.body.date}. Feel free to contact on 
			<b>${req.body.phone}</b> or <b>${req.body.email}</b>.</p>
			<br>
			<p>Regards, <b>TailsUp.</b></p>
			`,
		};
		transport.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			}
			res.status(200).send("Mail send successfully");
		});
	} catch (err) { }
};
