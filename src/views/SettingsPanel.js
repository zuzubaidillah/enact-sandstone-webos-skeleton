import {useState, useEffect} from 'react';
import $L from '@enact/i18n/$L';


function SettingsBase({onDone, updateLocale}){
	const [pointerMode, setPointerMode] = useState(
		typeof Spotlight.getPointerMode === 'function' ? Spotlight.getPointerMode() : false
	);
	const [language, setLanguage] = useState('en-US');


	useEffect(() => { Spotlight.setPointerMode(pointerMode); }, [pointerMode]);


	const applyLanguage = (code) => {
		setLanguage(code);
		if (typeof updateLocale === 'function') {
			updateLocale(code);
			saveLocale(code);
		}
	};


	return (
		<Column style={{gap: '24px'}}>
			<Cell>
				<Heading showLine>{$L('General')}</Heading>
				<SwitchItem
					selected={pointerMode}
					onToggle={() => setPointerMode(v => !v)}
				>
					{$L('Pointer Mode')}
				</SwitchItem>
			</Cell>


			<Cell>
				<Heading showLine>{$L('Language')}</Heading>
				<Picker
					value={language === 'en-US' ? 0 : 1}
					onChange={({value}) => applyLanguage(value === 0 ? 'en-US' : 'id-ID')}
					width="small"
				>
					{['English (US)', 'Bahasa Indonesia']}
				</Picker>
				<BodyText style={{marginTop: 8}}>
					{$L('This demo persists locale to localStorage and updates UI instantly.')}
				</BodyText>
			</Cell>


			<Cell>
				<Row style={{gap: 12}}>
					<Button onClick={onDone}>{$L('Done')}</Button>
				</Row>
			</Cell>
		</Column>
	);
}


export default I18nContextDecorator({updateLocaleProp: 'updateLocale'})(SettingsBase);
