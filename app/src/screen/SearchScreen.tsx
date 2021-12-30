import React from 'react'
import FeedComponent from '../components/FeedComponent'
import LayoutComponent from '../components/LayoutComponent'
import SearchComponent, { SearchOptions } from '../components/SearchComponent'

function SearchScreen() {
    function onSearch(searchOptions: SearchOptions) {

    }
    return (
        <>
            <LayoutComponent>
                <SearchComponent search={onSearch} />
                <FeedComponent />
            </LayoutComponent>
        </>
    )
}

export default SearchScreen
