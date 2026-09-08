import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { a as FormControlLabelRenderProps, c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, i as FormControlLabelProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, n as FormControlLabelCommonProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, r as FormControlLabelOptions, s as FormControlErrorMessageCommonProps, t as FormControlLabel, u as FormControlErrorMessageRenderProps } from "../index/ZPox5oFC.js";
import { C as NumberFieldDecrementTriggerCommonProps, E as NumberFieldDecrementTriggerRenderProps, S as NumberFieldDecrementTrigger, T as NumberFieldDecrementTriggerProps, _ as NumberFieldIncrementTriggerOptions, b as NumberFieldHiddenInput, d as NumberFieldInputCommonProps, f as NumberFieldInputOptions, g as NumberFieldIncrementTriggerCommonProps, h as NumberFieldIncrementTrigger, l as NumberFieldRootRenderProps, m as NumberFieldInputRenderProps, n as index_d_exports, p as NumberFieldInputProps, s as NumberFieldRootOptions, u as NumberFieldInput, v as NumberFieldIncrementTriggerProps, w as NumberFieldDecrementTriggerOptions, x as NumberFieldHiddenInputProps, y as NumberFieldIncrementTriggerRenderProps } from "../index/DG9zDjvR.js";
import { ValidComponent } from "@solidjs/web";
import { Color, ColorChannel, ColorSpace } from "@solid-primitives/utils/colors";
//#region src/color-channel-field/color-channel-field-root.d.ts
interface ColorChannelFieldRootOptions extends Omit<NumberFieldRootOptions, "value" | "defaultValue" | "rawValue" | "onChange" | "onRawValueChange" | "formatOptions" | "allowedInput"> {
  /** The controlled formatted value of the field. */
  value?: Color;
  /** The default formatted value when initially rendered. */
  defaultValue?: Color;
  /** Event handler called when the value of the field changes. */
  onChange?: (value: Color) => void;
  /** The color channel that the field manipulates. */
  channel: ColorChannel;
  /** The color space that the field operates in. The `channel` must be in this color space.
   */
  colorSpace?: ColorSpace;
}
interface ColorChannelFieldRootCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface ColorChannelFieldRootRenderProps extends ColorChannelFieldRootCommonProps, NumberFieldRootRenderProps {}
type ColorChannelFieldRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ColorChannelFieldRootOptions & Partial<ColorChannelFieldRootCommonProps<ElementOf<T>>>;
declare function ColorChannelFieldRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, ColorChannelFieldRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/color-channel-field/index.d.ts
export declare const ColorChannelField: typeof ColorChannelFieldRoot & {
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  HiddenInput: typeof NumberFieldHiddenInput;
  Input: typeof NumberFieldInput;
  IncrementTrigger: typeof NumberFieldIncrementTrigger;
  DecrementTrigger: typeof NumberFieldDecrementTrigger;
  Label: typeof FormControlLabel;
};
//#endregion
export { type NumberFieldDecrementTriggerCommonProps as ColorChannelFieldDecrementTriggerCommonProps, type NumberFieldDecrementTriggerOptions as ColorChannelFieldDecrementTriggerOptions, type NumberFieldDecrementTriggerProps as ColorChannelFieldDecrementTriggerProps, type NumberFieldDecrementTriggerRenderProps as ColorChannelFieldDecrementTriggerRenderProps, type FormControlDescriptionCommonProps as ColorChannelFieldDescriptionCommonProps, type FormControlDescriptionOptions as ColorChannelFieldDescriptionOptions, type FormControlDescriptionProps as ColorChannelFieldDescriptionProps, type FormControlDescriptionRenderProps as ColorChannelFieldDescriptionRenderProps, type FormControlErrorMessageCommonProps as ColorChannelFieldErrorMessageCommonProps, type FormControlErrorMessageOptions as ColorChannelFieldErrorMessageOptions, type FormControlErrorMessageProps as ColorChannelFieldErrorMessageProps, type FormControlErrorMessageRenderProps as ColorChannelFieldErrorMessageRenderProps, type NumberFieldHiddenInputProps as ColorChannelFieldHiddenInputProps, type NumberFieldIncrementTriggerCommonProps as ColorChannelFieldIncrementTriggerCommonProps, type NumberFieldIncrementTriggerOptions as ColorChannelFieldIncrementTriggerOptions, type NumberFieldIncrementTriggerProps as ColorChannelFieldIncrementTriggerProps, type NumberFieldIncrementTriggerRenderProps as ColorChannelFieldIncrementTriggerRenderProps, type NumberFieldInputCommonProps as ColorChannelFieldInputCommonProps, type NumberFieldInputOptions as ColorChannelFieldInputOptions, type NumberFieldInputProps as ColorChannelFieldInputProps, type NumberFieldInputRenderProps as ColorChannelFieldInputRenderProps, type FormControlLabelCommonProps as ColorChannelFieldLabelCommonProps, type FormControlLabelOptions as ColorChannelFieldLabelOptions, type FormControlLabelProps as ColorChannelFieldLabelProps, type FormControlLabelRenderProps as ColorChannelFieldLabelRenderProps, type ColorChannelFieldRootCommonProps, type ColorChannelFieldRootOptions, type ColorChannelFieldRootProps, type ColorChannelFieldRootRenderProps, NumberFieldDecrementTrigger as DecrementTrigger, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, NumberFieldHiddenInput as HiddenInput, NumberFieldIncrementTrigger as IncrementTrigger, NumberFieldInput as Input, FormControlLabel as Label, ColorChannelFieldRoot as Root };