import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { Polymorphic } from "../polymorphic/index.jsx";
import { t as createDisclosureState } from "../create-disclosure-state/DV_ixT98.jsx";
import { useLocale } from "../i18n/index.jsx";
import { i as PopperArrow } from "../popper/BSUmx7sN.jsx";
import { _ as MenuCheckboxItem, a as MenuRadioItem, c as MenuItemLabel, d as MenuItem, f as MenuIcon, h as MenuContent, i as MenuRoot, l as MenuItemIndicator, m as MenuGroup, n as MenuSubContent, o as MenuRadioGroup, p as MenuGroupLabel, r as MenuSub, s as MenuPortal, t as MenuSubTrigger, u as MenuItemDescription, v as useMenuRootContext, y as useMenuContext } from "../menu-sub-trigger/D8PBtfoP.jsx";
import { r as SeparatorRoot } from "../separator/QhqEt4aD.jsx";
import { combineStyle } from "@solid-primitives/props";
import { createContext, createSignal, createUniqueId, merge, omit, onCleanup, useContext } from "solid-js";
import { isServer } from "@solidjs/web";
import { callHandler } from "@kobalte/utils";
//#region src/context-menu/context-menu-content.tsx
function ContextMenuContent(props) {
	const rootContext = useMenuRootContext();
	const others = omit(props, "onCloseAutoFocus", "onInteractOutside");
	let hasInteractedOutside = false;
	const onCloseAutoFocus = (e) => {
		props.onCloseAutoFocus?.(e);
		if (!e.defaultPrevented && hasInteractedOutside) e.preventDefault();
		hasInteractedOutside = false;
	};
	const onInteractOutside = (e) => {
		props.onInteractOutside?.(e);
		if (!e.defaultPrevented && !rootContext.isModal()) hasInteractedOutside = true;
	};
	return <MenuContent onCloseAutoFocus={onCloseAutoFocus} onInteractOutside={onInteractOutside} {...others} />;
}
//#endregion
//#region src/context-menu/context-menu-context.tsx
const ContextMenuContext = createContext(null);
function useOptionalContextMenuContext() {
	return useContext(ContextMenuContext) ?? void 0;
}
function useContextMenuContext() {
	const context = useOptionalContextMenuContext();
	if (context === void 0) throw new Error("[kobalte]: `useContextMenuContext` must be used within a `ContextMenu` component");
	return context;
}
//#endregion
//#region src/context-menu/context-menu-root.tsx
/**
* Displays a menu located at the pointer, triggered by a right-click or a long-press.
*/
function ContextMenuRoot(props) {
	const defaultId = `contextmenu-${createUniqueId()}`;
	const { direction } = useLocale();
	const mergedProps = merge({
		id: defaultId,
		placement: direction() === "rtl" ? "left-start" : "right-start",
		gutter: 2,
		shift: 2
	}, props);
	const others = omit(mergedProps, "onOpenChange");
	const [anchorRect, setAnchorRect] = createSignal({
		x: 0,
		y: 0
	});
	const disclosureState = createDisclosureState({
		defaultOpen: false,
		onOpenChange: (isOpen) => mergedProps.onOpenChange?.(isOpen)
	});
	const context = { setAnchorRect };
	return <ContextMenuContext value={context}>
			<MenuRoot open={disclosureState.isOpen()} onOpenChange={disclosureState.setIsOpen} getAnchorRect={anchorRect} {...others} />
		</ContextMenuContext>;
}
//#endregion
//#region src/context-menu/context-menu-trigger.tsx
function ContextMenuTrigger(props) {
	const rootContext = useMenuRootContext();
	const menuContext = useMenuContext();
	const context = useContextMenuContext();
	const mergedProps = merge({ id: rootContext.generateId("trigger") }, props);
	const others = omit(mergedProps, "ref", "style", "disabled", "onContextMenu", "onPointerDown", "onPointerMove", "onPointerCancel", "onPointerUp");
	let longPressTimoutId = 0;
	const clearLongPressTimeout = () => {
		if (isServer) return;
		window.clearTimeout(longPressTimoutId);
	};
	onCleanup(() => {
		clearLongPressTimeout();
	});
	const onContextMenu = (e) => {
		callHandler(e, mergedProps.onContextMenu);
		if (mergedProps.disabled) return;
		if (e.defaultPrevented) return;
		clearLongPressTimeout();
		e.preventDefault();
		e.stopPropagation();
		context.setAnchorRect({
			x: e.clientX,
			y: e.clientY
		});
		if (menuContext.isOpen()) menuContext.focusContent();
		else menuContext.open(true);
	};
	const isTouchOrPen = (e) => e.pointerType === "touch" || e.pointerType === "pen";
	const onPointerDown = (e) => {
		callHandler(e, mergedProps.onPointerDown);
		if (!mergedProps.disabled && isTouchOrPen(e)) {
			clearLongPressTimeout();
			context.setAnchorRect({
				x: e.clientX,
				y: e.clientY
			});
			longPressTimoutId = window.setTimeout(() => menuContext.open(false), 700);
		}
	};
	const onPointerMove = (e) => {
		callHandler(e, mergedProps.onPointerMove);
		if (!mergedProps.disabled && isTouchOrPen(e)) clearLongPressTimeout();
	};
	const onPointerCancel = (e) => {
		callHandler(e, mergedProps.onPointerCancel);
		if (!mergedProps.disabled && isTouchOrPen(e)) clearLongPressTimeout();
	};
	const onPointerUp = (e) => {
		callHandler(e, mergedProps.onPointerUp);
		if (!mergedProps.disabled && isTouchOrPen(e)) clearLongPressTimeout();
	};
	return <Polymorphic as="div" ref={[menuContext.setTriggerRef, mergedProps.ref]} style={combineStyle({ "-webkit-touch-callout": "none" }, mergedProps.style)} data-disabled={mergedProps.disabled ? "" : void 0} onContextMenu={onContextMenu} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerCancel={onPointerCancel} onPointerUp={onPointerUp} {...menuContext.dataset()} {...others} />;
}
//#endregion
//#region src/context-menu/index.tsx
var context_menu_exports = /* @__PURE__ */ __exportAll({
	Arrow: () => PopperArrow,
	CheckboxItem: () => MenuCheckboxItem,
	Content: () => ContextMenuContent,
	ContextMenu: () => ContextMenu,
	Group: () => MenuGroup,
	GroupLabel: () => MenuGroupLabel,
	Icon: () => MenuIcon,
	Item: () => MenuItem,
	ItemDescription: () => MenuItemDescription,
	ItemIndicator: () => MenuItemIndicator,
	ItemLabel: () => MenuItemLabel,
	Portal: () => MenuPortal,
	RadioGroup: () => MenuRadioGroup,
	RadioItem: () => MenuRadioItem,
	Root: () => ContextMenuRoot,
	Separator: () => SeparatorRoot,
	Sub: () => MenuSub,
	SubContent: () => MenuSubContent,
	SubTrigger: () => MenuSubTrigger,
	Trigger: () => ContextMenuTrigger,
	useContextMenuContext: () => useContextMenuContext
});
const ContextMenu = Object.assign(ContextMenuRoot, {
	Arrow: PopperArrow,
	CheckboxItem: MenuCheckboxItem,
	Content: ContextMenuContent,
	Group: MenuGroup,
	GroupLabel: MenuGroupLabel,
	Icon: MenuIcon,
	Item: MenuItem,
	ItemDescription: MenuItemDescription,
	ItemIndicator: MenuItemIndicator,
	ItemLabel: MenuItemLabel,
	Portal: MenuPortal,
	RadioGroup: MenuRadioGroup,
	RadioItem: MenuRadioItem,
	Separator: SeparatorRoot,
	Sub: MenuSub,
	SubContent: MenuSubContent,
	SubTrigger: MenuSubTrigger,
	Trigger: ContextMenuTrigger
});
//#endregion
export { useContextMenuContext as a, ContextMenuRoot as i, context_menu_exports as n, ContextMenuContent as o, ContextMenuTrigger as r, ContextMenu as t };
