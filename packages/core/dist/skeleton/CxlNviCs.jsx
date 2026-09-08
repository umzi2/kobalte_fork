import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { Polymorphic } from "../polymorphic/index.jsx";
import { combineStyle } from "@solid-primitives/props";
import { createUniqueId, merge, omit } from "solid-js";
//#region src/skeleton/skeleton-root.tsx
function Skeleton$1(props) {
	const defaultId = `skeleton-${createUniqueId()}`;
	const mergedProps = merge({
		visible: true,
		animate: true,
		id: defaultId
	}, props);
	const others = omit(mergedProps, "style", "radius", "animate", "height", "width", "visible", "circle");
	return <Polymorphic as="div" role="group" data-animate={mergedProps.animate || void 0} data-visible={mergedProps.visible || void 0} style={combineStyle({
		"border-radius": mergedProps.circle ? "9999px" : mergedProps.radius ? `${mergedProps.radius}px` : void 0,
		width: mergedProps.circle ? `${mergedProps.height}px` : mergedProps.width ? `${mergedProps.width}px` : "100%",
		height: mergedProps.height ? `${mergedProps.height}px` : "auto"
	}, mergedProps.style)} {...others} />;
}
//#endregion
//#region src/skeleton/index.tsx
var skeleton_exports = /* @__PURE__ */ __exportAll({
	Root: () => Skeleton$1,
	Skeleton: () => Skeleton
});
const Skeleton = Skeleton$1;
//#endregion
export { skeleton_exports as n, Skeleton$1 as r, Skeleton as t };
