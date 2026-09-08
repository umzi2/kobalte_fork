import { a as CollectionBase, c as CollectionNode, i as Collection } from "./C4-dpjA0.js";
import "./Dy4FWz3y.js";
import { JSX as JSX$1 } from "@solidjs/web";
import { Accessor } from "solid-js";
import { MaybeAccessor } from "@solid-primitives/utils";
import { Orientation } from "@kobalte/utils";
//#region src/selection/types.d.ts
type SelectionMode = "none" | "single" | "multiple";
type SelectionBehavior = "toggle" | "replace";
type FocusStrategy = "first" | "last";
interface SingleSelection {
  /** Whether the collection allows empty selection. */
  disallowEmptySelection?: MaybeAccessor<boolean | undefined>;
  /** The currently selected key in the collection (controlled). */
  selectedKey?: MaybeAccessor<string | undefined>;
  /** The initial selected key in the collection (uncontrolled). */
  defaultSelectedKey?: MaybeAccessor<string | undefined>;
  /** Handler that is called when the selection changes. */
  onSelectionChange?: (key: string) => any;
}
interface MultipleSelection {
  /** The type of selection that is allowed in the collection. */
  selectionMode?: MaybeAccessor<SelectionMode | undefined>;
  /** Whether the collection allows empty selection. */
  disallowEmptySelection?: MaybeAccessor<boolean | undefined>;
  /** The currently selected keys in the collection (controlled). */
  selectedKeys?: MaybeAccessor<Iterable<string> | undefined>;
  /** The initial selected keys in the collection (uncontrolled). */
  defaultSelectedKeys?: MaybeAccessor<Iterable<string> | undefined>;
  /** Handler that is called when the selection changes. */
  onSelectionChange?: (keys: Set<string>) => any;
}
/**
 * A Selection is a special Set containing Keys, which also has an anchor
 * and current selected key for use when range selecting.
 */
