import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { r as DateValue } from "../types/CfIQoHy3.js";
import { c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, s as FormControlErrorMessageCommonProps, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "../index/ZPox5oFC.js";
import { o as SpinButtonRootRenderProps } from "../index/Do9ZOn5y.js";
import { ComponentProps, JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
import { ValidationState } from "@kobalte/utils";
//#region src/date-field/date-field-hidden-input.d.ts
interface DateFieldHiddenInputProps extends ComponentProps<"input"> {}
declare function DateFieldHiddenInput(props: DateFieldHiddenInputProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/date-field/types.d.ts
type DateFieldGranularity = "day" | "hour" | "minute" | "second";
type DateFieldMaxGranularity = "year" | "month" | DateFieldGranularity;
type DateFieldHourCycle = 12 | 24;
type SegmentType = "year" | "month" | "day" | "hour" | "minute" | "second" | "dayPeriod" | "literal";
interface DateSegment {
  /** The type of segment. */
  type: SegmentType;
  /** The formatted text for the segment. */
  text: string;
  /** The numeric value for the segment, if applicable. */
  value?: number;
  /** The minimum numeric value for the segment, if applicable. */
  minValue?: number;
  /** The maximum numeric value for the segment, if applicable. */
  maxValue?: number;
  /** Whether the value is a placeholder. */
  isPlaceholder: boolean;
  /** A placeholder string for the segment. */
  placeholder: string;
  /** Whether the segment is editable. */
  isEditable: boolean;
}
//#endregion
//#region src/date-field/date-field-input.d.ts
interface DateFieldInputOptions {
  children?: (segment: Accessor<DateSegment>) => JSX$1.Element;
}
interface DateFieldInputCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onFocusOut: JSX$1.EventHandlerUnion<T, FocusEvent>;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
  "aria-label"?: string;
}
interface DateFieldInputRenderProps extends DateFieldInputCommonProps {
  role: "presentation";
  children: JSX$1.Element;
}
type DateFieldInputProps<T extends ValidComponent | HTMLElement = HTMLElement> = DateFieldInputOptions & Partial<DateFieldInputCommonProps<ElementOf<T>>>;
declare function DateFieldInput<T extends ValidComponent = "div">(props: PolymorphicProps<T, DateFieldInputProps<T>>): JSX$1.Element;
//#endregion
//#region src/date-field/date-field-label.d.ts
interface DateFieldLabelOptions {}
interface DateFieldLabelCommonProps<_T extends HTMLElement = HTMLElement> {}
interface DateFieldLabelRenderProps extends DateFieldLabelCommonProps {}
type DateFieldLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = DateFieldLabelOptions & Partial<DateFieldLabelCommonProps<ElementOf<T>>>;
declare function DateFieldLabel<T extends ValidComponent = "span">(props: PolymorphicProps<T, DateFieldLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/date-field/date-field.intl.d.ts
declare const DATE_FIELD_INTL_MESSAGES: {
  era: string;
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
  dayPeriod: string;
  timeZoneName: string;
  selectedDateDescription: (date: string) => string;
  placeholder: {
    year: string;
    month: string;
    day: string;
  };
};
type DateFieldIntlTranslations = typeof DATE_FIELD_INTL_MESSAGES;
//#endregion
//#region src/date-field/date-field-root.d.ts
interface DateFieldRootOptions {
  /** The current value (controlled). */
  value?: DateValue;
  /** The default value (uncontrolled). */
  defaultValue?: DateValue;
  /** Handler that is called when the value changes. */
  onChange?: (value: DateValue) => void;
  /**
   * A placeholder date that influences the format of the placeholder shown when no value is selected.
   * Defaults to today's date at midnight.
   */
  placeholderValue?: DateValue;
  /** The minimum allowed date that a user may select. */
  minValue?: DateValue;
  /** The maximum allowed date that a user may select. */
  maxValue?: DateValue;
  /**
   * Whether to display the time in 12 or 24-hour format.
   * By default, this is determined by the user's locale.
   */
  hourCycle?: DateFieldHourCycle;
  /**
   * Determines the smallest unit that is displayed in the date field.
   * Defaults to `"day"`.
   */
  granularity?: DateFieldGranularity;
  /** Determines the largest unit that is displayed in the date field. Defaults to `"year"`. */
  maxGranularity?: DateFieldMaxGranularity;
  /**
   * Whether to always show leading zeros in the day/month/hour fields.
   * By default, this is determined by the user's locale.
   */
  shouldForceLeadingZeros?: boolean;
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
  /**
   * The name of the date field.
   * Submitted with its owning form as part of a name/value pair.
   */
  name?: string;
  /** Whether the date field should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the date field is required. */
  required?: boolean;
  /** Whether the date field is disabled. */
  disabled?: boolean;
  /** Whether the date field is read only. */
  readOnly?: boolean;
  /** The localized strings of the component. */
  translations?: DateFieldIntlTranslations;
}
interface DateFieldRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
  "aria-label"?: string;
  children: JSX$1.Element;
}
interface DateFieldRootRenderProps extends DateFieldRootCommonProps, FormControlDataSet {
  role: "group";
  "aria-invalid": "true" | undefined;
  "aria-required": "true" | undefined;
  "aria-disabled": "true" | undefined;
  "aria-readonly": "true" | undefined;
}
type DateFieldRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = DateFieldRootOptions & Partial<DateFieldRootCommonProps<ElementOf<T>>>;
declare function DateFieldRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, DateFieldRootProps<T>>): JSX$1.Element;
//#endregion
//#region src/date-field/date-field-segment.d.ts
interface DateFieldSegmentOptions {
  segment: DateSegment;
}
interface DateFieldSegmentCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  onBeforeInput: JSX$1.EventHandlerUnion<T, InputEvent>;
  onInput: JSX$1.EventHandlerUnion<T, InputEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
  children: JSX$1.Element;
}
interface DateFieldSegmentRenderProps extends DateFieldSegmentCommonProps, SpinButtonRootRenderProps {
  tabindex: string | number | false | undefined;
  contentEditable: boolean | undefined;
  inputMode: string | false | undefined;
  autocorrect: string | false | undefined;
  autoCapitalize: string | false | undefined;
  spellcheck: boolean | "" | "false" | "true" | undefined;
  enterkeyhint: string | false | undefined;
  "aria-label": string | undefined;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
  "data-placeholder": string | undefined;
  "data-type": string;
}
type DateFieldSegmentProps<T extends ValidComponent | HTMLElement = HTMLElement> = DateFieldSegmentOptions & Partial<DateFieldSegmentCommonProps<ElementOf<T>>>;
declare function DateFieldSegment<T extends ValidComponent = "div">(props: PolymorphicProps<T, DateFieldSegmentProps<T>>): JSX$1.Element;
//#endregion
//#region src/date-field/index.d.ts
export declare const DateField: typeof DateFieldRoot & {
  Label: typeof DateFieldLabel;
  Input: typeof DateFieldInput;
  Segment: typeof DateFieldSegment;
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  HiddenInput: typeof DateFieldHiddenInput;
};
//#endregion
export { type FormControlDescriptionCommonProps as DateFieldDescriptionCommonProps, type FormControlDescriptionOptions as DateFieldDescriptionOptions, type FormControlDescriptionProps as DateFieldDescriptionProps, type FormControlDescriptionRenderProps as DateFieldDescriptionRenderProps, type FormControlErrorMessageCommonProps as DateFieldErrorMessageCommonProps, type FormControlErrorMessageOptions as DateFieldErrorMessageOptions, type FormControlErrorMessageProps as DateFieldErrorMessageProps, type FormControlErrorMessageRenderProps as DateFieldErrorMessageRenderProps, type DateFieldGranularity, type DateFieldHiddenInputProps, type DateFieldHourCycle, type DateFieldInputCommonProps, type DateFieldInputOptions, type DateFieldInputProps, type DateFieldInputRenderProps, type DateFieldLabelCommonProps, type DateFieldLabelOptions, type DateFieldLabelProps, type DateFieldLabelRenderProps, type DateFieldMaxGranularity, type DateFieldRootCommonProps, type DateFieldRootOptions, type DateFieldRootProps, type DateFieldRootRenderProps, type DateFieldSegmentCommonProps, type DateFieldSegmentOptions, type DateFieldSegmentProps, type DateFieldSegmentRenderProps, type DateSegment, type DateValue, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, DateFieldHiddenInput as HiddenInput, DateFieldInput as Input, DateFieldLabel as Label, DateFieldRoot as Root, DateFieldSegment as Segment, type SegmentType };