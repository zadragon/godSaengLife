import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/config/configstore';
import App from './App';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <HelmetProvider>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </HelmetProvider>
    </Provider>
);
