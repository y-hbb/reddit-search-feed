import React, { useState } from 'react'


type HlsVideoComponentProps = {
    src: string,
    poster: string
}

function HlsVideoComponent(props: HlsVideoComponentProps) {
    const [isPlayerInitialized, setisPlayerInitialized] = useState(false)
    function onplay(e: React.SyntheticEvent<HTMLVideoElement, Event>) {
        import('hls.js').then(({ default: Hls }) => {

            const player = new Hls({ lowLatencyMode: true, })
            if (!isPlayerInitialized) {
                if (Hls.isSupported()) {
                    player.loadSource(props.src);
                    player.attachMedia(e.target as HTMLMediaElement);
                    setisPlayerInitialized(true)
                }
            }
        })

    }
    return (
        <video poster={props.poster} width="100%" controls onPlay={(e) => onplay(e)}>

        </video>
    )
}

export default HlsVideoComponent
