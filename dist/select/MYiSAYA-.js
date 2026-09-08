import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as createDisclosureState } from "../create-disclosure-state/DV_ixT98.js";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.js";
import { r as ButtonRoot } from "../button/C_WaGidW.js";
import { l as Selection, o as createTypeSelect, t as createListState } from "../create-list-state/_aAsgQr7.js";
import { createCollator } from "../i18n/index.js";
import { n as ListKeyboardDelegate } from "../create-selectable-list/rxK-SjAU.js";
import { t as DismissableLayer } from "../dismissable-layer/DXLD03yU.js";
import { a as createFormControl, i as FORM_CONTROL_PROP_NAMES, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/BQ1mcKaU.js";
import { n as createFormControlField } from "../create-form-control-field/5-BHfdGI.js";
import { t as FormControlErrorMessage } from "../form-control-error-message/D9jUVumc.js";
import { t as FormControlLabel } from "../form-control-label/DqQ24y8m.js";
import { i as PopperArrow, t as Popper } from "../popper/BTyI8BKK.js";
import { a as ListboxItemLabel, c as ListboxItem, i as ListboxRoot, o as ListboxItemIndicator, r as ListboxSection, s as ListboxItemDescription } from "../listbox/CwQ1v5ER.js";
import { t as HiddenSelectBase } from "../hidden-select-base/B9qy0bK0.js";
import { Portal, createComponent, memo, mergeProps } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { Show, children, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, untrack, useContext } from "solid-js";
import { createPresence } from "@solid-primitives/presence";
import { access } from "@solid-primitives/utils";
import { callHandler } from "@kobalte/utils";
import { createFocusTrap } from "@solid-primitives/focus";
import { createHideOutside } from "@solid-primitives/interaction";
import { createPreventScroll } from "@solid-primitives/scroll";
import { createFormResetListener } from "@solid-primitives/form";
//#region src/select/select-context.tsx
const SelectContext = createContext();
function useSelectContext() {
	const context = useContext(SelectContext);
	if (context === void 0) throw new Error("[kobalte]: `useSelectContext` must be used within a `Select` component");
	return context;
}
//#endregion
//#region src/select/select-content.tsx
/**
* The component that pops out when the select is open.
*/
function SelectContent(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const context = useSelectContext();
	const others = omit(props, "ref", "style", "onCloseAutoFocus", "onFocusOutside");
	const onEscapeKeyDown = (_e) => {
		context.close();
	};
	const onFocusOutside = (e) => {
		props.onFocusOutside?.(e);
		if (context.isOpen() && context.isModal()) e.preventDefault();
	};
	createHideOutside({
		disabled: () => !(context.isOpen() && context.isModal()),
		targets: () => {
			const el = ref();
			return el ? [el] : [];
		},
		alwaysVisibleSelector: "[data-kb-top-layer], [data-live-announcer]"
	});
	createPreventScroll({
		element: ref,
		enabled: () => context.contentPresent() && context.preventScroll()
	});
	const onFinalFocus = (e) => {
		props.onCloseAutoFocus?.(e);
		if (!e.defaultPrevented) {
			context.triggerRef()?.focus({ preventScroll: true });
			e.preventDefault();
		}
	};
	createFocusTrap({
		element: ref,
		enabled: () => context.isOpen() && context.isModal(),
		onInitialFocus: (e) => {
			e.preventDefault();
		},
		onFinalFocus
	});
	createEffect(() => context.contentPresent() && !context.isModal(), (isNonModalAndPresent) => {
		if (!isNonModalAndPresent) return;
		return () => {
			const contentEl = ref();
			if (!contentEl || !contentEl.contains(document.activeElement)) return;
			onFinalFocus(new CustomEvent("selectCloseAutoFocus", {
				bubbles: false,
				cancelable: true
			}));
		};
	});
	return createComponent(Show, {
		get when() {
			return context.contentPresent();
		},
		get children() {
			return createComponent(Popper.Positioner, { get children() {
				return createComponent(DismissableLayer, mergeProps({
					ref: [(el) => {
						context.setContentRef(el);
						setRef(el);
					}, props.ref],
					get disableOutsidePointerEvents() {
						return memo(() => !!context.isModal())() ? context.isOpen() : context.isModal();
					},
					get excludedElements() {
						return [context.triggerRef];
					},
					get style() {
						return combineStyle({
							"--kb-select-content-transform-origin": "var(--kb-popper-content-transform-origin)",
							position: "relative"
						}, props.style);
					},
					onEscapeKeyDown,
					onFocusOutside,
					get onDismiss() {
						return context.close;
					}
				}, () => context.dataset(), others));
			} });
		}
	});
}
//#endregion
//#region src/select/select-hidden-select.tsx
function SelectHiddenSelect(props) {
	const context = useSelectContext();
	return createComponent(HiddenSelectBase, mergeProps({
		get collection() {
			return context.listState().collection();
		},
		get selectionManager() {
			return context.listState().selectionManager();
		},
		get isOpen() {
			return context.isOpen();
		},
		get isMultiple() {
			return context.isMultiple();
		},
		get isVirtualized() {
			return context.isVirtualized();
		},
		focusTrigger: () => context.triggerRef()?.focus()
	}, props));
}
//#endregion
//#region src/select/select-icon.tsx
/**
* A small icon often displayed next to the value as a visual affordance for the fact it can be open.
* It renders a `▼` by default, but you can use your own icon `children`.
*/
function SelectIcon(props) {
	const context = useSelectContext();
	const mergedProps = merge({ children: "▼" }, props);
	return createComponent(Polymorphic, mergeProps({
		as: "span",
		"aria-hidden": "true"
	}, () => context.dataset(), mergedProps));
}
//#endregion
//#region src/select/select-label.tsx
/**
* The label that gives the user information on the select.
*/
function SelectLabel(props) {
	const context = useSelectContext();
	const others = omit(props, "onClick");
	const onClick = (e) => {
		callHandler(e, props.onClick);
		if (!context.isDisabled()) context.triggerRef()?.focus();
	};
	return createComponent(FormControlLabel, mergeProps({
		as: "span",
		onClick
	}, others));
}
//#endregion
//#region src/select/select-listbox.tsx
/**
* Contains all the items of a `Select`.
*/
function SelectListbox(props) {
	const context = useSelectContext();
	const mergedProps = merge({ id: context.generateId("listbox") }, props);
	const others = omit(mergedProps, "ref", "id", "onKeyDown");
	createEffect(() => mergedProps.id, (id) => context.registerListboxId(id));
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		if (e.key === "Escape") e.preventDefault();
	};
	return createComponent(ListboxRoot, mergeProps({
		ref: [context.setListboxRef, mergedProps.ref],
		get id() {
			return mergedProps.id;
		},
		get state() {
			return context.listState();
		},
		get virtualized() {
			return context.isVirtualized();
		},
		get autoFocus() {
			return context.autoFocus();
		},
		shouldSelectOnPressUp: true,
		shouldFocusOnHover: true,
		get shouldFocusWrap() {
			return context.shouldFocusWrap();
		},
		get disallowTypeAhead() {
			return context.disallowTypeAhead();
		},
		get ["aria-labelledby"]() {
			return context.listboxAriaLabelledBy();
		},
		get renderItem() {
			return context.renderItem;
		},
		get renderSection() {
			return context.renderSection;
		},
		onKeyDown
	}, others));
}
//#endregion
//#region src/select/select-portal.tsx
/**
* Portals its children into the `body` when the select is open.
*/
function SelectPortal(props) {
	const context = useSelectContext();
	return createComponent(Show, {
		get when() {
			return context.contentPresent();
		},
		get children() {
			return createComponent(Portal, props);
		}
	});
}
//#endregion
//#region src/select/select-base.tsx
/**
* Base component for a select, provide context for its children.
* Used to build single and multi-select.
*/
function SelectBase(props) {
	const defaultId = `select-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		selectionMode: "single",
		disallowEmptySelection: false,
		closeOnSelection: props.selectionMode === "single",
		allowDuplicateSelectionEvents: true,
		gutter: 8,
		sameWidth: true,
		modal: false
	}, props);
	const popperProps = omit(mergedProps, "itemComponent", "sectionComponent", "open", "defaultOpen", "onOpenChange", "value", "defaultValue", "onChange", "placeholder", "options", "optionValue", "optionTextValue", "optionDisabled", "optionGroupChildren", "keyboardDelegate", "allowDuplicateSelectionEvents", "disallowEmptySelection", "closeOnSelection", "disallowTypeAhead", "shouldFocusWrap", "selectionBehavior", "selectionMode", "virtualized", "modal", "preventScroll", "forceMount", ...FORM_CONTROL_PROP_NAMES);
	const formControlProps = omit(mergedProps, "itemComponent", "sectionComponent", "open", "defaultOpen", "onOpenChange", "value", "defaultValue", "onChange", "placeholder", "options", "optionValue", "optionTextValue", "optionDisabled", "optionGroupChildren", "keyboardDelegate", "allowDuplicateSelectionEvents", "disallowEmptySelection", "closeOnSelection", "disallowTypeAhead", "shouldFocusWrap", "selectionBehavior", "selectionMode", "virtualized", "modal", "preventScroll", "forceMount", "getAnchorRect", "placement", "gutter", "shift", "flip", "slide", "overlap", "sameWidth", "fitViewport", "hideWhenDetached", "detachedPadding", "arrowPadding", "overflowPadding");
	const others = omit(mergedProps, "itemComponent", "sectionComponent", "open", "defaultOpen", "onOpenChange", "value", "defaultValue", "onChange", "placeholder", "options", "optionValue", "optionTextValue", "optionDisabled", "optionGroupChildren", "keyboardDelegate", "allowDuplicateSelectionEvents", "disallowEmptySelection", "closeOnSelection", "disallowTypeAhead", "shouldFocusWrap", "selectionBehavior", "selectionMode", "virtualized", "modal", "preventScroll", "forceMount", "getAnchorRect", "placement", "gutter", "shift", "flip", "slide", "overlap", "sameWidth", "fitViewport", "hideWhenDetached", "detachedPadding", "arrowPadding", "overflowPadding", ...FORM_CONTROL_PROP_NAMES);
	const [triggerId, setTriggerId] = createSignal(void 0, { ownedWrite: true });
	const [valueId, setValueId] = createSignal(void 0, { ownedWrite: true });
	const [listboxId, setListboxId] = createSignal(void 0, { ownedWrite: true });
	const [triggerRef, setTriggerRef] = createSignal(void 0, { ownedWrite: true });
	const [contentRef, setContentRef] = createSignal(void 0, { ownedWrite: true });
	const [listboxRef, setListboxRef] = createSignal(void 0, { ownedWrite: true });
	const [listboxAriaLabelledBy, setListboxAriaLabelledBy] = createSignal(void 0, { ownedWrite: true });
	const [focusStrategy, setFocusStrategy] = createSignal(true);
	const getOptionValue = (option) => {
		const optionValue = mergedProps.optionValue;
		if (optionValue == null) return String(option);
		return String(typeof optionValue === "function" ? optionValue(option) : option[optionValue]);
	};
	const flattenOptions = createMemo(() => {
		const optionGroupChildren = mergedProps.optionGroupChildren;
		if (optionGroupChildren == null) return mergedProps.options;
		return mergedProps.options.flatMap((item) => item[optionGroupChildren] ?? item);
	});
	const flattenOptionKeys = createMemo(() => {
		return flattenOptions().map((option) => getOptionValue(option));
	});
	const getOptionsFromValues = (values) => {
		return [...values].map((value) => flattenOptions().find((option) => getOptionValue(option) === value)).filter((option) => option != null);
	};
	const disclosureState = createDisclosureState({
		open: () => mergedProps.open,
		defaultOpen: () => mergedProps.defaultOpen,
		onOpenChange: (isOpen) => mergedProps.onOpenChange?.(isOpen)
	});
	const listState = createListState({
		selectedKeys: () => {
			if (mergedProps.value != null) return mergedProps.value.map(getOptionValue);
			return mergedProps.value;
		},
		defaultSelectedKeys: () => {
			if (mergedProps.defaultValue != null) return mergedProps.defaultValue.map(getOptionValue);
			return mergedProps.defaultValue;
		},
		onSelectionChange: (selectedKeys) => {
			mergedProps.onChange?.(getOptionsFromValues(selectedKeys));
			if (mergedProps.closeOnSelection) close();
		},
		allowDuplicateSelectionEvents: () => access(mergedProps.allowDuplicateSelectionEvents),
		disallowEmptySelection: () => access(mergedProps.disallowEmptySelection),
		selectionBehavior: () => access(mergedProps.selectionBehavior),
		selectionMode: () => mergedProps.selectionMode,
		dataSource: () => mergedProps.options ?? [],
		getKey: () => mergedProps.optionValue,
		getTextValue: () => mergedProps.optionTextValue,
		getDisabled: () => mergedProps.optionDisabled,
		getSectionChildren: () => mergedProps.optionGroupChildren
	});
	const selectedOptions = createMemo(() => {
		return getOptionsFromValues(listState.selectionManager().selectedKeys());
	});
	const removeOptionFromSelection = (option) => {
		listState.selectionManager().toggleSelection(getOptionValue(option));
	};
	const { isMounted: contentPresent } = createPresence(() => mergedProps.forceMount || disclosureState.isOpen() || void 0, { transitionDuration: 0 });
	const focusListbox = () => {
		const listboxEl = listboxRef();
		if (listboxEl) listboxEl.focus({ preventScroll: true });
	};
	const open = (focusStrategy) => {
		if (mergedProps.options.length <= 0) return;
		setFocusStrategy(focusStrategy);
		disclosureState.open();
		let focusedKey = listState.selectionManager().firstSelectedKey();
		if (focusedKey == null) {
			if (focusStrategy === "first") focusedKey = listState.collection().getFirstKey();
			else if (focusStrategy === "last") focusedKey = listState.collection().getLastKey();
		}
		focusListbox();
		listState.selectionManager().setFocused(true);
		listState.selectionManager().setFocusedKey(focusedKey);
	};
	const close = () => {
		disclosureState.close();
		listState.selectionManager().setFocused(false);
		listState.selectionManager().setFocusedKey(void 0);
	};
	const toggle = (focusStrategy) => {
		if (disclosureState.isOpen()) close();
		else open(focusStrategy);
	};
	const { formControlContext } = createFormControl(formControlProps);
	createFormResetListener(triggerRef, () => {
		const defaultSelectedKeys = mergedProps.defaultValue ? [...mergedProps.defaultValue].map(getOptionValue) : new Selection();
		listState.selectionManager().setSelectedKeys(defaultSelectedKeys);
	});
	const collator = createCollator({
		usage: "search",
		sensitivity: "base"
	});
	const delegate = createMemo(() => {
		const keyboardDelegate = access(mergedProps.keyboardDelegate);
		if (keyboardDelegate) return keyboardDelegate;
		return new ListKeyboardDelegate(listState.collection, void 0, collator);
	});
	const renderItem = (item) => {
		return mergedProps.itemComponent?.({ item });
	};
	const renderSection = (section) => {
		return mergedProps.sectionComponent?.({ section });
	};
	createEffect(() => flattenOptionKeys(), (keys) => {
		const selectionManager = untrack(() => listState.selectionManager());
		const keysToKeep = [...untrack(() => selectionManager.selectedKeys())].filter((key) => keys.includes(key));
		selectionManager.setSelectedKeys(keysToKeep);
	}, { defer: true });
	const dataset = createMemo(() => ({
		"data-expanded": disclosureState.isOpen() ? "" : void 0,
		"data-closed": !disclosureState.isOpen() ? "" : void 0
	}));
	const context = {
		dataset,
		isOpen: disclosureState.isOpen,
		isDisabled: () => formControlContext.isDisabled() ?? false,
		isMultiple: () => access(mergedProps.selectionMode) === "multiple",
		isVirtualized: () => mergedProps.virtualized ?? false,
		isModal: () => mergedProps.modal ?? false,
		preventScroll: () => mergedProps.preventScroll ?? context.isModal(),
		disallowTypeAhead: () => mergedProps.disallowTypeAhead ?? false,
		shouldFocusWrap: () => mergedProps.shouldFocusWrap ?? false,
		selectedOptions,
		contentPresent,
		autoFocus: focusStrategy,
		triggerRef,
		listState: () => listState,
		keyboardDelegate: delegate,
		triggerId,
		valueId,
		listboxId,
		listboxAriaLabelledBy,
		setListboxAriaLabelledBy,
		setTriggerRef,
		setContentRef,
		setListboxRef,
		open,
		close,
		toggle,
		placeholder: () => mergedProps.placeholder,
		renderItem,
		renderSection,
		removeOptionFromSelection,
		generateId: (suffix) => `${access(formControlProps.id)}-${suffix}`,
		registerTriggerId: createRegisterId(setTriggerId),
		registerValueId: createRegisterId(setValueId),
		registerListboxId: createRegisterId(setListboxId)
	};
	return createComponent(FormControlContext, {
		value: formControlContext,
		get children() {
			return createComponent(SelectContext, {
				value: context,
				get children() {
					return createComponent(Popper, mergeProps({
						anchorRef: triggerRef,
						contentRef
					}, popperProps, { get children() {
						return createComponent(Polymorphic, mergeProps({
							as: "div",
							role: "group",
							get id() {
								return access(formControlProps.id);
							}
						}, () => formControlContext.dataset(), dataset, others));
					} }));
				}
			});
		}
	});
}
//#endregion
//#region src/select/select-root.tsx
/**
* Displays a list of options for the user to pick from — triggered by a button.
*/
function SelectRoot(props) {
	const others = omit(props, "value", "defaultValue", "onChange", "multiple");
	const _props = props;
	const value = createMemo(() => {
		if (_props.value != null) return _props.multiple ? _props.value : [_props.value];
		return _props.value;
	});
	const defaultValue = createMemo(() => {
		if (_props.defaultValue != null) return _props.multiple ? _props.defaultValue : [_props.defaultValue];
		return _props.defaultValue;
	});
	const onChange = (value) => {
		if (_props.multiple) _props.onChange?.(value ?? []);
		else _props.onChange?.(value[0] ?? null);
	};
	return createComponent(SelectBase, mergeProps({
		get value() {
			return value();
		},
		get defaultValue() {
			return defaultValue();
		},
		onChange,
		get selectionMode() {
			return _props.multiple ? "multiple" : "single";
		}
	}, others));
}
//#endregion
//#region src/select/select-trigger.tsx
function SelectTrigger(props) {
	const formControlContext = useFormControlContext();
	const context = useSelectContext();
	const mergedProps = merge({ id: context.generateId("trigger") }, props);
	const others = omit(mergedProps, "ref", "disabled", "onPointerDown", "onClick", "onKeyDown", "onFocus", "onBlur", "id", "aria-label", "aria-labelledby", "aria-describedby");
	const selectionManager = () => context.listState().selectionManager();
	const keyboardDelegate = () => context.keyboardDelegate();
	const isDisabled = () => mergedProps.disabled || context.isDisabled();
	const { fieldProps } = createFormControlField(mergedProps);
	const { typeSelectHandlers } = createTypeSelect({
		keyboardDelegate,
		selectionManager,
		onTypeSelect: (key) => selectionManager().select(key)
	});
	const ariaLabelledBy = () => {
		return [context.listboxAriaLabelledBy(), context.valueId()].filter(Boolean).join(" ") || void 0;
	};
	const onPointerDown = (e) => {
		callHandler(e, mergedProps.onPointerDown);
		e.currentTarget.dataset.pointerType = e.pointerType;
		if (!isDisabled() && e.pointerType !== "touch" && e.button === 0) {
			e.preventDefault();
			context.toggle(true);
		}
	};
	const onClick = (e) => {
		callHandler(e, mergedProps.onClick);
		if (!isDisabled() && e.currentTarget.dataset.pointerType === "touch") context.toggle(true);
	};
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		if (isDisabled()) return;
		callHandler(e, typeSelectHandlers.onKeyDown);
		switch (e.key) {
			case "Enter":
			case " ":
			case "ArrowDown":
				e.stopPropagation();
				e.preventDefault();
				context.toggle("first");
				break;
			case "ArrowUp":
				e.stopPropagation();
				e.preventDefault();
				context.toggle("last");
				break;
			case "ArrowLeft": {
				e.preventDefault();
				if (context.isMultiple()) return;
				const firstSelectedKey = selectionManager().firstSelectedKey();
				const key = firstSelectedKey != null ? keyboardDelegate().getKeyAbove?.(firstSelectedKey) : keyboardDelegate().getFirstKey?.();
				if (key != null) selectionManager().select(key);
				break;
			}
			case "ArrowRight": {
				e.preventDefault();
				if (context.isMultiple()) return;
				const firstSelectedKey = selectionManager().firstSelectedKey();
				const key = firstSelectedKey != null ? keyboardDelegate().getKeyBelow?.(firstSelectedKey) : keyboardDelegate().getFirstKey?.();
				if (key != null) selectionManager().select(key);
				break;
			}
		}
	};
	const onFocus = (e) => {
		callHandler(e, mergedProps.onFocus);
		if (selectionManager().isFocused()) return;
		selectionManager().setFocused(true);
	};
	const onBlur = (e) => {
		callHandler(e, mergedProps.onBlur);
		if (context.isOpen()) return;
		selectionManager().setFocused(false);
	};
	createEffect(() => fieldProps.id(), (id) => context.registerTriggerId(id));
	createEffect(() => [fieldProps.ariaLabelledBy(), fieldProps.ariaLabel() && !fieldProps.ariaLabelledBy() ? fieldProps.id() : null].filter(Boolean).join(" ") || void 0, (value) => {
		context.setListboxAriaLabelledBy(value);
	});
	return createComponent(ButtonRoot, mergeProps({
		ref: [context.setTriggerRef, mergedProps.ref],
		get id() {
			return fieldProps.id();
		},
		get disabled() {
			return isDisabled();
		},
		"aria-haspopup": "listbox",
		get ["aria-expanded"]() {
			return context.isOpen() ? "true" : "false";
		},
		get ["aria-controls"]() {
			return memo(() => !!context.isOpen())() ? context.listboxId() : void 0;
		},
		get ["aria-label"]() {
			return fieldProps.ariaLabel();
		},
		get ["aria-labelledby"]() {
			return ariaLabelledBy();
		},
		get ["aria-describedby"]() {
			return fieldProps.ariaDescribedBy();
		},
		onPointerDown,
		onClick,
		onKeyDown,
		onFocus,
		onBlur
	}, () => context.dataset(), () => formControlContext.dataset(), others));
}
//#endregion
//#region src/select/select-value.tsx
/**
* The part that reflects the selected value(s).
*/
function SelectValue(props) {
	const formControlContext = useFormControlContext();
	const context = useSelectContext();
	const mergedProps = merge({ id: context.generateId("value") }, props);
	const others = omit(mergedProps, "id", "children");
	const selectionManager = () => context.listState().selectionManager();
	const isSelectionEmpty = () => {
		const selectedKeys = selectionManager().selectedKeys();
		if (selectedKeys.size === 1 && selectedKeys.has("")) return true;
		return selectionManager().isEmpty();
	};
	createEffect(() => mergedProps.id, (id) => context.registerValueId(id));
	return createComponent(Polymorphic, mergeProps({
		as: "span",
		get id() {
			return mergedProps.id;
		},
		get ["data-placeholder-shown"]() {
			return isSelectionEmpty() ? "" : void 0;
		}
	}, () => formControlContext.dataset(), others, { get children() {
		return createComponent(Show, {
			get when() {
				return !isSelectionEmpty();
			},
			get fallback() {
				return context.placeholder();
			},
			get children() {
				return createComponent(SelectValueChild, {
					state: {
						selectedOption: () => context.selectedOptions()[0],
						selectedOptions: () => context.selectedOptions(),
						remove: (option) => context.removeOptionFromSelection(option),
						clear: () => selectionManager().clearSelection()
					},
					get children() {
						return mergedProps.children;
					}
				});
			}
		});
	} }));
}
function SelectValueChild(props) {
	const resolvedChildren = children(() => {
		const body = props.children;
		return typeof body === "function" ? body(props.state) : body;
	});
	return memo(resolvedChildren);
}
//#endregion
//#region src/select/index.tsx
var select_exports = /* @__PURE__ */ __exportAll({
	Arrow: () => PopperArrow,
	Content: () => SelectContent,
	Description: () => FormControlDescription,
	ErrorMessage: () => FormControlErrorMessage,
	HiddenSelect: () => SelectHiddenSelect,
	Icon: () => SelectIcon,
	Item: () => ListboxItem,
	ItemDescription: () => ListboxItemDescription,
	ItemIndicator: () => ListboxItemIndicator,
	ItemLabel: () => ListboxItemLabel,
	Label: () => SelectLabel,
	Listbox: () => SelectListbox,
	Portal: () => SelectPortal,
	Root: () => SelectRoot,
	Section: () => ListboxSection,
	Select: () => Select,
	Trigger: () => SelectTrigger,
	Value: () => SelectValue,
	useSelectContext: () => useSelectContext
});
const Select = Object.assign(SelectRoot, {
	Arrow: PopperArrow,
	Content: SelectContent,
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	HiddenSelect: SelectHiddenSelect,
	Icon: SelectIcon,
	Item: ListboxItem,
	ItemDescription: ListboxItemDescription,
	ItemIndicator: ListboxItemIndicator,
	ItemLabel: ListboxItemLabel,
	Label: SelectLabel,
	Listbox: SelectListbox,
	Portal: SelectPortal,
	Section: ListboxSection,
	Trigger: SelectTrigger,
	Value: SelectValue
});
//#endregion
export { SelectRoot as a, SelectLabel as c, SelectContent as d, useSelectContext as f, SelectTrigger as i, SelectIcon as l, select_exports as n, SelectPortal as o, SelectValue as r, SelectListbox as s, Select as t, SelectHiddenSelect as u };
