import React from "react";

import { Card } from "../index";
const VolunteerList = ({ users }) => {
	let localUser = JSON.parse(localStorage.getItem("user"));
	return (
		<>
			{localUser?.userType === "Volunteer" ? (
				<div className="card-grid">
					{users &&
						users?.data
							?.filter((eachUser) => eachUser.id !== localUser.id)
							?.map((eachUser) => {
								return (
									<Card
										image="https://www.fetchpetcare.com/wp-content/uploads/2014/07/bigstock-152145332.jpg"
										eachUser={eachUser}
									/>
								);
							})}
				</div>
			) : (
				<div className="card-grid">
					{users &&
						users?.data?.map((eachUser) => {
							return (
								<Card
									image="https://www.fetchpetcare.com/wp-content/uploads/2014/07/bigstock-152145332.jpg"
									eachUser={eachUser}
								/>
							);
						})}
				</div>
			)}
		</>
	);
};

export default VolunteerList;
