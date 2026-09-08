import { Polymorphic } from "../polymorphic/index.jsx";
import { t as createTagName } from "../create-tag-name/D6_aBB9R.jsx";
import { r as useFormControlContext } from "../form-control-description/Dc7vmdKW.jsx";
import { createEffect, createSignal, merge, omit } from "solid-js";
//#region src/form-control/form-control-label.tsx
/**
* The label that gives the user information on the form control.
*/
function FormControlLabel(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const context = useFormControlContext();
	const mergedProps = merge({ id: context.generateId("label") }, props);
	const others = omit(mergedProps, "ref");
	const tagName = createTagName(ref, () => "label");
	createEffect(() => others.id, (id) => context.registerLabel(id));
	return <Polymorphic as="label" ref={[setRef, mergedProps.ref]} for={tagName() === "label" ? context.fieldId() : void 0} {...context.dataset()} {...others} />;
}
//#endregion
export { FormControlLabel as t };
