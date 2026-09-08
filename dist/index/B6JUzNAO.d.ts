import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { D as DialogDescriptionOptions, E as DialogDescriptionCommonProps, F as DialogCloseButton, I as DialogCloseButtonCommonProps, L as DialogCloseButtonOptions, M as DialogContentOptions, O as DialogDescriptionProps, P as DialogContentRenderProps, R as DialogCloseButtonProps, S as DialogOverlayOptions, T as DialogDescription, a as DialogTrigger, c as DialogTriggerProps, d as DialogTitleCommonProps, f as DialogTitleOptions, g as DialogRootOptions, j as DialogContentCommonProps, k as DialogDescriptionRenderProps, l as DialogTriggerRenderProps, m as DialogTitleRenderProps, o as DialogTriggerCommonProps, p as DialogTitleProps, s as DialogTriggerOptions, u as DialogTitle, v as DialogPortal, w as DialogOverlayRenderProps, x as DialogOverlayCommonProps, y as DialogPortalProps, z as DialogCloseButtonRenderProps } from "./f8UOK3dK.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, ParentProps, Ref, Setter } from "solid-js";
//#region src/drawer/drawer-lib.d.ts
type DrawerSide = "left" | "right" | "top" | "bottom";
type DrawerSize = number | `${number}px`;
//#endregion
//#region src/drawer/drawer-content.d.ts
interface DrawerContentOptions extends DialogContentOptions {}
interface DrawerContentCommonProps<T extends HTMLElement = HTMLElement> extends DialogContentCommonProps<T> {
  ref: Ref<T>;
  style: JSX$1.CSSProperties | string;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onTouchStart: JSX$1.EventHandlerUnion<T, TouchEvent>;
  onTransitionEnd: JSX$1.EventHandlerUnion<T, TransitionEvent>;
}
interface DrawerContentRenderProps extends DrawerContentCommonProps, DialogContentRenderProps {
  "data-side": DrawerSide;
  "data-opening": "" | undefined;
  "data-closing": "" | undefined;
  "data-snapping": "" | undefined;
  "data-transitioning": "" | undefined;
}
type DrawerContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = DrawerContentOptions & Partial<DrawerContentCommonProps<ElementOf<T>>>;
/**
 * Contains the content rendered when the drawer is open.
 * Handles drag-to-snap and drag-to-dismiss gestures.
 *
 * @data `data-side` — which edge the drawer appears from
 * @data `data-expanded` — present when open
 * @data `data-closed` — present when closed (from Dialog)
 * @data `data-opening` — present during the open transition
 * @data `data-closing` — present during the close transition
 * @data `data-snapping` — present while snapping to a snap point after drag
 * @data `data-transitioning` — present during any transition
 */
