import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { Polymorphic } from "../polymorphic/index.jsx";
import { t as createTagName } from "../create-tag-name/D6_aBB9R.jsx";
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
	return <Polymorphic as="div" ref={[setRef, mergedProps.ref]} role={tagName() !== "hr" ? "separator" : void 0} aria-orientation={mergedProps.orientation === "vertical" ? "vertical" : void 0} data-orientation={mergedProps.orientation} data-inset={mergedProps.inset} {...others} />;
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