declare class Selection extends Set<string> {
  anchorKey?: string;
  currentKey?: string;
  constructor(keys?: Iterable<string> | Selection, anchorKey?: string, currentKey?: string);
}
interface FocusState {
  /** Whether the collection is currently focused. */
  isFocused: Accessor<boolean>;
  /** The current focused key in the collection. */
  focusedKey: Accessor<string | undefined>;
  /** Sets whether the collection is focused. */
  setFocused(isFocused: boolean): void;
  /** Sets the focused key */
  setFocusedKey(key?: string): void;
}
interface SingleSelectionState extends FocusState {
  /** Whether the collection allows empty selection. */
  disallowEmptySelection: Accessor<boolean | undefined>;
  /** The currently selected key in the collection. */
  selectedKey: Accessor<string>;
  /** Sets the selected key in the collection. */
  setSelectedKey: (key: string) => void;
}
interface MultipleSelectionState extends FocusState {
  /** The type of selection that is allowed in the collection. */
  selectionMode: Accessor<SelectionMode>;
  /** The selection behavior for the collection. */
  selectionBehavior: Accessor<SelectionBehavior>;
  /** Sets the selection behavior for the collection. */
  setSelectionBehavior(selectionBehavior: SelectionBehavior): void;
  /** Whether the collection allows empty selection. */
  disallowEmptySelection: Accessor<boolean>;
  /** The currently selected keys in the collection. */
  selectedKeys: Accessor<Set<string>>;
  /** Sets the selected keys in the collection. */
  setSelectedKeys(keys: Set<string>): void;
}
interface MultipleSelectionManager extends FocusState {
  /** The type of selection that is allowed in the collection. */
  selectionMode: Accessor<SelectionMode>;
  /** The selection behavior for the collection. */
  selectionBehavior: Accessor<SelectionBehavior>;
  /** Whether the collection allows empty selection. */
  disallowEmptySelection: Accessor<boolean | undefined>;
  /** The currently selected keys in the collection. */
  selectedKeys: Accessor<Set<string>>;
  /** Whether the selection is empty. */
  isEmpty: Accessor<boolean>;
  /** Whether all items in the collection are selected. */
  isSelectAll: Accessor<boolean>;
  /** The first selected key in the collection. */
  firstSelectedKey: Accessor<string | undefined>;
  /** The last selected key in the collection. */
  lastSelectedKey: Accessor<string | undefined>;
  /** Returns whether a key is selected. */
  isSelected: (key: string) => boolean;
  /** Returns whether the current selection is equal to the given selection. */
  isSelectionEqual(selection: Set<string>): boolean;
  /** Extends the selection to the given key. */
  extendSelection(toKey: string): void;
  /** Toggles whether the given key is selected. */
  toggleSelection: (key: string) => void;
  /** Replaces the selection with only the given key. */
  replaceSelection: (key: string) => void;
  /** Replaces the selection with the given keys. */
  setSelectedKeys(keys: Iterable<string>): void;
  /** Selects all items in the collection. */
  selectAll(): void;
  /** Removes all keys from the selection. */
  clearSelection(): void;
  /** Toggles between select all and an empty selection. */
  toggleSelectAll(): void;
  /**
   * Toggles, replaces, or extends selection to the given key depending
   * on the pointer event and collection's selection mode.
   */
  select(key: string, e?: PointerEvent): void;
  /** Returns whether the given key can be selected. */
  canSelectItem: (key: string) => boolean;
  /**
   * Returns whether the given key is non-interactive,
   * i.e. both selection and actions are disabled.
   */
  isDisabled: (key: string) => boolean;
  /** Sets the selection behavior for the collection. */
  setSelectionBehavior: (selectionBehavior: SelectionBehavior) => void;
}
interface KeyboardDelegate {
  /** Returns the key visually below the given one, or `undefined` for none. */
  getKeyBelow?: (key: string) => string | undefined;
  /** Returns the key visually above the given one, or `undefined` for none. */
  getKeyAbove?: (key: string) => string | undefined;
  /** Returns the key visually to the left of the given one, or `undefined` for none. */
  getKeyLeftOf?: (key: string) => string | undefined;
  /** Returns the key visually to the right of the given one, or `undefined` for none. */
  getKeyRightOf?: (key: string) => string | undefined;
  /** Returns the key visually one page below the given one, or `undefined` for none. */
  getKeyPageBelow?: (key: string) => string | undefined;
  /** Returns the key visually one page above the given one, or `undefined` for none. */
  getKeyPageAbove?: (key: string) => string | undefined;
  /** Returns the first key, or `undefined` for none. */
  getFirstKey?: (key?: string, global?: boolean) => string | undefined;
  /** Returns the last key, or `undefined` for none. */
  getLastKey?: (key?: string, global?: boolean) => string | undefined;
  /** Returns the next key after `fromKey` that matches the given search string, or `undefined` for none. */
  getKeyForSearch?: (search: string, fromKey?: string) => string | undefined;
}
//#endregion
//#region src/selection/create-multiple-selection-state.d.ts
interface CreateMultipleSelectionStateProps extends MultipleSelection {
  /** How multiple selection should behave in the collection. */
  selectionBehavior?: MaybeAccessor<SelectionBehavior | undefined>;
  /** Whether onSelectionChange should fire even if the new set of keys is the same as the last. */
  allowDuplicateSelectionEvents?: MaybeAccessor<boolean | undefined>;
}
/**
 * Manages state for multiple selection and focus in a collection.
 */
declare function createMultipleSelectionState(props: CreateMultipleSelectionStateProps): MultipleSelectionState;
//#endregion
//#region src/selection/create-selectable-collection.d.ts
interface CreateSelectableCollectionProps {
  /** An interface for reading and updating multiple selection state. */
  selectionManager: MaybeAccessor<MultipleSelectionManager>;
  /** A delegate object that implements behavior for keyboard focus movement. */
  keyboardDelegate: MaybeAccessor<KeyboardDelegate>;
  /** Whether the collection or one of its items should be automatically focused upon render. */
  autoFocus?: MaybeAccessor<boolean | FocusStrategy | undefined>;
  /** Whether the autofocus should run on next tick. */
  deferAutoFocus?: MaybeAccessor<boolean | undefined>;
  /** Whether focus should wrap around when the end/start is reached. */
  shouldFocusWrap?: MaybeAccessor<boolean | undefined>;
  /** Whether the collection allows empty selection. */
  disallowEmptySelection?: MaybeAccessor<boolean | undefined>;
  /** Whether the collection allows the user to select all items via keyboard shortcut. */
  disallowSelectAll?: MaybeAccessor<boolean | undefined>;
  /** Whether selection should occur automatically on focus. */
  selectOnFocus?: MaybeAccessor<boolean | undefined>;
  /** Whether typeahead is disabled. */
  disallowTypeAhead?: MaybeAccessor<boolean | undefined>;
  /** Whether the collection items should use virtual focus instead of being focused directly. */
  shouldUseVirtualFocus?: MaybeAccessor<boolean | undefined>;
  /** Whether navigation through tab key is enabled. */
  allowsTabNavigation?: MaybeAccessor<boolean | undefined>;
  /** Whether the collection items are contained in a virtual scroller. */
  isVirtualized?: MaybeAccessor<boolean | undefined>;
  /** When virtualized, the Virtualizer function used to scroll to the item of the key provided. */
  scrollToKey?: (key: string) => void;
  /** The orientation of the selectable collection interactions. */
  orientation?: MaybeAccessor<Orientation | undefined>;
}
/**
 * Handles interactions with selectable collections.
 * @param props Props for the collection.
 * @param ref The ref attached to the element representing the collection.
 * @param scrollRef The ref attached to the scrollable body. Used to provide automatic scrolling on item focus for non-virtualized collections. If not provided, defaults to the collection ref.
 */
