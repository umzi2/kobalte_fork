import { createMemo } from "solid-js";
import { access } from "@solid-primitives/utils";
//#region src/primitives/create-collection/utils.ts
/**
* Generate a flatted array of `CollectionNode` from a custom data source.
*/
function buildNodes(params) {
	let index = params.startIndex ?? 0;
	const level = params.startLevel ?? 0;
	const nodes = [];
	const getKey = (data) => {
		if (data == null) return "";
		const _getKey = params.getKey ?? "key";
		const dataKey = typeof _getKey === "string" ? data[_getKey] : _getKey(data);
		return dataKey != null ? String(dataKey) : "";
	};
	const getTextValue = (data) => {
		if (data == null) return "";
		const _getTextValue = params.getTextValue ?? "textValue";
		const dataTextValue = typeof _getTextValue === "string" ? data[_getTextValue] : _getTextValue(data);
		return dataTextValue != null ? String(dataTextValue) : "";
	};
	const getDisabled = (data) => {
		if (data == null) return false;
		const _getDisabled = params.getDisabled ?? "disabled";
		return (typeof _getDisabled === "string" ? data[_getDisabled] : _getDisabled(data)) ?? false;
	};
	const getSectionChildren = (data) => {
		if (data == null) return;
		if (typeof params.getSectionChildren === "string") return data[params.getSectionChildren];
		return params.getSectionChildren?.(data);
	};
	for (const data of params.dataSource) {
		if (typeof data === "string" || typeof data === "number") {
			nodes.push({
				type: "item",
				rawValue: data,
				key: String(data),
				textValue: String(data),
				disabled: getDisabled(data),
				level,
				index
			});
			index++;
			continue;
		}
		if (getSectionChildren(data) != null) {
			nodes.push({
				type: "section",
				rawValue: data,
				key: "",
				textValue: "",
				disabled: false,
				level,
				index
			});
			index++;
			const sectionChildren = getSectionChildren(data) ?? [];
			if (sectionChildren.length > 0) {
				const childNodes = buildNodes({
					dataSource: sectionChildren,
					getKey: params.getKey,
					getTextValue: params.getTextValue,
					getDisabled: params.getDisabled,
					getSectionChildren: params.getSectionChildren,
					startIndex: index,
					startLevel: level + 1
				});
				nodes.push(...childNodes);
				index += childNodes.length;
			}
		} else {
			nodes.push({
				type: "item",
				rawValue: data,
				key: getKey(data),
				textValue: getTextValue(data),
				disabled: getDisabled(data),
				level,
				index
			});
			index++;
		}
	}
	return nodes;
}
//#endregion
//#region src/primitives/create-collection/create-collection.ts
function createCollection(props, deps = []) {
	return createMemo(() => {
		const nodes = buildNodes({
			dataSource: access(props.dataSource),
			getKey: access(props.getKey),
			getTextValue: access(props.getTextValue),
			getDisabled: access(props.getDisabled),
			getSectionChildren: access(props.getSectionChildren)
		});
		for (let i = 0; i < deps.length; i++) deps[i]();
		return props.factory(nodes);
	});
}
//#endregion
//#region src/primitives/create-collection/get-item-count.ts
const cache = /* @__PURE__ */ new WeakMap();
function getItemCount(collection) {
	let count = cache.get(collection);
	if (count != null) return count;
	count = 0;
	for (const item of collection) if (item.type === "item") count++;
	cache.set(collection, count);
	return count;
}
//#endregion
export { createCollection as n, getItemCount as t };
