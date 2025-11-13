import { ElementType, ReactElement, ReactNode } from "react";
import { T_ELEMENT_POSITION } from "./consts";

export type TSelectSizes = "sm" | "md" | "lg";

export type TSelectOptionProps = {
	/**
	 * Кастомный элемент для рендера
	 */
	as?: ElementType;
	/**
	 * Значение опции
	 */
	value?: unknown | unknown[];
	/**
	 * Дополнительная метка
	 */
	label?: ReactNode;
	/**
	 * Разделитель вместо опции
	 */
	divider?: boolean;
	/**
	 * Обработчик клика
	 */
	onClick?: () => boolean;
	/**
	 * Опция "выбрать все"
	 */
	checkAll?: boolean;
	/**
	 * Определяет основной контент/текст опции, который отображается в выпадающем списке
	 */
	children?: ReactNode;
	/**
	 * Отключенная опция
	 */
	disabled?: boolean;
	/**
	 * Строка для поиска
	 */
	searchIndex?: string;
	/**
	 * Дополнительные дочерние элементы
	 */
	additionalChildren?: ReactNode;
	/**
	 * Строковое представление значения
	 */
	stringRepresentation?: string;
};

export type TSelectChangeEventHandler<T = never> = (values: T[]) => void;

export type TSelectCustomTemplate<T = never> = (args: {
	/**
	 * Заголовок селекта, может быть строкой, React-элементом или любым другим ReactNode
	 */
	label?: ReactNode;
	/**
	 * Текущее состояние открытия выпадающего списка, true - список открыт, false - закрыт
	 */
	opened: boolean;
	/**
	 * Функция для переключения состояния открытия/закрытия, при вызове открывает/закрывает выпадающий список
	 */
	toggleOpen: () => void;
	/**
	 * Текст плейсхолдера (передается из пропса placeholder компонента)
	 */
	placeholder?: string;
	/**
	 * Массив текущих выбранных значений, тип T соответствует типу значений опций
	 */
	currentValues: T[];
}) => ReactNode;

export type TAutocompleteInputHandler = (value: string) => void;

export type TSelectProps = {
	/**
	 * Имя селекта
	 */
	name?: string;
	/**
	 * Размер компонента (по умолчанию "md")
	 */
	size?: TSelectSizes;
	/**
	 * Заголовок селекта
	 */
	label?: ReactNode;
	/**
	 * Текущее значение/значения
	 */
	value?: unknown;
	/**
	 * Опции селекта
	 */
	children: ReactElement<TSelectOptionProps>[];
	/**
	 * Обработчик изменения значения
	 */
	onChange?: TSelectChangeEventHandler;
	/**
	 * Позиция выпадающего списка
	 */
	position?: Extract<T_ELEMENT_POSITION, "top" | "bottom">;
	/**
	 * Отключенное состояние
	 */
	disabled?: boolean;
	/**
	 * Множественный выбор
	 */
	multiply?: boolean;
	/**
	 * Статус валидации
	 */
	validity?: "error";
	/**
	 * Максимальная длина ввода
	 */
	maxLength?: number;
	/**
	 * Возможность очистки значения
	 */
	clearable?: boolean;
	/**
	 * Описание под селектом
	 */
	description?: string;
	/**
	 * Текст плейсхолдера
	 */
	placeholder?: string;
	/**
	 * Колбэк для получения ref списка опций
	 */
	useOptionsRef?: (element: HTMLUListElement | null) => void;
	/**
	 * Режим автодополнения с поиском
	 */
	autocompleted?: boolean;
	/**
	 * Ширина выпадающего списка
	 */
	dropdownWidth?: string;
	/**
	 * Режим чекбоксов вместо галочек
	 */
	checkboxesMode?: boolean;
	/**
	 * Кастомный шаблон отображения
	 */
	customTemplate?: TSelectCustomTemplate;
	/**
	 * Максимальное количество видимых опций (по умолчанию 5)
	 */
	maxVisibleOptions?: number;
	/**
	 * Отключение переноса опций
	 */
	disableOptionsWrap?: boolean;
	/**
	 * Состояние загрузки опций
	 */
	optionsLoading?: boolean;
	/**
	 * Обработчик ввода в режиме автодополнения
	 */
	onAutoCompleteInput?: TAutocompleteInputHandler;
	/**
	 * Динамическое автодополнение
	 */
	dynamicAutocompleted?: boolean;
	/**
	 * Заглушка при отсутствии опций
	 */
	emptyOptionsPlug?: ReactNode;
	/**
	 * Фон компонента
	 */
	isOnSecondaryBg?: boolean;
};

export type TRenameByT<T, U> = {
	[K in keyof U as K extends keyof T ? (T[K] extends string ? T[K] : never) : K]: K extends keyof U ? U[K] : never;
};
