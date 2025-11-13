import styled, { css } from "styled-components";
import { LinearProps } from "./types";
import { getPercentage } from "@/utils/main";

const lineContainerSize = {
	sm: css`
		height: 0.25rem;
	`,
	md: css`
		height: 0.5rem;
	`,
	lg: css`
		height: 2rem;
	`,
};

const progressBarBorder = {
	sm: css`
		border-radius: 0.0625rem;
	`,
	md: css`
		border-radius: 0.125rem;
	`,
	lg: css`
		border-radius: 0.375rem;
	`,
};

export const LineContainer = styled.div<Pick<LinearProps, "size">>`
	position: relative;
	overflow: hidden;
	${props => lineContainerSize[props.size]}
	${props => progressBarBorder[props.size]}
`;

export const BaseBox = styled.div`
	height: 100%;
	position: absolute;
`;

export const Background = styled(BaseBox)<{ size: LinearProps["size"] }>`
	background: #bcc3d080;
	width: 100%;
	${props => progressBarBorder[props.size]}
`;

export const Progress = styled(BaseBox)<{
	valueNow: LinearProps["valueNow"];
	valueMax: LinearProps["valueMax"];
	size: LinearProps["size"];
}>`
	background: #26cd58;
	width: ${({ valueNow, valueMax }) => (valueNow / valueMax) * 100}%;
	${props => progressBarBorder[props.size]}
`;

export const LineTextOutside = styled.div`
	color: #626c77;
	margin-top: 0.5rem;
`;

export const LineTextInside = styled.div<{
	valueNow: LinearProps["valueNow"];
	valueMax: LinearProps["valueMax"];
}>`
	position: absolute;
	z-index: 2;
	padding: 0 0.5rem;
	text-align: right;
	min-width: fit-content;
	width: ${({ valueNow, valueMax }) => getPercentage(valueNow, valueMax)}%;
	top: 50%;
	transform: translateY(-50%);
	color: ${({ valueNow, valueMax }) => (getPercentage(valueNow, valueMax) > 0 ? "#FFFFFF" : "#F2F3F7")};
`;
