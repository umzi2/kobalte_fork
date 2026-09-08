import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { Polymorphic } from "../polymorphic/index.jsx";
import { n as announce, r as clearAnnouncer } from "../live-announcer/DugqoFo-.jsx";
import { t as SPIN_BUTTON_INTL_TRANSLATIONS } from "../spin-button.intl/2mELFbs9.jsx";
import { combineStyle } from "@solid-primitives/props";
import { createEffect, createMemo, merge, omit } from "solid-js";
import { callHandler } from "@kobalte/utils";
//#region src/spin-button/spin-button-root.tsx
function SpinButtonRoot(props) {
	const mergedProps = merge({ translations: SPIN_BUTTON_INTL_TRANSLATIONS }, props);
	const others = omit(mergedProps, "style", "translations", "value", "textValue", "minValue", "maxValue", "validationState", "onIncrement", "onIncrementPage", "onDecrement", "onDecrementPage", "onDecrementToMin", "onIncrementToMax", "onKeyDown", "onFocus", "onBlur");
	let isFocused = false;
	const textValue = createMemo(() => {
		if (mergedProps.textValue === "") return mergedProps.translations?.empty;
		return (mergedProps.textValue || `${mergedProps.value}`).replace("-", "−");
	});
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || props.readOnly) return;
		switch (e.key) {
			case "PageUp": if (mergedProps.onIncrementPage) {
				e.preventDefault();
				mergedProps.onIncrementPage();
				break;
			}
			case "ArrowUp":
			case "Up":
				if (mergedProps.onIncrement) {
					e.preventDefault();
					mergedProps.onIncrement();
				}
				break;
			case "PageDown": if (mergedProps.onDecrementPage) {
				e.preventDefault();
				mergedProps.onDecrementPage();
				break;
			}
			case "ArrowDown":
			case "Down":
				if (mergedProps.onDecrement) {
					e.preventDefault();
					mergedProps.onDecrement();
				}
				break;
			case "Home":
				if (mergedProps.onDecrementToMin) {
					e.preventDefault();
					mergedProps.onDecrementToMin();
				}
				break;
			case "End": if (mergedProps.onIncrementToMax) {
				e.preventDefault();
				mergedProps.onIncrementToMax();
			}
		}
	};
	const onFocus = (e) => {
		callHandler(e, mergedProps.onFocus);
		isFocused = true;
	};
	const onBlur = (e) => {
		callHandler(e, mergedProps.onBlur);
		isFocused = false;
	};
	createEffect(() => textValue(), (textValue) => {
		if (isFocused) {
			clearAnnouncer("assertive");
			announce(textValue ?? "", "assertive");
		}
	}, { defer: true });
	return <Polymorphic as="div" role="spinbutton" style={combineStyle({ "touch-action": "none" }, mergedProps.style || void 0)} aria-valuenow={mergedProps.value != null && !Number.isNaN(mergedProps.value) ? mergedProps.value : void 0} aria-valuetext={textValue()} aria-valuemin={mergedProps.minValue} aria-valuemax={mergedProps.maxValue} aria-required={props.required ? "true" : void 0} aria-disabled={props.disabled ? "true" : void 0} aria-readonly={props.readOnly ? "true" : void 0} aria-invalid={mergedProps.validationState === "invalid" ? "true" : void 0} {...others} onKeyDown={onKeyDown} onFocus={onFocus} onBlur={onBlur} />;
}
//#endregion
//#region src/spin-button/index.tsx
var spin_button_exports = /* @__PURE__ */ __exportAll({
	Root: () => SpinButtonRoot,
	SpinButton: () => SpinButton
});
const SpinButton = SpinButtonRoot;
//#endregion
export { spin_button_exports as n, SpinButtonRoot as r, SpinButton as t };
