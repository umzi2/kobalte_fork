import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { n as DismissableLayerRenderProps } from "../index/D_ZxK-J-.js";
import { d as PopperArrowCommonProps, f as PopperArrowOptions, m as PopperArrowRenderProps, r as PopperRootOptions, v as Placement } from "../index/DTS_JDht.js";
import { $ as MenuIconCommonProps, B as MenuItemIndicatorProps, C as MenuRadioItemProps, Ct as MenuCheckboxItemRenderProps, D as MenuRadioGroupOptions, E as MenuRadioGroupCommonProps, F as MenuItemLabelProps, G as MenuItemDescriptionProps, H as MenuItemDescription, I as MenuItemLabelRenderProps, J as MenuItemCommonProps, K as MenuItemDescriptionRenderProps, L as MenuItemIndicator, M as MenuItemLabel, N as MenuItemLabelCommonProps, O as MenuRadioGroupProps, P as MenuItemLabelOptions, Q as MenuIcon, R as MenuItemIndicatorCommonProps, S as MenuRadioItemOptions, St as MenuCheckboxItemProps, T as MenuRadioGroup, U as MenuItemDescriptionCommonProps, V as MenuItemIndicatorRenderProps, W as MenuItemDescriptionOptions, X as MenuItemProps, Y as MenuItemOptions, Z as MenuItemRenderProps, _ as MenuSubOptions, _t as MenuContentRenderProps, a as MenuTriggerRenderProps, at as MenuGroupLabelOptions, b as MenuRadioItem, bt as MenuCheckboxItemCommonProps, c as MenuSubTriggerOptions, ct as MenuGroup, d as MenuSubContent, dt as MenuGroupProps, et as MenuIconOptions, f as MenuSubContentCommonProps, ft as MenuGroupRenderProps, g as MenuSub, h as MenuSubContentRenderProps, ht as MenuContentOptions, it as MenuGroupLabelCommonProps, j as MenuPortalProps, k as MenuRadioGroupRenderProps, l as MenuSubTriggerProps, lt as MenuGroupCommonProps, m as MenuSubContentProps, mt as MenuContentCommonProps, n as MenuTriggerCommonProps, nt as MenuIconRenderProps, o as MenuSubTrigger, ot as MenuGroupLabelProps, p as MenuSubContentOptions, r as MenuTriggerOptions, rt as MenuGroupLabel, s as MenuSubTriggerCommonProps, st as MenuGroupLabelRenderProps, tt as MenuIconProps, u as MenuSubTriggerRenderProps, ut as MenuGroupOptions, v as MenuSubProps, w as MenuRadioItemRenderProps, x as MenuRadioItemCommonProps, xt as MenuCheckboxItemOptions, yt as MenuCheckboxItem, z as MenuItemIndicatorOptions } from "../index/i-i2ocoX.js";
import { a as SeparatorRootOptions, i as SeparatorRootCommonProps, o as SeparatorRootProps, r as SeparatorRoot, s as SeparatorRootRenderProps } from "../index/D5H2Dwz2.js";
import { c as MenubarRootCommonProps, d as MenubarRootRenderProps, i as MenubarDataSet, l as MenubarRootOptions, m as MenubarMenuProps, p as MenubarMenuOptions } from "../index/ubD85rmV.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref, Setter } from "solid-js";
import { Orientation, Orientation as Orientation$1 } from "@kobalte/utils";
import { FocusOutsideEvent, InteractOutsideEvent, PointerDownOutsideEvent } from "@solid-primitives/interaction";
//#region src/navigation-menu/navigation-menu-arrow.d.ts
interface NavigationMenuArrowOptions extends PopperArrowOptions {}
interface NavigationMenuArrowCommonProps<T extends HTMLElement = HTMLElement> extends PopperArrowCommonProps<T> {}
interface NavigationMenuArrowRenderProps extends NavigationMenuArrowCommonProps, PopperArrowRenderProps {}
type NavigationMenuArrowProps<T extends ValidComponent | HTMLElement = HTMLElement> = NavigationMenuArrowOptions & Partial<NavigationMenuArrowCommonProps<ElementOf<T>>>;
/**
 * An optional arrow element to render alongside the viewport content.
 * Must be rendered in the viewport.
 */
