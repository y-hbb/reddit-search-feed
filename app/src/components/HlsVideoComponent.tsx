import React, { createRef, useEffect, useState } from 'react';

type HlsVideoComponentProps = {
  src: string;
  poster: string;
};

function HlsVideoComponent(props: HlsVideoComponentProps) {
  const [isPlayerInitialized, setisPlayerInitialized] = useState(false);

  const ref = createRef<HTMLVideoElement>();

  useEffect(() => {
    let player: any;
    import('hls.js').then(({ default: Hls }) => {
      player = new Hls({ autoStartLoad: false });
      if (!isPlayerInitialized) {
        if (Hls.isSupported()) {
          player.loadSource(props.src);
          player.attachMedia(ref.current as HTMLMediaElement);
          setisPlayerInitialized(true);
        }
      }
    });

    ref.current?.addEventListener('play', () => {
      if (player) {
        player.startLoad();
      }
    });
    ref.current?.addEventListener('pause', () => {
      if (player) {
        player.stopLoad();
      }
    });

    return () => {
      player.destroy();
    };
  }, []);

  return <video ref={ref} poster={props.poster} width="100%" controls></video>;
}

export default HlsVideoComponent;
