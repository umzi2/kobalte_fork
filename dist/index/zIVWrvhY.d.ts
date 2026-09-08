import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { d as PopperArrowCommonProps, f as PopperArrowOptions, m as PopperArrowRenderProps, p as PopperArrowProps, u as PopperArrow } from "./DTS_JDht.js";
import { $ as MenuIconCommonProps, A as MenuPortal, B as MenuItemIndicatorProps, C as MenuRadioItemProps, Ct as MenuCheckboxItemRenderProps, D as MenuRadioGroupOptions, E as MenuRadioGroupCommonProps, F as MenuItemLabelProps, G as MenuItemDescriptionProps, H as MenuItemDescription, I as MenuItemLabelRenderProps, J as MenuItemCommonProps, K as MenuItemDescriptionRenderProps, L as MenuItemIndicator, M as MenuItemLabel, N as MenuItemLabelCommonProps, O as MenuRadioGroupProps, P as MenuItemLabelOptions, Q as MenuIcon, R as MenuItemIndicatorCommonProps, S as MenuRadioItemOptions, St as MenuCheckboxItemProps, T as MenuRadioGroup, U as MenuItemDescriptionCommonProps, V as MenuItemIndicatorRenderProps, W as MenuItemDescriptionOptions, X as MenuItemProps, Y as MenuItemOptions, Z as MenuItemRenderProps, _ as MenuSubOptions, _t as MenuContentRenderProps, at as MenuGroupLabelOptions, b as MenuRadioItem, bt as MenuCheckboxItemCommonProps, c as MenuSubTriggerOptions, ct as MenuGroup, d as MenuSubContent, dt as MenuGroupProps, et as MenuIconOptions, f as MenuSubContentCommonProps, ft as MenuGroupRenderProps, g as MenuSub, h as MenuSubContentRenderProps, ht as MenuContentOptions, it as MenuGroupLabelCommonProps, j as MenuPortalProps, k as MenuRadioGroupRenderProps, l as MenuSubTriggerProps, lt as MenuGroupCommonProps, m as MenuSubContentProps, mt as MenuContentCommonProps, nt as MenuIconRenderProps, o as MenuSubTrigger, ot as MenuGroupLabelProps, p as MenuSubContentOptions, q as MenuItem, rt as MenuGroupLabel, s as MenuSubTriggerCommonProps, st as MenuGroupLabelRenderProps, tt as MenuIconProps, u as MenuSubTriggerRenderProps, ut as MenuGroupOptions, v as MenuSubProps, vt as MenuDataSet, w as MenuRadioItemRenderProps, x as MenuRadioItemCommonProps, xt as MenuCheckboxItemOptions, y as MenuRootOptions, yt as MenuCheckboxItem, z as MenuItemIndicatorOptions } from "./i-i2ocoX.js";
import { a as SeparatorRootOptions, i as SeparatorRootCommonProps, o as SeparatorRootProps, r as SeparatorRoot, s as SeparatorRootRenderProps } from "./D5H2Dwz2.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { ParentProps, Ref, Setter } from "solid-js";
//#region src/context-menu/context-menu-content.d.ts
interface ContextMenuContentOptions extends MenuContentOptions {}
interface ContextMenuContentCommonProps<T extends HTMLElement = HTMLElement> extends MenuContentCommonProps<T> {}
interface ContextMenuContentRenderProps extends ContextMenuContentCommonProps, MenuContentRenderProps {}
type ContextMenuContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = ContextMenuContentOptions & Partial<ContextMenuContentCommonProps<ElementOf<T>>>;
declare function ContextMenuContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, ContextMenuContentProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/context-menu/context-menu-root.d.ts
interface ContextMenuRootOptions extends Omit<MenuRootOptions, "open" | "defaultOpen" | "getAnchorRect"> {}
interface ContextMenuRootProps extends ParentProps<ContextMenuRootOptions> {}
/**
 * Displays a menu located at the pointer, triggered by a right-click or a long-press.
 */
