import { ConfigInput } from "@shared/types/form";
import { Container, ContainerField, Field, Label } from "./styles";

const Input: React.FC<{ config: ConfigInput }> = ({ config }) => {

	const { label, name, attributes, register } = config;

	return(
		<Container>
			<Label>{label}:</Label>
			<ContainerField>
				<Field {...attributes} {...register(name)}/>
			</ContainerField>
		</Container>
	);
};

export default Input;
