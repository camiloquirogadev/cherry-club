import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'font-awesome/css/font-awesome.css';  // Importamos FontAwesome aquí
import './index.css';  // Importamos Tailwind después

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)