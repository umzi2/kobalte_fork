import { Dynamic, createComponent, mergeProps } from "@solidjs/web";
import { omit, untrack } from "solid-js";
//#region src/polymorphic/polymorphic.tsx
/**
* A utility component that render its `as` prop.
*/
function Polymorphic(props) {
	const others = omit(props, "as");
	if (!untrack(() => props.as)) throw new Error("[kobalte]: Polymorphic is missing the required `as` prop.");
	return createComponent(Dynamic, mergeProps(others, { get component() {
		return props.as;
	} }));
}
//#endregion
export { Polymorphic };
