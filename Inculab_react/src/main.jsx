import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import router from './router';
import client from './api';
import { StoreProvider } from './context/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreProvider>
    <RouterProvider router={router} />
  </StoreProvider>
)