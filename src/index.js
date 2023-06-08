import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';

import configureStore from './redux';

import { AuthContextProvider } from './components/auth/context';
import Root from './Root';

const accessToken = storage.get('auth');
if (accessToken) {
  setAuthorizationHeader(accessToken);
}


const store = configureStore({ auth: !!accessToken });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root store={store}>
      <AuthContextProvider isInitiallyLogged={!!accessToken}>
          <App />
      </AuthContextProvider>
    </Root>
  </React.StrictMode>
);
