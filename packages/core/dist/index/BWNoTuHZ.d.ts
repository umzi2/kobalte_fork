import { s as PolymorphicProps, t as ElementOf } from "./CFIwL2Gi.js";
import { s as ButtonRootRenderProps } from "./Bjp2qtUK.js";
import { l as TabsTriggerRenderProps } from "./C7zyS6Ql.js";
import { JSX as JSX$1, ValidComponent } from "@solidjs/web";
import { Accessor, Ref } from "solid-js";
import { Orientation } from "@kobalte/utils";
//#region src/steps/steps-completed-content.d.ts
interface StepsCompletedContentOptions {
  /**
   * Used to force mounting when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
}
interface StepsCompletedContentCommonProps<T extends HTMLElement = HTMLElement> {
  ref: T | ((el: T) => void);
}
interface StepsCompletedContentRenderProps extends StepsCompletedContentCommonProps {
  role: "status";
}
type StepsCompletedContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = StepsCompletedContentOptions & Partial<StepsCompletedContentCommonProps<ElementOf<T>>>;
/**
 * The content shown once every step has been completed
 * (`context.value() >= context.count()`). Announced to assistive technology
 * automatically via `role="status"` (a polite live region) — completing a
 * wizard is a positive, non-urgent update, not an error/warning, so `status`
 * is the correct role here rather than the more disruptive `alert`.
 */
declare function StepsCompletedContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, StepsCompletedContentProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/steps/steps-content.d.ts
interface StepsContentOptions {
  /** The index of the step this content belongs to. */
  index: number;
  /**
   * Used to force mounting when more control is needed.
   * Useful when controlling animation with SolidJS animation libraries.
   */
  forceMount?: boolean;
}
interface StepsContentCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: T | ((el: T) => void);
}
interface StepsContentRenderProps extends StepsContentCommonProps {
  "data-current": "" | undefined;
  "aria-labelledby": string;
}
type StepsContentProps<T extends ValidComponent | HTMLElement = HTMLElement> = StepsContentOptions & Partial<StepsContentCommonProps<ElementOf<T>>>;
/**
 * The content shown while its associated step is the current one.
 */
declare function StepsContent<T extends ValidComponent = "div">(props: PolymorphicProps<T, StepsContentProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/steps/steps-indicator.d.ts
interface StepsIndicatorOptions {}
interface StepsIndicatorCommonProps<_T extends HTMLElement = HTMLElement> {}
interface StepsIndicatorRenderProps extends StepsIndicatorCommonProps {
  "data-complete": "" | undefined;
  "data-current": "" | undefined;
  "data-incomplete": "" | undefined;
}
type StepsIndicatorProps<T extends ValidComponent | HTMLElement = HTMLElement> = StepsIndicatorOptions & Partial<StepsIndicatorCommonProps<ElementOf<T>>>;
/**
 * A visual marker for a step's status. Renders whatever children you provide
 * (e.g. the step number or a checkmark) — style it using the `data-complete`
 * / `data-current` / `data-incomplete` attributes.
 */
declare function StepsIndicator<T extends ValidComponent = "div">(props: PolymorphicProps<T, StepsIndicatorProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/steps/steps-item.d.ts
interface StepsItemOptions {
  /** The index of this step. */
  index: number;
}
interface StepsItemCommonProps<_T extends HTMLElement = HTMLElement> {}
interface StepsItemRenderProps extends StepsItemCommonProps {
  "data-orientation": Orientation;
  "data-complete": "" | undefined;
  "data-current": "" | undefined;
  "data-incomplete": "" | undefined;
}
type StepsItemProps<T extends ValidComponent | HTMLElement = HTMLElement> = StepsItemOptions & Partial<StepsItemCommonProps<ElementOf<T>>>;
/**
 * The container for a single step. Establishes the item context consumed by
 * `Steps.Trigger`, `Steps.Indicator` and `Steps.Separator`.
 */
declare function StepsItem<T extends ValidComponent = "div">(props: PolymorphicProps<T, StepsItemProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/steps/steps-list.d.ts
interface StepsListOptions {}
interface StepsListCommonProps<_T extends HTMLElement = HTMLElement> {}
interface StepsListRenderProps extends StepsListCommonProps {
  "data-orientation": Orientation;
}
type StepsListProps<T extends ValidComponent | HTMLElement = HTMLElement> = StepsListOptions & Partial<StepsListCommonProps<ElementOf<T>>>;
/**
 * Contains the steps' items. Wraps `Tabs.List` internally — this is what
 * gives roving-tabindex arrow-key navigation (and Home/End) between step
 * triggers, `role="tablist"`, and `aria-orientation` for free.
 */
declare function StepsList<T extends ValidComponent = "div">(props: PolymorphicProps<T, StepsListProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/steps/steps-next-trigger.d.ts
interface StepsNextTriggerOptions {}
interface StepsNextTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
}
interface StepsNextTriggerRenderProps extends StepsNextTriggerCommonProps, ButtonRootRenderProps {
  disabled: boolean | undefined;
}
type StepsNextTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = StepsNextTriggerOptions & Partial<StepsNextTriggerCommonProps<ElementOf<T>>>;
/**
 * A button that advances to the next step.
 */
declare function StepsNextTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, StepsNextTriggerProps<T>>): JSX$1.Element;
//#endregion
//#region src/steps/steps-prev-trigger.d.ts
interface StepsPrevTriggerOptions {}
interface StepsPrevTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
}
interface StepsPrevTriggerRenderProps extends StepsPrevTriggerCommonProps, ButtonRootRenderProps {
  disabled: boolean | undefined;
}
type StepsPrevTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = StepsPrevTriggerOptions & Partial<StepsPrevTriggerCommonProps<ElementOf<T>>>;
/**
 * A button that returns to the previous step.
 */
declare function StepsPrevTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, StepsPrevTriggerProps<T>>): JSX$1.Element;
//#endregion
//#region src/steps/steps-progress.d.ts
interface StepsProgressOptions {}
interface StepsProgressCommonProps<_T extends HTMLElement = HTMLElement> {
  style: JSX$1.CSSProperties | string;
}
interface StepsProgressRenderProps extends StepsProgressCommonProps {
  role: "progressbar";
  "aria-valuenow": number;
  "aria-valuemin": 0;
  "aria-valuemax": number;
  "data-complete": "" | undefined;
}
type StepsProgressProps<T extends ValidComponent | HTMLElement = HTMLElement> = StepsProgressOptions & Partial<StepsProgressCommonProps<ElementOf<T>>>;
/**
 * A progress bar reflecting how many steps have been completed. Renders as
 * the fill itself (sized via `width`); wrap it in your own track element.
 */
