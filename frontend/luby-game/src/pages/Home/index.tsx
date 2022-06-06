import { useContext, useEffect, useState } from "react";
import GameContext from "@context/game-context";
import { INITIAL_LBC } from "@constants";
import { useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@components/ui";
import { registerSchema } from "@shared/schemas";
import { FormRegister } from "@shared/types/form";
import { Header, Modal } from "@components/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { contract } from "@shared/services/contract";
import { Form, LabelError, RootContainer, Title } from "./styles";

const HomePage = () => {

	const theme = useTheme();
	const navigate = useNavigate();
	const ctxGame = useContext(GameContext);
	const { mintLBC } = contract();
	const [error, setError] = useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormRegister>({ resolver: yupResolver(registerSchema) });

	/**
	 * Monitorar quando o usuário realizar o registro,
	 * para iniciar o game
	 */
	useEffect(() => {
		if( ctxGame.user.name && ctxGame.user.walletAddress ) {
			mintLBC(INITIAL_LBC).then(() => {
				navigate("/game");
			}).catch((error) => {
				setError(error);
			});
		}
	}, [ctxGame.user]);

	async function confirmHandler(data: FormRegister) {

		const walletAddress = await connecUsertWallet();

		if( walletAddress ) {
			const { name } = data;
			ctxGame.registerUser(name, walletAddress);
		}
	}

	async function connecUsertWallet() {
		if( window.ethereum ) {
			try {
				const address = await window.ethereum.request({ method: "eth_requestAccounts" });
				return address[0];
			} catch(error: any) {
				// code 4001 -> usuário não autorizou a conexão com a MetaMask
				if(error.code === 4001) {
					setError("Conecte a sua carteira da MetaMask para jogar.");
				}
			}
		} else {
			setError("Metamask não encontrado! Instale para continuar.");
		}
	}

	function confirmModalHandler() {
		setError("");
	}

	return(
		<RootContainer>

			<Header/>

			<Modal config={{
				isOpen: !!error,
				label: error,
				onConfirm: confirmModalHandler,
			}}/>

			<Title>Start Game</Title>

			<Form onSubmit={handleSubmit(confirmHandler)}>
				<Input
					config={{
						name: "name",
						label: "Informe o seu nome",
						register
					}}
				/>
				{ errors.name && (
					<LabelError>
						{errors.name.message}
					</LabelError>
				)}

				<Input
					config={{
						name: "lubyCoin",
						label: "LubyCoin",
						register,
						attributes: { value: "5 LBC", readonly: true }
					}}
				/>

				<Button
					label="iniciar"
					colors={{
						background: theme.colors.background.secondary,
						shadow: theme.colors.shadow.secondary
					}}
				/>
			</Form>
		</RootContainer>
	);
};

export default HomePage;
