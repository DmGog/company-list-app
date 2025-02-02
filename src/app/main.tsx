import { createRoot } from 'react-dom/client';
import '@/shared/styles/index.scss';
import App from '@/app/app';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
