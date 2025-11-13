import { ATTACH_VALIDITY, TAttachProps } from "@/components/Attach/types";
import styled, { css } from "styled-components";

export const AttachContainerStyled = styled.div`
	width: 100%;
	transition: 0.3s;
`;

export const DnDArea = styled.div`
	pointer-events: none;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 100%;
	color: #969fa8;
	border: 0.3125rem dashed #bcc3d080;
	border-radius: 0.5rem;
	font-weight: bolder;
	font-size: 1.2rem;
	background-color: #ffffff;
	z-index: 60;
`;

export const AttachLabelStyled = styled.div`
	color: #626c77;
	padding-bottom: 0.5rem;
`;

const attachDropContainerStylesBySize = {
	xs: css`
		height: 2.75rem;
	`,
	sm: css`
		height: 2.75rem;
	`,
	md: css`
		height: 3.25rem;
	`,
	lg: css`
		height: 4.5rem;
	`,
};

export const AttachDropContainerStyled = styled.div<{
	size: TAttachProps["size"];
	validityAttach: ATTACH_VALIDITY | undefined;
	isError: TAttachProps["isError"];
}>`
	gap: 0.25rem;
	height: 100%;
	padding: 0 1rem;
	display: flex;
	align-items: center;
	border-radius: 0.5rem;
	justify-content: ${props => (props.size === "xs" ? "flex-start" : "center")};

	border: 0.125rem dashed
		${props => {
			if (props.validityAttach) {
				return {
					[ATTACH_VALIDITY.ERROR]: "#EC3B03",
					[ATTACH_VALIDITY.DEFAULT]: "#BCC3D080",
					[ATTACH_VALIDITY.WARNING]: "#F95721",
					[ATTACH_VALIDITY.SUCCESS]: "#12B23F",
				}[props.validityAttach];
			}
			return props.isError ? "#EC3B03" : "#BCC3D080";
		}};

	${props => props.size && attachDropContainerStylesBySize[props.size]}
`;

export const AttachSelectFileButtonStyled = styled.button`
	color: #007cff;
	margin: 0;
	cursor: pointer;
	border: none;
	padding: 0;
	transition: 0.3s;
	background-color: transparent;

	&:hover {
		color: #007cff;
	}
`;

export const AttachFormatsStyled = styled.div<{
	validityAttach: ATTACH_VALIDITY | undefined;
	isError: TAttachProps["isError"];
}>`
	color: ${props =>
		props.validityAttach
			? {
					[ATTACH_VALIDITY.ERROR]: "#EC3B03",
					[ATTACH_VALIDITY.DEFAULT]: "#626C77",
					[ATTACH_VALIDITY.WARNING]: "#F95721",
					[ATTACH_VALIDITY.SUCCESS]: "#12B23F",
			  }[props.validityAttach]
			: props.isError
			? "#EC3B03"
			: "#626C77"};
	padding-top: 0.5rem;
`;

export const AttachHiddenInputStyled = styled.input`
	display: none;
`;

export const AttachFilesContainerStyled = styled.div<{ maxFilesOverflow?: boolean }>`
	gap: 0.75rem;
	display: flex;
	flex-direction: column;
	margin-top: ${props => (props.maxFilesOverflow ? "auto" : "0.75rem")};
`;

export const AttachFileStyled = styled.div`
	gap: 0.75rem;
	min-height: 3.25rem;
	padding: 0.25rem 0.75rem;
	display: flex;
	align-items: center;
	border-radius: 0.5rem;
	background-color: #f2f3f7;
`;

export const AttachFileIconStyled = styled.div`
	width: 1.25rem;
	height: 1.25rem;
`;

export const AttachFileBodyStyled = styled.div`
	flex: 1 1 0;
`;

export const AttachFileNameStyled = styled.div`
	color: #1d2023;
	word-break: break-all;
`;

export const AttachFileDescriptionStyled = styled.div<{ isError?: boolean }>`
	color: ${props => (props.isError ? "#EC3B03" : "#626C77")};
`;

export const AttachFileRemoveButtonStyled = styled.button`
	color: #969fa8;
	border: none;
	cursor: pointer;
	padding: 0;
	transition: 0.3s;
	line-height: 0;
	background-color: transparent;

	&:hover {
		color: #969fa8;
	}
`;
