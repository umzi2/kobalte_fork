import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { a as FormControlLabelRenderProps, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, n as FormControlLabelCommonProps, r as FormControlLabelOptions, s as FormControlErrorMessageCommonProps, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "./ZPox5oFC.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
import { ValidationState } from "@kobalte/utils";
//#region src/checkbox/checkbox-context.d.ts
interface CheckboxDataSet {
  "data-checked": string | undefined;
  "data-indeterminate": string | undefined;
}
interface CheckboxContextValue {
  value: Accessor<string>;
  dataset: Accessor<CheckboxDataSet>;
  checked: Accessor<boolean>;
  indeterminate: Accessor<boolean>;
  inputRef: Accessor<HTMLInputElement | undefined>;
  generateId: (part: string) => string;
  toggle: () => void;
  setIsChecked: (isChecked: boolean) => void;
  setIsFocused: (isFocused: boolean) => void;
  setInputRef: (el: HTMLInputElement) => void;
}
declare function useCheckboxContext(): CheckboxContextValue;
//#endregion
//#region src/checkbox/checkbox-control.d.ts
interface CheckboxControlOptions {}
interface CheckboxControlCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
}
interface CheckboxControlRenderProps extends CheckboxControlCommonProps, FormControlDataSet, CheckboxDataSet {}
type CheckboxControlProps<T extends ValidComponent | HTMLElement = HTMLElement> = CheckboxControlOptions & Partial<CheckboxControlCommonProps<ElementOf<T>>>;
/**
 * The element that visually represents a checkbox.
 */
declare function CheckboxControl<T extends ValidComponent = "div">(props: PolymorphicProps<T, CheckboxControlProps<T>>): JSX$1.Element;
//#endregion
//#region src/checkbox/checkbox-description.d.ts
interface CheckboxDescriptionOptions extends FormControlDescriptionProps {}
interface CheckboxDescriptionCommonProps extends FormControlDescriptionCommonProps {}
interface CheckboxDescriptionRenderProps extends CheckboxDescriptionCommonProps, CheckboxDataSet, FormControlDescriptionRenderProps {}
type CheckboxDescriptionProps<_T extends ValidComponent | HTMLElement = HTMLElement> = CheckboxDescriptionOptions & Partial<CheckboxDescriptionCommonProps>;
/**
 * The description that gives the user more information on the checkbox.
 */
