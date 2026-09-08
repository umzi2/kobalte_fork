import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { a as ButtonRootOptions, s as ButtonRootRenderProps } from "./Bjp2qtUK.js";
import { JSX, ValidComponent } from "@solidjs/web";
import { Accessor } from "solid-js";
//#region src/toggle-button/toggle-button-root.d.ts
interface ToggleButtonRootState {
  /** Whether the toggle button is on (pressed) or off (not pressed). */
  pressed: Accessor<boolean>;
}
interface ToggleButtonRootOptions extends ButtonRootOptions {
  /** The controlled pressed state of the toggle button. */
  pressed?: boolean;
  /**
   * The default pressed state when initially rendered.
   * Useful when you do not need to control the pressed state.
   */
  defaultPressed?: boolean;
  /** Event handler called when the pressed state of the toggle button changes. */
  onChange?: (pressed: boolean) => void;
  /**
   * The children of the toggle button.
   * Can be a `JSX.Element` or a _render prop_ for having access to the internal state.
   */
  children?: JSX.Element | ((state: ToggleButtonRootState) => JSX.Element);
}
interface ToggleButtonRootCommonProps<T extends HTMLElement = HTMLElement> {
  onClick: JSX.EventHandlerUnion<T, MouseEvent>;
  disabled: boolean | undefined;
}
interface ToggleButtonRootRenderProps extends ToggleButtonRootCommonProps, ButtonRootRenderProps {
  children: JSX.Element;
  "aria-pressed": "true" | "false";
  "data-pressed": "" | undefined;
}
type ToggleButtonRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ToggleButtonRootOptions & Partial<ToggleButtonRootCommonProps<ElementOf<T>>>;
/**
 * A two-state button that allow users to toggle a selection on or off.
 * This component is based on the [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
 */
declare function ToggleButtonRoot<T extends ValidComponent = "button">(props: PolymorphicProps<T, ToggleButtonRootProps<T>>): JSX.Element;
declare namespace index_d_exports {
  export { ToggleButtonRoot as Root, ToggleButton, ToggleButtonRootCommonProps, ToggleButtonRootOptions, ToggleButtonRootProps, ToggleButtonRootRenderProps, ToggleButtonRootState };
}
declare const ToggleButton: typeof ToggleButtonRoot;
//#endregion
export { ToggleButtonRootOptions as a, ToggleButtonRootState as c, ToggleButtonRootCommonProps as i, index_d_exports as n, ToggleButtonRootProps as o, ToggleButtonRoot as r, ToggleButtonRootRenderProps as s, ToggleButton as t };