declare function StepsProgress<T extends ValidComponent = "div">(props: PolymorphicProps<T, StepsProgressProps<T>>): JSX$1.Element;
//#endregion
//#region src/steps/steps-root.d.ts
interface StepsRootOptions {
  /** The total number of steps. */
  count: number;
  /** The controlled index of the current step. */
  value?: number;
  /**
   * The index of the current step when initially rendered.
   * Useful when you do not need to control the state.
   */
  defaultValue?: number;
  /** Event handler called when the current step changes. */
  onChange?: (value: number) => void;
  /** The orientation of the steps. */
  orientation?: Orientation;
  /**
   * Whether the user must complete the steps in order — jumping ahead to a
   * step further than the next one is blocked unless the current step is
   * valid.
   * @defaultValue false
   */
  linear?: boolean;
  /**
   * Returns whether the step at `index` is valid, used to gate forward
   * navigation when `linear` is `true`.
   * @defaultValue () => true
   */
  isStepValid?: (index: number) => boolean;
  /**
   * Returns whether the step at `index` should be skipped over by
   * `goToNextStep`/`goToPrevStep`.
   * @defaultValue () => false
   */
  isStepSkippable?: (index: number) => boolean;
  /** Event handler called once when every step has been completed. */
  onStepComplete?: () => void;
  /** Event handler called when navigation is blocked by an invalid step in `linear` mode. */
  onStepInvalid?: (details: {
    step: number;
  }) => void;
  /**
   * A unique identifier for the component.
   * The id is used to generate ids for nested components.
   * If no id prop is provided, a generated id will be used.
   */
  id?: string;
}
interface StepsRootCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: Ref<T>;
  style: JSX$1.CSSProperties | string;
}
interface StepsRootRenderProps extends StepsRootCommonProps {
  "data-orientation": Orientation;
}
type StepsRootProps<T extends ValidComponent | HTMLElement = HTMLElement> = StepsRootOptions & Partial<StepsRootCommonProps<ElementOf<T>>>;
declare function StepsRoot<T extends ValidComponent = "div">(props: PolymorphicProps<T, StepsRootProps<T>>): JSX$1.Element;
//#endregion
//#region src/steps/steps-separator.d.ts
interface StepsSeparatorOptions {}
interface StepsSeparatorCommonProps<_T extends HTMLElement = HTMLElement> {}
interface StepsSeparatorRenderProps extends StepsSeparatorCommonProps {
  "aria-hidden": "true";
  "data-complete": "" | undefined;
  "data-current": "" | undefined;
  "data-incomplete": "" | undefined;
}
type StepsSeparatorProps<T extends ValidComponent | HTMLElement = HTMLElement> = StepsSeparatorOptions & Partial<StepsSeparatorCommonProps<ElementOf<T>>>;
/**
 * A purely visual divider between two steps, styled using the same
 * `data-complete` / `data-current` / `data-incomplete` attributes as
 * `Steps.Indicator` (reflecting the step it follows). Hidden from assistive
 * technology (`aria-hidden`), matching `Breadcrumbs.Separator`. Typically
 * hidden visually after the last item via `:last-child` in CSS.
 */
