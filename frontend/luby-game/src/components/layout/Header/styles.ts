import styled from "styled-components";

export const Container = styled.header`
	display: flex;
	align-items: center;
	padding: 15px 50px;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	background-color: ${({theme}) => theme.colors.background.tertiary};
	box-shadow: 0 10px 30px 5px ${({theme}) => theme.colors.shadow.primary};
`;

export const Logo = styled.div`
	display: flex;
	align-items: center;
`;

export const Image = styled.img`
	width: 30px;
	height: 30px;
	object-fit: contain;
`;

export const Label = styled.h1`
	margin-left: 10px;
	text-transform: uppercase;
	color: ${({theme}) => theme.colors.text.secondary};
`;

export const Nav = styled.nav`
	display: flex;
	flex: 1;
	justify-content: flex-end;
`;

export const LabelLink = styled.div`
	text-transform: uppercase;
	font-weight: bold;
	letter-spacing: 2px;
	color: ${({theme}) => theme.colors.background.secondary};

	&:hover {
		color: ${({theme}) => theme.colors.text.secondary};
	}
`;

