import { type Accessor, createContext, useContext } from "solid-js";

import type { Placement } from "./utils.ts";

export interface PopperContextValue {
	currentPlacement: Accessor<Placement>;
	contentRef: Accessor<HTMLElement | undefined>;
	setPositionerRef: (el: HTMLElement) => void;
	setArrowRef: (el: HTMLElement) => void;
	/**
	 * Starts (or restarts) the floating-ui auto-update loop for the current
	 * positioner element. Exposed so the positioner can kick positioning
	 * itself right after mount — under @solidjs/signals 2.0.0-rc.6 a ref
	 * write performed inside a render computation can be missed by the
	 * tracked effect below, which left the first-open positioner at
	 * `top: 0; left: 0` (the whole dropdown rendering in the viewport corner).
	 */
	startUpdates: () => void;
}

export const PopperContext = createContext<PopperContextValue>();

export function usePopperContext() {
	const context = useContext(PopperContext);

	if (context === undefined) {
		throw new Error(
			"[kobalte]: `usePopperContext` must be used within a `Popper` component",
		);
	}

	return context;
}
