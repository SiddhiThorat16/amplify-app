// amplify-app/frontend/src/pages/Music.jsx

import { useState, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';

const Music = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loadTrack } = useAudio();

  useEffect(() => {
    fetch('http://localhost:5000/api/tracks')
      .then(res => res.json())
      .then(data => setTracks(data))
      .catch(error => console.error('Error fetching tracks:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8 pt-24 flex items-center justify-center">
        <div className="text-xl">Loading tracks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">Music Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map(track => (
          <div
            key={track._id}
            onClick={() => loadTrack(track)}
            className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 cursor-pointer transition-all group"
          >
            <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-2xl opacity-50">{track.category?.charAt(0).toUpperCase()}</span>
            </div>
            <h3 className="font-semibold text-lg mb-1 truncate">{track.title}</h3>
            <p className="text-slate-400 text-sm">{track.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;
