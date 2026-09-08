import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { ParentProps } from "solid-js";
//#region src/statistic/statistic-description.d.ts
interface StatisticDescriptionOptions {}
interface StatisticDescriptionCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface StatisticDescriptionRenderProps extends StatisticDescriptionCommonProps {}
type StatisticDescriptionProps<T extends ValidComponent | HTMLElement = HTMLElement> = StatisticDescriptionOptions & Partial<StatisticDescriptionCommonProps<ElementOf<T>>>;
/**
 * Optional supplementary text for the statistic (e.g. a breakdown like
 * "12 high, 28 low"), wired to `Statistic.Root` via `aria-describedby`.
 */
declare function StatisticDescription<T extends ValidComponent = "span">(props: PolymorphicProps<T, StatisticDescriptionProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/statistic/statistic-label.d.ts
interface StatisticLabelOptions {}
interface StatisticLabelCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface StatisticLabelRenderProps extends StatisticLabelCommonProps {}
type StatisticLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = StatisticLabelOptions & Partial<StatisticLabelCommonProps<ElementOf<T>>>;
/**
 * An accessible label describing the statistic, wired to `Statistic.Root`
 * via `aria-labelledby`.
 */
declare function StatisticLabel<T extends ValidComponent = "span">(props: PolymorphicProps<T, StatisticLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/statistic/statistic-root.d.ts
interface StatisticRootOptions {
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
}
interface StatisticRootCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface StatisticRootRenderProps extends StatisticRootCommonProps {
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
}
type StatisticRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = StatisticRootOptions & Partial<StatisticRootCommonProps<ElementOf<T>>>;
/**
 * Displays a labeled numeric value, such as a KPI or dashboard metric.
 */
declare function StatisticRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, StatisticRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/statistic/statistic.intl.d.ts
declare const STATISTIC_INTL_TRANSLATIONS: {
  increase: string;
  decrease: string;
  noChange: string;
};
type StatisticIntlTranslations = typeof STATISTIC_INTL_TRANSLATIONS;
//#endregion
//#region src/statistic/statistic-trend.d.ts
interface StatisticTrendOptions {
  /**
   * The signed change represented by the trend, e.g. `0.025` for a 2.5%
   * increase or `-0.025` for a 2.5% decrease. Its sign drives both
   * `data-direction` and the generated accessible text.
   */
  value: number;
  /**
   * Options for formatting the absolute value of `value`.
   * @default { style: "percent" }
   */
  formatOptions?: Intl.NumberFormatOptions;
  /** The localized strings of the component. */
  translations?: StatisticIntlTranslations;
}
interface StatisticTrendCommonProps<_T extends HTMLElement = HTMLElement> {}
interface StatisticTrendRenderProps extends StatisticTrendCommonProps {
  "data-direction": "increase" | "decrease" | "noChange";
  children: JSX$1.Element;
}
type StatisticTrendProps<T extends ValidComponent | HTMLElement = HTMLElement> = ParentProps<StatisticTrendOptions> & Partial<StatisticTrendCommonProps<ElementOf<T>>>;
/**
 * Indicates the direction and magnitude of change for a `Statistic.Value`.
 *
 * Ships no icon or color — pass your own arrow/color as `children`, which
 * is treated as decorative (`aria-hidden`). An accessible sentence (e.g.
 * "increased by 2.5%") is generated from `value` and rendered as
 * visually-hidden text, so the accessible name doesn't depend on color or
 * icon shape alone.
 */
declare function StatisticTrend<T extends ValidComponent = "div">(props: PolymorphicProps<T, StatisticTrendProps<T>>): JSX$1.Element;
//#endregion
//#region src/statistic/statistic-value.d.ts
interface StatisticValueOptions {
  /** The numeric value to display, formatted for the current locale. */
  value?: number;
  /**
   * Options for formatting `value`.
   * @default {}
   */
  formatOptions?: Intl.NumberFormatOptions;
}
interface StatisticValueCommonProps<_T extends HTMLElement = HTMLElement> {
  "aria-live": "polite";
  "aria-atomic": "true";
}
interface StatisticValueRenderProps extends StatisticValueCommonProps {
  children: JSX$1.Element;
}
type StatisticValueProps<T extends ValidComponent | HTMLElement = HTMLElement> = ParentProps<StatisticValueOptions> & Partial<StatisticValueCommonProps<ElementOf<T>>>;
/**
 * The statistic's value. Rendered as a `polite` live region so updates
 * (e.g. a value refreshed from a real-time data source) are announced to
 * screen reader users without stealing focus.
 *
 * Formats `value` for the current locale via `formatOptions`. Pass
 * children directly instead when the value can't be expressed as an
 * `Intl.NumberFormat` (e.g. a custom unit) — children take precedence.
 */
declare function StatisticValue<T extends ValidComponent = "div">(props: PolymorphicProps<T, StatisticValueProps<T>>): JSX$1.Element;
//#endregion
//#region src/statistic/statistic-context.d.ts
interface StatisticContextValue {
  generateId: (part: string) => string;
  registerLabelId: (id: string) => () => void;
  registerDescriptionId: (id: string) => () => void;
}
declare function useStatisticContext(): StatisticContextValue;
declare namespace index_d_exports {
  export { StatisticDescription as Description, StatisticLabel as Label, StatisticRoot as Root, STATISTIC_INTL_TRANSLATIONS, Statistic, StatisticContextValue, StatisticDescriptionCommonProps, StatisticDescriptionOptions, StatisticDescriptionProps, StatisticDescriptionRenderProps, StatisticIntlTranslations, StatisticLabelCommonProps, StatisticLabelOptions, StatisticLabelProps, StatisticLabelRenderProps, StatisticRootCommonProps, StatisticRootOptions, StatisticRootProps, StatisticRootRenderProps, StatisticTrendCommonProps, StatisticTrendOptions, StatisticTrendProps, StatisticTrendRenderProps, StatisticValueCommonProps, StatisticValueOptions, StatisticValueProps, StatisticValueRenderProps, StatisticTrend as Trend, StatisticValue as Value, useStatisticContext };
}
declare const Statistic: typeof StatisticRoot & {
  Description: typeof StatisticDescription;
  Label: typeof StatisticLabel;
  Trend: typeof StatisticTrend;
  Value: typeof StatisticValue;
};
//#endregion
export { StatisticDescriptionProps as A, StatisticLabelCommonProps as C, StatisticDescription as D, StatisticLabelRenderProps as E, StatisticDescriptionCommonProps as O, StatisticLabel as S, StatisticLabelProps as T, StatisticRoot as _, StatisticValue as a, StatisticRootProps as b, StatisticValueProps as c, StatisticTrendCommonProps as d, StatisticTrendOptions as f, StatisticIntlTranslations as g, STATISTIC_INTL_TRANSLATIONS as h, useStatisticContext as i, StatisticDescriptionRenderProps as j, StatisticDescriptionOptions as k, StatisticValueRenderProps as l, StatisticTrendRenderProps as m, index_d_exports as n, StatisticValueCommonProps as o, StatisticTrendProps as p, StatisticContextValue as r, StatisticValueOptions as s, Statistic as t, StatisticTrend as u, StatisticRootCommonProps as v, StatisticLabelOptions as w, StatisticRootRenderProps as x, StatisticRootOptions as y };