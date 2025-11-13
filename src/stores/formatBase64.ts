import { map } from "nanostores";
import { TFormatBase64Store } from "./types";

const initialState = {
	value: "",
};

export const $storeFormat = map<TFormatBase64Store>(initialState);

export const setValueFormat = (value: string) => {
	$storeFormat.setKey("value", value);
};
