import { ReactNode } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";

const Theme: React.FC<{ children: ReactNode }> = ({ children }) => {

	const config: DefaultTheme = {
		colors: {
			text: {
				primary: "#003D45",
				secondary: "#A9BFC9"
			},

			background: {
				primary: "#192A32",
				secondary: "#F2B238",
				tertiary: "#1F3540",
				quaternary: "#F35123"
			},

			shadow: {
				primary: "#111F29",
				secondary: "#A37F31",
				tertiary: "#6F848F",
				quaternary: "#B83B18"
			}
		}
	};

	return(
		<ThemeProvider theme={config}>
			{children}
		</ThemeProvider>
	);
};

export default Theme;
