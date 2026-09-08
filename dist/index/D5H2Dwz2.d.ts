import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { ValidComponent } from "@solidjs/web";
import { Ref } from "solid-js";
import { Orientation } from "@kobalte/utils";
//#region src/separator/separator-root.d.ts
interface SeparatorRootOptions {
  /** The orientation of the separator. */
  orientation?: Orientation;
}
interface SeparatorRootCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
}
interface SeparatorRootRenderProps extends SeparatorRootCommonProps {
  role: "separator" | undefined;
  "aria-orientation": "vertical" | undefined;
  "data-orientation": Orientation | undefined;
}
type SeparatorRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = SeparatorRootOptions & Partial<SeparatorRootCommonProps<ElementOf<T>>>;
/**
 * A separator visually or semantically separates content.
 */
declare function SeparatorRoot<T extends ValidComponent = "hr">(props: PolymorphicProps<T, SeparatorRootProps<T>>): import("@solidjs/web").JSX.Element;
declare namespace index_d_exports {
  export { SeparatorRoot as Root, Separator, SeparatorRootCommonProps, SeparatorRootOptions, SeparatorRootProps, SeparatorRootRenderProps };
}
declare const Separator: typeof SeparatorRoot;
//#endregion
export { SeparatorRootOptions as a, SeparatorRootCommonProps as i, index_d_exports as n, SeparatorRootProps as o, SeparatorRoot as r, SeparatorRootRenderProps as s, Separator as t };