import { t as __exportAll } from "../rolldown-runtime/BBjsoOtd.js";
import { Polymorphic } from "../polymorphic/index.js";
import { t as primitives_exports } from "../primitives/CLOXSc13.js";
import { r as ButtonRoot } from "../button/C_WaGidW.js";
import { t as Tabs } from "../tabs/LPQwybx8.js";
import { applyRef, createComponent, mergeProps } from "@solidjs/web";
import { Show, createContext, createUniqueId, merge, omit, useContext } from "solid-js";
import { access } from "@solid-primitives/utils";
import { clamp, composeEventHandlers } from "@kobalte/utils";
//#region src/steps/steps-context.tsx
const StepsContext = createContext();
function useStepsContext() {
	const context = useContext(StepsContext);
	if (context === void 0) throw new Error("[kobalte]: `useStepsContext` must be used within a `Steps` component");
	return context;
}
//#endregion
//#region src/steps/steps-completed-content.tsx
/**
* The content shown once every step has been completed
* (`context.value() >= context.count()`). Announced to assistive technology
* automatically via `role="status"` (a polite live region) — completing a
* wizard is a positive, non-urgent update, not an error/warning, so `status`
* is the correct role here rather than the more disruptive `alert`.
*/
function StepsCompletedContent(props) {
	const context = useStepsContext();
	const others = omit(props, "ref", "forceMount");
	return createComponent(Show, {
		get when() {
			return props.forceMount || context.isCompleted();
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "div",
				role: "status",
				ref(r$) {
					var _ref$ = props.ref;
					typeof _ref$ === "function" || Array.isArray(_ref$) ? applyRef(_ref$, r$) : props.ref = r$;
				}
			}, others));
		}
	});
}
//#endregion
//#region src/steps/steps-content.tsx
/**
* The content shown while its associated step is the current one.
*/
function StepsContent(props) {
	const context = useStepsContext();
	const others = omit(props, "id", "ref", "index", "forceMount");
	const index = () => props.index;
	const isCurrent = () => context.value() === index();
	const id = () => props.id ?? context.generateId(`content-${index()}`);
	return createComponent(Show, {
		get when() {
			return props.forceMount || isCurrent();
		},
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "div",
				get id() {
					return id();
				},
				ref(r$) {
					var _ref$ = props.ref;
					typeof _ref$ === "function" || Array.isArray(_ref$) ? applyRef(_ref$, r$) : props.ref = r$;
				},
				get ["data-current"]() {
					return isCurrent() ? "" : void 0;
				},
				get ["aria-labelledby"]() {
					return context.generateId(`trigger-${index()}`);
				}
			}, others));
		}
	});
}
//#endregion
//#region src/steps/steps-item-context.tsx
const StepsItemContext = createContext();
function useStepsItemContext() {
	const context = useContext(StepsItemContext);
	if (context === void 0) throw new Error("[kobalte]: `useStepsItemContext` must be used within a `Steps.Item` component");
	return context;
}
//#endregion
//#region src/steps/steps-indicator.tsx
/**
* A visual marker for a step's status. Renders whatever children you provide
* (e.g. the step number or a checkmark) — style it using the `data-complete`
* / `data-current` / `data-incomplete` attributes.
*/
function StepsIndicator(props) {
	const context = useStepsContext();
	const itemContext = useStepsItemContext();
	const state = () => context.getItemState(itemContext.index());
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		get ["data-complete"]() {
			return state() === "complete" ? "" : void 0;
		},
		get ["data-current"]() {
			return state() === "current" ? "" : void 0;
		},
		get ["data-incomplete"]() {
			return state() === "incomplete" ? "" : void 0;
		}
	}, props));
}
//#endregion
//#region src/steps/steps-item.tsx
/**
* The container for a single step. Establishes the item context consumed by
* `Steps.Trigger`, `Steps.Indicator` and `Steps.Separator`.
*/
function StepsItem(props) {
	const context = useStepsContext();
	const others = omit(props, "index");
	const state = () => context.getItemState(props.index);
	return createComponent(StepsItemContext, {
		value: { index: () => props.index },
		get children() {
			return createComponent(Polymorphic, mergeProps({
				as: "div",
				get ["data-orientation"]() {
					return context.orientation();
				},
				get ["data-complete"]() {
					return state() === "complete" ? "" : void 0;
				},
				get ["data-current"]() {
					return state() === "current" ? "" : void 0;
				},
				get ["data-incomplete"]() {
					return state() === "incomplete" ? "" : void 0;
				}
			}, others));
		}
	});
}
//#endregion
//#region src/steps/steps-list.tsx
/**
* Contains the steps' items. Wraps `Tabs.List` internally — this is what
* gives roving-tabindex arrow-key navigation (and Home/End) between step
* triggers, `role="tablist"`, and `aria-orientation` for free.
*/
function StepsList(props) {
	return createComponent(Tabs.List, props);
}
//#endregion
//#region src/steps/steps-next-trigger.tsx
/**
* A button that advances to the next step.
*/
function StepsNextTrigger(props) {
	const context = useStepsContext();
	const others = omit(props, "onClick");
	return createComponent(ButtonRoot, mergeProps({
		get onClick() {
			return composeEventHandlers([props.onClick, context.goToNextStep]);
		},
		get disabled() {
			return !context.hasNextStep();
		}
	}, others));
}
//#endregion
//#region src/steps/steps-prev-trigger.tsx
/**
* A button that returns to the previous step.
*/
function StepsPrevTrigger(props) {
	const context = useStepsContext();
	const others = omit(props, "onClick");
	return createComponent(ButtonRoot, mergeProps({
		get onClick() {
			return composeEventHandlers([props.onClick, context.goToPrevStep]);
		},
		get disabled() {
			return !context.hasPrevStep();
		}
	}, others));
}
//#endregion
//#region src/steps/steps-progress.tsx
/**
* A progress bar reflecting how many steps have been completed. Renders as
* the fill itself (sized via `width`); wrap it in your own track element.
*/
function StepsProgress(props) {
	const context = useStepsContext();
	const others = omit(props, "style");
	const resolvedStyle = () => {
		const percentStyle = { width: `${context.percent()}%` };
		const userStyle = props.style;
		if (!userStyle || typeof userStyle === "string") return percentStyle;
		return {
			...percentStyle,
			...userStyle
		};
	};
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		role: "progressbar",
		get ["aria-valuenow"]() {
			return context.value();
		},
		"aria-valuemin": 0,
		get ["aria-valuemax"]() {
			return context.count();
		},
		get ["data-complete"]() {
			return context.isCompleted() ? "" : void 0;
		},
		get style() {
			return resolvedStyle();
		}
	}, others));
}
//#endregion
//#region src/steps/steps-root.tsx
function StepsRoot(props) {
	const defaultId = `steps-${createUniqueId()}`;
	const mergedProps = merge({
		id: defaultId,
		orientation: "horizontal",
		linear: false,
		isStepValid: () => true,
		isStepSkippable: () => false
	}, props);
	const others = omit(mergedProps, "ref", "id", "style", "count", "value", "defaultValue", "onChange", "orientation", "linear", "isStepValid", "isStepSkippable", "onStepComplete", "onStepInvalid");
	const initialValueIsControlled = mergedProps.value !== void 0;
	const [value, setValueRaw] = (0, primitives_exports.createControllableSignal)({
		value: () => initialValueIsControlled ? mergedProps.value ?? 0 : void 0,
		defaultValue: () => mergedProps.defaultValue ?? 0,
		onChange: (v) => mergedProps.onChange?.(v)
	});
	const count = () => mergedProps.count;
	const setStep = (index) => {
		const clamped = clamp(index, 0, count());
		const wasCompleted = (value() ?? 0) >= count();
		setValueRaw(clamped);
		if (!wasCompleted && clamped >= count()) mergedProps.onStepComplete?.();
	};
	const isStepValid = (index) => mergedProps.isStepValid?.(index) ?? true;
	const isStepSkippable = (index) => mergedProps.isStepSkippable?.(index) ?? false;
	const canChangeStep = (index) => {
		const current = value() ?? 0;
		if (index === current) return false;
		if (!mergedProps.linear) return true;
		if (index < current) return true;
		return index === current + 1 && isStepValid(current);
	};
	const changeStep = (index) => {
		const current = value() ?? 0;
		if (index === current) return;
		if (canChangeStep(index)) setStep(index);
		else mergedProps.onStepInvalid?.({ step: current });
	};
	const goToNextStep = () => {
		const current = value() ?? 0;
		if (current >= count()) return;
		if (mergedProps.linear && !isStepValid(current)) {
			mergedProps.onStepInvalid?.({ step: current });
			return;
		}
		let next = current + 1;
		while (next < count() && isStepSkippable(next)) next++;
		setStep(next);
	};
	const goToPrevStep = () => {
		let prev = (value() ?? 0) - 1;
		while (prev > 0 && isStepSkippable(prev)) prev--;
		if (prev < 0) return;
		setStep(prev);
	};
	const resetStep = () => setStep(mergedProps.defaultValue ?? 0);
	const hasNextStep = () => (value() ?? 0) < count();
	const hasPrevStep = () => (value() ?? 0) > 0;
	const isCompleted = () => (value() ?? 0) >= count();
	const percent = () => {
		const total = count();
		return total <= 0 ? 0 : clamp((value() ?? 0) / total * 100, 0, 100);
	};
	const getItemState = (index) => {
		const current = value() ?? 0;
		if (index < current) return "complete";
		if (index === current) return "current";
		return "incomplete";
	};
	const resolvedStyle = () => {
		const percentVar = { "--percent": `${percent()}%` };
		const userStyle = mergedProps.style;
		if (!userStyle || typeof userStyle === "string") return percentVar;
		return {
			...percentVar,
			...userStyle
		};
	};
	return createComponent(StepsContext, {
		value: {
			value: () => value() ?? 0,
			count,
			percent,
			orientation: () => mergedProps.orientation,
			hasNextStep,
			hasPrevStep,
			isCompleted,
			isStepValid,
			isStepSkippable,
			getItemState,
			canChangeStep,
			changeStep,
			setStep,
			goToNextStep,
			goToPrevStep,
			resetStep,
			generateId: (suffix) => `${access(mergedProps.id)}-${suffix}`
		},
		get children() {
			return createComponent(Tabs, mergeProps({
				ref(r$) {
					var _ref$ = mergedProps.ref;
					typeof _ref$ === "function" || Array.isArray(_ref$) ? applyRef(_ref$, r$) : mergedProps.ref = r$;
				},
				get id() {
					return access(mergedProps.id);
				},
				get value() {
					return String(Math.min(value() ?? 0, count() - 1));
				},
				onChange: (key) => changeStep(Number(key)),
				get orientation() {
					return mergedProps.orientation;
				},
				activationMode: "manual",
				get style() {
					return resolvedStyle();
				}
			}, others));
		}
	});
}
//#endregion
//#region src/steps/steps-separator.tsx
/**
* A purely visual divider between two steps, styled using the same
* `data-complete` / `data-current` / `data-incomplete` attributes as
* `Steps.Indicator` (reflecting the step it follows). Hidden from assistive
* technology (`aria-hidden`), matching `Breadcrumbs.Separator`. Typically
* hidden visually after the last item via `:last-child` in CSS.
*/
function StepsSeparator(props) {
	const context = useStepsContext();
	const itemContext = useStepsItemContext();
	const state = () => context.getItemState(itemContext.index());
	return createComponent(Polymorphic, mergeProps({
		as: "div",
		"aria-hidden": "true",
		get ["data-complete"]() {
			return state() === "complete" ? "" : void 0;
		},
		get ["data-current"]() {
			return state() === "current" ? "" : void 0;
		},
		get ["data-incomplete"]() {
			return state() === "incomplete" ? "" : void 0;
		}
	}, props));
}
//#endregion
//#region src/steps/steps-trigger.tsx
/**
* A button that navigates directly to the step it belongs to. Wraps
* `Tabs.Trigger` internally — its click and Enter/Space activation already
* perform "select this key", which flows into `Steps.Root`'s controlled
* `Tabs` `onChange`, which runs it through `changeStep`'s `linear` validation
* before the current step value is ever allowed to update.
*/
function StepsTrigger(props) {
	const context = useStepsContext();
	const itemContext = useStepsItemContext();
	const others = omit(props, "id");
	const state = () => context.getItemState(itemContext.index());
	const isCurrent = () => state() === "current";
	const id = () => props.id ?? context.generateId(`trigger-${itemContext.index()}`);
	return createComponent(Tabs.Trigger, mergeProps({
		get value() {
			return String(itemContext.index());
		},
		get id() {
			return id();
		},
		get ["data-orientation"]() {
			return context.orientation();
		},
		get ["data-state"]() {
			return isCurrent() ? "open" : "closed";
		},
		get ["data-complete"]() {
			return state() === "complete" ? "" : void 0;
		},
		get ["data-current"]() {
			return isCurrent() ? "" : void 0;
		},
		get ["data-incomplete"]() {
			return state() === "incomplete" ? "" : void 0;
		},
		get ["aria-current"]() {
			return isCurrent() ? "step" : void 0;
		},
		get ["aria-controls"]() {
			return context.generateId(`content-${itemContext.index()}`);
		}
	}, others));
}
//#endregion
//#region src/steps/index.tsx
var steps_exports = /* @__PURE__ */ __exportAll({
	CompletedContent: () => StepsCompletedContent,
	Content: () => StepsContent,
	Indicator: () => StepsIndicator,
	Item: () => StepsItem,
	List: () => StepsList,
	NextTrigger: () => StepsNextTrigger,
	PrevTrigger: () => StepsPrevTrigger,
	Progress: () => StepsProgress,
	Root: () => StepsRoot,
	Separator: () => StepsSeparator,
	Steps: () => Steps,
	Trigger: () => StepsTrigger,
	useStepsContext: () => useStepsContext,
	useStepsItemContext: () => useStepsItemContext
});
const Steps = Object.assign(StepsRoot, {
	CompletedContent: StepsCompletedContent,
	Content: StepsContent,
	Indicator: StepsIndicator,
	Item: StepsItem,
	List: StepsList,
	NextTrigger: StepsNextTrigger,
	PrevTrigger: StepsPrevTrigger,
	Progress: StepsProgress,
	Separator: StepsSeparator,
	Trigger: StepsTrigger
});
//#endregion
export { StepsRoot as a, StepsNextTrigger as c, StepsIndicator as d, useStepsItemContext as f, useStepsContext as h, StepsSeparator as i, StepsList as l, StepsCompletedContent as m, steps_exports as n, StepsProgress as o, StepsContent as p, StepsTrigger as r, StepsPrevTrigger as s, Steps as t, StepsItem as u };
