import { ReactNode } from "react";
import { InputMask } from "./tools/inputMask";

export type TInputExtraButtonProps = {
	children: ReactNode;
} & React.BaseHTMLAttributes<HTMLElement>;

export type TExtraButtonProps = {
	value: string;
	focused: boolean;
};

export type TInputProps = {
	/**
	 * Размер компонента (по умолчанию "md")
	 */
	size?: "sm" | "md" | "lg" | "xl";
	/**
	 * Тип input поля (по умолчанию "text")
	 */
	type?: "email" | "text" | "password" | "number";
	/**
	 * Подпись/лейбл для поля
	 */
	label?: ReactNode;
	/**
	 * Значение input поля
	 */
	value?: string;
	/**
	 * Элемент, отображаемый перед полем ввода (иконка, текст)
	 */
	prefix?: ReactNode;
	/**
	 * Элемент, отображаемый после поля ввода
	 */
	postfix?: ReactNode;
	/**
	 * Визуальное отображение валидности
	 */
	validity?: "error" | "success" | "warning";
	/**
	 * Колбек при изменении значения
	 */
	onInput?: (value: string) => void;
	/**
	 * Колбек при изменении с исходным событием
	 */
	onInputRaw?: (e: React.FormEvent<HTMLInputElement>) => void;
	/**
	 * Включает возможность копирования значения
	 */
	copyable?: boolean;
	/**
	 * Колбек после успешного копирования
	 */
	onCopied?: () => void;
	/**
	 * Включает кнопку очистки поля
	 */
	clearable?: boolean;
	/**
	 * Колбек после очистки поля
	 */
	onCleared?: () => void;
	/**
	 * Дополнительное описание/подсказка под полем
	 */
	description?: string;
	/**
	 * Настройки маски ввода
	 */
	maskOptions?: {
		mask: InputMask;
		regExp?: Record<string, RegExp>;
		formatValue?: boolean;
	};
	/**
	 * Управляет отображением и поведением лейбла в зависимости от размера input'а
	 */
	defaultLabel?: boolean;
	/**
	 * Массив функций для рендера дополнительных кнопок
	 */
	extraButtons?: ((props: TExtraButtonProps) => React.ReactElement<TInputExtraButtonProps>)[];
	/**
	 * Управляет фоном компонента
	 */
	isOnSecondaryBg?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onInput" | "value" | "size" | "defaultValue">;
