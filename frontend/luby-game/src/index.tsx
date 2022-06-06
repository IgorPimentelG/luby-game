import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GameProvider from "@context/game-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
	<React.Fragment>
		<BrowserRouter>
			<GameProvider>
				<App />
			</GameProvider>
		</BrowserRouter>
	</React.Fragment>
);
