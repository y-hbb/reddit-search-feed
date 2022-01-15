import Hls from 'hls.js'
import React, { useEffect, useState } from 'react'


type HlsVideoComponentProps = {
    src: string,
    poster: string
}

function HlsVideoComponent(props: HlsVideoComponentProps) {

    const player = new Hls({ lowLatencyMode: true, })

    const ref = React.createRef<HTMLVideoElement>()

    const [isPlayerInitialized, setisPlayerInitialized] = useState(false)

    return (
        <video poster={props.poster} width="100%" controls ref={ref} onPlay={() => {
            if (!isPlayerInitialized) {
                if (Hls.isSupported()) {
                    player.loadSource(props.src); player.attachMedia(ref.current as HTMLMediaElement); setisPlayerInitialized(true)
                }
            }

        }}>
            {!Hls.isSupported() && <>Hls not supported</>}

        </video>
    )
}

export default HlsVideoComponent
