import styled from "styled-components";

export const RootContainer = styled.div`
	display: flex;
	height: 100vh;
	padding: 40px 0 50px 0;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow: auto;

	@media(max-width: 800px) {
		padding-top: 200px;
	}
`;

export const Container = styled.main`
	display: flex;
	align-items: center;
	margin-top: 30px;

	@media(max-width: 800px) {
		flex-direction: column;
		margin-top: 0;
	}
`;

export const ContainerForm = styled.div`
	margin: 0 100px;

	@media(max-width: 1000px) {
		margin: 0 50px;
	}

	@media(max-width: 800px) {
		margin: 20px 0;
	}
`;

