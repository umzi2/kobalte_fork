import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { Polymorphic } from "../polymorphic/index.jsx";
import { t as createTagName } from "../create-tag-name/D6_aBB9R.jsx";
import { createSignal, omit } from "solid-js";
//#region src/link/link-root.tsx
/**
* Link allows a user to navigate to another page or resource within a web page or application.
*/
function LinkRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const others = omit(props, "ref", "href", "disabled");
	const tagName = createTagName(ref, () => "a");
	return <Polymorphic as="a" ref={[setRef, props.ref]} role={tagName() !== "a" || props.disabled ? "link" : void 0} tabindex={tagName() !== "a" && !props.disabled ? 0 : void 0} href={!props.disabled ? props.href : void 0} aria-disabled={props.disabled ? "true" : void 0} data-disabled={props.disabled ? "" : void 0} {...others} />;
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
