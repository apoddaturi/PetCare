module.exports = (app) => {
	const post = require("../controllers/post.controller");

	var router = require("express").Router();

	// api to create posts
	router.post("/create", post.createPost);

	// api to fetch all posts
	router.get("/", post.getAllPosts);

	// api for get post by id
	router.get("/:id", post.getPost);

	// api for update post
	router.put("/update/:id", post.updatePost);

	// api for delete post
	router.delete("/delete/:id", post.deletePost);

	// api for trigger email
	router.post("/getMail", post.getMail);

	// base path for posts
	app.use("/api/post", router);
};
