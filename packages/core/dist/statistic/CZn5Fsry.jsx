import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { Polymorphic } from "../polymorphic/index.jsx";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.jsx";
import { createNumberFormatter } from "../i18n/index.jsx";
import { createContext, createEffect, createSignal, createUniqueId, merge, omit, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { visuallyHiddenStyles } from "@kobalte/utils";
//#region src/statistic/statistic-context.tsx
const StatisticContext = createContext();
function useStatisticContext() {
	const context = useContext(StatisticContext);
	if (context === void 0) throw new Error("[kobalte]: `useStatisticContext` must be used within a `Statistic` component");
	return context;
}
//#endregion
//#region src/statistic/statistic-description.tsx
/**
* Optional supplementary text for the statistic (e.g. a breakdown like
* "12 high, 28 low"), wired to `Statistic.Root` via `aria-describedby`.
*/
function StatisticDescription(props) {
	const context = useStatisticContext();
	const mergedProps = merge({ id: context.generateId("description") }, props);
	const others = omit(mergedProps, "id");
	createEffect(() => mergedProps.id, (id) => context.registerDescriptionId(id));
	return <Polymorphic as="span" id={mergedProps.id} {...others} />;
}
//#endregion
//#region src/statistic/statistic-label.tsx
/**
* An accessible label describing the statistic, wired to `Statistic.Root`
* via `aria-labelledby`.
*/
function StatisticLabel(props) {
	const context = useStatisticContext();
	const mergedProps = merge({ id: context.generateId("label") }, props);
	const others = omit(mergedProps, "id");
	createEffect(() => mergedProps.id, (id) => context.registerLabelId(id));
	return <Polymorphic as="span" id={mergedProps.id} {...others} />;
}
//#endregion
//#region src/statistic/statistic-root.tsx
/**
* Displays a labeled numeric value, such as a KPI or dashboard metric.
*/
function StatisticRoot(props) {
	const defaultId = `statistic-${createUniqueId()}`;
	const mergedProps = merge({ id: defaultId }, props);
	const [labelId, setLabelId] = createSignal(void 0, { ownedWrite: true });
	const [descriptionId, setDescriptionId] = createSignal(void 0, { ownedWrite: true });
	const others = omit(mergedProps, "id");
	const context = {
		generateId: (suffix) => `${access(mergedProps.id)}-${suffix}`,
		registerLabelId: createRegisterId(setLabelId),
		registerDescriptionId: createRegisterId(setDescriptionId)
	};
	return <StatisticContext value={context}>
			<Polymorphic as="div" id={mergedProps.id} aria-labelledby={labelId()} aria-describedby={descriptionId()} {...others} />
		</StatisticContext>;
}
//#endregion
//#region src/statistic/statistic.intl.ts
const STATISTIC_INTL_TRANSLATIONS = {
	increase: "increased by",
	decrease: "decreased by",
	noChange: "unchanged"
};
//#endregion
//#region src/statistic/statistic-trend.tsx
/**
* Indicates the direction and magnitude of change for a `Statistic.Value`.
*
* Ships no icon or color — pass your own arrow/color as `children`, which
* is treated as decorative (`aria-hidden`). An accessible sentence (e.g.
* "increased by 2.5%") is generated from `value` and rendered as
* visually-hidden text, so the accessible name doesn't depend on color or
* icon shape alone.
*/
function StatisticTrend(props) {
	const mergedProps = merge({ translations: STATISTIC_INTL_TRANSLATIONS }, props);
	const formatter = createNumberFormatter(() => mergedProps.formatOptions ?? { style: "percent" });
	const direction = () => {
		if (mergedProps.value > 0) return "increase";
		if (mergedProps.value < 0) return "decrease";
		return "noChange";
	};
	const accessibleText = () => {
		const translations = mergedProps.translations ?? STATISTIC_INTL_TRANSLATIONS;
		if (direction() === "noChange") return translations.noChange;
		const formattedValue = formatter().format(Math.abs(mergedProps.value));
		return `${translations[direction()]} ${formattedValue}`;
	};
	const others = omit(mergedProps, "value", "formatOptions", "translations", "children");
	return <Polymorphic as="div" data-direction={direction()} {...others}>
			<span aria-hidden="true">{mergedProps.children}</span>
			<span style={visuallyHiddenStyles}>{accessibleText()}</span>
		</Polymorphic>;
}
//#endregion
//#region src/statistic/statistic-value.tsx
/**
* The statistic's value. Rendered as a `polite` live region so updates
* (e.g. a value refreshed from a real-time data source) are announced to
* screen reader users without stealing focus.
*
* Formats `value` for the current locale via `formatOptions`. Pass
* children directly instead when the value can't be expressed as an
* `Intl.NumberFormat` (e.g. a custom unit) — children take precedence.
*/
function StatisticValue(props) {
	const p = props;
	const formatter = createNumberFormatter(() => p.formatOptions ?? {});
	const content = () => p.children ?? (p.value != null ? formatter().format(p.value) : void 0);
	const others = omit(p, "value", "formatOptions", "children");
	return <Polymorphic as="div" aria-live="polite" aria-atomic="true" {...others}>
			{content()}
		</Polymorphic>;
}
//#endregion
//#region src/statistic/index.tsx
var statistic_exports = /* @__PURE__ */ __exportAll({
	Description: () => StatisticDescription,
	Label: () => StatisticLabel,
	Root: () => StatisticRoot,
	STATISTIC_INTL_TRANSLATIONS: () => STATISTIC_INTL_TRANSLATIONS,
	Statistic: () => Statistic,
	Trend: () => StatisticTrend,
	Value: () => StatisticValue,
	useStatisticContext: () => useStatisticContext
});
const Statistic = Object.assign(StatisticRoot, {
	Description: StatisticDescription,
	Label: StatisticLabel,
	Trend: StatisticTrend,
	Value: StatisticValue
});
//#endregion
export { STATISTIC_INTL_TRANSLATIONS as a, StatisticDescription as c, StatisticTrend as i, useStatisticContext as l, statistic_exports as n, StatisticRoot as o, StatisticValue as r, StatisticLabel as s, Statistic as t };
