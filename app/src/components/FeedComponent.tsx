import { Container, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import RedditCardComponent from './RedditCardComponent'

type FeedComponentProps = {
    data: any[]
}


function FeedComponent(props: FeedComponentProps) {

    const list = props.data.map((s) => <RedditCardComponent key={s.data.id} data={s.data} />)

    return (
        <Grid container spacing={2} >
            {list}
        </Grid>
    )
}

export default FeedComponent
