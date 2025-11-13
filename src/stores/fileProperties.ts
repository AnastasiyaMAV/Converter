import { map } from "nanostores";
import { TFilePropertiesStore } from "./types";
import { fileTypes } from "@/components/Attach/consts";

export const MAX_SIZE_FILE = "1";

const initialState = {
	types: fileTypes[0].name,
	size: MAX_SIZE_FILE,
};

export const $storeFile = map<TFilePropertiesStore>(initialState);

export const setAllowedFileType = (value: string[]) => {
	$storeFile.setKey("types", value);
};

export const setSizeFile = (value: string) => {
	$storeFile.setKey("size", value);
};
