import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { a as FormControlLabelRenderProps, d as FormControlDescription, f as FormControlDescriptionCommonProps, h as FormControlDescriptionRenderProps, i as FormControlLabelProps, m as FormControlDescriptionProps, n as FormControlLabelCommonProps, p as FormControlDescriptionOptions, r as FormControlLabelOptions, t as FormControlLabel } from "../index/ZPox5oFC.js";
import { A as ComboboxInputOptions, C as ComboboxListbox, D as ComboboxListboxRenderProps, E as ComboboxListboxProps, F as ComboboxContentOptions, I as ComboboxContentProps, L as ComboboxContentRenderProps, M as ComboboxInputRenderProps, N as ComboboxContent, O as ComboboxInput, P as ComboboxContentCommonProps, S as ComboboxPortalProps, T as ComboboxListboxOptions, V as ComboboxTriggerMode, _ as ComboboxBaseItemComponentProps, b as ComboboxBaseSectionComponentProps, c as ComboboxIcon, d as ComboboxHiddenSelectProps, f as ComboboxControl, g as ComboboxControlRenderProps, h as ComboboxControlProps, j as ComboboxInputProps, k as ComboboxInputCommonProps, l as ComboboxIconProps, m as ComboboxControlOptions, p as ComboboxControlCommonProps, s as ComboboxSingleSelectionOptions, t as ComboboxMultipleSelectionOptions, u as ComboboxHiddenSelect, v as ComboboxBaseOptions, w as ComboboxListboxCommonProps, x as ComboboxPortal, y as ComboboxBaseRenderProps } from "../combobox-root/DbzRduU8.js";
import { A as ListboxItem, D as ListboxItemDescriptionOptions, E as ListboxItemDescriptionCommonProps, M as ListboxItemOptions, N as ListboxItemProps, O as ListboxItemDescriptionProps, P as ListboxItemRenderProps, T as ListboxItemDescription, _ as ListboxItemLabelOptions, a as ListboxSection, c as ListboxSectionProps, g as ListboxItemLabelCommonProps, h as ListboxItemLabel, j as ListboxItemCommonProps, k as ListboxItemDescriptionRenderProps, l as ListboxSectionRenderProps, o as ListboxSectionCommonProps, s as ListboxSectionOptions, v as ListboxItemLabelProps, y as ListboxItemLabelRenderProps } from "../index/BczgaXlZ.js";
import { f as PopperArrowOptions, p as PopperArrowProps, u as PopperArrow } from "../index/DTS_JDht.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor } from "solid-js";
//#region src/search/search-indicator.d.ts
interface SearchIndicatorOptions {}
interface SearchIndicatorCommonProps<_T extends HTMLElement = HTMLElement> {
  children: JSX$1.Element;
  loadingComponent?: JSX$1.Element;
}
type SearchIndicatorProps<T extends ValidComponent | HTMLElement = HTMLElement> = SearchIndicatorOptions & Partial<SearchIndicatorCommonProps<ElementOf<T>>>;
declare function SearchIndicator<T extends ValidComponent = "div">(props: PolymorphicProps<T, SearchIndicatorProps<T>>): JSX$1.Element;
//#endregion
//#region src/search/search-no-result.d.ts
interface SearchNoResultOptions {}
interface SearchNoResultCommonProps<_T extends HTMLElement = HTMLElement> {}
type SearchNoResultProps<T extends ValidComponent | HTMLElement = HTMLElement> = SearchNoResultOptions & Partial<SearchNoResultCommonProps<ElementOf<T>>>;
/**
 * Displayed in portal when no options are presented
 */
