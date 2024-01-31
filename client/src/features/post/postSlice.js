import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
	posts: [],
	post: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};
export const create = createAsyncThunk(
	"posts/create",
	async (postData, thunkAPI) => {
		try {
			return await postService.createPost(postData);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getPosts = createAsyncThunk(
	"posts/getPosts",
	async (userType, thunkAPI) => {
		try {
			return await postService.getPosts();
		} catch (error) {
			// const message =
			// 	(error.response &&
			// 		error.response.data &&
			// 		error.response.data.message) ||
			// 	error.message ||
			// 	error.toString();
			// return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getPost = createAsyncThunk(
	"posts/getById",
	async (id, thunkAPI) => {
		try {
			return await postService.getPost(id);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const deletePost = createAsyncThunk(
	"posts/delete",
	async (id, thunkAPI) => {
		try {
			return await postService.deletePost(id);
		} catch (error) {
			// const message =
			// 	(error.response &&
			// 		error.response.data &&
			// 		error.response.data.message) ||
			// 	error.message ||
			// 	error.toString();
			return thunkAPI.rejectWithValue("Success");
		}
	}
);

export const sendMail = createAsyncThunk(
	"post/sendMail",
	async (emailData, thunkAPI) => {
		try {
			return await postService.sendMail(emailData);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(create.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(create.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.post = action.payload;
			})
			.addCase(create.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.post = null;
			})
			.addCase(getPosts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.posts = action.payload;
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.posts = null;
			})
			.addCase(getPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.post = action.payload;
			})
			.addCase(getPost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.post = null;
			})
			.addCase(deletePost.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.isLoading = false;
				const {
					arg: { id },
				} = action.meta;
				if (id) {
					state.posts = state.posts.filter((item) => item._id !== id);
				}
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.isLoading = false;
				state.message = action.payload;
				state.isError = true;
			})
			.addCase(sendMail.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			});
	},
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
