const postService = require("../services/post.service");

// controller function for create post
exports.createPost = (req, res) => {
	return postService.createPost(req, res);
};

// controller function for get all posts
exports.getAllPosts = (req, res) => {
	return postService.getAllPosts(req, res);
};

// controller function for get post
exports.getPost = (req, res) => {
	return postService.getPost(req, res);
};

// controller function for update a post
exports.updatePost = (req, res) => {
	return postService.updatePost(req, res);
};

// controller function for delete post
exports.deletePost = (req, res) => {
	return postService.deletePost(req, res);
};

// controller function for trigger email
exports.getMail = (req, res) => {
	return postService.getMail(req, res);
};
