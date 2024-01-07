import { useAppSelector } from '../store/AppStore';

export const useFilterPosts = function (): any[] {
  const excludeItem = useAppSelector((state) => state.root.excludeItem);

  let data = useAppSelector((state) => state.feedData.feedData);

  data = data.filter((v) => {
    let has = false;
    excludeItem.forEach((e) => {
      if (
        'r/' + e.data === 'r/' + v.data.subreddit ||
        'u/' + e.data === 'u/' + v.data.author
      )
        has = true;
    });
    return !has;
  });

  return data;
};
