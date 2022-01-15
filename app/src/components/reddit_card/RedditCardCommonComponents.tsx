import { Chip, Typography } from '@mui/material';
import { Box, margin } from '@mui/system';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import DashVideoComponent from '../DashVideoComponent';
import HlsVideoComponent from '../HlsVideoComponent';

export const PostTitle = function (props: any) {
    return <>
        <Chip label={'r/' + props.data?.subreddit} variant="outlined" size="small" onDelete={() => { }} />

        <ReactMarkdown components={{
            p({ node, className, children, ...props }) {
                return (<p className={className} style={{ margin: '0' }}>{children}</p>)
            }
        }} children={props.data?.title} />
    </>
}


export const PostSubHeader = function (props: any) {
    dayjs.extend(relativeTime)
    return <>
        <Typography variant='subtitle2'>{(() => {
            const result = [<>{dayjs.unix(props.data?.created).fromNow()}</>, <><Chip size="small" label={'u/' + props.data?.author} variant="outlined" onDelete={() => { }} /></>]
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
            <img
                src={props.data?.preview.images[0].resolutions[0].url} width={props.data?.preview.images[0].resolutions[0].width} />
        </>
    }
    if (type === MEDIA_TYPE.RPAN) {
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
        return <>
            <DashVideoComponent poster={props.data?.preview?.images[0].resolutions[0].url} src={content.dash_url} />
        </>
    }
    if (type === MEDIA_TYPE.EMBED) {
        return <>
            <iframe width={content.width} height={content.height} src={content.media_domain_url} />
        </>
    }
    return <>Nothing to show</>
}
