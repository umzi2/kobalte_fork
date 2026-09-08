import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { t as createDisclosureState } from "../create-disclosure-state/DV_ixT98.js";
import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { a as DialogRoot, c as DialogDescription, d as useDialogContext, i as DialogTitle, l as DialogContent, o as DialogPortal, r as DialogTrigger, s as DialogOverlay, u as DialogCloseButton } from "../dialog/BOdIttv5.js";
import { applyRef, createComponent, mergeProps } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { createContext, createEffect, createMemo, createSignal, merge, omit, untrack, useContext } from "solid-js";
import { callHandler, getScrollParent } from "@kobalte/utils";
import { createEventListener } from "@solid-primitives/event-listener";
//#region src/drawer/drawer-context.tsx
const DrawerContext = createContext();
function useDrawerContext() {
	const ctx = useContext(DrawerContext);
	if (!ctx) throw new Error("[kobalte]: `useDrawerContext` must be used within a `Drawer.Root`");
	return ctx;
}
const DrawerInternalContext = createContext();
function useDrawerInternalContext() {
	const ctx = useContext(DrawerInternalContext);
	if (!ctx) throw new Error("[kobalte]: `useDrawerInternalContext` must be used within a `Drawer.Root`");
	return ctx;
}
//#endregion
//#region src/drawer/drawer-lib.ts
/** Resolves a snap point (fraction 0-1 or `Npx`) to a pixel offset from the open edge. */
function resolveSnapPoint(snapPoint, drawerSize, index, breakPoints) {
	if (index === void 0 || breakPoints === void 0) return {
		value: snapPoint,
		offset: resolvePoint(snapPoint, drawerSize)
	};
	const upperBreakPoint = breakPoints[index - 1] != null ? resolvePoint(breakPoints[index - 1], drawerSize) : void 0;
	const lowerBreakPoint = breakPoints[index] != null ? resolvePoint(breakPoints[index], drawerSize) : void 0;
	return {
		value: snapPoint,
		offset: resolvePoint(snapPoint, drawerSize),
		lowerBreakPoint,
		upperBreakPoint
	};
}
function resolvePoint(point, drawerSize) {
	if (typeof point === "number") return drawerSize - point * drawerSize;
	if (!point.endsWith("px")) throw new Error(`[kobalte]: Drawer snap/break points must be a fraction (0–1) or a string ending with 'px'. Got "${point}"`);
	return drawerSize - parseInt(point, 10);
}
function findClosestSnapPoint(snapPoints, offset, offsetWithVelocity, allowSkipping) {
	const target = allowSkipping ? offsetWithVelocity : offset;
	const upper = findNearby("upper", snapPoints, target);
	const lower = findNearby("lower", snapPoints, target);
	if (!upper) return lower;
	if (!lower) return upper;
	if (lower.upperBreakPoint === void 0 || upper.lowerBreakPoint === void 0) return Math.abs(lower.offset - offsetWithVelocity) < Math.abs(upper.offset - offsetWithVelocity) ? lower : upper;
	return offsetWithVelocity < upper.lowerBreakPoint ? lower : upper;
}
function findNearby(side, snapPoints, offset) {
	return snapPoints.reduce((prev, cur) => {
		if (side === "upper") {
			if (cur.offset >= offset && (!prev || cur.offset < prev.offset)) return cur;
		} else if (cur.offset <= offset && (!prev || cur.offset > prev.offset)) return cur;
		return prev;
	}, void 0);
}
/**
* Returns false if the pointer-down target (or any ancestor up to `stopAt`)
* is an interactive element (button, link, text input, textarea, select, contenteditable)
* or has `data-no-drag`. Interactive elements handle their own pointer events and should
* not be hijacked by the drag system — this prevents a race where clicking a CloseButton
* briefly sets pointerDown=true, a tiny pointer movement triggers a snap, and the ensuing
* transition-state race leaves the drawer stuck mounted with pointer-events:none on the body.
*/
function locationIsDraggable(location, stopAt, pointerType) {
	let el = location;
	let stopReached = false;
	do {
		if (el.hasAttribute("data-no-drag") || el.tagName === "BUTTON" || el.tagName === "A" || el.tagName === "TEXTAREA" || el.hasAttribute("contenteditable") || el.tagName === "INPUT" && el.type !== "range" || el.tagName === "SELECT" && pointerType === "mouse") return false;
		if (el === stopAt) stopReached = true;
		else el = el.parentElement;
	} while (el && !stopReached);
	return true;
}
/** Runs `fn` after the browser has painted (double-rAF). */
function afterPaint(fn) {
	requestAnimationFrame(() => requestAnimationFrame(fn));
}
//#endregion
//#region src/drawer/drawer-content.tsx
/**
* Contains the content rendered when the drawer is open.
* Handles drag-to-snap and drag-to-dismiss gestures.
*
* @data `data-side` — which edge the drawer appears from
* @data `data-expanded` — present when open
* @data `data-closed` — present when closed (from Dialog)
* @data `data-opening` — present during the open transition
* @data `data-closing` — present during the close transition
* @data `data-snapping` — present while snapping to a snap point after drag
* @data `data-transitioning` — present during any transition
*/
function DrawerContent(props) {
	const p = props;
	const others = omit(p, "ref", "style", "onPointerDown", "onTouchStart", "onTransitionEnd", "onOpenAutoFocus", "onCloseAutoFocus", "onPointerDownOutside", "onFocusOutside", "onInteractOutside");
	const ctx = useDrawerInternalContext();
	const dialogCtx = useDialogContext();
	let pointerDown = false;
	let dragStartPos = null;
	let dragStartTranslate = 0;
	let currentPointerStart = [0, 0];
	let cachedMoveTimestamp = /* @__PURE__ */ new Date();
	let cachedTranslate = 0;
	createEffect(() => dialogCtx.contentRef(), (el) => {
		if (!el) return;
		const measure = () => {
			const side = untrack(ctx.side);
			const size = side === "left" || side === "right" ? el.offsetWidth : el.offsetHeight;
			ctx.setDrawerSize(size);
		};
		measure();
		const obs = new ResizeObserver(measure);
		obs.observe(el);
		return () => obs.disconnect();
	});
	createEffect(() => dialogCtx.isOpen(), (isOpen) => {
		if (!isOpen) return;
		createEventListener(document, "pointermove", onPointerMove);
		createEventListener(document, "touchmove", onTouchMove, { passive: false });
		createEventListener(document, "pointerup", onPointerUp);
		createEventListener(document, "touchend", onTouchEnd);
		createEventListener(document, "contextmenu", onUp);
	});
	const transformValue = createMemo(() => {
		if (ctx.drawerSize() === 0) switch (ctx.side()) {
			case "top": return "translate3d(0, -100%, 0)";
			case "bottom": return "translate3d(0, 100%, 0)";
			case "right": return "translate3d(100%, 0, 0)";
			case "left": return "translate3d(-100%, 0, 0)";
		}
		const t = ctx.translate();
		switch (ctx.side()) {
			case "top": return `translate3d(0, ${-t}px, 0)`;
			case "bottom": return `translate3d(0, ${t}px, 0)`;
			case "right": return `translate3d(${t}px, 0, 0)`;
			case "left": return `translate3d(${-t}px, 0, 0)`;
		}
	});
	const snapPoints = createMemo(() => ctx.resolvedSnapPoints());
	const dragAxis = createMemo(() => ctx.side() === "left" || ctx.side() === "right" ? "x" : "y");
	const onPointerDown = (event) => {
		callHandler(event, p.onPointerDown);
		if (event.button !== 0) return;
		const target = event.target;
		const content = dialogCtx.contentRef();
		if (!content || !locationIsDraggable(target, content, event.pointerType)) return;
		if (ctx.transitionState() === "closing") return;
		pointerDown = true;
		if (ctx.handleScrollableElements()) currentPointerStart = [event.clientX, event.clientY];
	};
	const onTouchStart = (event) => {
		callHandler(event, p.onTouchStart);
		if (event.touches.length !== 1) return;
		dragStartPos = null;
	};
	const onPointerMove = (event) => onMove(event.target, event.clientX, event.clientY);
	const onTouchMove = (event) => {
		const touch = event.touches[0];
		if (!touch) return;
		onMove(event.target, touch.clientX, touch.clientY);
	};
	const onMove = (target, x, y) => {
		if (!pointerDown) return;
		if (!ctx.isDragging() || dragStartPos === null) {
			const sel = window.getSelection();
			if (sel && sel.toString().length > 0) {
				onUp();
				return;
			}
			if (ctx.handleScrollableElements()) {
				const axis = dragAxis();
				const pointerIdx = axis === "x" ? 0 : 1;
				const delta = [x, y][pointerIdx] - currentPointerStart[pointerIdx];
				if (Math.abs(delta) >= .3) {
					const content = dialogCtx.contentRef();
					const scrollParent = getScrollParent(target);
					if (content && scrollParent && scrollParent !== content) {
						if (content.contains(scrollParent)) {
							if (delta < 0 ? axis === "y" ? scrollParent.scrollTop > 0 : scrollParent.scrollLeft > 0 : axis === "y" ? scrollParent.scrollHeight - scrollParent.scrollTop > scrollParent.clientHeight + 1 : scrollParent.scrollWidth - scrollParent.scrollLeft > scrollParent.clientWidth + 1) {
								onUp();
								return;
							}
						}
					}
				}
			}
			dragStartPos = dragAxis() === "x" ? x : y;
			dragStartTranslate = ctx.translate();
			cachedMoveTimestamp = /* @__PURE__ */ new Date();
			cachedTranslate = ctx.translate();
			ctx.setIsDragging(true);
			ctx.setTransitionState(null);
		}
		let translateDelta = 0;
		switch (ctx.side()) {
			case "top":
				translateDelta = dragStartPos - y;
				break;
			case "bottom":
				translateDelta = y - dragStartPos;
				break;
			case "right":
				translateDelta = x - dragStartPos;
				break;
			case "left": translateDelta = dragStartPos - x;
		}
		let newTranslate = dragStartTranslate + translateDelta;
		const maxOpenOffset = ctx.resolvedSnapPoints()[ctx.resolvedSnapPoints().length - 1]?.offset ?? 0;
		if (newTranslate < maxOpenOffset) {
			const overflow = maxOpenOffset - newTranslate;
			newTranslate = maxOpenOffset - ctx.dampFunction(overflow);
		}
		const now = /* @__PURE__ */ new Date();
		if (now.getTime() - cachedMoveTimestamp.getTime() > ctx.velocityCacheReset()) {
			cachedMoveTimestamp = now;
			cachedTranslate = ctx.translate();
		}
		ctx.setTranslateDrag(newTranslate);
	};
	const onPointerUp = (event) => {
		if (event.pointerType !== "touch") onUp();
	};
	const onTouchEnd = (event) => {
		if (event.touches.length === 0) onUp();
	};
	const onUp = () => {
		pointerDown = false;
		if (!ctx.isDragging()) return;
		const now = /* @__PURE__ */ new Date();
		const velocity = ctx.velocityFunction(-(cachedTranslate - ctx.translate()), now.getTime() - cachedMoveTimestamp.getTime() || 1);
		const translateWithVelocity = ctx.translate() * velocity;
		const closest = findClosestSnapPoint(snapPoints(), ctx.translate(), translateWithVelocity, ctx.allowSkippingSnapPoints());
		ctx.setTransitionState("snapping");
		ctx.setIsDragging(false);
		ctx.setTranslateDrag(null);
		if (closest.offset >= ctx.drawerSize()) {
			ctx.setActiveSnapPoint(closest.value);
			ctx.closeDrawer();
			dialogCtx.close();
		} else {
			ctx.setActiveSnapPoint(closest.value);
			if (parseFloat(getComputedStyle(dialogCtx.contentRef()).transitionDuration) === 0) ctx.setTransitionState(null);
		}
	};
	const onTransitionEnd = (event) => {
		callHandler(event, p.onTransitionEnd);
		if (event.target !== dialogCtx.contentRef()) return;
		if (ctx.transitionState() === "closing") ctx.closeDrawer();
		else if (ctx.transitionState() !== null) ctx.setTransitionState(null);
	};
	createEffect(() => ctx.transitionState() === "closing", (isClosing) => {
		if (!isClosing) return;
		let timeoutId;
		const raf1 = requestAnimationFrame(() => requestAnimationFrame(() => {
			if (ctx.transitionState() !== "closing") return;
			const el = dialogCtx.contentRef();
			if (!el) {
				ctx.closeDrawer();
				return;
			}
			const dur = parseFloat(getComputedStyle(el).transitionDuration);
			if (!dur || dur === 0) {
				ctx.closeDrawer();
				return;
			}
			timeoutId = setTimeout(() => {
				if (ctx.transitionState() === "closing") ctx.closeDrawer();
			}, dur * 1e3 + 100);
		}));
		return () => {
			cancelAnimationFrame(raf1);
			clearTimeout(timeoutId);
		};
	});
	return createComponent(DialogContent, mergeProps({
		ref(r$) {
			var _ref$ = p.ref;
			typeof _ref$ === "function" || Array.isArray(_ref$) ? applyRef(_ref$, r$) : p.ref = r$;
		},
		get style() {
			return combineStyle({
				transform: transformValue(),
				"transition-duration": ctx.isDragging() ? "0ms" : void 0
			}, p.style);
		},
		onPointerDown,
		onTouchStart,
		onTransitionEnd,
		get ["data-side"]() {
			return ctx.side();
		},
		get ["data-opening"]() {
			return ctx.transitionState() === "opening" ? "" : void 0;
		},
		get ["data-closing"]() {
			return ctx.transitionState() === "closing" ? "" : void 0;
		},
		get ["data-snapping"]() {
			return ctx.transitionState() === "snapping" ? "" : void 0;
		},
		get ["data-transitioning"]() {
			return ctx.isTransitioning() ? "" : void 0;
		}
	}, others));
}
//#endregion
//#region src/drawer/drawer-overlay.tsx
/**
* A layer that covers the inert portion of the view when the drawer is open.
*
* Opacity is driven automatically by the drawer's open percentage so it tracks
* drag gestures in real-time. Add a CSS `transition: opacity` to your overlay
* element and it will animate on open/close as well.
*
* - **Closing**: opacity transitions to 0 via the `data-closing` attribute hook.
* - **Drag**: opacity tracks `openPercentage` frame-by-frame (no CSS transition
*   is applied during drag so it feels instant).
*
* @data `data-expanded` — present when open (from Dialog)
* @data `data-closed` — present when closed (from Dialog)
* @data `data-closing` — present during the close transition
* @data `data-transitioning` — present during any transition
*/
function DrawerOverlay(props) {
	const ctx = useDrawerInternalContext();
	const p = props;
	const computedOpacity = () => {
		if (ctx.transitionState() === "closing") return 0;
		return ctx.openPercentage();
	};
	const computedStyle = () => combineStyle({
		opacity: computedOpacity(),
		"transition-duration": ctx.isDragging() ? "0ms" : void 0
	}, p.style);
	return createComponent(DialogOverlay, mergeProps({
		get ["data-closing"]() {
			return ctx.transitionState() === "closing" ? "" : void 0;
		},
		get ["data-transitioning"]() {
			return ctx.isTransitioning() ? "" : void 0;
		}
	}, () => omit(p, "style"), { get style() {
		return computedStyle();
	} }));
}
//#endregion
//#region src/drawer/drawer-root.tsx
/**
* A panel that slides in from the edge of the screen with drag-to-dismiss
* and snap-point support. All `Dialog.Root` props are also accepted.
*
* **Credit:** Snap-point architecture and drag math are adapted from
* [corvu/drawer](https://github.com/corvudev/corvu/tree/main/packages/drawer)
* by Jasmin Noetzli (MIT).
*/
function DrawerRoot(props) {
	const mergedProps = merge({
		side: "bottom",
		snapPoints: [0, 1],
		breakPoints: [null],
		defaultSnapPoint: 1,
		dampFunction: (d) => 6 * Math.log(d + 1),
		velocityFunction: (d, t) => {
			const v = d / t;
			return v < 1 && v > -1 ? 1 : v;
		},
		velocityCacheReset: 200,
		allowSkippingSnapPoints: true,
		handleScrollableElements: true,
		modal: true
	}, props);
	const disclosure = createDisclosureState({
		open: () => mergedProps.open,
		defaultOpen: () => mergedProps.defaultOpen,
		onOpenChange: (isOpen) => mergedProps.onOpenChange?.(isOpen)
	});
	const initiallyOpen = untrack(() => disclosure.isOpen());
	const [transitionAwareOpen, setTransitionAwareOpen] = createSignal(initiallyOpen);
	const [activeSnapPoint, _setActiveSnapPointRaw] = (0, primitives_exports.createControllableSignal)({
		value: () => mergedProps.activeSnapPoint,
		defaultValue: () => initiallyOpen ? mergedProps.defaultSnapPoint ?? 1 : 0,
		onChange: mergedProps.onActiveSnapPointChange
	});
	const setActiveSnapPoint = (sp) => _setActiveSnapPointRaw(sp);
	const [isDragging, setIsDragging] = createSignal(false);
	const [transitionState, setTransitionState] = createSignal(null);
	const [translateDrag, setTranslateDrag] = createSignal(null);
	const [drawerSize, setDrawerSize] = createSignal(0);
	const resolvedSnapPoints = createMemo(() => mergedProps.snapPoints.map((sp, i) => resolveSnapPoint(sp, drawerSize(), i, mergedProps.breakPoints)));
	const resolvedActive = createMemo(() => resolveSnapPoint(activeSnapPoint() ?? 0, drawerSize()));
	const translate = createMemo(() => translateDrag() ?? resolvedActive().offset);
	const openPercentage = createMemo(() => {
		const size = drawerSize();
		return size === 0 ? 0 : (size - translate()) / size;
	});
	const closeDrawer = () => {
		setTransitionAwareOpen(false);
		setTransitionState(null);
	};
	let isFirstApply = true;
	createEffect(() => disclosure.isOpen(), (isOpen) => {
		if (isFirstApply) {
			isFirstApply = false;
			return;
		}
		if (isOpen) {
			setActiveSnapPoint(0);
			setTransitionAwareOpen(true);
			afterPaint(() => {
				setTransitionState("opening");
				setActiveSnapPoint(mergedProps.defaultSnapPoint ?? 1);
			});
		} else {
			setTransitionState("closing");
			setActiveSnapPoint(0);
		}
	});
	const handleDialogOpenChange = (isOpen) => {
		if (isOpen) disclosure.open();
		else disclosure.close();
	};
	const dialogProps = omit(mergedProps, "side", "snapPoints", "breakPoints", "defaultSnapPoint", "activeSnapPoint", "onActiveSnapPointChange", "dampFunction", "velocityFunction", "velocityCacheReset", "allowSkippingSnapPoints", "handleScrollableElements");
	const publicSetActiveSnapPoint = (sp) => {
		if (transitionState() === null) setTransitionState("snapping");
		setActiveSnapPoint(sp);
	};
	const ctxValue = {
		side: () => mergedProps.side,
		snapPoints: () => mergedProps.snapPoints,
		breakPoints: () => mergedProps.breakPoints,
		defaultSnapPoint: () => mergedProps.defaultSnapPoint,
		activeSnapPoint: () => activeSnapPoint() ?? 0,
		setActiveSnapPoint: publicSetActiveSnapPoint,
		isDragging,
		isTransitioning: () => transitionState() !== null,
		transitionState,
		openPercentage,
		translate,
		allowSkippingSnapPoints: () => mergedProps.allowSkippingSnapPoints,
		handleScrollableElements: () => mergedProps.handleScrollableElements,
		velocityCacheReset: () => mergedProps.velocityCacheReset
	};
	const internalCtxValue = {
		...ctxValue,
		setActiveSnapPoint,
		setIsDragging,
		setTranslateDrag,
		setTransitionState,
		drawerSize,
		setDrawerSize,
		dampFunction: mergedProps.dampFunction,
		velocityFunction: mergedProps.velocityFunction,
		resolvedSnapPoints,
		closeDrawer
	};
	return createComponent(DialogRoot, mergeProps(dialogProps, {
		get open() {
			return transitionAwareOpen();
		},
		onOpenChange: handleDialogOpenChange,
		get children() {
			return createComponent(DrawerInternalContext, {
				value: internalCtxValue,
				get children() {
					return createComponent(DrawerContext, {
						value: ctxValue,
						get children() {
							return dialogProps.children;
						}
					});
				}
			});
		}
	}));
}
//#endregion
//#region src/drawer/index.tsx
var drawer_exports = /* @__PURE__ */ __exportAll({
	CloseButton: () => DialogCloseButton,
	Content: () => DrawerContent,
	Description: () => DialogDescription,
	Drawer: () => Drawer,
	Overlay: () => DrawerOverlay,
	Portal: () => DialogPortal,
	Root: () => DrawerRoot,
	Title: () => DialogTitle,
	Trigger: () => DialogTrigger,
	useContext: () => useDrawerContext
});
const Drawer = Object.assign(DrawerRoot, {
	CloseButton: DialogCloseButton,
	Content: DrawerContent,
	Description: DialogDescription,
	Overlay: DrawerOverlay,
	Portal: DialogPortal,
	Title: DialogTitle,
	Trigger: DialogTrigger,
	useContext: useDrawerContext
});
//#endregion
export { DrawerContent as a, DrawerOverlay as i, drawer_exports as n, useDrawerContext as o, DrawerRoot as r, Drawer as t };
