import { Polymorphic } from "../polymorphic/index.js";
import { createComponent, mergeProps } from "@solidjs/web";
import { createEffect, merge } from "solid-js";
import { FormControlContext, createFormControl, useFormControl as useFormControlContext } from "@solid-primitives/a11y";
//#region src/form-control/create-form-control.tsx
const FORM_CONTROL_PROP_NAMES = [
	"id",
	"name",
	"validationState",
	"required",
	"disabled",
	"readOnly"
];
function createFormControl$1(props) {
	return { formControlContext: createFormControl(props) };
}
//#endregion
//#region src/form-control/form-control-description.tsx
/**
* The description that gives the user more information on the form control.
*/
function FormControlDescription(props) {
	const context = useFormControlContext();
	const mergedProps = merge({ id: context.generateId("description") }, props);
	createEffect(() => mergedProps.id, (id) => context.registerDescription(id));
	return createComponent(Polymorphic, mergeProps({ as: "div" }, () => context.dataset(), mergedProps));
}
//#endregion
export { createFormControl$1 as a, FORM_CONTROL_PROP_NAMES as i, FormControlContext as n, useFormControlContext as r, FormControlDescription as t };
