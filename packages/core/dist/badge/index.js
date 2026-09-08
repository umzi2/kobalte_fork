import { Polymorphic } from "../polymorphic/index.js";
import { createComponent, mergeProps } from "@solidjs/web";
import { omit } from "solid-js";
//#region src/badge/badge-root.tsx
function BadgeRoot(props) {
	const others = omit(props, "textValue", "aria-label");
	return createComponent(Polymorphic, mergeProps({
		as: "span",
		role: "status",
		get ["aria-label"]() {
			return props["aria-label"] ?? props.textValue;
		}
	}, others));
}
//#endregion
//#region src/badge/index.tsx
const Badge = BadgeRoot;
//#endregion
export { Badge, BadgeRoot as Root };
