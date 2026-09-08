import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, s as FormControlErrorMessageCommonProps, u as FormControlErrorMessageRenderProps, v as FormControlDataSet } from "../index/ZPox5oFC.js";
import { ComponentProps, JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
import { Orientation, ValidationState } from "@kobalte/utils";
//#region src/rating/rating-control.d.ts
interface RatingControlOptions {}
interface RatingControlCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  onPointerLeave: JSX$1.EventHandlerUnion<T, PointerEvent>;
}
interface RatingControlRenderProps extends RatingControlCommonProps {
  role: "presentation";
}
type RatingControlProps<T extends ValidComponent | HTMLElement = HTMLElement> = RatingControlOptions & Partial<RatingControlCommonProps<ElementOf<T>>>;
declare function RatingControl<T extends ValidComponent = "div">(props: PolymorphicProps<T, RatingControlProps<T>>): JSX$1.Element;
//#endregion
//#region src/rating/rating-hidden-input.d.ts
interface RatingHiddenInputProps extends ComponentProps<"input"> {}
declare function RatingHiddenInput(props: RatingHiddenInputProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/rating/rating-item-context.d.ts
interface RatingItemDataSet extends FormControlDataSet {
  "data-checked": string | undefined;
  "data-half": string | undefined;
  "data-highlighted": string | undefined;
}
interface RatingItemState {
  half: Accessor<boolean>;
  highlighted: Accessor<boolean>;
}
//#endregion
//#region src/rating/rating-item.d.ts
interface RatingItemOptions {}
interface RatingItemCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
  "aria-label"?: string;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onPointerMove: JSX$1.EventHandlerUnion<T, PointerEvent>;
}
interface RatingItemRenderProps extends RatingItemCommonProps, RatingItemDataSet {
  role: "radio";
  tabindex: number | undefined;
  "aria-required": "true" | undefined;
  "aria-disabled": "true" | undefined;
  "aria-readonly": "true" | undefined;
  "aria-checked": "true" | "false";
}
type RatingItemProps<T extends ValidComponent | HTMLElement = HTMLElement> = RatingItemOptions & Partial<RatingItemCommonProps<ElementOf<T>>>;
declare function RatingItem<T extends ValidComponent = "div">(props: PolymorphicProps<T, RatingItemProps<T>>): JSX$1.Element;
//#endregion
//#region src/rating/rating-item-control.d.ts
interface RatingItemControlOptions {
  /**
   * The children of the rating item.
   * Can be a `JSX.Element` or a _render prop_ for having access to the internal state.
   */
  children?: JSX$1.Element | ((state: RatingItemState) => JSX$1.Element);
}
interface RatingItemControlCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface RatingItemControlRenderProps extends RatingItemControlCommonProps {
  role: "presentation";
  children: JSX$1.Element;
}
type RatingItemControlProps<T extends ValidComponent | HTMLElement = HTMLElement> = RatingItemControlOptions & Partial<RatingItemControlCommonProps<ElementOf<T>>>;
declare function RatingItemControl<T extends ValidComponent = "div">(props: PolymorphicProps<T, RatingItemControlProps<T>>): JSX$1.Element;
//#endregion
//#region src/rating/rating-item-description.d.ts
interface RatingItemDescriptionOptions {}
interface RatingItemDescriptionCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
}
interface RatingItemDescriptionRenderProps extends RatingItemDescriptionCommonProps, RatingItemDataSet {}
type RatingItemDescriptionProps<T extends ValidComponent | HTMLElement = HTMLElement> = RatingItemDescriptionOptions & Partial<RatingItemDescriptionCommonProps<ElementOf<T>>>;
declare function RatingItemDescription<T extends ValidComponent = "div">(props: PolymorphicProps<T, RatingItemDescriptionProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/rating/rating-item-label.d.ts
interface RatingItemLabelOptions {}
interface RatingItemLabelCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
  style: JSX$1.CSSProperties | string;
}
interface RatingItemLabelRenderProps extends RatingItemLabelCommonProps, RatingItemDataSet {
  for: string | undefined;
}
type RatingItemLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = RatingItemLabelOptions & Partial<RatingItemLabelCommonProps<ElementOf<T>>>;
declare function RatingItemLabel<T extends ValidComponent = "label">(props: PolymorphicProps<T, RatingItemLabelProps<T>>): JSX$1.Element;
//#endregion
//#region src/rating/rating-label.d.ts
interface RatingLabelOptions {}
interface RatingLabelCommonProps<_T extends HTMLElement = HTMLElement> {}
interface RatingLabelRenderProps extends RatingLabelCommonProps {}
type RatingLabelProps<T extends ValidComponent | HTMLElement = HTMLElement> = RatingLabelOptions & Partial<RatingLabelCommonProps<ElementOf<T>>>;
declare function RatingLabel<T extends ValidComponent = "span">(props: PolymorphicProps<T, RatingLabelProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/rating/rating-root.d.ts
interface RatingRootOptions {
  /** The current rating value. */
  value?: number;
  /**
   * The initial value of the rating when it is first rendered.
   * Use when you do not need to control the state of the rating.
   */
  defaultValue?: number;
  /** Event handler called when the value changes. */
  onChange?: (value: number) => void;
  /** Whether to allow half ratings. */
  allowHalf?: boolean;
  /** The axis the rating items should align with. */
  orientation?: Orientation;
  /**
   * A unique identifier for the component.
   * The id is used to generate id attributes for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
  /**
   * The name of the rating.
   * Submitted with its owning form as part of a name/value pair.
   */
  name?: string;
  /** Whether the rating should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /** Whether the user must select an item before the owning form can be submitted. */
  required?: boolean;
  /** Whether the rating is disabled. */
  disabled?: boolean;
  /** Whether the rating is read only. */
  readOnly?: boolean;
}
interface RatingRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  "aria-labelledby": string | undefined;
  "aria-describedby": string | undefined;
  "aria-label"?: string;
}
interface RatingRootRenderProps extends RatingRootCommonProps, FormControlDataSet {
  role: "radiogroup";
  "aria-invalid": "true" | undefined;
  "aria-required": "true" | undefined;
  "aria-disabled": "true" | undefined;
  "aria-readonly": "true" | undefined;
  "aria-orientation": Orientation | undefined;
}
type RatingRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = RatingRootOptions & Partial<RatingRootCommonProps<ElementOf<T>>>;
declare function RatingRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, RatingRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/rating/index.d.ts
export declare const Rating: typeof RatingRoot & {
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  Control: typeof RatingControl;
  HiddenInput: typeof RatingHiddenInput;
  ItemControl: typeof RatingItemControl;
  ItemDescription: typeof RatingItemDescription;
  ItemLabel: typeof RatingItemLabel;
  Item: typeof RatingItem;
  Label: typeof RatingLabel;
};
//#endregion
export { RatingControl as Control, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, RatingHiddenInput as HiddenInput, RatingItem as Item, RatingItemControl as ItemControl, RatingItemDescription as ItemDescription, RatingItemLabel as ItemLabel, RatingLabel as Label, type RatingControlCommonProps, type RatingControlOptions, type RatingControlProps, type RatingControlRenderProps, type FormControlDescriptionCommonProps as RatingDescriptionCommonProps, type FormControlDescriptionOptions as RatingDescriptionOptions, type FormControlDescriptionProps as RatingDescriptionProps, type FormControlDescriptionRenderProps as RatingDescriptionRenderProps, type FormControlErrorMessageCommonProps as RatingErrorMessageCommonProps, type FormControlErrorMessageOptions as RatingErrorMessageOptions, type FormControlErrorMessageProps as RatingErrorMessageProps, type FormControlErrorMessageRenderProps as RatingErrorMessageRenderProps, type RatingHiddenInputProps, type RatingItemCommonProps, type RatingItemControlCommonProps, type RatingItemControlOptions, type RatingItemControlProps, type RatingItemControlRenderProps, type RatingItemDescriptionCommonProps, type RatingItemDescriptionOptions, type RatingItemDescriptionProps, type RatingItemDescriptionRenderProps, type RatingItemLabelCommonProps, type RatingItemLabelOptions, type RatingItemLabelProps, type RatingItemLabelRenderProps, type RatingItemOptions, type RatingItemProps, type RatingItemRenderProps, type RatingLabelCommonProps, type RatingLabelOptions, type RatingLabelProps, type RatingLabelRenderProps, type RatingRootCommonProps, type RatingRootOptions, type RatingRootProps, type RatingRootRenderProps, RatingRoot as Root };