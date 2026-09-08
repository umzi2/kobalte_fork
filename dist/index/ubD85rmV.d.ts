import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { d as PopperArrowCommonProps, f as PopperArrowOptions, m as PopperArrowRenderProps, p as PopperArrowProps, u as PopperArrow } from "./DTS_JDht.js";
import { $ as MenuIconCommonProps, A as MenuPortal, B as MenuItemIndicatorProps, C as MenuRadioItemProps, Ct as MenuCheckboxItemRenderProps, D as MenuRadioGroupOptions, E as MenuRadioGroupCommonProps, F as MenuItemLabelProps, G as MenuItemDescriptionProps, H as MenuItemDescription, I as MenuItemLabelRenderProps, J as MenuItemCommonProps, K as MenuItemDescriptionRenderProps, L as MenuItemIndicator, M as MenuItemLabel, N as MenuItemLabelCommonProps, O as MenuRadioGroupProps, P as MenuItemLabelOptions, Q as MenuIcon, R as MenuItemIndicatorCommonProps, S as MenuRadioItemOptions, St as MenuCheckboxItemProps, T as MenuRadioGroup, U as MenuItemDescriptionCommonProps, V as MenuItemIndicatorRenderProps, W as MenuItemDescriptionOptions, X as MenuItemProps, Y as MenuItemOptions, Z as MenuItemRenderProps, _ as MenuSubOptions, _t as MenuContentRenderProps, a as MenuTriggerRenderProps, at as MenuGroupLabelOptions, b as MenuRadioItem, bt as MenuCheckboxItemCommonProps, c as MenuSubTriggerOptions, ct as MenuGroup, d as MenuSubContent, dt as MenuGroupProps, et as MenuIconOptions, f as MenuSubContentCommonProps, ft as MenuGroupRenderProps, g as MenuSub, gt as MenuContentProps, h as MenuSubContentRenderProps, ht as MenuContentOptions, i as MenuTriggerProps, it as MenuGroupLabelCommonProps, j as MenuPortalProps, k as MenuRadioGroupRenderProps, l as MenuSubTriggerProps, lt as MenuGroupCommonProps, m as MenuSubContentProps, mt as MenuContentCommonProps, n as MenuTriggerCommonProps, nt as MenuIconRenderProps, o as MenuSubTrigger, ot as MenuGroupLabelProps, p as MenuSubContentOptions, pt as MenuContent, q as MenuItem, r as MenuTriggerOptions, rt as MenuGroupLabel, s as MenuSubTriggerCommonProps, st as MenuGroupLabelRenderProps, tt as MenuIconProps, u as MenuSubTriggerRenderProps, ut as MenuGroupOptions, v as MenuSubProps, w as MenuRadioItemRenderProps, x as MenuRadioItemCommonProps, xt as MenuCheckboxItemOptions, y as MenuRootOptions, yt as MenuCheckboxItem, z as MenuItemIndicatorOptions } from "./i-i2ocoX.js";
import { a as SeparatorRootOptions, i as SeparatorRootCommonProps, o as SeparatorRootProps, r as SeparatorRoot, s as SeparatorRootRenderProps } from "./D5H2Dwz2.js";
import { ValidComponent } from "@solidjs/web";
import { Accessor, ParentProps, Ref, Setter } from "solid-js";
import { Orientation } from "@kobalte/utils";
//#region src/menubar/menubar-menu.d.ts
interface MenubarMenuOptions extends MenuRootOptions {}
interface MenubarMenuProps extends ParentProps<MenubarMenuOptions> {}
/**
 * Displays a menu to the user —such as a set of actions or functions— triggered by a button.
 */
