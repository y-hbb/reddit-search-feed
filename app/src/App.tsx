import { CssBaseline } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SearchScreen from './screen/SearchScreen'


function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<SearchScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
