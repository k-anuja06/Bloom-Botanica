import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './route/index';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { registerSW } from 'virtual:pwa-register'; // <-- Import the PWA service worker

// Render the React app
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>,
);

// Register service worker (PWA)
registerSW({
  onNeedRefresh() {
    console.log('New content available; please refresh.');
  },
  onOfflineReady() {
    console.log('App is ready to work offline.');
  }
});
