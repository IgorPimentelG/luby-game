/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

const GameContext = React.createContext({

	user: {
		name: "",
		balance: 0,
		walletAddress: ""
	},

	updateName: (name: string) => {},
	updateWalletAddress: (walletAddress: string) => {},
	updateBalance: (balue: number) => {},
	clearUser: () => {}
});

export default GameContext;
