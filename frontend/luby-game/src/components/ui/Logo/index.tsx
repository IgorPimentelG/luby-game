import LogoLuby from "@assets/images/luby-logo.png";
import { Container, Image, Title } from "./styles";

const Logo = () => {
	return(
		<Container>
			<Image
				src={LogoLuby}
				alt="Logo da Luby Game"
			/>
			<Title>LUBY GAME</Title>
		</Container>
	);
};

export default Logo;
