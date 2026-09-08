import { JSX } from "@solidjs/web";
//#region src/events.d.ts
/** Call a JSX.EventHandlerUnion with the event. */
declare function callHandler<T, E extends Event>(event: E & {
  currentTarget: T;
  target: Element;
}, handler: JSX.EventHandlerUnion<T, E> | undefined): boolean;
/** Create a new event handler which calls all given handlers in the order they were chained with the same event. */
declare function composeEventHandlers<T>(handlers: Array<JSX.EventHandlerUnion<T, any> | undefined>): (event: any) => void;
//#endregion
//#region src/get-scroll-parent.d.ts
declare function getScrollParent(node: Element | null): Element;
//#endregion
//#region src/number.d.ts
/**
 * Takes a value and forces it to the closest min/max if it's outside. Also forces it to the closest valid step.
 */
declare function clamp(value: number, min?: number, max?: number): number;
declare function roundToStepPrecision(value: number, step: number): number;
/** Number of decimals needed to represent the step. */
declare function getPrecision(step: number): number;
declare function snapValueToStep(value: number, min: number | undefined, max: number | undefined, step: number): number;
//#endregion
//#region src/polygon.d.ts
type Point = [number, number];
type Polygon = Point[];
declare function isPointInPolygon(point: Point, polygon: Polygon): boolean;
declare function debugPolygon(polygon: Polygon): HTMLElement | null;
//#endregion
//#region src/styles.d.ts
declare const visuallyHiddenStyles: JSX.CSSProperties;
//#endregion
//#region src/types.d.ts
type ValidationState = "valid" | "invalid";
type Orientation = "horizontal" | "vertical";
interface RangeValue<T> {
  /** The start value of the range. */
  start: T;
  /** The end value of the range. */
  end: T;
}
//#endregion
export { Orientation, Point, Polygon, RangeValue, ValidationState, callHandler, clamp, composeEventHandlers, debugPolygon, getPrecision, getScrollParent, isPointInPolygon, roundToStepPrecision, snapValueToStep, visuallyHiddenStyles };
//# sourceMappingURL=index.d.cts.map