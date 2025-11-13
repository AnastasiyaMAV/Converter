import React, { forwardRef } from "react";

import { DividerStyled } from "./styles";

export type TDividerProps = { vertical?: boolean } & React.BaseHTMLAttributes<HTMLDivElement>;

export const Divider = forwardRef<HTMLDivElement, TDividerProps>(function Divider(props, ref) {
	return <DividerStyled {...props} ref={ref} />;
});
