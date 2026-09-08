import { s as PolymorphicProps, t as ElementOf } from "../index/CFIwL2Gi.js";
import { JSX, ValidComponent } from "@solidjs/web";
import { Accessor, Ref, Setter } from "solid-js";
//#region src/resizable/resizable-lib.d.ts
/** A size value: a fraction (0–1) or a CSS pixel string like `"200px"`. */
type ResizableSize = number | `${number}px`;
/**
 * Controls which neighbouring panels absorb the size change during a resize.
 * - `"preceding"` — only panels before the target give/receive space.
 * - `"following"` — only panels after the target give/receive space.
 * - `"both"` — space is shared symmetrically across both sides.
 */
type ResizeStrategy = "preceding" | "following" | "both";
type ResizablePanelData = {
  id: string;
  element: HTMLElement;
  initialSize: ResizableSize | undefined;
  minSize: ResizableSize;
  maxSize: ResizableSize;
  collapsible: boolean;
  collapsedSize?: ResizableSize;
  collapseThreshold?: ResizableSize;
  onResize?: (size: number) => void;
  onCollapse?: () => void;
  onExpand?: () => void;
};
type ResizablePanelInstance = {
  data: ResizablePanelData;
  size: Accessor<number>;
  resize: (size: ResizableSize, strategy: ResizeStrategy) => void;
  collapse: (strategy: ResizeStrategy) => void;
  expand: (strategy: ResizeStrategy) => void;
};
//#endregion
//#region src/resizable/resizable-context.d.ts
interface ResizableContextValue {
  /** Whether panels are laid out horizontally or vertically. */
  orientation: Accessor<"horizontal" | "vertical">;
  /** Current panel sizes as fractions (0–1). */
  sizes: Accessor<number[]>;
  /** Directly set all panel sizes. */
  setSizes: Setter<number[]>;
  /** Delta used when resizing with arrow keys. */
  keyboardDelta: Accessor<ResizableSize>;
  /** Whether the component manages the global cursor style during resize. */
  handleCursorStyle: Accessor<boolean>;
  /** Resize a panel to a specific size with the given strategy. */
  resize: (panelIndex: number, size: ResizableSize, strategy?: ResizeStrategy) => void;
  /** Collapse a panel (requires `collapsible` on the panel). */
  collapse: (panelIndex: number, strategy?: ResizeStrategy) => void;
  /** Expand a panel (requires `collapsible` on the panel). */
  expand: (panelIndex: number, strategy?: ResizeStrategy) => void;
}
/** Returns the nearest `<Resizable.Root>` context. Throws if called outside one. */
declare function useResizableContext(): ResizableContextValue;
/** Internal context — superset with setters and registration hooks used by Panel and Handle. */
interface ResizableInternalContextValue extends ResizableContextValue {
  rootSize: Accessor<number>;
  panels: Accessor<ResizablePanelInstance[]>;
  registerPanel: (panelData: ResizablePanelData) => ResizablePanelInstance;
  unregisterPanel: (id: string) => void;
  onDrag: (handle: HTMLElement, delta: number, altKey: boolean) => void;
  onDragEnd: () => void;
  onKeyDown: (handle: HTMLElement, event: KeyboardEvent, altKey: boolean) => void;
}
//#endregion
//#region src/resizable/resizable-handle.d.ts
interface ResizableHandleOptions {
  /**
   * Whether the handle allows intersection at its start edge (left/top).
   * @defaultValue true
   */
  startIntersection?: boolean;
  /**
   * Whether the handle allows intersection at its end edge (right/bottom).
   * @defaultValue true
   */
  endIntersection?: boolean;
  /**
   * Whether Alt-key resize mode is enabled. `'only'` makes it the exclusive resize method.
   * @defaultValue true
   */
  altKey?: boolean | "only";
  /** Fired when the handle starts being dragged. Call `event.preventDefault()` to cancel. */
  onHandleDragStart?: (event: PointerEvent) => void;
  /** Fired while the handle is being dragged. Call `event.preventDefault()` to cancel. */
  onHandleDrag?: (event: CustomEvent) => void;
  /** Fired when the handle drag ends. */
  onHandleDragEnd?: (event: PointerEvent | TouchEvent | MouseEvent) => void;
}
interface ResizableHandleCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  style: JSX.CSSProperties | string;
  disabled: boolean | undefined;
  onBlur: JSX.EventHandlerUnion<T, FocusEvent>;
  onFocus: JSX.EventHandlerUnion<T, FocusEvent>;
  onKeyDown: JSX.EventHandlerUnion<T, KeyboardEvent>;
  onKeyUp: JSX.EventHandlerUnion<T, KeyboardEvent>;
  onMouseEnter: JSX.EventHandlerUnion<T, MouseEvent>;
  onMouseLeave: JSX.EventHandlerUnion<T, MouseEvent>;
  onPointerDown: JSX.EventHandlerUnion<T, PointerEvent>;
  children: JSX.Element;
}
interface ResizableHandleRenderProps extends ResizableHandleCommonProps {
  role: "separator";
  "aria-controls": string | undefined;
  "aria-orientation": "horizontal" | "vertical";
  "aria-valuemax": number | undefined;
  "aria-valuemin": number | undefined;
  "aria-valuenow": number | undefined;
  "data-active": "" | undefined;
  "data-dragging": "" | undefined;
  "data-orientation": "horizontal" | "vertical";
  "data-kb-resizable-handle": "";
}
type ResizableHandleProps<T extends ValidComponent | HTMLElement = HTMLElement> = ResizableHandleOptions & Partial<ResizableHandleCommonProps<ElementOf<T>>>;
/**
 * A drag handle placed between two `<Resizable.Panel>` elements.
 *
 * @data `data-kb-resizable-handle` - Present on every handle element.
 * @data `data-active` - Present when the handle is active (hovered, focused, or being dragged).
 * @data `data-dragging` - Present while the handle is being dragged.
 * @data `data-orientation` - The orientation of the resizable.
 */
