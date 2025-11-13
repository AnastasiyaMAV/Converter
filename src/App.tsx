import { KeyboardEvent, useState } from "react";
import { useStore } from "@nanostores/react";
import { Attach } from "./components/Attach/Attach";
import { Select, SelectOption } from "./components/Select/Select";
import { Input } from "./components/Input/Input";
import { TAttachedFile } from "./components/Attach/types";
import { fileTypes } from "./components/Attach/consts";
import { TFileTypes } from "./stores/types";
import { $storeFile, setAllowedFileType, setSizeFile } from "./stores/fileProperties";
import { $storeFormat, setValueFormat } from "./stores/formatBase64";
import { toBase64 } from "./utils/main";
import { CustomButton } from "./stylesMain";
import { useClipboard } from "./hooks/useClipboard";

export const App = () => {
	const [files, setFiles] = useState<TAttachedFile[]>([]);
	const { types, size } = useStore($storeFile);
	const { value } = useStore($storeFormat);
	const copyText = useClipboard();

	const [selectedTypes, setSelectedTypes] = useState<TFileTypes | undefined>(undefined);
	const [enteredSize, setEnteredSize] = useState<string>("1");

	const handleAttachChange = async (files: TAttachedFile[]) => {
		setFiles(files);
		if (files.length === 0) {
			setSelectedTypes(undefined);
			setEnteredSize("1");
			setValueFormat("");
		}
		if (files.length > 0) setValueFormat(await toBase64(files[0].file!, true));
	};

	const handleSelectFileTypes = (types: TFileTypes) => {
		setSelectedTypes(types);
		setAllowedFileType(types.name);
		setFiles([]);
	};

	const handleInputFileSize = (size: string) => {
		const numericValue = size.replace(/[^0-9]/g, "");

		if (numericValue !== size) return;

		setEnteredSize(numericValue);
		setSizeFile(numericValue);
		setFiles([]);
	};

	const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (
			!/[0-9]/.test(event.key) &&
			!["Backspace", "Delete", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
		) {
			event.preventDefault();
		}
	};

	return (
		<div>
			<h1 style={{ textAlign: "center" }}>Converter in Base86</h1>
			<div style={{ display: "flex", flexDirection: "row", gap: 25 }}>
				<div style={{ width: "800px", display: "flex", flexDirection: "column", gap: 25, paddingLeft: 25 }}>
					<Select
						size="md"
						label="Форматы для конвертации"
						placeholder="Выберите форматы"
						value={selectedTypes}
						onChange={el => handleSelectFileTypes(el[0])}
					>
						{fileTypes.map(element => (
							<SelectOption key={element.id} value={element}>
								{element.name}
							</SelectOption>
						))}
					</Select>

					<Input
						size="md"
						label="Укажите размер файла в МБ"
						placeholder="Размер файла"
						maxLength={3}
						value={enteredSize}
						onInput={el => handleInputFileSize(el)}
						onKeyDown={e => handleOnKeyDown(e)}
					/>

					<Attach
						size="lg"
						label="Файл"
						maxFiles={1}
						maxFileSize={Number(size) * Math.pow(1024, 2)}
						allowedFileTypes={types}
						onChange={handleAttachChange}
						files={files}
						description={`Форматы: ${types}. Максимальный размер файла: ${size} Мб`}
					/>

					<div>{value && <CustomButton onClick={() => copyText(value)}>Скопировать результат</CustomButton>}</div>
				</div>

				<div
					style={{
						width: "100%",
						minHeight: "100%",
						padding: "15px",
						border: "1px solid grey",
						boxSizing: "border-box",
						borderRadius: "5px",
						color: "black",
						overflowY: "auto",
						whiteSpace: "normal",
						wordBreak: "break-word",
						overflowWrap: "anywhere",
					}}
				>
					{value}
				</div>
			</div>
		</div>
	);
};
