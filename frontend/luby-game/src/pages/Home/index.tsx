import { useContext, useEffect, useState } from "react";
import GameContext from "@context/game-context";
import { INITIAL_LBC } from "@constants";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input, Loading } from "@components/ui";
import { registerSchema } from "@shared/schemas";
import { FormRegister } from "@shared/types/form";
import { Header, Modal } from "@components/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { contract } from "@shared/services/contract";
import { Form, LabelError, RootContainer, Title } from "./styles";

const HomePage = () => {

	const navigate = useNavigate();
	const ctxGame = useContext(GameContext);

	const { mintLBC } = contract();
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormRegister>({ resolver: yupResolver(registerSchema) });

	/**
	 * Obter endereço da MetaMask do usuário ao iniciar
	 */
	useEffect(() => {
		setIsLoading(true);

		const fetchWalletAddress = async () => {
			const walletAddress = await connecUsertWallet();

			if( walletAddress ) {
				ctxGame.updateWalletAddress(walletAddress);
			}

			setIsLoading(false);
		};

		fetchWalletAddress();
	}, []);


	async function confirmHandler(data: FormRegister) {

		if( ctxGame.user.walletAddress ) {
			const { name } = data;
			ctxGame.updateName(name);

			mintLBC(INITIAL_LBC).then(() => {
				navigate("/game");
			}).catch(() => {
				setError("Não foi possível receber a doação de LubyCoin");
			});
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

	return(
		<RootContainer>

			<Header/>

			<Modal config={{
				isOpen: !!error,
				label: error,
				onConfirm: () => setError("")
			}}/>

			<Loading isEnable={isLoading}/>

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
						label: "LubyCoin recebido",
						register,
						attributes: { value: `${ctxGame.user.balance} LBC`, readonly: true }
					}}
				/>

				<Button label="iniciar" />
			</Form>
		</RootContainer>
	);
};

export default HomePage;
