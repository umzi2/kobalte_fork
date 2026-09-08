import { visuallyHiddenStyles } from "@kobalte/utils";
//#region src/live-announcer/live-announcer.tsx
const LIVEREGION_TIMEOUT_DELAY = 7e3;
let liveAnnouncer = null;
const DATA_LIVE_ANNOUNCER_ATTR = "data-live-announcer";
/**
* Announces the message using screen reader technology.
*/
function announce(message, assertiveness = "assertive", timeout = LIVEREGION_TIMEOUT_DELAY) {
	if (!liveAnnouncer) liveAnnouncer = new LiveAnnouncer();
	liveAnnouncer.announce(message, assertiveness, timeout);
}
/**
* Stops all queued announcements.
*/
function clearAnnouncer(assertiveness) {
	if (liveAnnouncer) liveAnnouncer.clear(assertiveness);
}
/**
* Removes the announcer from the DOM.
*/
function destroyAnnouncer() {
	if (liveAnnouncer) {
		liveAnnouncer.destroy();
		liveAnnouncer = null;
	}
}
var LiveAnnouncer = class {
	node;
	assertiveLog;
	politeLog;
	constructor() {
		this.node = document.createElement("div");
		this.node.dataset.liveAnnouncer = "true";
		Object.assign(this.node.style, visuallyHiddenStyles);
		this.assertiveLog = this.createLog("assertive");
		this.node.appendChild(this.assertiveLog);
		this.politeLog = this.createLog("polite");
		this.node.appendChild(this.politeLog);
		document.body.prepend(this.node);
	}
	createLog(ariaLive) {
		const node = document.createElement("div");
		node.setAttribute("role", "log");
		node.setAttribute("aria-live", ariaLive);
		node.setAttribute("aria-relevant", "additions");
		return node;
	}
	destroy() {
		if (!this.node) return;
		document.body.removeChild(this.node);
		this.node = null;
	}
	announce(message, assertiveness = "assertive", timeout = LIVEREGION_TIMEOUT_DELAY) {
		if (!this.node) return;
		const node = document.createElement("div");
		node.textContent = message;
		if (assertiveness === "assertive") this.assertiveLog.appendChild(node);
		else this.politeLog.appendChild(node);
		if (message !== "") setTimeout(() => {
			node.remove();
		}, timeout);
	}
	clear(assertiveness) {
		if (!this.node) return;
		if (!assertiveness || assertiveness === "assertive") this.assertiveLog.innerHTML = "";
		if (!assertiveness || assertiveness === "polite") this.politeLog.innerHTML = "";
	}
};
//#endregion
export { destroyAnnouncer as i, announce as n, clearAnnouncer as r, DATA_LIVE_ANNOUNCER_ATTR as t };
