//#region src/calendar/date-math.ts
/** Returns local midnight for the current moment. */
function todayDate() {
	return startOfDay(/* @__PURE__ */ new Date());
}
/**
* Builds a `Date` from a fully-computed field tuple in one shot — never chain
* in-place setters on a pre-existing `Date`. Deliberately does NOT use the
* `new Date(year, month, day, ...)` constructor directly: for a two-digit `year`
* (0-99) that constructor silently reinterprets it as 1900-1999 (e.g.
* `new Date(1, 0, 1)` is the year 1901, not 1) — `setFullYear` has no such quirk.
*/
function fromFields(year, month, day, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
	const date = /* @__PURE__ */ new Date(0);
	date.setFullYear(year, month, day);
	date.setHours(hours, minutes, seconds, milliseconds);
	return date;
}
function compareDates(a, b) {
	return a.getTime() - b.getTime();
}
function isSameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isSameMonth(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
function isToday(date) {
	return isSameDay(date, /* @__PURE__ */ new Date());
}
const DEFAULT_WEEKEND = [6, 0];
/** Whether `date` falls on a locale-aware weekend day. Falls back to Sat/Sun. */
function isWeekend(date, locale) {
	return (locale ? getWeekInfo(locale).weekend : DEFAULT_WEEKEND).includes(date.getDay());
}
function minDate(...dates) {
	return dates.reduce((min, date) => {
		if (date == null) return min;
		if (min == null) return date;
		return compareDates(date, min) < 0 ? date : min;
	}, void 0);
}
function maxDate(...dates) {
	return dates.reduce((max, date) => {
		if (date == null) return max;
		if (max == null) return date;
		return compareDates(date, max) > 0 ? date : max;
	}, void 0);
}
function startOfDay(date) {
	return fromFields(date.getFullYear(), date.getMonth(), date.getDate());
}
function getDaysInMonth(date) {
	return fromFields(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
/**
* The locale's first day of week (0 = Sunday .. 6 = Saturday) and weekend days.
* Prefers the native `Intl.Locale.prototype.getWeekInfo()` (a method, not a `.weekInfo`
* property — the latter reliably returns `undefined`, verified against real engines)
* when available, falling back to a small hardcoded table for older engines.
*/
function getWeekInfo(locale) {
	try {
		const intlLocale = new Intl.Locale(locale);
		if (typeof intlLocale.getWeekInfo === "function") {
			const info = intlLocale.getWeekInfo();
			return {
				firstDay: info.firstDay % 7,
				weekend: info.weekend.map((day) => day % 7)
			};
		}
	} catch {}
	const language = locale.split("-")[0].toLowerCase();
	return {
		firstDay: FIRST_DAY_OF_WEEK[language] ?? FIRST_DAY_OF_WEEK.default,
		weekend: DEFAULT_WEEKEND
	};
}
/**
* Fallback locale (base language) → first day of week (0 = Sunday .. 6 = Saturday).
* Ported from the same CLDR week-data table `@internationalized/date` ships (public domain
* data, portable). Only used when `Intl.Locale.prototype.getWeekInfo` is unavailable.
*/
const FIRST_DAY_OF_WEEK = {
	default: 0,
	af: 1,
	ar: 6,
	az: 1,
	bg: 1,
	bn: 0,
	ca: 1,
	cs: 1,
	da: 1,
	de: 1,
	el: 1,
	es: 1,
	et: 1,
	eu: 1,
	fa: 6,
	fi: 1,
	fr: 1,
	he: 0,
	hi: 0,
	hr: 1,
	hu: 1,
	hy: 1,
	id: 0,
	is: 1,
	it: 1,
	ja: 0,
	ka: 1,
	kk: 1,
	km: 0,
	ko: 0,
	lt: 1,
	lv: 1,
	mk: 1,
	ms: 1,
	nb: 1,
	nl: 1,
	pl: 1,
	pt: 0,
	ro: 1,
	ru: 1,
	sk: 1,
	sl: 1,
	sq: 1,
	sr: 1,
	sv: 1,
	th: 0,
	tr: 1,
	uk: 1,
	vi: 1,
	zh: 0
};
function getDayOfWeek(date, locale) {
	const { firstDay } = getWeekInfo(locale);
	return (date.getDay() - firstDay + 7) % 7;
}
function startOfWeek(date, locale) {
	return addDays(date, -getDayOfWeek(date, locale));
}
function endOfWeek(date, locale) {
	return addDays(startOfWeek(date, locale), 6);
}
function startOfMonth(date) {
	return fromFields(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
	return fromFields(date.getFullYear(), date.getMonth(), getDaysInMonth(date));
}
function startOfYear(date) {
	return fromFields(date.getFullYear(), 0, 1);
}
function getWeeksInMonth(date, locale) {
	const first = startOfMonth(date);
	const daysInMonth = getDaysInMonth(date);
	const firstWeekday = getDayOfWeek(first, locale);
	return Math.ceil((firstWeekday + daysInMonth) / 7);
}
function addMonthsClamped(date, amount) {
	const targetMonthIndex = date.getMonth() + amount;
	const targetYear = date.getFullYear() + Math.floor(targetMonthIndex / 12);
	const normalizedMonth = (targetMonthIndex % 12 + 12) % 12;
	const daysInTargetMonth = getDaysInMonth(fromFields(targetYear, normalizedMonth, 1));
	return fromFields(targetYear, normalizedMonth, Math.min(date.getDate(), daysInTargetMonth), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}
function addDays(date, amount) {
	return fromFields(date.getFullYear(), date.getMonth(), date.getDate() + amount, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}
function addWeeks(date, amount) {
	return addDays(date, amount * 7);
}
function addMonths(date, amount) {
	return addMonthsClamped(date, amount);
}
function addYears(date, amount) {
	return addMonthsClamped(date, amount * 12);
}
function addDuration(date, duration) {
	let result = date;
	if (duration.years) result = addYears(result, duration.years);
	if (duration.months) result = addMonths(result, duration.months);
	if (duration.weeks) result = addWeeks(result, duration.weeks);
	if (duration.days) result = addDays(result, duration.days);
	if (duration.hours || duration.minutes || duration.seconds) result = fromFields(result.getFullYear(), result.getMonth(), result.getDate(), result.getHours() + (duration.hours ?? 0), result.getMinutes() + (duration.minutes ?? 0), result.getSeconds() + (duration.seconds ?? 0), result.getMilliseconds());
	return result;
}
function subtractDuration(date, duration) {
	const negated = {};
	for (const key of Object.keys(duration)) negated[key] = -(duration[key] ?? 0);
	return addDuration(date, negated);
}
function setYear(date, year) {
	const daysInTargetMonth = getDaysInMonth(fromFields(year, date.getMonth(), 1));
	const clampedDay = Math.min(date.getDate(), daysInTargetMonth);
	return fromFields(year, date.getMonth(), clampedDay, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}
/** `month` is 0-indexed, matching native `Date.prototype.getMonth()`/`setMonth()`. */
function setMonth(date, month) {
	const targetYear = date.getFullYear() + Math.floor(month / 12);
	const normalizedMonth = (month % 12 + 12) % 12;
	const daysInTargetMonth = getDaysInMonth(fromFields(targetYear, normalizedMonth, 1));
	return fromFields(targetYear, normalizedMonth, Math.min(date.getDate(), daysInTargetMonth), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}
function setDay(date, day) {
	return fromFields(date.getFullYear(), date.getMonth(), day, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}
function setHours(date, hours) {
	return fromFields(date.getFullYear(), date.getMonth(), date.getDate(), hours, date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}
function setMinutes(date, minutes) {
	return fromFields(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), minutes, date.getSeconds(), date.getMilliseconds());
}
function setSeconds(date, seconds) {
	return fromFields(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), seconds, date.getMilliseconds());
}
function getFieldBounds(date, field, hour12) {
	switch (field) {
		case "year": return {
			value: date.getFullYear(),
			minValue: 1,
			maxValue: 9999
		};
		case "month": return {
			value: date.getMonth() + 1,
			minValue: 1,
			maxValue: 12
		};
		case "day": return {
			value: date.getDate(),
			minValue: 1,
			maxValue: getDaysInMonth(date)
		};
		case "dayPeriod": return {
			value: date.getHours() >= 12 ? 12 : 0,
			minValue: 0,
			maxValue: 12
		};
		case "hour":
			if (hour12) {
				const isPM = date.getHours() >= 12;
				return {
					value: date.getHours(),
					minValue: isPM ? 12 : 0,
					maxValue: isPM ? 23 : 11
				};
			}
			return {
				value: date.getHours(),
				minValue: 0,
				maxValue: 23
			};
		case "minute": return {
			value: date.getMinutes(),
			minValue: 0,
			maxValue: 59
		};
		case "second": return {
			value: date.getSeconds(),
			minValue: 0,
			maxValue: 59
		};
	}
}
function applyFieldValue(date, field, newValue) {
	switch (field) {
		case "year": return setYear(date, newValue);
		case "month": return setMonth(date, newValue - 1);
		case "day": return setDay(date, newValue);
		case "hour": return setHours(date, newValue);
		case "minute": return setMinutes(date, newValue);
		case "second": return setSeconds(date, newValue);
	}
}
/**
* Increments/decrements a segment field with wraparound (real modulo, not `%`, which
* produces negative results for negative amounts). `year` clamps instead of wrapping —
* matches the pre-existing `@internationalized/date`-backed behavior (`round: true`).
*/
function cycleField(date, field, amount, options = {}) {
	if (field === "year") return setYear(date, date.getFullYear() + amount);
	const { value, minValue, maxValue } = getFieldBounds(date, field, options.hour12 ?? false);
	const range = maxValue - minValue + 1;
	return applyFieldValue(date, field, minValue + ((value - minValue + amount) % range + range) % range);
}
function pad(n, len = 2) {
	return String(Math.abs(n)).padStart(len, "0");
}
function toLocalISOString(date, granularity) {
	const datePart = `${date.getFullYear() < 0 ? "-" : ""}${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
	if (granularity === "day") return datePart;
	let result = `${datePart}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
	if (granularity === "second") result += `:${pad(date.getSeconds())}`;
	return result;
}
const LOCAL_ISO_PATTERN = /^(-?\d{4,})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2}))?)?$/;
/** Inverse of `toLocalISOString` — parses a local wall-clock date/time string, never UTC. */
function parseLocalISOString(value) {
	const match = LOCAL_ISO_PATTERN.exec(value.trim());
	if (!match) return;
	const [, year, month, day, hours, minutes, seconds] = match;
	const date = fromFields(Number(year), Number(month) - 1, Number(day), hours != null ? Number(hours) : 0, minutes != null ? Number(minutes) : 0, seconds != null ? Number(seconds) : 0);
	return Number.isNaN(date.getTime()) ? void 0 : date;
}
//#endregion
export { startOfYear as C, todayDate as E, startOfWeek as S, toLocalISOString as T, setMinutes as _, endOfWeek as a, setYear as b, isSameDay as c, isWeekend as d, maxDate as f, setHours as g, setDay as h, endOfMonth as i, isSameMonth as l, parseLocalISOString as m, compareDates as n, getFieldBounds as o, minDate as p, cycleField as r, getWeeksInMonth as s, addDuration as t, isToday as u, setMonth as v, subtractDuration as w, startOfMonth as x, setSeconds as y };
