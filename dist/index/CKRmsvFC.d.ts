import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { a as FormControlLabelRenderProps, c as FormControlErrorMessageOptions, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, n as FormControlLabelCommonProps, p as FormControlDescriptionOptions, r as FormControlLabelOptions, s as FormControlErrorMessageCommonProps, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "./ZPox5oFC.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
import { ValidationState } from "@kobalte/utils";
//#region src/switch/switch-context.d.ts
interface SwitchDataSet {
  "data-checked": string | undefined;
}
interface SwitchContextValue {
  value: Accessor<string>;
  dataset: Accessor<SwitchDataSet>;
  checked: Accessor<boolean>;
  inputRef: Accessor<HTMLInputElement | undefined>;
  generateId: (part: string) => string;
  toggle: () => void;
  setIsChecked: (isChecked: boolean) => void;
  setIsFocused: (isFocused: boolean) => void;
  setInputRef: (el: HTMLInputElement) => void;
}
declare function useSwitchContext(): SwitchContextValue;
//#endregion
//#region src/switch/switch-control.d.ts
interface SwitchControlOptions {}
interface SwitchControlCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
}
interface SwitchControlRenderProps extends SwitchControlCommonProps, FormControlDataSet, SwitchDataSet {}
type SwitchControlProps<T extends ValidComponent | HTMLElement = HTMLElement> = SwitchControlOptions & Partial<SwitchControlCommonProps<ElementOf<T>>>;
/**
 * The element that visually represents a switch.
 */
declare function SwitchControl<T extends ValidComponent = "div">(props: PolymorphicProps<T, SwitchControlProps<T>>): JSX$1.Element;
//#endregion
//#region src/switch/switch-description.d.ts
interface SwitchDescriptionOptions extends FormControlDescriptionOptions {}
interface SwitchDescriptionCommonProps extends FormControlDescriptionCommonProps {}
interface SwitchDescriptionRenderProps extends SwitchDescriptionCommonProps, FormControlDescriptionRenderProps, SwitchDataSet {}
type SwitchDescriptionProps<_T extends ValidComponent | HTMLElement = HTMLElement> = SwitchDescriptionOptions & Partial<SwitchDescriptionCommonProps>;
/**
 * The description that gives the user more information on the switch.
 */
