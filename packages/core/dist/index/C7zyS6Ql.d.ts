import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { i as SingleSelectListState } from "./CaxKjm1F.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref, Setter } from "solid-js";
import { Orientation } from "@kobalte/utils";
//#region src/tabs/tabs-content.d.ts
interface TabsContentOptions {
  /** The unique key that associates the tab panel with a tab. */
  value: string;
  /**
   * Used to force mounting when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
}
interface TabsContentCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
}
interface TabsContentRenderProps extends TabsContentCommonProps {
  role: "tabpanel";
  tabindex: number | undefined;
  "aria-labelledby": string | undefined;
  "data-orientation": Orientation;
  "data-selected": string | undefined;
}
type TabsContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = TabsContentOptions & Partial<TabsContentCommonProps<ElementOf<T>>>;
/**
 * Contains the content associated with a tab trigger.
 */
declare function TabsContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, TabsContentProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/tabs/tabs-indicator.d.ts
interface TabsIndicatorOptions {}
interface TabsIndicatorCommonProps<_T extends HTMLElement = HTMLElement> {
  style?: JSX$1.CSSProperties | string;
}
interface TabsIndicatorRenderProps extends TabsIndicatorCommonProps {
  role: "presentation";
  "data-orientation": Orientation;
}
type TabsIndicatorProps<T extends ValidComponent | HTMLElement = HTMLElement> = TabsIndicatorOptions & Partial<TabsIndicatorCommonProps<ElementOf<T>>>;
/**
 * The visual indicator displayed at the bottom of the tab list to indicate the selected tab.
 * It provides the base style needed to display a smooth transition to the new selected tab.
 */
declare function TabsIndicator<T extends ValidComponent = "div">(props: PolymorphicProps<T, TabsIndicatorProps<T>>): JSX$1.Element;
//#endregion
//#region src/tabs/tabs-list.d.ts
interface TabsListOptions {}
interface TabsListCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onMouseDown: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocusIn: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onFocusOut: JSX$1.EventHandlerUnion<T, FocusEvent>;
}
interface TabsListRenderProps extends TabsListCommonProps {
  role: "tablist";
  "aria-orientation": Orientation;
  "data-orientation": Orientation;
}
type TabsListProps<T extends ValidComponent | HTMLElement = HTMLElement> = TabsListOptions & Partial<TabsListCommonProps<ElementOf<T>>>;
/**
 * Contains the tabs that are aligned along the edge of the active tab panel.
 */
declare function TabsList<T extends ValidComponent = "div">(props: PolymorphicProps<T, TabsListProps<T>>): JSX$1.Element;
//#endregion
//#region src/tabs/types.d.ts
type TabsActivationMode = "automatic" | "manual";
//#endregion
//#region src/tabs/tabs-root.d.ts
interface TabsRootOptions {
  /** The controlled value of the tab to activate. */
  value?: string;
  /**
   * The value of the tab that should be active when initially rendered.
   * Useful when you do not need to control the state.
   */
  defaultValue?: string;
  /** Event handler called when the value changes. */
  onChange?: (value: string) => void;
  /** The orientation of the tabs. */
  orientation?: Orientation;
  /** Whether tabs are activated automatically on focus or manually. */
  activationMode?: TabsActivationMode;
  /** Whether the tabs are disabled. */
  disabled?: boolean;
}
interface TabsRootCommonProps<_T extends HTMLElement = HTMLElement> {
  id?: string;
}
interface TabsRootRenderProps extends TabsRootCommonProps {
  "data-orientation": Orientation;
}
type TabsRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = TabsRootOptions & Partial<TabsRootCommonProps<ElementOf<T>>>;
/**
 * A set of layered sections of content, known as tab panels, that display one panel of content at a time.
 * `Tabs` contains all the parts of a tabs component and provide context for its children.
 */
declare function TabsRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, TabsRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/tabs/tabs-trigger.d.ts
interface TabsTriggerOptions {
  /** The unique key that associates the tab with a tab panel. */
  value: string;
  /** Whether the tab should be disabled. */
  disabled?: boolean;
}
interface TabsTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  type: "button";
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerUp: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onMouseDown: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
}
interface TabsTriggerRenderProps extends TabsTriggerCommonProps {
  role: "tab";
  tabindex: number | undefined;
  disabled: boolean;
  "aria-selected": "true" | "false";
  "aria-disabled": "true" | undefined;
  "aria-controls": string | undefined;
  "data-key": string | undefined;
  "data-orientation": Orientation;
  "data-selected": string | undefined;
  "data-highlighted": string | undefined;
  "data-disabled": string | undefined;
}
type TabsTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = TabsTriggerOptions & Partial<TabsTriggerCommonProps<ElementOf<T>>>;
/**
 * The button that activates its associated tab panel.
 */
declare function TabsTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, TabsTriggerProps<T>>): JSX$1.Element;
//#endregion
//#region src/tabs/tabs-context.d.ts
interface TabsContextValue {
  isDisabled: Accessor<boolean>;
  orientation: Accessor<Orientation>;
  activationMode: Accessor<TabsActivationMode>;
  triggerIdsMap: Accessor<Map<string, string>>;
  contentIdsMap: Accessor<Map<string, string>>;
  listState: Accessor<SingleSelectListState>;
  selectedTab: Accessor<HTMLElement | undefined>;
  setSelectedTab: Setter<HTMLElement | undefined>;
  generateTriggerId: (value: string) => string;
  generateContentId: (value: string) => string;
}
declare function useTabsContext(): TabsContextValue;
declare namespace index_d_exports {
  export { TabsContent as Content, TabsIndicator as Indicator, TabsList as List, TabsRoot as Root, Tabs, TabsContentCommonProps, TabsContentOptions, TabsContentProps, TabsContentRenderProps, TabsContextValue, TabsIndicatorCommonProps, TabsIndicatorOptions, TabsIndicatorProps, TabsIndicatorRenderProps, TabsListCommonProps, TabsListOptions, TabsListProps, TabsListRenderProps, TabsRootCommonProps, TabsRootOptions, TabsRootProps, TabsRootRenderProps, TabsTriggerCommonProps, TabsTriggerOptions, TabsTriggerProps, TabsTriggerRenderProps, TabsTrigger as Trigger, useTabsContext };
}
declare const Tabs: typeof TabsRoot & {
  Content: typeof TabsContent;
  Indicator: typeof TabsIndicator;
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
};
//#endregion
export { TabsIndicatorProps as C, TabsContentOptions as D, TabsContentCommonProps as E, TabsContentProps as O, TabsIndicatorOptions as S, TabsContent as T, TabsListOptions as _, TabsTrigger as a, TabsIndicator as b, TabsTriggerProps as c, TabsRootCommonProps as d, TabsRootOptions as f, TabsListCommonProps as g, TabsList as h, useTabsContext as i, TabsContentRenderProps as k, TabsTriggerRenderProps as l, TabsRootRenderProps as m, index_d_exports as n, TabsTriggerCommonProps as o, TabsRootProps as p, TabsContextValue as r, TabsTriggerOptions as s, Tabs as t, TabsRoot as u, TabsListProps as v, TabsIndicatorRenderProps as w, TabsIndicatorCommonProps as x, TabsListRenderProps as y };