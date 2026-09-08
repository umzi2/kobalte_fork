import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { n as DismissableLayerRenderProps } from "./D_ZxK-J-.js";
import { d as PopperArrowCommonProps, f as PopperArrowOptions, m as PopperArrowRenderProps, p as PopperArrowProps, r as PopperRootOptions, u as PopperArrow } from "./DTS_JDht.js";
import { ComponentProps, JSX as JSX$1, Portal, ValidComponent } from "@solidjs/web";
import { Accessor, ParentProps, Ref } from "solid-js";
import { PointerDownOutsideEvent } from "@solid-primitives/interaction";
//#region src/tooltip/tooltip-context.d.ts
interface TooltipDataSet {
  "data-expanded": string | undefined;
  "data-closed": string | undefined;
}
interface TooltipContextValue {
  dataset: Accessor<TooltipDataSet>;
  isOpen: Accessor<boolean>;
  isDisabled: Accessor<boolean>;
  triggerOnFocusOnly: Accessor<boolean>;
  contentId: Accessor<string | undefined>;
  contentPresent: Accessor<boolean>;
  openTooltip: (immediate?: boolean) => void;
  hideTooltip: (immediate?: boolean) => void;
  cancelOpening: () => void;
  generateId: (part: string) => string;
  registerContentId: (id: string) => () => void;
  isTargetOnTooltip: (target: Node | null) => boolean;
  setTriggerRef: (el: HTMLElement) => void;
  setContentRef: (el: HTMLElement) => void;
}
declare function useTooltipContext(): TooltipContextValue;
//#endregion
//#region src/tooltip/tooltip-content.d.ts
interface TooltipContentOptions {
  /**
   * Event handler called when the escape key is down.
   * It can be prevented by calling `event.preventDefault`.
   */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /**
   * Event handler called when a pointer event occurs outside the bounds of the component.
   * It can be prevented by calling `event.preventDefault`.
   */
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
}
interface TooltipContentCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  style?: JSX$1.CSSProperties | string;
}
interface TooltipContentRenderProps extends TooltipContentCommonProps, DismissableLayerRenderProps, TooltipDataSet {
  role: "tooltip";
}
type TooltipContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = TooltipContentOptions & Partial<TooltipContentCommonProps<ElementOf<T>>>;
/**
 * Contains the content to be rendered when the tooltip is open.
 */
declare function TooltipContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, TooltipContentProps<T>>): JSX$1.Element;
//#endregion
//#region src/tooltip/tooltip-portal.d.ts
interface TooltipPortalProps extends ComponentProps<typeof Portal> {}
/**
 * Portals its children into the `body` when the tooltip is open.
 */
declare function TooltipPortal(props: TooltipPortalProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/tooltip/tooltip-root.d.ts
interface TooltipRootOptions extends Omit<PopperRootOptions, "anchorRef" | "contentRef"> {
  /** The controlled open state of the tooltip. */
  open?: boolean;
  /**
   * The default open state when initially rendered.
   * Useful when you do not need to control the open state.
   */
  defaultOpen?: boolean;
  /** Event handler called when the open state of the tooltip changes. */
  onOpenChange?: (isOpen: boolean) => void;
  /** Whether the tooltip should be disabled, independent of the trigger. */
  disabled?: boolean;
  /**
   * Whether to open the tooltip only when the trigger is focused.
   * By default, opens for both focus and hover.
   */
  triggerOnFocusOnly?: boolean;
  /** The duration from when the mouse enters the trigger until the tooltip opens. */
  openDelay?: number;
  /** The duration from when the mouse leaves the trigger or content until the tooltip closes. */
  closeDelay?: number;
  /** The duration from when the mouse leaves the trigger or content and moves to another tooltip trigger or content */
  skipDelayDuration?: number;
  /** Whether to close the tooltip even if the user cursor is inside the safe area between the trigger and tooltip. */
  ignoreSafeArea?: boolean;
  /**
   * Used to force mounting the tooltip (portal and content) when more control is needed.
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
interface TooltipRootProps extends ParentProps<TooltipRootOptions> {}
/**
 * A popup that displays information related to an element
 * when the element receives keyboard focus or the mouse hovers over it.
 */
declare function TooltipRoot(props: TooltipRootProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/tooltip/tooltip-trigger.d.ts
interface TooltipTriggerOptions {}
interface TooltipTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  onPointerEnter: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerLeave: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onBlur: JSX$1.EventHandlerUnion<T, FocusEvent>;
}
interface TooltipTriggerRenderProps extends TooltipTriggerCommonProps {
  "aria-describedby": string | undefined;
}
type TooltipTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = TooltipTriggerOptions & Partial<TooltipTriggerCommonProps<ElementOf<T>>>;
/**
 * The button that opens the tooltip when hovered.
 */
declare function TooltipTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, TooltipTriggerProps<T>>): JSX$1.Element;
declare namespace index_d_exports {
  export { PopperArrow as Arrow, TooltipContent as Content, TooltipPortal as Portal, TooltipRoot as Root, Tooltip, PopperArrowCommonProps as TooltipArrowCommonProps, PopperArrowOptions as TooltipArrowOptions, PopperArrowProps as TooltipArrowProps, PopperArrowRenderProps as TooltipArrowRenderProps, TooltipContentCommonProps, TooltipContentOptions, TooltipContentProps, TooltipContentRenderProps, TooltipContextValue, TooltipPortalProps, TooltipRootOptions, TooltipRootProps, TooltipTriggerCommonProps, TooltipTriggerOptions, TooltipTriggerProps, TooltipTriggerRenderProps, TooltipTrigger as Trigger, useTooltipContext };
}
declare const Tooltip: typeof TooltipRoot & {
  Arrow: typeof PopperArrow;
  Content: typeof TooltipContent;
  Portal: typeof TooltipPortal;
  Trigger: typeof TooltipTrigger;
};
//#endregion
export { TooltipContentRenderProps as _, TooltipTriggerOptions as a, TooltipRoot as c, TooltipPortal as d, TooltipPortalProps as f, TooltipContentProps as g, TooltipContentOptions as h, TooltipTriggerCommonProps as i, TooltipRootOptions as l, TooltipContentCommonProps as m, index_d_exports as n, TooltipTriggerProps as o, TooltipContent as p, TooltipTrigger as r, TooltipTriggerRenderProps as s, Tooltip as t, TooltipRootProps as u, TooltipContextValue as v, useTooltipContext as y };