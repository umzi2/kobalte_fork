import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { C as DialogOverlayProps, D as DialogDescriptionOptions, E as DialogDescriptionCommonProps, F as DialogCloseButton, I as DialogCloseButtonCommonProps, L as DialogCloseButtonOptions, M as DialogContentOptions, O as DialogDescriptionProps, P as DialogContentRenderProps, R as DialogCloseButtonProps, S as DialogOverlayOptions, T as DialogDescription, _ as DialogRootProps, a as DialogTrigger, b as DialogOverlay, c as DialogTriggerProps, d as DialogTitleCommonProps, f as DialogTitleOptions, g as DialogRootOptions, h as DialogRoot, j as DialogContentCommonProps, k as DialogDescriptionRenderProps, l as DialogTriggerRenderProps, m as DialogTitleRenderProps, o as DialogTriggerCommonProps, p as DialogTitleProps, s as DialogTriggerOptions, u as DialogTitle, v as DialogPortal, w as DialogOverlayRenderProps, x as DialogOverlayCommonProps, y as DialogPortalProps, z as DialogCloseButtonRenderProps } from "./f8UOK3dK.js";
import { ValidComponent } from "@solidjs/web";
//#region src/alert-dialog/alert-dialog-content.d.ts
interface AlertDialogContentOptions extends DialogContentOptions {}
interface AlertDialogContentCommonProps<T extends HTMLElement = HTMLElement> extends DialogContentCommonProps<T> {}
interface AlertDialogContentRenderProps extends AlertDialogContentCommonProps, DialogContentRenderProps {
  role: "alertdialog";
}
type AlertDialogContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = AlertDialogContentOptions & Partial<AlertDialogContentCommonProps<ElementOf<T>>>;
/**
 * Overrides the regular `Dialog.Content` with role="alertdialog" to interrupt the user.
 */
declare function AlertDialogContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, AlertDialogContentProps<T>>): import("@solidjs/web").JSX.Element;
declare namespace index_d_exports {
  export { AlertDialog, DialogCloseButtonCommonProps as AlertDialogCloseButtonCommonProps, DialogCloseButtonOptions as AlertDialogCloseButtonOptions, DialogCloseButtonProps as AlertDialogCloseButtonProps, DialogCloseButtonRenderProps as AlertDialogCloseButtonRenderProps, AlertDialogContentCommonProps, AlertDialogContentOptions, AlertDialogContentProps, AlertDialogContentRenderProps, DialogDescriptionCommonProps as AlertDialogDescriptionCommonProps, DialogDescriptionOptions as AlertDialogDescriptionOptions, DialogDescriptionProps as AlertDialogDescriptionProps, DialogDescriptionRenderProps as AlertDialogDescriptionRenderProps, DialogOverlayCommonProps as AlertDialogOverlayCommonProps, DialogOverlayOptions as AlertDialogOverlayOptions, DialogOverlayProps as AlertDialogOverlayProps, DialogOverlayRenderProps as AlertDialogOverlayRenderProps, DialogPortalProps as AlertDialogPortalProps, DialogRootOptions as AlertDialogRootOptions, DialogRootProps as AlertDialogRootProps, DialogTitleCommonProps as AlertDialogTitleCommonProps, DialogTitleOptions as AlertDialogTitleOptions, DialogTitleProps as AlertDialogTitleProps, DialogTitleRenderProps as AlertDialogTitleRenderProps, DialogTriggerCommonProps as AlertDialogTriggerCommonProps, DialogTriggerOptions as AlertDialogTriggerOptions, DialogTriggerProps as AlertDialogTriggerProps, DialogTriggerRenderProps as AlertDialogTriggerRenderProps, DialogCloseButton as CloseButton, AlertDialogContent as Content, DialogDescription as Description, DialogOverlay as Overlay, DialogPortal as Portal, DialogRoot as Root, DialogTitle as Title, DialogTrigger as Trigger };
}
declare const AlertDialog: typeof DialogRoot & {
  CloseButton: typeof DialogCloseButton;
  Content: typeof AlertDialogContent;
  Description: typeof DialogDescription;
  Overlay: typeof DialogOverlay;
  Portal: typeof DialogPortal;
  Title: typeof DialogTitle;
  Trigger: typeof DialogTrigger;
};
//#endregion
export { AlertDialogContentOptions as a, AlertDialogContentCommonProps as i, index_d_exports as n, AlertDialogContentProps as o, AlertDialogContent as r, AlertDialogContentRenderProps as s, AlertDialog as t };