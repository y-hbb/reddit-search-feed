import React, { useState } from 'react';
import FeedComponent from '../components/FeedComponent';
import LayoutComponent from '../components/LayoutComponent';
import SearchComponent, { SearchOptions } from '../components/SearchComponent';
import { reddit } from '../reddit/RedditClient';
import { useAppDispatch, useAppSelector } from '../store/AppStore';
import { actions } from '../store/RootReducer';

function SearchScreen() {
  const after = useAppSelector((state) => state.feedData.after);
  const dispatch = useAppDispatch();
  const [searchOptions, setsearchOptions] = useState({} as SearchOptions);

  const [hasNextPage, setHasNextPage] = useState(false);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);

  async function onSearch(sop: SearchOptions) {
    setsearchOptions(sop);
    setIsNextPageLoading(true);
    const result = await reddit.search(sop);
    setIsNextPageLoading(false);

    if (result.data.after) {
      setHasNextPage(true);
      dispatch(actions.setAfter(result.data.after));
    } else {
      setHasNextPage(false);
      dispatch(actions.setAfter(result.data.after));
    }

    console.log(result);
    dispatch(actions.addFeedData(result.data.children));
  }
  async function loadMore() {
    setIsNextPageLoading(true);
    const result = await reddit.search({ ...searchOptions, after: after });
    setIsNextPageLoading(false);

    if (result.data.after) {
      setHasNextPage(true);
      dispatch(actions.setAfter(result.data.after));
    } else {
      setHasNextPage(false);
      dispatch(actions.setAfter(result.data.after));
    }

    console.log(result);
    dispatch(actions.updateFeedData(result.data.children));
  }
  return (
    <>
      <LayoutComponent>
        <SearchComponent search={onSearch} />
        <FeedComponent
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          loadNextPage={loadMore}
        />
      </LayoutComponent>
    </>
  );
}

export default SearchScreen;
