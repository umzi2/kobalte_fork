import { Polymorphic } from "../polymorphic/index.jsx";
import { t as FormControlDescription } from "../form-control-description/Dc7vmdKW.jsx";
import { t as FormControlErrorMessage } from "../form-control-error-message/B1cNIdVV.jsx";
import { a as RadioGroupItemLabel, c as RadioGroupItemDescription, d as useRadioGroupItemContext, f as useRadioGroupContext, i as RadioGroupLabel, l as RadioGroupItemControl, s as RadioGroupItemIndicator, t as RadioGroup } from "../radio-group/DRQrpUVl.jsx";
import { combineStyle } from "@solid-primitives/props";
import { createContext, createEffect, createSignal, merge, omit, untrack, useContext } from "solid-js";
import { createFormResetListener } from "@solid-primitives/form";
import { createResizeObserver } from "@solid-primitives/resize-observer";
//#region src/segmented-control/segmented-control-context.tsx
const SegmentedControlContext = createContext();
function useSegmentedControlContext() {
	const context = useContext(SegmentedControlContext);
	if (context === void 0) throw new Error("[kobalte]: `useSegmentedControlContext` must be used within a `SegmentedControl` component");
	return context;
}
//#endregion
//#region src/segmented-control/segmented-control-indicator.tsx
function SegmentedControlIndicator(props) {
	const context = useSegmentedControlContext();
	const otherProps = omit(props, "style");
	const [style, setStyle] = createSignal();
	const [resizing, setResizing] = createSignal(false);
	const computeStyle = (element) => {
		const el = element ?? context.selectedItem();
		if (!el) {
			setStyle(void 0);
			return;
		}
		const rect = el.getBoundingClientRect();
		setStyle({
			width: `${rect.width}px`,
			height: `${rect.height}px`,
			transform: computeTransform(el),
			"transition-duration": resizing() ? "0ms" : void 0
		});
	};
	const computeTransform = (element) => {
		const rootEl = context.root();
		if (!rootEl) return void 0;
		const rootRect = rootEl.getBoundingClientRect();
		const itemRect = element.getBoundingClientRect();
		return `translate(${itemRect.left - rootRect.left}px, ${itemRect.top - rootRect.top}px)`;
	};
	createEffect(() => context.selectedItem(), (element) => {
		setResizing(!untrack(style));
		computeStyle(element);
		setResizing(false);
	});
	createResizeObserver(context.root, () => {
		setResizing(true);
		computeStyle();
		setResizing(false);
	});
	return <Polymorphic as="div" role="presentation" style={combineStyle(style(), props.style)} data-resizing={resizing()} data-orientation={context.orientation()} {...otherProps} />;
}
//#endregion
//#region src/segmented-control/segmented-control-item.tsx
const SegmentedControlItem = (props) => {
	const radioGroupContext = useRadioGroupContext();
	const segmentedControlContext = useSegmentedControlContext();
	const otherProps = omit(props, "ref");
	const [ref, setRef] = createSignal();
	createEffect(() => {
		const element = ref();
		return element && radioGroupContext.isSelectedValue(props.value) ? element : void 0;
	}, (element) => {
		if (element) segmentedControlContext.setSelectedItem(element);
	});
	return <RadioGroup.Item ref={[setRef, props.ref]} {...otherProps} />;
};
//#endregion
//#region src/segmented-control/segmented-control-item-input.tsx
const SegmentedControlItemInput = (props) => {
	const radioGroupItemContext = useRadioGroupItemContext();
	const otherProps = omit(props, "ref");
	const [ref, setRef] = createSignal();
	createFormResetListener(ref, () => {
		requestAnimationFrame(() => {
			if (radioGroupItemContext.isDefault()) radioGroupItemContext.select();
		});
	});
	return <RadioGroup.ItemInput ref={[setRef, props.ref]} {...otherProps} />;
};
//#endregion
//#region src/segmented-control/segmented-control-root.tsx
const SegmentedControlRoot = (props) => {
	const mergedProps = merge({
		defaultValue: props.value,
		orientation: "horizontal"
	}, props);
	const otherProps = omit(mergedProps, "ref");
	const [ref, setRef] = createSignal();
	const [selectedItem, setSelectedItem] = createSignal();
	const context = {
		value: () => otherProps.value,
		defaultValue: () => otherProps.defaultValue,
		orientation: () => otherProps.orientation,
		root: ref,
		selectedItem,
		setSelectedItem
	};
	createEffect(() => context.value(), (value, prev) => {
		if (prev !== void 0 && !value) setSelectedItem(void 0);
	});
	return <SegmentedControlContext value={context}>
			<RadioGroup ref={[setRef, mergedProps.ref]} {...otherProps} />
		</SegmentedControlContext>;
};
//#endregion
//#region src/segmented-control/index.tsx
const SegmentedControl = Object.assign(SegmentedControlRoot, {
	Description: FormControlDescription,
	ErrorMessage: FormControlErrorMessage,
	Indicator: SegmentedControlIndicator,
	Item: SegmentedControlItem,
	ItemControl: RadioGroupItemControl,
	ItemDescription: RadioGroupItemDescription,
	ItemIndicator: RadioGroupItemIndicator,
	ItemInput: SegmentedControlItemInput,
	ItemLabel: RadioGroupItemLabel,
	Label: RadioGroupLabel
});
//#endregion
export { FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, SegmentedControlIndicator as Indicator, SegmentedControlItem as Item, RadioGroupItemControl as ItemControl, RadioGroupItemDescription as ItemDescription, RadioGroupItemIndicator as ItemIndicator, SegmentedControlItemInput as ItemInput, RadioGroupItemLabel as ItemLabel, RadioGroupLabel as Label, SegmentedControlRoot as Root, SegmentedControl, useSegmentedControlContext };
