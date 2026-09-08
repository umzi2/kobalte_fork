//#region src/tabs/tabs-keyboard-delegate.ts
var TabsKeyboardDelegate = class {
	collection;
	direction;
	orientation;
	constructor(collection, direction, orientation) {
		this.collection = collection;
		this.direction = direction;
		this.orientation = orientation;
	}
	flipDirection() {
		return this.direction() === "rtl" && this.orientation() === "horizontal";
	}
	getKeyLeftOf(key) {
		if (this.flipDirection()) return this.getNextKey(key);
		if (this.orientation() === "horizontal") return this.getPreviousKey(key);
	}
	getKeyRightOf(key) {
		if (this.flipDirection()) return this.getPreviousKey(key);
		if (this.orientation() === "horizontal") return this.getNextKey(key);
	}
	getKeyAbove(key) {
		if (this.orientation() === "vertical") return this.getPreviousKey(key);
	}
	getKeyBelow(key) {
		if (this.orientation() === "vertical") return this.getNextKey(key);
	}
	getFirstKey() {
		let key = this.collection().getFirstKey();
		if (key == null) return;
		if (this.collection().getItem(key)?.disabled) key = this.getNextKey(key);
		return key;
	}
	getLastKey() {
		let key = this.collection().getLastKey();
		if (key == null) return;
		if (this.collection().getItem(key)?.disabled) key = this.getPreviousKey(key);
		return key;
	}
	getNextKey(key) {
		let nextKey = key;
		let nextItem;
		do {
			nextKey = this.collection().getKeyAfter(nextKey) ?? this.collection().getFirstKey();
			if (nextKey == null) return;
			nextItem = this.collection().getItem(nextKey);
			if (nextItem == null) return;
		} while (nextItem.disabled);
		return nextKey;
	}
	getPreviousKey(key) {
		let previousKey = key;
		let previousItem;
		do {
			previousKey = this.collection().getKeyBefore(previousKey) ?? this.collection().getLastKey();
			if (previousKey == null) return;
			previousItem = this.collection().getItem(previousKey);
			if (previousItem == null) return;
		} while (previousItem.disabled);
		return previousKey;
	}
};
//#endregion
export { TabsKeyboardDelegate as t };
