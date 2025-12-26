// amplify-app/frontend/src/components/MiniPlayer.jsx

import { useAudio } from '../context/AudioContext';

const MiniPlayer = () => {
  const { 
    currentTrack, 
    isPlaying, 
    progress, 
    duration, 
    togglePlay, 
    handleSeek 
  } = useAudio();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 p-3 shadow-2xl z-50">
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
            <span className="text-xs font-medium text-slate-400">
              {currentTrack.category?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">
              {currentTrack.title}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Seek Bar */}
        <div className="flex-1 max-w-md">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
          />
        </div>

        {/* Controls */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg transition-all hover:scale-105"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default MiniPlayer;
