import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import { Loader } from "../../component/index";
const Login = () => {
	const [formData, setFormData] = useState({
		emailAddress: "",
		password: "",
	});

	const { emailAddress, password } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error("Email or password incorrect. Please try again.");
		}

		if (isSuccess || user) {
			if (user?.user?.userType === "PetParent") {
				navigate("/pet-parents", { state: user?.user?.userType });
			}
			if (user?.user?.userType === "Volunteer") {
				navigate("/volunteers", { state: user?.user?.userType });
			}
		}
		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			emailAddress,
			password,
		};
		dispatch(login(userData));
	};
	if (isLoading) {
		return <Loader />;
	}
	return (
		<div className="form-wrapper">
			<h1>Sign In</h1>
			<form onSubmit={onSubmit}>
				<div className="form-item">
					<label htmlFor="emailAddress"></label>
					<input
						type="emailAddress"
						name="emailAddress"
						value={emailAddress}
						required="required"
						placeholder="Email Address"
						onChange={onChange}
					/>
				</div>
				<div className="form-item">
					<label htmlFor="password"></label>
					<input
						type="password"
						name="password"
						required="required"
						value={password}
						placeholder="Password"
						onChange={onChange}
					/>
				</div>
				<div className="button-panel">
					<button type="submit" className="button">
						Sign In
					</button>
				</div>
			</form>
			<div className="form-footer">
				<p>
					Don't have an account&nbsp;-&nbsp;
					<Link to="/register" style={{ textDecoration: "none" }}>
						<span>Register</span>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
