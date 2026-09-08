import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { t as createDisclosureState } from "../create-disclosure-state/DV_ixT98.jsx";
import { t as DismissableLayer } from "../dismissable-layer/RyRdwdaj.jsx";
import { n as link_exports } from "../link/Dzw5gaq8.jsx";
import { i as PopperArrow, t as Popper } from "../popper/BSUmx7sN.jsx";
import { combineStyle } from "@solid-primitives/props";
import { Show, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, onCleanup, useContext } from "solid-js";
import { createPresence } from "@solid-primitives/presence";
import { Portal, isServer } from "@solidjs/web";
import { callHandler, isPointInPolygon } from "@kobalte/utils";
import { createEventListener } from "@solid-primitives/event-listener";
//#region src/hover-card/hover-card-context.tsx
const HoverCardContext = createContext();
function useHoverCardContext() {
	const context = useContext(HoverCardContext);
	if (context === void 0) throw new Error("[kobalte]: `useHoverCardContext` must be used within a `HoverCard` component");
	return context;
}
//#endregion
//#region src/hover-card/hover-card-content.tsx
/**
* Contains the content to be rendered when the hovercard is open.
*/
function HoverCardContent(props) {
	const context = useHoverCardContext();
	const p = props;
	const others = omit(p, "ref", "style");
	return <Show when={context.contentPresent()}>
			<Popper.Positioner>
				<DismissableLayer ref={[(el) => {
		context.setContentRef(el);
	}, p.ref]} disableOutsidePointerEvents={false} style={combineStyle({
		"--kb-hovercard-content-transform-origin": "var(--kb-popper-content-transform-origin)",
		position: "relative"
	}, p.style)} onFocusOutside={(e) => e.preventDefault()} onDismiss={context.close} {...context.dataset()} {...others} />
			</Popper.Positioner>
		</Show>;
}
//#endregion
//#region src/hover-card/hover-card-portal.tsx
/**
* Portals its children into the `body` when the hovercard is open.
*/
function HoverCardPortal(props) {
	const context = useHoverCardContext();
	return <Show when={context.contentPresent()}>
			<Portal {...props} />
		</Show>;
}
//#endregion
//#region src/hover-card/utils.ts
/**
* Construct a polygon based on the floating element placement relative to the anchor.
*/
function getHoverCardSafeArea(placement, anchorEl, floatingEl) {
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
//#region src/hover-card/hover-card-root.tsx
/**
* A popover that allows sighted users to preview content available behind a link.
*/
function HoverCardRoot(props) {
	const defaultId = `hovercard-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		openDelay: 700,
		closeDelay: 300
	}, props);
	const others = omit(mergedProps, "id", "open", "defaultOpen", "onOpenChange", "openDelay", "closeDelay", "ignoreSafeArea", "forceMount");
	let openTimeoutId;
	let closeTimeoutId;
	const [triggerRef, setTriggerRef] = createSignal(void 0, { ownedWrite: true });
	const [contentRef, setContentRef] = createSignal(void 0, { ownedWrite: true });
	const [currentPlacement, setCurrentPlacement] = createSignal(others.placement);
	const disclosureState = createDisclosureState({
		open: () => mergedProps.open,
		defaultOpen: () => mergedProps.defaultOpen,
		onOpenChange: (isOpen) => mergedProps.onOpenChange?.(isOpen)
	});
	const { isMounted: contentPresent } = createPresence(() => mergedProps.forceMount || disclosureState.isOpen() || void 0, { transitionDuration: 0 });
	const openWithDelay = () => {
		if (isServer) return;
		openTimeoutId = window.setTimeout(() => {
			openTimeoutId = void 0;
			disclosureState.open();
		}, mergedProps.openDelay);
	};
	const closeWithDelay = () => {
		if (isServer) return;
		closeTimeoutId = window.setTimeout(() => {
			closeTimeoutId = void 0;
			disclosureState.close();
		}, mergedProps.closeDelay);
	};
	const cancelOpening = () => {
		if (isServer) return;
		window.clearTimeout(openTimeoutId);
		openTimeoutId = void 0;
	};
	const cancelClosing = () => {
		if (isServer) return;
		window.clearTimeout(closeTimeoutId);
		closeTimeoutId = void 0;
	};
	const isTargetOnHoverCard = (target) => {
		return (triggerRef()?.contains(target) ?? false) || (contentRef()?.contains(target) ?? false);
	};
	const getPolygonSafeArea = (placement) => {
		const triggerEl = triggerRef();
		const contentEl = contentRef();
		if (!triggerEl || !contentEl) return;
		return getHoverCardSafeArea(placement, triggerEl, contentEl);
	};
	const onHoverOutside = (event) => {
		const target = event.target;
		if (isTargetOnHoverCard(target)) {
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
		closeWithDelay();
	};
	createEffect(() => disclosureState.isOpen(), (isOpen) => {
		if (!isOpen) return;
		createEventListener(document, "pointermove", onHoverOutside, true);
	});
	onCleanup(() => {
		cancelOpening();
		cancelClosing();
	});
	const context = {
		dataset: createMemo(() => ({
			"data-expanded": disclosureState.isOpen() ? "" : void 0,
			"data-closed": !disclosureState.isOpen() ? "" : void 0
		})),
		isOpen: disclosureState.isOpen,
		contentPresent,
		openWithDelay,
		closeWithDelay,
		cancelOpening,
		cancelClosing,
		close: disclosureState.close,
		isTargetOnHoverCard,
		setTriggerRef,
		setContentRef
	};
	return <HoverCardContext value={context}>
			<Popper anchorRef={triggerRef} contentRef={contentRef} onCurrentPlacementChange={setCurrentPlacement} {...others} />
		</HoverCardContext>;
}
//#endregion
//#region src/hover-card/hover-card-trigger.tsx
/**
* The link that opens the hovercard when hovered.
*/
function HoverCardTrigger(props) {
	const context = useHoverCardContext();
	const p = props;
	const others = omit(p, "ref", "onPointerEnter", "onPointerLeave", "onFocus", "onBlur");
	const onPointerEnter = (e) => {
		callHandler(e, p.onPointerEnter);
		if (e.pointerType === "touch" || others.disabled || e.defaultPrevented) return;
		context.cancelClosing();
		if (!context.isOpen()) context.openWithDelay();
	};
	const onPointerLeave = (e) => {
		callHandler(e, p.onPointerLeave);
		if (e.pointerType === "touch") return;
		context.cancelOpening();
	};
	const onFocus = (e) => {
		callHandler(e, p.onFocus);
		if (others.disabled || e.defaultPrevented) return;
		context.cancelClosing();
		if (!context.isOpen()) context.openWithDelay();
	};
	const onBlur = (e) => {
		callHandler(e, p.onBlur);
		context.cancelOpening();
		const relatedTarget = e.relatedTarget;
		if (context.isTargetOnHoverCard(relatedTarget)) return;
		context.closeWithDelay();
	};
	onCleanup(context.cancelOpening);
	return <link_exports.Root ref={[context.setTriggerRef, p.ref]} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onFocus={onFocus} onBlur={onBlur} {...context.dataset()} {...others} />;
}
//#endregion
//#region src/hover-card/index.tsx
var hover_card_exports = /* @__PURE__ */ __exportAll({
	Arrow: () => PopperArrow,
	Content: () => HoverCardContent,
	HoverCard: () => HoverCard,
	Portal: () => HoverCardPortal,
	Root: () => HoverCardRoot,
	Trigger: () => HoverCardTrigger,
	useHoverCardContext: () => useHoverCardContext
});
const HoverCard = Object.assign(HoverCardRoot, {
	Arrow: PopperArrow,
	Content: HoverCardContent,
	Portal: HoverCardPortal,
	Trigger: HoverCardTrigger
});
//#endregion
export { HoverCardPortal as a, HoverCardRoot as i, hover_card_exports as n, HoverCardContent as o, HoverCardTrigger as r, useHoverCardContext as s, HoverCard as t };