declare function MenubarMenu(props: MenubarMenuProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menubar/menubar-root.d.ts
interface MenubarRootOptions {
  /** The value of the menu that should be open when initially rendered. Use when you do not need to control the value state. */
  defaultValue?: string;
  /** The controlled value of the menu to open. Should be used in conjunction with onValueChange. */
  value?: string | null;
  /** Event handler called when the value changes. */
  onValueChange?: (value: string | undefined | null) => void;
  /** When true, keyboard navigation will loop from last item to first, and vice versa. (default: true) */
  loop?: boolean;
  /** When true, click on alt by itsef will focus this Menubar (some browsers interfere) */
  focusOnAlt?: boolean;
  /** The orientation of the menubar. */
  orientation?: Orientation;
  autoFocusMenu?: boolean;
  onAutoFocusMenuChange?: Setter<boolean>;
}
interface MenubarRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
}
interface MenubarRootRenderProps extends MenubarRootCommonProps {
  role: "menubar";
  "data-orientation": "horizontal" | "vertical";
  "aria-orientation": "horizontal" | "vertical";
}
type MenubarRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenubarRootOptions & Partial<MenubarRootCommonProps<ElementOf<T>>>;
/**
 * A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
 */
declare function MenubarRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, MenubarRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menubar/menubar-trigger.d.ts
/**
 * The button that toggles the menubar menu or a menubar link.
 */
