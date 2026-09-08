import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { ValidComponent } from "@solidjs/web";
import { Ref } from "solid-js";
import { CreateFormControlInputProps as CreateFormControlFieldProps, CreateFormControlProps, FormControlContext, FormControlContextValue, FormControlDataSet, createFormControl, createFormControlInput as createFormControlField, useFormControl as useFormControlContext } from "@solid-primitives/a11y";
//#region src/form-control/create-form-control.d.ts
declare const FORM_CONTROL_PROP_NAMES: readonly ["id", "name", "validationState", "required", "disabled", "readOnly"];
declare function createFormControl$1(props: Parameters<typeof createFormControl>[0]): {
  formControlContext: import("@solid-primitives/a11y").FormControlContextValue;
};
//#endregion
//#region src/form-control/create-form-control-field.d.ts
declare const FORM_CONTROL_FIELD_PROP_NAMES: readonly ["id", "aria-label", "aria-labelledby", "aria-describedby"];
//#endregion
//#region src/form-control/form-control-description.d.ts
interface FormControlDescriptionOptions {}
interface FormControlDescriptionCommonProps {
  id: string;
}
interface FormControlDescriptionRenderProps extends FormControlDescriptionCommonProps, FormControlDataSet {}
type FormControlDescriptionProps = FormControlDescriptionOptions & Partial<FormControlDescriptionCommonProps>;
/**
 * The description that gives the user more information on the form control.
 */
declare function FormControlDescription<T extends ValidComponent = "div">(props: PolymorphicProps<T, FormControlDescriptionProps>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/form-control/form-control-error-message.d.ts
interface FormControlErrorMessageOptions {
  /**
   * Used to force mounting when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
}
interface FormControlErrorMessageCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface FormControlErrorMessageRenderProps extends FormControlErrorMessageCommonProps, FormControlDataSet {}
type FormControlErrorMessageProps<T extends ValidComponent | HTMLElement = HTMLElement> = FormControlErrorMessageOptions & Partial<FormControlErrorMessageCommonProps<ElementOf<T>>>;
/**
 * The error message that gives the user information about how to fix a validation error on the form control.
 */
declare function FormControlErrorMessage<T extends ValidComponent = "div">(props: PolymorphicProps<T, FormControlErrorMessageProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/form-control/form-control-label.d.ts
interface FormControlLabelOptions {}
interface FormControlLabelCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
}
interface FormControlLabelRenderProps extends FormControlLabelCommonProps, FormControlDataSet {
  for: string | undefined;
}
type FormControlLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = FormControlLabelOptions & Partial<FormControlLabelCommonProps<ElementOf<T>>>;
/**
 * The label that gives the user information on the form control.
 */
declare function FormControlLabel<T extends ValidComponent = "label">(props: PolymorphicProps<T, FormControlLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
export { CreateFormControlProps as C, createFormControlField as S, createFormControl$1 as T, FormControlContextValue as _, FormControlLabelRenderProps as a, CreateFormControlFieldProps as b, FormControlErrorMessageOptions as c, FormControlDescription as d, FormControlDescriptionCommonProps as f, FormControlContext as g, FormControlDescriptionRenderProps as h, FormControlLabelProps as i, FormControlErrorMessageProps as l, FormControlDescriptionProps as m, FormControlLabelCommonProps as n, FormControlErrorMessage as o, FormControlDescriptionOptions as p, FormControlLabelOptions as r, FormControlErrorMessageCommonProps as s, FormControlLabel as t, FormControlErrorMessageRenderProps as u, FormControlDataSet as v, FORM_CONTROL_PROP_NAMES as w, FORM_CONTROL_FIELD_PROP_NAMES as x, useFormControlContext as y };