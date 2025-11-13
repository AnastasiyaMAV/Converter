import { RefObject, useEffect } from "react";

// отслеживает клики вне указанного элемента и вызывает обработчик, когда пользователь кликает outside этого элемента

export const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: (e: Event) => void) => {
	useEffect(() => {
		const listener = (e: Event) => {
			if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
				return;
			}
			handler(e);
		};
		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, handler]);
};
