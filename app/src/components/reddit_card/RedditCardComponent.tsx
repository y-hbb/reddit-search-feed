import React, { Suspense, useMemo } from 'react';
import { VIEW } from '../FeedComponent';
import RedditCardCompactComponent from './RedditCardCompactComponent';
import RedditCardCompactEmptyComponent from './RedditCardCompactEmptyComponent';
import RedditCardExpandedComponent from './RedditCardExpandedComponent';

type RedditCardComponentProps = {
    data: any,
    view: VIEW
}
function RedditCardComponent(props: RedditCardComponentProps) {
    const card = ({ data, view }: any) => {
        if (view === VIEW.COMPACT)
            return <RedditCardCompactComponent data={data} />
        else if (view === VIEW.EXPANDED1 || view === VIEW.EXPANDED2 || view === VIEW.EXPANDED3)
            return <RedditCardExpandedComponent data={data} />
        return <RedditCardCompactComponent data={data} />
    }

    return <Suspense fallback>{useMemo(() => card({ data: props.data, view: props.view }), [props.data, props.view])}</Suspense>


}

export default RedditCardComponent
