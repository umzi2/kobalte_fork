import { Polymorphic } from "../polymorphic/index.js";
import { t as getItemCount } from "../create-collection/B_KE11tb.js";
import { t as createDisclosureState } from "../create-disclosure-state/DV_ixT98.js";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.js";
import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { a as createSelectableCollection, l as Selection, t as createListState } from "../create-list-state/_aAsgQr7.js";
import { createFilter } from "../i18n/index.js";
import { n as ListKeyboardDelegate } from "../create-selectable-list/rxK-SjAU.js";
import { t as DismissableLayer } from "../dismissable-layer/DXLD03yU.js";
import { n as announce } from "../live-announcer/DugqoFo-.js";
import { a as createFormControl, i as FORM_CONTROL_PROP_NAMES, n as FormControlContext, r as useFormControlContext } from "../form-control-description/BQ1mcKaU.js";
import { n as createFormControlField } from "../create-form-control-field/5-BHfdGI.js";
import { t as Popper } from "../popper/BTyI8BKK.js";
import { i as ListboxRoot } from "../listbox/CwQ1v5ER.js";
import { t as HiddenSelectBase } from "../hidden-select-base/B9qy0bK0.js";
import { Portal, createComponent, memo, mergeProps } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { Show, children, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, untrack, useContext } from "solid-js";
import { createPresence } from "@solid-primitives/presence";
import { access } from "@solid-primitives/utils";
import { callHandler } from "@kobalte/utils";
import { isAppleDevice } from "@solid-primitives/platform";
import { createFocusTrap } from "@solid-primitives/focus";
import { createHideOutside } from "@solid-primitives/interaction";
import { createPreventScroll } from "@solid-primitives/scroll";
import { createFormResetListener } from "@solid-primitives/form";
//#region src/combobox/combobox-context.tsx
const ComboboxContext = createContext();
function useComboboxContext() {
	const context = useContext(ComboboxContext);
	if (context === void 0) throw new Error("[kobalte]: `useComboboxContext` must be used within a `Combobox` component");
	return context;
}
//#endregion
//#region src/combobox/combobox-content.tsx
/**
* The component that pops out when the combobox is open.
*/
function ComboboxContent(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const context = useComboboxContext();
	const others = omit(props, "ref", "style", "onCloseAutoFocus", "onFocusOutside");
	const dismiss = () => {
		context.resetInputValue(context.listState().selectionManager().selectedKeys());
		context.close();
		setTimeout(() => {
			context.close();
		});
	};
	const onFocusOutside = (e) => {
		props.onFocusOutside?.(e);
		if (context.isOpen() && context.isModal()) e.preventDefault();
	};
	createHideOutside({
		disabled: () => !(context.isOpen() && context.isModal()),
		targets: () => {
			const excludedElements = [];
			if (ref()) excludedElements.push(ref());
			const controlEl = context.controlRef();
			if (controlEl) excludedElements.push(controlEl);
			return excludedElements;
		},
		alwaysVisibleSelector: "[data-kb-top-layer], [data-live-announcer]"
	});
	createPreventScroll({
		element: ref,
		enabled: () => context.contentPresent() && context.preventScroll()
	});
	createFocusTrap({
		element: ref,
		enabled: () => context.isOpen() && context.isModal(),
		onInitialFocus: (e) => {
			e.preventDefault();
		},
		onFinalFocus: (e) => {
			props.onCloseAutoFocus?.(e);
			if (!e.defaultPrevented) {
				context.inputRef()?.focus({ preventScroll: true });
				e.preventDefault();
			}
		}
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
						return [context.controlRef];
					},
					get style() {
						return combineStyle({
							"--kb-combobox-content-transform-origin": "var(--kb-popper-content-transform-origin)",
							position: "relative"
						}, props.style);
					},
					onFocusOutside,
					onDismiss: dismiss
				}, () => context.dataset(), others));
			} });
		}
	});
}
//#endregion
//#region src/combobox/combobox-input.tsx
function ComboboxInput(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const formControlContext = useFormControlContext();
	const context = useComboboxContext();
	const mergedProps = merge({ id: context.generateId("input") }, props);
	const formControlFieldProps = omit(mergedProps, "ref", "disabled", "onClick", "onInput", "onKeyDown", "onFocus", "onBlur", "onTouchEnd");
	const others = omit(mergedProps, "ref", "disabled", "onClick", "onInput", "onKeyDown", "onFocus", "onBlur", "onTouchEnd", "id", "aria-label", "aria-labelledby", "aria-describedby");
	const collection = () => context.listState().collection();
	const selectionManager = () => context.listState().selectionManager();
	const isDisabled = () => {
		return mergedProps.disabled || context.isDisabled() || formControlContext.isDisabled();
	};
	const { fieldProps } = createFormControlField(formControlFieldProps);
	const onClick = (e) => {
		callHandler(e, mergedProps.onClick);
		if (context.triggerMode() === "focus" && !context.isOpen()) context.open(false, "focus");
	};
	const onInput = (e) => {
		callHandler(e, mergedProps.onInput);
		if (formControlContext.isReadOnly() || isDisabled()) return;
		const target = e.target;
		context.setInputValue(target.value);
		if (context.isOpen()) {
			if (collection().getSize() <= 0 && !context.allowsEmptyCollection()) context.close();
		} else if (collection().getSize() > 0 || context.allowsEmptyCollection()) context.open(false, "input");
	};
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		if (formControlContext.isReadOnly() || isDisabled()) return;
		if (context.isOpen()) callHandler(e, context.onInputKeyDown);
		switch (e.key) {
			case "Enter":
				if (context.isOpen()) {
					e.preventDefault();
					const focusedKey = selectionManager().focusedKey();
					if (focusedKey != null) selectionManager().select(focusedKey);
				}
				break;
			case "Tab":
				if (context.isOpen()) {
					context.close();
					context.resetInputValue(context.listState().selectionManager().selectedKeys());
				}
				break;
			case "Escape":
				if (context.isOpen()) {
					context.close();
					context.resetInputValue(context.listState().selectionManager().selectedKeys());
				} else context.setInputValue("");
				break;
			case "ArrowDown":
				if (!context.isOpen()) context.open(e.altKey ? false : "first", "manual");
				break;
			case "ArrowUp":
				if (!context.isOpen()) context.open("last", "manual");
				else if (e.altKey) {
					context.close();
					context.resetInputValue(context.listState().selectionManager().selectedKeys());
				}
				break;
			case "ArrowLeft":
			case "ArrowRight":
				selectionManager().setFocusedKey(void 0);
				break;
			case "Backspace": if (context.removeOnBackspace() && selectionManager().selectionMode() === "multiple" && context.inputValue() === "") {
				const lastSelectedKey = [...selectionManager().selectedKeys()].pop() ?? "";
				selectionManager().toggleSelection(lastSelectedKey);
			}
		}
	};
	const onFocus = (e) => {
		callHandler(e, mergedProps.onFocus);
		if (context.isInputFocused()) return;
		context.setIsInputFocused(true);
	};
	const onBlur = (e) => {
		callHandler(e, mergedProps.onBlur);
		if (context.controlRef()?.contains(e.relatedTarget) || context.contentRef()?.contains(e.relatedTarget)) return;
		context.setIsInputFocused(false);
	};
	let lastEventTime = 0;
	const onTouchEnd = (e) => {
		callHandler(e, mergedProps.onTouchEnd);
		const inputEl = ref();
		if (!inputEl || formControlContext.isReadOnly() || isDisabled()) return;
		if (e.timeStamp - lastEventTime < 500) {
			e.preventDefault();
			inputEl.focus();
			return;
		}
		const rect = e.target.getBoundingClientRect();
		const touch = e.changedTouches[0];
		const centerX = Math.ceil(rect.left + .5 * rect.width);
		const centerY = Math.ceil(rect.top + .5 * rect.height);
		if (touch.clientX === centerX && touch.clientY === centerY) {
			e.preventDefault();
			inputEl.focus();
			context.toggle(false, "manual");
			lastEventTime = e.timeStamp;
		}
	};
	return createComponent(Polymorphic, mergeProps({
		as: "input",
		ref: [(el) => {
			context.setInputRef(el);
			setRef(el);
		}, mergedProps.ref],
		get id() {
			return fieldProps.id();
		},
		get value() {
			return context.inputValue();
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
		get placeholder() {
			return context.placeholder();
		},
		type: "text",
		role: "combobox",
		autoComplete: "off",
		autoCorrect: "off",
		spellCheck: "false",
		"aria-haspopup": "listbox",
		"aria-autocomplete": "list",
		get ["aria-expanded"]() {
			return context.isOpen() ? "true" : "false";
		},
		get ["aria-controls"]() {
			return memo(() => !!context.isOpen())() ? context.listboxId() : void 0;
		},
		get ["aria-activedescendant"]() {
			return context.activeDescendant();
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
		onClick,
		onInput,
		onKeyDown,
		onFocus,
		onBlur,
		onTouchEnd
	}, () => context.dataset(), () => formControlContext.dataset(), others));
}
//#endregion
//#region src/combobox/combobox-listbox.tsx
/**
* Contains all the items of a `Combobox`.
*/
function ComboboxListbox(props) {
	const formControlContext = useFormControlContext();
	const context = useComboboxContext();
	const mergedProps = merge({ id: context.generateId("listbox") }, props);
	const others = omit(mergedProps, "ref");
	const ariaLabelledBy = () => {
		return formControlContext.getAriaLabelledBy(others.id, context.listboxAriaLabel(), void 0);
	};
	createEffect(() => others.id, (id) => context.registerListboxId(id));
	return createComponent(ListboxRoot, mergeProps({
		ref: [context.setListboxRef, mergedProps.ref],
		get state() {
			return context.listState();
		},
		get autoFocus() {
			return context.autoFocus();
		},
		shouldUseVirtualFocus: true,
		shouldSelectOnPressUp: true,
		shouldFocusOnHover: true,
		get ["aria-label"]() {
			return context.listboxAriaLabel();
		},
		get ["aria-labelledby"]() {
			return ariaLabelledBy();
		},
		get renderItem() {
			return context.renderItem;
		},
		get renderSection() {
			return context.renderSection;
		},
		get virtualized() {
			return context.isVirtualized();
		}
	}, others));
}
//#endregion
//#region src/combobox/combobox-portal.tsx
/**
* Portals its children into the `body` when the combobox is open.
*/
function ComboboxPortal(props) {
	const context = useComboboxContext();
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
//#region src/combobox/combobox-control.tsx
/**
* Contains the combobox input and trigger.
*/
function ComboboxControl(props) {
	const formControlContext = useFormControlContext();
	const context = useComboboxContext();
	const others = omit(props, "ref", "children");
	const selectionManager = () => context.listState().selectionManager();
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		ref: [context.setControlRef, props.ref]
	}, () => context.dataset(), () => formControlContext.dataset(), others, { get children() {
		return createComponent(ComboboxControlChild, {
			state: {
				selectedOptions: () => context.selectedOptions(),
				remove: (option) => context.removeOptionFromSelection(option),
				clear: () => selectionManager().clearSelection()
			},
			get children() {
				return props.children;
			}
		});
	} }));
}
function ComboboxControlChild(props) {
	const resolvedChildren = children(() => {
		const body = props.children;
		return typeof body === "function" ? body(props.state) : body;
	});
	return memo(resolvedChildren);
}
//#endregion
//#region src/combobox/combobox-hidden-select.tsx
function ComboboxHiddenSelect(props) {
	const context = useComboboxContext();
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
		focusTrigger: () => context.inputRef()?.focus({ preventScroll: true })
	}, props));
}
//#endregion
//#region src/combobox/combobox-icon.tsx
/**
* A small icon often displayed next to the value as a visual affordance for the fact it can be open.
* It renders a `▼` by default, but you can use your own icon `children`.
*/
function ComboboxIcon(props) {
	const context = useComboboxContext();
	const mergedProps = merge({ children: "▼" }, props);
	return createComponent(Polymorphic, mergeProps({
		as: "span",
		"aria-hidden": "true"
	}, () => context.dataset(), mergedProps));
}
//#endregion
//#region src/combobox/combobox.intl.ts
const COMBOBOX_INTL_TRANSLATIONS = {
	focusAnnouncement: (optionText, isSelected) => `${optionText}${isSelected ? ", selected" : ""}`,
	countAnnouncement: (optionCount) => {
		switch (optionCount) {
			case 1: return "one option available";
			default: `${optionCount}`;
		}
	},
	selectedAnnouncement: (optionText) => `${optionText}, selected`,
	triggerLabel: "Show suggestions",
	listboxLabel: "Suggestions"
};
//#endregion
//#region src/combobox/combobox-base.tsx
/**
* Base component for a combobox, provide context for its children.
*/
function ComboboxBase(props) {
	const defaultId = `combobox-${createUniqueId()}`;
	const filter = createFilter({ sensitivity: "base" });
	const mergedProps = merge({
		id: defaultId,
		selectionMode: "single",
		allowsEmptyCollection: false,
		disallowEmptySelection: false,
		allowDuplicateSelectionEvents: true,
		closeOnSelection: props.selectionMode === "single",
		removeOnBackspace: true,
		gutter: 8,
		sameWidth: true,
		modal: false,
		defaultFilter: "contains",
		triggerMode: "input",
		translations: COMBOBOX_INTL_TRANSLATIONS
	}, props);
	const _rest = omit(mergedProps, "noResetInputOnBlur", "translations", "itemComponent", "sectionComponent", "open", "defaultOpen", "onOpenChange", "onInputChange", "value", "defaultValue", "onChange", "triggerMode", "placeholder", "options", "optionValue", "optionTextValue", "optionLabel", "optionDisabled", "optionGroupChildren", "keyboardDelegate", "allowDuplicateSelectionEvents", "disallowEmptySelection", "defaultFilter", "shouldFocusWrap", "allowsEmptyCollection", "closeOnSelection", "removeOnBackspace", "selectionBehavior", "selectionMode", "virtualized", "modal", "preventScroll", "forceMount");
	const popperProps = omit(_rest, ...FORM_CONTROL_PROP_NAMES);
	const formControlProps = omit(_rest, "getAnchorRect", "placement", "gutter", "shift", "flip", "slide", "overlap", "sameWidth", "fitViewport", "hideWhenDetached", "detachedPadding", "arrowPadding", "overflowPadding");
	const others = omit(_rest, "getAnchorRect", "placement", "gutter", "shift", "flip", "slide", "overlap", "sameWidth", "fitViewport", "hideWhenDetached", "detachedPadding", "arrowPadding", "overflowPadding", ...FORM_CONTROL_PROP_NAMES);
	const [listboxId, setListboxId] = createSignal(void 0, { ownedWrite: true });
	const [controlRef, setControlRef] = createSignal(void 0, { ownedWrite: true });
	const [inputRef, setInputRef] = createSignal(void 0, { ownedWrite: true });
	const [triggerRef, setTriggerRef] = createSignal(void 0, { ownedWrite: true });
	const [contentRef, setContentRef] = createSignal(void 0, { ownedWrite: true });
	const [listboxRef, setListboxRef] = createSignal(void 0, { ownedWrite: true });
	const [focusStrategy, setFocusStrategy] = createSignal(false);
	const [isInputFocused, setIsInputFocusedState] = createSignal(false);
	const [showAllOptions, setShowAllOptions] = createSignal(false);
	const [lastDisplayedOptions, setLastDisplayedOptions] = createSignal(mergedProps.options);
	const disclosureState = createDisclosureState({
		open: () => mergedProps.open,
		defaultOpen: () => mergedProps.defaultOpen,
		onOpenChange: (isOpen) => mergedProps.onOpenChange?.(isOpen, openTriggerMode)
	});
	const [inputValue, setInputValue] = (0, primitives_exports.createControllableSignal)({
		defaultValue: () => "",
		onChange: (value) => {
			mergedProps.onInputChange?.(value);
			if (value === "" && mergedProps.selectionMode === "single" && !listState.selectionManager().isEmpty() && mergedProps.value === void 0) listState.selectionManager().setSelectedKeys([]);
			listState.selectionManager().setFocusedKey(void 0);
		}
	});
	const getOptionValue = (option) => {
		const optionValue = mergedProps.optionValue;
		if (optionValue == null) return String(option);
		return String(typeof optionValue === "function" ? optionValue(option) : option[optionValue]);
	};
	const getOptionLabel = (option) => {
		const optionLabel = mergedProps.optionLabel;
		if (optionLabel == null) return String(option);
		return String(typeof optionLabel === "function" ? optionLabel(option) : option[optionLabel]);
	};
	const getOptionTextValue = (option) => {
		const optionTextValue = mergedProps.optionTextValue;
		if (optionTextValue == null) return String(option);
		return String(typeof optionTextValue === "function" ? optionTextValue(option) : option[optionTextValue]);
	};
	const allOptions = createMemo(() => {
		const optionGroupChildren = mergedProps.optionGroupChildren;
		if (optionGroupChildren == null) return mergedProps.options;
		return mergedProps.options.flatMap((item) => item[optionGroupChildren] ?? item);
	});
	const filteredOptions = createMemo(() => {
		const inputVal = inputValue() ?? "";
		const defaultFilter = mergedProps.defaultFilter;
		const optionGroupChildren = mergedProps.optionGroupChildren;
		const filterFn = (option) => {
			if (typeof defaultFilter === "function") return defaultFilter(option, inputVal) ?? false;
			const textVal = getOptionTextValue(option);
			switch (defaultFilter) {
				case "startsWith": return filter.startsWith(textVal, inputVal);
				case "endsWith": return filter.endsWith(textVal, inputVal);
				case "contains": return filter.contains(textVal, inputVal);
				default: return true;
			}
		};
		if (optionGroupChildren == null) return mergedProps.options.filter(filterFn);
		const filteredGroups = [];
		for (const optGroup of mergedProps.options) {
			const filteredChildrenOptions = optGroup[optionGroupChildren].filter(filterFn);
			if (filteredChildrenOptions.length === 0) continue;
			filteredGroups.push({
				...optGroup,
				[optionGroupChildren]: filteredChildrenOptions
			});
		}
		return filteredGroups;
	});
	const displayedOptions = createMemo(() => {
		if (disclosureState.isOpen()) {
			if (showAllOptions()) return mergedProps.options;
			return filteredOptions();
		}
		return lastDisplayedOptions();
	});
	let openTriggerMode = "focus";
	const getOptionsFromValues = (values) => {
		return [...values].map((value) => allOptions().find((option) => getOptionValue(option) === value)).filter((option) => option != null);
	};
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
			if (mergedProps.closeOnSelection) {
				if (disclosureState.isOpen() && selectedKeys.size > 0) {
					close();
					setTimeout(close);
				}
			}
			const inputEl = inputRef();
			if (inputEl) {
				inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
				inputEl.focus({ preventScroll: true });
			}
		},
		allowDuplicateSelectionEvents: () => access(mergedProps.allowDuplicateSelectionEvents),
		disallowEmptySelection: () => mergedProps.disallowEmptySelection,
		selectionBehavior: () => access(mergedProps.selectionBehavior),
		selectionMode: () => mergedProps.selectionMode,
		dataSource: displayedOptions,
		getKey: () => mergedProps.optionValue ?? ((item) => String(item)),
		getTextValue: () => mergedProps.optionTextValue ?? ((item) => String(item)),
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
	const open = (focusStrategy, triggerMode) => {
		if (mergedProps.triggerMode === "manual" && triggerMode !== "manual") return;
		if (!(setShowAllOptions(triggerMode === "manual") ? mergedProps.options.length > 0 : filteredOptions().length > 0) && !mergedProps.allowsEmptyCollection) return;
		openTriggerMode = triggerMode;
		setFocusStrategy(focusStrategy);
		disclosureState.open();
		let focusedKey = listState.selectionManager().firstSelectedKey();
		if (focusedKey == null) {
			if (focusStrategy === "first") focusedKey = listState.collection().getFirstKey();
			else if (focusStrategy === "last") focusedKey = listState.collection().getLastKey();
		}
		listState.selectionManager().setFocused(true);
		listState.selectionManager().setFocusedKey(focusedKey);
	};
	const close = () => {
		disclosureState.close();
		listState.selectionManager().setFocused(false);
		listState.selectionManager().setFocusedKey(void 0);
	};
	const toggle = (focusStrategy, triggerMode) => {
		if (disclosureState.isOpen()) close();
		else open(focusStrategy, triggerMode);
	};
	const { formControlContext } = createFormControl(formControlProps);
	createFormResetListener(inputRef, () => {
		const defaultSelectedKeys = mergedProps.defaultValue ? [...mergedProps.defaultValue].map(getOptionValue) : new Selection();
		listState.selectionManager().setSelectedKeys(defaultSelectedKeys);
	});
	const delegate = createMemo(() => {
		const keyboardDelegate = access(mergedProps.keyboardDelegate);
		if (keyboardDelegate) return keyboardDelegate;
		return new ListKeyboardDelegate(listState.collection, listboxRef, void 0);
	});
	const selectableCollection = createSelectableCollection({
		selectionManager: () => listState.selectionManager(),
		keyboardDelegate: delegate,
		disallowTypeAhead: true,
		disallowEmptySelection: true,
		shouldFocusWrap: () => mergedProps.shouldFocusWrap,
		isVirtualized: true
	}, inputRef);
	const setIsInputFocused = (isFocused) => {
		if (isFocused && mergedProps.triggerMode === "focus") open(false, "focus");
		setIsInputFocusedState(isFocused);
		listState.selectionManager().setFocused(isFocused);
	};
	const activeDescendant = createMemo(() => {
		const focusedKey = listState.selectionManager().focusedKey();
		if (focusedKey) return listboxRef()?.querySelector(`[data-key="${focusedKey}"]`)?.id;
	});
	const resetInputValue = (selectedKeys) => {
		if (mergedProps.selectionMode === "single") {
			const selectedKey = [...selectedKeys][0];
			const selectedOption = allOptions().find((option) => getOptionValue(option) === selectedKey);
			if (mergedProps.noResetInputOnBlur && !selectedOption) return;
			setInputValue(selectedOption ? getOptionLabel(selectedOption) : "");
		} else {
			if (mergedProps.noResetInputOnBlur) return;
			setInputValue("");
		}
	};
	const renderItem = (item) => {
		return mergedProps.itemComponent?.({ item });
	};
	const renderSection = (section) => {
		return mergedProps.sectionComponent?.({ section });
	};
	createEffect(() => [filteredOptions(), showAllOptions()], (input, prevInput) => {
		if (untrack(() => disclosureState.isOpen()) && prevInput != null) {
			const [prevFilteredOptions, prevShowAllOptions] = prevInput;
			setLastDisplayedOptions(prevShowAllOptions ? mergedProps.options : prevFilteredOptions);
		} else {
			const [curFilteredOptions, curShowAllOptions] = input;
			setLastDisplayedOptions(curShowAllOptions ? mergedProps.options : curFilteredOptions);
		}
	});
	createEffect(inputValue, () => {
		if (showAllOptions()) setShowAllOptions(false);
	});
	createEffect(() => listState.selectionManager().selectedKeys(), resetInputValue);
	let lastAnnouncedFocusedKey = "";
	createEffect(() => {
		const focusedKey = listState.selectionManager().focusedKey() ?? "";
		return {
			focusedKey,
			focusedItem: listState.collection().getItem(focusedKey),
			isSelected: focusedKey ? listState.selectionManager().isSelected(focusedKey) : false
		};
	}, ({ focusedKey, focusedItem, isSelected }) => {
		if (isAppleDevice && focusedItem != null && focusedKey !== lastAnnouncedFocusedKey) {
			const announcement = mergedProps.translations?.focusAnnouncement(focusedItem?.textValue || "", isSelected) ?? "";
			announce(announcement);
		}
		if (focusedKey) lastAnnouncedFocusedKey = focusedKey;
	});
	let lastOptionCount = getItemCount(listState.collection());
	let lastOpen = disclosureState.isOpen();
	createEffect(() => {
		return {
			optionCount: getItemCount(listState.collection()),
			isOpen: disclosureState.isOpen(),
			focusedKey: listState.selectionManager().focusedKey()
		};
	}, ({ optionCount, isOpen, focusedKey }) => {
		if (isOpen && (isOpen !== lastOpen && (focusedKey == null || isAppleDevice) || optionCount !== lastOptionCount)) {
			const announcement = mergedProps.translations?.countAnnouncement(optionCount) ?? "";
			announce(announcement);
		}
		lastOptionCount = optionCount;
		lastOpen = isOpen;
	});
	let lastAnnouncedSelectedKey = "";
	createEffect(() => {
		const lastSelectedKey = [...listState.selectionManager().selectedKeys()].pop() ?? "";
		return {
			lastSelectedKey,
			lastSelectedItem: listState.collection().getItem(lastSelectedKey)
		};
	}, ({ lastSelectedKey, lastSelectedItem }) => {
		if (isAppleDevice && untrack(isInputFocused) && lastSelectedItem && lastSelectedKey !== lastAnnouncedSelectedKey) {
			const announcement = mergedProps.translations?.selectedAnnouncement(lastSelectedItem?.textValue || "") ?? "";
			announce(announcement);
		}
		if (lastSelectedKey) lastAnnouncedSelectedKey = lastSelectedKey;
	});
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
		allowsEmptyCollection: () => mergedProps.allowsEmptyCollection ?? false,
		shouldFocusWrap: () => mergedProps.shouldFocusWrap ?? false,
		removeOnBackspace: () => mergedProps.removeOnBackspace ?? true,
		selectedOptions,
		isInputFocused,
		contentPresent,
		autoFocus: focusStrategy,
		inputValue,
		triggerMode: () => mergedProps.triggerMode,
		activeDescendant,
		controlRef,
		inputRef,
		triggerRef,
		contentRef,
		listState: () => listState,
		keyboardDelegate: delegate,
		listboxId,
		triggerAriaLabel: () => mergedProps.translations?.triggerLabel,
		listboxAriaLabel: () => mergedProps.translations?.listboxLabel,
		setIsInputFocused,
		resetInputValue,
		setInputValue,
		setControlRef,
		setInputRef,
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
		onInputKeyDown: (e) => selectableCollection.onKeyDown(e),
		generateId: (suffix) => `${access(formControlProps.id)}-${suffix}`,
		registerListboxId: createRegisterId(setListboxId)
	};
	return createComponent(FormControlContext, {
		value: formControlContext,
		get children() {
			return createComponent(ComboboxContext, {
				value: context,
				get children() {
					return createComponent(Popper, mergeProps({
						anchorRef: controlRef,
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
export { ComboboxPortal as a, ComboboxContent as c, ComboboxControl as i, useComboboxContext as l, ComboboxIcon as n, ComboboxListbox as o, ComboboxHiddenSelect as r, ComboboxInput as s, ComboboxBase as t };
