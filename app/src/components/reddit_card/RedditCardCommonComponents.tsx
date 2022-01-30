import { Button, Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { lazy } from 'react';
import { A11y, Lazy, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppDispatch, useAppSelector } from '../../store/AppStore';
import { actions } from '../../store/RootReducer';

export const PostTitle = function (props: any) {
    const ReactMarkdown = lazy(() => import('react-markdown'))
    const dispatch = useAppDispatch()

    return <>
        <Chip label={'r/' + props.data?.subreddit} variant="outlined" size="small" onDelete={() => {
            dispatch(actions.addExclude({ data: props.data?.subreddit, type: 'subreddit' }))
        }} />
        <Button sx={{ textAlign: 'left' }} variant='text' onClick={() => { dispatch(actions.openPostSwiper({ isOpen: true, id: props.data?.id })) }} >
            <ReactMarkdown components={{
                p({ node, className, children, ...props }) {
                    return (<p className={className} style={{ margin: '0' }}>{children}</p>)
                }
            }} children={props.data?.title} />
        </Button>
    </>
}


export const PostSubHeader = function (props: any) {
    dayjs.extend(relativeTime)
    const dispatch = useAppDispatch()
    return <>
        <Typography variant='subtitle2'>{(() => {
            const result = [<>{dayjs.unix(props.data?.created).fromNow()}</>, <><Chip size="small" label={'u/' + props.data?.author} variant="outlined" onDelete={() => {
                dispatch(actions.addExclude({ data: props.data?.author, type: 'author' }))
            }} /></>]
            if (props.data?.over_18)
                result.push(<>{'NSFW'}</>)
            if (props.data?.spoiler)
                result.push(<>{'Spolier'}</>)
            if (props.data?.crosspost_parent)
                result.push(<>{'Crossposted'}</>)
            if (postType(props.data) && !props.data?.crosspost_parent)
                result.push(<>{postType(props.data)?.mediaType.toLowerCase()}</>)

            result.push(<>{props.data?.domain}</>)
            return result.map((s, i, a) => i != a.length - 1 ? <Box component="span" key={i}><Typography component="span" >{s}</Typography><Typography component="span"> | </Typography></Box> : <Typography key={i} component="span">{s}</Typography>)
        })()
        }</Typography>
    </>
}

enum MEDIA_TYPE {
    GIF = 'GIF',
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    LINK = 'LINK',
    GALLERY = 'GALLERY',
    TEXT = 'TEXT',
    RPAN = 'RPAN',
    EMBED = 'EMBED'
}
type PostType = {
    mediaType: MEDIA_TYPE,
    content: any
}

export function postType(data: any): PostType | undefined {
    if (data?.post_hint === "image") {
        if (data?.preview?.images[0]?.variants?.gif || data?.preview?.images[0]?.variants?.mp4) {
            return { mediaType: MEDIA_TYPE.GIF, content: data?.preview?.images[0]?.variants?.mp4 }
        } else {
            return { mediaType: MEDIA_TYPE.IMAGE, content: data?.preview?.images[0]?.resolutions }
        }
    }
    if (data?.post_hint === "hosted:video" || data?.post_hint === "video") {
        return { mediaType: MEDIA_TYPE.VIDEO, content: data?.secure_media?.reddit_video }
    }
    if (data?.post_hint === "rich:video") {
        if (data?.preview?.reddit_video_preview)
            return { mediaType: MEDIA_TYPE.VIDEO, content: data?.preview?.reddit_video_preview }
        else if (data?.secure_media_embed)
            return { mediaType: MEDIA_TYPE.EMBED, content: data?.secure_media_embed }
    }
    if (data?.selftext !== "" || data?.is_self) {
        return { mediaType: MEDIA_TYPE.TEXT, content: data?.selftext }
    }
    if (data?.post_hint === "link") {
        if (data?.preview?.reddit_video_preview)
            return { mediaType: MEDIA_TYPE.VIDEO, content: data?.preview?.reddit_video_preview }
        if (data?.preview?.images)
            return { mediaType: MEDIA_TYPE.IMAGE, content: data?.preview?.images }
        return { mediaType: MEDIA_TYPE.LINK, content: data?.url }
    }
    if (data?.is_gallery) {
        return { mediaType: MEDIA_TYPE.GALLERY, content: data?.preview?.images[0]?.variants?.mp4 }
    }
    if (data?.rpan_video) {
        return { mediaType: MEDIA_TYPE.RPAN, content: data?.rpan_video }
    }
}

export const LoadContent = function (props: any) {
    const mediaMaxQuality = useAppSelector((state) => state.mediaMaxQuality)
    const data = postType(props.data)

    const type = data?.mediaType
    const content = data?.content

    if (type === MEDIA_TYPE.TEXT) {
        const text = (new String(props.data?.selftext)).toString()
        if (text !== "") {
            const ReactMarkdown = lazy(() => import('react-markdown'))
            return <Box ><ReactMarkdown>{text}</ReactMarkdown></Box>
        } else {
            return <>Nothing to show</>
        }
    }
    if (type === MEDIA_TYPE.GIF) {
        let index = 1
        if (props.data?.preview.images[0].variants.mp4.resolutions.length >= mediaMaxQuality.gif) {
            index = mediaMaxQuality.gif
        } else {
            index = props.data?.preview.images[0].variants.mp4.resolutions.length
        }
        index--;
        return <>
            <video loop width="100%" controls src={props.data?.preview.images[0].variants.mp4.resolutions[index].url} >

            </video>
        </>
    }
    if (type === MEDIA_TYPE.IMAGE) {
        let index = 1
        if (props.data?.preview.images[0].resolutions.length >= mediaMaxQuality.image) {
            index = mediaMaxQuality.image
        } else {
            index = props.data?.preview.images[0].resolutions.length
        }
        index--;
        const img = props.data?.preview.images[0].resolutions[index]
        return <>
            <img loading='lazy' style={{ display: 'block', margin: 'auto' }}
                src={img.url} width="100%" />
        </>
    }
    if (type === MEDIA_TYPE.RPAN) {
        const HlsVideoComponent = lazy(() => import('../HlsVideoComponent'))
        return <>
            <HlsVideoComponent poster={content.scrubber_media_url} src={content.hls_url} />
        </>
    }
    if (type === MEDIA_TYPE.LINK) {
        return <>
            <a target="_blank" href={content}>{content}</a>
        </>
    }
    if (type === MEDIA_TYPE.VIDEO) {
        const DashVideoComponent = lazy(() => import('../DashVideoComponent'))
        let index = 1
        if (props.data?.preview.images[0].resolutions.length >= mediaMaxQuality.image) {
            index = mediaMaxQuality.image
        } else {
            index = props.data?.preview.images[0].resolutions.length
        }
        index--;
        return <>
            <DashVideoComponent poster={props.data?.preview?.images[0].resolutions[index].url} src={content.dash_url} />
        </>
    }
    if (type === MEDIA_TYPE.EMBED) {
        return <>
            <iframe width={content.width} height={content.height} src={content.media_domain_url} />
        </>
    }
    if (type === MEDIA_TYPE.GALLERY) {
        let slides: any;

        if (props.data?.gallery_data) {
            slides = (props.data?.gallery_data.items as any[]).map((v) => {
                let index = 1
                if (props.data?.media_metadata[v.media_id].p.length >= mediaMaxQuality.image) {
                    index = mediaMaxQuality.image
                } else {
                    index = props.data?.media_metadata[v.media_id].p.length
                }
                index--;
                const img = props.data?.media_metadata[v.media_id].p[index]

                return <SwiperSlide key={v.media_id}><img style={{ display: 'block', margin: 'auto' }}
                    src={img.u} width="100%" /></SwiperSlide>
            })
        }

        return <>
            <Swiper
                modules={[Navigation, A11y, Lazy]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                lazy
            >
                {slides}

            </Swiper>
        </>
    }
    return <>Nothing to show</>
}
