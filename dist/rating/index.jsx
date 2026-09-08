import { Polymorphic } from "../polymorphic/index.jsx";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.jsx";
import { t as primitives_exports } from "../primitives/BlSoAAAV.jsx";
import { useLocale } from "../i18n/index.jsx";
import { n as createDomCollection, t as createDomCollectionItem } from "../create-dom-collection/F5MPGch0.jsx";
import { a as createFormControl, i as FORM_CONTROL_PROP_NAMES, n as FormControlContext, r as useFormControlContext, t as FormControlDescription } from "../form-control-description/Dc7vmdKW.jsx";
import { t as FormControlErrorMessage } from "../form-control-error-message/B1cNIdVV.jsx";
import { t as FormControlLabel } from "../form-control-label/Czoesrj9.jsx";
import { combineStyle } from "@solid-primitives/props";
import { children, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { callHandler, visuallyHiddenStyles } from "@kobalte/utils";
import { createFormResetListener } from "@solid-primitives/form";
//#region src/rating/rating-context.tsx
const RatingContext = createContext();
function useRatingContext() {
	const context = useContext(RatingContext);
	if (context === void 0) throw new Error("[kobalte]: `useRatingContext` must be used within a `Rating` component");
	return context;
}
//#endregion
//#region src/rating/rating-control.tsx
function RatingControl(props) {
	const formControlContext = useFormControlContext();
	const context = useRatingContext();
	const defaultId = `${formControlContext.generateId("control")}`;
	const mergedProps = merge({ id: defaultId }, props);
	const others = omit(mergedProps, "onPointerLeave");
	const onPointerLeave = (e) => {
		if (formControlContext.isDisabled() || formControlContext.isReadOnly()) return;
		callHandler(e, mergedProps.onPointerLeave);
		if (e.pointerType === "touch") return;
		context.setHoveredValue(-1);
	};
	return <Polymorphic as="div" role="presentation" onPointerLeave={onPointerLeave} {...others} />;
}
//#endregion
//#region src/rating/rating-hidden-input.tsx
function RatingHiddenInput(props) {
	const formControlContext = useFormControlContext();
	const context = useRatingContext();
	return <input type="text" tabindex={-1} style={visuallyHiddenStyles} name={formControlContext.name()} value={context.value()} required={formControlContext.isRequired()} disabled={formControlContext.isDisabled()} readonly={formControlContext.isReadOnly()} {...props} />;
}
//#endregion
//#region src/rating/rating-item-context.tsx
const RatingItemContext = createContext();
function useRatingItemContext() {
	const context = useContext(RatingItemContext);
	if (context === void 0) throw new Error("[kobalte]: `useRatingItemContext` must be used within a `Rating.Item` component");
	return context;
}
//#endregion
//#region src/rating/utils.ts
function clamp$1(value) {
	return Math.max(0, Math.min(1, value));
}
function pointFromTouch(e, type = "client") {
	const point = e.touches[0] || e.changedTouches[0];
	return {
		x: point[`${type}X`],
		y: point[`${type}Y`]
	};
}
function pointFromMouse(point, type = "client") {
	return {
		x: point[`${type}X`],
		y: point[`${type}Y`]
	};
}
const isTouchEvent = (event) => "touches" in event && event.touches.length > 0;
function getEventPoint(event, type = "client") {
	return isTouchEvent(event) ? pointFromTouch(event, type) : pointFromMouse(event, type);
}
function getRelativePoint(point, element) {
	const { left, top, width, height } = element.getBoundingClientRect();
	const offset = {
		x: point.x - left,
		y: point.y - top
	};
	const percent = {
		x: clamp$1(offset.x / width),
		y: clamp$1(offset.y / height)
	};
	function getPercentValue(options = {}) {
		const { dir = "ltr", orientation = "horizontal", inverted } = options;
		const invertX = typeof inverted === "object" ? inverted.x : inverted;
		const invertY = typeof inverted === "object" ? inverted.y : inverted;
		if (orientation === "horizontal") return dir === "rtl" || invertX ? 1 - percent.x : percent.x;
		return invertY ? 1 - percent.y : percent.y;
	}
	return {
		offset,
		percent,
		getPercentValue
	};
}
//#endregion
//#region src/rating/rating-item.tsx
function RatingItem(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const formControlContext = useFormControlContext();
	const RatingContext = useRatingContext();
	const defaultId = `${formControlContext.generateId("item")}-${createUniqueId()}`;
	const mergedProps = merge({ id: defaultId }, props);
	const others = omit(mergedProps, "ref", "aria-labelledby", "aria-describedby", "onClick", "onKeyDown", "onPointerMove");
	createDomCollectionItem({ getItem: () => ({
		ref,
		disabled: formControlContext.isDisabled(),
		key: others.id,
		textValue: "",
		type: "item"
	}) });
	const ariaLabelledBy = () => {
		return [
			mergedProps["aria-labelledby"],
			labelId(),
			mergedProps["aria-labelledby"] != null && others["aria-label"] != null ? others.id : void 0
		].filter(Boolean).join(" ") || void 0;
	};
	const ariaDescribedBy = () => {
		return [
			mergedProps["aria-describedby"],
			descriptionId(),
			RatingContext.ariaDescribedBy()
		].filter(Boolean).join(" ") || void 0;
	};
	const { direction } = useLocale();
	const isLTR = () => direction() === "ltr";
	const [labelId, setLabelId] = createSignal(void 0, { ownedWrite: true });
	const [descriptionId, setDescriptionId] = createSignal(void 0, { ownedWrite: true });
	const index = () => ref() ? RatingContext.items().findIndex((v) => v.ref() === ref()) : -1;
	const value = createMemo(() => {
		const items = RatingContext.items();
		if (!ref()) return void 0;
		const i = items.findIndex((v) => v.ref() === ref());
		if (i === -1) return void 0;
		return direction() === "ltr" ? i + 1 : items.length - i;
	});
	const newValue = () => RatingContext.isHovering() ? RatingContext.hoveredValue() : RatingContext.value();
	const equal = () => Math.ceil(newValue()) === value();
	const highlighted = () => {
		const v = value();
		return v !== void 0 && (v <= newValue() || equal());
	};
	const half = () => equal() && Math.abs(newValue() - value()) === .5;
	const tabIndex = () => {
		if (formControlContext.isDisabled()) return void 0;
		if (formControlContext.isReadOnly()) equal();
		return equal() ? 0 : -1;
	};
	const focusItem = (index) => RatingContext.items()[Math.round(index)].ref().focus();
	const setPrevValue = () => {
		const factor = RatingContext.allowHalf() ? .5 : 1;
		const value = Math.max(0, RatingContext.value() - factor);
		RatingContext.setValue(value);
		focusItem(Math.max(value - 1, 0));
	};
	const setNextValue = () => {
		const factor = RatingContext.allowHalf() ? .5 : 1;
		const value = Math.min(RatingContext.items().length, (RatingContext.value() === -1 ? 0 : RatingContext.value()) + factor);
		RatingContext.setValue(value);
		focusItem(value - 1);
	};
	const onClick = (e) => {
		callHandler(e, mergedProps.onClick);
		const value = RatingContext.hoveredValue() === -1 ? index() + 1 : RatingContext.hoveredValue();
		RatingContext.setValue(value);
		RatingContext.setHoveredValue(-1);
		focusItem(value - 1);
	};
	const onPointerMove = (e) => {
		if (formControlContext.isDisabled() || formControlContext.isReadOnly()) return;
		callHandler(e, mergedProps.onPointerMove);
		const isMidway = getRelativePoint(getEventPoint(e), e.currentTarget).getPercentValue({
			orientation: RatingContext.orientation(),
			dir: direction()
		}) < .5;
		const factor = RatingContext.allowHalf() && isMidway ? .5 : 0;
		RatingContext.setHoveredValue(value() - factor);
	};
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		switch (e.key) {
			case "ArrowLeft":
			case "ArrowUp":
				e.preventDefault();
				if (isLTR()) setPrevValue();
				else setNextValue();
				break;
			case "ArrowRight":
			case "ArrowDown":
				e.preventDefault();
				if (isLTR()) setNextValue();
				else setPrevValue();
				break;
			case " ":
				e.preventDefault();
				RatingContext.setValue(newValue());
				break;
			case "Home":
				e.preventDefault();
				RatingContext.setValue(1);
				break;
			case "End":
				e.preventDefault();
				RatingContext.setValue(RatingContext.items().length);
		}
	};
	const dataset = createMemo(() => ({
		...formControlContext.dataset(),
		"data-checked": equal() ? "" : void 0,
		"data-half": half() ? "" : void 0,
		"data-highlighted": highlighted() ? "" : void 0
	}));
	const context = {
		state: {
			highlighted,
			half
		},
		dataset,
		generateId: (suffix) => `${others.id}-${suffix}`,
		itemId: () => others.id,
		registerLabel: createRegisterId(setLabelId),
		registerDescription: createRegisterId(setDescriptionId)
	};
	return <RatingItemContext value={context}>
			<Polymorphic as="div" ref={[setRef, mergedProps.ref]} role="radio" tabindex={tabIndex()} aria-checked={equal() ? "true" : "false"} aria-required={formControlContext.isRequired() ? "true" : void 0} aria-disabled={formControlContext.isDisabled() ? "true" : void 0} aria-readonly={formControlContext.isReadOnly() ? "true" : void 0} aria-labelledby={ariaLabelledBy()} aria-describedby={ariaDescribedBy()} onClick={onClick} onPointerMove={onPointerMove} onKeyDown={onKeyDown} {...dataset()} {...others} />
		</RatingItemContext>;
}
//#endregion
//#region src/rating/rating-item-control.tsx
function RatingItemControl(props) {
	const context = useRatingItemContext();
	const defaultId = `${context.generateId("control")}`;
	const mergedProps = merge({ id: defaultId }, props);
	const others = omit(mergedProps, "children");
	return <Polymorphic as="div" role="presentation" {...others}>
			<RatingItemControlChild state={{
		highlighted: context.state.highlighted,
		half: context.state.half
	}}>
				{mergedProps.children}
			</RatingItemControlChild>
		</Polymorphic>;
}
function RatingItemControlChild(props) {
	const resolvedChildren = children(() => {
		const body = props.children;
		return typeof body === "function" ? body(props.state) : body;
	});
	return <>{resolvedChildren()}</>;
}
//#endregion
//#region src/rating/rating-item-description.tsx
function RatingItemDescription(props) {
	const context = useRatingItemContext();
	const mergedProps = merge({ id: context.generateId("description") }, props);
	createEffect(() => mergedProps.id, (id) => context.registerDescription(id));
	return <Polymorphic as="div" {...context.dataset()} {...mergedProps} />;
}
//#endregion
//#region src/rating/rating-item-label.tsx
function RatingItemLabel(props) {
	const context = useRatingItemContext();
	const mergedProps = merge({ id: context.generateId("label") }, props);
	const others = omit(mergedProps, "style");
	createEffect(() => others.id, (id) => context.registerLabel(id));
	return <Polymorphic as="label" for={context.itemId()} style={combineStyle(visuallyHiddenStyles, mergedProps.style)} {...context.dataset()} {...others} />;
}
//#endregion
//#region src/rating/rating-label.tsx
function RatingLabel(props) {
	return <FormControlLabel as="span" {...props} />;
}
//#endregion
//#region src/rating/rating-root.tsx
function RatingRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const defaultId = `Rating-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		orientation: "horizontal"
	}, props);
	const formControlProps = omit(mergedProps, "ref", "value", "defaultValue", "onChange", "allowHalf", "orientation", "aria-labelledby", "aria-describedby");
	const others = omit(mergedProps, "ref", "value", "defaultValue", "onChange", "allowHalf", "orientation", "aria-labelledby", "aria-describedby", ...FORM_CONTROL_PROP_NAMES);
	const [items, setItems] = createSignal([]);
	const { DomCollectionProvider } = createDomCollection({
		items,
		onItemsChange: setItems
	});
	const [hoveredValue, setHoveredValue] = createSignal(-1);
	const [value, setValue] = (0, primitives_exports.createControllableSignal)({
		value: () => mergedProps.value,
		defaultValue: () => mergedProps.defaultValue ?? 0,
		onChange: (value) => mergedProps.onChange?.(value)
	});
	const { formControlContext } = createFormControl(formControlProps);
	createFormResetListener(ref, () => setValue(mergedProps.defaultValue));
	const ariaLabelledBy = () => {
		return formControlContext.getAriaLabelledBy(access(mergedProps.id), others["aria-label"], mergedProps["aria-labelledby"]);
	};
	const ariaDescribedBy = () => {
		return formControlContext.getAriaDescribedBy(mergedProps["aria-describedby"]);
	};
	const context = {
		value,
		setValue: (newValue) => {
			if (formControlContext.isReadOnly() || formControlContext.isDisabled()) return;
			setValue(newValue);
		},
		allowHalf: () => mergedProps.allowHalf,
		orientation: () => mergedProps.orientation,
		hoveredValue,
		setHoveredValue,
		isHovering: () => hoveredValue() > -1,
		ariaDescribedBy,
		items,
		setItems
	};
	return <DomCollectionProvider>
			<FormControlContext value={formControlContext}>
				<RatingContext value={context}>
					<Polymorphic as="div" ref={[setRef, mergedProps.ref]} role="radiogroup" id={access(mergedProps.id)} aria-invalid={formControlContext.validationState() === "invalid" ? "true" : void 0} aria-required={formControlContext.isRequired() ? "true" : void 0} aria-disabled={formControlContext.isDisabled() ? "true" : void 0} aria-readonly={formControlContext.isReadOnly() ? "true" : void 0} aria-orientation={mergedProps.orientation} aria-labelledby={ariaLabelledBy()} aria-describedby={ariaDescribedBy()} {...formControlContext.dataset()} {...others} />
				</RatingContext>
			</FormControlContext>
		</DomCollectionProvider>;
}
//#endregion
//#region src/rating/index.tsx
const Rating = Object.assign(RatingRoot, {
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	Control: RatingControl,
	HiddenInput: RatingHiddenInput,
	ItemControl: RatingItemControl,
	ItemDescription: RatingItemDescription,
	ItemLabel: RatingItemLabel,
	Item: RatingItem,
	Label: RatingLabel
});
//#endregion
export { RatingControl as Control, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, RatingHiddenInput as HiddenInput, RatingItem as Item, RatingItemControl as ItemControl, RatingItemDescription as ItemDescription, RatingItemLabel as ItemLabel, RatingLabel as Label, Rating, RatingRoot as Root };
