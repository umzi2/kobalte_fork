import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { useLocale } from "../i18n/index.js";
import { _ as asRangeValue, a as CalendarNextTrigger, b as isDateInvalid, c as CalendarGridHeaderRow, d as CalendarGridBodyRow, f as CalendarGridBodyCellTrigger, g as asArrayValue, h as CalendarGrid, i as CalendarPrevTrigger, l as CalendarGridHeaderCell, m as CalendarGridBody, o as CalendarHeading, p as CalendarGridBodyCell, s as CalendarHeader, t as Calendar, u as CalendarGridHeader, v as asSingleValue, x as CalendarBody, y as getArrayValueOfSelection } from "../calendar/De1MpcoA.js";
import { T as toLocalISOString } from "../date-math/eXQ3A5eo.js";
import { a as createFormControl, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/BQ1mcKaU.js";
import { t as FormControlErrorMessage } from "../form-control-error-message/D9jUVumc.js";
import { t as FormControlLabel } from "../form-control-label/DqQ24y8m.js";
import { i as PopperArrow } from "../popper/BTyI8BKK.js";
import { c as PopoverContent, d as usePopoverContext, l as PopoverCloseButton, o as PopoverPortal, t as Popover, u as PopoverAnchor } from "../popover/Bwsvcpqj.js";
import { createComponent, effect, memo, mergeProps, setAttribute, style, template } from "@solidjs/web";
import { Show, createContext, createMemo, createUniqueId, merge, omit, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { visuallyHiddenStyles } from "@kobalte/utils";
//#region src/date-picker/date-picker-context.tsx
const DatePickerContext = createContext();
function useDatePickerContext() {
	const context = useContext(DatePickerContext);
	if (context === void 0) throw new Error("[kobalte]: `useDatePickerContext` must be used within a `DatePicker` component");
	return context;
}
//#endregion
//#region src/date-picker/date-picker-calendar.tsx
/**
* The calendar used to select a date, dates, or date range, rendered inside `DatePicker.Content`.
*/
function DatePickerCalendar(props) {
	const formControlContext = useFormControlContext();
	const context = useDatePickerContext();
	const popoverContext = usePopoverContext();
	const mergedProps = merge({ id: context.generateId("calendar") }, props);
	const onChange = (newValue) => {
		context.setDateValue(newValue);
		if (context.closeOnSelect()) popoverContext.close();
	};
	return createComponent(Calendar, mergeProps({
		autoFocus: true,
		get selectionMode() {
			return context.selectionMode();
		},
		get value() {
			return context.value();
		},
		onChange,
		get locale() {
			return context.locale();
		},
		get isDateUnavailable() {
			return context.isDateUnavailable;
		},
		get visibleDuration() {
			return context.visibleDuration();
		},
		get allowsNonContiguousRanges() {
			return context.allowsNonContiguousRanges();
		},
		get defaultFocusedValue() {
			return memo(() => !!context.value())() ? void 0 : context.placeholderValue();
		},
		get minValue() {
			return context.minValue();
		},
		get maxValue() {
			return context.maxValue();
		},
		get disabled() {
			return formControlContext.isDisabled();
		},
		get readOnly() {
			return formControlContext.isReadOnly();
		},
		get validationState() {
			return context.validationState();
		}
	}, mergedProps));
}
//#endregion
//#region src/date-picker/date-picker.intl.ts
const DATE_PICKER_INTL_MESSAGES = {
	selectedDateDescription: (date) => `Selected Date: ${date}`,
	selectedRangeDescription: (startDate, endDate) => `Selected Range: ${startDate} to ${endDate}`
};
//#endregion
//#region src/date-picker/date-picker-hidden-input.tsx
var _tmpl$ = /*#__PURE__*/ template(`<input type=text tabindex=-1 readonly aria-hidden=true>`);
/**
* Native input rendered for form serialization of the selected value(s), since
* there's no segmented text input to serve that role in this composition.
*/
function DatePickerHiddenInput(props) {
	const serializedValue = () => {
		if (props.value == null) return "";
		if (props.selectionMode === "single") {
			const date = asSingleValue(props.value);
			return date ? toLocalISOString(date, "day") : "";
		}
		if (props.selectionMode === "multiple") return asArrayValue(props.value)?.map((date) => toLocalISOString(date, "day")).join(",") ?? "";
		const range = asRangeValue(props.value);
		if (!range?.start || !range.end) return "";
		return `${toLocalISOString(range.start, "day")}/${toLocalISOString(range.end, "day")}`;
	};
	var _el$ = _tmpl$();
	effect(() => ({
		e: visuallyHiddenStyles,
		t: props.name,
		a: serializedValue(),
		o: props.required,
		i: props.disabled
	}), ({ e, t, a, o, i }, _p$) => {
		style(_el$, e, _p$?.e);
		t !== _p$?.t && setAttribute(_el$, "name", t);
		_el$.value = a ?? "";
		o !== _p$?.o && setAttribute(_el$, "required", o);
		i !== _p$?.i && setAttribute(_el$, "disabled", i);
	});
	return _el$;
}
//#endregion
//#region src/date-picker/date-picker-root.tsx
/**
* A date picker combines a `Calendar` popover (opened from a trigger button)
* to allow users to select a date, dates, or date range.
*/
function DatePickerRoot(props) {
	const defaultId = `date-picker-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		visibleDuration: { months: 1 },
		selectionMode: "single",
		modal: false,
		gutter: 8,
		sameWidth: false,
		placement: "bottom-start",
		translations: DATE_PICKER_INTL_MESSAGES
	}, props);
	const popoverPropNames = [
		"open",
		"defaultOpen",
		"onOpenChange",
		"modal",
		"preventScroll",
		"forceMount",
		"getAnchorRect",
		"placement",
		"gutter",
		"shift",
		"flip",
		"slide",
		"overlap",
		"sameWidth",
		"fitViewport",
		"hideWhenDetached",
		"detachedPadding",
		"arrowPadding",
		"overflowPadding"
	];
	const popoverProps = createMemo(() => {
		const props = {};
		for (const name of popoverPropNames) if (name in mergedProps) props[name] = mergedProps[name];
		return props;
	});
	const nonGroupPropNames = [
		"translations",
		"locale",
		"visibleDuration",
		"selectionMode",
		"isDateUnavailable",
		"allowsNonContiguousRanges",
		"closeOnSelect",
		"minValue",
		"maxValue",
		"placeholderValue",
		"value",
		"defaultValue",
		"onChange",
		"id",
		"name",
		"required",
		"disabled",
		"readOnly",
		"validationState",
		"children",
		...popoverPropNames
	];
	const others = omit(mergedProps, ...nonGroupPropNames);
	const locale = createMemo(() => {
		return mergedProps.locale ?? useLocale().locale();
	});
	const [value, setValue] = (0, primitives_exports.createControllableSignal)({
		value: () => mergedProps.value,
		defaultValue: () => mergedProps.defaultValue,
		onChange: (value) => mergedProps.onChange?.(value)
	});
	const closeOnSelect = createMemo(() => {
		return mergedProps.closeOnSelect ?? mergedProps.selectionMode !== "multiple";
	});
	const validationState = createMemo(() => {
		if (mergedProps.validationState) return mergedProps.validationState;
		const values = getArrayValueOfSelection(mergedProps.selectionMode, value());
		if (values.length <= 0) return;
		return values.some((date) => {
			return mergedProps.isDateUnavailable?.(date) || isDateInvalid(date, mergedProps.minValue, mergedProps.maxValue);
		}) ? "invalid" : void 0;
	});
	const dateFormatter = createMemo(() => {
		return new Intl.DateTimeFormat(locale(), {
			year: "numeric",
			month: "long",
			day: "numeric"
		});
	});
	const formatDate = (date) => {
		return date ? dateFormatter().format(date) : "";
	};
	const formattedValue = createMemo(() => {
		const resolvedValue = value();
		if (resolvedValue == null) return "";
		if (mergedProps.selectionMode === "single") return formatDate(asSingleValue(resolvedValue));
		if (mergedProps.selectionMode === "multiple") return asArrayValue(resolvedValue)?.map(formatDate).join(", ") ?? "";
		const range = asRangeValue(resolvedValue);
		if (!range?.start || !range.end) return "";
		return `${formatDate(range.start)} – ${formatDate(range.end)}`;
	});
	const ariaDescribedBy = () => {
		const resolvedValue = value();
		if (resolvedValue == null) return;
		if (mergedProps.selectionMode === "range") {
			const range = asRangeValue(resolvedValue);
			if (!range?.start || !range.end) return;
			return mergedProps.translations.selectedRangeDescription(toLocalISOString(range.start, "day"), toLocalISOString(range.end, "day"));
		}
		const firstValue = mergedProps.selectionMode === "multiple" ? asArrayValue(resolvedValue)?.[0] : asSingleValue(resolvedValue);
		return firstValue ? mergedProps.translations.selectedDateDescription(toLocalISOString(firstValue, "day")) : void 0;
	};
	const formControlProps = omit(mergedProps, ...[
		"translations",
		"locale",
		"visibleDuration",
		"selectionMode",
		"isDateUnavailable",
		"allowsNonContiguousRanges",
		"closeOnSelect",
		"minValue",
		"maxValue",
		"placeholderValue",
		"value",
		"defaultValue",
		"onChange",
		"children",
		"open",
		"defaultOpen",
		"onOpenChange",
		"modal",
		"forceMount",
		"getAnchorRect",
		"placement",
		"gutter",
		"shift",
		"flip",
		"slide",
		"overlap",
		"sameWidth",
		"fitViewport",
		"hideWhenDetached",
		"detachedPadding",
		"arrowPadding",
		"overflowPadding"
	]);
	const { formControlContext } = createFormControl(merge(formControlProps, { get validationState() {
		return validationState();
	} }));
	const context = {
		dataset: createMemo(() => ({
			"data-expanded": void 0,
			"data-closed": void 0
		})),
		isDisabled: () => formControlContext.isDisabled() ?? false,
		translations: () => mergedProps.translations,
		selectionMode: () => mergedProps.selectionMode,
		visibleDuration: () => mergedProps.visibleDuration,
		allowsNonContiguousRanges: () => mergedProps.allowsNonContiguousRanges ?? false,
		closeOnSelect,
		minValue: () => mergedProps.minValue,
		maxValue: () => mergedProps.maxValue,
		placeholderValue: () => mergedProps.placeholderValue,
		locale,
		ariaDescribedBy,
		validationState,
		value,
		formattedValue,
		isDateUnavailable: (date) => mergedProps.isDateUnavailable?.(date) ?? false,
		setDateValue: (newValue) => setValue(newValue),
		generateId: (part) => `${access(mergedProps.id)}-${part}`
	};
	return createComponent(FormControlContext, {
		value: formControlContext,
		get children() {
			return createComponent(DatePickerContext, {
				value: context,
				get children() {
					return createComponent(Popover, mergeProps({ get id() {
						return mergedProps.id;
					} }, popoverProps, { get children() {
						return [createComponent(Polymorphic, mergeProps({
							as: "div",
							role: "group",
							get id() {
								return mergedProps.id;
							},
							get ["aria-invalid"]() {
								return validationState() === "invalid" ? "true" : void 0;
							},
							get ["aria-required"]() {
								return formControlContext.isRequired() ? "true" : void 0;
							},
							get ["aria-disabled"]() {
								return formControlContext.isDisabled() ? "true" : void 0;
							},
							get ["aria-readonly"]() {
								return formControlContext.isReadOnly() ? "true" : void 0;
							}
						}, () => formControlContext.dataset(), others, { get children() {
							return mergedProps.children;
						} })), memo(() => memo(() => !!mergedProps.name)() ? createComponent(DatePickerHiddenInput, {
							get name() {
								return mergedProps.name;
							},
							get selectionMode() {
								return mergedProps.selectionMode;
							},
							get value() {
								return value();
							},
							get required() {
								return mergedProps.required;
							},
							get disabled() {
								return formControlContext.isDisabled();
							}
						}) : mergedProps.name)];
					} }));
				}
			});
		}
	});
}
//#endregion
//#region src/date-picker/date-picker-trigger.tsx
/**
* The button that opens the date picker's calendar popover.
*/
function DatePickerTrigger(props) {
	const formControlContext = useFormControlContext();
	const context = useDatePickerContext();
	const mergedProps = merge({ id: context.generateId("trigger") }, props);
	const others = omit(mergedProps, "disabled", "aria-labelledby", "aria-describedby");
	const isDisabled = () => {
		return mergedProps.disabled || context.isDisabled() || formControlContext.isDisabled() || formControlContext.isReadOnly();
	};
	const ariaLabelledBy = () => {
		return formControlContext.getAriaLabelledBy(others.id, others["aria-label"], mergedProps["aria-labelledby"]);
	};
	const ariaDescribedBy = () => {
		return [mergedProps["aria-describedby"], context.ariaDescribedBy()].filter(Boolean).join(" ") || void 0;
	};
	return createComponent(Popover.Trigger, mergeProps(() => formControlContext.dataset(), others, {
		get disabled() {
			return isDisabled();
		},
		get ["aria-labelledby"]() {
			return ariaLabelledBy();
		},
		get ["aria-describedby"]() {
			return ariaDescribedBy();
		}
	}));
}
//#endregion
//#region src/date-picker/date-picker-value.tsx
/**
* Displays the formatted selected date, dates, or range, falling back to its
* children as a placeholder when nothing is selected yet.
*/
function DatePickerValue(props) {
	const formControlContext = useFormControlContext();
	const context = useDatePickerContext();
	const mergedProps = merge({ id: context.generateId("value") }, props);
	const others = omit(mergedProps, "id", "children");
	const isEmpty = () => context.value() == null;
	return createComponent(Polymorphic, mergeProps({ as: "span" }, () => formControlContext.dataset(), others, {
		get id() {
			return mergedProps.id;
		},
		get ["data-placeholder-shown"]() {
			return isEmpty() ? "" : void 0;
		},
		get children() {
			return createComponent(Show, {
				get when() {
					return !isEmpty();
				},
				get fallback() {
					return mergedProps.children;
				},
				get children() {
					return context.formattedValue();
				}
			});
		}
	}));
}
//#endregion
//#region src/date-picker/index.tsx
var date_picker_exports = /* @__PURE__ */ __exportAll({
	Anchor: () => PopoverAnchor,
	Arrow: () => PopperArrow,
	Calendar: () => DatePickerCalendar,
	CalendarBody: () => CalendarBody,
	CalendarGrid: () => CalendarGrid,
	CalendarGridBody: () => CalendarGridBody,
	CalendarGridBodyCell: () => CalendarGridBodyCell,
	CalendarGridBodyCellTrigger: () => CalendarGridBodyCellTrigger,
	CalendarGridBodyRow: () => CalendarGridBodyRow,
	CalendarGridHeader: () => CalendarGridHeader,
	CalendarGridHeaderCell: () => CalendarGridHeaderCell,
	CalendarGridHeaderRow: () => CalendarGridHeaderRow,
	CalendarHeader: () => CalendarHeader,
	CalendarHeading: () => CalendarHeading,
	CalendarNextTrigger: () => CalendarNextTrigger,
	CalendarPrevTrigger: () => CalendarPrevTrigger,
	CloseButton: () => PopoverCloseButton,
	Content: () => PopoverContent,
	DatePicker: () => DatePicker,
	Description: () => FormControlDescription,
	ErrorMessage: () => FormControlErrorMessage,
	Label: () => FormControlLabel,
	Portal: () => PopoverPortal,
	Root: () => DatePickerRoot,
	Trigger: () => DatePickerTrigger,
	Value: () => DatePickerValue
});
const DatePicker = Object.assign(DatePickerRoot, {
	Anchor: PopoverAnchor,
	Arrow: PopperArrow,
	Calendar: DatePickerCalendar,
	CalendarBody,
	CalendarGrid,
	CalendarGridBody,
	CalendarGridBodyCell,
	CalendarGridBodyCellTrigger,
	CalendarGridBodyRow,
	CalendarGridHeader,
	CalendarGridHeaderCell,
	CalendarGridHeaderRow,
	CalendarHeader,
	CalendarHeading,
	CalendarNextTrigger,
	CalendarPrevTrigger,
	CloseButton: PopoverCloseButton,
	Content: PopoverContent,
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	Label: FormControlLabel,
	Portal: PopoverPortal,
	Trigger: DatePickerTrigger,
	Value: DatePickerValue
});
//#endregion
export { DatePickerRoot as a, DatePickerTrigger as i, date_picker_exports as n, DatePickerCalendar as o, DatePickerValue as r, DatePicker as t };
