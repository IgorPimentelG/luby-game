import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 50px;
`;

export const Image = styled.img`
	width: 80px;
	height: 80px;
	object-fit: contain;
`;

export const Title = styled.h1`
	margin-top: 20px;
	color: ${({theme}) => theme.colors.text.secondary};
`;