declare function NavigationMenuArrow<T extends ValidComponent = "div">(props: PolymorphicProps<T, NavigationMenuArrowProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/navigation-menu/navigation-menu-content.d.ts
type Motion = "to-start" | "to-end" | "from-start" | "from-end";
interface NavigationMenuContentOptions extends MenuContentOptions {}
interface NavigationMenuContentCommonProps<T extends HTMLElement = HTMLElement> extends MenuContentCommonProps<T> {
  onPointerEnter: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerLeave: JSX$1.EventHandlerUnion<T, PointerEvent>;
}
interface NavigationMenuContentRenderProps extends MenuContentRenderProps, NavigationMenuContentCommonProps {
  "data-motion"?: Motion;
}
type NavigationMenuContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = NavigationMenuContentOptions & Partial<NavigationMenuContentCommonProps<ElementOf<T>>>;
declare function NavigationMenuContent<T extends ValidComponent = "ul">(props: PolymorphicProps<T, NavigationMenuContentProps<T>>): JSX$1.Element;
//#endregion
//#region src/navigation-menu/navigation-menu-item.d.ts
/**
 * An item of the navigation menu.
 */
declare function NavigationMenuItem<T extends ValidComponent = "a">(props: PolymorphicProps<T, MenuItemProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/navigation-menu/navigation-menu-menu.d.ts
interface NavigationMenuMenuOptions extends MenubarMenuOptions {}
interface NavigationMenuMenuProps extends MenubarMenuProps {}
/**
 * Displays a menu to the user —such as a set of actions or functions— triggered by a button.
 */
declare function NavigationMenuMenu(props: NavigationMenuMenuProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/navigation-menu/navigation-menu-portal.d.ts
interface NavigationMenuPortalProps extends MenuPortalProps {}
/**
 * Portals its children into the NavigationMenu.Viewport when the menu is open.
 */
declare function NavigationMenuPortal(props: NavigationMenuPortalProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/navigation-menu/navigation-menu-root.d.ts
interface NavigationMenuRootOptions extends MenubarRootOptions, Omit<PopperRootOptions, "anchorRef" | "contentRef" | "onCurrentPlacementChange"> {
  /**
   * Delay before the menu opens on hover (default 200).
   */
  delayDuration?: number;
  /**
   * Open immediately if hovered again within delay (default 300).
   */
  skipDelayDuration?: number;
  /**
   * Used to force mounting when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
  autoFocusMenu?: boolean;
  onAutoFocusMenuChange?: Setter<boolean>;
}
interface NavigationMenuRootCommonProps<T extends HTMLElement = HTMLElement> extends MenubarRootCommonProps<T> {
  ref: Ref<T>;
}
interface NavigationMenuRootRenderProps extends NavigationMenuRootCommonProps, MenubarRootRenderProps {}
type NavigationMenuRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = NavigationMenuRootOptions & Partial<NavigationMenuRootCommonProps<ElementOf<T>>>;
/**
 * A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
 */
declare function NavigationMenuRoot<T extends ValidComponent = "ul">(props: PolymorphicProps<T, NavigationMenuRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/navigation-menu/navigation-menu-trigger.d.ts
interface NavigationMenuTriggerOptions extends MenuTriggerOptions {}
interface NavigationMenuTriggerCommonProps<T extends HTMLElement = HTMLElement> extends MenuTriggerCommonProps<T> {
  onPointerEnter: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerLeave: JSX$1.EventHandlerUnion<T, PointerEvent>;
}
interface NavigationMenuTriggerRenderProps extends NavigationMenuTriggerCommonProps, MenuTriggerRenderProps {}
type NavigationMenuTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = NavigationMenuTriggerOptions & Partial<NavigationMenuTriggerCommonProps<ElementOf<T>>>;
/**
 * The button that toggles the menubar menu or a menubar link.
 */
declare function NavigationMenuTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, NavigationMenuTriggerProps<T>>): JSX$1.Element;
//#endregion
//#region src/navigation-menu/navigation-menu-viewport.d.ts
interface NavigationMenuViewportOptions {
  /**
   * Event handler called when the escape key is down.
   * It can be prevented by calling `event.preventDefault`.
   */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /**
   * Event handler called when a pointer event occurs outside the bounds of the component.
   * It can be prevented by calling `event.preventDefault`.
   */
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  /**
   * Event handler called when the focus moves outside the bounds of the component.
   * It can be prevented by calling `event.preventDefault`.
   */
  onFocusOutside?: (event: FocusOutsideEvent) => void;
  /**
   * Event handler called when an interaction (pointer or focus event) happens outside the bounds of the component.
   * It can be prevented by calling `event.preventDefault`.
   */
  onInteractOutside?: (event: InteractOutsideEvent) => void;
}
interface NavigationMenuViewportCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  style: JSX$1.CSSProperties | string;
}
interface NavigationMenuViewportRenderProps extends NavigationMenuViewportCommonProps, DismissableLayerRenderProps, MenubarDataSet {
  role: "presentation";
  "data-orientation": Orientation$1;
}
type NavigationMenuViewportProps<T extends ValidComponent | HTMLElement = HTMLElement> = NavigationMenuViewportOptions & Partial<NavigationMenuViewportCommonProps<ElementOf<T>>>;
declare function NavigationMenuViewport<T extends ValidComponent = "li">(props: PolymorphicProps<T, NavigationMenuViewportProps<T>>): JSX$1.Element;
//#endregion
//#region src/navigation-menu/navigation-menu-context.d.ts
interface NavigationMenuDataSet {
  "data-expanded": string | undefined;
  "data-closed": string | undefined;
}
interface NavigationMenuContextValue {
  dataset: Accessor<NavigationMenuDataSet>;
  delayDuration: Accessor<number>;
  skipDelayDuration: Accessor<number>;
  autoFocusMenu: Accessor<boolean>;
  setAutoFocusMenu: Setter<boolean>;
  startLeaveTimer: () => void;
  cancelLeaveTimer: () => void;
  rootRef: Accessor<HTMLElement | undefined>;
  setRootRef: Setter<HTMLElement>;
  viewportRef: Accessor<HTMLElement | undefined>;
  setViewportRef: Setter<HTMLElement>;
  viewportPresent: Accessor<boolean>;
  currentPlacement: Accessor<Placement>;
  previousMenu: Accessor<string | undefined>;
  setPreviousMenu: Setter<string | undefined>;
}
export declare function useNavigationMenuContext(): NavigationMenuContextValue;
//#endregion
//#region src/navigation-menu/index.d.ts
export declare const NavigationMenu: typeof NavigationMenuRoot & {
  Arrow: typeof NavigationMenuArrow;
  CheckboxItem: typeof MenuCheckboxItem;
  Content: typeof NavigationMenuContent;
  Group: typeof MenuGroup;
  GroupLabel: typeof MenuGroupLabel;
  Icon: typeof MenuIcon;
  Item: typeof NavigationMenuItem;
  ItemDescription: typeof MenuItemDescription;
  ItemIndicator: typeof MenuItemIndicator;
  ItemLabel: typeof MenuItemLabel;
  Portal: typeof NavigationMenuPortal;
  RadioGroup: typeof MenuRadioGroup;
  RadioItem: typeof MenuRadioItem;
  Menu: typeof NavigationMenuMenu;
  Separator: typeof SeparatorRoot;
  Sub: typeof MenuSub;
  SubContent: typeof MenuSubContent;
  SubTrigger: typeof MenuSubTrigger;
  Trigger: typeof NavigationMenuTrigger;
  Viewport: typeof NavigationMenuViewport;
};
//#endregion
export { NavigationMenuArrow as Arrow, MenuCheckboxItem as CheckboxItem, NavigationMenuContent as Content, MenuGroup as Group, MenuGroupLabel as GroupLabel, MenuIcon as Icon, NavigationMenuItem as Item, MenuItemDescription as ItemDescription, MenuItemIndicator as ItemIndicator, MenuItemLabel as ItemLabel, NavigationMenuMenu as Menu, type Motion, type NavigationMenuArrowCommonProps, type NavigationMenuArrowOptions, type NavigationMenuArrowProps, type NavigationMenuArrowRenderProps, type MenuCheckboxItemCommonProps as NavigationMenuCheckboxItemCommonProps, type MenuCheckboxItemOptions as NavigationMenuCheckboxItemOptions, type MenuCheckboxItemProps as NavigationMenuCheckboxItemProps, type MenuCheckboxItemRenderProps as NavigationMenuCheckboxItemRenderProps, type NavigationMenuContentCommonProps, type NavigationMenuContentOptions, type NavigationMenuContentProps, type NavigationMenuContentRenderProps, type NavigationMenuContextValue, type MenuGroupCommonProps as NavigationMenuGroupCommonProps, type MenuGroupLabelCommonProps as NavigationMenuGroupLabelCommonProps, type MenuGroupLabelOptions as NavigationMenuGroupLabelOptions, type MenuGroupLabelProps as NavigationMenuGroupLabelProps, type MenuGroupLabelRenderProps as NavigationMenuGroupLabelRenderProps, type MenuGroupOptions as NavigationMenuGroupOptions, type MenuGroupProps as NavigationMenuGroupProps, type MenuGroupRenderProps as NavigationMenuGroupRenderProps, type MenuIconCommonProps as NavigationMenuIconCommonProps, type MenuIconOptions as NavigationMenuIconOptions, type MenuIconProps as NavigationMenuIconProps, type MenuIconRenderProps as NavigationMenuIconRenderProps, type MenuItemCommonProps as NavigationMenuItemCommonProps, type MenuItemDescriptionCommonProps as NavigationMenuItemDescriptionCommonProps, type MenuItemDescriptionOptions as NavigationMenuItemDescriptionOptions, type MenuItemDescriptionProps as NavigationMenuItemDescriptionProps, type MenuItemDescriptionRenderProps as NavigationMenuItemDescriptionRenderProps, type MenuItemIndicatorCommonProps as NavigationMenuItemIndicatorCommonProps, type MenuItemIndicatorOptions as NavigationMenuItemIndicatorOptions, type MenuItemIndicatorProps as NavigationMenuItemIndicatorProps, type MenuItemIndicatorRenderProps as NavigationMenuItemIndicatorRenderProps, type MenuItemLabelCommonProps as NavigationMenuItemLabelCommonProps, type MenuItemLabelOptions as NavigationMenuItemLabelOptions, type MenuItemLabelProps as NavigationMenuItemLabelProps, type MenuItemLabelRenderProps as NavigationMenuItemLabelRenderProps, type MenuItemOptions as NavigationMenuItemOptions, type MenuItemProps as NavigationMenuItemProps, type MenuItemRenderProps as NavigationMenuItemRenderProps, type NavigationMenuMenuOptions, type NavigationMenuMenuProps, type NavigationMenuPortalProps, type MenuRadioGroupCommonProps as NavigationMenuRadioGroupCommonProps, type MenuRadioGroupOptions as NavigationMenuRadioGroupOptions, type MenuRadioGroupProps as NavigationMenuRadioGroupProps, type MenuRadioGroupRenderProps as NavigationMenuRadioGroupRenderProps, type MenuRadioItemCommonProps as NavigationMenuRadioItemCommonProps, type MenuRadioItemOptions as NavigationMenuRadioItemOptions, type MenuRadioItemRenderProps as NavigationMenuRadioItemPRenderrops, type MenuRadioItemProps as NavigationMenuRadioItemProps, type NavigationMenuRootCommonProps, type NavigationMenuRootOptions, type NavigationMenuRootProps, type NavigationMenuRootRenderProps, type SeparatorRootCommonProps as NavigationMenuSeparatorCommonProps, type SeparatorRootOptions as NavigationMenuSeparatorOptions, type SeparatorRootProps as NavigationMenuSeparatorProps, type SeparatorRootRenderProps as NavigationMenuSeparatorRenderProps, type MenuSubContentCommonProps as NavigationMenuSubContentCommonProps, type MenuSubContentOptions as NavigationMenuSubContentOptions, type MenuSubContentProps as NavigationMenuSubContentProps, type MenuSubContentRenderProps as NavigationMenuSubContentRenderProps, type MenuSubOptions as NavigationMenuSubOptions, type MenuSubProps as NavigationMenuSubProps, type MenuSubTriggerCommonProps as NavigationMenuSubTriggerCommonProps, type MenuSubTriggerOptions as NavigationMenuSubTriggerOptions, type MenuSubTriggerProps as NavigationMenuSubTriggerProps, type MenuSubTriggerRenderProps as NavigationMenuSubTriggerRenderProps, type NavigationMenuTriggerCommonProps, type NavigationMenuTriggerOptions, type NavigationMenuTriggerProps, type NavigationMenuTriggerRenderProps, type NavigationMenuViewportCommonProps, type NavigationMenuViewportOptions, type NavigationMenuViewportProps, type NavigationMenuViewportRenderProps, type Orientation, NavigationMenuPortal as Portal, MenuRadioGroup as RadioGroup, MenuRadioItem as RadioItem, NavigationMenuRoot as Root, SeparatorRoot as Separator, MenuSub as Sub, MenuSubContent as SubContent, MenuSubTrigger as SubTrigger, NavigationMenuTrigger as Trigger, NavigationMenuViewport as Viewport };