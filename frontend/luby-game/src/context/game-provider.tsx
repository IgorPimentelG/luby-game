/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ReactNode, useState } from "react";
import GameContext from "./game-context";
import { INITIAL_LBC } from "@constants";

const initialState = {
	name: "",
	balance: INITIAL_LBC,
	walletAddress: ""
};

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

	const [userData, setUserData] = useState(initialState);

	function updateName(name: string) {
		setUserData((currentState) => {
			return {
				...currentState,
				name,
			};
		});
	}

	function updateWalletAddress(walletAddress: string) {
		setUserData((currentState) => {
			return {
				...currentState,
				walletAddress,
			};
		});
	}

	function updateBalance(value: number) {
		setUserData((currentState) => {
			return {
				...currentState,
				balance: value
			};
		});
	}

	function clearUser() {
		setUserData(initialState);
	}

	const initialContext = {
		user: {
			...userData
		},
		updateName,
		updateWalletAddress,
		updateBalance,
		clearUser
	};

	return(
		<GameContext.Provider value={initialContext}>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
