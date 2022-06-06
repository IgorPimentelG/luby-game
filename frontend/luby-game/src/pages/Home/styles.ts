import styled from "styled-components";

export const RootContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;
	align-items: center;
	padding: 30px;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 300px;

	@media(max-width: 350px) {
		width: 100%;
	}
`;

export const LabelError = styled.p`
	font-weight: bold;
	text-align: center;
	padding: 15px;
	border-radius: 10px;
	margin-bottom: 20px;
	color: #fff;
	background-color: #F35123;
`;

export const Title = styled.h1`
	margin-bottom: 30px;
	text-transform: uppercase;
	color: ${({theme}) => theme.colors.text.secondary};
`;

export const ContainerButton = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