declare function DrawerContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, DrawerContentProps<T>>): JSX$1.Element;
//#endregion
//#region src/drawer/drawer-context.d.ts
type DrawerTransitionState = "opening" | "closing" | "snapping" | null;
interface DrawerContextValue {
  /** Side of the viewport the drawer appears from. */
  side: Accessor<DrawerSide>;
  /** Snap points (0–1 fractions or `Npx` strings). */
  snapPoints: Accessor<DrawerSize[]>;
  /** Break points between snap points. */
  breakPoints: Accessor<(DrawerSize | null)[]>;
  /** Snap point used when the drawer opens. */
  defaultSnapPoint: Accessor<DrawerSize>;
  /** The currently active snap point. */
  activeSnapPoint: Accessor<DrawerSize>;
  /** Programmatically change the active snap point. */
  setActiveSnapPoint: (snapPoint: DrawerSize) => void;
  /** True while the user is dragging the drawer. */
  isDragging: Accessor<boolean>;
  /** True while the drawer is transitioning between states. */
  isTransitioning: Accessor<boolean>;
  /** Current transition state, or null when idle. */
  transitionState: Accessor<DrawerTransitionState>;
  /** 0 = fully closed, 1 = fully open (at defaultSnapPoint). Can exceed 1 during overdrag. */
  openPercentage: Accessor<number>;
  /** Current translate offset in px. 0 = open, drawerSize = closed. */
  translate: Accessor<number>;
  /** Whether to allow skipping snap points via velocity. */
  allowSkippingSnapPoints: Accessor<boolean>;
  /** Whether dragging on scrollable elements is handled. */
  handleScrollableElements: Accessor<boolean>;
  /** Milliseconds before velocity cache resets. */
  velocityCacheReset: Accessor<number>;
}
declare function useDrawerContext(): DrawerContextValue;
/** Internal context — superset of DrawerContextValue with setters used by DrawerContent. */
interface DrawerInternalContextValue extends DrawerContextValue {
  setIsDragging: (v: boolean) => void;
  setTranslateDrag: Setter<number | null>;
  setTransitionState: Setter<DrawerTransitionState>;
  drawerSize: Accessor<number>;
  setDrawerSize: (v: number) => void;
  dampFunction: (distance: number) => number;
  velocityFunction: (distance: number, time: number) => number;
  resolvedSnapPoints: Accessor<Array<{
    value: DrawerSize;
    offset: number;
    upperBreakPoint?: number;
    lowerBreakPoint?: number;
  }>>;
  closeDrawer: () => void;
}
//#endregion
//#region src/drawer/drawer-overlay.d.ts
interface DrawerOverlayOptions extends DialogOverlayOptions {}
interface DrawerOverlayCommonProps<T extends HTMLElement = HTMLElement> extends DialogOverlayCommonProps<T> {
  style: JSX$1.CSSProperties | string;
}
interface DrawerOverlayRenderProps extends DrawerOverlayCommonProps, DialogOverlayRenderProps {
  "data-closing": "" | undefined;
  "data-transitioning": "" | undefined;
}
type DrawerOverlayProps<T extends ValidComponent | HTMLElement = HTMLElement> = DrawerOverlayOptions & Partial<DrawerOverlayCommonProps<ElementOf<T>>>;
/**
 * A layer that covers the inert portion of the view when the drawer is open.
 *
 * Opacity is driven automatically by the drawer's open percentage so it tracks
 * drag gestures in real-time. Add a CSS `transition: opacity` to your overlay
 * element and it will animate on open/close as well.
 *
 * - **Closing**: opacity transitions to 0 via the `data-closing` attribute hook.
 * - **Drag**: opacity tracks `openPercentage` frame-by-frame (no CSS transition
 *   is applied during drag so it feels instant).
 *
 * @data `data-expanded` — present when open (from Dialog)
 * @data `data-closed` — present when closed (from Dialog)
 * @data `data-closing` — present during the close transition
 * @data `data-transitioning` — present during any transition
 */
declare function DrawerOverlay<T extends ValidComponent = "div">(props: PolymorphicProps<T, DrawerOverlayProps<T>>): JSX$1.Element;
//#endregion
//#region src/drawer/drawer-root.d.ts
interface DrawerRootOptions extends Omit<DialogRootOptions, "forceMount"> {
  /**
   * Side of the viewport the drawer appears from.
   * @defaultValue "bottom"
   */
  side?: DrawerSide;
  /**
   * Snap points the drawer can settle at. Each value is either a fraction
   * of the drawer size (0–1) or a pixel string like `"200px"`.
   * `0` = fully closed, `1` = fully open.
   * @defaultValue `[0, 1]`
   */
  snapPoints?: DrawerSize[];
  /**
   * Custom break points between snap points. Length must equal
   * `snapPoints.length - 1`. Pass `null` to keep the default midpoint.
   */
  breakPoints?: (DrawerSize | null)[];
  /**
   * Snap point to use when the drawer first opens.
   * @defaultValue `1`
   */
  defaultSnapPoint?: DrawerSize;
  /** Controlled active snap point. */
  activeSnapPoint?: DrawerSize;
  /** Fired when the active snap point changes. */
  onActiveSnapPointChange?: (snapPoint: DrawerSize) => void;
  /**
   * Damping function applied when the user drags past the last snap point.
   * @defaultValue `(d) => 6 * Math.log(d + 1)`
   */
  dampFunction?: (distance: number) => number;
  /**
   * Velocity modifier used to determine the target snap point on release.
   * @defaultValue velocity = distance / time, clamped to 1 when |v| < 1
   */
  velocityFunction?: (distance: number, time: number) => number;
  /**
   * Milliseconds after which the cached drag distance resets for velocity.
   * @defaultValue `200`
   */
  velocityCacheReset?: number;
  /**
   * Whether high-velocity drags can skip intermediate snap points.
   * @defaultValue `true`
   */
  allowSkippingSnapPoints?: boolean;
  /**
   * Whether to prevent drawer drag from conflicting with scrollable children.
   * @defaultValue `true`
   */
  handleScrollableElements?: boolean;
}
interface DrawerRootProps extends ParentProps<DrawerRootOptions> {}
/**
 * A panel that slides in from the edge of the screen with drag-to-dismiss
 * and snap-point support. All `Dialog.Root` props are also accepted.
 *
 * **Credit:** Snap-point architecture and drag math are adapted from
 * [corvu/drawer](https://github.com/corvudev/corvu/tree/main/packages/drawer)
 * by Jasmin Noetzli (MIT).
 */
