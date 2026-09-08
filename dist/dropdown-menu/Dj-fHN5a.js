import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { i as PopperArrow } from "../popper/BTyI8BKK.js";
import { _ as MenuCheckboxItem, a as MenuRadioItem, c as MenuItemLabel, d as MenuItem, f as MenuIcon, g as MenuTrigger, h as MenuContent, i as MenuRoot, l as MenuItemIndicator, m as MenuGroup, n as MenuSubContent, o as MenuRadioGroup, p as MenuGroupLabel, r as MenuSub, s as MenuPortal, t as MenuSubTrigger, u as MenuItemDescription, v as useMenuRootContext, y as useMenuContext } from "../menu-sub-trigger/DBWV3t7Q.js";
import { r as SeparatorRoot } from "../separator/ufyduBta.js";
import { createComponent, mergeProps } from "@solidjs/web";
import { createUniqueId, merge, omit } from "solid-js";
//#region src/dropdown-menu/dropdown-menu-content.tsx
/**
* Contains the content to be rendered when the dropdown menu is open.
*/
function DropdownMenuContent(props) {
	const rootContext = useMenuRootContext();
	const context = useMenuContext();
	const others = omit(props, "onCloseAutoFocus", "onInteractOutside");
	let hasInteractedOutside = false;
	const onCloseAutoFocus = (e) => {
		props.onCloseAutoFocus?.(e);
		if (!hasInteractedOutside) context.triggerRef()?.focus({ preventScroll: true });
		hasInteractedOutside = false;
		e.preventDefault();
	};
	const onInteractOutside = (e) => {
		props.onInteractOutside?.(e);
		if (!rootContext.isModal() || e.detail.isContextMenu) hasInteractedOutside = true;
	};
	return createComponent(MenuContent, mergeProps({
		onCloseAutoFocus,
		onInteractOutside
	}, others));
}
//#endregion
//#region src/dropdown-menu/dropdown-menu-root.tsx
/**
* Displays a menu to the user —such as a set of actions or functions— triggered by a button.
*/
function DropdownMenuRoot(props) {
	const defaultId = `dropdownmenu-${createUniqueId()}`;
	const mergedProps = merge({ id: defaultId }, props);
	return createComponent(MenuRoot, mergedProps);
}
//#endregion
//#region src/dropdown-menu/index.tsx
var dropdown_menu_exports = /* @__PURE__ */ __exportAll({
	Arrow: () => PopperArrow,
	CheckboxItem: () => MenuCheckboxItem,
	Content: () => DropdownMenuContent,
	DropdownMenu: () => DropdownMenu,
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
	Root: () => DropdownMenuRoot,
	Separator: () => SeparatorRoot,
	Sub: () => MenuSub,
	SubContent: () => MenuSubContent,
	SubTrigger: () => MenuSubTrigger,
	Trigger: () => MenuTrigger
});
const DropdownMenu = Object.assign(DropdownMenuRoot, {
	Arrow: PopperArrow,
	CheckboxItem: MenuCheckboxItem,
	Content: DropdownMenuContent,
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
	Trigger: MenuTrigger
});
//#endregion
export { DropdownMenuContent as i, dropdown_menu_exports as n, DropdownMenuRoot as r, DropdownMenu as t };
