import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { ValidComponent } from "@solidjs/web";
//#region src/alert/alert-root.d.ts
interface AlertRootOptions {}
interface AlertRootCommonProps<_T extends HTMLElement = HTMLElement> {}
interface AlertRootRenderProps extends AlertRootCommonProps {
  role: "alert";
}
type AlertRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = AlertRootOptions & Partial<AlertRootCommonProps<ElementOf<T>>>;
/**
 * Alert displays a brief, important message
 * in a way that attracts the user's attention without interrupting the user's task.
 */
declare function AlertRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, AlertRootProps<T>>): import("@solidjs/web").JSX.Element;
declare namespace index_d_exports {
  export { Alert, AlertRootCommonProps, AlertRootOptions, AlertRootProps, AlertRootRenderProps, AlertRoot as Root };
}
declare const Alert: typeof AlertRoot;
//#endregion
export { AlertRootOptions as a, AlertRootCommonProps as i, index_d_exports as n, AlertRootProps as o, AlertRoot as r, AlertRootRenderProps as s, Alert as t };