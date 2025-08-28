import {useState, useCallback} from 'react';
import Spotlight from '@enact/spotlight';
import {Panels, Panel, Header} from '@enact/sandstone/Panels';
import MainPanel from '../views/MainPanel';
import SettingsPanel from '../views/SettingsPanel';
import VideoPanel from '../views/VideoPanel';


Spotlight.setPointerMode(false);


export default function App({onLocaleChange}){ // receive bridge from index
	const [index, setIndex] = useState(0);


	const goHome = useCallback(() => setIndex(0), []);
	const openSettings = useCallback(() => setIndex(1), []);
	const openVideo = useCallback(() => setIndex(2), []);


	return (
		<Panels index={index} onBack={goHome}>
			<Panel>
				<Header title="Enact Sandstone Skeleton" subtitle="webOS TV + LS2 + 5‑way" />
				<MainPanel onOpenSettings={openSettings} onOpenVideo={openVideo} />
			</Panel>


			<Panel>
				<Header title="Settings" />
				<SettingsPanel onDone={goHome} onLocaleChange={onLocaleChange} />
			</Panel>


			<Panel>
				<Header title="Video" />
				<VideoPanel onDone={goHome} />
			</Panel>
		</Panels>
	);
}
