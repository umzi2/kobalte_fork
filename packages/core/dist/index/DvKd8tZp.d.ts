import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { ValidComponent } from "@solidjs/web";
//#region src/card/card-content.d.ts
interface CardContentOptions {}
interface CardContentCommonProps<_T extends HTMLElement = HTMLElement> {}
interface CardContentRenderProps extends CardContentCommonProps {}
type CardContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = CardContentOptions & Partial<CardContentCommonProps<ElementOf<T>>>;
/**
 * Contains the main content of a card.
 */
declare function CardContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, CardContentProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/card/card-description.d.ts
interface CardDescriptionOptions {}
interface CardDescriptionCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface CardDescriptionRenderProps extends CardDescriptionCommonProps {}
type CardDescriptionProps<T extends ValidComponent | HTMLElement = HTMLElement> = CardDescriptionOptions & Partial<CardDescriptionCommonProps<ElementOf<T>>>;
/**
 * An optional accessible description for the card, wired to `Card.Root`
 * via `aria-describedby`.
 */
declare function CardDescription<T extends ValidComponent = "p">(props: PolymorphicProps<T, CardDescriptionProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/card/card-footer.d.ts
interface CardFooterOptions {}
interface CardFooterCommonProps<_T extends HTMLElement = HTMLElement> {}
interface CardFooterRenderProps extends CardFooterCommonProps {}
type CardFooterProps<T extends ValidComponent | HTMLElement = HTMLElement> = CardFooterOptions & Partial<CardFooterCommonProps<ElementOf<T>>>;
/**
 * Contains the footer content of a card (e.g. actions).
 */
declare function CardFooter<T extends ValidComponent = "div">(props: PolymorphicProps<T, CardFooterProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/card/card-header.d.ts
interface CardHeaderOptions {}
interface CardHeaderCommonProps<_T extends HTMLElement = HTMLElement> {}
interface CardHeaderRenderProps extends CardHeaderCommonProps {}
type CardHeaderProps<T extends ValidComponent | HTMLElement = HTMLElement> = CardHeaderOptions & Partial<CardHeaderCommonProps<ElementOf<T>>>;
/**
 * Groups a card's title, description and header action.
 * Ships no layout — arrange `Card.Title`/`Card.Description` alongside
 * `Card.HeaderAction` with your own CSS (e.g. a two-column grid).
 */
declare function CardHeader<T extends ValidComponent = "div">(props: PolymorphicProps<T, CardHeaderProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/card/card-header-action.d.ts
interface CardHeaderActionOptions {}
interface CardHeaderActionCommonProps<_T extends HTMLElement = HTMLElement> {}
interface CardHeaderActionRenderProps extends CardHeaderActionCommonProps {}
type CardHeaderActionProps<T extends ValidComponent | HTMLElement = HTMLElement> = CardHeaderActionOptions & Partial<CardHeaderActionCommonProps<ElementOf<T>>>;
/**
 * A structural slot for a trailing header action (e.g. an icon button or
 * menu trigger), so it can be grid/flex-positioned against `Card.Title`/
 * `Card.Description` without an extra wrapper `div`. Ships no layout —
 * this is a positioning hook for your own CSS, not a styled component.
 */
declare function CardHeaderAction<T extends ValidComponent = "div">(props: PolymorphicProps<T, CardHeaderActionProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/card/card-root.d.ts
interface CardRootOptions {
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
}
interface CardRootCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface CardRootRenderProps extends CardRootCommonProps {
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
}
type CardRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = CardRootOptions & Partial<CardRootCommonProps<ElementOf<T>>>;
/**
 * A card groups related content and actions in a single container.
 *
 * Unlike `Dialog`, a card is not a landmark region by default — a
 * dashboard with many cards forcing `role="region"` on each would clutter
 * screen reader landmark navigation. Pass `role="region"` explicitly to
 * opt in when a card is a meaningful landmark on the page.
 */
declare function CardRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, CardRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/card/card-title.d.ts
interface CardTitleOptions {}
interface CardTitleCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface CardTitleRenderProps extends CardTitleCommonProps {}
type CardTitleProps<T extends ValidComponent | HTMLElement = HTMLElement> = CardTitleOptions & Partial<CardTitleCommonProps<ElementOf<T>>>;
/**
 * An accessible title for the card, wired to `Card.Root` via `aria-labelledby`.
 */
declare function CardTitle<T extends ValidComponent = "h3">(props: PolymorphicProps<T, CardTitleProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/card/card-context.d.ts
interface CardContextValue {
  generateId: (part: string) => string;
  registerTitleId: (id: string) => () => void;
  registerDescriptionId: (id: string) => () => void;
}
declare function useCardContext(): CardContextValue;
declare namespace index_d_exports {
  export { Card, CardContentCommonProps, CardContentOptions, CardContentProps, CardContentRenderProps, CardContextValue, CardDescriptionCommonProps, CardDescriptionOptions, CardDescriptionProps, CardDescriptionRenderProps, CardFooterCommonProps, CardFooterOptions, CardFooterProps, CardFooterRenderProps, CardHeaderActionCommonProps, CardHeaderActionOptions, CardHeaderActionProps, CardHeaderActionRenderProps, CardHeaderCommonProps, CardHeaderOptions, CardHeaderProps, CardHeaderRenderProps, CardRootCommonProps, CardRootOptions, CardRootProps, CardRootRenderProps, CardTitleCommonProps, CardTitleOptions, CardTitleProps, CardTitleRenderProps, CardContent as Content, CardDescription as Description, CardFooter as Footer, CardHeader as Header, CardHeaderAction as HeaderAction, CardRoot as Root, CardTitle as Title, useCardContext };
}
declare const Card: typeof CardRoot & {
  Content: typeof CardContent;
  Description: typeof CardDescription;
  Footer: typeof CardFooter;
  Header: typeof CardHeader;
  HeaderAction: typeof CardHeaderAction;
  Title: typeof CardTitle;
};
//#endregion
export { CardDescription as A, CardHeaderProps as C, CardFooterOptions as D, CardFooterCommonProps as E, CardContent as F, CardContentCommonProps as I, CardContentOptions as L, CardDescriptionOptions as M, CardDescriptionProps as N, CardFooterProps as O, CardDescriptionRenderProps as P, CardContentProps as R, CardHeaderOptions as S, CardFooter as T, CardHeaderActionOptions as _, CardTitle as a, CardHeader as b, CardTitleProps as c, CardRootCommonProps as d, CardRootOptions as f, CardHeaderActionCommonProps as g, CardHeaderAction as h, useCardContext as i, CardDescriptionCommonProps as j, CardFooterRenderProps as k, CardTitleRenderProps as l, CardRootRenderProps as m, index_d_exports as n, CardTitleCommonProps as o, CardRootProps as p, CardContextValue as r, CardTitleOptions as s, Card as t, CardRoot as u, CardHeaderActionProps as v, CardHeaderRenderProps as w, CardHeaderCommonProps as x, CardHeaderActionRenderProps as y, CardContentRenderProps as z };