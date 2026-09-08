import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { createComponent, memo, mergeProps } from "@solidjs/web";
import { Show, createContext, createEffect, createSignal, omit, useContext } from "solid-js";
//#region src/image/image-context.tsx
const ImageContext = createContext();
function useImageContext() {
	const context = useContext(ImageContext);
	if (context === void 0) throw new Error("[kobalte]: `useImageContext` must be used within an `Image.Root` component");
	return context;
}
//#endregion
//#region src/image/image-fallback.tsx
/**
* An element that renders when the image hasn't loaded.
* This means whilst it's loading, or if there was an error.
*/
function ImageFallback(props) {
	const context = useImageContext();
	const [canRender, setCanRender] = createSignal(context.fallbackDelay() === void 0);
	createEffect(() => context.fallbackDelay(), (delayMs) => {
		if (delayMs !== void 0) {
			const timerId = window.setTimeout(() => setCanRender(true), delayMs);
			return () => window.clearTimeout(timerId);
		}
	});
	return createComponent(Show, {
		get when() {
			return memo(() => !!canRender())() ? context.imageLoadingStatus() !== "loaded" : canRender();
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({ as: "span" }, props));
		}
	});
}
//#endregion
//#region src/image/image-img.tsx
/**
* The image to render. By default, it will only render when it has loaded.
*/
function ImageImg(props) {
	const context = useImageContext();
	const [loadingStatus, setLoadingStatus] = createSignal("idle");
	createEffect(() => props.src, (src) => {
		if (!src) {
			setLoadingStatus("error");
			return;
		}
		let isMounted = true;
		const image = new window.Image();
		const updateStatus = (status) => () => {
			if (!isMounted) return;
			setLoadingStatus(status);
		};
		setLoadingStatus("loading");
		if (props.crossOrigin !== void 0) image.crossOrigin = props.crossOrigin;
		if (props.referrerPolicy !== void 0) image.referrerPolicy = props.referrerPolicy;
		image.onload = updateStatus("loaded");
		image.onerror = updateStatus("error");
		image.src = src;
		return () => {
			isMounted = false;
		};
	});
	createEffect(() => loadingStatus(), (imageLoadingStatus) => {
		if (imageLoadingStatus !== "idle") context.onImageLoadingStatusChange(imageLoadingStatus);
	});
	return createComponent(Show, {
		get when() {
			return loadingStatus() === "loaded";
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({ as: "img" }, props));
		}
	});
}
//#endregion
//#region src/image/image-root.tsx
/**
* An image element with an optional fallback for loading and error status.
*/
function ImageRoot(props) {
	const others = omit(props, "fallbackDelay", "onLoadingStatusChange");
	const [imageLoadingStatus, setImageLoadingStatus] = createSignal("idle");
	return createComponent(ImageContext, {
		value: {
			fallbackDelay: () => props.fallbackDelay,
			imageLoadingStatus,
			onImageLoadingStatusChange: (status) => {
				setImageLoadingStatus(status);
				props.onLoadingStatusChange?.(status);
			}
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({ as: "span" }, others));
		}
	});
}
//#endregion
//#region src/image/index.tsx
var image_exports = /* @__PURE__ */ __exportAll({
	Fallback: () => ImageFallback,
	Image: () => Image,
	Img: () => ImageImg,
	Root: () => ImageRoot,
	useImageContext: () => useImageContext
});
const Image = Object.assign(ImageRoot, {
	Fallback: ImageFallback,
	Img: ImageImg
});
//#endregion
export { ImageFallback as a, ImageImg as i, image_exports as n, useImageContext as o, ImageRoot as r, Image as t };
