import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.js";
import { r as ButtonRoot } from "../button/C_WaGidW.js";
import { t as DATA_TOP_LAYER_ATTR } from "../layer-stack/DUp9FXTP.js";
import { createComponent, isServer, mergeProps } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { For, Show, createContext, createEffect, createMemo, createSignal, createStore, createUniqueId, merge, omit, onSettled, untrack, useContext } from "solid-js";
import { createPresence } from "@solid-primitives/presence";
import { callHandler } from "@kobalte/utils";
//#region src/toast/toast-context.tsx
const ToastContext = createContext();
function useToastContext() {
	const context = useContext(ToastContext);
	if (context === void 0) throw new Error("[kobalte]: `useToastContext` must be used within a `Toast.Root` component");
	return context;
}
//#endregion
//#region src/toast/toast-close-button.tsx
/**
* The button that closes the toast.
*/
function ToastCloseButton(props) {
	const context = useToastContext();
	const others = omit(props, "aria-label", "onClick");
	const onClick = (e) => {
		callHandler(e, props.onClick);
		context.close();
	};
	return createComponent(ButtonRoot, mergeProps({
		get ["aria-label"]() {
			return props["aria-label"] || context.translations().close;
		},
		onClick
	}, others));
}
//#endregion
//#region src/toast/toast-description.tsx
/**
* An optional accessible description to be announced when the toast is open.
*/
function ToastDescription(props) {
	const context = useToastContext();
	const mergedProps = merge({ id: context.generateId("description") }, props);
	const others = omit(mergedProps, "id");
	createEffect(() => mergedProps.id, (id) => context.registerDescriptionId(id));
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		get id() {
			return mergedProps.id;
		}
	}, others));
}
//#endregion
//#region src/toast/toast-region-context.tsx
const ToastRegionContext = createContext();
function useToastRegionContext() {
	const context = useContext(ToastRegionContext);
	if (context === void 0) throw new Error("[kobalte]: `useToastRegionContext` must be used within a `Toast.Region` component");
	return context;
}
//#endregion
//#region src/toast/toast-list.tsx
/**
* The list containing all rendered toasts.
* Must be inside a `Toast.Region`.
*/
function ToastList(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const context = useToastRegionContext();
	const others = omit(props, "ref", "onFocusIn", "onFocusOut", "onPointerMove", "onPointerLeave");
	const onFocusIn = (e) => {
		callHandler(e, props.onFocusIn);
		if (context.pauseOnInteraction() && !context.isPaused()) context.pauseAllTimer();
	};
	const onFocusOut = (e) => {
		callHandler(e, props.onFocusOut);
		if (!ref()?.contains(e.relatedTarget)) context.resumeAllTimer();
	};
	const onPointerMove = (e) => {
		callHandler(e, props.onPointerMove);
		if (context.pauseOnInteraction() && !context.isPaused()) context.pauseAllTimer();
	};
	const onPointerLeave = (e) => {
		callHandler(e, props.onPointerLeave);
		if (!ref()?.contains((ref()?.ownerDocument ?? document).activeElement)) context.resumeAllTimer();
	};
	createEffect(() => context.hotkey(), (hotkey) => {
		if (isServer || !untrack(ref)) return;
		const doc = untrack(ref)?.ownerDocument ?? document;
		const onKeyDown = (event) => {
			if (hotkey.every((key) => event[key] || event.code === key)) untrack(ref)?.focus({ preventScroll: true });
		};
		doc.addEventListener("keydown", onKeyDown);
		return () => doc.removeEventListener("keydown", onKeyDown);
	});
	createEffect(() => context.pauseOnPageIdle(), (pauseOnPageIdle) => {
		if (!pauseOnPageIdle) return;
		const win = untrack(ref)?.ownerDocument?.defaultView ?? window;
		win.addEventListener("blur", context.pauseAllTimer);
		win.addEventListener("focus", context.resumeAllTimer);
		return () => {
			win.removeEventListener("blur", context.pauseAllTimer);
			win.removeEventListener("focus", context.resumeAllTimer);
		};
	});
	return createComponent(Polymorphic, mergeProps({
		as: "ol",
		ref: [setRef, props.ref],
		tabindex: -1,
		onFocusIn,
		onFocusOut,
		onPointerMove,
		onPointerLeave
	}, others, { get children() {
		return createComponent(For, {
			get each() {
				return context.toasts();
			},
			children: (toast) => {
				return untrack(() => toast.toastComponent)({ toastId: untrack(() => toast.id) });
			}
		});
	} }));
}
//#endregion
//#region src/toast/toast-progress-fill.tsx
/**
* The component that visually represents the toast remaining lifetime.
* Used to visually show the fill of `Toast.ProgressTrack`.
*/
function ToastProgressFill(props) {
	const rootContext = useToastRegionContext();
	const context = useToastContext();
	const others = omit(props, "style");
	const [lifeTime, setLifeTime] = createSignal(100);
	let totalElapsedTime = 0;
	createEffect(() => [rootContext.isPaused(), context.isPersistent()], ([isPaused, isPersistent]) => {
		if (isPaused || isPersistent) return;
		const intervalId = setInterval(() => {
			const elapsedTime = Date.now() - untrack(context.closeTimerStartTime) + totalElapsedTime;
			const life = Math.trunc(100 - elapsedTime / untrack(context.duration) * 100);
			setLifeTime(life < 0 ? 0 : life);
		});
		return () => {
			totalElapsedTime += Date.now() - untrack(context.closeTimerStartTime);
			clearInterval(intervalId);
		};
	});
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		get style() {
			return combineStyle({ "--kb-toast-progress-fill-width": `${lifeTime()}%` }, props.style);
		}
	}, others));
}
//#endregion
//#region src/toast/toast-progress-track.tsx
/**
* The component that visually represents the toast lifetime.
* Act as a container for `Toast.ProgressFill`.
*/
function ToastProgressTrack(props) {
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		"aria-hidden": "true",
		role: "presentation"
	}, props));
}
//#endregion
//#region src/toast/toast.intl.ts
const TOAST_HOTKEY_PLACEHOLDER = "{hotkey}";
const TOAST_INTL_TRANSLATIONS = { close: "Close" };
const TOAST_REGION_INTL_TRANSLATIONS = { notifications: (hotkeyPlaceholder) => `Notifications (${hotkeyPlaceholder})` };
//#endregion
//#region src/toast/toast-store.ts
const [state, setState] = createStore({ toasts: [] });
function add(toast) {
	setState((s) => {
		s.toasts.push(toast);
	});
}
function get(id) {
	return state.toasts.find((toast) => toast.id === id);
}
function update$1(id, toast) {
	setState((s) => {
		const index = s.toasts.findIndex((t) => t.id === id);
		if (index !== -1) s.toasts[index] = toast;
	});
}
function dismiss$1(id) {
	setState((s) => {
		const index = s.toasts.findIndex((t) => t.id === id);
		if (index !== -1) {
			const t = s.toasts[index];
			s.toasts[index] = {
				id: t.id,
				dismiss: true,
				update: t.update,
				toastComponent: t.toastComponent,
				region: t.region
			};
		}
	});
}
function remove(id) {
	setState((s) => {
		s.toasts = s.toasts.filter((t) => t.id !== id);
	});
}
function clear$1() {
	setState((s) => {
		s.toasts = [];
	});
}
const toastStore = {
	toasts: () => state.toasts,
	add,
	get,
	update: update$1,
	dismiss: dismiss$1,
	remove,
	clear: clear$1
};
//#endregion
//#region src/toast/toast-region.tsx
/**
* The fixed area where toasts appear. Users can jump to by pressing a hotkey.
* It is up to you to ensure the discoverability of the hotkey for keyboard users.
*/
function ToastRegion(props) {
	const mergedProps = merge({
		id: `toast-region-${createUniqueId()}`,
		hotkey: ["altKey", "KeyT"],
		duration: 5e3,
		limit: 3,
		swipeDirection: "right",
		swipeThreshold: 50,
		pauseOnInteraction: true,
		pauseOnPageIdle: true,
		topLayer: true,
		translations: TOAST_REGION_INTL_TRANSLATIONS
	}, props);
	const others = omit(mergedProps, "translations", "style", "hotkey", "duration", "limit", "swipeDirection", "swipeThreshold", "pauseOnInteraction", "pauseOnPageIdle", "topLayer", "aria-label", "regionId");
	const toasts = createMemo(() => toastStore.toasts().filter((toast) => toast.region === mergedProps.regionId && toast.dismiss === false).slice(0, mergedProps.limit));
	const [isPaused, setIsPaused] = createSignal(false);
	const hasToasts = () => toasts().length > 0;
	const hotkeyLabel = () => {
		return mergedProps.hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
	};
	const ariaLabel = () => {
		return (mergedProps["aria-label"] || mergedProps.translations.notifications("{hotkey}")).replace(TOAST_HOTKEY_PLACEHOLDER, hotkeyLabel());
	};
	const topLayerAttr = () => ({ [DATA_TOP_LAYER_ATTR]: mergedProps.topLayer ? "" : void 0 });
	return createComponent(ToastRegionContext, {
		value: {
			isPaused,
			toasts,
			hotkey: () => mergedProps.hotkey,
			duration: () => mergedProps.duration,
			swipeDirection: () => mergedProps.swipeDirection,
			swipeThreshold: () => mergedProps.swipeThreshold,
			pauseOnInteraction: () => mergedProps.pauseOnInteraction,
			pauseOnPageIdle: () => mergedProps.pauseOnPageIdle,
			pauseAllTimer: () => setIsPaused(true),
			resumeAllTimer: () => setIsPaused(false),
			generateId: (suffix) => `${others.id}-${suffix}`
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "div",
				role: "region",
				tabindex: -1,
				get ["aria-label"]() {
					return ariaLabel();
				},
				get style() {
					return combineStyle({ "pointer-events": hasToasts() ? mergedProps.topLayer ? "auto" : void 0 : "none" }, mergedProps.style);
				}
			}, topLayerAttr, others));
		}
	});
}
//#endregion
//#region src/toast/toast-root.tsx
const TOAST_SWIPE_START_EVENT = "toast.swipeStart";
const TOAST_SWIPE_MOVE_EVENT = "toast.swipeMove";
const TOAST_SWIPE_CANCEL_EVENT = "toast.swipeCancel";
const TOAST_SWIPE_END_EVENT = "toast.swipeEnd";
function ToastRoot(props) {
	const rootContext = useToastRegionContext();
	const mergedProps = merge({
		id: `toast-${createUniqueId()}`,
		priority: "high",
		translations: TOAST_INTL_TRANSLATIONS
	}, props);
	const others = omit(mergedProps, "ref", "translations", "toastId", "style", "priority", "duration", "persistent", "onPause", "onResume", "onSwipeStart", "onSwipeMove", "onSwipeCancel", "onSwipeEnd", "onEscapeKeyDown", "onKeyDown", "onPointerDown", "onPointerMove", "onPointerUp");
	const [isOpen, setIsOpen] = createSignal(true);
	const [titleId, setTitleId] = createSignal(void 0, { ownedWrite: true });
	const [descriptionId, setDescriptionId] = createSignal(void 0, { ownedWrite: true });
	const [isAnimationEnabled, setIsAnimationEnabled] = createSignal(true);
	const [_ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const { isMounted: present } = createPresence(() => isOpen() || void 0, { transitionDuration: 0 });
	const duration = createMemo(() => mergedProps.duration || rootContext.duration());
	let closeTimerId;
	let closeTimerStartTime = 0;
	let closeTimerRemainingTime = untrack(duration);
	let pointerStart = null;
	let swipeDelta = null;
	const close = () => {
		setIsOpen(false);
		setIsAnimationEnabled(true);
	};
	const deleteToast = () => {
		toastStore.remove(mergedProps.toastId);
	};
	const startTimer = (duration) => {
		if (!duration || mergedProps.persistent) return;
		window.clearTimeout(closeTimerId);
		closeTimerStartTime = Date.now();
		closeTimerId = window.setTimeout(close, duration);
	};
	const resumeTimer = () => {
		startTimer(closeTimerRemainingTime);
		mergedProps.onResume?.();
	};
	const pauseTimer = () => {
		const elapsedTime = Date.now() - closeTimerStartTime;
		closeTimerRemainingTime = closeTimerRemainingTime - elapsedTime;
		window.clearTimeout(closeTimerId);
		mergedProps.onPause?.();
	};
	const onKeyDown = (e) => {
		callHandler(e, mergedProps.onKeyDown);
		if (e.key !== "Escape") return;
		mergedProps.onEscapeKeyDown?.(e);
		if (!e.defaultPrevented) close();
	};
	const onPointerDown = (e) => {
		callHandler(e, mergedProps.onPointerDown);
		if (e.button !== 0) return;
		pointerStart = {
			x: e.clientX,
			y: e.clientY
		};
	};
	const onPointerMove = (e) => {
		callHandler(e, mergedProps.onPointerMove);
		if (!pointerStart) return;
		const x = e.clientX - pointerStart.x;
		const y = e.clientY - pointerStart.y;
		const hasSwipeMoveStarted = Boolean(swipeDelta);
		const isHorizontalSwipe = ["left", "right"].includes(rootContext.swipeDirection());
		const clamp = ["left", "up"].includes(rootContext.swipeDirection()) ? Math.min : Math.max;
		const clampedX = isHorizontalSwipe ? clamp(0, x) : 0;
		const clampedY = !isHorizontalSwipe ? clamp(0, y) : 0;
		const moveStartBuffer = e.pointerType === "touch" ? 10 : 2;
		const delta = {
			x: clampedX,
			y: clampedY
		};
		const eventDetail = {
			originalEvent: e,
			delta
		};
		if (hasSwipeMoveStarted) {
			swipeDelta = delta;
			handleAndDispatchCustomEvent(TOAST_SWIPE_MOVE_EVENT, mergedProps.onSwipeMove, eventDetail);
			const { x, y } = delta;
			e.currentTarget.setAttribute("data-swipe", "move");
			e.currentTarget.style.setProperty("--kb-toast-swipe-move-x", `${x}px`);
			e.currentTarget.style.setProperty("--kb-toast-swipe-move-y", `${y}px`);
		} else if (isDeltaInDirection(delta, rootContext.swipeDirection(), moveStartBuffer)) {
			swipeDelta = delta;
			handleAndDispatchCustomEvent(TOAST_SWIPE_START_EVENT, mergedProps.onSwipeStart, eventDetail);
			e.currentTarget.setAttribute("data-swipe", "start");
			e.target.setPointerCapture(e.pointerId);
		} else if (Math.abs(x) > moveStartBuffer || Math.abs(y) > moveStartBuffer) pointerStart = null;
	};
	const onPointerUp = (e) => {
		callHandler(e, mergedProps.onPointerUp);
		const delta = swipeDelta;
		const target = e.target;
		if (target.hasPointerCapture(e.pointerId)) target.releasePointerCapture(e.pointerId);
		swipeDelta = null;
		pointerStart = null;
		if (delta) {
			const toast = e.currentTarget;
			const eventDetail = {
				originalEvent: e,
				delta
			};
			if (isDeltaInDirection(delta, rootContext.swipeDirection(), rootContext.swipeThreshold())) {
				handleAndDispatchCustomEvent(TOAST_SWIPE_END_EVENT, mergedProps.onSwipeEnd, eventDetail);
				const { x, y } = delta;
				e.currentTarget.setAttribute("data-swipe", "end");
				e.currentTarget.style.removeProperty("--kb-toast-swipe-move-x");
				e.currentTarget.style.removeProperty("--kb-toast-swipe-move-y");
				e.currentTarget.style.setProperty("--kb-toast-swipe-end-x", `${x}px`);
				e.currentTarget.style.setProperty("--kb-toast-swipe-end-y", `${y}px`);
				close();
			} else {
				handleAndDispatchCustomEvent(TOAST_SWIPE_CANCEL_EVENT, mergedProps.onSwipeCancel, eventDetail);
				e.currentTarget.setAttribute("data-swipe", "cancel");
				e.currentTarget.style.removeProperty("--kb-toast-swipe-move-x");
				e.currentTarget.style.removeProperty("--kb-toast-swipe-move-y");
				e.currentTarget.style.removeProperty("--kb-toast-swipe-end-x");
				e.currentTarget.style.removeProperty("--kb-toast-swipe-end-y");
			}
			toast.addEventListener("click", (event) => event.preventDefault(), { once: true });
		}
	};
	onSettled(() => {
		if (rootContext.toasts().find((toast) => toast.id === mergedProps.toastId && toast.update)) setIsAnimationEnabled(false);
	});
	createEffect(() => rootContext.isPaused(), (isPaused) => {
		if (isPaused) pauseTimer();
		else resumeTimer();
	});
	createEffect(() => [
		isOpen(),
		duration(),
		rootContext.isPaused()
	], ([isOpenVal, durationVal, isPaused]) => {
		if (isOpenVal && !isPaused) startTimer(durationVal);
	});
	createEffect(() => toastStore.get(mergedProps.toastId)?.dismiss, (dismiss) => {
		if (dismiss) close();
	});
	createEffect(() => present(), (isPresent) => {
		if (!isPresent) deleteToast();
	});
	const context = {
		translations: () => mergedProps.translations,
		close,
		duration,
		isPersistent: () => mergedProps.persistent ?? false,
		closeTimerStartTime: () => closeTimerStartTime,
		generateId: (suffix) => `${others.id}-${suffix}`,
		registerTitleId: createRegisterId(setTitleId),
		registerDescriptionId: createRegisterId(setDescriptionId)
	};
	return createComponent(Show, {
		get when() {
			return present();
		},
		get children() {
			return createComponent(ToastContext, {
				value: context,
				get children() {
					return createComponent(Polymorphic, mergeProps({
						as: "li",
						ref: [setRef, mergedProps.ref],
						role: "status",
						tabindex: 0,
						get style() {
							return combineStyle({
								animation: isAnimationEnabled() ? void 0 : "none",
								"user-select": "none",
								"touch-action": "none"
							}, mergedProps.style);
						},
						get ["aria-live"]() {
							return mergedProps.priority === "high" ? "assertive" : "polite";
						},
						"aria-atomic": "true",
						get ["aria-labelledby"]() {
							return titleId();
						},
						get ["aria-describedby"]() {
							return descriptionId();
						},
						get ["data-opened"]() {
							return isOpen() ? "" : void 0;
						},
						get ["data-closed"]() {
							return !isOpen() ? "" : void 0;
						},
						get ["data-swipe-direction"]() {
							return rootContext.swipeDirection();
						},
						onKeyDown,
						onPointerDown,
						onPointerMove,
						onPointerUp
					}, others));
				}
			});
		}
	});
}
function isDeltaInDirection(delta, direction, threshold = 0) {
	const deltaX = Math.abs(delta.x);
	const deltaY = Math.abs(delta.y);
	const isDeltaX = deltaX > deltaY;
	if (direction === "left" || direction === "right") return isDeltaX && deltaX > threshold;
	return !isDeltaX && deltaY > threshold;
}
function handleAndDispatchCustomEvent(name, handler, detail) {
	const currentTarget = detail.originalEvent.currentTarget;
	const event = new CustomEvent(name, {
		bubbles: true,
		cancelable: true,
		detail
	});
	if (handler) currentTarget.addEventListener(name, handler, { once: true });
	currentTarget.dispatchEvent(event);
}
//#endregion
//#region src/toast/toast-title.tsx
/**
* An accessible title to be announced when the toast is open.
*/
function ToastTitle(props) {
	const context = useToastContext();
	const mergedProps = merge({ id: context.generateId("title") }, props);
	const others = omit(mergedProps, "id");
	createEffect(() => mergedProps.id, (id) => context.registerTitleId(id));
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		get id() {
			return mergedProps.id;
		}
	}, others));
}
//#endregion
//#region src/toast/toaster.ts
let toastsCounter = 0;
/** Adds a new toast to the visible toasts or queue depending on current state and limit, and return the id of the created toast. */
function show(toastComponent, options) {
	const id = toastsCounter++;
	toastStore.add({
		id,
		toastComponent,
		dismiss: false,
		update: false,
		region: options?.region
	});
	return id;
}
/** Update the toast of the given id with a new rendered component. */
function update(id, toastComponent) {
	toastStore.update(id, {
		id,
		toastComponent,
		dismiss: false,
		update: true
	});
}
/** Adds a new promise-based toast to the visible toasts or queue depending on current state and limit, and return the id of the created toast. */
function promise(promise, toastComponent, options) {
	const id = show((props) => {
		return toastComponent({
			get toastId() {
				return props.toastId;
			},
			state: "pending"
		});
	}, options);
	(typeof promise === "function" ? promise() : promise).then((data) => update(id, (props) => {
		return toastComponent({
			get toastId() {
				return props.toastId;
			},
			state: "fulfilled",
			data
		});
	})).catch((error) => update(id, (props) => {
		return toastComponent({
			get toastId() {
				return props.toastId;
			},
			state: "rejected",
			error
		});
	}));
	return id;
}
/** Removes toast with given id from visible toasts and queue. */
function dismiss(id) {
	toastStore.dismiss(id);
	return id;
}
/** Removes all toasts from visible toasts and queue. */
function clear() {
	toastStore.clear();
}
const toaster = {
	show,
	update,
	promise,
	dismiss,
	clear
};
//#endregion
//#region src/toast/index.tsx
var toast_exports = /* @__PURE__ */ __exportAll({
	CloseButton: () => ToastCloseButton,
	Description: () => ToastDescription,
	List: () => ToastList,
	ProgressFill: () => ToastProgressFill,
	ProgressTrack: () => ToastProgressTrack,
	Region: () => ToastRegion,
	Root: () => ToastRoot,
	Title: () => ToastTitle,
	Toast: () => Toast,
	toaster: () => toaster,
	useToastContext: () => useToastContext
});
const Toast = Object.assign(ToastRoot, {
	CloseButton: ToastCloseButton,
	Description: ToastDescription,
	List: ToastList,
	ProgressFill: ToastProgressFill,
	ProgressTrack: ToastProgressTrack,
	Region: ToastRegion,
	Title: ToastTitle,
	toaster
});
//#endregion
export { ToastRoot as a, ToastProgressFill as c, ToastCloseButton as d, useToastContext as f, ToastTitle as i, ToastList as l, toast_exports as n, ToastRegion as o, toaster as r, ToastProgressTrack as s, Toast as t, ToastDescription as u };
