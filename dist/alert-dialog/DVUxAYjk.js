import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { a as DialogRoot, c as DialogDescription, i as DialogTitle, l as DialogContent, o as DialogPortal, r as DialogTrigger, s as DialogOverlay, u as DialogCloseButton } from "../dialog/BOdIttv5.js";
import { createComponent, mergeProps } from "@solidjs/web";
//#region src/alert-dialog/alert-dialog-content.tsx
/**
* Overrides the regular `Dialog.Content` with role="alertdialog" to interrupt the user.
*/
function AlertDialogContent(props) {
	return createComponent(DialogContent, mergeProps({ role: "alertdialog" }, props));
}
//#endregion
//#region src/alert-dialog/index.tsx
var alert_dialog_exports = /* @__PURE__ */ __exportAll({
	AlertDialog: () => AlertDialog,
	CloseButton: () => DialogCloseButton,
	Content: () => AlertDialogContent,
	Description: () => DialogDescription,
	Overlay: () => DialogOverlay,
	Portal: () => DialogPortal,
	Root: () => DialogRoot,
	Title: () => DialogTitle,
	Trigger: () => DialogTrigger
});
const AlertDialog = Object.assign(DialogRoot, {
	CloseButton: DialogCloseButton,
	Content: AlertDialogContent,
	Description: DialogDescription,
	Overlay: DialogOverlay,
	Portal: DialogPortal,
	Title: DialogTitle,
	Trigger: DialogTrigger
});
//#endregion
export { alert_dialog_exports as n, AlertDialogContent as r, AlertDialog as t };
