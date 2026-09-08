import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as createDisclosureState } from "../create-disclosure-state/DV_ixT98.js";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.js";
import { t as DismissableLayer } from "../dismissable-layer/DXLD03yU.js";
import { i as PopperArrow, t as Popper } from "../popper/BTyI8BKK.js";
import { Portal, createComponent, isServer, memo, mergeProps } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { Show, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, onCleanup, useContext } from "solid-js";
import { createPresence } from "@solid-primitives/presence";
import { callHandler, isPointInPolygon } from "@kobalte/utils";
//#region src/tooltip/tooltip-context.tsx
const TooltipContext = createContext();
function useTooltipContext() {
	const context = useContext(TooltipContext);
	if (context === void 0) throw new Error("[kobalte]: `useTooltipContext` must be used within a `Tooltip` component");
	return context;
}
//#endregion
//#region src/tooltip/tooltip-content.tsx
/**
* Contains the content to be rendered when the tooltip is open.
*/
function TooltipContent(props) {
	const context = useTooltipContext();
	const mergedProps = merge({ id: context.generateId("content") }, props);
	const others = omit(mergedProps, "ref", "style");
	createEffect(() => others.id, (id) => context.registerContentId(id));
	return createComponent(Show, {
		get when() {
			return context.contentPresent();
		},
		get children() {
			return createComponent(Popper.Positioner, { get children() {
				return createComponent(DismissableLayer, mergeProps({
					ref: [(el) => {
						context.setContentRef(el);
					}, mergedProps.ref],
					role: "tooltip",
					disableOutsidePointerEvents: false,
					get style() {
						return combineStyle({
							"--kb-tooltip-content-transform-origin": "var(--kb-popper-content-transform-origin)",
							position: "relative"
						}, mergedProps.style);
					},
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => context.hideTooltip(true)
				}, () => context.dataset(), others));
			} });
		}
	});
}
//#endregion
//#region src/tooltip/tooltip-portal.tsx
/**
* Portals its children into the `body` when the tooltip is open.
*/
function TooltipPortal(props) {
	const context = useTooltipContext();
	return createComponent(Show, {
		get when() {
			return context.contentPresent();
		},
		get children() {
			return createComponent(Portal, props);
		}
	});
}
//#endregion
//#region src/tooltip/utils.ts
/**
* Construct a polygon based on the floating element placement relative to the anchor.
*/
function getTooltipSafeArea(placement, anchorEl, floatingEl) {
	const basePlacement = placement.split("-")[0];
	const anchorRect = anchorEl.getBoundingClientRect();
	const floatingRect = floatingEl.getBoundingClientRect();
	const polygon = [];
	const anchorCenterX = anchorRect.left + anchorRect.width / 2;
	const anchorCenterY = anchorRect.top + anchorRect.height / 2;
	switch (basePlacement) {
		case "top":
			polygon.push([anchorRect.left, anchorCenterY]);
			polygon.push([floatingRect.left, floatingRect.bottom]);
			polygon.push([floatingRect.left, floatingRect.top]);
			polygon.push([floatingRect.right, floatingRect.top]);
			polygon.push([floatingRect.right, floatingRect.bottom]);
			polygon.push([anchorRect.right, anchorCenterY]);
			break;
		case "right":
			polygon.push([anchorCenterX, anchorRect.top]);
			polygon.push([floatingRect.left, floatingRect.top]);
			polygon.push([floatingRect.right, floatingRect.top]);
			polygon.push([floatingRect.right, floatingRect.bottom]);
			polygon.push([floatingRect.left, floatingRect.bottom]);
			polygon.push([anchorCenterX, anchorRect.bottom]);
			break;
		case "bottom":
			polygon.push([anchorRect.left, anchorCenterY]);
			polygon.push([floatingRect.left, floatingRect.top]);
			polygon.push([floatingRect.left, floatingRect.bottom]);
			polygon.push([floatingRect.right, floatingRect.bottom]);
			polygon.push([floatingRect.right, floatingRect.top]);
			polygon.push([anchorRect.right, anchorCenterY]);
			break;
		case "left":
			polygon.push([anchorCenterX, anchorRect.top]);
			polygon.push([floatingRect.right, floatingRect.top]);
			polygon.push([floatingRect.left, floatingRect.top]);
			polygon.push([floatingRect.left, floatingRect.bottom]);
			polygon.push([floatingRect.right, floatingRect.bottom]);
			polygon.push([anchorCenterX, anchorRect.bottom]);
	}
	return polygon;
}
//#endregion
//#region src/tooltip/tooltip-root.tsx
const tooltips = {};
let tooltipsCounter = 0;
let globalWarmedUp = false;
let globalWarmUpTimeout;
let globalCoolDownTimeout;
let globalSkipDelayTimeout;
/**
* A popup that displays information related to an element
* when the element receives keyboard focus or the mouse hovers over it.
*/
function TooltipRoot(props) {
	const defaultId = `tooltip-${createUniqueId()}`;
	const tooltipId = `${++tooltipsCounter}`;
	const mergedProps = merge({
		id: defaultId,
		openDelay: 700,
		closeDelay: 300,
		skipDelayDuration: 300
	}, props);
	const others = omit(mergedProps, "id", "open", "defaultOpen", "onOpenChange", "disabled", "triggerOnFocusOnly", "openDelay", "closeDelay", "skipDelayDuration", "ignoreSafeArea", "forceMount", "onCurrentPlacementChange");
	let closeTimeoutId;
	const [contentId, setContentId] = createSignal(void 0, { ownedWrite: true });
	const [triggerRef, setTriggerRef] = createSignal(void 0, { ownedWrite: true });
	const [contentRef, setContentRef] = createSignal(void 0, { ownedWrite: true });
	const [currentPlacement, setCurrentPlacement] = createSignal(others.placement);
	const disclosureState = createDisclosureState({
		open: () => mergedProps.open,
		defaultOpen: () => mergedProps.defaultOpen,
		onOpenChange: (isOpen) => mergedProps.onOpenChange?.(isOpen)
	});
	const { isMounted: contentPresent } = createPresence(() => mergedProps.forceMount || disclosureState.isOpen() || void 0, { transitionDuration: 0 });
	const ensureTooltipEntry = () => {
		tooltips[tooltipId] = hideTooltip;
	};
	const closeOpenTooltips = () => {
		for (const hideTooltipId in tooltips) if (hideTooltipId !== tooltipId) {
			tooltips[hideTooltipId](true);
			delete tooltips[hideTooltipId];
		}
	};
	const hideTooltip = (immediate = false) => {
		if (isServer) return;
		if (immediate || mergedProps.closeDelay && mergedProps.closeDelay <= 0) {
			window.clearTimeout(closeTimeoutId);
			closeTimeoutId = void 0;
			disclosureState.close();
		} else if (!closeTimeoutId) closeTimeoutId = window.setTimeout(() => {
			closeTimeoutId = void 0;
			disclosureState.close();
		}, mergedProps.closeDelay);
		window.clearTimeout(globalWarmUpTimeout);
		globalWarmUpTimeout = void 0;
		if (mergedProps.skipDelayDuration && mergedProps.skipDelayDuration >= 0) globalSkipDelayTimeout = window.setTimeout(() => {
			window.clearTimeout(globalSkipDelayTimeout);
			globalSkipDelayTimeout = void 0;
		}, mergedProps.skipDelayDuration);
		if (globalWarmedUp) {
			window.clearTimeout(globalCoolDownTimeout);
			globalCoolDownTimeout = window.setTimeout(() => {
				delete tooltips[tooltipId];
				globalCoolDownTimeout = void 0;
				globalWarmedUp = false;
			}, mergedProps.closeDelay);
		}
	};
	const showTooltip = () => {
		if (isServer) return;
		clearTimeout(closeTimeoutId);
		closeTimeoutId = void 0;
		closeOpenTooltips();
		ensureTooltipEntry();
		globalWarmedUp = true;
		disclosureState.open();
		window.clearTimeout(globalWarmUpTimeout);
		globalWarmUpTimeout = void 0;
		window.clearTimeout(globalCoolDownTimeout);
		globalCoolDownTimeout = void 0;
		window.clearTimeout(globalSkipDelayTimeout);
		globalSkipDelayTimeout = void 0;
	};
	const warmupTooltip = () => {
		if (isServer) return;
		closeOpenTooltips();
		ensureTooltipEntry();
		if (!disclosureState.isOpen() && !globalWarmUpTimeout && !globalWarmedUp) globalWarmUpTimeout = window.setTimeout(() => {
			globalWarmUpTimeout = void 0;
			globalWarmedUp = true;
			showTooltip();
		}, mergedProps.openDelay);
		else if (!disclosureState.isOpen()) showTooltip();
	};
	const openTooltip = (immediate = false) => {
		if (isServer) return;
		if (!immediate && mergedProps.openDelay && mergedProps.openDelay > 0 && !closeTimeoutId && !globalSkipDelayTimeout) warmupTooltip();
		else showTooltip();
	};
	const cancelOpening = () => {
		if (isServer) return;
		window.clearTimeout(globalWarmUpTimeout);
		globalWarmUpTimeout = void 0;
		globalWarmedUp = false;
	};
	const cancelClosing = () => {
		if (isServer) return;
		window.clearTimeout(closeTimeoutId);
		closeTimeoutId = void 0;
	};
	const isTargetOnTooltip = (target) => {
		return (triggerRef()?.contains(target) ?? false) || (contentRef()?.contains(target) ?? false);
	};
	const getPolygonSafeArea = (placement) => {
		const triggerEl = triggerRef();
		const contentEl = contentRef();
		if (!triggerEl || !contentEl) return;
		return getTooltipSafeArea(placement, triggerEl, contentEl);
	};
	const onHoverOutside = (event) => {
		const target = event.target;
		if (isTargetOnTooltip(target)) {
			cancelClosing();
			return;
		}
		if (!mergedProps.ignoreSafeArea) {
			const polygon = getPolygonSafeArea(currentPlacement());
			if (polygon && isPointInPolygon([event.clientX, event.clientY], polygon)) {
				cancelClosing();
				return;
			}
		}
		if (closeTimeoutId) return;
		hideTooltip();
	};
	createEffect(() => disclosureState.isOpen(), (isOpen) => {
		if (isServer || !isOpen) return;
		const doc = document;
		doc.addEventListener("pointermove", onHoverOutside, true);
		return () => {
			doc.removeEventListener("pointermove", onHoverOutside, true);
		};
	});
	createEffect(() => ({
		trigger: triggerRef(),
		isOpen: disclosureState.isOpen()
	}), ({ trigger, isOpen }) => {
		if (!trigger || !isOpen) return;
		const handleScroll = (event) => {
			if (event.target.contains(trigger)) hideTooltip(true);
		};
		const win = window;
		win.addEventListener("scroll", handleScroll, { capture: true });
		return () => {
			win.removeEventListener("scroll", handleScroll, { capture: true });
		};
	});
	onCleanup(() => {
		clearTimeout(closeTimeoutId);
		if (tooltips[tooltipId]) delete tooltips[tooltipId];
	});
	const context = {
		dataset: createMemo(() => ({
			"data-expanded": disclosureState.isOpen() ? "" : void 0,
			"data-closed": !disclosureState.isOpen() ? "" : void 0
		})),
		isOpen: disclosureState.isOpen,
		isDisabled: () => mergedProps.disabled ?? false,
		triggerOnFocusOnly: () => mergedProps.triggerOnFocusOnly ?? false,
		contentId,
		contentPresent,
		openTooltip,
		hideTooltip,
		cancelOpening,
		generateId: (suffix) => `${mergedProps.id}-${suffix}`,
		registerContentId: createRegisterId(setContentId),
		isTargetOnTooltip,
		setTriggerRef,
		setContentRef
	};
	return createComponent(TooltipContext, {
		value: context,
		get children() {
			return createComponent(Popper, mergeProps({
				anchorRef: triggerRef,
				contentRef,
				onCurrentPlacementChange: (value) => {
					setCurrentPlacement(value);
					mergedProps.onCurrentPlacementChange?.(value);
				}
			}, others));
		}
	});
}
//#endregion
//#region src/tooltip/tooltip-trigger.tsx
/**
* The button that opens the tooltip when hovered.
*/
function TooltipTrigger(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const context = useTooltipContext();
	const p = props;
	const others = omit(p, "ref", "onPointerEnter", "onPointerLeave", "onPointerDown", "onClick", "onFocus", "onBlur");
	let isPointerDown = false;
	let isHovered = false;
	let isFocused = false;
	const handlePointerUp = () => {
		isPointerDown = false;
	};
	const handleShow = () => {
		if (!context.isOpen() && (isHovered || isFocused)) context.openTooltip(isFocused);
	};
	const handleHide = (immediate) => {
		if (context.isOpen() && !isHovered && !isFocused) context.hideTooltip(immediate);
	};
	const onPointerEnter = (e) => {
		callHandler(e, p.onPointerEnter);
		if (e.pointerType === "touch" || context.triggerOnFocusOnly() || context.isDisabled() || e.defaultPrevented) return;
		isHovered = true;
		handleShow();
	};
	const onPointerLeave = (e) => {
		callHandler(e, p.onPointerLeave);
		if (e.pointerType === "touch") return;
		isHovered = false;
		isFocused = false;
		if (context.isOpen()) handleHide();
		else context.cancelOpening();
	};
	const onPointerDown = (e) => {
		callHandler(e, p.onPointerDown);
		isPointerDown = true;
		(ref()?.ownerDocument ?? document).addEventListener("pointerup", handlePointerUp, { once: true });
	};
	const onClick = (e) => {
		callHandler(e, p.onClick);
		isHovered = false;
		isFocused = false;
		handleHide(true);
	};
	const onFocus = (e) => {
		callHandler(e, p.onFocus);
		if (context.isDisabled() || e.defaultPrevented || isPointerDown) return;
		isFocused = true;
		handleShow();
	};
	const onBlur = (e) => {
		callHandler(e, p.onBlur);
		const relatedTarget = e.relatedTarget;
		if (context.isTargetOnTooltip(relatedTarget)) return;
		isHovered = false;
		isFocused = false;
		handleHide(true);
	};
	onCleanup(() => {
		if (isServer) return;
		(ref()?.ownerDocument ?? document).removeEventListener("pointerup", handlePointerUp);
	});
	return createComponent(Polymorphic, mergeProps({
		as: "button",
		ref: [(el) => {
			context.setTriggerRef(el);
			setRef(el);
		}, p.ref],
		get ["aria-describedby"]() {
			return memo(() => !!context.isOpen())() ? context.contentId() : void 0;
		},
		onPointerEnter,
		onPointerLeave,
		onPointerDown,
		onClick,
		onFocus,
		onBlur
	}, () => context.dataset(), others));
}
//#endregion
//#region src/tooltip/index.tsx
var tooltip_exports = /* @__PURE__ */ __exportAll({
	Arrow: () => PopperArrow,
	Content: () => TooltipContent,
	Portal: () => TooltipPortal,
	Root: () => TooltipRoot,
	Tooltip: () => Tooltip,
	Trigger: () => TooltipTrigger,
	useTooltipContext: () => useTooltipContext
});
const Tooltip = Object.assign(TooltipRoot, {
	Arrow: PopperArrow,
	Content: TooltipContent,
	Portal: TooltipPortal,
	Trigger: TooltipTrigger
});
//#endregion
export { TooltipPortal as a, TooltipRoot as i, tooltip_exports as n, TooltipContent as o, TooltipTrigger as r, useTooltipContext as s, Tooltip as t };
