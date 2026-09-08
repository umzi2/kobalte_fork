import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { a as FormControlLabelRenderProps, c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, i as FormControlLabelProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, n as FormControlLabelCommonProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, r as FormControlLabelOptions, s as FormControlErrorMessageCommonProps, t as FormControlLabel, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "./ZPox5oFC.js";
import { JSX, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
import { ValidationState } from "@kobalte/utils";
//#region src/text-field/text-field-input.d.ts
interface TextFieldInputOptions {}
interface TextFieldInputCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  onInput: JSX.EventHandlerUnion<T, InputEvent>;
  "aria-label": string | undefined;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
}
interface TextFieldInputRenderProps extends TextFieldInputCommonProps, FormControlDataSet {
  name: string;
  value: string | undefined;
  required: boolean | undefined;
  disabled: boolean | undefined;
  readonly: boolean | undefined;
  "aria-invalid": "true" | undefined;
  "aria-required": "true" | undefined;
  "aria-disabled": "true" | undefined;
  "aria-readonly": "true" | undefined;
}
type TextFieldInputProps<T extends ValidComponent | HTMLElement = HTMLElement> = TextFieldInputOptions & Partial<TextFieldInputCommonProps<ElementOf<T>>>;
declare function TextFieldInput<T extends ValidComponent = "input">(props: PolymorphicProps<T, TextFieldInputProps<T>>): JSX.Element;
//#endregion
//#region src/text-field/text-field-root.d.ts
interface TextFieldRootOptions {
  /** The controlled value of the text field. */
  value?: string;
  /**
   * The default value when initially rendered.
   * Useful when you do not need to control the value.
   */
  defaultValue?: string;
  /** Event handler called when the value of the text field changes. */
  onChange?: (value: string) => void;
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
interface TextFieldRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
}
interface TextFieldRootRenderProps extends TextFieldRootCommonProps, FormControlDataSet {
  role: "group";
}
type TextFieldRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = TextFieldRootOptions & Partial<TextFieldRootCommonProps<ElementOf<T>>>;
/**
 * A text input that allow users to input custom text entries with a keyboard.
 */
declare function TextFieldRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, TextFieldRootProps<T>>): JSX.Element;
//#endregion
//#region src/text-field/text-field-text-area.d.ts
interface TextFieldTextAreaOptions {
  /** Whether the textarea should adjust its height when the value changes. */
  autoResize?: boolean;
  /** Whether the form should be submitted when the user presses the enter key. */
  submitOnEnter?: boolean;
}
interface TextFieldTextAreaCommonProps<T extends HTMLElement = HTMLElement> extends TextFieldInputCommonProps<T> {
  ref: Ref<T>;
  onKeyPress: JSX.EventHandlerUnion<T, KeyboardEvent>;
}
interface TextFieldTextAreaRenderProps extends TextFieldTextAreaCommonProps, TextFieldInputRenderProps {
  "aria-multiline": string | undefined;
}
type TextFieldTextAreaProps<T extends ValidComponent | HTMLElement = HTMLElement> = TextFieldTextAreaOptions & Partial<TextFieldTextAreaCommonProps<ElementOf<T>>>;
/**
 * The native html textarea of the textfield.
 */
declare function TextFieldTextArea<T extends ValidComponent = "textarea">(props: PolymorphicProps<T, TextFieldTextAreaProps<T>>): JSX.Element;
//#endregion
//#region src/text-field/text-field-context.d.ts
interface TextFieldContextValue {
  value: Accessor<string | undefined>;
  generateId: (part: string) => string;
  onInput: JSX.EventHandlerUnion<HTMLInputElement | HTMLTextAreaElement, InputEvent>;
}
declare function useTextFieldContext(): TextFieldContextValue;
declare namespace index_d_exports {
  export { FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, TextFieldInput as Input, FormControlLabel as Label, TextFieldRoot as Root, TextFieldTextArea as TextArea, TextField, TextFieldContextValue, FormControlDescriptionCommonProps as TextFieldDescriptionCommonProps, FormControlDescriptionOptions as TextFieldDescriptionOptions, FormControlDescriptionProps as TextFieldDescriptionProps, FormControlDescriptionRenderProps as TextFieldDescriptionRenderProps, FormControlErrorMessageCommonProps as TextFieldErrorMessageCommonProps, FormControlErrorMessageOptions as TextFieldErrorMessageOptions, FormControlErrorMessageProps as TextFieldErrorMessageProps, FormControlErrorMessageRenderProps as TextFieldErrorMessageRenderProps, TextFieldInputCommonProps, TextFieldInputOptions, TextFieldInputProps, TextFieldInputRenderProps, FormControlLabelCommonProps as TextFieldLabelCommonProps, FormControlLabelOptions as TextFieldLabelOptions, FormControlLabelProps as TextFieldLabelProps, FormControlLabelRenderProps as TextFieldLabelRenderProps, TextFieldRootCommonProps, TextFieldRootOptions, TextFieldRootProps, TextFieldRootRenderProps, TextFieldTextAreaCommonProps, TextFieldTextAreaOptions, TextFieldTextAreaProps, TextFieldTextAreaRenderProps, useTextFieldContext };
}
declare const TextField: typeof TextFieldRoot & {
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  Input: typeof TextFieldInput;
  Label: typeof FormControlLabel;
  TextArea: typeof TextFieldTextArea;
};
//#endregion
export { TextFieldInputOptions as _, TextFieldTextArea as a, TextFieldTextAreaProps as c, TextFieldRootCommonProps as d, TextFieldRootOptions as f, TextFieldInputCommonProps as g, TextFieldInput as h, useTextFieldContext as i, TextFieldTextAreaRenderProps as l, TextFieldRootRenderProps as m, index_d_exports as n, TextFieldTextAreaCommonProps as o, TextFieldRootProps as p, TextFieldContextValue as r, TextFieldTextAreaOptions as s, TextField as t, TextFieldRoot as u, TextFieldInputProps as v, TextFieldInputRenderProps as y };