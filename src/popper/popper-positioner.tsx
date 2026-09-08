import { combineStyle } from "@solid-primitives/props";
import type { JSX, ValidComponent } from "@solidjs/web";
import { omit, type Ref } from "solid-js";
import {
	type ElementOf,
	Polymorphic,
	type PolymorphicProps,
} from "../polymorphic/index.tsx";
import { usePopperContext } from "./popper-context.tsx";

export interface PopperPositionerOptions {}

export interface PopperPositionerCommonProps<
	T extends HTMLElement = HTMLElement,
> {
	ref: Ref<T>;
	style?: JSX.CSSProperties | string;
}

export interface PopperPositionerRenderProps
	extends PopperPositionerCommonProps {
	"data-popper-positioner": "";
}

export type PopperPositionerProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = PopperPositionerOptions &
	Partial<PopperPositionerCommonProps<ElementOf<T>>>;

/**
 * The wrapper component that positions the popper content relative to the popper anchor.
 */
export function PopperPositioner<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, PopperPositionerProps<T>>,
) {
	const context = usePopperContext();

	const others = omit(props as PopperPositionerProps, "ref", "style");

	return (
		<Polymorphic<PopperPositionerRenderProps>
			as="div"
			ref={[
				(el: HTMLElement) => {
					context.setPositionerRef(el);
					// The tracked effect that normally starts positioning can
					// miss this ref write when it happens inside a render
					// computation (@solidjs/signals 2.0.0-rc.6 owned-scope
					// semantics), leaving the first-open positioner at
					// `top: 0; left: 0`. Ask for a positioning pass directly
					// once the element is in the DOM; `startUpdates` is a
					// no-op if the effect already handled this element.
					queueMicrotask(() => context.startUpdates());
				},
				props.ref as (el: HTMLElement) => void,
			]}
			data-popper-positioner=""
			style={combineStyle(
				{
					position: "absolute",
					top: 0,
					left: 0,
					"min-width": "max-content",
				},
				props.style,
			)}
			{...others}
		/>
	);
}
