import styled, { css } from "styled-components";

import { TDividerProps } from "./Divider";

export const DividerStyled = styled.div<Pick<TDividerProps, "vertical">>`
	${props => {
		return css`
			${!props.vertical
				? css`
						width: 100%;
						height: 0;
						border-bottom: 0.0625rem solid #bcc3d080;
				  `
				: css`
						height: auto;
						width: 0;
						border-right: 0.0625rem solid #bcc3d080;
				  `}
		`;
	}}
`;
