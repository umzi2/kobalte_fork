import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { a as FormControlLabelRenderProps, c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, i as FormControlLabelProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, n as FormControlLabelCommonProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, r as FormControlLabelOptions, s as FormControlErrorMessageCommonProps, t as FormControlLabel, u as FormControlErrorMessageRenderProps } from "../index/ZPox5oFC.js";
import { _ as TextFieldInputOptions, f as TextFieldRootOptions, m as TextFieldRootRenderProps, y as TextFieldInputRenderProps } from "../index/Dssg6Kww.js";
import { JSX, ValidComponent } from "@solidjs/web";
//#region src/color-field/color-field-input.d.ts
interface ColorFieldInputOptions extends TextFieldInputOptions {}
interface ColorFieldInputCommonProps<T extends HTMLElement = HTMLInputElement> {
  onBlur: JSX.EventHandlerUnion<T, FocusEvent>;
}
interface ColorFieldInputRenderProps extends ColorFieldInputCommonProps, TextFieldInputRenderProps {
  autocomplete: "off";
  autocorrect: "off";
  spellcheck: "false";
}
type ColorFieldInputProps<T extends ValidComponent | HTMLElement = HTMLElement> = ColorFieldInputOptions & Partial<ColorFieldInputCommonProps<ElementOf<T>>>;
declare function ColorFieldInput<T extends ValidComponent = "input">(props: PolymorphicProps<T, ColorFieldInputProps<T>>): JSX.Element;
//#endregion
//#region src/color-field/color-field-root.d.ts
interface ColorFieldRootOptions extends TextFieldRootOptions {}
interface ColorFieldRootCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface ColorFieldRootRenderProps extends ColorFieldRootCommonProps, TextFieldRootRenderProps {}
type ColorFieldRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ColorFieldRootOptions & Partial<ColorFieldRootCommonProps<ElementOf<T>>>;
declare function ColorFieldRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, ColorFieldRootProps<T>>): JSX.Element;
//#endregion
//#region src/color-field/color-field-context.d.ts
interface ColorFieldContextValue {
  onBlur: JSX.EventHandlerUnion<HTMLInputElement, FocusEvent>;
}
export declare function useColorFieldContext(): ColorFieldContextValue;
//#endregion
//#region src/color-field/index.d.ts
export declare const ColorField: typeof ColorFieldRoot & {
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  Input: typeof ColorFieldInput;
  Label: typeof FormControlLabel;
};
//#endregion
export { type ColorFieldContextValue, type FormControlDescriptionCommonProps as ColorFieldDescriptionCommonProps, type FormControlDescriptionOptions as ColorFieldDescriptionOptions, type FormControlDescriptionProps as ColorFieldDescriptionProps, type FormControlDescriptionRenderProps as ColorFieldDescriptionRenderProps, type FormControlErrorMessageCommonProps as ColorFieldErrorMessageCommonProps, type FormControlErrorMessageOptions as ColorFieldErrorMessageOptions, type FormControlErrorMessageProps as ColorFieldErrorMessageProps, type FormControlErrorMessageRenderProps as ColorFieldErrorMessageRenderProps, type ColorFieldInputCommonProps, type ColorFieldInputOptions, type ColorFieldInputProps, type ColorFieldInputRenderProps, type FormControlLabelCommonProps as ColorFieldLabelCommonProps, type FormControlLabelOptions as ColorFieldLabelOptions, type FormControlLabelProps as ColorFieldLabelProps, type FormControlLabelRenderProps as ColorFieldLabelRenderProps, type ColorFieldRootCommonProps, type ColorFieldRootOptions, type ColorFieldRootProps, type ColorFieldRootRenderProps, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, ColorFieldInput as Input, FormControlLabel as Label, ColorFieldRoot as Root };