declare function StepsSeparator<T extends ValidComponent = "div">(props: PolymorphicProps<T, StepsSeparatorProps<T>>): import("@solidjs/web").JSX.Element;
//#endregion
//#region src/steps/steps-trigger.d.ts
interface StepsTriggerOptions {}
interface StepsTriggerCommonProps<T extends HTMLElement = HTMLElement> {
  id: string;
  onClick: JSX$1.EventHandlerUnion<T, MouseEvent>;
}
interface StepsTriggerRenderProps extends StepsTriggerCommonProps, TabsTriggerRenderProps {
  "data-orientation": Orientation;
  "data-state": "open" | "closed";
  "data-complete": "" | undefined;
  "data-current": "" | undefined;
  "data-incomplete": "" | undefined;
  "aria-current": "step" | undefined;
  "aria-controls": string | undefined;
}
type StepsTriggerProps<T extends ValidComponent | HTMLElement = HTMLElement> = StepsTriggerOptions & Partial<StepsTriggerCommonProps<ElementOf<T>>>;
/**
 * A button that navigates directly to the step it belongs to. Wraps
 * `Tabs.Trigger` internally — its click and Enter/Space activation already
 * perform "select this key", which flows into `Steps.Root`'s controlled
 * `Tabs` `onChange`, which runs it through `changeStep`'s `linear` validation
 * before the current step value is ever allowed to update.
 */
