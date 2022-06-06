import ReactDOM from "react-dom";
import Lottie from "react-lottie";
import { loadingAnimation } from "@assets/animations";
import { RootContainer } from "./styles";


const Loading: React.FC<{ isEnable: boolean }> = ({ isEnable }) => {

	function component() {
		return(
			<RootContainer enable={isEnable}>
				<div>
					<Lottie
						options={{ animationData: loadingAnimation }}
						height={200}
						width={200}
					/>
				</div>
			</RootContainer>
		);
	}

	return ReactDOM.createPortal( component(), document.getElementById("portal-loading") as HTMLElement );

};

export default Loading;
