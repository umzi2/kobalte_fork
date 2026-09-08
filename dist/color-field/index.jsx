import { t as primitives_exports } from "../primitives/BlSoAAAV.jsx";
import { t as FormControlDescription } from "../form-control-description/Dc7vmdKW.jsx";
import { t as FormControlErrorMessage } from "../form-control-error-message/B1cNIdVV.jsx";
import { t as FormControlLabel } from "../form-control-label/Czoesrj9.jsx";
import { n as text_field_exports } from "../text-field/YCMSE_vD.jsx";
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
	return <text_field_exports.Input autocomplete="off" autocorrect="off" spellcheck="false" onBlur={composeEventHandlers([props.onBlur, context.onBlur])} {...others} />;
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
	const context = { onBlur };
	return <ColorFieldContext value={context}>
			<text_field_exports.Root value={value()} defaultValue={defaultValue()} onChange={onChange} {...others} />
		</ColorFieldContext>;
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
