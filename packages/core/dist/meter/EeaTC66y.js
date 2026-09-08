import { Polymorphic } from "../polymorphic/index.js";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.js";
import { createNumberFormatter } from "../i18n/index.js";
import { createComponent, memo, mergeProps } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, useContext } from "solid-js";
import { clamp } from "@kobalte/utils";
//#region src/meter/meter-context.tsx
const MeterContext = createContext();
function useMeterContext() {
	const context = useContext(MeterContext);
	if (context === void 0) throw new Error("[kobalte]: `useMeterContext` must be used within a `Meter.Root` component");
	return context;
}
//#endregion
//#region src/meter/meter-fill.tsx
/**
* The component that visually represents the meter value.
* Used to visually show the fill of `Meter.Track`.
*/
function MeterFill(props) {
	const context = useMeterContext();
	const others = omit(props, "style");
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		get style() {
			return combineStyle({ "--kb-meter-fill-width": context.meterFillWidth() }, props.style);
		}
	}, () => context.dataset(), others));
}
//#endregion
//#region src/meter/meter-label.tsx
/**
* An accessible label that gives the user information on the meter.
*/
function MeterLabel(props) {
	const context = useMeterContext();
	const mergedProps = merge({ id: context.generateId("label") }, props);
	const others = omit(mergedProps, "id");
	createEffect(() => mergedProps.id, (id) => context.registerLabelId(id));
	return createComponent(Polymorphic, mergeProps({
		as: "span",
		get id() {
			return mergedProps.id;
		}
	}, () => context.dataset(), others));
}
//#endregion
//#region src/meter/meter-root.tsx
/**
* Meter displays numeric value that varies within a defined range.
*/
function MeterRoot(props) {
	const defaultId = `meter-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		value: 0,
		minValue: 0,
		maxValue: 100,
		role: "meter",
		indeterminate: false
	}, props);
	const others = omit(mergedProps, "value", "minValue", "maxValue", "getValueLabel", "role", "aria-valuetext", "aria-labelledby", "aria-valuemax", "aria-valuemin", "aria-valuenow", "indeterminate");
	const [labelId, setLabelId] = createSignal(void 0, { ownedWrite: true });
	const defaultFormatter = createNumberFormatter(() => ({ style: "percent" }));
	const value = () => {
		return clamp(mergedProps.value, mergedProps.minValue, mergedProps.maxValue);
	};
	const valuePercent = () => {
		return (value() - mergedProps.minValue) / (mergedProps.maxValue - mergedProps.minValue);
	};
	const valueLabel = () => {
		if (mergedProps.indeterminate) return;
		if (mergedProps.getValueLabel) return mergedProps.getValueLabel({
			value: value(),
			min: mergedProps.minValue,
			max: mergedProps.maxValue
		});
		return defaultFormatter().format(valuePercent());
	};
	const meterFillWidth = () => {
		return `${valuePercent() * 100}%`;
	};
	const dataset = createMemo(() => {
		return {};
	});
	const context = {
		dataset,
		value,
		valuePercent,
		valueLabel,
		labelId,
		meterFillWidth,
		generateId: (suffix) => `${others.id}-${suffix}`,
		registerLabelId: createRegisterId(setLabelId)
	};
	return createComponent(MeterContext, {
		value: context,
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "div",
				get role() {
					return mergedProps.role || "meter";
				},
				get ["aria-valuenow"]() {
					return memo(() => !!mergedProps.indeterminate)() ? void 0 : value();
				},
				get ["aria-valuemin"]() {
					return mergedProps.minValue;
				},
				get ["aria-valuemax"]() {
					return mergedProps.maxValue;
				},
				get ["aria-valuetext"]() {
					return valueLabel();
				},
				get ["aria-labelledby"]() {
					return labelId();
				}
			}, dataset, others));
		}
	});
}
//#endregion
//#region src/meter/meter-track.tsx
/**
* The component that visually represents the meter track.
* Act as a container for `Meter.Fill`.
*/
function MeterTrack(props) {
	const context = useMeterContext();
	return createComponent(Polymorphic, mergeProps({ as: "div" }, () => context.dataset(), props));
}
//#endregion
//#region src/meter/meter-value-label.tsx
/**
* The accessible label text representing the current value in a human-readable format.
*/
function MeterValueLabel(props) {
	const context = useMeterContext();
	return createComponent(Polymorphic, mergeProps({ as: "div" }, () => context.dataset(), props, { get children() {
		return context.valueLabel();
	} }));
}
//#endregion
//#region src/meter/index.tsx
const Meter = Object.assign(MeterRoot, {
	Fill: MeterFill,
	Label: MeterLabel,
	Track: MeterTrack,
	ValueLabel: MeterValueLabel
});
//#endregion
export { MeterLabel as a, MeterRoot as i, MeterValueLabel as n, MeterFill as o, MeterTrack as r, useMeterContext as s, Meter as t };
