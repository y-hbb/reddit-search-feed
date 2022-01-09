import { CssBaseline } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { app, AppProvider } from './AppContext'
import SearchScreen from './screen/SearchScreen'


function App() {
  return (
    <AppProvider value={app}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<SearchScreen />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
