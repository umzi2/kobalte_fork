import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { i as ButtonRootCommonProps, s as ButtonRootRenderProps } from "./Bjp2qtUK.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
//#region src/collapsible/collapsible-context.d.ts
interface CollapsibleDataSet {
  "data-expanded": string | undefined;
  "data-closed": string | undefined;
  "data-disabled": string | undefined;
}
interface CollapsibleContextValue {
  dataset: Accessor<CollapsibleDataSet>;
  isOpen: Accessor<boolean>;
  disabled: Accessor<boolean>;
  shouldMount: Accessor<boolean>;
  contentId: Accessor<string | undefined>;
  toggle: () => void;
  generateId: (part: string) => string;
  registerContentId: (id: string) => () => void;
}
declare function useCollapsibleContext(): CollapsibleContextValue;
//#endregion
//#region src/collapsible/collapsible-content.d.ts
interface CollapsibleContentOptions {}
interface CollapsibleContentCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  style: JSX$1.CSSProperties | string;
}
interface CollapsibleContentRenderProps extends CollapsibleContentCommonProps, CollapsibleDataSet {}
type CollapsibleContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = CollapsibleContentOptions & Partial<CollapsibleContentCommonProps<ElementOf<T>>>;
/**
 * Contains the content to be rendered when the collapsible is expanded.
 */
declare function CollapsibleContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, CollapsibleContentProps<T>>): JSX$1.Element;
//#endregion
//#region src/collapsible/collapsible-root.d.ts
interface CollapsibleRootOptions {
  /** The controlled open state of the collapsible. */
  open?: boolean;
  /**
   * The default open state when initially rendered.
   * Useful when you do not need to control the open state.
   */
  defaultOpen?: boolean;
  /** Event handler called when the open state of the collapsible changes. */
  onOpenChange?: (isOpen: boolean) => void;
  /** Whether the collapsible is disabled. */
  disabled?: boolean;
  /**
   * Used to force mounting the collapsible content when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
}
interface CollapsibleRootCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface CollapsibleRootRenderProps extends CollapsibleRootCommonProps, CollapsibleDataSet {}
type CollapsibleRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = CollapsibleRootOptions & Partial<CollapsibleRootCommonProps<ElementOf<T>>>;
/**
 * An interactive component which expands/collapses a content.
 */
declare function CollapsibleRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, CollapsibleRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/collapsible/collapsible-trigger.d.ts
interface CollapsibleTriggerOptions {}
interface CollapsibleTriggerCommonProps<T extends HTMLElement = HTMLElement> extends ButtonRootCommonProps<T> {
  ref: Ref<T>;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
}
interface CollapsibleTriggerRenderProps extends CollapsibleTriggerCommonProps, ButtonRootRenderProps {
  "aria-expanded": "true" | "false";
  "aria-controls": string | undefined;
}
type CollapsibleTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = CollapsibleTriggerOptions & Partial<CollapsibleTriggerCommonProps<ElementOf<T>>>;
/**
 * The button that expands/collapses the collapsible content.
 */
declare function CollapsibleTrigger<T extends ValidComponent = "div">(props: PolymorphicProps<T, CollapsibleTriggerProps<T>>): JSX$1.Element;
declare namespace index_d_exports {
  export { Collapsible, CollapsibleContentCommonProps, CollapsibleContentOptions, CollapsibleContentProps, CollapsibleContentRenderProps, CollapsibleContextValue, CollapsibleRootCommonProps, CollapsibleRootOptions, CollapsibleRootProps, CollapsibleRootRenderProps, CollapsibleTriggerCommonProps, CollapsibleTriggerOptions, CollapsibleTriggerProps, CollapsibleTriggerRenderProps, CollapsibleContent as Content, CollapsibleRoot as Root, CollapsibleTrigger as Trigger, useCollapsibleContext };
}
declare const Collapsible: typeof CollapsibleRoot & {
  Content: typeof CollapsibleContent;
  Trigger: typeof CollapsibleTrigger;
};
//#endregion
export { CollapsibleContentRenderProps as _, CollapsibleTriggerOptions as a, useCollapsibleContext as b, CollapsibleRoot as c, CollapsibleRootProps as d, CollapsibleRootRenderProps as f, CollapsibleContentProps as g, CollapsibleContentOptions as h, CollapsibleTriggerCommonProps as i, CollapsibleRootCommonProps as l, CollapsibleContentCommonProps as m, index_d_exports as n, CollapsibleTriggerProps as o, CollapsibleContent as p, CollapsibleTrigger as r, CollapsibleTriggerRenderProps as s, Collapsible as t, CollapsibleRootOptions as u, CollapsibleContextValue as v, CollapsibleDataSet as y };