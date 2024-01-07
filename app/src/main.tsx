import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootComponent from './components/RootComponent';
import ErrorPageComponent from './components/ErrorPageComponent';
import SearchScreen from './screen/SearchScreen';
import { Provider as ReduxProvider } from 'react-redux';
import store, { persistor } from './store/AppStore';
import { CssBaseline } from '@mui/material';

import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootComponent />,
    errorElement: <ErrorPageComponent />,
    children: [
      {
        path: '',
        element: <SearchScreen />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);
