// amplify-app/frontend/src/pages/Music.jsx

import { useState, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';

const Music = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const { loadTrack } = useAudio();

  useEffect(() => {
    fetch('http://localhost:5000/api/tracks')
      .then(res => res.json())
      .then(data => setTracks(data))
      .catch(error => console.error('Error fetching tracks:', error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // fetch user's playlists for "add to playlist"
    fetch('http://localhost:5000/api/playlists', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setPlaylists(data))
      .catch(err => console.error('Error fetching playlists:', err));
  }, []);

  const filteredTracks =
    category === 'all'
      ? tracks
      : tracks.filter(track => track.category === category);

  const handleAddToPlaylist = async (e, trackId) => {
    e.stopPropagation();
    if (!selectedPlaylistId) return;

    try {
      await fetch(
        `http://localhost:5000/api/playlists/${selectedPlaylistId}/tracks`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ trackId }),
        },
      );
      // optional: toast or console log
      console.log('Track added to playlist');
    } catch (err) {
      console.error('Error adding track to playlist:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 pt-24 flex items-center justify-center">
        <div className="text-xl">Loading tracks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 pt-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-5xl font-bold mb-1 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">🎧 Music Library</h1>
          <p className="text-slate-400 text-sm">Explore curated tracks and add them to your playlists</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {['all', 'chill', 'house', 'lofi'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm capitalize border
                ${
                  category === cat
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                    : 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          {playlists.length > 0 && (
            <div className="relative">
              <select
                value={selectedPlaylistId}
                onChange={e => setSelectedPlaylistId(e.target.value)}
                className="bg-slate-800 border border-slate-600 text-sm px-4 py-2 rounded-lg shadow-sm"
              >
                <option value="">Select playlist</option>
                {playlists.map(pl => (
                  <option key={pl._id} value={pl._id}>
                    {pl.name}
                  </option>
                ))}
              </select>
              <div className="absolute -right-2 top-[-8px] text-xs text-slate-400">🎵</div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTracks.map((track, idx) => (
          <div
            key={track._id}
            onClick={() => loadTrack(track)}
            className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/50 p-6 rounded-2xl hover:from-slate-700/80 hover:to-slate-800/60 cursor-pointer transition-all group border border-slate-700/40 shadow-xl"
          >
            <div className="absolute -top-6 right-6 w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm font-semibold border border-emerald-500/20">
              {idx + 1}
            </div>

            <div className="w-full h-40 bg-gradient-to-br from-emerald-500/20 to-blue-600/20 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform border border-emerald-500/10">
              <span className="text-3xl opacity-70">
                {track.category?.charAt(0).toUpperCase()}
              </span>
            </div>

            <h3 className="font-semibold text-lg mb-1 truncate text-white group-hover:text-emerald-400 transition-colors">
              {track.title}
            </h3>
            <p className="text-slate-400 text-sm truncate">{track.artist}</p>

            {playlists.length > 0 && (
              <button
                onClick={e => handleAddToPlaylist(e, track._id)}
                className="mt-4 flex items-center gap-2 text-xs px-3 py-2 rounded-full bg-slate-900/60 border border-slate-700 hover:bg-slate-800 shadow-sm"
              >
                ➕ Add to selected playlist
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;
