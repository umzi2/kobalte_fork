import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { ValidComponent } from "@solidjs/web";
import { Ref } from "solid-js";
import { Orientation } from "@kobalte/utils";
//#region src/divider/divider-root.d.ts
interface DividerRootOptions {
  /** The orientation of the divider. */
  orientation?: Orientation;
  /**
   * Shrink or stretch the line based on the orientation.
   * This is exposed as a `data-inset` attribute so consuming CSS can
   * react to it (e.g. to align the divider with surrounding content).
   */
  inset?: "none" | "context" | (string & {});
}
interface DividerRootCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
}
interface DividerRootRenderProps extends DividerRootCommonProps {
  role: "separator" | undefined;
  "aria-orientation": "vertical" | undefined;
  "data-orientation": Orientation | undefined;
  "data-inset": string | undefined;
}
type DividerRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = DividerRootOptions & Partial<DividerRootCommonProps<ElementOf<T>>>;
/**
 * A thin line, with optional content (e.g. text or an icon), that groups
 * content in lists and layouts.
 */
declare function DividerRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, DividerRootProps<T>>): import("@solidjs/web").JSX.Element;
declare namespace index_d_exports {
  export { Divider, DividerRootCommonProps, DividerRootOptions, DividerRootProps, DividerRootRenderProps, DividerRoot as Root };
}
declare const Divider: typeof DividerRoot;
//#endregion
export { DividerRootOptions as a, DividerRootCommonProps as i, index_d_exports as n, DividerRootProps as o, DividerRoot as r, DividerRootRenderProps as s, Divider as t };