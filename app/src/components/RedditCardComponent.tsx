import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, IconButtonProps, Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReactPlayer from 'react-player';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type RedditCardComponentProps = {
    data: any
}
function RedditCardComponent(props: RedditCardComponentProps) {
    dayjs.extend(relativeTime)

    const title = <>
        <Typography variant='subtitle2'>{props.data?.subreddit_name_prefixed}</Typography>
        <>{props.data?.title}</>
    </>
    const subheader = <>
        <Typography variant='subtitle2'>{(() => {
            const result = [dayjs.unix(props.data?.created).fromNow(), 'u/' + props.data?.author]
            if (props.data?.over_18)
                result.push('NSFW')
            return result.map((s, i, a) => i != a.length - 1 ? s + ' | ' : s)
        })()
        }</Typography>
    </>

    /* const gallery = props.data?.is_gallery ? (function () {
        const result: JSX.Element[] = []
        if (props.data?.media_metadata) {
            const map = props.data?.media_metadata as Map<string, any>

            map.forEach((v, k) => { result.push(<SwiperSlide key={k}><img src={v.p[1].u} /></SwiperSlide>) })
            return result
        }
        return
    })() : <></> */

    return (
        <Grid item>
            <Card sx={{ maxWidth: 400, maxHeight: 400, overflow: 'auto' }}>
                <CardHeader title={title} subheader={subheader} />
                {props.data?.post_hint === 'image' &&
                    <CardMedia component="img"
                        src={props.data?.preview.images[0].resolutions[1].url} />
                }
                {!props.data?.preview?.reddit_video_preview && props.data?.post_hint === 'rich:video' &&
                    <CardMedia component="iframe"
                        src={props.data?.secure_media_embed.media_domain_url} width={props.data?.secure_media_embed.width} height={props.data?.secure_media_embed.height} />
                }
                {props.data?.preview?.reddit_video_preview &&
                    <CardMedia component="div">
                        <ReactPlayer
                            url={[
                                { src: props.data?.preview.reddit_video_preview.dash_url, type: 'video/dash' },
                                { src: props.data?.preview.reddit_video_preview.fallback_url, type: 'video/mp4' }
                            ]}
                            config={
                                {
                                    file: {
                                        forceDASH: true
                                    }
                                }
                            }
                            width='100%'
                            height='100%'
                            controls
                            light={props.data?.preview.images[0].resolutions[1].url}

                        />
                    </CardMedia>
                }
                {props.data?.is_video &&
                    <CardMedia component="div">
                        <ReactPlayer
                            url={[
                                { src: props.data?.secure_media.reddit_video.dash_url, type: 'video/dash' },
                                { src: props.data?.secure_media.reddit_video.fallback_url, type: 'video/mp4' }
                            ]}
                            config={
                                {
                                    file: {
                                        forceDASH: true
                                    }
                                }
                            }
                            width='100%'
                            height='100%'
                            controls

                            light={props.data?.preview.images[0].resolutions[1].url}

                        />
                    </CardMedia>
                }
                <CardContent>
                    {/* {props.data?.is_gallery &&
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            test
                            {gallery}
                        </Swiper>
                    } */}
                    {props.data?.is_gallery &&
                        'Todo : Gallery'
                    }
                    {props.data?.selftext && props.data?.selftext !== '' &&
                        <ReactMarkdown>{props.data?.selftext}</ReactMarkdown>
                    }
                    {props.data?.selftext && props.data?.selftext === '' &&
                        '/----/'
                    }
                    {!props.data?.preview?.reddit_video_preview && props.data?.post_hint === 'link' &&
                        <a href={props.data?.url}>{props.data?.url}</a>
                    }


                </CardContent>
            </Card>
        </Grid >
    )
}

export default RedditCardComponent
