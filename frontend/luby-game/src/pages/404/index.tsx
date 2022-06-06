/* eslint-disable @typescript-eslint/no-empty-function */
import { Logo } from "@components/ui";
import { useTheme } from "styled-components";
import { GiReturnArrow } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { RootContainer, Button, Label } from "./styles";

const NotFoundPage = () => {

	const theme = useTheme();
	const navigate = useNavigate();

	function goBackHandler() {
		navigate("/");
	}

	return(
		<RootContainer>
			<Logo/>
			<Label>Página não encontrada</Label>
			<Button onClick={goBackHandler}>
				<GiReturnArrow
					size={50}
					color={theme.colors.background.secondary}
				/>
			</Button>
		</RootContainer>
	);
};

export default NotFoundPage;
