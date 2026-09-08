import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { JSX, ValidComponent } from "@solidjs/web";
//#region src/skeleton/skeleton-root.d.ts
interface SkeletonRootOptions {
  /** Whether the skeleton is visible. Sets data attribute. */
  visible?: boolean;
  /** Width of skeleton in `px`. Defaults to `100%` */
  width?: number;
  /** Height of skeleton in `px`. Defaults to `auto` */
  height?: number;
  /** Whether skeleton should be a circle. Sets `border-radius` and `width` to `height`. */
  circle?: boolean;
  /** Roundedness of skeleton in `px`. */
  radius?: number;
  /** Whether the skeleton should animate. */
  animate?: boolean;
}
interface SkeletonRootCommonProps<_T extends HTMLElement = HTMLElement> {
  id: string;
  style: JSX.CSSProperties | string;
}
interface SkeletonRootRenderProps extends SkeletonRootCommonProps {
  role: "group";
  "data-animate": boolean | undefined;
  "data-visible": boolean | undefined;
}
type SkeletonRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = SkeletonRootOptions & Partial<SkeletonRootCommonProps<ElementOf<T>>>;
declare function Skeleton$1<T extends ValidComponent = "div">(props: PolymorphicProps<T, SkeletonRootProps<T>>): JSX.Element;
declare namespace index_d_exports {
  export { Skeleton$1 as Root, Skeleton, SkeletonRootCommonProps, SkeletonRootOptions, SkeletonRootProps, SkeletonRootRenderProps };
}
declare const Skeleton: typeof Skeleton$1;
//#endregion
export { SkeletonRootOptions as a, SkeletonRootCommonProps as i, index_d_exports as n, SkeletonRootProps as o, Skeleton$1 as r, SkeletonRootRenderProps as s, Skeleton as t };