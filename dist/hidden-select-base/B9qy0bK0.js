import { c as isSameSelection } from "../create-list-state/_aAsgQr7.js";
import { r as useFormControlContext } from "../form-control-description/BQ1mcKaU.js";
import { createComponent, effect, insert, mergeProps, ref, setAttribute, spread, style, template } from "@solidjs/web";
import { For, Show, createEffect, createSignal, omit, untrack } from "solid-js";
import { callHandler, visuallyHiddenStyles } from "@kobalte/utils";
//#region src/select/hidden-select-base.tsx
var _tmpl$ = /*#__PURE__*/ template(`<option>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div aria-hidden=true><input type=text style=font-size:16px><select><option>`);
/**
* Renders a hidden native `<select>` element, which can be used to support browser
* form autofill, mobile form navigation, and native form submission.
*/
function HiddenSelectBase(props) {
	const [ref$1, setRef] = createSignal(void 0, { ownedWrite: true });
	const others = omit(props, "ref", "onChange", "collection", "selectionManager", "isOpen", "isMultiple", "isVirtualized", "focusTrigger");
	const formControlContext = useFormControlContext();
	let isInternalChangeEvent = false;
	const renderOption = (key) => {
		const item = props.collection.getItem(key);
		return createComponent(Show, {
			get when() {
				return item?.type === "item";
			},
			get children() {
				var _el$ = _tmpl$();
				_el$.value = key;
				insert(_el$, () => item?.textValue);
				effect(() => props.selectionManager.isSelected(key), (_v$) => {
					_el$.selected = _v$;
				});
				return _el$;
			}
		});
	};
	createEffect(() => props.selectionManager.selectedKeys(), (keys, prevKeys) => {
		if (prevKeys && isSameSelection(keys, prevKeys)) return;
		isInternalChangeEvent = true;
		untrack(ref$1)?.dispatchEvent(new Event("input", {
			bubbles: true,
			cancelable: true
		}));
		untrack(ref$1)?.dispatchEvent(new Event("change", {
			bubbles: true,
			cancelable: true
		}));
	}, { defer: true });
	var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling;
	_el$4.firstChild;
	_el$3.addEventListener("focus", () => props.focusTrigger());
	ref(() => [setRef, props.ref], _el$4);
	spread(_el$4, mergeProps({
		"tabindex": -1,
		get multiple() {
			return props.isMultiple;
		},
		get name() {
			return formControlContext.name();
		},
		get required() {
			return formControlContext.isRequired();
		},
		get disabled() {
			return formControlContext.isDisabled();
		},
		get size() {
			return props.collection.getSize();
		},
		get value() {
			return props.selectionManager.firstSelectedKey() ?? "";
		},
		"onChange": (e) => {
			callHandler(e, props.onChange);
			if (!isInternalChangeEvent) props.selectionManager.setSelectedKeys(/* @__PURE__ */ new Set([e.target.value]));
			isInternalChangeEvent = false;
		}
	}, others), true);
	insert(_el$4, createComponent(Show, {
		get when() {
			return props.isVirtualized;
		},
		get fallback() {
			return createComponent(For, {
				get each() {
					return [...props.collection.getKeys()];
				},
				children: renderOption
			});
		},
		get children() {
			return createComponent(For, {
				get each() {
					return [...props.selectionManager.selectedKeys()];
				},
				children: renderOption
			});
		}
	}), null);
	effect(() => ({
		e: visuallyHiddenStyles,
		t: props.selectionManager.isFocused() || props.isOpen ? -1 : 0,
		a: formControlContext.isRequired(),
		o: formControlContext.isDisabled(),
		i: formControlContext.isReadOnly()
	}), ({ e, t, a, o, i }, _p$) => {
		style(_el$2, e, _p$?.e);
		t !== _p$?.t && setAttribute(_el$3, "tabindex", t);
		a !== _p$?.a && setAttribute(_el$3, "required", a);
		o !== _p$?.o && setAttribute(_el$3, "disabled", o);
		i !== _p$?.i && setAttribute(_el$3, "readonly", i);
	});
	return _el$2;
}
//#endregion
export { HiddenSelectBase as t };
