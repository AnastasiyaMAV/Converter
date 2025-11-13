import { forwardRef } from "react";

import { SpinnerContainer, SpinnerIconContainer } from "./styles";
import SpinnerIcon from "./SpinnerIcon";

export type TSpinnerProps = {
	size?: "sm" | "md" | "lg" | "xl";
	color?: "orange";
};

export const Spinner = forwardRef<HTMLDivElement, TSpinnerProps>(function Spinner({ color, size }, ref) {
	return (
		<SpinnerContainer color={color} ref={ref}>
			<SpinnerIconContainer size={size}>
				<SpinnerIcon />
			</SpinnerIconContainer>
		</SpinnerContainer>
	);
});
