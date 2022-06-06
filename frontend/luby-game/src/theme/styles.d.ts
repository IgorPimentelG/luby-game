import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            text: {
                primary: string;
                secondary: stirng;
            }

            background: {
                primary: string;
                secondary: string;
                tertiary: string;
				quaternary: string;
            }

			shadow: {
				primary: string;
				secondary: string;
				tertiary: string;
				quaternary: string;
			}
        }
    }
}
