import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { Polymorphic } from "../polymorphic/index.jsx";
import { t as primitives_exports } from "../primitives/BlSoAAAV.jsx";
import { useLocale } from "../i18n/index.jsx";
import { _ as asRangeValue, a as CalendarNextTrigger, b as isDateInvalid, c as CalendarGridHeaderRow, d as CalendarGridBodyRow, f as CalendarGridBodyCellTrigger, g as asArrayValue, h as CalendarGrid, i as CalendarPrevTrigger, l as CalendarGridHeaderCell, m as CalendarGridBody, o as CalendarHeading, p as CalendarGridBodyCell, s as CalendarHeader, t as Calendar, u as CalendarGridHeader, v as asSingleValue, x as CalendarBody, y as getArrayValueOfSelection } from "../calendar/Dv1wzWx4.jsx";
import { T as toLocalISOString } from "../date-math/eXQ3A5eo.jsx";
import { a as createFormControl, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/Dc7vmdKW.jsx";
import { t as FormControlErrorMessage } from "../form-control-error-message/B1cNIdVV.jsx";
import { t as FormControlLabel } from "../form-control-label/Czoesrj9.jsx";
import { i as PopperArrow } from "../popper/BSUmx7sN.jsx";
import { c as PopoverContent, d as usePopoverContext, l as PopoverCloseButton, o as PopoverPortal, t as Popover, u as PopoverAnchor } from "../popover/CuBdlrih.jsx";
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
	return <Calendar autoFocus selectionMode={context.selectionMode()} value={context.value()} onChange={onChange} locale={context.locale()} isDateUnavailable={context.isDateUnavailable} visibleDuration={context.visibleDuration()} allowsNonContiguousRanges={context.allowsNonContiguousRanges()} defaultFocusedValue={context.value() ? void 0 : context.placeholderValue()} minValue={context.minValue()} maxValue={context.maxValue()} disabled={formControlContext.isDisabled()} readOnly={formControlContext.isReadOnly()} validationState={context.validationState()} {...mergedProps} />;
}
//#endregion
//#region src/date-picker/date-picker.intl.ts
const DATE_PICKER_INTL_MESSAGES = {
	selectedDateDescription: (date) => `Selected Date: ${date}`,
	selectedRangeDescription: (startDate, endDate) => `Selected Range: ${startDate} to ${endDate}`
};
//#endregion
//#region src/date-picker/date-picker-hidden-input.tsx
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
	return <input type="text" tabindex={-1} style={visuallyHiddenStyles} name={props.name} value={serializedValue()} required={props.required} disabled={props.disabled} readonly aria-hidden="true" />;
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
	return <FormControlContext value={formControlContext}>
			<DatePickerContext value={context}>
				<Popover id={mergedProps.id} {...popoverProps()}>
					<Polymorphic as="div" role="group" id={mergedProps.id} aria-invalid={validationState() === "invalid" ? "true" : void 0} aria-required={formControlContext.isRequired() ? "true" : void 0} aria-disabled={formControlContext.isDisabled() ? "true" : void 0} aria-readonly={formControlContext.isReadOnly() ? "true" : void 0} {...formControlContext.dataset()} {...others}>
						{mergedProps.children}
					</Polymorphic>
					{mergedProps.name && <DatePickerHiddenInput name={mergedProps.name} selectionMode={mergedProps.selectionMode} value={value()} required={mergedProps.required} disabled={formControlContext.isDisabled()} />}
				</Popover>
			</DatePickerContext>
		</FormControlContext>;
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
	return <Popover.Trigger {...formControlContext.dataset()} {...others} disabled={isDisabled()} aria-labelledby={ariaLabelledBy()} aria-describedby={ariaDescribedBy()} />;
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
	return <Polymorphic as="span" {...formControlContext.dataset()} {...others} id={mergedProps.id} data-placeholder-shown={isEmpty() ? "" : void 0}>
			<Show when={!isEmpty()} fallback={mergedProps.children}>
				{context.formattedValue()}
			</Show>
		</Polymorphic>;
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
