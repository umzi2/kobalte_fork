import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { createNumberFormatter, useLocale } from "../i18n/index.js";
import { n as createDomCollection, t as createDomCollectionItem } from "../create-dom-collection/F5MPGch0.js";
import { a as createFormControl, i as FORM_CONTROL_PROP_NAMES, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/BQ1mcKaU.js";
import { n as createFormControlField, t as FORM_CONTROL_FIELD_PROP_NAMES } from "../create-form-control-field/5-BHfdGI.js";
import { t as FormControlErrorMessage } from "../form-control-error-message/D9jUVumc.js";
import { t as FormControlLabel } from "../form-control-label/DqQ24y8m.js";
import { a as stopEventDefaultAndPropagation, i as linearScale, n as getNextSortedValues, r as hasMinStepsBetweenValues, t as getClosestValueIndex } from "../utils/9uVKQNrd.js";
import { createComponent, mergeProps, spread, template } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, onSettled, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { callHandler, clamp, snapValueToStep, visuallyHiddenStyles } from "@kobalte/utils";
import { createFormResetListener } from "@solid-primitives/form";
//#region src/slider/slider-context.tsx
const SliderContext = createContext();
function useSliderContext() {
	const context = useContext(SliderContext);
	if (context === void 0) throw new Error("[kobalte]: `useSliderContext` must be used within a `Slider.Root` component");
	return context;
}
//#endregion
//#region src/slider/slider-fill.tsx
/**
* The component that visually represents the slider value.
* Used to visually show the fill of `Slider.Track`.
*/
function SliderFill(props) {
	const context = useSliderContext();
	const others = omit(props, "style");
	const percentages = () => {
		return context.state.values().map((value) => context.state.getValuePercent(value) * 100);
	};
	const offsetStart = () => {
		return context.state.values().length > 1 ? Math.min(...percentages()) : 0;
	};
	const offsetEnd = () => {
		return 100 - Math.max(...percentages());
	};
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		get style() {
			return combineStyle({
				[context.startEdge()]: `${offsetStart()}%`,
				[context.endEdge()]: `${offsetEnd()}%`
			}, props.style);
		}
	}, () => context.dataset(), others));
}
//#endregion
//#region src/slider/slider-thumb.tsx
function SliderThumb(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const context = useSliderContext();
	const mergedProps = merge({ id: context.generateId(`thumb-${createUniqueId()}`) }, props);
	const others = omit(mergedProps, "ref", "style", "onKeyDown", "onPointerDown", "onPointerMove", "onPointerUp", "onFocus", "onBlur", ...FORM_CONTROL_FIELD_PROP_NAMES);
	const { fieldProps } = createFormControlField(mergedProps);
	createDomCollectionItem({ getItem: () => ({
		ref,
		disabled: context.state.isDisabled(),
		key: fieldProps.id(),
		textValue: "",
		type: "item"
	}) });
	const index = () => ref() ? context.thumbs().findIndex((v) => v.ref() === ref()) : -1;
	const value = () => context.state.getThumbValue(index());
	const position = () => {
		return context.state.getThumbPercent(index());
	};
	const transform = () => {
		if (context.state.orientation() === "vertical") return context.inverted() ? "translateY(-50%)" : "translateY(50%)";
		return context.inverted() ? "translateX(50%)" : "translateX(-50%)";
	};
	let startPosition = 0;
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		context.onStepKeyDown(e, index());
	};
	const onPointerDown = (e) => {
		callHandler(e, mergedProps.onPointerDown);
		const target = e.currentTarget;
		e.preventDefault();
		e.stopPropagation();
		target.setPointerCapture(e.pointerId);
		target.focus();
		startPosition = context.state.orientation() === "horizontal" ? e.clientX : e.clientY;
		if (value() !== void 0) context.onSlideStart?.(index(), value());
	};
	const onPointerMove = (e) => {
		e.stopPropagation();
		callHandler(e, mergedProps.onPointerMove);
		if (e.currentTarget.hasPointerCapture(e.pointerId)) {
			const delta = {
				deltaX: e.clientX - startPosition,
				deltaY: e.clientY - startPosition
			};
			context.onSlideMove?.(delta);
			startPosition = context.state.orientation() === "horizontal" ? e.clientX : e.clientY;
		}
	};
	const onPointerUp = (e) => {
		e.stopPropagation();
		callHandler(e, mergedProps.onPointerUp);
		const target = e.currentTarget;
		if (target.hasPointerCapture(e.pointerId)) {
			target.releasePointerCapture(e.pointerId);
			context.onSlideEnd?.();
		}
	};
	const onFocus = (e) => {
		callHandler(e, mergedProps.onFocus);
		context.state.setFocusedThumb(index());
	};
	const onBlur = (e) => {
		callHandler(e, mergedProps.onBlur);
		context.state.setFocusedThumb(void 0);
	};
	onSettled(() => {
		context.state.setThumbEditable(index(), !context.state.isDisabled());
	});
	return createComponent(ThumbContext, {
		value: { index },
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "span",
				ref: [setRef, mergedProps.ref],
				role: "slider",
				get id() {
					return fieldProps.id();
				},
				get tabindex() {
					return context.state.isDisabled() ? void 0 : 0;
				},
				get style() {
					return combineStyle({
						display: value() === void 0 ? "none" : void 0,
						position: "absolute",
						[context.startEdge()]: `calc(${position() * 100}%)`,
						transform: transform(),
						"touch-action": "none"
					}, mergedProps.style);
				},
				get ["aria-valuetext"]() {
					return context.state.getThumbValueLabel(index());
				},
				get ["aria-valuemin"]() {
					return context.minValue();
				},
				get ["aria-valuenow"]() {
					return value();
				},
				get ["aria-valuemax"]() {
					return context.maxValue();
				},
				get ["aria-orientation"]() {
					return context.state.orientation();
				},
				get ["aria-label"]() {
					return fieldProps.ariaLabel();
				},
				get ["aria-labelledby"]() {
					return fieldProps.ariaLabelledBy();
				},
				get ["aria-describedby"]() {
					return fieldProps.ariaDescribedBy();
				},
				onKeyDown,
				onPointerDown,
				onPointerMove,
				onPointerUp,
				onFocus,
				onBlur
			}, () => context.dataset(), others));
		}
	});
}
const ThumbContext = createContext();
function useThumbContext() {
	const context = useContext(ThumbContext);
	if (context === void 0) throw new Error("[kobalte]: `useThumbContext` must be used within a `Slider.Thumb` component");
	return context;
}
//#endregion
//#region src/slider/slider-input.tsx
var _tmpl$ = /*#__PURE__*/ template(`<input>`);
/**
* The native html input that is visually hidden in the slider thumb.
*/
function SliderInput(props) {
	const formControlContext = useFormControlContext();
	const context = useSliderContext();
	const thumb = useThumbContext();
	const mergedProps = merge({ id: context.generateId("input") }, props);
	const formControlFieldProps = omit(mergedProps, "style", "onChange");
	const others = omit(mergedProps, "style", "onChange", ...FORM_CONTROL_FIELD_PROP_NAMES);
	const { fieldProps } = createFormControlField(formControlFieldProps);
	const [valueText, setValueText] = createSignal("");
	const onChange = (e) => {
		callHandler(e, mergedProps.onChange);
		const target = e.target;
		context.state.setThumbValue(thumb.index(), Number.parseFloat(target.value));
		target.value = String(context.state.values()[thumb.index()]) ?? "";
	};
	createEffect(() => thumb.index() === -1 ? "" : context.state.getThumbValueLabel(thumb.index()), (value) => {
		setValueText(value);
	});
	var _el$ = _tmpl$();
	spread(_el$, mergeProps({
		"type": "range",
		get id() {
			return fieldProps.id();
		},
		get name() {
			return formControlContext.name();
		},
		get tabindex() {
			return context.state.isDisabled() ? void 0 : -1;
		},
		get min() {
			return context.state.getThumbMinValue(thumb.index());
		},
		get max() {
			return context.state.getThumbMaxValue(thumb.index());
		},
		get step() {
			return context.state.step();
		},
		get value() {
			return context.state.values()[thumb.index()];
		},
		get required() {
			return formControlContext.isRequired();
		},
		get disabled() {
			return formControlContext.isDisabled();
		},
		get readonly() {
			return formControlContext.isReadOnly();
		},
		get style() {
			return combineStyle({ ...visuallyHiddenStyles }, mergedProps.style);
		},
		get ["aria-orientation"]() {
			return context.state.orientation();
		},
		get ["aria-valuetext"]() {
			return valueText();
		},
		get ["aria-label"]() {
			return fieldProps.ariaLabel();
		},
		get ["aria-labelledby"]() {
			return fieldProps.ariaLabelledBy();
		},
		get ["aria-describedby"]() {
			return fieldProps.ariaDescribedBy();
		},
		get ["aria-invalid"]() {
			return formControlContext.validationState() === "invalid" ? "true" : void 0;
		},
		get ["aria-disabled"]() {
			return formControlContext.isDisabled() ? "true" : void 0;
		},
		get ["aria-readonly"]() {
			return formControlContext.isReadOnly() ? "true" : void 0;
		},
		"onChange": onChange
	}, () => context.dataset(), others), false);
	return _el$;
}
//#endregion
//#region src/slider/create-slider-state.ts
function createSliderState(props) {
	let dirty = false;
	const mergedProps = merge({
		minValue: () => 0,
		maxValue: () => 100,
		step: () => 1,
		minStepsBetweenThumbs: () => 0,
		orientation: () => "horizontal",
		isDisabled: () => false
	}, props);
	const pageSize = createMemo(() => {
		let calcPageSize = (mergedProps.maxValue() - mergedProps.minValue()) / 10;
		calcPageSize = snapValueToStep(calcPageSize, 0, calcPageSize + mergedProps.step(), mergedProps.step());
		return Math.max(calcPageSize, mergedProps.step());
	});
	const defaultValue = createMemo(() => {
		return mergedProps.defaultValue() ?? [mergedProps.minValue()];
	});
	const [values, setValues] = (0, primitives_exports.createControllableArraySignal)({
		value: () => mergedProps.value(),
		defaultValue,
		onChange: (values) => mergedProps.onChange?.(values)
	});
	const [isDragging, setIsDragging] = createSignal(new Array(values().length).fill(false));
	const [isEditables, setEditables] = createSignal(new Array(values().length).fill(false));
	const [focusedIndex, setFocusedIndex] = createSignal(void 0);
	const resetValues = () => {
		setValues(defaultValue());
	};
	const getValuePercent = (value) => {
		return (value - mergedProps.minValue()) / (mergedProps.maxValue() - mergedProps.minValue());
	};
	const getThumbMinValue = (index) => {
		return index === 0 ? props.minValue() : values()[index - 1] + props.minStepsBetweenThumbs() * props.step();
	};
	const getThumbMaxValue = (index) => {
		return index === values().length - 1 ? props.maxValue() : values()[index + 1] - props.minStepsBetweenThumbs() * props.step();
	};
	const isThumbEditable = (index) => {
		return isEditables()[index];
	};
	const setThumbEditable = (index) => {
		setEditables((p) => {
			p[index] = true;
			return p;
		});
	};
	const updateValue = (index, value) => {
		if (mergedProps.isDisabled() || !isThumbEditable(index)) return;
		const snappedValue = snapValueToStep(value, getThumbMinValue(index), getThumbMaxValue(index), mergedProps.step());
		const nextValues = getNextSortedValues(values(), snappedValue, index);
		if (!hasMinStepsBetweenValues(nextValues, mergedProps.minStepsBetweenThumbs() * mergedProps.step())) return;
		setValues((prev) => [...replaceIndex(prev, index, snappedValue)]);
	};
	const updateDragging = (index, dragging) => {
		if (mergedProps.isDisabled() || !isThumbEditable(index)) return;
		const wasDragging = isDragging()[index];
		setIsDragging((p) => [...replaceIndex(p, index, dragging)]);
		if (wasDragging && !isDragging().some(Boolean)) mergedProps.onChangeEnd?.(values());
	};
	const getFormattedValue = (value) => {
		return mergedProps.numberFormatter.format(value);
	};
	const setThumbPercent = (index, percent) => {
		updateValue(index, getPercentValue(percent));
	};
	const getRoundedValue = (value) => {
		return Math.round((value - mergedProps.minValue()) / mergedProps.step()) * mergedProps.step() + mergedProps.minValue();
	};
	const getPercentValue = (percent) => {
		const val = percent * (mergedProps.maxValue() - mergedProps.minValue()) + mergedProps.minValue();
		return clamp(getRoundedValue(val), mergedProps.minValue(), mergedProps.maxValue());
	};
	const snapThumbValue = (index, value) => {
		const nextValue = values()[index] + value;
		const nextValues = getNextSortedValues(values(), nextValue, index);
		if (hasMinStepsBetweenValues(nextValues, mergedProps.minStepsBetweenThumbs() * mergedProps.step())) updateValue(index, snapValueToStep(nextValue, mergedProps.minValue(), mergedProps.maxValue(), mergedProps.step()));
	};
	const incrementThumb = (index, stepSize = 1) => {
		dirty = true;
		snapThumbValue(index, Math.max(stepSize, props.step()));
	};
	const decrementThumb = (index, stepSize = 1) => {
		dirty = true;
		snapThumbValue(index, -Math.max(stepSize, props.step()));
	};
	return {
		values,
		getThumbValue: (index) => values()[index],
		setThumbValue: updateValue,
		setThumbPercent,
		isThumbDragging: (index) => isDragging()[index],
		setThumbDragging: updateDragging,
		focusedThumb: focusedIndex,
		setFocusedThumb: (index) => {
			if (index === void 0 && dirty) {
				dirty = false;
				mergedProps.onChangeEnd?.(values());
			}
			setFocusedIndex(index);
		},
		getThumbPercent: (index) => getValuePercent(values()[index]),
		getValuePercent,
		getThumbValueLabel: (index) => getFormattedValue(values()[index]),
		getFormattedValue,
		getThumbMinValue,
		getThumbMaxValue,
		getPercentValue,
		isThumbEditable,
		setThumbEditable,
		incrementThumb,
		decrementThumb,
		step: mergedProps.step,
		pageSize,
		orientation: mergedProps.orientation,
		isDisabled: mergedProps.isDisabled,
		setValues,
		resetValues
	};
}
function replaceIndex(array, index, value) {
	if (array[index] === value) return array;
	return [
		...array.slice(0, index),
		value,
		...array.slice(index + 1)
	];
}
//#endregion
//#region src/slider/slider-root.tsx
function SliderRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const defaultId = `slider-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		minValue: 0,
		maxValue: 100,
		step: 1,
		minStepsBetweenThumbs: 0,
		orientation: "horizontal",
		disabled: false,
		inverted: false,
		getValueLabel: (params) => params.values.join(", ")
	}, props);
	const others = omit(mergedProps, "ref", "value", "defaultValue", "onChange", "onChangeEnd", "inverted", "minValue", "maxValue", "step", "minStepsBetweenThumbs", "getValueLabel", "orientation", ...FORM_CONTROL_PROP_NAMES);
	const { formControlContext } = createFormControl(mergedProps);
	const defaultFormatter = createNumberFormatter(() => ({ style: "decimal" }));
	const { direction } = useLocale();
	const state = createSliderState({
		value: () => mergedProps.value,
		defaultValue: () => mergedProps.defaultValue ?? [mergedProps.minValue],
		maxValue: () => mergedProps.maxValue,
		minValue: () => mergedProps.minValue,
		minStepsBetweenThumbs: () => mergedProps.minStepsBetweenThumbs,
		isDisabled: () => formControlContext.isDisabled() ?? false,
		orientation: () => mergedProps.orientation,
		step: () => mergedProps.step,
		numberFormatter: defaultFormatter(),
		onChange: mergedProps.onChange,
		onChangeEnd: mergedProps.onChangeEnd
	});
	const { DomCollectionProvider, items: thumbs } = createDomCollection();
	createFormResetListener(ref, () => state.resetValues());
	const isLTR = () => direction() === "ltr";
	const isSlidingFromLeft = () => {
		return isLTR() && !mergedProps.inverted || !isLTR() && mergedProps.inverted;
	};
	const isSlidingFromBottom = () => !mergedProps.inverted;
	const isVertical = () => state.orientation() === "vertical";
	const dataset = createMemo(() => {
		return {
			...formControlContext.dataset(),
			"data-orientation": mergedProps.orientation
		};
	});
	const [trackRef, setTrackRef] = createSignal();
	let currentPosition = null;
	const onSlideStart = (index, value) => {
		state.setFocusedThumb(index);
		state.setThumbDragging(index, true);
		state.setThumbValue(index, value);
		currentPosition = null;
	};
	const onSlideMove = ({ deltaX, deltaY }) => {
		const active = state.focusedThumb();
		if (active === void 0) return;
		const { width, height } = trackRef().getBoundingClientRect();
		const size = isVertical() ? height : width;
		if (currentPosition === null) currentPosition = state.getThumbPercent(state.focusedThumb()) * size;
		let delta = isVertical() ? deltaY : deltaX;
		if (!isVertical() && mergedProps.inverted || isVertical() && isSlidingFromBottom()) delta = -delta;
		currentPosition += delta;
		const percent = clamp(currentPosition / size, 0, 1);
		const nextValues = getNextSortedValues(state.values(), currentPosition, active);
		if (hasMinStepsBetweenValues(nextValues, mergedProps.minStepsBetweenThumbs * state.step())) {
			state.setThumbPercent(state.focusedThumb(), percent);
			mergedProps.onChange?.(state.values());
		}
	};
	const onSlideEnd = () => {
		const activeThumb = state.focusedThumb();
		if (activeThumb !== void 0) {
			state.setThumbDragging(activeThumb, false);
			thumbs()[activeThumb].ref().focus();
		}
	};
	const onHomeKeyDown = (event) => {
		const focusedThumb = state.focusedThumb();
		if (!formControlContext.isDisabled() && focusedThumb !== void 0) {
			stopEventDefaultAndPropagation(event);
			state.setThumbValue(focusedThumb, state.getThumbMinValue(focusedThumb));
		}
	};
	const onEndKeyDown = (event) => {
		const focusedThumb = state.focusedThumb();
		if (!formControlContext.isDisabled() && focusedThumb !== void 0) {
			stopEventDefaultAndPropagation(event);
			state.setThumbValue(focusedThumb, state.getThumbMaxValue(focusedThumb));
		}
	};
	const onStepKeyDown = (event, index) => {
		if (!formControlContext.isDisabled()) switch (event.key) {
			case "Left":
			case "ArrowLeft":
			case "Down":
			case "ArrowDown":
				stopEventDefaultAndPropagation(event);
				if (!isLTR()) state.incrementThumb(index, event.shiftKey ? state.pageSize() : state.step());
				else state.decrementThumb(index, event.shiftKey ? state.pageSize() : state.step());
				break;
			case "Right":
			case "ArrowRight":
			case "Up":
			case "ArrowUp":
				stopEventDefaultAndPropagation(event);
				if (!isLTR()) state.decrementThumb(index, event.shiftKey ? state.pageSize() : state.step());
				else state.incrementThumb(index, event.shiftKey ? state.pageSize() : state.step());
				break;
			case "Home":
				onHomeKeyDown(event);
				break;
			case "End":
				onEndKeyDown(event);
				break;
			case "PageUp":
				stopEventDefaultAndPropagation(event);
				state.incrementThumb(index, state.pageSize());
				break;
			case "PageDown":
				stopEventDefaultAndPropagation(event);
				state.decrementThumb(index, state.pageSize());
		}
	};
	const context = {
		dataset,
		state,
		thumbs,
		onSlideStart,
		onSlideMove,
		onSlideEnd,
		onStepKeyDown,
		isSlidingFromLeft,
		isSlidingFromBottom,
		trackRef,
		minValue: () => mergedProps.minValue,
		maxValue: () => mergedProps.maxValue,
		inverted: () => mergedProps.inverted,
		startEdge: createMemo(() => {
			if (isVertical()) return isSlidingFromBottom() ? "bottom" : "top";
			return isSlidingFromLeft() ? "left" : "right";
		}),
		endEdge: createMemo(() => {
			if (isVertical()) return isSlidingFromBottom() ? "top" : "bottom";
			return isSlidingFromLeft() ? "right" : "left";
		}),
		registerTrack: (ref) => setTrackRef(ref),
		generateId: (suffix) => `${access(mergedProps.id)}-${suffix}`,
		getValueLabel: mergedProps.getValueLabel
	};
	return createComponent(DomCollectionProvider, { get children() {
		return createComponent(FormControlContext, {
			value: formControlContext,
			get children() {
				return createComponent(SliderContext, {
					value: context,
					get children() {
						return createComponent(Polymorphic, mergeProps({
							as: "div",
							ref: [setRef, mergedProps.ref],
							role: "group",
							get id() {
								return access(mergedProps.id);
							}
						}, dataset, others));
					}
				});
			}
		});
	} });
}
//#endregion
//#region src/slider/slider-track.tsx
/**
* The component that visually represents the slider track.
* Act as a container for `Slider.Fill`.
*/
function SliderTrack(props) {
	const context = useSliderContext();
	const others = omit(props, "onPointerDown", "onPointerMove", "onPointerUp");
	const [sRect, setRect] = createSignal();
	function getValueFromPointer(pointerPosition) {
		const rect = sRect() || context.trackRef().getBoundingClientRect();
		const input = [0, context.state.orientation() === "vertical" ? rect.height : rect.width];
		let output = context.isSlidingFromLeft() ? [context.minValue(), context.maxValue()] : [context.maxValue(), context.minValue()];
		if (context.state.orientation() === "vertical") output = context.isSlidingFromBottom() ? [context.maxValue(), context.minValue()] : [context.minValue(), context.maxValue()];
		const value = linearScale(input, output);
		setRect(rect);
		return value(pointerPosition - (context.state.orientation() === "vertical" ? rect.top : rect.left));
	}
	let startPosition = 0;
	const onPointerDown = (e) => {
		callHandler(e, props.onPointerDown);
		e.target.setPointerCapture(e.pointerId);
		e.preventDefault();
		const value = getValueFromPointer(context.state.orientation() === "horizontal" ? e.clientX : e.clientY);
		startPosition = context.state.orientation() === "horizontal" ? e.clientX : e.clientY;
		const closestIndex = getClosestValueIndex(context.state.values(), value);
		context.onSlideStart?.(closestIndex, value);
	};
	const onPointerMove = (e) => {
		callHandler(e, props.onPointerMove);
		if (e.target.hasPointerCapture(e.pointerId)) {
			context.onSlideMove?.({
				deltaX: e.clientX - startPosition,
				deltaY: e.clientY - startPosition
			});
			startPosition = context.state.orientation() === "horizontal" ? e.clientX : e.clientY;
		}
	};
	const onPointerUp = (e) => {
		callHandler(e, props.onPointerUp);
		const target = e.target;
		if (target.hasPointerCapture(e.pointerId)) {
			target.releasePointerCapture(e.pointerId);
			setRect(void 0);
			context.onSlideEnd?.();
		}
	};
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		ref: [context.registerTrack, props.ref],
		onPointerDown,
		onPointerMove,
		onPointerUp
	}, () => context.dataset(), others));
}
//#endregion
//#region src/slider/slider-value-label.tsx
/**
* The accessible label text representing the current value in a human-readable format.
*/
function SliderValueLabel(props) {
	const context = useSliderContext();
	return createComponent(Polymorphic, mergeProps({ as: "div" }, () => context.dataset(), props, { get children() {
		return context.getValueLabel?.({
			values: context.state.values(),
			max: context.maxValue(),
			min: context.minValue()
		});
	} }));
}
//#endregion
//#region src/slider/index.tsx
var slider_exports = /* @__PURE__ */ __exportAll({
	Description: () => FormControlDescription,
	ErrorMessage: () => FormControlErrorMessage,
	Fill: () => SliderFill,
	Input: () => SliderInput,
	Label: () => FormControlLabel,
	Root: () => SliderRoot,
	Slider: () => Slider,
	Thumb: () => SliderThumb,
	Track: () => SliderTrack,
	ValueLabel: () => SliderValueLabel,
	useSliderContext: () => useSliderContext
});
const Slider = Object.assign(SliderRoot, {
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	Fill: SliderFill,
	Input: SliderInput,
	Label: FormControlLabel,
	Thumb: SliderThumb,
	Track: SliderTrack,
	ValueLabel: SliderValueLabel
});
//#endregion
export { SliderRoot as a, SliderFill as c, SliderTrack as i, useSliderContext as l, slider_exports as n, SliderInput as o, SliderValueLabel as r, SliderThumb as s, Slider as t };
