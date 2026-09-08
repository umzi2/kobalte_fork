import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as createTagName } from "../create-tag-name/D6_aBB9R.js";
import { createComponent, memo, mergeProps } from "@solidjs/web";
import { createSignal, omit } from "solid-js";
//#region src/link/link-root.tsx
/**
* Link allows a user to navigate to another page or resource within a web page or application.
*/
function LinkRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const others = omit(props, "ref", "href", "disabled");
	const tagName = createTagName(ref, () => "a");
	return createComponent(Polymorphic, mergeProps({
		as: "a",
		ref: [setRef, props.ref],
		get role() {
			return tagName() !== "a" || props.disabled ? "link" : void 0;
		},
		get tabindex() {
			return tagName() !== "a" && !props.disabled ? 0 : void 0;
		},
		get href() {
			return memo(() => !props.disabled)() ? props.href : void 0;
		},
		get ["aria-disabled"]() {
			return props.disabled ? "true" : void 0;
		},
		get ["data-disabled"]() {
			return props.disabled ? "" : void 0;
		}
	}, others));
}
//#endregion
//#region src/link/index.tsx
var link_exports = /* @__PURE__ */ __exportAll({
	Link: () => Link,
	Root: () => LinkRoot
});
const Link = LinkRoot;
//#endregion
export { link_exports as n, LinkRoot as r, Link as t };
