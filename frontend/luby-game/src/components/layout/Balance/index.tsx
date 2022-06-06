import GameContext from "@context/game-context";
import { useContext } from "react";
import { FaCoins } from "react-icons/fa";
import { useTheme } from "styled-components";
import { Container, Label } from "./styles";


const Balance = () => {

	const theme = useTheme();
	const ctxGame = useContext(GameContext);

	return(
		<Container>
			<FaCoins color={theme.colors.background.secondary}/>
			<Label>LBC {ctxGame.user.balance.toLocaleString("pt-BR")}</Label>
		</Container>
	);
};

export default Balance;
