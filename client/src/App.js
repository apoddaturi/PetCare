import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader, Header } from "./component/index";
import {
	Login,
	Register,
	PetParents,
	PetParent,
	Volunteers,
	Posts,
	Volunteer,
	PostDetails,
	EventPageComponent,
} from "./pages/index";

function App() {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => setLoading(false), 3000);
	}, []);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<Header />
					<Routes>
						<Route exact path="/" element={<Login />} />
						<Route exact path="/register" element={<Register />} />
						<Route exact path="/pet-parents" element={<PetParents />} />
						<Route path="/pet-parents/:id" element={<PetParent />} />
						<Route path="/volunteers" element={<Volunteers />} />
						<Route path="/volunteers/:id" element={<Volunteer />} />
						<Route path="/posts" element={<Posts />} />
						<Route path="/posts/:id" element={<PostDetails />} />
						<Route exact path="/events" element={<EventPageComponent />} />
					</Routes>
					<ToastContainer />
				</>
			)}
		</>
	);
}

export default App;
