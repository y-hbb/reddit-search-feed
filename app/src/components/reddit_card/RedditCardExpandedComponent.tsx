import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { LoadContent, PostSubHeader, PostTitle } from './RedditCardCommonComponents';
import RedditCardCompactComponent from './RedditCardCompactComponent';

type RedditCardExpandedComponentProps = {
    data: any,
    maxHeight?: number | string,
    maxWidth?: number | string,
}
function RedditCardExpandedComponent(props: RedditCardExpandedComponentProps) {
    dayjs.extend(relativeTime)

    const title = <PostTitle data={props.data} />
    const subheader = <PostSubHeader data={props.data} />

    return (
        <Card sx={{ overflow: 'auto', maxHeight: props.maxHeight || 500, maxWidth: props.maxWidth, margin: 'auto' }}>

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
    )
}

export default RedditCardExpandedComponent
