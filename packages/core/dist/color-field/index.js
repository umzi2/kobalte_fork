import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { t as FormControlDescription } from "../form-control-description/BQ1mcKaU.js";
import { t as FormControlErrorMessage } from "../form-control-error-message/D9jUVumc.js";
import { t as FormControlLabel } from "../form-control-label/DqQ24y8m.js";
import { a as TextFieldInput, i as TextFieldRoot } from "../text-field/G9saLSdu.js";
import { createComponent, mergeProps } from "@solidjs/web";
import { createContext, createMemo, createSignal, createUniqueId, merge, omit, useContext } from "solid-js";
import { composeEventHandlers } from "@kobalte/utils";
import { parseColor } from "@solid-primitives/utils/colors";
//#region src/color-field/color-field-context.tsx
const ColorFieldContext = createContext();
function useColorFieldContext() {
	const context = useContext(ColorFieldContext);
	if (context === void 0) throw new Error("[kobalte]: `useColorFieldContext` must be used within a `ColorField` component");
	return context;
}
//#endregion
//#region src/color-field/color-field-input.tsx
function ColorFieldInput(props) {
	const context = useColorFieldContext();
	const others = omit(props, "onBlur");
	return createComponent(TextFieldInput, mergeProps({
		autocomplete: "off",
		autocorrect: "off",
		spellcheck: "false",
		get onBlur() {
			return composeEventHandlers([props.onBlur, context.onBlur]);
		}
	}, others));
}
//#endregion
//#region src/color-field/color-field-root.tsx
function ColorFieldRoot(props) {
	const defaultId = `colorfield-${createUniqueId()}`;
	const mergedProps = merge({ id: defaultId }, props);
	const others = omit(mergedProps, "value", "defaultValue", "onChange");
	const defaultValue = createMemo(() => {
		let defaultValue = mergedProps.defaultValue;
		try {
			defaultValue = parseColor(defaultValue?.startsWith("#") ? defaultValue : `#${defaultValue}`).toString("hex");
		} catch {
			defaultValue = "";
		}
		return defaultValue;
	});
	const [value, setValue] = (0, primitives_exports.createControllableSignal)({
		value: () => mergedProps.value,
		defaultValue,
		onChange: (value) => mergedProps.onChange?.(value)
	});
	const [prevValue, setPrevValue] = createSignal(value());
	const onChange = (value) => {
		if (isAllowedInput(value)) setValue(value);
	};
	const onBlur = (_e) => {
		if (!value().length) {
			setPrevValue("");
			return;
		}
		let newValue;
		try {
			newValue = parseColor(value().startsWith("#") ? value() : `#${value()}`).toString("hex");
		} catch {
			if (prevValue()) setValue(prevValue());
			else setValue("");
			return;
		}
		setValue(newValue);
		setPrevValue(newValue);
	};
	return createComponent(ColorFieldContext, {
		value: { onBlur },
		get children() {
			return createComponent(TextFieldRoot, mergeProps({
				get value() {
					return value();
				},
				get defaultValue() {
					return defaultValue();
				},
				onChange
			}, others));
		}
	});
}
function isAllowedInput(value) {
	return value === "" || !!value.match(/^#?[0-9a-f]{0,6}$/i)?.[0];
}
//#endregion
//#region src/color-field/index.tsx
const ColorField = Object.assign(ColorFieldRoot, {
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	Input: ColorFieldInput,
	Label: FormControlLabel
});
//#endregion
export { ColorField, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, ColorFieldInput as Input, FormControlLabel as Label, ColorFieldRoot as Root, useColorFieldContext };
