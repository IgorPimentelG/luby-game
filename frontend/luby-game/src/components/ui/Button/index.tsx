import { Container, Label } from "./styles";

const Button: React.FC<{
	label: string
	handler?: () => void;
	colors: {
		background: string;
		shadow: string;
	};
}> = ({ label, colors, handler }) => {

	return(
		<Container colors={colors} onClick={handler}>
			<Label>{label}</Label>
		</Container>
	);
};


export default Button;
