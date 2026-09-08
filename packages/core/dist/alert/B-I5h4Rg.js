import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { createComponent, mergeProps } from "@solidjs/web";
//#region src/alert/alert-root.tsx
/**
* Alert displays a brief, important message
* in a way that attracts the user's attention without interrupting the user's task.
*/
function AlertRoot(props) {
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		role: "alert"
	}, props));
}
//#endregion
//#region src/alert/index.tsx
var alert_exports = /* @__PURE__ */ __exportAll({
	Alert: () => Alert,
	Root: () => AlertRoot
});
const Alert = AlertRoot;
//#endregion
export { alert_exports as n, AlertRoot as r, Alert as t };
