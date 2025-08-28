import {createRoot} from "react-dom/client";
import {useState} from "react";
import ThemeDecorator from "@enact/sandstone/ThemeDecorator";
import App from "./App/App";
import {getSavedLocale} from "./services/locale";


const DecoratedApp = ThemeDecorator(App);


function Root() {
	const [locale, setLocale] = useState(getSavedLocale());
	return (
		<DecoratedApp
			locale={locale} // controlled locale for ThemeDecorator
			onLocaleChange={setLocale} // pass setter down to App → SettingsPanel
		/>
	);
}


const container = document.getElementById("root");
createRoot(container).render(<Root/>);
