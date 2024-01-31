import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../features/users/userSlice";

const PetParent = () => {
	const { id } = useParams();

	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUser(id));
	}, [dispatch, id]);
	
	return (
		<>
			<div className="user">
				<div className="user-profile">
					<img
						className="user-image"
						src="https://media.istockphoto.com/id/1224927400/photo/happy-woman-embracing-beagle-dog-in-park.jpg?s=612x612&w=0&k=20&c=U4YFNK_Vqanj4IL-K-s4eGD4_LKqMIyx2Im4Ojcar4c="
						alt="profile"
					/>
					<div className="user-detail">
						<p className="user-detail-dog-name">
							{user?.data?.dogName} the {user?.data?.dogBreed}
						</p>
						<p className="user-detail-owner-name">
							{user?.data?.firstName + " " + user?.data?.lastName}
						</p>
						<p className="user-detail-owner-email">
							{user?.data?.emailAddress}
						</p>
						<p className="user-detail-owner-email">{user?.data?.phone}</p>
					</div>
				</div>
				{/* <button className="user-button">Edit</button> */}
			</div>
		</>
	);
};

export default PetParent;
