import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as createDisclosureState } from "../create-disclosure-state/DV_ixT98.js";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.js";
import { r as ButtonRoot } from "../button/C_WaGidW.js";
import { t as DismissableLayer } from "../dismissable-layer/DXLD03yU.js";
import { Portal, createComponent, memo, mergeProps } from "@solidjs/web";
import { combineStyle } from "@solid-primitives/props";
import { Show, createContext, createEffect, createSignal, createUniqueId, merge, omit, useContext } from "solid-js";
import { createPresence } from "@solid-primitives/presence";
import { callHandler } from "@kobalte/utils";
import { createFocusTrap } from "@solid-primitives/focus";
import { createHideOutside } from "@solid-primitives/interaction";
import { createPreventScroll } from "@solid-primitives/scroll";
//#region src/dialog/dialog-context.tsx
const DialogContext = createContext();
function useDialogContext() {
	const context = useContext(DialogContext);
	if (context === void 0) throw new Error("[kobalte]: `useDialogContext` must be used within a `Dialog` component");
	return context;
}
//#endregion
//#region src/dialog/dialog-close-button.tsx
/**
* The button that closes the dialog.
*/
function DialogCloseButton(props) {
	const context = useDialogContext();
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
	}, others));
}
//#endregion
//#region src/dialog/dialog-content.tsx
/**
* Contains the content to be rendered when the dialog is open.
*/
function DialogContent(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const context = useDialogContext();
	const mergedProps = merge({ id: context.generateId("content") }, props);
	const others = omit(mergedProps, "ref", "onOpenAutoFocus", "onCloseAutoFocus", "onPointerDownOutside", "onFocusOutside", "onInteractOutside");
	let hasInteractedOutside = false;
	let hasPointerDownOutside = false;
	const onPointerDownOutside = (e) => {
		mergedProps.onPointerDownOutside?.(e);
		if (context.modal() && e.detail.isContextMenu) e.preventDefault();
	};
	const onFocusOutside = (e) => {
		mergedProps.onFocusOutside?.(e);
		if (context.modal()) e.preventDefault();
	};
	const onInteractOutside = (e) => {
		mergedProps.onInteractOutside?.(e);
		if (context.modal()) return;
		if (!e.defaultPrevented) {
			hasInteractedOutside = true;
			if (e.detail.originalEvent.type === "pointerdown") hasPointerDownOutside = true;
		}
		if (context.triggerRef()?.contains(e.target)) e.preventDefault();
		if (e.detail.originalEvent.type === "focusin" && hasPointerDownOutside) e.preventDefault();
	};
	const onCloseAutoFocus = (e) => {
		mergedProps.onCloseAutoFocus?.(e);
		if (context.modal()) {
			e.preventDefault();
			context.triggerRef()?.focus({ preventScroll: true });
		} else {
			if (!e.defaultPrevented) {
				if (!hasInteractedOutside) context.triggerRef()?.focus({ preventScroll: true });
				e.preventDefault();
			}
			hasInteractedOutside = false;
			hasPointerDownOutside = false;
		}
	};
	createHideOutside({
		disabled: () => !(context.isOpen() && context.modal()),
		targets: () => {
			const el = context.contentRef();
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
		enabled: () => context.isOpen() && context.modal(),
		onInitialFocus: mergedProps.onOpenAutoFocus,
		onFinalFocus: onCloseAutoFocus
	});
	createEffect(() => others.id, (id) => context.registerContentId(id));
	return createComponent(Show, {
		get when() {
			return context.contentPresent();
		},
		get children() {
			return createComponent(DismissableLayer, mergeProps({
				ref: [(el) => {
					context.setContentRef(el);
					setRef(el);
				}, mergedProps.ref],
				role: "dialog",
				tabindex: -1,
				get disableOutsidePointerEvents() {
					return memo(() => !!context.modal())() ? context.isOpen() : context.modal();
				},
				get excludedElements() {
					return [context.triggerRef];
				},
				get ["aria-labelledby"]() {
					return context.titleId();
				},
				get ["aria-describedby"]() {
					return context.descriptionId();
				},
				get ["data-expanded"]() {
					return context.isOpen() ? "" : void 0;
				},
				get ["data-closed"]() {
					return !context.isOpen() ? "" : void 0;
				},
				onPointerDownOutside,
				onFocusOutside,
				onInteractOutside,
				get onDismiss() {
					return context.close;
				}
			}, others));
		}
	});
}
//#endregion
//#region src/dialog/dialog-description.tsx
/**
* An optional accessible description to be announced when the dialog is open.
*/
function DialogDescription(props) {
	const context = useDialogContext();
	const mergedProps = merge({ id: context.generateId("description") }, props);
	const others = omit(mergedProps, "id");
	createEffect(() => mergedProps.id, (id) => context.registerDescriptionId(id));
	return createComponent(Polymorphic, mergeProps({
		as: "p",
		get id() {
			return mergedProps.id;
		}
	}, others));
}
//#endregion
//#region src/dialog/dialog-overlay.tsx
/**
* A layer that covers the inert portion of the view when the dialog is open.
*/
function DialogOverlay(props) {
	const context = useDialogContext();
	const p = props;
	const others = omit(p, "ref", "style", "onPointerDown");
	const onPointerDown = (e) => {
		callHandler(e, p.onPointerDown);
		if (e.target === e.currentTarget) e.preventDefault();
	};
	return createComponent(Show, {
		get when() {
			return context.overlayPresent();
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "div",
				ref: [context.setOverlayRef, p.ref],
				get style() {
					return combineStyle({ "pointer-events": "auto" }, p.style);
				},
				get ["data-expanded"]() {
					return context.isOpen() ? "" : void 0;
				},
				get ["data-closed"]() {
					return !context.isOpen() ? "" : void 0;
				},
				onPointerDown
			}, others));
		}
	});
}
//#endregion
//#region src/dialog/dialog-portal.tsx
/**
* Portals its children into the `body` when the dialog is open.
*/
function DialogPortal(props) {
	const context = useDialogContext();
	return createComponent(Show, {
		get when() {
			return context.contentPresent() || context.overlayPresent();
		},
		get children() {
			return createComponent(Portal, props);
		}
	});
}
//#endregion
//#region src/dialog/dialog.intl.ts
const DIALOG_INTL_TRANSLATIONS = { dismiss: "Dismiss" };
//#endregion
//#region src/dialog/dialog-root.tsx
/**
* A dialog is a window overlaid on either the primary window or another dialog window.
*/
function DialogRoot(props) {
	const defaultId = `dialog-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		modal: true,
		translations: DIALOG_INTL_TRANSLATIONS
	}, props);
	const [contentId, setContentId] = createSignal(void 0, { ownedWrite: true });
	const [titleId, setTitleId] = createSignal(void 0, { ownedWrite: true });
	const [descriptionId, setDescriptionId] = createSignal(void 0, { ownedWrite: true });
	const [overlayRef, setOverlayRef] = createSignal(void 0, { ownedWrite: true });
	const [contentRef, setContentRef] = createSignal(void 0, { ownedWrite: true });
	const [triggerRef, setTriggerRef] = createSignal(void 0, { ownedWrite: true });
	const disclosureState = createDisclosureState({
		open: () => mergedProps.open,
		defaultOpen: () => mergedProps.defaultOpen,
		onOpenChange: (isOpen) => mergedProps.onOpenChange?.(isOpen)
	});
	const shouldMount = () => mergedProps.forceMount || disclosureState.isOpen();
	const { isMounted: overlayPresent } = createPresence(() => shouldMount() || void 0, { transitionDuration: 0 });
	const { isMounted: contentPresent } = createPresence(() => shouldMount() || void 0, { transitionDuration: 0 });
	const context = {
		translations: () => mergedProps.translations ?? DIALOG_INTL_TRANSLATIONS,
		isOpen: disclosureState.isOpen,
		modal: () => mergedProps.modal ?? true,
		preventScroll: () => mergedProps.preventScroll ?? context.modal(),
		contentId,
		titleId,
		descriptionId,
		triggerRef,
		overlayRef,
		setOverlayRef,
		contentRef,
		setContentRef,
		overlayPresent,
		contentPresent,
		close: disclosureState.close,
		toggle: disclosureState.toggle,
		setTriggerRef,
		generateId: (suffix) => `${mergedProps.id}-${suffix}`,
		registerContentId: createRegisterId(setContentId),
		registerTitleId: createRegisterId(setTitleId),
		registerDescriptionId: createRegisterId(setDescriptionId)
	};
	return createComponent(DialogContext, {
		value: context,
		get children() {
			return mergedProps.children;
		}
	});
}
//#endregion
//#region src/dialog/dialog-title.tsx
/**
* An accessible title to be announced when the dialog is open.
*/
function DialogTitle(props) {
	const context = useDialogContext();
	const mergedProps = merge({ id: context.generateId("title") }, props);
	const others = omit(mergedProps, "id");
	createEffect(() => mergedProps.id, (id) => context.registerTitleId(id));
	return createComponent(Polymorphic, mergeProps({
		as: "h2",
		get id() {
			return mergedProps.id;
		}
	}, others));
}
//#endregion
//#region src/dialog/dialog-trigger.tsx
/**
* The button that opens the dialog.
*/
function DialogTrigger(props) {
	const context = useDialogContext();
	const p = props;
	const others = omit(p, "ref", "onClick");
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
		get ["data-expanded"]() {
			return context.isOpen() ? "" : void 0;
		},
		get ["data-closed"]() {
			return !context.isOpen() ? "" : void 0;
		},
		onClick
	}, others));
}
//#endregion
//#region src/dialog/index.tsx
var dialog_exports = /* @__PURE__ */ __exportAll({
	CloseButton: () => DialogCloseButton,
	Content: () => DialogContent,
	Description: () => DialogDescription,
	Dialog: () => Dialog,
	Overlay: () => DialogOverlay,
	Portal: () => DialogPortal,
	Root: () => DialogRoot,
	Title: () => DialogTitle,
	Trigger: () => DialogTrigger,
	useDialogContext: () => useDialogContext
});
const Dialog = Object.assign(DialogRoot, {
	CloseButton: DialogCloseButton,
	Content: DialogContent,
	Description: DialogDescription,
	Overlay: DialogOverlay,
	Portal: DialogPortal,
	Title: DialogTitle,
	Trigger: DialogTrigger
});
//#endregion
export { DialogRoot as a, DialogDescription as c, useDialogContext as d, DialogTitle as i, DialogContent as l, dialog_exports as n, DialogPortal as o, DialogTrigger as r, DialogOverlay as s, Dialog as t, DialogCloseButton as u };
