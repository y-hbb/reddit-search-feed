import React, { useEffect, useState } from 'react'
import { MediaPlayer } from 'dashjs';

type DashVideoComponentProps = {
    src: string,
    poster: string
}

function DashVideoComponent(props: DashVideoComponentProps) {
    let player = MediaPlayer().create();

    const ref = React.createRef<HTMLVideoElement>()

    const [isPlayerInitialized, setisPlayerInitialized] = useState(false)

    return (
        <video poster={props.poster} width="100%" controls ref={ref} onPlay={() => { if (!isPlayerInitialized) { player.initialize(ref.current as HTMLElement | undefined, props.src, true); setisPlayerInitialized(true) } }}>

        </video>
    )
}

export default DashVideoComponent
