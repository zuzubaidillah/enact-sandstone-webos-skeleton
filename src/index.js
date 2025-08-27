import {createRoot} from 'react-dom/client';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import App from './App/App';
import {getSavedLocale} from './services/locale';


const AppRoot = ThemeDecorator(App);
const container = document.getElementById('root');
const initialLocale = getSavedLocale();


createRoot(container).render(<AppRoot locale={initialLocale} />);
