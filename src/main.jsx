import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const container = document.getElementById('root');

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Prerendered pages have server-rendered markup in #root already, so we
// hydrate; a bare dev-server load (no prerendered content) falls back to
// a plain client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, app, {
    onRecoverableError(err) {
      if (err?.message?.includes('418') || err?.message?.includes('Hydration')) {
        return;
      }
      console.warn(err);
    },
  });
} else {
  createRoot(container).render(app);
}
