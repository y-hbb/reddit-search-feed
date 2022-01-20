import { Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { lazy } from 'react';
import { A11y, Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppDispatch } from '../../store/AppStore';
import { actions } from '../../store/RootReducer';

export const PostTitle = function (props: any) {
    const ReactMarkdown = lazy(() => import('react-markdown'))
    const dispatch = useAppDispatch()
    return <>
        <Chip label={'r/' + props.data?.subreddit} variant="outlined" size="small" onDelete={() => {
            dispatch(actions.addExclude({ id: nanoid(), data: props.data?.subreddit, type: 'subreddit' }))
        }} />

        <ReactMarkdown components={{
            p({ node, className, children, ...props }) {
                return (<p className={className} style={{ margin: '0' }}>{children}</p>)
            }
        }} children={props.data?.title} />
    </>
}


export const PostSubHeader = function (props: any) {
    dayjs.extend(relativeTime)
    const dispatch = useAppDispatch()
    return <>
        <Typography variant='subtitle2'>{(() => {
            const result = [<>{dayjs.unix(props.data?.created).fromNow()}</>, <><Chip size="small" label={'u/' + props.data?.author} variant="outlined" onDelete={() => {
                dispatch(actions.addExclude({ id: nanoid(), data: props.data?.author, type: 'author' }))
            }} /></>]
            if (props.data?.over_18)
                result.push(<>{'NSFW'}</>)
            if (props.data?.spoiler)
                result.push(<>{'Spolier'}</>)
            if (props.data?.crosspost_parent)
                result.push(<>{'Crossposted'}</>)
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
    if (data?.selftext !== "") {
        return { mediaType: MEDIA_TYPE.TEXT, content: data?.preview?.images[0]?.variants?.mp4 }
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
    const data = postType(props.data)

    const type = data?.mediaType
    const content = data?.content

    if (type === MEDIA_TYPE.TEXT) {
        const ReactMarkdown = lazy(() => import('react-markdown'))
        return <ReactMarkdown>{props.data?.selftext}</ReactMarkdown>
    }
    if (type === MEDIA_TYPE.GIF) {
        return <>
            <video loop width="100%" controls src={props.data?.preview.images[0].variants.mp4.resolutions[0].url} >

            </video>
        </>
    }
    if (type === MEDIA_TYPE.IMAGE) {
        return <>
            <img style={{ display: 'block', margin: 'auto' }}
                src={props.data?.preview.images[0].resolutions[0].url} width={props.data?.preview.images[0].resolutions[0].width} />
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
        return <>
            <DashVideoComponent poster={props.data?.preview?.images[0].resolutions[0].url} src={content.dash_url} />
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
                const img = props.data?.media_metadata[v.media_id].p[0]

                return <SwiperSlide key={v.media_id}><img style={{ display: 'block', margin: 'auto' }}
                    src={img.u} width={img.x} /></SwiperSlide>
            })
        }

        return <>
            <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
            >
                {slides}

            </Swiper>
        </>
    }
    return <>Nothing to show</>
}
