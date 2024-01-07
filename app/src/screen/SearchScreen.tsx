import React, { useState } from 'react';
import FeedComponent from '../components/FeedComponent';
import SearchComponent, {
  emptySearchOptions,
  type SearchOptions,
} from '../components/SearchComponent';
import { reddit } from '../reddit/RedditClient';
import { useAppDispatch, useAppSelector } from '../store/AppStore';
import { actions } from '../store/RootReducer';

function SearchScreen(): JSX.Element {
  const after = useAppSelector((state) => state.feedData.after);
  const dispatch = useAppDispatch();
  const [searchOptions, setSearchOptions] = useState(emptySearchOptions);

  const [hasNextPage, setHasNextPage] = useState(false);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);

  function onSearch(sop: SearchOptions): void {
    setSearchOptions(sop);
    setIsNextPageLoading(true);
    reddit
      .search(sop)
      .then((result) => {
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
      })
      .catch(() => {});
  }
  function loadMore(): void {
    setIsNextPageLoading(true);
    reddit
      .search({ ...searchOptions, after })
      .then((result) => {
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
      })
      .catch(() => {});
  }
  return (
    <>
      <SearchComponent search={onSearch} />
      <FeedComponent
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        loadNextPage={loadMore}
      />
    </>
  );
}

export default SearchScreen;
