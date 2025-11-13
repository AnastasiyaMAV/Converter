import { ReactNode } from "react";
import IconImage from "../../assets/image.png";
import IconDocument from "../../assets/doc.png";
import IconMusic from "../../assets/music.png";
import IconPdf from "../../assets/pdf.png";
import IconVideo from "../../assets/video.png";
import IconArchive from "../../assets/archive.png";

export const iconToFileExtensionsMap: [string[], ReactNode][] = [
	[
		["png", "jpeg", "jpg", "gif"],
		<img src={IconImage} style={{ width: "1.875rem", height: "1.875rem" }} key="image" alt="image" />,
	],
	[
		["doc", "docx"],
		<img src={IconDocument} style={{ width: "1.875rem", height: "1.875rem" }} key="document" alt="document" />,
	],
	[
		["mp3", "oog", "wav"],
		<img src={IconMusic} style={{ width: "1.875rem", height: "1.875rem" }} key="music" alt="music" />,
	],
	[["pdf", "csv"], <img src={IconPdf} style={{ width: "1.875rem", height: "1.875rem" }} key="pdf" alt="pdf" />],
	[
		["mp4", "mvk", "avi"],
		<img src={IconVideo} style={{ width: "1.875rem", height: "1.875rem" }} key="video" alt="video" />,
	],
	[
		["zip", "gz", "iso", "rar"],
		<img src={IconArchive} style={{ width: "1.875rem", height: "1.875rem" }} key="archive" alt="archive" />,
	],
];

export const fileTypes = [
	{ id: Number(new Date()) + 1, name: ["png, jpeg, jpg, gif"] },
	{ id: Number(new Date()) + 2, name: ["doc, docx"] },
	{ id: Number(new Date()) + 3, name: ["mp3, oog, wav"] },
	{ id: Number(new Date()) + 4, name: ["pdf, csv"] },
	{ id: Number(new Date()) + 5, name: ["mp4, mvk, avi"] },
	{ id: Number(new Date()) + 6, name: ["zip, gz, iso, rar"] },
];
