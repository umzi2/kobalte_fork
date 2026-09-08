import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { i as ButtonRootCommonProps, s as ButtonRootRenderProps } from "./Bjp2qtUK.js";
import "./Dy4FWz3y.js";
import "./CaxKjm1F.js";
import { n as DismissableLayerRenderProps } from "./D_ZxK-J-.js";
import { r as PopperRootOptions } from "./DTS_JDht.js";
import { ComponentProps, JSX as JSX$1, Portal, ValidComponent } from "@solidjs/web";
import { Accessor, Element as Element$1, ParentProps, Ref } from "solid-js";
import { Orientation } from "@kobalte/utils";
import { FocusOutsideEvent, InteractOutsideEvent, PointerDownOutsideEvent } from "@solid-primitives/interaction";
//#region src/menu/menu.d.ts
interface MenuOptions extends Omit<PopperRootOptions, "anchorRef" | "contentRef" | "onCurrentPlacementChange"> {
  /** The controlled open state of the menu. */
  open?: boolean;
  /**
   * The default open state when initially rendered.
   * Useful when you do not need to control the open state.
   */
  defaultOpen?: boolean;
  /** Event handler called when the open state of the menu changes. */
  onOpenChange?: (isOpen: boolean) => void;
}
//#endregion
//#region src/menu/menu-item.context.d.ts
interface MenuItemDataSet {
  "data-indeterminate": string | undefined;
  "data-checked": string | undefined;
  "data-disabled": string | undefined;
  "data-highlighted": string | undefined;
}
//#endregion
//#region src/menu/menu-item-base.d.ts
interface MenuItemBaseOptions {
  /**
   * Optional text used for typeahead purposes.
   * By default, the typeahead behavior will use the .textContent of the Menu.ItemLabel part
   * if provided, or fallback to the .textContent of the Menu.Item.
   * Use this when the content is complex, or you have non-textual content inside.
   */
  textValue?: string;
  /** Whether the menu item is disabled. */
  disabled?: boolean;
  /** Whether the menu item is checked (item radio or item checkbox). */
  checked?: boolean;
  /**
   * When using menu item checkbox, whether the checked state is in an indeterminate mode.
   * Indeterminism is presentational only.
   * The indeterminate visual representation remains regardless of user interaction.
   */
  indeterminate?: boolean;
  /** Whether the menu should close when the menu item is activated/selected. */
  closeOnSelect?: boolean;
  /** Event handler called when the user selects an item (via mouse or keyboard). */
  onSelect?: () => void;
}
interface MenuItemBaseCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  onPointerMove: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerLeave: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerUp: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onMouseDown: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
}
interface MenuItemBaseRenderProps extends MenuItemBaseCommonProps, MenuItemDataSet {
  tabindex: number | undefined;
  "aria-checked": "true" | "false" | "mixed" | undefined;
  "aria-disabled": "true" | undefined;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
  "data-key": string | undefined;
}
//#endregion
//#region src/menu/menu-checkbox-item.d.ts
interface MenuCheckboxItemOptions extends Omit<MenuItemBaseOptions, "checked"> {
  /** The controlled checked state of the menu item checkbox. */
  checked?: boolean;
  /**
   * The default checked state when initially rendered.
   * Useful when you do not need to control the checked state.
   */
  defaultChecked?: boolean;
  /** Event handler called when the checked state of the menu item checkbox changes. */
  onChange?: (isChecked: boolean) => void;
}
interface MenuCheckboxItemCommonProps<T extends HTMLElement = HTMLElement> extends MenuItemBaseCommonProps<T> {}
interface MenuCheckboxItemRenderProps extends MenuCheckboxItemCommonProps, MenuItemBaseRenderProps {
  role: "menuitemcheckbox";
}
type MenuCheckboxItemProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuCheckboxItemOptions & Partial<MenuCheckboxItemCommonProps<ElementOf<T>>>;
/**
 * An item that can be controlled and rendered like a checkbox.
 */
