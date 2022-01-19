import React, { useState } from 'react'

type DashVideoComponentProps = {
    src: string,
    poster: string
}

function DashVideoComponent(props: DashVideoComponentProps) {
    const [isPlayerInitialized, setisPlayerInitialized] = useState(false)

    function onplay(e: React.SyntheticEvent<HTMLVideoElement, Event>) {
        import('dashjs').then(({ MediaPlayer }) => {
            const player = MediaPlayer().create();
            if (!isPlayerInitialized) {
                player.initialize(e.target as HTMLElement | undefined, props.src, true);
                setisPlayerInitialized(true)
            }
        })
    }

    return (
        <video poster={props.poster} width="100%" controls onPlay={(e) => onplay(e)}>

        </video>
    )
}

export default DashVideoComponent
