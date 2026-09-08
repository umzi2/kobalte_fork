import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { t as createToggleState } from "../create-toggle-state/CF70_KE4.jsx";
import { n as button_exports } from "../button/Cw4fT4wG.jsx";
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
	return <button_exports.Root aria-pressed={state.isSelected() ? "true" : "false"} data-pressed={state.isSelected() ? "" : void 0} onClick={onClick} {...others}>
			<ToggleButtonRootChild state={{ pressed: state.isSelected }}>
				{props.children}
			</ToggleButtonRootChild>
		</button_exports.Root>;
}
function ToggleButtonRootChild(props) {
	const resolvedChildren = children(() => {
		const body = props.children;
		return typeof body === "function" ? body(props.state) : body;
	});
	return <>{resolvedChildren()}</>;
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
