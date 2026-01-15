import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

function VideoPlayer({ streamUrl, onReady }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!streamUrl) return;

        const video = videoRef.current;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(streamUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (onReady) onReady();
            });

            return () => hls.destroy();
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = streamUrl;
        }
    }, [streamUrl, onReady]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '800px' }}>
            <video
                ref={videoRef}
                style={{
                    width: '100%',
                    height: 'auto',
                    backgroundColor: '#000'
                }}
                controls
                onClick={togglePlay}
            />
        </div>
    );
}

export default VideoPlayer;