import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { n as DismissableLayerRenderProps } from "./D_ZxK-J-.js";
import { d as PopperArrowCommonProps, f as PopperArrowOptions, m as PopperArrowRenderProps, p as PopperArrowProps, r as PopperRootOptions, u as PopperArrow } from "./DTS_JDht.js";
import { s as LinkRootRenderProps } from "./DnbLVAWR.js";
import { ComponentProps, JSX as JSX$1, Portal, ValidComponent } from "@solidjs/web";
import { Accessor, ParentProps, Ref } from "solid-js";
//#region src/hover-card/hover-card-context.d.ts
interface HoverCardDataSet {
  "data-expanded": string | undefined;
  "data-closed": string | undefined;
}
interface HoverCardContextValue {
  dataset: Accessor<HoverCardDataSet>;
  isOpen: Accessor<boolean>;
  contentPresent: Accessor<boolean>;
  openWithDelay: () => void;
  closeWithDelay: () => void;
  cancelOpening: () => void;
  cancelClosing: () => void;
  close: () => void;
  isTargetOnHoverCard: (target: Node | null) => boolean;
  setTriggerRef: (el: HTMLElement) => void;
  setContentRef: (el: HTMLElement) => void;
}
declare function useHoverCardContext(): HoverCardContextValue;
//#endregion
//#region src/hover-card/hover-card-content.d.ts
interface HoverCardContentOptions {}
interface HoverCardContentOptions {}
interface HoverCardContentCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  style?: JSX$1.CSSProperties | string;
}
interface HoverCardContentRenderProps extends HoverCardContentCommonProps, DismissableLayerRenderProps, HoverCardDataSet {}
type HoverCardContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = HoverCardContentOptions & Partial<HoverCardContentCommonProps<ElementOf<T>>>;
/**
 * Contains the content to be rendered when the hovercard is open.
 */
declare function HoverCardContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, HoverCardContentProps<T>>): JSX$1.Element;
//#endregion
//#region src/hover-card/hover-card-portal.d.ts
interface HoverCardPortalProps extends ComponentProps<typeof Portal> {}
/**
 * Portals its children into the `body` when the hovercard is open.
 */
declare function HoverCardPortal(props: HoverCardPortalProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/hover-card/hover-card-root.d.ts
interface HoverCardRootOptions extends Omit<PopperRootOptions, "anchorRef" | "contentRef" | "onCurrentPlacementChange"> {
  /** The controlled open state of the hovercard. */
  open?: boolean;
  /**
   * The default open state when initially rendered.
   * Useful when you do not need to control the open state.
   */
  defaultOpen?: boolean;
  /** Event handler called when the open state of the hovercard changes. */
  onOpenChange?: (isOpen: boolean) => void;
  /** The duration from when the mouse enters the trigger until the hovercard opens. */
  openDelay?: number;
  /** The duration from when the mouse leaves the trigger or content until the hovercard closes. */
  closeDelay?: number;
  /** Whether to close the hovercard even if the user cursor is inside the safe area between the trigger and hovercard. */
  ignoreSafeArea?: boolean;
  /**
   * Used to force mounting the hovercard (portal and content) when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
}
interface HoverCardRootProps extends ParentProps<HoverCardRootOptions> {}
/**
 * A popover that allows sighted users to preview content available behind a link.
 */
declare function HoverCardRoot(props: HoverCardRootProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/hover-card/hover-card-trigger.d.ts
interface HoverCardTriggerOptions {}
interface HoverCardTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  disabled: boolean;
  ref: Ref<T>;
  onPointerEnter: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerLeave: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onBlur: JSX$1.EventHandlerUnion<T, FocusEvent>;
}
interface HoverCardTriggerRenderProps extends HoverCardTriggerCommonProps, LinkRootRenderProps, HoverCardDataSet {}
type HoverCardTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = HoverCardTriggerOptions & Partial<HoverCardTriggerCommonProps<ElementOf<T>>>;
/**
 * The link that opens the hovercard when hovered.
 */
declare function HoverCardTrigger<T extends ValidComponent = "a">(props: PolymorphicProps<T, HoverCardTriggerProps<T>>): JSX$1.Element;
declare namespace index_d_exports {
  export { PopperArrow as Arrow, HoverCardContent as Content, HoverCard, PopperArrowCommonProps as HoverCardArrowCommonProps, PopperArrowOptions as HoverCardArrowOptions, PopperArrowProps as HoverCardArrowProps, PopperArrowRenderProps as HoverCardArrowRenderProps, HoverCardContentCommonProps, HoverCardContentOptions, HoverCardContentProps, HoverCardContentRenderProps, HoverCardContextValue, HoverCardPortalProps, HoverCardRootOptions, HoverCardRootProps, HoverCardTriggerCommonProps, HoverCardTriggerOptions, HoverCardTriggerProps, HoverCardTriggerRenderProps, HoverCardPortal as Portal, HoverCardRoot as Root, HoverCardTrigger as Trigger, useHoverCardContext };
}
declare const HoverCard: typeof HoverCardRoot & {
  Arrow: typeof PopperArrow;
  Content: typeof HoverCardContent;
  Portal: typeof HoverCardPortal;
  Trigger: typeof HoverCardTrigger;
};
//#endregion
export { HoverCardContentRenderProps as _, HoverCardTriggerOptions as a, HoverCardRoot as c, HoverCardPortal as d, HoverCardPortalProps as f, HoverCardContentProps as g, HoverCardContentOptions as h, HoverCardTriggerCommonProps as i, HoverCardRootOptions as l, HoverCardContentCommonProps as m, index_d_exports as n, HoverCardTriggerProps as o, HoverCardContent as p, HoverCardTrigger as r, HoverCardTriggerRenderProps as s, HoverCard as t, HoverCardRootProps as u, HoverCardContextValue as v, useHoverCardContext as y };