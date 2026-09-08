import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { a as ButtonRootOptions } from "./Bjp2qtUK.js";
import { n as DateAlignment, r as DateValue, t as CalendarSelectionMode } from "../types/CfIQoHy3.js";
import { P as Direction } from "./DzCl6ca-.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
import { RangeValue, ValidationState } from "@kobalte/utils";
//#region src/calendar/calendar-body.d.ts
interface CalendarBodyOptions {}
interface CalendarBodyCommonProps<_T extends HTMLElement = HTMLElement> {}
type CalendarBodyProps<T extends ValidComponent | HTMLElement = HTMLElement> = CalendarBodyOptions & Partial<CalendarBodyCommonProps<ElementOf<T>>>;
/**
 * Contains the calendar grids.
 */
declare function CalendarBody<T extends ValidComponent = "div">(props: PolymorphicProps<T, CalendarBodyProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/calendar/date-math.d.ts
/**
 * Native `Date` arithmetic/comparison/formatting helpers shared by `calendar/` and
 * `date-field/`, replacing the calendar-math previously provided by `@internationalized/date`.
 *
 * Scope is intentionally Gregorian-only, single-timezone (the environment's local time
 * zone): there is no calendar-system abstraction and no explicit per-value time zone.
 * Every function is pure and immutable — none ever mutate their `Date` arguments.
 */
interface DateDuration {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
//#endregion
//#region src/calendar/calendar-grid.d.ts
interface CalendarGridOptions {
  /**
   * An offset from the beginning of the visible date range that this grid should display.
   * Useful when displaying more than one month at a time.
   */
  offset?: DateDuration;
  /**
   * The format of weekday names to display in the `Calendar.GridHeader`
   * e.g. single letter, abbreviation, or full day name.
   */
  weekDayFormat?: "narrow" | "short" | "long";
}
interface CalendarGridCommonProps<T extends HTMLElement = HTMLElement> {
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onFocusIn: JSX$1.FocusEventHandlerUnion<T, FocusEvent>;
  onFocusOut: JSX$1.FocusEventHandlerUnion<T, FocusEvent>;
  "aria-label"?: string;
}
type CalendarGridProps<T extends ValidComponent | HTMLElement = HTMLElement> = CalendarGridOptions & Partial<CalendarGridCommonProps<ElementOf<T>>>;
/**
 * A calendar grid displays a single grid of days within a calendar or range calendar which
 * can be keyboard navigated and selected by the user.
 */
declare function CalendarGrid<T extends ValidComponent = "table">(props: PolymorphicProps<T, CalendarGridProps<T>>): JSX$1.Element;
//#endregion
//#region src/calendar/calendar-grid-body.d.ts
interface CalendarGridBodyOptions {
  /**
   * Render prop used to render each row of the calendar grid,
   * it receives a week index accessor as parameter.
   */
  children: (weekIndex: Accessor<number>) => JSX$1.Element;
}
interface CalendarGridBodyCommonProps<_T extends HTMLElement = HTMLElement> {
  children: JSX$1.Element;
}
type CalendarGridBodyProps<T extends ValidComponent | HTMLElement = HTMLElement> = CalendarGridBodyOptions & Partial<Omit<CalendarGridBodyCommonProps<ElementOf<T>>, "children">>;
/**
 * A calendar grid body displays a grid of calendar cells within a month.
 */
declare function CalendarGridBody<T extends ValidComponent = "tbody">(props: PolymorphicProps<T, CalendarGridBodyProps<T>>): JSX$1.Element;
//#endregion
//#region src/calendar/calendar-grid-body-cell.d.ts
interface CalendarGridBodyCellOptions {
  /** The date that this cell represents. */
  date: DateValue;
  /**
   * Whether the cell is disabled. By default, this is determined by the
   * Calendar's `minValue`, `maxValue`, and `disabled` props.
   */
  disabled?: boolean;
}
interface CalendarGridBodyCellCommonProps<_T extends HTMLElement = HTMLElement> {}
type CalendarGridBodyCellProps<T extends ValidComponent | HTMLElement = HTMLElement> = CalendarGridBodyCellOptions & Partial<CalendarGridBodyCellCommonProps<ElementOf<T>>>;
/**
 * A calendar grid body cell displays a date cell within a calendar grid which can be selected by the user.
 */
declare function CalendarGridBodyCell<T extends ValidComponent = "td">(props: PolymorphicProps<T, CalendarGridBodyCellProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/calendar/calendar-grid-body-cell-trigger.d.ts
interface CalendarGridBodyCellTriggerOptions {
  /** Whether the cell trigger is disabled. */
  disabled?: boolean;
}
interface CalendarGridBodyCellTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  children?: JSX$1.Element;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
}
type CalendarGridBodyCellTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = CalendarGridBodyCellTriggerOptions & Partial<CalendarGridBodyCellTriggerCommonProps<ElementOf<T>>>;
/**
 * A calendar cell trigger selects its date on click, following corvu's
 * click-only selection model — including for "range" mode, where the first
 * click sets the range's start and the second click commits its end (no
 * pointer-drag selection).
 */
declare function CalendarGridBodyCellTrigger<T extends ValidComponent = "div">(props: PolymorphicProps<T, CalendarGridBodyCellTriggerProps<T>>): JSX$1.Element;
//#endregion
//#region src/calendar/calendar-grid-body-row.d.ts
interface CalendarGridBodyRowOptions {
  /** The index of the week to render. */
  weekIndex: number;
  /**
   * Render prop used to render each cell of the week row,
   * it receives a date accessor as parameter.
   */
  children: (date: Accessor<DateValue | null>) => JSX$1.Element;
}
interface CalendarGridBodyRowCommonProps<_T extends HTMLElement = HTMLElement> {
  children: JSX$1.Element;
}
type CalendarGridBodyRowProps<T extends ValidComponent | HTMLElement = HTMLElement> = CalendarGridBodyRowOptions & Partial<Omit<CalendarGridBodyRowCommonProps<ElementOf<T>>, "children">>;
/**
 * A calendar grid body row displays a row of calendar cells within a month.
 */
declare function CalendarGridBodyRow<T extends ValidComponent = "tr">(props: PolymorphicProps<T, CalendarGridBodyRowProps<T>>): JSX$1.Element;
//#endregion
//#region src/calendar/calendar-grid-header.d.ts
interface CalendarGridHeaderOptions {}
interface CalendarGridHeaderCommonProps<_T extends HTMLElement = HTMLElement> {}
type CalendarGridHeaderProps<T extends ValidComponent | HTMLElement = HTMLElement> = CalendarGridHeaderOptions & Partial<CalendarGridHeaderCommonProps<ElementOf<T>>>;
/**
 * A calendar grid header displays a row of week day names at the top of a month.
 */
declare function CalendarGridHeader<T extends ValidComponent = "thead">(props: PolymorphicProps<T, CalendarGridHeaderProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/calendar/calendar-grid-header-cell.d.ts
interface CalendarGridHeaderCellOptions {}
interface CalendarGridHeaderCellCommonProps<_T extends HTMLElement = HTMLElement> {}
type CalendarGridHeaderCellProps<T extends ValidComponent | HTMLElement = HTMLElement> = CalendarGridHeaderCellOptions & Partial<CalendarGridHeaderCellCommonProps<ElementOf<T>>>;
/**
 * A calendar grid header cell displays a week day name at the top of a column within a calendar.
 */
declare function CalendarGridHeaderCell<T extends ValidComponent = "th">(props: PolymorphicProps<T, CalendarGridHeaderCellProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/calendar/calendar-grid-header-row.d.ts
interface CalendarGridHeaderRowOptions {
  /**
   * Render prop used to render each cell of the header row,
   * it receives a week day accessor as parameter.
   */
  children: (weekDay: Accessor<string>) => JSX$1.Element;
}
interface CalendarGridHeaderRowCommonProps<_T extends HTMLElement = HTMLElement> {
  children: JSX$1.Element;
}
type CalendarGridHeaderRowProps<T extends ValidComponent | HTMLElement = HTMLElement> = CalendarGridHeaderRowOptions & Partial<Omit<CalendarGridHeaderRowCommonProps<ElementOf<T>>, "children">>;
/**
 * A calendar grid header row displays week day names inside a `Calendar.GridHeader`.
 */
declare function CalendarGridHeaderRow<T extends ValidComponent = "tr">(props: PolymorphicProps<T, CalendarGridHeaderRowProps<T>>): JSX$1.Element;
//#endregion
//#region src/calendar/calendar-header.d.ts
interface CalendarHeaderOptions {}
interface CalendarHeaderCommonProps<_T extends HTMLElement = HTMLElement> {}
type CalendarHeaderProps<T extends ValidComponent | HTMLElement = HTMLElement> = CalendarHeaderOptions & Partial<CalendarHeaderCommonProps<ElementOf<T>>>;
/**
 * Contains the calendar heading and navigation triggers.
 */
declare function CalendarHeader<T extends ValidComponent = "header">(props: PolymorphicProps<T, CalendarHeaderProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/calendar/calendar-heading.d.ts
interface CalendarHeadingOptions {}
interface CalendarHeadingCommonProps<_T extends HTMLElement = HTMLElement> {
  children?: JSX$1.Element;
}
type CalendarHeadingProps<T extends ValidComponent | HTMLElement = HTMLElement> = CalendarHeadingOptions & Partial<CalendarHeadingCommonProps<ElementOf<T>>>;
declare function CalendarHeading<T extends ValidComponent = "h2">(props: PolymorphicProps<T, CalendarHeadingProps<T>>): JSX$1.Element;
//#endregion
//#region src/calendar/calendar-next-trigger.d.ts
interface CalendarNextTriggerOptions extends ButtonRootOptions {}
interface CalendarNextTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocus: JSX$1.FocusEventHandlerUnion<T, FocusEvent>;
  onBlur: JSX$1.FocusEventHandlerUnion<T, FocusEvent>;
}
type CalendarNextTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = CalendarNextTriggerOptions & Partial<CalendarNextTriggerCommonProps<ElementOf<T>>>;
declare function CalendarNextTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, CalendarNextTriggerProps<T>>): JSX$1.Element;
//#endregion
//#region src/calendar/calendar-prev-trigger.d.ts
interface CalendarPrevTriggerOptions extends ButtonRootOptions {}
interface CalendarPrevTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocus: JSX$1.FocusEventHandlerUnion<T, FocusEvent>;
  onBlur: JSX$1.FocusEventHandlerUnion<T, FocusEvent>;
}
type CalendarPrevTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = CalendarPrevTriggerOptions & Partial<CalendarPrevTriggerCommonProps<ElementOf<T>>>;
declare function CalendarPrevTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, CalendarPrevTriggerProps<T>>): JSX$1.Element;
//#endregion
//#region src/calendar/calendar.intl.d.ts
declare const CALENDAR_INTL_MESSAGES: {
  previous: string;
  next: string;
  selectedDateDescription: (date: string) => string;
  selectedRangeDescription: (dateRange: string) => string;
  todayDate: (date: string, isSelected: boolean) => string;
  dateSelected: (date: string) => string;
  startRangeSelectionPrompt: string;
  finishRangeSelectionPrompt: string;
  minimumDate: string;
  maximumDate: string;
  dateRange: (startDate: string, endDate: string) => string;
};
type CalendarIntlTranslations = typeof CALENDAR_INTL_MESSAGES;
//#endregion
//#region src/calendar/create-calendar-state.d.ts
interface CalendarState {
  value: Accessor<DateValue | DateValue[] | RangeValue<DateValue> | null | undefined>;
  isDisabled: Accessor<boolean>;
  isReadOnly: Accessor<boolean>;
  isCellSelected: (date: DateValue) => boolean;
  isCellFocused: (date: DateValue) => boolean;
  isCellDisabled: (date: DateValue) => boolean;
  isCellUnavailable: (date: DateValue) => boolean;
  isCellInvalid: (date: DateValue) => boolean;
  validationState: Accessor<ValidationState | null>;
  startDate: Accessor<DateValue>;
  endDate: Accessor<DateValue>;
  anchorDate: Accessor<DateValue | undefined>;
  focusedDate: Accessor<DateValue>;
  visibleDuration: Accessor<DateDuration>;
  selectionMode: Accessor<CalendarSelectionMode>;
  locale: Accessor<string>;
  direction: Accessor<Direction>;
  min: Accessor<DateValue | undefined>;
  max: Accessor<DateValue | undefined>;
  highlightedRange: Accessor<RangeValue<DateValue> | undefined>;
  translations: Accessor<CalendarIntlTranslations>;
  setStartDate: (date: DateValue) => void;
  setAnchorDate: (date: DateValue | undefined) => void;
  setIsFocused: (value: boolean) => void;
  selectFocusedDate: () => void;
  selectDate: (date: DateValue) => void;
  focusCell: (date: DateValue) => void;
  focusNextDay: () => void;
  focusPreviousDay: () => void;
  focusNextPage: () => void;
  focusPreviousPage: () => void;
  focusNextRow: () => void;
  focusPreviousRow: () => void;
  focusSectionStart: () => void;
  focusSectionEnd: () => void;
  focusNextSection: (larger: boolean) => void;
  focusPreviousSection: (larger: boolean) => void;
  getDatesInWeek: (weekIndex: number, from: DateValue) => Array<DateValue | null>;
}
//#endregion
//#region src/calendar/calendar-context.d.ts
interface CalendarDataSet {
  "data-disabled": string | undefined;
  "data-readonly": string | undefined;
}
//#endregion
//#region src/calendar/calendar-root.d.ts
interface CalendarSingleSelectionOptions {
  /** The selection mode of the calendar. */
  selectionMode: "single";
  /** The controlled selected date of the calendar. */
  value?: DateValue | null;
  /**
   * The date of the calendar that should be selected when initially rendered.
   * Useful when you do not need to control the state of the calendar.
   */
  defaultValue?: DateValue | null;
  /** Event handler called when the selected date change. */
  onChange?: (value: DateValue) => void;
}
interface CalendarMultipleSelectionOptions {
  /** The selection mode of the calendar. */
  selectionMode: "multiple";
  /** The controlled selected dates of the calendar. */
  value?: DateValue[] | null;
  /**
   * The dates of the calendar that should be selected when initially rendered.
   * Useful when you do not need to control the state of the calendar.
   */
  defaultValue?: DateValue[] | null;
  /** Event handler called when the selected dates change. */
  onChange?: (value: DateValue[]) => void;
}
interface CalendarRangeSelectionOptions {
  /** The selection mode of the calendar. */
  selectionMode: "range";
  /** The controlled selected date range of the calendar. */
  value?: RangeValue<DateValue> | null;
  /**
   * The date range of the calendar that should be selected when initially rendered.
   * Useful when you do not need to control the state of the calendar.
   */
  defaultValue?: RangeValue<DateValue> | null;
  /** Event handler called when the selected date range change. */
  onChange?: (value: RangeValue<DateValue>) => void;
}
type CalendarRootOptions = (CalendarSingleSelectionOptions | CalendarMultipleSelectionOptions | CalendarRangeSelectionOptions) & {
  /** The localized strings of the component. */
  translations?: CalendarIntlTranslations;
  /** The locale to display and edit the value according to. */
  locale?: string;
  /**
   * The amount of days that will be displayed at once.
   * This affects how pagination works.
   */
  visibleDuration?: DateDuration;
  /** Determines how to align the initial selection relative to the visible date range. */
  selectionAlignment?: DateAlignment;
  /** The minimum allowed date that a user may select. */
  minValue?: DateValue;
  /** The maximum allowed date that a user may select. */
  maxValue?: DateValue;
  /**
   * Callback that is called for each date of the calendar.
   * If it returns true, then the date is unavailable.
   */
  isDateUnavailable?: (date: DateValue) => boolean;
  /**
   * In "range" selection mode, when combined with `isDateUnavailable`,
   * determines whether non-contiguous ranges, i.e. ranges containing unavailable dates, may be selected.
   */
  allowsNonContiguousRanges?: boolean;
  /** Whether to automatically focus the calendar when it mounts. */
  autoFocus?: boolean;
  /** Controls the currently focused date within the calendar. */
  focusedValue?: DateValue;
  /** The date that is focused when the calendar first mounts. */
  defaultFocusedValue?: DateValue;
  /** Handler that is called when the focused date changes. */
  onFocusChange?: (date: DateValue) => void;
  /** Whether the current selection is valid or invalid according to application logic. */
  validationState?: ValidationState;
  /** Whether the calendar is disabled. */
  disabled?: boolean;
  /** Whether the calendar value is read only. */
  readOnly?: boolean;
};
interface CalendarRootCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  "aria-label"?: string;
}
interface CalendarRootRenderProps extends CalendarRootCommonProps, CalendarDataSet {
  role: "group";
  "aria-label": string | undefined;
}
type CalendarRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = CalendarRootOptions & Partial<CalendarRootCommonProps<ElementOf<T>>>;
/**
 * A calendar displays one or more date grids and allows users to select a single, multiple or range of dates.
 */
