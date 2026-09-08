import { Polymorphic } from "../polymorphic/index.js";
import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { a as createFormControl, i as FORM_CONTROL_PROP_NAMES, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/BQ1mcKaU.js";
import { t as FormControlErrorMessage } from "../form-control-error-message/D9jUVumc.js";
import { t as FormControlLabel } from "../form-control-label/DqQ24y8m.js";
import { createComponent, isServer, mergeProps, template } from "@solidjs/web";
import { Show, createContext, createEffect, createMemo, createRenderEffect, createSignal, createUniqueId, flush, merge, omit, onSettled, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { callHandler } from "@kobalte/utils";
import { createFormResetListener } from "@solid-primitives/form";
//#region src/otp-field/otp-field-description.tsx
function OTPFieldDescription(props) {
	return createComponent(FormControlDescription, props);
}
//#endregion
//#region src/otp-field/otp-field-error-message.tsx
function OTPFieldErrorMessage(props) {
	return createComponent(FormControlErrorMessage, props);
}
//#endregion
//#region src/otp-field/otp-field-context.tsx
const OTPFieldContext = createContext();
function useOTPFieldContext() {
	const context = useContext(OTPFieldContext);
	if (context === void 0) throw new Error("[kobalte]: `useOTPFieldContext` must be used within an `OTPField` component");
	return context;
}
//#endregion
//#region src/otp-field/otp-field-style.ts
let styleElement = null;
let activeCount = 0;
function createOTPFieldStyleElement() {
	activeCount += 1;
	if (!styleElement) {
		styleElement = document.createElement("style");
		document.head.appendChild(styleElement);
		const autofillStyle = "background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";
		styleElement.innerHTML = `
    [data-kb-otp-field-input]::selection { background: transparent !important; color: transparent !important; }
    [data-kb-otp-field-input]:autofill { ${autofillStyle} }
    [data-kb-otp-field-input]:-webkit-autofill { ${autofillStyle} }
    @supports (-webkit-touch-callout: none) { [data-kb-otp-field-input] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }
    [data-kb-otp-field-input] + * { pointer-events: all !important; }
  `;
	}
	return () => {
		activeCount -= 1;
		if (activeCount === 0 && styleElement) {
			styleElement.remove();
			styleElement = null;
		}
	};
}
const DEFAULT_NOSCRIPT_CSS_FALLBACK = `
[data-kb-otp-field-input] {
  color: black !important;
  background-color: white !important;
  caret-color: black !important;
  letter-spacing: inherit !important;
  text-align: center !important;
  border: 1px solid black !important;
  width: 100% !important;
  font-size: inherit !important;
  clip-path: none !important;
}
`;
//#endregion
//#region src/otp-field/otp-field-input.tsx
var _tmpl$ = /*#__PURE__*/ template(`<noscript>`);
function OTPFieldInput(props) {
	const mergedProps = merge({
		pattern: "^\\d*$",
		noScriptCSSFallback: DEFAULT_NOSCRIPT_CSS_FALLBACK
	}, props);
	const others = omit(mergedProps, "ref", "pattern", "noScriptCSSFallback", "onInput", "onFocus", "onBlur", "onMouseOver", "onMouseLeave", "onKeyDown", "onKeyUp", "style");
	const previousSelection = {
		inserting: false,
		start: null,
		end: null
	};
	let shiftKeyDown = false;
	const [inputRef, setInputRef] = createSignal(void 0, { ownedWrite: true });
	const context = useOTPFieldContext();
	const formControlContext = useFormControlContext();
	onSettled(() => {
		const cleanupStyle = createOTPFieldStyleElement();
		const handler = () => onSelectionChange();
		document.addEventListener("selectionchange", handler);
		const el = inputRef();
		const onCopy = (e) => {
			if (!formControlContext.isReadOnly()) return;
			e.clipboardData?.setData("text/plain", context.value());
			e.preventDefault();
		};
		el?.addEventListener("copy", onCopy);
		return () => {
			cleanupStyle();
			document.removeEventListener("selectionchange", handler);
			el?.removeEventListener("copy", onCopy);
		};
	});
	onSettled(() => {
		const el = inputRef();
		if (!el) return;
		const form = el.form;
		if (!form) return;
		const onReset = () => {
			requestAnimationFrame(() => {
				context.setValue(el.value);
			});
		};
		form.addEventListener("reset", onReset);
		return () => form.removeEventListener("reset", onReset);
	});
	createRenderEffect(() => context.value(), (value) => {
		const el = inputRef();
		if (!el) return;
		el.value = value;
	});
	const patternRegex = createMemo(() => mergedProps.pattern !== null ? new RegExp(mergedProps.pattern) : void 0);
	const onInput = (event) => {
		callHandler(event, mergedProps.onInput);
		if (event.defaultPrevented) return;
		if (formControlContext.isReadOnly() || formControlContext.isDisabled()) {
			event.currentTarget.value = context.value();
			return;
		}
		const rawValue = event.currentTarget.value;
		let finalValue = rawValue;
		const contextValue = context.value();
		const selectionSize = Math.abs((previousSelection.start ?? 0) - (previousSelection.end ?? 0));
		const regex = patternRegex();
		if ((previousSelection.inserting || selectionSize === contextValue.length) && regex) finalValue = finalValue.replace(new RegExp(`[^${regex.source}]`, "g"), "");
		finalValue = finalValue.slice(0, context.maxLength());
		const hasInvalidChars = !!regex && !regex.test(finalValue);
		if (rawValue.length !== 0 && finalValue.length === 0 || finalValue === contextValue || hasInvalidChars) {
			event.preventDefault();
			event.currentTarget.value = contextValue;
			if (hasInvalidChars) event.currentTarget.setSelectionRange(previousSelection.start ?? 0, previousSelection.end ?? 0);
			return;
		}
		if (finalValue.length < contextValue.length) onSelectionChange(event.inputType);
		context.setValue(finalValue);
	};
	const onFocus = (event) => {
		callHandler(event, mergedProps.onFocus);
		if (event.defaultPrevented) return;
		if (formControlContext.isReadOnly()) {
			context.setIsFocused(true);
			flush();
			event.currentTarget.setSelectionRange(0, context.value().length);
			onSelectionChange();
		} else {
			event.currentTarget.setSelectionRange(context.value().length, context.value().length);
			context.setIsFocused(true);
			onSelectionChange();
		}
	};
	const onBlur = (event) => {
		callHandler(event, mergedProps.onBlur);
		if (event.defaultPrevented) return;
		shiftKeyDown = false;
		context.setIsFocused(false);
		onSelectionChange();
	};
	const onMouseOver = (event) => {
		callHandler(event, mergedProps.onMouseOver);
		if (!event.defaultPrevented) context.setIsHovered(true);
	};
	const onMouseLeave = (event) => {
		callHandler(event, mergedProps.onMouseLeave);
		if (!event.defaultPrevented) context.setIsHovered(false);
	};
	const onKeyDown = (event) => {
		callHandler(event, mergedProps.onKeyDown);
		if (event.defaultPrevented) return;
		if (event.key === "Shift") shiftKeyDown = true;
	};
	const onKeyUp = (event) => {
		callHandler(event, mergedProps.onKeyUp);
		if (event.defaultPrevented) return;
		if (event.key === "Shift") shiftKeyDown = false;
	};
	const onSelectionChange = (inputType) => {
		const el = inputRef();
		if (!el) return;
		if (!context.isFocused() || document.activeElement !== el || el.selectionStart === null || el.selectionEnd === null) {
			syncSelection({
				start: null,
				end: null,
				inserting: false,
				originalStart: el.selectionStart,
				originalEnd: el.selectionEnd
			});
			context.setIsInserting(false);
			return;
		}
		if (formControlContext.isReadOnly()) {
			context.setActiveSlots(Array.from({ length: context.value().length }, (_, i) => i));
			return;
		}
		const maxLength = context.maxLength();
		const inserting = el.value.length < maxLength && el.selectionStart === el.value.length;
		context.setIsInserting(inserting);
		if (inserting || el.selectionStart !== el.selectionEnd) {
			syncSelection({
				start: el.selectionStart,
				end: inserting ? el.selectionEnd + 1 : el.selectionEnd,
				inserting,
				originalStart: el.selectionStart,
				originalEnd: el.selectionEnd
			});
			return;
		}
		let selectionStart = 0;
		let selectionEnd = 0;
		let direction;
		if (el.selectionStart === 0) {
			selectionStart = 0;
			selectionEnd = 1;
			direction = "forward";
		} else if (el.selectionStart === maxLength) {
			selectionStart = maxLength - 1;
			selectionEnd = maxLength;
			direction = "backward";
		} else {
			let startOffset = 0;
			let endOffset = 1;
			if (previousSelection.start !== null && previousSelection.end !== null) {
				const navigatedBackwards = el.selectionStart < previousSelection.end && Math.abs(previousSelection.start - previousSelection.end) === 1;
				direction = navigatedBackwards ? "backward" : "forward";
				if (navigatedBackwards && !previousSelection.inserting && inputType !== "deleteContentForward" || !navigatedBackwards && shiftKeyDown) startOffset += -1;
			}
			if (shiftKeyDown && inputType === void 0) endOffset += 1;
			selectionStart = el.selectionStart + startOffset;
			selectionEnd = el.selectionEnd + startOffset + endOffset;
		}
		el.setSelectionRange(selectionStart, selectionEnd, direction);
		syncSelection({
			start: selectionStart,
			end: selectionEnd,
			inserting,
			originalStart: el.selectionStart,
			originalEnd: el.selectionEnd
		});
	};
	const syncSelection = (update) => {
		previousSelection.inserting = update.inserting;
		previousSelection.start = update.originalStart;
		previousSelection.end = update.originalEnd;
		if (update.start === null || update.end === null) {
			context.setActiveSlots([]);
			return;
		}
		context.setActiveSlots(Array.from({ length: update.end - update.start }, (_, i) => update.start + i));
	};
	const inputStyle = () => ({
		display: "flex",
		position: "absolute",
		inset: "0",
		width: context.shiftPWManagers() ? "calc(100% + 40px)" : "100%",
		"clip-path": context.shiftPWManagers() ? "inset(0 40px 0 0)" : void 0,
		height: "100%",
		padding: "0",
		color: "transparent",
		background: "transparent",
		"caret-color": "transparent",
		border: "0 solid transparent",
		outline: "0 solid transparent",
		"box-shadow": "none",
		"line-height": "1",
		"letter-spacing": "-1em",
		"font-family": "monospace",
		"font-variant-numeric": "tabular-nums",
		"font-size": `${context.rootHeight() ?? 40}px`,
		"pointer-events": "all"
	});
	const resolvedStyle = () => {
		const userStyle = mergedProps.style;
		if (!userStyle || typeof userStyle === "string") return inputStyle();
		return {
			...inputStyle(),
			...userStyle
		};
	};
	return [createComponent(Show, {
		get when() {
			return mergedProps.noScriptCSSFallback !== null && isServer;
		},
		get children() {
			return _tmpl$();
		}
	}), createComponent(Polymorphic, mergeProps({
		as: "input",
		ref: [(el) => {
			setInputRef(el);
			el.value = context.value();
		}, mergedProps.ref],
		onInput,
		onFocus,
		onBlur,
		onMouseOver,
		onMouseLeave,
		onKeyDown,
		onKeyUp,
		inputMode: "numeric",
		autocomplete: "one-time-code",
		spellcheck: false,
		get style() {
			return resolvedStyle();
		},
		get pattern() {
			return patternRegex()?.source;
		},
		"data-kb-otp-field-input": "",
		get disabled() {
			return formControlContext.isDisabled();
		},
		get readonly() {
			return formControlContext.isReadOnly();
		},
		get ["aria-required"]() {
			return formControlContext.isRequired() ? "true" : void 0;
		},
		get ["aria-disabled"]() {
			return formControlContext.isDisabled() ? "true" : void 0;
		},
		get ["aria-readonly"]() {
			return formControlContext.isReadOnly() ? "true" : void 0;
		},
		get ["aria-invalid"]() {
			return formControlContext.validationState() === "invalid" ? "true" : void 0;
		}
	}, others))];
}
//#endregion
//#region src/otp-field/otp-field-label.tsx
function OTPFieldLabel(props) {
	return createComponent(FormControlLabel, props);
}
//#endregion
//#region src/otp-field/otp-field-root.tsx
function OTPFieldRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const defaultId = `otpfield-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		shiftPWManagers: true
	}, props);
	const others = omit(mergedProps, "ref", "style", "maxLength", "value", "defaultValue", "onChange", "onComplete", "shiftPWManagers", ...FORM_CONTROL_PROP_NAMES);
	const initialIsControlled = mergedProps.value !== void 0;
	const [value, setValueRaw] = (0, primitives_exports.createControllableSignal)({
		value: () => initialIsControlled ? mergedProps.value ?? "" : void 0,
		defaultValue: () => mergedProps.defaultValue ?? "",
		onChange: (v) => mergedProps.onChange?.(v)
	});
	const setValue = (v) => setValueRaw(v);
	const { formControlContext } = createFormControl(mergedProps);
	const [rootHeight, setRootHeight] = createSignal(null);
	onSettled(() => {
		const el = ref();
		if (!el) return;
		setRootHeight(el.getBoundingClientRect().height);
		const observer = new ResizeObserver((entries) => {
			setRootHeight(entries[0]?.contentRect.height ?? null);
		});
		observer.observe(el);
		return () => observer.disconnect();
	});
	createEffect(() => value() ?? "", (v) => {
		if (v.length === mergedProps.maxLength) mergedProps.onComplete?.(v);
	});
	createFormResetListener(ref, () => setValue(mergedProps.defaultValue ?? ""));
	const [isFocused, setIsFocused] = createSignal(false);
	const [isHovered, setIsHovered] = createSignal(false);
	const [isInserting, setIsInserting] = createSignal(false);
	const [activeSlots, setActiveSlots] = createSignal([]);
	const baseStyle = {
		position: "relative",
		"user-select": "none",
		"-webkit-user-select": "none",
		"pointer-events": "none"
	};
	const resolvedStyle = () => {
		const userStyle = mergedProps.style;
		if (!userStyle || typeof userStyle === "string") return baseStyle;
		return {
			...baseStyle,
			...userStyle
		};
	};
	const context = {
		value: () => value() ?? "",
		isFocused,
		isHovered,
		isInserting,
		maxLength: () => mergedProps.maxLength,
		activeSlots,
		shiftPWManagers: () => mergedProps.shiftPWManagers ?? true,
		rootHeight,
		generateId: (suffix) => `${access(mergedProps.id)}-${suffix}`,
		setValue,
		setIsFocused,
		setIsHovered,
		setIsInserting,
		setActiveSlots
	};
	return createComponent(FormControlContext, {
		value: formControlContext,
		get children() {
			return createComponent(OTPFieldContext, {
				value: context,
				get children() {
					return createComponent(Polymorphic, mergeProps({
						as: "div",
						ref: [setRef, mergedProps.ref],
						get style() {
							return resolvedStyle();
						},
						role: "group",
						get id() {
							return access(mergedProps.id);
						},
						"data-kb-otp-field-root": ""
					}, () => formControlContext.dataset(), others));
				}
			});
		}
	});
}
//#endregion
//#region src/otp-field/index.tsx
const OTPField = Object.assign(OTPFieldRoot, {
	Description: OTPFieldDescription,
	ErrorMessage: OTPFieldErrorMessage,
	Input: OTPFieldInput,
	Label: OTPFieldLabel
});
//#endregion
export { OTPFieldDescription as Description, OTPFieldErrorMessage as ErrorMessage, OTPFieldInput as Input, OTPFieldLabel as Label, OTPField, OTPFieldRoot as Root, useOTPFieldContext };
