
import React from 'react';
import ReactDOM from 'react-dom/client';
import esriConfig from "@arcgis/core/config.js";
import * as intl from "@arcgis/core/intl.js";

// CRITICAL: Configure ArcGIS BEFORE any other imports
esriConfig.assetsPath = "https://js.arcgis.com/4.31/@arcgis/core/assets";
esriConfig.request.useIdentity = false;

// Remove explicit worker config to let ArcGIS resolve them naturally from assetsPath/CDN
// Shield against message bundle errors
intl.setLocale("en");

import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
