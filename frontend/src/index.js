import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Use the container in your HTML to mount the React app
const container = document.getElementById('root');
// Create a root.
const root = createRoot(container);
// Initial render: Render the App component to the root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
