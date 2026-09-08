import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { c as CollectionNode } from "../index/C4-dpjA0.js";
import "../index/Dy4FWz3y.js";
import { E as SelectionMode, T as SelectionBehavior, b as KeyboardDelegate, l as ListState, y as FocusStrategy } from "../index/CaxKjm1F.js";
import { n as DismissableLayerRenderProps, t as DismissableLayerCommonProps } from "../index/D_ZxK-J-.js";
import { v as FormControlDataSet } from "../index/ZPox5oFC.js";
import { f as ListboxRootOptions, m as ListboxRootRenderProps, n as index_d_exports } from "../index/BczgaXlZ.js";
import { r as PopperRootOptions } from "../index/DTS_JDht.js";
import { ComponentProps, JSX as JSX$1, Portal, ValidComponent } from "@solidjs/web";
import { Accessor, Component, Ref } from "solid-js";
import { ValidationState } from "@kobalte/utils";
import { FocusOutsideEvent, InteractOutsideEvent, PointerDownOutsideEvent } from "@solid-primitives/interaction";
//#region src/combobox/types.d.ts
type ComboboxTriggerMode = "focus" | "input" | "manual";
//#endregion
//#region src/combobox/combobox-context.d.ts
interface ComboboxDataSet {
  "data-expanded": string | undefined;
  "data-closed": string | undefined;
}
interface ComboboxContextValue {
  dataset: Accessor<ComboboxDataSet>;
  isOpen: Accessor<boolean>;
  isDisabled: Accessor<boolean>;
  isMultiple: Accessor<boolean>;
  isVirtualized: Accessor<boolean>;
  isModal: Accessor<boolean>;
  preventScroll: Accessor<boolean>;
  isInputFocused: Accessor<boolean>;
  allowsEmptyCollection: Accessor<boolean>;
  shouldFocusWrap: Accessor<boolean>;
  removeOnBackspace: Accessor<boolean>;
  selectedOptions: Accessor<any[]>;
  contentPresent: Accessor<boolean>;
  autoFocus: Accessor<FocusStrategy | boolean>;
  activeDescendant: Accessor<string | undefined>;
  inputValue: Accessor<string | undefined>;
  triggerMode: Accessor<ComboboxTriggerMode>;
  controlRef: Accessor<HTMLElement | undefined>;
  inputRef: Accessor<HTMLInputElement | undefined>;
  triggerRef: Accessor<HTMLElement | undefined>;
  contentRef: Accessor<HTMLElement | undefined>;
  listboxId: Accessor<string | undefined>;
  triggerAriaLabel: Accessor<string | undefined>;
  listboxAriaLabel: Accessor<string | undefined>;
  listState: Accessor<ListState>;
  keyboardDelegate: Accessor<KeyboardDelegate>;
  resetInputValue: (selectedKeys: Set<string>) => void;
  setIsInputFocused: (isFocused: boolean) => void;
  setInputValue: (value: string) => void;
  setControlRef: (el: HTMLElement) => void;
  setInputRef: (el: HTMLInputElement) => void;
  setTriggerRef: (el: HTMLElement) => void;
  setContentRef: (el: HTMLElement) => void;
  setListboxRef: (el: HTMLElement) => void;
  open: (focusStrategy: FocusStrategy | boolean, triggerMode?: ComboboxTriggerMode) => void;
  close: () => void;
  toggle: (focusStrategy: FocusStrategy | boolean, triggerMode?: ComboboxTriggerMode) => void;
  placeholder: Accessor<JSX$1.Element>;
  renderItem: (item: CollectionNode) => JSX$1.Element;
  renderSection: (section: CollectionNode) => JSX$1.Element;
  removeOptionFromSelection: (option: any) => void;
  onInputKeyDown: JSX$1.EventHandlerUnion<HTMLInputElement, KeyboardEvent>;
  generateId: (part: string) => string;
  registerListboxId: (id: string) => () => void;
}
declare function useComboboxContext(): ComboboxContextValue;
//#endregion
//#region src/combobox/combobox-content.d.ts
interface ComboboxContentOptions {
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
interface ComboboxContentCommonProps<T extends HTMLElement = HTMLElement> extends DismissableLayerCommonProps<T> {
  style?: JSX$1.CSSProperties | string;
}
interface ComboboxContentRenderProps extends ComboboxContentCommonProps, DismissableLayerRenderProps, ComboboxDataSet {}
type ComboboxContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxContentOptions & Partial<ComboboxContentCommonProps<ElementOf<T>>>;
/**
 * The component that pops out when the combobox is open.
 */
declare function ComboboxContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, ComboboxContentProps<T>>): JSX$1.Element;
//#endregion
//#region src/combobox/combobox-input.d.ts
interface ComboboxInputOptions {}
interface ComboboxInputCommonProps<T extends HTMLElement = HTMLInputElement> {
  id: string;
  ref: Ref<T>;
  onInput: JSX$1.EventHandlerUnion<T, InputEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onBlur: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onTouchEnd: JSX$1.EventHandlerUnion<T, TouchEvent>;
  disabled: boolean | undefined;
  "aria-label": string | undefined;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
}
interface ComboboxInputRenderProps extends ComboboxInputCommonProps, FormControlDataSet {
  value: string | undefined;
  required: boolean | undefined;
  readonly: boolean | undefined;
  placeholder: JSX$1.Element;
  "aria-invalid": "true" | undefined;
  "aria-required": "true" | undefined;
  "aria-disabled": "true" | undefined;
  "aria-readonly": "true" | undefined;
  type: "text";
  role: "combobox";
  autoComplete: "off";
  autoCorrect: "off";
  spellCheck: "false";
  "aria-haspopup": "listbox";
  "aria-autocomplete": "list";
  "aria-expanded": "true" | "false";
  "aria-controls": string | undefined;
  "aria-activedescendant": string | undefined;
}
type ComboboxInputProps<T extends ValidComponent | HTMLElement = HTMLInputElement> = ComboboxInputOptions & Partial<ComboboxInputCommonProps<ElementOf<T>>>;
declare function ComboboxInput<T extends ValidComponent = "input">(props: PolymorphicProps<T, ComboboxInputProps<T>>): JSX$1.Element;
//#endregion
//#region src/combobox/combobox-listbox.d.ts
interface ComboboxListboxOptions<Option, OptGroup = never> extends Pick<ListboxRootOptions<Option, OptGroup>, "scrollRef" | "scrollToItem" | "children"> {}
interface ComboboxListboxCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
}
interface ComboboxListboxRenderProps extends ComboboxListboxCommonProps, ListboxRootRenderProps {
  "aria-label": string | undefined;
  "aria-labelledby": string | undefined;
}
type ComboboxListboxProps<Option, OptGroup = never, T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxListboxOptions<Option, OptGroup> & Partial<ComboboxListboxCommonProps<ElementOf<T>>>;
/**
 * Contains all the items of a `Combobox`.
 */
