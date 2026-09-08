import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as getItemCount } from "../create-collection/B_KE11tb.js";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.js";
import { i as createSelectableItem, t as createListState } from "../create-list-state/_aAsgQr7.js";
import { t as createSelectableList } from "../create-selectable-list/rxK-SjAU.js";
import { createComponent, mergeProps } from "@solidjs/web";
import { For, Match, Show, Switch, createContext, createEffect, createMemo, createSignal, createUniqueId, merge, omit, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { callHandler, composeEventHandlers } from "@kobalte/utils";
import { isMac, isWebKit } from "@solid-primitives/platform";
//#region src/listbox/listbox-context.tsx
const ListboxContext = createContext();
function useListboxContext() {
	const context = useContext(ListboxContext);
	if (context === void 0) throw new Error("[kobalte]: `useListboxContext` must be used within a `Listbox` component");
	return context;
}
//#endregion
//#region src/listbox/listbox-item-context.tsx
const ListboxItemContext = createContext();
function useListboxItemContext() {
	const context = useContext(ListboxItemContext);
	if (context === void 0) throw new Error("[kobalte]: `useListboxItemContext` must be used within a `Listbox.Item` component");
	return context;
}
//#endregion
//#region src/listbox/listbox-item.tsx
/**
* An item of the listbox.
*/
function ListboxItem(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const listBoxContext = useListboxContext();
	const defaultId = `${listBoxContext.generateId("item")}-${createUniqueId()}`;
	const mergedProps = merge({ id: defaultId }, props);
	const others = omit(mergedProps, "ref", "item", "aria-label", "aria-labelledby", "aria-describedby", "onPointerMove", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus");
	const [labelId, setLabelId] = createSignal(void 0, { ownedWrite: true });
	const [descriptionId, setDescriptionId] = createSignal(void 0, { ownedWrite: true });
	const selectionManager = () => listBoxContext.listState().selectionManager();
	const isHighlighted = () => selectionManager().focusedKey() === mergedProps.item.key;
	const selectableItem = createSelectableItem({
		key: () => mergedProps.item.key,
		selectionManager,
		shouldSelectOnPressUp: listBoxContext.shouldSelectOnPressUp,
		allowsDifferentPressOrigin: () => {
			return listBoxContext.shouldSelectOnPressUp() && listBoxContext.shouldFocusOnHover();
		},
		shouldUseVirtualFocus: listBoxContext.shouldUseVirtualFocus,
		disabled: () => mergedProps.item.disabled
	}, ref);
	const ariaSelected = () => {
		if (selectionManager().selectionMode() === "none") return;
		return selectableItem.isSelected() ? "true" : "false";
	};
	const isNotSafariMacOS = createMemo(() => !(isMac && isWebKit));
	const ariaLabel = () => isNotSafariMacOS() ? mergedProps["aria-label"] : void 0;
	const ariaLabelledBy = () => isNotSafariMacOS() ? labelId() : void 0;
	const ariaDescribedBy = () => isNotSafariMacOS() ? descriptionId() : void 0;
	const ariaPosInSet = () => {
		if (!listBoxContext.isVirtualized()) return;
		const index = listBoxContext.listState().collection().getItem(mergedProps.item.key)?.index;
		return index != null ? index + 1 : void 0;
	};
	const ariaSetSize = () => {
		if (!listBoxContext.isVirtualized()) return;
		return getItemCount(listBoxContext.listState().collection());
	};
	/**
	* We focus items on `pointerMove` to achieve the following:
	*
	* - Mouse over an item (it focuses)
	* - Leave mouse where it is and use keyboard to focus a different item
	* - Wiggle mouse without it leaving previously focused item
	* - Previously focused item should re-focus
	*
	* If we used `mouseOver`/`mouseEnter` it would not re-focus when the mouse
	* wiggles. This is to match native select implementation.
	*/
	const onPointerMove = (e) => {
		callHandler(e, mergedProps.onPointerMove);
		if (e.pointerType !== "mouse") return;
		if (!selectableItem.isDisabled() && listBoxContext.shouldFocusOnHover()) {
			e.currentTarget.focus({ preventScroll: true });
			selectionManager().setFocused(true);
			selectionManager().setFocusedKey(mergedProps.item.key);
		}
	};
	const dataset = createMemo(() => ({
		"data-disabled": selectableItem.isDisabled() ? "" : void 0,
		"data-selected": selectableItem.isSelected() ? "" : void 0,
		"data-highlighted": isHighlighted() ? "" : void 0
	}));
	const context = {
		isSelected: selectableItem.isSelected,
		dataset,
		generateId: (suffix) => `${others.id}-${suffix}`,
		registerLabelId: createRegisterId(setLabelId),
		registerDescriptionId: createRegisterId(setDescriptionId)
	};
	return createComponent(ListboxItemContext, {
		value: context,
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "li",
				ref: [setRef, mergedProps.ref],
				role: "option",
				get tabindex() {
					return selectableItem.tabIndex();
				},
				get ["aria-disabled"]() {
					return selectableItem.isDisabled() ? "true" : "false";
				},
				get ["aria-selected"]() {
					return ariaSelected();
				},
				get ["aria-label"]() {
					return ariaLabel();
				},
				get ["aria-labelledby"]() {
					return ariaLabelledBy();
				},
				get ["aria-describedby"]() {
					return ariaDescribedBy();
				},
				get ["aria-posinset"]() {
					return ariaPosInSet();
				},
				get ["aria-setsize"]() {
					return ariaSetSize();
				},
				get ["data-key"]() {
					return selectableItem.dataKey();
				},
				get onPointerDown() {
					return composeEventHandlers([mergedProps.onPointerDown, selectableItem.onPointerDown]);
				},
				get onPointerUp() {
					return composeEventHandlers([mergedProps.onPointerUp, selectableItem.onPointerUp]);
				},
				get onClick() {
					return composeEventHandlers([mergedProps.onClick, selectableItem.onClick]);
				},
				get onKeyDown() {
					return composeEventHandlers([mergedProps.onKeyDown, selectableItem.onKeyDown]);
				},
				get onMouseDown() {
					return composeEventHandlers([mergedProps.onMouseDown, selectableItem.onMouseDown]);
				},
				get onFocus() {
					return composeEventHandlers([mergedProps.onFocus, selectableItem.onFocus]);
				},
				onPointerMove
			}, dataset, others));
		}
	});
}
//#endregion
//#region src/listbox/listbox-item-description.tsx
/**
* An optional accessible description to be announced for the item.
* Useful for items that have more complex content (e.g. icons, multiple lines of text, etc.)
*/
function ListboxItemDescription(props) {
	const context = useListboxItemContext();
	const mergedProps = merge({ id: context.generateId("description") }, props);
	createEffect(() => mergedProps.id, (id) => context.registerDescriptionId(id));
	return createComponent(Polymorphic, mergeProps({ as: "div" }, () => context.dataset(), mergedProps));
}
//#endregion
//#region src/listbox/listbox-item-indicator.tsx
/**
* The visual indicator rendered when the item is selected.
* You can style this element directly, or you can use it as a wrapper to put an icon into, or both.
*/
function ListboxItemIndicator(props) {
	const context = useListboxItemContext();
	const mergedProps = merge({ id: context.generateId("indicator") }, props);
	const others = omit(mergedProps, "forceMount");
	return createComponent(Show, {
		get when() {
			return mergedProps.forceMount || context.isSelected();
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "div",
				"aria-hidden": "true"
			}, () => context.dataset(), others));
		}
	});
}
//#endregion
//#region src/listbox/listbox-item-label.tsx
/**
* An accessible label to be announced for the item.
* Useful for items that have more complex content (e.g. icons, multiple lines of text, etc.)
*/
function ListboxItemLabel(props) {
	const context = useListboxItemContext();
	const mergedProps = merge({ id: context.generateId("label") }, props);
	createEffect(() => mergedProps.id, (id) => context.registerLabelId(id));
	return createComponent(Polymorphic, mergeProps({ as: "div" }, () => context.dataset(), mergedProps));
}
//#endregion
//#region src/listbox/listbox-root.tsx
/**
* Listbox presents a list of options and allows a user to select one or more of them.
*/
function ListboxRoot(props) {
	const [ref, setRef] = createSignal(void 0, { ownedWrite: true });
	const defaultId = `listbox-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		selectionMode: "single",
		virtualized: false
	}, props);
	const others = omit(mergedProps, "ref", "children", "renderItem", "renderSection", "value", "defaultValue", "onChange", "options", "optionValue", "optionTextValue", "optionDisabled", "optionGroupChildren", "state", "keyboardDelegate", "autoFocus", "selectionMode", "shouldFocusWrap", "shouldUseVirtualFocus", "shouldSelectOnPressUp", "shouldFocusOnHover", "allowDuplicateSelectionEvents", "disallowEmptySelection", "selectionBehavior", "selectOnFocus", "disallowTypeAhead", "allowsTabNavigation", "virtualized", "scrollToItem", "scrollRef", "onKeyDown", "onMouseDown", "onFocusIn", "onFocusOut");
	const listState = createMemo(() => {
		if (mergedProps.state) return mergedProps.state;
		return createListState({
			selectedKeys: () => mergedProps.value,
			defaultSelectedKeys: () => mergedProps.defaultValue,
			onSelectionChange: mergedProps.onChange,
			allowDuplicateSelectionEvents: () => access(mergedProps.allowDuplicateSelectionEvents),
			disallowEmptySelection: () => access(mergedProps.disallowEmptySelection),
			selectionBehavior: () => access(mergedProps.selectionBehavior),
			selectionMode: () => access(mergedProps.selectionMode),
			dataSource: () => mergedProps.options ?? [],
			getKey: () => mergedProps.optionValue,
			getTextValue: () => mergedProps.optionTextValue,
			getDisabled: () => mergedProps.optionDisabled,
			getSectionChildren: () => mergedProps.optionGroupChildren
		});
	});
	const selectableList = createSelectableList({
		selectionManager: () => listState().selectionManager(),
		collection: () => listState().collection(),
		autoFocus: () => access(mergedProps.autoFocus),
		shouldFocusWrap: () => access(mergedProps.shouldFocusWrap),
		keyboardDelegate: () => mergedProps.keyboardDelegate,
		disallowEmptySelection: () => access(mergedProps.disallowEmptySelection),
		selectOnFocus: () => access(mergedProps.selectOnFocus),
		disallowTypeAhead: () => access(mergedProps.disallowTypeAhead),
		shouldUseVirtualFocus: () => access(mergedProps.shouldUseVirtualFocus),
		allowsTabNavigation: () => access(mergedProps.allowsTabNavigation),
		isVirtualized: () => mergedProps.virtualized,
		scrollToKey: () => mergedProps.scrollToItem
	}, ref, () => mergedProps.scrollRef?.());
	return createComponent(ListboxContext, {
		value: {
			listState,
			generateId: (suffix) => `${others.id}-${suffix}`,
			shouldUseVirtualFocus: () => mergedProps.shouldUseVirtualFocus,
			shouldSelectOnPressUp: () => mergedProps.shouldSelectOnPressUp,
			shouldFocusOnHover: () => mergedProps.shouldFocusOnHover,
			isVirtualized: () => mergedProps.virtualized
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "ul",
				ref: [setRef, mergedProps.ref],
				role: "listbox",
				get tabindex() {
					return selectableList.tabIndex();
				},
				get ["aria-multiselectable"]() {
					return listState().selectionManager().selectionMode() === "multiple" ? "true" : void 0;
				},
				get onKeyDown() {
					return composeEventHandlers([mergedProps.onKeyDown, selectableList.onKeyDown]);
				},
				get onMouseDown() {
					return composeEventHandlers([mergedProps.onMouseDown, selectableList.onMouseDown]);
				},
				get onFocusIn() {
					return composeEventHandlers([mergedProps.onFocusIn, selectableList.onFocusIn]);
				},
				get onFocusOut() {
					return composeEventHandlers([mergedProps.onFocusOut, selectableList.onFocusOut]);
				}
			}, others, { get children() {
				return createComponent(Show, {
					get when() {
						return !mergedProps.virtualized;
					},
					get fallback() {
						return mergedProps.children?.(listState().collection);
					},
					get children() {
						return createComponent(For, {
							get each() {
								return [...listState().collection()];
							},
							keyed: (item) => item.key,
							children: (item) => createComponent(Switch, { get children() {
								return [createComponent(Match, {
									get when() {
										return item().type === "section";
									},
									get children() {
										return mergedProps.renderSection?.(item());
									}
								}), createComponent(Match, {
									get when() {
										return item().type === "item";
									},
									get children() {
										return mergedProps.renderItem?.(item());
									}
								})];
							} })
						});
					}
				});
			} }));
		}
	});
}
//#endregion
//#region src/listbox/listbox-section.tsx
/**
* A component used to render the label of a listbox option group.
* It won't be focusable using arrow keys.
*/
function ListboxSection(props) {
	return createComponent(Polymorphic, mergeProps({
		as: "li",
		role: "presentation"
	}, props));
}
//#endregion
//#region src/listbox/index.tsx
var listbox_exports = /* @__PURE__ */ __exportAll({
	Item: () => ListboxItem,
	ItemDescription: () => ListboxItemDescription,
	ItemIndicator: () => ListboxItemIndicator,
	ItemLabel: () => ListboxItemLabel,
	Listbox: () => Listbox,
	Root: () => ListboxRoot,
	Section: () => ListboxSection,
	useListboxContext: () => useListboxContext
});
const Listbox = Object.assign(ListboxRoot, {
	Item: ListboxItem,
	ItemDescription: ListboxItemDescription,
	ItemIndicator: ListboxItemIndicator,
	ItemLabel: ListboxItemLabel,
	Section: ListboxSection
});
//#endregion
export { ListboxItemLabel as a, ListboxItem as c, ListboxRoot as i, useListboxContext as l, listbox_exports as n, ListboxItemIndicator as o, ListboxSection as r, ListboxItemDescription as s, Listbox as t };
