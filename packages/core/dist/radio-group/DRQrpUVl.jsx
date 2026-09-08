import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { Polymorphic } from "../polymorphic/index.jsx";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.jsx";
import { t as primitives_exports } from "../primitives/BlSoAAAV.jsx";
import { a as createFormControl, i as FORM_CONTROL_PROP_NAMES, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/Dc7vmdKW.jsx";
import { t as FormControlErrorMessage } from "../form-control-error-message/B1cNIdVV.jsx";
import { t as FormControlLabel } from "../form-control-label/Czoesrj9.jsx";
import { combineStyle } from "@solid-primitives/props";
import { Show, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, untrack, useContext } from "solid-js";
import { createPresence } from "@solid-primitives/presence";
import { access } from "@solid-primitives/utils";
import { callHandler, visuallyHiddenStyles } from "@kobalte/utils";
import { createFormResetListener } from "@solid-primitives/form";
//#region src/radio-group/radio-group-context.tsx
const RadioGroupContext = createContext();
function useRadioGroupContext() {
	const context = useContext(RadioGroupContext);
	if (context === void 0) throw new Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");
	return context;
}
//#endregion
//#region src/radio-group/radio-group-item-context.tsx
const RadioGroupItemContext = createContext();
function useRadioGroupItemContext() {
	const context = useContext(RadioGroupItemContext);
	if (context === void 0) throw new Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");
	return context;
}
//#endregion
//#region src/radio-group/radio-group-item.tsx
/**
* The root container for a radio button.
*/
function RadioGroupItem(props) {
	const formControlContext = useFormControlContext();
	const radioGroupContext = useRadioGroupContext();
	const defaultId = `${formControlContext.generateId("item")}-${createUniqueId()}`;
	const mergedProps = merge({ id: defaultId }, props);
	const others = omit(mergedProps, "value", "disabled", "onPointerDown");
	const [inputId, setInputId] = createSignal(void 0, { ownedWrite: true });
	const [labelId, setLabelId] = createSignal(void 0, { ownedWrite: true });
	const [descriptionId, setDescriptionId] = createSignal(void 0, { ownedWrite: true });
	const [inputRef, setInputRef] = createSignal(void 0, { ownedWrite: true });
	const [isFocused, setIsFocused] = createSignal(false);
	const isDefault = createMemo(() => {
		return radioGroupContext.isDefaultValue(mergedProps.value);
	});
	const isSelected = createMemo(() => {
		return radioGroupContext.isSelectedValue(mergedProps.value);
	});
	const isDisabled = createMemo(() => {
		return mergedProps.disabled || formControlContext.isDisabled() || false;
	});
	const onPointerDown = (e) => {
		callHandler(e, mergedProps.onPointerDown);
		if (isFocused()) e.preventDefault();
	};
	const dataset = createMemo(() => ({
		...formControlContext.dataset(),
		"data-disabled": isDisabled() ? "" : void 0,
		"data-checked": isSelected() ? "" : void 0
	}));
	const context = {
		value: () => mergedProps.value,
		dataset,
		isDefault,
		isSelected,
		isDisabled,
		inputId,
		labelId,
		descriptionId,
		inputRef,
		select: () => radioGroupContext.setSelectedValue(mergedProps.value),
		generateId: (suffix) => `${others.id}-${suffix}`,
		registerInput: createRegisterId(setInputId),
		registerLabel: createRegisterId(setLabelId),
		registerDescription: createRegisterId(setDescriptionId),
		setIsFocused,
		setInputRef
	};
	return <RadioGroupItemContext value={context}>
			<Polymorphic as="div" role="group" onPointerDown={onPointerDown} {...dataset()} {...others} />
		</RadioGroupItemContext>;
}
//#endregion
//#region src/radio-group/radio-group-item-control.tsx
/**
* The element that visually represents a radio button.
*/
function RadioGroupItemControl(props) {
	const context = useRadioGroupItemContext();
	const mergedProps = merge({ id: context.generateId("control") }, props);
	const others = omit(mergedProps, "onClick", "onKeyDown");
	const onClick = (e) => {
		callHandler(e, mergedProps.onClick);
		context.select();
		context.inputRef()?.focus({ preventScroll: true });
	};
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		if (e.key === " ") {
			context.select();
			context.inputRef()?.focus({ preventScroll: true });
		}
	};
	return <Polymorphic as="div" onClick={onClick} onKeyDown={onKeyDown} {...context.dataset()} {...others} />;
}
//#endregion
//#region src/radio-group/radio-group-item-description.tsx
/**
* The description that gives the user more information on the radio button.
*/
function RadioGroupItemDescription(props) {
	const context = useRadioGroupItemContext();
	const mergedProps = merge({ id: context.generateId("description") }, props);
	createEffect(() => mergedProps.id, (id) => context.registerDescription(id));
	return <Polymorphic as="div" {...context.dataset()} {...mergedProps} />;
}
//#endregion
//#region src/radio-group/radio-group-item-indicator.tsx
/**
* The visual indicator rendered when the radio item is in a checked state.
* You can style this element directly, or you can use it as a wrapper to put an icon into, or both.
*/
function RadioGroupItemIndicator(props) {
	const context = useRadioGroupItemContext();
	const mergedProps = merge({ id: context.generateId("indicator") }, props);
	const others = omit(mergedProps, "ref", "forceMount");
	const [_ref, setRef] = createSignal();
	const { isMounted: present } = createPresence(() => mergedProps.forceMount || context.isSelected() || void 0, { transitionDuration: 0 });
	return <Show when={present()}>
			<Polymorphic as="div" ref={[setRef, mergedProps.ref]} {...context.dataset()} {...others} />
		</Show>;
}
//#endregion
//#region src/radio-group/radio-group-item-input.tsx
/**
* The native html input that is visually hidden in the radio button.
*/
function RadioGroupItemInput(props) {
	const formControlContext = useFormControlContext();
	const radioGroupContext = useRadioGroupContext();
	const radioContext = useRadioGroupItemContext();
	const mergedProps = merge({ id: radioContext.generateId("input") }, props);
	const others = omit(mergedProps, "ref", "style", "aria-labelledby", "aria-describedby", "onChange", "onFocus", "onBlur");
	const ariaLabelledBy = () => {
		return [
			mergedProps["aria-labelledby"],
			radioContext.labelId(),
			mergedProps["aria-labelledby"] != null && others["aria-label"] != null ? others.id : void 0
		].filter(Boolean).join(" ") || void 0;
	};
	const ariaDescribedBy = () => {
		return [
			mergedProps["aria-describedby"],
			radioContext.descriptionId(),
			radioGroupContext.ariaDescribedBy()
		].filter(Boolean).join(" ") || void 0;
	};
	const [isInternalChangeEvent, setIsInternalChangeEvent] = createSignal(false);
	const onChange = (e) => {
		callHandler(e, mergedProps.onChange);
		e.stopPropagation();
		if (!isInternalChangeEvent()) {
			radioGroupContext.setSelectedValue(radioContext.value());
			const target = e.target;
			target.checked = radioContext.isSelected();
		}
		setIsInternalChangeEvent(false);
	};
	const onFocus = (e) => {
		callHandler(e, mergedProps.onFocus);
		radioContext.setIsFocused(true);
	};
	const onBlur = (e) => {
		callHandler(e, mergedProps.onBlur);
		radioContext.setIsFocused(false);
	};
	createEffect(() => [radioContext.isSelected(), radioContext.value()], ([isSelected]) => {
		if (!isSelected) return;
		setIsInternalChangeEvent(true);
		const ref = untrack(() => radioContext.inputRef());
		ref?.dispatchEvent(new Event("input", {
			bubbles: true,
			cancelable: true
		}));
		ref?.dispatchEvent(new Event("change", {
			bubbles: true,
			cancelable: true
		}));
	}, { defer: true });
	createEffect(() => others.id, (id) => radioContext.registerInput(id));
	return <Polymorphic as="input" ref={[radioContext.setInputRef, mergedProps.ref]} type="radio" name={formControlContext.name()} value={radioContext.value()} checked={radioContext.isSelected()} required={formControlContext.isRequired()} disabled={radioContext.isDisabled()} readonly={formControlContext.isReadOnly()} style={combineStyle({ ...visuallyHiddenStyles }, mergedProps.style)} aria-labelledby={ariaLabelledBy()} aria-describedby={ariaDescribedBy()} onChange={onChange} onFocus={onFocus} onBlur={onBlur} {...radioContext.dataset()} {...others} />;
}
//#endregion
//#region src/radio-group/radio-group-item-label.tsx
/**
* The label that gives the user information on the radio button.
*/
function RadioGroupItemLabel(props) {
	const context = useRadioGroupItemContext();
	const mergedProps = merge({ id: context.generateId("label") }, props);
	createEffect(() => mergedProps.id, (id) => context.registerLabel(id));
	return <Polymorphic as="label" for={context.inputId()} {...context.dataset()} {...mergedProps} />;
}
//#endregion
//#region src/radio-group/radio-group-label.tsx
/**
* The label that gives the user information on the radio group.
*/
function RadioGroupLabel(props) {
	return <FormControlLabel as="span" {...props} />;
}
//#endregion
//#region src/radio-group/radio-group-root.tsx
/**
* A set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time.
* This component is based on the [WAI-ARIA Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/)
*/
function RadioGroupRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const defaultId = `radiogroup-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		orientation: "vertical"
	}, props);
	const formControlProps = omit(mergedProps, "ref", "value", "defaultValue", "onChange", "orientation", "aria-labelledby", "aria-describedby");
	const others = omit(mergedProps, "ref", "value", "defaultValue", "onChange", "orientation", "aria-labelledby", "aria-describedby", ...FORM_CONTROL_PROP_NAMES);
	const [selected, setSelected] = (0, primitives_exports.createControllableSignal)({
		value: () => mergedProps.value,
		defaultValue: () => mergedProps.defaultValue,
		onChange: (value) => mergedProps.onChange?.(value)
	});
	const { formControlContext } = createFormControl(formControlProps);
	createFormResetListener(ref, () => setSelected(mergedProps.defaultValue ?? ""));
	const ariaLabelledBy = () => {
		return formControlContext.getAriaLabelledBy(access(formControlProps.id), others["aria-label"], mergedProps["aria-labelledby"]);
	};
	const ariaDescribedBy = () => {
		return formControlContext.getAriaDescribedBy(mergedProps["aria-describedby"]);
	};
	const isDefaultValue = (value) => {
		return value === props.defaultValue;
	};
	const isSelectedValue = (value) => {
		return value === selected();
	};
	const setSelectedValue = (value) => {
		if (formControlContext.isReadOnly() || formControlContext.isDisabled()) return;
		setSelected(value);
		if (ref()) {
			const rootEl = ref();
			for (const el of rootEl.querySelectorAll("[type='radio']")) {
				const radio = el;
				radio.checked = isSelectedValue(radio.value);
			}
		}
	};
	const context = {
		ariaDescribedBy,
		isDefaultValue,
		isSelectedValue,
		setSelectedValue
	};
	return <FormControlContext value={formControlContext}>
			<RadioGroupContext value={context}>
				<Polymorphic as="div" ref={[setRef, mergedProps.ref]} role="radiogroup" id={access(formControlProps.id)} aria-invalid={formControlContext.validationState() === "invalid" ? "true" : void 0} aria-required={formControlContext.isRequired() ? "true" : void 0} aria-disabled={formControlContext.isDisabled() ? "true" : void 0} aria-readonly={formControlContext.isReadOnly() ? "true" : void 0} aria-orientation={mergedProps.orientation} aria-labelledby={ariaLabelledBy()} aria-describedby={ariaDescribedBy()} {...formControlContext.dataset()} {...others} />
			</RadioGroupContext>
		</FormControlContext>;
}
//#endregion
//#region src/radio-group/index.tsx
var radio_group_exports = /* @__PURE__ */ __exportAll({
	Description: () => FormControlDescription,
	ErrorMessage: () => FormControlErrorMessage,
	Item: () => RadioGroupItem,
	ItemControl: () => RadioGroupItemControl,
	ItemDescription: () => RadioGroupItemDescription,
	ItemIndicator: () => RadioGroupItemIndicator,
	ItemInput: () => RadioGroupItemInput,
	ItemLabel: () => RadioGroupItemLabel,
	Label: () => RadioGroupLabel,
	RadioGroup: () => RadioGroup,
	Root: () => RadioGroupRoot,
	useRadioGroupContext: () => useRadioGroupContext
});
const RadioGroup = Object.assign(RadioGroupRoot, {
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	Item: RadioGroupItem,
	ItemControl: RadioGroupItemControl,
	ItemDescription: RadioGroupItemDescription,
	ItemIndicator: RadioGroupItemIndicator,
	ItemInput: RadioGroupItemInput,
	ItemLabel: RadioGroupItemLabel,
	Label: RadioGroupLabel
});
//#endregion
export { RadioGroupItemLabel as a, RadioGroupItemDescription as c, useRadioGroupItemContext as d, useRadioGroupContext as f, RadioGroupLabel as i, RadioGroupItemControl as l, radio_group_exports as n, RadioGroupItemInput as o, RadioGroupRoot as r, RadioGroupItemIndicator as s, RadioGroup as t, RadioGroupItem as u };
