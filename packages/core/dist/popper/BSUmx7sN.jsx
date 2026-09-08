import { Polymorphic } from "../polymorphic/index.jsx";
import { useLocale } from "../i18n/index.jsx";
import { combineStyle } from "@solid-primitives/props";
import { createContext, createEffect, createSignal, createTrackedEffect, merge, omit, untrack, useContext } from "solid-js";
import { arrow, autoUpdate, computePosition, flip, hide, offset, platform, shift, size } from "@floating-ui/dom";
//#region src/popper/popper-context.tsx
const PopperContext = createContext();
function usePopperContext() {
	const context = useContext(PopperContext);
	if (context === void 0) throw new Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");
	return context;
}
//#endregion
//#region src/popper/popper-arrow.tsx
const DEFAULT_SIZE = 30;
const HALF_DEFAULT_SIZE = DEFAULT_SIZE / 2;
const ROTATION_DEG = {
	top: 180,
	right: -90,
	bottom: 0,
	left: 90
};
const ARROW_PATH = "M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z";
/**
* An optional arrow element to render alongside the popper content.
* Must be rendered in the popper content.
*/
function PopperArrow(props) {
	const context = usePopperContext();
	const mergedProps = merge({ size: DEFAULT_SIZE }, props);
	const others = omit(mergedProps, "ref", "style", "size");
	const dir = () => context.currentPlacement().split("-")[0];
	const contentStyle = createComputedStyle(context.contentRef);
	const fill = () => contentStyle()?.getPropertyValue("background-color") || "none";
	const stroke = () => contentStyle()?.getPropertyValue(`border-${dir()}-color`) || "none";
	const borderWidth = () => contentStyle()?.getPropertyValue(`border-${dir()}-width`) || "0px";
	const strokeWidth = () => {
		return Number.parseInt(borderWidth(), 10) * 2 * (DEFAULT_SIZE / mergedProps.size);
	};
	const rotate = () => {
		return `rotate(${ROTATION_DEG[dir()]} ${HALF_DEFAULT_SIZE} ${HALF_DEFAULT_SIZE}) translate(0 2)`;
	};
	return <Polymorphic as="div" ref={[context.setArrowRef, mergedProps.ref]} aria-hidden="true" style={combineStyle({
		position: "absolute",
		"font-size": `${mergedProps.size}px`,
		width: "1em",
		height: "1em",
		"pointer-events": "none",
		fill: fill(),
		stroke: stroke(),
		"stroke-width": strokeWidth()
	}, mergedProps.style)} {...others}>
			<svg display="block" viewBox={`0 0 ${DEFAULT_SIZE} ${DEFAULT_SIZE}`} style="transform:scale(1.02)">
				<g transform={rotate()}>
					<path fill="none" d={ARROW_PATH} />
					<path stroke="none" d={ARROW_PATH} />
				</g>
			</svg>
		</Polymorphic>;
}
function createComputedStyle(element) {
	const [style, setStyle] = createSignal();
	createEffect(() => element(), (el) => {
		if (el) setStyle((el.ownerDocument.defaultView ?? window).getComputedStyle(el));
	});
	return style;
}
//#endregion
//#region src/popper/popper-positioner.tsx
/**
* The wrapper component that positions the popper content relative to the popper anchor.
*/
function PopperPositioner(props) {
	const context = usePopperContext();
	const others = omit(props, "ref", "style");
	return <Polymorphic as="div" ref={[(el) => { context.setPositionerRef(el); queueMicrotask(() => context.startUpdates?.()); }, props.ref]} data-popper-positioner="" style={combineStyle({
		position: "absolute",
		top: 0,
		left: 0,
		"min-width": "max-content"
	}, props.style)} {...others} />;
}
//#endregion
//#region src/popper/utils.ts
function createDOMRect(anchorRect) {
	const { x = 0, y = 0, width = 0, height = 0 } = anchorRect ?? {};
	if (typeof DOMRect === "function") return new DOMRect(x, y, width, height);
	const rect = {
		x,
		y,
		width,
		height,
		top: y,
		right: x + width,
		bottom: y + height,
		left: x
	};
	return {
		...rect,
		toJSON: () => rect
	};
}
function getAnchorElement(anchor, getAnchorRect) {
	return {
		contextElement: anchor,
		getBoundingClientRect: () => {
			const anchorRect = getAnchorRect(anchor);
			if (anchorRect) return createDOMRect(anchorRect);
			if (anchor) return anchor.getBoundingClientRect();
			return createDOMRect();
		}
	};
}
function isValidPlacement(flip) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(flip);
}
const REVERSE_BASE_PLACEMENT = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
};
function getTransformOrigin(placement, readingDirection) {
	const [basePlacement, alignment] = placement.split("-");
	const reversePlacement = REVERSE_BASE_PLACEMENT[basePlacement];
	if (!alignment) return `${reversePlacement} center`;
	if (basePlacement === "left" || basePlacement === "right") return `${reversePlacement} ${alignment === "start" ? "top" : "bottom"}`;
	if (alignment === "start") return `${reversePlacement} ${readingDirection === "rtl" ? "right" : "left"}`;
	return `${reversePlacement} ${readingDirection === "rtl" ? "left" : "right"}`;
}
//#endregion
//#region src/popper/popper-root.tsx
/**
* Display a floating content relative to an anchor element with an optional arrow.
*/
function PopperRoot(props) {
	const mergedProps = merge({
		getAnchorRect: (anchor) => anchor?.getBoundingClientRect(),
		placement: "bottom",
		gutter: 0,
		shift: 0,
		flip: true,
		slide: true,
		overlap: false,
		sameWidth: false,
		fitViewport: false,
		hideWhenDetached: false,
		detachedPadding: 0,
		arrowPadding: 4,
		overflowPadding: 8
	}, props);
	const [positionerRef, setPositionerRef] = createSignal(void 0, { ownedWrite: true });
	const [arrowRef, setArrowRef] = createSignal(void 0, { ownedWrite: true });
	const [currentPlacement, setCurrentPlacement] = createSignal(untrack(() => mergedProps.placement));
	const anchorRef = () => getAnchorElement(mergedProps.anchorRef?.(), mergedProps.getAnchorRect);
	const { direction } = useLocale();
	let startedEl;
	function startUpdates() {
		const referenceEl = anchorRef();
		const floatingEl = positionerRef();
		if (!referenceEl || !floatingEl || startedEl === floatingEl) return;
		startedEl = floatingEl;
		return autoUpdate(referenceEl, floatingEl, updatePosition, { elementResize: typeof ResizeObserver === "function" });
	}
	async function updatePosition() {
		const referenceEl = anchorRef();
		const floatingEl = positionerRef();
		const arrowEl = arrowRef();
		if (!referenceEl || !floatingEl) return;
		const arrowOffset = (arrowEl?.clientHeight || 0) / 2;
		const finalGutter = typeof mergedProps.gutter === "number" ? mergedProps.gutter + arrowOffset : mergedProps.gutter ?? arrowOffset;
		floatingEl.style.setProperty("--kb-popper-content-overflow-padding", `${mergedProps.overflowPadding}px`);
		referenceEl.getBoundingClientRect();
		const middleware = [offset(({ placement }) => {
			const hasAlignment = !!placement.split("-")[1];
			return {
				mainAxis: finalGutter,
				crossAxis: !hasAlignment ? mergedProps.shift : void 0,
				alignmentAxis: mergedProps.shift
			};
		})];
		if (mergedProps.flip !== false) {
			const fallbackPlacements = typeof mergedProps.flip === "string" ? mergedProps.flip.split(" ") : void 0;
			if (fallbackPlacements !== void 0 && !fallbackPlacements.every(isValidPlacement)) throw new Error("`flip` expects a spaced-delimited list of placements");
			middleware.push(flip({
				padding: mergedProps.overflowPadding,
				fallbackPlacements
			}));
		}
		if (mergedProps.slide || mergedProps.overlap) middleware.push(shift({
			mainAxis: mergedProps.slide,
			crossAxis: mergedProps.overlap,
			padding: mergedProps.overflowPadding
		}));
		middleware.push(size({
			padding: mergedProps.overflowPadding,
			apply({ availableWidth, availableHeight, rects }) {
				const referenceWidth = Math.round(rects.reference.width);
				availableWidth = Math.floor(availableWidth);
				availableHeight = Math.floor(availableHeight);
				floatingEl.style.setProperty("--kb-popper-anchor-width", `${referenceWidth}px`);
				floatingEl.style.setProperty("--kb-popper-content-available-width", `${availableWidth}px`);
				floatingEl.style.setProperty("--kb-popper-content-available-height", `${availableHeight}px`);
				if (mergedProps.sameWidth) floatingEl.style.width = `${referenceWidth}px`;
				if (mergedProps.fitViewport) {
					floatingEl.style.maxWidth = `${availableWidth}px`;
					floatingEl.style.maxHeight = `${availableHeight}px`;
				}
			}
		}));
		if (mergedProps.hideWhenDetached) middleware.push(hide({ padding: mergedProps.detachedPadding }));
		if (arrowEl) middleware.push(arrow({
			element: arrowEl,
			padding: mergedProps.arrowPadding
		}));
		const pos = await computePosition(referenceEl, floatingEl, {
			placement: mergedProps.placement,
			strategy: "absolute",
			middleware,
			platform: {
				...platform,
				isRTL: () => direction() === "rtl"
			}
		});
		setCurrentPlacement(pos.placement);
		mergedProps.onCurrentPlacementChange?.(pos.placement);
		if (!floatingEl) return;
		floatingEl.style.setProperty("--kb-popper-content-transform-origin", getTransformOrigin(pos.placement, direction()));
		const x = Math.round(pos.x);
		const y = Math.round(pos.y);
		let visibility;
		if (mergedProps.hideWhenDetached) visibility = pos.middlewareData.hide?.referenceHidden ? "hidden" : "visible";
		Object.assign(floatingEl.style, {
			top: "0",
			left: "0",
			transform: `translate3d(${x}px, ${y}px, 0)`,
			visibility
		});
		if (arrowEl && pos.middlewareData.arrow) {
			const { x: arrowX, y: arrowY } = pos.middlewareData.arrow;
			const dir = pos.placement.split("-")[0];
			Object.assign(arrowEl.style, {
				left: arrowX != null ? `${arrowX}px` : "",
				top: arrowY != null ? `${arrowY}px` : "",
				[dir]: "100%"
			});
		}
	}
	createTrackedEffect(() => {
		return startUpdates();
	});
	createTrackedEffect(() => {
		const positioner = positionerRef();
		const content = mergedProps.contentRef?.();
		if (!positioner || !content) return;
		queueMicrotask(() => {
			positioner.style.zIndex = getComputedStyle(content).zIndex;
		});
	});
	const context = {
		currentPlacement,
		contentRef: () => mergedProps.contentRef?.(),
		setPositionerRef,
		setArrowRef,
		startUpdates
	};
	return <PopperContext value={context}>{mergedProps.children}</PopperContext>;
}
//#endregion
//#region src/popper/index.tsx
const Popper = Object.assign(PopperRoot, {
	Arrow: PopperArrow,
	Context: PopperContext,
	usePopperContext,
	Positioner: PopperPositioner
});
//#endregion
export { PopperContext as a, PopperArrow as i, PopperRoot as n, usePopperContext as o, PopperPositioner as r, Popper as t };
