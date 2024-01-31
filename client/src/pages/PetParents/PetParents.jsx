import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PetParentList } from "../../component/index";
import { getUsers } from "../../features/users/userSlice";
const PetParents = () => {
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.user);
	const initFetch = useCallback(() => {
		dispatch(getUsers("PetParent"));
	}, [dispatch]);
	useEffect(() => {
		initFetch();
	}, [initFetch]);
	return (
		<>
			<PetParentList users={users} />
		</>
	);
};

export default PetParents;
