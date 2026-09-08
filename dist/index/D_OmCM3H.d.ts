import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, s as FormControlErrorMessageCommonProps, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "./ZPox5oFC.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
import { Orientation, ValidationState } from "@kobalte/utils";
//#region src/radio-group/radio-group-item-context.d.ts
interface RadioGroupItemDataSet {
  "data-valid": string | undefined;
  "data-invalid": string | undefined;
  "data-required": string | undefined;
  "data-disabled": string | undefined;
  "data-readonly": string | undefined;
  "data-checked": string | undefined;
}
//#endregion
//#region src/radio-group/radio-group-item.d.ts
interface RadioGroupItemOptions {
  /**
   * The value of the radio button, used when submitting an HTML form.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value).
   */
  value: string;
  /** Whether the radio button is disabled or not. */
  disabled?: boolean;
}
interface RadioGroupItemCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
}
interface RadioGroupItemRenderProps extends RadioGroupItemCommonProps, RadioGroupItemDataSet {
  role: "group";
}
type RadioGroupItemProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemOptions & Partial<RadioGroupItemCommonProps<ElementOf<T>>>;
/**
 * The root container for a radio button.
 */
declare function RadioGroupItem<T extends ValidComponent = "div">(props: PolymorphicProps<T, RadioGroupItemProps<T>>): JSX$1.Element;
//#endregion
//#region src/radio-group/radio-group-item-control.d.ts
interface RadioGroupItemControlOptions {}
interface RadioGroupItemControlCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
}
interface RadioGroupItemControlRenderProps extends RadioGroupItemControlCommonProps, RadioGroupItemDataSet {}
type RadioGroupItemControlProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemControlOptions & Partial<RadioGroupItemControlCommonProps<ElementOf<T>>>;
/**
 * The element that visually represents a radio button.
 */
declare function RadioGroupItemControl<T extends ValidComponent = "div">(props: PolymorphicProps<T, RadioGroupItemControlProps<T>>): JSX$1.Element;
//#endregion
//#region src/radio-group/radio-group-item-description.d.ts
interface RadioGroupItemDescriptionOptions {}
interface RadioGroupItemDescriptionCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface RadioGroupItemDescriptionRenderProps extends RadioGroupItemDescriptionCommonProps, RadioGroupItemDataSet {}
type RadioGroupItemDescriptionProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemDescriptionOptions & Partial<RadioGroupItemDescriptionCommonProps<ElementOf<T>>>;
/**
 * The description that gives the user more information on the radio button.
 */
