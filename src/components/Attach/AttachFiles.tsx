import {
	AttachFilesContainerStyled,
	AttachFileStyled,
	AttachFileIconStyled,
	AttachFileBodyStyled,
	AttachFileNameStyled,
	AttachFileDescriptionStyled,
	AttachFileRemoveButtonStyled,
} from "@/components/Attach/styles";
import { reduceString, formatBytes } from "@/utils/main";
import { forwardRef, useContext } from "react";

import { iconToFileExtensionsMap } from "./consts";
import IconFileOther from "../../assets/file_other.png";
import IconClose from "../../assets/close.png";
import { AttachContext } from "./AttachContext";
import { ProgressBar } from "../ProgressBar/ProgressBar";

export const AttachFiles = forwardRef<HTMLDivElement>(function AttachFiles(props, ref) {
	const { files, isMaxOverflow, size, disabled, handleRemoveFile, disallowFileDeletion } = useContext(AttachContext);

	return (
		<div ref={ref}>
			{!!files.length && (
				<AttachFilesContainerStyled maxFilesOverflow={isMaxOverflow}>
					{files.map((file, index) => {
						const fileExtension = file.name.split(".").pop();
						const iconFromMap = iconToFileExtensionsMap.find(([extensions]) => extensions.includes(fileExtension!));

						return (
							<AttachFileStyled key={index}>
								<AttachFileIconStyled>
									{iconFromMap?.[1] || (
										<img
											src={IconFileOther}
											style={{ width: "1.25rem", height: "1.25rem" }}
											key="fileOther"
											alt="fileOther"
										/>
									)}
								</AttachFileIconStyled>
								<AttachFileBodyStyled>
									<AttachFileNameStyled>{reduceString(file.name, size === "xs" ? 25 : 45)}</AttachFileNameStyled>

									<AttachFileDescriptionStyled isError={!!file.error}>
										{file.error || formatBytes(file.size)}
									</AttachFileDescriptionStyled>

									{file.progress !== undefined && (
										<div style={{ marginTop: 6 }}>
											<ProgressBar displayType="linear" size="sm" valueMax={100} valueNow={file.progress} />
										</div>
									)}
								</AttachFileBodyStyled>
								{disallowFileDeletion || (
									<AttachFileRemoveButtonStyled
										type="button"
										onClick={() => handleRemoveFile(index)}
										disabled={disabled}
									>
										<img src={IconClose} style={{ width: "1.25rem", height: "1.25rem" }} key="close" alt="close" />
									</AttachFileRemoveButtonStyled>
								)}
							</AttachFileStyled>
						);
					})}
				</AttachFilesContainerStyled>
			)}
		</div>
	);
});
