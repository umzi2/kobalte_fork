import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { JSX, ValidComponent } from "@solidjs/web";
import { Color } from "@solid-primitives/utils/colors";
//#region src/color-swatch/color-swatch.intl.d.ts
declare const COLOR_SWATCH_INTL_TRANSLATIONS: {
  roleDescription: string;
  transparent: string;
};
type ColorSwatchIntlTranslations = typeof COLOR_SWATCH_INTL_TRANSLATIONS;
//#endregion
//#region src/color-swatch/color-swatch-root.d.ts
interface ColorSwatchRootOptions {
  /** The color value to display in the swatch. */
  value: Color;
  /**
   * A localized accessible name for the color.
   * By default, a description is generated from the color value,
   * but this can be overridden if you have a more specific color
   * name (e.g. Pantone colors).
   */
  colorName?: string;
  /** The localized strings of the component. */
  translations?: ColorSwatchIntlTranslations;
}
interface ColorSwatchRootCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
  style?: JSX.CSSProperties | string;
  "aria-label"?: string;
}
interface ColorSwatchRootRenderProps extends ColorSwatchRootCommonProps {
  role: "img";
}
type ColorSwatchRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ColorSwatchRootOptions & Partial<ColorSwatchRootCommonProps<ElementOf<T>>>;
declare function ColorSwatchRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, ColorSwatchRootProps<T>>): JSX.Element;
//#endregion
//#region src/color-swatch/index.d.ts
export declare const ColorSwatch: typeof ColorSwatchRoot;
//#endregion
export { type ColorSwatchRootCommonProps, type ColorSwatchRootOptions, type ColorSwatchRootProps, type ColorSwatchRootRenderProps, ColorSwatchRoot as Root };