declare function RadioGroupItemDescription<T extends ValidComponent = "div">(props: PolymorphicProps<T, RadioGroupItemDescriptionProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/radio-group/radio-group-item-indicator.d.ts
interface RadioGroupItemIndicatorOptions {
  /**
   * Used to force mounting when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
}
interface RadioGroupItemIndicatorCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
}
interface RadioGroupItemIndicatorRenderProps extends RadioGroupItemIndicatorCommonProps, RadioGroupItemDataSet {}
type RadioGroupItemIndicatorProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemIndicatorOptions & Partial<RadioGroupItemIndicatorCommonProps<ElementOf<T>>>;
/**
 * The visual indicator rendered when the radio item is in a checked state.
 * You can style this element directly, or you can use it as a wrapper to put an icon into, or both.
 */
declare function RadioGroupItemIndicator<T extends ValidComponent = "div">(props: PolymorphicProps<T, RadioGroupItemIndicatorProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/radio-group/radio-group-item-input.d.ts
interface RadioGroupItemInputOptions {}
interface RadioGroupItemInputCommonProps<T extends HTMLElement = HTMLInputElement> {
  id: string;
  ref: Ref<T>;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
  onChange: JSX$1.EventHandlerUnion<T, Event>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
  onBlur: JSX$1.EventHandlerUnion<T, FocusEvent>;
  "aria-label"?: string;
  style?: JSX$1.CSSProperties | string;
}
interface RadioGroupItemInputRenderProps extends RadioGroupItemInputCommonProps, RadioGroupItemDataSet {
  type: "radio";
  name: string;
  value: string;
  checked: boolean;
  required: boolean | undefined;
  disabled: boolean | undefined;
  readonly: boolean | undefined;
}
type RadioGroupItemInputProps<T extends ValidComponent | HTMLElement = HTMLInputElement> = RadioGroupItemInputOptions & Partial<RadioGroupItemInputCommonProps<ElementOf<T>>>;
/**
 * The native html input that is visually hidden in the radio button.
 */
declare function RadioGroupItemInput<T extends ValidComponent = "input">(props: PolymorphicProps<T, RadioGroupItemInputProps<T>>): JSX$1.Element;
//#endregion
//#region src/radio-group/radio-group-item-label.d.ts
interface RadioGroupItemLabelOptions {}
interface RadioGroupItemLabelCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface RadioGroupItemLabelRenderProps extends RadioGroupItemLabelCommonProps, RadioGroupItemDataSet {
  for: string | undefined;
}
type RadioGroupItemLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupItemLabelOptions & Partial<RadioGroupItemLabelCommonProps<ElementOf<T>>>;
/**
 * The label that gives the user information on the radio button.
 */
declare function RadioGroupItemLabel<T extends ValidComponent = "label">(props: PolymorphicProps<T, RadioGroupItemLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/radio-group/radio-group-label.d.ts
interface RadioGroupLabelOptions {}
interface RadioGroupLabelCommonProps<_T extends HTMLElement = HTMLElement> {}
interface RadioGroupLabelRenderProps extends RadioGroupLabelCommonProps {}
type RadioGroupLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupLabelOptions & Partial<RadioGroupLabelCommonProps<ElementOf<T>>>;
/**
 * The label that gives the user information on the radio group.
 */
declare function RadioGroupLabel<T extends ValidComponent = "span">(props: PolymorphicProps<T, RadioGroupLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/radio-group/radio-group-root.d.ts
interface RadioGroupRootOptions {
  /** The controlled value of the radio button to check. */
  value?: string;
  /**
   * The value of the radio button that should be checked when initially rendered.
   * Useful when you do not need to control the state of the radio buttons.
   */
  defaultValue?: string;
  /** Event handler called when the value changes. */
  onChange?: (value: string) => void;
  /** The axis the radio group items should align with. */
  orientation?: Orientation;
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
  /**
   * The name of the radio group.
   * Submitted with its owning form as part of a name/value pair.
   */
  name?: string;
  /** Whether the radio group should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the user must select an item before the owning form can be submitted. */
  required?: boolean;
  /** Whether the radio group is disabled. */
  disabled?: boolean;
  /** Whether the radio group is read only. */
  readOnly?: boolean;
}
interface RadioGroupRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
  "aria-label"?: string;
}
interface RadioGroupRootRenderProps extends RadioGroupRootCommonProps, FormControlDataSet {
  role: "radiogroup";
  "aria-invalid": "true" | undefined;
  "aria-required": "true" | undefined;
  "aria-disabled": "true" | undefined;
  "aria-readonly": "true" | undefined;
  "aria-orientation": Orientation | undefined;
}
type RadioGroupRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = RadioGroupRootOptions & Partial<RadioGroupRootCommonProps<ElementOf<T>>>;
/**
 * A set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time.
 * This component is based on the [WAI-ARIA Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/)
 */
declare function RadioGroupRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, RadioGroupRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/radio-group/radio-group-context.d.ts
interface RadioGroupContextValue {
  ariaDescribedBy: Accessor<string | undefined>;
  isDefaultValue: (value: string) => boolean;
  isSelectedValue: (value: string) => boolean;
  setSelectedValue: (value: string) => void;
}
declare function useRadioGroupContext(): RadioGroupContextValue;
declare namespace index_d_exports {
  export { FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, RadioGroupItem as Item, RadioGroupItemControl as ItemControl, RadioGroupItemDescription as ItemDescription, RadioGroupItemIndicator as ItemIndicator, RadioGroupItemInput as ItemInput, RadioGroupItemLabel as ItemLabel, RadioGroupLabel as Label, RadioGroup, RadioGroupContextValue, FormControlDescriptionCommonProps as RadioGroupDescriptionCommonProps, FormControlDescriptionOptions as RadioGroupDescriptionOptions, FormControlDescriptionProps as RadioGroupDescriptionProps, FormControlDescriptionRenderProps as RadioGroupDescriptionRenderProps, FormControlErrorMessageCommonProps as RadioGroupErrorMessageCommonProps, FormControlErrorMessageOptions as RadioGroupErrorMessageOptions, FormControlErrorMessageProps as RadioGroupErrorMessageProps, FormControlErrorMessageRenderProps as RadioGroupErrorMessageRenderProps, RadioGroupItemCommonProps, RadioGroupItemControlCommonProps, RadioGroupItemControlOptions, RadioGroupItemControlProps, RadioGroupItemControlRenderProps, RadioGroupItemDescriptionCommonProps, RadioGroupItemDescriptionOptions, RadioGroupItemDescriptionProps, RadioGroupItemDescriptionRenderProps, RadioGroupItemIndicatorCommonProps, RadioGroupItemIndicatorOptions, RadioGroupItemIndicatorProps, RadioGroupItemIndicatorRenderProps, RadioGroupItemInputCommonProps, RadioGroupItemInputOptions, RadioGroupItemInputProps, RadioGroupItemInputRenderProps, RadioGroupItemLabelCommonProps, RadioGroupItemLabelOptions, RadioGroupItemLabelProps, RadioGroupItemLabelRenderProps, RadioGroupItemOptions, RadioGroupItemProps, RadioGroupItemRenderProps, RadioGroupLabelCommonProps, RadioGroupLabelOptions, RadioGroupLabelProps, RadioGroupLabelRenderProps, RadioGroupRootCommonProps, RadioGroupRootOptions, RadioGroupRootProps, RadioGroupRootRenderProps, RadioGroupRoot as Root, useRadioGroupContext };
}
declare const RadioGroup: typeof RadioGroupRoot & {
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  Item: typeof RadioGroupItem;
  ItemControl: typeof RadioGroupItemControl;
  ItemDescription: typeof RadioGroupItemDescription;
  ItemIndicator: typeof RadioGroupItemIndicator;
  ItemInput: typeof RadioGroupItemInput;
  ItemLabel: typeof RadioGroupItemLabel;
  Label: typeof RadioGroupLabel;
};
//#endregion
export { RadioGroupItemDescription as A, RadioGroupItem as B, RadioGroupItemInputProps as C, RadioGroupItemIndicatorOptions as D, RadioGroupItemIndicatorCommonProps as E, RadioGroupItemControl as F, RadioGroupItemOptions as H, RadioGroupItemControlCommonProps as I, RadioGroupItemControlOptions as L, RadioGroupItemDescriptionOptions as M, RadioGroupItemDescriptionProps as N, RadioGroupItemIndicatorProps as O, RadioGroupItemDescriptionRenderProps as P, RadioGroupItemControlProps as R, RadioGroupItemInputOptions as S, RadioGroupItemIndicator as T, RadioGroupItemProps as U, RadioGroupItemCommonProps as V, RadioGroupItemRenderProps as W, RadioGroupItemLabelOptions as _, RadioGroupRoot as a, RadioGroupItemInput as b, RadioGroupRootProps as c, RadioGroupLabelCommonProps as d, RadioGroupLabelOptions as f, RadioGroupItemLabelCommonProps as g, RadioGroupItemLabel as h, useRadioGroupContext as i, RadioGroupItemDescriptionCommonProps as j, RadioGroupItemIndicatorRenderProps as k, RadioGroupRootRenderProps as l, RadioGroupLabelRenderProps as m, index_d_exports as n, RadioGroupRootCommonProps as o, RadioGroupLabelProps as p, RadioGroupContextValue as r, RadioGroupRootOptions as s, RadioGroup as t, RadioGroupLabel as u, RadioGroupItemLabelProps as v, RadioGroupItemInputRenderProps as w, RadioGroupItemInputCommonProps as x, RadioGroupItemLabelRenderProps as y, RadioGroupItemControlRenderProps as z };