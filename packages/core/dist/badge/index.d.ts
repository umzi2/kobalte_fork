import { s as PolymorphicProps } from "../index/CFIwL2Gi.js";
import { ValidComponent } from "@solidjs/web";
//#region src/badge/badge-root.d.ts
interface BadgeRootOptions {
  /**
   * Accessible text description of the badge if child is not text.
   */
  textValue?: string;
}
interface BadgeRootCommonProps {
  "aria-label"?: string;
}
interface BadgeRootRenderProps extends BadgeRootCommonProps {
  role: "status";
}
type BadgeRootProps<_T extends ValidComponent | HTMLElement = HTMLElement> = BadgeRootOptions & Partial<BadgeRootCommonProps>;
declare function BadgeRoot<T extends ValidComponent = "span">(props: PolymorphicProps<T, BadgeRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/badge/index.d.ts
export declare const Badge: typeof BadgeRoot;
//#endregion
export { type BadgeRootCommonProps, type BadgeRootOptions, type BadgeRootProps, type BadgeRootRenderProps, BadgeRoot as Root };