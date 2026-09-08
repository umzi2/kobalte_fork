import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { r as ButtonRoot } from "../button/C_WaGidW.js";
import { r as useFormControlContext, t as FormControlDescription } from "../form-control-description/BQ1mcKaU.js";
import { t as FormControlErrorMessage } from "../form-control-error-message/D9jUVumc.js";
import { t as FormControlLabel } from "../form-control-label/DqQ24y8m.js";
import { i as PopperArrow } from "../popper/BTyI8BKK.js";
import { a as ComboboxPortal, c as ComboboxContent, i as ComboboxControl, l as useComboboxContext, n as ComboboxIcon, o as ComboboxListbox, r as ComboboxHiddenSelect, s as ComboboxInput, t as ComboboxBase } from "../combobox-base/DbupzOWZ.js";
import { a as ListboxItemLabel, c as ListboxItem, o as ListboxItemIndicator, r as ListboxSection, s as ListboxItemDescription } from "../listbox/CwQ1v5ER.js";
import { createComponent, memo, mergeProps } from "@solidjs/web";
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
	return createComponent(ComboboxBase, mergeProps({
		get value() {
			return value();
		},
		get defaultValue() {
			return defaultValue();
		},
		onChange,
		get selectionMode() {
			return props.multiple ? "multiple" : "single";
		}
	}, others));
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
	return createComponent(ButtonRoot, mergeProps({
		ref: [context.setTriggerRef, mergedProps.ref],
		get disabled() {
			return isDisabled();
		},
		tabindex: -1,
		"aria-haspopup": "listbox",
		get ["aria-expanded"]() {
			return context.isOpen() ? "true" : "false";
		},
		get ["aria-controls"]() {
			return memo(() => !!context.isOpen())() ? context.listboxId() : void 0;
		},
		get ["aria-label"]() {
			return context.triggerAriaLabel();
		},
		get ["aria-labelledby"]() {
			return ariaLabelledBy();
		},
		onPointerDown,
		onClick
	}, () => context.dataset(), others));
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
