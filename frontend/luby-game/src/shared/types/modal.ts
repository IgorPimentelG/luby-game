export type ConfigModal = {
	isOpen: boolean;
	label: string;
	onConfirm: () => void;
	onCancel?: () => void;
}
