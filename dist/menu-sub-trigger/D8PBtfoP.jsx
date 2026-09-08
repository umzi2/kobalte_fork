import { Polymorphic } from "../polymorphic/index.jsx";
import { t as createDisclosureState } from "../create-disclosure-state/DV_ixT98.jsx";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.jsx";
import { t as createTagName } from "../create-tag-name/D6_aBB9R.jsx";
import { t as createToggleState } from "../create-toggle-state/CF70_KE4.jsx";
import { t as primitives_exports } from "../primitives/BlSoAAAV.jsx";
import { n as button_exports } from "../button/Cw4fT4wG.jsx";
import { i as createSelectableItem, t as createListState } from "../create-list-state/B3LSQwLh.jsx";
import { useLocale } from "../i18n/index.jsx";
import { t as createSelectableList } from "../create-selectable-list/v5tGftTG.jsx";
import { a as useOptionalDomCollectionContext, n as createDomCollection, t as createDomCollectionItem } from "../create-dom-collection/F5MPGch0.jsx";
import { t as DismissableLayer } from "../dismissable-layer/RyRdwdaj.jsx";
import { t as Popper } from "../popper/BSUmx7sN.jsx";
import { combineStyle } from "@solid-primitives/props";
import { Show, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, onCleanup, untrack, useContext } from "solid-js";
import { createPresence } from "@solid-primitives/presence";
import { Portal, isServer } from "@solidjs/web";
import { callHandler, composeEventHandlers, isPointInPolygon } from "@kobalte/utils";
import { createFocusTrap } from "@solid-primitives/focus";
import { createHideOutside } from "@solid-primitives/interaction";
import { createPreventScroll } from "@solid-primitives/scroll";
//#region src/menubar/menubar-context.tsx
const MenubarContext = createContext(null);
function useOptionalMenubarContext() {
	return useContext(MenubarContext) ?? void 0;
}
function useMenubarContext() {
	const context = useOptionalMenubarContext();
	if (context === void 0) throw new Error("[kobalte]: `useMenubarContext` must be used within a `Menubar` component");
	return context;
}
//#endregion
//#region src/navigation-menu/navigation-menu-context.tsx
const NavigationMenuContext = createContext(null);
function useOptionalNavigationMenuContext() {
	return useContext(NavigationMenuContext) ?? void 0;
}
function useNavigationMenuContext() {
	const context = useOptionalNavigationMenuContext();
	if (context === void 0) throw new Error("[kobalte]: `useNavigationMenuContext` must be used within a `NavigationMenu` component");
	return context;
}
//#endregion
//#region src/menu/menu-context.tsx
const MenuContext = createContext(null);
function useOptionalMenuContext() {
	return useContext(MenuContext) ?? void 0;
}
function useMenuContext() {
	const context = useOptionalMenuContext();
	if (context === void 0) throw new Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");
	return context;
}
//#endregion
//#region src/menu/menu-root-context.tsx
const MenuRootContext = createContext();
function useMenuRootContext() {
	const context = useContext(MenuRootContext);
	if (context === void 0) throw new Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");
	return context;
}
//#endregion
//#region src/menu/utils.ts
/**
* Construct a polygon based on pointer clientX/clientY and an element bounding rect.
*/
function getPointerGraceArea(placement, event, contentEl) {
	const basePlacement = placement.split("-")[0];
	const contentRect = contentEl.getBoundingClientRect();
	const polygon = [];
	const pointerX = event.clientX;
	const pointerY = event.clientY;
	switch (basePlacement) {
		case "top":
			polygon.push([pointerX, pointerY + 5]);
			polygon.push([contentRect.left, contentRect.bottom]);
			polygon.push([contentRect.left, contentRect.top]);
			polygon.push([contentRect.right, contentRect.top]);
			polygon.push([contentRect.right, contentRect.bottom]);
			break;
		case "right":
			polygon.push([pointerX - 5, pointerY]);
			polygon.push([contentRect.left, contentRect.top]);
			polygon.push([contentRect.right, contentRect.top]);
			polygon.push([contentRect.right, contentRect.bottom]);
			polygon.push([contentRect.left, contentRect.bottom]);
			break;
		case "bottom":
			polygon.push([pointerX, pointerY - 5]);
			polygon.push([contentRect.right, contentRect.top]);
			polygon.push([contentRect.right, contentRect.bottom]);
			polygon.push([contentRect.left, contentRect.bottom]);
			polygon.push([contentRect.left, contentRect.top]);
			break;
		case "left":
			polygon.push([pointerX + 5, pointerY]);
			polygon.push([contentRect.right, contentRect.bottom]);
			polygon.push([contentRect.left, contentRect.bottom]);
			polygon.push([contentRect.left, contentRect.top]);
			polygon.push([contentRect.right, contentRect.top]);
	}
	return polygon;
}
function isPointerInGraceArea(event, area) {
	if (!area) return false;
	return isPointInPolygon([event.clientX, event.clientY], area);
}
//#endregion
//#region src/menu/menu.tsx
/**
* Container for menu items and nested menu, provide context for its children.
*/
function Menu(props) {
	const rootContext = useMenuRootContext();
	const parentDomCollectionContext = useOptionalDomCollectionContext();
	const parentMenuContext = useOptionalMenuContext();
	const optionalMenubarContext = useOptionalMenubarContext();
	const optionalNavigationMenuContext = useOptionalNavigationMenuContext();
	const mergedProps = merge({ placement: rootContext.orientation() === "horizontal" ? "bottom-start" : "right-start" }, props);
	const others = omit(mergedProps, "open", "defaultOpen", "onOpenChange");
	let pointerGraceTimeoutId = 0;
	let pointerGraceIntent = null;
	let pointerDir = "right";
	const [triggerId, setTriggerId] = createSignal(void 0, { ownedWrite: true });
	const [contentId, setContentId] = createSignal(void 0, { ownedWrite: true });
	const [triggerRef, setTriggerRef] = createSignal(void 0, { ownedWrite: true });
	const [contentRef, setContentRef] = createSignal(void 0, { ownedWrite: true });
	const [focusStrategy, setFocusStrategy] = createSignal(true);
	const [currentPlacement, setCurrentPlacement] = createSignal(others.placement);
	const [nestedMenus, setNestedMenus] = createSignal([]);
	const [items, setItems] = createSignal([]);
	const { DomCollectionProvider } = createDomCollection({
		items,
		onItemsChange: setItems
	});
	const disclosureState = createDisclosureState({
		open: () => mergedProps.open,
		defaultOpen: () => mergedProps.defaultOpen,
		onOpenChange: (isOpen) => mergedProps.onOpenChange?.(isOpen)
	});
	const { isMounted: contentPresent } = createPresence(() => rootContext.forceMount() || disclosureState.isOpen() || void 0, { transitionDuration: 0 });
	const listState = createListState({
		selectionMode: "none",
		dataSource: items
	});
	const open = (focusStrategy) => {
		setFocusStrategy(focusStrategy);
		disclosureState.open();
	};
	const close = (recursively = false) => {
		disclosureState.close();
		if (recursively && parentMenuContext) parentMenuContext.close(true);
	};
	const toggle = (focusStrategy) => {
		setFocusStrategy(focusStrategy);
		disclosureState.toggle();
	};
	const _focusContent = () => {
		const content = contentRef();
		if (content) {
			content.focus({ preventScroll: true });
			listState.selectionManager().setFocused(true);
			listState.selectionManager().setFocusedKey(void 0);
		}
	};
	const focusContent = () => {
		if (optionalNavigationMenuContext != null) setTimeout(() => _focusContent());
		else _focusContent();
	};
	const registerNestedMenu = (element) => {
		setNestedMenus((prev) => [...prev, element]);
		const parentUnregister = parentMenuContext?.registerNestedMenu(element);
		return () => {
			setNestedMenus((prev) => prev.filter((item) => item !== element));
			parentUnregister?.();
		};
	};
	const isPointerMovingToSubmenu = (e) => {
		return pointerDir === pointerGraceIntent?.side && isPointerInGraceArea(e, pointerGraceIntent?.area);
	};
	const onItemEnter = (e) => {
		if (isPointerMovingToSubmenu(e)) e.preventDefault();
	};
	const onItemLeave = (e) => {
		if (isPointerMovingToSubmenu(e)) return;
		focusContent();
	};
	const onTriggerLeave = (e) => {
		if (isPointerMovingToSubmenu(e)) e.preventDefault();
	};
	createHideOutside({
		disabled: () => !(parentMenuContext == null && disclosureState.isOpen() && rootContext.isModal()),
		targets: () => [contentRef(), ...nestedMenus()].filter(Boolean),
		alwaysVisibleSelector: "[data-kb-top-layer], [data-live-announcer]"
	});
	createEffect(() => contentRef(), (contentEl) => {
		if (!contentEl || !parentMenuContext) return;
		const parentUnregister = parentMenuContext.registerNestedMenu(contentEl);
		return () => parentUnregister();
	});
	createEffect(() => [
		rootContext.value(),
		contentRef(),
		nestedMenus()
	], ([rootValue, contentEl, menus]) => {
		if (parentMenuContext !== void 0) return;
		optionalMenubarContext?.registerMenu(rootValue, [contentEl, ...menus]);
	});
	createEffect(() => {
		if (parentMenuContext !== void 0 || optionalMenubarContext === void 0) return void 0;
		return {
			menubarValue: optionalMenubarContext.value(),
			rootValue: rootContext.value(),
			trigger: triggerRef(),
			autoFocus: optionalMenubarContext.autoFocusMenu()
		};
	}, (state) => {
		if (!state) return;
		if (state.menubarValue === state.rootValue) {
			state.trigger?.focus();
			if (state.autoFocus) open("first");
		} else close();
	});
	createEffect(() => {
		if (parentMenuContext !== void 0 || optionalMenubarContext === void 0) return void 0;
		return {
			isOpen: disclosureState.isOpen(),
			rootValue: rootContext.value()
		};
	}, (state) => {
		if (!state) return;
		if (state.isOpen) optionalMenubarContext.setValue(state.rootValue);
	});
	onCleanup(() => {
		if (parentMenuContext !== void 0) return;
		optionalMenubarContext?.unregisterMenu(rootContext.value());
	});
	const context = {
		dataset: createMemo(() => ({
			"data-expanded": disclosureState.isOpen() ? "" : void 0,
			"data-closed": !disclosureState.isOpen() ? "" : void 0
		})),
		isOpen: disclosureState.isOpen,
		contentPresent,
		nestedMenus,
		currentPlacement,
		pointerGraceTimeoutId: () => pointerGraceTimeoutId,
		autoFocus: focusStrategy,
		listState: () => listState,
		parentMenuContext: () => parentMenuContext,
		triggerRef,
		contentRef,
		triggerId,
		contentId,
		setTriggerRef,
		setContentRef,
		open,
		close,
		toggle,
		focusContent,
		onItemEnter,
		onItemLeave,
		onTriggerLeave,
		setPointerDir: (dir) => pointerDir = dir,
		setPointerGraceTimeoutId: (id) => pointerGraceTimeoutId = id,
		setPointerGraceIntent: (intent) => pointerGraceIntent = intent,
		registerNestedMenu,
		registerItemToParentDomCollection: parentDomCollectionContext?.registerItem,
		registerTriggerId: createRegisterId(setTriggerId),
		registerContentId: createRegisterId(setContentId)
	};
	return <DomCollectionProvider>
			<MenuContext value={context}>
				<Show when={optionalNavigationMenuContext === void 0} fallback={others.children}>
					<Popper anchorRef={triggerRef} contentRef={contentRef} onCurrentPlacementChange={setCurrentPlacement} {...others} />
				</Show>
			</MenuContext>
		</DomCollectionProvider>;
}
//#endregion
//#region src/menu/menu-item.context.tsx
const MenuItemContext = createContext();
function useMenuItemContext() {
	const context = useContext(MenuItemContext);
	if (context === void 0) throw new Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");
	return context;
}
//#endregion
//#region src/menu/menu-item-base.tsx
/**
* Base component for a menu item.
*/
function MenuItemBase(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const rootContext = useMenuRootContext();
	const menuContext = useMenuContext();
	const mergedProps = merge({ id: rootContext.generateId(`item-${createUniqueId()}`) }, props);
	const others = omit(mergedProps, "ref", "textValue", "disabled", "closeOnSelect", "checked", "indeterminate", "onSelect", "onPointerMove", "onPointerLeave", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus");
	const [labelId, setLabelId] = createSignal(void 0, { ownedWrite: true });
	const [descriptionId, setDescriptionId] = createSignal(void 0, { ownedWrite: true });
	const [labelRef, setLabelRef] = createSignal(void 0, { ownedWrite: true });
	const selectionManager = () => menuContext.listState().selectionManager();
	const key = () => others.id;
	const isHighlighted = () => selectionManager().focusedKey() === key();
	const onSelect = () => {
		mergedProps.onSelect?.();
		if (mergedProps.closeOnSelect) setTimeout(() => {
			menuContext.close(true);
		}, 1);
	};
	createDomCollectionItem({ getItem: () => ({
		ref,
		type: "item",
		key: key(),
		textValue: mergedProps.textValue ?? labelRef()?.textContent ?? ref()?.textContent ?? "",
		disabled: mergedProps.disabled ?? false
	}) });
	const selectableItem = createSelectableItem({
		key,
		selectionManager,
		shouldSelectOnPressUp: true,
		allowsDifferentPressOrigin: true,
		disabled: () => mergedProps.disabled
	}, ref);
	/**
	* We focus items on `pointerMove` to achieve the following:
	*
	* - Mouse over an item (it focuses)
	* - Leave mouse where it is and use keyboard to focus a different item
	* - Wiggle mouse without it leaving previously focused item
	* - Previously focused item should re-focus
	*
	* If we used `mouseOver`/`mouseEnter` it would not re-focus when the mouse
	* wiggles. This is to match native menu implementation.
	*/
	const onPointerMove = (e) => {
		callHandler(e, mergedProps.onPointerMove);
		if (e.pointerType !== "mouse") return;
		if (mergedProps.disabled) menuContext.onItemLeave(e);
		else {
			menuContext.onItemEnter(e);
			if (!e.defaultPrevented) {
				e.currentTarget.focus({ preventScroll: true });
				menuContext.listState().selectionManager().setFocused(true);
				menuContext.listState().selectionManager().setFocusedKey(key());
			}
		}
	};
	const onPointerLeave = (e) => {
		callHandler(e, mergedProps.onPointerLeave);
		if (e.pointerType !== "mouse") return;
		menuContext.onItemLeave(e);
	};
	const onPointerUp = (e) => {
		callHandler(e, mergedProps.onPointerUp);
		if (!mergedProps.disabled && e.button === 0) onSelect();
	};
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		if (e.repeat) return;
		if (mergedProps.disabled) return;
		switch (e.key) {
			case "Enter":
			case " ": onSelect();
		}
	};
	const ariaChecked = createMemo(() => {
		if (mergedProps.indeterminate) return "mixed";
		if (mergedProps.checked == null) return;
		return mergedProps.checked ? "true" : "false";
	});
	const dataset = createMemo(() => ({
		"data-indeterminate": mergedProps.indeterminate ? "" : void 0,
		"data-checked": mergedProps.checked && !mergedProps.indeterminate ? "" : void 0,
		"data-disabled": mergedProps.disabled ? "" : void 0,
		"data-highlighted": isHighlighted() ? "" : void 0
	}));
	const context = {
		isChecked: () => mergedProps.checked,
		dataset,
		setLabelRef,
		generateId: (suffix) => `${others.id}-${suffix}`,
		registerLabel: createRegisterId(setLabelId),
		registerDescription: createRegisterId(setDescriptionId)
	};
	return <MenuItemContext value={context}>
			<Polymorphic as="div" ref={[setRef, mergedProps.ref]} tabindex={selectableItem.tabIndex()} aria-checked={ariaChecked()} aria-disabled={mergedProps.disabled ? "true" : void 0} aria-labelledby={labelId()} aria-describedby={descriptionId()} data-key={selectableItem.dataKey()} onPointerDown={composeEventHandlers([mergedProps.onPointerDown, selectableItem.onPointerDown])} onPointerUp={composeEventHandlers([onPointerUp, selectableItem.onPointerUp])} onClick={composeEventHandlers([mergedProps.onClick, selectableItem.onClick])} onKeyDown={composeEventHandlers([onKeyDown, selectableItem.onKeyDown])} onMouseDown={composeEventHandlers([mergedProps.onMouseDown, selectableItem.onMouseDown])} onFocus={composeEventHandlers([mergedProps.onFocus, selectableItem.onFocus])} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} {...dataset()} {...others} />
		</MenuItemContext>;
}
//#endregion
//#region src/menu/menu-checkbox-item.tsx
/**
* An item that can be controlled and rendered like a checkbox.
*/
function MenuCheckboxItem(props) {
	const mergedProps = merge({ closeOnSelect: false }, props);
	const others = omit(mergedProps, "checked", "defaultChecked", "onChange", "onSelect");
	const state = createToggleState({
		isSelected: () => mergedProps.checked,
		defaultIsSelected: () => mergedProps.defaultChecked,
		onSelectedChange: (checked) => mergedProps.onChange?.(checked),
		isDisabled: () => others.disabled
	});
	const onSelect = () => {
		mergedProps.onSelect?.();
		state.toggle();
	};
	return <MenuItemBase role="menuitemcheckbox" checked={state.isSelected()} onSelect={onSelect} {...others} />;
}
//#endregion
//#region src/menu/menu-trigger.tsx
const MENUBAR_KEYS = {
	next: (dir, orientation) => dir === "ltr" ? orientation === "horizontal" ? "ArrowRight" : "ArrowDown" : orientation === "horizontal" ? "ArrowLeft" : "ArrowUp",
	previous: (dir, orientation) => MENUBAR_KEYS.next(dir === "ltr" ? "rtl" : "ltr", orientation)
};
const MENU_KEYS = {
	first: (orientation) => orientation === "horizontal" ? "ArrowDown" : "ArrowRight",
	last: (orientation) => orientation === "horizontal" ? "ArrowUp" : "ArrowLeft"
};
/**
* The button that toggles the menu.
*/
function MenuTrigger(props) {
	const rootContext = useMenuRootContext();
	const context = useMenuContext();
	const optionalMenubarContext = useOptionalMenubarContext();
	const { direction } = useLocale();
	const mergedProps = merge({ id: rootContext.generateId("trigger") }, props);
	const others = omit(mergedProps, "ref", "id", "disabled", "onPointerDown", "onClick", "onKeyDown", "onMouseOver", "onFocus");
	let key = () => rootContext.value();
	if (optionalMenubarContext !== void 0) {
		key = () => rootContext.value() ?? mergedProps.id;
		if (untrack(() => optionalMenubarContext.lastValue()) === void 0) optionalMenubarContext.setLastValue(key);
	}
	const tagName = createTagName(() => context.triggerRef(), () => "button");
	const isNativeLink = createMemo(() => {
		return tagName() === "a" && context.triggerRef()?.getAttribute("href") != null;
	});
	createEffect(() => optionalMenubarContext?.value(), (value) => {
		if (!untrack(isNativeLink)) return;
		if (value === untrack(key)) untrack(() => context.triggerRef())?.focus();
	});
	const handleClick = () => {
		if (optionalMenubarContext !== void 0) {
			if (!context.isOpen()) {
				if (!optionalMenubarContext.autoFocusMenu()) optionalMenubarContext.setAutoFocusMenu(true);
				context.open(false);
			} else if (optionalMenubarContext.value() === key()) optionalMenubarContext.closeMenu();
		} else context.toggle(true);
	};
	const onPointerDown = (e) => {
		callHandler(e, mergedProps.onPointerDown);
		e.currentTarget.dataset.pointerType = e.pointerType;
		if (!mergedProps.disabled && e.pointerType !== "touch" && e.button === 0) handleClick();
	};
	const onClick = (e) => {
		callHandler(e, mergedProps.onClick);
		if (!mergedProps.disabled) {
			if (e.currentTarget.dataset.pointerType === "touch") handleClick();
		}
	};
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		if (mergedProps.disabled) return;
		if (isNativeLink()) switch (e.key) {
			case "Enter":
			case " ": return;
		}
		switch (e.key) {
			case "Enter":
			case " ":
			case MENU_KEYS.first(rootContext.orientation()):
				e.stopPropagation();
				e.preventDefault();
				e.currentTarget.scrollIntoView({ block: "nearest" });
				context.open("first");
				optionalMenubarContext?.setAutoFocusMenu(true);
				optionalMenubarContext?.setValue(key);
				break;
			case MENU_KEYS.last(rootContext.orientation()):
				e.stopPropagation();
				e.preventDefault();
				context.open("last");
				break;
			case MENUBAR_KEYS.next(direction(), rootContext.orientation()):
				if (optionalMenubarContext === void 0) break;
				e.stopPropagation();
				e.preventDefault();
				optionalMenubarContext.nextMenu();
				break;
			case MENUBAR_KEYS.previous(direction(), rootContext.orientation()):
				if (optionalMenubarContext === void 0) break;
				e.stopPropagation();
				e.preventDefault();
				optionalMenubarContext.previousMenu();
		}
	};
	const onMouseOver = (e) => {
		callHandler(e, mergedProps.onMouseOver);
		if (context.triggerRef()?.dataset.pointerType === "touch") return;
		if (!mergedProps.disabled && optionalMenubarContext !== void 0 && optionalMenubarContext.value() !== void 0) optionalMenubarContext.setValue(key);
	};
	const onFocus = (e) => {
		callHandler(e, mergedProps.onFocus);
		if (optionalMenubarContext !== void 0 && e.currentTarget.dataset.pointerType !== "touch") optionalMenubarContext.setValue(key);
	};
	createEffect(() => mergedProps.id, (id) => context.registerTriggerId(id));
	return <button_exports.Root ref={[context.setTriggerRef, mergedProps.ref]} data-kb-menu-value-trigger={rootContext.value()} id={mergedProps.id} disabled={mergedProps.disabled} aria-haspopup="true" aria-expanded={context.isOpen() ? "true" : "false"} aria-controls={context.isOpen() ? context.contentId() : void 0} data-highlighted={key() !== void 0 && optionalMenubarContext?.value() === key() ? true : void 0} tabindex={optionalMenubarContext !== void 0 ? optionalMenubarContext.value() === key() || optionalMenubarContext.lastValue() === key() ? 0 : -1 : void 0} onPointerDown={onPointerDown} onMouseOver={onMouseOver} onClick={onClick} onKeyDown={onKeyDown} onFocus={onFocus} role={optionalMenubarContext !== void 0 ? "menuitem" : void 0} {...context.dataset()} {...others} />;
}
//#endregion
//#region src/menu/menu-content-base.tsx
function MenuContentBase(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const rootContext = useMenuRootContext();
	const context = useMenuContext();
	const optionalMenubarContext = useOptionalMenubarContext();
	const optionalNavigationMenuContext = useOptionalNavigationMenuContext();
	const { direction } = useLocale();
	const mergedProps = merge({ id: rootContext.generateId(`content-${createUniqueId()}`) }, props);
	const others = omit(mergedProps, "ref", "id", "style", "onOpenAutoFocus", "onCloseAutoFocus", "onEscapeKeyDown", "onFocusOutside", "onPointerEnter", "onPointerMove", "onKeyDown", "onMouseDown", "onFocusIn", "onFocusOut");
	let lastPointerX = 0;
	const isRootModalContent = () => {
		return context.parentMenuContext() == null && optionalMenubarContext === void 0 && rootContext.isModal();
	};
	const selectableList = createSelectableList({
		selectionManager: context.listState().selectionManager,
		collection: context.listState().collection,
		autoFocus: context.autoFocus,
		deferAutoFocus: true,
		shouldFocusWrap: true,
		disallowTypeAhead: () => !context.listState().selectionManager().isFocused(),
		orientation: () => rootContext.orientation() === "horizontal" ? "vertical" : "horizontal"
	}, ref);
	createFocusTrap({
		element: ref,
		enabled: () => isRootModalContent() && context.isOpen(),
		onInitialFocus: (event) => {
			if (optionalMenubarContext === void 0) mergedProps.onOpenAutoFocus?.(event);
		},
		onFinalFocus: mergedProps.onCloseAutoFocus
	});
	const onKeyDown = (e) => {
		if (!e.currentTarget.contains(e.target)) return;
		if (e.key === "Tab" && context.isOpen()) e.preventDefault();
		if (optionalMenubarContext !== void 0) {
			if (e.currentTarget.getAttribute("aria-haspopup") !== "true") switch (e.key) {
				case MENUBAR_KEYS.next(direction(), rootContext.orientation()):
					e.stopPropagation();
					e.preventDefault();
					context.close(true);
					optionalMenubarContext.setAutoFocusMenu(true);
					optionalMenubarContext.nextMenu();
					break;
				case MENUBAR_KEYS.previous(direction(), rootContext.orientation()):
					if (e.currentTarget.hasAttribute("data-closed") || e.defaultPrevented) break;
					e.stopPropagation();
					e.preventDefault();
					context.close(true);
					optionalMenubarContext.setAutoFocusMenu(true);
					optionalMenubarContext.previousMenu();
			}
		}
	};
	const onEscapeKeyDown = (e) => {
		mergedProps.onEscapeKeyDown?.(e);
		optionalMenubarContext?.setAutoFocusMenu(false);
		context.close(true);
	};
	const onFocusOutside = (e) => {
		mergedProps.onFocusOutside?.(e);
		if (rootContext.isModal()) e.preventDefault();
	};
	const onPointerEnter = (e) => {
		callHandler(e, mergedProps.onPointerEnter);
		if (!context.isOpen()) return;
		context.parentMenuContext()?.listState().selectionManager().setFocused(false);
		context.parentMenuContext()?.listState().selectionManager().setFocusedKey(void 0);
	};
	const onPointerMove = (e) => {
		callHandler(e, mergedProps.onPointerMove);
		if (e.pointerType !== "mouse") return;
		const target = e.target;
		const pointerXHasChanged = lastPointerX !== e.clientX;
		if (e.currentTarget.contains(target) && pointerXHasChanged) {
			context.setPointerDir(e.clientX > lastPointerX ? "right" : "left");
			lastPointerX = e.clientX;
		}
	};
	createEffect(() => mergedProps.id, (id) => context.registerContentId(id));
	onCleanup(() => context.setContentRef(void 0));
	const commonAttributes = {
		ref: [(el) => {
			context.setContentRef(el);
			setRef(el);
		}, mergedProps.ref],
		role: "menu",
		get id() {
			return mergedProps.id;
		},
		get tabindex() {
			return selectableList.tabIndex();
		},
		get "aria-labelledby"() {
			return context.triggerId();
		},
		onKeyDown: composeEventHandlers([
			mergedProps.onKeyDown,
			selectableList.onKeyDown,
			onKeyDown
		]),
		onMouseDown: composeEventHandlers([mergedProps.onMouseDown, selectableList.onMouseDown]),
		onFocusIn: composeEventHandlers([mergedProps.onFocusIn, selectableList.onFocusIn]),
		onFocusOut: composeEventHandlers([mergedProps.onFocusOut, selectableList.onFocusOut]),
		onPointerEnter,
		onPointerMove,
		get "data-orientation"() {
			return rootContext.orientation();
		}
	};
	return <Show when={context.contentPresent()}>
			<Show when={optionalNavigationMenuContext === void 0 || context.parentMenuContext() != null} fallback={<Polymorphic as="div" {...context.dataset()} {...commonAttributes} {...others} />}>
				<Popper.Positioner>
					<DismissableLayer disableOutsidePointerEvents={isRootModalContent() && context.isOpen()} excludedElements={[context.triggerRef]} bypassTopMostLayerCheck style={combineStyle({
		"--kb-menu-content-transform-origin": "var(--kb-popper-content-transform-origin)",
		position: "relative"
	}, mergedProps.style)} onEscapeKeyDown={onEscapeKeyDown} onFocusOutside={onFocusOutside} onDismiss={context.close} {...context.dataset()} {...commonAttributes} {...others} />
				</Popper.Positioner>
			</Show>
		</Show>;
}
//#endregion
//#region src/menu/menu-content.tsx
function MenuContent(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const rootContext = useMenuRootContext();
	const context = useMenuContext();
	const others = omit(props, "ref");
	createPreventScroll({
		element: ref,
		enabled: () => context.contentPresent() && rootContext.preventScroll()
	});
	return <MenuContentBase ref={[setRef, props.ref]} {...others} />;
}
//#endregion
//#region src/menu/menu-group-context.tsx
const MenuGroupContext = createContext();
function useMenuGroupContext() {
	const context = useContext(MenuGroupContext);
	if (context === void 0) throw new Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");
	return context;
}
//#endregion
//#region src/menu/menu-group.tsx
/**
* A container used to group multiple `Menu.Item`s.
*/
function MenuGroup(props) {
	const rootContext = useMenuRootContext();
	const mergedProps = merge({ id: rootContext.generateId(`group-${createUniqueId()}`) }, props);
	const [labelId, setLabelId] = createSignal(void 0, { ownedWrite: true });
	const context = {
		generateId: (suffix) => `${mergedProps.id}-${suffix}`,
		registerLabelId: createRegisterId(setLabelId)
	};
	return <MenuGroupContext value={context}>
			<Polymorphic as="div" role="group" aria-labelledby={labelId()} {...mergedProps} />
		</MenuGroupContext>;
}
//#endregion
//#region src/menu/menu-group-label.tsx
/**
* A component used to render the label of a `Menu.Group`.
* It won't be focusable using arrow keys.
*/
function MenuGroupLabel(props) {
	const context = useMenuGroupContext();
	const mergedProps = merge({ id: context.generateId("label") }, props);
	const others = omit(mergedProps, "id");
	createEffect(() => mergedProps.id, (id) => context.registerLabelId(id));
	return <Polymorphic as="span" id={mergedProps.id} aria-hidden="true" {...others} />;
}
//#endregion
//#region src/menu/menu-icon.tsx
/**
* A small icon often displayed inside the menu trigger as a visual affordance for the fact it can be open.
* It renders a `▼` by default, but you can use your own icon by providing a `children`.
*/
function MenuIcon(props) {
	const context = useMenuContext();
	const mergedProps = merge({ children: "▼" }, props);
	return <Polymorphic as="span" aria-hidden="true" {...context.dataset()} {...mergedProps} />;
}
//#endregion
//#region src/menu/menu-item.tsx
/**
* An item of the menu.
*/
function MenuItem(props) {
	return <MenuItemBase role="menuitem" closeOnSelect {...props} />;
}
//#endregion
//#region src/menu/menu-item-description.tsx
/**
* An optional accessible description to be announced for the menu item.
* Useful for menu items that have more complex content (e.g. icons, multiple lines of text, etc.)
*/
function MenuItemDescription(props) {
	const context = useMenuItemContext();
	const mergedProps = merge({ id: context.generateId("description") }, props);
	const others = omit(mergedProps, "id");
	createEffect(() => mergedProps.id, (id) => context.registerDescription(id));
	return <Polymorphic as="div" id={mergedProps.id} {...context.dataset()} {...others} />;
}
//#endregion
//#region src/menu/menu-item-indicator.tsx
/**
* The visual indicator rendered when the parent menu `CheckboxItem` or `RadioItem` is checked.
* You can style this element directly, or you can use it as a wrapper to put an icon into, or both.
*/
function MenuItemIndicator(props) {
	const context = useMenuItemContext();
	const mergedProps = merge({ id: context.generateId("indicator") }, props);
	const others = omit(mergedProps, "forceMount");
	return <Show when={mergedProps.forceMount || context.isChecked()}>
			<Polymorphic as="div" {...context.dataset()} {...others} />
		</Show>;
}
//#endregion
//#region src/menu/menu-item-label.tsx
/**
* An accessible label to be announced for the menu item.
* Useful for menu items that have more complex content (e.g. icons, multiple lines of text, etc.)
*/
function MenuItemLabel(props) {
	const context = useMenuItemContext();
	const mergedProps = merge({ id: context.generateId("label") }, props);
	const others = omit(mergedProps, "ref", "id");
	createEffect(() => mergedProps.id, (id) => context.registerLabel(id));
	return <Polymorphic as="div" ref={[context.setLabelRef, mergedProps.ref]} id={mergedProps.id} {...context.dataset()} {...others} />;
}
//#endregion
//#region src/menu/menu-portal.tsx
/**
* Portals its children into the `body` when the menu is open.
*/
function MenuPortal(props) {
	const context = useMenuContext();
	return <Show when={context.contentPresent()}>
			<Portal {...props} />
		</Show>;
}
//#endregion
//#region src/menu/menu-radio-group-context.tsx
const MenuRadioGroupContext = createContext();
function useMenuRadioGroupContext() {
	const context = useContext(MenuRadioGroupContext);
	if (context === void 0) throw new Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");
	return context;
}
//#endregion
//#region src/menu/menu-radio-group.tsx
/**
* A container used to group multiple `Menu.RadioItem`s and manage the selection.
*/
function MenuRadioGroup(props) {
	const defaultId = useMenuRootContext().generateId(`radiogroup-${createUniqueId()}`);
	const mergedProps = merge({ id: defaultId }, props);
	const others = omit(mergedProps, "value", "defaultValue", "onChange", "disabled");
	const [selected, setSelected] = (0, primitives_exports.createControllableSignal)({
		value: () => mergedProps.value,
		defaultValue: () => mergedProps.defaultValue,
		onChange: (value) => mergedProps.onChange?.(value)
	});
	const context = {
		isDisabled: () => mergedProps.disabled,
		isSelectedValue: (value) => value === selected(),
		setSelectedValue: (value) => setSelected(value)
	};
	return <MenuRadioGroupContext value={context}>
			<MenuGroup {...others} />
		</MenuRadioGroupContext>;
}
//#endregion
//#region src/menu/menu-radio-item.tsx
/**
* An item that can be controlled and rendered like a radio.
*/
function MenuRadioItem(props) {
	const context = useMenuRadioGroupContext();
	const mergedProps = merge({ closeOnSelect: false }, props);
	const others = omit(mergedProps, "value", "onSelect");
	const onSelect = () => {
		mergedProps.onSelect?.();
		context.setSelectedValue(mergedProps.value);
	};
	return <MenuItemBase role="menuitemradio" checked={context.isSelectedValue(mergedProps.value)} onSelect={onSelect} {...others} />;
}
//#endregion
//#region src/menu/menu-root.tsx
/**
* Root component for a menu, provide context for its children.
* Used to build dropdown menu, context menu and menubar.
*/
function MenuRoot(props) {
	const optionalMenubarContext = useOptionalMenubarContext();
	const defaultId = `menu-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		modal: true
	}, props);
	const others = omit(mergedProps, "id", "modal", "preventScroll", "forceMount", "open", "defaultOpen", "onOpenChange", "value", "orientation");
	const disclosureState = createDisclosureState({
		open: () => mergedProps.open,
		defaultOpen: () => mergedProps.defaultOpen,
		onOpenChange: (isOpen) => mergedProps.onOpenChange?.(isOpen)
	});
	const context = {
		isModal: () => mergedProps.modal ?? true,
		preventScroll: () => mergedProps.preventScroll ?? context.isModal(),
		forceMount: () => mergedProps.forceMount ?? false,
		generateId: (suffix) => `${mergedProps.id}-${suffix}`,
		value: () => mergedProps.value,
		orientation: () => mergedProps.orientation ?? optionalMenubarContext?.orientation() ?? "horizontal"
	};
	return <MenuRootContext value={context}>
			<Menu open={disclosureState.isOpen()} onOpenChange={disclosureState.setIsOpen} {...others} />
		</MenuRootContext>;
}
//#endregion
//#region src/menu/menu-sub.tsx
/**
* Contains all the parts of a submenu.
*/
function MenuSub(props) {
	const { direction } = useLocale();
	return <Menu placement={direction() === "rtl" ? "left-start" : "right-start"} flip {...props} />;
}
//#endregion
//#region src/menu/menu-sub-content.tsx
const SUB_CLOSE_KEYS = { close: (dir, orientation) => {
	if (dir === "ltr") return [orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"];
	return [orientation === "horizontal" ? "ArrowRight" : "ArrowDown"];
} };
/**
* The component that pops out when a submenu is open.
*/
function MenuSubContent(props) {
	const context = useMenuContext();
	const rootContext = useMenuRootContext();
	const others = omit(props, "onFocusOutside", "onKeyDown");
	const { direction } = useLocale();
	const onOpenAutoFocus = (e) => {
		e.preventDefault();
	};
	const onCloseAutoFocus = (e) => {
		e.preventDefault();
	};
	const onFocusOutside = (e) => {
		props.onFocusOutside?.(e);
		const target = e.target;
		if (!context.triggerRef()?.contains(target)) context.close();
	};
	const onKeyDown = (e) => {
		callHandler(e, props.onKeyDown);
		const isKeyDownInside = e.currentTarget.contains(e.target);
		const isCloseKey = SUB_CLOSE_KEYS.close(direction(), rootContext.orientation()).includes(e.key);
		const isSubMenu = context.parentMenuContext() != null;
		if (isKeyDownInside && isCloseKey && isSubMenu) {
			e.preventDefault();
			context.close();
			context.triggerRef()?.focus({ preventScroll: true });
		}
	};
	return <MenuContentBase onOpenAutoFocus={onOpenAutoFocus} onCloseAutoFocus={onCloseAutoFocus} onFocusOutside={onFocusOutside} onKeyDown={onKeyDown} {...others} />;
}
//#endregion
//#region src/menu/menu-sub-trigger.tsx
const SELECTION_KEYS = ["Enter", " "];
const SUB_OPEN_KEYS = { open: (dir, orientation) => {
	if (dir === "ltr") return [...SELECTION_KEYS, orientation === "horizontal" ? "ArrowRight" : "ArrowDown"];
	return [...SELECTION_KEYS, orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"];
} };
/**
* An item that opens a submenu.
*/
function MenuSubTrigger(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const rootContext = useMenuRootContext();
	const context = useMenuContext();
	const mergedProps = merge({ id: rootContext.generateId(`sub-trigger-${createUniqueId()}`) }, props);
	const others = omit(mergedProps, "ref", "id", "textValue", "disabled", "onPointerMove", "onPointerLeave", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus");
	let openTimeoutId = null;
	const clearOpenTimeout = () => {
		if (isServer) return;
		if (openTimeoutId) window.clearTimeout(openTimeoutId);
		openTimeoutId = null;
	};
	const { direction } = useLocale();
	const key = () => mergedProps.id;
	const parentSelectionManager = () => {
		const parentMenuContext = context.parentMenuContext();
		if (parentMenuContext == null) throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");
		return parentMenuContext.listState().selectionManager();
	};
	const collection = () => context.listState().collection();
	const isHighlighted = () => parentSelectionManager().focusedKey() === key();
	const selectableItem = createSelectableItem({
		key,
		selectionManager: parentSelectionManager,
		shouldSelectOnPressUp: true,
		allowsDifferentPressOrigin: true,
		disabled: () => mergedProps.disabled
	}, ref);
	const onClick = (e) => {
		callHandler(e, mergedProps.onClick);
		if (!context.isOpen() && !mergedProps.disabled) context.open(true);
	};
	const onPointerMove = (e) => {
		callHandler(e, mergedProps.onPointerMove);
		if (e.pointerType !== "mouse") return;
		const parentMenuContext = context.parentMenuContext();
		parentMenuContext?.onItemEnter(e);
		if (e.defaultPrevented) return;
		if (mergedProps.disabled) {
			parentMenuContext?.onItemLeave(e);
			return;
		}
		if (!context.isOpen() && !openTimeoutId) {
			context.parentMenuContext()?.setPointerGraceIntent(null);
			openTimeoutId = window.setTimeout(() => {
				context.open(false);
				clearOpenTimeout();
			}, 100);
		}
		parentMenuContext?.onItemEnter(e);
		if (!e.defaultPrevented) {
			if (context.listState().selectionManager().isFocused()) {
				context.listState().selectionManager().setFocused(false);
				context.listState().selectionManager().setFocusedKey(void 0);
			}
			e.currentTarget.focus({ preventScroll: true });
			parentMenuContext?.listState().selectionManager().setFocused(true);
			parentMenuContext?.listState().selectionManager().setFocusedKey(key());
		}
	};
	const onPointerLeave = (e) => {
		callHandler(e, mergedProps.onPointerLeave);
		if (e.pointerType !== "mouse") return;
		clearOpenTimeout();
		const parentMenuContext = context.parentMenuContext();
		const contentEl = context.contentRef();
		if (contentEl) {
			parentMenuContext?.setPointerGraceIntent({
				area: getPointerGraceArea(context.currentPlacement(), e, contentEl),
				side: context.currentPlacement().split("-")[0]
			});
			window.clearTimeout(parentMenuContext?.pointerGraceTimeoutId());
			const pointerGraceTimeoutId = window.setTimeout(() => {
				parentMenuContext?.setPointerGraceIntent(null);
			}, 300);
			parentMenuContext?.setPointerGraceTimeoutId(pointerGraceTimeoutId);
		} else {
			parentMenuContext?.onTriggerLeave(e);
			if (e.defaultPrevented) return;
			parentMenuContext?.setPointerGraceIntent(null);
		}
		parentMenuContext?.onItemLeave(e);
	};
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		if (e.repeat) return;
		if (mergedProps.disabled) return;
		if (SUB_OPEN_KEYS.open(direction(), rootContext.orientation()).includes(e.key)) {
			e.stopPropagation();
			e.preventDefault();
			parentSelectionManager().setFocused(false);
			parentSelectionManager().setFocusedKey(void 0);
			if (!context.isOpen()) context.open("first");
			context.focusContent();
			context.listState().selectionManager().setFocused(true);
			context.listState().selectionManager().setFocusedKey(collection().getFirstKey());
		}
	};
	createEffect(() => ({
		textValue: mergedProps.textValue ?? ref()?.textContent ?? "",
		disabled: mergedProps.disabled ?? false,
		key: key()
	}), (data) => {
		if (context.registerItemToParentDomCollection == null) throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");
		return context.registerItemToParentDomCollection({
			ref,
			type: "item",
			...data
		});
	});
	createEffect(() => context.parentMenuContext()?.pointerGraceTimeoutId(), (pointerGraceTimer) => {
		return () => {
			window.clearTimeout(pointerGraceTimer);
			untrack(() => context.parentMenuContext())?.setPointerGraceIntent(null);
		};
	});
	createEffect(() => mergedProps.id, (id) => context.registerTriggerId(id));
	onCleanup(() => {
		clearOpenTimeout();
	});
	return <Polymorphic as="div" ref={[(el) => {
		context.setTriggerRef(el);
		setRef(el);
	}, mergedProps.ref]} id={mergedProps.id} role="menuitem" tabindex={selectableItem.tabIndex()} aria-haspopup="true" aria-expanded={context.isOpen() ? "true" : "false"} aria-controls={context.isOpen() ? context.contentId() : void 0} aria-disabled={mergedProps.disabled ? "true" : void 0} data-key={selectableItem.dataKey()} data-highlighted={isHighlighted() ? "" : void 0} data-disabled={mergedProps.disabled ? "" : void 0} onPointerDown={composeEventHandlers([mergedProps.onPointerDown, selectableItem.onPointerDown])} onPointerUp={composeEventHandlers([mergedProps.onPointerUp, selectableItem.onPointerUp])} onClick={composeEventHandlers([onClick, selectableItem.onClick])} onKeyDown={composeEventHandlers([onKeyDown, selectableItem.onKeyDown])} onMouseDown={composeEventHandlers([mergedProps.onMouseDown, selectableItem.onMouseDown])} onFocus={composeEventHandlers([mergedProps.onFocus, selectableItem.onFocus])} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} {...context.dataset()} {...others} />;
}
//#endregion
export { MenubarContext as C, useNavigationMenuContext as S, MenuCheckboxItem as _, MenuRadioItem as a, useOptionalMenuContext as b, MenuItemLabel as c, MenuItem as d, MenuIcon as f, MenuTrigger as g, MenuContent as h, MenuRoot as i, MenuItemIndicator as l, MenuGroup as m, MenuSubContent as n, MenuRadioGroup as o, MenuGroupLabel as p, MenuSub as r, MenuPortal as s, MenuSubTrigger as t, MenuItemDescription as u, useMenuRootContext as v, useMenubarContext as w, NavigationMenuContext as x, useMenuContext as y };
