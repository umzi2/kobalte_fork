import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { a as FormControlLabelRenderProps, c as FormControlErrorMessageOptions, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, i as FormControlLabelProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, n as FormControlLabelCommonProps, p as FormControlDescriptionOptions, r as FormControlLabelOptions, s as FormControlErrorMessageCommonProps, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "../index/ZPox5oFC.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref, Setter } from "solid-js";
import { ValidationState } from "@kobalte/utils";
//#region src/otp-field/otp-field-description.d.ts
type OTPFieldDescriptionProps = FormControlDescriptionProps;
declare function OTPFieldDescription<T extends ValidComponent = "div">(props: PolymorphicProps<T, OTPFieldDescriptionProps>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/otp-field/otp-field-error-message.d.ts
type OTPFieldErrorMessageProps<T extends ValidComponent | HTMLElement = HTMLElement> = FormControlErrorMessageProps<ElementOf<T>>;
declare function OTPFieldErrorMessage<T extends ValidComponent = "div">(props: PolymorphicProps<T, OTPFieldErrorMessageProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/otp-field/otp-field-input.d.ts
interface OTPFieldInputOptions {
  /**
   * Regex pattern for allowed characters. `null` disables validation and allows all chars.
   * @defaultValue `'^\\d*$'`
   */
  pattern?: string | null;
  /**
   * CSS to inject via `<noscript>` for no-JS environments. `null` disables the fallback.
   * @defaultValue DEFAULT_NOSCRIPT_CSS_FALLBACK
   */
  noScriptCSSFallback?: string | null;
}
interface OTPFieldInputCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  onInput: JSX$1.EventHandlerUnion<T, InputEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onBlur: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onMouseOver: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onMouseLeave: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onKeyUp: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  style: JSX$1.CSSProperties | string;
}
interface OTPFieldInputRenderProps extends OTPFieldInputCommonProps<HTMLInputElement> {
  pattern: string | undefined;
  "data-kb-otp-field-input": "";
  inputMode: "numeric";
  autocomplete: string;
  spellcheck: false;
  disabled: boolean | undefined;
  readonly: boolean | undefined;
  "aria-required": "true" | undefined;
  "aria-disabled": "true" | undefined;
  "aria-readonly": "true" | undefined;
  "aria-invalid": "true" | undefined;
}
type OTPFieldInputProps<T extends ValidComponent | HTMLElement = HTMLElement> = OTPFieldInputOptions & Partial<OTPFieldInputCommonProps<ElementOf<T>>>;
declare function OTPFieldInput<T extends ValidComponent = "input">(props: PolymorphicProps<T, OTPFieldInputProps<T>>): JSX$1.Element;
//#endregion
//#region src/otp-field/otp-field-label.d.ts
type OTPFieldLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = FormControlLabelProps<T>;
declare function OTPFieldLabel<T extends ValidComponent = "label">(props: PolymorphicProps<T, OTPFieldLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/otp-field/otp-field-root.d.ts
interface OTPFieldRootOptions {
  /** The maximum number of characters in the OTP field. */
  maxLength: number;
  /** The controlled value of the OTP field. */
  value?: string;
  /** The default value when initially rendered. */
  defaultValue?: string;
  /** Event handler called when the value changes. */
  onChange?: (value: string) => void;
  /** Event handler called when the OTP field is completely filled. */
  onComplete?: (value: string) => void;
  /**
   * Whether to shift password manager icons to the right to avoid overlapping the slots.
   * @defaultValue true
   */
  shiftPWManagers?: boolean;
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components (Label, Description, ErrorMessage).
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
  /** The name of the OTP field, used when submitting an HTML form. */
  name?: string;
  /** Whether the OTP field should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the user must fill the OTP field before the owning form can be submitted. */
  required?: boolean;
  /** Whether the OTP field is disabled. */
  disabled?: boolean;
  /** Whether the OTP field is read only. */
  readOnly?: boolean;
}
interface OTPFieldRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  style: JSX$1.CSSProperties | string;
}
interface OTPFieldRootRenderProps extends OTPFieldRootCommonProps, FormControlDataSet {
  role: "group";
  id: string;
  "data-kb-otp-field-root": "";
}
type OTPFieldRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = OTPFieldRootOptions & Partial<OTPFieldRootCommonProps<ElementOf<T>>>;
declare function OTPFieldRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, OTPFieldRootProps<T>>): JSX$1.Element;
//#endregion
//#region src/otp-field/otp-field-context.d.ts
interface OTPFieldContextValue {
  value: Accessor<string>;
  isFocused: Accessor<boolean>;
  isHovered: Accessor<boolean>;
  isInserting: Accessor<boolean>;
  maxLength: Accessor<number>;
  activeSlots: Accessor<number[]>;
  shiftPWManagers: Accessor<boolean>;
  rootHeight: Accessor<number | null>;
  generateId: (part: string) => string;
  setValue: (value: string) => void;
  setIsFocused: Setter<boolean>;
  setIsHovered: Setter<boolean>;
  setIsInserting: Setter<boolean>;
  setActiveSlots: Setter<number[]>;
}
export declare function useOTPFieldContext(): OTPFieldContextValue;
//#endregion
//#region src/otp-field/index.d.ts
export declare const OTPField: typeof OTPFieldRoot & {
  Description: typeof OTPFieldDescription;
  ErrorMessage: typeof OTPFieldErrorMessage;
  Input: typeof OTPFieldInput;
  Label: typeof OTPFieldLabel;
};
//#endregion
export { OTPFieldDescription as Description, OTPFieldErrorMessage as ErrorMessage, OTPFieldInput as Input, OTPFieldLabel as Label, type OTPFieldContextValue, type FormControlDescriptionCommonProps as OTPFieldDescriptionCommonProps, type FormControlDescriptionOptions as OTPFieldDescriptionOptions, type OTPFieldDescriptionProps, type FormControlDescriptionRenderProps as OTPFieldDescriptionRenderProps, type FormControlErrorMessageCommonProps as OTPFieldErrorMessageCommonProps, type FormControlErrorMessageOptions as OTPFieldErrorMessageOptions, type OTPFieldErrorMessageProps, type FormControlErrorMessageRenderProps as OTPFieldErrorMessageRenderProps, type OTPFieldInputCommonProps, type OTPFieldInputOptions, type OTPFieldInputProps, type OTPFieldInputRenderProps, type FormControlLabelCommonProps as OTPFieldLabelCommonProps, type FormControlLabelOptions as OTPFieldLabelOptions, type OTPFieldLabelProps, type FormControlLabelRenderProps as OTPFieldLabelRenderProps, type OTPFieldRootCommonProps, type OTPFieldRootOptions, type OTPFieldRootProps, type OTPFieldRootRenderProps, OTPFieldRoot as Root };