import { Container, Label, Logo, Image, Nav, LabelLink } from "./styles";
import ImageLogo from "@assets/images/luby-logo.png";
import { Link, useLocation } from "react-router-dom";
import Balance from "../Balance";

const Header = () => {

	const location = useLocation();
	const { pathname } = location;

	return(
		<Container>
			<Logo>
				<Image
					src={ImageLogo}
				/>
				<Label>Luby Game</Label>
			</Logo>

			<Nav>
				{ pathname !== "/game" ?
					pathname === "/admin" ? (
						<Link to="/home">
							<LabelLink>HOME</LabelLink>
						</Link>
					) : (
						<Link to="/admin">
							<LabelLink>ADMIN</LabelLink>
						</Link>
					)
					: (
						<Balance/>
					)}
			</Nav>
		</Container>
	);
};

export default Header;
