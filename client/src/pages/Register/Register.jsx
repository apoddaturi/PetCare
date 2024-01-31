import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from "../../features/auth/authSlice";
import { Loader } from "../../component/index";

const Register = () => {
	const [breedList,setBreedList]=useState({});
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		emailAddress: "",
		password: "",
		userType: "",
		dogName: "",
		dogBreed: "",
		services: [],
	});
	const {
		firstName,
		lastName,
		phone,
		emailAddress,
		password,
		userType,
		dogName,
		dogBreed,
		services,
	} = formData;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);
	useEffect(() => {
		if (isError) {
			toast.error("Email is already in use. Please try again.");
		}

		if (isSuccess || user) {
			navigate("/");
		}
		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	useEffect(()=>{
		getDogList();
	},[])
	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleCheckboxChange = (e) => {
		const { checked, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			services: checked
				? [...services, value]
				: services.filter((e) => e !== value),
		}));
	};

	const getDogList = async () => {
		const response = await fetch('https://dog.ceo/api/breeds/list/all');
		const data = await response.json();
		console.log(data);
		setBreedList(data.message);
	}
	function createDogList(breedList) {
		// console.log(${Object.keys(breedList)});
		let breeds=
			document.getElementById('breed').innerHTML = `
           
    `
	}
	const onSubmit = (e) => {
		e.preventDefault();
		const userData = {
			firstName,
			lastName,
			phone,
			emailAddress,
			password,
			userType,
			dogName,
			dogBreed,
			services,
		};
		dispatch(register(userData));
	};
	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="form-wrapper">
			<h1>Sign Up</h1>
			<form onSubmit={onSubmit}>
				<div className="form-item">
					<label htmlFor="firstName"></label>
					<input
						type="text"
						name="firstName"
						value={firstName}
						required="required"
						placeholder="First Name"
						onChange={onChange}
					/>
				</div>
				<div className="form-item">
					<label htmlFor="lastName"></label>
					<input
						type="text"
						name="lastName"
						value={lastName}
						required="required"
						placeholder="Last Name"
						onChange={onChange}
					/>
				</div>
				<div className="form-item">
					<label htmlFor="phone"></label>
					<input
						type="phone"
						name="phone"
						value={phone}
						pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
						placeholder="012-345-6789"
						onChange={onChange}
						required
					/>
				</div>
				<div className="form-item">
					<label htmlFor="emailAddress"></label>
					<input
						type="email"
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
						value={password}
						required="required"
						placeholder="Password"
						onChange={onChange}
					/>
				</div>
				<div className="form-item-type">
					<p>User Type</p>
					<div className="form-item-radio">
						<input
							type="radio"
							name="userType"
							value="PetParent"
							onChange={onChange}
							required
						/>
						<label htmlFor="userType">Pet Parent</label>
						<br />
					</div>
					<div className="form-item-radio">
						<input
							type="radio"
							name="userType"
							value="Volunteer"
							onChange={onChange}
							required
						/>
						<label htmlFor="userType">Volunteer</label>
						<br />
					</div>
				</div>
				{userType === "PetParent" ? (
					<>
						<div className="form-item">
							<label htmlFor="dogName"></label>
							<input
								type="text"
								name="dogName"
								value={dogName}
								required="required"
								placeholder="Dog Name"
								onChange={onChange}
							/>
						</div>
						<div className="form-item">

							<select className="Breed-options" name="dogBreed" onChange={onChange}>
								<option>Select a Dog Breed</option>
								{Object.keys(breedList).map((dogBreed,index) =>
									<option name="dogBreed" key={index}
											value={dogBreed}>{dogBreed}</option>
								)}
							</select>

							{/*<input*/}
							{/*	type="text"*/}
							{/*	name="dogBreed"*/}
							{/*	value={dogBreed}*/}
							{/*	required="required"*/}
							{/*	placeholder="Dog Breed"*/}
							{/*	onChange={onChange}*/}
							{/*/>*/}
						</div>
					</>
				) : (
					""
				)}
				{userType === "Volunteer" ? (
					<div className="form-item-checkbox">
						<input
							type="checkbox"
							name="services"
							value="Dog Walker"
							onChange={handleCheckboxChange}
						/>
						<label htmlFor="services">&nbsp;Dog Walker</label>
						<br />
						<input
							type="checkbox"
							name="services"
							value="Dog Sitter"
							onChange={handleCheckboxChange}
						/>
						<label htmlFor="services">&nbsp;Dog Sitter</label>
						<br />
						<input
							type="checkbox"
							name="services"
							value="Dog Boarding"
							onChange={handleCheckboxChange}
						/>
						<label htmlFor="services">&nbsp;Dog Boarding</label>
						<br />
					</div>
				) : (
					""
				)}
				<div className="button-panel">
					<button type="submit" className="button">
						Sign Up
					</button>
				</div>
			</form>
			<div className="form-footer">
				<p>
					Already have an account&nbsp;-&nbsp;
					<Link to="/" style={{ textDecoration: "none" }}>
						<span>Login</span>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