declare function ComboboxListbox<Option = any, OptGroup = never, T extends ValidComponent = "ul">(props: PolymorphicProps<T, ComboboxListboxProps<Option, OptGroup, T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/combobox/combobox-portal.d.ts
interface ComboboxPortalProps extends ComponentProps<typeof Portal> {}
/**
 * Portals its children into the `body` when the combobox is open.
 */
declare function ComboboxPortal(props: ComboboxPortalProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/combobox/combobox.intl.d.ts
declare const COMBOBOX_INTL_TRANSLATIONS: {
  focusAnnouncement: (optionText: string, isSelected: boolean) => string;
  countAnnouncement: (optionCount: number) => "one option available" | undefined;
  selectedAnnouncement: (optionText: string) => string;
  triggerLabel: string;
  listboxLabel: string;
};
type ComboboxIntlTranslations = typeof COMBOBOX_INTL_TRANSLATIONS;
//#endregion
//#region src/combobox/combobox-base.d.ts
interface ComboboxBaseItemComponentProps<Option> {
  /** The item to render. */
  item: CollectionNode<Option>;
}
interface ComboboxBaseSectionComponentProps<OptGroup> {
  /** The section to render. */
  section: CollectionNode<OptGroup>;
}
interface ComboboxBaseOptions<Option, OptGroup = never> extends Omit<PopperRootOptions, "anchorRef" | "contentRef" | "onCurrentPlacementChange"> {
  /** Prevents input reset on combobox blur when content is displayed. */
  noResetInputOnBlur?: boolean;
  /** The localized strings of the component. */
  translations?: ComboboxIntlTranslations;
  /** The controlled open state of the combobox. */
  open?: boolean;
  /**
   * The default open state when initially rendered.
   * Useful when you do not need to control the open state.
   */
  defaultOpen?: boolean;
  /**
   * Event handler called when the open state of the combobox changes.
   * Returns the new open state and the action that caused the opening of the menu.
   */
  onOpenChange?: (isOpen: boolean, triggerMode?: ComboboxTriggerMode) => void;
  /** Handler that is called when the combobox input value changes. */
  onInputChange?: (value: string) => void;
  /** The controlled value of the combobox. */
  value?: Option[];
  /**
   * The value of the combobox when initially rendered.
   * Useful when you do not need to control the value.
   */
  defaultValue?: Option[];
  /** Event handler called when the value changes. */
  onChange?: (value: Option[]) => void;
  /** The interaction required to display the combobox menu. */
  triggerMode?: ComboboxTriggerMode;
  /** The content that will be rendered when no value or defaultValue is set. */
  placeholder?: JSX$1.Element;
  /** An array of options to display as the available options. */
  options: Array<Option | OptGroup>;
  /**
   * Property name or getter function to use as the value of an option.
   * This is the value that will be submitted when the combobox is part of a `<form>`.
   */
  optionValue?: keyof Exclude<Option, null> | ((option: Exclude<Option, null>) => string | number);
  /** Property name or getter function to use as the text value of an option for typeahead purpose. */
  optionTextValue?: keyof Exclude<Option, null> | ((option: Exclude<Option, null>) => string);
  /**
   * Property name or getter function to use as the label of an option.
   * This is the string representation of the option to display in the `Combobox.Input`.
   */
  optionLabel?: keyof Exclude<Option, null> | ((option: Exclude<Option, null>) => string);
  /** Property name or getter function to use as the disabled flag of an option. */
  optionDisabled?: keyof Exclude<Option, null> | ((option: Exclude<Option, null>) => boolean);
  /** Property name that refers to the children options of an option group. */
  optionGroupChildren?: keyof Exclude<OptGroup, null>;
  /** An optional keyboard delegate to override the default. */
  keyboardDelegate?: KeyboardDelegate;
  /** The filter function used to determine if an option should be included in the combo box list. */
  defaultFilter?: "startsWith" | "endsWith" | "contains" | ((option: Exclude<Option, null>, inputValue: string) => boolean);
  /** Whether focus should wrap around when the end/start is reached. */
  shouldFocusWrap?: boolean;
  /** Whether the combobox allows the menu to be open when the collection is empty. */
  allowsEmptyCollection?: boolean;
  /** The type of selection that is allowed in the select. */
  selectionMode?: Exclude<SelectionMode, "none">;
  /** How multiple selection should behave in the select. */
  selectionBehavior?: SelectionBehavior;
  /** Whether onValueChange should fire even if the new set of keys is the same as the last. */
  allowDuplicateSelectionEvents?: boolean;
  /** Whether the combobox allows empty selection. */
  disallowEmptySelection?: boolean;
  /** Whether the combobox closes after selection. */
  closeOnSelection?: boolean;
  /**
   * When `selectionMode` is "multiple".
   * Whether the last selected option should be removed when the user press the Backspace key and the input is empty.
   */
  removeOnBackspace?: boolean;
  /** Whether the combobox uses virtual scrolling. */
  virtualized?: boolean;
  /** When NOT virtualized, the component to render as an item in the `Combobox.Listbox`. */
  itemComponent?: Component<ComboboxBaseItemComponentProps<Option>>;
  /** When NOT virtualized, the component to render as a section in the `Combobox.Listbox`. */
  sectionComponent?: Component<ComboboxBaseSectionComponentProps<OptGroup>>;
  /**
   * Whether the combobox should be the only visible content for screen readers.
   * When set to `true`:
   * - interaction with outside elements will be disabled.
   * - scroll will be locked.
   * - focus will be locked inside the select content.
   * - elements outside the combobox content will not be visible for screen readers.
   */
  modal?: boolean;
  /** Whether the scroll should be locked even if the combobox is not modal. */
  preventScroll?: boolean;
  /**
   * Used to force mounting the combobox (portal, positioner and content) when more control is needed.
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
   * The name of the combobox.
   * Submitted with its owning form as part of a name/value pair.
   */
  name?: string;
  /** Whether the combobox should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the user must select an item before the owning form can be submitted. */
  required?: boolean;
  /** Whether the combobox is disabled. */
  disabled?: boolean;
  /** Whether the combobox is read only. */
  readOnly?: boolean;
}
interface ComboboxBaseCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface ComboboxBaseRenderProps extends ComboboxBaseCommonProps, FormControlDataSet, ComboboxDataSet {
  role: "group";
}
//#endregion
//#region src/combobox/combobox-control.d.ts
interface ComboboxControlState<Option> {
  /** The selected options. */
  selectedOptions: Accessor<Option[]>;
  /** A function to remove an option from the selection. */
  remove: (option: Option) => void;
  /** A function to clear the selection. */
  clear: () => void;
}
interface ComboboxControlOptions<Option> {
  /**
   * The children of the combobox control.
   * Can be a `JSX.Element` or a _render prop_ for having access to the internal state.
   */
  children?: JSX$1.Element | ((state: ComboboxControlState<Option>) => JSX$1.Element);
}
interface ComboboxControlCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
}
interface ComboboxControlRenderProps extends ComboboxControlCommonProps, FormControlDataSet, ComboboxDataSet {
  children: JSX$1.Element;
}
type ComboboxControlProps<Option, T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxControlOptions<Option> & Partial<ComboboxControlCommonProps<ElementOf<T>>>;
/**
 * Contains the combobox input and trigger.
 */
declare function ComboboxControl<Option, T extends ValidComponent = "div">(props: PolymorphicProps<T, ComboboxControlProps<Option, T>>): JSX$1.Element;
//#endregion
//#region src/combobox/combobox-hidden-select.d.ts
type ComboboxHiddenSelectProps = ComponentProps<"select">;
declare function ComboboxHiddenSelect(props: ComboboxHiddenSelectProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/combobox/combobox-icon.d.ts
interface ComboboxIconOptions {}
interface ComboboxIconCommonProps<_T extends HTMLElement = HTMLElement> {
  children: JSX$1.Element;
}
type ComboboxIconProps<T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxIconOptions & Partial<ComboboxIconCommonProps<ElementOf<T>>>;
/**
 * A small icon often displayed next to the value as a visual affordance for the fact it can be open.
 * It renders a `▼` by default, but you can use your own icon `children`.
 */
declare function ComboboxIcon<T extends ValidComponent = "span">(props: PolymorphicProps<T, ComboboxIconProps<T>>): JSX$1.Element;
//#endregion
//#region src/combobox/combobox-root.d.ts
interface ComboboxSingleSelectionOptions<T> {
  /** The controlled value of the combobox. */
  value?: T | null;
  /**
   * The value of the combobox when initially rendered.
   * Useful when you do not need to control the value.
   */
  defaultValue?: T;
  /** Event handler called when the value changes. */
  onChange?: (value: T | null) => void;
  /** Whether the combobox allow multiple selection. */
  multiple?: false;
}
interface ComboboxMultipleSelectionOptions<T> {
  /** The controlled value of the combobox. */
  value?: T[];
  /**
   * The value of the combobox when initially rendered.
   * Useful when you do not need to control the value.
   */
  defaultValue?: T[];
  /** Event handler called when the value changes. */
  onChange?: (value: T[]) => void;
  /** Whether the combobox allow multiple selection. */
  multiple: true;
}
type ComboboxRootOptions<Option, OptGroup = never> = (ComboboxSingleSelectionOptions<Option> | ComboboxMultipleSelectionOptions<Option>) & Omit<ComboboxBaseOptions<Option, OptGroup>, "value" | "defaultValue" | "onChange" | "selectionMode">;
interface ComboboxRootCommonProps<_T extends HTMLElement = HTMLElement> {}
interface ComboboxRootRenderProps extends ComboboxRootCommonProps, ComboboxBaseRenderProps {}
type ComboboxRootProps<Option, OptGroup = never, T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxRootOptions<Option, OptGroup> & Partial<ComboboxRootCommonProps<ElementOf<T>>>;
/**
 * A combo box combines a text input with a listbox, allowing users to filter a list of options to items matching a query.
 */
declare function ComboboxRoot<Option, OptGroup = never, T extends ValidComponent = "div">(props: PolymorphicProps<T, ComboboxRootProps<Option, OptGroup, T>>): import("@solidjs/web").JSX.Element;
//#endregion
export { ComboboxInputOptions as A, useComboboxContext as B, ComboboxListbox as C, ComboboxListboxRenderProps as D, ComboboxListboxProps as E, ComboboxContentOptions as F, ComboboxContentProps as I, ComboboxContentRenderProps as L, ComboboxInputRenderProps as M, ComboboxContent as N, ComboboxInput as O, ComboboxContentCommonProps as P, ComboboxContextValue as R, ComboboxPortalProps as S, ComboboxListboxOptions as T, ComboboxTriggerMode as V, ComboboxBaseItemComponentProps as _, ComboboxRootProps as a, ComboboxBaseSectionComponentProps as b, ComboboxIcon as c, ComboboxHiddenSelectProps as d, ComboboxControl as f, ComboboxControlRenderProps as g, ComboboxControlProps as h, ComboboxRootOptions as i, ComboboxInputProps as j, ComboboxInputCommonProps as k, ComboboxIconProps as l, ComboboxControlOptions as m, ComboboxRoot as n, ComboboxRootRenderProps as o, ComboboxControlCommonProps as p, ComboboxRootCommonProps as r, ComboboxSingleSelectionOptions as s, ComboboxMultipleSelectionOptions as t, ComboboxHiddenSelect as u, ComboboxBaseOptions as v, ComboboxListboxCommonProps as w, ComboboxPortal as x, ComboboxBaseRenderProps as y, ComboboxDataSet as z };