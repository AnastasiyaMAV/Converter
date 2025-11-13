import { debounce } from "@/utils/main";
import { CSSProperties, MutableRefObject, RefObject, useCallback, useLayoutEffect, useState } from "react";

// Хук предназначен для динамического позиционирования выпадающего элемента (dropdown) относительно другого элемента на странице

/*
	connectRef - ссылка на элемент, относительно которого позиционируется dropdown
	dropdownRef - ссылка на сам выпадающий элемент
	position - выбранная позиция
	indent - отступ между элементами
	enableObserver - включить отслеживание изменений DOM
*/

export const formulas = {
	top(connectRect: DOMRect, dropdownRect: DOMRect, indent?: number): CSSProperties {
		return {
			top: connectRect.top + document.documentElement.scrollTop - dropdownRect.height - (indent || 0) + "px",
			left: connectRect.left + connectRect.width / 2 - dropdownRect.width / 2 + "px",
		};
	},
	"top-left"(connectRect: DOMRect, dropdownRect: DOMRect, indent?: number): CSSProperties {
		return {
			top: connectRect.top + document.documentElement.scrollTop - dropdownRect.height - (indent || 0) + "px",
			left: connectRect.x + "px",
		};
	},
	"top-right"(connectRect: DOMRect, dropdownRect: DOMRect, indent?: number): CSSProperties {
		return {
			top: connectRect.top + document.documentElement.scrollTop - dropdownRect.height - (indent || 0) + "px",
			left: connectRect.x - dropdownRect.width + connectRect.width + "px",
		};
	},
	left(connectRect: DOMRect, dropdownRect: DOMRect, indent?: number): CSSProperties {
		return {
			top:
				connectRect.top +
				document.documentElement.scrollTop -
				(dropdownRect.height / 2 - connectRect.height / 2) +
				"px",
			left: connectRect.left - dropdownRect.width - (indent || 0) + "px",
		};
	},
	"left-top"(connectRect: DOMRect, dropdownRect: DOMRect, indent?: number): CSSProperties {
		return {
			top: connectRect.y + document.documentElement.scrollTop + "px",
			left: connectRect.left - dropdownRect.width - (indent || 0) + "px",
		};
	},
	"left-bottom"(connectRect: DOMRect, dropdownRect: DOMRect, indent?: number): CSSProperties {
		return {
			top: connectRect.y + connectRect.height + document.documentElement.scrollTop - dropdownRect.height + "px",
			left: connectRect.left - dropdownRect.width - (indent || 0) + "px",
		};
	},
	right(connectRect: DOMRect, dropdownRect: DOMRect, indent?: number): CSSProperties {
		return {
			top:
				connectRect.top +
				document.documentElement.scrollTop -
				(dropdownRect.height / 2 - connectRect.height / 2) +
				"px",
			left: connectRect.right + (indent || 0) + "px",
		};
	},
	"right-top"(connectRect: DOMRect, _: DOMRect, indent?: number): CSSProperties {
		return {
			top: connectRect.y + document.documentElement.scrollTop + "px",
			left: connectRect.right + (indent || 0) + "px",
		};
	},
	"right-bottom"(connectRect: DOMRect, dropdownRect: DOMRect, indent?: number): CSSProperties {
		return {
			top: connectRect.y + connectRect.height + document.documentElement.scrollTop - dropdownRect.height + "px",
			left: connectRect.right + (indent || 0) + "px",
		};
	},
	bottom(connectRect: DOMRect, dropdownRect: DOMRect, indent?: number): CSSProperties {
		return {
			top: connectRect.bottom + document.documentElement.scrollTop + (indent || 0) + "px",
			left: connectRect.left + connectRect.width / 2 - dropdownRect.width / 2 + "px",
		};
	},
	"bottom-left"(connectRect: DOMRect, _: DOMRect, indent?: number): CSSProperties {
		return {
			top: connectRect.bottom + document.documentElement.scrollTop + (indent || 0) + "px",
			left: connectRect.x + "px",
		};
	},
	"bottom-right"(connectRect: DOMRect, dropdownRect: DOMRect, indent?: number): CSSProperties {
		return {
			top: connectRect.bottom + document.documentElement.scrollTop + (indent || 0) + "px",
			left: connectRect.x - dropdownRect.width + connectRect.width + "px",
		};
	},
};

export type TUseDropdownPositions = keyof typeof formulas;

export const useDropdownPosition = (
	connectRef: RefObject<HTMLElement> | MutableRefObject<HTMLElement | undefined>,
	dropdownRef: RefObject<HTMLElement> | MutableRefObject<HTMLElement | undefined>,
	position: TUseDropdownPositions,
	indent?: number,
	enableObserver: boolean = false
) => {
	const [css, setCss] = useState<CSSProperties>();

	const calculate = useCallback(() => {
		queueMicrotask(() => {
			if (!connectRef.current || !dropdownRef.current) return;
			const fn = formulas[position];
			setCss(fn(connectRef.current.getBoundingClientRect(), dropdownRef.current.getBoundingClientRect(), indent));
		});
	}, [connectRef, dropdownRef, indent, position]);

	useLayoutEffect(() => {
		calculate();
		const resizeHandler = debounce(() => queueMicrotask(calculate), 200);
		window.addEventListener("resize", resizeHandler);

		return () => window.removeEventListener("resize", resizeHandler);
	}, [calculate]);

	useLayoutEffect(() => {
		if (!enableObserver) return;

		const observer = new MutationObserver(() => calculate());
		observer.observe(document.body, { attributes: true, childList: true, subtree: true });

		return () => observer.disconnect();
	}, [calculate, enableObserver]);

	return { css, calculate };
};
