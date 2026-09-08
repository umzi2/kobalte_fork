import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { d as PopperArrowCommonProps, f as PopperArrowOptions, m as PopperArrowRenderProps, p as PopperArrowProps, u as PopperArrow } from "./DTS_JDht.js";
import { $ as MenuIconCommonProps, A as MenuPortal, B as MenuItemIndicatorProps, C as MenuRadioItemProps, Ct as MenuCheckboxItemRenderProps, D as MenuRadioGroupOptions, E as MenuRadioGroupCommonProps, F as MenuItemLabelProps, G as MenuItemDescriptionProps, H as MenuItemDescription, I as MenuItemLabelRenderProps, J as MenuItemCommonProps, K as MenuItemDescriptionRenderProps, L as MenuItemIndicator, M as MenuItemLabel, N as MenuItemLabelCommonProps, O as MenuRadioGroupProps, P as MenuItemLabelOptions, Q as MenuIcon, R as MenuItemIndicatorCommonProps, S as MenuRadioItemOptions, St as MenuCheckboxItemProps, T as MenuRadioGroup, U as MenuItemDescriptionCommonProps, V as MenuItemIndicatorRenderProps, W as MenuItemDescriptionOptions, X as MenuItemProps, Y as MenuItemOptions, Z as MenuItemRenderProps, _ as MenuSubOptions, _t as MenuContentRenderProps, a as MenuTriggerRenderProps, at as MenuGroupLabelOptions, b as MenuRadioItem, bt as MenuCheckboxItemCommonProps, c as MenuSubTriggerOptions, ct as MenuGroup, d as MenuSubContent, dt as MenuGroupProps, et as MenuIconOptions, f as MenuSubContentCommonProps, ft as MenuGroupRenderProps, g as MenuSub, h as MenuSubContentRenderProps, ht as MenuContentOptions, i as MenuTriggerProps, it as MenuGroupLabelCommonProps, j as MenuPortalProps, k as MenuRadioGroupRenderProps, l as MenuSubTriggerProps, lt as MenuGroupCommonProps, m as MenuSubContentProps, mt as MenuContentCommonProps, n as MenuTriggerCommonProps, nt as MenuIconRenderProps, o as MenuSubTrigger, ot as MenuGroupLabelProps, p as MenuSubContentOptions, q as MenuItem, r as MenuTriggerOptions, rt as MenuGroupLabel, s as MenuSubTriggerCommonProps, st as MenuGroupLabelRenderProps, t as MenuTrigger, tt as MenuIconProps, u as MenuSubTriggerRenderProps, ut as MenuGroupOptions, v as MenuSubProps, w as MenuRadioItemRenderProps, x as MenuRadioItemCommonProps, xt as MenuCheckboxItemOptions, y as MenuRootOptions, yt as MenuCheckboxItem, z as MenuItemIndicatorOptions } from "./i-i2ocoX.js";
import { a as SeparatorRootOptions, i as SeparatorRootCommonProps, o as SeparatorRootProps, r as SeparatorRoot, s as SeparatorRootRenderProps } from "./D5H2Dwz2.js";
import { ValidComponent } from "@solidjs/web";
import { ParentProps } from "solid-js";
//#region src/dropdown-menu/dropdown-menu-content.d.ts
interface DropdownMenuContentOptions extends MenuContentOptions {}
interface DropdownMenuContentCommonProps<T extends HTMLElement = HTMLElement> extends MenuContentCommonProps<T> {}
interface DropdownMenuContentRenderProps extends DropdownMenuContentCommonProps, MenuContentRenderProps {}
type DropdownMenuContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = DropdownMenuContentOptions & Partial<DropdownMenuContentCommonProps<ElementOf<T>>>;
/**
 * Contains the content to be rendered when the dropdown menu is open.
 */
declare function DropdownMenuContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, DropdownMenuContentProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/dropdown-menu/dropdown-menu-root.d.ts
interface DropdownMenuRootOptions extends MenuRootOptions {}
interface DropdownMenuRootProps extends ParentProps<DropdownMenuRootOptions> {}
/**
 * Displays a menu to the user —such as a set of actions or functions— triggered by a button.
 */
