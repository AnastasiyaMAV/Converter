import styled, { css } from "styled-components";

import { TRenameByT, TSelectProps } from "./types";
import { fontParametersSize1, fontParametersSize2, fontParametersSize3 } from "@/constans/fontParameters";

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
type TSelectStylesProp = Pick<TSelectProps, "size" | "validity" | "disabled" | "name" | "isOnSecondaryBg"> & {
	opened?: boolean;
	transparent?: boolean;
};

export const ExtraButtonsContainer = styled.div`
	display: flex;
	column-gap: 0.25rem;
`;

export const SelectStyledArrowButton = styled(InputExtraButton)<Pick<TSelectStylesProp, "transparent" | "opened">>`
	flex-shrink: 0;

	svg {
		width: 1.4em;
		color: #969fa8;
	}

	${props =>
		props.opened &&
		css`
			rotate: 180deg;
		`}

	${props =>
		props.transparent &&
		css`
			color: #1d2023;
			svg {
				width: 1.6em;
			}
		`}
`;

export const SelectValidityIcon = styled.span<Pick<TSelectStylesProp, "validity" | "disabled">>`
	display: flex;

	align-items: center;
	line-height: 0;

	color: #969fa8;

	color: ${props =>
		props.validity &&
		{
			error: "#EC3B03",
			warning: "#F95721",
			success: "#26CD58",
		}[props.validity]};

	svg {
		width: 1.5em;
	}
`;

const optionButtonStyles = {
	sm: css`
		min-height: 2rem;
	`,
	md: css`
		min-height: 2.75rem;
	`,
	lg: css`
		min-height: 3.25rem;
	`,
};

const containerStyles = {
	sm: css`
		padding: 0.375rem 0.75rem;
		height: 2rem;
		border-radius: 0.375rem;
		${fontParametersSize1}
	`,
	md: css`
		padding: 0.625rem 0.75rem;
		height: 2.75rem;
		border-radius: 0.8rem;
		${fontParametersSize2}
	`,
	lg: css`
		padding: 0.875rem 0.75rem;
		height: 3.25rem;
		border-radius: 0.8rem;
		${fontParametersSize2}
	`,
};

export const SelectWrapper = styled.div<Pick<TSelectStylesProp, "disabled" | "name">>`
	${props =>
		props.disabled &&
		css`
			cursor: default;
			pointer-events: none;
		`}
`;

export const InputContainer = styled.div<
	Pick<TSelectStylesProp, "size" | "validity" | "opened" | "isOnSecondaryBg"> & { multiply?: boolean }
>`
	display: flex;
	align-items: center;

	gap: 0.5em;

	padding-left: 1rem;
	padding-right: 0.7rem;

	color: blak;

	background: ${props => (props.isOnSecondaryBg ? "#FFFFFF" : "#F2F3F7")};
	border-radius: 0.25em;
	outline: none;

	transition: 0.1s;
	cursor: pointer;

	${props => props.size && containerStyles[props.size]};

	&:focus-within {
		border-color: ${props =>
			({
				error: "#EC3B03",
				default: "#007CFF",
				warning: "#F95721",
				success: "#007CFF",
			}[props.validity || "default"])};
	}

	border: 1px solid
		${props =>
			({
				error: "#EC3B03",
				default: "#bcc3d07f",
				warning: "#F95721",
				success: "#bcc3d07f",
			}[props.validity || "default"])};

	${props =>
		props.opened &&
		css`
			border-color: #007cff;
		`}
`;

export const InputElementWrapper = styled.span<Pick<TSelectProps, "size" | "disableOptionsWrap">>`
	display: flex;

	align-items: center;

	flex-wrap: ${props => (props.disableOptionsWrap ? "unset" : "wrap")};
	flex: 2;
	gap: 0.25rem;

	overflow: hidden;
	text-overflow: ellipsis;

	background-color: transparent;
`;

const optionsListStyles = {
	sm: (limit: number) => css`
		max-height: calc(2rem * ${limit});
		${fontParametersSize1}
	`,
	md: (limit: number) => css`
		max-height: calc(2.75rem * ${limit});
		${fontParametersSize2}
	`,
	lg: (limit: number) => css`
		max-height: calc(3.25rem * ${limit});
		${fontParametersSize2}
	`,
};

export const SelectOptionsListStyled = styled.ul<{
	size: TSelectProps["size"];
	position: TSelectProps["position"];
	maxVisibleOptions: TSelectProps["maxVisibleOptions"];
}>`
	margin: ${props => (props.position === "top" ? "-0.25rem " : "0.25rem")} 0 0 0;
	padding: 0;
	z-index: 1;
	position: absolute;
	list-style: none;
	box-shadow: "0 0 16px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.08)";
	border-radius: 0.375rem;
	background-color: #ffffff;

	overflow-y: auto;
	overflow-y: overlay;

	${props => props.size && optionsListStyles[props.size](props.maxVisibleOptions!)}
`;

export const SelectOptionListItemStyled = styled.li`
	text-overflow: ellipsis;
	overflow: hidden;
`;

export const SelectOptionListButtonStyled = styled.button<{
	size?: TSelectProps["size"];
	selected: boolean;
}>`
	gap: 0.75rem;
	width: 100%;
	cursor: pointer;
	border: none;
	display: flex;
	padding: 0.375rem 0.75rem;
	align-items: center;

	${props =>
		props.selected &&
		css`
			background-color: #f2f3f7;
		`}

	&:hover {
		background-color: #f2f3f7;
	}

	${props => props.size && optionButtonStyles[props.size]}
`;

export const SelectOptionListButtonContentStyled = styled.span<{ size?: TSelectProps["size"] }>`
	flex: 1 1 0;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #1d2023;
`;

export const SelectLabelText = styled.label<Pick<TSelectProps, "size" | "validity">>`
	gap: 0.25rem;
	color: #626c77;
	display: flex;
	transition: 0.2s;
	align-items: center;
	user-select: none;
	margin-bottom: 0.25rem svg {
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

	${fontParametersSize1}
`;

export const SelectDescription = styled.span<Pick<TSelectStylesProp, "validity">>`
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
`;

export const SelectStyledPlaceholder = styled.div`
	color: #626c77;
	user-select: none;
`;

export const SelectInputElement = styled.input<
	TRenameByT<{ size: "baseSize" }, Pick<TSelectStylesProp, "size">> & {
		passwordOpened?: boolean;
		focused?: boolean;
		value?: string;
	}
>`
	flex: 1 1 0;
	color: #1d2023;
	border: none;
	display: block;
	outline: none;
	min-width: 1.875rem;
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
	}

	&:-webkit-autofill,
	&:-webkit-autofill:focus {
		transition: background-color 600000s 0s, color 600000s 0s;
	}

	${props =>
		props.baseSize === "lg" &&
		!props.focused &&
		!props.value?.length &&
		css`
			height: 0;
			margin: 0;
			padding: 0;
		`}
`;

export const SelectElement = styled.span<Pick<TSelectProps, "size">>`
	white-space: nowrap;
`;

export const SelectOptionLabelStyled = styled.span`
	color: #626c77;
	display: block;

	${fontParametersSize2}
`;

export const SelectOptionCheckboxStyled = styled.span`
	line-height: 0;
	position: relative;
`;

export const SelectOptionCheckboxCoverStyled = styled.span`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;
