import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for createRoot
import './index.css'; // Optional, if you have styling
import App from './App';

// Create root instead of using ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