declare function DropdownMenuRoot(props: DropdownMenuRootProps): import("@solidjs/web").JSX.Element;
declare namespace index_d_exports {
  export { PopperArrow as Arrow, MenuCheckboxItem as CheckboxItem, DropdownMenuContent as Content, DropdownMenu, PopperArrowCommonProps as DropdownMenuArrowCommonProps, PopperArrowOptions as DropdownMenuArrowOptions, PopperArrowProps as DropdownMenuArrowProps, PopperArrowRenderProps as DropdownMenuArrowRenderProps, MenuCheckboxItemCommonProps as DropdownMenuCheckboxItemCommonProps, MenuCheckboxItemOptions as DropdownMenuCheckboxItemOptions, MenuCheckboxItemProps as DropdownMenuCheckboxItemProps, MenuCheckboxItemRenderProps as DropdownMenuCheckboxItemRenderProps, DropdownMenuContentCommonProps, DropdownMenuContentOptions, DropdownMenuContentProps, DropdownMenuContentRenderProps, MenuGroupCommonProps as DropdownMenuGroupCommonProps, MenuGroupLabelCommonProps as DropdownMenuGroupLabelCommonProps, MenuGroupLabelOptions as DropdownMenuGroupLabelOptions, MenuGroupLabelProps as DropdownMenuGroupLabelProps, MenuGroupLabelRenderProps as DropdownMenuGroupLabelRenderProps, MenuGroupOptions as DropdownMenuGroupOptions, MenuGroupProps as DropdownMenuGroupProps, MenuGroupRenderProps as DropdownMenuGroupRenderProps, MenuIconCommonProps as DropdownMenuIconCommonProps, MenuIconOptions as DropdownMenuIconOptions, MenuIconProps as DropdownMenuIconProps, MenuIconRenderProps as DropdownMenuIconRenderProps, MenuItemCommonProps as DropdownMenuItemCommonProps, MenuItemDescriptionCommonProps as DropdownMenuItemDescriptionCommonProps, MenuItemDescriptionOptions as DropdownMenuItemDescriptionOptions, MenuItemDescriptionProps as DropdownMenuItemDescriptionProps, MenuItemDescriptionRenderProps as DropdownMenuItemDescriptionRenderProps, MenuItemIndicatorCommonProps as DropdownMenuItemIndicatorCommonProps, MenuItemIndicatorOptions as DropdownMenuItemIndicatorOptions, MenuItemIndicatorProps as DropdownMenuItemIndicatorProps, MenuItemIndicatorRenderProps as DropdownMenuItemIndicatorRenderProps, MenuItemLabelCommonProps as DropdownMenuItemLabelCommonProps, MenuItemLabelOptions as DropdownMenuItemLabelOptions, MenuItemLabelProps as DropdownMenuItemLabelProps, MenuItemLabelRenderProps as DropdownMenuItemLabelRenderProps, MenuItemOptions as DropdownMenuItemOptions, MenuItemProps as DropdownMenuItemProps, MenuItemRenderProps as DropdownMenuItemRenderProps, MenuPortalProps as DropdownMenuPortalProps, MenuRadioGroupCommonProps as DropdownMenuRadioGroupCommonProps, MenuRadioGroupOptions as DropdownMenuRadioGroupOptions, MenuRadioGroupProps as DropdownMenuRadioGroupProps, MenuRadioGroupRenderProps as DropdownMenuRadioGroupRenderProps, MenuRadioItemCommonProps as DropdownMenuRadioItemCommonProps, MenuRadioItemOptions as DropdownMenuRadioItemOptions, MenuRadioItemRenderProps as DropdownMenuRadioItemPRenderrops, MenuRadioItemProps as DropdownMenuRadioItemProps, DropdownMenuRootOptions, DropdownMenuRootProps, SeparatorRootCommonProps as DropdownMenuSeparatorCommonProps, SeparatorRootOptions as DropdownMenuSeparatorOptions, SeparatorRootProps as DropdownMenuSeparatorProps, SeparatorRootRenderProps as DropdownMenuSeparatorRenderProps, MenuSubContentCommonProps as DropdownMenuSubContentCommonProps, MenuSubContentOptions as DropdownMenuSubContentOptions, MenuSubContentProps as DropdownMenuSubContentProps, MenuSubContentRenderProps as DropdownMenuSubContentRenderProps, MenuSubOptions as DropdownMenuSubOptions, MenuSubProps as DropdownMenuSubProps, MenuSubTriggerCommonProps as DropdownMenuSubTriggerCommonProps, MenuSubTriggerOptions as DropdownMenuSubTriggerOptions, MenuSubTriggerProps as DropdownMenuSubTriggerProps, MenuSubTriggerRenderProps as DropdownMenuSubTriggerRenderProps, MenuTriggerCommonProps as DropdownMenuTriggerCommonProps, MenuTriggerOptions as DropdownMenuTriggerOptions, MenuTriggerProps as DropdownMenuTriggerProps, MenuTriggerRenderProps as DropdownMenuTriggerRenderProps, MenuGroup as Group, MenuGroupLabel as GroupLabel, MenuIcon as Icon, MenuItem as Item, MenuItemDescription as ItemDescription, MenuItemIndicator as ItemIndicator, MenuItemLabel as ItemLabel, MenuPortal as Portal, MenuRadioGroup as RadioGroup, MenuRadioItem as RadioItem, DropdownMenuRoot as Root, SeparatorRoot as Separator, MenuSub as Sub, MenuSubContent as SubContent, MenuSubTrigger as SubTrigger, MenuTrigger as Trigger };
}
declare const DropdownMenu: typeof DropdownMenuRoot & {
  Arrow: typeof PopperArrow;
  CheckboxItem: typeof MenuCheckboxItem;
  Content: typeof DropdownMenuContent;
  Group: typeof MenuGroup;
  GroupLabel: typeof MenuGroupLabel;
  Icon: typeof MenuIcon;
  Item: typeof MenuItem;
  ItemDescription: typeof MenuItemDescription;
  ItemIndicator: typeof MenuItemIndicator;
  ItemLabel: typeof MenuItemLabel;
  Portal: typeof MenuPortal;
  RadioGroup: typeof MenuRadioGroup;
  RadioItem: typeof MenuRadioItem;
  Separator: typeof SeparatorRoot;
  Sub: typeof MenuSub;
  SubContent: typeof MenuSubContent;
  SubTrigger: typeof MenuSubTrigger;
  Trigger: typeof MenuTrigger;
};
//#endregion
export { DropdownMenuRootProps as a, DropdownMenuContentOptions as c, DropdownMenuRootOptions as i, DropdownMenuContentProps as l, index_d_exports as n, DropdownMenuContent as o, DropdownMenuRoot as r, DropdownMenuContentCommonProps as s, DropdownMenu as t, DropdownMenuContentRenderProps as u };