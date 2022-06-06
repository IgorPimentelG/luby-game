import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
	border-radius: 10px;
	background-color: ${({theme}) => theme.colors.background.primary};
`;

export const Label = styled.h4`
	margin-top: 8px;
	letter-spacing: 2px;
	color:  ${({theme}) => theme.colors.text.secondary};
`;
