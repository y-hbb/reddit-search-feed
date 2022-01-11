import React, { useContext, useState } from 'react'
import { appContext } from '../AppContext'
import FeedComponent from '../components/FeedComponent'
import LayoutComponent from '../components/LayoutComponent'
import SearchComponent, { SearchOptions } from '../components/SearchComponent'

function SearchScreen() {
    const app = useContext(appContext)
    app.title = 'Search Reddit'
    const [data, setData] = useState([])
    async function onSearch(searchOptions: SearchOptions) {
        const result = await app.reddit.search(searchOptions)
        console.log(result.data.children)
        setData(result.data.children)
    }
    return (
        <>
            <LayoutComponent>
                <SearchComponent search={onSearch} />
                <FeedComponent data={data} />
            </LayoutComponent>
        </>
    )
}

export default SearchScreen