declare function createSelectableCollection<T extends HTMLElement, U extends HTMLElement = T>(props: CreateSelectableCollectionProps, ref: Accessor<T | undefined>, scrollRef?: Accessor<U | undefined>): {
  tabIndex: import("solid-js").SourceAccessor<-1 | 0 | undefined>;
  onKeyDown: JSX$1.EventHandler<HTMLElement, KeyboardEvent>;
  onMouseDown: JSX$1.EventHandler<HTMLElement, MouseEvent>;
  onFocusIn: JSX$1.EventHandler<HTMLElement, FocusEvent>;
  onFocusOut: JSX$1.EventHandler<HTMLElement, FocusEvent>;
};
//#endregion
//#region src/selection/create-selectable-item.d.ts
interface CreateSelectableItemProps {
  /** An interface for reading and updating multiple selection state. */
  selectionManager: MaybeAccessor<MultipleSelectionManager>;
  /** A unique key for the item. */
  key: MaybeAccessor<string>;
  /**
   * By default, selection occurs on pointer down. This can be strange if selecting an
   * item causes the UI to disappear immediately (e.g. menus).
   */
  shouldSelectOnPressUp?: MaybeAccessor<boolean | undefined>;
  /** Whether the option should use virtual focus instead of being focused directly. */
  shouldUseVirtualFocus?: MaybeAccessor<boolean | undefined>;
  /**
   * Whether selection requires the pointer/mouse down and up events to occur on the same target or triggers selection on
   * the target of the pointer/mouse up event.
   */
  allowsDifferentPressOrigin?: MaybeAccessor<boolean | undefined>;
  /** Whether the option is contained in a virtual scroller. */
  virtualized?: MaybeAccessor<boolean | undefined>;
  /** Whether the item is disabled. */
  disabled?: MaybeAccessor<boolean | undefined>;
  /** Function to focus the item. */
  focus?: () => void;
}
/**
 * Handles interactions with an item in a selectable collection.
 * @param props Props for the item.
 * @param ref Ref to the item.
 */
declare function createSelectableItem<T extends HTMLElement>(props: CreateSelectableItemProps, ref: Accessor<T | undefined>): {
  isSelected: () => boolean;
  isDisabled: () => boolean;
  allowsSelection: () => boolean;
  tabIndex: import("solid-js").SourceAccessor<-1 | 0 | undefined>;
  dataKey: import("solid-js").SourceAccessor<string | undefined>;
  onPointerDown: JSX$1.EventHandler<any, PointerEvent>;
  onPointerUp: JSX$1.EventHandler<any, PointerEvent>;
  onClick: JSX$1.EventHandler<any, MouseEvent>;
  onKeyDown: JSX$1.EventHandler<any, KeyboardEvent>;
  onMouseDown: (e: MouseEvent) => void;
  onFocus: (e: FocusEvent) => void;
};
//#endregion
//#region src/selection/create-type-select.d.ts
interface CreateTypeSelectProps {
  /** Whether the type to select should be disabled. */
  isDisabled?: MaybeAccessor<boolean | undefined>;
  /** A delegate that returns collection item keys with respect to visual layout. */
  keyboardDelegate: MaybeAccessor<KeyboardDelegate>;
  /** An interface for reading and updating multiple selection state. */
  selectionManager: MaybeAccessor<MultipleSelectionManager>;
  /** Called when an item is focused by typing. */
  onTypeSelect?: (key: string) => void;
}
/**
 * Handles typeahead interactions with collections.
 */
declare function createTypeSelect(props: CreateTypeSelectProps): {
  typeSelectHandlers: {
    onKeyDown: (e: KeyboardEvent) => void;
  };
};
//#endregion
//#region src/selection/selection-manager.d.ts
/**
 * An interface for reading and updating multiple selection state.
 */
