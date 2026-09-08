import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { Polymorphic } from "../polymorphic/index.jsx";
import { n as collapsible_exports, o as useCollapsibleContext } from "../collapsible/VlBmcUDu.jsx";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.jsx";
import { i as createSelectableItem, t as createListState } from "../create-list-state/B3LSQwLh.jsx";
import { t as createSelectableList } from "../create-selectable-list/v5tGftTG.jsx";
import { n as createDomCollection, t as createDomCollectionItem } from "../create-dom-collection/F5MPGch0.jsx";
import { combineStyle } from "@solid-primitives/props";
import { createContext, createEffect, createSignal, createUniqueId, merge, omit, useContext } from "solid-js";
import { callHandler, composeEventHandlers } from "@kobalte/utils";
//#region src/accordion/accordion-item-context.tsx
const AccordionItemContext = createContext();
function useAccordionItemContext() {
	const context = useContext(AccordionItemContext);
	if (context === void 0) throw new Error("[kobalte]: `useAccordionItemContext` must be used within a `Accordion.Item` component");
	return context;
}
//#endregion
//#region src/accordion/accordion-content.tsx
/**
* Contains the content to be rendered when the `Accordion.Item` is expanded.
*/
function AccordionContent(props) {
	const itemContext = useAccordionItemContext();
	const defaultId = itemContext.generateId("content");
	const mergedProps = merge({ id: defaultId }, props);
	const others = omit(mergedProps, "id", "style");
	createEffect(() => mergedProps.id, (id) => itemContext.registerContentId(id));
	return <collapsible_exports.Content role="region" aria-labelledby={itemContext.triggerId()} style={combineStyle({
		"--kb-accordion-content-height": "var(--kb-collapsible-content-height)",
		"--kb-accordion-content-width": "var(--kb-collapsible-content-width)"
	}, mergedProps.style)} {...others} />;
}
//#endregion
//#region src/accordion/accordion-header.tsx
/**
* Wraps an `Accordion.Trigger`.
* Use the `as` prop to update it to the appropriate heading level for your page.
*/
function AccordionHeader(props) {
	const context = useCollapsibleContext();
	return <Polymorphic as="h3" {...context.dataset()} {...props} />;
}
//#endregion
//#region src/accordion/accordion-context.tsx
const AccordionContext = createContext();
function useAccordionContext() {
	const context = useContext(AccordionContext);
	if (context === void 0) throw new Error("[kobalte]: `useAccordionContext` must be used within a `Accordion.Root` component");
	return context;
}
//#endregion
//#region src/accordion/accordion-item.tsx
/**
* An item of the accordion, contains all the parts of a collapsible section.
*/
function AccordionItem(props) {
	const accordionContext = useAccordionContext();
	const defaultId = `${accordionContext.generateId("item")}-${createUniqueId()}`;
	const mergedProps = merge({ id: defaultId }, props);
	const others = omit(mergedProps, "value", "disabled");
	const [triggerId, setTriggerId] = createSignal(void 0, { ownedWrite: true });
	const [contentId, setContentId] = createSignal(void 0, { ownedWrite: true });
	const selectionManager = () => accordionContext.listState().selectionManager();
	const isExpanded = () => {
		return selectionManager().isSelected(mergedProps.value);
	};
	const context = {
		value: () => mergedProps.value,
		triggerId,
		contentId,
		generateId: (suffix) => `${others.id}-${suffix}`,
		registerTriggerId: createRegisterId(setTriggerId),
		registerContentId: createRegisterId(setContentId)
	};
	return <AccordionItemContext value={context}>
			<collapsible_exports.Root open={isExpanded()} disabled={mergedProps.disabled} {...others} />
		</AccordionItemContext>;
}
//#endregion
//#region src/accordion/accordion-root.tsx
/**
* A vertically stacked set of interactive headings that each reveal an associated section of content.
*/
function AccordionRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const defaultId = `accordion-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		multiple: false,
		collapsible: false,
		shouldFocusWrap: true
	}, props);
	const others = omit(mergedProps, "id", "ref", "value", "defaultValue", "onChange", "multiple", "collapsible", "shouldFocusWrap", "onKeyDown", "onMouseDown", "onFocusIn", "onFocusOut");
	const { DomCollectionProvider, items } = createDomCollection();
	const listState = createListState({
		selectedKeys: () => mergedProps.value,
		defaultSelectedKeys: () => mergedProps.defaultValue,
		onSelectionChange: (value) => mergedProps.onChange?.(Array.from(value)),
		disallowEmptySelection: () => !mergedProps.multiple && !mergedProps.collapsible,
		selectionMode: () => mergedProps.multiple ? "multiple" : "single",
		dataSource: items
	});
	const selectableList = createSelectableList({
		selectionManager: () => listState.selectionManager(),
		collection: () => listState.collection(),
		disallowEmptySelection: () => listState.selectionManager().disallowEmptySelection(),
		shouldFocusWrap: () => mergedProps.shouldFocusWrap,
		disallowTypeAhead: true,
		allowsTabNavigation: true
	}, ref);
	const context = {
		listState: () => listState,
		generateId: (suffix) => `${mergedProps.id}-${suffix}`
	};
	return <DomCollectionProvider>
			<AccordionContext value={context}>
				<Polymorphic as="div" id={mergedProps.id} ref={[setRef, mergedProps.ref]} onKeyDown={composeEventHandlers([mergedProps.onKeyDown, selectableList.onKeyDown])} onMouseDown={composeEventHandlers([mergedProps.onMouseDown, selectableList.onMouseDown])} onFocusIn={composeEventHandlers([mergedProps.onFocusIn, selectableList.onFocusIn])} onFocusOut={composeEventHandlers([mergedProps.onFocusOut, selectableList.onFocusOut])} {...others} />
			</AccordionContext>
		</DomCollectionProvider>;
}
//#endregion
//#region src/accordion/accordion-trigger.tsx
/**
* Toggles the collapsed state of its associated item. It should be nested inside an `Accordion.Header`.
*/
function AccordionTrigger(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const accordionContext = useAccordionContext();
	const itemContext = useAccordionItemContext();
	const collapsibleContext = useCollapsibleContext();
	const defaultId = itemContext.generateId("trigger");
	const mergedProps = merge({ id: defaultId }, props);
	const others = omit(mergedProps, "ref", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus");
	createDomCollectionItem({ getItem: () => ({
		ref,
		type: "item",
		key: itemContext.value(),
		textValue: "",
		disabled: collapsibleContext.disabled()
	}) });
	const selectableItem = createSelectableItem({
		key: () => itemContext.value(),
		selectionManager: () => accordionContext.listState().selectionManager(),
		disabled: () => collapsibleContext.disabled(),
		shouldSelectOnPressUp: true
	}, ref);
	const onKeyDown = (e) => {
		if (["Enter", " "].includes(e.key)) e.preventDefault();
		callHandler(e, mergedProps.onKeyDown);
		callHandler(e, selectableItem.onKeyDown);
	};
	createEffect(() => others.id, (id) => itemContext.registerTriggerId(id));
	return <collapsible_exports.Trigger ref={[setRef, mergedProps.ref]} data-key={selectableItem.dataKey()} onPointerDown={composeEventHandlers([mergedProps.onPointerDown, selectableItem.onPointerDown])} onPointerUp={composeEventHandlers([mergedProps.onPointerUp, selectableItem.onPointerUp])} onClick={composeEventHandlers([mergedProps.onClick, selectableItem.onClick])} onKeyDown={onKeyDown} onMouseDown={composeEventHandlers([mergedProps.onMouseDown, selectableItem.onMouseDown])} onFocus={composeEventHandlers([mergedProps.onFocus, selectableItem.onFocus])} {...others} />;
}
//#endregion
//#region src/accordion/index.tsx
var accordion_exports = /* @__PURE__ */ __exportAll({
	Accordion: () => Accordion,
	Content: () => AccordionContent,
	Header: () => AccordionHeader,
	Item: () => AccordionItem,
	Root: () => AccordionRoot,
	Trigger: () => AccordionTrigger,
	useAccordionContext: () => useAccordionContext
});
const Accordion = Object.assign(AccordionRoot, {
	Content: AccordionContent,
	Header: AccordionHeader,
	Item: AccordionItem,
	Trigger: AccordionTrigger
});
//#endregion
export { AccordionItem as a, AccordionContent as c, AccordionRoot as i, accordion_exports as n, useAccordionContext as o, AccordionTrigger as r, AccordionHeader as s, Accordion as t };
