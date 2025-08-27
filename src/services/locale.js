export function getSavedLocale() {
	try {
		return localStorage.getItem("locale") || "en-US";
	} catch {
		return "en-US";
	}
}


export function saveLocale(locale) {
	try {
		localStorage.setItem("locale", locale);
	} catch { /* ignore */
	}
}
