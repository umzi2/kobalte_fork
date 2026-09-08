import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { a as createSelectableCollection, i as createSelectableItem, t as createListState } from "../create-list-state/_aAsgQr7.js";
import { useLocale } from "../i18n/index.js";
import { n as createDomCollection, t as createDomCollectionItem } from "../create-dom-collection/F5MPGch0.js";
import { t as TabsKeyboardDelegate } from "../tabs-keyboard-delegate/DOO8PEm5.js";
import { createComponent, memo, mergeProps } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { Show, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, onSettled, untrack, useContext } from "solid-js";
import { createPresence } from "@solid-primitives/presence";
import { access } from "@solid-primitives/utils";
import { composeEventHandlers } from "@kobalte/utils";
import { isWebKit } from "@solid-primitives/platform";
import { getFocusableTreeWalker } from "@solid-primitives/focus";
import { createResizeObserver } from "@solid-primitives/resize-observer";
//#region src/list/create-single-select-list-state.ts
/**
* Provides state management for list-like components with single selection.
* Handles building a collection of items from props, and manages selection state.
*/
function createSingleSelectListState(props) {
	const [selectedKey, setSelectedKey] = (0, primitives_exports.createControllableSignal)({
		value: () => access(props.selectedKey),
		defaultValue: () => access(props.defaultSelectedKey),
		onChange: (value) => props.onSelectionChange?.(value)
	});
	const selectedKeys = createMemo(() => {
		const selection = selectedKey();
		return selection != null ? [selection] : [];
	});
	const defaultCreateListStateProps = omit(props, "onSelectionChange");
	const createListStateProps = merge(defaultCreateListStateProps, {
		selectionMode: "single",
		disallowEmptySelection: true,
		allowDuplicateSelectionEvents: true,
		selectedKeys,
		onSelectionChange: (keys) => {
			const key = keys.values().next().value;
			if (key === void 0) return;
			if (key === selectedKey()) props.onSelectionChange?.(key);
			setSelectedKey(key);
		}
	});
	const { collection, selectionManager } = createListState(createListStateProps);
	return {
		collection,
		selectionManager,
		selectedKey,
		setSelectedKey,
		selectedItem: createMemo(() => {
			const selection = selectedKey();
			return selection != null ? collection().getItem(selection) : void 0;
		})
	};
}
//#endregion
//#region src/tabs/tabs-context.tsx
const TabsContext = createContext();
function useTabsContext() {
	const context = useContext(TabsContext);
	if (context === void 0) throw new Error("[kobalte]: `useTabsContext` must be used within a `Tabs` component");
	return context;
}
//#endregion
//#region src/tabs/tabs-content.tsx
/**
* Contains the content associated with a tab trigger.
*/
function TabsContent(props) {
	const [ref, setRef] = createSignal();
	const context = useTabsContext();
	const others = omit(props, "ref", "id", "value", "forceMount");
	const [tabIndex, setTabIndex] = createSignal(0);
	const id = () => props.id ?? context.generateContentId(props.value);
	const isSelected = () => context.listState().selectedKey() === props.value;
	const { isMounted: present } = createPresence(() => props.forceMount || isSelected() || void 0, { transitionDuration: 0 });
	createEffect(() => [ref(), present()], ([refEl, isPresent]) => {
		if (refEl == null || !isPresent) return;
		const updateTabIndex = () => {
			const walker = getFocusableTreeWalker(refEl, { tabbable: true });
			setTabIndex(walker.nextNode() ? void 0 : 0);
		};
		updateTabIndex();
		const observer = new MutationObserver(updateTabIndex);
		observer.observe(refEl, {
			subtree: true,
			childList: true,
			attributes: true,
			attributeFilter: ["tabindex", "disabled"]
		});
		return () => observer.disconnect();
	});
	createEffect(() => [props.value, id()], ([value, contentId]) => {
		context.contentIdsMap().set(value, contentId);
	});
	return createComponent(Show, {
		get when() {
			return present();
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "div",
				ref: [setRef, props.ref],
				get id() {
					return id();
				},
				role: "tabpanel",
				get tabindex() {
					return tabIndex();
				},
				get ["aria-labelledby"]() {
					return context.triggerIdsMap().get(props.value);
				},
				get ["data-orientation"]() {
					return context.orientation();
				},
				get ["data-selected"]() {
					return isSelected() ? "" : void 0;
				}
			}, others));
		}
	});
}
//#endregion
//#region src/tabs/tabs-indicator.tsx
/**
* The visual indicator displayed at the bottom of the tab list to indicate the selected tab.
* It provides the base style needed to display a smooth transition to the new selected tab.
*/
function TabsIndicator(props) {
	const context = useTabsContext();
	const others = omit(props, "style");
	const [style, setStyle] = createSignal({
		width: void 0,
		height: void 0
	});
	const { direction } = useLocale();
	const computeStyle = () => {
		const selectedTab = context.selectedTab();
		if (selectedTab == null) return;
		const styleObj = {
			transform: void 0,
			width: void 0,
			height: void 0
		};
		const offset = direction() === "rtl" ? -1 * (selectedTab.offsetParent?.offsetWidth - selectedTab.offsetWidth - selectedTab.offsetLeft) : selectedTab.offsetLeft;
		styleObj.transform = context.orientation() === "vertical" ? `translateY(${selectedTab.offsetTop}px)` : `translateX(${offset}px)`;
		if (context.orientation() === "horizontal") styleObj.width = `${selectedTab.offsetWidth}px`;
		else styleObj.height = `${selectedTab.offsetHeight}px`;
		setStyle(styleObj);
	};
	onSettled(() => {
		queueMicrotask(() => {
			untrack(() => computeStyle());
		});
	});
	createEffect(() => [
		context.selectedTab(),
		context.orientation(),
		direction()
	], () => {
		untrack(() => computeStyle());
	}, { defer: true });
	const [resizing, setResizing] = createSignal(false);
	let timeout = null;
	let prevTarget = null;
	createResizeObserver(context.selectedTab, (_, t) => {
		if (prevTarget !== t) {
			prevTarget = t;
			untrack(() => computeStyle());
			return;
		}
		setResizing(true);
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = null;
			setResizing(false);
		}, 1);
		untrack(() => computeStyle());
	});
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		role: "presentation",
		get style() {
			return combineStyle(style(), props.style);
		},
		get ["data-orientation"]() {
			return context.orientation();
		},
		get ["data-resizing"]() {
			return resizing();
		}
	}, others));
}
//#endregion
//#region src/tabs/tabs-list.tsx
/**
* Contains the tabs that are aligned along the edge of the active tab panel.
*/
function TabsList(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const context = useTabsContext();
	const others = omit(props, "ref", "onKeyDown", "onMouseDown", "onFocusIn", "onFocusOut");
	const { direction } = useLocale();
	const delegate = new TabsKeyboardDelegate(() => context.listState().collection(), direction, context.orientation);
	const selectableCollection = createSelectableCollection({
		selectionManager: () => context.listState().selectionManager(),
		keyboardDelegate: () => delegate,
		selectOnFocus: () => context.activationMode() === "automatic",
		shouldFocusWrap: false,
		disallowEmptySelection: true
	}, ref);
	createEffect(() => {
		if (ref() == null) return null;
		return ref().querySelector(`[data-key="${context.listState().selectedKey()}"]`);
	}, (selectedTab) => {
		if (selectedTab != null) context.setSelectedTab(selectedTab);
	});
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		ref: [setRef, props.ref],
		role: "tablist",
		get ["aria-orientation"]() {
			return context.orientation();
		},
		get ["data-orientation"]() {
			return context.orientation();
		},
		get onKeyDown() {
			return composeEventHandlers([props.onKeyDown, selectableCollection.onKeyDown]);
		},
		get onMouseDown() {
			return composeEventHandlers([props.onMouseDown, selectableCollection.onMouseDown]);
		},
		get onFocusIn() {
			return composeEventHandlers([props.onFocusIn, selectableCollection.onFocusIn]);
		},
		get onFocusOut() {
			return composeEventHandlers([props.onFocusOut, selectableCollection.onFocusOut]);
		}
	}, others));
}
//#endregion
//#region src/tabs/tabs-root.tsx
/**
* A set of layered sections of content, known as tab panels, that display one panel of content at a time.
* `Tabs` contains all the parts of a tabs component and provide context for its children.
*/
function TabsRoot(props) {
	const defaultId = `tabs-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		orientation: "horizontal",
		activationMode: "automatic"
	}, props);
	const others = omit(mergedProps, "value", "defaultValue", "onChange", "orientation", "activationMode", "disabled");
	const [items, setItems] = createSignal([]);
	const [selectedTab, setSelectedTab] = createSignal();
	const { DomCollectionProvider } = createDomCollection({
		items,
		onItemsChange: setItems
	});
	const listState = createSingleSelectListState({
		selectedKey: () => mergedProps.value,
		defaultSelectedKey: () => mergedProps.defaultValue,
		onSelectionChange: (key) => mergedProps.onChange?.(String(key)),
		dataSource: items
	});
	let lastSelectedKey = untrack(() => listState.selectedKey());
	createEffect(() => ({
		selectionManager: listState.selectionManager(),
		collection: listState.collection(),
		currentSelectedKey: listState.selectedKey()
	}), ({ selectionManager, collection, currentSelectedKey }) => {
		let selectedKey = currentSelectedKey;
		if (untrack(() => selectionManager.isEmpty()) || selectedKey == null || !collection.getItem(selectedKey)) {
			selectedKey = collection.getFirstKey();
			let selectedItem = selectedKey != null ? collection.getItem(selectedKey) : void 0;
			while (selectedItem?.disabled && selectedItem.key !== collection.getLastKey()) {
				selectedKey = collection.getKeyAfter(selectedItem.key);
				selectedItem = selectedKey != null ? collection.getItem(selectedKey) : void 0;
			}
			if (selectedItem?.disabled && selectedKey === collection.getLastKey()) selectedKey = collection.getFirstKey();
			if (selectedKey != null) selectionManager.setSelectedKeys([selectedKey]);
		}
		if (untrack(() => selectionManager.focusedKey()) == null || !untrack(() => selectionManager.isFocused()) && selectedKey !== lastSelectedKey) untrack(() => selectionManager.setFocusedKey(selectedKey));
		lastSelectedKey = selectedKey;
	});
	const triggerIdsMap = /* @__PURE__ */ new Map();
	const contentIdsMap = /* @__PURE__ */ new Map();
	const context = {
		isDisabled: () => mergedProps.disabled ?? false,
		orientation: () => mergedProps.orientation,
		activationMode: () => mergedProps.activationMode,
		triggerIdsMap: () => triggerIdsMap,
		contentIdsMap: () => contentIdsMap,
		listState: () => listState,
		selectedTab,
		setSelectedTab,
		generateTriggerId: (value) => `${others.id}-trigger-${value}`,
		generateContentId: (value) => `${others.id}-content-${value}`
	};
	return createComponent(DomCollectionProvider, { get children() {
		return createComponent(TabsContext, {
			value: context,
			get children() {
				return createComponent(Polymorphic, mergeProps({
					as: "div",
					get ["data-orientation"]() {
						return context.orientation();
					}
				}, others));
			}
		});
	} });
}
//#endregion
//#region src/tabs/tabs-trigger.tsx
/**
* The button that activates its associated tab panel.
*/
function TabsTrigger(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const context = useTabsContext();
	const mergedProps = merge({ type: "button" }, props);
	const others = omit(mergedProps, "ref", "id", "value", "disabled", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus");
	const id = () => mergedProps.id ?? context.generateTriggerId(mergedProps.value);
	const isHighlighted = () => context.listState().selectionManager().focusedKey() === mergedProps.value;
	const isDisabled = () => mergedProps.disabled || context.isDisabled();
	const contentId = () => context.contentIdsMap().get(mergedProps.value);
	createDomCollectionItem({ getItem: () => ({
		ref,
		type: "item",
		key: mergedProps.value,
		textValue: "",
		disabled: isDisabled()
	}) });
	const selectableItem = createSelectableItem({
		key: () => mergedProps.value,
		selectionManager: () => context.listState().selectionManager(),
		disabled: isDisabled
	}, ref);
	const onClick = (e) => {
		if (isWebKit) e.currentTarget.focus({ preventScroll: true });
	};
	createEffect(() => [mergedProps.value, id()], ([value, triggerId]) => {
		context.triggerIdsMap().set(value, triggerId);
	});
	return createComponent(Polymorphic, mergeProps({
		as: "button",
		ref: [setRef, mergedProps.ref],
		get id() {
			return id();
		},
		role: "tab",
		get tabindex() {
			return memo(() => !isDisabled())() ? selectableItem.tabIndex() : void 0;
		},
		get disabled() {
			return isDisabled();
		},
		get ["aria-selected"]() {
			return selectableItem.isSelected() ? "true" : "false";
		},
		get ["aria-disabled"]() {
			return isDisabled() ? "true" : void 0;
		},
		get ["aria-controls"]() {
			return memo(() => !!selectableItem.isSelected())() ? contentId() : void 0;
		},
		get ["data-key"]() {
			return selectableItem.dataKey();
		},
		get ["data-orientation"]() {
			return context.orientation();
		},
		get ["data-selected"]() {
			return selectableItem.isSelected() ? "" : void 0;
		},
		get ["data-highlighted"]() {
			return isHighlighted() ? "" : void 0;
		},
		get ["data-disabled"]() {
			return isDisabled() ? "" : void 0;
		},
		get onPointerDown() {
			return composeEventHandlers([mergedProps.onPointerDown, selectableItem.onPointerDown]);
		},
		get onPointerUp() {
			return composeEventHandlers([mergedProps.onPointerUp, selectableItem.onPointerUp]);
		},
		get onClick() {
			return composeEventHandlers([
				mergedProps.onClick,
				selectableItem.onClick,
				onClick
			]);
		},
		get onKeyDown() {
			return composeEventHandlers([mergedProps.onKeyDown, selectableItem.onKeyDown]);
		},
		get onMouseDown() {
			return composeEventHandlers([mergedProps.onMouseDown, selectableItem.onMouseDown]);
		},
		get onFocus() {
			return composeEventHandlers([mergedProps.onFocus, selectableItem.onFocus]);
		}
	}, others));
}
//#endregion
//#region src/tabs/index.tsx
var tabs_exports = /* @__PURE__ */ __exportAll({
	Content: () => TabsContent,
	Indicator: () => TabsIndicator,
	List: () => TabsList,
	Root: () => TabsRoot,
	Tabs: () => Tabs,
	Trigger: () => TabsTrigger,
	useTabsContext: () => useTabsContext
});
const Tabs = Object.assign(TabsRoot, {
	Content: TabsContent,
	Indicator: TabsIndicator,
	List: TabsList,
	Trigger: TabsTrigger
});
//#endregion
export { TabsList as a, useTabsContext as c, TabsRoot as i, createSingleSelectListState as l, tabs_exports as n, TabsIndicator as o, TabsTrigger as r, TabsContent as s, Tabs as t };
