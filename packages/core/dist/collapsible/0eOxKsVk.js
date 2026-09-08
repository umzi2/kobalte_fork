import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as createDisclosureState } from "../create-disclosure-state/DV_ixT98.js";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.js";
import { r as ButtonRoot } from "../button/C_WaGidW.js";
import { createComponent, memo, mergeProps } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { Show, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, onSettled, untrack, useContext } from "solid-js";
import { createPresence } from "@solid-primitives/presence";
import { callHandler } from "@kobalte/utils";
//#region src/collapsible/collapsible-context.tsx
const CollapsibleContext = createContext();
function useCollapsibleContext() {
	const context = useContext(CollapsibleContext);
	if (context === void 0) throw new Error("[kobalte]: `useCollapsibleContext` must be used within a `Collapsible.Root` component");
	return context;
}
//#endregion
//#region src/collapsible/collapsible-content.tsx
/**
* Contains the content to be rendered when the collapsible is expanded.
*/
function CollapsibleContent(props) {
	const [ref, setRef] = createSignal();
	const context = useCollapsibleContext();
	const mergedProps = merge({ id: context.generateId("content") }, props);
	const others = omit(mergedProps, "ref", "id", "style");
	const { isMounted: present } = createPresence(() => context.shouldMount() || void 0, { transitionDuration: 0 });
	const [height, setHeight] = createSignal(0);
	const [width, setWidth] = createSignal(0);
	const isOpen = () => context.isOpen() || present();
	let isMountAnimationPrevented = isOpen();
	onSettled(() => {
		const raf = requestAnimationFrame(() => {
			isMountAnimationPrevented = false;
		});
		return () => {
			cancelAnimationFrame(raf);
		};
	});
	createEffect(
		/**
		* depends on `present` because it will be `false` on
		* animation end (so when close finishes). This allows us to
		* retrieve the dimensions *before* closing.
		*/
		() => present(),
		() => {
			const el = untrack(ref);
			if (!el) return;
			el.style.transitionDuration = "0s";
			el.style.animationName = "none";
			const rect = el.getBoundingClientRect();
			setHeight(rect.height);
			setWidth(rect.width);
			if (!isMountAnimationPrevented) {
				el.style.transitionDuration = "";
				el.style.animationName = "";
			}
		}
	);
	createEffect(() => context.isOpen(), (open) => {
		const el = untrack(ref);
		if (!open && el) {
			el.style.transitionDuration = "";
			el.style.animationName = "";
		}
	});
	createEffect(() => mergedProps.id, (id) => context.registerContentId(id));
	return createComponent(Show, {
		get when() {
			return present();
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "div",
				ref: [setRef, mergedProps.ref],
				get id() {
					return mergedProps.id;
				},
				get style() {
					return combineStyle({
						"--kb-collapsible-content-height": height() ? `${height()}px` : void 0,
						"--kb-collapsible-content-width": width() ? `${width()}px` : void 0
					}, mergedProps.style);
				}
			}, () => context.dataset(), others));
		}
	});
}
//#endregion
//#region src/collapsible/collapsible-root.tsx
/**
* An interactive component which expands/collapses a content.
*/
function CollapsibleRoot(props) {
	const defaultId = `collapsible-${createUniqueId()}`;
	const mergedProps = merge({ id: defaultId }, props);
	const others = omit(mergedProps, "open", "defaultOpen", "onOpenChange", "disabled", "forceMount");
	const [contentId, setContentId] = createSignal(void 0, { ownedWrite: true });
	const disclosureState = createDisclosureState({
		open: () => mergedProps.open,
		defaultOpen: () => mergedProps.defaultOpen,
		onOpenChange: (isOpen) => mergedProps.onOpenChange?.(isOpen)
	});
	const dataset = createMemo(() => ({
		"data-expanded": disclosureState.isOpen() ? "" : void 0,
		"data-closed": !disclosureState.isOpen() ? "" : void 0,
		"data-disabled": mergedProps.disabled ? "" : void 0
	}));
	const context = {
		dataset,
		isOpen: disclosureState.isOpen,
		disabled: () => mergedProps.disabled ?? false,
		shouldMount: () => mergedProps.forceMount || disclosureState.isOpen(),
		contentId,
		toggle: disclosureState.toggle,
		generateId: (suffix) => `${others.id}-${suffix}`,
		registerContentId: createRegisterId(setContentId)
	};
	return createComponent(CollapsibleContext, {
		value: context,
		get children() {
			return createComponent(Polymorphic, mergeProps({ as: "div" }, dataset, others));
		}
	});
}
//#endregion
//#region src/collapsible/collapsible-trigger.tsx
/**
* The button that expands/collapses the collapsible content.
*/
function CollapsibleTrigger(props) {
	const context = useCollapsibleContext();
	const others = omit(props, "onClick");
	const onClick = (e) => {
		callHandler(e, props.onClick);
		context.toggle();
	};
	return createComponent(ButtonRoot, mergeProps({
		get ["aria-expanded"]() {
			return context.isOpen() ? "true" : "false";
		},
		get ["aria-controls"]() {
			return memo(() => !!context.isOpen())() ? context.contentId() : void 0;
		},
		get disabled() {
			return context.disabled();
		},
		onClick
	}, () => context.dataset(), others));
}
//#endregion
//#region src/collapsible/index.tsx
var collapsible_exports = /* @__PURE__ */ __exportAll({
	Collapsible: () => Collapsible,
	Content: () => CollapsibleContent,
	Root: () => CollapsibleRoot,
	Trigger: () => CollapsibleTrigger,
	useCollapsibleContext: () => useCollapsibleContext
});
const Collapsible = Object.assign(CollapsibleRoot, {
	Content: CollapsibleContent,
	Trigger: CollapsibleTrigger
});
//#endregion
export { CollapsibleContent as a, CollapsibleRoot as i, collapsible_exports as n, useCollapsibleContext as o, CollapsibleTrigger as r, Collapsible as t };
