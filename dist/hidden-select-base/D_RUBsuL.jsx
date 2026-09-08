import { c as isSameSelection } from "../create-list-state/B3LSQwLh.jsx";
import { r as useFormControlContext } from "../form-control-description/Dc7vmdKW.jsx";
import { For, Show, createEffect, createSignal, omit, untrack } from "solid-js";
import { callHandler, visuallyHiddenStyles } from "@kobalte/utils";
//#region src/select/hidden-select-base.tsx
/**
* Renders a hidden native `<select>` element, which can be used to support browser
* form autofill, mobile form navigation, and native form submission.
*/
function HiddenSelectBase(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const others = omit(props, "ref", "onChange", "collection", "selectionManager", "isOpen", "isMultiple", "isVirtualized", "focusTrigger");
	const formControlContext = useFormControlContext();
	let isInternalChangeEvent = false;
	const renderOption = (key) => {
		const item = props.collection.getItem(key);
		return <Show when={item?.type === "item"}>
				<option value={key} selected={props.selectionManager.isSelected(key)}>
					{item?.textValue}
				</option>
			</Show>;
	};
	createEffect(() => props.selectionManager.selectedKeys(), (keys, prevKeys) => {
		if (prevKeys && isSameSelection(keys, prevKeys)) return;
		isInternalChangeEvent = true;
		untrack(ref)?.dispatchEvent(new Event("input", {
			bubbles: true,
			cancelable: true
		}));
		untrack(ref)?.dispatchEvent(new Event("change", {
			bubbles: true,
			cancelable: true
		}));
	}, { defer: true });
	return <div style={visuallyHiddenStyles} aria-hidden="true">
			<input type="text" tabindex={props.selectionManager.isFocused() || props.isOpen ? -1 : 0} style={{ "font-size": "16px" }} required={formControlContext.isRequired()} disabled={formControlContext.isDisabled()} readonly={formControlContext.isReadOnly()} onFocus={() => props.focusTrigger()} />
			<select ref={[setRef, props.ref]} tabindex={-1} multiple={props.isMultiple} name={formControlContext.name()} required={formControlContext.isRequired()} disabled={formControlContext.isDisabled()} size={props.collection.getSize()} value={props.selectionManager.firstSelectedKey() ?? ""} onChange={(e) => {
		callHandler(e, props.onChange);
		if (!isInternalChangeEvent) props.selectionManager.setSelectedKeys(/* @__PURE__ */ new Set([e.target.value]));
		isInternalChangeEvent = false;
	}} {...others}>
				<option />
				<Show when={props.isVirtualized} fallback={<For each={[...props.collection.getKeys()]}>{renderOption}</For>}>
					<For each={[...props.selectionManager.selectedKeys()]}>
						{renderOption}
					</For>
				</Show>
			</select>
		</div>;
}
//#endregion
export { HiddenSelectBase as t };
