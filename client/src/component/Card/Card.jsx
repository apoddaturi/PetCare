import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Card = ({ image, eachUser }) => {

	let star = ()=>{
		let t = Math.floor(Math.random() * 10)+1;
		
		return ([...Array(10)].map((e, i) => <FaStar
			color={
				i+1>t
				? "000"
				: "rgb(255,223,0)"
			}
		/>))
	}

	return (
		<>
			<Link
				to={
					eachUser?.userType === "PetParent"
						? `/pet-parents/${eachUser.id}`
						: `/volunteers/${eachUser.id}`
				}
				className="card-button"
			>
				<div className="card">
					<div className="card-profile">
						<img className="card-image" src={image} alt="profile" />
						<div className="card-details">
							<p className="card-detail-owner-name">
								{eachUser?.firstName + " " + eachUser?.lastName}
							</p>
							{eachUser?.userType === "PetParent" ? (
								<>
									<p className="card-detail-name">{eachUser?.dogName}</p>
								</>
							) : (
								<ul className="card-detail-services">
									{eachUser?.services.map((service) => (
										<li>{service}</li>
									))}
								</ul>
							)}
						</div>
						{eachUser?.userType === "PetParent"?"":star()}
						
					</div>
				</div>
			</Link>
		</>
	);
};

export default Card;