import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deletePost, getPosts } from "../../features/post/postSlice";
import dayjs from "dayjs";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Post = ({ image, eachPost }) => {
	const user = JSON.parse(localStorage.getItem("user"));
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { posts, isSuccess, isError, message } = useSelector(
		(state) => state.post
	);

	const handleDelete = () => {
		dispatch(deletePost(eachPost.id));
		if (isSuccess || posts) {
			dispatch(getPosts());
		}
	};
	return (
		<>
			<div className="card">
				<div className="card-profile">
					<img className="card-image" src={image} alt="profile" />
					<div className="card-details">
						<p className="card-detail-date">
							{dayjs(eachPost?.date).format("lll")}
						</p>
						<p className="card-detail-service-name">
							<Link to={`/posts/${eachPost?.id}`} className="card-button">
								{eachPost?.service.toString()}
							</Link>
						</p>
						{user?.user?.id === eachPost?.postedBy && (
							<button className="delete-btn" onClick={handleDelete}>
								Delete
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Post;
