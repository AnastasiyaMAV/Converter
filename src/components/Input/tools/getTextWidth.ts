export type GetTextWidthProps = {
	text: string;
	fontSize?: string;
	fontStyle?: string;
	fontWeight?: string;
	fontFamily?: string;
};

export function getTextWidth({ text, fontWeight, fontSize, fontFamily, fontStyle = "normal" }: GetTextWidthProps) {
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");

	if (!context) return 0;

	context.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
	const metrics = context.measureText(text.toString());

	return metrics.width;
}
