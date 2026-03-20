import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import './MusicPlayer.css';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    // Audio is instantiated via useRef on click to prevent 30MB preload blocking Core Web Vitals
    const audioRef = useRef(null);

    useEffect(() => {
        // Clean up audio on unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/background-music.mp3.mp3');
            audioRef.current.loop = true;
        }

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            // Browsers heavily restrict autoplay, so playing specifically on click is best practice.
            audioRef.current.play().catch(error => console.log("Audio play failed:", error));
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
