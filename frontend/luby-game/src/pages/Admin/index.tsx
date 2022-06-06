import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Loading } from "@components/ui";
import { useNavigate } from "react-router-dom";
import { FormAdmin } from "@shared/types/form";
import { Header, Modal } from "@components/layout";
import { contract } from "@shared/services/contract";
import { RootContainer, Form, Title } from "../Home/styles";

const AdminPage = () => {

	const navigate = useNavigate();
	const { withdraw } = contract();
	const { register, handleSubmit } = useForm<FormAdmin>();

	const [isLoading, setIsLoading] = useState(false);
	const [configModal, setConfigModal] = useState({ message: "", hasError: false });

	function transferHandler(data: FormAdmin) {
		setIsLoading(true);
		withdraw(data.address)
			.then((balance) => {
				setConfigModal({
					message: `Transferência de ${balance} LBC realizada com sucesso!`,
					hasError: false
				});
				setIsLoading(false);
			})
			.catch((error) => {
				setConfigModal({ message: error, hasError: true });
				setIsLoading(false);
			});
	}

	function confirmModalHandler() {
		if( configModal.hasError ) {
			setConfigModal({ message: "", hasError: false });
		} else {
			navigate("/home");
		}
	}

	return(
		<RootContainer>
			<Header/>

			<Loading isEnable={isLoading} />

			<Modal
				config={{
					isOpen: !!configModal.message,
					label: configModal.message,
					onConfirm: confirmModalHandler
				}}
			/>

			<Title>Transferir Saldo <br/>da LUBY GAME</Title>

			<Form onSubmit={handleSubmit(transferHandler)}>
				<Input
					config={{
						name: "address",
						label: "Confirmação da carteira",
						register
					}}
				/>

				<Button	label="transferir" />
			</Form>
		</RootContainer>
	);
};

export default AdminPage;
