import { useContext } from "react";
import Web3 from "web3/dist/web3.min";
import GameContext from "@context/game-context";
import ContractABI from "@assets/data/abi.json";
import { AbiItem } from "web3-utils";
import { CONTRACT_ADDRESS } from "@constants";

const contract = () => {

	const user = useContext(GameContext).user;

	const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
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
		instance.methods.startGame(value).send({
			from: user.walletAddress
		});

		return new Promise((resolve, reject) => {
			instance.events.StartGame()
				.on("data", () => {
					resolve();
				}).on(() => {
					reject("Aconteceu um erro ao iniciar o game");
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

	function withDraw() {
		instance.methods.withDraw().send({
			from: user.walletAddress
		});
	}

	function claimBalance(bonus: number) {
		instance.methods.claimBalance(bonus).send({
			from: user.walletAddress
		});
	}

	function getBalanceIndividual() {
		instance.methods.getBalanceIndividual().send({
			from: user.walletAddress
		});
	}

	return{
		mintLBC,
		startGame,
		correctAnswer,
		incorrectAnswer,
		withDraw,
		claimBalance,
		getBalanceIndividual
	};
};

export { contract };
