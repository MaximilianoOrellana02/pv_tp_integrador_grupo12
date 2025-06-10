// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App.jsx';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Importamos el Provider de react-redux
import store from './redux/store'; // Importamos tu store de Redux

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Aquí envolvemos App con el Provider y le pasamos el store */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);