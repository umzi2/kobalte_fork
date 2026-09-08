import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { t as FormControlDescription } from "../form-control-description/BQ1mcKaU.js";
import { t as FormControlErrorMessage } from "../form-control-error-message/D9jUVumc.js";
import { t as FormControlLabel } from "../form-control-label/DqQ24y8m.js";
import { a as NumberFieldIncrementTrigger, i as NumberFieldInput, o as NumberFieldHiddenInput, r as NumberFieldRoot, s as NumberFieldDecrementTrigger } from "../number-field/Dkgv8jsZ.js";
import { createComponent, memo, mergeProps } from "@solidjs/web";
import { createMemo, createUniqueId, merge, omit } from "solid-js";
import { clamp } from "@kobalte/utils";
import { parseColor } from "@solid-primitives/utils/colors";
//#region src/color-channel-field/color-channel-field-root.tsx
function ColorChannelFieldRoot(props) {
	const defaultId = `colorchannelfield-${createUniqueId()}`;
	const mergedProps = merge({ id: defaultId }, props);
	const others = omit(mergedProps, "value", "defaultValue", "onChange", "channel", "colorSpace");
	const [value, setValue] = (0, primitives_exports.createControllableSignal)({
		value: () => mergedProps.value,
		defaultValue: () => mergedProps.defaultValue ?? parseColor("hsl(0, 100%, 50%)"),
		onChange: (value) => mergedProps.onChange?.(value)
	});
	const color = createMemo(() => mergedProps.colorSpace ? value().toFormat(mergedProps.colorSpace) : value());
	const range = createMemo(() => color().getChannelRange(mergedProps.channel));
	const formatOptions = createMemo(() => color().getChannelFormatOptions(mergedProps.channel));
	const multiplier = createMemo(() => formatOptions().style === "percent" && range().maxValue === 100 ? 100 : 1);
	const onRawValueChange = (value) => {
		if (Number.isNaN(value)) {
			setValue(color().withChannelValue(mergedProps.channel, NaN));
			return;
		}
		const clampedValue = clamp(value * multiplier(), range().minValue, range().maxValue);
		const digits = formatOptions().maximumFractionDigits ?? 0;
		const roundedValue = Math.round(clampedValue * 10 ** digits) / 10 ** digits;
		setValue(color().withChannelValue(mergedProps.channel, roundedValue));
	};
	return createComponent(NumberFieldRoot, mergeProps({
		get rawValue() {
			return memo(() => !!Number.isNaN(color().getChannelValue(mergedProps.channel)))() ? void 0 : color().getChannelValue(mergedProps.channel) / multiplier();
		},
		get minValue() {
			return range().minValue / multiplier();
		},
		get maxValue() {
			return range().maxValue / multiplier();
		},
		get step() {
			return range().step / multiplier();
		},
		get formatOptions() {
			return formatOptions();
		},
		onRawValueChange
	}, others));
}
//#endregion
//#region src/color-channel-field/index.tsx
const ColorChannelField = Object.assign(ColorChannelFieldRoot, {
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	HiddenInput: NumberFieldHiddenInput,
	Input: NumberFieldInput,
	IncrementTrigger: NumberFieldIncrementTrigger,
	DecrementTrigger: NumberFieldDecrementTrigger,
	Label: FormControlLabel
});
//#endregion
export { ColorChannelField, NumberFieldDecrementTrigger as DecrementTrigger, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, NumberFieldHiddenInput as HiddenInput, NumberFieldIncrementTrigger as IncrementTrigger, NumberFieldInput as Input, FormControlLabel as Label, ColorChannelFieldRoot as Root };
