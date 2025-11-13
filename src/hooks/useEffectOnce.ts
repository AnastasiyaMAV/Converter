import { EffectCallback, useEffect } from "react";

// кастомная обертка над React useEffect, которая гарантирует, что эффект выполнится только один раз при монтировании компонента

export const useEffectOnce = (effect: EffectCallback) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(effect, []);
};
