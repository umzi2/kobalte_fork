import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { Polymorphic } from "../polymorphic/index.jsx";
import { t as primitives_exports } from "../primitives/BlSoAAAV.jsx";
import { a as createSelectableCollection, i as createSelectableItem, t as createListState } from "../create-list-state/B3LSQwLh.jsx";
import { useLocale } from "../i18n/index.jsx";
import { n as createDomCollection, t as createDomCollectionItem } from "../create-dom-collection/F5MPGch0.jsx";
import { t as TabsKeyboardDelegate } from "../tabs-keyboard-delegate/DOO8PEm5.jsx";
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
	return <Show when={present()}>
			<Polymorphic as="div" ref={[setRef, props.ref]} id={id()} role="tabpanel" tabindex={tabIndex()} aria-labelledby={context.triggerIdsMap().get(props.value)} data-orientation={context.orientation()} data-selected={isSelected() ? "" : void 0} {...others} />
		</Show>;
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
	return <Polymorphic as="div" role="presentation" style={combineStyle(style(), props.style)} data-orientation={context.orientation()} data-resizing={resizing()} {...others} />;
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
	return <Polymorphic as="div" ref={[setRef, props.ref]} role="tablist" aria-orientation={context.orientation()} data-orientation={context.orientation()} onKeyDown={composeEventHandlers([props.onKeyDown, selectableCollection.onKeyDown])} onMouseDown={composeEventHandlers([props.onMouseDown, selectableCollection.onMouseDown])} onFocusIn={composeEventHandlers([props.onFocusIn, selectableCollection.onFocusIn])} onFocusOut={composeEventHandlers([props.onFocusOut, selectableCollection.onFocusOut])} {...others} />;
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
	return <DomCollectionProvider>
			<TabsContext value={context}>
				<Polymorphic as="div" data-orientation={context.orientation()} {...others} />
			</TabsContext>
		</DomCollectionProvider>;
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
	return <Polymorphic as="button" ref={[setRef, mergedProps.ref]} id={id()} role="tab" tabindex={!isDisabled() ? selectableItem.tabIndex() : void 0} disabled={isDisabled()} aria-selected={selectableItem.isSelected() ? "true" : "false"} aria-disabled={isDisabled() ? "true" : void 0} aria-controls={selectableItem.isSelected() ? contentId() : void 0} data-key={selectableItem.dataKey()} data-orientation={context.orientation()} data-selected={selectableItem.isSelected() ? "" : void 0} data-highlighted={isHighlighted() ? "" : void 0} data-disabled={isDisabled() ? "" : void 0} onPointerDown={composeEventHandlers([mergedProps.onPointerDown, selectableItem.onPointerDown])} onPointerUp={composeEventHandlers([mergedProps.onPointerUp, selectableItem.onPointerUp])} onClick={composeEventHandlers([
		mergedProps.onClick,
		selectableItem.onClick,
		onClick
	])} onKeyDown={composeEventHandlers([mergedProps.onKeyDown, selectableItem.onKeyDown])} onMouseDown={composeEventHandlers([mergedProps.onMouseDown, selectableItem.onMouseDown])} onFocus={composeEventHandlers([mergedProps.onFocus, selectableItem.onFocus])} {...others} />;
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
