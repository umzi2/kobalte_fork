import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { s as CollectionItemWithRef } from "./C4-dpjA0.js";
import "./Dy4FWz3y.js";
import { a as FormControlLabelRenderProps, c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, i as FormControlLabelProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, n as FormControlLabelCommonProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, r as FormControlLabelOptions, s as FormControlErrorMessageCommonProps, t as FormControlLabel, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "./ZPox5oFC.js";
import { ComponentProps, JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
import { Orientation, ValidationState } from "@kobalte/utils";
//#region src/slider/create-slider-state.d.ts
interface SliderState {
  readonly values: Accessor<number[]>;
  getThumbValue(index: number): number;
  setThumbValue(index: number, value: number): void;
  getThumbPercent(index: number): number;
  setThumbPercent(index: number, percent: number): void;
  isThumbDragging(index: number): boolean;
  setThumbDragging(index: number, dragging: boolean): void;
  readonly focusedThumb: Accessor<number | undefined>;
  setFocusedThumb(index: number | undefined): void;
  getValuePercent(value: number): number;
  getThumbValueLabel(index: number): string;
  getFormattedValue(value: number): string;
  getThumbMinValue(index: number): number;
  getThumbMaxValue(index: number): number;
  getPercentValue(percent: number): number;
  isThumbEditable(index: number): boolean;
  setThumbEditable(index: number, editable: boolean): void;
  incrementThumb(index: number, stepSize?: number): void;
  decrementThumb(index: number, stepSize?: number): void;
  readonly step: Accessor<number>;
  readonly pageSize: Accessor<number>;
  readonly orientation: Accessor<"horizontal" | "vertical">;
  readonly isDisabled: Accessor<boolean>;
  setValues: (next: number[] | ((prev: number[]) => number[])) => void;
  resetValues: () => void;
}
//#endregion
//#region src/slider/slider-root.d.ts
interface GetValueLabelParams {
  values: number[];
  min: number;
  max: number;
}
interface SliderRootOptions {
  /** The slider values. */
  value?: number[];
  /** The value of the slider when initially rendered. */
  defaultValue?: number[];
  /** Called when the value changes. */
  onChange?: (value: number[]) => void;
  /** Called when the value changes at the end of an interaction. */
  onChangeEnd?: (value: number[]) => void;
  /**
   * Whether the slider is visually inverted.
   * @default false
   */
  inverted?: boolean;
  /**
   * The minimum slider value.
   * @default 0
   */
  minValue?: number;
  /**
   * The maximum slider value.
   * @default 100
   */
  maxValue?: number;
  /**
   * The step amount.
   * @default 1
   */
  step?: number;
  /**
   * The minimum permitted steps between multiple thumbs.
   * @default 0
   */
  minStepsBetweenThumbs?: number;
  /**
   * A function to get the accessible label text representing the current value in a human-readable format.
   * If not provided, the value label will be read as a percentage of the max value.
   */
  getValueLabel?: (params: GetValueLabelParams) => string;
  /**
   * The orientation of the slider.
   * @default horizontal
   */
  orientation?: "horizontal" | "vertical";
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
  /**
   * The name of the slider, used when submitting an HTML form.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
  /** Whether the slider should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the user must fill the slider before the owning form can be submitted. */
  required?: boolean;
  /** Whether the slider is disabled. */
  disabled?: boolean;
  /** Whether the slider is read only. */
  readOnly?: boolean;
}
interface SliderRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
}
interface SliderRootRenderProps extends SliderRootCommonProps, SliderDataSet {
  role: "group";
}
type SliderRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderRootOptions & Partial<SliderRootCommonProps<ElementOf<T>>>;
declare function SliderRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, SliderRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/slider/slider-context.d.ts
interface SliderDataSet extends FormControlDataSet {
  "data-orientation": "vertical" | "horizontal" | undefined;
}
type Side = "left" | "top" | "bottom" | "right";
interface SliderContextValue {
  dataset: Accessor<SliderDataSet>;
  state: SliderState;
  thumbs: Accessor<CollectionItemWithRef[]>;
  onSlideStart: ((index: number, value: number) => void) | undefined;
  onSlideMove: ((deltas: {
    deltaX: number;
    deltaY: number;
  }) => void) | undefined;
  onSlideEnd: (() => void) | undefined;
  onStepKeyDown: (event: KeyboardEvent, index: number) => void;
  isSlidingFromLeft: () => boolean;
  isSlidingFromBottom: () => boolean;
  trackRef: Accessor<HTMLElement | undefined>;
  startEdge: Accessor<Side>;
  endEdge: Accessor<Side>;
  minValue: Accessor<number>;
  maxValue: Accessor<number>;
  inverted: Accessor<boolean>;
  registerTrack: (ref: HTMLElement) => void;
  generateId: (part: string) => string;
  getValueLabel: ((params: GetValueLabelParams) => string) | undefined;
}
declare function useSliderContext(): SliderContextValue;
//#endregion
//#region src/slider/slider-fill.d.ts
interface SliderFillOptions {}
interface SliderFillCommonProps<_T extends HTMLElement = HTMLElement> {
  style?: JSX$1.CSSProperties | string;
}
interface SliderFillRenderProps extends SliderFillCommonProps, SliderDataSet {}
type SliderFillProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderFillOptions & Partial<SliderFillCommonProps<ElementOf<T>>>;
/**
 * The component that visually represents the slider value.
 * Used to visually show the fill of `Slider.Track`.
 */
declare function SliderFill<T extends ValidComponent = "div">(props: PolymorphicProps<T, SliderFillProps<T>>): JSX$1.Element;
//#endregion
//#region src/slider/slider-input.d.ts
interface SliderInputProps extends ComponentProps<"input"> {
  style?: JSX$1.CSSProperties | string;
}
/**
 * The native html input that is visually hidden in the slider thumb.
 */
declare function SliderInput(props: SliderInputProps): JSX$1.Element;
//#endregion
//#region src/slider/slider-thumb.d.ts
interface SliderThumbOptions {}
interface SliderThumbCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  style?: JSX$1.CSSProperties | string;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerMove: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerUp: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onBlur: JSX$1.EventHandlerUnion<T, FocusEvent>;
  "aria-label": string | undefined;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
}
interface SliderThumbRenderProps extends SliderThumbCommonProps, SliderDataSet {
  role: "slider";
  tabindex: 0 | undefined;
  "aria-valuetext": string;
  "aria-valuemin": number;
  "aria-valuenow": number | undefined;
  "aria-valuemax": number;
  "aria-orientation": Orientation;
}
type SliderThumbProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderThumbOptions & Partial<SliderThumbCommonProps<ElementOf<T>>>;
declare function SliderThumb<T extends ValidComponent = "span">(props: PolymorphicProps<T, SliderThumbProps<T>>): JSX$1.Element;
//#endregion
//#region src/slider/slider-track.d.ts
interface SliderTrackOptions {}
interface SliderTrackCommonProps<T extends HTMLElement = HTMLElement> {
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerMove: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerUp: JSX$1.EventHandlerUnion<T, PointerEvent>;
}
interface SliderTrackRenderProps extends SliderTrackCommonProps, SliderDataSet {}
type SliderTrackProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderTrackOptions & Partial<SliderTrackCommonProps<ElementOf<T>>>;
/**
 * The component that visually represents the slider track.
 * Act as a container for `Slider.Fill`.
 */
