import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.jsx";
import { Polymorphic } from "../polymorphic/index.jsx";
import { t as primitives_exports } from "../primitives/BlSoAAAV.jsx";
import { n as button_exports } from "../button/Cw4fT4wG.jsx";
import { For, Show, createContext, createMemo, createUniqueId, merge, omit, useContext } from "solid-js";
import { composeEventHandlers } from "@kobalte/utils";
//#region src/pagination/pagination-ellipsis.tsx
function PaginationEllipsis(props) {
	return <li>
			<Polymorphic as="div" {...props} />
		</li>;
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
function PaginationItem(props) {
	const context = usePaginationContext();
	const others = omit(props, "page", "onClick");
	const isCurrent = () => {
		return context.page() === props.page;
	};
	const onClick = () => {
		context.setPage(props.page);
	};
	return <li>
			<button_exports.Root aria-current={isCurrent() ? "page" : void 0} data-current={isCurrent() ? "" : void 0} onClick={composeEventHandlers([props.onClick, onClick])} {...others} />
		</li>;
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
	return <Show when={items().renderItemsDirectly} fallback={<>
					<Show when={items().showFirst}>{context.renderItem(1)}</Show>

					<Show when={items().showFirstEllipsis}>
						{context.renderEllipsis()}
					</Show>

					<For each={[...Array(items().previousSiblingCount).keys()].reverse()}>
						{(offset) => <>{context.renderItem(context.page() - (offset + 1))}</>}
					</For>

					{context.renderItem(context.page())}

					<For each={[...Array(items().nextSiblingCount).keys()]}>
						{(offset) => <>{context.renderItem(context.page() + (offset + 1))}</>}
					</For>

					<Show when={items().showLastEllipsis}>
						{context.renderEllipsis()}
					</Show>

					<Show when={items().showLast}>
						{context.renderItem(context.count())}
					</Show>
				</>}>
			<For each={[...Array(context.count()).keys()]}>
				{(page) => <>{context.renderItem(page + 1)}</>}
			</For>
		</Show>;
}
//#endregion
//#region src/pagination/pagination-next.tsx
function PaginationNext(props) {
	const context = usePaginationContext();
	const others = omit(props, "onClick");
	const onClick = () => {
		context.setPage(context.page() + 1);
	};
	const isDisabled = () => context.page() === context.count();
	return <li>
			<button_exports.Root tabindex={isDisabled() || context.page() === context.count() ? -1 : void 0} disabled={isDisabled()} aria-disabled={isDisabled() ? "true" : void 0} data-disabled={isDisabled() ? "" : void 0} onClick={composeEventHandlers([props.onClick, onClick])} {...others} />
		</li>;
}
//#endregion
//#region src/pagination/pagination-previous.tsx
function PaginationPrevious(props) {
	const context = usePaginationContext();
	const others = omit(props, "onClick");
	const onClick = () => {
		context.setPage(context.page() - 1);
	};
	const isDisabled = () => context.page() === 1;
	return <li>
			<button_exports.Root tabindex={isDisabled() || context.page() === 1 ? -1 : void 0} disabled={isDisabled()} aria-disabled={isDisabled() ? "true" : void 0} data-disabled={isDisabled() ? "" : void 0} onClick={composeEventHandlers([props.onClick, onClick])} {...others} />
		</li>;
}
//#endregion
//#region src/pagination/pagination-root.tsx
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
	return <PaginationContext value={context}>
			<Polymorphic as="nav" data-disabled={mergedProps.disabled ? "" : void 0} {...others}>
				<ul>{mergedProps.children}</ul>
			</Polymorphic>
		</PaginationContext>;
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
