import { Accessor, Element } from "solid-js";
import { MaybeAccessor } from "@solid-primitives/utils";
import { BaseArrayDict, BaseDict, BaseRecordDict, BaseTemplateArgs, ChainedTranslator, Flatten, NullableChainedTranslator, NullableResolver, NullableTranslator, Prefixed, Resolver, Scoped, Scopes, Template, TemplateArgs, TemplateResolver, Translator, chainedTranslator, flatten, identityResolveTemplate, prefix, proxyTranslator, resolveTemplate, scopedTranslator, template, translator } from "@solid-primitives/i18n";
import { NumberFormatOptions } from "@internationalized/number";
//#region src/i18n/create-collator.d.ts
/**
 * Provides localized string collation for the current locale. Automatically updates when the locale changes,
 * and handles caching of the collator for performance.
 * @param options - Collator options.
 */
declare function createCollator(options?: Intl.CollatorOptions): Accessor<Intl.Collator>;
//#endregion
//#region src/i18n/create-date-formatter.d.ts
/**
 * Provides localized date formatting for the current locale. Automatically updates when the locale changes,
 * and handles caching of the date formatter for performance.
 * @param options - Formatting options.
 */
declare function createDateFormatter(options: MaybeAccessor<Intl.DateTimeFormatOptions>): Accessor<Intl.DateTimeFormat>;
//#endregion
//#region src/i18n/utils.d.ts
type Direction = "rtl" | "ltr";
declare const RTL_LANGS: Set<string>;
/**
 * Determines if a locale is read right to left using [Intl.Locale]
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale}.
 */
declare function isRTL(locale: string): boolean;
declare function getReadingDirection(locale: string): Direction;
//#endregion
//#region src/i18n/create-default-locale.d.ts
interface Locale {
  /** The [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) language code for the locale. */
  locale: string;
  /** The writing direction for the locale. */
  direction: Direction;
}
/**
 * Gets the locale setting of the browser.
 */
declare function getDefaultLocale(): Locale;
/**
 * Returns an accessor for the current browser/system language, and updates when it changes.
 */
declare function createDefaultLocale(): {
  locale: () => string;
  direction: () => Direction;
};
//#endregion
//#region src/i18n/create-filter.d.ts
interface Filter {
  /** Returns whether a string starts with a given substring. */
  startsWith(string: string, substring: string): boolean;
  /** Returns whether a string ends with a given substring. */
  endsWith(string: string, substring: string): boolean;
  /** Returns whether a string contains a given substring. */
  contains(string: string, substring: string): boolean;
}
/**
 * Provides localized string search functionality that is useful for filtering or matching items
 * in a list. Options can be provided to adjust the sensitivity to case, diacritics, and other parameters.
 */
declare function createFilter(options?: Intl.CollatorOptions): Filter;
//#endregion
//#region src/i18n/create-number-formatter.d.ts
/**
 * Provides localized number formatting for the current locale. Automatically updates when the locale changes,
 * and handles caching of the number formatter for performance.
 * @param options - Formatting options.
 */
declare function createNumberFormatter(options: MaybeAccessor<NumberFormatOptions>): Accessor<Intl.NumberFormat>;
//#endregion
//#region src/i18n/i18n-provider.d.ts
interface I18nProviderProps {
  /** Contents that should have the locale applied. */
  children?: Element;
  /** The locale to apply to the children. */
  locale?: string;
}
interface I18nContextValue {
  /** The [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) language code for the locale. */
  locale: Accessor<string>;
  /** The writing direction for the locale. */
  direction: Accessor<Direction>;
}
/**
 * Provides the locale for the application to all child components.
 */
declare function I18nProvider(props: I18nProviderProps): import("@solidjs/web").JSX.Element;
/**
 * Returns an accessor for the current locale and layout direction.
 */
declare function useLocale(): I18nContextValue;
//#endregion
export { Filter as A, resolveTemplate as C, I18nProvider as D, translator as E, RTL_LANGS as F, getReadingDirection as I, isRTL as L, createDefaultLocale as M, getDefaultLocale as N, useLocale as O, Direction as P, createDateFormatter as R, proxyTranslator as S, template as T, Translator as _, ChainedTranslator as a, identityResolveTemplate as b, NullableResolver as c, Resolver as d, Scoped as f, TemplateResolver as g, TemplateArgs as h, BaseTemplateArgs as i, createFilter as j, createNumberFormatter as k, NullableTranslator as l, Template as m, BaseDict as n, Flatten as o, Scopes as p, BaseRecordDict as r, NullableChainedTranslator as s, BaseArrayDict as t, Prefixed as u, chainedTranslator as v, scopedTranslator as w, prefix as x, flatten as y, createCollator as z };