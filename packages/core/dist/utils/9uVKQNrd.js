//#region src/slider/utils.ts
function getNextSortedValues(prevValues, nextValue, atIndex) {
	const nextValues = [...prevValues];
	nextValues[atIndex] = nextValue;
	return nextValues.sort((a, b) => a - b);
}
/**
* Given a `values` array and a `nextValue`, determine which value in
* the array is closest to `nextValue` and return its index.
*
* @example
* // returns 1
* getClosestValueIndex([10, 30], 25);
*/
function getClosestValueIndex(values, nextValue) {
	if (values.length === 1) return 0;
	const distances = values.map((value) => Math.abs(value - nextValue));
	const closestDistance = Math.min(...distances);
	const closestIndex = distances.indexOf(closestDistance);
	return nextValue < values[closestIndex] ? closestIndex : distances.lastIndexOf(closestDistance);
}
/**
* Gets an array of steps between each value.
*
* @example
* // returns [1, 9]
* getStepsBetweenValues([10, 11, 20]);
*/
function getStepsBetweenValues(values) {
	return values.slice(0, -1).map((value, index) => values[index + 1] - value);
}
/**
* Verifies the minimum steps between all values is greater than or equal
* to the expected minimum steps.
*
* @example
* // returns false
* hasMinStepsBetweenValues([1,2,3], 2);
*
* @example
* // returns true
* hasMinStepsBetweenValues([1,2,3], 1);
*/
function hasMinStepsBetweenValues(values, minStepsBetweenValues) {
	if (minStepsBetweenValues > 0) {
		const stepsBetweenValues = getStepsBetweenValues(values);
		return Math.min(...stepsBetweenValues) >= minStepsBetweenValues;
	}
	return true;
}
function linearScale(input, output) {
	return (value) => {
		if (input[0] === input[1] || output[0] === output[1]) return output[0];
		const ratio = (output[1] - output[0]) / (input[1] - input[0]);
		return output[0] + ratio * (value - input[0]);
	};
}
function stopEventDefaultAndPropagation(event) {
	event.preventDefault();
	event.stopPropagation();
}
//#endregion
export { stopEventDefaultAndPropagation as a, linearScale as i, getNextSortedValues as n, hasMinStepsBetweenValues as r, getClosestValueIndex as t };
