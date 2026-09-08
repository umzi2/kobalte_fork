import { Accessor, FlowComponent } from "solid-js";
import { MaybeAccessor } from "@solid-primitives/utils";
//#region src/primitives/create-dom-collection/types.d.ts
interface DomCollectionItem {
  ref: Accessor<Element | undefined>;
}
//#endregion
//#region src/primitives/create-dom-collection/create-dom-collection.d.ts
interface CreateDomCollectionProps<T extends DomCollectionItem = DomCollectionItem> {
  /**
   * @deprecated Not used internally. Callers should use the `items` accessor
   * returned by `createDomCollection` as the data source instead.
   */
  items?: MaybeAccessor<Array<T> | undefined>;
  /** Event handler called when the items state of the collection changes. */
  onItemsChange?: (items: Array<T>) => void;
}
declare function createDomCollection<T extends DomCollectionItem = DomCollectionItem>(props?: CreateDomCollectionProps<T>): {
  DomCollectionProvider: FlowComponent;
  items: import("solid-js").SourceAccessor<T[]>;
};
//#endregion
//#region src/primitives/create-dom-collection/create-dom-collection-item.d.ts
interface CreateDomCollectionItemProps<T extends DomCollectionItem = DomCollectionItem> {
  /** A function to map a data source item to a dom collection item. */
  getItem: () => T;
  /** Whether the item should be registered to the state. */
  shouldRegisterItem?: MaybeAccessor<boolean | undefined>;
}
declare function createDomCollectionItem<T extends DomCollectionItem = DomCollectionItem>(props: CreateDomCollectionItemProps<T>): void;
//#endregion
//#region src/primitives/create-dom-collection/dom-collection-context.d.ts
interface DomCollectionContextValue<T extends DomCollectionItem = DomCollectionItem> {
  registerItem: (item: T) => () => void;
}
declare const DomCollectionContext: import("solid-js").Context<DomCollectionContextValue<DomCollectionItem> | null>;
declare function useOptionalDomCollectionContext(): DomCollectionContextValue | undefined;
declare function useDomCollectionContext<T extends DomCollectionItem = DomCollectionItem>(): DomCollectionContextValue<T>;
//#endregion
export { CreateDomCollectionItemProps as a, createDomCollection as c, useOptionalDomCollectionContext as i, DomCollectionItem as l, DomCollectionContextValue as n, createDomCollectionItem as o, useDomCollectionContext as r, CreateDomCollectionProps as s, DomCollectionContext as t };