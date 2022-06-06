/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from "react-hook-form";

export type FormRegister = {
	name: string;
}

export type FormAdmin = {
	address: string;
}

export type ConfigInput = {
	label: string;
	name: string;
	register: UseFormRegister<any>;
	attributes?: object;
}
