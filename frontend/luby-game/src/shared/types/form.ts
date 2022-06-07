/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from "react-hook-form";

export type FormRegister = {
	name: string;
}

export type FormTransfer = {
	address: string;
}

export type FormDeposit = {
	owner: string;
	amount: number;
}

export type ConfigInput = {
	label: string;
	name: string;
	register: UseFormRegister<any>;
	attributes?: object;
}
