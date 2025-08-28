import {useState, useEffect, useCallback} from "react";
import Spotlight from "@enact/spotlight";
import Heading from "@enact/sandstone/Heading";
import BodyText from "@enact/sandstone/BodyText";
import Button from "@enact/sandstone/Button";
import SwitchItem from "@enact/sandstone/SwitchItem";
import Picker from "@enact/sandstone/Picker";
import {Row, Column, Cell} from "@enact/ui/Layout";
import {I18nContextDecorator} from "@enact/i18n/I18nDecorator";
import {saveLocale} from "../services/locale";
import $L from "@enact/i18n/$L";


function SettingsBase({onDone, updateLocale, onLocaleChange}) {
	const [pointerMode, setPointerMode] = useState(
		typeof Spotlight.getPointerMode === "function" ? Spotlight.getPointerMode() : false
	);
	const [language, setLanguage] = useState("en-US");


	useEffect(() => {
		Spotlight.setPointerMode(pointerMode);
	}, [pointerMode]);


	const handleTogglePointer = useCallback(() => {
		setPointerMode((v) => !v);
	}, []);


	const handleLanguageChange = useCallback(({value}) => {
		const code = value === 0 ? "en-US" : "id-ID";
		setLanguage(code);


// 1) Update Enact i18n context live
		if (typeof updateLocale === "function") updateLocale(code);


// 2) Persist to localStorage
		saveLocale(code);


// 3) Update ThemeDecorator's controlled prop via root
		if (typeof onLocaleChange === "function") onLocaleChange(code);
	}, [updateLocale, onLocaleChange]);


	const handleDone = useCallback(() => {
		if (typeof onDone === "function") onDone();
	}, [onDone]);


	return (
		<Column style={{gap: "24px"}}>
			<Cell>
				<Heading showLine>{$L("General")}</Heading>
				<SwitchItem selected={pointerMode} onToggle={handleTogglePointer}>
					{$L("Pointer Mode")}
				</SwitchItem>
			</Cell>


			<Cell>
				<Heading showLine>{$L("Language")}</Heading>
				<Picker value={language === "en-US" ? 0 : 1} onChange={handleLanguageChange} width="small">
					{["English (US)", "Bahasa Indonesia"]}
				</Picker>
				<BodyText style={{marginTop: 8}}>
					{$L("This demo persists locale to localStorage and updates UI instantly.")}
				</BodyText>
			</Cell>


			<Cell>
				<Row style={{gap: 12}}>
					<Button onClick={handleDone}>{$L("Done")}</Button>
				</Row>
			</Cell>
		</Column>
	);
}


export default I18nContextDecorator({updateLocaleProp: "updateLocale"})(SettingsBase);