declare function ContextMenuRoot(props: ContextMenuRootProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/context-menu/context-menu-trigger.d.ts
interface ContextMenuTriggerOptions {
  /** Whether the context menu trigger is disabled. */
  disabled?: boolean;
}
interface ContextMenuTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  onContextMenu: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerMove: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerCancel: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerUp: JSX$1.EventHandlerUnion<T, PointerEvent>;
  style?: JSX$1.CSSProperties | string;
}
interface ContextMenuTriggerRenderProps extends ContextMenuTriggerCommonProps, MenuDataSet {}
type ContextMenuTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = ContextMenuTriggerOptions & Partial<ContextMenuTriggerCommonProps<ElementOf<T>>>;
declare function ContextMenuTrigger<T extends ValidComponent = "div">(props: PolymorphicProps<T, ContextMenuTriggerProps<T>>): JSX$1.Element;
//#endregion
//#region src/context-menu/context-menu-context.d.ts
interface ContextMenuContextValue {
  setAnchorRect: Setter<{
    x: number;
    y: number;
  }>;
}
declare function useContextMenuContext(): ContextMenuContextValue;
declare namespace index_d_exports {
  export { PopperArrow as Arrow, MenuCheckboxItem as CheckboxItem, ContextMenuContent as Content, ContextMenu, PopperArrowCommonProps as ContextMenuArrowCommonProps, PopperArrowOptions as ContextMenuArrowOptions, PopperArrowProps as ContextMenuArrowProps, PopperArrowRenderProps as ContextMenuArrowRenderProps, MenuCheckboxItemCommonProps as ContextMenuCheckboxItemCommonProps, MenuCheckboxItemOptions as ContextMenuCheckboxItemOptions, MenuCheckboxItemProps as ContextMenuCheckboxItemProps, MenuCheckboxItemRenderProps as ContextMenuCheckboxItemRenderProps, ContextMenuContentCommonProps, ContextMenuContentOptions, ContextMenuContentProps, ContextMenuContentRenderProps, ContextMenuContextValue, MenuGroupCommonProps as ContextMenuGroupCommonProps, MenuGroupLabelCommonProps as ContextMenuGroupLabelCommonProps, MenuGroupLabelOptions as ContextMenuGroupLabelOptions, MenuGroupLabelProps as ContextMenuGroupLabelProps, MenuGroupLabelRenderProps as ContextMenuGroupLabelRenderProps, MenuGroupOptions as ContextMenuGroupOptions, MenuGroupProps as ContextMenuGroupProps, MenuGroupRenderProps as ContextMenuGroupRenderProps, MenuIconCommonProps as ContextMenuIconCommonProps, MenuIconOptions as ContextMenuIconOptions, MenuIconProps as ContextMenuIconProps, MenuIconRenderProps as ContextMenuIconRenderProps, MenuItemCommonProps as ContextMenuItemCommonProps, MenuItemDescriptionCommonProps as ContextMenuItemDescriptionCommonProps, MenuItemDescriptionOptions as ContextMenuItemDescriptionOptions, MenuItemDescriptionProps as ContextMenuItemDescriptionProps, MenuItemDescriptionRenderProps as ContextMenuItemDescriptionRenderProps, MenuItemIndicatorCommonProps as ContextMenuItemIndicatorCommonProps, MenuItemIndicatorOptions as ContextMenuItemIndicatorOptions, MenuItemIndicatorProps as ContextMenuItemIndicatorProps, MenuItemIndicatorRenderProps as ContextMenuItemIndicatorRenderProps, MenuItemLabelCommonProps as ContextMenuItemLabelCommonProps, MenuItemLabelOptions as ContextMenuItemLabelOptions, MenuItemLabelProps as ContextMenuItemLabelProps, MenuItemLabelRenderProps as ContextMenuItemLabelRenderProps, MenuItemOptions as ContextMenuItemOptions, MenuItemProps as ContextMenuItemProps, MenuItemRenderProps as ContextMenuItemRenderProps, MenuPortalProps as ContextMenuPortalProps, MenuRadioGroupCommonProps as ContextMenuRadioGroupCommonProps, MenuRadioGroupOptions as ContextMenuRadioGroupOptions, MenuRadioGroupProps as ContextMenuRadioGroupProps, MenuRadioGroupRenderProps as ContextMenuRadioGroupRenderProps, MenuRadioItemCommonProps as ContextMenuRadioItemCommonProps, MenuRadioItemOptions as ContextMenuRadioItemOptions, MenuRadioItemRenderProps as ContextMenuRadioItemPRenderrops, MenuRadioItemProps as ContextMenuRadioItemProps, ContextMenuRootOptions, ContextMenuRootProps, SeparatorRootCommonProps as ContextMenuSeparatorCommonProps, SeparatorRootOptions as ContextMenuSeparatorOptions, SeparatorRootProps as ContextMenuSeparatorProps, SeparatorRootRenderProps as ContextMenuSeparatorRenderProps, MenuSubContentCommonProps as ContextMenuSubContentCommonProps, MenuSubContentOptions as ContextMenuSubContentOptions, MenuSubContentProps as ContextMenuSubContentProps, MenuSubContentRenderProps as ContextMenuSubContentRenderProps, MenuSubOptions as ContextMenuSubOptions, MenuSubProps as ContextMenuSubProps, MenuSubTriggerCommonProps as ContextMenuSubTriggerCommonProps, MenuSubTriggerOptions as ContextMenuSubTriggerOptions, MenuSubTriggerProps as ContextMenuSubTriggerProps, MenuSubTriggerRenderProps as ContextMenuSubTriggerRenderProps, ContextMenuTriggerCommonProps, ContextMenuTriggerOptions, ContextMenuTriggerProps, ContextMenuTriggerRenderProps, MenuGroup as Group, MenuGroupLabel as GroupLabel, MenuIcon as Icon, MenuItem as Item, MenuItemDescription as ItemDescription, MenuItemIndicator as ItemIndicator, MenuItemLabel as ItemLabel, MenuPortal as Portal, MenuRadioGroup as RadioGroup, MenuRadioItem as RadioItem, ContextMenuRoot as Root, SeparatorRoot as Separator, MenuSub as Sub, MenuSubContent as SubContent, MenuSubTrigger as SubTrigger, ContextMenuTrigger as Trigger, useContextMenuContext };
}
declare const ContextMenu: typeof ContextMenuRoot & {
  Arrow: typeof PopperArrow;
  CheckboxItem: typeof MenuCheckboxItem;
  Content: typeof ContextMenuContent;
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
  Trigger: typeof ContextMenuTrigger;
};
//#endregion
export { ContextMenuContentRenderProps as _, ContextMenuTrigger as a, ContextMenuTriggerProps as c, ContextMenuRootOptions as d, ContextMenuRootProps as f, ContextMenuContentProps as g, ContextMenuContentOptions as h, useContextMenuContext as i, ContextMenuTriggerRenderProps as l, ContextMenuContentCommonProps as m, index_d_exports as n, ContextMenuTriggerCommonProps as o, ContextMenuContent as p, ContextMenuContextValue as r, ContextMenuTriggerOptions as s, ContextMenu as t, ContextMenuRoot as u };