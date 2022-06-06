/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

const GameContext = React.createContext({

	user: {
		name: "",
		balance: 5,
		walletAddress: ""
	},

	registerUser: (name: string, walletAddress: string) => {},
	updateBalance: (balue: number) => {},
	clearUser: () => {}
});

export default GameContext;
