import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as createTagName } from "../create-tag-name/D6_aBB9R.js";
import { createComponent, mergeProps } from "@solidjs/web";
import { createSignal, merge, omit } from "solid-js";
//#region src/separator/separator-root.tsx
/**
* A separator visually or semantically separates content.
*/
function SeparatorRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const mergedProps = merge({ orientation: "horizontal" }, props);
	const others = omit(mergedProps, "ref", "orientation");
	const tagName = createTagName(ref, () => "hr");
	return createComponent(Polymorphic, mergeProps({
		as: "hr",
		ref: [setRef, mergedProps.ref],
		get role() {
			return tagName() !== "hr" ? "separator" : void 0;
		},
		get ["aria-orientation"]() {
			return mergedProps.orientation === "vertical" ? "vertical" : void 0;
		},
		get ["data-orientation"]() {
			return mergedProps.orientation;
		}
	}, others));
}
//#endregion
//#region src/separator/index.tsx
var separator_exports = /* @__PURE__ */ __exportAll({
	Root: () => SeparatorRoot,
	Separator: () => Separator
});
const Separator = SeparatorRoot;
//#endregion
export { separator_exports as n, SeparatorRoot as r, Separator as t };
