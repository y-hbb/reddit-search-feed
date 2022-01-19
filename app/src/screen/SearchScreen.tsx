import React, { useState } from 'react'
import { useImmer } from "use-immer"
import FeedComponent from '../components/FeedComponent'
import LayoutComponent from '../components/LayoutComponent'
import SearchComponent, { SearchOptions } from '../components/SearchComponent'
import { reddit } from '../reddit/RedditClient'
import { useAppDispatch, useAppSelector } from '../store/AppStore'
import { actions } from '../store/RootReducer'



function SearchScreen() {

    const searchData = useAppSelector((state) => state.searchData)
    const dispatch = useAppDispatch()
    const [data, setData] = useImmer([] as any[])
    const excludeItem = useAppSelector((state) => state.excludeItem)

    const [searchOptions, setsearchOptions] = useState({} as SearchOptions)

    const [hasNextPage, setHasNextPage] = useState(false)
    const [isNextPageLoading, setIsNextPageLoading] = useState(false)

    async function onSearch(sop: SearchOptions) {
        setsearchOptions(sop)
        setIsNextPageLoading(true)
        const result = await reddit.search(sop)
        setIsNextPageLoading(false)

        if (result.data.after) {
            setHasNextPage(true)
            dispatch(actions.setAfter(result.data.after))
        }

        console.log(result.data.children)
        setData(result.data.children)
    }
    async function loadMore() {
        setIsNextPageLoading(true)
        const result = await reddit.search({ ...searchOptions, after: searchData.after })
        setIsNextPageLoading(false)

        if (result.data.after) {
            setHasNextPage(true)
            dispatch(actions.setAfter(result.data.after))
        }
        console.log(result.data.children)
        setData(draft => {
            draft.push(...result.data.children)
            return draft
        })
    }
    /* useEffect(() => {
        setData((draft) => {
            return draft.filter((v) => {
                let has = false
                excludeItem.forEach((e) => {
                    if ('r/' + e.data === 'r/' + v.data.subreddit || 'u/' + e.data === 'u/' + v.data.author)
                        has = true
                })
                return !has
            })
        })
        return () => {

        }
    }, [excludeItem]) */
    return (
        <>
            <LayoutComponent>
                <SearchComponent search={onSearch} />
                <FeedComponent hasNextPage={hasNextPage} isNextPageLoading={isNextPageLoading} loadNextPage={loadMore} data={data} />
            </LayoutComponent>
        </>
    )
}

export default SearchScreen
