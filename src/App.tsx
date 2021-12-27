import { CssBaseline } from '@mui/material'
import { useEffect } from 'react'
import './App.css'
import FeedComponent from './components/FeedComponent'
import LayoutComponent from './components/LayoutComponent'
import SearchComponent, { SearchOptions } from './components/SearchComponent'
import RedditClient from './reddit/RedditClient'


function App() {
  const r = new RedditClient();
  useEffect(() => {

    return () => {

    }
  }, [])
  function onSearch(searchOptions: SearchOptions) {

  }
  return (
    <>
      <CssBaseline />
      <LayoutComponent>
        <SearchComponent search={onSearch} />
        <FeedComponent />
      </LayoutComponent>
    </>
  )
}

export default App
