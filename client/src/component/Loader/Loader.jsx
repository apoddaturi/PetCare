import React from "react";
import dogLoader from "../../assets/images/dogLoader.gif";

const Loader = () => {
	return (
		<div className="loader">
			<img src={dogLoader} alt="loader" />
		</div>
	);
};

export default Loader;
