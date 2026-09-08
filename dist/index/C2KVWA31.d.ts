import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
//#region src/breadcrumbs/breadcrumbs-link.d.ts
interface BreadcrumbsLinkOptions {
  /** Whether the breadcrumb link represents the current page. */
  current?: boolean;
}
interface BreadcrumbsLinkCommonProps<_T extends HTMLElement = HTMLElement> {
  /** Whether the breadcrumb link is disabled. */
  disabled: boolean;
  "aria-current": string | undefined;
}
interface BreadcrumbsLinkRenderProps extends BreadcrumbsLinkCommonProps {
  "data-current": string | undefined;
}
type BreadcrumbsLinkProps<T extends ValidComponent | HTMLElement = HTMLElement> = BreadcrumbsLinkOptions & Partial<BreadcrumbsLinkCommonProps<ElementOf<T>>>;
/**
 * The breadcrumbs link.
 */
declare function BreadcrumbsLink<T extends ValidComponent = "a">(props: PolymorphicProps<T, BreadcrumbsLinkProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/breadcrumbs/breadcrumbs.intl.d.ts
declare const BREADCRUMBS_INTL_TRANSLATIONS: {
  breadcrumbs: string;
};
type BreadcrumbsIntlTranslations = typeof BREADCRUMBS_INTL_TRANSLATIONS;
//#endregion
//#region src/breadcrumbs/breadcrumbs-root.d.ts
interface BreadcrumbsRootOptions {
  /**
   * The visual separator between each breadcrumb item.
   * It will be used as the default children of `Breadcrumbs.Separator`.
   */
  separator?: string | JSX$1.Element;
  /** The localized strings of the component. */
  translations?: BreadcrumbsIntlTranslations;
}
interface BreadcrumbsRootCommonProps<_T extends HTMLElement = HTMLElement> {}
type BreadcrumbsRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = BreadcrumbsRootOptions & Partial<BreadcrumbsRootCommonProps<ElementOf<T>>>;
/**
 * Breadcrumbs show hierarchy and navigational context for a user’s location within an application.
 */
declare function BreadcrumbsRoot<T extends ValidComponent = "nav">(props: PolymorphicProps<T, BreadcrumbsRootProps<T>>): JSX$1.Element;
//#endregion
//#region src/breadcrumbs/breadcrumbs-separator.d.ts
interface BreadcrumbsSeparatorOptions {}
interface BreadcrumbsSeparatorCommonProps<_T extends HTMLElement = HTMLElement> {}
interface BreadcrumbsSeparatorRenderProps extends BreadcrumbsSeparatorCommonProps {
  children: JSX$1.Element;
  "aria-hidden": "true";
}
type BreadcrumbsSeparatorProps<T extends ValidComponent | HTMLElement = HTMLElement> = BreadcrumbsSeparatorOptions & Partial<BreadcrumbsSeparatorCommonProps<ElementOf<T>>>;
/**
 * The visual separator between each breadcrumb items.
 * It will not be visible by screen readers.
 */
declare function BreadcrumbsSeparator<T extends ValidComponent = "span">(props: PolymorphicProps<T, BreadcrumbsSeparatorProps<T>>): JSX$1.Element;
//#endregion
//#region src/breadcrumbs/breadcrumbs-context.d.ts
interface BreadcrumbsContextValue {
  separator: () => string | JSX$1.Element;
}
declare function useBreadcrumbsContext(): BreadcrumbsContextValue;
declare namespace index_d_exports {
  export { Breadcrumbs, BreadcrumbsContextValue, BreadcrumbsLinkCommonProps, BreadcrumbsLinkOptions, BreadcrumbsLinkProps, BreadcrumbsLinkRenderProps, BreadcrumbsRootOptions, BreadcrumbsRootProps, BreadcrumbsSeparatorCommonProps, BreadcrumbsSeparatorOptions, BreadcrumbsSeparatorProps, BreadcrumbsSeparatorRenderProps, BreadcrumbsLink as Link, BreadcrumbsRoot as Root, BreadcrumbsSeparator as Separator, useBreadcrumbsContext };
}
declare const Breadcrumbs: typeof BreadcrumbsRoot & {
  Link: typeof BreadcrumbsLink;
  Separator: typeof BreadcrumbsSeparator;
};
//#endregion
export { BreadcrumbsLinkRenderProps as _, BreadcrumbsSeparator as a, BreadcrumbsSeparatorProps as c, BreadcrumbsRootOptions as d, BreadcrumbsRootProps as f, BreadcrumbsLinkProps as g, BreadcrumbsLinkOptions as h, useBreadcrumbsContext as i, BreadcrumbsSeparatorRenderProps as l, BreadcrumbsLinkCommonProps as m, index_d_exports as n, BreadcrumbsSeparatorCommonProps as o, BreadcrumbsLink as p, BreadcrumbsContextValue as r, BreadcrumbsSeparatorOptions as s, Breadcrumbs as t, BreadcrumbsRoot as u };