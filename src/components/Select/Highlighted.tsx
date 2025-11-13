import { Children, JSX, ReactNode, createElement, isValidElement } from "react";
import escapeRegExp from "lodash.escaperegexp";

type THighlightedProps = {
	text: ReactNode | undefined | null;
	highlight: string;
};

export const Highlighted = ({ text, highlight }: THighlightedProps): JSX.Element | null => {
	if (!text || !highlight || !highlight.trim()) {
		return <span>{text}</span>;
	}

	if (typeof text === "string") {
		const regex = new RegExp(`(${escapeRegExp(highlight)})`, "gi");
		const parts = text.split(regex);

		return (
			<span>
				{parts
					.filter(part => part)
					.map((part, i) =>
						regex.test(part) ? (
							<span key={i} style={{ color: "#007CFF" }}>
								{part}
							</span>
						) : (
							<span key={i}>{part}</span>
						)
					)}
			</span>
		);
	}

	if (isValidElement(text) && typeof text.props === "object" && text.props !== null) {
		const { children, ...props } = text.props as { children?: ReactNode };

		return createElement(
			text.type,
			props,
			Children.map(children, child => Highlighted({ text: child, highlight }))
		);
	}

	return null;
};
