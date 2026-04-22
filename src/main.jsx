import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// On a browser refresh, wipe router state (window.history.state) and any
// stored scroll positions BEFORE React Router initializes. Otherwise
// `location.state.scrollTo` from the last Back-button navigation survives
// the reload and makes Home scroll to that section instead of starting
// fresh at the top with the Hero animation.
if (typeof window !== 'undefined') {
  const navEntry = performance.getEntriesByType('navigation')[0];
  if (navEntry?.type === 'reload') {
    window.history.replaceState(null, '', window.location.href);
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const key = sessionStorage.key(i);
      if (key?.startsWith('scroll:')) sessionStorage.removeItem(key);
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);