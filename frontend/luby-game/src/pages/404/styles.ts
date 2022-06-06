import styled, { keyframes } from "styled-components";

const zoomAnimation = keyframes`
	0% {
		transform: scale(1);
	}

	100% {
		transform: scale(1.5);
	}
`;

export const RootContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;
	align-items: center;
`;

export const Label = styled.h3`
	text-transform: uppercase;
	color: ${({theme}) => theme.colors.text.secondary};
`;

export const Button = styled.button`
	border: none;
	background-color: transparent;
	padding: 15px;
	margin-top: 30px;

	&:hover {
		animation: ${zoomAnimation} 1s both;
	}
`;