declare function DrawerRoot(props: DrawerRootProps): import("@solidjs/web").JSX.Element;
declare namespace index_d_exports {
  export { DialogCloseButton as CloseButton, DrawerContent as Content, DialogDescription as Description, Drawer, DialogCloseButtonCommonProps as DrawerCloseButtonCommonProps, DialogCloseButtonOptions as DrawerCloseButtonOptions, DialogCloseButtonProps as DrawerCloseButtonProps, DialogCloseButtonRenderProps as DrawerCloseButtonRenderProps, DrawerContentCommonProps, DrawerContentOptions, DrawerContentProps, DrawerContentRenderProps, DrawerContextValue, DialogDescriptionCommonProps as DrawerDescriptionCommonProps, DialogDescriptionOptions as DrawerDescriptionOptions, DialogDescriptionProps as DrawerDescriptionProps, DialogDescriptionRenderProps as DrawerDescriptionRenderProps, DrawerInternalContextValue, DrawerOverlayCommonProps, DrawerOverlayOptions, DrawerOverlayProps, DrawerOverlayRenderProps, DialogPortalProps as DrawerPortalProps, DrawerRootOptions, DrawerRootProps, DrawerSide, DrawerSize, DialogTitleCommonProps as DrawerTitleCommonProps, DialogTitleOptions as DrawerTitleOptions, DialogTitleProps as DrawerTitleProps, DialogTitleRenderProps as DrawerTitleRenderProps, DrawerTransitionState, DialogTriggerCommonProps as DrawerTriggerCommonProps, DialogTriggerOptions as DrawerTriggerOptions, DialogTriggerProps as DrawerTriggerProps, DialogTriggerRenderProps as DrawerTriggerRenderProps, DrawerOverlay as Overlay, DialogPortal as Portal, DrawerRoot as Root, DialogTitle as Title, DialogTrigger as Trigger, useDrawerContext as useContext };
}
declare const Drawer: typeof DrawerRoot & {
  CloseButton: typeof DialogCloseButton;
  Content: typeof DrawerContent;
  Description: typeof DialogDescription;
  Overlay: typeof DrawerOverlay;
  Portal: typeof DialogPortal;
  Title: typeof DialogTitle;
  Trigger: typeof DialogTrigger;
  useContext: typeof useDrawerContext;
};
//#endregion
export { DrawerContentOptions as _, DrawerRootProps as a, DrawerSide as b, DrawerOverlayOptions as c, DrawerContextValue as d, DrawerInternalContextValue as f, DrawerContentCommonProps as g, DrawerContent as h, DrawerRootOptions as i, DrawerOverlayProps as l, useDrawerContext as m, index_d_exports as n, DrawerOverlay as o, DrawerTransitionState as p, DrawerRoot as r, DrawerOverlayCommonProps as s, Drawer as t, DrawerOverlayRenderProps as u, DrawerContentProps as v, DrawerSize as x, DrawerContentRenderProps as y };