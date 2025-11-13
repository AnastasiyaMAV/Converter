import { ChangeEvent, createContext } from "react";
import { TAttachedFile, TAttachProps } from "./types";

export type TAttachContext = {
	isDrag: boolean;
	files: TAttachedFile[];
	isMaxOverflow: boolean;
	handleRemoveFile(id: number): void;
	handleChangeFiles(e: ChangeEvent<HTMLInputElement>): void;
} & Omit<TAttachProps, "files">;

export const AttachContext = createContext<TAttachContext>({} as TAttachContext);
