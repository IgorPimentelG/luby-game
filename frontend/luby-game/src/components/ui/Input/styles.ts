import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 15px 0;
	width: 100%;
`;

export const Label = styled.label`
	margin-bottom: 10px;
	letter-spacing: 2px;
	font-weight: 700;
	color: ${({theme}) => theme.colors.text.secondary};
`;

export const ContainerField = styled.div`
	display: flex;
	padding: 10px;
	align-items: center;
	border-radius: 10px;
	${({theme}) => `
		background-color: ${theme.colors.background.tertiary};
		box-shadow: 0 5px 2px ${theme.colors.shadow.primary};
	`};
`;

export const Field = styled.input`
	width: 100%;
	padding: 8px 0;
	font-size: 1.4rem;
	border: none;
	text-align: center;
	text-transform:uppercase;
	background-color: transparent;

	${({theme}) => `
		color: ${theme.colors.text.secondary};
	`};

	&:focus {
		outline: none;
	}
`;
