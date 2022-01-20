import { Card, CardContent, CardHeader, Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { LoadContent, PostSubHeader, PostTitle } from './RedditCardCommonComponents';
import RedditCardCompactComponent from './RedditCardCompactComponent';

type RedditCardExpandedComponentProps = {
    data: any
}
function RedditCardExpandedComponent(props: RedditCardExpandedComponentProps) {
    dayjs.extend(relativeTime)

    const title = <PostTitle data={props.data} />
    const subheader = <PostSubHeader data={props.data} />



    return (
        <Grid xs={12} item>
            <Card sx={{ overflow: 'auto', maxHeight: 500 }}>

                <CardHeader title={title} subheader={subheader} />
                <CardContent>
                    {!props.data?.crosspost_parent &&
                        <LoadContent data={props.data} />
                    }

                    {props.data?.crosspost_parent &&
                        <Stack spacing={2}>
                            <RedditCardCompactComponent data={props.data?.crosspost_parent_list[0]} />
                            <Box>
                                <LoadContent data={props.data?.crosspost_parent_list[0]} />
                            </Box>
                        </Stack>

                    }

                </CardContent>
            </Card>
        </Grid >
    )
}

export default RedditCardExpandedComponent
