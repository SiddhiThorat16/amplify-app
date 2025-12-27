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
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 p-4 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/30 to-blue-600/30 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-500/20 shadow-lg">
            <span className="text-lg font-bold text-emerald-400">
              {currentTrack.category?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate hover:text-emerald-400 transition-colors">
              {currentTrack.title}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Seek Bar */}
        <div className="flex-1 max-w-lg px-4">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all shadow-lg"
            style={{
              background: `linear-gradient(to right, rgb(16 185 129) 0%, rgb(16 185 129) ${progress}%, rgb(51 65 85 / 0.5) ${progress}%, rgb(51 65 85 / 0.5) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>{Math.floor((progress / 100) * duration / 60)}:{((progress / 100) * duration % 60).toFixed(0).padStart(2, '0')}</span>
            <span>{Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={togglePlay}
          className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-full flex items-center justify-center text-white font-bold shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-110 flex-shrink-0 border border-emerald-400/30"
        >
          {isPlaying ? (
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default MiniPlayer;
