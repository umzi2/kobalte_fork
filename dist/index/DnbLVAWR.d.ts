import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { ValidComponent } from "@solidjs/web";
import { Ref } from "solid-js";
//#region src/link/link-root.d.ts
interface LinkRootOptions {
  /** Whether the link is disabled. */
  disabled?: boolean;
}
interface LinkRootCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  href: string | undefined;
}
interface LinkRootRenderProps extends LinkRootCommonProps {
  role: "link" | undefined;
  tabindex: number | undefined;
  "aria-disabled": "true" | undefined;
  "data-disabled": string | undefined;
}
type LinkRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = LinkRootOptions & Partial<LinkRootCommonProps<ElementOf<T>>>;
/**
 * Link allows a user to navigate to another page or resource within a web page or application.
 */
declare function LinkRoot<T extends ValidComponent = "a">(props: PolymorphicProps<T, LinkRootProps<T>>): import("@solidjs/web").JSX.Element;
declare namespace index_d_exports {
  export { Link, LinkRootCommonProps, LinkRootOptions, LinkRootProps, LinkRootRenderProps, LinkRoot as Root };
}
declare const Link: typeof LinkRoot;
//#endregion
export { LinkRootOptions as a, LinkRootCommonProps as i, index_d_exports as n, LinkRootProps as o, LinkRoot as r, LinkRootRenderProps as s, Link as t };