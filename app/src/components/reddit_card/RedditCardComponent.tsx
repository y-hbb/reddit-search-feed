import React, { Suspense } from 'react';
import { VIEW } from '../FeedComponent';
import RedditCardCompactComponent from './RedditCardCompactComponent';
import RedditCardCompactEmptyComponent from './RedditCardCompactEmptyComponent';
import RedditCardExpandedComponent from './RedditCardExpandedComponent';

type RedditCardComponentProps = {
    data: any,
    view: VIEW
}
function RedditCardComponent(props: RedditCardComponentProps) {
    const data = props.data

    const card = (() => {
        if (props.view === VIEW.COMPACT)
            return <RedditCardCompactComponent data={props.data} />
        else if (props.view === VIEW.EXPANDED1 || props.view === VIEW.EXPANDED2 || props.view === VIEW.EXPANDED3)
            return <RedditCardExpandedComponent data={props.data} />
        return <RedditCardCompactComponent data={props.data} />
    })()

    return <Suspense fallback={<RedditCardCompactEmptyComponent />}>{card}</Suspense>


}

export default RedditCardComponent
