import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import "./DzCl6ca-.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, ParentProps, Ref } from "solid-js";
//#region src/popper/utils.d.ts
type BasePlacement = "top" | "bottom" | "left" | "right";
type Placement = BasePlacement | `${BasePlacement}-start` | `${BasePlacement}-end`;
type AnchorRect = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};
//#endregion
//#region src/popper/popper-context.d.ts
interface PopperContextValue {
  currentPlacement: Accessor<Placement>;
  contentRef: Accessor<HTMLElement | undefined>;
  setPositionerRef: (el: HTMLElement) => void;
  setArrowRef: (el: HTMLElement) => void;
}
declare const PopperContext: import("solid-js").Context<PopperContextValue>;
declare function usePopperContext(): PopperContextValue;
//#endregion
//#region src/popper/popper-arrow.d.ts
interface PopperArrowOptions {
  /** The size of the arrow. */
  size?: number;
}
interface PopperArrowCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  style?: JSX$1.CSSProperties | string;
}
interface PopperArrowRenderProps extends PopperArrowCommonProps {
  children: JSX$1.Element;
  "aria-hidden": "true";
}
type PopperArrowProps<T extends ValidComponent | HTMLElement = HTMLElement> = PopperArrowOptions & Partial<PopperArrowCommonProps<ElementOf<T>>>;
/**
 * An optional arrow element to render alongside the popper content.
 * Must be rendered in the popper content.
 */
declare function PopperArrow<T extends ValidComponent = "div">(props: PolymorphicProps<T, PopperArrowProps<T>>): JSX$1.Element;
//#endregion
//#region src/popper/popper-positioner.d.ts
interface PopperPositionerOptions {}
interface PopperPositionerCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  style?: JSX$1.CSSProperties | string;
}
interface PopperPositionerRenderProps extends PopperPositionerCommonProps {
  "data-popper-positioner": "";
}
type PopperPositionerProps<T extends ValidComponent | HTMLElement = HTMLElement> = PopperPositionerOptions & Partial<PopperPositionerCommonProps<ElementOf<T>>>;
/**
 * The wrapper component that positions the popper content relative to the popper anchor.
 */
declare function PopperPositioner<T extends ValidComponent = "div">(props: PolymorphicProps<T, PopperPositionerProps<T>>): JSX$1.Element;
//#endregion
//#region src/popper/popper-root.d.ts
interface PopperRootOptions {
  /** A ref for the anchor element. */
  anchorRef: Accessor<HTMLElement | undefined>;
  /** A ref for the content element. */
  contentRef: Accessor<HTMLElement | undefined>;
  /**
   * Function that returns the anchor element's DOMRect. If this is explicitly
   * passed, it will override the anchor `getBoundingClientRect` method.
   */
  getAnchorRect?: (anchor?: HTMLElement) => AnchorRect | undefined;
  /**
   * Event handler called when the popper placement changes.
   * It returns the current temporary placement of the popper.
   * This may be different from the `placement` prop if the popper has needed to update its position on the fly.
   */
  onCurrentPlacementChange?: (currentPlacement: Placement) => void;
  /** The placement of the popper. */
  placement?: Placement;
  /**
   * The distance between the popper and the anchor element.
   * By default, it's 0 plus half of the arrow offset, if it exists.
   */
  gutter?: number;
  /** The skidding of the popper along the anchor element. */
  shift?: number;
  /**
   * Controls the behavior of the popper when it overflows the viewport:
   *   - If a `boolean`, specifies whether the popper should flip to the
   *     opposite side when it overflows.
   *   - If a `string`, indicates the preferred fallback placements when it
   *     overflows. The placements must be spaced-delimited, e.g. "top left".
   */
  flip?: boolean | string;
  /** Whether the popper should slide when it overflows. */
  slide?: boolean;
  /** Whether the popper can overlap the anchor element when it overflows. */
  overlap?: boolean;
  /**
   * Whether the popper should have the same width as the anchor element.
   * This will be exposed to CSS as `--kb-popper-anchor-width`.
   */
  sameWidth?: boolean;
  /**
   * Whether the popper should fit the viewport. If this is set to true, the
   * popper positioner will have `maxWidth` and `maxHeight` set to the viewport size.
   * This will be exposed to CSS as `--kb-popper-content-available-width` and `--kb-popper-content-available-height`.
   */
  fitViewport?: boolean;
  /** Whether to hide the popper when the anchor element becomes occluded. */
  hideWhenDetached?: boolean;
  /** The minimum padding in order to consider the anchor element occluded. */
  detachedPadding?: number;
  /** The minimum padding between the arrow and the popper corner. */
  arrowPadding?: number;
  /**
   * The minimum padding between the popper and the viewport edge.
   * This will be exposed to CSS as `--kb-popper-content-overflow-padding`.
   */
  overflowPadding?: number;
}
interface PopperRootProps extends ParentProps<PopperRootOptions> {}
/**
 * Display a floating content relative to an anchor element with an optional arrow.
 */
declare function PopperRoot(props: PopperRootProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/popper/index.d.ts
declare const Popper: typeof PopperRoot & {
  Arrow: typeof PopperArrow;
  Context: import("solid-js").Context<PopperContextValue>;
  usePopperContext: typeof usePopperContext;
  Positioner: typeof PopperPositioner;
};
//#endregion
export { usePopperContext as _, PopperPositioner as a, PopperPositionerProps as c, PopperArrowCommonProps as d, PopperArrowOptions as f, PopperContextValue as g, PopperContext as h, PopperRootProps as i, PopperPositionerRenderProps as l, PopperArrowRenderProps as m, PopperRoot as n, PopperPositionerCommonProps as o, PopperArrowProps as p, PopperRootOptions as r, PopperPositionerOptions as s, Popper as t, PopperArrow as u, Placement as v };