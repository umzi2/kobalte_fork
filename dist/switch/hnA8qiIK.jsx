import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { Polymorphic } from "../polymorphic/index.jsx";
import { t as createToggleState } from "../create-toggle-state/CF70_KE4.jsx";
import { a as createFormControl, i as FORM_CONTROL_PROP_NAMES, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/Dc7vmdKW.jsx";
import { n as createFormControlField, t as FORM_CONTROL_FIELD_PROP_NAMES } from "../create-form-control-field/5-BHfdGI.jsx";
import { t as FormControlErrorMessage } from "../form-control-error-message/B1cNIdVV.jsx";
import { t as FormControlLabel } from "../form-control-label/Czoesrj9.jsx";
import { combineStyle } from "@solid-primitives/props";
import { children, createContext, createMemo, createSignal, createUniqueId, merge, omit, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { callHandler, visuallyHiddenStyles } from "@kobalte/utils";
import { createFormResetListener } from "@solid-primitives/form";
//#region src/switch/switch-context.tsx
const SwitchContext = createContext();
function useSwitchContext() {
	const context = useContext(SwitchContext);
	if (context === void 0) throw new Error("[kobalte]: `useSwitchContext` must be used within a `Switch` component");
	return context;
}
//#endregion
//#region src/switch/switch-control.tsx
/**
* The element that visually represents a switch.
*/
function SwitchControl(props) {
	const formControlContext = useFormControlContext();
	const context = useSwitchContext();
	const mergedProps = merge({ id: context.generateId("control") }, props);
	const others = omit(mergedProps, "onClick", "onKeyDown");
	const onClick = (e) => {
		callHandler(e, mergedProps.onClick);
		context.toggle();
		context.inputRef()?.focus({ preventScroll: true });
	};
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		if (e.key === " ") {
			context.toggle();
			context.inputRef()?.focus({ preventScroll: true });
		}
	};
	return <Polymorphic as="div" onClick={onClick} onKeyDown={onKeyDown} {...formControlContext.dataset()} {...context.dataset()} {...others} />;
}
//#endregion
//#region src/switch/switch-description.tsx
/**
* The description that gives the user more information on the switch.
*/
function SwitchDescription(props) {
	const context = useSwitchContext();
	return <FormControlDescription {...context.dataset()} {...props} />;
}
//#endregion
//#region src/switch/switch-error-message.tsx
/**
* The error message that gives the user information about how to fix a validation error on the switch.
*/
function SwitchErrorMessage(props) {
	const context = useSwitchContext();
	return <FormControlErrorMessage {...context.dataset()} {...props} />;
}
//#endregion
//#region src/switch/switch-input.tsx
/**
* The native html input that is visually hidden in the switch.
*/
function SwitchInput(props) {
	const formControlContext = useFormControlContext();
	const context = useSwitchContext();
	const mergedProps = merge({ id: context.generateId("input") }, props);
	const formControlFieldProps = omit(mergedProps, "ref", "style", "onChange", "onFocus", "onBlur");
	const others = omit(mergedProps, "ref", "style", "onChange", "onFocus", "onBlur", ...FORM_CONTROL_FIELD_PROP_NAMES);
	const { fieldProps } = createFormControlField(formControlFieldProps);
	const onChange = (e) => {
		callHandler(e, mergedProps.onChange);
		e.stopPropagation();
		const target = e.target;
		context.setIsChecked(target.checked);
		target.checked = context.checked();
	};
	const onFocus = (e) => {
		callHandler(e, mergedProps.onFocus);
		context.setIsFocused(true);
	};
	const onBlur = (e) => {
		callHandler(e, mergedProps.onBlur);
		context.setIsFocused(false);
	};
	return <Polymorphic as="input" ref={[context.setInputRef, mergedProps.ref]} type="checkbox" role="switch" id={fieldProps.id()} name={formControlContext.name()} value={context.value()} checked={context.checked()} required={formControlContext.isRequired()} disabled={formControlContext.isDisabled()} readonly={formControlContext.isReadOnly()} style={combineStyle({ ...visuallyHiddenStyles }, mergedProps.style)} aria-checked={context.checked() ? "true" : "false"} aria-label={fieldProps.ariaLabel()} aria-labelledby={fieldProps.ariaLabelledBy()} aria-describedby={fieldProps.ariaDescribedBy()} aria-invalid={formControlContext.validationState() === "invalid" ? "true" : void 0} aria-required={formControlContext.isRequired() ? "true" : void 0} aria-disabled={formControlContext.isDisabled() ? "true" : void 0} aria-readonly={formControlContext.isReadOnly() ? "true" : void 0} onChange={onChange} onFocus={onFocus} onBlur={onBlur} {...formControlContext.dataset()} {...context.dataset()} {...others} />;
}
//#endregion
//#region src/switch/switch-label.tsx
/**
* The label that gives the user information on the switch.
*/
function SwitchLabel(props) {
	const context = useSwitchContext();
	return <FormControlLabel {...context.dataset()} {...props} />;
}
//#endregion
//#region src/switch/switch-root.tsx
/**
* A control that allows users to choose one of two values: on or off.
*/
function SwitchRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const defaultId = `switch-${createUniqueId()}`;
	const mergedProps = merge({
		value: "on",
		id: defaultId
	}, props);
	const others = omit(mergedProps, "ref", "children", "value", "checked", "defaultChecked", "onChange", "onPointerDown", ...FORM_CONTROL_PROP_NAMES);
	const [inputRef, setInputRef] = createSignal(void 0, { ownedWrite: true });
	const [isFocused, setIsFocused] = createSignal(false);
	const { formControlContext } = createFormControl(mergedProps);
	const state = createToggleState({
		isSelected: () => mergedProps.checked,
		defaultIsSelected: () => mergedProps.defaultChecked,
		onSelectedChange: (selected) => mergedProps.onChange?.(selected),
		isDisabled: () => formControlContext.isDisabled(),
		isReadOnly: () => formControlContext.isReadOnly()
	});
	createFormResetListener(ref, () => state.setIsSelected(mergedProps.defaultChecked ?? false));
	const onPointerDown = (e) => {
		callHandler(e, mergedProps.onPointerDown);
		if (isFocused()) e.preventDefault();
	};
	const dataset = createMemo(() => ({ "data-checked": state.isSelected() ? "" : void 0 }));
	const context = {
		value: () => mergedProps.value,
		dataset,
		checked: () => state.isSelected(),
		inputRef,
		generateId: (suffix) => `${access(mergedProps.id)}-${suffix}`,
		toggle: () => state.toggle(),
		setIsChecked: (isChecked) => state.setIsSelected(isChecked),
		setIsFocused,
		setInputRef
	};
	return <FormControlContext value={formControlContext}>
			<SwitchContext value={context}>
				<Polymorphic as="div" ref={[setRef, mergedProps.ref]} role="group" id={access(mergedProps.id)} onPointerDown={onPointerDown} {...formControlContext.dataset()} {...dataset()} {...others}>
					<SwitchRootChild state={context}>
						{mergedProps.children}
					</SwitchRootChild>
				</Polymorphic>
			</SwitchContext>
		</FormControlContext>;
}
function SwitchRootChild(props) {
	const resolvedChildren = children(() => {
		const body = props.children;
		return typeof body === "function" ? body(props.state) : body;
	});
	return <>{resolvedChildren()}</>;
}
//#endregion
//#region src/switch/switch-thumb.tsx
/**
* The thumb that is used to visually indicate whether the switch is on or off.
*/
function SwitchThumb(props) {
	const formControlContext = useFormControlContext();
	const context = useSwitchContext();
	const mergedProps = merge({ id: context.generateId("thumb") }, props);
	return <Polymorphic as="div" {...formControlContext.dataset()} {...context.dataset()} {...mergedProps} />;
}
//#endregion
//#region src/switch/index.tsx
var switch_exports = /* @__PURE__ */ __exportAll({
	Control: () => SwitchControl,
	Description: () => SwitchDescription,
	ErrorMessage: () => SwitchErrorMessage,
	Input: () => SwitchInput,
	Label: () => SwitchLabel,
	Root: () => SwitchRoot,
	Switch: () => Switch$1,
	Thumb: () => SwitchThumb,
	useSwitchContext: () => useSwitchContext
});
const Switch$1 = Object.assign(SwitchRoot, {
	Control: SwitchControl,
	Description: SwitchDescription,
	ErrorMessage: SwitchErrorMessage,
	Input: SwitchInput,
	Label: SwitchLabel,
	Thumb: SwitchThumb
});
//#endregion
export { SwitchLabel as a, SwitchDescription as c, SwitchRoot as i, SwitchControl as l, switch_exports as n, SwitchInput as o, SwitchThumb as r, SwitchErrorMessage as s, Switch$1 as t, useSwitchContext as u };
