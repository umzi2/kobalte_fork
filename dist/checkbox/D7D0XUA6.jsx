import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { Polymorphic } from "../polymorphic/index.jsx";
import { t as createToggleState } from "../create-toggle-state/CF70_KE4.jsx";
import { a as createFormControl, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/Dc7vmdKW.jsx";
import { n as createFormControlField } from "../create-form-control-field/5-BHfdGI.jsx";
import { t as FormControlErrorMessage } from "../form-control-error-message/B1cNIdVV.jsx";
import { t as FormControlLabel } from "../form-control-label/Czoesrj9.jsx";
import { combineStyle } from "@solid-primitives/props";
import { Show, children, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, untrack, useContext } from "solid-js";
import { createPresence } from "@solid-primitives/presence";
import { access } from "@solid-primitives/utils";
import { callHandler, visuallyHiddenStyles } from "@kobalte/utils";
import { createFormResetListener } from "@solid-primitives/form";
//#region src/checkbox/checkbox-context.tsx
const CheckboxContext = createContext();
function useCheckboxContext() {
	const context = useContext(CheckboxContext);
	if (context === void 0) throw new Error("[kobalte]: `useCheckboxContext` must be used within a `Checkbox` component");
	return context;
}
//#endregion
//#region src/checkbox/checkbox-control.tsx
/**
* The element that visually represents a checkbox.
*/
function CheckboxControl(props) {
	const formControlContext = useFormControlContext();
	const context = useCheckboxContext();
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
//#region src/checkbox/checkbox-description.tsx
/**
* The description that gives the user more information on the checkbox.
*/
function CheckboxDescription(props) {
	const context = useCheckboxContext();
	return <FormControlDescription {...context.dataset()} {...props} />;
}
//#endregion
//#region src/checkbox/checkbox-error-message.tsx
/**
* The error message that gives the user information about how to fix a validation error on the checkbox.
*/
function CheckboxErrorMessage(props) {
	const context = useCheckboxContext();
	return <FormControlErrorMessage {...context.dataset()} {...props} />;
}
//#endregion
//#region src/checkbox/checkbox-indicator.tsx
/**
* The visual indicator rendered when the checkbox is in a checked or indeterminate state.
* You can style this element directly, or you can use it as a wrapper to put an icon into, or both.
*/
function CheckboxIndicator(props) {
	const formControlContext = useFormControlContext();
	const context = useCheckboxContext();
	const [_ref, setRef] = createSignal();
	const mergedProps = merge({ id: context.generateId("indicator") }, props);
	const others = omit(mergedProps, "ref", "forceMount");
	const { isMounted: present } = createPresence(() => mergedProps.forceMount || context.indeterminate() || context.checked() || void 0, { transitionDuration: 0 });
	return <Show when={present()}>
			<Polymorphic as="div" ref={[setRef, mergedProps.ref]} {...formControlContext.dataset()} {...context.dataset()} {...others} />
		</Show>;
}
//#endregion
//#region src/checkbox/checkbox-input.tsx
/**
* The native html input that is visually hidden in the checkbox.
*/
function CheckboxInput(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const formControlContext = useFormControlContext();
	const context = useCheckboxContext();
	const mergedProps = merge({ id: context.generateId("input") }, props);
	const formControlFieldProps = omit(mergedProps, "ref", "style", "onChange", "onFocus", "onBlur");
	const others = omit(mergedProps, "ref", "style", "onChange", "onFocus", "onBlur", "id", "aria-label", "aria-labelledby", "aria-describedby");
	const { fieldProps } = createFormControlField(formControlFieldProps);
	const [isInternalChangeEvent, setIsInternalChangeEvent] = createSignal(false);
	const onChange = (e) => {
		callHandler(e, mergedProps.onChange);
		e.stopPropagation();
		if (!isInternalChangeEvent()) {
			const target = e.target;
			context.setIsChecked(target.checked);
			target.checked = context.checked();
		}
		setIsInternalChangeEvent(false);
	};
	const onFocus = (e) => {
		callHandler(e, mergedProps.onFocus);
		context.setIsFocused(true);
	};
	const onBlur = (e) => {
		callHandler(e, mergedProps.onBlur);
		context.setIsFocused(false);
	};
	createEffect(() => [context.checked(), context.value()], () => {
		setIsInternalChangeEvent(true);
		untrack(ref)?.dispatchEvent(new Event("input", {
			bubbles: true,
			cancelable: true
		}));
		untrack(ref)?.dispatchEvent(new Event("change", {
			bubbles: true,
			cancelable: true
		}));
	}, { defer: true });
	createEffect(() => [
		ref(),
		context.indeterminate(),
		context.checked()
	], ([elRef, indeterminate]) => {
		if (elRef) elRef.indeterminate = indeterminate;
	});
	return <Polymorphic as="input" ref={[(el) => {
		context.setInputRef(el);
		setRef(el);
	}, mergedProps.ref]} type="checkbox" id={fieldProps.id()} name={formControlContext.name()} value={context.value()} checked={context.checked()} required={formControlContext.isRequired()} disabled={formControlContext.isDisabled()} readonly={formControlContext.isReadOnly()} style={combineStyle(visuallyHiddenStyles, mergedProps.style)} aria-label={fieldProps.ariaLabel()} aria-labelledby={fieldProps.ariaLabelledBy()} aria-describedby={fieldProps.ariaDescribedBy()} aria-invalid={formControlContext.validationState() === "invalid" ? "true" : void 0} aria-required={formControlContext.isRequired() ? "true" : void 0} aria-disabled={formControlContext.isDisabled() ? "true" : void 0} aria-readonly={formControlContext.isReadOnly() ? "true" : void 0} onChange={onChange} onFocus={onFocus} onBlur={onBlur} {...formControlContext.dataset()} {...context.dataset()} {...others} />;
}
//#endregion
//#region src/checkbox/checkbox-label.tsx
/**
* The label that gives the user information on the checkbox.
*/
function CheckboxLabel(props) {
	const context = useCheckboxContext();
	return <FormControlLabel {...context.dataset()} {...props} />;
}
//#endregion
//#region src/checkbox/checkbox-root.tsx
/**
* A control that allows the user to toggle between checked and not checked.
*/
function CheckboxRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const defaultId = `checkbox-${createUniqueId()}`;
	const mergedProps = merge({
		value: "on",
		id: defaultId
	}, props);
	const formControlProps = omit(mergedProps, "ref", "children", "value", "checked", "defaultChecked", "indeterminate", "onChange", "onPointerDown");
	const others = omit(mergedProps, "ref", "children", "value", "checked", "defaultChecked", "indeterminate", "onChange", "onPointerDown", "id", "name", "validationState", "required", "disabled", "readOnly");
	const [inputRef, setInputRef] = createSignal(void 0, { ownedWrite: true });
	const [isFocused, setIsFocused] = createSignal(false);
	const { formControlContext } = createFormControl(formControlProps);
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
	const dataset = createMemo(() => ({
		"data-checked": state.isSelected() ? "" : void 0,
		"data-indeterminate": mergedProps.indeterminate ? "" : void 0
	}));
	const context = {
		value: () => mergedProps.value,
		dataset,
		checked: () => state.isSelected(),
		indeterminate: () => mergedProps.indeterminate ?? false,
		inputRef,
		generateId: (suffix) => `${access(formControlProps.id)}-${suffix}`,
		toggle: () => state.toggle(),
		setIsChecked: (isChecked) => state.setIsSelected(isChecked),
		setIsFocused,
		setInputRef
	};
	return <FormControlContext value={formControlContext}>
			<CheckboxContext value={context}>
				<Polymorphic as="div" ref={[setRef, mergedProps.ref]} role="group" id={access(formControlProps.id)} onPointerDown={onPointerDown} {...formControlContext.dataset()} {...dataset()} {...others}>
					<CheckboxRootChild state={context}>
						{mergedProps.children}
					</CheckboxRootChild>
				</Polymorphic>
			</CheckboxContext>
		</FormControlContext>;
}
function CheckboxRootChild(props) {
	const resolvedChildren = children(() => {
		const body = props.children;
		return typeof body === "function" ? body(props.state) : body;
	});
	return <>{resolvedChildren()}</>;
}
//#endregion
//#region src/checkbox/index.tsx
var checkbox_exports = /* @__PURE__ */ __exportAll({
	Checkbox: () => Checkbox,
	Control: () => CheckboxControl,
	Description: () => CheckboxDescription,
	ErrorMessage: () => CheckboxErrorMessage,
	Indicator: () => CheckboxIndicator,
	Input: () => CheckboxInput,
	Label: () => CheckboxLabel,
	Root: () => CheckboxRoot,
	useCheckboxContext: () => useCheckboxContext
});
const Checkbox = Object.assign(CheckboxRoot, {
	Control: CheckboxControl,
	Description: CheckboxDescription,
	ErrorMessage: CheckboxErrorMessage,
	Indicator: CheckboxIndicator,
	Input: CheckboxInput,
	Label: CheckboxLabel
});
//#endregion
export { CheckboxInput as a, CheckboxDescription as c, CheckboxLabel as i, CheckboxControl as l, checkbox_exports as n, CheckboxIndicator as o, CheckboxRoot as r, CheckboxErrorMessage as s, Checkbox as t, useCheckboxContext as u };