declare function MenubarTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, MenuTriggerProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menubar/menubar-context.d.ts
interface MenubarDataSet {
  "data-expanded": string | undefined;
  "data-closed": string | undefined;
}
interface MenubarContextValue {
  dataset: Accessor<MenubarDataSet>;
  value: Accessor<string | undefined | null>;
  setValue: (next: string | ((prev: string | undefined | null) => string | undefined) | undefined | null) => void;
  menus: Accessor<Set<string>>;
  menuRefs: Accessor<Array<HTMLElement>>;
  menuRefMap: Accessor<Map<string, Array<HTMLElement>>>;
  lastValue: Accessor<string | undefined>;
  setLastValue: (next: string | ((prev: string | undefined) => string | undefined) | undefined) => void;
  registerMenu: (value: string, refs: Array<HTMLElement>) => void;
  unregisterMenu: (value: string) => void;
  nextMenu: () => void;
  previousMenu: () => void;
  closeMenu: () => void;
  setAutoFocusMenu: Setter<boolean>;
  autoFocusMenu: Accessor<boolean>;
  generateId: (part: string) => string;
  orientation: Accessor<Orientation>;
}
declare function useMenubarContext(): MenubarContextValue;
declare namespace index_d_exports {
  export { PopperArrow as Arrow, MenuCheckboxItem as CheckboxItem, MenuContent as Content, MenuGroup as Group, MenuGroupLabel as GroupLabel, MenuIcon as Icon, MenuItem as Item, MenuItemDescription as ItemDescription, MenuItemIndicator as ItemIndicator, MenuItemLabel as ItemLabel, MenubarMenu as Menu, Menubar, PopperArrowCommonProps as MenubarArrowCommonProps, PopperArrowOptions as MenubarArrowOptions, PopperArrowProps as MenubarArrowProps, PopperArrowRenderProps as MenubarArrowRenderProps, MenuCheckboxItemCommonProps as MenubarCheckboxItemCommonProps, MenuCheckboxItemOptions as MenubarCheckboxItemOptions, MenuCheckboxItemProps as MenubarCheckboxItemProps, MenuCheckboxItemRenderProps as MenubarCheckboxItemRenderProps, MenuContentCommonProps as MenubarContentCommonProps, MenuContentOptions as MenubarContentOptions, MenuContentProps as MenubarContentProps, MenuContentRenderProps as MenubarContentRenderProps, MenubarContextValue, MenuGroupCommonProps as MenubarGroupCommonProps, MenuGroupLabelCommonProps as MenubarGroupLabelCommonProps, MenuGroupLabelOptions as MenubarGroupLabelOptions, MenuGroupLabelProps as MenubarGroupLabelProps, MenuGroupLabelRenderProps as MenubarGroupLabelRenderProps, MenuGroupOptions as MenubarGroupOptions, MenuGroupProps as MenubarGroupProps, MenuGroupRenderProps as MenubarGroupRenderProps, MenuIconCommonProps as MenubarIconCommonProps, MenuIconOptions as MenubarIconOptions, MenuIconProps as MenubarIconProps, MenuIconRenderProps as MenubarIconRenderProps, MenuItemCommonProps as MenubarItemCommonProps, MenuItemDescriptionCommonProps as MenubarItemDescriptionCommonProps, MenuItemDescriptionOptions as MenubarItemDescriptionOptions, MenuItemDescriptionProps as MenubarItemDescriptionProps, MenuItemDescriptionRenderProps as MenubarItemDescriptionRenderProps, MenuItemIndicatorCommonProps as MenubarItemIndicatorCommonProps, MenuItemIndicatorOptions as MenubarItemIndicatorOptions, MenuItemIndicatorProps as MenubarItemIndicatorProps, MenuItemIndicatorRenderProps as MenubarItemIndicatorRenderProps, MenuItemLabelCommonProps as MenubarItemLabelCommonProps, MenuItemLabelOptions as MenubarItemLabelOptions, MenuItemLabelProps as MenubarItemLabelProps, MenuItemLabelRenderProps as MenubarItemLabelRenderProps, MenuItemOptions as MenubarItemOptions, MenuItemProps as MenubarItemProps, MenuItemRenderProps as MenubarItemRenderProps, MenubarMenuOptions, MenubarMenuProps, MenuPortalProps as MenubarPortalProps, MenuRadioGroupCommonProps as MenubarRadioGroupCommonProps, MenuRadioGroupOptions as MenubarRadioGroupOptions, MenuRadioGroupProps as MenubarRadioGroupProps, MenuRadioGroupRenderProps as MenubarRadioGroupRenderProps, MenuRadioItemCommonProps as MenubarRadioItemCommonProps, MenuRadioItemOptions as MenubarRadioItemOptions, MenuRadioItemRenderProps as MenubarRadioItemPRenderrops, MenuRadioItemProps as MenubarRadioItemProps, MenubarRootCommonProps, MenubarRootOptions, MenubarRootProps, MenubarRootRenderProps, SeparatorRootCommonProps as MenubarSeparatorCommonProps, SeparatorRootOptions as MenubarSeparatorOptions, SeparatorRootProps as MenubarSeparatorProps, SeparatorRootRenderProps as MenubarSeparatorRenderProps, MenuSubContentCommonProps as MenubarSubContentCommonProps, MenuSubContentOptions as MenubarSubContentOptions, MenuSubContentProps as MenubarSubContentProps, MenuSubContentRenderProps as MenubarSubContentRenderProps, MenuSubOptions as MenubarSubOptions, MenuSubProps as MenubarSubProps, MenuSubTriggerCommonProps as MenubarSubTriggerCommonProps, MenuSubTriggerOptions as MenubarSubTriggerOptions, MenuSubTriggerProps as MenubarSubTriggerProps, MenuSubTriggerRenderProps as MenubarSubTriggerRenderProps, MenuTriggerCommonProps as MenubarTriggerCommonProps, MenuTriggerOptions as MenubarTriggerOptions, MenuTriggerProps as MenubarTriggerProps, MenuTriggerRenderProps as MenubarTriggerRenderProps, MenuPortal as Portal, MenuRadioGroup as RadioGroup, MenuRadioItem as RadioItem, MenubarRoot as Root, SeparatorRoot as Separator, MenuSub as Sub, MenuSubContent as SubContent, MenuSubTrigger as SubTrigger, MenubarTrigger as Trigger, useMenubarContext };
}
declare const Menubar: typeof MenubarRoot & {
  Arrow: typeof PopperArrow;
  CheckboxItem: typeof MenuCheckboxItem;
  Content: typeof MenuContent;
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
  Menu: typeof MenubarMenu;
  Separator: typeof SeparatorRoot;
  Sub: typeof MenuSub;
  SubContent: typeof MenuSubContent;
  SubTrigger: typeof MenuSubTrigger;
  Trigger: typeof MenubarTrigger;
};
//#endregion
export { useMenubarContext as a, MenubarRootCommonProps as c, MenubarRootRenderProps as d, MenubarMenu as f, MenubarDataSet as i, MenubarRootOptions as l, MenubarMenuProps as m, index_d_exports as n, MenubarTrigger as o, MenubarMenuOptions as p, MenubarContextValue as r, MenubarRoot as s, Menubar as t, MenubarRootProps as u };