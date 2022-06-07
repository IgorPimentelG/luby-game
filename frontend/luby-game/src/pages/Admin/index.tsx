import { useState } from "react";
import { useForm } from "react-hook-form";
import { Header, Modal } from "@components/layout";
import { contract } from "@shared/services/contract";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Loading } from "@components/ui";
import { Form, Title, LabelError } from "../Home/styles";
import { FormTransfer, FormDeposit } from "@shared/types/form";
import { Container, ContainerForm, RootContainer } from "./styles";
import { bankDepositSchema, bankTransferSchema } from "@shared/schemas";

const AdminPage = () => {

	const { withdraw, deposit } = contract();

	const {
		register: registerTransfer,
		handleSubmit: handleTransfer,
		setValue: setValueFormTransfer,
		formState: { errors: errorsTransfer }
	} = useForm<FormTransfer>({ resolver: yupResolver(bankTransferSchema) });

	const {
		register: registerDeposit,
		handleSubmit: handleDeposit,
		setValue: setValueFormDeposit,
		formState: { errors: errorsDeposit }
	} = useForm<FormDeposit>({ resolver: yupResolver(bankDepositSchema) });

	const [isLoading, setIsLoading] = useState(false);
	const [configModal, setConfigModal] = useState({ message: "" });

	function transferHandler(data: FormTransfer) {
		setIsLoading(true);

		withdraw(data.address)
			.then((balance) => {
				setConfigModal({
					message: `Transferência de ${balance} LBC realizada com sucesso!`
				});
				setIsLoading(false);
			})
			.catch(() => {
				setConfigModal({ message: "Não foi possível realizar a transferência!" });
				setIsLoading(false);
			});

		setValueFormTransfer("address", "");
	}

	function depositHandler(data: FormDeposit) {
		setIsLoading(true);

		const { owner, amount } = data;

		deposit(owner, amount)
			.then(() => {
				setConfigModal({ message: "Deposito realizado com sucesso!" });
				setIsLoading(false);
			})
			.catch(() => {
				setConfigModal({ message: "Não foi possível realizar o deposito!" });
				setIsLoading(false);
			});

		setValueFormDeposit("owner", "");
		setValueFormDeposit("amount", 0);
	}

	function confirmModalHandler() {
		setConfigModal({ message: "" });
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

			<Title>Bank Luby Game</Title>

			<Container>
				<ContainerForm>
					<Title>Transferir</Title>

					<Form onSubmit={handleTransfer(transferHandler)}>
						<Input
							config={{
								name: "address",
								label: "Confirmação da carteira",
								register: registerTransfer
							}}
						/>
						{ errorsTransfer.address && (
							<LabelError>{errorsTransfer.address.message}</LabelError>
						)}

						<Button	label="transferir" />
					</Form>
				</ContainerForm>

				<ContainerForm>
					<Title>Depositar</Title>

					<Form onSubmit={handleDeposit(depositHandler)}>
						<Input
							config={{
								name: "owner",
								label: "Confirmação do proprietário",
								register: registerDeposit
							}}
						/>
						{ errorsDeposit.owner && (
							<LabelError>{errorsDeposit.owner.message}</LabelError>
						)}

						<Input
							config={{
								name: "amount",
								label: "Valor",
								register: registerDeposit,
								attributes: { type: "number" }
							}}
						/>
						{ errorsDeposit.amount && (
							<LabelError>{errorsDeposit.amount.message}</LabelError>
						)}

						<Button	label="Depositar" />
					</Form>
				</ContainerForm>
			</Container>

		</RootContainer>
	);
};

export default AdminPage;
