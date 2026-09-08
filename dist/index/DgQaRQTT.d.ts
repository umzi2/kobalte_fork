import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { i as ButtonRootCommonProps, s as ButtonRootRenderProps } from "./Bjp2qtUK.js";
import { a as FormControlLabelRenderProps, c as FormControlErrorMessageOptions, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, i as FormControlLabelProps, l as FormControlErrorMessageProps, m as FormControlDescriptionProps, n as FormControlLabelCommonProps, o as FormControlErrorMessage, p as FormControlDescriptionOptions, r as FormControlLabelOptions, s as FormControlErrorMessageCommonProps, t as FormControlLabel, u as FormControlErrorMessageRenderProps } from "./ZPox5oFC.js";
import { A as ComboboxInputOptions, B as useComboboxContext, C as ComboboxListbox, D as ComboboxListboxRenderProps, E as ComboboxListboxProps, F as ComboboxContentOptions, I as ComboboxContentProps, L as ComboboxContentRenderProps, M as ComboboxInputRenderProps, N as ComboboxContent, O as ComboboxInput, P as ComboboxContentCommonProps, R as ComboboxContextValue, S as ComboboxPortalProps, T as ComboboxListboxOptions, V as ComboboxTriggerMode, _ as ComboboxBaseItemComponentProps, a as ComboboxRootProps, b as ComboboxBaseSectionComponentProps, c as ComboboxIcon, d as ComboboxHiddenSelectProps, f as ComboboxControl, g as ComboboxControlRenderProps, h as ComboboxControlProps, i as ComboboxRootOptions, j as ComboboxInputProps, k as ComboboxInputCommonProps, l as ComboboxIconProps, m as ComboboxControlOptions, n as ComboboxRoot, o as ComboboxRootRenderProps, p as ComboboxControlCommonProps, r as ComboboxRootCommonProps, s as ComboboxSingleSelectionOptions, t as ComboboxMultipleSelectionOptions, u as ComboboxHiddenSelect, w as ComboboxListboxCommonProps, x as ComboboxPortal, z as ComboboxDataSet } from "../combobox-root/DbzRduU8.js";
import { A as ListboxItem, C as ListboxItemIndicatorProps, D as ListboxItemDescriptionOptions, E as ListboxItemDescriptionCommonProps, M as ListboxItemOptions, N as ListboxItemProps, O as ListboxItemDescriptionProps, P as ListboxItemRenderProps, S as ListboxItemIndicatorOptions, T as ListboxItemDescription, _ as ListboxItemLabelOptions, a as ListboxSection, b as ListboxItemIndicator, c as ListboxSectionProps, g as ListboxItemLabelCommonProps, h as ListboxItemLabel, j as ListboxItemCommonProps, k as ListboxItemDescriptionRenderProps, l as ListboxSectionRenderProps, o as ListboxSectionCommonProps, s as ListboxSectionOptions, v as ListboxItemLabelProps, w as ListboxItemIndicatorRenderProps, x as ListboxItemIndicatorCommonProps, y as ListboxItemLabelRenderProps } from "./BczgaXlZ.js";
import { f as PopperArrowOptions, p as PopperArrowProps, u as PopperArrow } from "./DTS_JDht.js";
import { JSX, ValidComponent } from "@solidjs/web";
import { Ref } from "solid-js";
//#region src/combobox/combobox-trigger.d.ts
interface ComboboxTriggerOptions {}
interface ComboboxTriggerCommonProps<T extends HTMLElement = HTMLElement> extends ButtonRootCommonProps<T> {
  id: string;
  ref: Ref<T>;
  onPointerDown: JSX.EventHandlerUnion<T, PointerEvent>;
  onClick: JSX.EventHandlerUnion<T, MouseEvent>;
  "aria-labelledby": string | undefined;
}
interface ComboboxTriggerRenderProps extends ComboboxTriggerCommonProps, ComboboxDataSet, ButtonRootRenderProps {
  "aria-label": string | undefined;
  "aria-haspopup": "listbox";
  "aria-expanded": "true" | "false";
  "aria-controls": string | undefined;
}
type ComboboxTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = ComboboxTriggerOptions & Partial<ComboboxTriggerCommonProps<ElementOf<T>>>;
declare function ComboboxTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, ComboboxTriggerProps<T>>): JSX.Element;
declare namespace index_d_exports {
  export { PopperArrow as Arrow, Combobox, PopperArrowOptions as ComboboxArrowOptions, PopperArrowProps as ComboboxArrowProps, ComboboxContentCommonProps, ComboboxContentOptions, ComboboxContentProps, ComboboxContentRenderProps, ComboboxContextValue, ComboboxControlCommonProps, ComboboxControlOptions, ComboboxControlProps, ComboboxControlRenderProps, FormControlDescriptionCommonProps as ComboboxDescriptionCommonProps, FormControlDescriptionOptions as ComboboxDescriptionOptions, FormControlDescriptionProps as ComboboxDescriptionProps, FormControlDescriptionRenderProps as ComboboxDescriptionRenderProps, FormControlErrorMessageCommonProps as ComboboxErrorMessageCommonProps, FormControlErrorMessageOptions as ComboboxErrorMessageOptions, FormControlErrorMessageProps as ComboboxErrorMessageProps, FormControlErrorMessageRenderProps as ComboboxErrorMessageRenderProps, ComboboxHiddenSelectProps, ComboboxIconProps, ComboboxInputCommonProps, ComboboxInputOptions, ComboboxInputProps, ComboboxInputRenderProps, ListboxItemCommonProps as ComboboxItemCommonProps, ListboxItemDescriptionCommonProps as ComboboxItemDescriptionCommonProps, ListboxItemDescriptionOptions as ComboboxItemDescriptionOptions, ListboxItemDescriptionProps as ComboboxItemDescriptionProps, ListboxItemDescriptionRenderProps as ComboboxItemDescriptionRenderProps, ListboxItemIndicatorCommonProps as ComboboxItemIndicatorCommonProps, ListboxItemIndicatorOptions as ComboboxItemIndicatorOptions, ListboxItemIndicatorProps as ComboboxItemIndicatorProps, ListboxItemIndicatorRenderProps as ComboboxItemIndicatorRenderProps, ListboxItemLabelCommonProps as ComboboxItemLabelCommonProps, ListboxItemLabelOptions as ComboboxItemLabelOptions, ListboxItemLabelProps as ComboboxItemLabelProps, ListboxItemLabelRenderProps as ComboboxItemLabelRenderProps, ListboxItemOptions as ComboboxItemOptions, ListboxItemProps as ComboboxItemProps, ListboxItemRenderProps as ComboboxItemRenderProps, FormControlLabelCommonProps as ComboboxLabelCommonProps, FormControlLabelOptions as ComboboxLabelOptions, FormControlLabelProps as ComboboxLabelProps, FormControlLabelRenderProps as ComboboxLabelRenderProps, ComboboxListboxCommonProps, ComboboxListboxOptions, ComboboxListboxProps, ComboboxListboxRenderProps, ComboboxMultipleSelectionOptions, ComboboxPortalProps, ComboboxRootCommonProps, ComboboxBaseItemComponentProps as ComboboxRootItemComponentProps, ComboboxRootOptions, ComboboxRootProps, ComboboxRootRenderProps, ComboboxBaseSectionComponentProps as ComboboxRootSectionComponentProps, ListboxSectionCommonProps as ComboboxSectionCommonProps, ListboxSectionOptions as ComboboxSectionOptions, ListboxSectionProps as ComboboxSectionProps, ListboxSectionRenderProps as ComboboxSectionRenderProps, ComboboxSingleSelectionOptions, ComboboxTriggerCommonProps, ComboboxTriggerMode, ComboboxTriggerOptions, ComboboxTriggerProps, ComboboxTriggerRenderProps, ComboboxContent as Content, ComboboxControl as Control, FormControlDescription as Description, FormControlErrorMessage as ErrorMessage, ComboboxHiddenSelect as HiddenSelect, ComboboxIcon as Icon, ComboboxInput as Input, ListboxItem as Item, ListboxItemDescription as ItemDescription, ListboxItemIndicator as ItemIndicator, ListboxItemLabel as ItemLabel, FormControlLabel as Label, ComboboxListbox as Listbox, ComboboxPortal as Portal, ComboboxRoot as Root, ListboxSection as Section, ComboboxTrigger as Trigger, useComboboxContext };
}
declare const Combobox: typeof ComboboxRoot & {
  Arrow: typeof PopperArrow;
  Content: typeof ComboboxContent;
  Control: typeof ComboboxControl;
  Description: typeof FormControlDescription;
  ErrorMessage: typeof FormControlErrorMessage;
  HiddenSelect: typeof ComboboxHiddenSelect;
  Icon: typeof ComboboxIcon;
  Input: typeof ComboboxInput;
  Item: typeof ListboxItem;
  ItemDescription: typeof ListboxItemDescription;
  ItemIndicator: typeof ListboxItemIndicator;
  ItemLabel: typeof ListboxItemLabel;
  Label: typeof FormControlLabel;
  Listbox: typeof ComboboxListbox;
  Portal: typeof ComboboxPortal;
  Section: typeof ListboxSection;
  Trigger: typeof ComboboxTrigger;
};
//#endregion
export { ComboboxTriggerOptions as a, ComboboxTriggerCommonProps as i, index_d_exports as n, ComboboxTriggerProps as o, ComboboxTrigger as r, ComboboxTriggerRenderProps as s, Combobox as t };