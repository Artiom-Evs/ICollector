import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import LocaleProvider from './providers/LocaleProvider.tsx';
import ThemeProvider from './providers/ThemeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <LocaleProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </LocaleProvider>
  </React.StrictMode>,
)
