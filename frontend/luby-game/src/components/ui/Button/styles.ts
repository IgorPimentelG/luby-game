/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";

export const Container  = styled.button<any>`
	margin: 20px 0;
	padding: 10px;
	border: none;
	border-radius: 10px;
	width: 100%;
	${({colors}) => `
		background-color: ${colors.background};
		box-shadow: 0 5px 2px ${colors.shadow};
	`};
`;

export const Label = styled.p`
	font-size: 1rem;
	text-transform: uppercase;
	font-weight: bold;
	color: ${({theme}) => theme.colors.text.primary};
`;
