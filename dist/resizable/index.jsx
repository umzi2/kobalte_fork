import { t as primitives_exports } from "../primitives/BlSoAAAV.jsx";
import { combineStyle } from "@solid-primitives/props";
import { Show, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, untrack, useContext } from "solid-js";
import { callHandler } from "@kobalte/utils";
//#region src/resizable/resizable-context.tsx
const ResizableContext = createContext();
/** Returns the nearest `<Resizable.Root>` context. Throws if called outside one. */
function useResizableContext() {
	const ctx = useContext(ResizableContext);
	if (!ctx) throw new Error("[kobalte]: `useResizableContext` must be used within a `Resizable.Root`");
	return ctx;
}
const ResizableInternalContext = createContext();
function useResizableInternalContext() {
	const ctx = useContext(ResizableInternalContext);
	if (!ctx) throw new Error("[kobalte]: `useResizableInternalContext` must be used within a `Resizable.Root`");
	return ctx;
}
//#endregion
//#region src/resizable/resizable-lib.ts
const PRECISION = 6;
const fixToPrecision = (value) => parseFloat(value.toFixed(PRECISION));
const resolveSize = (size, rootSize) => {
	if (typeof size === "number") return size;
	if (!size.endsWith("px")) throw new Error(`[kobalte]: Resizable sizes must be a number or a string ending with 'px'. Got ${size}`);
	return fixToPrecision(parseFloat(size) / rootSize);
};
const splitPanels = (props) => {
	return [props.panels.filter((panel) => !!(props.focusedElement.compareDocumentPosition(panel.data.element) & Node.DOCUMENT_POSITION_PRECEDING)), props.panels.filter((panel) => !!(props.focusedElement.compareDocumentPosition(panel.data.element) & Node.DOCUMENT_POSITION_FOLLOWING))];
};
const getDistributablePercentage = (props) => {
	let distributablePercentage = props.desiredPercentage >= 0 ? Infinity : -Infinity;
	let newSizes = props.initialSizes;
	for (const resizeAction of props.resizeActions) {
		const desiredPercentage = resizeAction.negate !== true ? props.desiredPercentage : -props.desiredPercentage;
		let [distributedPreceding, distributedSizesPreceding, collapsedPreceding] = distributePercentage({
			desiredPercentage,
			side: "preceding",
			panels: resizeAction.precedingPanels,
			initialSizes: newSizes,
			initialSizesStartIndex: 0,
			collapsible: props.collapsible,
			rootSize: props.resizableData.rootSize
		});
		let [distributedFollowing, distributedSizesFollowing, collapsedFollowing] = distributePercentage({
			desiredPercentage,
			side: "following",
			panels: resizeAction.followingPanels,
			initialSizes: newSizes,
			initialSizesStartIndex: resizeAction.precedingPanels.length,
			collapsible: props.collapsible,
			rootSize: props.resizableData.rootSize
		});
		if (resizeAction.negate === true) {
			distributedPreceding = -distributedPreceding;
			distributedFollowing = -distributedFollowing;
		}
		if (collapsedPreceding) distributedFollowing = distributedPreceding;
		if (collapsedFollowing) distributedPreceding = distributedFollowing;
		if (props.desiredPercentage >= 0) distributablePercentage = Math.min(distributablePercentage, Math.min(distributedPreceding, distributedFollowing));
		else distributablePercentage = Math.max(distributablePercentage, Math.max(distributedPreceding, distributedFollowing));
		newSizes = [...distributedSizesPreceding, ...distributedSizesFollowing];
	}
	return distributablePercentage;
};
const distributePercentage = (props) => {
	props.desiredPercentage = fixToPrecision(props.desiredPercentage);
	const resizeDirection = getResizeDirection({
		side: props.side,
		desiredPercentage: props.desiredPercentage
	});
	let distributedPercentage = 0;
	const distributedSizes = props.initialSizes.slice(props.initialSizesStartIndex, props.initialSizesStartIndex + props.panels.length);
	for (let i = props.side === "preceding" ? props.panels.length - 1 : 0; props.side === "preceding" ? i >= 0 : i < props.panels.length; props.side === "preceding" ? i-- : i++) {
		const panel = props.panels[i];
		const panelSize = props.initialSizes[i + props.initialSizesStartIndex];
		const collapsedSize = resolveSize(panel.data.collapsedSize ?? 0, props.rootSize);
		if (panel.data.collapsible && panelSize === collapsedSize) continue;
		const availablePercentage = fixToPrecision(props.desiredPercentage - distributedPercentage);
		if (availablePercentage === 0) break;
		switch (resizeDirection) {
			case "precedingDecreasing": {
				const minSize = resolveSize(panel.data.minSize, props.rootSize);
				distributedSizes[i] = Math.max(minSize, panelSize + availablePercentage);
				distributedPercentage += distributedSizes[i] - panelSize;
				break;
			}
			case "followingDecreasing": {
				const minSize = resolveSize(panel.data.minSize, props.rootSize);
				distributedSizes[i] = Math.max(minSize, panelSize - availablePercentage);
				distributedPercentage -= distributedSizes[i] - panelSize;
				break;
			}
			case "precedingIncreasing": {
				const maxSize = resolveSize(panel.data.maxSize, props.rootSize);
				distributedSizes[i] = Math.min(maxSize, panelSize + availablePercentage);
				distributedPercentage += distributedSizes[i] - panelSize;
				break;
			}
			case "followingIncreasing": {
				const maxSize = resolveSize(panel.data.maxSize, props.rootSize);
				distributedSizes[i] = Math.min(maxSize, panelSize - availablePercentage);
				distributedPercentage -= distributedSizes[i] - panelSize;
				break;
			}
		}
	}
	distributedPercentage = fixToPrecision(distributedPercentage);
	if (!props.collapsible || distributedPercentage === props.desiredPercentage) return [
		distributedPercentage,
		distributedSizes,
		false
	];
	const panelIndex = props.side === "preceding" ? props.panels.length - 1 : 0;
	const panel = props.panels[panelIndex];
	if (!panel.data.collapsible) return [
		distributedPercentage,
		distributedSizes,
		false
	];
	const availablePercentage = fixToPrecision(props.desiredPercentage - distributedPercentage);
	let collapsed = false;
	const panelSize = props.initialSizes[panelIndex + props.initialSizesStartIndex];
	const minSize = resolveSize(panel.data.minSize, props.rootSize);
	const collapsedSize = resolveSize(panel.data.collapsedSize ?? 0, props.rootSize);
	const collapseThreshold = Math.min(resolveSize(panel.data.collapseThreshold ?? 0, props.rootSize), minSize - collapsedSize);
	const isCollapsed = panelSize === collapsedSize;
	if (resizeDirection === "precedingDecreasing" && !isCollapsed && Math.abs(availablePercentage) >= collapseThreshold) {
		distributedPercentage -= distributedSizes[panelIndex] - panelSize;
		distributedSizes[panelIndex] = collapsedSize;
		distributedPercentage += distributedSizes[panelIndex] - panelSize;
		collapsed = true;
	} else if (resizeDirection === "precedingIncreasing" && isCollapsed && Math.abs(availablePercentage) >= collapseThreshold) {
		distributedSizes[panelIndex] = resolveSize(panel.data.minSize, props.rootSize);
		if (Math.abs(availablePercentage) >= minSize - collapsedSize) {
			const maxSize = resolveSize(panel.data.maxSize, props.rootSize);
			distributedSizes[panelIndex] = Math.min(maxSize, panelSize + availablePercentage);
		} else collapsed = true;
		distributedPercentage += distributedSizes[panelIndex] - panelSize;
	} else if (resizeDirection === "followingDecreasing" && !isCollapsed && Math.abs(availablePercentage) >= collapseThreshold) {
		distributedPercentage += distributedSizes[panelIndex] - panelSize;
		distributedSizes[panelIndex] = collapsedSize;
		distributedPercentage -= distributedSizes[panelIndex] - panelSize;
		collapsed = true;
	} else if (resizeDirection === "followingIncreasing" && isCollapsed && Math.abs(availablePercentage) >= collapseThreshold) {
		distributedSizes[panelIndex] = resolveSize(panel.data.minSize, props.rootSize);
		if (Math.abs(availablePercentage) >= minSize - collapsedSize) {
			const maxSize = resolveSize(panel.data.maxSize, props.rootSize);
			distributedSizes[panelIndex] = Math.min(maxSize, panelSize - availablePercentage);
		} else collapsed = true;
		distributedPercentage -= distributedSizes[panelIndex] - panelSize;
	}
	return [
		distributedPercentage,
		distributedSizes,
		collapsed
	];
};
const getResizeDirection = (props) => {
	switch (props.side) {
		case "preceding": return props.desiredPercentage >= 0 ? "precedingIncreasing" : "precedingDecreasing";
		case "following": return props.desiredPercentage >= 0 ? "followingDecreasing" : "followingIncreasing";
	}
};
const applyResize = (props) => {
	let newSizes = props.initialSizes;
	for (const resizeAction of props.resizeActions) {
		const [, preceding] = distributePercentage({
			desiredPercentage: resizeAction.deltaPercentage,
			side: "preceding",
			panels: resizeAction.precedingPanels,
			initialSizes: newSizes,
			initialSizesStartIndex: 0,
			collapsible: props.collapsible,
			rootSize: props.resizableData.rootSize
		});
		const [, following] = distributePercentage({
			desiredPercentage: resizeAction.deltaPercentage,
			side: "following",
			panels: resizeAction.followingPanels,
			initialSizes: newSizes,
			initialSizesStartIndex: resizeAction.precedingPanels.length,
			collapsible: props.collapsible,
			rootSize: props.resizableData.rootSize
		});
		newSizes = [...preceding, ...following];
	}
	newSizes = newSizes.map(fixToPrecision);
	const totalSize = newSizes.reduce((s, x) => s + x, 0);
	if (totalSize !== 1) {
		const offsetPerPanel = (totalSize - 1) / newSizes.length;
		newSizes = newSizes.map((s) => s - offsetPerPanel);
	}
	props.resizableData.setSizes(newSizes.map(fixToPrecision));
};
const resizePanel = (props) => {
	let [precedingPanels, followingPanels] = splitPanels({
		panels: props.panels,
		focusedElement: props.panel.data.element
	});
	const panelIndex = props.panels.indexOf(props.panel);
	if (panelIndex === 0) props.strategy = "following";
	else if (panelIndex === props.panels.length - 1) props.strategy = "preceding";
	if (props.strategy === "both") {
		const precedingIncluding = [...precedingPanels, props.panel];
		const followingIncluding = [props.panel, ...followingPanels];
		const distributable = getDistributablePercentage({
			desiredPercentage: props.deltaPercentage / 2,
			initialSizes: props.initialSizes,
			collapsible: true,
			resizeActions: [{
				precedingPanels: precedingIncluding,
				followingPanels
			}, {
				precedingPanels,
				followingPanels: followingIncluding,
				negate: true
			}],
			resizableData: { rootSize: props.resizableData.rootSize }
		});
		applyResize({
			initialSizes: props.initialSizes,
			collapsible: true,
			resizeActions: [{
				precedingPanels: precedingIncluding,
				followingPanels,
				deltaPercentage: distributable
			}, {
				precedingPanels,
				followingPanels: followingIncluding,
				deltaPercentage: -distributable
			}],
			resizableData: props.resizableData
		});
	} else {
		precedingPanels = props.strategy === "preceding" ? precedingPanels : [...precedingPanels, props.panel];
		followingPanels = props.strategy === "following" ? followingPanels : [props.panel, ...followingPanels];
		if (props.strategy === "preceding") props.deltaPercentage = -props.deltaPercentage;
		const distributable = getDistributablePercentage({
			desiredPercentage: props.deltaPercentage,
			initialSizes: props.initialSizes,
			collapsible: props.collapsible,
			resizeActions: [{
				precedingPanels,
				followingPanels
			}],
			resizableData: { rootSize: props.resizableData.rootSize }
		});
		applyResize({
			initialSizes: props.initialSizes,
			collapsible: true,
			resizeActions: [{
				precedingPanels,
				followingPanels,
				deltaPercentage: distributable
			}],
			resizableData: props.resizableData
		});
	}
};
const deltaResize = (props) => {
	if (props.altKey && props.panels.length > 2) {
		let panelIndex = props.panels.filter((panel) => !!(props.handle.compareDocumentPosition(panel.data.element) & Node.DOCUMENT_POSITION_PRECEDING)).length - 1;
		const isPrecedingHandle = panelIndex === 0;
		if (isPrecedingHandle) {
			panelIndex++;
			props.deltaPercentage = -props.deltaPercentage;
		}
		const panel = props.panels[panelIndex];
		const panelSize = props.initialSizes[panelIndex];
		const minDelta = resolveSize(panel.data.minSize, props.resizableData.rootSize) - panelSize;
		const maxDelta = resolveSize(panel.data.maxSize, props.resizableData.rootSize) - panelSize;
		const cappedDelta = Math.max(minDelta, Math.min(props.deltaPercentage * 2, maxDelta)) / 2;
		const [precedingPanels, followingPanels] = splitPanels({
			panels: props.panels,
			focusedElement: panel.data.element
		});
		const precedingIncluding = [...precedingPanels, panel];
		const followingIncluding = [panel, ...followingPanels];
		const distributable = getDistributablePercentage({
			desiredPercentage: cappedDelta,
			initialSizes: props.initialSizes,
			collapsible: false,
			resizeActions: [{
				precedingPanels: precedingIncluding,
				followingPanels
			}, {
				precedingPanels,
				followingPanels: followingIncluding,
				negate: true
			}],
			resizableData: { rootSize: props.resizableData.rootSize }
		});
		if (props.resizableData.handleCursorStyle) handleResizeConstraints({
			orientation: props.resizableData.orientation,
			desiredPercentage: props.deltaPercentage,
			distributablePercentage: distributable,
			revertConstraints: isPrecedingHandle
		});
		applyResize({
			initialSizes: props.initialSizes,
			collapsible: false,
			resizeActions: [{
				precedingPanels: precedingIncluding,
				followingPanels,
				deltaPercentage: distributable
			}, {
				precedingPanels,
				followingPanels: followingIncluding,
				deltaPercentage: -distributable
			}],
			resizableData: props.resizableData
		});
	} else {
		const [precedingPanels, followingPanels] = splitPanels({
			panels: props.panels,
			focusedElement: props.handle
		});
		const distributable = getDistributablePercentage({
			desiredPercentage: props.deltaPercentage,
			initialSizes: props.initialSizes,
			collapsible: true,
			resizeActions: [{
				precedingPanels,
				followingPanels
			}],
			resizableData: { rootSize: props.resizableData.rootSize }
		});
		applyResize({
			initialSizes: props.initialSizes,
			collapsible: true,
			resizeActions: [{
				precedingPanels,
				followingPanels,
				deltaPercentage: distributable
			}],
			resizableData: props.resizableData
		});
		if (props.resizableData.handleCursorStyle) {
			const fixed = fixToPrecision(props.deltaPercentage);
			const fixedDist = fixToPrecision(distributable);
			let betweenCollapse = false;
			const precedingPanel = precedingPanels[precedingPanels.length - 1];
			if (precedingPanel.data.collapsible) {
				const collapsedSize = resolveSize(precedingPanel.data.collapsedSize ?? 0, props.resizableData.rootSize);
				if (precedingPanel.size() === collapsedSize && fixed > fixedDist || precedingPanel.size() !== collapsedSize && fixed < fixedDist) betweenCollapse = true;
			}
			const followingPanel = followingPanels[0];
			if (followingPanel.data.collapsible) {
				const collapsedSize = resolveSize(followingPanel.data.collapsedSize ?? 0, props.resizableData.rootSize);
				if (followingPanel.size() === collapsedSize && fixed < fixedDist || followingPanel.size() !== collapsedSize && fixed > fixedDist) betweenCollapse = true;
			}
			handleResizeConstraints({
				orientation: props.resizableData.orientation,
				desiredPercentage: props.deltaPercentage,
				distributablePercentage: distributable,
				betweenCollapse
			});
		}
	}
};
let globalCursorStyle = null;
let cursorStyleElement = null;
let globalResizeConstraints = 0;
let cachedCursorStyle = null;
const constraintToCursorMap = {
	1: "e-resize",
	2: "w-resize",
	3: "ew-resize",
	4: "s-resize",
	8: "n-resize",
	12: "ns-resize",
	5: "se-resize",
	9: "ne-resize",
	6: "sw-resize",
	10: "nw-resize"
};
const updateCursorStyle = () => {
	if (!globalCursorStyle) {
		if (cursorStyleElement) {
			cachedCursorStyle = null;
			cursorStyleElement.remove();
			cursorStyleElement = null;
		}
		return;
	}
	let cursorStyle = constraintToCursorMap[globalResizeConstraints] ?? null;
	if (cursorStyle === null) switch (globalCursorStyle) {
		case "horizontal":
			cursorStyle = "col-resize";
			break;
		case "vertical":
			cursorStyle = "row-resize";
			break;
		case "both": cursorStyle = "move";
	}
	if (cursorStyle === cachedCursorStyle) return;
	cachedCursorStyle = cursorStyle;
	if (!cursorStyleElement) {
		cursorStyleElement = document.createElement("style");
		document.head.appendChild(cursorStyleElement);
	}
	cursorStyleElement.innerHTML = `*{cursor: ${cursorStyle}!important;}`;
};
const reportResizeConstraints = (orientation, constraints) => {
	switch (orientation) {
		case "horizontal":
			if (constraints === 1) {
				globalResizeConstraints |= 1;
				globalResizeConstraints &= -3;
			} else if (constraints === 2) {
				globalResizeConstraints |= 2;
				globalResizeConstraints &= -2;
			} else if (constraints === 3) globalResizeConstraints |= 3;
			else globalResizeConstraints &= -4;
			break;
		case "vertical": if (constraints === 1) {
			globalResizeConstraints |= 4;
			globalResizeConstraints &= -9;
		} else if (constraints === 2) {
			globalResizeConstraints |= 8;
			globalResizeConstraints &= -5;
		} else if (constraints === 3) globalResizeConstraints |= 12;
		else globalResizeConstraints &= -13;
	}
	updateCursorStyle();
};
const resetResizeConstraints = () => {
	globalResizeConstraints = 0;
	updateCursorStyle();
};
const setGlobalCursorStyle = (cursorStyle) => {
	globalCursorStyle = cursorStyle;
	updateCursorStyle();
};
const handleResizeConstraints = (props) => {
	if (fixToPrecision(props.distributablePercentage) !== fixToPrecision(props.desiredPercentage)) {
		let constraints;
		if (props.betweenCollapse === true) constraints = 3;
		else if (props.desiredPercentage < props.distributablePercentage && props.revertConstraints !== true || props.desiredPercentage > props.distributablePercentage && props.revertConstraints === true) constraints = 1;
		else constraints = 2;
		reportResizeConstraints(props.orientation, constraints);
	} else reportResizeConstraints(props.orientation, 0);
};
const handles = [];
let dragStartPos = null;
let globalHovered = null;
const INTERSECTION_TOLERANCE = 1;
const equalsWithTolerance = (a, b) => Math.abs(a - b) <= INTERSECTION_TOLERANCE;
const registerHandle = (handle) => {
	handles.push(handle);
	for (const h of handles) for (const compare of handles) {
		if (h.orientation === compare.orientation || h.element === compare.element) continue;
		const hRect = h.element.getBoundingClientRect();
		const cRect = compare.element.getBoundingClientRect();
		if (h.orientation === "horizontal") {
			if (hRect.left > cRect.right || hRect.right < cRect.left) continue;
		}
		if (h.orientation === "vertical") {
			if (hRect.top > cRect.bottom || hRect.bottom < cRect.top) continue;
		}
		const isStart = h.orientation === "horizontal" ? equalsWithTolerance(hRect.top, cRect.bottom) : equalsWithTolerance(hRect.left, cRect.right);
		const isEnd = h.orientation === "horizontal" ? equalsWithTolerance(hRect.bottom, cRect.top) : equalsWithTolerance(hRect.right, cRect.left);
		if (isStart) h.startIntersection.setHandle(compare);
		if (isEnd) h.endIntersection.setHandle(compare);
	}
	return {
		onDragStart: (event, target) => onDragStart(handle, event, target),
		onHoveredChange: (state) => {
			globalHovered = state;
			const dragging = !!dragStartPos;
			let cursorStyle = null;
			switch (state) {
				case "handle": {
					const startHandle = handle.startIntersection.handle();
					const endHandle = handle.endIntersection.handle();
					if (!dragging) {
						handle.setActive(true);
						startHandle?.setActive(false);
						endHandle?.setActive(false);
					}
					startHandle?.setHoveredAsIntersection(false);
					endHandle?.setHoveredAsIntersection(false);
					cursorStyle = handle.orientation;
					break;
				}
				case "startIntersection": {
					const startHandle = handle.startIntersection.handle();
					if (!dragging) startHandle?.setActive(true);
					startHandle?.setHoveredAsIntersection(true);
					cursorStyle = "both";
					break;
				}
				case "endIntersection": {
					const endHandle = handle.endIntersection.handle();
					if (!dragging) endHandle?.setActive(true);
					endHandle?.setHoveredAsIntersection(true);
					cursorStyle = "both";
					break;
				}
				case null: {
					const startHandle = handle.startIntersection.handle();
					const endHandle = handle.endIntersection.handle();
					if (!dragging && !handle.focused()) {
						handle.setActive(false);
						startHandle?.setActive(false);
						endHandle?.setActive(false);
					}
					startHandle?.setHoveredAsIntersection(false);
					endHandle?.setHoveredAsIntersection(false);
					cursorStyle = null;
					break;
				}
			}
			if (!dragging && handle.handleCursorStyle()) setGlobalCursorStyle(cursorStyle);
		}
	};
};
const unregisterHandle = (handle) => {
	handles.splice(handles.indexOf(handle), 1);
};
const onDragStart = (handle, event, target) => {
	dragStartPos = {
		x: event.clientX,
		y: event.clientY
	};
	handle.setDragging(true);
	if (target === "startIntersection") handle.startIntersection.handle()?.setDragging(true);
	if (target === "endIntersection") handle.endIntersection.handle()?.setDragging(true);
	window.addEventListener("pointermove", onPointerMove);
	window.addEventListener("touchmove", onTouchMove);
	window.addEventListener("pointerup", onDragEnd);
	window.addEventListener("touchend", onDragEnd);
	window.addEventListener("contextmenu", onDragEnd);
};
const onPointerMove = (event) => onMove(event.clientX, event.clientY, event.altKey);
const onTouchMove = (event) => {
	if (!event.touches[0]) return;
	onMove(event.touches[0].clientX, event.touches[0].clientY, event.altKey);
};
let altKeyCache = false;
const onMove = (x, y, altKey) => {
	if (!dragStartPos) return;
	if (handles.some((h) => h.dragging() && h.altKey === "only")) altKey = true;
	if (handles.some((h) => h.dragging() && h.altKey === false)) altKey = false;
	if (altKeyCache !== altKey) {
		dragStartPos = {
			x,
			y
		};
		altKeyCache = altKey;
	}
	for (const handle of handles) {
		if (!handle.dragging()) continue;
		handle.onDrag(handle.orientation === "horizontal" ? x - dragStartPos.x : y - dragStartPos.y, altKey);
	}
};
const onDragEnd = (event) => {
	for (const handle of handles) if (!handle.dragging()) {
		if (handle.hovered() || handle.focused() || handle.hoveredAsIntersection()) {
			handle.setActive(true);
			if (handle.handleCursorStyle()) setGlobalCursorStyle(handle.orientation);
		}
	} else {
		handle.setDragging(false);
		handle.onDragEnd(event);
		if (!handle.hovered() && !handle.hoveredAsIntersection()) handle.setActive(false);
		if (!globalHovered && handle.handleCursorStyle()) setGlobalCursorStyle(null);
	}
	resetResizeConstraints();
	dragStartPos = null;
	window.removeEventListener("pointermove", onPointerMove);
	window.removeEventListener("touchmove", onTouchMove);
	window.removeEventListener("pointerup", onDragEnd);
	window.removeEventListener("touchend", onDragEnd);
	window.removeEventListener("contextmenu", onDragEnd);
};
//#endregion
//#region src/resizable/resizable-handle.tsx
/**
* A drag handle placed between two `<Resizable.Panel>` elements.
*
* @data `data-kb-resizable-handle` - Present on every handle element.
* @data `data-active` - Present when the handle is active (hovered, focused, or being dragged).
* @data `data-dragging` - Present while the handle is being dragged.
* @data `data-orientation` - The orientation of the resizable.
*/
function ResizableHandle(props) {
	const p = merge({
		startIntersection: true,
		endIntersection: true,
		altKey: true
	}, props);
	const others = omit(p, "startIntersection", "endIntersection", "altKey", "onHandleDragStart", "onHandleDrag", "onHandleDragEnd", "ref", "style", "disabled", "children", "onMouseEnter", "onMouseLeave", "onKeyDown", "onKeyUp", "onFocus", "onBlur", "onPointerDown");
	const [ref, setRef] = createSignal(null);
	const [hoveredAsIntersection, setHoveredAsIntersection] = createSignal(false);
	const [hovered, setHovered] = createSignal(null);
	const [focused, setFocused] = createSignal(false);
	const [active, setActive] = createSignal(false);
	const [dragging, setDragging] = createSignal(false);
	const [startIntersection, setStartIntersection] = createSignal(null);
	const [endIntersection, setEndIntersection] = createSignal(null);
	const context = useResizableInternalContext();
	const ariaInformation = createMemo(() => {
		const handle = ref();
		if (!handle) return void 0;
		const panels = context.panels();
		const [precedingPanels, followingPanels] = splitPanels({
			panels,
			focusedElement: handle
		});
		return {
			ariaControls: precedingPanels[precedingPanels.length - 1]?.data.id,
			ariaValueMax: fixToPrecision(followingPanels.reduce((acc, panel) => acc - resolveSize(panel.data.minSize, context.rootSize()), 1)),
			ariaValueMin: fixToPrecision(precedingPanels.reduce((acc, panel) => acc + resolveSize(panel.data.minSize, context.rootSize()), 0)),
			ariaValueNow: fixToPrecision(precedingPanels.reduce((acc, panel) => acc + panel.size(), 0))
		};
	});
	let globalHandleCallbacks = null;
	createEffect(() => ({
		el: ref(),
		disabled: p.disabled
	}), ({ el, disabled }) => {
		if (disabled === true || !el) return;
		const globalHandle = {
			element: el,
			orientation: untrack(() => context.orientation()),
			handleCursorStyle: context.handleCursorStyle,
			altKey: p.altKey,
			startIntersection: {
				handle: startIntersection,
				setHandle: (h) => {
					if (p.startIntersection !== true) return;
					setStartIntersection(h);
				}
			},
			endIntersection: {
				handle: endIntersection,
				setHandle: (h) => {
					if (p.endIntersection !== true) return;
					setEndIntersection(h);
				}
			},
			hovered,
			focused,
			hoveredAsIntersection,
			setHoveredAsIntersection,
			active,
			setActive,
			dragging,
			setDragging,
			onDrag: (delta, altKey) => {
				if (p.onHandleDrag !== void 0) {
					const dragEvent = new CustomEvent("drag", { cancelable: true });
					p.onHandleDrag(dragEvent);
					if (dragEvent.defaultPrevented) return;
				}
				context.onDrag(el, delta, altKey);
			},
			onDragEnd: (event) => {
				p.onHandleDragEnd?.(event);
				context.onDragEnd();
			}
		};
		globalHandleCallbacks = registerHandle(globalHandle);
		return () => {
			unregisterHandle(globalHandle);
			globalHandleCallbacks = null;
		};
	});
	createEffect(() => hovered(), (newHovered) => {
		globalHandleCallbacks?.onHoveredChange(newHovered);
	});
	const onMouseEnter = (e) => {
		callHandler(e, p.onMouseEnter);
		if (p.disabled === true) return;
		setHovered("handle");
	};
	const onMouseLeave = (e) => {
		callHandler(e, p.onMouseLeave);
		setHovered(null);
	};
	const onKeyDown = (e) => {
		callHandler(e, p.onKeyDown);
		if (dragging()) return;
		const el = ref();
		if (!el) return;
		const useAltKey = p.altKey === "only" || p.altKey !== false && e.altKey;
		context.onKeyDown(el, e, useAltKey);
	};
	const onKeyUp = (e) => {
		callHandler(e, p.onKeyUp);
		if (e.key !== "Tab") return;
		setFocused(true);
	};
	const onFocus = (e) => {
		callHandler(e, p.onFocus);
		if (hovered()) return;
		setFocused(true);
		setActive(true);
	};
	const onBlur = (e) => {
		callHandler(e, p.onBlur);
		setFocused(false);
		if (hovered()) return;
		setActive(false);
	};
	const onPointerDown = (e) => {
		callHandler(e, p.onPointerDown);
		if (callHandler(e, p.onHandleDragStart)) return;
		const targetElement = e.target;
		targetElement.setPointerCapture(e.pointerId);
		let target = "handle";
		if (targetElement.hasAttribute("data-kb-resizable-handle-start-intersection")) target = "startIntersection";
		if (targetElement.hasAttribute("data-kb-resizable-handle-end-intersection")) target = "endIntersection";
		globalHandleCallbacks?.onDragStart(e, target);
	};
	return <button ref={[setRef, p.ref]} type="button" style={combineStyle({
		position: "relative",
		cursor: context.handleCursorStyle() ? "inherit" : void 0,
		"touch-action": "none",
		"flex-shrink": 0
	}, p.style)} disabled={p.disabled} onBlur={onBlur} onFocus={onFocus} onKeyDown={onKeyDown} onKeyUp={onKeyUp} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onPointerDown={onPointerDown} role="separator" aria-controls={ariaInformation()?.ariaControls} aria-orientation={context.orientation()} aria-valuemax={ariaInformation()?.ariaValueMax} aria-valuemin={ariaInformation()?.ariaValueMin} aria-valuenow={ariaInformation()?.ariaValueNow} data-active={active() ? "" : void 0} data-dragging={dragging() ? "" : void 0} data-orientation={context.orientation()} data-kb-resizable-handle="" {...others}>
			<Show when={startIntersection()}>
				{}
				<div data-kb-resizable-handle-start-intersection onMouseEnter={() => setHovered("startIntersection")} onMouseLeave={(e) => {
		if (ref()?.contains(e.relatedTarget)) setHovered("handle");
		else setHovered(null);
	}} style={{
		position: "absolute",
		"aspect-ratio": "1 / 1",
		top: 0,
		left: 0,
		height: context.orientation() === "horizontal" ? void 0 : "100%",
		width: context.orientation() === "horizontal" ? "100%" : void 0,
		transform: context.orientation() === "horizontal" ? "translate3d(0, -100%, 0)" : "translate3d(-100%, 0, 0)",
		"z-index": 1
	}} />
			</Show>
			{p.children}
			<Show when={endIntersection()}>
				{}
				<div data-kb-resizable-handle-end-intersection onMouseEnter={() => setHovered("endIntersection")} onMouseLeave={(e) => {
		if (ref()?.contains(e.relatedTarget)) setHovered("handle");
		else setHovered(null);
	}} style={{
		position: "absolute",
		"aspect-ratio": "1 / 1",
		bottom: 0,
		right: 0,
		height: context.orientation() === "horizontal" ? void 0 : "100%",
		width: context.orientation() === "horizontal" ? "100%" : void 0,
		transform: context.orientation() === "horizontal" ? "translate3d(0, 100%, 0)" : "translate3d(100%, 0, 0)",
		"z-index": 1
	}} />
			</Show>
		</button>;
}
//#endregion
//#region src/resizable/resizable-panel-context.tsx
const ResizablePanelContext = createContext();
/** Returns the nearest `<Resizable.Panel>` context. Throws if called outside one. */
function useResizablePanelContext() {
	const ctx = useContext(ResizablePanelContext);
	if (!ctx) throw new Error("[kobalte]: `useResizablePanelContext` must be used within a `Resizable.Panel`");
	return ctx;
}
//#endregion
//#region src/resizable/resizable-panel.tsx
function ResizablePanel(props) {
	const p = merge({
		initialSize: void 0,
		minSize: 0,
		maxSize: 1,
		collapsible: false,
		collapsedSize: 0,
		collapseThreshold: .05,
		panelId: createUniqueId()
	}, props);
	const others = omit(p, "initialSize", "minSize", "maxSize", "collapsible", "collapsedSize", "collapseThreshold", "onResize", "onCollapse", "onExpand", "panelId", "ref", "style", "children");
	const [ref, setRef] = createSignal(null);
	const context = useResizableInternalContext();
	const [panelInstance, setPanelInstance] = createSignal(null);
	createEffect(() => ref(), (el) => {
		if (!el) return;
		const instance = untrack(() => context.registerPanel({
			id: p.panelId,
			element: el,
			initialSize: p.initialSize,
			minSize: p.minSize,
			maxSize: p.maxSize,
			collapsible: p.collapsible,
			collapsedSize: p.collapsedSize,
			collapseThreshold: p.collapseThreshold,
			onResize: p.onResize
		}));
		setPanelInstance(instance);
		return () => {
			context.unregisterPanel(instance.data.id);
			setPanelInstance(null);
		};
	});
	const panelSize = () => {
		const instance = panelInstance();
		if (!instance) return typeof p.initialSize === "number" ? p.initialSize : 1;
		return instance.size();
	};
	const collapsed = createMemo((prev = false) => {
		const instance = panelInstance();
		if (!p.collapsible) return false;
		const isCollapsed = instance ? instance.size() === resolveSize(p.collapsedSize, context.rootSize()) : false;
		if (instance && prev !== isCollapsed) {
			if (isCollapsed) p.onCollapse?.(instance.size());
			else p.onExpand?.(instance.size());
		}
		return isCollapsed;
	});
	const resize = (size, strategy) => {
		const instance = panelInstance();
		if (!instance) {
			console.warn("[kobalte]: Cannot resize a Resizable.Panel before it is mounted.");
			return;
		}
		instance.resize(size, strategy ?? "both");
	};
	const collapse = (strategy) => {
		const instance = panelInstance();
		if (!instance) {
			console.warn("[kobalte]: Cannot collapse a Resizable.Panel before it is mounted.");
			return;
		}
		instance.collapse(strategy ?? "both");
	};
	const expand = (strategy) => {
		const instance = panelInstance();
		if (!instance) {
			console.warn("[kobalte]: Cannot expand a Resizable.Panel before it is mounted.");
			return;
		}
		instance.expand(strategy ?? "both");
	};
	const childrenProps = {
		get size() {
			return panelSize();
		},
		get minSize() {
			return p.minSize;
		},
		get maxSize() {
			return p.maxSize;
		},
		get collapsible() {
			return p.collapsible;
		},
		get collapsedSize() {
			return p.collapsedSize;
		},
		get collapseThreshold() {
			return p.collapseThreshold;
		},
		get collapsed() {
			return collapsed();
		},
		resize,
		collapse,
		expand,
		get panelId() {
			return p.panelId;
		}
	};
	const ctxValue = {
		size: panelSize,
		minSize: () => p.minSize,
		maxSize: () => p.maxSize,
		collapsible: () => p.collapsible,
		collapsedSize: () => p.collapsedSize,
		collapseThreshold: () => p.collapseThreshold,
		collapsed,
		resize,
		collapse,
		expand,
		panelId: () => p.panelId
	};
	return <ResizablePanelContext value={ctxValue}>
			<div ref={[setRef, p.ref]} id={p.panelId} style={combineStyle(p.style, {
		"flex-basis": `${panelSize() * 100}%`,
		"flex-shrink": 0,
		overflow: "hidden"
	})} data-collapsed={collapsed() ? "" : void 0} data-expanded={p.collapsible && !collapsed() ? "" : void 0} data-orientation={context.orientation()} data-kb-resizable-panel="" {...others}>
				{typeof p.children === "function" ? p.children(childrenProps) : p.children}
			</div>
		</ResizablePanelContext>;
}
//#endregion
//#region src/resizable/resizable-root.tsx
function ResizableRoot(props) {
	const p = merge({
		orientation: "horizontal",
		initialSizes: [],
		keyboardDelta: .1,
		handleCursorStyle: true
	}, props);
	const others = omit(p, "orientation", "sizes", "onSizesChange", "initialSizes", "keyboardDelta", "handleCursorStyle", "ref", "style", "children");
	const [sizes, setSizes] = (0, primitives_exports.createControllableSignal)({
		value: () => p.sizes,
		defaultValue: () => [],
		onChange: p.onSizesChange
	});
	const [ref, setRef] = createSignal(null);
	const [rootSize, setRootSize] = createSignal(0);
	createEffect(() => ({
		el: ref(),
		orientation: p.orientation
	}), ({ el, orientation }) => {
		if (!el) return;
		const measure = () => {
			setRootSize(orientation === "horizontal" ? el.offsetWidth : el.offsetHeight);
		};
		measure();
		const obs = new ResizeObserver(measure);
		obs.observe(el);
		return () => obs.disconnect();
	});
	const [panels, setPanels] = createSignal([]);
	let livePanels = [];
	const sizesToIds = [];
	let liveSizes = [];
	createEffect(() => sizes(), (newSizes) => {
		liveSizes = [...newSizes];
	});
	const registerPanel = (panelData) => {
		const panelIndex = livePanels.filter((panel) => !!(panelData.element.compareDocumentPosition(panel.data.element) & Node.DOCUMENT_POSITION_PRECEDING)).length;
		const idExists = sizesToIds[panelIndex] === void 0 || sizesToIds[panelIndex] === panelData.id;
		const sizeExists = liveSizes[panelIndex] !== void 0;
		let panelSize = null;
		if (panelData.initialSize !== void 0) panelSize = resolveSize(panelData.initialSize, rootSize());
		else if (p.initialSizes[panelIndex] !== void 0 && idExists) panelSize = resolveSize(p.initialSizes[panelIndex], rootSize());
		panelSize = panelSize ?? .5;
		let newSizes = [...liveSizes];
		const previousTotal = newSizes.reduce((s, x) => s + x, 0);
		if ((idExists && !sizeExists || !idExists) && previousTotal === 1) {
			const offsetPerPanel = panelSize / newSizes.length;
			newSizes = newSizes.map((s) => s - offsetPerPanel);
		}
		if (idExists) {
			if (!sizeExists) newSizes[panelIndex] = panelSize;
			sizesToIds[panelIndex] = panelData.id;
		} else {
			newSizes.splice(panelIndex, 0, panelSize);
			sizesToIds.splice(panelIndex, 0, panelData.id);
		}
		liveSizes = newSizes;
		setSizes([...newSizes]);
		const panelSizeMemo = createMemo(() => {
			const index = sizesToIds.indexOf(panelData.id);
			return sizes()[index] ?? 0;
		});
		createEffect(() => panelSizeMemo(), (size) => {
			panelData.onResize?.(size);
		});
		const panel = {
			data: panelData,
			size: panelSizeMemo,
			resize: (size, strategy) => resize(sizesToIds.indexOf(panelData.id), size, strategy),
			collapse: (strategy) => collapse(sizesToIds.indexOf(panelData.id), strategy),
			expand: (strategy) => expand(sizesToIds.indexOf(panelData.id), strategy)
		};
		livePanels = [...livePanels, panel].sort((a, b) => a.data.element.compareDocumentPosition(b.data.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
		setPanels((prev) => {
			const next = [...prev, panel];
			next.sort((a, b) => a.data.element.compareDocumentPosition(b.data.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
			return next;
		});
		return panel;
	};
	const unregisterPanel = (id) => {
		livePanels = livePanels.filter((panel) => panel.data.id !== id);
		setPanels((prev) => prev.filter((panel) => panel.data.id !== id));
		const idx = sizesToIds.indexOf(id);
		sizesToIds.splice(idx, 1);
		let newSizes = [...liveSizes];
		newSizes.splice(idx, 1);
		const offsetPerPanel = (newSizes.reduce((s, x) => s + x, 0) - 1) / newSizes.length;
		newSizes = newSizes.map((s) => s + offsetPerPanel);
		liveSizes = newSizes;
		setSizes([...newSizes]);
	};
	const resize = (panelIndex, size, strategy) => {
		untrack(() => {
			const panel = panels()[panelIndex];
			if (!panel) return;
			const minSize = resolveSize(panel.data.minSize, rootSize());
			const maxSize = resolveSize(panel.data.maxSize, rootSize());
			const newSize = resolveSize(size, rootSize());
			const delta = Math.max(minSize, Math.min(newSize, maxSize)) - sizes()[panelIndex];
			resizePanel({
				deltaPercentage: delta,
				strategy: strategy ?? "both",
				panel,
				panels: panels(),
				initialSizes: panels().map((panel) => panel.size()),
				collapsible: true,
				resizableData: {
					rootSize: rootSize(),
					orientation: p.orientation,
					setSizes
				}
			});
		});
	};
	const collapse = (panelIndex, strategy) => {
		untrack(() => {
			const panel = panels()[panelIndex];
			if (!panel) return;
			const panelSize = sizes()[panelIndex];
			const collapsedSize = resolveSize(panel.data.collapsedSize ?? 0, rootSize());
			if (!panel.data.collapsible || panelSize === collapsedSize) return;
			resizePanel({
				deltaPercentage: collapsedSize - panelSize,
				strategy: strategy ?? "both",
				panel,
				panels: panels(),
				initialSizes: panels().map((panel) => panel.size()),
				collapsible: true,
				resizableData: {
					rootSize: rootSize(),
					orientation: p.orientation,
					setSizes
				}
			});
		});
	};
	const expand = (panelIndex, strategy) => {
		untrack(() => {
			const panel = panels()[panelIndex];
			if (!panel) return;
			const panelSize = sizes()[panelIndex];
			const collapsedSize = resolveSize(panel.data.collapsedSize ?? 0, rootSize());
			if (!panel.data.collapsible || panelSize !== collapsedSize) return;
			const minSize = resolveSize(panel.data.minSize, rootSize());
			resizePanel({
				deltaPercentage: minSize - panelSize,
				strategy: strategy ?? "both",
				panel,
				panels: panels(),
				initialSizes: panels().map((panel) => panel.size()),
				collapsible: true,
				resizableData: {
					rootSize: rootSize(),
					orientation: p.orientation,
					setSizes
				}
			});
		});
	};
	let initialSizes = null;
	let altKeyCache = false;
	const onDrag = (handle, delta, altKey) => {
		if (initialSizes === null || altKeyCache !== altKey) {
			initialSizes = panels().map((panel) => panel.size());
			altKeyCache = altKey;
		}
		deltaResize({
			deltaPercentage: delta / rootSize(),
			altKey,
			handle,
			panels: panels(),
			initialSizes,
			resizableData: {
				rootSize: rootSize(),
				handleCursorStyle: p.handleCursorStyle,
				orientation: p.orientation,
				setSizes
			}
		});
	};
	const onKeyDown = (handle, event, altKey) => {
		if (event.key === "Enter") {
			const [precedingPanels, followingPanels] = splitPanels({
				panels: panels(),
				focusedElement: handle
			});
			let collapsiblePanel = precedingPanels[precedingPanels.length - 1];
			if (!collapsiblePanel?.data.collapsible) {
				collapsiblePanel = followingPanels[0];
				if (!collapsiblePanel?.data.collapsible) return;
			}
			if (collapsiblePanel.size() === resolveSize(collapsiblePanel.data.collapsedSize ?? 0, rootSize())) collapsiblePanel.expand("following");
			else collapsiblePanel.collapse("following");
			return;
		}
		let deltaPercentage = null;
		if (p.orientation === "horizontal" && event.key === "ArrowLeft" || p.orientation === "vertical" && event.key === "ArrowUp" || event.key === "Home") deltaPercentage = event.shiftKey || event.key === "Home" ? -1 : -resolveSize(p.keyboardDelta, rootSize());
		else if (p.orientation === "horizontal" && event.key === "ArrowRight" || p.orientation === "vertical" && event.key === "ArrowDown" || event.key === "End") deltaPercentage = event.shiftKey || event.key === "End" ? 1 : resolveSize(p.keyboardDelta, rootSize());
		if (deltaPercentage === null) return;
		event.preventDefault();
		deltaResize({
			deltaPercentage,
			altKey,
			handle,
			panels: panels(),
			initialSizes: panels().map((panel) => panel.size()),
			resizableData: {
				rootSize: rootSize(),
				handleCursorStyle: false,
				orientation: p.orientation,
				setSizes
			}
		});
	};
	const childrenProps = {
		get orientation() {
			return p.orientation;
		},
		get sizes() {
			return sizes();
		},
		setSizes,
		get keyboardDelta() {
			return p.keyboardDelta;
		},
		get handleCursorStyle() {
			return p.handleCursorStyle;
		},
		resize,
		collapse,
		expand
	};
	const ctxValue = {
		orientation: () => p.orientation,
		sizes,
		setSizes,
		keyboardDelta: () => p.keyboardDelta,
		handleCursorStyle: () => p.handleCursorStyle,
		resize,
		collapse,
		expand
	};
	const internalCtxValue = {
		...ctxValue,
		rootSize,
		panels,
		registerPanel,
		unregisterPanel,
		onDrag,
		onDragEnd: () => {
			initialSizes = null;
		},
		onKeyDown
	};
	return <ResizableContext value={ctxValue}>
			<ResizableInternalContext value={internalCtxValue}>
				<div ref={[setRef, p.ref]} style={combineStyle({
		display: "flex",
		"flex-direction": p.orientation === "horizontal" ? "row" : "column",
		overflow: "hidden"
	}, p.style)} data-orientation={p.orientation} data-kb-resizable-root="" {...others}>
					{typeof p.children === "function" ? p.children(childrenProps) : p.children}
				</div>
			</ResizableInternalContext>
		</ResizableContext>;
}
//#endregion
//#region src/resizable/index.tsx
const Resizable = Object.assign(ResizableRoot, {
	Handle: ResizableHandle,
	Panel: ResizablePanel,
	useContext: useResizableContext,
	usePanelContext: useResizablePanelContext
});
//#endregion
export { ResizableHandle as Handle, ResizablePanel as Panel, Resizable, ResizableRoot as Root, useResizableContext as useContext, useResizablePanelContext as usePanelContext };
