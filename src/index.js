import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const backend_url = "https://abrupt-weather-production.up.railway.app/api/v1/"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default backend_url
