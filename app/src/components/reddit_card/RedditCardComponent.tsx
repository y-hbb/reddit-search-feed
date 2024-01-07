import React, { useMemo } from 'react';
import { VIEW } from '../FeedComponent';
import RedditCardCompactComponent from './RedditCardCompactComponent';
import RedditCardExpandedComponent from './RedditCardExpandedComponent';

interface RedditCardComponentProps {
  data: any;
  view: VIEW;
}
function RedditCardComponent(props: RedditCardComponentProps): JSX.Element {
  const DynamicCard = ({ data, view }: any): JSX.Element => {
    if (view === VIEW.COMPACT)
      return <RedditCardCompactComponent data={data} />;
    else if (
      view === VIEW.EXPANDED1 ||
      view === VIEW.EXPANDED2 ||
      view === VIEW.EXPANDED3
    )
      return <RedditCardExpandedComponent data={data} />;
    return <RedditCardCompactComponent data={data} />;
  };

  return (
    <>
      {useMemo(
        () => DynamicCard({ data: props.data, view: props.view }),
        [props.data, props.view]
      )}
    </>
  );
}

export default RedditCardComponent;
