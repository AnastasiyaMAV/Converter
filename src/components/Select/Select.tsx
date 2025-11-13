import {
	FormEventHandler,
	Fragment,
	MouseEventHandler,
	forwardRef,
	useCallback,
	useMemo,
	useRef,
	useState,
	useEffect,
} from "react";
import { createPortal } from "react-dom";

import { Divider } from "../Divider/Divider";

import { Spinner } from "../Spinner/Spinner";
import {
	ExtraButtonsContainer,
	InputContainer,
	InputElementWrapper,
	SelectDescription,
	SelectElement,
	SelectInputElement,
	SelectLabelText,
	SelectOptionLabelStyled,
	SelectOptionListButtonContentStyled,
	SelectOptionListButtonStyled,
	SelectOptionListItemStyled,
	SelectOptionsListStyled,
	SelectStyledArrowButton,
	SelectStyledPlaceholder,
	SelectValidityIcon,
	SelectWrapper,
} from "./styles";
import { Highlighted } from "./Highlighted";
import { TSelectOptionProps, TSelectProps } from "./types";

import { useEffectOnce } from "@/hooks/useEffectOnce";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useDropdownPosition } from "@/hooks/useDropdownPosition";
import { debounce } from "@/utils/main";
import { isEqual } from "@react-hookz/deep-equal";

import IconLock from "../../assets/lock.png";
import IconCheck from "../../assets/check.png";
import IconBackspace from "../../assets/backspace.png";
import IconChevronDown from "../../assets/chevronDown.png";
import IconInfo from "../../assets/info.png";
import IconWarning from "../../assets/warning.png";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SelectOption = (_: TSelectOptionProps) => {
	return <Fragment />;
};

