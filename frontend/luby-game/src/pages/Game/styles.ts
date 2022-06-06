import styled from "styled-components";

const BaseText = styled.p`
	color: ${({theme}) => theme.colors.text.secondary};
`;

export const RootContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 80vh;
	padding: 130px 30px 30px 0;

	@media(max-width: 870px) {
		padding: 250px 0 80px 0;
	}

	@media(max-width: 400px) {
		padding: 300px 0 50px 0;
	}
`;

export const Counter = styled(BaseText)`
	font-weight: bold;
	font-size: 1.3rem;
	padding: 10px;
	border-radius: 10px;
	background-color: #639003;
`;

export const LabelStatement = styled(BaseText)`
	margin: 25px;
	font-weight: bold;
	font-size: 1.2rem;
	width: 60%;
	text-align: center;
	text-transform: uppercase;

	@media(max-width: 870px) {
		width: 90%;
	}
`;

export const RadioButton = styled.input<any>`
	cursor: pointer;
	width: 15px;
  	height: 15px;
	accent-color: ${({theme}) => theme.colors.text.primary};
`;

export const LabelAnswer = styled.label`
	color: ${({theme}) => theme.colors.text.primary};
	font-size: 0.9rem;
	margin-left: 10px;
	margin-top: 10px;
	text-align: center;
	font-weight: bold;
`;

export const Title = styled(BaseText)`
	font-size: 1.6rem;
	font-weight: bold;
	margin: -20px 0 20px 0;
	text-transform: uppercase;
`;

export const Option = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px;
	padding: 25px 20px 15px 20px;
	border-radius: 10px;

	${({theme}) => `
		background-color: ${theme.colors.text.secondary};
	`};
`;

export const ContainerOptions = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 400px);
	margin-bottom: 20px;

	@media(max-width: 870px) {
		grid-template-columns: repeat(1, 400px);
	}

	@media(max-width: 500px) {
		grid-template-columns: repeat(1, 300px);
	}
`;

export const ContainerButton = styled.div`
	display: flex;
	width: 20%;

	@media(max-width: 870px) {
		width: 200px;
	}
`;

export const Space = styled.span`
	margin: 10px;
`;

export const ContainerAnimation = styled.div`
	position: absolute;
	z-index: 999;
`;

export const Label = styled.p`
	text-transform: uppercase;
	margin: 2px;
	font-weight: 700;
	color: ${({theme}) => theme.colors.text.primary};
`;
