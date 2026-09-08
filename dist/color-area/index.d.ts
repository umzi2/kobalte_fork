import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { a as FormControlLabelRenderProps, c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, i as FormControlLabelProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, n as FormControlLabelCommonProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, r as FormControlLabelOptions, s as FormControlErrorMessageCommonProps, t as FormControlLabel, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "../index/ZPox5oFC.js";
import { ComponentProps, JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
import { ValidationState } from "@kobalte/utils";
import { Color, ColorChannel, ColorSpace } from "@solid-primitives/utils/colors";
//#region src/color-area/color-area-background.d.ts
interface ColorAreaBackgroundOptions {}
interface ColorAreaBackgroundCommonProps<T extends HTMLElement = HTMLElement> {
  style?: JSX$1.CSSProperties | string;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerMove: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerUp: JSX$1.EventHandlerUnion<T, PointerEvent>;
}
interface ColorAreaBackgroundRenderProps extends ColorAreaBackgroundCommonProps, FormControlDataSet {}
type ColorAreaBackgroundProps<T extends ValidComponent | HTMLElement = HTMLElement> = ColorAreaBackgroundOptions & Partial<ColorAreaBackgroundCommonProps<ElementOf<T>>>;
declare function ColorAreaBackground<T extends ValidComponent = "div">(props: PolymorphicProps<T, ColorAreaBackgroundProps<T>>): JSX$1.Element;
//#endregion
//#region src/color-area/color-area-hidden-input-base.d.ts
interface ColorAreaHiddenInputBaseProps extends ComponentProps<"input"> {
  style?: JSX$1.CSSProperties | string;
  /**
   * The orientation of the hidden input.
   * @default horizontal
   */
  orientation?: "horizontal" | "vertical";
}
//#endregion
//#region src/color-area/color-area-hidden-input-x.d.ts
type ColorAreaHiddenInputXProps = ColorAreaHiddenInputBaseProps;
declare function ColorAreaHiddenInputX(props: ColorAreaHiddenInputXProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/color-area/color-area-hidden-input-y.d.ts
type ColorAreaHiddenInputYProps = ColorAreaHiddenInputBaseProps;
declare function ColorAreaHiddenInputY(props: ColorAreaHiddenInputYProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/color-area/color-area.intl.d.ts
declare const COLOR_AREA_INTL_TRANSLATIONS: {
  colorPicker: string;
  twoDimensionalSlider: string;
};
type ColorAreaIntlTranslations = typeof COLOR_AREA_INTL_TRANSLATIONS;
//#endregion
//#region src/color-area/color-area-root.d.ts
interface ColorAreaRootOptions {
  /** The localized strings of the component. */
  translations?: ColorAreaIntlTranslations;
  /** The controlled value of the color area. */
  value?: Color;
  /** The value of the color area when initially rendered. */
  defaultValue?: Color;
  /** Event handler called when the value changes. */
  onChange?: (value: Color) => void;
  /** Called when the value changes at the end of an interaction. */
  onChangeEnd?: (value: Color) => void;
  /** Color channel for the horizontal axis. */
  xChannel?: ColorChannel;
  /** Color channel for the vertical axis. */
  yChannel?: ColorChannel;
  /**
   * The color space that the color area operates in. The `xChannel` and `yChannel` must be in this color space.
   */
  colorSpace?: ColorSpace;
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
  /**
   * The name of the color area, used when submitting an HTML form.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
  /**
   * The name of the x channel input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  xName?: string;
  /**
   * The name of the y channel input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  yName?: string;
  /** Whether the color area should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the user must select an item before the owning form can be submitted. */
  required?: boolean;
  /** Whether the color area is disabled. */
  disabled?: boolean;
  /** Whether the color area is read only. */
  readOnly?: boolean;
}
interface ColorAreaRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
}
interface ColorAreaRootRenderProps extends ColorAreaRootCommonProps, FormControlDataSet {
  role: "group";
}
type ColorAreaRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ColorAreaRootOptions & Partial<ColorAreaRootCommonProps<ElementOf<T>>>;
declare function ColorAreaRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, ColorAreaRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/color-area/color-area-thumb.d.ts
interface ColorAreaThumbOptions {}
interface ColorAreaThumbCommonProps<T extends HTMLElement = HTMLElement> {
  style?: JSX$1.CSSProperties | string;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerMove: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerUp: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  "aria-label"?: string;
}
interface ColorAreaThumbRenderProps extends ColorAreaThumbCommonProps {
  role: "presentation";
}
type ColorAreaThumbProps<T extends ValidComponent | HTMLElement = HTMLElement> = ColorAreaThumbOptions & Partial<ColorAreaThumbCommonProps<ElementOf<T>>>;
declare function ColorAreaThumb<T extends ValidComponent = "span">(props: PolymorphicProps<T, ColorAreaThumbProps<T>>): JSX$1.Element;
//#endregion
//#region src/color-area/create-color-area-state.d.ts
interface ColorAreaState {
  readonly value: Accessor<Color>;
  setValue: (value: Color) => void;
  xValue: Accessor<number>;
  yValue: Accessor<number>;
  setXValue: (value: number) => void;
  setYValue: (value: number) => void;
  xStep: Accessor<number>;
  yStep: Accessor<number>;
  xPageSize: Accessor<number>;
  yPageSize: Accessor<number>;
  xMaxValue: Accessor<number>;
  yMaxValue: Accessor<number>;
  xMinValue: Accessor<number>;
  yMinValue: Accessor<number>;
  incrementX: (stepSize: number) => void;
  incrementY: (stepSize: number) => void;
  decrementX: (stepSize: number) => void;
  decrementY: (stepSize: number) => void;
  getThumbPosition: () => {
    x: number;
    y: number;
  };
  readonly isDragging: Accessor<boolean>;
  setIsDragging: (value: boolean) => void;
  channels: Accessor<{
    xChannel: ColorChannel;
    yChannel: ColorChannel;
    zChannel: ColorChannel;
  }>;
  resetValue: () => void;
  getThumbPercent: () => {
    x: number;
    y: number;
  };
  setThumbPercent: (value: {
    x: number;
    y: number;
  }) => void;
  setThumbValue: (value: {
    x: number;
    y: number;
  }) => void;
  readonly isDisabled: Accessor<boolean>;
}
//#endregion
//#region src/color-area/color-area-context.d.ts
interface ColorAreaContextValue {
  state: ColorAreaState;
  xName: Accessor<string | undefined>;
  yName: Accessor<string | undefined>;
  onDragStart: ((value: number[]) => void) | undefined;
  onDrag: ((deltas: {
    deltaX: number;
    deltaY: number;
  }) => void) | undefined;
  onDragEnd: (() => void) | undefined;
  translations: Accessor<ColorAreaIntlTranslations>;
  getDisplayColor: () => Color;
  onStepKeyDown: (event: KeyboardEvent) => void;
  thumbRef: Accessor<HTMLElement | undefined>;
  setThumbRef: (el: HTMLElement) => void;
  backgroundRef: Accessor<HTMLElement | undefined>;
  setBackgroundRef: (el: HTMLElement) => void;
  generateId: (part: string) => string;
}
export declare function useColorAreaContext(): ColorAreaContextValue;
//#endregion
//#region src/color-area/index.d.ts
export declare const ColorArea: typeof ColorAreaRoot & {
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  Label: typeof FormControlLabel;
  Background: typeof ColorAreaBackground;
  Thumb: typeof ColorAreaThumb;
  HiddenInputX: typeof ColorAreaHiddenInputX;
  HiddenInputY: typeof ColorAreaHiddenInputY;
};
//#endregion
export { ColorAreaBackground as Background, type ColorAreaBackgroundCommonProps, type ColorAreaBackgroundOptions, type ColorAreaBackgroundProps, type ColorAreaBackgroundRenderProps, type ColorAreaContextValue, type FormControlDescriptionCommonProps as ColorAreaDescriptionCommonProps, type FormControlDescriptionOptions as ColorAreaDescriptionOptions, type FormControlDescriptionProps as ColorAreaDescriptionProps, type FormControlDescriptionRenderProps as ColorAreaDescriptionRenderProps, type FormControlErrorMessageCommonProps as ColorAreaErrorMessageCommonProps, type FormControlErrorMessageOptions as ColorAreaErrorMessageOptions, type FormControlErrorMessageProps as ColorAreaErrorMessageProps, type FormControlErrorMessageRenderProps as ColorAreaErrorMessageRenderProps, type ColorAreaHiddenInputXProps, type ColorAreaHiddenInputYProps, type FormControlLabelCommonProps as ColorAreaLabelCommonProps, type FormControlLabelOptions as ColorAreaLabelOptions, type FormControlLabelProps as ColorAreaLabelProps, type FormControlLabelRenderProps as ColorAreaLabelRenderProps, type ColorAreaRootCommonProps, type ColorAreaRootOptions, type ColorAreaRootProps, type ColorAreaRootRenderProps, type ColorAreaThumbCommonProps, type ColorAreaThumbOptions, type ColorAreaThumbProps, type ColorAreaThumbRenderProps, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, ColorAreaHiddenInputX as HiddenInputX, ColorAreaHiddenInputY as HiddenInputY, FormControlLabel as Label, ColorAreaRoot as Root, ColorAreaThumb as Thumb };