declare function ResizableHandle<T extends ValidComponent = "button">(props: PolymorphicProps<T, ResizableHandleProps<T>>): JSX.Element;
//#endregion
//#region src/resizable/resizable-panel.d.ts
interface ResizablePanelOptions {
  /**
   * Initial size as a fraction (0–1) or pixel string. Prefer fractions for SSR to avoid layout shifts.
   */
  initialSize?: ResizableSize;
  /**
   * Minimum size.
   * @defaultValue 0
   */
  minSize?: ResizableSize;
  /**
   * Maximum size.
   * @defaultValue 1
   */
  maxSize?: ResizableSize;
  /**
   * Whether this panel can be fully collapsed.
   * @defaultValue false
   */
  collapsible?: boolean;
  /**
   * Size the panel collapses to.
   * @defaultValue 0
   */
  collapsedSize?: ResizableSize;
  /**
   * How much the user must overdrag to trigger collapse.
   * @defaultValue 0.05
   */
  collapseThreshold?: ResizableSize;
  /** Fired when the panel is resized. */
  onResize?: (size: number) => void;
  /** Fired when the panel collapses. */
  onCollapse?: (size: number) => void;
  /** Fired when the panel expands. */
  onExpand?: (size: number) => void;
  /**
   * The `id` attribute of the panel element.
   * @defaultValue `createUniqueId()`
   */
  panelId?: string;
}
interface ResizablePanelCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  style: JSX.CSSProperties | string;
  children: JSX.Element | ((props: ResizablePanelChildrenProps) => JSX.Element);
}
interface ResizablePanelRenderProps extends ResizablePanelCommonProps {
  id: string;
  "data-collapsed": "" | undefined;
  "data-expanded": "" | undefined;
  "data-orientation": "horizontal" | "vertical";
  "data-kb-resizable-panel": "";
}
type ResizablePanelProps<T extends ValidComponent | HTMLElement = HTMLElement> = ResizablePanelOptions & Partial<ResizablePanelCommonProps<ElementOf<T>>>;
interface ResizablePanelChildrenProps {
  /** Current size of this panel as a fraction (0–1). */
  size: number;
  /** Configured minimum size. */
  minSize: ResizableSize;
  /** Configured maximum size. */
  maxSize: ResizableSize;
  /** Whether the panel can be fully collapsed. */
  collapsible: boolean;
  /** Size the panel collapses to. */
  collapsedSize: ResizableSize;
  /** Overdrag threshold required to trigger collapse. */
  collapseThreshold: ResizableSize;
  /** Whether the panel is currently collapsed. */
  collapsed: boolean;
  /** Resize this panel to a specific size. */
  resize: (size: ResizableSize, strategy?: ResizeStrategy) => void;
  /** Collapse this panel to its `collapsedSize`. */
  collapse: (strategy?: ResizeStrategy) => void;
  /** Expand this panel from its collapsed state. */
  expand: (strategy?: ResizeStrategy) => void;
  /** The HTML `id` attribute of the panel element. */
  panelId: string;
}
declare function ResizablePanel<T extends ValidComponent = "div">(props: PolymorphicProps<T, ResizablePanelProps<T>>): JSX.Element;
//#endregion
//#region src/resizable/resizable-panel-context.d.ts
interface ResizablePanelContextValue {
  /** Current size of the panel as a fraction (0–1). */
  size: Accessor<number>;
  /** Minimum allowed size. */
  minSize: Accessor<ResizableSize>;
  /** Maximum allowed size. */
  maxSize: Accessor<ResizableSize>;
  /** Whether the panel can be fully collapsed. */
  collapsible: Accessor<boolean>;
  /** Size the panel collapses to. */
  collapsedSize: Accessor<ResizableSize>;
  /** Overdrag threshold required to trigger collapse. */
  collapseThreshold: Accessor<ResizableSize>;
  /** Whether the panel is currently collapsed. */
  collapsed: Accessor<boolean>;
  /** Resize this panel to a specific size. */
  resize: (size: ResizableSize, strategy?: ResizeStrategy) => void;
  /** Collapse this panel. */
  collapse: (strategy?: ResizeStrategy) => void;
  /** Expand this panel. */
  expand: (strategy?: ResizeStrategy) => void;
  /** The HTML `id` attribute of the panel element. */
  panelId: Accessor<string>;
}
/** Returns the nearest `<Resizable.Panel>` context. Throws if called outside one. */
declare function useResizablePanelContext(): ResizablePanelContextValue;
//#endregion
//#region src/resizable/resizable-root.d.ts
interface ResizableRootOptions {
  /**
   * Orientation of the resizable layout.
   * @defaultValue "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /** Controlled panel sizes as fractions (0–1). */
  sizes?: number[];
  /** Fired when panel sizes change. */
  onSizesChange?: (sizes: number[]) => void;
  /**
   * Initial sizes. Overridden by `initialSize` on individual `<Resizable.Panel>` components.
   */
  initialSizes?: ResizableSize[];
  /**
   * Delta applied when resizing with arrow keys.
   * @defaultValue 0.1
   */
  keyboardDelta?: ResizableSize;
  /**
   * Whether the component manages the global cursor style during resize.
   * @defaultValue true
   */
  handleCursorStyle?: boolean;
}
interface ResizableRootCommonProps<T extends HTMLElement = HTMLElement> {
  ref: Ref<T>;
  style: JSX.CSSProperties | string;
  children: JSX.Element | ((props: ResizableRootChildrenProps) => JSX.Element);
}
interface ResizableRootRenderProps extends ResizableRootCommonProps {
  "data-orientation": "horizontal" | "vertical";
  "data-kb-resizable-root": "";
}
type ResizableRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = ResizableRootOptions & Partial<ResizableRootCommonProps<ElementOf<T>>>;
interface ResizableRootChildrenProps {
  /** Current orientation of the layout. */
  orientation: "horizontal" | "vertical";
  /** Current panel sizes as fractions (0–1). */
  sizes: number[];
  /** Directly set all panel sizes. */
  setSizes: Setter<number[]>;
  /** Delta applied per arrow-key press. */
  keyboardDelta: ResizableSize;
  /** Whether the global cursor style is managed during resize. */
  handleCursorStyle: boolean;
  /** Resize panel at `panelIndex` to the given size. */
  resize: (panelIndex: number, size: ResizableSize, strategy?: ResizeStrategy) => void;
  /** Collapse panel at `panelIndex` to its `collapsedSize`. */
  collapse: (panelIndex: number, strategy?: ResizeStrategy) => void;
  /** Expand panel at `panelIndex` from its collapsed state. */
  expand: (panelIndex: number, strategy?: ResizeStrategy) => void;
}
declare function ResizableRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, ResizableRootProps<T>>): JSX.Element;
//#endregion
//#region src/resizable/index.d.ts
export declare const Resizable: typeof ResizableRoot & {
  Handle: typeof ResizableHandle;
  Panel: typeof ResizablePanel;
  useContext: typeof useResizableContext;
  usePanelContext: typeof useResizablePanelContext;
};
//#endregion
export { ResizableHandle as Handle, type ResizableHandleCommonProps as HandleCommonProps, type ResizableHandleOptions as HandleOptions, type ResizableHandleProps as HandleProps, type ResizableHandleRenderProps as HandleRenderProps, ResizablePanel as Panel, type ResizablePanelChildrenProps as PanelChildrenProps, type ResizablePanelCommonProps as PanelCommonProps, type ResizablePanelOptions as PanelOptions, type ResizablePanelProps as PanelProps, type ResizablePanelRenderProps as PanelRenderProps, type ResizableContextValue, type ResizableInternalContextValue, type ResizablePanelContextValue, type ResizableSize, type ResizeStrategy, ResizableRoot as Root, type ResizableRootChildrenProps as RootChildrenProps, type ResizableRootCommonProps as RootCommonProps, type ResizableRootOptions as RootOptions, type ResizableRootProps as RootProps, type ResizableRootRenderProps as RootRenderProps, useResizableContext as useContext, useResizablePanelContext as usePanelContext };