import { Polymorphic } from "../polymorphic/index.js";
import { t as FormControlDescription } from "../form-control-description/BQ1mcKaU.js";
import { t as FormControlLabel } from "../form-control-label/DqQ24y8m.js";
import { i as PopperArrow } from "../popper/BTyI8BKK.js";
import { a as ComboboxPortal, c as ComboboxContent, i as ComboboxControl, n as ComboboxIcon, o as ComboboxListbox, r as ComboboxHiddenSelect, s as ComboboxInput, t as ComboboxBase } from "../combobox-base/DbupzOWZ.js";
import { a as ListboxItemLabel, c as ListboxItem, r as ListboxSection, s as ListboxItemDescription } from "../listbox/CwQ1v5ER.js";
import { createComponent, mergeProps } from "@solidjs/web";
import { Show, createContext, createEffect, createMemo, createSignal, omit, useContext } from "solid-js";
//#region src/search/search-context.tsx
const SearchContext = createContext();
function useSearchContext() {
	const context = useContext(SearchContext);
	if (context === void 0) throw new Error("[kobalte]: `useSearchContext` must be used within a `Search` component");
	return context;
}
//#endregion
//#region src/search/search-indicator.tsx
function SearchIndicator(props) {
	const other = omit(props, "loadingComponent");
	const context = useSearchContext();
	return createComponent(Polymorphic, mergeProps({
		as: "span",
		"aria-hidden": "true"
	}, other, { get children() {
		return createComponent(Show, {
			get when() {
				return context.isLoadingSuggestions() === false || !props.loadingComponent;
			},
			get fallback() {
				return props.loadingComponent;
			},
			get children() {
				return props.children;
			}
		});
	} }));
}
//#endregion
//#region src/search/search-no-result.tsx
/**
* Displayed in portal when no options are presented
*/
function SearchNoResult(props) {
	const context = useSearchContext();
	return createComponent(Show, {
		get when() {
			return context.noResult();
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({ as: "div" }, props));
		}
	});
}
//#endregion
//#region src/search/utils.ts
const DebouncerTimeout = () => {
	let _debounceMillisecond = 0;
	let lastCallbackTime = 0;
	let timeout;
	return {
		debounce: (callback) => {
			if (lastCallbackTime > Date.now() - _debounceMillisecond) clearTimeout(timeout);
			timeout = setTimeout(callback, _debounceMillisecond);
			lastCallbackTime = Date.now();
			return timeout;
		},
		setDebounceMillisecond: (debounceMillisecond = 0) => {
			_debounceMillisecond = debounceMillisecond;
		}
	};
};
//#endregion
//#region src/search/search-root.tsx
/**
* A search is a combobox where the filter is external.
*/
function SearchRoot(props) {
	const others = omit(props, "options", "value", "defaultValue", "onChange", "multiple", "onInputChange", "debounceOptionsMillisecond", "defaultFilter");
	const [isLoadingSuggestions, setIsLoadingSuggestions] = createSignal(false);
	const [suggestionTimeout, setSuggestionTimeout] = createSignal();
	const inputChangeDebouncer = DebouncerTimeout();
	createEffect(() => props.debounceOptionsMillisecond, (value) => inputChangeDebouncer.setDebounceMillisecond(value));
	const onInputChange = (value) => {
		if (props.onInputChange === void 0) return;
		if (!props.debounceOptionsMillisecond) {
			props.onInputChange(value);
			return;
		}
		setIsLoadingSuggestions(true);
		const timeout = inputChangeDebouncer.debounce(async () => {
			await props.onInputChange(value);
			setIsLoadingSuggestions(false);
		});
		setSuggestionTimeout(timeout);
	};
	const value = createMemo(() => {
		if (props.value != null) return props.multiple ? props.value : [props.value];
		return props.value;
	});
	const defaultValue = createMemo(() => {
		if (props.defaultValue != null) return props.multiple ? props.defaultValue : [props.defaultValue];
		return props.defaultValue;
	});
	const onChange = (value) => {
		clearTimeout(suggestionTimeout());
		setIsLoadingSuggestions(false);
		if (props.multiple) props.onChange?.(value ?? []);
		else props.onChange?.(value[0] ?? null);
	};
	const noResult = () => props.options.length === 0;
	return createComponent(SearchContext, {
		value: {
			noResult,
			isLoadingSuggestions
		},
		get children() {
			return createComponent(ComboboxBase, mergeProps({
				closeOnSelection: true,
				shouldFocusWrap: true,
				noResetInputOnBlur: true,
				allowsEmptyCollection: true,
				get options() {
					return props.options;
				},
				get value() {
					return value();
				},
				get defaultValue() {
					return defaultValue();
				},
				onInputChange,
				defaultFilter: () => true,
				onChange,
				get selectionMode() {
					return props.multiple ? "multiple" : "single";
				}
			}, others));
		}
	});
}
//#endregion
//#region src/search/index.tsx
const Search = Object.assign(SearchRoot, {
	Arrow: PopperArrow,
	Content: ComboboxContent,
	Control: ComboboxControl,
	Description: FormControlDescription,
	HiddenSelect: ComboboxHiddenSelect,
	Icon: ComboboxIcon,
	Input: ComboboxInput,
	Item: ListboxItem,
	ItemDescription: ListboxItemDescription,
	ItemLabel: ListboxItemLabel,
	Label: FormControlLabel,
	Listbox: ComboboxListbox,
	Portal: ComboboxPortal,
	Section: ListboxSection,
	NoResult: SearchNoResult,
	Indicator: SearchIndicator
});
//#endregion
export { PopperArrow as Arrow, ComboboxContent as Content, ComboboxControl as Control, FormControlDescription as Description, ComboboxHiddenSelect as HiddenSelect, ComboboxIcon as Icon, SearchIndicator as Indicator, ComboboxInput as Input, ListboxItem as Item, ListboxItemDescription as ItemDescription, ListboxItemLabel as ItemLabel, FormControlLabel as Label, ComboboxListbox as Listbox, SearchNoResult as NoResult, ComboboxPortal as Portal, SearchRoot as Root, Search, ListboxSection as Section, useSearchContext };
