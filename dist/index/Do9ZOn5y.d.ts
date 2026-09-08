import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { JSX, ValidComponent } from "@solidjs/web";
import { ValidationState } from "@kobalte/utils";
//#region src/spin-button/spin-button.intl.d.ts
declare const SPIN_BUTTON_INTL_TRANSLATIONS: {
  empty: string;
};
type SpinButtonIntlTranslations = typeof SPIN_BUTTON_INTL_TRANSLATIONS;
//#endregion
//#region src/spin-button/spin-button-root.d.ts
interface SpinButtonRootOptions {
  /** The localized strings of the component. */
  translations?: SpinButtonIntlTranslations;
  /** The controlled value of the spin button. */
  value?: number | string;
  /** The string representation of the value. */
  textValue?: string;
  /** The smallest value allowed for the spin button. */
  minValue?: number;
  /** The largest value allowed for the spin button. */
  maxValue?: number;
  /** Whether the spin button should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the user must fill the spin button before the owning form can be submitted. */
  required?: boolean;
  /** Whether the spin button is disabled. */
  disabled?: boolean;
  /** Whether the spin button is read only. */
  readOnly?: boolean;
  /** Event handler called to increment the value of the spin button by one step. */
  onIncrement?: () => void;
  /** Event handler called to increment the value of the spin button by one page. */
  onIncrementPage?: () => void;
  /** Event handler called to decrement the value of the spin button by one step. */
  onDecrement?: () => void;
  /** Event handler called to decrement the value of the spin button by one page. */
  onDecrementPage?: () => void;
  /** Event handler called to decrement the value of the spin button to the `minValue`. */
  onDecrementToMin?: () => void;
  /** Event handler called to increment the value of the spin button to the `maxValue`. */
  onIncrementToMax?: () => void;
}
interface SpinButtonRootCommonProps<T extends HTMLElement = HTMLElement> {
  style?: JSX.CSSProperties | string | false;
  onKeyDown: JSX.EventHandlerUnion<T, KeyboardEvent>;
  onFocus: JSX.EventHandlerUnion<T, FocusEvent>;
  onBlur: JSX.EventHandlerUnion<T, FocusEvent>;
}
interface SpinButtonRootRenderProps extends SpinButtonRootCommonProps {
  role: "spinbutton";
  "aria-valuenow": number | string | undefined;
  "aria-valuetext": string | undefined;
  "aria-valuemin": number | undefined;
  "aria-valuemax": number | undefined;
  "aria-required": "true" | undefined;
  "aria-disabled": "true" | undefined;
  "aria-readonly": "true" | undefined;
  "aria-invalid": "true" | undefined;
}
type SpinButtonRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = SpinButtonRootOptions & Partial<SpinButtonRootCommonProps<ElementOf<T>>>;
declare function SpinButtonRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, SpinButtonRootProps<T>>): JSX.Element;
//#endregion
//#region src/spin-button/index.d.ts
declare const SpinButton: typeof SpinButtonRoot;
//#endregion
export { SpinButtonRootProps as a, SpinButtonRootOptions as i, SpinButtonRoot as n, SpinButtonRootRenderProps as o, SpinButtonRootCommonProps as r, SpinButtonIntlTranslations as s, SpinButton as t };