declare function CalendarRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, CalendarRootProps<T>>): import("@solidjs/web").JSX.Element;
declare namespace index_d_exports {
  export { CalendarBody as Body, Calendar, CalendarBodyOptions, CalendarBodyProps, CalendarGridBodyCellOptions, CalendarGridBodyCellProps, CalendarGridBodyCellTriggerOptions, CalendarGridBodyCellTriggerProps, CalendarGridBodyOptions, CalendarGridBodyProps, CalendarGridBodyRowOptions, CalendarGridBodyRowProps, CalendarGridHeaderCellOptions, CalendarGridHeaderCellProps, CalendarGridHeaderOptions, CalendarGridHeaderProps, CalendarGridHeaderRowOptions, CalendarGridHeaderRowProps, CalendarGridOptions, CalendarGridProps, CalendarHeaderOptions, CalendarHeaderProps, CalendarHeadingOptions, CalendarHeadingProps, CalendarIntlTranslations, CalendarMultipleSelectionOptions, CalendarNextTriggerOptions, CalendarNextTriggerProps, CalendarPrevTriggerOptions, CalendarPrevTriggerProps, CalendarRangeSelectionOptions, CalendarRootCommonProps, CalendarRootOptions, CalendarRootProps, CalendarRootRenderProps, CalendarSelectionMode, CalendarSingleSelectionOptions, CalendarState, DateAlignment, DateValue, CalendarGrid as Grid, CalendarGridBody as GridBody, CalendarGridBodyCell as GridBodyCell, CalendarGridBodyCellTrigger as GridBodyCellTrigger, CalendarGridBodyRow as GridBodyRow, CalendarGridHeader as GridHeader, CalendarGridHeaderCell as GridHeaderCell, CalendarGridHeaderRow as GridHeaderRow, CalendarHeader as Header, CalendarHeading as Heading, CalendarNextTrigger as NextTrigger, CalendarPrevTrigger as PrevTrigger, CalendarRoot as Root };
}
declare const Calendar: typeof CalendarRoot & {
  Body: typeof CalendarBody;
  Grid: typeof CalendarGrid;
  GridBody: typeof CalendarGridBody;
  GridBodyCell: typeof CalendarGridBodyCell;
  GridBodyCellTrigger: typeof CalendarGridBodyCellTrigger;
  GridBodyRow: typeof CalendarGridBodyRow;
  GridHeader: typeof CalendarGridHeader;
  GridHeaderCell: typeof CalendarGridHeaderCell;
  GridHeaderRow: typeof CalendarGridHeaderRow;
  Header: typeof CalendarHeader;
  Heading: typeof CalendarHeading;
  NextTrigger: typeof CalendarNextTrigger;
  PrevTrigger: typeof CalendarPrevTrigger;
};
//#endregion
export { CalendarGridHeaderCellProps as A, CalendarGridBodyCell as B, CalendarHeaderOptions as C, CalendarGridHeaderRowProps as D, CalendarGridHeaderRowOptions as E, CalendarGridBodyRowOptions as F, CalendarGridBodyProps as G, CalendarGridBodyCellProps as H, CalendarGridBodyRowProps as I, CalendarGridProps as J, CalendarGrid as K, CalendarGridBodyCellTrigger as L, CalendarGridHeaderOptions as M, CalendarGridHeaderProps as N, CalendarGridHeaderCell as O, CalendarGridBodyRow as P, CalendarBodyProps as Q, CalendarGridBodyCellTriggerOptions as R, CalendarHeader as S, CalendarGridHeaderRow as T, CalendarGridBody as U, CalendarGridBodyCellOptions as V, CalendarGridBodyOptions as W, CalendarBody as X, DateDuration as Y, CalendarBodyOptions as Z, CalendarNextTriggerOptions as _, CalendarRoot as a, CalendarHeadingOptions as b, CalendarRootProps as c, CalendarState as d, CalendarIntlTranslations as f, CalendarNextTrigger as g, CalendarPrevTriggerProps as h, CalendarRangeSelectionOptions as i, CalendarGridHeader as j, CalendarGridHeaderCellOptions as k, CalendarRootRenderProps as l, CalendarPrevTriggerOptions as m, index_d_exports as n, CalendarRootCommonProps as o, CalendarPrevTrigger as p, CalendarGridOptions as q, CalendarMultipleSelectionOptions as r, CalendarRootOptions as s, Calendar as t, CalendarSingleSelectionOptions as u, CalendarNextTriggerProps as v, CalendarHeaderProps as w, CalendarHeadingProps as x, CalendarHeading as y, CalendarGridBodyCellTriggerProps as z };