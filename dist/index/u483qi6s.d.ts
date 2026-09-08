import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { C as MeterFillCommonProps, D as MeterContextValue, E as MeterFillRenderProps, O as MeterDataSet, c as MeterTrackCommonProps, d as MeterTrackRenderProps, g as MeterRootRenderProps, i as MeterValueLabelOptions, l as MeterTrackOptions, m as MeterRootOptions, o as MeterValueLabelRenderProps, p as MeterRootCommonProps, r as MeterValueLabelCommonProps, v as MeterLabelCommonProps, w as MeterFillOptions, x as MeterLabelRenderProps, y as MeterLabelOptions } from "./6ztKoRKk.js";
import { ValidComponent } from "@solidjs/web";
import { Accessor } from "solid-js";
//#region src/progress/progress-context.d.ts
interface ProgressDataSet extends MeterDataSet {
  "data-progress": "loading" | "complete" | undefined;
  "data-indeterminate": string | undefined;
}
interface ProgressContextValue extends Omit<MeterContextValue, "dataset" | "meterFillWidth"> {
  dataset: Accessor<ProgressDataSet>;
  progressFillWidth: Accessor<string | undefined>;
}
declare function useProgressContext(): ProgressContextValue;
//#endregion
//#region src/progress/progress-fill.d.ts
interface ProgressFillOptions extends MeterFillOptions {}
interface ProgressFillCommonProps<_T extends HTMLElement = HTMLElement> extends MeterFillCommonProps {}
interface ProgressFillRenderProps extends ProgressFillCommonProps, ProgressDataSet, MeterFillRenderProps {}
type ProgressFillProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressFillOptions & Partial<ProgressFillCommonProps<ElementOf<T>>>;
/**
 * The component that visually represents the progress value.
 * Used to visually show the fill of `Progress.Track`.
 */
declare function ProgressFill<T extends ValidComponent = "div">(props: PolymorphicProps<T, ProgressFillProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/progress/progress-label.d.ts
interface ProgressLabelOptions extends MeterLabelOptions {}
interface ProgressLabelCommonProps<_T extends HTMLElement = HTMLElement> extends MeterLabelCommonProps {}
interface ProgressLabelRenderProps extends MeterLabelRenderProps, ProgressLabelCommonProps, ProgressDataSet {}
type ProgressLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressLabelOptions & Partial<ProgressLabelCommonProps<ElementOf<T>>>;
/**
 * An accessible label that gives the user information on the progress.
 */
declare function ProgressLabel<T extends ValidComponent = "span">(props: PolymorphicProps<T, ProgressLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/progress/progress-root.d.ts
interface ProgressRootOptions extends Omit<MeterRootOptions, "indeterminate"> {
  /** Whether the progress is in an indeterminate state. */
  indeterminate?: boolean;
}
interface ProgressRootCommonProps<_T extends HTMLElement = HTMLElement> extends MeterRootCommonProps {}
interface ProgressRootRenderProps extends Omit<MeterRootRenderProps, "role">, ProgressRootCommonProps, ProgressDataSet {
  role: "progressbar";
}
type ProgressRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressRootOptions & Partial<ProgressRootCommonProps<ElementOf<T>>>;
/**
 * Progress show either determinate or indeterminate progress of an operation over time.
 */
declare function ProgressRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, ProgressRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/progress/progress-track.d.ts
interface ProgressTrackOptions extends MeterTrackOptions {}
interface ProgressTrackCommonProps<_T extends HTMLElement = HTMLElement> extends MeterTrackCommonProps {}
interface ProgressTrackRenderProps extends MeterTrackRenderProps, ProgressTrackCommonProps, ProgressDataSet {}
type ProgressTrackProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressTrackOptions & Partial<ProgressTrackCommonProps<ElementOf<T>>>;
/**
 * The component that visually represents the progress track.
 * Act as a container for `Progress.Fill`.
 */
declare function ProgressTrack<T extends ValidComponent = "div">(props: PolymorphicProps<T, ProgressTrackProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/progress/progress-value-label.d.ts
interface ProgressValueLabelOptions extends MeterValueLabelOptions {}
interface ProgressValueLabelCommonProps<_T extends HTMLElement = HTMLElement> extends MeterValueLabelCommonProps {}
interface ProgressValueLabelRenderProps extends MeterValueLabelRenderProps, ProgressValueLabelCommonProps, ProgressDataSet {}
type ProgressValueLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = ProgressValueLabelOptions & Partial<ProgressValueLabelCommonProps<ElementOf<T>>>;
/**
 * The accessible label text representing the current value in a human-readable format.
 */
declare function ProgressValueLabel<T extends ValidComponent = "div">(props: PolymorphicProps<T, ProgressValueLabelProps<T>>): import("@solidjs/web").JSX.Element;
declare namespace index_d_exports {
  export { ProgressFill as Fill, ProgressLabel as Label, Progress, ProgressContextValue, ProgressFillCommonProps, ProgressFillOptions, ProgressFillProps, ProgressFillRenderProps, ProgressLabelCommonProps, ProgressLabelOptions, ProgressLabelProps, ProgressLabelRenderProps, ProgressRootCommonProps, ProgressRootOptions, ProgressRootProps, ProgressRootRenderProps, ProgressTrackCommonProps, ProgressTrackOptions, ProgressTrackProps, ProgressTrackRenderProps, ProgressValueLabelCommonProps, ProgressValueLabelOptions, ProgressValueLabelProps, ProgressValueLabelRenderProps, ProgressRoot as Root, ProgressTrack as Track, ProgressValueLabel as ValueLabel, useProgressContext };
}
declare const Progress: typeof ProgressRoot & {
  Fill: typeof ProgressFill;
  Label: typeof ProgressLabel;
  Track: typeof ProgressTrack;
  ValueLabel: typeof ProgressValueLabel;
};
//#endregion
export { ProgressFill as C, ProgressFillRenderProps as D, ProgressFillProps as E, ProgressContextValue as O, ProgressLabelRenderProps as S, ProgressFillOptions as T, ProgressRootRenderProps as _, ProgressValueLabelOptions as a, ProgressLabelOptions as b, ProgressTrack as c, ProgressTrackProps as d, ProgressTrackRenderProps as f, ProgressRootProps as g, ProgressRootOptions as h, ProgressValueLabelCommonProps as i, useProgressContext as k, ProgressTrackCommonProps as l, ProgressRootCommonProps as m, index_d_exports as n, ProgressValueLabelProps as o, ProgressRoot as p, ProgressValueLabel as r, ProgressValueLabelRenderProps as s, Progress as t, ProgressTrackOptions as u, ProgressLabel as v, ProgressFillCommonProps as w, ProgressLabelProps as x, ProgressLabelCommonProps as y };