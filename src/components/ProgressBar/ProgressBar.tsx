import { Background, LineContainer, LineTextInside, LineTextOutside, Progress } from "./ProgressBar.styles";
import { LinearProps } from "./types";

export const ProgressBar = ({ size, valueNow, valueMax, label }: LinearProps) => {
	return (
		<>
			<LineContainer size={size}>
				{size === "lg" && (
					<LineTextInside valueNow={valueNow} valueMax={valueMax}>
						{label}
					</LineTextInside>
				)}
				<Background size={size} />
				<Progress valueNow={valueNow} valueMax={valueMax} size={size}></Progress>
			</LineContainer>
			{size !== "lg" && <LineTextOutside>{label}</LineTextOutside>}
		</>
	);
};
