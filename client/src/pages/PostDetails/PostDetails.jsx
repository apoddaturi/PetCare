import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getPost, sendMail } from "../../features/post/postSlice";
const PostDetails = () => {
	const { id } = useParams();
	const user = JSON.parse(localStorage.getItem("user"));
	const dispatch = useDispatch();
	const { post } = useSelector((state) => state.post);
	useEffect(() => {
		dispatch(getPost(id));
	}, [dispatch, id]);

	const handleEmail = () => {
		toast.success("Mail sent successfully");
		const emailData = {
			postedByEmail: post?.data?.postedBy?.emailAddress,
			postedByName:
				post?.data?.postedBy?.firstName + " " + post?.data?.postedBy?.lastName,
			name: user?.user?.firstName + " " + user?.user?.lastName,
			service: post?.data?.service.toString(),
			date: dayjs(post?.data?.date).format("lll"),
			phone: user?.user?.phone,
			email: user?.user?.emailAddress,
		};
		dispatch(sendMail(emailData));
	};
	console.log(user?.user?.userType)
	if (user?.user?.userType !== "PetParent"){
		return (
			<>
				<div className="post">
					<div className="post-profile">
						<img
							className="post-image"
							src="https://images.pexels.com/photos/7516295/pexels-photo-7516295.jpeg"
							alt="profile"
						/>
						<div className="post-details">
							<div>
								<span>Posted By:</span>
								<p>
									{post?.data?.postedBy?.firstName +
										" " +
										post?.data?.postedBy?.lastName}
								</p>
								<span>Service Requested:</span>
								<p>{post?.data?.service?.toString()}</p>
							</div>
							<div>
								<span>Date:</span>
								<p>{dayjs(post?.data?.date).format("lll")}</p>

								<span>Dog Name:</span>
								<p>{post?.data?.postedBy?.dogName}</p>
							</div>
							<div>
								<span>Dog Breed:</span>
								<p>{post?.data?.postedBy?.dogBreed}</p>
								{ 
									<button className="email-button" onClick={handleEmail}>
										Send Email
									</button>
								
								}
							</div>
						</div>
					</div>
					{/* <button className="user-button">Edit</button> */}
				</div>
			</>
		);
	}else{
		return (
			<>
				<div className="post">
					<div className="post-profile">
						<img
							className="post-image"
							src="https://images.pexels.com/photos/7516295/pexels-photo-7516295.jpeg"
							alt="profile"
						/>
						<div className="post-details">
							<div>
								<span>Posted By:</span>
								<p>
									{post?.data?.postedBy?.firstName +
										" " +
										post?.data?.postedBy?.lastName}
								</p>
								<span>Service Requested:</span>
								<p>{post?.data?.service?.toString()}</p>
							</div>
							<div>
								<span>Date:</span>
								<p>{dayjs(post?.data?.date).format("lll")}</p>

								<span>Dog Name:</span>
								<p>{post?.data?.postedBy?.dogName}</p>
							</div>
							<div>
								<span>Dog Breed:</span>
								<p>{post?.data?.postedBy?.dogBreed}</p>
								
							</div>
						</div>
					</div>
					{/* <button className="user-button">Edit</button> */}
				</div>
			</>
		);

	}
};

export default PostDetails;
