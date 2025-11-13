import { ChangeEvent, DragEventHandler, Fragment, forwardRef, useState } from "react";

import { DnDArea } from "./styles";

import { TAttachProps } from "./types";
import { AttachContext } from "./AttachContext";
import { AttachFiles } from "./AttachFiles";
import { AttachInput } from "./AttachInput";

export const Attach = forwardRef<HTMLDivElement, TAttachProps>(function Attach({ files = [], ...props }, ref) {
	const [isDrag, setIsDrag] = useState(false);

	const isMaxOverflow = !!(props.maxFiles && files.length >= props.maxFiles);

	const pushNewFiles = (filesFromInput: File[]) => {
		const matchSign = ["size", "lastModified", "name"] as const;

		if (isMaxOverflow) return files;

		const selectedFiles = filesFromInput
			.filter(file => !files.some(f => matchSign.every(k => file[k] === f.file?.[k])))
			.slice(0, props.maxFiles ? props.maxFiles - files.length : filesFromInput.length);

		const newFiles = [
			...files,
			...selectedFiles.map(file => {
				const fileExtension = file.name.split(".").pop();
				console.log("fileExtension", fileExtension);
				console.log("props.allowedFileTypes", props.allowedFileTypes);
				const isNotAllowedExtension = props.allowedFileTypes.includes(fileExtension?.toLowerCase() || "");
				console.log("isNotAllowedExtension", isNotAllowedExtension);
				const isBiggerThanMaxSize = file.size > props.maxFileSize;
				let error;
				if (isBiggerThanMaxSize) error = props.customText?.maxSize || "Файл слишком большой";
				if (isNotAllowedExtension) error = props.customText?.notAllowedExtension || "Неверный формат файла";
				return { name: file.name, size: file.size, file: error ? undefined : file, error };
			}),
		];

		props.onChange?.(newFiles, "select");
	};

	const handleRemoveFile = (id: number) => {
		const newFiles = files.filter((_, index) => index !== id);
		props.onChange?.(newFiles, "delete");
	};

	const handleDragOver: DragEventHandler<HTMLDivElement> = event => {
		event.preventDefault();

		if (props.onDropCondition?.({ event, selfProps: props }) === false) return;
		if (files.length === props.maxFiles) return;

		setIsDrag(true);
	};

	const handleDrop: DragEventHandler<HTMLDivElement> = event => {
		event.preventDefault();

		if (props.onDropCondition?.({ event, selfProps: props }) === false) return;
		if (files.length === props.maxFiles) return;

		const droppedfiles = [...event.dataTransfer.files];
		if (!droppedfiles.length) return;

		pushNewFiles(droppedfiles);
		setIsDrag(false);
	};

	const handleChangeFiles = (event: ChangeEvent<HTMLInputElement>) => {
		const files = [...(event.target.files || [])];
		if (!files.length) return;
		pushNewFiles(files);
	};

	const handleDragLeave: DragEventHandler<HTMLDivElement> = event => {
		if (event.currentTarget.contains(event.relatedTarget as Node)) return;
		setIsDrag(false);
	};

	return (
		<AttachContext.Provider
			value={{
				...props,
				files,
				isDrag,
				isMaxOverflow,
				handleRemoveFile,
				handleChangeFiles,
			}}
		>
			<div ref={ref}>
				<div
					style={{ position: "relative" }}
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
				>
					{isDrag && <DnDArea>{props.customText?.dragContent || "Перетащите файл в эту область..."}</DnDArea>}
					{props.children || (
						<Fragment>
							<AttachInput />
							<AttachFiles />
						</Fragment>
					)}
				</div>
			</div>
		</AttachContext.Provider>
	);
});