declare class SelectionManager implements MultipleSelectionManager {
  private collection;
  private state;
  constructor(collection: Accessor<Collection<CollectionNode>>, state: MultipleSelectionState);
  /** The type of selection that is allowed in the collection. */
  selectionMode(): SelectionMode;
  /** Whether the collection allows empty selection. */
  disallowEmptySelection(): boolean;
  /** The selection behavior for the collection. */
  selectionBehavior(): SelectionBehavior;
  /** Sets the selection behavior for the collection. */
  setSelectionBehavior(selectionBehavior: SelectionBehavior): void;
  /** Whether the collection is currently focused. */
  isFocused(): boolean;
  /** Sets whether the collection is focused. */
  setFocused(isFocused: boolean): void;
  /** The current focused key in the collection. */
  focusedKey(): string | undefined;
  /** Sets the focused key. */
  setFocusedKey(key?: string): void;
  /** The currently selected keys in the collection. */
  selectedKeys(): Set<string>;
  /** Returns whether a key is selected. */
  isSelected(key: string): boolean;
  /** Whether the selection is empty. */
  isEmpty(): boolean;
  /** Whether all items in the collection are selected. */
  isSelectAll(): boolean;
  firstSelectedKey(): string | undefined;
  lastSelectedKey(): string | undefined;
  /** Extends the selection to the given key. */
  extendSelection(toKey: string): void;
  private getKeyRange;
  private getKeyRangeInternal;
  private getKey;
  /** Toggles whether the given key is selected. */
  toggleSelection(key: string): void;
  /** Replaces the selection with only the given key. */
  replaceSelection(key: string): void;
  /** Replaces the selection with the given keys. */
  setSelectedKeys(keys: Iterable<string>): void;
  /** Selects all items in the collection. */
  selectAll(): void;
  /**
   * Removes all keys from the selection.
   */
  clearSelection(): void;
  /**
   * Toggles between select all and an empty selection.
   */
  toggleSelectAll(): void;
  select(key: string, e?: PointerEvent): void;
  /** Returns whether the current selection is equal to the given selection. */
  isSelectionEqual(selection: Set<string>): boolean;
  canSelectItem(key: string): boolean;
  isDisabled(key: string): boolean;
  private getAllSelectableKeys;
}
//#endregion
//#region src/list/create-list-state.d.ts
interface CreateListStateProps extends CollectionBase, CreateMultipleSelectionStateProps {
  /** Filter function to generate a filtered list of nodes. */
  filter?: (nodes: Iterable<CollectionNode>) => Iterable<CollectionNode>;
}
interface ListState {
  /** A collection of items in the list. */
  collection: Accessor<Collection<CollectionNode>>;
  /** A selection manager to read and update multiple selection state. */
  selectionManager: Accessor<SelectionManager>;
}
/**
 * Provides state management for list-like components.
 * Handles building a collection of items from props, and manages multiple selection state.
 */
declare function createListState(props: CreateListStateProps): ListState;
//#endregion
//#region src/list/create-selectable-list.d.ts
interface CreateSelectableListProps {
  /** State of the collection. */
  collection: Accessor<Collection<CollectionNode>>;
  /** An interface for reading and updating multiple selection state. */
  selectionManager: MaybeAccessor<MultipleSelectionManager>;
  /** A delegate that returns collection item keys with respect to visual layout. */
  keyboardDelegate?: MaybeAccessor<KeyboardDelegate | undefined>;
  /** Whether the collection or one of its items should be automatically focused upon render. */
  autoFocus?: MaybeAccessor<boolean | FocusStrategy | undefined>;
  /** Whether the autofocus should run on next tick. */
  deferAutoFocus?: MaybeAccessor<boolean | undefined>;
  /** Whether focus should wrap around when the end/start is reached. */
  shouldFocusWrap?: MaybeAccessor<boolean | undefined>;
  /** Whether the collection allows empty selection. */
  disallowEmptySelection?: MaybeAccessor<boolean | undefined>;
  /** Whether selection should occur automatically on focus. */
  selectOnFocus?: MaybeAccessor<boolean | undefined>;
  /** Whether typeahead is disabled. */
  disallowTypeAhead?: MaybeAccessor<boolean | undefined>;
  /** Whether the collection items should use virtual focus instead of being focused directly. */
  shouldUseVirtualFocus?: MaybeAccessor<boolean | undefined>;
  /** Whether navigation through tab key is enabled. */
  allowsTabNavigation?: MaybeAccessor<boolean | undefined>;
  /** Whether the option is contained in a virtual scroller. */
  isVirtualized?: MaybeAccessor<boolean | undefined>;
  /** When virtualized, the Virtualizer function used to scroll to the item of the key provided. */
  scrollToKey?: MaybeAccessor<((key: string) => void) | undefined>;
  /** The orientation of the selectable list. */
  orientation?: MaybeAccessor<Orientation | undefined>;
}
/**
 * Handles interactions with a selectable list.
 * @param props Props for the list.
 * @param ref A ref to the list element.
 * @param scrollRef The ref attached to the scrollable body. Used to provide automatic scrolling on item focus for non-virtualized collections. If not provided, defaults to the collection ref.
 */
