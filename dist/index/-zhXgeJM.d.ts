import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { s as ButtonRootRenderProps } from "./Bjp2qtUK.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Component, Setter } from "solid-js";
//#region src/pagination/pagination-ellipsis.d.ts
interface PaginationEllipsisOptions {}
interface PaginationEllipsisCommonProps<_T extends HTMLElement = HTMLElement> {}
interface PaginationEllipsisRenderProps extends PaginationEllipsisCommonProps {}
type PaginationEllipsisProps<T extends ValidComponent | HTMLElement = HTMLElement> = PaginationEllipsisOptions & Partial<PaginationEllipsisCommonProps<ElementOf<T>>>;
declare function PaginationEllipsis<T extends ValidComponent = "div">(props: PolymorphicProps<T, PaginationEllipsisProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/pagination/pagination-item.d.ts
interface PaginationItemOptions {
  /** The page number of this item. (1-indexed) */
  page: number;
}
interface PaginationItemCommonProps<T extends HTMLElement = HTMLElement> {
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
}
interface PaginationItemRenderProps extends PaginationItemCommonProps, ButtonRootRenderProps {
  "aria-current": "page" | undefined;
  "data-current": "" | undefined;
}
type PaginationItemProps<T extends ValidComponent | HTMLElement = HTMLElement> = PaginationItemOptions & Partial<PaginationItemCommonProps<ElementOf<T>>>;
declare function PaginationItem<T extends ValidComponent = "button">(props: PolymorphicProps<T, PaginationItemProps<T>>): JSX$1.Element;
//#endregion
//#region src/pagination/pagination-items.d.ts
interface PaginationItemsProps {}
declare function PaginationItems(_props: PaginationItemsProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/pagination/pagination-next.d.ts
interface PaginationNextOptions {}
interface PaginationNextCommonProps<T extends HTMLElement = HTMLElement> {
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
}
interface PaginationNextRenderProps extends PaginationNextCommonProps, ButtonRootRenderProps {}
type PaginationNextProps<T extends ValidComponent | HTMLElement = HTMLElement> = PaginationNextOptions & Partial<PaginationNextCommonProps<ElementOf<T>>>;
declare function PaginationNext<T extends ValidComponent = "button">(props: PolymorphicProps<T, PaginationNextProps<T>>): JSX$1.Element;
//#endregion
//#region src/pagination/pagination-previous.d.ts
interface PaginationPreviousOptions {}
interface PaginationPreviousCommonProps<T extends HTMLElement = HTMLElement> {
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
}
interface PaginationPreviousRenderProps extends PaginationPreviousCommonProps, ButtonRootRenderProps {}
type PaginationPreviousProps<T extends ValidComponent | HTMLElement = HTMLElement> = PaginationPreviousOptions & Partial<PaginationPreviousCommonProps<ElementOf<T>>>;
declare function PaginationPrevious<T extends ValidComponent = "button">(props: PolymorphicProps<T, PaginationPreviousProps<T>>): JSX$1.Element;
//#endregion
//#region src/pagination/pagination-root.d.ts
interface PaginationRootOptions {
  /** The controlled page number of the pagination. (1-indexed) */
  page?: number;
  /**
   * The default page number when initially rendered. (1-indexed)
   * Useful when you do not need to control the page number.
   */
  defaultPage?: number;
  /** Event handler called when the page number changes. */
  onPageChange?: (page: number) => void;
  /** The number of pages for the pagination. */
  count: number;
  /** The number of siblings to show around the current page item. */
  siblingCount?: number;
  /** Whether to always show the first page item. */
  showFirst?: boolean;
  /** Whether to always show the last page item. */
  showLast?: boolean;
  /**
   * Whether to always show the same number of items (to avoid content shift).
   * Special value: "no-ellipsis" does not count the ellipsis as an item (used when ellipsis are disabled).
   */
  fixedItems?: boolean | "no-ellipsis";
  /** The component to render as an item in the `Pagination.List`. */
  itemComponent: Component<{
    page: number;
  }>;
  /** The component to render as an ellipsis item in the `Pagination.List`. */
  ellipsisComponent: () => JSX$1.Element;
  /** Whether the pagination is disabled. */
  disabled?: boolean;
}
interface PaginationRootCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
  children: JSX$1.Element;
}
interface PaginationRootRenderProps extends PaginationRootCommonProps {
  "data-disabled": "" | undefined;
}
type PaginationRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = PaginationRootOptions & Partial<PaginationRootCommonProps<ElementOf<T>>>;
/**
 * A list of page number that allows users to change the current page.
 */
declare function PaginationRoot<T extends ValidComponent = "nav">(props: PolymorphicProps<T, PaginationRootProps<T>>): JSX$1.Element;
//#endregion
//#region src/pagination/pagination-context.d.ts
interface PaginationContextValue {
  count: Accessor<number>;
  siblingCount: Accessor<number>;
  showFirst: Accessor<boolean>;
  showLast: Accessor<boolean>;
  fixedItems: Accessor<boolean | "no-ellipsis">;
  isDisabled: Accessor<boolean>;
  renderItem: (page: number) => JSX$1.Element;
  renderEllipsis: () => JSX$1.Element;
  page: Accessor<number>;
  setPage: Setter<number>;
}
declare function usePaginationContext(): PaginationContextValue;
declare namespace index_d_exports {
  export { PaginationEllipsis as Ellipsis, PaginationItem as Item, PaginationItems as Items, PaginationNext as Next, Pagination, PaginationContextValue, PaginationEllipsisCommonProps, PaginationEllipsisOptions, PaginationEllipsisProps, PaginationEllipsisRenderProps, PaginationItemCommonProps, PaginationItemOptions, PaginationItemProps, PaginationItemRenderProps, PaginationItemsProps, PaginationNextCommonProps, PaginationNextOptions, PaginationNextProps, PaginationNextRenderProps, PaginationPreviousCommonProps, PaginationPreviousOptions, PaginationPreviousProps, PaginationPreviousRenderProps, PaginationRootCommonProps, PaginationRootOptions, PaginationRootProps, PaginationRootRenderProps, PaginationPrevious as Previous, PaginationRoot as Root, usePaginationContext };
}
declare const Pagination: typeof PaginationRoot & {
  Ellipsis: typeof PaginationEllipsis;
  Item: typeof PaginationItem;
  Items: typeof PaginationItems;
  Next: typeof PaginationNext;
  Previous: typeof PaginationPrevious;
};
//#endregion
export { PaginationEllipsisProps as A, PaginationItemCommonProps as C, PaginationEllipsis as D, PaginationItemRenderProps as E, PaginationEllipsisCommonProps as O, PaginationItem as S, PaginationItemProps as T, PaginationNextOptions as _, PaginationRoot as a, PaginationItems as b, PaginationRootProps as c, PaginationPreviousCommonProps as d, PaginationPreviousOptions as f, PaginationNextCommonProps as g, PaginationNext as h, usePaginationContext as i, PaginationEllipsisRenderProps as j, PaginationEllipsisOptions as k, PaginationRootRenderProps as l, PaginationPreviousRenderProps as m, index_d_exports as n, PaginationRootCommonProps as o, PaginationPreviousProps as p, PaginationContextValue as r, PaginationRootOptions as s, Pagination as t, PaginationPrevious as u, PaginationNextProps as v, PaginationItemOptions as w, PaginationItemsProps as x, PaginationNextRenderProps as y };