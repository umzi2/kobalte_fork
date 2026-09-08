import { Accessor, ParentProps } from "solid-js";
//#region src/color-mode/types.d.ts
export type ColorMode = "light" | "dark";
export type ConfigColorMode = ColorMode | "system";
export type MaybeConfigColorMode = ConfigColorMode | undefined;
export interface ColorModeStorageManager {
  /** The type of storage. */
  type: "cookie" | "localStorage";
  /** Whether it's an SSR environment. */
  ssr?: boolean;
  /** Get the color mode from the storage. */
  get: (fallback?: ConfigColorMode) => MaybeConfigColorMode;
  /** Save the color mode in the storage. */
  set: (value: ConfigColorMode) => void;
}
export interface ColorModeContextType {
  colorMode: Accessor<ColorMode>;
  setColorMode: (value: ConfigColorMode) => void;
  toggleColorMode: () => void;
}
export interface ColorModeOptions {
  /** The initial color mode to use. */
  initialColorMode?: ConfigColorMode;
  /** Whether css transitions should be disabled during the color mode changes. */
  disableTransitionOnChange?: boolean;
  /** The color mode storage manager, either localStorage or cookie. */
  storageManager?: ColorModeStorageManager;
}
export type ColorModeProviderProps = ParentProps<ColorModeOptions>;
export type ColorModeScriptProps = {
  /** The initial color mode to use. */
  initialColorMode?: ConfigColorMode;
  /** The type of the color mode storage manager, either localStorage or cookie. */
  storageType?: "localStorage" | "cookie";
  /** The key used to store color mode preference in localStorage or cookie. */
  storageKey?: string;
  nonce?: string;
};
//#endregion
//#region src/color-mode/color-mode-context.d.ts
export declare const ColorModeContext: import("solid-js").Context<ColorModeContextType>;
/**
 * Primitive that reads from `ColorModeProvider` context,
 * Returns the color mode and function to toggle it.
 */
export declare function useColorMode(): ColorModeContextType;
/**
 * Change value based on color mode.
 *
 * @param light the light mode value
 * @param dark the dark mode value
 * @return A memoized value based on the color mode.
 *
 * @example
 *
 * ```js
 * const Icon = useColorModeValue(MoonIcon, SunIcon)
 * ```
 */
export declare function useColorModeValue<TLight = unknown, TDark = unknown>(light: TLight, dark: TDark): import("solid-js").SourceAccessor<TDark | TLight>;
//#endregion
//#region src/color-mode/color-mode-provider.d.ts
/**
 * Provides context for the color mode based on config in `theme`
 * Returns the color mode and function to toggle the color mode
 */
export declare function ColorModeProvider(props: ColorModeProviderProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/color-mode/color-mode-script.d.ts
export declare function ColorModeScript(props: ColorModeScriptProps): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/color-mode/storage-manager.d.ts
export declare const COLOR_MODE_STORAGE_KEY = "kb-color-mode";
export declare function createLocalStorageManager(key: string): ColorModeStorageManager;
export declare const localStorageManager: ColorModeStorageManager;
export declare function createCookieStorageManager(key: string, cookie?: string): ColorModeStorageManager;
export declare const cookieStorageManager: ColorModeStorageManager;
export declare function cookieStorageManagerSSR(cookie: string): ColorModeStorageManager;
//#endregion