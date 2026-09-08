import { Polymorphic } from "../polymorphic/index.jsx";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.jsx";
import { t as primitives_exports } from "../primitives/BlSoAAAV.jsx";
import { createFilter, useLocale } from "../i18n/index.jsx";
import { a as createFormControl, i as FORM_CONTROL_PROP_NAMES, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/Dc7vmdKW.jsx";
import { t as FormControlErrorMessage } from "../form-control-error-message/B1cNIdVV.jsx";
import { t as FormControlLabel } from "../form-control-label/Czoesrj9.jsx";
import { n as spin_button_exports } from "../spin-button/c9Z4Y-yy.jsx";
import { For, Show, children, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, untrack, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { callHandler, visuallyHiddenStyles } from "@kobalte/utils";
import { isIOS, isMac } from "@solid-primitives/platform";
import { createFocusGroup, createFocusSignal } from "@solid-primitives/focus";
import { NumberParser } from "@internationalized/number";
import { createFormResetListener } from "@solid-primitives/form";
//#region src/time-field/time-field-context.tsx
const TimeFieldContext = createContext();
function useTimeFieldContext() {
	const context = useContext(TimeFieldContext);
	if (context === void 0) throw new Error("[kobalte]: `useTimeFieldContext` must be used within a `TimeField` component");
	return context;
}
//#endregion
//#region src/time-field/time-field-hidden-input.tsx
function TimeFieldHiddenInput(props) {
	const formControlContext = useFormControlContext();
	const context = useTimeFieldContext();
	return <input type="text" tabindex={-1} style={visuallyHiddenStyles} name={formControlContext.name()} value={context.formattedValue() || ""} required={formControlContext.isRequired()} disabled={formControlContext.isDisabled()} readonly={formControlContext.isReadOnly()} aria-hidden="true" onChange={(e) => context.setValue(parseTime(e.currentTarget.value))} {...props} />;
}
const parseTime = (value) => {
	const [time, period] = value.split(" ");
	const [hours, minutes, seconds] = time.split(":");
	const parsedHours = period === "PM" ? Number.parseInt(hours, 10) + 12 : Number.parseInt(hours, 10);
	const parsedMinutes = Number.parseInt(minutes, 10);
	const parsedSeconds = Number.parseInt(seconds, 10);
	return {
		hour: Number.isNaN(parsedHours) ? void 0 : parsedHours,
		minute: Number.isNaN(parsedMinutes) ? void 0 : parsedMinutes,
		second: Number.isNaN(parsedSeconds) ? void 0 : parsedSeconds
	};
};
//#endregion
//#region src/time-field/time-field-input.tsx
function TimeFieldInput(props) {
	const formControlContext = useFormControlContext();
	const timeFieldContext = useTimeFieldContext();
	const mergedProps = merge({ id: timeFieldContext.generateId("input") }, props);
	const others = omit(mergedProps, "ref", "children", "onKeyDown", "onFocusOut", "aria-labelledby", "aria-describedby");
	createEffect(() => others["aria-label"], (label) => timeFieldContext.setFieldAriaLabel(label));
	createEffect(() => formControlContext.getAriaLabelledBy(others.id, others["aria-label"], mergedProps["aria-labelledby"]), (labelledBy) => timeFieldContext.setFieldAriaLabelledBy(labelledBy));
	createEffect(() => [mergedProps["aria-describedby"], timeFieldContext.ariaDescribedBy()].filter(Boolean).join(" "), (describedBy) => timeFieldContext.setFieldAriaDescribedBy(describedBy));
	const { direction } = useLocale();
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		switch (e.key) {
			case "ArrowLeft":
				e.preventDefault();
				e.stopPropagation();
				if (direction() === "rtl") timeFieldContext.focusManager().focusNext();
				else timeFieldContext.focusManager().focusPrevious();
				break;
			case "ArrowRight":
				e.preventDefault();
				e.stopPropagation();
				if (direction() === "rtl") timeFieldContext.focusManager().focusPrevious();
				else timeFieldContext.focusManager().focusNext();
		}
	};
	const onFocusOut = (e) => {
		callHandler(e, mergedProps.onFocusOut);
		if (formControlContext.isDisabled() || formControlContext.isReadOnly()) return;
	};
	return <Polymorphic as="div" role="presentation" ref={[timeFieldContext.setInputRef, mergedProps.ref]} aria-labelledby={timeFieldContext.fieldAriaLabelledBy()} aria-describedby={timeFieldContext.fieldAriaDescribedBy()} onKeyDown={onKeyDown} onFocusOut={onFocusOut} {...formControlContext.dataset()} {...others}>
			<For each={timeFieldContext.segments()} keyed={false}>
				{(segment) => mergedProps.children?.(segment)}
			</For>
		</Polymorphic>;
}
//#endregion
//#region src/time-field/time-field-label.tsx
function TimeFieldLabel(props) {
	return <FormControlLabel as="span" {...props} />;
}
//#endregion
//#region src/time-field/time-field.intl.ts
const TIME_FIELD_INTL_MESSAGES = {
	hour: "hour",
	minute: "minute",
	second: "second",
	am: "AM",
	pm: "PM",
	dayPeriod: "AM/PM",
	timeZoneName: "time zone",
	selectedTimeDescription: (time) => `Selected Time: ${time}`
};
//#endregion
//#region src/time-field/time-field-value-description.tsx
function TimeFieldValueDescription() {
	const context = useTimeFieldContext();
	const defaultId = context.generateId("value-description");
	const isValid = () => context.value()?.toString() !== void 0;
	createEffect(() => isValid(), (valid) => {
		if (!valid) return;
		return context.registerValueDescriptionId(defaultId);
	});
	return <Show when={isValid()}>
			<div id={defaultId} style={{ display: "none" }}>
				{context.translations().selectedTimeDescription(context.formattedValue())}
			</div>
		</Show>;
}
//#endregion
//#region src/time-field/time-field-root.tsx
function TimeFieldRoot(props) {
	const [ref, setRef] = createSignal();
	const defaultId = `time-field-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		granularity: "minute",
		translations: TIME_FIELD_INTL_MESSAGES
	}, props);
	const formControlProps = omit(mergedProps, "ref", "translations", "min", "max", "placeholder", "hourCycle", "granularity", "forceLeadingZeros", "validationState", "value", "defaultValue", "onChange", "aria-labelledby", "aria-describedby", "children");
	const others = omit(mergedProps, "ref", "translations", "min", "max", "placeholder", "hourCycle", "granularity", "forceLeadingZeros", "validationState", "value", "defaultValue", "onChange", "aria-labelledby", "aria-describedby", "children", ...FORM_CONTROL_PROP_NAMES);
	const [inputRef, setInputRef] = createSignal();
	const [valueDescriptionId, setValueDescriptionId] = createSignal();
	const [fieldAriaLabel, setFieldAriaLabel] = createSignal();
	const [fieldAriaLabelledBy, setFieldAriaLabelledBy] = createSignal();
	const [fieldAriaDescribedBy, setFieldAriaDescribedBy] = createSignal();
	const focusManager = createFocusGroup(inputRef, () => ({ keyboardNavigation: false }));
	const [value, _setValue] = (0, primitives_exports.createControllableSignal)({
		value: () => mergedProps.value,
		defaultValue: () => mergedProps.defaultValue,
		onChange: (value) => mergedProps.onChange?.(value)
	});
	const setValue = (v) => {
		if (!v) {
			_setValue(void 0);
			return;
		}
		const newValue = { ...value() };
		if ("hour" in v) newValue.hour = v.hour;
		if ("minute" in v) newValue.minute = v.minute;
		if ("second" in v) newValue.second = v.second;
		_setValue(newValue);
	};
	createFormResetListener(ref, () => {
		setValue(mergedProps.defaultValue);
	});
	const validationState = createMemo(() => {
		if (mergedProps.validationState) return mergedProps.validationState;
		const minTime = Number.parseInt(`${(mergedProps.min?.hour ?? "00").toString().padStart(2, "0")}${(mergedProps.min?.minute ?? "00").toString().padStart(2, "0")}${(mergedProps.min?.second ?? "00").toString().padStart(2, "0")}`, 10);
		const maxTime = Number.parseInt(`${(mergedProps.max?.hour ?? "23").toString().padStart(2, "0")}${(mergedProps.max?.minute ?? "59").toString().padStart(2, "0")}${(mergedProps.max?.second ?? "59").toString().padStart(2, "0")}`, 10);
		const val = Number.parseInt(`${(value()?.hour ?? "00").toString().padStart(2, "0")}${(value()?.minute ?? "00").toString().padStart(2, "0")}${(value()?.second ?? "00").toString().padStart(2, "0")}`, 10);
		if (val > maxTime || val < minTime) return "invalid";
	});
	const { formControlContext } = createFormControl(merge(formControlProps, { get validationState() {
		return validationState();
	} }));
	const resolvedGranularity = createMemo(() => {
		const granularity = props.granularity ?? "minute";
		if (typeof granularity === "object") return granularity;
		return {
			hour: true,
			minute: granularity === "minute" || granularity === "second",
			second: granularity === "second"
		};
	});
	const formattedValue = createMemo(() => {
		let hour = value()?.hour ?? 0;
		const pm = hour > 12;
		if (mergedProps.hourCycle === 12 && pm) hour -= 12;
		const padding = mergedProps.forceLeadingZeros ? 2 : 1;
		const segments = [];
		if (resolvedGranularity().hour) segments.push(hour.toString().padStart(padding, "0"));
		if (resolvedGranularity().minute) segments.push((value()?.minute ?? 0).toString().padStart(padding, "0"));
		if (resolvedGranularity().second) segments.push((value()?.second ?? 0).toString().padStart(padding, "0"));
		let val = segments.join(":");
		if (mergedProps.hourCycle === 12) val += ` ${pm ? mergedProps.translations?.pm : mergedProps.translations?.am}`;
		return val;
	});
	const ariaLabelledBy = () => {
		return formControlContext.getAriaLabelledBy(access(mergedProps.id), others["aria-label"], mergedProps["aria-labelledby"]);
	};
	const ariaDescribedBy = () => {
		return [valueDescriptionId(), formControlContext.getAriaDescribedBy(mergedProps["aria-describedby"])].filter(Boolean).join(" ") || void 0;
	};
	const segments = createMemo(() => {
		const seg = Object.keys(resolvedGranularity()).filter((k) => resolvedGranularity()[k]);
		if (seg.includes("hour") && mergedProps.hourCycle === 12) seg.push("dayPeriod");
		return seg;
	});
	const context = {
		translations: () => mergedProps.translations,
		value,
		setValue,
		hourCycle: () => mergedProps.hourCycle,
		resolvedGranularity,
		forceLeadingZeros: () => mergedProps.forceLeadingZeros ?? false,
		placeholder: () => mergedProps.placeholder,
		formattedValue,
		focusManager: () => focusManager,
		isDisabled: () => formControlContext.isDisabled() ?? false,
		ariaDescribedBy,
		inputRef,
		setInputRef,
		valueDescriptionId,
		registerValueDescriptionId: createRegisterId(setValueDescriptionId),
		generateId: (suffix) => `${access(mergedProps.id)}-${suffix}`,
		segments,
		fieldAriaLabel,
		fieldAriaLabelledBy,
		fieldAriaDescribedBy,
		setFieldAriaLabel,
		setFieldAriaLabelledBy,
		setFieldAriaDescribedBy
	};
	return <FormControlContext value={formControlContext}>
			<TimeFieldContext value={context}>
				<Polymorphic as="div" ref={[setRef, mergedProps.ref]} role="group" id={access(mergedProps.id)} aria-invalid={formControlContext.validationState() === "invalid" || void 0} aria-required={formControlContext.isRequired() || void 0} aria-disabled={formControlContext.isDisabled() || void 0} aria-readonly={formControlContext.isReadOnly() || void 0} aria-labelledby={ariaLabelledBy()} aria-describedby={ariaDescribedBy()} {...formControlContext.dataset()} {...others}>
					{mergedProps.children}
					<TimeFieldValueDescription />
				</Polymorphic>
			</TimeFieldContext>
		</FormControlContext>;
}
//#endregion
//#region src/time-field/time-field-segment.tsx
const PAGE_STEP = {
	hour: 2,
	minute: 15,
	second: 15
};
function TimeFieldSegment(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const formControlContext = useFormControlContext();
	const context = useTimeFieldContext();
	const mergedProps = merge({ id: `${context.generateId("segment")}-${createUniqueId()}` }, props);
	const others = omit(mergedProps, "ref", "segment", "onKeyDown", "onBeforeInput", "onInput", "onFocus", "children");
	const { locale } = useLocale();
	const resolvedChildren = children(() => mergedProps.children);
	let enteredKeys = "";
	let composition = "";
	const touchPropOverrides = createMemo(() => {
		return isIOS ? {
			role: "textbox",
			"aria-valuemax": void 0,
			"aria-valuemin": void 0,
			"aria-valuetext": void 0,
			"aria-valuenow": void 0
		} : {};
	});
	const firstSegment = createMemo(() => context.segments()[0]);
	const name = createMemo(() => {
		return context.translations()[mergedProps.segment];
	});
	const ariaLabel = createMemo(() => {
		return [name(), context.fieldAriaLabel()].filter(Boolean).join(", ");
	});
	const ariaDescribedBy = createMemo(() => {
		if (mergedProps.segment !== firstSegment() && formControlContext.validationState() !== "invalid") return;
		return context.fieldAriaDescribedBy();
	});
	const ariaLabelledBy = createMemo(() => {
		return [mergedProps.id, context.fieldAriaLabelledBy()].filter(Boolean).join(" ") || void 0;
	});
	const inputMode = createMemo(() => {
		return formControlContext.isDisabled() || mergedProps.segment === "dayPeriod" ? void 0 : "numeric";
	});
	const filter = createFilter({ sensitivity: "base" });
	const numberParser = createMemo(() => {
		return new NumberParser(locale(), { maximumFractionDigits: 0 });
	});
	const maxValue = () => mergedProps.segment === "hour" ? 23 : 59;
	const onBackspaceKeyDown = () => {
		if (mergedProps.segment !== "dayPeriod" && context.value()?.[mergedProps.segment] === void 0) {
			context.focusManager().focusPrevious();
			return;
		}
		if (mergedProps.segment === "dayPeriod") {
			if ((context.value()?.hour ?? 0) >= 12) {
				if (!formControlContext.isReadOnly()) context.setValue({ hour: context.value().hour - 12 });
			} else context.focusManager().focusPrevious();
			return;
		}
		if (formControlContext.isReadOnly()) return;
		let newValue = (context.value()?.[mergedProps.segment] ?? 0).toString().slice(0, -1);
		const parsed = numberParser().parse(newValue);
		newValue = parsed === 0 ? "" : newValue;
		if (newValue.length === 0 || parsed === 0) context.setValue({ [mergedProps.segment]: void 0 });
		else context.setValue({ [mergedProps.segment]: parsed });
		enteredKeys = newValue;
	};
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		if (e.key === "a" && (isMac ? e.metaKey : e.ctrlKey)) e.preventDefault();
		if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
		switch (e.key) {
			case "Backspace":
			case "Delete":
				e.preventDefault();
				e.stopPropagation();
				onBackspaceKeyDown();
		}
	};
	const onInputBase = (key) => {
		if (formControlContext.isDisabled() || formControlContext.isReadOnly()) return;
		const newValue = enteredKeys + key;
		switch (mergedProps.segment) {
			case "dayPeriod":
				if (filter.startsWith(context.translations().am, key)) {
					if ((context.value()?.hour ?? 0) >= 12) context.setValue({ hour: context.value().hour - 12 });
				} else if (filter.startsWith(context.translations().pm, key)) {
					if ((context.value()?.hour ?? 0) < 12) context.setValue({ hour: context.value().hour + 12 });
				} else break;
				context.focusManager().focusNext();
				break;
			case "hour":
			case "minute":
			case "second": {
				if (!numberParser().isValidPartialNumber(newValue)) return;
				let numberValue = numberParser().parse(newValue);
				let allowsZero = true;
				if (mergedProps.segment === "hour" && context.hourCycle() === 12) {
					allowsZero = false;
					if (numberValue >= 12) numberValue = numberParser().parse(key);
					if ((context.value()?.hour ?? 0) >= 12) numberValue += 12;
				}
				if (numberValue > maxValue()) numberValue = numberParser().parse(key);
				if (Number.isNaN(numberValue)) return;
				const shouldSetValue = numberValue !== 0 || allowsZero;
				if (shouldSetValue) context.setValue({ [mergedProps.segment]: numberValue });
				if (Number(`${numberValue}0`) > maxValue() || newValue.length >= String(maxValue).length) {
					enteredKeys = "";
					if (shouldSetValue) context.focusManager().focusNext();
				} else enteredKeys = newValue;
				break;
			}
		}
	};
	const onBeforeInput = (e) => {
		callHandler(e, mergedProps.onBeforeInput);
		e.preventDefault();
		switch (e.inputType) {
			case "deleteContentBackward":
			case "deleteContentForward":
				if (mergedProps.segment !== "dayPeriod" && context.value()?.[mergedProps.segment] !== void 0 && !formControlContext.isReadOnly()) onBackspaceKeyDown();
				break;
			case "insertCompositionText":
				if (ref()) {
					const el = ref();
					composition = el.textContent;
					el.textContent = el.textContent;
				}
				break;
			default: if (e.data != null) onInputBase(e.data);
		}
	};
	const onInput = (e) => {
		callHandler(e, mergedProps.onInput);
		const { inputType, data } = e;
		if (ref() && data != null) switch (inputType) {
			case "insertCompositionText":
				ref().textContent = composition;
				if (filter.startsWith(context.translations().am, data) || filter.startsWith(context.translations().pm, data)) onInputBase(data);
		}
	};
	const onFocus = (e) => {
		callHandler(e, mergedProps.onFocus);
		if (ref()) {
			enteredKeys = "";
			ref().scrollIntoView({ block: "nearest" });
			(ref().ownerDocument.defaultView ?? window).getSelection()?.collapse(ref());
		}
	};
	const cycleDayPeriod = () => {
		if ((context.value()?.hour ?? 0) >= 12) context.setValue({ hour: context.value().hour - 12 });
		else context.setValue({ hour: context.value().hour + 12 });
	};
	const adjust = (delta) => {
		const hour = context.value()?.hour ?? context.placeholder()?.hour ?? 0;
		if (mergedProps.segment === "hour" && context.hourCycle() === 12) {
			const isPM = hour >= 12;
			return (hour % 12 + delta + 12) % 12 + (isPM ? 12 : 0);
		}
		const max = maxValue();
		return ((context.value()?.[mergedProps.segment] ?? context.placeholder()?.[mergedProps.segment] ?? 0) + delta + (max + 1)) % (max + 1);
	};
	const onIncrement = () => {
		enteredKeys = "";
		if (mergedProps.segment === "dayPeriod") {
			cycleDayPeriod();
			return;
		}
		context.setValue({ [mergedProps.segment]: adjust(1) });
	};
	const onDecrement = () => {
		enteredKeys = "";
		if (mergedProps.segment === "dayPeriod") {
			cycleDayPeriod();
			return;
		}
		context.setValue({ [mergedProps.segment]: adjust(-1) });
	};
	const onIncrementPage = () => {
		enteredKeys = "";
		if (mergedProps.segment === "dayPeriod") {
			cycleDayPeriod();
			return;
		}
		context.setValue({ [mergedProps.segment]: adjust(PAGE_STEP[mergedProps.segment]) });
	};
	const onDecrementPage = () => {
		enteredKeys = "";
		if (mergedProps.segment === "dayPeriod") {
			cycleDayPeriod();
			return;
		}
		context.setValue({ [mergedProps.segment]: adjust(-PAGE_STEP[mergedProps.segment]) });
	};
	const onDecrementToMin = () => {
		enteredKeys = "";
		if (mergedProps.segment === "dayPeriod") {
			cycleDayPeriod();
			return;
		}
		if (mergedProps.segment === "hour" && context.hourCycle() === 12) {
			if ((context.value()?.hour ?? 0) >= 12) context.setValue({ hour: 12 });
			else context.setValue({ hour: 0 });
		} else context.setValue({ [mergedProps.segment]: 0 });
	};
	const onIncrementToMax = () => {
		enteredKeys = "";
		if (mergedProps.segment === "dayPeriod") {
			cycleDayPeriod();
			return;
		}
		if (mergedProps.segment === "hour" && context.hourCycle() === 12) {
			if ((context.value()?.hour ?? 0) >= 12) context.setValue({ hour: 24 });
			else context.setValue({ hour: 12 });
		} else context.setValue({ [mergedProps.segment]: maxValue() });
	};
	createEffect(() => context.focusManager(), (focusManager) => {
		const element = untrack(ref);
		const isFocused = createFocusSignal(() => element);
		return () => {
			if (untrack(isFocused)) {
				if (!focusManager.focusPrevious()) focusManager.focusNext();
			}
		};
	});
	const getValue = () => {
		if (mergedProps.segment === "dayPeriod") return context.translations()[(context.value()?.hour ?? context.placeholder()?.hour ?? 0) >= 12 ? "pm" : "am"];
		if (mergedProps.segment === "hour") {
			const val = context.value()?.hour ?? context.placeholder()?.hour;
			if (val === void 0) return void 0;
			if (context.hourCycle() === 12) {
				if (val > 12) return val - 12;
				if (val === 0) return 12;
			}
			return val;
		}
		return context.value()?.[mergedProps.segment] ?? context.placeholder()?.[mergedProps.segment];
	};
	const padding = () => mergedProps.segment !== "hour" ? 2 : context.forceLeadingZeros() ? 2 : 1;
	const textValue = () => (getValue()?.toString() ?? "-".padStart(padding(), "-")).padStart(padding(), "0");
	return <>
			<spin_button_exports.Root ref={[setRef, mergedProps.ref]} tabindex={formControlContext.isDisabled() ? void 0 : 0} value={getValue()} textValue={textValue()} minValue={0} maxValue={maxValue()} validationState={formControlContext.validationState()} required={formControlContext.isRequired()} disabled={formControlContext.isDisabled()} readOnly={formControlContext.isReadOnly()} contentEditable={!formControlContext.isReadOnly()} inputMode={inputMode()} autocorrect={!formControlContext.isReadOnly() ? "off" : void 0} autoCapitalize={!formControlContext.isReadOnly() ? "off" : void 0} spellcheck={!formControlContext.isReadOnly() ? false : void 0} enterkeyhint={!formControlContext.isReadOnly() ? "next" : void 0} style={{ "caret-color": "transparent" }} aria-label={ariaLabel()} aria-labelledby={ariaLabelledBy()} aria-describedby={ariaDescribedBy()} data-placeholder={context.value()?.[mergedProps.segment === "dayPeriod" ? "hour" : mergedProps.segment] === void 0 ? "" : void 0} data-type={mergedProps.segment} onKeyDown={onKeyDown} onBeforeInput={onBeforeInput} onInput={onInput} onFocus={onFocus} onIncrement={onIncrement} onDecrement={onDecrement} onIncrementPage={onIncrementPage} onDecrementPage={onDecrementPage} onDecrementToMin={onDecrementToMin} onIncrementToMax={onIncrementToMax} {...formControlContext.dataset()} {...others} {...touchPropOverrides()}>
				<Show when={resolvedChildren()} fallback={textValue().replaceAll("-", "–")}>
					{resolvedChildren()}
				</Show>
			</spin_button_exports.Root>

			<Show when={mergedProps.segment === "hour" && (context.resolvedGranularity().minute || context.resolvedGranularity().second) || mergedProps.segment === "minute" && context.resolvedGranularity().second}>
				<span>:</span>
			</Show>
		</>;
}
//#endregion
//#region src/time-field/index.tsx
const TimeField = Object.assign(TimeFieldRoot, {
	Label: TimeFieldLabel,
	Input: TimeFieldInput,
	Segment: TimeFieldSegment,
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	HiddenInput: TimeFieldHiddenInput
});
//#endregion
export { FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, TimeFieldHiddenInput as HiddenInput, TimeFieldInput as Input, TimeFieldLabel as Label, TimeFieldRoot as Root, TimeFieldSegment as Segment, TimeField };
