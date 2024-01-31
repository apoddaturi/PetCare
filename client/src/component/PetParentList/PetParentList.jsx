import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUsers } from "../../features/users/userSlice";
import { Card } from "../index";
const CardList = () => {
	let localUser = JSON.parse(localStorage.getItem("user"));
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.user);
	console.log(users);

	const initFetch = useCallback(() => {
		dispatch(getUsers(localUser.userType));
	}, [dispatch, localUser.userType]);
	useEffect(() => {
		initFetch();
	}, [initFetch]);
	console.log(users);
	return (
		<>
			<div className="card-grid">
				{users
					? users?.data
					?.filter((eachUser) => eachUser.id !== localUser.id)
					?.map((eachUser) => {
							return (
								<Card
									image="https://media.istockphoto.com/id/1224927400/photo/happy-woman-embracing-beagle-dog-in-park.jpg?s=612x612&w=0&k=20&c=U4YFNK_Vqanj4IL-K-s4eGD4_LKqMIyx2Im4Ojcar4c="
									dogName={eachUser.dogName}
									owner={eachUser.firstName}
									email={eachUser.emailAddress}
									eachUser={eachUser}
								/>
							);
					  })
					: ""}
				<Outlet />
			</div>
		</>
	);
};

export default CardList;