declare function SliderTrack<T extends ValidComponent = "div">(props: PolymorphicProps<T, SliderTrackProps<T>>): JSX$1.Element;
//#endregion
//#region src/slider/slider-value-label.d.ts
interface SliderValueLabelOptions {}
interface SliderValueLabelCommonProps<_T extends HTMLElement = HTMLElement> {}
interface SliderValueLabelRenderProps extends SliderValueLabelCommonProps, SliderDataSet {
  children: JSX$1.Element;
}
type SliderValueLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = SliderValueLabelOptions & Partial<SliderValueLabelCommonProps<ElementOf<T>>>;
/**
 * The accessible label text representing the current value in a human-readable format.
 */
declare function SliderValueLabel<T extends ValidComponent = "div">(props: PolymorphicProps<T, SliderValueLabelProps<T>>): JSX$1.Element;
declare namespace index_d_exports {
  export { FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, SliderFill as Fill, SliderInput as Input, FormControlLabel as Label, SliderRoot as Root, Slider, SliderContextValue, FormControlDescriptionCommonProps as SliderDescriptionCommonProps, FormControlDescriptionOptions as SliderDescriptionOptions, FormControlDescriptionProps as SliderDescriptionProps, FormControlDescriptionRenderProps as SliderDescriptionRenderProps, FormControlErrorMessageCommonProps as SliderErrorMessageCommonProps, FormControlErrorMessageOptions as SliderErrorMessageOptions, FormControlErrorMessageProps as SliderErrorMessageProps, FormControlErrorMessageRenderProps as SliderErrorMessageRenderProps, SliderFillCommonProps, SliderFillOptions, SliderFillProps, SliderFillRenderProps, GetValueLabelParams as SliderGetValueLabelParams, SliderInputProps, FormControlLabelCommonProps as SliderLabelCommonProps, FormControlLabelOptions as SliderLabelOptions, FormControlLabelProps as SliderLabelProps, FormControlLabelRenderProps as SliderLabelRenderProps, SliderRootCommonProps, SliderRootOptions, SliderRootProps, SliderRootRenderProps, SliderThumbCommonProps, SliderThumbOptions, SliderThumbProps, SliderThumbRenderProps, SliderTrackCommonProps, SliderTrackOptions, SliderTrackProps, SliderTrackRenderProps, SliderValueLabelCommonProps, SliderValueLabelOptions, SliderValueLabelProps, SliderValueLabelRenderProps, SliderThumb as Thumb, SliderTrack as Track, SliderValueLabel as ValueLabel, useSliderContext };
}
declare const Slider: typeof SliderRoot & {
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  Fill: typeof SliderFill;
  Input: typeof SliderInput;
  Label: typeof FormControlLabel;
  Thumb: typeof SliderThumb;
  Track: typeof SliderTrack;
  ValueLabel: typeof SliderValueLabel;
};
//#endregion
export { SliderRootOptions as A, SliderFillProps as C, GetValueLabelParams as D, useSliderContext as E, SliderRootRenderProps as M, SliderRoot as O, SliderFillOptions as S, SliderContextValue as T, SliderThumbRenderProps as _, SliderValueLabelOptions as a, SliderFill as b, SliderTrack as c, SliderTrackProps as d, SliderTrackRenderProps as f, SliderThumbProps as g, SliderThumbOptions as h, SliderValueLabelCommonProps as i, SliderRootProps as j, SliderRootCommonProps as k, SliderTrackCommonProps as l, SliderThumbCommonProps as m, index_d_exports as n, SliderValueLabelProps as o, SliderThumb as p, SliderValueLabel as r, SliderValueLabelRenderProps as s, Slider as t, SliderTrackOptions as u, SliderInput as v, SliderFillRenderProps as w, SliderFillCommonProps as x, SliderInputProps as y };