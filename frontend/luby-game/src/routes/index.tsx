import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, GamePage, NotFoundPage } from "@pages";

const Router = () => {
	return(
		<Routes>
			<Route path="/" element={<Navigate to="/home"/>} />
			<Route path="/home" element={<HomePage/>}/>
			<Route path="/game" element={<GamePage/>}/>
			<Route path="/404" element={<NotFoundPage/>}/>
			<Route path="/*" element={<Navigate to="/404"/>}/>
		</Routes>
	);
};

export default Router;
