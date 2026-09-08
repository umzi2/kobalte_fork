import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, s as FormControlErrorMessageCommonProps, u as FormControlErrorMessageRenderProps } from "../index/ZPox5oFC.js";
import { A as RadioGroupItemDescription, D as RadioGroupItemIndicatorOptions, E as RadioGroupItemIndicatorCommonProps, F as RadioGroupItemControl, H as RadioGroupItemOptions, I as RadioGroupItemControlCommonProps, L as RadioGroupItemControlOptions, M as RadioGroupItemDescriptionOptions, N as RadioGroupItemDescriptionProps, O as RadioGroupItemIndicatorProps, P as RadioGroupItemDescriptionRenderProps, R as RadioGroupItemControlProps, S as RadioGroupItemInputOptions, T as RadioGroupItemIndicator, V as RadioGroupItemCommonProps, W as RadioGroupItemRenderProps, _ as RadioGroupItemLabelOptions, c as RadioGroupRootProps, g as RadioGroupItemLabelCommonProps, h as RadioGroupItemLabel, j as RadioGroupItemDescriptionCommonProps, k as RadioGroupItemIndicatorRenderProps, u as RadioGroupLabel, v as RadioGroupItemLabelProps, w as RadioGroupItemInputRenderProps, x as RadioGroupItemInputCommonProps, y as RadioGroupItemLabelRenderProps, z as RadioGroupItemControlRenderProps } from "../index/D_OmCM3H.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref, Setter } from "solid-js";
import { Orientation } from "@kobalte/utils";
//#region src/segmented-control/segmented-control-indicator.d.ts
interface SegmentedControlIndicatorOptions {}
interface SegmentedControlIndicatorCommonProps {
  style?: JSX$1.CSSProperties | string;
}
interface SegmentedControlIndicatorRenderProps extends SegmentedControlIndicatorCommonProps {
  role: "presentation";
}
type SegmentedControlIndicatorProps = SegmentedControlIndicatorOptions & Partial<SegmentedControlIndicatorCommonProps>;
declare function SegmentedControlIndicator<T extends ValidComponent = "div">(props: PolymorphicProps<T, SegmentedControlIndicatorProps>): JSX$1.Element;
//#endregion
//#region src/segmented-control/segmented-control-item.d.ts
interface SegmentedControlItemOptions extends RadioGroupItemOptions {}
interface SegmentedControlItemCommonProps<T extends HTMLElement = HTMLElement> extends RadioGroupItemCommonProps<T> {
  ref?: Ref<T>;
}
interface SegmentedControlItemRenderProps extends RadioGroupItemRenderProps {}
type SegmentedControlItemProps<T extends ValidComponent | HTMLElement = HTMLElement> = SegmentedControlItemOptions & Partial<SegmentedControlItemCommonProps<ElementOf<T>>>;
declare const SegmentedControlItem: <T extends ValidComponent = "div">(props: PolymorphicProps<T, SegmentedControlItemProps<T>>) => import("@solidjs/web").JSX.Element;
//#endregion
//#region src/segmented-control/segmented-control-item-input.d.ts
interface SegmentedControlItemInputOptions extends RadioGroupItemInputOptions {}
interface SegmentedControlItemInputCommonProps<T extends HTMLElement = HTMLInputElement> extends RadioGroupItemInputCommonProps<T> {}
interface SegmentedControlItemInputRenderProps extends RadioGroupItemInputRenderProps {}
type SegmentedControlItemInputProps<T extends ValidComponent | HTMLElement = HTMLElement> = SegmentedControlItemInputOptions & Partial<SegmentedControlItemInputCommonProps<ElementOf<T>>>;
declare const SegmentedControlItemInput: <T extends ValidComponent = "input">(props: PolymorphicProps<T, SegmentedControlItemInputProps<T>>) => import("@solidjs/web").JSX.Element;
//#endregion
//#region src/segmented-control/segmented-control-root.d.ts
type SegmentedControlRootProps = RadioGroupRootProps;
declare const SegmentedControlRoot: <T extends ValidComponent = "div">(props: PolymorphicProps<T, SegmentedControlRootProps>) => import("@solidjs/web").JSX.Element;
//#endregion
//#region src/segmented-control/segmented-control-context.d.ts
interface SegmentedControlContextValue {
  value: Accessor<string | undefined>;
  defaultValue: Accessor<string | undefined>;
  orientation: Accessor<Orientation | undefined>;
  root: Accessor<HTMLElement | undefined>;
  selectedItem: Accessor<HTMLElement | undefined>;
  setSelectedItem: Setter<HTMLElement | undefined>;
}
export declare function useSegmentedControlContext(): SegmentedControlContextValue;
//#endregion
//#region src/segmented-control/index.d.ts
export declare const SegmentedControl: typeof SegmentedControlRoot & {
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  Indicator: typeof SegmentedControlIndicator;
  Item: typeof SegmentedControlItem;
  ItemControl: typeof RadioGroupItemControl;
  ItemDescription: typeof RadioGroupItemDescription;
  ItemIndicator: typeof RadioGroupItemIndicator;
  ItemInput: typeof SegmentedControlItemInput;
  ItemLabel: typeof RadioGroupItemLabel;
  Label: typeof RadioGroupLabel;
};
//#endregion
export { FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, SegmentedControlIndicator as Indicator, SegmentedControlItem as Item, RadioGroupItemControl as ItemControl, RadioGroupItemDescription as ItemDescription, RadioGroupItemIndicator as ItemIndicator, SegmentedControlItemInput as ItemInput, RadioGroupItemLabel as ItemLabel, RadioGroupLabel as Label, SegmentedControlRoot as Root, type SegmentedControlContextValue, type FormControlDescriptionCommonProps as SegmentedControlDescriptionCommonProps, type FormControlDescriptionOptions as SegmentedControlDescriptionOptions, type FormControlDescriptionProps as SegmentedControlDescriptionProps, type FormControlDescriptionRenderProps as SegmentedControlDescriptionRenderProps, type FormControlErrorMessageCommonProps as SegmentedControlErrorMessageCommonProps, type FormControlErrorMessageOptions as SegmentedControlErrorMessageOptions, type FormControlErrorMessageProps as SegmentedControlErrorMessageProps, type FormControlErrorMessageRenderProps as SegmentedControlErrorMessageRenderProps, type SegmentedControlIndicatorCommonProps, type SegmentedControlIndicatorOptions, type SegmentedControlIndicatorProps, type SegmentedControlIndicatorRenderProps, type SegmentedControlItemCommonProps, type RadioGroupItemControlCommonProps as SegmentedControlItemControlCommonProps, type RadioGroupItemControlOptions as SegmentedControlItemControlOptions, type RadioGroupItemControlProps as SegmentedControlItemControlProps, type RadioGroupItemControlRenderProps as SegmentedControlItemControlRenderProps, type RadioGroupItemDescriptionCommonProps as SegmentedControlItemDescriptionCommonProps, type RadioGroupItemDescriptionOptions as SegmentedControlItemDescriptionOptions, type RadioGroupItemDescriptionProps as SegmentedControlItemDescriptionProps, type RadioGroupItemDescriptionRenderProps as SegmentedControlItemDescriptionRenderProps, type RadioGroupItemIndicatorCommonProps as SegmentedControlItemIndicatorCommonProps, type RadioGroupItemIndicatorOptions as SegmentedControlItemIndicatorOptions, type RadioGroupItemIndicatorProps as SegmentedControlItemIndicatorProps, type RadioGroupItemIndicatorRenderProps as SegmentedControlItemIndicatorRenderProps, type SegmentedControlItemInputCommonProps, type SegmentedControlItemInputOptions, type SegmentedControlItemInputProps, type SegmentedControlItemInputRenderProps, type RadioGroupItemLabelCommonProps as SegmentedControlItemLabelCommonProps, type RadioGroupItemLabelOptions as SegmentedControlItemLabelOptions, type RadioGroupItemLabelProps as SegmentedControlItemLabelProps, type RadioGroupItemLabelRenderProps as SegmentedControlItemLabelRenderProps, type SegmentedControlItemOptions, type SegmentedControlItemProps, type SegmentedControlItemRenderProps, type SegmentedControlRootProps };