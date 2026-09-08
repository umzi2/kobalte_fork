import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.jsx";
import { createNumberFormatter } from "../i18n/index.jsx";
import { t as Meter } from "../meter/AoaKIyin.jsx";
import { combineStyle } from "@solid-primitives/props";
import { createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, useContext } from "solid-js";
import { clamp } from "@kobalte/utils";
//#region src/progress/progress-context.tsx
const ProgressContext = createContext();
function useProgressContext() {
	const context = useContext(ProgressContext);
	if (context === void 0) throw new Error("[kobalte]: `useProgressContext` must be used within a `Progress.Root` component");
	return context;
}
//#endregion
//#region src/progress/progress-fill.tsx
/**
* The component that visually represents the progress value.
* Used to visually show the fill of `Progress.Track`.
*/
function ProgressFill(props) {
	const context = useProgressContext();
	const others = omit(props, "style");
	return <Meter.Fill style={combineStyle({ "--kb-progress-fill-width": context.progressFillWidth() }, props.style)} {...context.dataset()} {...others} />;
}
//#endregion
//#region src/progress/progress-label.tsx
/**
* An accessible label that gives the user information on the progress.
*/
function ProgressLabel(props) {
	const context = useProgressContext();
	const mergedProps = merge({ id: context.generateId("label") }, props);
	const others = omit(mergedProps, "id");
	createEffect(() => mergedProps.id, (id) => context.registerLabelId(id));
	return <Meter.Label id={mergedProps.id} {...context.dataset()} {...others} />;
}
//#endregion
//#region src/progress/progress-root.tsx
/**
* Progress show either determinate or indeterminate progress of an operation over time.
*/
function ProgressRoot(props) {
	const defaultId = `progress-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		value: 0,
		minValue: 0,
		maxValue: 100
	}, props);
	const others = omit(mergedProps, "value", "minValue", "maxValue", "indeterminate", "getValueLabel");
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
	const progressFillWidth = () => {
		return mergedProps.indeterminate ? void 0 : `${valuePercent() * 100}%`;
	};
	const dataset = createMemo(() => {
		let dataProgress;
		if (!mergedProps.indeterminate) dataProgress = valuePercent() === 1 ? "complete" : "loading";
		return {
			"data-progress": dataProgress,
			"data-indeterminate": mergedProps.indeterminate ? "" : void 0
		};
	});
	const context = {
		dataset,
		value,
		valuePercent,
		valueLabel,
		labelId,
		progressFillWidth,
		generateId: (suffix) => `${others.id}-${suffix}`,
		registerLabelId: createRegisterId(setLabelId)
	};
	return <ProgressContext value={context}>
			<Meter role="progressbar" indeterminate={mergedProps.indeterminate || false} {...dataset()} {...mergedProps} />
		</ProgressContext>;
}
//#endregion
//#region src/progress/progress-track.tsx
/**
* The component that visually represents the progress track.
* Act as a container for `Progress.Fill`.
*/
function ProgressTrack(props) {
	const context = useProgressContext();
	return <Meter.Track {...context.dataset()} {...props} />;
}
//#endregion
//#region src/progress/progress-value-label.tsx
/**
* The accessible label text representing the current value in a human-readable format.
*/
function ProgressValueLabel(props) {
	const context = useProgressContext();
	return <Meter.ValueLabel {...context.dataset()} {...props} />;
}
//#endregion
//#region src/progress/index.tsx
var progress_exports = /* @__PURE__ */ __exportAll({
	Fill: () => ProgressFill,
	Label: () => ProgressLabel,
	Progress: () => Progress,
	Root: () => ProgressRoot,
	Track: () => ProgressTrack,
	ValueLabel: () => ProgressValueLabel,
	useProgressContext: () => useProgressContext
});
const Progress = Object.assign(ProgressRoot, {
	Fill: ProgressFill,
	Label: ProgressLabel,
	Track: ProgressTrack,
	ValueLabel: ProgressValueLabel
});
//#endregion
export { ProgressRoot as a, useProgressContext as c, ProgressTrack as i, progress_exports as n, ProgressLabel as o, ProgressValueLabel as r, ProgressFill as s, Progress as t };
