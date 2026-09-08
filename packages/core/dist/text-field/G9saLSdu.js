import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { a as createFormControl, i as FORM_CONTROL_PROP_NAMES, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/BQ1mcKaU.js";
import { n as createFormControlField, t as FORM_CONTROL_FIELD_PROP_NAMES } from "../create-form-control-field/5-BHfdGI.js";
import { t as FormControlErrorMessage } from "../form-control-error-message/D9jUVumc.js";
import { t as FormControlLabel } from "../form-control-label/DqQ24y8m.js";
import { createComponent, mergeProps } from "@solidjs/web";
import { createContext, createEffect, createSignal, createUniqueId, merge, omit, untrack, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { composeEventHandlers } from "@kobalte/utils";
import { createFormResetListener } from "@solid-primitives/form";
//#region src/text-field/text-field-context.tsx
const TextFieldContext = createContext();
function useTextFieldContext() {
	const context = useContext(TextFieldContext);
	if (context === void 0) throw new Error("[kobalte]: `useTextFieldContext` must be used within a `TextField` component");
	return context;
}
//#endregion
//#region src/text-field/text-field-input.tsx
function TextFieldInput(props) {
	return createComponent(TextFieldInputBase, mergeProps({ type: "text" }, props));
}
function TextFieldInputBase(props) {
	const formControlContext = useFormControlContext();
	const context = useTextFieldContext();
	const mergedProps = merge({ id: context.generateId("input") }, props);
	const formControlFieldProps = omit(mergedProps, "onInput");
	const others = omit(mergedProps, "onInput", ...FORM_CONTROL_FIELD_PROP_NAMES);
	const { fieldProps } = createFormControlField(formControlFieldProps);
	return createComponent(Polymorphic, mergeProps({
		as: "input",
		get id() {
			return fieldProps.id();
		},
		get name() {
			return formControlContext.name();
		},
		get value() {
			return context.value() ?? "";
		},
		get required() {
			return formControlContext.isRequired();
		},
		get disabled() {
			return formControlContext.isDisabled();
		},
		get readonly() {
			return formControlContext.isReadOnly();
		},
		get ["aria-label"]() {
			return fieldProps.ariaLabel();
		},
		get ["aria-labelledby"]() {
			return fieldProps.ariaLabelledBy();
		},
		get ["aria-describedby"]() {
			return fieldProps.ariaDescribedBy();
		},
		get ["aria-invalid"]() {
			return formControlContext.validationState() === "invalid" ? "true" : void 0;
		},
		get ["aria-required"]() {
			return formControlContext.isRequired() ? "true" : void 0;
		},
		get ["aria-disabled"]() {
			return formControlContext.isDisabled() ? "true" : void 0;
		},
		get ["aria-readonly"]() {
			return formControlContext.isReadOnly() ? "true" : void 0;
		},
		get onInput() {
			return composeEventHandlers([mergedProps.onInput, context.onInput]);
		}
	}, () => formControlContext.dataset(), others));
}
//#endregion
//#region src/text-field/text-field-root.tsx
/**
* A text input that allow users to input custom text entries with a keyboard.
*/
function TextFieldRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const defaultId = `textfield-${createUniqueId()}`;
	const mergedProps = merge({ id: defaultId }, props);
	const others = omit(mergedProps, "ref", "value", "defaultValue", "onChange", ...FORM_CONTROL_PROP_NAMES);
	const initialValue = mergedProps.value;
	const [value, setValue] = (0, primitives_exports.createControllableSignal)({
		value: () => initialValue === void 0 ? void 0 : mergedProps.value ?? "",
		defaultValue: () => mergedProps.defaultValue,
		onChange: (value) => mergedProps.onChange?.(value)
	});
	const { formControlContext } = createFormControl(mergedProps);
	createFormResetListener(ref, () => setValue(mergedProps.defaultValue ?? ""));
	const onInput = (e) => {
		if (formControlContext.isReadOnly() || formControlContext.isDisabled()) return;
		const target = e.target;
		setValue(target.value);
		target.value = value() ?? "";
	};
	const context = {
		value,
		generateId: (suffix) => `${access(mergedProps.id)}-${suffix}`,
		onInput
	};
	return createComponent(FormControlContext, {
		value: formControlContext,
		get children() {
			return createComponent(TextFieldContext, {
				value: context,
				get children() {
					return createComponent(Polymorphic, mergeProps({
						as: "div",
						ref: [setRef, mergedProps.ref],
						role: "group",
						get id() {
							return access(mergedProps.id);
						}
					}, () => formControlContext.dataset(), others));
				}
			});
		}
	});
}
//#endregion
//#region src/text-field/text-field-text-area.tsx
/**
* The native html textarea of the textfield.
*/
function TextFieldTextArea(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const context = useTextFieldContext();
	const mergedProps = merge({ id: context.generateId("textarea") }, props);
	const others = omit(mergedProps, "ref", "autoResize", "submitOnEnter", "onKeyPress");
	createEffect(() => ({
		autoResize: mergedProps.autoResize,
		value: context.value()
	}), ({ autoResize }) => {
		const el = untrack(ref);
		if (!el || !autoResize) return;
		adjustHeight(el);
	});
	const onKeyPress = (event) => {
		const el = ref();
		if (el && mergedProps.submitOnEnter && event.key === "Enter" && !event.shiftKey) {
			if (el.form) {
				el.form.requestSubmit();
				event.preventDefault();
			}
		}
	};
	return createComponent(TextFieldInputBase, mergeProps({
		as: "textarea",
		get ["aria-multiline"]() {
			return mergedProps.submitOnEnter ? "false" : void 0;
		},
		get onKeyPress() {
			return composeEventHandlers([mergedProps.onKeyPress, onKeyPress]);
		},
		ref: [setRef, mergedProps.ref]
	}, others));
}
/**
* Adjust the height of the textarea based on its text value.
*/
function adjustHeight(el) {
	const prevAlignment = el.style.alignSelf;
	const prevOverflow = el.style.overflow;
	if (!("MozAppearance" in el.style)) el.style.overflow = "hidden";
	el.style.alignSelf = "start";
	el.style.height = "auto";
	el.style.height = `${el.scrollHeight + (el.offsetHeight - el.clientHeight)}px`;
	el.style.overflow = prevOverflow;
	el.style.alignSelf = prevAlignment;
}
//#endregion
//#region src/text-field/index.tsx
var text_field_exports = /* @__PURE__ */ __exportAll({
	Description: () => FormControlDescription,
	ErrorMessage: () => FormControlErrorMessage,
	Input: () => TextFieldInput,
	Label: () => FormControlLabel,
	Root: () => TextFieldRoot,
	TextArea: () => TextFieldTextArea,
	TextField: () => TextField,
	useTextFieldContext: () => useTextFieldContext
});
const TextField = Object.assign(TextFieldRoot, {
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	Input: TextFieldInput,
	Label: FormControlLabel,
	TextArea: TextFieldTextArea
});
//#endregion
export { TextFieldInput as a, TextFieldRoot as i, text_field_exports as n, useTextFieldContext as o, TextFieldTextArea as r, TextField as t };