declare function CheckboxDescription<T extends ValidComponent = "div">(props: PolymorphicProps<T, CheckboxDescriptionProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/checkbox/checkbox-error-message.d.ts
interface CheckboxErrorMessageOptions extends FormControlErrorMessageProps {}
interface CheckboxErrorMessageCommonProps<T extends HTMLElement = HTMLElement> extends FormControlErrorMessageCommonProps<T> {}
interface CheckboxErrorMessageRenderProps extends CheckboxErrorMessageCommonProps, CheckboxDataSet, FormControlErrorMessageRenderProps {}
type CheckboxErrorMessageProps<T extends ValidComponent | HTMLElement = HTMLElement> = CheckboxErrorMessageOptions & Partial<CheckboxErrorMessageCommonProps<ElementOf<T>>>;
/**
 * The error message that gives the user information about how to fix a validation error on the checkbox.
 */
declare function CheckboxErrorMessage<T extends ValidComponent = "div">(props: PolymorphicProps<T, CheckboxErrorMessageProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/checkbox/checkbox-indicator.d.ts
interface CheckboxIndicatorOptions {
  /**
   * Used to force mounting when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
}
interface CheckboxIndicatorCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
}
interface CheckboxIndicatorRenderProps extends CheckboxIndicatorCommonProps, FormControlDataSet, CheckboxDataSet {}
type CheckboxIndicatorProps<T extends ValidComponent | HTMLElement = HTMLElement> = CheckboxIndicatorOptions & Partial<CheckboxIndicatorCommonProps<ElementOf<T>>>;
/**
 * The visual indicator rendered when the checkbox is in a checked or indeterminate state.
 * You can style this element directly, or you can use it as a wrapper to put an icon into, or both.
 */
declare function CheckboxIndicator<T extends ValidComponent = "div">(props: PolymorphicProps<T, CheckboxIndicatorProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/checkbox/checkbox-input.d.ts
interface CheckboxInputOptions {}
interface CheckboxInputCommonProps<T extends HTMLElement = HTMLInputElement> {
  id: string;
  ref: Ref<T>;
  style: JSX$1.CSSProperties | string;
  onChange: JSX$1.EventHandlerUnion<T, InputEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onBlur: JSX$1.EventHandlerUnion<T, FocusEvent>;
  "aria-label": string | undefined;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
}
interface CheckboxInputRenderProps extends CheckboxInputCommonProps, FormControlDataSet, CheckboxDataSet {
  type: "checkbox";
  name: string;
  value: string;
  checked: boolean;
  required: boolean | undefined;
  disabled: boolean | undefined;
  readonly: boolean | undefined;
  "aria-invalid": "true" | undefined;
  "aria-required": "true" | undefined;
  "aria-disabled": "true" | undefined;
  "aria-readonly": "true" | undefined;
}
type CheckboxInputProps<T extends ValidComponent | HTMLElement = HTMLInputElement> = CheckboxInputOptions & Partial<CheckboxInputCommonProps<ElementOf<T>>>;
/**
 * The native html input that is visually hidden in the checkbox.
 */
declare function CheckboxInput<T extends ValidComponent = "input">(props: PolymorphicProps<T, CheckboxInputProps<T>>): JSX$1.Element;
//#endregion
//#region src/checkbox/checkbox-label.d.ts
interface CheckboxLabelOptions extends FormControlLabelOptions {}
interface CheckboxLabelCommonProps<T extends HTMLElement = HTMLElement> extends FormControlLabelCommonProps<T> {}
interface CheckboxLabelRenderProps extends CheckboxLabelCommonProps, FormControlLabelRenderProps, CheckboxDataSet {}
type CheckboxLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = CheckboxLabelOptions & Partial<CheckboxLabelCommonProps<ElementOf<T>>>;
/**
 * The label that gives the user information on the checkbox.
 */
declare function CheckboxLabel<T extends ValidComponent = "label">(props: PolymorphicProps<T, CheckboxLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/checkbox/checkbox-root.d.ts
interface CheckboxRootState {
  /** Whether the checkbox is checked or not. */
  checked: Accessor<boolean>;
  /** Whether the checkbox is in an indeterminate state. */
  indeterminate: Accessor<boolean>;
}
interface CheckboxRootOptions {
  /** The controlled checked state of the checkbox. */
  checked?: boolean;
  /**
   * The default checked state when initially rendered.
   * Useful when you do not need to control the checked state.
   */
  defaultChecked?: boolean;
  /** Event handler called when the checked state of the checkbox changes. */
  onChange?: (checked: boolean) => void;
  /**
   * Whether the checkbox is in an indeterminate state.
   * Indeterminism is presentational only.
   * The indeterminate visual representation remains regardless of user interaction.
   */
  indeterminate?: boolean;
  /**
   * The value of the checkbox, used when submitting an HTML form.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue).
   */
  value?: string;
  /**
   * The name of the checkbox, used when submitting an HTML form.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
  /** Whether the checkbox should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the user must check the checkbox before the owning form can be submitted. */
  required?: boolean;
  /** Whether the checkbox is disabled. */
  disabled?: boolean;
  /** Whether the checkbox is read only. */
  readOnly?: boolean;
  /**
   * The children of the checkbox.
   * Can be a `JSX.Element` or a _render prop_ for having access to the internal state.
   */
  children?: JSX$1.Element | ((state: CheckboxRootState) => JSX$1.Element);
}
interface CheckboxRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
}
type CheckboxRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = CheckboxRootOptions & Partial<CheckboxRootCommonProps<ElementOf<T>>>;
/**
 * A control that allows the user to toggle between checked and not checked.
 */
declare function CheckboxRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, CheckboxRootProps<T>>): JSX$1.Element;
declare namespace index_d_exports {
  export { Checkbox, CheckboxContextValue, CheckboxControlCommonProps, CheckboxControlOptions, CheckboxControlProps, CheckboxControlRenderProps, CheckboxDescriptionCommonProps, CheckboxDescriptionOptions, CheckboxDescriptionProps, CheckboxDescriptionRenderProps, CheckboxErrorMessageCommonProps, CheckboxErrorMessageOptions, CheckboxErrorMessageProps, CheckboxErrorMessageRenderProps, CheckboxIndicatorCommonProps, CheckboxIndicatorOptions, CheckboxIndicatorProps, CheckboxIndicatorRenderProps, CheckboxInputCommonProps, CheckboxInputOptions, CheckboxInputProps, CheckboxInputRenderProps, CheckboxLabelCommonProps, CheckboxLabelOptions, CheckboxLabelProps, CheckboxLabelRenderProps, CheckboxRootOptions, CheckboxRootProps, CheckboxControl as Control, CheckboxDescription as Description, CheckboxErrorMessage as ErrorMessage, CheckboxIndicator as Indicator, CheckboxInput as Input, CheckboxLabel as Label, CheckboxRoot as Root, useCheckboxContext };
}
declare const Checkbox: typeof CheckboxRoot & {
  Control: typeof CheckboxControl;
  Description: typeof CheckboxDescription;
  ErrorMessage: typeof CheckboxErrorMessage;
  Indicator: typeof CheckboxIndicator;
  Input: typeof CheckboxInput;
  Label: typeof CheckboxLabel;
};
//#endregion
export { CheckboxDescriptionRenderProps as A, CheckboxErrorMessageOptions as C, CheckboxDescriptionCommonProps as D, CheckboxDescription as E, CheckboxControlRenderProps as F, CheckboxContextValue as I, useCheckboxContext as L, CheckboxControlCommonProps as M, CheckboxControlOptions as N, CheckboxDescriptionOptions as O, CheckboxControlProps as P, CheckboxErrorMessageCommonProps as S, CheckboxErrorMessageRenderProps as T, CheckboxIndicatorCommonProps as _, CheckboxRootProps as a, CheckboxIndicatorRenderProps as b, CheckboxLabelOptions as c, CheckboxInput as d, CheckboxInputCommonProps as f, CheckboxIndicator as g, CheckboxInputRenderProps as h, CheckboxRootOptions as i, CheckboxControl as j, CheckboxDescriptionProps as k, CheckboxLabelProps as l, CheckboxInputProps as m, index_d_exports as n, CheckboxLabel as o, CheckboxInputOptions as p, CheckboxRoot as r, CheckboxLabelCommonProps as s, Checkbox as t, CheckboxLabelRenderProps as u, CheckboxIndicatorOptions as v, CheckboxErrorMessageProps as w, CheckboxErrorMessage as x, CheckboxIndicatorProps as y };