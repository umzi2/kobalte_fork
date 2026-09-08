import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { c as CollectionNode, i as Collection } from "./C4-dpjA0.js";
import "./Dy4FWz3y.js";
import { E as SelectionMode, T as SelectionBehavior, b as KeyboardDelegate, l as ListState, y as FocusStrategy } from "./CaxKjm1F.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
//#region src/listbox/listbox-item-context.d.ts
interface ListboxItemDataSet {
  "data-disabled": string | undefined;
  "data-selected": string | undefined;
  "data-highlighted": string | undefined;
}
//#endregion
//#region src/listbox/listbox-item.d.ts
interface ListboxItemOptions {
  /** The collection node to render. */
  item: CollectionNode;
}
interface ListboxItemCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  "aria-label": string | undefined;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
  onPointerMove: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerUp: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onMouseDown: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
}
interface ListboxItemRenderProps extends ListboxItemCommonProps, ListboxItemDataSet {
  role: "option";
  tabindex: number | undefined;
  "aria-disabled": "true" | "false";
  "aria-selected": "true" | "false" | undefined;
  "aria-posinset": number | undefined;
  "aria-setsize": number | undefined;
  "data-key": string | undefined;
}
type ListboxItemProps<T extends ValidComponent | HTMLElement = HTMLElement> = ListboxItemOptions & Partial<ListboxItemCommonProps<ElementOf<T>>>;
/**
 * An item of the listbox.
 */
declare function ListboxItem<T extends ValidComponent = "li">(props: PolymorphicProps<T, ListboxItemProps<T>>): JSX$1.Element;
//#endregion
//#region src/listbox/listbox-item-description.d.ts
interface ListboxItemDescriptionOptions {}
interface ListboxItemDescriptionCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface ListboxItemDescriptionRenderProps extends ListboxItemDescriptionCommonProps, ListboxItemDataSet {}
type ListboxItemDescriptionProps<T extends ValidComponent | HTMLElement = HTMLElement> = ListboxItemDescriptionOptions & Partial<ListboxItemDescriptionCommonProps<ElementOf<T>>>;
/**
 * An optional accessible description to be announced for the item.
 * Useful for items that have more complex content (e.g. icons, multiple lines of text, etc.)
 */
