import { CssBaseline } from '@mui/material'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import FeedComponent from './components/FeedComponent'
import LayoutComponent from './components/LayoutComponent'
import SearchComponent, { SearchOptions } from './components/SearchComponent'
import RedditClient from './reddit/RedditClient'
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
