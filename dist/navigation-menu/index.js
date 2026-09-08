import { t as DismissableLayer } from "../dismissable-layer/DXLD03yU.js";
import { i as PopperArrow, t as Popper } from "../popper/BTyI8BKK.js";
import { S as useNavigationMenuContext, _ as MenuCheckboxItem, a as MenuRadioItem, b as useOptionalMenuContext, c as MenuItemLabel, d as MenuItem, f as MenuIcon, h as MenuContent, l as MenuItemIndicator, m as MenuGroup, n as MenuSubContent, o as MenuRadioGroup, p as MenuGroupLabel, r as MenuSub, s as MenuPortal, t as MenuSubTrigger, u as MenuItemDescription, v as useMenuRootContext, w as useMenubarContext, x as NavigationMenuContext, y as useMenuContext } from "../menu-sub-trigger/DBWV3t7Q.js";
import { r as SeparatorRoot } from "../separator/ufyduBta.js";
import { n as MenubarRoot, r as MenubarMenu, t as MenubarTrigger } from "../menubar-trigger/BDBX-UHm.js";
import { createComponent, insert, memo, mergeProps, template } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { Show, createEffect, createMemo, createSignal, createUniqueId, merge, omit, untrack } from "solid-js";
import { createPresence } from "@solid-primitives/presence";
import { createControllableSignal } from "@solid-primitives/controlled-signal";
import { callHandler, composeEventHandlers } from "@kobalte/utils";
import { createElementSize } from "@solid-primitives/resize-observer";
//#region src/navigation-menu/navigation-menu-arrow.tsx
/**
* An optional arrow element to render alongside the viewport content.
* Must be rendered in the viewport.
*/
function NavigationMenuArrow(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const menubarContext = useMenubarContext();
	const mergedProps = merge({ size: 15 }, props);
	const others = omit(mergedProps, "ref");
	const [offset, setOffset] = createSignal(0);
	const horizontal = () => menubarContext.orientation() === "horizontal";
	createEffect(() => menubarContext.value(), (value) => {
		setTimeout(() => {
			if (!value || value.includes("link-trigger-")) return;
			const triggerRef = document.querySelector(`[data-kb-menu-value-trigger="${value}"]`);
			if (!triggerRef || !ref()) return;
			const arrowRef = ref();
			const middle = triggerRef.getBoundingClientRect()[horizontal() ? "x" : "y"] + triggerRef.getBoundingClientRect()[horizontal() ? "width" : "height"] / 2;
			const computed = window.getComputedStyle(arrowRef);
			const initalArrowPos = arrowRef.getBoundingClientRect()[horizontal() ? "x" : "y"] + arrowRef.getBoundingClientRect()[horizontal() ? "width" : "height"] / 2 - Number.parseFloat(computed.transform.split(",")[horizontal() ? 4 : 5]);
			setOffset(middle - initalArrowPos);
		});
	});
	return createComponent(PopperArrow, mergeProps({
		ref: [setRef, mergedProps.ref],
		get style() {
			return {
				transform: `translate${horizontal() ? "X" : "Y"}(${offset()}px)`,
				color: "red"
			};
		}
	}, others));
}
//#endregion
//#region src/navigation-menu/navigation-menu-content.tsx
function NavigationMenuContent(props) {
	const context = useNavigationMenuContext();
	const menubarContext = useMenubarContext();
	const menuRootContext = useMenuRootContext();
	const [motion, setMotion] = createSignal();
	const others = omit(props, "onPointerEnter", "onPointerLeave");
	const onPointerEnter = (e) => {
		callHandler(e, props.onPointerEnter);
		context.cancelLeaveTimer();
	};
	const onPointerLeave = (e) => {
		callHandler(e, props.onPointerLeave);
		context.startLeaveTimer();
	};
	createEffect(() => menubarContext.value(), (contextValue) => {
		untrack(() => {
			if (!contextValue || contextValue.includes("link-trigger-")) {
				context.setPreviousMenu(void 0);
				return;
			}
			if (contextValue === menuRootContext.value()) {
				if (context.previousMenu() != null) {
					const menus = [...menubarContext.menus()];
					if (menus.indexOf(context.previousMenu()) < menus.indexOf(contextValue)) setMotion("from-end");
					else setMotion("from-start");
				} else setMotion(void 0);
				context.setPreviousMenu(contextValue);
				return;
			}
			const menus = [...menubarContext.menus()];
			if (menus.indexOf(context.previousMenu()) > menus.indexOf(contextValue)) setMotion("to-end");
			else setMotion("to-start");
		});
	});
	return createComponent(MenuContent, mergeProps({
		as: "ul",
		onPointerEnter,
		onPointerLeave,
		onInteractOutside: () => {
			context.setAutoFocusMenu(false);
		},
		get ["data-motion"]() {
			return motion();
		}
	}, others));
}
//#endregion
//#region src/navigation-menu/navigation-menu-item.tsx
var _tmpl$$2 = /*#__PURE__*/ template(`<li role=presentation>`);
/**
* An item of the navigation menu.
*/
function NavigationMenuItem(props) {
	var _el$ = _tmpl$$2();
	insert(_el$, createComponent(MenuItem, mergeProps({ as: "a" }, props)));
	return _el$;
}
//#endregion
//#region src/navigation-menu/navigation-menu-menu.tsx
/**
* Displays a menu to the user —such as a set of actions or functions— triggered by a button.
*/
function NavigationMenuMenu(props) {
	const menubarContext = useMenubarContext();
	const context = useNavigationMenuContext();
	const others = omit(props, "value");
	const uniqueid = createUniqueId();
	const defaultId = menubarContext.generateId(`navigation-menu-menu-${uniqueid}`);
	const mergedPropsWithId = merge({ id: defaultId }, others);
	const value = () => props.value ?? uniqueid;
	const [forceMount, setForceMount] = createSignal(false);
	const animationEnd = () => {
		if (menubarContext.value() !== value()) setForceMount(false);
		context.viewportRef()?.removeEventListener("animationend", animationEnd);
		context.viewportRef()?.removeEventListener("animationcancel", animationEnd);
	};
	createEffect(() => menubarContext.value(), (contextValue) => {
		if (contextValue === untrack(value)) setForceMount(true);
		else {
			const viewportRef = untrack(() => context.viewportRef());
			if (!viewportRef || ["", "none"].includes(window.getComputedStyle(viewportRef).animationName)) {
				setForceMount(false);
				return;
			}
			viewportRef.addEventListener("animationend", animationEnd);
		}
	});
	return createComponent(MenubarMenu, mergeProps({
		get forceMount() {
			return forceMount();
		},
		get value() {
			return value();
		}
	}, mergedPropsWithId));
}
//#endregion
//#region src/navigation-menu/navigation-menu-portal.tsx
/**
* Portals its children into the NavigationMenu.Viewport when the menu is open.
*/
function NavigationMenuPortal(props) {
	const context = useNavigationMenuContext();
	const menuContext = useMenuContext();
	return createComponent(Show, {
		get when() {
			return context.viewportPresent();
		},
		get children() {
			return createComponent(MenuPortal, mergeProps({ get mount() {
				return memo(() => menuContext.parentMenuContext() == null)() ? context.viewportRef() : void 0;
			} }, props));
		}
	});
}
//#endregion
//#region src/navigation-menu/navigation-menu-root.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<nav>`);
/**
* A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
*/
function NavigationMenuRoot(props) {
	const mergedProps = merge({
		delayDuration: 200,
		skipDelayDuration: 300
	}, props);
	const popperProps = omit(mergedProps, "ref", "delayDuration", "skipDelayDuration", "autoFocusMenu", "onAutoFocusMenuChange", "defaultValue", "value", "onValueChange", "forceMount");
	const others = omit(mergedProps, "ref", "delayDuration", "skipDelayDuration", "autoFocusMenu", "onAutoFocusMenuChange", "defaultValue", "value", "onValueChange", "forceMount", "getAnchorRect", "placement", "gutter", "shift", "flip", "slide", "overlap", "sameWidth", "fitViewport", "hideWhenDetached", "detachedPadding", "arrowPadding", "overflowPadding");
	const [value, setValue] = createControllableSignal({
		value: () => mergedProps.value,
		defaultValue: () => mergedProps.defaultValue,
		onChange: (value) => mergedProps.onValueChange?.(value)
	});
	const [autoFocusMenu, setAutoFocusMenu] = createControllableSignal({
		value: () => mergedProps.autoFocusMenu,
		defaultValue: () => false,
		onChange: mergedProps.onAutoFocusMenuChange
	});
	const [viewportRef, setViewportRef] = createSignal();
	const [rootRef, setRootRef] = createSignal();
	const [currentPlacement, setCurrentPlacement] = createSignal(untrack(() => popperProps.placement ?? (others.orientation === "vertical" ? "right" : "bottom")));
	createEffect(() => others.orientation === "vertical" ? "right" : "bottom", (placement) => {
		setCurrentPlacement(placement);
	});
	let timeoutId;
	const [previousMenu, setPreviousMenu] = createSignal();
	const [show, setShow] = createSignal(false);
	const [expanded, setExpanded] = createSignal(false);
	createEffect(() => !!(value() && !value().includes("link-trigger-") && autoFocusMenu()), (isVisible) => {
		setExpanded(isVisible);
		setShow(isVisible);
	});
	const dataset = createMemo(() => ({
		"data-expanded": expanded() ? "" : void 0,
		"data-closed": !expanded() ? "" : void 0
	}));
	const { isMounted: viewportPresent } = createPresence(() => mergedProps.forceMount || show() || expanded() || void 0, { transitionDuration: 0 });
	createEffect(() => viewportPresent(), (isPresent) => {
		if (!isPresent) context.setPreviousMenu(void 0);
	});
	const context = {
		dataset,
		delayDuration: () => mergedProps.delayDuration,
		skipDelayDuration: () => mergedProps.skipDelayDuration,
		autoFocusMenu,
		setAutoFocusMenu,
		startLeaveTimer: () => {
			timeoutId = window.setTimeout(() => {
				context.setAutoFocusMenu(false);
				setValue(void 0);
			}, context.skipDelayDuration());
		},
		cancelLeaveTimer: () => {
			if (timeoutId) clearTimeout(timeoutId);
		},
		rootRef,
		setRootRef,
		viewportRef,
		setViewportRef,
		viewportPresent,
		currentPlacement,
		previousMenu,
		setPreviousMenu
	};
	return createComponent(NavigationMenuContext, {
		value: context,
		get children() {
			return createComponent(Popper, mergeProps({
				anchorRef: rootRef,
				contentRef: viewportRef,
				get placement() {
					return currentPlacement();
				},
				onCurrentPlacementChange: setCurrentPlacement
			}, popperProps, { get children() {
				var _el$ = _tmpl$$1();
				insert(_el$, createComponent(MenubarRoot, mergeProps({
					as: "ul",
					ref: [context.setRootRef, mergedProps.ref],
					get value() {
						return value() ?? null;
					},
					onValueChange: setValue,
					get autoFocusMenu() {
						return autoFocusMenu();
					},
					onAutoFocusMenuChange: setAutoFocusMenu
				}, others)));
				return _el$;
			} }));
		}
	});
}
//#endregion
//#region src/navigation-menu/navigation-menu-trigger.tsx
var _tmpl$ = /*#__PURE__*/ template(`<li role=presentation>`);
/**
* The button that toggles the menubar menu or a menubar link.
*/
function NavigationMenuTrigger(props) {
	const context = useNavigationMenuContext();
	const menuContext = useOptionalMenuContext();
	const others = omit(props, "onPointerEnter", "onPointerLeave", "onClick");
	let timeoutId;
	const onClick = (e) => {
		callHandler(e, props.onClick);
		if (timeoutId) clearTimeout(timeoutId);
	};
	const onPointerEnter = (e) => {
		callHandler(e, props.onPointerEnter);
		if (e.pointerType === "touch") return;
		context.cancelLeaveTimer();
		if (context.dataset()["data-expanded"] === "") return;
		timeoutId = window.setTimeout(() => {
			menuContext?.triggerRef()?.focus();
			setTimeout(() => {
				context.setAutoFocusMenu(true);
			});
		}, context.delayDuration());
	};
	const onPointerLeave = (e) => {
		callHandler(e, props.onPointerLeave);
		if (e.pointerType === "touch") return;
		context.startLeaveTimer();
		if (timeoutId) clearTimeout(timeoutId);
	};
	var _el$ = _tmpl$();
	insert(_el$, createComponent(MenubarTrigger, mergeProps({
		onClick,
		onPointerEnter,
		onPointerLeave
	}, others)));
	return _el$;
}
//#endregion
//#region src/navigation-menu/navigation-menu-viewport.tsx
function NavigationMenuViewport(props) {
	const context = useNavigationMenuContext();
	const menubarContext = useMenubarContext();
	const [ref, setRef] = createSignal();
	const others = omit(props, "ref", "style", "onEscapeKeyDown");
	const close = () => {
		menubarContext.setAutoFocusMenu(false);
		menubarContext.closeMenu();
	};
	const onEscapeKeyDown = (_e) => {
		close();
	};
	const size = createElementSize(ref);
	createEffect(() => menubarContext.value() ? menubarContext.menuRefMap().get(menubarContext.value()) : void 0, (menu) => {
		if (menu === void 0 || menu[0] === void 0) return;
		setRef(menu[0]);
	});
	const height = createMemo((prev) => {
		if (ref() === void 0 || !context.viewportPresent()) return void 0;
		if (size.height === null) return prev;
		return size.height;
	});
	const width = createMemo((prev) => {
		if (ref() === void 0 || !context.viewportPresent()) return void 0;
		if (size.width === null) return prev;
		return size.width;
	});
	return createComponent(Show, {
		get when() {
			return context.viewportPresent();
		},
		get children() {
			return createComponent(Popper.Positioner, {
				role: "presentation",
				get children() {
					return createComponent(DismissableLayer, mergeProps({
						as: "li",
						role: "presentation",
						ref: [context.setViewportRef, props.ref],
						get excludedElements() {
							return [context.rootRef];
						},
						bypassTopMostLayerCheck: true,
						get style() {
							return combineStyle({
								"--kb-menu-content-transform-origin": "var(--kb-popper-content-transform-origin)",
								"--kb-navigation-menu-viewport-height": height() ? `${height()}px` : void 0,
								"--kb-navigation-menu-viewport-width": width() ? `${width()}px` : void 0,
								position: "relative"
							}, props.style);
						},
						get onEscapeKeyDown() {
							return composeEventHandlers([props.onEscapeKeyDown, onEscapeKeyDown]);
						},
						onDismiss: close,
						get ["data-orientation"]() {
							return menubarContext.orientation();
						}
					}, () => context.dataset(), others));
				}
			});
		}
	});
}
//#endregion
//#region src/navigation-menu/index.tsx
const NavigationMenu = Object.assign(NavigationMenuRoot, {
	Arrow: NavigationMenuArrow,
	CheckboxItem: MenuCheckboxItem,
	Content: NavigationMenuContent,
	Group: MenuGroup,
	GroupLabel: MenuGroupLabel,
	Icon: MenuIcon,
	Item: NavigationMenuItem,
	ItemDescription: MenuItemDescription,
	ItemIndicator: MenuItemIndicator,
	ItemLabel: MenuItemLabel,
	Portal: NavigationMenuPortal,
	RadioGroup: MenuRadioGroup,
	RadioItem: MenuRadioItem,
	Menu: NavigationMenuMenu,
	Separator: SeparatorRoot,
	Sub: MenuSub,
	SubContent: MenuSubContent,
	SubTrigger: MenuSubTrigger,
	Trigger: NavigationMenuTrigger,
	Viewport: NavigationMenuViewport
});
//#endregion
export { NavigationMenuArrow as Arrow, MenuCheckboxItem as CheckboxItem, NavigationMenuContent as Content, MenuGroup as Group, MenuGroupLabel as GroupLabel, MenuIcon as Icon, NavigationMenuItem as Item, MenuItemDescription as ItemDescription, MenuItemIndicator as ItemIndicator, MenuItemLabel as ItemLabel, NavigationMenuMenu as Menu, NavigationMenu, NavigationMenuPortal as Portal, MenuRadioGroup as RadioGroup, MenuRadioItem as RadioItem, NavigationMenuRoot as Root, SeparatorRoot as Separator, MenuSub as Sub, MenuSubContent as SubContent, MenuSubTrigger as SubTrigger, NavigationMenuTrigger as Trigger, NavigationMenuViewport as Viewport, useNavigationMenuContext };
