import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { t as createToggleState } from "../create-toggle-state/CF70_KE4.js";
import { r as ButtonRoot } from "../button/C_WaGidW.js";
import { createComponent, memo, mergeProps } from "@solidjs/web";
import { children, omit } from "solid-js";
import { callHandler } from "@kobalte/utils";
//#region src/toggle-button/toggle-button-root.tsx
/**
* A two-state button that allow users to toggle a selection on or off.
* This component is based on the [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
*/
function ToggleButtonRoot(props) {
	const p = props;
	const others = omit(p, "children", "pressed", "defaultPressed", "onChange", "onClick");
	const state = createToggleState({
		isSelected: () => props.pressed,
		defaultIsSelected: () => props.defaultPressed,
		onSelectedChange: (selected) => props.onChange?.(selected),
		isDisabled: () => others.disabled
	});
	const onClick = (e) => {
		callHandler(e, p.onClick);
		state.toggle();
	};
	return createComponent(ButtonRoot, mergeProps({
		get ["aria-pressed"]() {
			return state.isSelected() ? "true" : "false";
		},
		get ["data-pressed"]() {
			return state.isSelected() ? "" : void 0;
		},
		onClick
	}, others, { get children() {
		return createComponent(ToggleButtonRootChild, {
			get state() {
				return { pressed: state.isSelected };
			},
			get children() {
				return props.children;
			}
		});
	} }));
}
function ToggleButtonRootChild(props) {
	const resolvedChildren = children(() => {
		const body = props.children;
		return typeof body === "function" ? body(props.state) : body;
	});
	return memo(resolvedChildren);
}
//#endregion
//#region src/toggle-button/index.tsx
var toggle_button_exports = /* @__PURE__ */ __exportAll({
	Root: () => ToggleButtonRoot,
	ToggleButton: () => ToggleButton
});
const ToggleButton = ToggleButtonRoot;
//#endregion
export { toggle_button_exports as n, ToggleButtonRoot as r, ToggleButton as t };
