import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, s as FormControlErrorMessageCommonProps, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "../index/ZPox5oFC.js";
import { o as SpinButtonRootRenderProps } from "../index/Do9ZOn5y.js";
import { ComponentProps, JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
import { ValidationState } from "@kobalte/utils";
//#region src/time-field/time-field-hidden-input.d.ts
interface TimeFieldHiddenInputProps extends ComponentProps<"input"> {}
declare function TimeFieldHiddenInput(props: TimeFieldHiddenInputProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/time-field/types.d.ts
type TimeFieldGranularity = "hour" | "minute" | "second" | {
  hour: boolean;
  minute: boolean;
  second: boolean;
};
type TimeFieldHourCycle = 12 | 24;
type SegmentType = "hour" | "minute" | "second" | "dayPeriod";
interface Time {
  hour?: number;
  minute?: number;
  second?: number;
}
//#endregion
//#region src/time-field/time-field-input.d.ts
interface TimeFieldInputOptions {
  children?: (segment: Accessor<SegmentType>) => JSX$1.Element;
}
interface TimeFieldInputCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onFocusOut: JSX$1.EventHandlerUnion<T, FocusEvent>;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
  "aria-label"?: string;
}
interface TimeFieldInputRenderProps extends TimeFieldInputCommonProps {
  role: "presentation";
  children: JSX$1.Element;
}
type TimeFieldInputProps<T extends ValidComponent | HTMLElement = HTMLElement> = TimeFieldInputOptions & Partial<TimeFieldInputCommonProps<ElementOf<T>>>;
declare function TimeFieldInput<T extends ValidComponent = "div">(props: PolymorphicProps<T, TimeFieldInputProps<T>>): JSX$1.Element;
//#endregion
//#region src/time-field/time-field-label.d.ts
interface TimeFieldLabelOptions {}
interface TimeFieldLabelCommonProps<_T extends HTMLElement = HTMLElement> {}
interface TimeFieldLabelRenderProps extends TimeFieldLabelCommonProps {}
type TimeFieldLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = TimeFieldLabelOptions & Partial<TimeFieldLabelCommonProps<ElementOf<T>>>;
declare function TimeFieldLabel<T extends ValidComponent = "span">(props: PolymorphicProps<T, TimeFieldLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/time-field/time-field.intl.d.ts
declare const TIME_FIELD_INTL_MESSAGES: {
  hour: string;
  minute: string;
  second: string;
  am: string;
  pm: string;
  dayPeriod: string;
  timeZoneName: string;
  selectedTimeDescription: (time: string) => string;
};
type TimeFieldIntlTranslations = typeof TIME_FIELD_INTL_MESSAGES;
//#endregion
//#region src/time-field/time-field-root.d.ts
interface TimeFieldRootOptions {
  /** The current value (controlled). */
  value?: Time;
  /** The default value (uncontrolled). */
  defaultValue?: Time;
  /** Handler that is called when the value changes. */
  onChange?: (value: Time) => void;
  /**
   * Whether to display the time in 12 or 24-hour format.
   * By default, this is determined by the user's locale.
   */
  hourCycle?: TimeFieldHourCycle;
  /**
   * Determines the smallest unit that is displayed in the time field.
   * Defaults to `"minute"`.
   */
  granularity?: TimeFieldGranularity;
  /**
   * Whether to always show leading zeros in the hour field.
   * Defaults to `false`
   */
  forceLeadingZeros?: boolean;
  /**
   * A placeholder time shown when no value is selected.
   */
  placeholder?: Time;
  /** The minimum allowed time that a user may select. */
  min?: Time;
  /** The maximum allowed time that a user may select. */
  max?: Time;
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
  /**
   * The name of the time field.
   * Submitted with its owning form as part of a name/value pair.
   */
  name?: string;
  /** Whether the time field should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the time field is required. */
  required?: boolean;
  /** Whether the time field is disabled. */
  disabled?: boolean;
  /** Whether the time field is read only. */
  readOnly?: boolean;
  /** The localized strings of the component. */
  translations?: TimeFieldIntlTranslations;
}
interface TimeFieldRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
  "aria-label"?: string;
  children: JSX$1.Element;
}
interface TimeFieldRootRenderProps extends TimeFieldRootCommonProps, FormControlDataSet {
  role: "group";
  "aria-invalid": boolean | undefined;
  "aria-required": boolean | undefined;
  "aria-disabled": boolean | undefined;
  "aria-readonly": boolean | undefined;
}
type TimeFieldRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = TimeFieldRootOptions & Partial<TimeFieldRootCommonProps<ElementOf<T>>>;
declare function TimeFieldRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, TimeFieldRootProps<T>>): JSX$1.Element;
//#endregion
//#region src/time-field/time-field-segment.d.ts
interface TimeFieldSegmentOptions {
  segment: SegmentType;
}
interface TimeFieldSegmentCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  onBeforeInput: JSX$1.EventHandlerUnion<T, InputEvent>;
  onInput: JSX$1.EventHandlerUnion<T, InputEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
  children: JSX$1.Element;
}
interface TimeFieldSegmentRenderProps extends TimeFieldSegmentCommonProps, SpinButtonRootRenderProps {
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
type TimeFieldSegmentProps<T extends ValidComponent | HTMLElement = HTMLElement> = TimeFieldSegmentOptions & Partial<TimeFieldSegmentCommonProps<ElementOf<T>>>;
declare function TimeFieldSegment<T extends ValidComponent = "div">(props: PolymorphicProps<T, TimeFieldSegmentProps<T>>): JSX$1.Element;
//#endregion
//#region src/time-field/index.d.ts
export declare const TimeField: typeof TimeFieldRoot & {
  Label: typeof TimeFieldLabel;
  Input: typeof TimeFieldInput;
  Segment: typeof TimeFieldSegment;
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  HiddenInput: typeof TimeFieldHiddenInput;
};
//#endregion
export { FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, TimeFieldHiddenInput as HiddenInput, TimeFieldInput as Input, TimeFieldLabel as Label, TimeFieldRoot as Root, TimeFieldSegment as Segment, type FormControlDescriptionCommonProps as TimeFieldDescriptionCommonProps, type FormControlDescriptionOptions as TimeFieldDescriptionOptions, type FormControlDescriptionProps as TimeFieldDescriptionProps, type FormControlDescriptionRenderProps as TimeFieldDescriptionRenderProps, type FormControlErrorMessageCommonProps as TimeFieldErrorMessageCommonProps, type FormControlErrorMessageOptions as TimeFieldErrorMessageOptions, type FormControlErrorMessageProps as TimeFieldErrorMessageProps, type FormControlErrorMessageRenderProps as TimeFieldErrorMessageRenderProps, type TimeFieldHiddenInputProps, type TimeFieldInputCommonProps, type TimeFieldInputOptions, type TimeFieldInputProps, type TimeFieldInputRenderProps, type TimeFieldLabelCommonProps, type TimeFieldLabelOptions, type TimeFieldLabelProps, type TimeFieldLabelRenderProps, type TimeFieldRootCommonProps, type TimeFieldRootOptions, type TimeFieldRootProps, type TimeFieldRootRenderProps, type TimeFieldSegmentCommonProps, type TimeFieldSegmentOptions, type TimeFieldSegmentProps, type TimeFieldSegmentRenderProps };