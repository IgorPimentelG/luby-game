import { useContext } from "react";
import Web3 from "web3/dist/web3.min";
import GameContext from "@context/game-context";
import ContractABI from "@assets/data/abi.json";
import { AbiItem } from "web3-utils";
import { CONTRACT_ADDRESS, INITIAL_LBC } from "@constants";

const contract = () => {

	const user = useContext(GameContext).user;

	const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:7545"));
	const instance = new web3.eth.Contract(ContractABI as AbiItem[], CONTRACT_ADDRESS);

	function mintLBC(value: number): Promise<void> {
		return new Promise((resolve, reject) => {
			instance.methods.mintLbc(value).send({
				from: user.walletAddress
			}).on("receipt", () => {
				resolve();
			}).on("error", () => {
				reject("Aconteceu um erro ao obter LubyCoin");
			});
		});
	}

	function startGame(value: number): Promise<void> {
		instance.methods.approve(INITIAL_LBC).send({
			from: user.walletAddress
		}).on("receipt", () => {
			instance.methods.startGame(value).send({
				from: user.walletAddress
			});
		});

		return new Promise((resolve, reject) => {
			instance.events.StartGame()
				.on("data", () => {
					resolve();
				}).on("error", (error) => {
					reject(error);
				});
		});
	}

	function correctAnswer(value: number): Promise<void> {
		return new Promise((resolve, reject) => {
			instance.methods.correctAnswer(value).send({
				from: user.walletAddress
			}).on("receipt", () => {
				resolve();
			}).on("error", () => {
				reject("Aconteceu um erro ao registrar a resposta");
			});
		});
	}

	function incorrectAnswer(value: number): Promise<void> {
		return new Promise((resolve, reject) => {
			instance.methods.incorrectAnswer(value).send({
				from: user.walletAddress
			}).on("receipt", () => {
				resolve();
			}).on("error", () => {
				reject("Aconteceu um erro ao registrar a resposta");
			});
		});
	}

	function withdraw(ownerAddress: string): Promise<number> {
		return new Promise((resolve, reject) => {
			instance.methods.withdraw().send({
				from: ownerAddress
			}).on("error", () => {
				reject("Aconteceu um erro ao tentar transferir o saldo");
			});

			instance.events.WithDraw()
				.on("data", (event: any) => {
					const balance = event.returnValues.amount;
					resolve(balance);
				});
		});
	}

	function claimBalance(bonus: number): Promise<void> {
		return new Promise((resolve, reject) => {
			instance.methods.claimBalance(bonus).send({
				from: user.walletAddress
			}).on("error", () => {
				reject("Houve um erro ao tentar sacar o seu saldo");
			});

			instance.events.ClaimBalance()
				.on("data", () => {
					resolve();
				});
		});
	}

	function getBalanceIndividual() {
		return instance.methods.getBalanceIndividual().call({
			from: user.walletAddress
		});
	}

	return{
		mintLBC,
		startGame,
		correctAnswer,
		incorrectAnswer,
		withdraw,
		claimBalance,
		getBalanceIndividual
	};
};

export { contract };
