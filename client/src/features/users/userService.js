import axios from "axios";

const API_URL = "/api/user/";

const getUsers = async (userType) => {
	const response = await axios.get(API_URL + `users/${userType}`);

	console.log(response.data);
	return response.data;
};

const getUser = async (id) => {
	const response = await axios.get(API_URL + id);
	console.log(response.data);
	return response.data;
};

const userService = {
	getUsers,
	getUser,
};

export default userService;
