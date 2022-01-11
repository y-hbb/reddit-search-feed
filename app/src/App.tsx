import { CssBaseline } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AppProvider, defaultApp } from './AppContext'
import SearchScreen from './screen/SearchScreen'


function App() {
  return (
    <AppProvider value={{ ...defaultApp }}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<SearchScreen />} />
        </Routes>
      </BrowserRouter>
    </AppProvider >
  )
}

export default App
