import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { a as FormControlLabelRenderProps, c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, i as FormControlLabelProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, n as FormControlLabelCommonProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, r as FormControlLabelOptions, s as FormControlErrorMessageCommonProps, t as FormControlLabel, u as FormControlErrorMessageRenderProps } from "../index/ZPox5oFC.js";
import { M as SliderRootRenderProps, _ as SliderThumbRenderProps, a as SliderValueLabelOptions, f as SliderTrackRenderProps, h as SliderThumbOptions, i as SliderValueLabelCommonProps, o as SliderValueLabelProps, r as SliderValueLabel, s as SliderValueLabelRenderProps, u as SliderTrackOptions, v as SliderInput, y as SliderInputProps } from "../index/CaV65YS7.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor } from "solid-js";
import { ValidationState } from "@kobalte/utils";
import { Color, ColorChannel, ColorIntlTranslations, ColorSpace } from "@solid-primitives/utils/colors";
//#region src/color-slider/color-slider-root.d.ts
interface ColorSliderRootOptions {
  /** The controlled values of the slider. */
  value?: Color;
  /** The value of the slider when initially rendered. */
  defaultValue?: Color;
  /** Called when the value changes. */
  onChange?: (value: Color) => void;
  /** Called when the value changes at the end of an interaction. */
  onChangeEnd?: (value: Color) => void;
  /** The color channel that the slider manipulates. */
  channel: ColorChannel;
  /** The color space that the slider operates in. The `channel` must be in this color space.
   */
  colorSpace?: ColorSpace;
  /**
   * The orientation of the slider.
   * @default horizontal
   */
  orientation?: "horizontal" | "vertical";
  /**
   * A function to get the accessible label text representing the current value in a human-readable format.
   */
  getValueLabel?: (value: Color) => string;
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
  /** The localized strings of the component. */
  translations?: ColorIntlTranslations;
}
interface ColorSliderRootCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface ColorSliderRootRenderProps extends ColorSliderRootCommonProps, SliderRootRenderProps {}
type ColorSliderRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ColorSliderRootOptions & Partial<ColorSliderRootCommonProps<ElementOf<T>>>;
declare function ColorSliderRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, ColorSliderRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/color-slider/color-slider-thumb.d.ts
interface ColorSliderThumbOptions extends SliderThumbOptions {}
interface ColorSliderThumbCommonProps<_T extends HTMLElement = HTMLElement> {
  style?: JSX$1.CSSProperties | string;
}
interface ColorSliderThumbRenderProps extends ColorSliderThumbCommonProps, SliderThumbRenderProps {}
type ColorSliderThumbProps<T extends ValidComponent | HTMLElement = HTMLElement> = ColorSliderThumbOptions & Partial<ColorSliderThumbCommonProps<ElementOf<T>>>;
declare function ColorSliderThumb<T extends ValidComponent = "span">(props: PolymorphicProps<T, ColorSliderThumbProps<T>>): JSX$1.Element;
//#endregion
//#region src/color-slider/color-slider-track.d.ts
interface ColorSliderTrackOptions extends SliderTrackOptions {}
interface ColorSliderTrackCommonProps<_T extends HTMLElement = HTMLElement> {
  style?: JSX$1.CSSProperties | string;
}
interface ColorSliderTrackRenderProps extends ColorSliderTrackCommonProps, SliderTrackRenderProps {}
type ColorSliderTrackProps<T extends ValidComponent | HTMLElement = HTMLElement> = ColorSliderTrackOptions & Partial<ColorSliderTrackCommonProps<ElementOf<T>>>;
declare function ColorSliderTrack<T extends ValidComponent = "div">(props: PolymorphicProps<T, ColorSliderTrackProps<T>>): JSX$1.Element;
//#endregion
//#region src/color-slider/color-slider-context.d.ts
interface ColorSliderContextValue {
  readonly value: Accessor<Color>;
  channel: Accessor<ColorChannel>;
  getDisplayColor: () => Color;
  translations: Accessor<ColorIntlTranslations>;
}
export declare function useColorSliderContext(): ColorSliderContextValue;
//#endregion
//#region src/color-slider/index.d.ts
export declare const ColorSlider: typeof ColorSliderRoot & {
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  Input: typeof SliderInput;
  Label: typeof FormControlLabel;
  Thumb: typeof ColorSliderThumb;
  Track: typeof ColorSliderTrack;
  ValueLabel: typeof SliderValueLabel;
};
//#endregion
export { type ColorSliderContextValue, type FormControlDescriptionCommonProps as ColorSliderDescriptionCommonProps, type FormControlDescriptionOptions as ColorSliderDescriptionOptions, type FormControlDescriptionProps as ColorSliderDescriptionProps, type FormControlDescriptionRenderProps as ColorSliderDescriptionRenderProps, type FormControlErrorMessageCommonProps as ColorSliderErrorMessageCommonProps, type FormControlErrorMessageOptions as ColorSliderErrorMessageOptions, type FormControlErrorMessageProps as ColorSliderErrorMessageProps, type FormControlErrorMessageRenderProps as ColorSliderErrorMessageRenderProps, type SliderInputProps as ColorSliderInputProps, type FormControlLabelCommonProps as ColorSliderLabelCommonProps, type FormControlLabelOptions as ColorSliderLabelOptions, type FormControlLabelProps as ColorSliderLabelProps, type FormControlLabelRenderProps as ColorSliderLabelRenderProps, type ColorSliderRootCommonProps, type ColorSliderRootOptions, type ColorSliderRootProps, type ColorSliderRootRenderProps, type ColorSliderThumbCommonProps, type ColorSliderThumbOptions, type ColorSliderThumbProps, type ColorSliderThumbRenderProps, type ColorSliderTrackCommonProps, type ColorSliderTrackOptions, type ColorSliderTrackProps, type ColorSliderTrackRenderProps, type SliderValueLabelCommonProps as ColorSliderValueLabelCommonProps, type SliderValueLabelOptions as ColorSliderValueLabelOptions, type SliderValueLabelProps as ColorSliderValueLabelProps, type SliderValueLabelRenderProps as ColorSliderValueLabelRenderProps, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, SliderInput as Input, FormControlLabel as Label, ColorSliderRoot as Root, ColorSliderThumb as Thumb, ColorSliderTrack as Track, SliderValueLabel as ValueLabel };