declare function MenuCheckboxItem<T extends ValidComponent = "div">(props: PolymorphicProps<T, MenuCheckboxItemProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menu/menu-context.d.ts
interface MenuDataSet {
  "data-expanded": string | undefined;
  "data-closed": string | undefined;
}
//#endregion
//#region src/menu/menu-content-base.d.ts
interface MenuContentBaseOptions {
  /**
   * Event handler called when focus moves into the component after opening.
   * It can be prevented by calling `event.preventDefault`.
   */
  onOpenAutoFocus?: (event: Event) => void;
  /**
   * Event handler called when focus moves to the trigger after closing.
   * It can be prevented by calling `event.preventDefault`.
   */
  onCloseAutoFocus?: (event: Event) => void;
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
interface MenuContentBaseCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  onPointerEnter: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerMove: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onMouseDown: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocusIn: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onFocusOut: JSX$1.EventHandlerUnion<T, FocusEvent>;
  style?: JSX$1.CSSProperties | string;
}
interface MenuContentBaseRenderProps extends MenuContentBaseCommonProps, DismissableLayerRenderProps, MenuDataSet {
  role: "menu";
  tabindex: number | undefined;
  "aria-labelledby": string | undefined;
  "data-orientation": Orientation;
}
//#endregion
//#region src/menu/menu-content.d.ts
interface MenuContentOptions extends MenuContentBaseOptions {}
interface MenuContentCommonProps<T extends HTMLElement = HTMLElement> extends MenuContentBaseCommonProps<T> {}
interface MenuContentRenderProps extends MenuContentCommonProps, MenuContentBaseRenderProps {}
type MenuContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuContentOptions & Partial<MenuContentCommonProps<ElementOf<T>>>;
declare function MenuContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, MenuContentProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menu/menu-group.d.ts
interface MenuGroupOptions {}
interface MenuGroupCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface MenuGroupRenderProps extends MenuGroupCommonProps {
  role: "group";
  "aria-labelledby": string | undefined;
}
type MenuGroupProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuGroupOptions & Partial<MenuGroupCommonProps<ElementOf<T>>>;
/**
 * A container used to group multiple `Menu.Item`s.
 */
declare function MenuGroup<T extends ValidComponent = "div">(props: PolymorphicProps<T, MenuGroupProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menu/menu-group-label.d.ts
interface MenuGroupLabelOptions {}
interface MenuGroupLabelCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface MenuGroupLabelRenderProps extends MenuGroupLabelCommonProps {
  "aria-hidden": "true";
}
type MenuGroupLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuGroupLabelOptions & Partial<MenuGroupLabelCommonProps<ElementOf<T>>>;
/**
 * A component used to render the label of a `Menu.Group`.
 * It won't be focusable using arrow keys.
 */
declare function MenuGroupLabel<T extends ValidComponent = "span">(props: PolymorphicProps<T, MenuGroupLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menu/menu-icon.d.ts
interface MenuIconOptions {}
interface MenuIconCommonProps<_T extends HTMLElement = HTMLElement> {
  children: Element$1;
}
interface MenuIconRenderProps extends MenuIconCommonProps, MenuDataSet {
  "aria-hidden": "true";
}
type MenuIconProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuIconOptions & Partial<MenuIconCommonProps<ElementOf<T>>>;
/**
 * A small icon often displayed inside the menu trigger as a visual affordance for the fact it can be open.
 * It renders a `▼` by default, but you can use your own icon by providing a `children`.
 */
declare function MenuIcon<T extends ValidComponent = "span">(props: PolymorphicProps<T, MenuIconProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menu/menu-item.d.ts
interface MenuItemOptions extends Omit<MenuItemBaseOptions, "checked" | "indeterminate"> {}
interface MenuItemCommonProps<T extends HTMLElement = HTMLElement> extends MenuItemBaseCommonProps<T> {}
interface MenuItemRenderProps extends MenuItemCommonProps, MenuItemBaseRenderProps {
  role: "menuitem";
}
type MenuItemProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuItemOptions & Partial<MenuItemCommonProps<ElementOf<T>>>;
/**
 * An item of the menu.
 */
declare function MenuItem<T extends ValidComponent = "div">(props: PolymorphicProps<T, MenuItemProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menu/menu-item-description.d.ts
interface MenuItemDescriptionOptions {}
interface MenuItemDescriptionCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface MenuItemDescriptionRenderProps extends MenuItemDescriptionCommonProps, MenuItemDataSet {}
type MenuItemDescriptionProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuItemDescriptionOptions & Partial<MenuItemDescriptionCommonProps<ElementOf<T>>>;
/**
 * An optional accessible description to be announced for the menu item.
 * Useful for menu items that have more complex content (e.g. icons, multiple lines of text, etc.)
 */
declare function MenuItemDescription<T extends ValidComponent = "div">(props: PolymorphicProps<T, MenuItemDescriptionProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menu/menu-item-indicator.d.ts
interface MenuItemIndicatorOptions {
  /**
   * Used to force mounting when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
}
interface MenuItemIndicatorCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface MenuItemIndicatorRenderProps extends MenuItemIndicatorCommonProps, MenuItemDataSet {}
type MenuItemIndicatorProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuItemIndicatorOptions & Partial<MenuItemIndicatorCommonProps<ElementOf<T>>>;
/**
 * The visual indicator rendered when the parent menu `CheckboxItem` or `RadioItem` is checked.
 * You can style this element directly, or you can use it as a wrapper to put an icon into, or both.
 */
declare function MenuItemIndicator<T extends ValidComponent = "div">(props: PolymorphicProps<T, MenuItemIndicatorProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menu/menu-item-label.d.ts
interface MenuItemLabelOptions {}
interface MenuItemLabelCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
}
interface MenuItemLabelRenderProps extends MenuItemLabelCommonProps, MenuItemDataSet {}
type MenuItemLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuItemLabelOptions & Partial<MenuItemLabelCommonProps<ElementOf<T>>>;
/**
 * An accessible label to be announced for the menu item.
 * Useful for menu items that have more complex content (e.g. icons, multiple lines of text, etc.)
 */
declare function MenuItemLabel<T extends ValidComponent = "div">(props: PolymorphicProps<T, MenuItemLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menu/menu-portal.d.ts
interface MenuPortalProps extends ComponentProps<typeof Portal> {}
/**
 * Portals its children into the `body` when the menu is open.
 */
declare function MenuPortal(props: MenuPortalProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menu/menu-radio-group.d.ts
interface MenuRadioGroupOptions<TValue = string> {
  /** The controlled value of the item radio to check. */
  value?: TValue;
  /**
   * The value of the item radio that should be checked when initially rendered.
   * Useful when you do not need to control the state of the menu radio group.
   */
  defaultValue?: TValue;
  /** Event handler called when the value changes. */
  onChange?: (value: TValue) => void;
  /** Whether the menu radio group is disabled. */
  disabled?: boolean;
}
interface MenuRadioGroupCommonProps<T extends HTMLElement = HTMLElement> extends MenuGroupCommonProps<T> {
  id: string;
}
interface MenuRadioGroupRenderProps extends MenuRadioGroupCommonProps, MenuGroupRenderProps {}
type MenuRadioGroupProps<T extends ValidComponent | HTMLElement = HTMLElement, TValue = string> = MenuRadioGroupOptions<TValue> & Partial<MenuRadioGroupCommonProps<ElementOf<T>>>;
/**
 * A container used to group multiple `Menu.RadioItem`s and manage the selection.
 */
declare function MenuRadioGroup<TValue = string, T extends ValidComponent = "div">(props: PolymorphicProps<T, MenuRadioGroupProps<T, TValue>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menu/menu-radio-item.d.ts
interface MenuRadioItemOptions<TValue = string> extends Omit<MenuItemBaseOptions, "checked" | "indeterminate"> {
  /** The value of the menu item radio. */
  value: TValue;
}
interface MenuRadioItemCommonProps<T extends HTMLElement = HTMLElement> extends MenuItemBaseCommonProps<T> {}
interface MenuRadioItemRenderProps extends MenuRadioItemCommonProps, MenuItemBaseRenderProps {
  role: "menuitemradio";
}
type MenuRadioItemProps<T extends ValidComponent | HTMLElement = HTMLElement, TValue = string> = MenuRadioItemOptions<TValue> & Partial<MenuRadioItemCommonProps<ElementOf<T>>>;
/**
 * An item that can be controlled and rendered like a radio.
 */
declare function MenuRadioItem<TValue = string, T extends ValidComponent = "div">(props: PolymorphicProps<T, MenuRadioItemProps<T, TValue>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menu/menu-root.d.ts
interface MenuRootOptions extends MenuOptions {
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
  /**
   * Whether the menu should be the only visible content for screen readers.
   * When set to `true`:
   * - interaction with outside elements will be disabled.
   * - scroll will be locked.
   * - focus will be locked inside the menu content.
   * - elements outside the menu content will not be visible for screen readers.
   */
  modal?: boolean;
  /** Whether the scroll should be locked even if the menu is not modal. */
  preventScroll?: boolean;
  /**
   * Used to force mounting the menu (portal, positioner and content) when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
  /** The orientation of the menu. */
  orientation?: Orientation;
  /**
   * A unique value that associates the item with an active value
   * when the navigation menu is controlled.
   * This prop is managed automatically when uncontrolled.
   * Only used inside a Menubar.
   */
  value?: string;
}
//#endregion
//#region src/menu/menu-sub.d.ts
interface MenuSubOptions extends Omit<MenuOptions, "placement" | "flip" | "sameWidth"> {}
interface MenuSubProps extends ParentProps<MenuSubOptions> {}
/**
 * Contains all the parts of a submenu.
 */
declare function MenuSub(props: MenuSubProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/menu/menu-sub-content.d.ts
interface MenuSubContentOptions extends Omit<MenuContentBaseOptions, "onOpenAutoFocus" | "onCloseAutoFocus"> {}
interface MenuSubContentCommonProps<T extends HTMLElement = HTMLElement> extends MenuContentBaseCommonProps<T> {
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
}
interface MenuSubContentRenderProps extends MenuSubContentCommonProps, MenuContentBaseRenderProps {}
type MenuSubContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuSubContentOptions & Partial<MenuSubContentCommonProps<ElementOf<T>>>;
/**
 * The component that pops out when a submenu is open.
 */
declare function MenuSubContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, MenuSubContentProps<T>>): JSX$1.Element;
//#endregion
//#region src/menu/menu-sub-trigger.d.ts
interface MenuSubTriggerOptions {
  /**
   * Optional text used for typeahead purposes.
   * By default, the typeahead behavior will use the .textContent of the Menu.SubTrigger.
   * Use this when the content is complex, or you have non-textual content inside.
   */
  textValue?: string;
  /** Whether the sub menu trigger is disabled. */
  disabled?: boolean;
}
interface MenuSubTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  onPointerMove: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerLeave: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerUp: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onMouseDown: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
}
interface MenuSubTriggerRenderProps extends MenuSubTriggerCommonProps, MenuDataSet {
  role: "menuitem";
  tabindex: number | undefined;
  "aria-haspopup": "true";
  "aria-expanded": "true" | "false";
  "aria-controls": string | undefined;
  "aria-disabled": "true" | undefined;
  "data-key": string | undefined;
  "data-highlighted": "" | undefined;
  "data-disabled": "" | undefined;
}
type MenuSubTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuSubTriggerOptions & Partial<MenuSubTriggerCommonProps<ElementOf<T>>>;
/**
 * An item that opens a submenu.
 */
declare function MenuSubTrigger<T extends ValidComponent = "div">(props: PolymorphicProps<T, MenuSubTriggerProps<T>>): JSX$1.Element;
//#endregion
//#region src/menu/menu-trigger.d.ts
interface MenuTriggerOptions {}
interface MenuTriggerCommonProps<T extends HTMLElement = HTMLElement> extends ButtonRootCommonProps<T> {
  id: string;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onMouseOver: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
}
interface MenuTriggerRenderProps extends MenuTriggerCommonProps, ButtonRootRenderProps, MenuDataSet {
  role: "menuitem" | undefined;
  "data-kb-menu-value-trigger": string | undefined;
}
type MenuTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = MenuTriggerOptions & Partial<MenuTriggerCommonProps<ElementOf<T>>>;
/**
 * The button that toggles the menu.
 */
declare function MenuTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, MenuTriggerProps<T>>): JSX$1.Element;
//#endregion
export { MenuIconCommonProps as $, MenuPortal as A, MenuItemIndicatorProps as B, MenuRadioItemProps as C, MenuCheckboxItemRenderProps as Ct, MenuRadioGroupOptions as D, MenuRadioGroupCommonProps as E, MenuItemLabelProps as F, MenuItemDescriptionProps as G, MenuItemDescription as H, MenuItemLabelRenderProps as I, MenuItemCommonProps as J, MenuItemDescriptionRenderProps as K, MenuItemIndicator as L, MenuItemLabel as M, MenuItemLabelCommonProps as N, MenuRadioGroupProps as O, MenuItemLabelOptions as P, MenuIcon as Q, MenuItemIndicatorCommonProps as R, MenuRadioItemOptions as S, MenuCheckboxItemProps as St, MenuRadioGroup as T, MenuItemDescriptionCommonProps as U, MenuItemIndicatorRenderProps as V, MenuItemDescriptionOptions as W, MenuItemProps as X, MenuItemOptions as Y, MenuItemRenderProps as Z, MenuSubOptions as _, MenuContentRenderProps as _t, MenuTriggerRenderProps as a, MenuGroupLabelOptions as at, MenuRadioItem as b, MenuCheckboxItemCommonProps as bt, MenuSubTriggerOptions as c, MenuGroup as ct, MenuSubContent as d, MenuGroupProps as dt, MenuIconOptions as et, MenuSubContentCommonProps as f, MenuGroupRenderProps as ft, MenuSub as g, MenuContentProps as gt, MenuSubContentRenderProps as h, MenuContentOptions as ht, MenuTriggerProps as i, MenuGroupLabelCommonProps as it, MenuPortalProps as j, MenuRadioGroupRenderProps as k, MenuSubTriggerProps as l, MenuGroupCommonProps as lt, MenuSubContentProps as m, MenuContentCommonProps as mt, MenuTriggerCommonProps as n, MenuIconRenderProps as nt, MenuSubTrigger as o, MenuGroupLabelProps as ot, MenuSubContentOptions as p, MenuContent as pt, MenuItem as q, MenuTriggerOptions as r, MenuGroupLabel as rt, MenuSubTriggerCommonProps as s, MenuGroupLabelRenderProps as st, MenuTrigger as t, MenuIconProps as tt, MenuSubTriggerRenderProps as u, MenuGroupOptions as ut, MenuSubProps as v, MenuDataSet as vt, MenuRadioItemRenderProps as w, MenuRadioItemCommonProps as x, MenuCheckboxItemOptions as xt, MenuRootOptions as y, MenuCheckboxItem as yt, MenuItemIndicatorOptions as z };