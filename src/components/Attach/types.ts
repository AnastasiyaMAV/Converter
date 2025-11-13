import { ReactNode, DragEvent } from "react";

export enum ATTACH_VALIDITY {
	ERROR = "ERROR",
	DEFAULT = "DEFAULT",
	WARNING = "WARNING",
	SUCCESS = "SUCCESS",
}

export type TAttachedFile = {
	/**
	 * Имя файла, с расширением
	 */
	name: string;
	/**
	 * Размер файла, в байтах
	 */
	size: number;
	/**
	 * Объект глобального класса - File
	 * Может быть пустым, если передается, как изначально значение
	 * Или есть файл не прошел валидацию (размер, расширение, пр.)
	 */
	file?: File;
	/**
	 * Строка с какой либо ошибкой, выводится под файлом
	 */
	error?: string;
	/**
	 * Процент прогресса, передается извне (0-100)
	 */
	progress?: number;
};

export type TAttachProps = {
	size?: "xs" | "sm" | "md" | "lg";
	label: ReactNode;
	/**
	 * Список файлов, этакий value
	 */
	files?: TAttachedFile[];
	/**
	 * Если передано - рендерит только children, нужно руками добавлять AttachFiles, AttachInput,
	 */
	children?: ReactNode;
	/**
	 * Делает border поля выбора файлов красным
	 */
	isError?: boolean;
	/**
	 * Событие изменения списка файлов
	 * @param files - список файлов
	 * @param eventSource - уточнение события (delete или select)
	 * @returns
	 */
	onChange?: (files: TAttachedFile[], eventSource?: "delete" | "select") => void;
	/**
	 * Максимально возможное кол-во файлов
	 */
	maxFiles?: number;
	/**
	 * Максимальный размер одного файла, в байтах
	 */
	maxFileSize: number;
	/**
	 * Массив строк допустимых к выбору типов файлов
	 */
	allowedFileTypes: string[];
	/**
	 * Кастомный текст для ошибок
	 */
	customText?: {
		error?: string;
		formats?: string;
		maxSize?: string;
		dragContent?: string;
		selectFiles?: string;
		maxSizeFile?: string;
		dropFileHere?: string;
		notAllowedExtension?: string;
	};
	/**
	 * Скрыть кнопку удаления файла
	 */
	disallowFileDeletion?: boolean;
	/**
	 * Условие для добавления файлов через drop
	 * @param onDropProps Можно достать Attact Props или событие DragEvent
	 * @returns Если возвращает false, то файлы не загрузятся
	 */
	onDropCondition?: (onDropProps: { event: DragEvent<HTMLDivElement>; selfProps: TAttachProps }) => boolean;
	disabled?: boolean;
	description?: string;
	/**
	 * Один из доступных типов для компонента AttachInput
	 */
	validityAttach?: ATTACH_VALIDITY;
};
