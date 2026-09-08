import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as createRegisterId } from "../create-register-id/BLTiiqMx.js";
import { createComponent, mergeProps } from "@solidjs/web";
import { createContext, createEffect, createSignal, createUniqueId, merge, omit, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
//#region src/card/card-content.tsx
/**
* Contains the main content of a card.
*/
function CardContent(props) {
	return createComponent(Polymorphic, mergeProps({ as: "div" }, props));
}
//#endregion
//#region src/card/card-context.tsx
const CardContext = createContext();
function useCardContext() {
	const context = useContext(CardContext);
	if (context === void 0) throw new Error("[kobalte]: `useCardContext` must be used within a `Card` component");
	return context;
}
//#endregion
//#region src/card/card-description.tsx
/**
* An optional accessible description for the card, wired to `Card.Root`
* via `aria-describedby`.
*/
function CardDescription(props) {
	const context = useCardContext();
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
//#region src/card/card-footer.tsx
/**
* Contains the footer content of a card (e.g. actions).
*/
function CardFooter(props) {
	return createComponent(Polymorphic, mergeProps({ as: "div" }, props));
}
//#endregion
//#region src/card/card-header.tsx
/**
* Groups a card's title, description and header action.
* Ships no layout — arrange `Card.Title`/`Card.Description` alongside
* `Card.HeaderAction` with your own CSS (e.g. a two-column grid).
*/
function CardHeader(props) {
	return createComponent(Polymorphic, mergeProps({ as: "div" }, props));
}
//#endregion
//#region src/card/card-header-action.tsx
/**
* A structural slot for a trailing header action (e.g. an icon button or
* menu trigger), so it can be grid/flex-positioned against `Card.Title`/
* `Card.Description` without an extra wrapper `div`. Ships no layout —
* this is a positioning hook for your own CSS, not a styled component.
*/
function CardHeaderAction(props) {
	return createComponent(Polymorphic, mergeProps({ as: "div" }, props));
}
//#endregion
//#region src/card/card-root.tsx
/**
* A card groups related content and actions in a single container.
*
* Unlike `Dialog`, a card is not a landmark region by default — a
* dashboard with many cards forcing `role="region"` on each would clutter
* screen reader landmark navigation. Pass `role="region"` explicitly to
* opt in when a card is a meaningful landmark on the page.
*/
function CardRoot(props) {
	const defaultId = `card-${createUniqueId()}`;
	const mergedProps = merge({ id: defaultId }, props);
	const [titleId, setTitleId] = createSignal(void 0, { ownedWrite: true });
	const [descriptionId, setDescriptionId] = createSignal(void 0, { ownedWrite: true });
	const others = omit(mergedProps, "id");
	const context = {
		generateId: (suffix) => `${access(mergedProps.id)}-${suffix}`,
		registerTitleId: createRegisterId(setTitleId),
		registerDescriptionId: createRegisterId(setDescriptionId)
	};
	return createComponent(CardContext, {
		value: context,
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "div",
				get id() {
					return mergedProps.id;
				},
				get ["aria-labelledby"]() {
					return titleId();
				},
				get ["aria-describedby"]() {
					return descriptionId();
				}
			}, others));
		}
	});
}
//#endregion
//#region src/card/card-title.tsx
/**
* An accessible title for the card, wired to `Card.Root` via `aria-labelledby`.
*/
function CardTitle(props) {
	const context = useCardContext();
	const mergedProps = merge({ id: context.generateId("title") }, props);
	const others = omit(mergedProps, "id");
	createEffect(() => mergedProps.id, (id) => context.registerTitleId(id));
	return createComponent(Polymorphic, mergeProps({
		as: "h3",
		get id() {
			return mergedProps.id;
		}
	}, others));
}
//#endregion
//#region src/card/index.tsx
var card_exports = /* @__PURE__ */ __exportAll({
	Card: () => Card,
	Content: () => CardContent,
	Description: () => CardDescription,
	Footer: () => CardFooter,
	Header: () => CardHeader,
	HeaderAction: () => CardHeaderAction,
	Root: () => CardRoot,
	Title: () => CardTitle,
	useCardContext: () => useCardContext
});
const Card = Object.assign(CardRoot, {
	Content: CardContent,
	Description: CardDescription,
	Footer: CardFooter,
	Header: CardHeader,
	HeaderAction: CardHeaderAction,
	Title: CardTitle
});
//#endregion
export { CardHeaderAction as a, CardDescription as c, CardRoot as i, useCardContext as l, card_exports as n, CardHeader as o, CardTitle as r, CardFooter as s, Card as t, CardContent as u };
