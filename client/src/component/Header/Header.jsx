import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setLogout } from "../../features/auth/authSlice";
const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("user"));
	const [active, setActive] = useState(
		user?.user?.userType === "Pet Parent" ? "Pet Parents" : "Volunteers"
	);

	const handleLogout = (e) => {
		dispatch(setLogout());
		navigate("/");
	};

	return (
		<>
			{user?.accessToken ? (
				<nav>
					<div className="navbar-heading-auth">
						<h1>Tails Up</h1>
					</div>
					<div>
						<ul className="navbar-menu">
							<li onClick={() => setActive("Pet Parents")}>
								<NavLink
									to={"/pet-parents"}
									activeClassName="active"
									className={
										user?.user?.userType === "Volunteer"
											? "header-li-hide"
											: "header-li"
									}
								>
									Pet Parents
								</NavLink>
							</li>
							<li onClick={() => setActive("Volunteers")}>
								<NavLink
									to="/volunteers"
									activeClassName="active"
									className={"header-li"}
								>
									Volunteers
								</NavLink>
							</li>
							<li onClick={() => setActive("Events")}>
								<NavLink
									to="/events"
									activeClassName="active"
									className={"header-li"}
								>
									Events
								</NavLink>
							</li>
							<li onClick={() => setActive("Posts")}>
								<NavLink
									to="/posts"
									activeClassName="active"
									className={"header-li"}
								>
									Posts
								</NavLink>
							</li>

							<li>
								<button className="logout-btn" onClick={() => handleLogout()}>
									Logout
								</button>
							</li>
						</ul>
					</div>
				</nav>
			) : (
				<div className="navbar-heading">
					<h1>Tails Up</h1>
				</div>
			)}
		</>
	);
};

export default Header;