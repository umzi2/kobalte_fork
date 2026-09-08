import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { a as ButtonRootOptions, n as index_d_exports$1 } from "./Bjp2qtUK.js";
import { A as CalendarGridHeaderCellProps, B as CalendarGridBodyCell, D as CalendarGridHeaderRowProps, F as CalendarGridBodyRowOptions, G as CalendarGridBodyProps, H as CalendarGridBodyCellProps, I as CalendarGridBodyRowProps, J as CalendarGridProps, K as CalendarGrid, L as CalendarGridBodyCellTrigger, N as CalendarGridHeaderProps, O as CalendarGridHeaderCell, P as CalendarGridBodyRow, Q as CalendarBodyProps, R as CalendarGridBodyCellTriggerOptions, S as CalendarHeader, T as CalendarGridHeaderRow, U as CalendarGridBody, V as CalendarGridBodyCellOptions, W as CalendarGridBodyOptions, X as CalendarBody, Y as DateDuration, _ as CalendarNextTriggerOptions, g as CalendarNextTrigger, h as CalendarPrevTriggerProps, i as CalendarRangeSelectionOptions, j as CalendarGridHeader, m as CalendarPrevTriggerOptions, p as CalendarPrevTrigger, q as CalendarGridOptions, r as CalendarMultipleSelectionOptions, u as CalendarSingleSelectionOptions, v as CalendarNextTriggerProps, w as CalendarHeaderProps, x as CalendarHeadingProps, y as CalendarHeading, z as CalendarGridBodyCellTriggerProps } from "./DdEmxfsg.js";
import { r as DateValue } from "../types/CfIQoHy3.js";
import { a as FormControlLabelRenderProps, c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, i as FormControlLabelProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, n as FormControlLabelCommonProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, r as FormControlLabelOptions, s as FormControlErrorMessageCommonProps, t as FormControlLabel, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "./ZPox5oFC.js";
import { f as PopperArrowOptions, p as PopperArrowProps, u as PopperArrow } from "./DTS_JDht.js";
import { A as PopoverCloseButtonOptions, C as PopoverContent, D as PopoverContentRenderProps, E as PopoverContentProps, F as PopoverAnchorOptions, I as PopoverAnchorProps, L as PopoverAnchorRenderProps, M as PopoverCloseButtonRenderProps, N as PopoverAnchor, O as PopoverCloseButton, P as PopoverAnchorCommonProps, T as PopoverContentOptions, _ as PopoverPortalProps, g as PopoverPortal, j as PopoverCloseButtonProps, k as PopoverCloseButtonCommonProps, m as PopoverRootOptions, w as PopoverContentCommonProps } from "./DR0QtM9J.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { ValidationState } from "@kobalte/utils";
//#region src/date-picker/date-picker-calendar.d.ts
interface DatePickerCalendarOptions {}
type DatePickerCalendarProps = DatePickerCalendarOptions & {
  id?: string;
};
/**
 * The calendar used to select a date, dates, or date range, rendered inside `DatePicker.Content`.
 */
declare function DatePickerCalendar<T extends ValidComponent = "div">(props: PolymorphicProps<T, DatePickerCalendarProps>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/date-picker/date-picker.intl.d.ts
declare const DATE_PICKER_INTL_MESSAGES: {
  selectedDateDescription: (date: string) => string;
  selectedRangeDescription: (startDate: string, endDate: string) => string;
};
type DatePickerIntlTranslations = typeof DATE_PICKER_INTL_MESSAGES;
//#endregion
//#region src/date-picker/date-picker-root.d.ts
type DatePickerRootOptions = (CalendarSingleSelectionOptions | CalendarMultipleSelectionOptions | CalendarRangeSelectionOptions) & Omit<PopoverRootOptions, "anchorRef" | "contentRef" | "onCurrentPlacementChange" | "translations"> & {
  /** The localized strings of the component. */
  translations?: DatePickerIntlTranslations;
  /** The locale to display and edit the value according to. */
  locale?: string;
  /** The amount of days that will be displayed at once. This affects how pagination works. */
  visibleDuration?: DateDuration;
  /** The minimum allowed date that a user may select. */
  minValue?: DateValue;
  /** The maximum allowed date that a user may select. */
  maxValue?: DateValue;
  /** Callback that is called for each date of the calendar. If it returns true, then the date is unavailable. */
  isDateUnavailable?: (date: DateValue) => boolean;
  /**
   * In "range" selection mode, when combined with `isDateUnavailable`, determines whether
   * non-contiguous ranges, i.e. ranges containing unavailable dates, may be selected.
   */
  allowsNonContiguousRanges?: boolean;
  /** Whether the date picker should close automatically when a date is selected. Defaults to `true` for "single" and "range", `false` for "multiple". */
  closeOnSelect?: boolean;
  /** A placeholder date used to center the calendar when no value is selected yet. Defaults to today. */
  placeholderValue?: DateValue;
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
  /** The name of the date picker. Submitted with its owning form as part of a name/value pair. */
  name?: string;
  /** Whether the date picker should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the user must select a date before the owning form can be submitted. */
  required?: boolean;
  /** Whether the date picker is disabled. */
  disabled?: boolean;
  /** Whether the date picker is read only. */
  readOnly?: boolean;
  /** The children of the date picker. */
  children?: JSX$1.Element;
};
interface DatePickerRootCommonProps {
  id: string;
  children: JSX$1.Element;
}
type DatePickerRootProps<_T extends ValidComponent | HTMLElement = HTMLElement> = DatePickerRootOptions & Partial<DatePickerRootCommonProps>;
/**
 * A date picker combines a `Calendar` popover (opened from a trigger button)
 * to allow users to select a date, dates, or date range.
 */
declare function DatePickerRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, DatePickerRootProps<T>>): JSX$1.Element;
//#endregion
//#region src/date-picker/date-picker-trigger.d.ts
interface DatePickerTriggerOptions {}
type DatePickerTriggerProps = DatePickerTriggerOptions & ButtonRootOptions & {
  disabled?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
};
/**
 * The button that opens the date picker's calendar popover.
 */
declare function DatePickerTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, DatePickerTriggerProps>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/date-picker/date-picker-value.d.ts
interface DatePickerValueOptions {
  /** Placeholder shown when no date, dates, or range has been selected yet. */
  children?: JSX$1.Element;
}
interface DatePickerValueCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface DatePickerValueRenderProps extends DatePickerValueCommonProps, FormControlDataSet {
  children: JSX$1.Element;
  "data-placeholder-shown": string | undefined;
}
type DatePickerValueProps<T extends ValidComponent | HTMLElement = HTMLElement> = DatePickerValueOptions & Partial<DatePickerValueCommonProps<ElementOf<T>>>;
/**
 * Displays the formatted selected date, dates, or range, falling back to its
 * children as a placeholder when nothing is selected yet.
 */
declare function DatePickerValue<T extends ValidComponent = "span">(props: PolymorphicProps<T, DatePickerValueProps<T>>): JSX$1.Element;
declare namespace index_d_exports {
  export { PopoverAnchor as Anchor, PopperArrow as Arrow, DatePickerCalendar as Calendar, CalendarBody, CalendarGrid, CalendarGridBody, CalendarGridBodyCell, CalendarGridBodyCellTrigger, CalendarGridBodyRow, CalendarGridHeader, CalendarGridHeaderCell, CalendarGridHeaderRow, CalendarHeader, CalendarHeading, CalendarNextTrigger, CalendarPrevTrigger, PopoverCloseButton as CloseButton, PopoverContent as Content, DatePicker, PopoverAnchorCommonProps as DatePickerAnchorCommonProps, PopoverAnchorOptions as DatePickerAnchorOptions, PopoverAnchorProps as DatePickerAnchorProps, PopoverAnchorRenderProps as DatePickerAnchorRenderProps, PopperArrowOptions as DatePickerArrowOptions, PopperArrowProps as DatePickerArrowProps, CalendarBodyProps as DatePickerCalendarBodyProps, CalendarGridBodyCellOptions as DatePickerCalendarGridBodyCellOptions, CalendarGridBodyCellProps as DatePickerCalendarGridBodyCellProps, CalendarGridBodyCellTriggerOptions as DatePickerCalendarGridBodyCellTriggerOptions, CalendarGridBodyCellTriggerProps as DatePickerCalendarGridBodyCellTriggerProps, CalendarGridBodyOptions as DatePickerCalendarGridBodyOptions, CalendarGridBodyProps as DatePickerCalendarGridBodyProps, CalendarGridBodyRowOptions as DatePickerCalendarGridBodyRowOptions, CalendarGridBodyRowProps as DatePickerCalendarGridBodyRowProps, CalendarGridHeaderCellProps as DatePickerCalendarGridHeaderCellProps, CalendarGridHeaderProps as DatePickerCalendarGridHeaderProps, CalendarGridHeaderRowProps as DatePickerCalendarGridHeaderRowProps, CalendarGridOptions as DatePickerCalendarGridOptions, CalendarGridProps as DatePickerCalendarGridProps, CalendarHeaderProps as DatePickerCalendarHeaderProps, CalendarHeadingProps as DatePickerCalendarHeadingProps, CalendarNextTriggerOptions as DatePickerCalendarNextTriggerOptions, CalendarNextTriggerProps as DatePickerCalendarNextTriggerProps, DatePickerCalendarOptions, CalendarPrevTriggerOptions as DatePickerCalendarPrevTriggerOptions, CalendarPrevTriggerProps as DatePickerCalendarPrevTriggerProps, DatePickerCalendarProps, PopoverCloseButtonCommonProps as DatePickerCloseButtonCommonProps, PopoverCloseButtonOptions as DatePickerCloseButtonOptions, PopoverCloseButtonProps as DatePickerCloseButtonProps, PopoverCloseButtonRenderProps as DatePickerCloseButtonRenderProps, PopoverContentCommonProps as DatePickerContentCommonProps, PopoverContentOptions as DatePickerContentOptions, PopoverContentProps as DatePickerContentProps, PopoverContentRenderProps as DatePickerContentRenderProps, FormControlDescriptionCommonProps as DatePickerDescriptionCommonProps, FormControlDescriptionOptions as DatePickerDescriptionOptions, FormControlDescriptionProps as DatePickerDescriptionProps, FormControlDescriptionRenderProps as DatePickerDescriptionRenderProps, FormControlErrorMessageCommonProps as DatePickerErrorMessageCommonProps, FormControlErrorMessageOptions as DatePickerErrorMessageOptions, FormControlErrorMessageProps as DatePickerErrorMessageProps, FormControlErrorMessageRenderProps as DatePickerErrorMessageRenderProps, DatePickerIntlTranslations, FormControlLabelCommonProps as DatePickerLabelCommonProps, FormControlLabelOptions as DatePickerLabelOptions, FormControlLabelProps as DatePickerLabelProps, FormControlLabelRenderProps as DatePickerLabelRenderProps, PopoverPortalProps as DatePickerPortalProps, DatePickerRootOptions, DatePickerRootProps, DatePickerTriggerOptions, DatePickerTriggerProps, DatePickerValueOptions, DatePickerValueProps, DatePickerValueRenderProps, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, FormControlLabel as Label, PopoverPortal as Portal, DatePickerRoot as Root, DatePickerTrigger as Trigger, DatePickerValue as Value };
}
declare const DatePicker: typeof DatePickerRoot & {
  Anchor: typeof PopoverAnchor;
  Arrow: typeof PopperArrow;
  Calendar: typeof DatePickerCalendar;
  CalendarBody: typeof CalendarBody;
  CalendarGrid: typeof CalendarGrid;
  CalendarGridBody: typeof CalendarGridBody;
  CalendarGridBodyCell: typeof CalendarGridBodyCell;
  CalendarGridBodyCellTrigger: typeof CalendarGridBodyCellTrigger;
  CalendarGridBodyRow: typeof CalendarGridBodyRow;
  CalendarGridHeader: typeof CalendarGridHeader;
  CalendarGridHeaderCell: typeof CalendarGridHeaderCell;
  CalendarGridHeaderRow: typeof CalendarGridHeaderRow;
  CalendarHeader: typeof CalendarHeader;
  CalendarHeading: typeof CalendarHeading;
  CalendarNextTrigger: typeof CalendarNextTrigger;
  CalendarPrevTrigger: typeof CalendarPrevTrigger;
  CloseButton: typeof PopoverCloseButton;
  Content: typeof PopoverContent;
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  Label: typeof FormControlLabel;
  Portal: typeof PopoverPortal;
  Trigger: typeof DatePickerTrigger;
  Value: typeof DatePickerValue;
};
//#endregion
export { DatePickerValueProps as a, DatePickerTriggerOptions as c, DatePickerRootOptions as d, DatePickerRootProps as f, DatePickerCalendarProps as g, DatePickerCalendarOptions as h, DatePickerValueOptions as i, DatePickerTriggerProps as l, DatePickerCalendar as m, index_d_exports as n, DatePickerValueRenderProps as o, DatePickerIntlTranslations as p, DatePickerValue as r, DatePickerTrigger as s, DatePicker as t, DatePickerRoot as u };