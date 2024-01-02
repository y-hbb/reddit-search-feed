import { CssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SearchScreen from './screen/SearchScreen';
import store from './store/AppStore';
import React from 'react';

function App(): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<SearchScreen />} />
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;
