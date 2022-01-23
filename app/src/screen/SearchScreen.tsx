import React, { useEffect, useState } from 'react'
import { useImmer } from "use-immer"
import FeedComponent from '../components/FeedComponent'
import LayoutComponent from '../components/LayoutComponent'
import SearchComponent, { SearchOptions } from '../components/SearchComponent'
import { reddit } from '../reddit/RedditClient'
import { useAppDispatch, useAppSelector } from '../store/AppStore'
import { actions } from '../store/RootReducer'



function SearchScreen() {

    const feedData = useAppSelector((state) => state.feedData)
    const dispatch = useAppDispatch()
    const [data, setData] = useImmer([] as any[])
    const excludeItem = useAppSelector((state) => state.excludeItem)

    const [searchOptions, setsearchOptions] = useState({} as SearchOptions)

    const [hasNextPage, setHasNextPage] = useState(false)
    const [isNextPageLoading, setIsNextPageLoading] = useState(false)
    function filterData() {
        setData((draft) => {
            draft.forEach((v, i) => {
                let has = false
                v.customIndex = i;
                excludeItem.forEach((e) => {
                    if ('r/' + e.data === 'r/' + v.data.subreddit || 'u/' + e.data === 'u/' + v.data.author)
                        has = true
                })
                if (has) {
                    v.customExclude = true
                } else {
                    v.customExclude = false
                }
            })

            return draft
        })
    }
    async function onSearch(sop: SearchOptions) {
        setsearchOptions(sop)
        setIsNextPageLoading(true)
        const result = await reddit.search(sop)
        setIsNextPageLoading(false)

        if (result.data.after) {
            setHasNextPage(true)
            dispatch(actions.setAfter(result.data.after))
        } else {
            setHasNextPage(false)
            dispatch(actions.setAfter(result.data.after))
        }

        console.log(result)
        setData((draft) => {
            draft = result.data.children
            return draft
        })
        filterData()
    }
    async function loadMore() {
        setIsNextPageLoading(true)
        const result = await reddit.search({ ...searchOptions, after: feedData.after })
        setIsNextPageLoading(false)

        if (result.data.after) {
            setHasNextPage(true)
            dispatch(actions.setAfter(result.data.after))
        } else {
            setHasNextPage(false)
            dispatch(actions.setAfter(result.data.after))
        }

        console.log(result)
        setData(draft => {
            draft.push(...result.data.children)
            return draft
        })

        filterData()
    }
    useEffect(() => {
        filterData()
        return () => {

        }
    }, [excludeItem])
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


