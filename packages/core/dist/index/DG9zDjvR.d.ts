import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { i as ButtonRootCommonProps, s as ButtonRootRenderProps } from "./Bjp2qtUK.js";
import { a as FormControlLabelRenderProps, c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, i as FormControlLabelProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, n as FormControlLabelCommonProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, r as FormControlLabelOptions, s as FormControlErrorMessageCommonProps, t as FormControlLabel, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "./ZPox5oFC.js";
import { i as SpinButtonRootOptions, s as SpinButtonIntlTranslations } from "./Do9ZOn5y.js";
import { ComponentProps, JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
import { ValidationState } from "@kobalte/utils";
//#region src/number-field/number-field-vary-trigger.d.ts
interface NumberFieldVaryTriggerCommonProps<T extends HTMLElement = HTMLElement> extends ButtonRootCommonProps<T> {
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
}
interface NumberFieldVaryTriggerRenderProps extends NumberFieldVaryTriggerCommonProps, ButtonRootRenderProps {
  "aria-controls": string | undefined;
}
//#endregion
//#region src/number-field/number-field-decrement-trigger.d.ts
interface NumberFieldDecrementTriggerOptions {}
interface NumberFieldDecrementTriggerCommonProps<T extends HTMLElement = HTMLElement> extends NumberFieldVaryTriggerCommonProps<T> {}
interface NumberFieldDecrementTriggerRenderProps extends NumberFieldDecrementTriggerCommonProps, NumberFieldVaryTriggerRenderProps {}
type NumberFieldDecrementTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = NumberFieldDecrementTriggerOptions & Partial<NumberFieldDecrementTriggerCommonProps<ElementOf<T>>>;
declare function NumberFieldDecrementTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, NumberFieldDecrementTriggerProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/number-field/number-field-hidden-input.d.ts
interface NumberFieldHiddenInputProps extends ComponentProps<"input"> {}
declare function NumberFieldHiddenInput(props: NumberFieldHiddenInputProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/number-field/number-field-increment-trigger.d.ts
interface NumberFieldIncrementTriggerOptions {}
interface NumberFieldIncrementTriggerCommonProps<T extends HTMLElement = HTMLElement> extends NumberFieldVaryTriggerCommonProps<T> {}
interface NumberFieldIncrementTriggerRenderProps extends NumberFieldIncrementTriggerCommonProps, NumberFieldVaryTriggerRenderProps {}
type NumberFieldIncrementTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = NumberFieldIncrementTriggerOptions & Partial<NumberFieldIncrementTriggerCommonProps<ElementOf<T>>>;
declare function NumberFieldIncrementTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, NumberFieldIncrementTriggerProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/number-field/number-field-input.d.ts
interface NumberFieldInputOptions {
  /** The localized strings of the component. */
  translations?: SpinButtonIntlTranslations;
}
interface NumberFieldInputCommonProps<T extends HTMLElement = HTMLInputElement> {
  id: string;
  style?: JSX$1.CSSProperties | string | false;
  ref: Ref<T>;
  onInput: JSX$1.EventHandlerUnion<T, InputEvent>;
  onChange: JSX$1.EventHandlerUnion<T, Event>;
  onWheel: JSX$1.EventHandlerUnion<T, WheelEvent>;
  onKeyDown?: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onFocus?: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onBlur?: JSX$1.EventHandlerUnion<T, FocusEvent>;
  "aria-label": string | undefined;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
  inputMode?: string;
  autocomplete?: string;
  autocorrect?: string;
  spellcheck?: boolean;
}
interface NumberFieldInputRenderProps extends NumberFieldInputCommonProps {
  type: "text";
  value: string;
  role: "spinbutton";
  required: boolean | undefined;
  disabled: boolean | undefined;
  readonly: boolean | undefined;
  "aria-valuenow": number | string | undefined;
  "aria-valuetext": string | undefined;
  "aria-valuemin": number | undefined;
  "aria-valuemax": number | undefined;
  "aria-required": "true" | undefined;
  "aria-disabled": "true" | undefined;
  "aria-readonly": "true" | undefined;
  "aria-invalid": "true" | undefined;
}
type NumberFieldInputProps<T extends ValidComponent | HTMLElement = HTMLInputElement> = NumberFieldInputOptions & Partial<NumberFieldInputCommonProps<ElementOf<T>>>;
declare function NumberFieldInput<T extends ValidComponent = "input">(props: PolymorphicProps<T, NumberFieldInputProps<T>>): JSX$1.Element;
//#endregion
//#region src/number-field/number-field-root.d.ts
interface NumberFieldRootOptions extends Pick<SpinButtonRootOptions, "textValue" | "translations"> {
  /** The controlled formatted value of the number field. */
  value?: string | number;
  /**
   * The default formatted value when initially rendered.
   * Useful when you do not need to control the value.
   */
  defaultValue?: string | number;
  /** Event handler called when the formatted value of the number field changes. */
  onChange?: (value: string) => void;
  /** The controlled raw value of the number field. */
  rawValue?: number;
  /** Event handler called when the raw value of the number field changes. */
  onRawValueChange?: (value: number) => void;
  /** The smallest value allowed, defaults to `Number.MIN_SAFE_INTEGER`. */
  minValue?: number;
  /** The largest value allowed, defaults to `Number.MAX_SAFE_INTEGER`. */
  maxValue?: number;
  /** Increment/Decrement step (Arrow). */
  step?: number;
  /** Increment/Decrement step (Page Up/Down), defaults `10 * step`. */
  largeStep?: number;
  /** Whether to increment/decrement on wheel. */
  changeOnWheel?: boolean;
  /** Whether to format the input value. */
  format?: boolean;
  /** Options for formatting input value. */
  formatOptions?: Intl.NumberFormatOptions;
  /** Allowed input characters, defaults to valid format characters. */
  allowedInput?: RegExp;
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
  /**
   * The name of the text field, used when submitting an HTML form.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
  /** Whether the text field should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the user must fill the text field before the owning form can be submitted. */
  required?: boolean;
  /** Whether the text field is disabled. */
  disabled?: boolean;
  /** Whether the text field is read only. */
  readOnly?: boolean;
}
interface NumberFieldRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
}
interface NumberFieldRootRenderProps extends NumberFieldRootCommonProps, FormControlDataSet {
  role: "group";
}
type NumberFieldRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = NumberFieldRootOptions & Partial<NumberFieldRootCommonProps<ElementOf<T>>>;
/**
 * A text input that allow users to input custom text entries with a keyboard.
 */
declare function NumberFieldRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, NumberFieldRootProps<T>>): JSX$1.Element;
//#endregion
//#region src/number-field/number-field-context.d.ts
interface NumberFieldContextValue {
  value: Accessor<number | string | undefined>;
  setValue: (value: number | string) => void;
  rawValue: Accessor<number>;
  generateId: (part: string) => string;
  formatNumber: (number: number) => string;
  format: () => void;
  onInput: JSX$1.EventHandlerUnion<HTMLInputElement, InputEvent>;
  textValue: Accessor<string | undefined>;
  minValue: Accessor<number>;
  maxValue: Accessor<number>;
  step: Accessor<number>;
  largeStep: Accessor<number>;
  changeOnWheel: Accessor<boolean>;
  translations: Accessor<SpinButtonIntlTranslations | undefined>;
  inputRef: Accessor<HTMLInputElement | undefined>;
  setInputRef: (el: HTMLInputElement) => void;
  hiddenInputRef: Accessor<HTMLInputElement | undefined>;
  setHiddenInputRef: (el: HTMLInputElement) => void;
  varyValue: (offset: number) => void;
}
declare function useNumberFieldContext(): NumberFieldContextValue;
declare namespace index_d_exports {
  export { NumberFieldDecrementTrigger as DecrementTrigger, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, NumberFieldHiddenInput as HiddenInput, NumberFieldIncrementTrigger as IncrementTrigger, NumberFieldInput as Input, FormControlLabel as Label, NumberField, NumberFieldContextValue, NumberFieldDecrementTriggerCommonProps, NumberFieldDecrementTriggerOptions, NumberFieldDecrementTriggerProps, NumberFieldDecrementTriggerRenderProps, FormControlDescriptionCommonProps as NumberFieldDescriptionCommonProps, FormControlDescriptionOptions as NumberFieldDescriptionOptions, FormControlDescriptionProps as NumberFieldDescriptionProps, FormControlDescriptionRenderProps as NumberFieldDescriptionRenderProps, FormControlErrorMessageCommonProps as NumberFieldErrorMessageCommonProps, FormControlErrorMessageOptions as NumberFieldErrorMessageOptions, FormControlErrorMessageProps as NumberFieldErrorMessageProps, FormControlErrorMessageRenderProps as NumberFieldErrorMessageRenderProps, NumberFieldHiddenInputProps, NumberFieldIncrementTriggerCommonProps, NumberFieldIncrementTriggerOptions, NumberFieldIncrementTriggerProps, NumberFieldIncrementTriggerRenderProps, NumberFieldInputCommonProps, NumberFieldInputOptions, NumberFieldInputProps, NumberFieldInputRenderProps, FormControlLabelCommonProps as NumberFieldLabelCommonProps, FormControlLabelOptions as NumberFieldLabelOptions, FormControlLabelProps as NumberFieldLabelProps, FormControlLabelRenderProps as NumberFieldLabelRenderProps, NumberFieldRootCommonProps, NumberFieldRootOptions, NumberFieldRootProps, NumberFieldRootRenderProps, NumberFieldRoot as Root, useNumberFieldContext };
}
declare const NumberField: typeof NumberFieldRoot & {
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  HiddenInput: typeof NumberFieldHiddenInput;
  Input: typeof NumberFieldInput;
  IncrementTrigger: typeof NumberFieldIncrementTrigger;
  DecrementTrigger: typeof NumberFieldDecrementTrigger;
  Label: typeof FormControlLabel;
};
//#endregion
export { NumberFieldDecrementTriggerCommonProps as C, NumberFieldDecrementTriggerRenderProps as E, NumberFieldDecrementTrigger as S, NumberFieldDecrementTriggerProps as T, NumberFieldIncrementTriggerOptions as _, NumberFieldRoot as a, NumberFieldHiddenInput as b, NumberFieldRootProps as c, NumberFieldInputCommonProps as d, NumberFieldInputOptions as f, NumberFieldIncrementTriggerCommonProps as g, NumberFieldIncrementTrigger as h, useNumberFieldContext as i, NumberFieldRootRenderProps as l, NumberFieldInputRenderProps as m, index_d_exports as n, NumberFieldRootCommonProps as o, NumberFieldInputProps as p, NumberFieldContextValue as r, NumberFieldRootOptions as s, NumberField as t, NumberFieldInput as u, NumberFieldIncrementTriggerProps as v, NumberFieldDecrementTriggerOptions as w, NumberFieldHiddenInputProps as x, NumberFieldIncrementTriggerRenderProps as y };