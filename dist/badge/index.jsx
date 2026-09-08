import { Polymorphic } from "../polymorphic/index.jsx";
import { omit } from "solid-js";
//#region src/badge/badge-root.tsx
function BadgeRoot(props) {
	const others = omit(props, "textValue", "aria-label");
	return <Polymorphic as="span" role="status" aria-label={props["aria-label"] ?? props.textValue} {...others} />;
}
//#endregion
//#region src/badge/index.tsx
const Badge = BadgeRoot;
//#endregion
export { Badge, BadgeRoot as Root };
