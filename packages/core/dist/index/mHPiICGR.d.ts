import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { _ as CollapsibleContentRenderProps, f as CollapsibleRootRenderProps, i as CollapsibleTriggerCommonProps, l as CollapsibleRootCommonProps, m as CollapsibleContentCommonProps, s as CollapsibleTriggerRenderProps, y as CollapsibleDataSet } from "./D10cB7wV.js";
import { l as ListState } from "./CaxKjm1F.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
//#region src/accordion/accordion-content.d.ts
interface AccordionContentOptions {}
interface AccordionContentCommonProps<T extends HTMLElement = HTMLElement> extends CollapsibleContentCommonProps<T> {
  id: string;
}
interface AccordionContentRenderProps extends AccordionContentCommonProps, CollapsibleContentRenderProps {
  role: "region";
  "aria-labelledby": string | undefined;
}
type AccordionContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = AccordionContentOptions & Partial<AccordionContentCommonProps<ElementOf<T>>>;
/**
 * Contains the content to be rendered when the `Accordion.Item` is expanded.
 */
declare function AccordionContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, AccordionContentProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/accordion/accordion-header.d.ts
interface AccordionHeaderOptions {}
interface AccordionHeaderCommonProps<_T extends HTMLElement = HTMLElement> {}
interface AccordionHeaderRenderProps extends AccordionHeaderCommonProps, CollapsibleDataSet {}
type AccordionHeaderProps<T extends ValidComponent | HTMLElement = HTMLElement> = AccordionHeaderOptions & Partial<AccordionHeaderCommonProps<ElementOf<T>>>;
/**
 * Wraps an `Accordion.Trigger`.
 * Use the `as` prop to update it to the appropriate heading level for your page.
 */
declare function AccordionHeader<T extends ValidComponent = "h3">(props: PolymorphicProps<T, AccordionHeaderProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/accordion/accordion-item.d.ts
interface AccordionItemOptions {
  /** A unique value for the item. */
  value: string;
  /** Whether the item is disabled. */
  disabled?: boolean;
  /**
   * Used to force mounting the item content when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
}
interface AccordionItemCommonProps<T extends HTMLElement = HTMLElement> extends CollapsibleRootCommonProps<T> {}
interface AccordionItemRenderProps extends AccordionItemCommonProps, CollapsibleRootRenderProps {}
type AccordionItemProps = AccordionItemOptions & Partial<AccordionItemRenderProps>;
/**
 * An item of the accordion, contains all the parts of a collapsible section.
 */
declare function AccordionItem<T extends ValidComponent = "div">(props: PolymorphicProps<T, AccordionItemProps>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/accordion/accordion-root.d.ts
interface AccordionRootOptions {
  /** The controlled value of the accordion item(s) to expand. */
  value?: string[];
  /**
   * The value of the accordion item(s) to expand when initially rendered.
   * Useful when you do not need to control the state.
   */
  defaultValue?: string[];
  /** Event handler called when the value changes. */
  onChange?: (value: string[]) => void;
  /** Whether multiple items can be opened at the same time. */
  multiple?: boolean;
  /** When `multiple` is `false`, allows closing content when clicking trigger for an open item. */
  collapsible?: boolean;
  /** Whether focus should wrap around when the end/start is reached. */
  shouldFocusWrap?: boolean;
}
interface AccordionRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onMouseDown: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocusIn: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onFocusOut: JSX$1.EventHandlerUnion<T, FocusEvent>;
}
interface AccordionRootRenderProps extends AccordionRootCommonProps {}
type AccordionRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = AccordionRootOptions & Partial<AccordionRootCommonProps<ElementOf<T>>>;
/**
 * A vertically stacked set of interactive headings that each reveal an associated section of content.
 */
declare function AccordionRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, AccordionRootProps<T>>): JSX$1.Element;
//#endregion
//#region src/accordion/accordion-trigger.d.ts
interface AccordionTriggerOptions {}
interface AccordionTriggerCommonProps<T extends HTMLElement = HTMLElement> extends CollapsibleTriggerCommonProps<T> {
  id: string;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerUp: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onMouseDown: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
}
interface AccordionTriggerRenderProps extends AccordionTriggerCommonProps, CollapsibleTriggerRenderProps {
  "data-key": string | undefined;
}
type AccordionTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = AccordionTriggerOptions & Partial<AccordionTriggerCommonProps<ElementOf<T>>>;
/**
 * Toggles the collapsed state of its associated item. It should be nested inside an `Accordion.Header`.
 */
declare function AccordionTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, AccordionTriggerProps<T>>): JSX$1.Element;
//#endregion
//#region src/accordion/accordion-context.d.ts
interface AccordionContextValue {
  listState: Accessor<ListState>;
  generateId: (part: string) => string;
}
declare function useAccordionContext(): AccordionContextValue;
declare namespace index_d_exports {
  export { Accordion, AccordionContentCommonProps, AccordionContentOptions, AccordionContentProps, AccordionContentRenderProps, AccordionContextValue, AccordionHeaderCommonProps, AccordionHeaderOptions, AccordionHeaderProps, AccordionHeaderRenderProps, AccordionItemCommonProps, AccordionItemOptions, AccordionItemProps, AccordionItemRenderProps, AccordionRootCommonProps, AccordionRootOptions, AccordionRootProps, AccordionRootRenderProps, AccordionTriggerCommonProps, AccordionTriggerOptions, AccordionTriggerProps, AccordionTriggerRenderProps, AccordionContent as Content, AccordionHeader as Header, AccordionItem as Item, AccordionRoot as Root, AccordionTrigger as Trigger, useAccordionContext };
}
declare const Accordion: typeof AccordionRoot & {
  Content: typeof AccordionContent;
  Header: typeof AccordionHeader;
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
};
//#endregion
export { AccordionHeaderProps as C, AccordionContentOptions as D, AccordionContentCommonProps as E, AccordionContentProps as O, AccordionHeaderOptions as S, AccordionContent as T, AccordionItemOptions as _, AccordionTrigger as a, AccordionHeader as b, AccordionTriggerProps as c, AccordionRootCommonProps as d, AccordionRootOptions as f, AccordionItemCommonProps as g, AccordionItem as h, useAccordionContext as i, AccordionContentRenderProps as k, AccordionTriggerRenderProps as l, AccordionRootRenderProps as m, index_d_exports as n, AccordionTriggerCommonProps as o, AccordionRootProps as p, AccordionContextValue as r, AccordionTriggerOptions as s, Accordion as t, AccordionRoot as u, AccordionItemProps as v, AccordionHeaderRenderProps as w, AccordionHeaderCommonProps as x, AccordionItemRenderProps as y };