export const Select = forwardRef<HTMLDivElement, TSelectProps>(function Select(
	{
		size = "md",
		name,
		children,
		multiply,
		validity,
		position = "bottom",
		placeholder,
		useOptionsRef,
		autocompleted,
		checkboxesMode,
		customTemplate,
		maxVisibleOptions = 5,
		onAutoCompleteInput,
		dynamicAutocompleted,
		isOnSecondaryBg,
		maxLength,
		...props
	},
	ref
) {
	// Режим автодополнения и режим динамического автодополнения имеют одинаковую логику
	autocompleted = autocompleted || dynamicAutocompleted;

	const inputRef = useRef<HTMLInputElement>(null);
	const inputContainerRef = useRef<HTMLSpanElement>(null);
	const selectContainerRef = useRef<HTMLDivElement>(null);
	const optionsContainerRef = useRef<HTMLUListElement>(null);

	const { css, calculate } = useDropdownPosition(
		selectContainerRef as React.RefObject<HTMLElement>,
		optionsContainerRef as React.RefObject<HTMLElement>,
		position,
		0,
		true
	);

	const [isFocused, setIsFocused] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const chipOverflowRef = useRef<HTMLParagraphElement>(null);

	const handleToggleDropDown = useCallback(() => {
		if (dynamicAutocompleted) return;
		setIsDropDownOpen(v => !v);
		calculate();
	}, [calculate, dynamicAutocompleted]);

	const triggerAutoCompleteInputDebounce = useMemo(
		() => debounce((value: string) => onAutoCompleteInput?.(value), 300),
		[onAutoCompleteInput]
	);

	const handleInput: FormEventHandler<HTMLInputElement> = useCallback(
		({ currentTarget }) => {
			setSearchValue(currentTarget.value);
			if (!dynamicAutocompleted) return calculate();

			triggerAutoCompleteInputDebounce(currentTarget.value);
			setSearchValue(currentTarget.value);

			if (currentTarget.value) {
				setIsDropDownOpen(true);
				queueMicrotask(() => calculate());
			}
		},
		[calculate, dynamicAutocompleted, triggerAutoCompleteInputDebounce]
	);

	const handleClear: MouseEventHandler<HTMLElement> = useCallback(
		event => {
			event.stopPropagation();
			setSearchValue("");
			if (inputRef.current) inputRef.current.value = "";
			props.onChange?.([]);
			onAutoCompleteInput?.("");
			calculate();
		},
		[calculate, onAutoCompleteInput, props]
	);

	const outSideClickHandler = useCallback((event: Event) => {
		const isTargetSelectContainer = optionsContainerRef.current === event.target;
		const isTargetSelectContainerChild = optionsContainerRef.current?.contains(event.target as Node | null);

		if (isTargetSelectContainer || isTargetSelectContainerChild) return;

		setIsDropDownOpen(false);
	}, []);

	useOnClickOutside(selectContainerRef as React.RefObject<HTMLElement>, outSideClickHandler);

	const handleBlurInput = useCallback(() => {
		if (!dynamicAutocompleted) return;
		setIsFocused(false);
	}, [dynamicAutocompleted]);

	const handleFocusInput = useCallback(() => {
		if (!dynamicAutocompleted) return;
		setIsFocused(true);
	}, [dynamicAutocompleted]);

	const handleOptionsListRef = useCallback(
		(element: HTMLUListElement) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useOptionsRef?.(element);
			optionsContainerRef.current = element;
		},
		[useOptionsRef]
	);

	const isSelectedValue = useCallback(
		(value: unknown) => {
			if (Array.isArray(props.value)) {
				return props.value.some(v => isEqual(v, value));
			}

			return isEqual(props.value, value);
		},
		[props.value]
	);

	const selectedOptions = useMemo(
		() => children.filter(v => !v.props.divider || !v.props.checkAll).filter(v => isSelectedValue(v.props.value)),
		[children, isSelectedValue]
	);

	useEffectOnce(() => {
		if (!chipOverflowRef.current) return;

		let { width: initialWidth } = chipOverflowRef.current.getBoundingClientRect();

		const observer = new ResizeObserver(([alo]) => {
			document.body.style.setProperty("--chip-w", `${alo.contentRect.width + 4}px`);

			if (alo.contentRect.width !== initialWidth) {
				initialWidth = alo.contentRect.width;
			}
		});

		observer.observe(chipOverflowRef.current);

		return () => observer.disconnect();
	});

	useEffect(() => {
		if (!autocompleted || multiply || !selectedOptions.length || !inputRef.current) return;
		inputRef.current.value = selectedOptions[0].props.stringRepresentation || "";
	}, [autocompleted, multiply, selectedOptions]);

	useEffect(() => {
		if (autocompleted && !selectedOptions.length && inputRef.current) {
			inputRef.current.value = "";
		}
	}, [autocompleted, selectedOptions.length]);

	const notSelectableItemsCount = useMemo(
		() =>
			children.reduce((acc, v) => {
				if (v.props.divider || v.props.checkAll) acc++;
				return acc;
			}, 0),
		[children]
	);

	const toggleSelected = (optionProps: TSelectOptionProps) => {
		if (inputRef.current) inputRef.current.value = optionProps.stringRepresentation!;

		if (!multiply) {
			props.onChange?.([optionProps.value as never]);
			setIsDropDownOpen(false);
			return;
		}

		let values = [...((props.value || []) as never[])];
		const hasThisValue = values.some(v => isEqual(v, optionProps.value));

		if (!multiply) {
			props.onChange?.(hasThisValue ? [] : [optionProps.value as never]);
			setIsDropDownOpen(false);
			return;
		}

		if (!hasThisValue) {
			values.push(optionProps.value as never);
		}
		if (hasThisValue) {
			values = values.filter(v => !isEqual(v, optionProps.value));
		}

		if (optionProps.checkAll) {
			values =
				(Array.isArray(props.value) ? props.value : [props.value]).length === children.length - notSelectableItemsCount
					? []
					: children
							.filter(v => !v.props.checkAll)
							.filter(v => !v.props.divider)
							.map(v => v.props.value as never);
		}

		props.onChange?.(values);
		queueMicrotask(calculate);
	};

	const childrenForUse = useMemo(() => {
		if (!autocompleted || !searchValue) return children;
		return children.filter(v =>
			(v.props.searchIndex || v.props.stringRepresentation)?.toLowerCase()?.includes(searchValue.toLowerCase())
		);
	}, [autocompleted, children, searchValue]);

	return (
		<Fragment>
			<SelectWrapper name={name} ref={ref} disabled={props.disabled}>
				{!customTemplate && props.label && (
					<SelectLabelText size={size} validity={validity}>
						{props.label}
						{props.disabled && (
							<img src={IconLock} style={{ width: "1.25rem", height: "1.25rem" }} key="lock" alt="lock" />
						)}
					</SelectLabelText>
				)}

				{!!customTemplate && (
					<div ref={selectContainerRef}>
						{customTemplate({
							label: props.label,
							opened: isDropDownOpen,
							toggleOpen: handleToggleDropDown,
							placeholder,
							currentValues: selectedOptions.map(v => v.props.value as never),
						})}
					</div>
				)}

				{!!customTemplate || (
					<InputContainer
						ref={selectContainerRef}
						size={size}
						opened={isDropDownOpen}
						onClick={handleToggleDropDown}
						validity={validity}
						multiply={multiply}
						isOnSecondaryBg={isOnSecondaryBg}
					>
						<InputElementWrapper disableOptionsWrap={props.disableOptionsWrap} size={size} ref={inputContainerRef}>
							{(autocompleted && (
								<Fragment>
									{multiply &&
										selectedOptions.map((option, key) => (
											<SelectElement size={size} key={key}>
												{option.props.children}
												{selectedOptions.length > 1 && key !== selectedOptions.length - 1 && ","}
											</SelectElement>
										))}
									<SelectInputElement
										maxLength={maxLength}
										ref={inputRef}
										defaultValue={
											selectedOptions.length && !multiply ? selectedOptions[0].props.stringRepresentation : undefined
										}
										type="text"
										onBlur={handleBlurInput}
										onFocus={handleFocusInput}
										onInput={handleInput}
										placeholder={placeholder || "Начните вводить"}
									/>
								</Fragment>
							)) || (
								<Fragment>
									{!!selectedOptions.length || (
										<SelectStyledPlaceholder>{placeholder || "Выберите значение"}</SelectStyledPlaceholder>
									)}
									{selectedOptions.map((option, key) => {
										return (
											<SelectElement size={size} key={key} data-testid="select-value">
												{option.props.children}
												{selectedOptions.length > 1 && key !== selectedOptions.length - 1 && ","}
											</SelectElement>
										);
									})}
								</Fragment>
							)}
						</InputElementWrapper>
						<ExtraButtonsContainer>
							{props.optionsLoading && (
								<SelectValidityIcon disabled={props.disabled}>
									<Spinner />
								</SelectValidityIcon>
							)}

							{props.clearable && !!selectedOptions.length && (
								<SelectValidityIcon onClick={handleClear}>
									<img
										src={IconBackspace}
										style={{ width: "1.25rem", height: "1.25rem" }}
										key="backspace"
										alt="backspace"
									/>
								</SelectValidityIcon>
							)}

							{props.disabled && !selectedOptions.length && (
								<SelectValidityIcon disabled={props.disabled}>
									<img src={IconInfo} style={{ width: "1.25rem", height: "1.25rem" }} key="info" alt="info" />
								</SelectValidityIcon>
							)}

							{validity === "error" && (
								<SelectValidityIcon validity={validity}>
									<img src={IconWarning} style={{ width: "1.25rem", height: "1.25rem" }} key="warning" alt="warning" />
								</SelectValidityIcon>
							)}
						</ExtraButtonsContainer>
						{dynamicAutocompleted || (
							<SelectStyledArrowButton opened={isDropDownOpen}>
								<img
									src={IconChevronDown}
									style={{ width: "1.25rem", height: "1.25rem" }}
									key="chevronDown"
									alt="chevronDown"
								/>
							</SelectStyledArrowButton>
						)}
					</InputContainer>
				)}
			</SelectWrapper>

			{props.description && <SelectDescription validity={validity}>{props.description}</SelectDescription>}

			{isDropDownOpen &&
				createPortal(
					<Fragment>
						{!children.length &&
							dynamicAutocompleted &&
							searchValue &&
							isFocused &&
							!props.optionsLoading &&
							props.emptyOptionsPlug && (
								<div
									style={{
										position: "absolute",
										width: (selectContainerRef?.current?.offsetWidth || 0) + "px",
										...(css || {}),
									}}
								>
									{props.emptyOptionsPlug}
								</div>
							)}

						<SelectOptionsListStyled
							ref={handleOptionsListRef}
							size={size}
							style={{ ...css, width: props.dropdownWidth || selectContainerRef?.current?.offsetWidth + "px" }}
							position={position}
							maxVisibleOptions={maxVisibleOptions}
						>
							{childrenForUse.map((option, idx) => {
								if (option.props.divider) {
									return (
										<div style={{ marginLeft: "0.75rem", marginRight: "0.75rem" }} key={idx}>
											<Divider />
										</div>
									);
								}

								const isSelected = isSelectedValue(option.props.value);

								return (
									<SelectOptionListItemStyled key={idx}>
										<SelectOptionListButtonStyled
											as={option.props.as}
											size={size}
											onClick={() =>
												option.props.onClick
													? option.props.onClick() && toggleSelected(option.props)
													: toggleSelected(option.props)
											}
											selected={isSelected}
											disabled={option.props.disabled}
										>
											<SelectOptionListButtonContentStyled size={size}>
												<span>
													{dynamicAutocompleted ? (
														<Highlighted text={option.props.children as string} highlight={searchValue} />
													) : (
														option.props.children
													)}
												</span>
												{option.props.label && (
													<SelectOptionLabelStyled>
														{dynamicAutocompleted ? (
															<Highlighted text={option.props.label} highlight={searchValue} />
														) : (
															option.props.label
														)}
													</SelectOptionLabelStyled>
												)}
											</SelectOptionListButtonContentStyled>
											{isSelected && !checkboxesMode ? (
												<img src={IconCheck} style={{ width: "1.25rem", height: "1.25rem" }} key="check" alt="check" />
											) : (
												<span style={{ width: { sm: "1rem", md: "1rem", lg: "1.5rem" }[size] }} />
											)}
										</SelectOptionListButtonStyled>
									</SelectOptionListItemStyled>
								);
							})}
						</SelectOptionsListStyled>
					</Fragment>,
					document.body
				)}
		</Fragment>
	);
});
