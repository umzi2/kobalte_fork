import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { r as ButtonRoot } from "../button/C_WaGidW.js";
import { createComponent, insert, memo, mergeProps, template } from "@solidjs/web";
import { For, Show, createContext, createMemo, createUniqueId, merge, omit, useContext } from "solid-js";
import { composeEventHandlers } from "@kobalte/utils";
//#region src/pagination/pagination-ellipsis.tsx
var _tmpl$$4 = /*#__PURE__*/ template(`<li>`);
function PaginationEllipsis(props) {
	var _el$ = _tmpl$$4();
	insert(_el$, createComponent(Polymorphic, mergeProps({ as: "div" }, props)));
	return _el$;
}
//#endregion
//#region src/pagination/pagination-context.tsx
const PaginationContext = createContext();
function usePaginationContext() {
	const context = useContext(PaginationContext);
	if (context === void 0) throw new Error("[kobalte]: `usePaginationContext` must be used within a `Pagination` component");
	return context;
}
//#endregion
//#region src/pagination/pagination-item.tsx
var _tmpl$$3 = /*#__PURE__*/ template(`<li>`);
function PaginationItem(props) {
	const context = usePaginationContext();
	const others = omit(props, "page", "onClick");
	const isCurrent = () => {
		return context.page() === props.page;
	};
	const onClick = () => {
		context.setPage(props.page);
	};
	var _el$ = _tmpl$$3();
	insert(_el$, createComponent(ButtonRoot, mergeProps({
		get ["aria-current"]() {
			return isCurrent() ? "page" : void 0;
		},
		get ["data-current"]() {
			return isCurrent() ? "" : void 0;
		},
		get onClick() {
			return composeEventHandlers([props.onClick, onClick]);
		}
	}, others)));
	return _el$;
}
//#endregion
//#region src/pagination/pagination-items.tsx
function PaginationItems(_props) {
	const context = usePaginationContext();
	const items = createMemo(() => {
		const { count, siblingCount, page, fixedItems, showFirst, showLast } = context;
		const renderItemsDirectly = count() < 2 * siblingCount() + (fixedItems() ? 6 : 4);
		if (renderItemsDirectly) return { renderItemsDirectly };
		const _showFirst = showFirst() && page() - 1 > siblingCount();
		const _showLast = showLast() && count() - page() > siblingCount();
		let showFirstEllipsis = fixedItems() !== "no-ellipsis" && page() - (showFirst() ? 2 : 1) > siblingCount();
		let showLastEllipsis = fixedItems() !== "no-ellipsis" && count() - page() - (showLast() ? 1 : 0) > siblingCount();
		let previousSiblingCount = Math.min(page() - 1, siblingCount());
		let nextSiblingCount = Math.min(count() - page(), siblingCount());
		if (fixedItems() !== false) {
			const previousSiblingCountRef = previousSiblingCount;
			const nextSiblingCountRef = nextSiblingCount;
			previousSiblingCount += Math.max(siblingCount() - nextSiblingCountRef, 0);
			nextSiblingCount += Math.max(siblingCount() - previousSiblingCountRef, 0);
			if (showFirst() && !_showFirst) nextSiblingCount++;
			if (showLast() && !_showLast) previousSiblingCount++;
			if (fixedItems() === true) {
				if (!showFirstEllipsis) nextSiblingCount++;
				if (!showLastEllipsis) previousSiblingCount++;
				if (page() - previousSiblingCount - (showFirst() ? 2 : 1) === 1) {
					showFirstEllipsis = false;
					previousSiblingCount++;
				}
				if (count() - page() - nextSiblingCount - (showLast() ? 1 : 0) === 1) {
					showLastEllipsis = false;
					nextSiblingCount++;
				}
			}
		}
		return {
			showFirst: _showFirst,
			showLast: _showLast,
			showFirstEllipsis,
			showLastEllipsis,
			previousSiblingCount,
			nextSiblingCount,
			renderItemsDirectly
		};
	});
	return createComponent(Show, {
		get when() {
			return items().renderItemsDirectly;
		},
		get fallback() {
			return [
				createComponent(Show, {
					get when() {
						return items().showFirst;
					},
					get children() {
						return context.renderItem(1);
					}
				}),
				createComponent(Show, {
					get when() {
						return items().showFirstEllipsis;
					},
					get children() {
						return context.renderEllipsis();
					}
				}),
				createComponent(For, {
					get each() {
						return [...Array(items().previousSiblingCount).keys()].reverse();
					},
					children: (offset) => memo(() => context.renderItem(context.page() - (offset + 1)))
				}),
				memo(() => context.renderItem(context.page())),
				createComponent(For, {
					get each() {
						return [...Array(items().nextSiblingCount).keys()];
					},
					children: (offset) => memo(() => context.renderItem(context.page() + (offset + 1)))
				}),
				createComponent(Show, {
					get when() {
						return items().showLastEllipsis;
					},
					get children() {
						return context.renderEllipsis();
					}
				}),
				createComponent(Show, {
					get when() {
						return items().showLast;
					},
					get children() {
						return context.renderItem(context.count());
					}
				})
			];
		},
		get children() {
			return createComponent(For, {
				get each() {
					return [...Array(context.count()).keys()];
				},
				children: (page) => memo(() => context.renderItem(page + 1))
			});
		}
	});
}
//#endregion
//#region src/pagination/pagination-next.tsx
var _tmpl$$2 = /*#__PURE__*/ template(`<li>`);
function PaginationNext(props) {
	const context = usePaginationContext();
	const others = omit(props, "onClick");
	const onClick = () => {
		context.setPage(context.page() + 1);
	};
	const isDisabled = () => context.page() === context.count();
	var _el$ = _tmpl$$2();
	insert(_el$, createComponent(ButtonRoot, mergeProps({
		get tabindex() {
			return isDisabled() || context.page() === context.count() ? -1 : void 0;
		},
		get disabled() {
			return isDisabled();
		},
		get ["aria-disabled"]() {
			return isDisabled() ? "true" : void 0;
		},
		get ["data-disabled"]() {
			return isDisabled() ? "" : void 0;
		},
		get onClick() {
			return composeEventHandlers([props.onClick, onClick]);
		}
	}, others)));
	return _el$;
}
//#endregion
//#region src/pagination/pagination-previous.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<li>`);
function PaginationPrevious(props) {
	const context = usePaginationContext();
	const others = omit(props, "onClick");
	const onClick = () => {
		context.setPage(context.page() - 1);
	};
	const isDisabled = () => context.page() === 1;
	var _el$ = _tmpl$$1();
	insert(_el$, createComponent(ButtonRoot, mergeProps({
		get tabindex() {
			return isDisabled() || context.page() === 1 ? -1 : void 0;
		},
		get disabled() {
			return isDisabled();
		},
		get ["aria-disabled"]() {
			return isDisabled() ? "true" : void 0;
		},
		get ["data-disabled"]() {
			return isDisabled() ? "" : void 0;
		},
		get onClick() {
			return composeEventHandlers([props.onClick, onClick]);
		}
	}, others)));
	return _el$;
}
//#endregion
//#region src/pagination/pagination-root.tsx
var _tmpl$ = /*#__PURE__*/ template(`<ul>`);
/**
* A list of page number that allows users to change the current page.
*/
function PaginationRoot(props) {
	const defaultId = `pagination-${createUniqueId()}`;
	const mergedProps = merge({ id: defaultId }, props);
	const others = omit(mergedProps, "page", "defaultPage", "onPageChange", "count", "siblingCount", "showFirst", "showLast", "fixedItems", "itemComponent", "ellipsisComponent", "disabled", "children");
	const state = (0, primitives_exports.createControllableSignal)({
		defaultValue: () => mergedProps.defaultPage ?? 1,
		onChange: mergedProps.onPageChange,
		value: () => mergedProps.page
	});
	const context = {
		count: () => mergedProps.count,
		siblingCount: () => mergedProps.siblingCount ?? 1,
		showFirst: () => mergedProps.showFirst ?? true,
		showLast: () => mergedProps.showLast ?? true,
		fixedItems: () => mergedProps.fixedItems ?? false,
		isDisabled: () => mergedProps.disabled ?? false,
		renderItem: (page) => mergedProps.itemComponent({ page }),
		renderEllipsis: mergedProps.ellipsisComponent,
		page: () => Math.min(state[0]() ?? 1, mergedProps.count),
		setPage: state[1]
	};
	return createComponent(PaginationContext, {
		value: context,
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "nav",
				get ["data-disabled"]() {
					return mergedProps.disabled ? "" : void 0;
				}
			}, others, { get children() {
				var _el$ = _tmpl$();
				insert(_el$, () => mergedProps.children);
				return _el$;
			} }));
		}
	});
}
//#endregion
//#region src/pagination/index.tsx
var pagination_exports = /* @__PURE__ */ __exportAll({
	Ellipsis: () => PaginationEllipsis,
	Item: () => PaginationItem,
	Items: () => PaginationItems,
	Next: () => PaginationNext,
	Pagination: () => Pagination,
	Previous: () => PaginationPrevious,
	Root: () => PaginationRoot,
	usePaginationContext: () => usePaginationContext
});
const Pagination = Object.assign(PaginationRoot, {
	Ellipsis: PaginationEllipsis,
	Item: PaginationItem,
	Items: PaginationItems,
	Next: PaginationNext,
	Previous: PaginationPrevious
});
//#endregion
export { PaginationNext as a, usePaginationContext as c, PaginationPrevious as i, PaginationEllipsis as l, pagination_exports as n, PaginationItems as o, PaginationRoot as r, PaginationItem as s, Pagination as t };
