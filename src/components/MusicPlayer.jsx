import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import './MusicPlayer.css';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    // You will need to put an MP3 file named 'background-music.mp3' in your public folder!
    const [audio] = useState(new Audio('/background-music.mp3.mp3'));

    useEffect(() => {
        audio.loop = true;
        // Clean up audio on unmount
        return () => {
            audio.pause();
        };
    }, [audio]);

    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            // Browsers heavily restrict autoplay, so playing specifically on click is best practice.
            audio.play().catch(error => console.log("Audio play failed:", error));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className={`music-player-wrapper ${isPlaying ? 'playing' : ''}`}>
            {isPlaying && (
                <div className="music-bars">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            )}
            <button
                className="music-toggle-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause Music" : "Play Music"}
            >
                {isPlaying ? <Volume2 size={22} className="music-icon" /> : <Music size={22} className="music-icon" />}
            </button>
        </div>
    );
};

export default MusicPlayer;
