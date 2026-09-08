import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { i as ButtonRootCommonProps, s as ButtonRootRenderProps } from "./Bjp2qtUK.js";
import { c as CollectionNode } from "./C4-dpjA0.js";
import "./Dy4FWz3y.js";
import { E as SelectionMode, T as SelectionBehavior, b as KeyboardDelegate, l as ListState, y as FocusStrategy } from "./CaxKjm1F.js";
import { n as DismissableLayerRenderProps, t as DismissableLayerCommonProps } from "./D_ZxK-J-.js";
import { a as FormControlLabelRenderProps, c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, n as FormControlLabelCommonProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, s as FormControlErrorMessageCommonProps, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "./ZPox5oFC.js";
import { A as ListboxItem, C as ListboxItemIndicatorProps, D as ListboxItemDescriptionOptions, E as ListboxItemDescriptionCommonProps, M as ListboxItemOptions, N as ListboxItemProps, O as ListboxItemDescriptionProps, P as ListboxItemRenderProps, S as ListboxItemIndicatorOptions, T as ListboxItemDescription, _ as ListboxItemLabelOptions, a as ListboxSection, b as ListboxItemIndicator, c as ListboxSectionProps, d as ListboxRootCommonProps, f as ListboxRootOptions, g as ListboxItemLabelCommonProps, h as ListboxItemLabel, j as ListboxItemCommonProps, k as ListboxItemDescriptionRenderProps, m as ListboxRootRenderProps, n as index_d_exports$1, v as ListboxItemLabelProps, w as ListboxItemIndicatorRenderProps, x as ListboxItemIndicatorCommonProps, y as ListboxItemLabelRenderProps } from "./BczgaXlZ.js";
import { d as PopperArrowCommonProps, f as PopperArrowOptions, m as PopperArrowRenderProps, p as PopperArrowProps, r as PopperRootOptions, u as PopperArrow } from "./DTS_JDht.js";
import { ComponentProps, JSX as JSX$1, Portal, ValidComponent } from "@solidjs/web";
import { Accessor, Component, Ref, Setter } from "solid-js";
import { ValidationState } from "@kobalte/utils";
import { FocusOutsideEvent, InteractOutsideEvent, PointerDownOutsideEvent } from "@solid-primitives/interaction";
//#region src/select/select-context.d.ts
interface SelectDataSet {
  "data-expanded": string | undefined;
  "data-closed": string | undefined;
}
interface SelectContextValue {
  dataset: Accessor<SelectDataSet>;
  isOpen: Accessor<boolean>;
  isDisabled: Accessor<boolean>;
  isMultiple: Accessor<boolean>;
  isVirtualized: Accessor<boolean>;
  isModal: Accessor<boolean>;
  preventScroll: Accessor<boolean>;
  disallowTypeAhead: Accessor<boolean>;
  shouldFocusWrap: Accessor<boolean>;
  selectedOptions: Accessor<any[]>;
  contentPresent: Accessor<boolean>;
  autoFocus: Accessor<FocusStrategy | boolean>;
  triggerRef: Accessor<HTMLElement | undefined>;
  triggerId: Accessor<string | undefined>;
  valueId: Accessor<string | undefined>;
  listboxId: Accessor<string | undefined>;
  listboxAriaLabelledBy: Accessor<string | undefined>;
  listState: Accessor<ListState>;
  keyboardDelegate: Accessor<KeyboardDelegate>;
  setListboxAriaLabelledBy: Setter<string | undefined>;
  setTriggerRef: (el: HTMLElement) => void;
  setContentRef: (el: HTMLElement) => void;
  setListboxRef: (el: HTMLElement) => void;
  open: (focusStrategy: FocusStrategy | boolean) => void;
  close: () => void;
  toggle: (focusStrategy: FocusStrategy | boolean) => void;
  placeholder: Accessor<JSX$1.Element>;
  renderItem: (item: CollectionNode) => JSX$1.Element;
  renderSection: (section: CollectionNode) => JSX$1.Element;
  removeOptionFromSelection: (option: any) => void;
  generateId: (part: string) => string;
  registerTriggerId: (id: string) => () => void;
  registerValueId: (id: string) => () => void;
  registerListboxId: (id: string) => () => void;
}
declare function useSelectContext(): SelectContextValue;
//#endregion
//#region src/select/select-base.d.ts
interface SelectBaseItemComponentProps<T> {
  /** The item to render. */
  item: CollectionNode<T>;
}
interface SelectBaseSectionComponentProps<T> {
  /** The section to render. */
  section: CollectionNode<T>;
}
interface SelectBaseOptions<Option, OptGroup = never> extends Omit<PopperRootOptions, "anchorRef" | "contentRef" | "onCurrentPlacementChange"> {
  /** The controlled open state of the select. */
  open?: boolean;
  /**
   * The default open state when initially rendered.
   * Useful when you do not need to control the open state.
   */
  defaultOpen?: boolean;
  /** Event handler called when the open state of the select changes. */
  onOpenChange?: (isOpen: boolean) => void;
  /** The controlled value of the select. */
  value?: Option[];
  /**
   * The value of the select when initially rendered.
   * Useful when you do not need to control the value.
   */
  defaultValue?: Option[];
  /** Event handler called when the value changes. */
  onChange?: (value: Option[]) => void;
  /** The content that will be rendered when no value or defaultValue is set. */
  placeholder?: JSX$1.Element;
  /** An array of options to display as the available options. */
  options: Array<Option | OptGroup>;
  /**
   * Property name or getter function to use as the value of an option.
   * This is the value that will be submitted when the select is part of a `<form>`.
   */
  optionValue?: keyof Exclude<Option, null> | ((option: Exclude<Option, null>) => string | number);
  /** Property name or getter function to use as the text value of an option for typeahead purpose. */
  optionTextValue?: keyof Exclude<Option, null> | ((option: Exclude<Option, null>) => string);
  /** Property name or getter function to use as the disabled flag of an option. */
  optionDisabled?: keyof Exclude<Option, null> | ((option: Exclude<Option, null>) => boolean);
  /** Property name that refers to the children options of an option group. */
  optionGroupChildren?: keyof Exclude<OptGroup, null>;
  /** An optional keyboard delegate implementation for type to select, to override the default. */
  keyboardDelegate?: KeyboardDelegate;
  /** Whether focus should wrap around when the end/start is reached. */
  shouldFocusWrap?: boolean;
  /** The type of selection that is allowed in the select. */
  selectionMode?: Exclude<SelectionMode, "none">;
  /** How multiple selection should behave in the select. */
  selectionBehavior?: SelectionBehavior;
  /** Whether onValueChange should fire even if the new set of keys is the same as the last. */
  allowDuplicateSelectionEvents?: boolean;
  /** Whether the select allows empty selection. */
  disallowEmptySelection?: boolean;
  /** Whether the select closes after selection. */
  closeOnSelection?: boolean;
  /** Whether typeahead is disabled. */
  disallowTypeAhead?: boolean;
  /** Whether the select uses virtual scrolling. */
  virtualized?: boolean;
  /** When NOT virtualized, the component to render as an item in the `Select.Listbox`. */
  itemComponent?: Component<SelectBaseItemComponentProps<Option>>;
  /** When NOT virtualized, the component to render as a section in the `Select.Listbox`. */
  sectionComponent?: Component<SelectBaseSectionComponentProps<OptGroup>>;
  /**
   * Whether the select should be the only visible content for screen readers.
   * When set to `true`:
   * - interaction with outside elements will be disabled.
   * - scroll will be locked.
   * - focus will be locked inside the select content.
   * - elements outside the select content will not be visible for screen readers.
   */
  modal?: boolean;
  /** Whether the scroll should be locked even if the select is not modal. */
  preventScroll?: boolean;
  /**
   * Used to force mounting the select (portal, positioner and content) when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
  /**
   * The name of the select.
   * Submitted with its owning form as part of a name/value pair.
   */
  name?: string;
  /** Whether the select should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the user must select an item before the owning form can be submitted. */
  required?: boolean;
  /** Whether the select is disabled. */
  disabled?: boolean;
  /** Whether the select is read only. */
  readOnly?: boolean;
}
interface SelectBaseCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface SelectBaseRenderProps extends SelectBaseCommonProps, SelectDataSet, FormControlDataSet {
  role: "group";
}
//#endregion
//#region src/select/select-content.d.ts
interface SelectContentOptions {
  /**
   * Event handler called when focus moves to the trigger after closing.
   * It can be prevented by calling `event.preventDefault`.
   */
  onCloseAutoFocus?: (event: Event) => void;
  /**
   * Event handler called when a pointer event occurs outside the bounds of the component.
   * It can be prevented by calling `event.preventDefault`.
   */
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  /**
   * Event handler called when the focus moves outside the bounds of the component.
   * It can be prevented by calling `event.preventDefault`.
   */
  onFocusOutside?: (event: FocusOutsideEvent) => void;
  /**
   * Event handler called when an interaction (pointer or focus event) happens outside the bounds of the component.
   * It can be prevented by calling `event.preventDefault`.
   */
  onInteractOutside?: (event: InteractOutsideEvent) => void;
}
interface SelectContentCommonProps<T extends HTMLElement = HTMLElement> extends DismissableLayerCommonProps<T> {
  style?: JSX$1.CSSProperties | string;
}
interface SelectContentRenderProps extends SelectContentCommonProps, SelectDataSet, DismissableLayerRenderProps {}
type SelectContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = SelectContentOptions & Partial<SelectContentCommonProps<ElementOf<T>>>;
/**
 * The component that pops out when the select is open.
 */
declare function SelectContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, SelectContentProps<T>>): JSX$1.Element;
//#endregion
//#region src/select/select-hidden-select.d.ts
type SelectHiddenSelectProps = ComponentProps<"select">;
declare function SelectHiddenSelect(props: SelectHiddenSelectProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/select/select-icon.d.ts
interface SelectIconOptions {}
interface SelectIconCommonProps<_T extends HTMLElement = HTMLElement> {
  children: JSX$1.Element;
}
interface SelectIconRenderProps extends SelectIconCommonProps, SelectDataSet {
  "aria-hidden": "true";
}
type SelectIconProps<T extends ValidComponent | HTMLElement = HTMLElement> = SelectIconOptions & Partial<SelectIconCommonProps<ElementOf<T>>>;
/**
 * A small icon often displayed next to the value as a visual affordance for the fact it can be open.
 * It renders a `▼` by default, but you can use your own icon `children`.
 */
declare function SelectIcon<T extends ValidComponent = "span">(props: PolymorphicProps<T, SelectIconProps<T>>): JSX$1.Element;
//#endregion
//#region src/select/select-label.d.ts
interface SelectLabelOptions {}
interface SelectLabelCommonProps<T extends HTMLElement = HTMLElement> extends FormControlLabelCommonProps<T> {
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
}
interface SelectLabelRenderProps extends SelectLabelCommonProps, FormControlLabelRenderProps {}
type SelectLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = SelectLabelOptions & Partial<SelectLabelCommonProps<ElementOf<T>>>;
/**
 * The label that gives the user information on the select.
 */
declare function SelectLabel<T extends ValidComponent = "span">(props: PolymorphicProps<T, SelectLabelProps<T>>): JSX$1.Element;
//#endregion
//#region src/select/select-listbox.d.ts
interface SelectListboxOptions<Option, OptGroup = never> extends Pick<ListboxRootOptions<Option, OptGroup>, "scrollRef" | "scrollToItem" | "children"> {}
interface SelectListboxCommonProps<T extends HTMLElement = HTMLElement> extends ListboxRootCommonProps<T> {
  "aria-labelledby": string | undefined;
}
interface SelectListboxRenderProps extends SelectListboxCommonProps, ListboxRootRenderProps {}
type SelectListboxProps<Option, OptGroup = never, T extends ValidComponent | HTMLElement = HTMLElement> = SelectListboxOptions<Option, OptGroup> & Partial<SelectListboxCommonProps<ElementOf<T>>>;
/**
 * Contains all the items of a `Select`.
 */
declare function SelectListbox<Option = any, OptGroup = never, T extends ValidComponent = "ul">(props: PolymorphicProps<T, SelectListboxProps<Option, OptGroup, T>>): JSX$1.Element;
//#endregion
//#region src/select/select-portal.d.ts
interface SelectPortalProps extends ComponentProps<typeof Portal> {}
/**
 * Portals its children into the `body` when the select is open.
 */
declare function SelectPortal(props: SelectPortalProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/select/select-root.d.ts
interface SelectSingleSelectionOptions<T> {
  /** The controlled value of the select. */
  value?: T | null;
  /**
   * The value of the select when initially rendered.
   * Useful when you do not need to control the value.
   */
  defaultValue?: T;
  /** Event handler called when the value changes. */
  onChange?: (value: T | null) => void;
  /** Whether the select allow multiple selection. */
  multiple?: false;
}
interface SelectMultipleSelectionOptions<T> {
  /** The controlled value of the select. */
  value?: T[];
  /**
   * The value of the select when initially rendered.
   * Useful when you do not need to control the value.
   */
  defaultValue?: T[];
  /** Event handler called when the value changes. */
  onChange?: (value: T[]) => void;
  /** Whether the select allow multiple selection. */
  multiple: true;
}
type SelectRootOptions<Option, OptGroup = never> = (SelectSingleSelectionOptions<Option> | SelectMultipleSelectionOptions<Option>) & Omit<SelectBaseOptions<Option, OptGroup>, "value" | "defaultValue" | "onChange" | "selectionMode">;
interface SelectRootCommonProps<T extends HTMLElement = HTMLElement> extends SelectBaseCommonProps<T> {}
interface SelectRootRenderProps extends SelectRootCommonProps, SelectBaseRenderProps {}
type SelectRootProps<Option, OptGroup = never, T extends ValidComponent | HTMLElement = HTMLElement> = SelectRootOptions<Option, OptGroup> & Partial<SelectRootCommonProps<ElementOf<T>>>;
/**
 * Displays a list of options for the user to pick from — triggered by a button.
 */
declare function SelectRoot<Option, OptGroup = never, T extends ValidComponent = "div">(props: PolymorphicProps<T, SelectRootProps<Option, OptGroup, T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/select/select-trigger.d.ts
interface SelectTriggerOptions {}
interface SelectTriggerCommonProps<T extends HTMLElement = HTMLElement> extends ButtonRootCommonProps<T> {
  id: string;
  ref: Ref<T>;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onBlur: JSX$1.EventHandlerUnion<T, FocusEvent>;
  "aria-label": string | undefined;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
}
interface SelectTriggerRenderProps extends SelectTriggerCommonProps, SelectDataSet, FormControlDataSet, ButtonRootRenderProps {
  "aria-haspopup": "listbox";
  "aria-expanded": "true" | "false";
  "aria-controls": string | undefined;
}
type SelectTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = SelectTriggerOptions & Partial<SelectTriggerCommonProps<ElementOf<T>>>;
declare function SelectTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, SelectTriggerProps<T>>): JSX$1.Element;
//#endregion
//#region src/select/select-value.d.ts
interface SelectValueState<Option> {
  /** The first (or only, in case of single select) selected option. */
  selectedOption: Accessor<Option>;
  /** An array of selected options. It will contain only one value in case of single select. */
  selectedOptions: Accessor<Option[]>;
  /** A function to remove an option from the selection. */
  remove: (option: Option) => void;
  /** A function to clear the selection. */
  clear: () => void;
}
interface SelectValueOptions<Option> {
  /**
   * The children of the select value.
   * Can be a `JSX.Element` or a _render prop_ for having access to the internal state.
   */
  children?: JSX$1.Element | ((state: SelectValueState<Option>) => JSX$1.Element);
}
interface SelectValueCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface SelectValueRenderProps extends SelectValueCommonProps, FormControlDataSet {
  children: JSX$1.Element;
  "data-placeholder-shown": string | undefined;
}
type SelectValueProps<Option, T extends ValidComponent | HTMLElement = HTMLElement> = SelectValueOptions<Option> & Partial<SelectValueCommonProps<ElementOf<T>>>;
/**
 * The part that reflects the selected value(s).
 */
declare function SelectValue<Option, T extends ValidComponent = "span">(props: PolymorphicProps<T, SelectValueProps<Option, T>>): JSX$1.Element;
declare namespace index_d_exports {
  export { PopperArrow as Arrow, SelectContent as Content, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, SelectHiddenSelect as HiddenSelect, SelectIcon as Icon, ListboxItem as Item, ListboxItemDescription as ItemDescription, ListboxItemIndicator as ItemIndicator, ListboxItemLabel as ItemLabel, SelectLabel as Label, SelectListbox as Listbox, SelectPortal as Portal, SelectRoot as Root, ListboxSection as Section, Select, PopperArrowCommonProps as SelectArrowCommonProps, PopperArrowOptions as SelectArrowOptions, PopperArrowProps as SelectArrowProps, PopperArrowRenderProps as SelectArrowRenderProps, SelectContentCommonProps, SelectContentOptions, SelectContentProps, SelectContentRenderProps, SelectContextValue, FormControlDescriptionCommonProps as SelectDescriptionCommonProps, FormControlDescriptionOptions as SelectDescriptionOptions, FormControlDescriptionProps as SelectDescriptionProps, FormControlDescriptionRenderProps as SelectDescriptionRenderProps, FormControlErrorMessageCommonProps as SelectErrorMessageCommonProps, FormControlErrorMessageOptions as SelectErrorMessageOptions, FormControlErrorMessageProps as SelectErrorMessageProps, FormControlErrorMessageRenderProps as SelectErrorMessageRenderProps, SelectHiddenSelectProps, SelectIconCommonProps, SelectIconOptions, SelectIconProps, SelectIconRenderProps, ListboxItemCommonProps as SelectItemCommonProps, ListboxItemDescriptionCommonProps as SelectItemDescriptionCommonProps, ListboxItemDescriptionOptions as SelectItemDescriptionOptions, ListboxItemDescriptionProps as SelectItemDescriptionProps, ListboxItemDescriptionRenderProps as SelectItemDescriptionRenderProps, ListboxItemIndicatorCommonProps as SelectItemIndicatorCommonProps, ListboxItemIndicatorOptions as SelectItemIndicatorOptions, ListboxItemIndicatorProps as SelectItemIndicatorProps, ListboxItemIndicatorRenderProps as SelectItemIndicatorRenderProps, ListboxItemLabelCommonProps as SelectItemLabelCommonProps, ListboxItemLabelOptions as SelectItemLabelOptions, ListboxItemLabelProps as SelectItemLabelProps, ListboxItemLabelRenderProps as SelectItemLabelRenderProps, ListboxItemOptions as SelectItemOptions, ListboxItemProps as SelectItemProps, ListboxItemRenderProps as SelectItemRenderProps, SelectLabelCommonProps, SelectLabelOptions, SelectLabelProps, SelectLabelRenderProps, SelectListboxCommonProps, SelectListboxOptions, SelectListboxProps, SelectListboxRenderProps, SelectMultipleSelectionOptions, SelectPortalProps, SelectRootCommonProps, SelectBaseItemComponentProps as SelectRootItemComponentProps, SelectRootOptions, SelectRootProps, SelectRootRenderProps, SelectBaseSectionComponentProps as SelectRootSectionComponentProps, ListboxSectionProps as SelectSectionProps, SelectSingleSelectionOptions, SelectTriggerCommonProps, SelectTriggerOptions, SelectTriggerProps, SelectTriggerRenderProps, SelectValueCommonProps, SelectValueOptions, SelectValueProps, SelectValueRenderProps, SelectTrigger as Trigger, SelectValue as Value, useSelectContext };
}
declare const Select: typeof SelectRoot & {
  Arrow: typeof PopperArrow;
  Content: typeof SelectContent;
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  HiddenSelect: typeof SelectHiddenSelect;
  Icon: typeof SelectIcon;
  Item: typeof ListboxItem;
  ItemDescription: typeof ListboxItemDescription;
  ItemIndicator: typeof ListboxItemIndicator;
  ItemLabel: typeof ListboxItemLabel;
  Label: typeof SelectLabel;
  Listbox: typeof SelectListbox;
  Portal: typeof SelectPortal;
  Section: typeof ListboxSection;
  Trigger: typeof SelectTrigger;
  Value: typeof SelectValue;
};
//#endregion
export { SelectLabelProps as A, SelectContentCommonProps as B, SelectListboxCommonProps as C, SelectLabel as D, SelectListboxRenderProps as E, SelectIconProps as F, SelectBaseSectionComponentProps as G, SelectContentProps as H, SelectIconRenderProps as I, SelectContextValue as K, SelectHiddenSelect as L, SelectIcon as M, SelectIconCommonProps as N, SelectLabelCommonProps as O, SelectIconOptions as P, SelectHiddenSelectProps as R, SelectListbox as S, SelectListboxProps as T, SelectContentRenderProps as U, SelectContentOptions as V, SelectBaseItemComponentProps as W, SelectRootProps as _, SelectValueOptions as a, SelectPortal as b, SelectTrigger as c, SelectTriggerProps as d, SelectTriggerRenderProps as f, SelectRootOptions as g, SelectRootCommonProps as h, SelectValueCommonProps as i, SelectLabelRenderProps as j, SelectLabelOptions as k, SelectTriggerCommonProps as l, SelectRoot as m, index_d_exports as n, SelectValueProps as o, SelectMultipleSelectionOptions as p, useSelectContext as q, SelectValue as r, SelectValueRenderProps as s, Select as t, SelectTriggerOptions as u, SelectRootRenderProps as v, SelectListboxOptions as w, SelectPortalProps as x, SelectSingleSelectionOptions as y, SelectContent as z };