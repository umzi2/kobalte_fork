import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { n as button_exports } from "../button/Cw4fT4wG.jsx";
import { r as useFormControlContext, t as FormControlDescription } from "../form-control-description/Dc7vmdKW.jsx";
import { t as FormControlErrorMessage } from "../form-control-error-message/B1cNIdVV.jsx";
import { t as FormControlLabel } from "../form-control-label/Czoesrj9.jsx";
import { i as PopperArrow } from "../popper/BSUmx7sN.jsx";
import { a as ComboboxPortal, c as ComboboxContent, i as ComboboxControl, l as useComboboxContext, n as ComboboxIcon, o as ComboboxListbox, r as ComboboxHiddenSelect, s as ComboboxInput, t as ComboboxBase } from "../combobox-base/Vvd_zEtF.jsx";
import { a as ListboxItemLabel, c as ListboxItem, o as ListboxItemIndicator, r as ListboxSection, s as ListboxItemDescription } from "../listbox/BqJ2fkgp.jsx";
import { createMemo, merge, omit } from "solid-js";
import { callHandler } from "@kobalte/utils";
//#region src/combobox/combobox-root.tsx
/**
* A combo box combines a text input with a listbox, allowing users to filter a list of options to items matching a query.
*/
function ComboboxRoot(props) {
	const others = omit(props, "value", "defaultValue", "onChange", "multiple");
	const value = createMemo(() => {
		if (props.value != null) return props.multiple ? props.value : [props.value];
		return props.value;
	});
	const defaultValue = createMemo(() => {
		if (props.defaultValue != null) return props.multiple ? props.defaultValue : [props.defaultValue];
		return props.defaultValue;
	});
	const onChange = (value) => {
		if (props.multiple) props.onChange?.(value ?? []);
		else props.onChange?.(value[0] ?? null);
	};
	return <ComboboxBase value={value()} defaultValue={defaultValue()} onChange={onChange} selectionMode={props.multiple ? "multiple" : "single"} {...others} />;
}
//#endregion
//#region src/combobox/combobox-trigger.tsx
function ComboboxTrigger(props) {
	const formControlContext = useFormControlContext();
	const context = useComboboxContext();
	const mergedProps = merge({ id: context.generateId("trigger") }, props);
	const others = omit(mergedProps, "ref", "disabled", "onPointerDown", "onClick", "aria-labelledby");
	const isDisabled = () => {
		return mergedProps.disabled || context.isDisabled() || formControlContext.isDisabled() || formControlContext.isReadOnly();
	};
	const onPointerDown = (e) => {
		callHandler(e, mergedProps.onPointerDown);
		e.currentTarget.dataset.pointerType = e.pointerType;
		if (!isDisabled() && e.pointerType !== "touch" && e.button === 0) {
			e.preventDefault();
			context.toggle(false, "manual");
		}
	};
	const onClick = (e) => {
		callHandler(e, mergedProps.onClick);
		if (!isDisabled()) {
			if (e.currentTarget.dataset.pointerType === "touch") context.toggle(false, "manual");
			context.inputRef()?.focus({ preventScroll: true });
		}
	};
	const ariaLabelledBy = () => {
		return formControlContext.getAriaLabelledBy(others.id, context.triggerAriaLabel(), mergedProps["aria-labelledby"]);
	};
	return <button_exports.Root ref={[context.setTriggerRef, mergedProps.ref]} disabled={isDisabled()} tabindex={-1} aria-haspopup="listbox" aria-expanded={context.isOpen() ? "true" : "false"} aria-controls={context.isOpen() ? context.listboxId() : void 0} aria-label={context.triggerAriaLabel()} aria-labelledby={ariaLabelledBy()} onPointerDown={onPointerDown} onClick={onClick} {...context.dataset()} {...others} />;
}
//#endregion
//#region src/combobox/index.tsx
var combobox_exports = /* @__PURE__ */ __exportAll({
	Arrow: () => PopperArrow,
	Combobox: () => Combobox,
	Content: () => ComboboxContent,
	Control: () => ComboboxControl,
	Description: () => FormControlDescription,
	ErrorMessage: () => FormControlErrorMessage,
	HiddenSelect: () => ComboboxHiddenSelect,
	Icon: () => ComboboxIcon,
	Input: () => ComboboxInput,
	Item: () => ListboxItem,
	ItemDescription: () => ListboxItemDescription,
	ItemIndicator: () => ListboxItemIndicator,
	ItemLabel: () => ListboxItemLabel,
	Label: () => FormControlLabel,
	Listbox: () => ComboboxListbox,
	Portal: () => ComboboxPortal,
	Root: () => ComboboxRoot,
	Section: () => ListboxSection,
	Trigger: () => ComboboxTrigger,
	useComboboxContext: () => useComboboxContext
});
const Combobox = Object.assign(ComboboxRoot, {
	Arrow: PopperArrow,
	Content: ComboboxContent,
	Control: ComboboxControl,
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	HiddenSelect: ComboboxHiddenSelect,
	Icon: ComboboxIcon,
	Input: ComboboxInput,
	Item: ListboxItem,
	ItemDescription: ListboxItemDescription,
	ItemIndicator: ListboxItemIndicator,
	ItemLabel: ListboxItemLabel,
	Label: FormControlLabel,
	Listbox: ComboboxListbox,
	Portal: ComboboxPortal,
	Section: ListboxSection,
	Trigger: ComboboxTrigger
});
//#endregion
export { ComboboxRoot as i, combobox_exports as n, ComboboxTrigger as r, Combobox as t };
