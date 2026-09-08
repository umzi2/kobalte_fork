import { Polymorphic } from "../polymorphic/index.js";
import { createComponent, mergeProps } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { createUniqueId, merge, omit } from "solid-js";
import { COLOR_INTL_TRANSLATIONS } from "@solid-primitives/utils/colors";
//#region src/color-swatch/color-swatch.intl.ts
const COLOR_SWATCH_INTL_TRANSLATIONS = {
	roleDescription: "Color Swatch",
	transparent: "transparent"
};
//#endregion
//#region src/color-swatch/color-swatch-root.tsx
function ColorSwatchRoot(props) {
	const defaultId = `colorswatch-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		translations: COLOR_SWATCH_INTL_TRANSLATIONS
	}, props);
	const others = omit(mergedProps, "style", "value", "colorName", "aria-label", "translations");
	const ariaLabel = () => {
		return [mergedProps.colorName ?? (mergedProps.value.getChannelValue("alpha") === 0 ? mergedProps.translations.transparent : mergedProps.value.getColorName(COLOR_INTL_TRANSLATIONS)), mergedProps["aria-label"]].filter(Boolean).join(", ");
	};
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		role: "img",
		get ["aria-roledescription"]() {
			return mergedProps.translations.roleDescription;
		},
		get ["aria-label"]() {
			return ariaLabel();
		},
		get style() {
			return combineStyle({
				"background-color": mergedProps.value.toString("css"),
				"forced-color-adjust": "none"
			}, mergedProps.style);
		}
	}, others));
}
//#endregion
//#region src/color-swatch/index.tsx
const ColorSwatch = ColorSwatchRoot;
//#endregion
export { ColorSwatch, ColorSwatchRoot as Root };
