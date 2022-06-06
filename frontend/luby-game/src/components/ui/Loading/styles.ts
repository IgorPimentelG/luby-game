import styled from "styled-components";

export const RootContainer = styled.div<any>`
	display: ${({enable}) => enable ? "flex" : "none"};
	justify-content: center;
	align-items: center;
	position: fixed;
	z-index: 999;
	height: 100%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.8);
`;
