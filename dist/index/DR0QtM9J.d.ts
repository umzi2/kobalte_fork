import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { s as ButtonRootRenderProps } from "./Bjp2qtUK.js";
import { n as DismissableLayerRenderProps } from "./D_ZxK-J-.js";
import { d as PopperArrowCommonProps, f as PopperArrowOptions, m as PopperArrowRenderProps, p as PopperArrowProps, r as PopperRootOptions, u as PopperArrow } from "./DTS_JDht.js";
import { ComponentProps, JSX as JSX$1, Portal, ValidComponent } from "@solidjs/web";
import { Accessor, ParentProps, Ref } from "solid-js";
import { FocusOutsideEvent, InteractOutsideEvent, PointerDownOutsideEvent } from "@solid-primitives/interaction";
//#region src/popover/popover.intl.d.ts
declare const POPOVER_INTL_TRANSLATIONS: {
  dismiss: string;
};
type PopoverIntlTranslations = typeof POPOVER_INTL_TRANSLATIONS;
//#endregion
//#region src/popover/popover-context.d.ts
interface PopoverDataSet {
  "data-expanded": string | undefined;
  "data-closed": string | undefined;
}
interface PopoverContextValue {
  translations: Accessor<PopoverIntlTranslations>;
  dataset: Accessor<PopoverDataSet>;
  isOpen: Accessor<boolean>;
  isModal: Accessor<boolean>;
  preventScroll: Accessor<boolean>;
  contentPresent: Accessor<boolean>;
  triggerRef: Accessor<HTMLElement | undefined>;
  contentId: Accessor<string | undefined>;
  titleId: Accessor<string | undefined>;
  descriptionId: Accessor<string | undefined>;
  setDefaultAnchorRef: (el: HTMLElement) => void;
  setTriggerRef: (el: HTMLElement) => void;
  setContentRef: (el: HTMLElement) => void;
  close: () => void;
  toggle: () => void;
  generateId: (part: string) => string;
  registerContentId: (id: string) => () => void;
  registerTitleId: (id: string) => () => void;
  registerDescriptionId: (id: string) => () => void;
}
declare function usePopoverContext(): PopoverContextValue;
//#endregion
//#region src/popover/popover-anchor.d.ts
interface PopoverAnchorOptions {}
interface PopoverAnchorCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
}
interface PopoverAnchorRenderProps extends PopoverAnchorCommonProps, PopoverDataSet {}
type PopoverAnchorProps<T extends ValidComponent | HTMLElement = HTMLElement> = PopoverAnchorOptions & Partial<PopoverAnchorCommonProps<ElementOf<T>>>;
/**
 * An optional element to position the `Popover.Content` against.
 * If this part is not used, the content will position alongside the `Popover.Trigger`.
 */
declare function PopoverAnchor<T extends ValidComponent = "div">(props: PolymorphicProps<T, PopoverAnchorProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/popover/popover-close-button.d.ts
interface PopoverCloseButtonOptions {}
interface PopoverCloseButtonCommonProps<T extends HTMLElement = HTMLElement> {
  "aria-label": string;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
}
interface PopoverCloseButtonRenderProps extends PopoverCloseButtonCommonProps, ButtonRootRenderProps, PopoverDataSet {}
type PopoverCloseButtonProps<T extends ValidComponent | HTMLElement = HTMLElement> = PopoverCloseButtonOptions & Partial<PopoverCloseButtonCommonProps<ElementOf<T>>>;
/**
 * The button that closes the popover.
 */
declare function PopoverCloseButton<T extends ValidComponent = "button">(props: PolymorphicProps<T, PopoverCloseButtonProps<T>>): JSX$1.Element;
//#endregion
//#region src/popover/popover-content.d.ts
interface PopoverContentOptions {
  /**
   * Event handler called when focus moves into the component after opening.
   * It can be prevented by calling `event.preventDefault`.
   */
  onOpenAutoFocus?: (event: Event) => void;
  /**
   * Event handler called when focus moves to the trigger after closing.
   * It can be prevented by calling `event.preventDefault`.
   */
  onCloseAutoFocus?: (event: Event) => void;
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
  /**
   * Event handler called when the focus moves outside the bounds of the component.
   * It can be prevented by calling `event.preventDefault`.
   */
  onFocusOutside?: (event: FocusOutsideEvent) => void;
  /**
   * Event handler called when an interaction (pointer or focus event) happens outside the bounds of the component.
   * It can be prevented by calling `event.preventDefault`.
   */
  onInteractOutside?: (event: InteractOutsideEvent) => void;
}
interface PopoverContentCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  style?: JSX$1.CSSProperties | string;
}
interface PopoverContentRenderProps extends PopoverContentCommonProps, DismissableLayerRenderProps, PopoverDataSet {
  role: "dialog";
  tabindex: -1;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
}
type PopoverContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = PopoverContentOptions & Partial<PopoverContentCommonProps<ElementOf<T>>>;
/**
 * Contains the content to be rendered when the popover is open.
 */
