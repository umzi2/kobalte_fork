import { createComponent, createContext, createEffect, createSignal, merge, untrack, useContext } from "solid-js";
//#region src/primitives/create-dom-collection/dom-collection-context.ts
const DomCollectionContext = createContext(null);
function useOptionalDomCollectionContext() {
	return useContext(DomCollectionContext) ?? void 0;
}
function useDomCollectionContext() {
	const context = useOptionalDomCollectionContext();
	if (context === void 0) throw new Error("[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component");
	return context;
}
//#endregion
//#region src/primitives/create-dom-collection/utils.ts
function isElementPreceding(a, b) {
	return Boolean(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING);
}
function findDOMIndex(items, item) {
	const itemEl = untrack(() => item.ref());
	if (!itemEl) return -1;
	let length = items.length;
	if (!length) return -1;
	while (length--) {
		const currentItemEl = untrack(() => items[length]?.ref());
		if (!currentItemEl) continue;
		if (isElementPreceding(currentItemEl, itemEl)) return length + 1;
	}
	return 0;
}
function sortBasedOnDOMPosition(items) {
	const pairs = items.map((item, index) => [index, item]);
	let isOrderDifferent = false;
	pairs.sort(([indexA, a], [indexB, b]) => {
		const elementA = untrack(() => a.ref());
		const elementB = untrack(() => b.ref());
		if (elementA === elementB) return 0;
		if (!elementA || !elementB) return 0;
		if (isElementPreceding(elementA, elementB)) {
			if (indexA > indexB) isOrderDifferent = true;
			return -1;
		}
		if (indexA < indexB) isOrderDifferent = true;
		return 1;
	});
	if (isOrderDifferent) return pairs.map(([_, item]) => item);
	return items;
}
function setItemsBasedOnDOMPosition(items, setItems) {
	const sortedItems = sortBasedOnDOMPosition(items);
	if (items !== sortedItems) setItems(sortedItems);
}
function getCommonParent(items) {
	const firstItem = items[0];
	const lastItemEl = untrack(() => items[items.length - 1]?.ref());
	let parentEl = untrack(() => firstItem?.ref()?.parentElement);
	while (parentEl) {
		if (lastItemEl && parentEl.contains(lastItemEl)) return parentEl;
		parentEl = parentEl.parentElement;
	}
	return document.body;
}
function createTimeoutObserver(items, setItems) {
	createEffect(() => {}, () => {
		const timeout = setTimeout(() => {
			setItemsBasedOnDOMPosition(untrack(() => items()), setItems);
		});
		return () => clearTimeout(timeout);
	});
}
function createSortBasedOnDOMPosition(items, setItems) {
	if (typeof IntersectionObserver !== "function") {
		createTimeoutObserver(items, setItems);
		return;
	}
	let previousItems = [];
	createEffect(() => items(), (currentItems) => {
		const callback = () => {
			const hasPreviousItems = !!previousItems.length;
			previousItems = untrack(() => items());
			if (!hasPreviousItems) return;
			setItemsBasedOnDOMPosition(untrack(() => items()), setItems);
		};
		const root = getCommonParent(currentItems);
		const observer = new IntersectionObserver(callback, { root });
		for (const item of currentItems) {
			const itemEl = untrack(() => item.ref());
			if (itemEl) observer.observe(itemEl);
		}
		return () => observer.disconnect();
	});
}
//#endregion
//#region src/primitives/create-dom-collection/create-dom-collection.ts
function createDomCollection(props = {}) {
	const [items, setItems] = createSignal([]);
	createSortBasedOnDOMPosition(items, setItems);
	createEffect(() => items(), (currentItems) => {
		props.onItemsChange?.(currentItems);
	}, { defer: true });
	const registerItem = (item) => {
		setItems((prevItems) => {
			const index = findDOMIndex(prevItems, item);
			return index >= 0 && index < prevItems.length ? [
				...prevItems.slice(0, index),
				item,
				...prevItems.slice(index)
			] : [...prevItems, item];
		});
		return () => {
			setItems((prevItems) => {
				const nextItems = prevItems.filter((prevItem) => untrack(() => prevItem.ref()) !== untrack(() => item.ref()));
				if (prevItems.length === nextItems.length) return prevItems;
				return nextItems;
			});
		};
	};
	const DomCollectionProvider = (props) => {
		return createComponent(DomCollectionContext, {
			value: { registerItem },
			get children() {
				return props.children;
			}
		});
	};
	return {
		DomCollectionProvider,
		items
	};
}
//#endregion
//#region src/primitives/create-dom-collection/create-dom-collection-item.ts
function createDomCollectionItem(props) {
	const context = useDomCollectionContext();
	const mergedProps = merge({ shouldRegisterItem: true }, props);
	createEffect(() => mergedProps.shouldRegisterItem ? mergedProps.getItem() : void 0, (item) => {
		if (item == null) return;
		return context.registerItem(item);
	});
}
//#endregion
export { useOptionalDomCollectionContext as a, useDomCollectionContext as i, createDomCollection as n, DomCollectionContext as r, createDomCollectionItem as t };
