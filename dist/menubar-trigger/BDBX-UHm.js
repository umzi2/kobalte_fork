import { Polymorphic } from "../polymorphic/index.js";
import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { C as MenubarContext, b as useOptionalMenuContext, g as MenuTrigger, i as MenuRoot, w as useMenubarContext } from "../menu-sub-trigger/DBWV3t7Q.js";
import { createComponent, isServer, mergeProps } from "@solidjs/web";
import { createEffect, createMemo, createSignal, createUniqueId, merge, omit } from "solid-js";
import { interactOutside } from "@solid-primitives/interaction";
//#region src/menubar/menubar-menu.tsx
/**
* Displays a menu to the user —such as a set of actions or functions— triggered by a button.
*/
function MenubarMenu(props) {
	const menubarContext = useMenubarContext();
	const mergedProps = merge({ modal: false }, props);
	const others = omit(mergedProps, "value");
	const uniqueid = createUniqueId();
	const defaultId = menubarContext.generateId(`menubar-menu-${uniqueid}`);
	const mergedPropsWithId = merge({ id: defaultId }, others);
	return createComponent(MenuRoot, mergeProps({ get value() {
		return mergedProps.value ?? uniqueid;
	} }, mergedPropsWithId));
}
//#endregion
//#region src/menubar/menubar-root.tsx
/**
* A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
*/
function MenubarRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const defaultId = `menubar-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		loop: true,
		orientation: "horizontal"
	}, props);
	const others = omit(mergedProps, "ref", "value", "defaultValue", "onValueChange", "loop", "focusOnAlt", "autoFocusMenu", "onAutoFocusMenuChange", "orientation");
	const [value, setValue] = (0, primitives_exports.createControllableSignal)({
		value: () => mergedProps.value,
		defaultValue: () => mergedProps.defaultValue,
		onChange: (value) => mergedProps.onValueChange?.(value)
	});
	const [lastValue, setLastValue] = createSignal(void 0, { ownedWrite: true });
	const [menuRefs, setMenuRefs] = createSignal(/* @__PURE__ */ new Map());
	const [autoFocusMenu, setAutoFocusMenu] = (0, primitives_exports.createControllableSignal)({
		value: () => mergedProps.autoFocusMenu,
		defaultValue: () => false,
		onChange: mergedProps.onAutoFocusMenuChange
	});
	const expanded = () => {
		return value() && autoFocusMenu() && !value()?.includes("link-trigger-");
	};
	const context = {
		dataset: createMemo(() => ({
			"data-expanded": expanded() ? "" : void 0,
			"data-closed": !expanded() ? "" : void 0
		})),
		value,
		setValue,
		lastValue,
		setLastValue,
		menus: () => /* @__PURE__ */ new Set([...menuRefs().keys()]),
		menuRefs: () => [...menuRefs().values()].flat(),
		menuRefMap: () => menuRefs(),
		registerMenu: (value, refs) => {
			setMenuRefs((prev) => {
				const map = /* @__PURE__ */ new Map();
				for (const [key, val] of prev) map.set(key, val);
				map.set(value, refs);
				return map;
			});
		},
		unregisterMenu: (value) => {
			setMenuRefs((prev) => {
				prev.delete(value);
				const map = /* @__PURE__ */ new Map();
				for (const [key, val] of prev) map.set(key, val);
				return map;
			});
		},
		nextMenu: () => {
			const menusArray = [...menuRefs().keys()];
			if (value() == null) {
				setValue(menusArray[0]);
				return;
			}
			const currentIndex = menusArray.indexOf(value());
			if (currentIndex === menusArray.length - 1) {
				if (mergedProps.loop) setValue(menusArray[0]);
				return;
			}
			setValue(menusArray[currentIndex + 1]);
		},
		previousMenu: () => {
			const menusArray = [...menuRefs().keys()];
			if (value() == null) {
				setValue(menusArray[0]);
				return;
			}
			const currentIndex = menusArray.indexOf(value());
			if (currentIndex === 0) {
				if (mergedProps.loop) setValue(menusArray[menusArray.length - 1]);
				return;
			}
			setValue(menusArray[currentIndex - 1]);
		},
		closeMenu: () => {
			setAutoFocusMenu(false);
			setValue(void 0);
		},
		autoFocusMenu: () => autoFocusMenu(),
		setAutoFocusMenu,
		generateId: (suffix) => `${others.id}-${suffix}`,
		orientation: () => mergedProps.orientation
	};
	createEffect(() => value(), (val) => {
		if (val == null) setAutoFocusMenu(false);
	});
	const interactOutsideRef = interactOutside({
		onInteractOutside: () => {
			context.closeMenu();
			setTimeout(() => context.closeMenu());
		},
		shouldExcludeElement: (element) => {
			return [ref(), ...menuRefs().values()].flat().some((ref) => ref?.contains(element));
		}
	});
	const keydownHandler = (e) => {
		if (e.key === "Alt") {
			e.preventDefault();
			e.stopPropagation();
			if (context.value() === void 0) context.nextMenu();
			else context.closeMenu();
		}
	};
	createEffect(() => mergedProps.focusOnAlt, (focusOnAlt) => {
		if (isServer) return;
		if (focusOnAlt) window.addEventListener("keydown", keydownHandler);
		else window.removeEventListener("keydown", keydownHandler);
		return () => window.removeEventListener("keydown", keydownHandler);
	});
	createEffect(() => value(), (val) => {
		if (val != null) setLastValue(val);
	});
	return createComponent(MenubarContext, {
		value: context,
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "div",
				ref: [
					interactOutsideRef,
					setRef,
					mergedProps.ref
				],
				role: "menubar",
				get ["data-orientation"]() {
					return mergedProps.orientation;
				},
				get ["aria-orientation"]() {
					return mergedProps.orientation;
				}
			}, others));
		}
	});
}
//#endregion
//#region src/menubar/menubar-trigger.tsx
/**
* The button that toggles the menubar menu or a menubar link.
*/
function MenubarTrigger(props) {
	const menubarContext = useMenubarContext();
	if (useOptionalMenuContext() === void 0 && Object.hasOwn(props, "href")) {
		const id = menubarContext.generateId("link-trigger-") + createUniqueId();
		return createComponent(MenubarMenu, {
			value: id,
			get children() {
				return createComponent(MenuTrigger, props);
			}
		});
	}
	return MenuTrigger(props);
}
//#endregion
export { MenubarRoot as n, MenubarMenu as r, MenubarTrigger as t };
