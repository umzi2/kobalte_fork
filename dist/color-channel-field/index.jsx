import { t as primitives_exports } from "../primitives/BlSoAAAV.jsx";
import { t as FormControlDescription } from "../form-control-description/Dc7vmdKW.jsx";
import { t as FormControlErrorMessage } from "../form-control-error-message/B1cNIdVV.jsx";
import { t as FormControlLabel } from "../form-control-label/Czoesrj9.jsx";
import { a as NumberFieldIncrementTrigger, i as NumberFieldInput, n as number_field_exports, o as NumberFieldHiddenInput, s as NumberFieldDecrementTrigger } from "../number-field/Bd-Vk7EL.jsx";
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
	return <number_field_exports.Root rawValue={Number.isNaN(color().getChannelValue(mergedProps.channel)) ? void 0 : color().getChannelValue(mergedProps.channel) / multiplier()} minValue={range().minValue / multiplier()} maxValue={range().maxValue / multiplier()} step={range().step / multiplier()} formatOptions={formatOptions()} onRawValueChange={onRawValueChange} {...others} />;
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