declare function ListboxItemDescription<T extends ValidComponent = "div">(props: PolymorphicProps<T, ListboxItemDescriptionProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/listbox/listbox-item-indicator.d.ts
interface ListboxItemIndicatorOptions {
  /**
   * Used to force mounting when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
}
interface ListboxItemIndicatorCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface ListboxItemIndicatorRenderProps extends ListboxItemIndicatorCommonProps, ListboxItemDataSet {
  "aria-hidden": "true";
}
type ListboxItemIndicatorProps<T extends ValidComponent | HTMLElement = HTMLElement> = ListboxItemIndicatorOptions & Partial<ListboxItemIndicatorCommonProps<ElementOf<T>>>;
/**
 * The visual indicator rendered when the item is selected.
 * You can style this element directly, or you can use it as a wrapper to put an icon into, or both.
 */
declare function ListboxItemIndicator<T extends ValidComponent = "div">(props: PolymorphicProps<T, ListboxItemIndicatorProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/listbox/listbox-item-label.d.ts
interface ListboxItemLabelOptions {}
interface ListboxItemLabelCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface ListboxItemLabelRenderProps extends ListboxItemLabelCommonProps, ListboxItemDataSet {}
type ListboxItemLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = ListboxItemLabelOptions & Partial<ListboxItemLabelCommonProps<ElementOf<T>>>;
/**
 * An accessible label to be announced for the item.
 * Useful for items that have more complex content (e.g. icons, multiple lines of text, etc.)
 */
declare function ListboxItemLabel<T extends ValidComponent = "div">(props: PolymorphicProps<T, ListboxItemLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/listbox/listbox-root.d.ts
interface ListboxRootOptions<Option, OptGroup = never> {
  /** The controlled value of the listbox. */
  value?: Iterable<string>;
  /**
   * The value of the listbox when initially rendered.
   * Useful when you do not need to control the state.
   */
  defaultValue?: Iterable<string>;
  /** Event handler called when the value changes. */
  onChange?: (value: Set<string>) => void;
  /** An array of options to display as the available options. */
  options?: Array<Option | OptGroup>;
  /** Property name or getter function to use as the value of an option. */
  optionValue?: keyof Option | ((option: Option) => string);
  /** Property name or getter function to use as the text value of an option for typeahead purpose. */
  optionTextValue?: keyof Option | ((option: Option) => string);
  /** Property name or getter function to use as the disabled flag of an option. */
  optionDisabled?: keyof Option | ((option: Option) => boolean);
  /** Property name or getter function that refers to the children options of option group. */
  optionGroupChildren?: keyof OptGroup | ((optGroup: OptGroup) => Option[]);
  /** The controlled state of the listbox. */
  state?: ListState;
  /** An optional keyboard delegate implementation for type to select, to override the default. */
  keyboardDelegate?: KeyboardDelegate;
  /** Whether to autofocus the listbox or an option. */
  autoFocus?: boolean | FocusStrategy;
  /** Whether focus should wrap around when the end/start is reached. */
  shouldFocusWrap?: boolean;
  /** Whether the listbox items should use virtual focus instead of being focused directly. */
  shouldUseVirtualFocus?: boolean;
  /** Whether selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
  /** Whether options should be focused when the user hovers over them. */
  shouldFocusOnHover?: boolean;
  /**
   * The ref attached to the scrollable element, used to provide automatic scrolling on item focus.
   * If not provided, defaults to the listbox ref.
   */
  scrollRef?: Accessor<HTMLElement | undefined>;
  /** How multiple selection should behave in the listbox. */
  selectionBehavior?: SelectionBehavior;
  /** Whether onValueChange should fire even if the new set of keys is the same as the last. */
  allowDuplicateSelectionEvents?: boolean;
  /** The type of selection that is allowed in the listbox. */
  selectionMode?: SelectionMode;
  /** Whether the listbox allows empty selection. */
  disallowEmptySelection?: boolean;
  /** Whether selection should occur automatically on focus. */
  selectOnFocus?: boolean;
  /** Whether typeahead is disabled. */
  disallowTypeAhead?: boolean;
  /** Whether navigation through tab key is enabled. */
  allowsTabNavigation?: boolean;
  /** Whether the listbox uses virtual scrolling. */
  virtualized?: boolean;
  /** When NOT virtualized, a map function that receives an _item_ signal representing a listbox item. */
  renderItem?: (item: CollectionNode<Option>) => JSX$1.Element;
  /** When NOT virtualized, a map function that receives a _section_ signal representing a listbox section. */
  renderSection?: (section: CollectionNode<OptGroup>) => JSX$1.Element;
  /** When virtualized, the Virtualizer function used to scroll to the item of the given key. */
  scrollToItem?: (key: string) => void;
  /** When virtualized, a map function that receives an _items_ signal representing all listbox items and sections. */
  children?: (items: Accessor<Collection<CollectionNode<Option | OptGroup>>>) => JSX$1.Element;
}
interface ListboxRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onMouseDown: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocusIn: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onFocusOut: JSX$1.EventHandlerUnion<T, FocusEvent>;
}
interface ListboxRootRenderProps extends ListboxRootCommonProps {
  role: "listbox";
  children: JSX$1.Element;
  tabindex: number | undefined;
}
type ListboxRootProps<Option, OptGroup = never, T extends ValidComponent | HTMLElement = HTMLElement> = ListboxRootOptions<Option, OptGroup> & Partial<ListboxRootCommonProps<ElementOf<T>>>;
/**
 * Listbox presents a list of options and allows a user to select one or more of them.
 */
declare function ListboxRoot<Option, OptGroup = never, T extends ValidComponent = "ul">(props: PolymorphicProps<T, ListboxRootProps<Option, OptGroup, T>>): JSX$1.Element;
//#endregion
//#region src/listbox/listbox-section.d.ts
interface ListboxSectionOptions {}
interface ListboxSectionCommonProps<_T extends HTMLElement = HTMLElement> {}
interface ListboxSectionRenderProps extends ListboxSectionCommonProps {
  role: "presentation";
}
type ListboxSectionProps<T extends ValidComponent | HTMLElement = HTMLElement> = ListboxSectionOptions & Partial<ListboxSectionCommonProps<ElementOf<T>>>;
/**
 * A component used to render the label of a listbox option group.
 * It won't be focusable using arrow keys.
 */
declare function ListboxSection<T extends ValidComponent = "li">(props: PolymorphicProps<T, ListboxSectionProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/listbox/listbox-context.d.ts
interface ListboxContextValue {
  listState: Accessor<ListState>;
  generateId: (part: string) => string;
  shouldUseVirtualFocus: Accessor<boolean | undefined>;
  shouldSelectOnPressUp: Accessor<boolean | undefined>;
  shouldFocusOnHover: Accessor<boolean | undefined>;
  isVirtualized: Accessor<boolean | undefined>;
}
declare function useListboxContext(): ListboxContextValue;
declare namespace index_d_exports {
  export { ListboxItem as Item, ListboxItemDescription as ItemDescription, ListboxItemIndicator as ItemIndicator, ListboxItemLabel as ItemLabel, Listbox, ListboxContextValue, ListboxItemCommonProps, ListboxItemDescriptionCommonProps, ListboxItemDescriptionOptions, ListboxItemDescriptionProps, ListboxItemDescriptionRenderProps, ListboxItemIndicatorCommonProps, ListboxItemIndicatorOptions, ListboxItemIndicatorProps, ListboxItemIndicatorRenderProps, ListboxItemLabelCommonProps, ListboxItemLabelOptions, ListboxItemLabelProps, ListboxItemLabelRenderProps, ListboxItemOptions, ListboxItemProps, ListboxItemRenderProps, ListboxRootCommonProps, ListboxRootOptions, ListboxRootProps, ListboxRootRenderProps, ListboxSectionCommonProps, ListboxSectionOptions, ListboxSectionProps, ListboxSectionRenderProps, ListboxRoot as Root, ListboxSection as Section, useListboxContext };
}
declare const Listbox: typeof ListboxRoot & {
  Item: typeof ListboxItem;
  ItemDescription: typeof ListboxItemDescription;
  ItemIndicator: typeof ListboxItemIndicator;
  ItemLabel: typeof ListboxItemLabel;
  Section: typeof ListboxSection;
};
//#endregion
export { ListboxItem as A, ListboxItemIndicatorProps as C, ListboxItemDescriptionOptions as D, ListboxItemDescriptionCommonProps as E, ListboxItemOptions as M, ListboxItemProps as N, ListboxItemDescriptionProps as O, ListboxItemRenderProps as P, ListboxItemIndicatorOptions as S, ListboxItemDescription as T, ListboxItemLabelOptions as _, ListboxSection as a, ListboxItemIndicator as b, ListboxSectionProps as c, ListboxRootCommonProps as d, ListboxRootOptions as f, ListboxItemLabelCommonProps as g, ListboxItemLabel as h, useListboxContext as i, ListboxItemCommonProps as j, ListboxItemDescriptionRenderProps as k, ListboxSectionRenderProps as l, ListboxRootRenderProps as m, index_d_exports as n, ListboxSectionCommonProps as o, ListboxRootProps as p, ListboxContextValue as r, ListboxSectionOptions as s, Listbox as t, ListboxRoot as u, ListboxItemLabelProps as v, ListboxItemIndicatorRenderProps as w, ListboxItemIndicatorCommonProps as x, ListboxItemLabelRenderProps as y };