declare function createSelectableList<T extends HTMLElement, U extends HTMLElement = T>(props: CreateSelectableListProps, ref: Accessor<T | undefined>, scrollRef?: Accessor<U | undefined>): {
  tabIndex: import("solid-js").SourceAccessor<-1 | 0 | undefined>;
  onKeyDown: import("@solidjs/web").JSX.EventHandler<HTMLElement, KeyboardEvent>;
  onMouseDown: import("@solidjs/web").JSX.EventHandler<HTMLElement, MouseEvent>;
  onFocusIn: import("@solidjs/web").JSX.EventHandler<HTMLElement, FocusEvent>;
  onFocusOut: import("@solidjs/web").JSX.EventHandler<HTMLElement, FocusEvent>;
};
//#endregion
//#region src/list/create-single-select-list-state.d.ts
interface CreateSingleSelectListStateProps extends CollectionBase, Omit<SingleSelection, "disallowEmptySelection"> {
  /** Filter function to generate a filtered list of nodes. */
  filter?: (nodes: Iterable<CollectionNode>) => Iterable<CollectionNode>;
}
interface SingleSelectListState extends ListState {
  /** The value of the currently selected item. */
  selectedItem: Accessor<CollectionNode | undefined>;
  /** The key for the currently selected item. */
  selectedKey: Accessor<string | undefined>;
  /** Sets the selected key. */
  setSelectedKey(key: string): void;
}
/**
 * Provides state management for list-like components with single selection.
 * Handles building a collection of items from props, and manages selection state.
 */
declare function createSingleSelectListState(props: CreateSingleSelectListStateProps): SingleSelectListState;
//#endregion
//#region src/list/list-collection.d.ts
declare class ListCollection implements Collection<CollectionNode> {
  private keyMap;
  private iterable;
  private firstKey?;
  private lastKey?;
  constructor(nodes: Iterable<CollectionNode>);
  [Symbol.iterator](): Generator<CollectionNode<any>, void, any>;
  getSize(): number;
  getKeys(): MapIterator<string>;
  getKeyBefore(key: string): string | undefined;
  getKeyAfter(key: string): string | undefined;
  getFirstKey(): string | undefined;
  getLastKey(): string | undefined;
  getItem(key: string): CollectionNode<any> | undefined;
  at(idx: number): CollectionNode<any> | undefined;
}
//#endregion
//#region src/list/list-keyboard-delegate.d.ts
declare class ListKeyboardDelegate implements KeyboardDelegate {
  private collection;
  private ref?;
  private collator?;
  constructor(collection: Accessor<Collection<CollectionNode>>, ref?: Accessor<HTMLElement | undefined>, collator?: Accessor<Intl.Collator | undefined>);
  getKeyBelow(key: string): string | undefined;
  getKeyAbove(key: string): string | undefined;
  getFirstKey(): string | undefined;
  getLastKey(): string | undefined;
  private getItem;
  getKeyPageAbove(key: string): string | undefined;
  getKeyPageBelow(key: string): string | undefined;
  getKeyForSearch(search: string, fromKey?: string): string | undefined;
}
//#endregion
export { MultipleSelectionState as C, SingleSelection as D, SelectionMode as E, SingleSelectionState as O, MultipleSelectionManager as S, SelectionBehavior as T, createMultipleSelectionState as _, createSingleSelectListState as a, KeyboardDelegate as b, CreateListStateProps as c, SelectionManager as d, createTypeSelect as f, CreateMultipleSelectionStateProps as g, createSelectableCollection as h, SingleSelectListState as i, ListState as l, createSelectableItem as m, ListCollection as n, CreateSelectableListProps as o, CreateSelectableItemProps as p, CreateSingleSelectListStateProps as r, createSelectableList as s, ListKeyboardDelegate as t, createListState as u, FocusState as v, Selection as w, MultipleSelection as x, FocusStrategy as y };