import { createToggleState } from "@solid-primitives/controlled-signal";
import { access } from "@solid-primitives/utils";
//#region src/primitives/create-toggle-state/create-toggle-state.ts
/**
* Provides state management for toggle components like checkboxes and switches.
*/
function createToggleState$1(props = {}) {
	return createToggleState({
		isSelected: () => access(props.isSelected),
		defaultIsSelected: () => access(props.defaultIsSelected),
		isDisabled: () => access(props.isDisabled),
		isReadOnly: () => access(props.isReadOnly),
		onSelectedChange: props.onSelectedChange
	});
}
//#endregion
export { createToggleState$1 as t };
