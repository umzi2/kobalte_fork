import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { s as ButtonRootRenderProps } from "./Bjp2qtUK.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Component, Ref } from "solid-js";
//#region src/toast/types.d.ts
type ToastSwipeDirection = "up" | "down" | "left" | "right";
type ToastPromiseState = "pending" | "fulfilled" | "rejected";
interface ToastComponentProps {
  /** A unique id for the toast. */
  toastId: number;
}
type ToastComponent = Component<ToastComponentProps>;
interface ToastPromiseComponentProps<T, U = any> extends ToastComponentProps {
  /** The state of the promise. */
  state: ToastPromiseState;
  /** The resolved data of the promise when fulfilled. */
  data?: T;
  /** The error of the promise when rejected. */
  error?: U;
}
type ToastPromiseComponent<T, U = any> = Component<ToastPromiseComponentProps<T, U>>;
interface ToastConfig {
  /** The unique id of the toast. */
  id: number;
  /** Whether the toast should be marked for dismiss. */
  dismiss: boolean;
  /** Whether the toast should be marked as an update. */
  update: boolean;
  /** The toast component to render. */
  toastComponent: ToastComponent;
  /** The id of the `<Toast.Region/>` to display the toast in. */
  region?: string;
}
interface ShowToastOptions extends Pick<ToastConfig, "region"> {}
//#endregion
//#region src/toast/toast-close-button.d.ts
interface ToastCloseButtonOptions {}
interface ToastCloseButtonCommonProps<T extends HTMLElement = HTMLElement> {
  "aria-label": string;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
}
interface ToastCloseButtonRenderProps extends ToastCloseButtonCommonProps, ButtonRootRenderProps {}
type ToastCloseButtonProps<T extends ValidComponent | HTMLElement = HTMLElement> = ToastCloseButtonOptions & Partial<ToastCloseButtonCommonProps<ElementOf<T>>>;
/**
 * The button that closes the toast.
 */
declare function ToastCloseButton<T extends ValidComponent = "button">(props: PolymorphicProps<T, ToastCloseButtonProps<T>>): JSX$1.Element;
//#endregion
//#region src/toast/toast-description.d.ts
interface ToastDescriptionOptions {}
interface ToastDescriptionCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface ToastDescriptionRenderProps extends ToastDescriptionCommonProps {}
type ToastDescriptionProps<T extends ValidComponent | HTMLElement = HTMLElement> = ToastDescriptionOptions & Partial<ToastDescriptionCommonProps<ElementOf<T>>>;
/**
 * An optional accessible description to be announced when the toast is open.
 */
declare function ToastDescription<T extends ValidComponent = "div">(props: PolymorphicProps<T, ToastDescriptionProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/toast/toast-list.d.ts
interface ToastListOptions {}
interface ToastListCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  onFocusIn: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onFocusOut: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onPointerMove: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerLeave: JSX$1.EventHandlerUnion<T, PointerEvent>;
}
interface ToastListRenderProps extends ToastListCommonProps {
  children: JSX$1.Element;
  tabindex: -1;
}
type ToastListProps<T extends ValidComponent | HTMLElement = HTMLElement> = ToastListOptions & Partial<ToastListCommonProps<ElementOf<T>>>;
/**
 * The list containing all rendered toasts.
 * Must be inside a `Toast.Region`.
 */
declare function ToastList<T extends ValidComponent = "ol">(props: PolymorphicProps<T, ToastListProps<T>>): JSX$1.Element;
//#endregion
//#region src/toast/toast-progress-fill.d.ts
interface ToastProgressFillOptions {}
interface ToastProgressFillCommonProps<_T extends HTMLElement = HTMLElement> {
  style?: JSX$1.CSSProperties | string;
}
interface ToastProgressFillRenderProps extends ToastProgressFillCommonProps {}
type ToastProgressFillProps<T extends ValidComponent | HTMLElement = HTMLElement> = ToastProgressFillOptions & Partial<ToastProgressFillCommonProps<ElementOf<T>>>;
/**
 * The component that visually represents the toast remaining lifetime.
 * Used to visually show the fill of `Toast.ProgressTrack`.
 */
