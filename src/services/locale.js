/* eslint-env browser */

const hasLS = () => typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export function getSavedLocale() {
	if (hasLS()) {
		try {
			return window.localStorage.getItem("locale") || "en-US";
		} catch(e) {
			console.log("error in getSavedLocale()", e);
		}
	}
	return "en-US";
}

export function saveLocale(locale) {
	if (hasLS()) {
		try {
			window.localStorage.setItem("locale", locale);
		} catch(e) {
			console.log("error in saveLocale()", e);
		}
	}
}
