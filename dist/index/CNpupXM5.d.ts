import { Accessor, Component } from "solid-js";
//#region src/primitives/create-tag-name/create-tag-name.d.ts
/**
 * Returns the tag name by parsing an element ref.
 * @example
 * function Component(props) {
 *   const [ref, setRef] = createSignal<HTMLDivElement>();
 *   const tagName = createTagName(ref, () => "button"); // div
 *   return <div ref={setRef} {...props} />;
 * }
 */
declare function createTagName(ref: Accessor<HTMLElement | undefined>, fallback?: Accessor<string | Component | undefined>): import("solid-js").SourceAccessor<string | undefined>;
//#endregion
export { createTagName as t };