declare function PopoverContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, PopoverContentProps<T>>): JSX$1.Element;
//#endregion
//#region src/popover/popover-description.d.ts
interface PopoverDescriptionOptions {}
interface PopoverDescriptionCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface PopoverDescriptionRenderProps extends PopoverDescriptionCommonProps, PopoverDataSet {}
type PopoverDescriptionProps<T extends ValidComponent | HTMLElement = HTMLElement> = PopoverDescriptionOptions & Partial<PopoverDescriptionCommonProps<ElementOf<T>>>;
/**
 * An optional accessible description to be announced when the popover is open.
 */
declare function PopoverDescription<T extends ValidComponent = "p">(props: PolymorphicProps<T, PopoverDescriptionProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/popover/popover-portal.d.ts
interface PopoverPortalProps extends ComponentProps<typeof Portal> {}
/**
 * Portals its children into the `body` when the popover is open.
 */
declare function PopoverPortal(props: PopoverPortalProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/popover/popover-root.d.ts
interface PopoverRootOptions extends Omit<PopperRootOptions, "anchorRef" | "contentRef" | "onCurrentPlacementChange"> {
  /**
   * A ref for the anchor element.
   * Useful if you want to use an element outside `Popover` as the popover anchor.
   */
  anchorRef?: Accessor<HTMLElement | undefined>;
  /** The controlled open state of the popover. */
  open?: boolean;
  /**
   * The default open state when initially rendered.
   * Useful when you do not need to control the open state.
   */
  defaultOpen?: boolean;
  /** Event handler called when the open state of the popover changes. */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
  /**
   * Whether the popover should be the only visible content for screen readers.
   * When set to `true`:
   * - interaction with outside elements will be disabled.
   * - scroll will be locked.
   * - focus will be locked inside the popover content.
   * - elements outside the popover content will not be visible for screen readers.
   */
  modal?: boolean;
  /** Whether the scroll should be locked even if the popover is not modal. */
  preventScroll?: boolean;
  /**
   * Used to force mounting the popover (portal, positioner and content) when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
  /** The localized strings of the component. */
  translations?: PopoverIntlTranslations;
}
interface PopoverRootProps extends ParentProps<PopoverRootOptions> {}
/**
 * A popover is a dialog positioned relative to an anchor element.
 */
declare function PopoverRoot(props: PopoverRootProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/popover/popover-title.d.ts
interface PopoverTitleOptions {}
interface PopoverTitleCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface PopoverTitleRenderProps extends PopoverTitleCommonProps, PopoverDataSet {}
type PopoverTitleProps<T extends ValidComponent | HTMLElement = HTMLElement> = PopoverTitleOptions & Partial<PopoverTitleCommonProps<ElementOf<T>>>;
/**
 * An accessible title to be announced when the popover is open.
 */
declare function PopoverTitle<T extends ValidComponent = "h2">(props: PolymorphicProps<T, PopoverTitleProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/popover/popover-trigger.d.ts
interface PopoverTriggerOptions {}
interface PopoverTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
}
interface PopoverTriggerRenderProps extends PopoverTriggerCommonProps, ButtonRootRenderProps, PopoverDataSet {
  "aria-haspopup": "dialog";
  "aria-expanded": "true" | "false";
  "aria-controls": string | undefined;
}
type PopoverTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = PopoverTriggerOptions & Partial<PopoverTriggerCommonProps<ElementOf<T>>>;
/**
 * The button that opens the popover.
 */
declare function PopoverTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, PopoverTriggerProps<T>>): JSX$1.Element;
declare namespace index_d_exports {
  export { PopoverAnchor as Anchor, PopperArrow as Arrow, PopoverCloseButton as CloseButton, PopoverContent as Content, PopoverDescription as Description, Popover, PopoverAnchorCommonProps, PopoverAnchorOptions, PopoverAnchorProps, PopoverAnchorRenderProps, PopperArrowCommonProps as PopoverArrowCommonProps, PopperArrowOptions as PopoverArrowOptions, PopperArrowProps as PopoverArrowProps, PopperArrowRenderProps as PopoverArrowRenderProps, PopoverCloseButtonCommonProps, PopoverCloseButtonOptions, PopoverCloseButtonProps, PopoverCloseButtonRenderProps, PopoverContentCommonProps, PopoverContentOptions, PopoverContentProps, PopoverContentRenderProps, PopoverContextValue, PopoverDescriptionCommonProps, PopoverDescriptionOptions, PopoverDescriptionProps, PopoverDescriptionRenderProps, PopoverPortalProps, PopoverRootOptions, PopoverRootProps, PopoverTitleCommonProps, PopoverTitleOptions, PopoverTitleProps, PopoverTitleRenderProps, PopoverTriggerCommonProps, PopoverTriggerOptions, PopoverTriggerProps, PopoverTriggerRenderProps, PopoverPortal as Portal, PopoverRoot as Root, PopoverTitle as Title, PopoverTrigger as Trigger, usePopoverContext };
}
declare const Popover: typeof PopoverRoot & {
  Anchor: typeof PopoverAnchor;
  Arrow: typeof PopperArrow;
  CloseButton: typeof PopoverCloseButton;
  Content: typeof PopoverContent;
  Description: typeof PopoverDescription;
  Portal: typeof PopoverPortal;
  Title: typeof PopoverTitle;
  Trigger: typeof PopoverTrigger;
};
//#endregion
export { PopoverCloseButtonOptions as A, PopoverContent as C, PopoverContentRenderProps as D, PopoverContentProps as E, PopoverAnchorOptions as F, PopoverAnchorProps as I, PopoverAnchorRenderProps as L, PopoverCloseButtonRenderProps as M, PopoverAnchor as N, PopoverCloseButton as O, PopoverAnchorCommonProps as P, PopoverContextValue as R, PopoverDescriptionRenderProps as S, PopoverContentOptions as T, PopoverPortalProps as _, PopoverTriggerOptions as a, PopoverDescriptionOptions as b, PopoverTitle as c, PopoverTitleProps as d, PopoverTitleRenderProps as f, PopoverPortal as g, PopoverRootProps as h, PopoverTriggerCommonProps as i, PopoverCloseButtonProps as j, PopoverCloseButtonCommonProps as k, PopoverTitleCommonProps as l, PopoverRootOptions as m, index_d_exports as n, PopoverTriggerProps as o, PopoverRoot as p, PopoverTrigger as r, PopoverTriggerRenderProps as s, Popover as t, PopoverTitleOptions as u, PopoverDescription as v, PopoverContentCommonProps as w, PopoverDescriptionProps as x, PopoverDescriptionCommonProps as y, usePopoverContext as z };