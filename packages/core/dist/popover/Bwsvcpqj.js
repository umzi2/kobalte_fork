import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as createDisclosureState } from "../create-disclosure-state/DV_ixT98.js";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.js";
import { r as ButtonRoot } from "../button/C_WaGidW.js";
import { t as DismissableLayer } from "../dismissable-layer/DXLD03yU.js";
import { i as PopperArrow, t as Popper } from "../popper/BTyI8BKK.js";
import { Portal, createComponent, memo, mergeProps } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { Show, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, useContext } from "solid-js";
import { createPresence } from "@solid-primitives/presence";
import { callHandler } from "@kobalte/utils";
import { createFocusTrap } from "@solid-primitives/focus";
import { createHideOutside } from "@solid-primitives/interaction";
import { createPreventScroll } from "@solid-primitives/scroll";
//#region src/popover/popover-context.tsx
const PopoverContext = createContext();
function usePopoverContext() {
	const context = useContext(PopoverContext);
	if (context === void 0) throw new Error("[kobalte]: `usePopoverContext` must be used within a `Popover` component");
	return context;
}
//#endregion
//#region src/popover/popover-anchor.tsx
/**
* An optional element to position the `Popover.Content` against.
* If this part is not used, the content will position alongside the `Popover.Trigger`.
*/
function PopoverAnchor(props) {
	const context = usePopoverContext();
	const others = omit(props, "ref");
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		ref: [context.setDefaultAnchorRef, props.ref]
	}, () => context.dataset(), others));
}
//#endregion
//#region src/popover/popover-close-button.tsx
/**
* The button that closes the popover.
*/
function PopoverCloseButton(props) {
	const context = usePopoverContext();
	const p = props;
	const others = omit(p, "aria-label", "onClick");
	const onClick = (e) => {
		callHandler(e, p.onClick);
		context.close();
	};
	return createComponent(ButtonRoot, mergeProps({
		get ["aria-label"]() {
			return p["aria-label"] || context.translations().dismiss;
		},
		onClick
	}, () => context.dataset(), others));
}
//#endregion
//#region src/popover/popover-content.tsx
/**
* Contains the content to be rendered when the popover is open.
*/
function PopoverContent(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const context = usePopoverContext();
	const mergedProps = merge({ id: context.generateId("content") }, props);
	const others = omit(mergedProps, "ref", "style", "onOpenAutoFocus", "onCloseAutoFocus", "onPointerDownOutside", "onFocusOutside", "onInteractOutside");
	let isRightClickOutside = false;
	let hasInteractedOutside = false;
	let hasPointerDownOutside = false;
	const onCloseAutoFocus = (e) => {
		mergedProps.onCloseAutoFocus?.(e);
		if (context.isModal()) {
			e.preventDefault();
			if (!isRightClickOutside) context.triggerRef()?.focus({ preventScroll: true });
		} else {
			if (!e.defaultPrevented) {
				if (!hasInteractedOutside) context.triggerRef()?.focus({ preventScroll: true });
				e.preventDefault();
			}
			hasInteractedOutside = false;
			hasPointerDownOutside = false;
		}
	};
	const onPointerDownOutside = (e) => {
		mergedProps.onPointerDownOutside?.(e);
		if (context.isModal()) isRightClickOutside = e.detail.isContextMenu;
	};
	const onFocusOutside = (e) => {
		mergedProps.onFocusOutside?.(e);
		if (context.isOpen() && context.isModal()) e.preventDefault();
	};
	const onInteractOutside = (e) => {
		mergedProps.onInteractOutside?.(e);
		if (context.isModal()) return;
		if (!e.defaultPrevented) {
			hasInteractedOutside = true;
			if (e.detail.originalEvent.type === "pointerdown") hasPointerDownOutside = true;
		}
		if (context.triggerRef()?.contains(e.target)) e.preventDefault();
		if (e.detail.originalEvent.type === "focusin" && hasPointerDownOutside) e.preventDefault();
	};
	createHideOutside({
		disabled: () => !(context.isOpen() && context.isModal()),
		targets: () => {
			const el = ref();
			return el ? [el] : [];
		},
		alwaysVisibleSelector: "[data-kb-top-layer], [data-live-announcer]"
	});
	createPreventScroll({
		element: ref,
		enabled: () => context.contentPresent() && context.preventScroll()
	});
	createFocusTrap({
		element: ref,
		enabled: () => context.isOpen() && context.isModal(),
		onInitialFocus: mergedProps.onOpenAutoFocus,
		onFinalFocus: onCloseAutoFocus
	});
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
						setRef(el);
					}, mergedProps.ref],
					role: "dialog",
					tabindex: -1,
					get disableOutsidePointerEvents() {
						return memo(() => !!context.isOpen())() ? context.isModal() : context.isOpen();
					},
					get excludedElements() {
						return [context.triggerRef];
					},
					get style() {
						return combineStyle({
							"--kb-popover-content-transform-origin": "var(--kb-popper-content-transform-origin)",
							position: "relative"
						}, mergedProps.style);
					},
					get ["aria-labelledby"]() {
						return context.titleId();
					},
					get ["aria-describedby"]() {
						return context.descriptionId();
					},
					onPointerDownOutside,
					onFocusOutside,
					onInteractOutside,
					get onDismiss() {
						return context.close;
					}
				}, () => context.dataset(), others));
			} });
		}
	});
}
//#endregion
//#region src/popover/popover-description.tsx
/**
* An optional accessible description to be announced when the popover is open.
*/
function PopoverDescription(props) {
	const context = usePopoverContext();
	const mergedProps = merge({ id: context.generateId("description") }, props);
	const others = omit(mergedProps, "id");
	createEffect(() => mergedProps.id, (id) => context.registerDescriptionId(id));
	return createComponent(Polymorphic, mergeProps({
		as: "p",
		get id() {
			return mergedProps.id;
		}
	}, () => context.dataset(), others));
}
//#endregion
//#region src/popover/popover-portal.tsx
/**
* Portals its children into the `body` when the popover is open.
*/
function PopoverPortal(props) {
	const context = usePopoverContext();
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
//#region src/popover/popover.intl.ts
const POPOVER_INTL_TRANSLATIONS = { dismiss: "Dismiss" };
//#endregion
//#region src/popover/popover-root.tsx
/**
* A popover is a dialog positioned relative to an anchor element.
*/
function PopoverRoot(props) {
	const defaultId = `popover-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		modal: false,
		translations: POPOVER_INTL_TRANSLATIONS
	}, props);
	const others = omit(mergedProps, "translations", "id", "open", "defaultOpen", "onOpenChange", "modal", "preventScroll", "forceMount", "anchorRef");
	const [defaultAnchorRef, setDefaultAnchorRef] = createSignal(void 0, { ownedWrite: true });
	const [triggerRef, setTriggerRef] = createSignal(void 0, { ownedWrite: true });
	const [contentRef, setContentRef] = createSignal(void 0, { ownedWrite: true });
	const [contentId, setContentId] = createSignal(void 0, { ownedWrite: true });
	const [titleId, setTitleId] = createSignal(void 0, { ownedWrite: true });
	const [descriptionId, setDescriptionId] = createSignal(void 0, { ownedWrite: true });
	const disclosureState = createDisclosureState({
		open: () => mergedProps.open,
		defaultOpen: () => mergedProps.defaultOpen,
		onOpenChange: (isOpen) => mergedProps.onOpenChange?.(isOpen)
	});
	const anchorRef = () => {
		return mergedProps.anchorRef?.() ?? defaultAnchorRef() ?? triggerRef();
	};
	const { isMounted: contentPresent } = createPresence(() => mergedProps.forceMount || disclosureState.isOpen() || void 0, { transitionDuration: 0 });
	const context = {
		translations: () => mergedProps.translations ?? POPOVER_INTL_TRANSLATIONS,
		dataset: createMemo(() => ({
			"data-expanded": disclosureState.isOpen() ? "" : void 0,
			"data-closed": !disclosureState.isOpen() ? "" : void 0
		})),
		isOpen: disclosureState.isOpen,
		isModal: () => mergedProps.modal ?? false,
		preventScroll: () => mergedProps.preventScroll ?? context.isModal(),
		contentPresent,
		triggerRef,
		contentId,
		titleId,
		descriptionId,
		setDefaultAnchorRef,
		setTriggerRef,
		setContentRef,
		close: disclosureState.close,
		toggle: disclosureState.toggle,
		generateId: (suffix) => `${mergedProps.id}-${suffix}`,
		registerContentId: createRegisterId(setContentId),
		registerTitleId: createRegisterId(setTitleId),
		registerDescriptionId: createRegisterId(setDescriptionId)
	};
	return createComponent(PopoverContext, {
		value: context,
		get children() {
			return createComponent(Popper, mergeProps({
				anchorRef,
				contentRef
			}, others));
		}
	});
}
//#endregion
//#region src/popover/popover-title.tsx
/**
* An accessible title to be announced when the popover is open.
*/
function PopoverTitle(props) {
	const context = usePopoverContext();
	const mergedProps = merge({ id: context.generateId("title") }, props);
	const others = omit(mergedProps, "id");
	createEffect(() => mergedProps.id, (id) => context.registerTitleId(id));
	return createComponent(Polymorphic, mergeProps({
		as: "h2",
		get id() {
			return mergedProps.id;
		}
	}, () => context.dataset(), others));
}
//#endregion
//#region src/popover/popover-trigger.tsx
/**
* The button that opens the popover.
*/
function PopoverTrigger(props) {
	const context = usePopoverContext();
	const p = props;
	const others = omit(p, "ref", "onClick", "onPointerDown");
	const onPointerDown = (e) => {
		callHandler(e, p.onPointerDown);
		e.preventDefault();
	};
	const onClick = (e) => {
		callHandler(e, p.onClick);
		context.toggle();
	};
	return createComponent(ButtonRoot, mergeProps({
		ref: [context.setTriggerRef, p.ref],
		"aria-haspopup": "dialog",
		get ["aria-expanded"]() {
			return context.isOpen() ? "true" : "false";
		},
		get ["aria-controls"]() {
			return memo(() => !!context.isOpen())() ? context.contentId() : void 0;
		},
		onPointerDown,
		onClick
	}, () => context.dataset(), others));
}
//#endregion
//#region src/popover/index.tsx
var popover_exports = /* @__PURE__ */ __exportAll({
	Anchor: () => PopoverAnchor,
	Arrow: () => PopperArrow,
	CloseButton: () => PopoverCloseButton,
	Content: () => PopoverContent,
	Description: () => PopoverDescription,
	Popover: () => Popover,
	Portal: () => PopoverPortal,
	Root: () => PopoverRoot,
	Title: () => PopoverTitle,
	Trigger: () => PopoverTrigger,
	usePopoverContext: () => usePopoverContext
});
const Popover = Object.assign(PopoverRoot, {
	Anchor: PopoverAnchor,
	Arrow: PopperArrow,
	CloseButton: PopoverCloseButton,
	Content: PopoverContent,
	Description: PopoverDescription,
	Portal: PopoverPortal,
	Title: PopoverTitle,
	Trigger: PopoverTrigger
});
//#endregion
export { PopoverRoot as a, PopoverContent as c, usePopoverContext as d, PopoverTitle as i, PopoverCloseButton as l, popover_exports as n, PopoverPortal as o, PopoverTrigger as r, PopoverDescription as s, Popover as t, PopoverAnchor as u };
