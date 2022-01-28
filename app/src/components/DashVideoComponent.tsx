import React, { createRef, useEffect, useState } from 'react'

type DashVideoComponentProps = {
    src: string,
    poster: string
}

function DashVideoComponent(props: DashVideoComponentProps) {
    const [isPlayerInitialized, setisPlayerInitialized] = useState(false)

    const ref = createRef<any>();

    useEffect(() => {
        let player: any;
        import('dashjs').then(({ MediaPlayer }) => {
            player = MediaPlayer().create();
            if (!isPlayerInitialized) {
                player.initialize(ref.current as HTMLElement | undefined, props.src, false);
                setisPlayerInitialized(true)

            }
        })
        return () => {
            player.destroy()
        }
    }, []);


    return (
        <video ref={ref} poster={props.poster} width="100%" controls>

        </video>
    )
}

export default DashVideoComponent
