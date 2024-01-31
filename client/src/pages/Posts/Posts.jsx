import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost, Loader } from "../../component/index";
import { Post } from "../../component/index";
import { getPosts, create } from "../../features/post/postSlice";
import dayjs from "dayjs";
import { toast } from "react-toastify";
const Posts = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useDispatch();
	const { posts, post, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.post
	);
	const [date, setDate] = useState(dayjs(new Date()));
	const [formData, setFormData] = useState({
		service: [],
		createdBy: "",
	});
	const { service, createdBy } = formData;
	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (post && isSuccess) {
			dispatch(getPosts());
		}
	}, [post, isError, message, dispatch, isSuccess]);

	const fetchPosts = useCallback(() => {
		dispatch(getPosts());
	}, [dispatch]);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	const handleDateChange = (value) => {
		setDate(value);
	};
	const handleRadioChange = (e) => {
		const { checked, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			service: checked && [value],
			createdBy: user.user.id,
		}));
	};
	const handleSubmit = () => {
		const postData = {
			service,
			date,
			createdBy,
		};
		dispatch(create(postData));
		handleModal();
	};
	if (isLoading) {
		return <Loader />;
	}
	const handleModal = () => {
		setIsModalOpen(!isModalOpen);
	};
	return (
		<>
			{user?.user?.userType === "PetParent" && (
				<>
					<div className="btn-container">
						<button className="create-post-btn" onClick={handleModal}>
							Create a Post
						</button>
					</div>
					<CreatePost
						user={user}
						date={date}
						handleDateChange={handleDateChange}
						isModalOpen={isModalOpen}
						handleRadioChange={handleRadioChange}
						handleModal={handleModal}
						handleSubmit={handleSubmit}
					/>
				</>
			)}
			<div className="card-grid">
				{posts &&
					posts?.data?.map((post) => {
						return (
							<Post
								image="https://images.pexels.com/photos/7516295/pexels-photo-7516295.jpeg"
								eachPost={post}
							/>
						);
					})}
			</div>
		</>
	);
};

export default Posts;
