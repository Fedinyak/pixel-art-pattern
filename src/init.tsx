/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-named-as-default */
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18n from './locales/i18next';
import store from './slices/store';

const init = (): JSX.Element => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>
);

export default init;
