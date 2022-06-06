import { Container, Label } from "./styles";

const Button: React.FC<{
	label: string
	handler?: () => void;
}> = ({ label, handler }) => {

	return(
		<Container onClick={handler}>
			<Label>{label}</Label>
		</Container>
	);
};


export default Button;
