import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { r as ButtonRoot } from "../button/C_WaGidW.js";
import { createDateFormatter, getReadingDirection, useLocale } from "../i18n/index.js";
import { C as startOfYear, E as todayDate, S as startOfWeek, T as toLocalISOString, a as endOfWeek, c as isSameDay, d as isWeekend, f as maxDate, i as endOfMonth, l as isSameMonth, n as compareDates, p as minDate, s as getWeeksInMonth, t as addDuration, u as isToday, w as subtractDuration, x as startOfMonth } from "../date-math/eXQ3A5eo.js";
import { n as announce } from "../live-announcer/DugqoFo-.js";
import { createComponent, mergeProps } from "@solidjs/web";
import { For, createContext, createEffect, createMemo, createSignal, merge, omit, untrack, useContext } from "solid-js";
import { callHandler } from "@kobalte/utils";
import { createInteractOutside } from "@solid-primitives/interaction";
//#region src/calendar/calendar-body.tsx
/**
* Contains the calendar grids.
*/
function CalendarBody(props) {
	return createComponent(Polymorphic, mergeProps({ as: "div" }, props));
}
//#endregion
//#region src/calendar/calendar-context.tsx
const CalendarContext = createContext();
function useCalendarContext() {
	const context = useContext(CalendarContext);
	if (context === void 0) throw new Error("[kobalte]: `useCalendarContext` must be used within a `Calendar` component");
	return context;
}
//#endregion
//#region src/calendar/calendar-grid-context.tsx
const CalendarGridContext = createContext();
function useCalendarGridContext() {
	const context = useContext(CalendarGridContext);
	if (context === void 0) throw new Error("[kobalte]: `useCalendarGridContext` must be used within a `Calendar.Grid` component");
	return context;
}
//#endregion
//#region src/calendar/utils.ts
/*!
* Portions of this file are based on code from react-spectrum.
* Apache License Version 2.0, Copyright 2020 Adobe.
*
* Credits to the React Spectrum team:
* https://github.com/adobe/react-spectrum/blob/0a1d0cd4e1b2f77eed7c0ea08fce8a04f8de6921/packages/@react-stately/calendar/src/utils.ts
*
* Portions of this file are based on code from zag, based on code from react-spectrum.
* MIT Licensed, Copyright (c) 2021 Chakra UI.
*
* Credits to the Chakra UI team:
* https://github.com/chakra-ui/zag/blob/main/packages/utilities/date-utils/src/pagination.ts
*
* Reworked for native `Date` values — no calendar-system conversion (`toCalendar`) or
* explicit time-zone concept, so date math delegates to `./date-math.ts` and formatting
* delegates to native `Intl.DateTimeFormat` instead of `@internationalized/date`.
*/
function constrainStart(date, aligned, duration, locale, min, max) {
	let computedDate = aligned;
	if (min && compareDates(date, min) >= 0) computedDate = maxDate(computedDate, alignStart(min, duration, locale)) ?? computedDate;
	if (max && compareDates(date, max) <= 0) computedDate = minDate(computedDate, alignEnd(max, duration, locale)) ?? computedDate;
	return computedDate;
}
function constrainValue(date, min, max) {
	let computedDate = date;
	if (min) computedDate = maxDate(computedDate, min) ?? computedDate;
	if (max) computedDate = minDate(computedDate, max) ?? computedDate;
	return computedDate;
}
function alignStart(date, duration, locale, min, max) {
	let aligned = date;
	if (duration.years) aligned = startOfYear(date);
	else if (duration.months) aligned = startOfMonth(date);
	else if (duration.weeks) aligned = startOfWeek(date, locale);
	return constrainStart(date, aligned, duration, locale, min, max);
}
function alignCenter(date, duration, locale, min, max) {
	const halfDuration = {};
	for (const key in duration) {
		halfDuration[key] = Math.floor(duration[key] / 2);
		if (halfDuration[key] > 0 && duration[key] % 2 === 0) halfDuration[key]--;
	}
	return constrainStart(date, subtractDuration(alignStart(date, duration, locale), halfDuration), duration, locale, min, max);
}
function alignEnd(date, duration, locale, min, max) {
	const d = { ...duration };
	if (d.days) d.days--;
	else if (d.weeks) d.weeks--;
	else if (d.months) d.months--;
	else if (d.years) d.years--;
	return constrainStart(date, subtractDuration(alignStart(date, duration, locale), d), duration, locale, min, max);
}
function alignDate(date, alignment, duration, locale, min, max) {
	switch (alignment) {
		case "start": return alignStart(date, duration, locale, min, max);
		case "end": return alignEnd(date, duration, locale, min, max);
		default: return alignCenter(date, duration, locale, min, max);
	}
}
function isDateInvalid(date, minValue, maxValue) {
	return date != null && (minValue != null && compareDates(date, minValue) < 0 || maxValue != null && compareDates(date, maxValue) > 0);
}
function isPreviousVisibleRangeInvalid(startDate, min, max) {
	const prevDate = subtractDuration(startDate, { days: 1 });
	return isSameDay(prevDate, startDate) || isDateInvalid(prevDate, min, max);
}
function isNextVisibleRangeInvalid(endDate, min, max) {
	const nextDate = addDuration(endDate, { days: 1 });
	return isSameDay(nextDate, endDate) || isDateInvalid(nextDate, min, max);
}
function getEndDate(startDate, duration) {
	const d = { ...duration };
	if (d.days) d.days--;
	else d.days = -1;
	return addDuration(startDate, d);
}
function getAdjustedDateFn(visibleDuration, locale, min, max) {
	return function getDate(options) {
		const { startDate, focusedDate } = options;
		const endDate = getEndDate(startDate, visibleDuration);
		if (isDateInvalid(focusedDate, min, max)) return {
			startDate,
			endDate,
			focusedDate: constrainValue(focusedDate, min, max)
		};
		if (compareDates(focusedDate, startDate) < 0) return {
			startDate: alignEnd(focusedDate, visibleDuration, locale, min, max),
			endDate,
			focusedDate: constrainValue(focusedDate, min, max)
		};
		if (compareDates(focusedDate, endDate) > 0) return {
			startDate: alignStart(focusedDate, visibleDuration, locale, min, max),
			endDate,
			focusedDate: constrainValue(focusedDate, min, max)
		};
		return {
			startDate,
			endDate,
			focusedDate: constrainValue(focusedDate, min, max)
		};
	};
}
function getUnitDuration(duration) {
	const unit = { ...duration };
	for (const key in unit) unit[key] = 1;
	return unit;
}
function getNextUnavailableDate(anchorDate, start, end, isDateUnavailableFn, dir) {
	let nextDate = addDuration(anchorDate, { days: dir });
	while ((dir < 0 ? compareDates(nextDate, start) >= 0 : compareDates(nextDate, end) <= 0) && !isDateUnavailableFn(nextDate)) nextDate = addDuration(nextDate, { days: dir });
	if (isDateUnavailableFn(nextDate)) return addDuration(nextDate, { days: -dir });
}
function getPreviousAvailableDate(date, min, isDateUnavailable) {
	if (!isDateUnavailable) return date;
	while (compareDates(date, min) >= 0 && isDateUnavailable(date)) date = subtractDuration(date, { days: 1 });
	if (compareDates(date, min) >= 0) return date;
}
/** Return an array of values for the selection depending on the selection mode. */
function getArrayValueOfSelection(selectionMode, value) {
	let values = [];
	if (selectionMode === "single") values = [asSingleValue(value)];
	else if (selectionMode === "multiple") values = asArrayValue(value) ?? [];
	else if (selectionMode === "range") {
		const { start, end } = asRangeValue(value) ?? {};
		values = [start, end];
	}
	return values.filter(Boolean);
}
function formatRange(dateFormatter, translations, start, end) {
	const parts = dateFormatter.formatRangeToParts(start, end);
	let separatorIndex = -1;
	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		if (part.source === "shared" && part.type === "literal") separatorIndex = i;
		else if (part.source === "endRange") break;
	}
	let startValue = "";
	let endValue = "";
	for (let i = 0; i < parts.length; i++) if (i < separatorIndex) startValue += parts[i].value;
	else if (i > separatorIndex) endValue += parts[i].value;
	return translations.dateRange(startValue, endValue);
}
function getSelectedDateDescription(locale, translations, value) {
	const dateFormatter = new Intl.DateTimeFormat(locale, {
		weekday: "long",
		month: "long",
		year: "numeric",
		day: "numeric"
	});
	return translations.selectedDateDescription(dateFormatter.format(value));
}
function getSelectedDateRangeDescription(locale, translations, highlightedRange, anchorDate) {
	const start = highlightedRange.start;
	const end = highlightedRange.end;
	if (!anchorDate && start && end) {
		const dateFormatter = new Intl.DateTimeFormat(locale, {
			weekday: "long",
			month: "long",
			year: "numeric",
			day: "numeric"
		});
		if (isSameDay(start, end)) {
			const date = dateFormatter.format(start);
			return translations.selectedDateDescription(date);
		}
		const dateRange = formatRange(dateFormatter, translations, start, end);
		return translations.selectedRangeDescription(dateRange);
	}
	return "";
}
function getVisibleRangeDescription(locale, translations, startDate, endDate, isAria) {
	const monthFormatter = new Intl.DateTimeFormat(locale, {
		month: "long",
		year: "numeric"
	});
	const dateFormatter = new Intl.DateTimeFormat(locale, {
		month: "long",
		year: "numeric",
		day: "numeric"
	});
	if (isSameDay(startDate, startOfMonth(startDate))) {
		if (isSameDay(endDate, endOfMonth(startDate))) return monthFormatter.format(startDate);
		if (isSameDay(endDate, endOfMonth(endDate))) {
			if (isAria) return formatRange(monthFormatter, translations, startDate, endDate);
			return monthFormatter.formatRange(startDate, endDate);
		}
	}
	if (isAria) return formatRange(dateFormatter, translations, startDate, endDate);
	return dateFormatter.formatRange(startDate, endDate);
}
function getNextPage(focusedDate, startDate, visibleDuration, locale, min, max) {
	const adjust = getAdjustedDateFn(visibleDuration, locale, min, max);
	const start = addDuration(startDate, visibleDuration);
	return adjust({
		focusedDate: addDuration(focusedDate, visibleDuration),
		startDate: alignStart(constrainStart(focusedDate, start, visibleDuration, locale, min, max), visibleDuration, locale)
	});
}
function getPreviousPage(focusedDate, startDate, visibleDuration, locale, min, max) {
	const adjust = getAdjustedDateFn(visibleDuration, locale, min, max);
	const start = subtractDuration(startDate, visibleDuration);
	return adjust({
		focusedDate: subtractDuration(focusedDate, visibleDuration),
		startDate: alignStart(constrainStart(focusedDate, start, visibleDuration, locale, min, max), visibleDuration, locale)
	});
}
function getNextRow(focusedDate, startDate, visibleDuration, locale, min, max) {
	const adjust = getAdjustedDateFn(visibleDuration, locale, min, max);
	if (visibleDuration.days) return getNextPage(focusedDate, startDate, visibleDuration, locale, min, max);
	if (visibleDuration.weeks || visibleDuration.months || visibleDuration.years) return adjust({
		focusedDate: addDuration(focusedDate, { weeks: 1 }),
		startDate
	});
}
function getPreviousRow(focusedDate, startDate, visibleDuration, locale, min, max) {
	const adjust = getAdjustedDateFn(visibleDuration, locale, min, max);
	if (visibleDuration.days) return getPreviousPage(focusedDate, startDate, visibleDuration, locale, min, max);
	if (visibleDuration.weeks || visibleDuration.months || visibleDuration.years) return adjust({
		focusedDate: subtractDuration(focusedDate, { weeks: 1 }),
		startDate
	});
}
function getSectionStart(focusedDate, startDate, visibleDuration, locale, min, max) {
	const adjust = getAdjustedDateFn(visibleDuration, locale, min, max);
	if (visibleDuration.days) return adjust({
		focusedDate: startDate,
		startDate
	});
	if (visibleDuration.weeks) return adjust({
		focusedDate: startOfWeek(focusedDate, locale),
		startDate
	});
	if (visibleDuration.months || visibleDuration.years) return adjust({
		focusedDate: startOfMonth(focusedDate),
		startDate
	});
}
function getSectionEnd(focusedDate, startDate, visibleDuration, locale, min, max) {
	const adjust = getAdjustedDateFn(visibleDuration, locale, min, max);
	const endDate = getEndDate(startDate, visibleDuration);
	if (visibleDuration.days) return adjust({
		focusedDate: endDate,
		startDate
	});
	if (visibleDuration.weeks) return adjust({
		focusedDate: endOfWeek(focusedDate, locale),
		startDate
	});
	if (visibleDuration.months || visibleDuration.years) return adjust({
		focusedDate: endOfMonth(focusedDate),
		startDate
	});
}
function getNextSection(focusedDate, startDate, larger, visibleDuration, locale, min, max) {
	const adjust = getAdjustedDateFn(visibleDuration, locale, min, max);
	if (!larger && !visibleDuration.days) return adjust({
		focusedDate: addDuration(focusedDate, getUnitDuration(visibleDuration)),
		startDate
	});
	if (visibleDuration.days) return getNextPage(focusedDate, startDate, visibleDuration, locale, min, max);
	if (visibleDuration.weeks) return adjust({
		focusedDate: addDuration(focusedDate, { months: 1 }),
		startDate
	});
	if (visibleDuration.months || visibleDuration.years) return adjust({
		focusedDate: addDuration(focusedDate, { years: 1 }),
		startDate
	});
}
function getPreviousSection(focusedDate, startDate, larger, visibleDuration, locale, min, max) {
	const adjust = getAdjustedDateFn(visibleDuration, locale, min, max);
	if (!larger && !visibleDuration.days) return adjust({
		focusedDate: subtractDuration(focusedDate, getUnitDuration(visibleDuration)),
		startDate
	});
	if (visibleDuration.days) return getPreviousPage(focusedDate, startDate, visibleDuration, locale, min, max);
	if (visibleDuration.weeks) return adjust({
		focusedDate: subtractDuration(focusedDate, { months: 1 }),
		startDate
	});
	if (visibleDuration.months || visibleDuration.years) return adjust({
		focusedDate: subtractDuration(focusedDate, { years: 1 }),
		startDate
	});
}
/** Narrow the type of `value` to `DateValue`. */
function asSingleValue(value) {
	return value;
}
/** Narrow the type of `value` to `DateValue[]`. */
function asArrayValue(value) {
	return value;
}
/** Narrow the type of `value` to `RangeValue<DateValue>`. */
function asRangeValue(value) {
	return value;
}
function sortDates(values) {
	return values.sort((a, b) => compareDates(a, b));
}
function makeCalendarDateRange(start, end) {
	if (!start || !end) return;
	if (compareDates(end, start) < 0) [start, end] = [end, start];
	return {
		start,
		end
	};
}
/** Preserves the time-of-day of `oldValue` (if any) onto `newValue`'s date. */
function convertValue(newValue, oldValue) {
	if (!oldValue) return newValue;
	const result = new Date(newValue);
	result.setHours(oldValue.getHours(), oldValue.getMinutes(), oldValue.getSeconds(), oldValue.getMilliseconds());
	return result;
}
//#endregion
//#region src/calendar/calendar-grid.tsx
/**
* A calendar grid displays a single grid of days within a calendar or range calendar which
* can be keyboard navigated and selected by the user.
*/
function CalendarGrid(props) {
	const rootContext = useCalendarContext();
	const mergedProps = merge({ weekDayFormat: "short" }, props);
	const others = omit(mergedProps, "offset", "weekDayFormat", "onKeyDown", "onFocusIn", "onFocusOut", "aria-label");
	const startDate = createMemo(() => {
		if (mergedProps.offset) return addDuration(rootContext.startDate(), mergedProps.offset);
		return rootContext.startDate();
	});
	const endDate = createMemo(() => endOfMonth(startDate()));
	const dayFormatter = createDateFormatter(() => ({ weekday: mergedProps.weekDayFormat }));
	const weekDays = createMemo(() => {
		const firstDayOfWeek = startOfWeek(todayDate(), rootContext.locale());
		return [...new Array(7).keys()].map((index) => {
			const date = addDuration(firstDayOfWeek, { days: index });
			return dayFormatter().format(date);
		});
	});
	const visibleRangeDescription = createMemo(() => {
		return getVisibleRangeDescription(rootContext.locale(), rootContext.translations(), startDate(), endDate(), true);
	});
	const ariaLabel = createMemo(() => {
		return [mergedProps["aria-label"], visibleRangeDescription()].filter(Boolean).join(", ") || void 0;
	});
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		switch (e.key) {
			case "Enter":
			case " ":
				e.preventDefault();
				rootContext.selectFocusedDate();
				break;
			case "PageUp":
				e.preventDefault();
				e.stopPropagation();
				rootContext.focusPreviousSection(e.shiftKey);
				break;
			case "PageDown":
				e.preventDefault();
				e.stopPropagation();
				rootContext.focusNextSection(e.shiftKey);
				break;
			case "End":
				e.preventDefault();
				e.stopPropagation();
				rootContext.focusSectionEnd();
				break;
			case "Home":
				e.preventDefault();
				e.stopPropagation();
				rootContext.focusSectionStart();
				break;
			case "ArrowLeft":
				e.preventDefault();
				e.stopPropagation();
				if (rootContext.direction() === "rtl") rootContext.focusNextDay();
				else rootContext.focusPreviousDay();
				break;
			case "ArrowUp":
				e.preventDefault();
				e.stopPropagation();
				rootContext.focusPreviousRow();
				break;
			case "ArrowRight":
				e.preventDefault();
				e.stopPropagation();
				if (rootContext.direction() === "rtl") rootContext.focusPreviousDay();
				else rootContext.focusNextDay();
				break;
			case "ArrowDown":
				e.preventDefault();
				e.stopPropagation();
				rootContext.focusNextRow();
				break;
			case "Escape": if (rootContext.selectionMode() === "range") {
				e.preventDefault();
				rootContext.setAnchorDate(void 0);
			}
		}
	};
	const onFocusIn = (e) => {
		callHandler(e, mergedProps.onFocusIn);
		rootContext.setIsFocused(true);
	};
	const onFocusOut = (e) => {
		callHandler(e, mergedProps.onFocusOut);
		rootContext.setIsFocused(false);
	};
	return createComponent(CalendarGridContext, {
		value: {
			startDate,
			weekDays
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "table",
				role: "grid",
				get ["aria-readonly"]() {
					return rootContext.isReadOnly() ? "true" : void 0;
				},
				get ["aria-disabled"]() {
					return rootContext.isDisabled() ? "true" : void 0;
				},
				get ["aria-multiselectable"]() {
					return rootContext.selectionMode() !== "single" ? "true" : "false";
				}
			}, others, {
				get ["aria-label"]() {
					return ariaLabel();
				},
				onKeyDown,
				onFocusIn,
				onFocusOut
			}));
		}
	});
}
//#endregion
//#region src/calendar/calendar-grid-body.tsx
/**
* A calendar grid body displays a grid of calendar cells within a month.
*/
function CalendarGridBody(props) {
	const rootContext = useCalendarContext();
	const context = useCalendarGridContext();
	const others = omit(props, "children");
	const weekIndexes = createMemo(() => {
		const weeksInMonth = getWeeksInMonth(context.startDate(), rootContext.locale());
		return [...new Array(weeksInMonth).keys()];
	});
	return createComponent(Polymorphic, mergeProps({ as: "tbody" }, others, { get children() {
		return createComponent(For, {
			get each() {
				return weekIndexes();
			},
			keyed: false,
			get children() {
				return props.children;
			}
		});
	} }));
}
//#endregion
//#region src/calendar/calendar-grid-body-cell-context.tsx
const CalendarGridBodyCellContext = createContext();
function useCalendarGridBodyCellContext() {
	const context = useContext(CalendarGridBodyCellContext);
	if (context === void 0) throw new Error("[kobalte]: `useCalendarGridBodyCellContext` must be used within a `Calendar.GridBodyCell` component");
	return context;
}
//#endregion
//#region src/calendar/calendar-grid-body-cell.tsx
/**
* A calendar grid body cell displays a date cell within a calendar grid which can be selected by the user.
*/
function CalendarGridBodyCell(props) {
	const rootContext = useCalendarContext();
	const others = omit(props, "date", "disabled");
	const isSelected = createMemo(() => {
		return rootContext.isCellSelected(props.date);
	});
	const isFocused = createMemo(() => {
		return rootContext.isCellFocused(props.date);
	});
	const isDisabled = createMemo(() => {
		return props.disabled || rootContext.isCellDisabled(props.date);
	});
	const isUnavailable = createMemo(() => {
		return rootContext.isCellUnavailable(props.date);
	});
	const isSelectable = () => {
		return !rootContext.isReadOnly() && !isDisabled() && !isUnavailable();
	};
	const isInvalid = createMemo(() => {
		return rootContext.validationState() === "invalid" && isSelected();
	});
	const isDateToday = () => isToday(props.date);
	return createComponent(CalendarGridBodyCellContext, {
		value: {
			date: () => props.date,
			isSelected,
			isFocused,
			isUnavailable,
			isSelectable,
			isDisabled,
			isInvalid,
			isDateToday
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "td",
				role: "gridcell",
				get ["aria-disabled"]() {
					return !isSelectable() ? "true" : void 0;
				},
				get ["aria-selected"]() {
					return isSelected() ? "true" : void 0;
				},
				get ["aria-invalid"]() {
					return isInvalid() ? "true" : void 0;
				},
				get ["aria-current"]() {
					return isDateToday() ? "date" : void 0;
				},
				get ["data-value"]() {
					return toLocalISOString(props.date, "day");
				}
			}, others));
		}
	});
}
//#endregion
//#region src/calendar/calendar-grid-body-cell-trigger.tsx
/**
* A calendar cell trigger selects its date on click, following corvu's
* click-only selection model — including for "range" mode, where the first
* click sets the range's start and the second click commits its end (no
* pointer-drag selection).
*/
function CalendarGridBodyCellTrigger(props) {
	const [ref, setRef] = createSignal();
	const rootContext = useCalendarContext();
	const gridContext = useCalendarGridContext();
	const context = useCalendarGridBodyCellContext();
	const p = props;
	const others = omit(p, "disabled", "onClick", "onKeyDown", "onFocus");
	const isDisabled = () => p.disabled || context.isDisabled();
	const isDateWeekend = () => {
		return isWeekend(context.date(), rootContext.locale());
	};
	const isOutsideVisibleRange = () => {
		return compareDates(context.date(), rootContext.startDate()) < 0 || compareDates(context.date(), rootContext.endDate()) > 0;
	};
	const isOutsideMonth = () => {
		return !isSameMonth(gridContext.startDate(), context.date());
	};
	const isSelectionStart = () => {
		if (rootContext.selectionMode() !== "range") return false;
		const start = rootContext.highlightedRange()?.start;
		return start != null && isSameDay(context.date(), start);
	};
	const isSelectionEnd = () => {
		if (rootContext.selectionMode() !== "range") return false;
		const end = rootContext.highlightedRange()?.end;
		return end != null && isSameDay(context.date(), end);
	};
	const tabIndex = createMemo(() => {
		if (!isDisabled()) return isSameDay(context.date(), rootContext.focusedDate()) ? 0 : -1;
	});
	const labelDateFormatter = createDateFormatter(() => ({
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}));
	const cellDateFormatter = createDateFormatter(() => ({ day: "numeric" }));
	const formattedDate = createMemo(() => {
		return cellDateFormatter().formatToParts(context.date()).find((part) => part.type === "day")?.value;
	});
	const ariaLabel = createMemo(() => {
		let label = "";
		if (rootContext.selectionMode() === "range" && !rootContext.anchorDate()) {
			const { start, end } = asRangeValue(rootContext.value()) ?? {};
			if (start && end && (isSameDay(context.date(), start) || isSameDay(context.date(), end))) label = `${getSelectedDateDescription(rootContext.locale(), rootContext.translations(), context.date())}, `;
		}
		label += labelDateFormatter().format(context.date());
		if (context.isDateToday()) label = rootContext.translations().todayDate(label, context.isSelected());
		else if (context.isSelected()) label = rootContext.translations().dateSelected(label);
		const min = rootContext.min();
		const max = rootContext.max();
		if (min && isSameDay(context.date(), min)) label += `, ${rootContext.translations().minimumDate}`;
		else if (max && isSameDay(context.date(), max)) label += `, ${rootContext.translations().maximumDate}`;
		return label;
	});
	const onClick = (e) => {
		callHandler(e, p.onClick);
		if (rootContext.isReadOnly()) {
			rootContext.focusCell(context.date());
			return;
		}
		if (context.isSelectable()) {
			rootContext.selectDate(context.date());
			rootContext.focusCell(context.date());
		}
	};
	const onKeyDown = (e) => {
		callHandler(e, p.onKeyDown);
		if (!["Enter", " "].includes(e.key)) return;
		if (rootContext.isReadOnly()) {
			rootContext.focusCell(context.date());
			return;
		}
		if (rootContext.selectionMode() === "range" && !rootContext.anchorDate()) {
			e.stopPropagation();
			rootContext.selectDate(context.date());
			let nextDay = addDuration(context.date(), { days: 1 });
			if (rootContext.isCellInvalid(nextDay)) nextDay = subtractDuration(context.date(), { days: 1 });
			if (!rootContext.isCellInvalid(nextDay)) rootContext.focusCell(nextDay);
		}
	};
	const onFocus = (e) => {
		callHandler(e, p.onFocus);
		if (e.target === untrack(ref)) rootContext.focusCell(context.date());
	};
	createEffect(() => context.isFocused(), (focused) => {
		if (focused) untrack(ref)?.focus({ preventScroll: true });
	});
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		ref: [setRef, p.ref],
		role: "button",
		get tabIndex() {
			return tabIndex();
		},
		get ["aria-disabled"]() {
			return !context.isSelectable() ? "true" : void 0;
		},
		get ["aria-invalid"]() {
			return context.isInvalid() ? "true" : void 0;
		},
		get ["aria-label"]() {
			return ariaLabel();
		},
		get ["data-disabled"]() {
			return isDisabled() ? "" : void 0;
		},
		get ["data-invalid"]() {
			return context.isInvalid() ? "" : void 0;
		},
		get ["data-selected"]() {
			return context.isSelected() ? "" : void 0;
		},
		get ["data-value"]() {
			return toLocalISOString(context.date(), "day");
		},
		"data-type": "day",
		get ["data-today"]() {
			return context.isDateToday() ? "" : void 0;
		},
		get ["data-weekend"]() {
			return isDateWeekend() ? "" : void 0;
		},
		get ["data-highlighted"]() {
			return context.isFocused() ? "" : void 0;
		},
		get ["data-unavailable"]() {
			return context.isUnavailable() ? "" : void 0;
		},
		get ["data-selection-start"]() {
			return isSelectionStart() ? "" : void 0;
		},
		get ["data-selection-end"]() {
			return isSelectionEnd() ? "" : void 0;
		},
		get ["data-outside-visible-range"]() {
			return isOutsideVisibleRange() ? "" : void 0;
		},
		get ["data-outside-month"]() {
			return isOutsideMonth() ? "" : void 0;
		}
	}, others, {
		get disabled() {
			return isDisabled();
		},
		onClick,
		onKeyDown,
		onFocus,
		get children() {
			return formattedDate();
		}
	}));
}
//#endregion
//#region src/calendar/calendar-grid-body-row.tsx
/**
* A calendar grid body row displays a row of calendar cells within a month.
*/
function CalendarGridBodyRow(props) {
	const rootContext = useCalendarContext();
	const context = useCalendarGridContext();
	const others = omit(props, "weekIndex", "children");
	const datesInWeek = createMemo(() => {
		return rootContext.getDatesInWeek(props.weekIndex, context.startDate());
	});
	return createComponent(Polymorphic, mergeProps({ as: "tr" }, others, { get children() {
		return createComponent(For, {
			get each() {
				return datesInWeek();
			},
			keyed: false,
			get children() {
				return props.children;
			}
		});
	} }));
}
//#endregion
//#region src/calendar/calendar-grid-header.tsx
/**
* A calendar grid header displays a row of week day names at the top of a month.
*/
function CalendarGridHeader(props) {
	return createComponent(Polymorphic, mergeProps({
		as: "thead",
		"aria-hidden": "true"
	}, props));
}
//#endregion
//#region src/calendar/calendar-grid-header-cell.tsx
/**
* A calendar grid header cell displays a week day name at the top of a column within a calendar.
*/
function CalendarGridHeaderCell(props) {
	return createComponent(Polymorphic, mergeProps({ as: "th" }, props));
}
//#endregion
//#region src/calendar/calendar-grid-header-row.tsx
/**
* A calendar grid header row displays week day names inside a `Calendar.GridHeader`.
*/
function CalendarGridHeaderRow(props) {
	const context = useCalendarGridContext();
	const others = omit(props, "children");
	return createComponent(Polymorphic, mergeProps({ as: "tr" }, others, { get children() {
		return createComponent(For, {
			get each() {
				return context.weekDays();
			},
			keyed: false,
			get children() {
				return props.children;
			}
		});
	} }));
}
//#endregion
//#region src/calendar/calendar-header.tsx
/**
* Contains the calendar heading and navigation triggers.
*/
function CalendarHeader(props) {
	return createComponent(Polymorphic, mergeProps({ as: "header" }, props));
}
//#endregion
//#region src/calendar/calendar-heading.tsx
function CalendarHeading(props) {
	const rootContext = useCalendarContext();
	const title = createMemo(() => {
		return getVisibleRangeDescription(rootContext.locale(), rootContext.translations(), rootContext.startDate(), rootContext.endDate(), false);
	});
	return createComponent(Polymorphic, mergeProps({ as: "h2" }, props, { get children() {
		return title();
	} }));
}
//#endregion
//#region src/calendar/calendar-next-trigger.tsx
function CalendarNextTrigger(props) {
	const context = useCalendarContext();
	const p = props;
	const others = omit(p, "onClick", "onFocus", "onBlur");
	let nextTriggerFocused = false;
	const nextTriggerDisabled = createMemo(() => {
		return props.disabled || context.isDisabled() || isNextVisibleRangeInvalid(context.endDate(), context.min(), context.max());
	});
	const onClick = (e) => {
		callHandler(e, p.onClick);
		context.focusNextPage();
	};
	const onFocus = (e) => {
		callHandler(e, p.onFocus);
		nextTriggerFocused = true;
	};
	const onBlur = (e) => {
		callHandler(e, p.onBlur);
		nextTriggerFocused = false;
	};
	createEffect(() => nextTriggerDisabled(), (isDisabled) => {
		if (isDisabled && nextTriggerFocused) {
			nextTriggerFocused = false;
			context.setIsFocused(true);
		}
	});
	return createComponent(ButtonRoot, mergeProps({
		get disabled() {
			return nextTriggerDisabled();
		},
		get ["aria-label"]() {
			return context.translations().next;
		}
	}, others, {
		onClick,
		onFocus,
		onBlur
	}));
}
//#endregion
//#region src/calendar/calendar-prev-trigger.tsx
function CalendarPrevTrigger(props) {
	const context = useCalendarContext();
	const p = props;
	const others = omit(p, "onClick", "onFocus", "onBlur");
	let prevTriggerFocused = false;
	const prevTriggerDisabled = createMemo(() => {
		return props.disabled || context.isDisabled() || isPreviousVisibleRangeInvalid(context.startDate(), context.min(), context.max());
	});
	const onClick = (e) => {
		callHandler(e, p.onClick);
		context.focusPreviousPage();
	};
	const onFocus = (e) => {
		callHandler(e, p.onFocus);
		prevTriggerFocused = true;
	};
	const onBlur = (e) => {
		callHandler(e, p.onBlur);
		prevTriggerFocused = false;
	};
	createEffect(() => prevTriggerDisabled(), (isDisabled) => {
		if (isDisabled && prevTriggerFocused) {
			prevTriggerFocused = false;
			context.setIsFocused(true);
		}
	});
	return createComponent(ButtonRoot, mergeProps({
		get disabled() {
			return prevTriggerDisabled();
		},
		get ["aria-label"]() {
			return context.translations().previous;
		}
	}, others, {
		onClick,
		onFocus,
		onBlur
	}));
}
//#endregion
//#region src/calendar/calendar.intl.ts
const CALENDAR_INTL_MESSAGES = {
	previous: "Previous",
	next: "Next",
	selectedDateDescription: (date) => `Selected Date: ${date}`,
	selectedRangeDescription: (dateRange) => `Selected Range: ${dateRange}`,
	todayDate: (date, isSelected) => `Today, ${date} ${isSelected ? " selected" : ""}`,
	dateSelected: (date) => `${date} selected`,
	startRangeSelectionPrompt: "Click to start selecting date range",
	finishRangeSelectionPrompt: "Click to finish selecting date range",
	minimumDate: "First available date",
	maximumDate: "Last available date",
	dateRange: (startDate, endDate) => `${startDate} to ${endDate}`
};
//#endregion
//#region src/calendar/create-calendar-state.ts
/**
* Provides state management for a `Calendar` component.
* Handles focused-date tracking, visible-range pagination, and single/multiple/range selection,
* independently from the DOM.
*/
function createCalendarState(props) {
	const localeContext = useLocale();
	const visibleDuration = () => props.visibleDuration ?? { months: 1 };
	const selectionMode = () => props.selectionMode ?? "single";
	const locale = createMemo(() => props.locale ?? localeContext.locale());
	const direction = createMemo(() => {
		return props.locale ? getReadingDirection(locale()) : localeContext.direction();
	});
	const [value, setControlledValue] = (0, primitives_exports.createControllableSignal)({
		value: () => props.value,
		defaultValue: () => props.defaultValue,
		onChange: (value) => props.onChange?.(value)
	});
	const [availableRange, setAvailableRange] = createSignal(void 0, { ownedWrite: true });
	const selectionAlignment = createMemo(() => {
		if (selectionMode() === "range") {
			const valueRange = asRangeValue(value());
			if (valueRange?.start && valueRange.end) {
				const start = alignCenter(valueRange.start, visibleDuration(), locale(), props.minValue, props.maxValue);
				const end = subtractDuration(addDuration(start, visibleDuration()), { days: 1 });
				if (compareDates(valueRange.end, end) > 0) return "start";
			}
			return "center";
		}
		return props.selectionAlignment ?? "center";
	});
	const min = createMemo(() => {
		const startRange = availableRange()?.start;
		if (selectionMode() === "range" && props.minValue && startRange) return maxDate(props.minValue, startRange) ?? void 0;
		return props.minValue;
	});
	const max = createMemo(() => {
		const endRange = availableRange()?.end;
		if (selectionMode() === "range" && props.maxValue && endRange) return minDate(props.maxValue, endRange) ?? void 0;
		return props.maxValue;
	});
	const selectedDates = createMemo(() => {
		return getArrayValueOfSelection(selectionMode(), value());
	});
	const focusedDateFromProps = createMemo(() => {
		return props.focusedValue ? constrainValue(props.focusedValue, min(), max()) : void 0;
	});
	const defaultFocusedDate = createMemo(() => {
		return constrainValue(props.defaultFocusedValue ?? selectedDates()[0] ?? todayDate(), min(), max());
	});
	const [focusedDate, setFocusedDate] = (0, primitives_exports.createControllableSignal)({
		value: focusedDateFromProps,
		defaultValue: defaultFocusedDate,
		onChange: (value) => props.onFocusChange?.(value)
	});
	const [startDate, setStartDate] = createSignal(untrack(() => alignDate(focusedDate(), selectionAlignment(), visibleDuration(), locale(), min(), max())), { ownedWrite: true });
	const endDate = createMemo(() => {
		return getEndDate(startDate(), visibleDuration());
	});
	const [isFocused, setIsFocused] = createSignal(untrack(() => props.autoFocus || false), { ownedWrite: true });
	const visibleRangeDescription = createMemo(() => {
		return getVisibleRangeDescription(locale(), props.translations ?? CALENDAR_INTL_MESSAGES, startDate(), endDate(), true);
	});
	const isCellDisabled = (date) => {
		return !!props.disabled || compareDates(date, startDate()) < 0 || compareDates(date, endDate()) > 0 || isDateInvalid(date, min(), max());
	};
	const isCellUnavailable = (date) => {
		return props.isDateUnavailable?.(date) ?? false;
	};
	const updateAvailableRange = (date) => {
		if (date && props.isDateUnavailable && !props.allowsNonContiguousRanges) setAvailableRange({
			start: getNextUnavailableDate(date, startDate(), endDate(), isCellUnavailable, -1),
			end: getNextUnavailableDate(date, startDate(), endDate(), isCellUnavailable, 1)
		});
		else setAvailableRange(void 0);
	};
	const [anchorDate, setAnchorDate] = (0, primitives_exports.createControllableSignal)({ onChange: (value) => updateAvailableRange(value) });
	const highlightedRange = createMemo(() => {
		if (selectionMode() !== "range") return;
		const resolvedAnchorDate = anchorDate();
		if (resolvedAnchorDate) return makeCalendarDateRange(resolvedAnchorDate, focusedDate());
		const { start, end } = asRangeValue(value()) ?? {};
		return makeCalendarDateRange(start, end);
	});
	const validationState = createMemo(() => {
		if (props.validationState) return props.validationState;
		if (selectedDates().length <= 0) return null;
		if (selectionMode() === "range" && anchorDate()) return null;
		return selectedDates().some((date) => {
			return props.isDateUnavailable?.(date) || isDateInvalid(date, min(), max());
		}) ? "invalid" : null;
	});
	const isCellSelected = (cellDate) => {
		const isAvailable = !isCellDisabled(cellDate) && !isCellUnavailable(cellDate);
		if (selectionMode() === "range") {
			const { start, end } = highlightedRange() ?? {};
			return start != null && compareDates(cellDate, start) >= 0 && end != null && compareDates(cellDate, end) <= 0 && isAvailable;
		}
		return selectedDates().some((date) => isSameDay(cellDate, date)) && isAvailable;
	};
	const isCellFocused = (date) => {
		const resolvedFocusedDate = focusedDate();
		return isFocused() && resolvedFocusedDate != null && isSameDay(date, resolvedFocusedDate);
	};
	const isCellInvalid = (date) => {
		if (selectionMode() === "range") return isDateInvalid(date, min(), max()) || isDateInvalid(date, availableRange()?.start, availableRange()?.end);
		return isDateInvalid(date, min(), max());
	};
	const selectDate = (date) => {
		if (props.readOnly || props.disabled) return;
		let newValue = getPreviousAvailableDate(constrainValue(date, min(), max()), startDate(), props.isDateUnavailable);
		if (!newValue) return;
		if (selectionMode() === "single") setControlledValue((prev) => {
			const prevValue = asSingleValue(prev);
			if (!newValue) return prevValue;
			return convertValue(newValue, prevValue);
		});
		else if (selectionMode() === "multiple") setControlledValue((prev) => {
			const prevValue = asArrayValue(prev) ?? [];
			if (!newValue) return prevValue;
			newValue = convertValue(newValue, prevValue[0]);
			const index = prevValue.findIndex((date) => newValue != null && isSameDay(date, newValue));
			if (index !== -1) {
				const nextValues = [...prevValue];
				nextValues.splice(index, 1);
				return sortDates(nextValues);
			}
			return sortDates([...prevValue, newValue]);
		});
		else if (selectionMode() === "range") {
			if (!anchorDate()) setAnchorDate(newValue);
			else {
				setControlledValue((prev) => {
					const prevRange = asRangeValue(prev);
					const range = makeCalendarDateRange(anchorDate(), newValue);
					if (!range) return prevRange;
					return {
						start: convertValue(range.start, prevRange?.start),
						end: convertValue(range.end, prevRange?.end)
					};
				});
				setAnchorDate(void 0);
			}
		}
	};
	const selectFocusedDate = () => {
		selectDate(focusedDate());
	};
	const focusCell = (date) => {
		setFocusedDate(constrainValue(date, min(), max()));
		if (!isFocused()) setIsFocused(true);
	};
	const focusNextDay = () => {
		focusCell(addDuration(focusedDate(), { days: 1 }));
	};
	const focusPreviousDay = () => {
		focusCell(subtractDuration(focusedDate(), { days: 1 }));
	};
	const focusNextRow = () => {
		const row = getNextRow(focusedDate(), startDate(), visibleDuration(), locale(), min(), max());
		if (row) {
			setStartDate(row.startDate);
			focusCell(row.focusedDate);
		}
	};
	const focusPreviousRow = () => {
		const row = getPreviousRow(focusedDate(), startDate(), visibleDuration(), locale(), min(), max());
		if (row) {
			setStartDate(row.startDate);
			focusCell(row.focusedDate);
		}
	};
	const focusNextPage = () => {
		const page = getNextPage(focusedDate(), startDate(), visibleDuration(), locale(), min(), max());
		setFocusedDate(constrainValue(page.focusedDate, min(), max()));
		setStartDate(page.startDate);
	};
	const focusPreviousPage = () => {
		const page = getPreviousPage(focusedDate(), startDate(), visibleDuration(), locale(), min(), max());
		setFocusedDate(constrainValue(page.focusedDate, min(), max()));
		setStartDate(page.startDate);
	};
	const focusSectionStart = () => {
		const section = getSectionStart(focusedDate(), startDate(), visibleDuration(), locale(), min(), max());
		if (section) {
			setStartDate(section.startDate);
			focusCell(section.focusedDate);
		}
	};
	const focusSectionEnd = () => {
		const section = getSectionEnd(focusedDate(), startDate(), visibleDuration(), locale(), min(), max());
		if (section) {
			setStartDate(section.startDate);
			focusCell(section.focusedDate);
		}
	};
	const focusNextSection = (larger) => {
		const section = getNextSection(focusedDate(), startDate(), larger, visibleDuration(), locale(), min(), max());
		if (section) {
			setStartDate(section.startDate);
			focusCell(section.focusedDate);
		}
	};
	const focusPreviousSection = (larger) => {
		const section = getPreviousSection(focusedDate(), startDate(), larger, visibleDuration(), locale(), min(), max());
		if (section) {
			setStartDate(section.startDate);
			focusCell(section.focusedDate);
		}
	};
	const getDatesInWeek = (weekIndex, from) => {
		const weekStart = startOfWeek(addDuration(from, { weeks: weekIndex }), locale());
		return Array.from({ length: 7 }, (_, i) => addDuration(weekStart, { days: i }));
	};
	createEffect(() => {
		return getAdjustedDateFn(visibleDuration(), locale(), min(), max())({
			startDate: startDate(),
			focusedDate: focusedDate()
		});
	}, (adjustment) => {
		setStartDate(adjustment.startDate);
		setFocusedDate(adjustment.focusedDate);
	});
	createEffect(() => visibleRangeDescription(), (description) => {
		if (!untrack(isFocused)) announce(description);
	});
	createEffect(() => {
		let description;
		if (selectionMode() === "single") {
			const date = asSingleValue(value());
			description = date && getSelectedDateDescription(locale(), props.translations ?? CALENDAR_INTL_MESSAGES, date);
		} else if (selectionMode() === "multiple") description = asArrayValue(value())?.map((date) => getSelectedDateDescription(locale(), props.translations ?? CALENDAR_INTL_MESSAGES, date)).join(", ");
		else if (selectionMode() === "range") {
			const dateRange = asRangeValue(value()) ?? {};
			description = getSelectedDateRangeDescription(locale(), props.translations ?? CALENDAR_INTL_MESSAGES, dateRange, anchorDate());
		}
		return description;
	}, (description) => {
		if (description) announce(description, "polite", 4e3);
	});
	createEffect(() => [startDate(), endDate()], () => {
		untrack(() => {
			if (selectionMode() === "range") updateAvailableRange(anchorDate());
		});
	});
	return {
		value,
		isDisabled: () => props.disabled ?? false,
		isReadOnly: () => props.readOnly ?? false,
		isCellUnavailable,
		isCellDisabled,
		isCellSelected,
		isCellFocused,
		isCellInvalid,
		validationState,
		startDate,
		endDate,
		anchorDate,
		focusedDate: () => focusedDate(),
		visibleDuration,
		selectionMode,
		locale,
		highlightedRange,
		direction,
		min,
		max,
		translations: () => props.translations ?? CALENDAR_INTL_MESSAGES,
		setStartDate,
		setAnchorDate,
		setIsFocused,
		selectFocusedDate,
		selectDate,
		focusCell,
		focusNextDay,
		focusPreviousDay,
		focusNextPage,
		focusPreviousPage,
		focusNextRow,
		focusPreviousRow,
		focusSectionStart,
		focusSectionEnd,
		focusNextSection,
		focusPreviousSection,
		getDatesInWeek
	};
}
//#endregion
//#region src/calendar/calendar-root.tsx
/**
* A calendar displays one or more date grids and allows users to select a single, multiple or range of dates.
*/
function CalendarRoot(props) {
	const [ref, setRef] = createSignal();
	const mergedProps = merge({
		visibleDuration: { months: 1 },
		selectionMode: "single",
		translations: CALENDAR_INTL_MESSAGES
	}, props);
	const others = omit(mergedProps, "ref", "translations", "locale", "visibleDuration", "selectionAlignment", "selectionMode", "value", "defaultValue", "onChange", "minValue", "maxValue", "isDateUnavailable", "allowsNonContiguousRanges", "autoFocus", "focusedValue", "defaultFocusedValue", "onFocusChange", "validationState", "disabled", "readOnly", "aria-label");
	const state = createCalendarState(mergedProps);
	const visibleRangeDescription = createMemo(() => {
		return getVisibleRangeDescription(state.locale(), state.translations(), state.startDate(), state.endDate(), true);
	});
	const ariaLabel = createMemo(() => {
		return [mergedProps["aria-label"], visibleRangeDescription()].filter(Boolean).join(", ") || void 0;
	});
	createInteractOutside({ onInteractOutside: () => {
		if (state.selectionMode() === "range" && state.anchorDate()) state.selectFocusedDate();
	} }, ref);
	const dataset = createMemo(() => ({
		"data-disabled": state.isDisabled() ? "" : void 0,
		"data-readonly": state.isReadOnly() ? "" : void 0
	}));
	const context = {
		dataset,
		...state
	};
	return createComponent(CalendarContext, {
		value: context,
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "div",
				ref: [setRef, mergedProps.ref],
				role: "group"
			}, dataset, others, { get ["aria-label"]() {
				return ariaLabel();
			} }));
		}
	});
}
//#endregion
//#region src/calendar/index.tsx
var calendar_exports = /* @__PURE__ */ __exportAll({
	Body: () => CalendarBody,
	Calendar: () => Calendar,
	Grid: () => CalendarGrid,
	GridBody: () => CalendarGridBody,
	GridBodyCell: () => CalendarGridBodyCell,
	GridBodyCellTrigger: () => CalendarGridBodyCellTrigger,
	GridBodyRow: () => CalendarGridBodyRow,
	GridHeader: () => CalendarGridHeader,
	GridHeaderCell: () => CalendarGridHeaderCell,
	GridHeaderRow: () => CalendarGridHeaderRow,
	Header: () => CalendarHeader,
	Heading: () => CalendarHeading,
	NextTrigger: () => CalendarNextTrigger,
	PrevTrigger: () => CalendarPrevTrigger,
	Root: () => CalendarRoot
});
const Calendar = Object.assign(CalendarRoot, {
	Body: CalendarBody,
	Grid: CalendarGrid,
	GridBody: CalendarGridBody,
	GridBodyCell: CalendarGridBodyCell,
	GridBodyCellTrigger: CalendarGridBodyCellTrigger,
	GridBodyRow: CalendarGridBodyRow,
	GridHeader: CalendarGridHeader,
	GridHeaderCell: CalendarGridHeaderCell,
	GridHeaderRow: CalendarGridHeaderRow,
	Header: CalendarHeader,
	Heading: CalendarHeading,
	NextTrigger: CalendarNextTrigger,
	PrevTrigger: CalendarPrevTrigger
});
//#endregion
export { asRangeValue as _, CalendarNextTrigger as a, isDateInvalid as b, CalendarGridHeaderRow as c, CalendarGridBodyRow as d, CalendarGridBodyCellTrigger as f, asArrayValue as g, CalendarGrid as h, CalendarPrevTrigger as i, CalendarGridHeaderCell as l, CalendarGridBody as m, calendar_exports as n, CalendarHeading as o, CalendarGridBodyCell as p, CalendarRoot as r, CalendarHeader as s, Calendar as t, CalendarGridHeader as u, asSingleValue as v, CalendarBody as x, getArrayValueOfSelection as y };
