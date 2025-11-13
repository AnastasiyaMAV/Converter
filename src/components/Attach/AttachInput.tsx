import {
	AttachContainerStyled,
	AttachLabelStyled,
	AttachDropContainerStyled,
	AttachSelectFileButtonStyled,
	AttachHiddenInputStyled,
	AttachFormatsStyled,
} from "@/components/Attach/styles";
import { formatBytes } from "@/utils/main";
import { forwardRef, useContext, useRef, useMemo } from "react";
import { Fragment } from "react/jsx-runtime";
import { AttachContext } from "./AttachContext";

export const AttachInput = forwardRef<HTMLDivElement>(function AttachInput(props, ref) {
	const {
		size,
		files,
		label,
		isError,
		maxFiles,
		disabled,
		validityAttach,
		customText,
		maxFileSize,
		description,
		isMaxOverflow,
		allowedFileTypes,
		handleChangeFiles,
	} = useContext(AttachContext);

	const hiddenInputRef = useRef<HTMLInputElement>(null);

	const handleClickSelectButton = () => {
		hiddenInputRef.current?.click();
	};

	const hasErrors = useMemo(() => isError || files.some(f => f.error), [files, isError]);

	const AllowedFileTypes = () => {
		return (
			<>
				{customText?.formats ? customText.formats : "Форматы: "}
				{allowedFileTypes.map((type, index, types) => (
					<Fragment key={index}>
						{type.toUpperCase()}
						{index !== types.length - 1 && ", "}
					</Fragment>
				))}

				{". "}

				{maxFileSize !== undefined &&
					(customText?.maxSizeFile
						? customText.maxSizeFile + " " + formatBytes(maxFileSize)
						: `Максимальный размер файла: ${formatBytes(maxFileSize)}.`)}
			</>
		);
	};

	return (
		<AttachContainerStyled ref={ref}>
			{!isMaxOverflow && (
				<>
					<AttachLabelStyled>{label}</AttachLabelStyled>
					<AttachDropContainerStyled isError={hasErrors} validityAttach={validityAttach} size={size}>
						<AttachSelectFileButtonStyled
							type="button"
							onClick={handleClickSelectButton}
							disabled={isMaxOverflow || disabled}
						>
							{customText?.selectFiles || "Выберите файл"}
						</AttachSelectFileButtonStyled>
						{size !== "xs" && <> {customText?.dropFileHere || "или переместите его сюда"}</>}
						<AttachHiddenInputStyled
							ref={hiddenInputRef}
							type="file"
							accept={allowedFileTypes.map(v => `.${v}`).join(",")}
							onChange={event => {
								handleChangeFiles(event);
								hiddenInputRef?.current && (hiddenInputRef.current.value = "");
							}}
							multiple={!!maxFiles && maxFiles > 1}
						/>
					</AttachDropContainerStyled>
				</>
			)}
			{isMaxOverflow || (
				<AttachFormatsStyled isError={hasErrors} validityAttach={validityAttach}>
					{hasErrors || validityAttach ? customText?.error : description || <AllowedFileTypes />}
				</AttachFormatsStyled>
			)}
		</AttachContainerStyled>
	);
});
