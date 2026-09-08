import { Polymorphic } from "../polymorphic/index.js";
import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { useLocale } from "../i18n/index.js";
import { a as createFormControl, i as FORM_CONTROL_PROP_NAMES, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/BQ1mcKaU.js";
import { n as createFormControlField, t as FORM_CONTROL_FIELD_PROP_NAMES } from "../create-form-control-field/5-BHfdGI.js";
import { t as FormControlErrorMessage } from "../form-control-error-message/D9jUVumc.js";
import { t as FormControlLabel } from "../form-control-label/DqQ24y8m.js";
import { i as linearScale } from "../utils/9uVKQNrd.js";
import { createComponent, mergeProps, spread, template } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { createContext, createMemo, createSignal, createUniqueId, merge, omit, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { callHandler, clamp, snapValueToStep, visuallyHiddenStyles } from "@kobalte/utils";
import { createFormResetListener } from "@solid-primitives/form";
import { COLOR_INTL_TRANSLATIONS, parseColor } from "@solid-primitives/utils/colors";
//#region src/color-area/color-area-context.tsx
const ColorAreaContext = createContext();
function useColorAreaContext() {
	const context = useContext(ColorAreaContext);
	if (context === void 0) throw new Error("[kobalte]: `useColorAreaContext` must be used within a `ColorArea` component");
	return context;
}
//#endregion
//#region src/color-area/color-area-background.tsx
function ColorAreaBackground(props) {
	const context = useColorAreaContext();
	const formControlContext = useFormControlContext();
	const others = omit(props, "style", "onPointerDown", "onPointerMove", "onPointerUp");
	const { direction } = useLocale();
	const [sRect, setRect] = createSignal();
	const getValueFromPointer = (pointerPosition) => {
		const rect = sRect() || context.backgroundRef().getBoundingClientRect();
		const xInput = [0, rect.width];
		const xOutput = [context.state.xMinValue(), context.state.xMaxValue()];
		const yInput = [0, rect.height];
		const yOutput = [context.state.yMinValue(), context.state.yMaxValue()];
		const xValue = linearScale(xInput, xOutput);
		const yValue = linearScale(yInput, yOutput);
		setRect(rect);
		return [xValue(pointerPosition.x - rect.left), yValue(pointerPosition.y - rect.top)];
	};
	let startPosition = {
		x: 0,
		y: 0
	};
	const onPointerDown = (e) => {
		callHandler(e, props.onPointerDown);
		e.target.setPointerCapture(e.pointerId);
		e.preventDefault();
		const value = getValueFromPointer({
			x: e.clientX,
			y: e.clientY
		});
		startPosition = {
			x: e.clientX,
			y: e.clientY
		};
		context.onDragStart?.(value);
	};
	const onPointerMove = (e) => {
		callHandler(e, props.onPointerMove);
		if (e.target.hasPointerCapture(e.pointerId)) {
			context.onDrag?.({
				deltaX: e.clientX - startPosition.x,
				deltaY: e.clientY - startPosition.y
			});
			startPosition = {
				x: e.clientX,
				y: e.clientY
			};
		}
	};
	const onPointerUp = (e) => {
		callHandler(e, props.onPointerUp);
		const target = e.target;
		if (target.hasPointerCapture(e.pointerId)) {
			target.releasePointerCapture(e.pointerId);
			setRect(void 0);
			context.onDragEnd?.();
		}
	};
	const backgroundStyles = createMemo(() => {
		const end = direction() === "ltr" ? "right" : "left";
		const zValue = context.state.value().getChannelValue(context.state.channels().zChannel);
		switch (context.state.value().getColorSpace()) {
			case "rgb": {
				const rgb = parseColor("rgb(0, 0, 0)");
				return {
					background: [
						`linear-gradient(to ${end}, ${rgb.withChannelValue(context.state.channels().xChannel, 0)}, ${rgb.withChannelValue(context.state.channels().xChannel, 255)})`,
						`linear-gradient(to top, ${rgb.withChannelValue(context.state.channels().yChannel, 0)}, ${rgb.withChannelValue(context.state.channels().yChannel, 255)})`,
						rgb.withChannelValue(context.state.channels().zChannel, zValue)
					].join(","),
					"background-blend-mode": "screen"
				};
			}
			case "hsl": {
				const value = parseColor("hsl(0, 100%, 50%)").withChannelValue(context.state.channels().zChannel, zValue);
				const bg = context.state.value().getColorChannels().filter((c) => c !== context.state.channels().zChannel).map((c) => `linear-gradient(to ${c === context.state.channels().xChannel ? end : "top"}, ${hslChannels[c](value)})`).reverse();
				if (context.state.channels().zChannel === "hue") bg.push(value.toString("css"));
				return { background: bg.join(", ") };
			}
			case "hsb": {
				const value = parseColor("hsb(0, 100%, 100%)").withChannelValue(context.state.channels().zChannel, zValue);
				const bg = context.state.value().getColorChannels().filter((c) => c !== context.state.channels().zChannel).map((c) => `linear-gradient(to ${c === context.state.channels().xChannel ? end : "top"}, ${hsbChannels[c](value)})`).reverse();
				if (context.state.channels().zChannel === "hue") bg.push(value.toString("css"));
				return { background: bg.join(", ") };
			}
		}
	});
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		ref: [context.setBackgroundRef, props.ref],
		get style() {
			return combineStyle({
				"touch-action": "none",
				"forced-color-adjust": "none",
				...backgroundStyles()
			}, props.style);
		},
		onPointerDown,
		onPointerMove,
		onPointerUp
	}, () => formControlContext.dataset(), others));
}
const hue = (color) => [
	0,
	60,
	120,
	180,
	240,
	300,
	360
].map((hue) => color.withChannelValue("hue", hue).toString("css")).join(", ");
const saturation = (color) => `${color.withChannelValue("saturation", 0)}, transparent`;
const hslChannels = {
	hue,
	saturation,
	lightness: () => "black, transparent, white"
};
const hsbChannels = {
	hue,
	saturation,
	brightness: () => "black, transparent"
};
//#endregion
//#region src/color-area/color-area-hidden-input-base.tsx
var _tmpl$ = /*#__PURE__*/ template(`<input>`);
function ColorAreaHiddenInputBase(props) {
	const formControlContext = useFormControlContext();
	const context = useColorAreaContext();
	const mergedProps = merge({
		id: context.generateId("input"),
		orientation: "horizontal"
	}, props);
	const formControlFieldProps = omit(mergedProps, "style", "orientation", "onChange", "onFocus", "onBlur");
	const others = omit(mergedProps, "style", "orientation", "onChange", "onFocus", "onBlur", ...FORM_CONTROL_FIELD_PROP_NAMES);
	const { fieldProps } = createFormControlField(formControlFieldProps);
	const isVertical = () => mergedProps.orientation === "vertical";
	const ariaLabel = () => {
		return [fieldProps.ariaLabel(), context.translations().colorPicker].filter(Boolean).join(", ");
	};
	const onChange = (e) => {
		callHandler(e, mergedProps.onChange);
		const target = e.target;
		isVertical() ? context.state.setYValue(Number.parseFloat(target.value)) : context.state.setXValue(Number.parseFloat(target.value));
		target.value = String(isVertical() ? context.state.yValue() : context.state.xValue()) ?? "";
	};
	const valueText = createMemo(() => {
		const channel = isVertical() ? context.state.channels().yChannel : context.state.channels().xChannel;
		return `${context.state.value().getChannelName(channel, COLOR_INTL_TRANSLATIONS)} ${context.state.value().formatChannelValue(channel)}, ${context.state.value().getColorName(COLOR_INTL_TRANSLATIONS)}`;
	});
	var _el$ = _tmpl$();
	spread(_el$, mergeProps({
		"type": "range",
		get id() {
			return fieldProps.id();
		},
		get name() {
			return (isVertical() ? context.yName() : context.xName()) || formControlContext.name();
		},
		get tabindex() {
			return context.state.isDisabled() ? void 0 : -1;
		},
		get min() {
			return isVertical() ? context.state.yMinValue() : context.state.xMinValue();
		},
		get max() {
			return isVertical() ? context.state.yMaxValue() : context.state.xMaxValue();
		},
		get step() {
			return isVertical() ? context.state.yStep() : context.state.xStep();
		},
		get value() {
			return isVertical() ? context.state.yValue() : context.state.xValue();
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
		get ["aria-roledescription"]() {
			return context.translations().twoDimensionalSlider;
		},
		get ["aria-valuetext"]() {
			return valueText();
		},
		get ["aria-orientation"]() {
			return mergedProps.orientation;
		},
		get ["aria-label"]() {
			return ariaLabel();
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
		get ["data-orientation"]() {
			return mergedProps.orientation;
		},
		"onChange": onChange
	}, () => formControlContext.dataset(), others), false);
	return _el$;
}
//#endregion
//#region src/color-area/color-area-hidden-input-x.tsx
function ColorAreaHiddenInputX(props) {
	return createComponent(ColorAreaHiddenInputBase, props);
}
//#endregion
//#region src/color-area/color-area-hidden-input-y.tsx
function ColorAreaHiddenInputY(props) {
	return createComponent(ColorAreaHiddenInputBase, mergeProps({ orientation: "vertical" }, props));
}
//#endregion
//#region src/color-area/color-area.intl.ts
const COLOR_AREA_INTL_TRANSLATIONS = {
	colorPicker: "Color picker",
	twoDimensionalSlider: "2D slider"
};
//#endregion
//#region src/color-area/create-color-area-state.ts
function createColorAreaState(props) {
	const mergedProps = merge({
		isDisabled: () => false,
		defaultValue: () => parseColor("hsl(0, 100%, 50%)")
	}, props);
	const [value, setValue] = (0, primitives_exports.createControllableSignal)({
		value: mergedProps.value,
		defaultValue: mergedProps.defaultValue,
		onChange: (value) => mergedProps.onChange?.(value)
	});
	const color = createMemo(() => {
		return mergedProps.colorSpace?.() ? value().toFormat(mergedProps.colorSpace()) : value();
	});
	const channels = createMemo(() => {
		return color().getColorSpaceAxes({
			xChannel: mergedProps.xChannel?.(),
			yChannel: mergedProps.yChannel?.()
		});
	});
	const xChannelRange = () => color().getChannelRange(channels().xChannel);
	const yChannelRange = () => color().getChannelRange(channels().yChannel);
	const xStep = () => xChannelRange().step;
	const yStep = () => yChannelRange().step;
	const xPageSize = () => xChannelRange().pageSize;
	const yPageSize = () => yChannelRange().pageSize;
	const xMaxValue = () => xChannelRange().maxValue;
	const xMinValue = () => xChannelRange().minValue;
	const yMaxValue = () => yChannelRange().maxValue;
	const yMinValue = () => yChannelRange().minValue;
	const [isDragging, setIsDragging] = createSignal(false);
	const initialValue = color();
	const resetValue = () => {
		setValue(initialValue);
	};
	const xValue = () => color().getChannelValue(channels().xChannel);
	const yValue = () => color().getChannelValue(channels().yChannel);
	const setXValue = (value) => {
		if (value === xValue()) return;
		setValue(color().withChannelValue(channels().xChannel, value));
	};
	const setYValue = (value) => {
		if (value === yValue()) return;
		setValue(color().withChannelValue(channels().yChannel, value));
	};
	const incrementX = (stepSize = 1) => {
		setXValue(xValue() + stepSize > xMaxValue() ? xMaxValue() : snapValueToStep(xValue() + stepSize, xMinValue(), xMaxValue(), xStep()));
	};
	const incrementY = (stepSize = 1) => {
		setYValue(yValue() + stepSize > yMaxValue() ? yMaxValue() : snapValueToStep(yValue() + stepSize, yMinValue(), yMaxValue(), yStep()));
	};
	const decrementX = (stepSize = 1) => {
		setXValue(snapValueToStep(xValue() - stepSize, xMinValue(), xMaxValue(), xStep()));
	};
	const decrementY = (stepSize = 1) => {
		setYValue(snapValueToStep(yValue() - stepSize, yMinValue(), yMaxValue(), yStep()));
	};
	const getThumbPosition = () => {
		return {
			x: (xValue() - xMinValue()) / (xMaxValue() - xMinValue()),
			y: (yMaxValue() - (yValue() - yMinValue())) / (yMaxValue() - yMinValue())
		};
	};
	const getValuePercent = () => {
		return {
			x: (xValue() - xMinValue()) / xMaxValue() - xMinValue(),
			y: (yValue() - yMinValue()) / yMaxValue() - yMinValue()
		};
	};
	const updateValue = (value) => {
		if (mergedProps.isDisabled()) return;
		const xSnappedValue = snapValueToStep(value.x, xMinValue(), xMaxValue(), xStep());
		const ySnappedValue = snapValueToStep(value.y, yMinValue(), yMaxValue(), yStep());
		if (xSnappedValue === xValue() && ySnappedValue === yValue()) return;
		setValue(color().withChannelValue(channels().xChannel, xSnappedValue).withChannelValue(channels().yChannel, ySnappedValue));
	};
	const setThumbPercent = (value) => {
		updateValue(getPercentValues(value.x, value.y));
	};
	const getRoundedValues = (value) => {
		return {
			x: Math.round((value.x - xMinValue()) / xStep()) * xStep() + xMinValue(),
			y: Math.round((value.y - yMinValue()) / yStep()) * yStep() + yMinValue()
		};
	};
	const getPercentValues = (xPercent, yPercent) => {
		const x = xPercent * (xMaxValue() - xMinValue()) + xMinValue();
		const y = yPercent * (yMaxValue() - yMinValue()) + yMinValue();
		const roundedValues = getRoundedValues({
			x,
			y
		});
		return {
			x: clamp(roundedValues.x, xMinValue(), xMaxValue()),
			y: clamp(roundedValues.y, yMinValue(), yMaxValue())
		};
	};
	const updateDragging = (dragging) => {
		if (mergedProps.isDisabled()) return;
		const wasDragging = isDragging();
		setIsDragging(dragging);
		if (wasDragging && !isDragging()) mergedProps.onChangeEnd?.(color());
	};
	return {
		value: color,
		xValue,
		yValue,
		xStep,
		yStep,
		xPageSize,
		yPageSize,
		xMaxValue,
		yMaxValue,
		xMinValue,
		yMinValue,
		setValue,
		setXValue,
		setYValue,
		incrementX,
		decrementX,
		incrementY,
		decrementY,
		getThumbPosition,
		isDragging,
		setIsDragging: updateDragging,
		channels,
		resetValue,
		setThumbPercent,
		setThumbValue: updateValue,
		getThumbPercent: getValuePercent,
		isDisabled: mergedProps.isDisabled
	};
}
//#endregion
//#region src/color-area/color-area-root.tsx
function ColorAreaRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const defaultId = `colorarea-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		translations: COLOR_AREA_INTL_TRANSLATIONS,
		disabled: false,
		defaultValue: parseColor("hsl(0, 100%, 50%)")
	}, props);
	const others = omit(mergedProps, "ref", "value", "defaultValue", "colorSpace", "xChannel", "yChannel", "onChange", "onChangeEnd", "translations", "xName", "yName", "disabled", ...FORM_CONTROL_PROP_NAMES);
	const { formControlContext } = createFormControl(mergedProps);
	const { direction } = useLocale();
	const [backgroundRef, setBackgroundRef] = createSignal();
	const [thumbRef, setThumbRef] = createSignal();
	const state = createColorAreaState({
		value: () => mergedProps.value,
		defaultValue: () => mergedProps.defaultValue,
		onChange: mergedProps.onChange,
		onChangeEnd: mergedProps.onChangeEnd,
		colorSpace: () => mergedProps.colorSpace,
		xChannel: () => mergedProps.xChannel,
		yChannel: () => mergedProps.yChannel,
		isDisabled: () => formControlContext.isDisabled() ?? false
	});
	createFormResetListener(ref, () => state.resetValue());
	const isLTR = () => direction() === "ltr";
	let currentPosition = null;
	const onDragStart = (value) => {
		state.setIsDragging(true);
		state.setThumbValue({
			x: value[0],
			y: context.state.yMaxValue() - value[1]
		});
		currentPosition = null;
	};
	const onDrag = ({ deltaX, deltaY }) => {
		const { width, height } = backgroundRef().getBoundingClientRect();
		if (currentPosition === null) currentPosition = {
			x: state.getThumbPercent().x * width,
			y: state.getThumbPercent().y * height
		};
		currentPosition.x += deltaX;
		currentPosition.y += -deltaY;
		const xPercent = clamp(currentPosition.x / width, 0, 1);
		const yPercent = clamp(currentPosition.y / height, 0, 1);
		state.setThumbPercent({
			x: xPercent,
			y: yPercent
		});
		mergedProps.onChange?.(state.value());
	};
	const onDragEnd = () => {
		state.setIsDragging(false);
		thumbRef()?.focus();
	};
	const getDisplayColor = () => {
		return state.value().withChannelValue("alpha", 1);
	};
	const onHomeKeyDown = (event) => {
		if (!formControlContext.isDisabled()) {
			event.preventDefault();
			event.stopPropagation();
			if (!isLTR()) state.incrementX(state.xPageSize());
			else state.decrementX(state.xPageSize());
		}
	};
	const onEndKeyDown = (event) => {
		if (!formControlContext.isDisabled()) {
			event.preventDefault();
			event.stopPropagation();
			if (!isLTR()) state.decrementX(state.xPageSize());
			else state.incrementX(state.xPageSize());
		}
	};
	const onStepKeyDown = (event) => {
		if (!formControlContext.isDisabled()) switch (event.key) {
			case "Left":
			case "ArrowLeft":
				event.preventDefault();
				event.stopPropagation();
				if (!isLTR()) state.incrementX(event.shiftKey ? state.xPageSize() : state.xStep());
				else state.decrementX(event.shiftKey ? state.xPageSize() : state.xStep());
				break;
			case "Down":
			case "ArrowDown":
				event.preventDefault();
				event.stopPropagation();
				state.decrementY(event.shiftKey ? state.yPageSize() : state.yStep());
				break;
			case "Up":
			case "ArrowUp":
				event.preventDefault();
				event.stopPropagation();
				state.incrementY(event.shiftKey ? state.yPageSize() : state.yStep());
				break;
			case "Right":
			case "ArrowRight":
				event.preventDefault();
				event.stopPropagation();
				if (!isLTR()) state.decrementX(event.shiftKey ? state.xPageSize() : state.xStep());
				else state.incrementX(event.shiftKey ? state.xPageSize() : state.xStep());
				break;
			case "Home":
				onHomeKeyDown(event);
				break;
			case "End":
				onEndKeyDown(event);
				break;
			case "PageUp":
				event.preventDefault();
				event.stopPropagation();
				state.incrementY(state.yPageSize());
				break;
			case "PageDown":
				event.preventDefault();
				event.stopPropagation();
				state.decrementY(state.yPageSize());
		}
	};
	const context = {
		state,
		xName: () => mergedProps.xName,
		yName: () => mergedProps.yName,
		onDragStart,
		onDrag,
		onDragEnd,
		translations: () => mergedProps.translations,
		getDisplayColor,
		onStepKeyDown,
		backgroundRef,
		setBackgroundRef,
		thumbRef,
		setThumbRef,
		generateId: (suffix) => `${access(mergedProps.id)}-${suffix}`
	};
	return createComponent(FormControlContext, {
		value: formControlContext,
		get children() {
			return createComponent(ColorAreaContext, {
				value: context,
				get children() {
					return createComponent(Polymorphic, mergeProps({
						as: "div",
						ref: [setRef, mergedProps.ref],
						role: "group",
						get id() {
							return access(mergedProps.id);
						}
					}, () => formControlContext.dataset(), others));
				}
			});
		}
	});
}
//#endregion
//#region src/color-area/color-area-thumb.tsx
function ColorAreaThumb(props) {
	const context = useColorAreaContext();
	const formControlContext = useFormControlContext();
	const others = omit(props, "style", "aria-label", "onKeyDown", "onPointerDown", "onPointerMove", "onPointerUp");
	const ariaLabel = () => {
		const xChannel = context.state.channels().xChannel;
		const yChannel = context.state.channels().yChannel;
		const xChannelName = `${context.state.value().getChannelName(xChannel, COLOR_INTL_TRANSLATIONS)} ${context.state.value().formatChannelValue(xChannel)}`;
		const yChannelName = `${context.state.value().getChannelName(yChannel, COLOR_INTL_TRANSLATIONS)} ${context.state.value().formatChannelValue(yChannel)}`;
		const colorName = context.state.value().getColorName(COLOR_INTL_TRANSLATIONS);
		return props["aria-label"] ?? [
			xChannelName,
			yChannelName,
			colorName
		].join(", ");
	};
	const onKeyDown = (e) => {
		callHandler(e, props.onKeyDown);
		context.onStepKeyDown(e);
	};
	let startPosition = {
		x: 0,
		y: 0
	};
	const onPointerDown = (e) => {
		callHandler(e, props.onPointerDown);
		const target = e.currentTarget;
		e.preventDefault();
		e.stopPropagation();
		target.setPointerCapture(e.pointerId);
		target.focus();
		startPosition = {
			x: e.clientX,
			y: e.clientY
		};
		context.onDragStart?.([context.state.xValue(), context.state.yMaxValue() - context.state.yValue()]);
	};
	const onPointerMove = (e) => {
		e.stopPropagation();
		callHandler(e, props.onPointerMove);
		if (e.currentTarget.hasPointerCapture(e.pointerId)) {
			const delta = {
				deltaX: e.clientX - startPosition.x,
				deltaY: e.clientY - startPosition.y
			};
			context.onDrag?.(delta);
			startPosition = {
				x: e.clientX,
				y: e.clientY
			};
		}
	};
	const onPointerUp = (e) => {
		e.stopPropagation();
		callHandler(e, props.onPointerUp);
		const target = e.currentTarget;
		if (target.hasPointerCapture(e.pointerId)) {
			target.releasePointerCapture(e.pointerId);
			context.onDragEnd?.();
		}
	};
	return createComponent(Polymorphic, mergeProps({
		as: "span",
		ref: [context.setThumbRef, props.ref],
		role: "presentation",
		get tabindex() {
			return context.state.isDisabled() ? void 0 : 0;
		},
		get style() {
			return combineStyle({
				position: "absolute",
				left: `${context.state.getThumbPosition().x * 100}%`,
				top: `${context.state.getThumbPosition().y * 100}%`,
				transform: "translate(-50%, -50%)",
				"forced-color-adjust": "none",
				"touch-action": "none",
				"--kb-color-current": context.state.value().toString()
			}, props.style);
		},
		get ["aria-label"]() {
			return ariaLabel();
		},
		onKeyDown,
		onPointerDown,
		onPointerMove,
		onPointerUp
	}, () => formControlContext.dataset(), others));
}
//#endregion
//#region src/color-area/index.tsx
const ColorArea = Object.assign(ColorAreaRoot, {
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	Label: FormControlLabel,
	Background: ColorAreaBackground,
	Thumb: ColorAreaThumb,
	HiddenInputX: ColorAreaHiddenInputX,
	HiddenInputY: ColorAreaHiddenInputY
});
//#endregion
export { ColorAreaBackground as Background, ColorArea, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, ColorAreaHiddenInputX as HiddenInputX, ColorAreaHiddenInputY as HiddenInputY, FormControlLabel as Label, ColorAreaRoot as Root, ColorAreaThumb as Thumb, useColorAreaContext };
