/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";

const BaseContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const RootContainer = styled(BaseContainer)<any>`
	display: ${({isOpen}) => isOpen ? "flex" : "none"};
	position: fixed;
	z-index: 999;
	height: 100%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.8);
`;

export const Container = styled(BaseContainer)`
	flex-direction: column;
	border-radius: 10px;
	padding: 20px;
	width: 20%;
	background-color: ${({theme}) => theme.colors.background.tertiary};
`;

export const ContainerOptions = styled.div``;

export const Label = styled.h4`
	text-align: center;
	text-transform: uppercase;
	color: ${({theme}) => theme.colors.text.secondary};
`;

export const Button = styled.button<any>`
	margin: 20px 5px 0 5px;
	padding: 5px 10px;
	border-radius: 5px;
	border: none;
	background-color: ${({background}) => background};
`;

export const LabelButton = styled.p`
	text-transform: uppercase;
	font-weight: bold;
	color: ${({theme}) => theme.colors.text.primary};
`;


