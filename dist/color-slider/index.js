import { useLocale } from "../i18n/index.js";
import { t as FormControlDescription } from "../form-control-description/BQ1mcKaU.js";
import { t as FormControlErrorMessage } from "../form-control-error-message/D9jUVumc.js";
import { t as FormControlLabel } from "../form-control-label/DqQ24y8m.js";
import { a as SliderRoot, i as SliderTrack, l as useSliderContext, o as SliderInput, r as SliderValueLabel, s as SliderThumb } from "../slider/9u79LXOa.js";
import { createComponent, mergeProps } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { createContext, createMemo, createUniqueId, merge, omit, useContext } from "solid-js";
import { createControllableSignal } from "@solid-primitives/controlled-signal";
import { COLOR_INTL_TRANSLATIONS, parseColor } from "@solid-primitives/utils/colors";
//#region src/color-slider/color-slider-context.tsx
const ColorSliderContext = createContext();
function useColorSliderContext() {
	const context = useContext(ColorSliderContext);
	if (context === void 0) throw new Error("[kobalte]: `useColorSliderContext` must be used within a `ColorSlider.Root` component");
	return context;
}
//#endregion
//#region src/color-slider/color-slider-root.tsx
function ColorSliderRoot(props) {
	const defaultId = `colorslider-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		translations: COLOR_INTL_TRANSLATIONS,
		defaultValue: parseColor("hsl(0, 100%, 50%)")
	}, props);
	const others = omit(mergedProps, "value", "defaultValue", "onChange", "onChangeEnd", "channel", "colorSpace", "getValueLabel", "translations");
	const [value, setValue] = createControllableSignal({
		value: () => mergedProps.value,
		defaultValue: () => mergedProps.defaultValue,
		onChange: (value) => mergedProps.onChange?.(value)
	});
	const color = createMemo(() => {
		return mergedProps.colorSpace ? value().toFormat(mergedProps.colorSpace) : value();
	});
	const onChange = (value) => {
		setValue(color().withChannelValue(mergedProps.channel, value[0]));
	};
	const onChangeEnd = (value) => {
		mergedProps.onChangeEnd?.(color().withChannelValue(mergedProps.channel, value[0]));
	};
	const getValueLabel = createMemo(() => {
		if (mergedProps.getValueLabel) return mergedProps.getValueLabel(color());
		return color().formatChannelValue(mergedProps.channel);
	});
	const context = {
		value: color,
		channel: () => mergedProps.channel,
		getDisplayColor: createMemo(() => {
			switch (mergedProps.channel) {
				case "hue": return parseColor(`hsl(${color().getChannelValue("hue")}, 100%, 50%)`);
				case "lightness":
				case "brightness":
				case "saturation":
				case "red":
				case "green":
				case "blue": return color().withChannelValue("alpha", 1);
				case "alpha": return color();
				default: throw new Error(`Unknown color channel: ${mergedProps.channel}`);
			}
		}),
		translations: () => mergedProps.translations
	};
	return createComponent(ColorSliderContext, {
		value: context,
		get children() {
			return createComponent(SliderRoot, mergeProps({
				get value() {
					return [color().getChannelValue(mergedProps.channel)];
				},
				onChange,
				onChangeEnd,
				getValueLabel
			}, () => color().getChannelRange(mergedProps.channel), others));
		}
	});
}
//#endregion
//#region src/color-slider/color-slider-thumb.tsx
function ColorSliderThumb(props) {
	const context = useColorSliderContext();
	const others = omit(props, "style");
	const valueText = createMemo(() => {
		const formattedValue = context.value()?.formatChannelValue(context.channel());
		if (context.channel() === "hue") return `${formattedValue}, ${context.getDisplayColor().getHueName(context.translations())}`;
		if (context.channel() !== "alpha") return `${formattedValue}, ${context.getDisplayColor().getColorName(context.translations())}`;
		return formattedValue;
	});
	return createComponent(SliderThumb, mergeProps({
		get style() {
			return combineStyle({
				"forced-color-adjust": "none",
				"--kb-color-current": context.value().toString()
			}, props.style);
		},
		get ["aria-valuetext"]() {
			return valueText();
		}
	}, others));
}
//#endregion
//#region src/color-slider/color-slider-track.tsx
function ColorSliderTrack(props) {
	const sliderContext = useSliderContext();
	const context = useColorSliderContext();
	const others = omit(props, "style");
	const { direction } = useLocale();
	const backgroundStyles = createMemo(() => {
		let to;
		if (sliderContext.state.orientation() === "vertical") to = "top";
		else if (direction() === "ltr") to = "right";
		else to = "left";
		switch (context.channel()) {
			case "hue": {
				const stops = [
					0,
					60,
					120,
					180,
					240,
					300,
					360
				].map((hue) => context.getDisplayColor().withChannelValue("hue", hue).toString("css")).join(", ");
				return `linear-gradient(to ${to}, ${stops})`;
			}
			case "lightness": {
				const min = sliderContext.state.getThumbMinValue(0);
				const max = sliderContext.state.getThumbMaxValue(0);
				const start = context.getDisplayColor().withChannelValue(context.channel(), min).toString("css");
				const middle = context.getDisplayColor().withChannelValue(context.channel(), (max - min) / 2).toString("css");
				const end = context.getDisplayColor().withChannelValue(context.channel(), max).toString("css");
				return `linear-gradient(to ${to}, ${start}, ${middle}, ${end})`;
			}
			case "saturation":
			case "brightness":
			case "red":
			case "green":
			case "blue":
			case "alpha": {
				const start = context.getDisplayColor().withChannelValue(context.channel(), sliderContext.state.getThumbMinValue(0)).toString("css");
				const end = context.getDisplayColor().withChannelValue(context.channel(), sliderContext.state.getThumbMaxValue(0)).toString("css");
				return `linear-gradient(to ${to}, ${start}, ${end})`;
			}
			default: throw new Error(`Unknown color channel: ${context.channel()}`);
		}
	});
	return createComponent(SliderTrack, mergeProps({ get style() {
		return combineStyle({
			"forced-color-adjust": "none",
			background: backgroundStyles()
		}, props.style);
	} }, others));
}
//#endregion
//#region src/color-slider/index.tsx
const ColorSlider = Object.assign(ColorSliderRoot, {
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	Input: SliderInput,
	Label: FormControlLabel,
	Thumb: ColorSliderThumb,
	Track: ColorSliderTrack,
	ValueLabel: SliderValueLabel
});
//#endregion
export { ColorSlider, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, SliderInput as Input, FormControlLabel as Label, ColorSliderRoot as Root, ColorSliderThumb as Thumb, ColorSliderTrack as Track, SliderValueLabel as ValueLabel, useColorSliderContext };
