/* eslint-disable linebreak-style */
import * as yup from "yup";

export const registerSchema = yup.object().shape({
	name: yup.string()
		.required("Informe o seu nome")
		.min(3, "Mínimo de 3 caracteres")
		.max(20, "Máximo 20 caracteres")
});
