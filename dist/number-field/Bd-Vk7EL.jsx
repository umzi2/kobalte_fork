import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { Polymorphic } from "../polymorphic/index.jsx";
import { t as primitives_exports } from "../primitives/BlSoAAAV.jsx";
import { n as button_exports } from "../button/Cw4fT4wG.jsx";
import { useLocale } from "../i18n/index.jsx";
import { n as announce, r as clearAnnouncer } from "../live-announcer/DugqoFo-.jsx";
import { a as createFormControl, i as FORM_CONTROL_PROP_NAMES, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/Dc7vmdKW.jsx";
import { n as createFormControlField } from "../create-form-control-field/5-BHfdGI.jsx";
import { t as FormControlErrorMessage } from "../form-control-error-message/B1cNIdVV.jsx";
import { t as FormControlLabel } from "../form-control-label/Czoesrj9.jsx";
import { t as SPIN_BUTTON_INTL_TRANSLATIONS } from "../spin-button.intl/2mELFbs9.jsx";
import { combineStyle } from "@solid-primitives/props";
import { createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, untrack, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { callHandler, composeEventHandlers, getPrecision, snapValueToStep, visuallyHiddenStyles } from "@kobalte/utils";
import { NumberFormatter, NumberParser } from "@internationalized/number";
import { createFormResetListener } from "@solid-primitives/form";
//#region src/number-field/number-field-context.tsx
const NumberFieldContext = createContext();
function useNumberFieldContext() {
	const context = useContext(NumberFieldContext);
	if (context === void 0) throw new Error("[kobalte]: `useNumberFieldContext` must be used within a `NumberField` component");
	return context;
}
//#endregion
//#region src/number-field/number-field-vary-trigger.tsx
function NumberFieldVaryTrigger(props) {
	const formControlContext = useFormControlContext();
	const context = useNumberFieldContext();
	const others = omit(props, "numberFieldVaryType", "onClick");
	return <button_exports.Root tabindex={-1} disabled={formControlContext.isDisabled() || context.rawValue() === (props.numberFieldVaryType === "increment" ? context.maxValue() : context.minValue())} aria-controls={formControlContext.fieldId()} onClick={(e) => {
		callHandler(e, props.onClick);
		context.varyValue(context.step() * (props.numberFieldVaryType === "increment" ? 1 : -1));
		context.inputRef()?.focus({ preventScroll: true });
	}} {...others} />;
}
//#endregion
//#region src/number-field/number-field-decrement-trigger.tsx
function NumberFieldDecrementTrigger(props) {
	return <NumberFieldVaryTrigger numberFieldVaryType="decrement" {...props} />;
}
//#endregion
//#region src/number-field/number-field-hidden-input.tsx
function NumberFieldHiddenInput(props) {
	const context = useNumberFieldContext();
	const others = omit(props, "ref", "onChange");
	const formControlContext = useFormControlContext();
	return <div style={visuallyHiddenStyles} aria-hidden="true">
			<input ref={(el) => {
		context.setHiddenInputRef(el);
		if (typeof props.ref === "function") props.ref(el);
	}} type="text" tabindex={-1} style={{ "font-size": "16px" }} name={formControlContext.name()} value={Number.isNaN(context.rawValue()) ? "" : context.rawValue()} required={formControlContext.isRequired()} disabled={formControlContext.isDisabled()} readonly={formControlContext.isReadOnly()} onChange={(e) => {
		callHandler(e, props.onChange);
		context.setValue(e.target.value);
		context.format();
	}} {...others} />
		</div>;
}
//#endregion
//#region src/number-field/number-field-increment-trigger.tsx
function NumberFieldIncrementTrigger(props) {
	return <NumberFieldVaryTrigger numberFieldVaryType="increment" {...props} />;
}
//#endregion
//#region src/number-field/number-field-input.tsx
function NumberFieldInput(props) {
	const formControlContext = useFormControlContext();
	const context = useNumberFieldContext();
	const mergedProps = merge({
		id: context.generateId("input"),
		inputMode: "decimal",
		autocomplete: "off",
		autocorrect: "off",
		spellcheck: false,
		translations: SPIN_BUTTON_INTL_TRANSLATIONS
	}, props);
	const formControlFieldProps = omit(mergedProps, "ref", "onInput", "onChange", "onWheel", "onKeyDown", "onFocus", "onBlur", "as", "inputMode", "autocomplete", "autocorrect", "spellcheck", "translations");
	const others = omit(mergedProps, "ref", "style", "onInput", "onChange", "onWheel", "onKeyDown", "onFocus", "onBlur", "as", "id", "aria-label", "aria-labelledby", "aria-describedby", "translations");
	const { fieldProps } = createFormControlField(formControlFieldProps);
	let isFocused = false;
	const textValue = createMemo(() => {
		const tv = context.textValue();
		if (tv === "") return mergedProps.translations?.empty;
		return (tv || `${context.value()}`).replace("-", "−");
	});
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || formControlContext.isReadOnly()) return;
		switch (e.key) {
			case "PageUp":
				e.preventDefault();
				context.varyValue(context.largeStep());
				break;
			case "ArrowUp":
			case "Up":
				e.preventDefault();
				context.varyValue(context.step());
				break;
			case "PageDown":
				e.preventDefault();
				context.varyValue(-context.largeStep());
				break;
			case "ArrowDown":
			case "Down":
				e.preventDefault();
				context.varyValue(-context.step());
				break;
			case "Home":
				e.preventDefault();
				context.setValue(context.minValue());
				break;
			case "End":
				e.preventDefault();
				context.setValue(context.maxValue());
		}
	};
	const onFocus = (e) => {
		callHandler(e, mergedProps.onFocus);
		isFocused = true;
	};
	const onBlur = (e) => {
		callHandler(e, mergedProps.onBlur);
		isFocused = false;
	};
	createEffect(() => textValue(), (tv) => {
		if (isFocused) {
			clearAnnouncer("assertive");
			announce(tv ?? "", "assertive");
		}
	}, { defer: true });
	const asComponent = mergedProps.as || "input";
	return <Polymorphic as={asComponent} role="spinbutton" type="text" id={fieldProps.id()} ref={[context.setInputRef, mergedProps.ref]} value={Number.isNaN(context.rawValue()) || context.value() === void 0 ? "" : context.formatNumber(context.rawValue())} required={formControlContext.isRequired()} disabled={formControlContext.isDisabled()} readonly={formControlContext.isReadOnly()} aria-valuenow={context.rawValue() != null && !Number.isNaN(context.rawValue()) ? context.rawValue() : void 0} aria-valuetext={textValue()} aria-valuemin={context.minValue()} aria-valuemax={context.maxValue()} aria-required={formControlContext.isRequired() ? "true" : void 0} aria-disabled={formControlContext.isDisabled() ? "true" : void 0} aria-readonly={formControlContext.isReadOnly() ? "true" : void 0} aria-invalid={formControlContext.validationState() === "invalid" ? "true" : void 0} aria-label={fieldProps.ariaLabel()} aria-labelledby={fieldProps.ariaLabelledBy()} aria-describedby={fieldProps.ariaDescribedBy()} style={combineStyle({ "touch-action": "none" }, mergedProps.style || void 0)} onKeyDown={onKeyDown} onFocus={onFocus} onBlur={onBlur} onChange={(e) => {
		callHandler(e, mergedProps.onChange);
		context.format();
	}} onWheel={(e) => {
		callHandler(e, mergedProps.onWheel);
		if (!context.changeOnWheel() || document.activeElement !== context.inputRef()) return;
		e.preventDefault();
		if (e.deltaY < 0) context.varyValue(context.step());
		else context.varyValue(-context.step());
	}} onInput={composeEventHandlers([mergedProps.onInput, context.onInput])} {...formControlContext.dataset()} {...others} />;
}
//#endregion
//#region src/number-field/number-field-root.tsx
/**
* A text input that allow users to input custom text entries with a keyboard.
*/
function NumberFieldRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const defaultId = `NumberField-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		format: true,
		minValue: Number.MIN_SAFE_INTEGER,
		maxValue: Number.MAX_SAFE_INTEGER,
		step: 1,
		changeOnWheel: true
	}, props);
	const formControlProps = omit(mergedProps, "ref", "value", "defaultValue", "onChange", "rawValue", "onRawValueChange", "translations", "format", "formatOptions", "textValue", "minValue", "maxValue", "step", "largeStep", "changeOnWheel", "allowedInput");
	const others = omit(mergedProps, "ref", "value", "defaultValue", "onChange", "rawValue", "onRawValueChange", "translations", "format", "formatOptions", "textValue", "minValue", "maxValue", "step", "largeStep", "changeOnWheel", "allowedInput", ...FORM_CONTROL_PROP_NAMES);
	const { locale } = useLocale();
	const numberParser = createMemo(() => {
		return new NumberParser(locale(), mergedProps.formatOptions);
	});
	const numberFormatter = createMemo(() => {
		return new NumberFormatter(locale(), mergedProps.formatOptions);
	});
	const formatNumber = (number) => mergedProps.format ? numberFormatter().format(number) : number.toString();
	const parseRawValue = (value) => mergedProps.format && typeof value !== "number" ? numberParser().parse(value ?? "") : Number(value ?? "");
	const isValidPartialValue = (value) => mergedProps.format && typeof value !== "number" ? numberParser().isValidPartialNumber(value ?? "", mergedProps.minValue, mergedProps.maxValue) : !Number.isNaN(Number(value));
	const [value, setValue] = (0, primitives_exports.createControllableSignal)({
		value: () => mergedProps.value,
		defaultValue: () => mergedProps.defaultValue ?? mergedProps.rawValue,
		onChange: (value) => {
			mergedProps.onChange?.(typeof value === "number" ? formatNumber(value) : value);
			mergedProps.onRawValueChange?.(parseRawValue(value));
		}
	});
	if (value() !== void 0) mergedProps.onRawValueChange?.(parseRawValue(value()));
	function isAllowedInput(char) {
		if (mergedProps.allowedInput !== void 0) return mergedProps.allowedInput.test(char);
		return true;
	}
	const { formControlContext } = createFormControl(formControlProps);
	createFormResetListener(ref, () => {
		setValue(mergedProps.defaultValue ?? "");
	});
	const [inputRef, setInputRef] = createSignal(void 0, { ownedWrite: true });
	const [hiddenInputRef, setHiddenInputRef] = createSignal(void 0, { ownedWrite: true });
	const onInput = (e) => {
		if (formControlContext.isReadOnly() || formControlContext.isDisabled()) return;
		const target = e.target;
		let cursorPosition = target.selectionStart;
		if (isValidPartialValue(target.value)) {
			if (e.inputType !== "insertText" || isAllowedInput(e.data || "")) setValue(target.value);
		} else if (e.inputType === "deleteContentBackward") {
			if (cursorPosition !== null) cursorPosition += 1;
		}
		const v = value();
		if (v !== target.value) {
			target.value = String(v ?? "");
			if (cursorPosition !== null) {
				target.selectionStart = cursorPosition;
				target.selectionEnd = cursorPosition;
			}
		}
	};
	const context = {
		value,
		setValue,
		rawValue: () => parseRawValue(value()),
		generateId: (suffix) => `${access(formControlProps.id)}-${suffix}`,
		formatNumber,
		format: () => {
			if (!mergedProps.format) return;
			let rawValue = context.rawValue();
			if (Number.isNaN(rawValue)) {
				if (hiddenInputRef()) hiddenInputRef().value = "";
				mergedProps.onRawValueChange?.(rawValue);
				return;
			}
			if (context.minValue()) rawValue = Math.max(rawValue, context.minValue());
			if (context.maxValue()) rawValue = Math.min(rawValue, context.maxValue());
			const formattedValue = context.formatNumber(rawValue);
			if (value() != formattedValue) setValue(formattedValue);
			if (inputRef()) inputRef().value = formattedValue;
			if (hiddenInputRef()) hiddenInputRef().value = String(rawValue);
		},
		onInput,
		textValue: () => mergedProps.textValue,
		minValue: () => mergedProps.minValue,
		maxValue: () => mergedProps.maxValue,
		step: () => mergedProps.step,
		largeStep: () => mergedProps.largeStep ?? mergedProps.step * 10,
		changeOnWheel: () => mergedProps.changeOnWheel,
		translations: () => mergedProps.translations,
		inputRef,
		setInputRef,
		hiddenInputRef,
		setHiddenInputRef,
		varyValue: (offset) => {
			let rawValue = context.rawValue() ?? 0;
			if (Number.isNaN(rawValue)) rawValue = 0;
			let newValue = rawValue;
			const operation = offset > 0 ? "+" : "-";
			const localStep = Math.abs(offset);
			const min = props.minValue === void 0 ? NaN : context.minValue();
			const max = props.maxValue === void 0 ? NaN : context.maxValue();
			newValue = snapValueToStep(rawValue, min, max, localStep);
			if (!(operation === "+" && newValue > rawValue || operation === "-" && newValue < rawValue)) newValue = snapValueToStep(handleDecimalOperation(operation, rawValue, localStep), min, max, localStep);
			context.setValue(newValue);
		}
	};
	createEffect(() => mergedProps.rawValue, (rawValue) => {
		if (rawValue !== untrack(context.rawValue)) {
			if (Number.isNaN(rawValue)) return;
			setValue(rawValue ?? "");
			context.format();
		}
	}, { defer: true });
	return <FormControlContext value={formControlContext}>
			<NumberFieldContext value={context}>
				<Polymorphic as="div" ref={[setRef, mergedProps.ref]} role="group" id={access(formControlProps.id)} {...formControlContext.dataset()} {...others} />
			</NumberFieldContext>
		</FormControlContext>;
}
function handleDecimalOperation(operator, value1, value2) {
	let result = operator === "+" ? value1 + value2 : value1 - value2;
	if (Number.isFinite(value1) && Number.isFinite(value2) && (value2 % 1 !== 0 || value1 % 1 !== 0)) {
		const offsetPrecision = getPrecision(value2);
		const valuePrecision = getPrecision(value1);
		const multiplier = 10 ** Math.max(offsetPrecision, valuePrecision);
		const multipliedOffset = Math.round(value2 * multiplier);
		const multipliedValue = Math.round(value1 * multiplier);
		result = (operator === "+" ? multipliedValue + multipliedOffset : multipliedValue - multipliedOffset) / multiplier;
	}
	return result;
}
//#endregion
//#region src/number-field/index.tsx
var number_field_exports = /* @__PURE__ */ __exportAll({
	DecrementTrigger: () => NumberFieldDecrementTrigger,
	Description: () => FormControlDescription,
	ErrorMessage: () => FormControlErrorMessage,
	HiddenInput: () => NumberFieldHiddenInput,
	IncrementTrigger: () => NumberFieldIncrementTrigger,
	Input: () => NumberFieldInput,
	Label: () => FormControlLabel,
	NumberField: () => NumberField,
	Root: () => NumberFieldRoot,
	useNumberFieldContext: () => useNumberFieldContext
});
const NumberField = Object.assign(NumberFieldRoot, {
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	HiddenInput: NumberFieldHiddenInput,
	Input: NumberFieldInput,
	IncrementTrigger: NumberFieldIncrementTrigger,
	DecrementTrigger: NumberFieldDecrementTrigger,
	Label: FormControlLabel
});
//#endregion
export { NumberFieldIncrementTrigger as a, useNumberFieldContext as c, NumberFieldInput as i, number_field_exports as n, NumberFieldHiddenInput as o, NumberFieldRoot as r, NumberFieldDecrementTrigger as s, NumberField as t };
