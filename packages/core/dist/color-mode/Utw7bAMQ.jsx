import { createContext, createEffect, createMemo, createSignal, merge, onCleanup, useContext } from "solid-js";
import { isServer } from "@solidjs/web";
//#region src/color-mode/color-mode-context.tsx
const ColorModeContext = createContext();
/**
* Primitive that reads from `ColorModeProvider` context,
* Returns the color mode and function to toggle it.
*/
function useColorMode() {
	const context = useContext(ColorModeContext);
	if (context === void 0) throw new Error("[kobalte]: `useColorMode` must be used within a `ColorModeProvider`");
	return context;
}
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
function useColorModeValue(light, dark) {
	const { colorMode } = useColorMode();
	return createMemo(() => colorMode() === "dark" ? dark : light);
}
//#endregion
//#region src/color-mode/storage-manager.ts
const COLOR_MODE_STORAGE_KEY = "kb-color-mode";
function createLocalStorageManager(key) {
	return {
		ssr: false,
		type: "localStorage",
		get: (fallback) => {
			if (isServer) return fallback;
			let value;
			try {
				value = localStorage.getItem(key);
			} catch (_) {}
			return value ?? fallback;
		},
		set: (value) => {
			try {
				localStorage.setItem(key, value);
			} catch (_e) {}
		}
	};
}
const localStorageManager = createLocalStorageManager(COLOR_MODE_STORAGE_KEY);
function parseCookie(cookie, key) {
	return cookie.match(new RegExp(`(^| )${key}=([^;]+)`))?.[2];
}
function createCookieStorageManager(key, cookie) {
	return {
		ssr: !!cookie,
		type: "cookie",
		get: (fallback) => {
			if (cookie) return parseCookie(cookie, key) ?? fallback;
			if (isServer) return fallback;
			return parseCookie(document.cookie, key) ?? fallback;
		},
		set: (value) => {
			document.cookie = `${key}=${value}; max-age=31536000; path=/`;
		}
	};
}
const cookieStorageManager = createCookieStorageManager(COLOR_MODE_STORAGE_KEY);
function cookieStorageManagerSSR(cookie) {
	return createCookieStorageManager(COLOR_MODE_STORAGE_KEY, cookie);
}
//#endregion
//#region src/color-mode/utils.ts
const FALLBACK_COLOR_MODE_VALUE = "system";
function query() {
	return window.matchMedia("(prefers-color-scheme: dark)");
}
function preventTransition() {
	const css = document.createElement("style");
	css.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"));
	document.head.appendChild(css);
	return () => {
		(() => window.getComputedStyle(document.body))();
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				document.head.removeChild(css);
			});
		});
	};
}
function setColorModeDataset(value, shouldPreventTransition = true) {
	const cleanup = shouldPreventTransition ? preventTransition() : void 0;
	document.documentElement.dataset.kbTheme = value;
	document.documentElement.style.colorScheme = value;
	cleanup?.();
}
function getSystemColorMode(fallback) {
	return query().matches ?? fallback === "dark" ? "dark" : "light";
}
function getInitialColorMode(manager) {
	const fallback = "light";
	const initialColorMode = manager.get(fallback) ?? fallback;
	if (initialColorMode === "system") return isServer ? fallback : getSystemColorMode();
	return initialColorMode;
}
function addColorModeListener(fn) {
	const mql = query();
	const listener = (e) => {
		fn(e.matches ? "dark" : "light");
	};
	mql.addEventListener("change", listener);
	return () => {
		mql.removeEventListener("change", listener);
	};
}
//#endregion
//#region src/color-mode/color-mode-provider.tsx
/**
* Provides context for the color mode based on config in `theme`
* Returns the color mode and function to toggle the color mode
*/
function ColorModeProvider(props) {
	const fallbackColorMode = () => props.initialColorMode ?? "system";
	const colorModeManager = () => props.storageManager ?? localStorageManager;
	let colorModeListenerCleanupFn;
	const [colorMode, rawSetColorMode] = createSignal(getInitialColorMode(colorModeManager()));
	const applyColorMode = (value) => {
		rawSetColorMode(value);
		setColorModeDataset(value, props.disableTransitionOnChange);
	};
	const setColorMode = (value) => {
		if (colorModeListenerCleanupFn) {
			colorModeListenerCleanupFn();
			colorModeListenerCleanupFn = void 0;
		}
		const isSystem = value === "system";
		if (isSystem) colorModeListenerCleanupFn = addColorModeListener(applyColorMode);
		applyColorMode(isSystem ? getSystemColorMode() : value);
		colorModeManager().set(value);
	};
	const toggleColorMode = () => {
		setColorMode(colorMode() === "dark" ? "light" : "dark");
	};
	createEffect(() => colorModeManager().get() ?? fallbackColorMode(), (mode) => {
		setColorMode(mode);
	});
	onCleanup(() => {
		colorModeListenerCleanupFn?.();
	});
	const context = {
		colorMode,
		setColorMode,
		toggleColorMode
	};
	return <ColorModeContext value={context}>{props.children}</ColorModeContext>;
}
//#endregion
//#region src/color-mode/color-mode-script.tsx
const VALID_VALUES = /* @__PURE__ */ new Set([
	"light",
	"dark",
	"system"
]);
/**
* runtime safe-guard against invalid color mode values
*/
function normalize(initialColorMode) {
	if (!VALID_VALUES.has(initialColorMode)) return FALLBACK_COLOR_MODE_VALUE;
	return initialColorMode;
}
function ColorModeScript(props) {
	const mergedProps = merge({
		initialColorMode: FALLBACK_COLOR_MODE_VALUE,
		storageType: "localStorage",
		storageKey: COLOR_MODE_STORAGE_KEY
	}, props);
	const scriptSrc = createMemo(() => {
		const init = normalize(mergedProps.initialColorMode);
		const cookieScript = `(function(){try{var a=function(o){var l="(prefers-color-scheme: dark)",v=window.matchMedia(l).matches?"dark":"light",e=o==="system"?v:o,d=document.documentElement,s=e==="dark";return d.style.colorScheme=e,d.dataset.kbTheme=e,o},u=a,h="${init}",r="${mergedProps.storageKey}",t=document.cookie.match(new RegExp("(^| )".concat(r,"=([^;]+)"))),c=t?t[2]:null;c?a(c):document.cookie="".concat(r,"=").concat(a(h),"; max-age=31536000; path=/")}catch(a){}})();`;
		const localStorageScript = `(function(){try{var a=function(c){var v="(prefers-color-scheme: dark)",h=window.matchMedia(v).matches?"dark":"light",r=c==="system"?h:c,o=document.documentElement,i=r==="dark";return o.style.colorScheme=r,o.dataset.kbTheme=r,c},n=a,m="${init}",e="${mergedProps.storageKey}",t=localStorage.getItem(e);t?a(t):localStorage.setItem(e,a(m))}catch(a){}})();`;
		return `!${mergedProps.storageType === "cookie" ? cookieScript : localStorageScript}`.trim();
	});
	return <script id="kb-color-mode-script" nonce={mergedProps.nonce} innerHTML={scriptSrc()} />;
}
//#endregion
export { cookieStorageManagerSSR as a, localStorageManager as c, useColorModeValue as d, cookieStorageManager as i, ColorModeContext as l, ColorModeProvider as n, createCookieStorageManager as o, COLOR_MODE_STORAGE_KEY as r, createLocalStorageManager as s, ColorModeScript as t, useColorMode as u };
