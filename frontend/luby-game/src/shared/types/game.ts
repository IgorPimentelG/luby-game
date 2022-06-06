type Option = {
	key: string;
	answer: string;
}

export type Question = {
	statement: string;
	answerKey: string;
	options: Option[];
}

