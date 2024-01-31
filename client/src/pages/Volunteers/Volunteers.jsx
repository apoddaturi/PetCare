import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VolunteerList } from "../../component/index";
import { getUsers } from "../../features/users/userSlice";
const Volunteers = () => {
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.user);
	const initFetch = useCallback(() => {
		dispatch(getUsers("Volunteer"));
	}, [dispatch]);
	useEffect(() => {
		initFetch();
	}, [initFetch]);
	return (
		<>
			<VolunteerList users={users} />
		</>
	);
};

export default Volunteers;
