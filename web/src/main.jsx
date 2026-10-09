// Entry. Owner: architect.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nProvider } from './i18n/index.jsx';
import { AuthProvider } from './lib/auth.jsx';
import { ToastProvider } from './components/ui/Toast.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <ToastProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ToastProvider>
      </I18nProvider>
    </BrowserRouter>
  </React.StrictMode>
);
