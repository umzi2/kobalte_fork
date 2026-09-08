import { ToggleState } from "@solid-primitives/controlled-signal";
import { MaybeAccessor } from "@solid-primitives/utils";
//#region src/primitives/create-toggle-state/create-toggle-state.d.ts
interface CreateToggleStateProps {
  /** The controlled selected state. */
  isSelected?: MaybeAccessor<boolean | undefined>;
  /**
   * The default selected state when initially rendered.
   * Useful when you do not need to control the selected state.
   */
  defaultIsSelected?: MaybeAccessor<boolean | undefined>;
  /** Whether the selected state cannot be changed by the user. */
  isDisabled?: MaybeAccessor<boolean | undefined>;
  /** Whether the selected state cannot be changed by the user. */
  isReadOnly?: MaybeAccessor<boolean | undefined>;
  /** Event handler called when the selected state changes. */
  onSelectedChange?: (isSelected: boolean) => void;
}
/**
 * Provides state management for toggle components like checkboxes and switches.
 */
declare function createToggleState$1(props?: CreateToggleStateProps): ToggleState;
//#endregion
export { ToggleState as n, createToggleState$1 as r, CreateToggleStateProps as t };