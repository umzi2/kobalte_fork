import { Polymorphic } from "../polymorphic/index.jsx";
import { r as useFormControlContext } from "../form-control-description/Dc7vmdKW.jsx";
import { Show, createEffect, merge, omit } from "solid-js";
//#region src/form-control/form-control-error-message.tsx
/**
* The error message that gives the user information about how to fix a validation error on the form control.
*/
function FormControlErrorMessage(props) {
	const context = useFormControlContext();
	const mergedProps = merge({ id: context.generateId("error-message") }, props);
	const others = omit(mergedProps, "forceMount");
	const isInvalid = () => context.validationState() === "invalid";
	createEffect(() => isInvalid() ? others.id : void 0, (id) => {
		if (!id) return;
		return context.registerErrorMessage(id);
	});
	return <Show when={mergedProps.forceMount || isInvalid()}>
			<Polymorphic as="div" {...context.dataset()} {...others} />
		</Show>;
}
//#endregion
export { FormControlErrorMessage as t };
