Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region src/events.ts
/** Call a JSX.EventHandlerUnion with the event. */
function callHandler(event, handler) {
	if (handler) if (typeof handler === "function") handler(event);
	else handler[0](handler[1], event);
	return event?.defaultPrevented;
}
/** Create a new event handler which calls all given handlers in the order they were chained with the same event. */
function composeEventHandlers(handlers) {
	return (event) => {
		for (const handler of handlers) callHandler(event, handler);
	};
}
//#endregion
//#region src/get-scroll-parent.ts
function getScrollParent(node) {
	let parentNode = node;
	while (parentNode && !isScrollable(parentNode)) parentNode = parentNode.parentElement;
	return parentNode || document.scrollingElement || document.documentElement;
}
function isScrollable(node) {
	const style = window.getComputedStyle(node);
	return /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
}
//#endregion
//#region src/number.ts
/**
* Takes a value and forces it to the closest min/max if it's outside. Also forces it to the closest valid step.
*/
function clamp(value, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
	return Math.min(Math.max(value, min), max);
}
function roundToStepPrecision(value, step) {
	const precision = getPrecision(step);
	if (precision > 0) {
		const pow = 10 ** precision;
		value = Math.round(value * pow) / pow;
	}
	return value;
}
/** Number of decimals needed to represent the step. */
function getPrecision(step) {
	const stepString = step.toString();
	const eIndex = stepString.toLowerCase().indexOf("e-");
	if (eIndex > 0) return Math.abs(Math.floor(Math.log10(Math.abs(step)))) + eIndex;
	const pointIndex = stepString.indexOf(".");
	if (pointIndex >= 0) return stepString.length - pointIndex;
	return 0;
}
function snapValueToStep(value, min, max, step) {
	min = Number(min);
	max = Number(max);
	const remainder = (value - (Number.isNaN(min) ? 0 : min)) % step;
	let snappedValue = roundToStepPrecision(Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder, step);
	if (!Number.isNaN(min)) {
		if (snappedValue < min) snappedValue = min;
		else if (!Number.isNaN(max) && snappedValue > max) snappedValue = min + Math.floor(roundToStepPrecision((max - min) / step, step)) * step;
	} else if (!Number.isNaN(max) && snappedValue > max) snappedValue = Math.floor(roundToStepPrecision(max / step, step)) * step;
	snappedValue = roundToStepPrecision(snappedValue, step);
	return snappedValue;
}
//#endregion
//#region src/polygon.ts
function isPointInPolygon(point, polygon) {
	const [x, y] = point;
	let inside = false;
	const length = polygon.length;
	for (let l = length, i = 0, j = l - 1; i < l; j = i++) {
		const [xi, yi] = polygon[i];
		const [xj, yj] = polygon[j];
		const [, vy] = polygon[j === 0 ? l - 1 : j - 1] || [0, 0];
		const where = (yi - yj) * (x - xi) - (xi - xj) * (y - yi);
		if (yj < yi) {
			if (y >= yj && y < yi) {
				if (where === 0) return true;
				if (where > 0) if (y === yj) {
					if (y > vy) inside = !inside;
				} else inside = !inside;
			}
		} else if (yi < yj) {
			if (y > yi && y <= yj) {
				if (where === 0) return true;
				if (where < 0) if (y === yj) {
					if (y < vy) inside = !inside;
				} else inside = !inside;
			}
		} else if (y === yi && (x >= xj && x <= xi || x >= xi && x <= xj)) return true;
	}
	return inside;
}
function getPolygon() {
	const id = "debug-polygon";
	const existingPolygon = document.getElementById(id);
	if (existingPolygon) return existingPolygon;
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.style.top = "0";
	svg.style.left = "0";
	svg.style.width = "100%";
	svg.style.height = "100%";
	svg.style.fill = "green";
	svg.style.opacity = "0.2";
	svg.style.position = "fixed";
	svg.style.pointerEvents = "none";
	svg.style.zIndex = "999999";
	const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	polygon.setAttribute("id", id);
	polygon.setAttribute("points", "0,0 0,0");
	svg.appendChild(polygon);
	document.body.appendChild(svg);
	return polygon;
}
function debugPolygon(polygon) {
	const polygonElement = getPolygon();
	const points = polygon.map((point) => point.join(",")).join(" ");
	polygonElement.setAttribute("points", points);
	return polygonElement.parentElement;
}
//#endregion
//#region src/styles.ts
const visuallyHiddenStyles = {
	border: "0",
	clip: "rect(0 0 0 0)",
	"clip-path": "inset(50%)",
	height: "1px",
	margin: "0 -1px -1px 0",
	overflow: "hidden",
	padding: "0",
	position: "absolute",
	width: "1px",
	"white-space": "nowrap"
};
//#endregion
exports.callHandler = callHandler;
exports.clamp = clamp;
exports.composeEventHandlers = composeEventHandlers;
exports.debugPolygon = debugPolygon;
exports.getPrecision = getPrecision;
exports.getScrollParent = getScrollParent;
exports.isPointInPolygon = isPointInPolygon;
exports.roundToStepPrecision = roundToStepPrecision;
exports.snapValueToStep = snapValueToStep;
exports.visuallyHiddenStyles = visuallyHiddenStyles;

//# sourceMappingURL=index.cjs.map