declare function SearchNoResult<T extends ValidComponent = "span">(props: PolymorphicProps<T, SearchNoResultProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/search/search-root.d.ts
interface SearchBaseOptions<Option, OptGroup = never> extends Omit<ComboboxBaseOptions<Option, OptGroup>, "defaultFilter"> {
  /** Debounces input before making suggestions */
  debounceOptionsMillisecond?: number;
}
type SearchRootOptions<Option, OptGroup = never> = (ComboboxSingleSelectionOptions<Option> | ComboboxMultipleSelectionOptions<Option>) & Omit<SearchBaseOptions<Option, OptGroup>, "value" | "defaultValue" | "onChange" | "selectionMode">;
interface SearchRootCommonProps<_T extends HTMLElement = HTMLElement> {}
interface SearchRootRenderProps extends SearchRootCommonProps, ComboboxBaseRenderProps {}
type SearchRootProps<Option, OptGroup = never, T extends ValidComponent | HTMLElement = HTMLElement> = SearchRootOptions<Option, OptGroup> & Partial<SearchRootCommonProps<ElementOf<T>>>;
/**
 * A search is a combobox where the filter is external.
 */
declare function SearchRoot<Option, OptGroup = never, T extends ValidComponent = "div">(props: PolymorphicProps<T, SearchRootProps<Option, OptGroup, T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/search/search-context.d.ts
interface SearchContextValue {
  /** No results found */
  noResult: Accessor<boolean>;
  /** Are we currently loading suggestions? */
  isLoadingSuggestions: Accessor<boolean>;
}
export declare function useSearchContext(): SearchContextValue;
//#endregion
//#region src/search/index.d.ts
export declare const Search: typeof SearchRoot & {
  Arrow: typeof PopperArrow;
  Content: typeof ComboboxContent;
  Control: typeof ComboboxControl;
  Description: typeof FormControlDescription;
  HiddenSelect: typeof ComboboxHiddenSelect;
  Icon: typeof ComboboxIcon;
  Input: typeof ComboboxInput;
  Item: typeof ListboxItem;
  ItemDescription: typeof ListboxItemDescription;
  ItemLabel: typeof ListboxItemLabel;
  Label: typeof FormControlLabel;
  Listbox: typeof ComboboxListbox;
  Portal: typeof ComboboxPortal;
  Section: typeof ListboxSection;
  NoResult: typeof SearchNoResult;
  Indicator: typeof SearchIndicator;
};
//#endregion
export { PopperArrow as Arrow, ComboboxContent as Content, ComboboxControl as Control, FormControlDescription as Description, ComboboxHiddenSelect as HiddenSelect, ComboboxIcon as Icon, SearchIndicator as Indicator, ComboboxInput as Input, ListboxItem as Item, ListboxItemDescription as ItemDescription, ListboxItemLabel as ItemLabel, FormControlLabel as Label, ComboboxListbox as Listbox, SearchNoResult as NoResult, ComboboxPortal as Portal, SearchRoot as Root, type PopperArrowOptions as SearchArrowOptions, type PopperArrowProps as SearchArrowProps, type ComboboxContentCommonProps as SearchContentCommonProps, type ComboboxContentOptions as SearchContentOptions, type ComboboxContentProps as SearchContentProps, type ComboboxContentRenderProps as SearchContentRenderProps, type SearchContextValue, type ComboboxControlCommonProps as SearchControlCommonProps, type ComboboxControlOptions as SearchControlOptions, type ComboboxControlProps as SearchControlProps, type ComboboxControlRenderProps as SearchControlRenderProps, type FormControlDescriptionCommonProps as SearchDescriptionCommonProps, type FormControlDescriptionOptions as SearchDescriptionOptions, type FormControlDescriptionProps as SearchDescriptionProps, type FormControlDescriptionRenderProps as SearchDescriptionRenderProps, type ComboboxHiddenSelectProps as SearchHiddenSelectProps, type ComboboxIconProps as SearchIconProps, type SearchIndicatorCommonProps, type SearchIndicatorOptions, type SearchIndicatorProps, type ComboboxInputCommonProps as SearchInputCommonProps, type ComboboxInputOptions as SearchInputOptions, type ComboboxInputProps as SearchInputProps, type ComboboxInputRenderProps as SearchInputRenderProps, type ListboxItemCommonProps as SearchItemCommonProps, type ListboxItemDescriptionCommonProps as SearchItemDescriptionCommonProps, type ListboxItemDescriptionOptions as SearchItemDescriptionOptions, type ListboxItemDescriptionProps as SearchItemDescriptionProps, type ListboxItemDescriptionRenderProps as SearchItemDescriptionRenderProps, type ListboxItemLabelCommonProps as SearchItemLabelCommonProps, type ListboxItemLabelOptions as SearchItemLabelOptions, type ListboxItemLabelProps as SearchItemLabelProps, type ListboxItemLabelRenderProps as SearchItemLabelRenderProps, type ListboxItemOptions as SearchItemOptions, type ListboxItemProps as SearchItemProps, type ListboxItemRenderProps as SearchItemRenderProps, type FormControlLabelCommonProps as SearchLabelCommonProps, type FormControlLabelOptions as SearchLabelOptions, type FormControlLabelProps as SearchLabelProps, type FormControlLabelRenderProps as SearchLabelRenderProps, type ComboboxListboxCommonProps as SearchListboxCommonProps, type ComboboxListboxOptions as SearchListboxOptions, type ComboboxListboxProps as SearchListboxProps, type ComboboxListboxRenderProps as SearchListboxRenderProps, type ComboboxMultipleSelectionOptions as SearchMultipleSelectionOptions, type SearchNoResultCommonProps, type SearchNoResultOptions, type SearchNoResultProps, type ComboboxPortalProps as SearchPortalProps, type SearchRootCommonProps, type ComboboxBaseItemComponentProps as SearchRootItemComponentProps, type SearchRootOptions, type SearchRootProps, type SearchRootRenderProps, type ComboboxBaseSectionComponentProps as SearchRootSectionComponentProps, type ListboxSectionCommonProps as SearchSectionCommonProps, type ListboxSectionOptions as SearchSectionOptions, type ListboxSectionProps as SearchSectionProps, type ListboxSectionRenderProps as SearchSectionRenderProps, type ComboboxSingleSelectionOptions as SearchSingleSelectionOptions, type ComboboxTriggerMode as SearchTriggerMode, ListboxSection as Section };