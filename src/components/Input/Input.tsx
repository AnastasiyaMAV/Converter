import IconLock from "../../assets/lock.png";
import IconCross from "../../assets/cross.png";
import IconCheck from "../../assets/check.png";
import IconHidden from "../../assets/hidden.png";
import IconShow from "../../assets/show.png";
import IconCopy from "../../assets/copy.png";
import IconWarning from "../../assets/warning.png";
import IconBackspace from "../../assets/backspace.png";

import React, { cloneElement, forwardRef, useEffect, useImperativeHandle, useState, useMemo } from "react";

import {
	InputContainer,
	InputDescription,
	InputElement,
	InputElementContainer,
	InputElementWrapper,
	InputExtraButton as InputExtraButtonStyled,
	InputExtraButtons,
	InputLabelText,
	InputLength,
	ValidityIcon,
	XLLabel,
} from "./styles";
import { getTextWidth } from "./tools/getTextWidth";
import { formatByMask, createInputMask } from "./tools/inputMask";
import { TInputExtraButtonProps, TInputProps } from "./types";
import { useClipboard } from "@/hooks/useClipboard";

export function InputExtraButton(props: TInputExtraButtonProps) {
	return <InputExtraButtonStyled type="button" {...props} />;
}

export const Input = forwardRef<HTMLInputElement, TInputProps>(function Input(
	{ size, onInputRaw, onCopied, onCleared, maskOptions, defaultLabel, isOnSecondaryBg, ...props },
	ref
) {
	const formatWithMask = (value?: string) => {
		if (!value) return "";
		return maskOptions?.formatValue ? formatByMask(value, maskOptions.mask, maskOptions.regExp) : value;
	};

	const [value, setValue] = useState(formatWithMask(props.value));
	const [focused, setFocused] = useState(false);
	const [inputType, setInputType] = useState(props.type || "text");
	const [passwordOpened, setPasswordOpened] = useState(false);

	const copyText = useClipboard();

	const [innerRef, setInnerRef] = useState<HTMLInputElement | null>(null);

	useEffect(() => {
		props.value !== undefined && setValue(formatWithMask(props.value));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.value]);

	useImperativeHandle(ref, () => innerRef!);

	const handleInput: React.FormEventHandler<HTMLInputElement> = e => {
		const { currentTarget } = e;

		let maskedValue = currentTarget.value;

		if (maskOptions) {
			const { mask, regExp } = maskOptions;
			const maskValue = createInputMask(mask, regExp);
			maskedValue = maskValue(e);
		}

		setValue(maskedValue);

		props.onInput?.(currentTarget.value);
		onInputRaw?.(e);
	};

	const handleCopy = () => {
		value && copyText(value);
		onCopied?.();
	};

	const handleClear = () => {
		setValue("");
		props.onInput?.("");
		onCleared?.();

		if (!innerRef) return;
		const ev = new Event("input", { bubbles: true });
		innerRef.value = "";
		innerRef.dispatchEvent(ev);
	};

	const handleShowPassword = () => {
		setPasswordOpened(v => {
			const nextValue = !v;
			setInputType((["text", "password"][+!nextValue] as TInputProps["type"]) || "text");
			return nextValue;
		});
	};

	const textWidth = useMemo(() => {
		if (!innerRef) return 0;
		return getTextWidth({ ...getComputedStyle(innerRef), text: value.toString() });
	}, [innerRef, value]);

	return (
		<InputContainer>
			{props.label && (defaultLabel ? true : size !== "xl") && (
				<InputLabelText validity={props.validity} size={size}>
					{props.label || props.placeholder || "Начните вводить"}
					{props.disabled && (
						<img src={IconLock} style={{ width: "1.25rem", height: "1.25rem" }} key="lock" alt="lock" />
					)}
				</InputLabelText>
			)}
			<InputElementContainer size={size} validity={props.validity} isOnSecondaryBg={isOnSecondaryBg}>
				<InputElementWrapper>
					{size === "xl" && !defaultLabel && (
						<XLLabel focused={focused} value={value}>
							{props.label}
						</XLLabel>
					)}
					<div style={{ display: "flex", alignItems: "center" }}>
						{props.prefix}
						<InputElement
							{...props}
							ref={setInnerRef}
							type={inputType}
							value={value}
							style={props.postfix ? { flexBasis: textWidth + 4 + "px" } : {}}
							onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => (setFocused(false), props.onBlur?.(e))}
							focused={focused}
							onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => (setFocused(true), props.onFocus?.(e))}
							onInput={handleInput}
							baseSize={size}
							placeholder={
								size === "xl" && !defaultLabel ? (!focused && !value ? "" : props.placeholder) : props.placeholder
							}
							passwordOpened={passwordOpened}
						/>
						{props.postfix}
					</div>
				</InputElementWrapper>

				<InputExtraButtons>
					{props.validity === "error" && (
						<ValidityIcon validity={props.validity}>
							<img src={IconCross} style={{ width: "1.25rem", height: "1.25rem" }} key="cross" alt="cross" />
						</ValidityIcon>
					)}

					{props.validity === "warning" && (
						<ValidityIcon validity={props.validity}>
							<img src={IconWarning} style={{ width: "1.25rem", height: "1.25rem" }} key="warning" alt="warning" />
						</ValidityIcon>
					)}

					{props.validity === "success" && (
						<ValidityIcon validity={props.validity}>
							<img src={IconCheck} style={{ width: "1.25rem", height: "1.25rem" }} key="check" alt="check" />
						</ValidityIcon>
					)}

					{props.type === "password" && value && (
						<InputExtraButton onClick={handleShowPassword}>
							{passwordOpened ? (
								<img src={IconHidden} style={{ width: "1.25rem", height: "1.25rem" }} key="hidden" alt="hidden" />
							) : (
								<img src={IconShow} style={{ width: "1.25rem", height: "1.25rem" }} key="show" alt="show" />
							)}
						</InputExtraButton>
					)}
					{props.copyable && value && (
						<InputExtraButton onClick={handleCopy}>
							<img src={IconCopy} style={{ width: "1.25rem", height: "1.25rem" }} key="copy" alt="copy" />
						</InputExtraButton>
					)}

					{props.clearable && value && (
						<InputExtraButton onClick={handleClear}>
							<img
								src={IconBackspace}
								style={{ width: "1.25rem", height: "1.25rem" }}
								key="backspace"
								alt="backspace"
							/>
						</InputExtraButton>
					)}

					{props.extraButtons &&
						props.extraButtons.map((fn, key) => {
							const component = fn({ value: value || "", focused });
							return cloneElement(component, { ...(component.props || {}), key });
						})}
				</InputExtraButtons>
			</InputElementContainer>
			{(props.maxLength || props.description) && (
				<InputDescription validity={props.validity}>
					{props.description && <span>{props.description}</span>}
					{!props.description && props.maxLength && (
						<InputLength>
							{value?.length || 0} / {props.maxLength}
						</InputLength>
					)}
				</InputDescription>
			)}
		</InputContainer>
	);
});
