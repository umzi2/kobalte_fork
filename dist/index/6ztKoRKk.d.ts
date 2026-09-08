import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor } from "solid-js";
//#region src/meter/meter-context.d.ts
interface MeterDataSet {}
interface MeterContextValue {
  dataset: Accessor<MeterDataSet>;
  value: Accessor<number>;
  valuePercent: Accessor<number>;
  valueLabel: Accessor<string | undefined>;
  meterFillWidth: Accessor<string | undefined>;
  labelId: Accessor<string | undefined>;
  generateId: (part: string) => string;
  registerLabelId: (id: string) => () => void;
}
declare function useMeterContext(): MeterContextValue;
//#endregion
//#region src/meter/meter-fill.d.ts
interface MeterFillOptions {}
interface MeterFillCommonProps<_T extends HTMLElement = HTMLElement> {
  style?: JSX$1.CSSProperties | string;
}
interface MeterFillRenderProps extends MeterFillCommonProps, MeterDataSet {}
type MeterFillProps<T extends ValidComponent | HTMLElement = HTMLElement> = MeterFillOptions & Partial<MeterFillCommonProps<ElementOf<T>>>;
/**
 * The component that visually represents the meter value.
 * Used to visually show the fill of `Meter.Track`.
 */
declare function MeterFill<T extends ValidComponent = "div">(props: PolymorphicProps<T, MeterFillProps<T>>): JSX$1.Element;
//#endregion
//#region src/meter/meter-label.d.ts
interface MeterLabelOptions {}
interface MeterLabelCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface MeterLabelRenderProps extends MeterLabelCommonProps, MeterDataSet {}
type MeterLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = MeterLabelOptions & Partial<MeterLabelCommonProps<ElementOf<T>>>;
/**
 * An accessible label that gives the user information on the meter.
 */
declare function MeterLabel<T extends ValidComponent = "span">(props: PolymorphicProps<T, MeterLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/meter/meter-root.d.ts
interface GetValueLabelParams {
  value: number;
  min: number;
  max: number;
}
interface MeterRootOptions {
  /**
   * The meter value.
   * @default 0
   */
  value?: number;
  /**
   * The minimum meter value.
   * @default 0
   */
  minValue?: number;
  /**
   * The maximum meter value.
   * @default 100
   */
  maxValue?: number;
  /**
   * A function to get the accessible label text representing the current value in a human-readable format.
   * If not provided, the value label will be read as a percentage of the max value.
   */
  getValueLabel?: (params: GetValueLabelParams) => string;
}
interface MeterRootCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
  role: string;
  "aria-valuenow": number | undefined;
  "aria-valuemin": number;
  "aria-valuemax": number;
  "aria-valuetext": string | undefined;
  "aria-labelledby": string | undefined;
}
interface MeterRootRenderProps extends MeterRootCommonProps, MeterDataSet {}
type MeterRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = MeterRootOptions & Partial<MeterRootCommonProps<ElementOf<T>>>;
/**
 * Meter displays numeric value that varies within a defined range.
 */
declare function MeterRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, MeterRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/meter/meter-track.d.ts
interface MeterTrackOptions {}
interface MeterTrackCommonProps<_T extends HTMLElement = HTMLElement> {}
interface MeterTrackRenderProps extends MeterTrackCommonProps, MeterDataSet {}
type MeterTrackProps<T extends ValidComponent | HTMLElement = HTMLElement> = MeterTrackOptions & Partial<MeterTrackCommonProps<ElementOf<T>>>;
/**
 * The component that visually represents the meter track.
 * Act as a container for `Meter.Fill`.
 */
declare function MeterTrack<T extends ValidComponent = "div">(props: PolymorphicProps<T, MeterTrackProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/meter/meter-value-label.d.ts
interface MeterValueLabelOptions {}
interface MeterValueLabelCommonProps<_T extends HTMLElement = HTMLElement> {}
interface MeterValueLabelRenderProps extends MeterValueLabelCommonProps, MeterDataSet {
  children: JSX$1.Element;
}
type MeterValueLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = MeterValueLabelOptions & Partial<MeterValueLabelCommonProps<ElementOf<T>>>;
/**
 * The accessible label text representing the current value in a human-readable format.
 */
declare function MeterValueLabel<T extends ValidComponent = "div">(props: PolymorphicProps<T, MeterValueLabelProps<T>>): JSX$1.Element;
//#endregion
//#region src/meter/index.d.ts
declare const Meter: typeof MeterRoot & {
  Fill: typeof MeterFill;
  Label: typeof MeterLabel;
  Track: typeof MeterTrack;
  ValueLabel: typeof MeterValueLabel;
};
//#endregion
export { MeterFillCommonProps as C, MeterContextValue as D, MeterFillRenderProps as E, MeterDataSet as O, MeterFill as S, MeterFillProps as T, MeterLabel as _, MeterValueLabelProps as a, MeterLabelProps as b, MeterTrackCommonProps as c, MeterTrackRenderProps as d, MeterRoot as f, MeterRootRenderProps as g, MeterRootProps as h, MeterValueLabelOptions as i, useMeterContext as k, MeterTrackOptions as l, MeterRootOptions as m, MeterValueLabel as n, MeterValueLabelRenderProps as o, MeterRootCommonProps as p, MeterValueLabelCommonProps as r, MeterTrack as s, Meter as t, MeterTrackProps as u, MeterLabelCommonProps as v, MeterFillOptions as w, MeterLabelRenderProps as x, MeterLabelOptions as y };