declare function ToastProgressFill<T extends ValidComponent = "div">(props: PolymorphicProps<T, ToastProgressFillProps<T>>): JSX$1.Element;
//#endregion
//#region src/toast/toast-progress-track.d.ts
interface ToastProgressTrackOptions {}
interface ToastProgressTrackCommonProps<_T extends HTMLElement = HTMLElement> {}
interface ToastProgressTrackRenderProps extends ToastProgressTrackCommonProps {
  "aria-hidden": "true";
  role: "presentation";
}
type ToastProgressTrackProps<T extends ValidComponent | HTMLElement = HTMLElement> = ToastProgressTrackOptions & Partial<ToastProgressTrackCommonProps<ElementOf<T>>>;
/**
 * The component that visually represents the toast lifetime.
 * Act as a container for `Toast.ProgressFill`.
 */
declare function ToastProgressTrack<T extends ValidComponent = "div">(props: PolymorphicProps<T, ToastProgressTrackProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/toast/toast.intl.d.ts
declare const TOAST_INTL_TRANSLATIONS: {
  close: string;
};
type ToastIntlTranslations = typeof TOAST_INTL_TRANSLATIONS;
declare const TOAST_REGION_INTL_TRANSLATIONS: {
  notifications: (hotkeyPlaceholder: string) => string;
};
type ToastRegionIntlTranslations = typeof TOAST_REGION_INTL_TRANSLATIONS;
//#endregion
//#region src/toast/toast-region.d.ts
interface ToastRegionOptions {
  /** The localized strings of the component. */
  translations?: ToastRegionIntlTranslations;
  /**
   * A label for the toast region to provide context for screen reader users when navigating page landmarks.
   * Can contain a `{hotkey}` placeholder which will be replaced for you.
   * @default "Notifications ({hotkey})"
   */
  "aria-label"?: string;
  /**
   * The keys to use as the keyboard shortcut that will move focus to the toast region.
   * Use `event.code` value for each key from [keycode.info](https://www.toptal.com/developers/keycode).
   * For meta keys, use `ctrlKey`, `shiftKey`, `altKey` and/or `metaKey`.
   * @default alt + T
   */
  hotkey?: string[];
  /** The time in milliseconds that should elapse before automatically closing each toast. */
  duration?: number;
  /** The maximum amount of toasts that can be displayed at the same time. */
  limit?: number;
  /** The direction of the pointer swipe that should close the toast. */
  swipeDirection?: ToastSwipeDirection;
  /** The distance in pixels that the swipe gesture must travel before a close is triggered. */
  swipeThreshold?: number;
  /** Whether the toasts close timeout should pause when a toast is hovered or focused. */
  pauseOnInteraction?: boolean;
  /**
   * Whether the toasts close timeout should pause when the document loses focus or the page is idle
   * (e.g. switching to a new browser tab).
   */
  pauseOnPageIdle?: boolean;
  /**
   * Whether the toast region is marked as a "top layer", so that it:
   *  - is not aria-hidden when opening an overlay.
   *  - allows focus even outside a containing focus scope.
   *  - doesn’t dismiss overlays when clicking on it, even though it is outside.
   */
  topLayer?: boolean;
  /** The id of the toast region, used for multiple toast regions. */
  regionId?: string;
}
interface ToastRegionCommonProps<_T extends HTMLElement = HTMLElement> {
  style?: JSX$1.CSSProperties | string;
  id: string;
}
interface ToastRegionRenderProps extends ToastRegionCommonProps {
  role: "region";
  tabindex: -1;
  "aria-label": string;
  "data-kb-top-layer": string | undefined;
}
type ToastRegionProps<T extends ValidComponent | HTMLElement = HTMLElement> = ToastRegionOptions & Partial<ToastRegionCommonProps<ElementOf<T>>>;
/**
 * The fixed area where toasts appear. Users can jump to by pressing a hotkey.
 * It is up to you to ensure the discoverability of the hotkey for keyboard users.
 */
declare function ToastRegion<T extends ValidComponent = "div">(props: PolymorphicProps<T, ToastRegionProps<T>>): JSX$1.Element;
//#endregion
//#region src/toast/toast-root.d.ts
type SwipeEvent = {
  currentTarget: EventTarget & HTMLLIElement;
} & Omit<CustomEvent<{
  originalEvent: PointerEvent;
  delta: {
    x: number;
    y: number;
  };
}>, "currentTarget">;
interface ToastRootOptions {
  /** The localized strings of the component. */
  translations?: ToastIntlTranslations;
  /** The id of the toast provided by the `toaster`. */
  toastId: number;
  /**
   * Control the sensitivity of the toast for accessibility purposes.
   * For toasts that are the result of a user action, choose `high`.
   * Toasts generated from background tasks should use `low`.
   */
  priority?: "high" | "low";
  /**
   * The time in milliseconds that should elapse before automatically closing the toast.
   * This will override the value supplied to `Toast.Region`.
   */
  duration?: number;
  /** Whether the toast should ignore duration and disappear only by a user action. */
  persistent?: boolean;
  /**
   * Event handler called when the dismiss timer is paused.
   * This occurs when the pointer is moved over the region or the region is focused.
   */
  onPause?: () => void;
  /**
   * Event handler called when the dismiss timer is resumed.
   * This occurs when the pointer is moved away from the region or the region is blurred.
   */
  onResume?: () => void;
  /** Event handler called when starting a swipe interaction. */
  onSwipeStart?: (event: SwipeEvent) => void;
  /** Event handler called during a swipe interaction. */
  onSwipeMove?: (event: SwipeEvent) => void;
  /** Event handler called when a swipe interaction is cancelled. */
  onSwipeCancel?: (event: SwipeEvent) => void;
  /** Event handler called at the end of a swipe interaction. */
  onSwipeEnd?: (event: SwipeEvent) => void;
  /**
   * Event handler called when the escape key is down.
   * It can be prevented by calling `event.preventDefault`.
   */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
}
interface ToastRootCommonProps<T extends HTMLElement = HTMLElement> {
  style?: JSX$1.CSSProperties | string;
  id: string;
  ref: Ref<T>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerMove: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerUp: JSX$1.EventHandlerUnion<T, PointerEvent>;
}
interface ToastRootRenderProps extends ToastRootCommonProps {
  role: "status";
  tabindex: 0;
}
type ToastRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ToastRootOptions & Partial<ToastRootCommonProps<ElementOf<T>>>;
declare function ToastRoot<T extends ValidComponent = "li">(props: PolymorphicProps<T, ToastRootProps<T>>): JSX$1.Element;
//#endregion
//#region src/toast/toast-title.d.ts
interface ToastTitleOptions {}
interface ToastTitleCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface ToastTitleRenderProps extends ToastTitleCommonProps {}
type ToastTitleProps<T extends ValidComponent | HTMLElement = HTMLElement> = ToastTitleOptions & Partial<ToastTitleCommonProps<ElementOf<T>>>;
/**
 * An accessible title to be announced when the toast is open.
 */
declare function ToastTitle<T extends ValidComponent = "div">(props: PolymorphicProps<T, ToastTitleProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/toast/toaster.d.ts
/** Adds a new toast to the visible toasts or queue depending on current state and limit, and return the id of the created toast. */
declare function show(toastComponent: ToastComponent, options?: ShowToastOptions): number;
/** Update the toast of the given id with a new rendered component. */
declare function update(id: number, toastComponent: ToastComponent): void;
/** Adds a new promise-based toast to the visible toasts or queue depending on current state and limit, and return the id of the created toast. */
declare function promise<T, U = any>(promise: Promise<T> | (() => Promise<T>), toastComponent: ToastPromiseComponent<T, U>, options?: ShowToastOptions): number;
/** Removes toast with given id from visible toasts and queue. */
declare function dismiss(id: number): number;
/** Removes all toasts from visible toasts and queue. */
declare function clear(): void;
declare const toaster: {
  show: typeof show;
  update: typeof update;
  promise: typeof promise;
  dismiss: typeof dismiss;
  clear: typeof clear;
};
//#endregion
//#region src/toast/toast-context.d.ts
interface ToastContextValue {
  translations: Accessor<ToastIntlTranslations>;
  close: () => void;
  duration: Accessor<number>;
  isPersistent: Accessor<boolean>;
  closeTimerStartTime: Accessor<number>;
  generateId: (part: string) => string;
  registerTitleId: (id: string) => () => void;
  registerDescriptionId: (id: string) => () => void;
}
declare function useToastContext(): ToastContextValue;
declare namespace index_d_exports {
  export { ToastCloseButton as CloseButton, ToastDescription as Description, ToastList as List, ToastProgressFill as ProgressFill, ToastProgressTrack as ProgressTrack, ToastRegion as Region, ToastRoot as Root, ToastTitle as Title, Toast, ToastCloseButtonCommonProps, ToastCloseButtonOptions, ToastCloseButtonProps, ToastCloseButtonRenderProps, ToastComponent, ToastComponentProps, ToastContextValue, ToastDescriptionCommonProps, ToastDescriptionOptions, ToastDescriptionProps, ToastDescriptionRenderProps, ToastListCommonProps, ToastListOptions, ToastListProps, ToastListRenderProps, ToastProgressFillCommonProps, ToastProgressFillOptions, ToastProgressFillProps, ToastProgressFillRenderProps, ToastProgressTrackCommonProps, ToastProgressTrackOptions, ToastProgressTrackProps, ToastProgressTrackRenderProps, ToastPromiseComponent, ToastPromiseComponentProps, ToastPromiseState, ToastRegionCommonProps, ToastRegionOptions, ToastRegionProps, ToastRegionRenderProps, ToastRootCommonProps, ToastRootOptions, ToastRootProps, ToastRootRenderProps, ToastSwipeDirection, ToastTitleCommonProps, ToastTitleOptions, ToastTitleProps, ToastTitleRenderProps, toaster, useToastContext };
}
declare const Toast: typeof ToastRoot & {
  CloseButton: typeof ToastCloseButton;
  Description: typeof ToastDescription;
  List: typeof ToastList;
  ProgressFill: typeof ToastProgressFill;
  ProgressTrack: typeof ToastProgressTrack;
  Region: typeof ToastRegion;
  Title: typeof ToastTitle;
  toaster: {
    show: (toastComponent: ToastComponent, options?: ShowToastOptions) => number;
    update: (id: number, toastComponent: ToastComponent) => void;
    promise: <T, U = any>(promise: Promise<T> | (() => Promise<T>), toastComponent: ToastPromiseComponent<T, U>, options?: ShowToastOptions) => number;
    dismiss: (id: number) => number;
    clear: () => void;
  };
};
//#endregion
export { ToastProgressFillRenderProps as A, ToastDescriptionRenderProps as B, ToastProgressTrackOptions as C, ToastProgressFillCommonProps as D, ToastProgressFill as E, ToastListRenderProps as F, ToastCloseButtonRenderProps as G, ToastCloseButtonCommonProps as H, ToastDescription as I, ToastPromiseComponent as J, ToastComponent as K, ToastDescriptionCommonProps as L, ToastListCommonProps as M, ToastListOptions as N, ToastProgressFillOptions as O, ToastListProps as P, ToastDescriptionOptions as R, ToastProgressTrackCommonProps as S, ToastProgressTrackRenderProps as T, ToastCloseButtonOptions as U, ToastCloseButton as V, ToastCloseButtonProps as W, ToastPromiseState as X, ToastPromiseComponentProps as Y, ToastSwipeDirection as Z, ToastRegionCommonProps as _, toaster as a, ToastRegionRenderProps as b, ToastTitleOptions as c, ToastRoot as d, ToastRootCommonProps as f, ToastRegion as g, ToastRootRenderProps as h, useToastContext as i, ToastList as j, ToastProgressFillProps as k, ToastTitleProps as l, ToastRootProps as m, index_d_exports as n, ToastTitle as o, ToastRootOptions as p, ToastComponentProps as q, ToastContextValue as r, ToastTitleCommonProps as s, Toast as t, ToastTitleRenderProps as u, ToastRegionOptions as v, ToastProgressTrackProps as w, ToastProgressTrack as x, ToastRegionProps as y, ToastDescriptionProps as z };