declare function StepsTrigger<T extends ValidComponent = "button">(props: PolymorphicProps<T, StepsTriggerProps<T>>): JSX$1.Element;
//#endregion
//#region src/steps/steps-context.d.ts
type StepState = "complete" | "current" | "incomplete";
interface StepsContextValue {
  /** The index of the current step (equals `count` once completed). */
  value: Accessor<number>;
  /** The total number of steps. */
  count: Accessor<number>;
  /** The completion percentage, between 0 and 100. */
  percent: Accessor<number>;
  orientation: Accessor<Orientation>;
  /** Whether there is a step after the current one. */
  hasNextStep: Accessor<boolean>;
  /** Whether there is a step before the current one. */
  hasPrevStep: Accessor<boolean>;
  /** Whether every step has been completed. */
  isCompleted: Accessor<boolean>;
  /** Returns whether the step at `index` is valid for forward navigation. */
  isStepValid: (index: number) => boolean;
  /** Returns whether the step at `index` is skipped over by next/prev navigation. */
  isStepSkippable: (index: number) => boolean;
  /** Returns the current status of the step at `index`. */
  getItemState: (index: number) => StepState;
  /** Returns whether a trigger may navigate directly to `index` right now. */
  canChangeStep: (index: number) => boolean;
  /**
   * Attempts to navigate directly to `index` (as from clicking a
   * `Steps.Trigger`): a no-op if `index` is already current, navigates if
   * `canChangeStep(index)` allows it, otherwise fires `onStepInvalid`.
   */
  changeStep: (index: number) => void;
  /** Directly sets the current step, clamped to `[0, count]`. Not subject to `linear` validation. */
  setStep: (index: number) => void;
  /** Advances to the next (non-skipped) step, subject to `linear` validation. */
  goToNextStep: () => void;
  /** Returns to the previous (non-skipped) step. */
  goToPrevStep: () => void;
  /** Resets to the first step. */
  resetStep: () => void;
  generateId: (part: string) => string;
}
declare function useStepsContext(): StepsContextValue;
//#endregion
//#region src/steps/steps-item-context.d.ts
interface StepsItemContextValue {
  /** The index of this step. */
  index: Accessor<number>;
}
declare function useStepsItemContext(): StepsItemContextValue;
declare namespace index_d_exports {
  export { StepsCompletedContent as CompletedContent, StepsContent as Content, StepsIndicator as Indicator, StepsItem as Item, StepsList as List, StepsNextTrigger as NextTrigger, StepsPrevTrigger as PrevTrigger, StepsProgress as Progress, StepsRoot as Root, StepsSeparator as Separator, StepState, Steps, StepsCompletedContentCommonProps, StepsCompletedContentOptions, StepsCompletedContentProps, StepsCompletedContentRenderProps, StepsContentCommonProps, StepsContentOptions, StepsContentProps, StepsContentRenderProps, StepsContextValue, StepsIndicatorCommonProps, StepsIndicatorOptions, StepsIndicatorProps, StepsIndicatorRenderProps, StepsItemCommonProps, StepsItemContextValue, StepsItemOptions, StepsItemProps, StepsItemRenderProps, StepsListCommonProps, StepsListOptions, StepsListProps, StepsListRenderProps, StepsNextTriggerCommonProps, StepsNextTriggerOptions, StepsNextTriggerProps, StepsNextTriggerRenderProps, StepsPrevTriggerCommonProps, StepsPrevTriggerOptions, StepsPrevTriggerProps, StepsPrevTriggerRenderProps, StepsProgressCommonProps, StepsProgressOptions, StepsProgressProps, StepsProgressRenderProps, StepsRootCommonProps, StepsRootOptions, StepsRootProps, StepsRootRenderProps, StepsSeparatorCommonProps, StepsSeparatorOptions, StepsSeparatorProps, StepsSeparatorRenderProps, StepsTriggerCommonProps, StepsTriggerOptions, StepsTriggerProps, StepsTriggerRenderProps, StepsTrigger as Trigger, useStepsContext, useStepsItemContext };
}
declare const Steps: typeof StepsRoot & {
  CompletedContent: typeof StepsCompletedContent;
  Content: typeof StepsContent;
  Indicator: typeof StepsIndicator;
  Item: typeof StepsItem;
  List: typeof StepsList;
  NextTrigger: typeof StepsNextTrigger;
  PrevTrigger: typeof StepsPrevTrigger;
  Progress: typeof StepsProgress;
  Separator: typeof StepsSeparator;
  Trigger: typeof StepsTrigger;
};
//#endregion
export { StepsContent as $, StepsPrevTriggerOptions as A, StepsListOptions as B, StepsProgress as C, StepsProgressRenderProps as D, StepsProgressProps as E, StepsNextTriggerOptions as F, StepsItemOptions as G, StepsListRenderProps as H, StepsNextTriggerProps as I, StepsIndicator as J, StepsItemProps as K, StepsNextTriggerRenderProps as L, StepsPrevTriggerRenderProps as M, StepsNextTrigger as N, StepsPrevTrigger as O, StepsNextTriggerCommonProps as P, StepsIndicatorRenderProps as Q, StepsList as R, StepsRootRenderProps as S, StepsProgressOptions as T, StepsItem as U, StepsListProps as V, StepsItemCommonProps as W, StepsIndicatorOptions as X, StepsIndicatorCommonProps as Y, StepsIndicatorProps as Z, StepsSeparatorRenderProps as _, StepState as a, StepsCompletedContentCommonProps as at, StepsRootOptions as b, StepsTrigger as c, StepsCompletedContentRenderProps as ct, StepsTriggerProps as d, StepsContentCommonProps as et, StepsTriggerRenderProps as f, StepsSeparatorProps as g, StepsSeparatorOptions as h, useStepsItemContext as i, StepsCompletedContent as it, StepsPrevTriggerProps as j, StepsPrevTriggerCommonProps as k, StepsTriggerCommonProps as l, StepsSeparatorCommonProps as m, index_d_exports as n, StepsContentProps as nt, StepsContextValue as o, StepsCompletedContentOptions as ot, StepsSeparator as p, StepsItemRenderProps as q, StepsItemContextValue as r, StepsContentRenderProps as rt, useStepsContext as s, StepsCompletedContentProps as st, Steps as t, StepsContentOptions as tt, StepsTriggerOptions as u, StepsRoot as v, StepsProgressCommonProps as w, StepsRootProps as x, StepsRootCommonProps as y, StepsListCommonProps as z };