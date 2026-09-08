import { n as createCollection } from "../create-collection/B_KE11tb.js";
import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { useLocale } from "../i18n/index.js";
import { createEffect, createMemo, createSignal, flush, merge, onSettled } from "solid-js";
import { access } from "@solid-primitives/utils";
import { callHandler } from "@kobalte/utils";
import { isAppleDevice, isMac } from "@solid-primitives/platform";
import { createEventListener } from "@solid-primitives/event-listener";
import { getFocusableTreeWalker } from "@solid-primitives/focus";
//#region src/selection/types.ts
/**
* A Selection is a special Set containing Keys, which also has an anchor
* and current selected key for use when range selecting.
*/
var Selection = class Selection extends Set {
	anchorKey;
	currentKey;
	constructor(keys, anchorKey, currentKey) {
		super(keys);
		if (keys instanceof Selection) {
			this.anchorKey = anchorKey || keys.anchorKey;
			this.currentKey = currentKey || keys.currentKey;
		} else {
			this.anchorKey = anchorKey;
			this.currentKey = currentKey;
		}
	}
};
//#endregion
//#region src/selection/create-controllable-selection-signal.ts
/**
* Creates a simple reactive `Selection` state with a getter, setter and a fallback value of an empty selection,
* that can be controlled with `value` and `onChange` props.
*/
function createControllableSelectionSignal(props) {
	const [_value, setValue] = (0, primitives_exports.createControllableSignal)(props);
	const value = () => _value() ?? new Selection();
	return [value, setValue];
}
//#endregion
//#region src/selection/utils.ts
function isNonContiguousSelectionModifier(e) {
	return isAppleDevice ? e.altKey : e.ctrlKey;
}
function isCtrlKeyPressed(e) {
	if (isMac) return e.metaKey;
	return e.ctrlKey;
}
function convertSelection(selection) {
	return new Selection(selection);
}
function isSameSelection(setA, setB) {
	if (setA.size !== setB.size) return false;
	for (const item of setA) if (!setB.has(item)) return false;
	return true;
}
//#endregion
//#region src/selection/create-multiple-selection-state.ts
/**
* Manages state for multiple selection and focus in a collection.
*/
function createMultipleSelectionState(props) {
	const mergedProps = merge({
		selectionMode: "none",
		selectionBehavior: "toggle"
	}, props);
	const [isFocused, setFocused] = createSignal(false);
	const [focusedKey, setFocusedKey] = createSignal();
	const [selectedKeys, _setSelectedKeys] = createControllableSelectionSignal({
		value: createMemo(() => {
			const selection = access(mergedProps.selectedKeys);
			if (selection != null) return convertSelection(selection);
			return selection;
		}),
		defaultValue: createMemo(() => {
			const defaultSelection = access(mergedProps.defaultSelectedKeys);
			if (defaultSelection != null) return convertSelection(defaultSelection);
			return new Selection();
		}),
		onChange: (value) => mergedProps.onSelectionChange?.(value)
	});
	const [selectionBehavior, setSelectionBehavior] = createSignal(access(mergedProps.selectionBehavior));
	const selectionMode = () => access(mergedProps.selectionMode);
	const disallowEmptySelection = () => access(mergedProps.disallowEmptySelection) ?? false;
	const setSelectedKeys = (keys) => {
		if (access(mergedProps.allowDuplicateSelectionEvents) || !isSameSelection(keys, selectedKeys())) _setSelectedKeys(keys);
	};
	createEffect(() => {
		const selection = selectedKeys();
		return access(mergedProps.selectionBehavior) === "replace" && selectionBehavior() === "toggle" && typeof selection === "object" && selection.size === 0;
	}, (shouldReset) => {
		if (shouldReset) setSelectionBehavior("replace");
	});
	createEffect(() => access(mergedProps.selectionBehavior) ?? "toggle", (behavior) => {
		setSelectionBehavior(behavior);
	});
	return {
		selectionMode,
		disallowEmptySelection,
		selectionBehavior,
		setSelectionBehavior,
		isFocused,
		setFocused,
		focusedKey,
		setFocusedKey,
		selectedKeys,
		setSelectedKeys
	};
}
//#endregion
//#region src/selection/create-type-select.ts
/**
* Handles typeahead interactions with collections.
*/
function createTypeSelect(props) {
	const [search, setSearch] = createSignal("");
	const [timeoutId, setTimeoutId] = createSignal(-1);
	const onKeyDown = (e) => {
		if (access(props.isDisabled)) return;
		const delegate = access(props.keyboardDelegate);
		const manager = access(props.selectionManager);
		if (!delegate.getKeyForSearch) return;
		const character = getStringForKey(e.key);
		if (!character || e.ctrlKey || e.metaKey) return;
		if (character === " " && search().trim().length > 0) {
			e.preventDefault();
			e.stopPropagation();
		}
		let newSearch = setSearch((prev) => prev + character);
		let key = delegate.getKeyForSearch(newSearch, manager.focusedKey()) ?? delegate.getKeyForSearch(newSearch);
		if (key == null && isAllSameLetter(newSearch)) {
			newSearch = newSearch[0];
			key = delegate.getKeyForSearch(newSearch, manager.focusedKey()) ?? delegate.getKeyForSearch(newSearch);
		}
		if (key != null) {
			manager.setFocusedKey(key);
			props.onTypeSelect?.(key);
		}
		clearTimeout(timeoutId());
		setTimeoutId(window.setTimeout(() => setSearch(""), 500));
	};
	return { typeSelectHandlers: { onKeyDown } };
}
function getStringForKey(key) {
	if (key.length === 1 || !/^[A-Z]/i.test(key)) return key;
	return "";
}
function isAllSameLetter(search) {
	return search.split("").every((letter) => letter === search[0]);
}
//#endregion
//#region src/selection/create-selectable-collection.ts
/**
* Handles interactions with selectable collections.
* @param props Props for the collection.
* @param ref The ref attached to the element representing the collection.
* @param scrollRef The ref attached to the scrollable body. Used to provide automatic scrolling on item focus for non-virtualized collections. If not provided, defaults to the collection ref.
*/
function createSelectableCollection(props, ref, scrollRef) {
	const mergedProps = merge({ selectOnFocus: () => access(props.selectionManager).selectionBehavior() === "replace" }, props);
	const finalScrollRef = () => scrollRef?.() ?? ref();
	const { direction } = useLocale();
	let isSelfFocusing = false;
	let scrollPos = {
		top: 0,
		left: 0
	};
	createEventListener(() => !access(mergedProps.isVirtualized) ? finalScrollRef() : void 0, "scroll", () => {
		const scrollEl = finalScrollRef();
		if (!scrollEl) return;
		scrollPos = {
			top: scrollEl.scrollTop,
			left: scrollEl.scrollLeft
		};
	});
	const { typeSelectHandlers } = createTypeSelect({
		isDisabled: () => access(mergedProps.disallowTypeAhead),
		keyboardDelegate: () => access(mergedProps.keyboardDelegate),
		selectionManager: () => access(mergedProps.selectionManager)
	});
	const orientation = () => access(mergedProps.orientation) ?? "vertical";
	const onKeyDown = (e) => {
		callHandler(e, typeSelectHandlers.onKeyDown);
		if (e.altKey && e.key === "Tab") e.preventDefault();
		const refEl = ref();
		if (!refEl?.contains(e.target)) return;
		const manager = access(mergedProps.selectionManager);
		const selectOnFocus = access(mergedProps.selectOnFocus);
		const navigateToKey = (key) => {
			if (key != null) {
				manager.setFocusedKey(key);
				if (e.shiftKey && manager.selectionMode() === "multiple") manager.extendSelection(key);
				else if (selectOnFocus && !isNonContiguousSelectionModifier(e)) manager.replaceSelection(key);
			}
		};
		const delegate = access(mergedProps.keyboardDelegate);
		const shouldFocusWrap = access(mergedProps.shouldFocusWrap);
		const focusedKey = manager.focusedKey();
		switch (e.key) {
			case orientation() === "vertical" ? "ArrowDown" : "ArrowRight":
				if (delegate.getKeyBelow) {
					e.preventDefault();
					let nextKey;
					if (focusedKey != null) nextKey = delegate.getKeyBelow(focusedKey);
					else nextKey = delegate.getFirstKey?.();
					if (nextKey == null && shouldFocusWrap) nextKey = delegate.getFirstKey?.(focusedKey);
					navigateToKey(nextKey);
				}
				break;
			case orientation() === "vertical" ? "ArrowUp" : "ArrowLeft":
				if (delegate.getKeyAbove) {
					e.preventDefault();
					let nextKey;
					if (focusedKey != null) nextKey = delegate.getKeyAbove(focusedKey);
					else nextKey = delegate.getLastKey?.();
					if (nextKey == null && shouldFocusWrap) nextKey = delegate.getLastKey?.(focusedKey);
					navigateToKey(nextKey);
				}
				break;
			case orientation() === "vertical" ? "ArrowLeft" : "ArrowUp":
				if (delegate.getKeyLeftOf) {
					e.preventDefault();
					const isRTL = direction() === "rtl";
					let nextKey;
					if (focusedKey != null) nextKey = delegate.getKeyLeftOf(focusedKey);
					else nextKey = isRTL ? delegate.getFirstKey?.() : delegate.getLastKey?.();
					navigateToKey(nextKey);
				}
				break;
			case orientation() === "vertical" ? "ArrowRight" : "ArrowDown":
				if (delegate.getKeyRightOf) {
					e.preventDefault();
					const isRTL = direction() === "rtl";
					let nextKey;
					if (focusedKey != null) nextKey = delegate.getKeyRightOf(focusedKey);
					else nextKey = isRTL ? delegate.getLastKey?.() : delegate.getFirstKey?.();
					navigateToKey(nextKey);
				}
				break;
			case "Home":
				if (delegate.getFirstKey) {
					e.preventDefault();
					const firstKey = delegate.getFirstKey(focusedKey, isCtrlKeyPressed(e));
					if (firstKey != null) {
						manager.setFocusedKey(firstKey);
						if (isCtrlKeyPressed(e) && e.shiftKey && manager.selectionMode() === "multiple") manager.extendSelection(firstKey);
						else if (selectOnFocus) manager.replaceSelection(firstKey);
					}
				}
				break;
			case "End":
				if (delegate.getLastKey) {
					e.preventDefault();
					const lastKey = delegate.getLastKey(focusedKey, isCtrlKeyPressed(e));
					if (lastKey != null) {
						manager.setFocusedKey(lastKey);
						if (isCtrlKeyPressed(e) && e.shiftKey && manager.selectionMode() === "multiple") manager.extendSelection(lastKey);
						else if (selectOnFocus) manager.replaceSelection(lastKey);
					}
				}
				break;
			case "PageDown":
				if (delegate.getKeyPageBelow && focusedKey != null) {
					e.preventDefault();
					navigateToKey(delegate.getKeyPageBelow(focusedKey));
				}
				break;
			case "PageUp":
				if (delegate.getKeyPageAbove && focusedKey != null) {
					e.preventDefault();
					navigateToKey(delegate.getKeyPageAbove(focusedKey));
				}
				break;
			case "a":
				if (isCtrlKeyPressed(e) && manager.selectionMode() === "multiple" && access(mergedProps.disallowSelectAll) !== true) {
					e.preventDefault();
					manager.selectAll();
				}
				break;
			case "Escape":
				if (!e.defaultPrevented) {
					e.preventDefault();
					if (!access(mergedProps.disallowEmptySelection)) manager.clearSelection();
				}
				break;
			case "Tab": if (!access(mergedProps.allowsTabNavigation)) {
				if (e.shiftKey) refEl.focus();
				else {
					const walker = getFocusableTreeWalker(refEl, { tabbable: true });
					let next;
					let last;
					do {
						last = walker.lastChild();
						if (last) next = last;
					} while (last);
					if (next && !next.contains(document.activeElement)) next.focus({ preventScroll: true });
				}
				break;
			}
		}
	};
	const onFocusIn = (e) => {
		if (isSelfFocusing) return;
		const manager = access(mergedProps.selectionManager);
		const delegate = access(mergedProps.keyboardDelegate);
		const selectOnFocus = access(mergedProps.selectOnFocus);
		if (manager.isFocused()) {
			if (!e.currentTarget.contains(e.target)) manager.setFocused(false);
			return;
		}
		if (!e.currentTarget.contains(e.target)) return;
		manager.setFocused(true);
		if (manager.focusedKey() == null) {
			const navigateToFirstKey = (key) => {
				if (key == null) return;
				manager.setFocusedKey(key);
				flush();
				if (selectOnFocus) manager.replaceSelection(key);
			};
			const relatedTarget = e.relatedTarget;
			if (relatedTarget && e.currentTarget.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING) navigateToFirstKey(manager.lastSelectedKey() ?? delegate.getLastKey?.());
			else navigateToFirstKey(manager.firstSelectedKey() ?? delegate.getFirstKey?.());
		} else if (!access(mergedProps.isVirtualized)) {
			const scrollEl = finalScrollRef();
			if (scrollEl) {
				scrollEl.scrollTop = scrollPos.top;
				scrollEl.scrollLeft = scrollPos.left;
				const element = scrollEl.querySelector(`[data-key="${manager.focusedKey()}"]`);
				if (element) {
					element.focus({ preventScroll: true });
					element.scrollIntoView({ block: "nearest" });
				}
			}
		}
	};
	const onFocusOut = (e) => {
		const manager = access(mergedProps.selectionManager);
		if (!e.currentTarget.contains(e.relatedTarget)) manager.setFocused(false);
	};
	const onMouseDown = (e) => {
		if (finalScrollRef() === e.target) e.preventDefault();
	};
	const tryAutoFocus = () => {
		const autoFocus = access(mergedProps.autoFocus);
		if (!autoFocus) return;
		const manager = access(mergedProps.selectionManager);
		const delegate = access(mergedProps.keyboardDelegate);
		let focusedKey;
		if (autoFocus === "first") focusedKey = delegate.getFirstKey?.();
		if (autoFocus === "last") focusedKey = delegate.getLastKey?.();
		const selectedKeys = manager.selectedKeys();
		if (selectedKeys.size) focusedKey = selectedKeys.values().next().value;
		manager.setFocused(true);
		manager.setFocusedKey(focusedKey);
		const refEl = ref();
		if (refEl && focusedKey == null && !access(mergedProps.shouldUseVirtualFocus)) {
			isSelfFocusing = true;
			refEl.focus({ preventScroll: true });
			isSelfFocusing = false;
		}
	};
	onSettled(() => {
		if (mergedProps.deferAutoFocus) setTimeout(tryAutoFocus, 0);
		else tryAutoFocus();
	});
	createEffect(() => [
		finalScrollRef(),
		access(mergedProps.isVirtualized),
		access(mergedProps.selectionManager).focusedKey()
	], ([scrollEl, isVirtualized, focusedKey]) => {
		if (isVirtualized) focusedKey && mergedProps.scrollToKey?.(focusedKey);
		else if (focusedKey && scrollEl) {
			const element = scrollEl.querySelector(`[data-key="${focusedKey}"]`);
			if (element) element.scrollIntoView({ block: "nearest" });
		}
	});
	return {
		tabIndex: createMemo(() => {
			if (access(mergedProps.shouldUseVirtualFocus)) return;
			return access(mergedProps.selectionManager).focusedKey() == null ? 0 : -1;
		}),
		onKeyDown,
		onMouseDown,
		onFocusIn,
		onFocusOut
	};
}
//#endregion
//#region src/selection/create-selectable-item.ts
/**
* Handles interactions with an item in a selectable collection.
* @param props Props for the item.
* @param ref Ref to the item.
*/
function createSelectableItem(props, ref) {
	const manager = () => access(props.selectionManager);
	const key = () => access(props.key);
	const shouldUseVirtualFocus = () => access(props.shouldUseVirtualFocus);
	const onSelect = (e) => {
		if (manager().selectionMode() === "none") return;
		if (manager().selectionMode() === "single") {
			if (manager().isSelected(key()) && !manager().disallowEmptySelection()) manager().toggleSelection(key());
			else manager().replaceSelection(key());
		} else if (e?.shiftKey) manager().extendSelection(key());
		else if (manager().selectionBehavior() === "toggle" || isCtrlKeyPressed(e) || "pointerType" in e && e.pointerType === "touch") manager().toggleSelection(key());
		else manager().replaceSelection(key());
	};
	const isSelected = () => manager().isSelected(key());
	const isDisabled = () => access(props.disabled) || manager().isDisabled(key());
	const allowsSelection = () => !isDisabled() && manager().canSelectItem(key());
	let pointerDownType = null;
	const onPointerDown = (e) => {
		if (!allowsSelection()) return;
		pointerDownType = e.pointerType;
		if (e.pointerType === "mouse" && e.button === 0 && !access(props.shouldSelectOnPressUp)) onSelect(e);
	};
	const onPointerUp = (e) => {
		if (!allowsSelection()) return;
		if (e.pointerType === "mouse" && e.button === 0 && access(props.shouldSelectOnPressUp) && access(props.allowsDifferentPressOrigin)) onSelect(e);
	};
	const onClick = (e) => {
		if (!allowsSelection()) return;
		if (access(props.shouldSelectOnPressUp) && !access(props.allowsDifferentPressOrigin) || pointerDownType !== "mouse") onSelect(e);
	};
	const onKeyDown = (e) => {
		if (!allowsSelection() || !["Enter", " "].includes(e.key)) return;
		if (isNonContiguousSelectionModifier(e)) manager().toggleSelection(key());
		else onSelect(e);
	};
	const onMouseDown = (e) => {
		if (isDisabled()) e.preventDefault();
	};
	const onFocus = (e) => {
		const refEl = ref();
		if (shouldUseVirtualFocus() || isDisabled() || !refEl) return;
		if (e.target === refEl) manager().setFocusedKey(key());
	};
	const tabIndex = createMemo(() => {
		if (shouldUseVirtualFocus() || isDisabled()) return;
		return key() === manager().focusedKey() ? 0 : -1;
	});
	const dataKey = createMemo(() => {
		return access(props.virtualized) ? void 0 : key();
	});
	createEffect(() => [
		ref(),
		key(),
		shouldUseVirtualFocus(),
		manager().focusedKey(),
		manager().isFocused()
	], ([refEl, itemKey, virtualFocus, focusedKey, isFocused]) => {
		if (refEl && itemKey === focusedKey && isFocused && !virtualFocus && document.activeElement !== refEl) {
			if (props.focus) props.focus();
			else refEl.focus({ preventScroll: true });
		}
	});
	return {
		isSelected,
		isDisabled,
		allowsSelection,
		tabIndex,
		dataKey,
		onPointerDown,
		onPointerUp,
		onClick,
		onKeyDown,
		onMouseDown,
		onFocus
	};
}
//#endregion
//#region src/selection/selection-manager.ts
/**
* An interface for reading and updating multiple selection state.
*/
var SelectionManager = class {
	collection;
	state;
	constructor(collection, state) {
		this.collection = collection;
		this.state = state;
	}
	/** The type of selection that is allowed in the collection. */
	selectionMode() {
		return this.state.selectionMode();
	}
	/** Whether the collection allows empty selection. */
	disallowEmptySelection() {
		return this.state.disallowEmptySelection();
	}
	/** The selection behavior for the collection. */
	selectionBehavior() {
		return this.state.selectionBehavior();
	}
	/** Sets the selection behavior for the collection. */
	setSelectionBehavior(selectionBehavior) {
		this.state.setSelectionBehavior(selectionBehavior);
	}
	/** Whether the collection is currently focused. */
	isFocused() {
		return this.state.isFocused();
	}
	/** Sets whether the collection is focused. */
	setFocused(isFocused) {
		this.state.setFocused(isFocused);
	}
	/** The current focused key in the collection. */
	focusedKey() {
		return this.state.focusedKey();
	}
	/** Sets the focused key. */
	setFocusedKey(key) {
		if (key == null || this.collection().getItem(key)) this.state.setFocusedKey(key);
	}
	/** The currently selected keys in the collection. */
	selectedKeys() {
		return this.state.selectedKeys();
	}
	/** Returns whether a key is selected. */
	isSelected(key) {
		if (this.state.selectionMode() === "none") return false;
		const retrievedKey = this.getKey(key);
		if (retrievedKey == null) return false;
		return this.state.selectedKeys().has(retrievedKey);
	}
	/** Whether the selection is empty. */
	isEmpty() {
		return this.state.selectedKeys().size === 0;
	}
	/** Whether all items in the collection are selected. */
	isSelectAll() {
		if (this.isEmpty()) return false;
		const selectedKeys = this.state.selectedKeys();
		return this.getAllSelectableKeys().every((k) => selectedKeys.has(k));
	}
	firstSelectedKey() {
		let first;
		for (const key of this.state.selectedKeys()) {
			const item = this.collection().getItem(key);
			const isItemBeforeFirst = item?.index != null && first?.index != null && item.index < first.index;
			if (!first || isItemBeforeFirst) first = item;
		}
		return first?.key;
	}
	lastSelectedKey() {
		let last;
		for (const key of this.state.selectedKeys()) {
			const item = this.collection().getItem(key);
			const isItemAfterLast = item?.index != null && last?.index != null && item.index > last.index;
			if (!last || isItemAfterLast) last = item;
		}
		return last?.key;
	}
	/** Extends the selection to the given key. */
	extendSelection(toKey) {
		if (this.selectionMode() === "none") return;
		if (this.selectionMode() === "single") {
			this.replaceSelection(toKey);
			return;
		}
		const retrievedToKey = this.getKey(toKey);
		if (retrievedToKey == null) return;
		const selectedKeys = this.state.selectedKeys();
		const anchorKey = selectedKeys.anchorKey || retrievedToKey;
		const selection = new Selection(selectedKeys, anchorKey, retrievedToKey);
		for (const key of this.getKeyRange(anchorKey, selectedKeys.currentKey || retrievedToKey)) selection.delete(key);
		for (const key of this.getKeyRange(retrievedToKey, anchorKey)) if (this.canSelectItem(key)) selection.add(key);
		this.state.setSelectedKeys(selection);
	}
	getKeyRange(from, to) {
		const fromItem = this.collection().getItem(from);
		const toItem = this.collection().getItem(to);
		if (fromItem && toItem) {
			if (fromItem.index != null && toItem.index != null && fromItem.index <= toItem.index) return this.getKeyRangeInternal(from, to);
			return this.getKeyRangeInternal(to, from);
		}
		return [];
	}
	getKeyRangeInternal(from, to) {
		const keys = [];
		let key = from;
		while (key != null) {
			const item = this.collection().getItem(key);
			if (item && item.type === "item") keys.push(key);
			if (key === to) return keys;
			key = this.collection().getKeyAfter(key);
		}
		return [];
	}
	getKey(key) {
		const item = this.collection().getItem(key);
		if (!item) return key;
		if (item?.type !== "item") return null;
		return item.key;
	}
	/** Toggles whether the given key is selected. */
	toggleSelection(key) {
		if (this.selectionMode() === "none") return;
		if (this.selectionMode() === "single" && !this.isSelected(key)) {
			this.replaceSelection(key);
			return;
		}
		const retrievedKey = this.getKey(key);
		if (retrievedKey == null) return;
		const keys = new Selection(this.state.selectedKeys());
		if (keys.has(retrievedKey)) keys.delete(retrievedKey);
		else if (this.canSelectItem(retrievedKey)) {
			keys.add(retrievedKey);
			keys.anchorKey = retrievedKey;
			keys.currentKey = retrievedKey;
		}
		if (this.disallowEmptySelection() && keys.size === 0) return;
		this.state.setSelectedKeys(keys);
	}
	/** Replaces the selection with only the given key. */
	replaceSelection(key) {
		if (this.selectionMode() === "none") return;
		const retrievedKey = this.getKey(key);
		if (retrievedKey == null) return;
		const selection = this.canSelectItem(retrievedKey) ? new Selection([retrievedKey], retrievedKey, retrievedKey) : new Selection();
		this.state.setSelectedKeys(selection);
	}
	/** Replaces the selection with the given keys. */
	setSelectedKeys(keys) {
		if (this.selectionMode() === "none") return;
		const selection = new Selection();
		for (const key of keys) {
			const retrievedKey = this.getKey(key);
			if (retrievedKey != null) {
				selection.add(retrievedKey);
				if (this.selectionMode() === "single") break;
			}
		}
		this.state.setSelectedKeys(selection);
	}
	/** Selects all items in the collection. */
	selectAll() {
		if (this.selectionMode() === "multiple") this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()));
	}
	/**
	* Removes all keys from the selection.
	*/
	clearSelection() {
		const selectedKeys = this.state.selectedKeys();
		if (!this.disallowEmptySelection() && selectedKeys.size > 0) this.state.setSelectedKeys(new Selection());
	}
	/**
	* Toggles between select all and an empty selection.
	*/
	toggleSelectAll() {
		if (this.isSelectAll()) this.clearSelection();
		else this.selectAll();
	}
	select(key, e) {
		if (this.selectionMode() === "none") return;
		if (this.selectionMode() === "single") {
			if (this.isSelected(key) && !this.disallowEmptySelection()) this.toggleSelection(key);
			else this.replaceSelection(key);
		} else if (this.selectionBehavior() === "toggle" || e && e.pointerType === "touch") this.toggleSelection(key);
		else this.replaceSelection(key);
	}
	/** Returns whether the current selection is equal to the given selection. */
	isSelectionEqual(selection) {
		if (selection === this.state.selectedKeys()) return true;
		const selectedKeys = this.selectedKeys();
		if (selection.size !== selectedKeys.size) return false;
		for (const key of selection) if (!selectedKeys.has(key)) return false;
		for (const key of selectedKeys) if (!selection.has(key)) return false;
		return true;
	}
	canSelectItem(key) {
		if (this.state.selectionMode() === "none") return false;
		const item = this.collection().getItem(key);
		return item != null && !item.disabled;
	}
	isDisabled(key) {
		const item = this.collection().getItem(key);
		return !item || item.disabled;
	}
	getAllSelectableKeys() {
		const keys = [];
		const addKeys = (key) => {
			while (key != null) {
				if (this.canSelectItem(key)) {
					const item = this.collection().getItem(key);
					if (!item) continue;
					if (item.type === "item") keys.push(key);
				}
				key = this.collection().getKeyAfter(key);
			}
		};
		addKeys(this.collection().getFirstKey());
		return keys;
	}
};
//#endregion
//#region src/list/list-collection.ts
var ListCollection = class {
	keyMap = /* @__PURE__ */ new Map();
	iterable;
	firstKey;
	lastKey;
	constructor(nodes) {
		this.iterable = nodes;
		for (const node of nodes) this.keyMap.set(node.key, node);
		if (this.keyMap.size === 0) return;
		let last;
		let index = 0;
		for (const [key, node] of this.keyMap) {
			if (last) {
				last.nextKey = key;
				node.prevKey = last.key;
			} else {
				this.firstKey = key;
				node.prevKey = void 0;
			}
			if (node.type === "item") node.index = index++;
			last = node;
			last.nextKey = void 0;
		}
		this.lastKey = last.key;
	}
	*[Symbol.iterator]() {
		yield* this.iterable;
	}
	getSize() {
		return this.keyMap.size;
	}
	getKeys() {
		return this.keyMap.keys();
	}
	getKeyBefore(key) {
		return this.keyMap.get(key)?.prevKey;
	}
	getKeyAfter(key) {
		return this.keyMap.get(key)?.nextKey;
	}
	getFirstKey() {
		return this.firstKey;
	}
	getLastKey() {
		return this.lastKey;
	}
	getItem(key) {
		return this.keyMap.get(key);
	}
	at(idx) {
		const keys = [...this.getKeys()];
		return this.getItem(keys[idx]);
	}
};
//#endregion
//#region src/list/create-list-state.ts
/**
* Provides state management for list-like components.
* Handles building a collection of items from props, and manages multiple selection state.
*/
function createListState(props) {
	const selectionState = createMultipleSelectionState(props);
	const factory = (nodes) => {
		return props.filter ? new ListCollection(props.filter(nodes)) : new ListCollection(nodes);
	};
	const collection = createCollection({
		dataSource: () => access(props.dataSource),
		getKey: () => access(props.getKey),
		getTextValue: () => access(props.getTextValue),
		getDisabled: () => access(props.getDisabled),
		getSectionChildren: () => access(props.getSectionChildren),
		factory
	}, [() => props.filter]);
	const selectionManager = new SelectionManager(collection, selectionState);
	createEffect(() => {
		const focusedKey = selectionState.focusedKey();
		return focusedKey != null && !collection().getItem(focusedKey);
	}, (shouldReset) => {
		if (shouldReset) selectionState.setFocusedKey(void 0);
	});
	return {
		collection,
		selectionManager: () => selectionManager
	};
}
//#endregion
export { createSelectableCollection as a, isSameSelection as c, createSelectableItem as i, Selection as l, ListCollection as n, createTypeSelect as o, SelectionManager as r, createMultipleSelectionState as s, createListState as t };
