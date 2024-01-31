import axios from "axios";

const API_URL = "/api/post/";

const createPost = async (postData) => {
	const response = await axios.post(API_URL + "create", postData);
	console.log(response.data);
	return response.data;
};

const getPosts = async () => {
	const response = await axios.get(API_URL);
	console.log(response.data);
	return response.data;
};

const getPost = async (id) => {
	const response = await axios.get(API_URL + id);
	console.log(response.data);
	return response.data;
};

const deletePost = async (id) => {
	const response = await axios.delete(API_URL + "delete/" + id);
	console.log(response.data);
	return response.data;
};
const sendMail = async (emailData) => {
	const response = await axios.post(API_URL + "/getMail", emailData);
	console.log(response.data);
	return response.data;
};

const userService = {
	getPosts,
	getPost,
	createPost,
	deletePost,
	sendMail,
};

export default userService;
