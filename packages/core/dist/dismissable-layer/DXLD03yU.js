import { n as layerStack } from "../layer-stack/DUp9FXTP.js";
import { createComponent, insert, ref, spread, template } from "@solidjs/web";
import { createContext, createEffect, createMemo, createSignal, omit, onSettled, useContext } from "solid-js";
import { interactOutside } from "@solid-primitives/interaction";
import { createShortcut } from "@solid-primitives/keyboard";
//#region src/dismissable-layer/dismissable-layer-context.tsx
const DismissableLayerContext = createContext(null);
function useOptionalDismissableLayerContext() {
	return useContext(DismissableLayerContext) ?? void 0;
}
//#endregion
//#region src/dismissable-layer/dismissable-layer.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
function DismissableLayer(props) {
	const [ref$1, setRef] = createSignal(void 0, { ownedWrite: true });
	const parentContext = useOptionalDismissableLayerContext();
	const others = omit(props, "ref", "disableOutsidePointerEvents", "excludedElements", "onEscapeKeyDown", "onPointerDownOutside", "onFocusOutside", "onInteractOutside", "onDismiss", "bypassTopMostLayerCheck");
	const isPointerBlocking = createMemo(() => props.disableOutsidePointerEvents);
	const nestedLayers = /* @__PURE__ */ new Set([]);
	const registerNestedLayer = (element) => {
		nestedLayers.add(element);
		const parentUnregister = parentContext?.registerNestedLayer(element);
		return () => {
			nestedLayers.delete(element);
			parentUnregister?.();
		};
	};
	const shouldExcludeElement = (element) => {
		if (!ref$1()) return false;
		return props.excludedElements?.some((node) => node()?.contains(element)) || [...nestedLayers].some((layer) => layer.contains(element));
	};
	const onPointerDownOutside = (e) => {
		if (!ref$1() || layerStack.isBelowPointerBlockingLayer(ref$1())) return;
		if (!props.bypassTopMostLayerCheck && !layerStack.isTopMostLayer(ref$1())) return;
		props.onPointerDownOutside?.(e);
		props.onInteractOutside?.(e);
		if (!e.defaultPrevented) props.onDismiss?.();
	};
	const onFocusOutside = (e) => {
		props.onFocusOutside?.(e);
		props.onInteractOutside?.(e);
		if (!e.defaultPrevented) props.onDismiss?.();
	};
	const interactOutsideRef = interactOutside({
		shouldExcludeElement,
		onPointerDownOutside,
		onFocusOutside
	});
	createShortcut(["Escape"], (e) => {
		if (!e || !ref$1() || !layerStack.isTopMostLayer(ref$1())) return;
		props.onEscapeKeyDown?.(e);
		if (!e.defaultPrevented && props.onDismiss) {
			e.preventDefault();
			props.onDismiss();
		}
	}, { preventDefault: false });
	onSettled(() => {
		if (!ref$1()) return;
		layerStack.addLayer({
			node: ref$1(),
			isPointerBlocking: isPointerBlocking(),
			dismiss: props.onDismiss
		});
		const unregisterFromParentLayer = parentContext?.registerNestedLayer(ref$1());
		layerStack.assignPointerEventToLayers();
		layerStack.disableBodyPointerEvents(ref$1());
		return () => {
			if (!ref$1()) return;
			layerStack.removeLayer(ref$1());
			unregisterFromParentLayer?.();
			layerStack.assignPointerEventToLayers();
			layerStack.restoreBodyPointerEvents(ref$1());
		};
	});
	createEffect(() => ({
		ref: ref$1(),
		disabled: isPointerBlocking()
	}), ({ ref, disabled: disableOutsidePointerEvents }) => {
		if (!ref) return;
		const layer = layerStack.find(ref);
		if (layer && layer.isPointerBlocking !== disableOutsidePointerEvents) {
			layer.isPointerBlocking = disableOutsidePointerEvents;
			layerStack.assignPointerEventToLayers();
		}
		if (disableOutsidePointerEvents) layerStack.disableBodyPointerEvents(ref);
		return () => {
			layerStack.restoreBodyPointerEvents(ref);
		};
	}, { defer: true });
	return createComponent(DismissableLayerContext, {
		value: { registerNestedLayer },
		get children() {
			var _el$ = _tmpl$();
			ref(() => [
				setRef,
				interactOutsideRef,
				props.ref
			], _el$);
			spread(_el$, others, true);
			insert(_el$, () => others.children);
			return _el$;
		}
	});
}
//#endregion
export { DismissableLayer as t };
