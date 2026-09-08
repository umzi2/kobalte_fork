import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { a as createSelectableCollection, i as createSelectableItem, t as createListState } from "../create-list-state/_aAsgQr7.js";
import { useLocale } from "../i18n/index.js";
import { n as createDomCollection, t as createDomCollectionItem } from "../create-dom-collection/F5MPGch0.js";
import { t as TabsKeyboardDelegate } from "../tabs-keyboard-delegate/DOO8PEm5.js";
import { r as ToggleButtonRoot } from "../toggle-button/BCZ4UVwo.js";
import { createComponent, memo, mergeProps } from "@solidjs/web";
import { createContext, createMemo, createSignal, createUniqueId, merge, omit, useContext } from "solid-js";
import { callHandler, composeEventHandlers } from "@kobalte/utils";
//#region src/toggle-group/toggle-group-context.tsx
const ToggleGroupContext = createContext();
function useToggleGroupContext() {
	const context = useContext(ToggleGroupContext);
	if (context === void 0) throw new Error("[kobalte]: `useToggleGroupContext` must be used within a `ToggleGroup` component");
	return context;
}
//#endregion
//#region src/toggle-group/toggle-group-item.tsx
function ToggleGroupItem(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const rootContext = useToggleGroupContext();
	const defaultID = rootContext.generateId(`item-${createUniqueId()}`);
	const mergedProps = merge({ id: defaultID }, props);
	const others = omit(mergedProps, "ref", "value", "disabled", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus");
	const selectionManager = () => rootContext.listState().selectionManager();
	const isDisabled = () => rootContext.isDisabled() || mergedProps.disabled;
	createDomCollectionItem({ getItem: () => ({
		ref,
		type: "item",
		key: mergedProps.value,
		textValue: "",
		disabled: mergedProps.disabled || rootContext.isDisabled()
	}) });
	const selectableItem = createSelectableItem({
		key: () => mergedProps.value,
		selectionManager,
		disabled: isDisabled
	}, ref);
	const onKeyDown = (e) => {
		if (["Enter", " "].includes(e.key)) e.preventDefault();
		callHandler(e, mergedProps.onKeyDown);
		callHandler(e, selectableItem.onKeyDown);
	};
	return createComponent(ToggleButtonRoot, mergeProps({
		ref: [setRef, mergedProps.ref],
		get pressed() {
			return selectionManager().isSelected(mergedProps.value);
		},
		get tabindex() {
			return selectableItem.tabIndex();
		},
		get ["data-orientation"]() {
			return rootContext.orientation();
		},
		get disabled() {
			return isDisabled();
		},
		get onPointerDown() {
			return composeEventHandlers([mergedProps.onPointerDown, selectableItem.onPointerDown]);
		},
		get onPointerUp() {
			return composeEventHandlers([mergedProps.onPointerUp, selectableItem.onPointerUp]);
		},
		get onClick() {
			return composeEventHandlers([mergedProps.onClick, selectableItem.onClick]);
		},
		onKeyDown,
		get onMouseDown() {
			return composeEventHandlers([mergedProps.onMouseDown, selectableItem.onMouseDown]);
		},
		get onFocus() {
			return composeEventHandlers([mergedProps.onFocus, selectableItem.onFocus]);
		}
	}, others));
}
//#endregion
//#region src/toggle-group/toggle-group-base.tsx
function ToggleGroupBase(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const defaultId = `group-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		selectionMode: "single",
		orientation: "horizontal"
	}, props);
	const others = omit(mergedProps, "ref", "value", "defaultValue", "disabled", "orientation", "selectionMode", "onChange", "onKeyDown", "onMouseDown", "onFocusIn", "onFocusOut");
	const [items, setItems] = createSignal([]);
	const { DomCollectionProvider } = createDomCollection({
		items,
		onItemsChange: setItems
	});
	const listState = createListState({
		selectedKeys: () => mergedProps.value,
		defaultSelectedKeys: () => mergedProps.defaultValue,
		onSelectionChange: (key) => mergedProps.onChange?.(Array.from(key)),
		disallowEmptySelection: false,
		selectionMode: () => mergedProps.selectionMode,
		dataSource: items
	});
	const { direction } = useLocale();
	const delegate = new TabsKeyboardDelegate(() => context.listState().collection(), direction, () => mergedProps.orientation);
	const selectableList = createSelectableCollection({
		selectionManager: () => listState.selectionManager(),
		keyboardDelegate: () => delegate,
		disallowEmptySelection: () => listState.selectionManager().disallowEmptySelection(),
		disallowTypeAhead: true
	}, ref);
	const context = {
		listState: () => listState,
		isDisabled: () => mergedProps.disabled ?? false,
		isMultiple: () => mergedProps.selectionMode === "multiple",
		generateId: (suffix) => `${others.id}-${suffix}`,
		orientation: () => mergedProps.orientation
	};
	return createComponent(DomCollectionProvider, { get children() {
		return createComponent(ToggleGroupContext, {
			value: context,
			get children() {
				return createComponent(Polymorphic, mergeProps({
					as: "div",
					role: "group",
					ref: [setRef, mergedProps.ref],
					get tabindex() {
						return memo(() => !mergedProps.disabled)() ? selectableList.tabIndex() : void 0;
					},
					get ["data-orientation"]() {
						return mergedProps.orientation;
					},
					get onKeyDown() {
						return composeEventHandlers([mergedProps.onKeyDown, selectableList.onKeyDown]);
					},
					get onMouseDown() {
						return composeEventHandlers([mergedProps.onMouseDown, selectableList.onMouseDown]);
					},
					get onFocusIn() {
						return composeEventHandlers([mergedProps.onFocusIn, selectableList.onFocusIn]);
					},
					get onFocusOut() {
						return composeEventHandlers([mergedProps.onFocusOut, selectableList.onFocusOut]);
					}
				}, others));
			}
		});
	} });
}
//#endregion
//#region src/toggle-group/toggle-group-root.tsx
function ToggleGroup$1(props) {
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
		if (props.multiple) props.onChange?.(value);
		else props.onChange?.(value[0] ?? null);
	};
	return createComponent(ToggleGroupBase, mergeProps({
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
//#region src/toggle-group/index.tsx
var toggle_group_exports = /* @__PURE__ */ __exportAll({
	Item: () => ToggleGroupItem,
	Root: () => ToggleGroup$1,
	ToggleGroup: () => ToggleGroup,
	useToggleGroupContext: () => useToggleGroupContext
});
const ToggleGroup = Object.assign(ToggleGroup$1, { Item: ToggleGroupItem });
//#endregion
export { useToggleGroupContext as a, ToggleGroupItem as i, toggle_group_exports as n, ToggleGroup$1 as r, ToggleGroup as t };
