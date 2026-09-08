import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { E as SelectionMode, l as ListState } from "./CaxKjm1F.js";
import { a as ToggleButtonRootOptions, n as index_d_exports$1, s as ToggleButtonRootRenderProps } from "./of812AVz.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
import { Orientation } from "@kobalte/utils";
//#region src/toggle-group/toggle-group-item.d.ts
interface ToggleGroupItemOptions extends Omit<ToggleButtonRootOptions, "pressed" | "defaultPressed" | "onChange"> {
  /** A string value for the toggle group item. All items within a toggle group should use a unique value. */
  value: string;
}
interface ToggleGroupItemCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  disabled: boolean | undefined;
  onPointerDown: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onPointerUp: JSX$1.EventHandlerUnion<T, PointerEvent>;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onKeyDown: JSX$1.EventHandlerUnion<T, KeyboardEvent>;
  onMouseDown: JSX$1.EventHandlerUnion<T, MouseEvent>;
  onFocus: JSX$1.EventHandlerUnion<T, FocusEvent>;
}
interface ToggleGroupItemRenderProps extends ToggleGroupItemCommonProps, ToggleButtonRootRenderProps {
  tabindex: number | undefined;
  "data-orientation": Orientation;
}
type ToggleGroupItemProps<T extends ValidComponent | HTMLElement = HTMLElement> = ToggleGroupItemOptions & Partial<ToggleGroupItemCommonProps<ElementOf<T>>>;
declare function ToggleGroupItem<T extends ValidComponent = "button">(props: PolymorphicProps<T, ToggleGroupItemProps<T>>): JSX$1.Element;
//#endregion
//#region src/toggle-group/toggle-group-base.d.ts
interface ToggleGroupBaseOptions {
  /** The controlled value of the toggle group. */
  value?: string[];
  /**
   * The value of the select when initially rendered.
   * Useful when you do not need to control the value.
   */
  defaultValue?: string[];
  /** Event handler called when the value changes. */
  onChange?: (value: string[]) => void;
  /** The type of selection that is allowed in the toggle group. */
  selectionMode?: Exclude<SelectionMode, "none">;
  /** Whether the toggle group is disabled. */
  disabled?: boolean;
  /** The axis the toggle group items should align with. */
  orientation?: Orientation;
}
//#endregion
//#region src/toggle-group/toggle-group-root.d.ts
interface ToggleGroupSingleOptions {
  /** The controlled value of the toggle group. */
  value?: string | null;
  /**
   * The value of the select when initially rendered.
   * Useful when you do not need to control the value.
   */
  defaultValue?: string;
  /** Event handler called when the value changes. */
  onChange?: (value: string | null) => void;
  /** Whether the toggle group allow multiple selection. */
  multiple?: false;
}
interface ToggleGroupMultipleOptions {
  /** The controlled value of the toggle group select. */
  value?: string[];
  /**
   * The value of the select when initially rendered.
   * Useful when you do not need to control the value.
   */
  defaultValue?: string[];
  /** Event handler called when the value changes. */
  onChange?: (value: string[]) => void;
  /** Whether the toggle group allow multiple selection. */
  multiple: true;
}
type ToggleGroupRootOptions = (ToggleGroupSingleOptions | ToggleGroupMultipleOptions) & Omit<ToggleGroupBaseOptions, "value" | "defaultValue" | "onChange" | "selectionMode">;
interface ToggleGroupRootCommonProps<_T extends HTMLElement = HTMLElement> {}
interface ToggleGroupRootRenderProps extends ToggleGroupRootCommonProps {}
type ToggleGroupRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ToggleGroupRootOptions & Partial<ToggleGroupRootCommonProps<ElementOf<T>>>;
declare function ToggleGroup$1<T extends ValidComponent = "div">(props: PolymorphicProps<T, ToggleGroupRootProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/toggle-group/toggle-group-context.d.ts
interface ToggleGroupContextValue {
  isMultiple: Accessor<boolean>;
  isDisabled: Accessor<boolean>;
  listState: Accessor<ListState>;
  generateId: (part: string) => string;
  orientation: Accessor<Orientation>;
}
declare function useToggleGroupContext(): ToggleGroupContextValue;
declare namespace index_d_exports {
  export { ToggleGroupItem as Item, ToggleGroup$1 as Root, ToggleGroup, ToggleGroupContextValue, ToggleGroupItemCommonProps, ToggleGroupItemOptions, ToggleGroupItemProps, ToggleGroupItemRenderProps, ToggleGroupRootCommonProps, ToggleGroupRootOptions, ToggleGroupRootProps, ToggleGroupRootRenderProps, useToggleGroupContext };
}
declare const ToggleGroup: typeof ToggleGroup$1 & {
  Item: typeof ToggleGroupItem;
};
//#endregion
export { ToggleGroup$1 as a, ToggleGroupRootProps as c, ToggleGroupItemCommonProps as d, ToggleGroupItemOptions as f, useToggleGroupContext as i, ToggleGroupRootRenderProps as l, ToggleGroupItemRenderProps as m, index_d_exports as n, ToggleGroupRootCommonProps as o, ToggleGroupItemProps as p, ToggleGroupContextValue as r, ToggleGroupRootOptions as s, ToggleGroup as t, ToggleGroupItem as u };