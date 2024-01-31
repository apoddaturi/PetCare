import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../features/users/userSlice";

const Volunteer = () => {
	const { id } = useParams();
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUser(id));
	}, [dispatch, id]);

	return (
		<>
			<div className="volunteer">
				<div className="volunteer-profile">
					<img
						className="volunteer-image"
						src="https://www.fetchpetcare.com/wp-content/uploads/2014/07/bigstock-152145332.jpg"
						alt="profile"
					/>
					<div className="volunteer-detail">
						<p className="volunteer-detail-owner-name">
							{user?.data?.firstName + " " + user?.data?.lastName}
						</p>
						<p className="volunteer-detail-owner-email">
							{user?.data?.emailAddress}
							
						</p>
						<p className="volunteer-detail-owner-email">{user?.data?.phone}</p>
						<ul className="volunteer-detail-services">
							{user?.data?.services.map((service) => (
								<li>{service}</li>
							))}
						</ul>
					</div>
				</div>
				{/* <button className="volunteer-button">Edit</button> */}
			</div>
		</>
	);
};

export default Volunteer;
