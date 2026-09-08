import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { a as FormControlLabelRenderProps, c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, i as FormControlLabelProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, n as FormControlLabelCommonProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, r as FormControlLabelOptions, s as FormControlErrorMessageCommonProps, t as FormControlLabel, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "../index/ZPox5oFC.js";
import { ComponentProps, JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
import { ValidationState } from "@kobalte/utils";
import { Color, ColorIntlTranslations } from "@solid-primitives/utils/colors";
//#region src/color-wheel/color-wheel-input.d.ts
interface ColorWheelInputProps extends ComponentProps<"input"> {
  style?: JSX$1.CSSProperties | string;
}
declare function ColorWheelInput(props: ColorWheelInputProps): JSX$1.Element;
//#endregion
//#region src/color-wheel/color-wheel-root.d.ts
interface ColorWheelRootOptions {
  /** The localized strings of the component. */
  translations?: ColorIntlTranslations;
  /** The controlled value of the color wheel. */
  value?: Color;
  /** The value of the color wheel when initially rendered. */
  defaultValue?: Color;
  /** The thickness of the track. */
  thickness?: number;
  /** Event handler called when the value changes. */
  onChange?: (value: Color) => void;
  /** Called when the value changes at the end of an interaction. */
  onChangeEnd?: (value: Color) => void;
  /**
   * A function to get the accessible label text representing the current value in a human-readable format.
   */
  getValueLabel?: (param: Color) => string;
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
  /**
   * The name of the color wheel, used when submitting an HTML form.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
  /** Whether the color wheel should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the user must select an item before the owning form can be submitted. */
  required?: boolean;
  /** Whether the color wheel is disabled. */
  disabled?: boolean;
  /** Whether the color wheel is read only. */
  readOnly?: boolean;
}
interface ColorWheelRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
}
interface ColorWheelRootRenderProps extends ColorWheelRootCommonProps, FormControlDataSet {
  role: "group";
}
type ColorWheelRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ColorWheelRootOptions & Partial<ColorWheelRootCommonProps<ElementOf<T>>>;
declare function ColorWheelRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, ColorWheelRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/color-wheel/color-wheel-thumb.d.ts
interface ColorWheelThumbOptions {}
interface ColorWheelThumbCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  style: JSX$1.CSSProperties | string;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerMove: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerUp: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  "aria-label": string | undefined;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
}
interface ColorWheelThumbRenderProps extends ColorWheelThumbCommonProps {
  role: "slider";
  tabindex: 0 | undefined;
  "aria-valuetext": string;
  "aria-valuemin": number;
  "aria-valuenow": number | undefined;
  "aria-valuemax": number;
}
type ColorWheelThumbProps<T extends ValidComponent | HTMLElement = HTMLElement> = ColorWheelThumbOptions & Partial<ColorWheelThumbCommonProps<ElementOf<T>>>;
declare function ColorWheelThumb<T extends ValidComponent = "span">(props: PolymorphicProps<T, ColorWheelThumbProps<T>>): JSX$1.Element;
//#endregion
//#region src/color-wheel/color-wheel-track.d.ts
interface ColorWheelTrackOptions {}
interface ColorWheelTrackCommonProps<T extends HTMLElement = HTMLElement> {
  style?: JSX$1.CSSProperties | string;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerMove: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerUp: JSX$1.EventHandlerUnion<T, PointerEvent>;
}
interface ColorWheelTrackRenderProps extends ColorWheelTrackCommonProps, FormControlDataSet {}
type ColorWheelTrackProps<T extends ValidComponent | HTMLElement = HTMLElement> = ColorWheelTrackOptions & Partial<ColorWheelTrackCommonProps<ElementOf<T>>>;
declare function ColorWheelTrack<T extends ValidComponent = "div">(props: PolymorphicProps<T, ColorWheelTrackProps<T>>): JSX$1.Element;
//#endregion
//#region src/color-wheel/color-wheel-value-label.d.ts
interface ColorWheelValueLabelOptions {}
interface ColorWheelValueLabelCommonProps<_T extends HTMLElement = HTMLElement> {}
interface ColorWheelValueLabelRenderProps extends ColorWheelValueLabelCommonProps, FormControlDataSet {
  children: JSX$1.Element;
}
type ColorWheelValueLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = ColorWheelValueLabelOptions & Partial<ColorWheelValueLabelCommonProps<ElementOf<T>>>;
declare function ColorWheelValueLabel<T extends ValidComponent = "div">(props: PolymorphicProps<T, ColorWheelValueLabelProps<T>>): JSX$1.Element;
//#endregion
//#region src/color-wheel/create-color-wheel-state.d.ts
interface ColorWheelState {
  readonly value: Accessor<Color>;
  setValue: (value: Color) => void;
  readonly hue: Accessor<number>;
  setHue: (value: number) => void;
  step: Accessor<number>;
  pageSize: Accessor<number>;
  maxValue: Accessor<number>;
  minValue: Accessor<number>;
  increment: (stepSize: number) => void;
  decrement: (stepSize: number) => void;
  getThumbPosition: () => {
    x: number;
    y: number;
  };
  setThumbValue: (x: number, y: number, radius: number) => void;
  readonly isDragging: Accessor<boolean>;
  setIsDragging: (value: boolean) => void;
  resetValue: () => void;
  readonly isDisabled: Accessor<boolean>;
}
//#endregion
//#region src/color-wheel/color-wheel-context.d.ts
interface ColorWheelContextValue {
  state: ColorWheelState;
  outerRadius: Accessor<number | undefined>;
  thickness: Accessor<number>;
  onDragStart: ((value: number[]) => void) | undefined;
  onDrag: ((deltas: {
    deltaX: number;
    deltaY: number;
  }) => void) | undefined;
  onDragEnd: (() => void) | undefined;
  getThumbValueLabel: () => string;
  getValueLabel: (param: Color) => string;
  onStepKeyDown: (event: KeyboardEvent) => void;
  thumbRef: Accessor<HTMLElement | undefined>;
  setThumbRef: (el: HTMLElement) => void;
  trackRef: Accessor<HTMLElement | undefined>;
  setTrackRef: (el: HTMLElement) => void;
  generateId: (part: string) => string;
}
export declare function useColorWheelContext(): ColorWheelContextValue;
//#endregion
//#region src/color-wheel/index.d.ts
export declare const ColorWheel: typeof ColorWheelRoot & {
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  Input: typeof ColorWheelInput;
  Label: typeof FormControlLabel;
  Thumb: typeof ColorWheelThumb;
  Track: typeof ColorWheelTrack;
  ValueLabel: typeof ColorWheelValueLabel;
};
//#endregion
export { type ColorWheelContextValue, type FormControlDescriptionCommonProps as ColorWheelDescriptionCommonProps, type FormControlDescriptionOptions as ColorWheelDescriptionOptions, type FormControlDescriptionProps as ColorWheelDescriptionProps, type FormControlDescriptionRenderProps as ColorWheelDescriptionRenderProps, type FormControlErrorMessageCommonProps as ColorWheelErrorMessageCommonProps, type FormControlErrorMessageOptions as ColorWheelErrorMessageOptions, type FormControlErrorMessageProps as ColorWheelErrorMessageProps, type FormControlErrorMessageRenderProps as ColorWheelErrorMessageRenderProps, type ColorWheelInputProps, type FormControlLabelCommonProps as ColorWheelLabelCommonProps, type FormControlLabelOptions as ColorWheelLabelOptions, type FormControlLabelProps as ColorWheelLabelProps, type FormControlLabelRenderProps as ColorWheelLabelRenderProps, type ColorWheelRootCommonProps, type ColorWheelRootOptions, type ColorWheelRootProps, type ColorWheelRootRenderProps, type ColorWheelThumbCommonProps, type ColorWheelThumbOptions, type ColorWheelThumbProps, type ColorWheelThumbRenderProps, type ColorWheelTrackCommonProps, type ColorWheelTrackOptions, type ColorWheelTrackProps, type ColorWheelTrackRenderProps, type ColorWheelValueLabelCommonProps, type ColorWheelValueLabelOptions, type ColorWheelValueLabelProps, type ColorWheelValueLabelRenderProps, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, ColorWheelInput as Input, FormControlLabel as Label, ColorWheelRoot as Root, ColorWheelThumb as Thumb, ColorWheelTrack as Track, ColorWheelValueLabel as ValueLabel };