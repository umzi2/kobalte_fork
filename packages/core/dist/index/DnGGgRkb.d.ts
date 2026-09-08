import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { ValidComponent } from "@solidjs/web";
import { Accessor } from "solid-js";
//#region src/image/image-fallback.d.ts
interface ImageFallbackOptions {}
interface ImageFallbackCommonProps<_T extends HTMLElement = HTMLElement> {}
interface ImageFallbackRenderProps extends ImageFallbackCommonProps {}
type ImageFallbackProps<T extends ValidComponent | HTMLElement = HTMLElement> = ImageFallbackOptions & Partial<ImageFallbackCommonProps<ElementOf<T>>>;
/**
 * An element that renders when the image hasn't loaded.
 * This means whilst it's loading, or if there was an error.
 */
declare function ImageFallback<T extends ValidComponent = "span">(props: PolymorphicProps<T, ImageFallbackProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/image/image-img.d.ts
interface ImageImgOptions {}
interface ImageImgCommonProps<_T extends HTMLElement = HTMLElement> {
  src?: string;
}
interface ImageImgRenderProps extends ImageImgCommonProps {}
type ImageImgProps<T extends ValidComponent | HTMLElement = HTMLElement> = ImageImgOptions & Partial<ImageImgCommonProps<ElementOf<T>>>;
/**
 * The image to render. By default, it will only render when it has loaded.
 */
declare function ImageImg<T extends ValidComponent = "img">(props: PolymorphicProps<T, ImageImgProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/image/types.d.ts
type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";
//#endregion
//#region src/image/image-root.d.ts
interface ImageRootOptions {
  /**
   * The delay (in ms) before displaying the image fallback.
   * Useful if you notice a flash during loading for delaying rendering,
   * so it only appears for those with slower internet connections.
   */
  fallbackDelay?: number;
  /**
   * A callback providing information about the loading status of the image.
   * This is useful in case you want to control more precisely what to render as the image is loading.
   */
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}
interface ImageRootCommonProps<_T extends HTMLElement = HTMLElement> {}
interface ImageRootRenderProps extends ImageRootCommonProps {}
type ImageRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ImageRootOptions & Partial<ImageRootCommonProps<ElementOf<T>>>;
/**
 * An image element with an optional fallback for loading and error status.
 */
declare function ImageRoot<T extends ValidComponent = "span">(props: PolymorphicProps<T, ImageRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/image/image-context.d.ts
interface ImageContextValue {
  fallbackDelay: Accessor<number | undefined>;
  imageLoadingStatus: Accessor<ImageLoadingStatus>;
  onImageLoadingStatusChange: (status: ImageLoadingStatus) => void;
}
declare function useImageContext(): ImageContextValue;
declare namespace index_d_exports {
  export { ImageFallback as Fallback, Image, ImageContextValue, ImageFallbackCommonProps, ImageFallbackOptions, ImageFallbackProps, ImageFallbackRenderProps, ImageImgCommonProps, ImageImgOptions, ImageImgProps, ImageImgRenderProps, ImageRootCommonProps, ImageRootOptions, ImageRootProps, ImageRootRenderProps, ImageImg as Img, ImageRoot as Root, useImageContext };
}
declare const Image: typeof ImageRoot & {
  Fallback: typeof ImageFallback;
  Img: typeof ImageImg;
};
//#endregion
export { ImageFallbackOptions as _, ImageRoot as a, ImageRootProps as c, ImageImgCommonProps as d, ImageImgOptions as f, ImageFallbackCommonProps as g, ImageFallback as h, useImageContext as i, ImageRootRenderProps as l, ImageImgRenderProps as m, index_d_exports as n, ImageRootCommonProps as o, ImageImgProps as p, ImageContextValue as r, ImageRootOptions as s, Image as t, ImageImg as u, ImageFallbackProps as v, ImageFallbackRenderProps as y };