import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { r as LinkRoot } from "../link/Cd78tWQ9.js";
import { createComponent, mergeProps } from "@solidjs/web";
import { createContext, merge, omit, useContext } from "solid-js";
//#region src/breadcrumbs/breadcrumbs-link.tsx
/**
* The breadcrumbs link.
*/
function BreadcrumbsLink(props) {
	const others = omit(props, "current", "disabled", "aria-current");
	const ariaCurrent = () => {
		if (!props.current) return;
		return props["aria-current"] || "page";
	};
	return createComponent(LinkRoot, mergeProps({
		get disabled() {
			return props.disabled || props.current;
		},
		get ["aria-current"]() {
			return ariaCurrent();
		},
		get ["data-current"]() {
			return props.current ? "" : void 0;
		}
	}, others));
}
//#endregion
//#region src/breadcrumbs/breadcrumbs.intl.ts
const BREADCRUMBS_INTL_TRANSLATIONS = { breadcrumbs: "Breadcrumbs" };
//#endregion
//#region src/breadcrumbs/breadcrumbs-context.tsx
const BreadcrumbsContext = createContext();
function useBreadcrumbsContext() {
	const context = useContext(BreadcrumbsContext);
	if (context === void 0) throw new Error("[kobalte]: `useBreadcrumbsContext` must be used within a `Breadcrumbs.Root` component");
	return context;
}
//#endregion
//#region src/breadcrumbs/breadcrumbs-root.tsx
/**
* Breadcrumbs show hierarchy and navigational context for a user’s location within an application.
*/
function BreadcrumbsRoot(props) {
	const mergedProps = merge({
		separator: "/",
		translations: BREADCRUMBS_INTL_TRANSLATIONS
	}, props);
	const others = omit(mergedProps, "separator", "translations");
	return createComponent(BreadcrumbsContext, {
		value: { separator: () => mergedProps.separator },
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "nav",
				get ["aria-label"]() {
					return mergedProps.translations.breadcrumbs;
				}
			}, others));
		}
	});
}
//#endregion
//#region src/breadcrumbs/breadcrumbs-separator.tsx
/**
* The visual separator between each breadcrumb items.
* It will not be visible by screen readers.
*/
function BreadcrumbsSeparator(props) {
	const context = useBreadcrumbsContext();
	return createComponent(Polymorphic, mergeProps({
		as: "span",
		"aria-hidden": "true"
	}, props, { get children() {
		return props.children ?? context.separator();
	} }));
}
//#endregion
//#region src/breadcrumbs/index.tsx
var breadcrumbs_exports = /* @__PURE__ */ __exportAll({
	Breadcrumbs: () => Breadcrumbs,
	Link: () => BreadcrumbsLink,
	Root: () => BreadcrumbsRoot,
	Separator: () => BreadcrumbsSeparator,
	useBreadcrumbsContext: () => useBreadcrumbsContext
});
const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
	Link: BreadcrumbsLink,
	Separator: BreadcrumbsSeparator
});
//#endregion
export { useBreadcrumbsContext as a, BreadcrumbsRoot as i, breadcrumbs_exports as n, BreadcrumbsLink as o, BreadcrumbsSeparator as r, Breadcrumbs as t };
