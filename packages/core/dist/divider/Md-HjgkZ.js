import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as createTagName } from "../create-tag-name/D6_aBB9R.js";
import { createComponent, mergeProps } from "@solidjs/web";
import { createSignal, merge, omit } from "solid-js";
//#region src/divider/divider-root.tsx
/**
* A thin line, with optional content (e.g. text or an icon), that groups
* content in lists and layouts.
*/
function DividerRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const mergedProps = merge({ orientation: "horizontal" }, props);
	const others = omit(mergedProps, "ref", "orientation", "inset");
	const tagName = createTagName(ref, () => "div");
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		ref: [setRef, mergedProps.ref],
		get role() {
			return tagName() !== "hr" ? "separator" : void 0;
		},
		get ["aria-orientation"]() {
			return mergedProps.orientation === "vertical" ? "vertical" : void 0;
		},
		get ["data-orientation"]() {
			return mergedProps.orientation;
		},
		get ["data-inset"]() {
			return mergedProps.inset;
		}
	}, others));
}
//#endregion
//#region src/divider/index.tsx
var divider_exports = /* @__PURE__ */ __exportAll({
	Divider: () => Divider,
	Root: () => DividerRoot
});
const Divider = DividerRoot;
//#endregion
export { divider_exports as n, DividerRoot as r, Divider as t };
