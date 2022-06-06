import GameContext from "@context/game-context";
import { useContext } from "react";
import { FaCoins } from "react-icons/fa";
import { useTheme } from "styled-components";
import { Container, Label } from "./styles";


const Balance: React.FC<{ value?: number }> = ({ value }) => {

	const theme = useTheme();
	const ctxGame = useContext(GameContext);

	return(
		<Container>
			<FaCoins color={theme.colors.background.secondary}/>
			<Label>LBC {value ? value : ctxGame.user.balance}</Label>
		</Container>
	);
};

export default Balance;
