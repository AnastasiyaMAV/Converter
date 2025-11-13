import styled, { css } from "styled-components";
import { TInputProps } from "./types";
import { RenameByT } from "./tools/generics";
import { fontParametersSize1, fontParametersSize2, fontParametersSize3 } from "@/constans/fontParameters";

export const InputContainer = styled.label<Pick<TInputProps, "size">>`
	width: 100%;
	display: inline-flex;
	position: relative;
	max-width: 100%;
	flex-direction: column;

	svg {
		width: 1.4em;
	}

	${fontParametersSize1}
`;

export const InputLabelText = styled.div<Pick<TInputProps, "size" | "validity">>`
	gap: 0.25rem;
	color: #626c77;
	display: flex;
	transition: 0.2s;
	align-items: center;
	user-select: none;
	margin-bottom: 0.25rem;

	svg {
		width: 1rem;
		color: #969fa8;
	}

	${props => {
		const color = {
			error: "#EC3B03",
			default: "#626C77",
			warning: "#F95721",
			success: "#626C77",
		}[props.validity || "default"];

		if (props.validity) {
			return css`
				color: ${color};
				svg {
					color: ${color};
				}
			`;
		}
	}};
`;

const containerStyles = {
	sm: css`
		height: 2rem;
		padding: 0 0.75rem;
		border-radius: 0.375rem;
		${fontParametersSize1}
	`,
	md: css`
		height: 2.75rem;
		padding: 0.75rem 0.625rem;
		border-radius: 0.5rem;
		${fontParametersSize2}
	`,
	lg: css`
		height: 3.25rem;
		border-radius: 0.5rem;
		padding: 0.875rem 0.75rem;
		${fontParametersSize2}
	`,
	xl: css`
		height: 4.5rem;
		border-radius: 0.625rem;
		padding: 1.5rem 0.75rem;
		${fontParametersSize2}
	`,
};

export const InputElementContainer = styled.div<
	Pick<TInputProps, "size" | "validity" | "isOnSecondaryBg"> & { transparent?: boolean }
>`
	display: flex;
	background: ${props => (props.isOnSecondaryBg ? "#FFFFFF" : "#F2F3F7")};
	transition: 0.1s;
	align-items: center;
	justify-content: space-between;

	${props => props.size && containerStyles[props.size]}

	&:focus-within {
		border-color: ${props =>
			({
				error: "#EC3B03",
				default: "#626C77",
				warning: "#F95721",
				success: "#626C77",
			}[props.validity || "default"])};
	}

	border: 0.1rem solid
		${props =>
			({
				error: "#EC3B03",
				default: "#626C77",
				warning: "#F95721",
				success: "#626C77",
			}[props.validity || "default"])};

	${props =>
		props.transparent &&
		css`
			border: none;
			background-color: transparent;
			padding: 0;
		`}
`;

export const InputElementWrapper = styled.div`
	flex: 1 1 0;
`;

export const InputElement = styled.input<
	RenameByT<{ size: "baseSize" }, Pick<TInputProps, "size">> & {
		passwordOpened?: boolean;
		focused?: boolean;
		value?: string;
	}
>`
	width: 100%;
	color: "#1D2023";
	border: none;
	display: block;
	outline: none;
	max-width: 100%;
	background: transparent;
	font-weight: 400;

	${props =>
		props.type === "password" &&
		!props.passwordOpened &&
		css`
			letter-spacing: 0.375em;
		`}

	&::placeholder {
		color: #626c77;
		font-weight: 400;
		line-height: 1.75rem;
		letter-spacing: normal;
	}

	&:focus::placeholder {
		color: "#969FA8";
	}

	&:-webkit-autofill,
	&:-webkit-autofill:focus {
		transition: background-color 600000s 0s, color 600000s 0s;
	}

	${props =>
		props.baseSize === "xl" &&
		!props.focused &&
		!props.value?.length &&
		css`
			height: 0;
			margin: 0;
			padding: 0;
		`}

	&:disabled {
		color: #626c77;
	}
`;

export const InputDescription = styled.div<Pick<TInputProps, "validity">>`
	gap: 0.75rem;
	color: #626c77;
	display: flex;
	justify-content: space-between;
	padding-top: 0.25rem;
	${fontParametersSize3}
	font-family: "sans-serif";

	${props =>
		props.validity === "error" &&
		css`
			color: #ec3b03;
		`}

	${props =>
		props.validity === "warning" &&
		css`
			color: #ec3b03;
		`}
`;

export const InputExtraButtons = styled.div`
	display: flex;
	column-gap: 0.25rem;
`;

export const InputExtraButton = styled.button`
	color: #969fa8;
	cursor: pointer;
	border: none;
	padding: 0;
	display: flex;
	transition: 0.2s;
	white-space: nowrap;
	align-items: center;
	justify-content: center;

	&:hover {
		color: #626c77;
	}
`;

export const InputLength = styled.span``;

export const ValidityIcon = styled.span<Pick<TInputProps, "validity">>`
	display: flex;
	align-items: center;
	line-height: 0;

	color: ${props =>
		props.validity &&
		{
			error: "#EC3B03",
			warning: "#EC3B03",
			success: "#26CD58",
		}[props.validity]};
`;

export const XLLabel = styled.span<{ focused?: boolean; value?: string }>`
	color: #626c77;
	${fontParametersSize2}

	${props =>
		(props.focused || !!props.value?.length) &&
		css`
			${fontParametersSize2}
		`}
`;
