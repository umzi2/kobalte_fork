import { createComponent, isServer } from "@solidjs/web";
import { createContext, createMemo, createSignal, onSettled, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { chainedTranslator, flatten, identityResolveTemplate, prefix, proxyTranslator, resolveTemplate, scopedTranslator, template, translator } from "@solid-primitives/i18n";
import { NumberFormatter } from "@internationalized/number";
//#region src/i18n/utils.ts
const RTL_SCRIPTS = /* @__PURE__ */ new Set([
	"Avst",
	"Arab",
	"Armi",
	"Syrc",
	"Samr",
	"Mand",
	"Thaa",
	"Mend",
	"Nkoo",
	"Adlm",
	"Rohg",
	"Hebr"
]);
const RTL_LANGS = /* @__PURE__ */ new Set([
	"ae",
	"ar",
	"arc",
	"bcc",
	"bqi",
	"ckb",
	"dv",
	"fa",
	"glk",
	"he",
	"ku",
	"mzn",
	"nqo",
	"pnb",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi"
]);
/**
* Determines if a locale is read right to left using [Intl.Locale]
* {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale}.
*/
function isRTL(locale) {
	if (Intl.Locale) {
		const script = new Intl.Locale(locale).maximize().script ?? "";
		return RTL_SCRIPTS.has(script);
	}
	const lang = locale.split("-")[0];
	return RTL_LANGS.has(lang);
}
function getReadingDirection(locale) {
	return isRTL(locale) ? "rtl" : "ltr";
}
//#endregion
//#region src/i18n/create-default-locale.ts
/**
* Gets the locale setting of the browser.
*/
function getDefaultLocale() {
	let locale = typeof navigator !== "undefined" && (navigator.language || navigator.userLanguage) || "en-US";
	try {
		Intl.DateTimeFormat.supportedLocalesOf([locale]);
	} catch (_err) {
		locale = "en-US";
	}
	return {
		locale,
		direction: getReadingDirection(locale)
	};
}
let currentLocale = getDefaultLocale();
const listeners = /* @__PURE__ */ new Set();
function updateLocale() {
	currentLocale = getDefaultLocale();
	for (const listener of listeners) listener(currentLocale);
}
/**
* Returns an accessor for the current browser/system language, and updates when it changes.
*/
function createDefaultLocale() {
	const defaultSSRLocale = {
		locale: "en-US",
		direction: "ltr"
	};
	const [defaultClientLocale, setDefaultClientLocale] = createSignal(currentLocale);
	const defaultLocale = createMemo(() => isServer ? defaultSSRLocale : defaultClientLocale());
	onSettled(() => {
		if (listeners.size === 0) window.addEventListener("languagechange", updateLocale);
		listeners.add(setDefaultClientLocale);
		return () => {
			listeners.delete(setDefaultClientLocale);
			if (listeners.size === 0) window.removeEventListener("languagechange", updateLocale);
		};
	});
	return {
		locale: () => defaultLocale().locale,
		direction: () => defaultLocale().direction
	};
}
//#endregion
//#region src/i18n/i18n-provider.tsx
const I18nContext = createContext({
	locale: () => getDefaultLocale().locale,
	direction: () => getDefaultLocale().direction
});
/**
* Provides the locale for the application to all child components.
*/
function I18nProvider(props) {
	const defaultLocale = createDefaultLocale();
	return createComponent(I18nContext, {
		value: {
			locale: () => props.locale ?? defaultLocale.locale(),
			direction: () => props.locale ? getReadingDirection(props.locale) : defaultLocale.direction()
		},
		get children() {
			return props.children;
		}
	});
}
/**
* Returns an accessor for the current locale and layout direction.
*/
function useLocale() {
	return useContext(I18nContext);
}
//#endregion
//#region src/i18n/create-collator.ts
const cache = /* @__PURE__ */ new Map();
/**
* Provides localized string collation for the current locale. Automatically updates when the locale changes,
* and handles caching of the collator for performance.
* @param options - Collator options.
*/
function createCollator(options) {
	const { locale } = useLocale();
	const cacheKey = createMemo(() => {
		return locale() + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
	});
	return createMemo(() => {
		const key = cacheKey();
		let collator;
		if (cache.has(key)) collator = cache.get(key);
		if (!collator) {
			collator = new Intl.Collator(locale(), options);
			cache.set(key, collator);
		}
		return collator;
	});
}
//#endregion
//#region src/i18n/create-date-formatter.ts
/**
* Provides localized date formatting for the current locale. Automatically updates when the locale changes,
* and handles caching of the date formatter for performance.
* @param options - Formatting options.
*/
function createDateFormatter(options) {
	const { locale } = useLocale();
	return createMemo(() => new Intl.DateTimeFormat(locale(), access(options)));
}
//#endregion
//#region src/i18n/create-filter.ts
/**
* Provides localized string search functionality that is useful for filtering or matching items
* in a list. Options can be provided to adjust the sensitivity to case, diacritics, and other parameters.
*/
function createFilter(options) {
	const collator = createCollator({
		usage: "search",
		...options
	});
	const startsWith = (str, substr) => {
		if (substr.length === 0) return true;
		const normalizedStr = str.normalize("NFC");
		const normalizedSubstr = substr.normalize("NFC");
		return collator().compare(normalizedStr.slice(0, normalizedSubstr.length), normalizedSubstr) === 0;
	};
	const endsWith = (str, substr) => {
		if (substr.length === 0) return true;
		const normalizedStr = str.normalize("NFC");
		const normalizedSubstr = substr.normalize("NFC");
		return collator().compare(normalizedStr.slice(-normalizedSubstr.length), normalizedSubstr) === 0;
	};
	const contains = (str, substr) => {
		if (substr.length === 0) return true;
		const normalizedStr = str.normalize("NFC");
		const normalizedSubstr = substr.normalize("NFC");
		let scan = 0;
		const sliceLen = substr.length;
		for (; scan + sliceLen <= normalizedStr.length; scan++) {
			const slice = normalizedStr.slice(scan, scan + sliceLen);
			if (collator().compare(normalizedSubstr, slice) === 0) return true;
		}
		return false;
	};
	return {
		startsWith,
		endsWith,
		contains
	};
}
//#endregion
//#region src/i18n/create-number-formatter.ts
/**
* Provides localized number formatting for the current locale. Automatically updates when the locale changes,
* and handles caching of the number formatter for performance.
* @param options - Formatting options.
*/
function createNumberFormatter(options) {
	const { locale } = useLocale();
	return createMemo(() => new NumberFormatter(locale(), access(options)));
}
//#endregion
export { I18nProvider, RTL_LANGS, chainedTranslator, createCollator, createDateFormatter, createDefaultLocale, createFilter, createNumberFormatter, flatten, getDefaultLocale, getReadingDirection, identityResolveTemplate, isRTL, prefix, proxyTranslator, resolveTemplate, scopedTranslator, template, translator, useLocale };
