// amplify-app/frontend/src/context/AudioContext.jsx

import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  // Load track
  const loadTrack = useCallback((track) => {
    const audio = audioRef.current;
    audio.src = track.audioUrl;
    setCurrentTrack(track);
    setProgress(0);
    setDuration(0);
  }, []);

  // Play/Pause
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Seek
  const handleSeek = useCallback((e) => {
    const audio = audioRef.current;
    const newProgress = e.target.value;
    audio.currentTime = (newProgress / 100) * duration;
    setProgress(newProgress);
  }, [duration]);

  // Progress updates
  useEffect(() => {
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [duration]);

  // Play state sync
  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      progress,
      duration,
      loadTrack,
      togglePlay,
      handleSeek,
      nextTrack: () => {}, // Day 5
      prevTrack: () => {}  // Day 5
    }}>
      {children}
      <audio ref={audioRef} preload="metadata" />
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
