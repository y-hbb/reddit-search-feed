import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SearchScreen from './screen/SearchScreen';
import store from './store/AppStore';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<SearchScreen />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
