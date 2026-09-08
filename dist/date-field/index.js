import { Polymorphic } from "../polymorphic/index.js";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.js";
import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { createDateFormatter, createFilter, useLocale } from "../i18n/index.js";
import { E as todayDate, T as toLocalISOString, _ as setMinutes, b as setYear, g as setHours, h as setDay, m as parseLocalISOString, n as compareDates, o as getFieldBounds, r as cycleField, v as setMonth, y as setSeconds } from "../date-math/eXQ3A5eo.js";
import { a as createFormControl, i as FORM_CONTROL_PROP_NAMES, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/BQ1mcKaU.js";
import { t as FormControlErrorMessage } from "../form-control-error-message/D9jUVumc.js";
import { t as FormControlLabel } from "../form-control-label/DqQ24y8m.js";
import { n as SpinButtonRoot } from "../spin-button/CL7gpXGY.js";
import { createComponent, insert, memo, mergeProps, setAttribute, spread, template } from "@solidjs/web";
import { For, Show, children, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, untrack, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { callHandler, visuallyHiddenStyles } from "@kobalte/utils";
import { isIOS, isMac } from "@solid-primitives/platform";
import { createFocusGroup } from "@solid-primitives/focus";
import { NumberParser } from "@internationalized/number";
import { createFormResetListener } from "@solid-primitives/form";
//#region src/date-field/date-field-context.tsx
const DateFieldContext = createContext();
function useDateFieldContext() {
	const context = useContext(DateFieldContext);
	if (context === void 0) throw new Error("[kobalte]: `useDateFieldContext` must be used within a `DateField` component");
	return context;
}
//#endregion
//#region src/date-field/date-field-hidden-input.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<input>`);
function DateFieldHiddenInput(props) {
	const formControlContext = useFormControlContext();
	const context = useDateFieldContext();
	const serializedValue = () => {
		const value = context.value();
		return value ? toLocalISOString(value, context.granularity()) : "";
	};
	var _el$ = _tmpl$$1();
	spread(_el$, mergeProps({
		"type": "text",
		"tabindex": -1,
		"style": visuallyHiddenStyles,
		get name() {
			return formControlContext.name();
		},
		get value() {
			return serializedValue();
		},
		get required() {
			return formControlContext.isRequired();
		},
		get disabled() {
			return formControlContext.isDisabled();
		},
		get readonly() {
			return formControlContext.isReadOnly();
		},
		"aria-hidden": "true",
		"onChange": (e) => {
			const parsed = parseLocalISOString(e.currentTarget.value);
			if (parsed) context.setValue(parsed);
		}
	}, props), false);
	return _el$;
}
//#endregion
//#region src/date-field/date-field-input.tsx
function DateFieldInput(props) {
	const formControlContext = useFormControlContext();
	const dateFieldContext = useDateFieldContext();
	const mergedProps = merge({ id: dateFieldContext.generateId("input") }, props);
	const others = omit(mergedProps, "ref", "children", "onKeyDown", "onFocusOut", "aria-labelledby", "aria-describedby");
	createEffect(() => others["aria-label"], (label) => {
		dateFieldContext.setFieldAriaLabel(label);
	});
	createEffect(() => formControlContext.getAriaLabelledBy(others.id, others["aria-label"], mergedProps["aria-labelledby"]), (labelledBy) => {
		dateFieldContext.setFieldAriaLabelledBy(labelledBy);
	});
	createEffect(() => [mergedProps["aria-describedby"], dateFieldContext.ariaDescribedBy()].filter(Boolean).join(" "), (describedBy) => {
		dateFieldContext.setFieldAriaDescribedBy(describedBy);
	});
	const { direction } = useLocale();
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		switch (e.key) {
			case "ArrowLeft":
				e.preventDefault();
				e.stopPropagation();
				if (direction() === "rtl") dateFieldContext.focusManager().focusNext();
				else dateFieldContext.focusManager().focusPrevious();
				break;
			case "ArrowRight":
				e.preventDefault();
				e.stopPropagation();
				if (direction() === "rtl") dateFieldContext.focusManager().focusPrevious();
				else dateFieldContext.focusManager().focusNext();
		}
	};
	const onFocusOut = (e) => {
		callHandler(e, mergedProps.onFocusOut);
		if (formControlContext.isDisabled() || formControlContext.isReadOnly()) return;
	};
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		role: "presentation",
		ref: [dateFieldContext.setInputRef, mergedProps.ref],
		get ["aria-labelledby"]() {
			return dateFieldContext.fieldAriaLabelledBy();
		},
		get ["aria-describedby"]() {
			return dateFieldContext.fieldAriaDescribedBy();
		}
	}, () => formControlContext.dataset(), others, {
		onKeyDown,
		onFocusOut,
		get children() {
			return createComponent(For, {
				get each() {
					return dateFieldContext.segments();
				},
				keyed: false,
				children: (segment) => mergedProps.children?.(segment)
			});
		}
	}));
}
//#endregion
//#region src/date-field/date-field-label.tsx
function DateFieldLabel(props) {
	return createComponent(FormControlLabel, mergeProps({ as: "span" }, props));
}
//#endregion
//#region src/date-field/date-field.intl.ts
const DATE_FIELD_INTL_MESSAGES = {
	era: "era",
	year: "year",
	month: "month",
	day: "day",
	hour: "hour",
	minute: "minute",
	second: "second",
	dayPeriod: "AM/PM",
	timeZoneName: "time zone",
	selectedDateDescription: (date) => `Selected Date: ${date}`,
	placeholder: {
		year: "yyyy",
		month: "mm",
		day: "dd"
	}
};
//#endregion
//#region src/date-field/date-field-value-description.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div style=display:none>`);
function DateFieldValueDescription() {
	const context = useDateFieldContext();
	const defaultId = context.generateId("value-description");
	const isValid = () => context.value() !== void 0;
	createEffect(() => isValid(), (valid) => {
		if (!valid) return;
		return context.registerValueDescriptionId(defaultId);
	});
	return createComponent(Show, {
		get when() {
			return isValid();
		},
		get children() {
			var _el$ = _tmpl$();
			setAttribute(_el$, "id", defaultId);
			insert(_el$, () => context.translations().selectedDateDescription(context.formattedValue()));
			return _el$;
		}
	});
}
//#endregion
//#region src/date-field/utils.ts
const DEFAULT_FIELD_OPTIONS = {
	year: "numeric",
	month: "numeric",
	day: "numeric",
	hour: "numeric",
	minute: "2-digit",
	second: "2-digit"
};
const TWO_DIGIT_FIELD_OPTIONS = {
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit"
};
function getDateFieldFormatOptions(fieldOptions, options) {
	const finalFieldOptions = {
		...options.shouldForceLeadingZeros ? TWO_DIGIT_FIELD_OPTIONS : DEFAULT_FIELD_OPTIONS,
		...fieldOptions
	};
	const granularity = options.granularity || "minute";
	const keys = Object.keys(finalFieldOptions);
	let startIdx = keys.indexOf(options.maxGranularity ?? "year");
	if (startIdx < 0) startIdx = 0;
	let endIdx = keys.indexOf(granularity);
	if (endIdx < 0) endIdx = 2;
	if (startIdx > endIdx) throw new Error("maxGranularity must be greater than granularity");
	const opts = keys.slice(startIdx, endIdx + 1).reduce((opts, key) => {
		opts[key] = finalFieldOptions[key];
		return opts;
	}, {});
	if (options.hourCycle != null) opts.hour12 = options.hourCycle === 12;
	return opts;
}
/** A placeholder date used before any segment has been entered — local midnight today, or the given `placeholderValue`. */
function createPlaceholderDate(placeholderValue) {
	return placeholderValue ?? todayDate();
}
const EDITABLE_CYCLE_FIELDS = /* @__PURE__ */ new Set([
	"year",
	"month",
	"day",
	"hour",
	"minute",
	"second"
]);
function isCycleField(type) {
	return EDITABLE_CYCLE_FIELDS.has(type);
}
function getSegmentLimits(date, type, options) {
	if (isCycleField(type) || type === "dayPeriod") return getFieldBounds(date, type, options.hour12 ?? false);
	return {};
}
function addSegment(value, part, amount, options) {
	if (isCycleField(part)) return cycleField(value, part, amount, { hour12: options.hour12 });
	if (part === "dayPeriod") {
		const hours = value.getHours();
		return setHours(value, hours >= 12 ? hours - 12 : hours + 12);
	}
}
function setSegmentBase(value, part, segmentValue, options) {
	switch (part) {
		case "day": return setDay(value, segmentValue);
		case "month": return setMonth(value, segmentValue - 1);
		case "year": return setYear(value, segmentValue);
		case "dayPeriod": {
			const hours = value.getHours();
			const wasPM = hours >= 12;
			if (segmentValue >= 12 === wasPM) return value;
			return setHours(value, wasPM ? hours - 12 : hours + 12);
		}
		case "hour": {
			let resolvedSegmentValue = segmentValue;
			if (options.hour12) {
				const wasPM = value.getHours() >= 12;
				if (!wasPM && resolvedSegmentValue === 12) resolvedSegmentValue = 0;
				if (wasPM && resolvedSegmentValue < 12) resolvedSegmentValue += 12;
			}
			return setHours(value, resolvedSegmentValue);
		}
		case "minute": return setMinutes(value, segmentValue);
		case "second": return setSeconds(value, segmentValue);
	}
}
function getPlaceholder(translations, field, value) {
	if (field === "dayPeriod") return value;
	if (field === "year" || field === "month" || field === "day") return translations.placeholder[field];
	return "––";
}
//#endregion
//#region src/date-field/date-field-root.tsx
const EDITABLE_SEGMENTS = {
	year: true,
	month: true,
	day: true,
	hour: true,
	minute: true,
	second: true,
	dayPeriod: true
};
const PAGE_STEP = {
	year: 5,
	month: 2,
	day: 7,
	hour: 2,
	minute: 15,
	second: 15
};
const TYPE_MAPPING$1 = { dayperiod: "dayPeriod" };
function getFieldValue(date, part) {
	switch (part) {
		case "year": return date.getFullYear();
		case "month": return date.getMonth() + 1;
		case "day": return date.getDate();
		case "hour": return date.getHours();
		case "minute": return date.getMinutes();
		case "second": return date.getSeconds();
		default: return;
	}
}
function applyFieldValue(date, part, value) {
	switch (part) {
		case "year": return setYear(date, value);
		case "month": return setMonth(date, value - 1);
		case "day": return setDay(date, value);
		case "hour": return setHours(date, value);
		case "minute": return setMinutes(date, value);
		case "second": return setSeconds(date, value);
		default: return date;
	}
}
function DateFieldRoot(props) {
	const [ref, setRef] = createSignal();
	const defaultId = `date-field-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		maxGranularity: "year",
		shouldForceLeadingZeros: false,
		translations: DATE_FIELD_INTL_MESSAGES
	}, props);
	const formControlProps = omit(mergedProps, "ref", "translations", "minValue", "maxValue", "placeholderValue", "hourCycle", "granularity", "maxGranularity", "shouldForceLeadingZeros", "validationState", "value", "defaultValue", "onChange", "aria-labelledby", "aria-describedby", "children");
	const others = omit(mergedProps, "ref", "translations", "minValue", "maxValue", "placeholderValue", "hourCycle", "granularity", "maxGranularity", "shouldForceLeadingZeros", "validationState", "value", "defaultValue", "onChange", "aria-labelledby", "aria-describedby", "children", ...FORM_CONTROL_PROP_NAMES);
	const [inputRef, setInputRef] = createSignal();
	const [valueDescriptionId, setValueDescriptionId] = createSignal();
	const [fieldAriaLabel, setFieldAriaLabel] = createSignal();
	const [fieldAriaLabelledBy, setFieldAriaLabelledBy] = createSignal();
	const [fieldAriaDescribedBy, setFieldAriaDescribedBy] = createSignal();
	const focusManager = createFocusGroup(inputRef, () => ({ keyboardNavigation: false }));
	const { locale } = useLocale();
	const [value, _setValue] = (0, primitives_exports.createControllableSignal)({
		value: () => mergedProps.value,
		defaultValue: () => mergedProps.defaultValue,
		onChange: (value) => mergedProps.onChange?.(value)
	});
	const [placeholderDate, setPlaceholderDate] = createSignal(untrack(() => createPlaceholderDate(mergedProps.placeholderValue)));
	const formatOpts = createMemo(() => ({
		granularity: mergedProps.granularity ?? "day",
		maxGranularity: mergedProps.maxGranularity ?? "year",
		hourCycle: mergedProps.hourCycle,
		shouldForceLeadingZeros: mergedProps.shouldForceLeadingZeros
	}));
	const opts = createMemo(() => getDateFieldFormatOptions({}, formatOpts()));
	const dateFormatter = createDateFormatter(opts);
	const resolvedOptions = createMemo(() => dateFormatter().resolvedOptions());
	const allSegments = createMemo(() => {
		return dateFormatter().formatToParts(/* @__PURE__ */ new Date()).filter((segment) => EDITABLE_SEGMENTS[segment.type]).reduce((acc, segment) => {
			acc[segment.type] = true;
			return acc;
		}, {});
	});
	const [validSegments, setValidSegments] = createSignal(untrack(() => value() ? { ...allSegments() } : {}));
	const displayValue = createMemo(() => {
		return value() && Object.keys(validSegments()).length >= Object.keys(allSegments()).length ? value() : placeholderDate();
	});
	const commit = (newValue) => {
		if (Object.keys(validSegments()).length >= Object.keys(allSegments()).length) _setValue(newValue);
		else setPlaceholderDate(newValue);
	};
	const dateValue = displayValue;
	const segments = createMemo(() => {
		const resolvedDateValue = dateValue();
		const resolvedDisplayValue = displayValue();
		if (!resolvedDateValue || !resolvedDisplayValue) return [];
		return dateFormatter().formatToParts(resolvedDateValue).map((segment) => {
			const isEditable = EDITABLE_SEGMENTS[segment.type];
			const isPlaceholder = isEditable && !validSegments()[segment.type];
			const placeholder = isEditable ? getPlaceholder(mergedProps.translations, segment.type, segment.value) : null;
			return {
				type: TYPE_MAPPING$1[segment.type] || segment.type,
				text: isPlaceholder ? placeholder : segment.value,
				...getSegmentLimits(resolvedDisplayValue, segment.type, resolvedOptions()),
				isPlaceholder,
				placeholder,
				isEditable
			};
		});
	});
	const markValid = (part) => {
		setValidSegments((prev) => ({
			...prev,
			[part]: true
		}));
	};
	const adjustSegment = (type, amount) => {
		const resolvedDisplayValue = displayValue();
		if (!validSegments()[type]) {
			markValid(type);
			if (resolvedDisplayValue && Object.keys(validSegments()).length >= Object.keys(allSegments()).length) commit(resolvedDisplayValue);
		} else if (resolvedDisplayValue) {
			const newValue = addSegment(resolvedDisplayValue, type, amount, resolvedOptions());
			if (newValue) commit(newValue);
		}
	};
	/**
	* Increments the given segment.
	* Upon reaching the minimum or maximum value, the value wraps around to the opposite limit.
	*/
	const increment = (part) => {
		adjustSegment(part, 1);
	};
	/**
	* Decrements the given segment.
	* Upon reaching the minimum or maximum value, the value wraps around to the opposite limit.
	*/
	const decrement = (part) => {
		adjustSegment(part, -1);
	};
	/**
	* Increments the given segment by a larger amount, rounding it to the nearest increment.
	*/
	const incrementPage = (part) => {
		adjustSegment(part, PAGE_STEP[part] || 1);
	};
	/**
	* Decrements the given segment by a larger amount, rounding it to the nearest increment.
	*/
	const decrementPage = (part) => {
		adjustSegment(part, -(PAGE_STEP[part] || 1));
	};
	/** Sets the value of the given segment. */
	const setSegment = (part, segmentValue) => {
		markValid(part);
		const resolvedDisplayValue = displayValue();
		if (resolvedDisplayValue) {
			const newValue = setSegmentBase(resolvedDisplayValue, part, segmentValue, resolvedOptions());
			if (newValue) commit(newValue);
		}
	};
	/** Clears the value of the given segment, reverting it to the placeholder. */
	const clearSegment = (part) => {
		setValidSegments((prev) => {
			const newValue = { ...prev };
			delete newValue[part];
			return newValue;
		});
		const placeholder = createPlaceholderDate(mergedProps.placeholderValue);
		const resolvedDisplayValue = displayValue();
		let newValue = resolvedDisplayValue;
		if (resolvedDisplayValue && placeholder) {
			if (part === "dayPeriod") {
				const isPM = resolvedDisplayValue.getHours() >= 12;
				const shouldBePM = placeholder.getHours() >= 12;
				if (isPM && !shouldBePM) newValue = setHours(resolvedDisplayValue, resolvedDisplayValue.getHours() - 12);
				else if (!isPM && shouldBePM) newValue = setHours(resolvedDisplayValue, resolvedDisplayValue.getHours() + 12);
			} else {
				const fieldValue = getFieldValue(placeholder, part);
				if (fieldValue != null) newValue = applyFieldValue(resolvedDisplayValue, part, fieldValue);
			}
		}
		_setValue(void 0);
		if (newValue) commit(newValue);
	};
	/** Formats the current date value using the given options. */
	const formatValue = (fieldOptions) => {
		const resolvedDateValue = dateValue();
		if (!value() || !resolvedDateValue) return "";
		const formatOptions = getDateFieldFormatOptions(fieldOptions, formatOpts());
		return new Intl.DateTimeFormat(locale(), formatOptions).format(resolvedDateValue);
	};
	const formattedValue = createMemo(() => value() ? formatValue({}) : void 0);
	createFormResetListener(ref, () => {
		_setValue(mergedProps.defaultValue);
	});
	const validationState = createMemo(() => {
		if (mergedProps.validationState) return mergedProps.validationState;
		const resolvedValue = value();
		if (!resolvedValue) return;
		if (mergedProps.minValue && compareDates(resolvedValue, mergedProps.minValue) < 0) return "invalid";
		if (mergedProps.maxValue && compareDates(resolvedValue, mergedProps.maxValue) > 0) return "invalid";
	});
	const { formControlContext } = createFormControl(merge(formControlProps, { get validationState() {
		return validationState();
	} }));
	const ariaLabelledBy = () => {
		return formControlContext.getAriaLabelledBy(access(mergedProps.id), others["aria-label"], mergedProps["aria-labelledby"]);
	};
	const ariaDescribedBy = () => {
		return [valueDescriptionId(), formControlContext.getAriaDescribedBy(mergedProps["aria-describedby"])].filter(Boolean).join(" ") || void 0;
	};
	createEffect(() => value() != null && Object.keys(validSegments()).length < Object.keys(allSegments()).length ? allSegments() : void 0, (segmentsToMarkValid) => {
		if (segmentsToMarkValid) setValidSegments({ ...segmentsToMarkValid });
	});
	createEffect(() => [value(), mergedProps.placeholderValue], ([resolvedValue, placeholderValue]) => {
		if (resolvedValue == null) {
			setValidSegments({});
			setPlaceholderDate(createPlaceholderDate(placeholderValue));
		}
	});
	const context = {
		translations: () => mergedProps.translations,
		value,
		setValue: commit,
		granularity: () => mergedProps.granularity ?? "day",
		dateValue,
		dateFormatterResolvedOptions: resolvedOptions,
		segments,
		formattedValue,
		isDisabled: () => formControlContext.isDisabled() ?? false,
		focusManager: () => focusManager,
		ariaDescribedBy,
		inputRef,
		setInputRef,
		valueDescriptionId,
		registerValueDescriptionId: createRegisterId(setValueDescriptionId),
		generateId: (suffix) => `${untrack(() => access(mergedProps.id))}-${suffix}`,
		increment,
		decrement,
		incrementPage,
		decrementPage,
		setSegment,
		clearSegment,
		formatValue,
		fieldAriaLabel,
		fieldAriaLabelledBy,
		fieldAriaDescribedBy,
		setFieldAriaLabel,
		setFieldAriaLabelledBy,
		setFieldAriaDescribedBy
	};
	const plainOthers = createMemo(() => ({ ...others }));
	return createComponent(FormControlContext, {
		value: formControlContext,
		get children() {
			return createComponent(DateFieldContext, {
				value: context,
				get children() {
					return createComponent(Polymorphic, mergeProps({ as: "div" }, () => formControlContext.dataset(), plainOthers, {
						ref: [setRef, mergedProps.ref],
						role: "group",
						get id() {
							return access(mergedProps.id);
						},
						get ["aria-invalid"]() {
							return formControlContext.validationState() === "invalid" ? "true" : void 0;
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
						get ["aria-labelledby"]() {
							return ariaLabelledBy();
						},
						get ["aria-describedby"]() {
							return ariaDescribedBy();
						},
						get children() {
							return [memo(() => mergedProps.children), createComponent(DateFieldValueDescription, {})];
						}
					}));
				}
			});
		}
	});
}
//#endregion
//#region src/date-field/date-field-segment.tsx
const TYPE_MAPPING = { dayperiod: "dayPeriod" };
function DateFieldSegment(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const formControlContext = useFormControlContext();
	const context = useDateFieldContext();
	const mergedProps = merge({ id: `${context.generateId("segment")}-${createUniqueId()}` }, props);
	const others = omit(mergedProps, "ref", "segment", "children", "onKeyDown", "onBeforeInput", "onInput", "onFocus");
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
	const firstSegment = createMemo(() => context.segments().find((s) => s.isEditable));
	const name = createMemo(() => {
		return mergedProps.segment.type === "literal" ? "" : context.translations()[mergedProps.segment.type];
	});
	const ariaLabel = createMemo(() => {
		return `${name()}${context.fieldAriaLabel() ? `, ${context.fieldAriaLabel()}` : ""}`;
	});
	const ariaLabelledBy = createMemo(() => {
		return [mergedProps.id, context.fieldAriaLabelledBy()].filter(Boolean).join(" ") || void 0;
	});
	const ariaDescribedBy = createMemo(() => {
		if (mergedProps.segment !== firstSegment() && formControlContext.validationState() !== "invalid") return;
		return context.ariaDescribedBy();
	});
	const isEditable = createMemo(() => {
		return !formControlContext.isDisabled() && !formControlContext.isReadOnly() && mergedProps.segment.isEditable;
	});
	const inputMode = createMemo(() => {
		return formControlContext.isDisabled() || mergedProps.segment.type === "dayPeriod" || !isEditable() ? void 0 : "numeric";
	});
	const filter = createFilter({ sensitivity: "base" });
	const options = createMemo(() => context.dateFormatterResolvedOptions());
	const { locale } = useLocale();
	const monthDateFormatter = createDateFormatter(() => ({
		month: "long",
		timeZone: options().timeZone
	}));
	const hourDateFormatter = createDateFormatter(() => ({
		hour: "numeric",
		hour12: options().hour12,
		timeZone: options().timeZone
	}));
	const amPmFormatter = createDateFormatter({
		hour: "numeric",
		hour12: true
	});
	const am = createMemo(() => {
		const date = /* @__PURE__ */ new Date();
		date.setHours(0);
		return amPmFormatter().formatToParts(date).find((part) => part.type === "dayPeriod")?.value ?? "";
	});
	const pm = createMemo(() => {
		const date = /* @__PURE__ */ new Date();
		date.setHours(12);
		return amPmFormatter().formatToParts(date).find((part) => part.type === "dayPeriod")?.value ?? "";
	});
	const numberParser = createMemo(() => {
		return new NumberParser(locale(), { maximumFractionDigits: 0 });
	});
	const onBackspaceKeyDown = () => {
		if (numberParser().isValidPartialNumber(mergedProps.segment.text) && !formControlContext.isReadOnly() && !mergedProps.segment.isPlaceholder) {
			const newValue = mergedProps.segment.text.slice(0, -1);
			const parsed = numberParser().parse(newValue);
			if (newValue.length === 0 || parsed === 0) context.clearSegment(mergedProps.segment.type);
			else context.setSegment(mergedProps.segment.type, parsed);
			enteredKeys = newValue;
		} else if (mergedProps.segment.type === "dayPeriod") context.clearSegment(mergedProps.segment.type);
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
		switch (mergedProps.segment.type) {
			case "dayPeriod":
				if (filter.startsWith(am(), key)) context.setSegment("dayPeriod", 0);
				else if (filter.startsWith(pm(), key)) context.setSegment("dayPeriod", 12);
				else break;
				context.focusManager().focusNext();
				break;
			case "day":
			case "hour":
			case "minute":
			case "second":
			case "month":
			case "year": {
				if (!numberParser().isValidPartialNumber(newValue)) return;
				let numberValue = numberParser().parse(newValue);
				let segmentValue = numberValue;
				const allowsZero = mergedProps.segment.minValue === 0;
				if (mergedProps.segment.type === "hour" && context.dateFormatterResolvedOptions().hour12) {
					switch (context.dateFormatterResolvedOptions().hourCycle) {
						case "h11":
							if (numberValue > 11) segmentValue = numberParser().parse(key);
							break;
						case "h12": if (numberValue > 12) segmentValue = numberParser().parse(key);
					}
					if (mergedProps.segment.value != null && mergedProps.segment.value >= 12 && numberValue > 1) numberValue += 12;
				} else if (mergedProps.segment.maxValue != null && numberValue > mergedProps.segment.maxValue) segmentValue = numberParser().parse(key);
				if (Number.isNaN(numberValue)) return;
				const shouldSetValue = segmentValue !== 0 || allowsZero;
				if (shouldSetValue) context.setSegment(mergedProps.segment.type, segmentValue);
				if (mergedProps.segment.maxValue != null && Number(`${numberValue}0`) > mergedProps.segment.maxValue || newValue.length >= String(mergedProps.segment.maxValue).length) {
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
				if (numberParser().isValidPartialNumber(mergedProps.segment.text) && !formControlContext.isReadOnly()) onBackspaceKeyDown();
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
				if (filter.startsWith(am(), data) || filter.startsWith(pm(), data)) onInputBase(data);
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
	const onIncrement = () => {
		enteredKeys = "";
		context.increment(mergedProps.segment.type);
	};
	const onDecrement = () => {
		enteredKeys = "";
		context.decrement(mergedProps.segment.type);
	};
	const onIncrementPage = () => {
		enteredKeys = "";
		context.incrementPage(mergedProps.segment.type);
	};
	const onDecrementPage = () => {
		enteredKeys = "";
		context.decrementPage(mergedProps.segment.type);
	};
	const onDecrementToMin = () => {
		if (mergedProps.segment.minValue == null) return;
		enteredKeys = "";
		context.setSegment(mergedProps.segment.type, mergedProps.segment.minValue);
	};
	const onIncrementToMax = () => {
		if (mergedProps.segment.maxValue == null) return;
		enteredKeys = "";
		context.setSegment(mergedProps.segment.type, mergedProps.segment.maxValue);
	};
	const [textValue, setTextValue] = createSignal(untrack(() => mergedProps.segment.isPlaceholder ? "" : mergedProps.segment.text));
	createEffect(() => {
		const resolvedDateValue = context.dateValue();
		const type = mergedProps.segment.type;
		const isPlaceholder = mergedProps.segment.isPlaceholder;
		const text = mergedProps.segment.text;
		if (resolvedDateValue && type === "month" && !isPlaceholder) return {
			kind: "month",
			value: monthDateFormatter().format(resolvedDateValue)
		};
		if (resolvedDateValue && type === "hour" && !isPlaceholder) return {
			kind: "hour",
			value: hourDateFormatter().format(resolvedDateValue)
		};
		if (resolvedDateValue) return { kind: "none" };
		return {
			kind: "fallback",
			value: isPlaceholder ? "" : text
		};
	}, (result) => {
		if (result.kind === "month") setTextValue((prev) => result.value !== prev ? `${prev} – ${result.value}` : result.value);
		else if (result.kind === "hour" || result.kind === "fallback") setTextValue(result.value);
	});
	createEffect(() => context.focusManager(), (focusManager) => {
		const element = untrack(ref);
		return () => {
			if (element && element.ownerDocument.activeElement === element) {
				if (!focusManager.focusPrevious()) focusManager.focusNext();
			}
		};
	});
	return createComponent(Show, {
		get when() {
			return mergedProps.segment.type !== "literal";
		},
		get fallback() {
			return createComponent(Polymorphic, mergeProps({
				as: "div",
				"aria-hidden": true,
				"data-separator": ""
			}, others, { get children() {
				return mergedProps.segment.text;
			} }));
		},
		get children() {
			return createComponent(SpinButtonRoot, mergeProps({
				ref: [setRef, mergedProps.ref],
				get tabindex() {
					return formControlContext.isDisabled() ? void 0 : 0;
				},
				get value() {
					return mergedProps.segment.value;
				},
				get textValue() {
					return textValue();
				},
				get minValue() {
					return mergedProps.segment.minValue;
				},
				get maxValue() {
					return mergedProps.segment.maxValue;
				},
				get validationState() {
					return formControlContext.validationState();
				},
				get required() {
					return formControlContext.isRequired();
				},
				get disabled() {
					return formControlContext.isDisabled();
				},
				get readOnly() {
					return formControlContext.isReadOnly() || !mergedProps.segment.isEditable;
				},
				get contentEditable() {
					return isEditable();
				},
				get inputMode() {
					return inputMode();
				},
				get autocorrect() {
					return isEditable() ? "off" : void 0;
				},
				get autoCapitalize() {
					return isEditable() ? "off" : void 0;
				},
				get spellcheck() {
					return isEditable() ? false : void 0;
				},
				get enterkeyhint() {
					return isEditable() ? "next" : void 0;
				},
				style: { "caret-color": "transparent" },
				get ["aria-label"]() {
					return ariaLabel();
				},
				get ["aria-labelledby"]() {
					return ariaLabelledBy();
				},
				get ["aria-describedby"]() {
					return ariaDescribedBy();
				},
				get ["data-placeholder"]() {
					return mergedProps.segment.isPlaceholder ? "" : void 0;
				},
				get ["data-type"]() {
					return TYPE_MAPPING[mergedProps.segment.type] || mergedProps.segment.type;
				}
			}, () => formControlContext.dataset(), others, {
				onKeyDown,
				onBeforeInput,
				onInput,
				onFocus,
				onIncrement,
				onDecrement,
				onIncrementPage,
				onDecrementPage,
				onDecrementToMin,
				onIncrementToMax
			}, touchPropOverrides, { get children() {
				return createComponent(Show, {
					get when() {
						return resolvedChildren();
					},
					get fallback() {
						return mergedProps.segment.text;
					},
					get children() {
						return resolvedChildren();
					}
				});
			} }));
		}
	});
}
//#endregion
//#region src/date-field/index.tsx
const DateField = Object.assign(DateFieldRoot, {
	Label: DateFieldLabel,
	Input: DateFieldInput,
	Segment: DateFieldSegment,
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	HiddenInput: DateFieldHiddenInput
});
//#endregion
export { DateField, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, DateFieldHiddenInput as HiddenInput, DateFieldInput as Input, DateFieldLabel as Label, DateFieldRoot as Root, DateFieldSegment as Segment };
