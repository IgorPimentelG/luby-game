import ReactDOM from "react-dom";
import { ConfigModal } from "@shared/types/modal";
import { RootContainer, Container, ContainerOptions, Label, Button, LabelButton } from "./styles";
import { useTheme } from "styled-components";

const Modal: React.FC<{ config: ConfigModal }> = ({ config }) => {

	const { isOpen, label, onConfirm, onCancel } = config;
	const theme = useTheme();

	function component() {
		return(
			<RootContainer isOpen={isOpen}>
				<Container>
					<Label>{label}</Label>
					<ContainerOptions>
						{ onCancel && (
							<Button onClick={onCancel} background={theme.colors.background.quaternary}>
								<LabelButton>cancelar</LabelButton>
							</Button>
						)}

						<Button onClick={onConfirm} background="#7FB902">
							<LabelButton>confirmar</LabelButton>
						</Button>
					</ContainerOptions>
				</Container>
			</RootContainer>
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return ReactDOM.createPortal( component(), document.getElementById("portal-modal") as HTMLElement );
};

export default Modal;
