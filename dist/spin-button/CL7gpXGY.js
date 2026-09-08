import { Polymorphic } from "../polymorphic/index.js";
import { n as announce, r as clearAnnouncer } from "../live-announcer/DugqoFo-.js";
import { t as SPIN_BUTTON_INTL_TRANSLATIONS } from "../spin-button.intl/2mELFbs9.js";
import { createComponent, memo, mergeProps } from "@solidjs/web";
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
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		role: "spinbutton",
		get style() {
			return combineStyle({ "touch-action": "none" }, mergedProps.style || void 0);
		},
		get ["aria-valuenow"]() {
			return memo(() => !!(mergedProps.value != null && !Number.isNaN(mergedProps.value)))() ? mergedProps.value : void 0;
		},
		get ["aria-valuetext"]() {
			return textValue();
		},
		get ["aria-valuemin"]() {
			return mergedProps.minValue;
		},
		get ["aria-valuemax"]() {
			return mergedProps.maxValue;
		},
		get ["aria-required"]() {
			return props.required ? "true" : void 0;
		},
		get ["aria-disabled"]() {
			return props.disabled ? "true" : void 0;
		},
		get ["aria-readonly"]() {
			return props.readOnly ? "true" : void 0;
		},
		get ["aria-invalid"]() {
			return mergedProps.validationState === "invalid" ? "true" : void 0;
		}
	}, others, {
		onKeyDown,
		onFocus,
		onBlur
	}));
}
//#endregion
//#region src/spin-button/index.tsx
const SpinButton = SpinButtonRoot;
//#endregion
export { SpinButtonRoot as n, SpinButton as t };
