import { Card, CardContent, CardHeader, Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import '@vime/core/themes/default.css';
import '@vime/core/themes/light.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import DashVideoComponent from '../DashVideoComponent';
import { LoadContent, PostSubHeader, PostTitle, postType } from './RedditCardCommonComponents';
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
            <Card sx={{ overflowY: 'auto', maxHeight: 500 }}>

                <CardHeader title={title} subheader={subheader} />
                <CardContent>
                    {/* {!props.data?.preview?.reddit_video_preview && (props.data?.post_hint === 'rich:video' || props.data?.post_hint === 'link') && !props.data?.crosspost_parent && props.data?.preview.images[0].variants && props.data?.preview.images[0].variants.mp4 &&
                        <video width="100%" controls src={props.data?.preview.images[0].variants.mp4.resolutions[0].url} >

                        </video>
                    }
                    {props.data?.preview?.reddit_video_preview &&
                        <>
                            <DashVideoComponent poster={props.data?.preview.images[0].resolutions[0].url} src={props.data?.preview.reddit_video_preview.dash_url} />
                        </>

                    }
                    {(props.data?.post_hint === "hosted:video" || props.data?.is_video) && props.data?.secure_media.reddit_video.fallback_url &&
                        <>
                            <DashVideoComponent poster={props.data?.preview.images[0].resolutions[0].url} src={props.data?.secure_media.reddit_video.dash_url} />
                        </>
                    }
                    {props.data?.is_gallery &&
                        'Todo : Gallery'
                    }
                    {props.data?.selftext && props.data?.selftext === '' &&
                        '/----/'
                    }
                    {!props.data?.preview?.reddit_video_preview && props.data?.post_hint === 'link' && !props.data?.secure_media_embed &&
                        <a href={props.data?.url}>{props.data?.url}</a>
                    }
                    {props.data?.crosspost_parent &&

                        <RedditCardExpandedComponent data={props.data?.crosspost_parent_list[0]} />

                    }
                    <hr />
                    <p>!!! LoadContent !!!</p> */}
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