declare function SwitchDescription<T extends ValidComponent = "div">(props: PolymorphicProps<T, SwitchDescriptionProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/switch/switch-error-message.d.ts
interface SwitchErrorMessageOptions extends FormControlErrorMessageOptions {}
interface SwitchErrorMessageCommonProps<T extends HTMLElement = HTMLElement> extends FormControlErrorMessageCommonProps<T> {}
interface SwitchErrorMessageRenderProps extends SwitchErrorMessageCommonProps, FormControlErrorMessageRenderProps, SwitchDataSet {}
type SwitchErrorMessageProps<T extends ValidComponent | HTMLElement = HTMLElement> = SwitchErrorMessageOptions & Partial<SwitchErrorMessageCommonProps<ElementOf<T>>>;
/**
 * The error message that gives the user information about how to fix a validation error on the switch.
 */
declare function SwitchErrorMessage<T extends ValidComponent = "div">(props: PolymorphicProps<T, SwitchErrorMessageProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/switch/switch-input.d.ts
interface SwitchInputOptions {}
interface SwitchInputCommonProps<T extends HTMLElement = HTMLInputElement> {
  id: string;
  ref: Ref<T>;
  style?: JSX$1.CSSProperties | string;
  onChange: JSX$1.EventHandlerUnion<T, Event>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onBlur: JSX$1.EventHandlerUnion<T, FocusEvent>;
  "aria-label": string | undefined;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
}
interface SwitchInputRenderProps extends SwitchInputCommonProps, FormControlDataSet, SwitchDataSet {
  type: "checkbox";
  role: "switch";
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
type SwitchInputProps<T extends ValidComponent | HTMLElement = HTMLInputElement> = SwitchInputOptions & Partial<SwitchInputCommonProps<ElementOf<T>>>;
/**
 * The native html input that is visually hidden in the switch.
 */
declare function SwitchInput<T extends ValidComponent = "input">(props: PolymorphicProps<T, SwitchInputProps<T>>): JSX$1.Element;
//#endregion
//#region src/switch/switch-label.d.ts
interface SwitchLabelOptions extends FormControlLabelOptions {}
interface SwitchLabelCommonProps<T extends HTMLElement = HTMLElement> extends FormControlLabelCommonProps<T> {}
interface SwitchLabelRenderProps extends SwitchDescriptionCommonProps, FormControlLabelRenderProps, SwitchDataSet {}
type SwitchLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = SwitchLabelOptions & Partial<SwitchLabelCommonProps<ElementOf<T>>>;
/**
 * The label that gives the user information on the switch.
 */
declare function SwitchLabel<T extends ValidComponent = "label">(props: PolymorphicProps<T, SwitchLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/switch/switch-root.d.ts
interface SwitchRootState {
  /** Whether the switch is checked or not. */
  checked: Accessor<boolean>;
}
interface SwitchRootOptions {
  /** The controlled checked state of the switch. */
  checked?: boolean;
  /**
   * The default checked state when initially rendered.
   * Useful when you do not need to control the checked state.
   */
  defaultChecked?: boolean;
  /** Event handler called when the checked state of the switch changes. */
  onChange?: (isChecked: boolean) => void;
  /**
   * The value of the switch, used when submitting an HTML form.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue).
   */
  value?: string;
  /**
   * The name of the switch, used when submitting an HTML form.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
  /** Whether the switch should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the user must check the switch before the owning form can be submitted. */
  required?: boolean;
  /** Whether the switch is disabled. */
  disabled?: boolean;
  /** Whether the switch is read only. */
  readOnly?: boolean;
  /**
   * The children of the switch.
   * Can be a `JSX.Element` or a _render prop_ for having access to the internal state.
   */
  children?: JSX$1.Element | ((state: SwitchRootState) => JSX$1.Element);
}
interface SwitchRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
}
interface SwitchRootRenderProps extends SwitchRootCommonProps, SwitchDataSet, FormControlDataSet {
  role: "group";
  children: JSX$1.Element;
}
type SwitchRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = SwitchRootOptions & Partial<SwitchRootCommonProps<ElementOf<T>>>;
/**
 * A control that allows users to choose one of two values: on or off.
 */
declare function SwitchRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, SwitchRootProps<T>>): JSX$1.Element;
//#endregion
//#region src/switch/switch-thumb.d.ts
interface SwitchThumbOptions {}
interface SwitchThumbCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface SwitchThumbRenderProps extends SwitchThumbCommonProps, FormControlDataSet, SwitchDataSet {}
type SwitchThumbProps<T extends ValidComponent | HTMLElement = HTMLElement> = SwitchThumbOptions & Partial<SwitchThumbCommonProps<ElementOf<T>>>;
/**
 * The thumb that is used to visually indicate whether the switch is on or off.
 */
declare function SwitchThumb<T extends ValidComponent = "div">(props: PolymorphicProps<T, SwitchThumbProps<T>>): import("@solidjs/web").JSX.Element;
declare namespace index_d_exports {
  export { SwitchControl as Control, SwitchDescription as Description, SwitchErrorMessage as ErrorMessage, SwitchInput as Input, SwitchLabel as Label, SwitchRoot as Root, Switch$1 as Switch, SwitchContextValue, SwitchControlCommonProps, SwitchControlOptions, SwitchControlProps, SwitchControlRenderProps, SwitchDescriptionCommonProps, SwitchDescriptionOptions, SwitchDescriptionProps, SwitchDescriptionRenderProps, SwitchErrorMessageCommonProps, SwitchErrorMessageOptions, SwitchErrorMessageProps, SwitchErrorMessageRenderProps, SwitchInputCommonProps, SwitchInputOptions, SwitchInputProps, SwitchInputRenderProps, SwitchLabelCommonProps, SwitchLabelOptions, SwitchLabelProps, SwitchLabelRenderProps, SwitchRootCommonProps, SwitchRootOptions, SwitchRootProps, SwitchRootRenderProps, SwitchThumbCommonProps, SwitchThumbOptions, SwitchThumbProps, SwitchThumbRenderProps, SwitchThumb as Thumb, useSwitchContext };
}
declare const Switch$1: typeof SwitchRoot & {
  Control: typeof SwitchControl;
  Description: typeof SwitchDescription;
  ErrorMessage: typeof SwitchErrorMessage;
  Input: typeof SwitchInput;
  Label: typeof SwitchLabel;
  Thumb: typeof SwitchThumb;
};
//#endregion
export { SwitchDescriptionOptions as A, SwitchErrorMessage as C, SwitchErrorMessageRenderProps as D, SwitchErrorMessageProps as E, SwitchControlOptions as F, SwitchControlProps as I, SwitchControlRenderProps as L, SwitchDescriptionRenderProps as M, SwitchControl as N, SwitchDescription as O, SwitchControlCommonProps as P, SwitchContextValue as R, SwitchInputRenderProps as S, SwitchErrorMessageOptions as T, SwitchLabelRenderProps as _, SwitchThumbOptions as a, SwitchInputOptions as b, SwitchRoot as c, SwitchRootProps as d, SwitchRootRenderProps as f, SwitchLabelProps as g, SwitchLabelOptions as h, SwitchThumbCommonProps as i, SwitchDescriptionProps as j, SwitchDescriptionCommonProps as k, SwitchRootCommonProps as l, SwitchLabelCommonProps as m, index_d_exports as n, SwitchThumbProps as o, SwitchLabel as p, SwitchThumb as r, SwitchThumbRenderProps as s, Switch$1 as t, SwitchRootOptions as u, SwitchInput as v, SwitchErrorMessageCommonProps as w, SwitchInputProps as x, SwitchInputCommonProps as y, useSwitchContext as z };