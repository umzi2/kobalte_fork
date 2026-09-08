import { Polymorphic } from "../polymorphic/index.jsx";
import { t as primitives_exports } from "../primitives/BlSoAAAV.jsx";
import { useLocale } from "../i18n/index.jsx";
import { a as createFormControl, i as FORM_CONTROL_PROP_NAMES, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/Dc7vmdKW.jsx";
import { n as createFormControlField, t as FORM_CONTROL_FIELD_PROP_NAMES } from "../create-form-control-field/5-BHfdGI.jsx";
import { t as FormControlErrorMessage } from "../form-control-error-message/B1cNIdVV.jsx";
import { t as FormControlLabel } from "../form-control-label/Czoesrj9.jsx";
import { combineStyle } from "@solid-primitives/props";
import { createContext, createMemo, createSignal, createUniqueId, merge, omit, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { callHandler, visuallyHiddenStyles } from "@kobalte/utils";
import { createFormResetListener } from "@solid-primitives/form";
import { createElementSize } from "@solid-primitives/resize-observer";
import { COLOR_INTL_TRANSLATIONS, parseColor } from "@solid-primitives/utils/colors";
//#region src/color-wheel/color-wheel-context.tsx
const ColorWheelContext = createContext();
function useColorWheelContext() {
	const context = useContext(ColorWheelContext);
	if (context === void 0) throw new Error("[kobalte]: `useColorWheelContext` must be used within a `ColorWheel` component");
	return context;
}
//#endregion
//#region src/color-wheel/color-wheel-input.tsx
function ColorWheelInput(props) {
	const formControlContext = useFormControlContext();
	const context = useColorWheelContext();
	const mergedProps = merge({ id: context.generateId("input") }, props);
	const formControlFieldProps = omit(mergedProps, "style", "onChange");
	const others = omit(mergedProps, "style", "onChange", ...FORM_CONTROL_FIELD_PROP_NAMES);
	const { fieldProps } = createFormControlField(formControlFieldProps);
	const onChange = (e) => {
		callHandler(e, mergedProps.onChange);
		const target = e.target;
		context.state.setHue(Number.parseFloat(target.value));
		target.value = String(context.state.hue()) ?? "";
	};
	return <input type="range" id={fieldProps.id()} name={formControlContext.name()} tabindex={context.state.isDisabled() ? void 0 : -1} min={context.state.minValue()} max={context.state.maxValue()} step={context.state.step()} value={context.state.hue()} required={formControlContext.isRequired()} disabled={formControlContext.isDisabled()} readonly={formControlContext.isReadOnly()} style={combineStyle({ ...visuallyHiddenStyles }, mergedProps.style)} aria-valuetext={context.getThumbValueLabel()} aria-label={fieldProps.ariaLabel()} aria-labelledby={fieldProps.ariaLabelledBy()} aria-describedby={fieldProps.ariaDescribedBy()} aria-invalid={formControlContext.validationState() === "invalid" ? "true" : void 0} aria-disabled={formControlContext.isDisabled() ? "true" : void 0} aria-readonly={formControlContext.isReadOnly() ? "true" : void 0} onChange={onChange} {...formControlContext.dataset()} {...others} />;
}
//#endregion
//#region src/color-wheel/utils.ts
function roundToStep(value, step) {
	return Math.round(value / step) * step;
}
function mod(n, m) {
	return (n % m + m) % m;
}
function roundDown(v) {
	const r = Math.floor(v);
	if (r === v) return v - 1;
	return r;
}
function degToRad(deg) {
	return deg * Math.PI / 180;
}
function radToDeg(rad) {
	return rad * 180 / Math.PI;
}
function angleToCartesian(angle, radius) {
	const rad = degToRad(360 - angle + 90);
	return {
		x: Math.sin(rad) * radius,
		y: Math.cos(rad) * radius
	};
}
function cartesianToAngle(x, y, radius) {
	return (radToDeg(Math.atan2(y / radius, x / radius)) + 360) % 360;
}
//#endregion
//#region src/color-wheel/create-color-wheel-state.ts
function createColorWheelState(props) {
	const mergedProps = merge({ isDisabled: () => false }, props);
	const defaultValue = createMemo(() => {
		return mergedProps.defaultValue() ?? parseColor("hsl(0, 100%, 50%)");
	});
	const [value, setValue] = (0, primitives_exports.createControllableSignal)({
		value: mergedProps.value,
		defaultValue,
		onChange: (value) => mergedProps.onChange?.(value)
	});
	const color = createMemo(() => {
		const colorSpace = value().getColorSpace();
		return colorSpace === "hsl" || colorSpace === "hsb" ? value() : value().toFormat("hsl");
	});
	const channelRange = () => color().getChannelRange("hue");
	const step = () => channelRange().step;
	const pageSize = () => channelRange().pageSize;
	const maxValue = () => channelRange().maxValue;
	const minValue = () => channelRange().minValue;
	const [isDragging, setIsDragging] = createSignal(false);
	const resetValue = () => {
		setValue(defaultValue());
	};
	const hue = () => color().getChannelValue("hue");
	const setHue = (value) => {
		let newValue = value > 360 ? 0 : value;
		newValue = roundToStep(mod(newValue, 360), step());
		if (hue() !== newValue) setValue(color().withChannelValue("hue", newValue));
	};
	const increment = (stepSize = 1) => {
		const newStepSize = Math.max(stepSize, step());
		let newValue = hue() + newStepSize;
		if (newValue >= maxValue()) newValue = minValue();
		setHue(roundToStep(mod(newValue, 360), newStepSize));
	};
	const decrement = (stepSize = 1) => {
		const newStepSize = Math.max(stepSize, step());
		if (hue() === 0) setHue(roundDown(360 / newStepSize) * newStepSize);
		else setHue(roundToStep(mod(hue() - newStepSize, 360), newStepSize));
	};
	const getThumbPosition = () => angleToCartesian(hue(), mergedProps.thumbRadius());
	const setThumbValue = (x, y, radius) => {
		if (mergedProps.isDisabled()) return;
		setHue(cartesianToAngle(x, y, radius));
	};
	const updateDragging = (dragging) => {
		if (mergedProps.isDisabled()) return;
		const wasDragging = isDragging();
		setIsDragging(dragging);
		if (wasDragging && !isDragging()) mergedProps.onChangeEnd?.(color());
	};
	return {
		value: color,
		setValue,
		hue,
		setHue,
		step,
		pageSize,
		maxValue,
		minValue,
		increment,
		decrement,
		getThumbPosition,
		setThumbValue,
		isDragging,
		setIsDragging: updateDragging,
		resetValue,
		isDisabled: mergedProps.isDisabled
	};
}
//#endregion
//#region src/color-wheel/color-wheel-root.tsx
function ColorWheelRoot(props) {
	const [ref, setRef] = createSignal();
	const defaultId = `colorwheel-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		getValueLabel: (param) => param.formatChannelValue("hue"),
		translations: COLOR_INTL_TRANSLATIONS,
		disabled: false,
		thickness: 30
	}, props);
	const formControlProps = omit(mergedProps, "ref", "value", "defaultValue", "thickness", "onChange", "onChangeEnd", "getValueLabel", "translations");
	const others = omit(mergedProps, "ref", "value", "defaultValue", "thickness", "onChange", "onChangeEnd", "getValueLabel", "translations", ...FORM_CONTROL_PROP_NAMES);
	const { formControlContext } = createFormControl(formControlProps);
	const { direction } = useLocale();
	const [trackRef, setTrackRef] = createSignal();
	const [thumbRef, setThumbRef] = createSignal();
	const size = createElementSize(trackRef);
	const outerRadius = createMemo(() => {
		if (size.width === null) return void 0;
		return size.width / 2;
	});
	const thumbRadius = () => (139.75 - mergedProps.thickness / 100 * 70) * outerRadius() / 140;
	const state = createColorWheelState({
		value: () => mergedProps.value,
		defaultValue: () => mergedProps.defaultValue,
		thumbRadius,
		onChange: mergedProps.onChange,
		onChangeEnd: mergedProps.onChangeEnd,
		isDisabled: () => formControlContext.isDisabled() ?? false
	});
	createFormResetListener(ref, () => state.resetValue());
	const isLTR = () => direction() === "ltr";
	let currentPosition = null;
	const onDragStart = (value) => {
		state.setIsDragging(true);
		state.setThumbValue(value[0], value[1], Math.sqrt(value[0] * value[0] + value[1] * value[1]));
		currentPosition = null;
	};
	const onDrag = ({ deltaX, deltaY }) => {
		if (currentPosition === null) currentPosition = state.getThumbPosition();
		currentPosition.x += deltaX;
		currentPosition.y += deltaY;
		state.setThumbValue(currentPosition.x, currentPosition.y, thumbRadius());
		mergedProps.onChange?.(state.value());
	};
	const onDragEnd = () => {
		state.setIsDragging(false);
		thumbRef()?.focus();
	};
	const getThumbValueLabel = () => `${state.value().formatChannelValue("hue")}, ${context.state.value().getHueName(mergedProps.translations)}`;
	const onHomeKeyDown = (event) => {
		if (!formControlContext.isDisabled()) {
			event.preventDefault();
			event.stopPropagation();
			state.setHue(state.minValue());
		}
	};
	const onEndKeyDown = (event) => {
		if (!formControlContext.isDisabled()) {
			event.preventDefault();
			event.stopPropagation();
			state.setHue(state.maxValue());
		}
	};
	const onStepKeyDown = (event) => {
		if (!formControlContext.isDisabled()) switch (event.key) {
			case "Left":
			case "ArrowLeft":
				event.preventDefault();
				event.stopPropagation();
				if (!isLTR()) state.increment(event.shiftKey ? state.pageSize() : state.step());
				else state.decrement(event.shiftKey ? state.pageSize() : state.step());
				break;
			case "Down":
			case "ArrowDown":
				event.preventDefault();
				event.stopPropagation();
				state.decrement(event.shiftKey ? state.pageSize() : state.step());
				break;
			case "Up":
			case "ArrowUp":
				event.preventDefault();
				event.stopPropagation();
				state.increment(event.shiftKey ? state.pageSize() : state.step());
				break;
			case "Right":
			case "ArrowRight":
				event.preventDefault();
				event.stopPropagation();
				if (!isLTR()) state.decrement(event.shiftKey ? state.pageSize() : state.step());
				else state.increment(event.shiftKey ? state.pageSize() : state.step());
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
				state.increment(state.pageSize());
				break;
			case "PageDown":
				event.preventDefault();
				event.stopPropagation();
				state.decrement(state.pageSize());
		}
	};
	const context = {
		state,
		outerRadius,
		thickness: () => mergedProps.thickness,
		onDragStart,
		onDrag,
		onDragEnd,
		getThumbValueLabel,
		getValueLabel: mergedProps.getValueLabel,
		onStepKeyDown,
		trackRef,
		setTrackRef,
		thumbRef,
		setThumbRef,
		generateId: (suffix) => `${access(formControlProps.id)}-${suffix}`
	};
	return <FormControlContext value={formControlContext}>
			<ColorWheelContext value={context}>
				<Polymorphic as="div" ref={[setRef, mergedProps.ref]} role="group" id={access(formControlProps.id)} {...formControlContext.dataset()} {...others} />
			</ColorWheelContext>
		</FormControlContext>;
}
//#endregion
//#region src/color-wheel/color-wheel-thumb.tsx
function ColorWheelThumb(props) {
	const context = useColorWheelContext();
	const formControlContext = useFormControlContext();
	const mergedProps = merge({ id: context.generateId("thumb") }, props);
	const formControlFieldProps = omit(mergedProps, "style", "onKeyDown", "onPointerDown", "onPointerMove", "onPointerUp");
	const others = omit(mergedProps, "style", "onKeyDown", "onPointerDown", "onPointerMove", "onPointerUp", ...FORM_CONTROL_FIELD_PROP_NAMES);
	const { fieldProps } = createFormControlField(formControlFieldProps);
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		context.onStepKeyDown(e);
	};
	const [sRect, setRect] = createSignal();
	const getValueFromPointer = (pointerPosition) => {
		const rect = sRect() || context.trackRef().getBoundingClientRect();
		setRect(rect);
		return [pointerPosition.x - rect.left - rect.width / 2, pointerPosition.y - rect.top - rect.height / 2];
	};
	let startPosition = {
		x: 0,
		y: 0
	};
	const onPointerDown = (e) => {
		callHandler(e, mergedProps.onPointerDown);
		const target = e.currentTarget;
		e.preventDefault();
		e.stopPropagation();
		target.setPointerCapture(e.pointerId);
		target.focus();
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
		e.stopPropagation();
		callHandler(e, mergedProps.onPointerMove);
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
		callHandler(e, mergedProps.onPointerUp);
		const target = e.currentTarget;
		if (target.hasPointerCapture(e.pointerId)) {
			target.releasePointerCapture(e.pointerId);
			context.onDragEnd?.();
		}
	};
	return <Polymorphic as="span" ref={[context.setThumbRef, props.ref]} role="slider" id={fieldProps.id()} tabindex={context.state.isDisabled() ? void 0 : 0} style={combineStyle({
		position: "absolute",
		left: `${context.outerRadius() + context.state.getThumbPosition().x}px`,
		top: `${context.outerRadius() + context.state.getThumbPosition().y}px`,
		transform: "translate(-50%, -50%)",
		"forced-color-adjust": "none",
		"touch-action": "none",
		opacity: context.outerRadius() ? 1 : 0,
		transition: "opacity .1s linear",
		"--kb-color-current": context.state.value().toString()
	}, mergedProps.style)} aria-valuetext={context.getThumbValueLabel()} aria-valuemin={context.state.minValue()} aria-valuenow={context.state.hue()} aria-valuemax={context.state.maxValue()} aria-label={fieldProps.ariaLabel()} aria-labelledby={fieldProps.ariaLabelledBy()} aria-describedby={fieldProps.ariaDescribedBy()} onKeyDown={onKeyDown} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} {...formControlContext.dataset()} {...others} />;
}
//#endregion
//#region src/color-wheel/color-wheel-track.tsx
function ColorWheelTrack(props) {
	const context = useColorWheelContext();
	const formControlContext = useFormControlContext();
	const others = omit(props, "style", "onPointerDown", "onPointerMove", "onPointerUp");
	const [sRect, setRect] = createSignal();
	const getValueFromPointer = (pointerPosition) => {
		const rect = sRect() || context.trackRef().getBoundingClientRect();
		setRect(rect);
		return [pointerPosition.x - rect.left - rect.width / 2, pointerPosition.y - rect.top - rect.height / 2];
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
	const backgroundStyle = `
      conic-gradient(
        from 90deg,
				${[...Array(13).keys()].map((i) => `hsl(${i * 30} 100% 50%)`).join(",")}
      )
    `;
	return <Polymorphic as="div" ref={[context.setTrackRef, props.ref]} style={combineStyle({
		"touch-action": "none",
		"forced-color-adjust": "none",
		background: backgroundStyle,
		"clip-path": "circle(50%)",
		mask: `radial-gradient(#0000 ${70 - context.thickness() / 100 * 70}%, #000 ${70.5 - context.thickness() / 100 * 70}%)`
	}, props.style)} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} {...formControlContext.dataset()} {...others} />;
}
//#endregion
//#region src/color-wheel/color-wheel-value-label.tsx
function ColorWheelValueLabel(props) {
	const context = useColorWheelContext();
	const formControlContext = useFormControlContext();
	return <Polymorphic as="div" {...formControlContext.dataset()} {...props}>
			{context.getValueLabel(context.state.value())}
		</Polymorphic>;
}
//#endregion
//#region src/color-wheel/index.tsx
const ColorWheel = Object.assign(ColorWheelRoot, {
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	Input: ColorWheelInput,
	Label: FormControlLabel,
	Thumb: ColorWheelThumb,
	Track: ColorWheelTrack,
	ValueLabel: ColorWheelValueLabel
});
//#endregion
export { ColorWheel, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, ColorWheelInput as Input, FormControlLabel as Label, ColorWheelRoot as Root, ColorWheelThumb as Thumb, ColorWheelTrack as Track, ColorWheelValueLabel as ValueLabel, useColorWheelContext };
