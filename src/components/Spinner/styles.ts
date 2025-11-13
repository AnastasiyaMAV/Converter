import styled, { css } from "styled-components";

import { TSpinnerProps } from "./Spinner";

const spinnerSizes = {
	sm: css`
		width: 1rem;
	`,

	md: css`
		width: 1.5rem;
	`,

	lg: css`
		width: 2.5rem;
	`,

	xl: css`
		width: 3rem;
	`,
};

const spinnerColors = {
	orange: css`
		color: #ec3b03;
	`,
};

export const SpinnerContainer = styled.div<{ color: TSpinnerProps["color"] }>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	line-height: 0;
	animation: loading 1s linear infinite;

	@keyframes loading {
		100% {
			transform: rotate(360deg);
		}
	}

	${props => props.color && spinnerColors[props.color]}
`;

export const SpinnerIconContainer = styled.div<{ size: TSpinnerProps["size"] }>`
	display: inline-block;
	line-height: 0;

	${props => props.size && spinnerSizes[props.size]}
`;
