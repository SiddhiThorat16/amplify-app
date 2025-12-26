// amplify-app/frontend/src/pages/PlaylistDetail.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';

const PlaylistDetail = () => {
  const { id } = useParams();
  const { loadTrack } = useAudio();

  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableTracks, setAvailableTracks] = useState([]);

  useEffect(() => {
    // Fetch playlist
    fetch(`http://localhost:5000/api/playlists/${id}`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Playlist not found');
        return res.json();
      })
      .then(data => setPlaylist(data))
      .catch(err => console.error('Error fetching playlist:', err));

    // Fetch available tracks to add
    fetch('http://localhost:5000/api/tracks')
      .then(res => res.json())
      .then(setAvailableTracks)
      .catch(err => console.error('Error fetching tracks:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const addTrack = async (trackId) => {
    try {
      await fetch(`http://localhost:5000/api/playlists/${id}/tracks`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackId })
      });
      
      // Refetch playlist
      const updatedRes = await fetch(`http://localhost:5000/api/playlists/${id}`, {
        credentials: 'include',
      });
      const updatedPlaylist = await updatedRes.json();
      setPlaylist(updatedPlaylist);
    } catch (err) {
      console.error('Error adding track:', err);
    }
  };

  const removeTrack = async (trackId) => {
    try {
      await fetch(`http://localhost:5000/api/playlists/${id}/tracks/${trackId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      // Refetch playlist
      const updatedRes = await fetch(`http://localhost:5000/api/playlists/${id}`, {
        credentials: 'include',
      });
      const updatedPlaylist = await updatedRes.json();
      setPlaylist(updatedPlaylist);
    } catch (err) {
      console.error('Error removing track:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8 pt-24 flex items-center justify-center">
        <div className="text-xl">Loading playlist...</div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8 pt-24 flex items-center justify-center">
        <div className="text-xl">Playlist not found.</div>
      </div>
    );
  }

  const tracks = playlist.tracks || [];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{playlist.name}</h1>
        <p className="text-slate-400 max-w-xl">
          {playlist.description || 'No description'}
        </p>
        <p className="text-xs text-slate-500 mt-2">
          {tracks.length} tracks
        </p>
      </div>

      {/* 🔥 ADD TRACKS SECTION */}
      <div className="mb-8 p-4 bg-slate-800 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Add tracks to playlist:</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {availableTracks.map(track => (
            <div key={track._id} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg hover:bg-slate-700">
              <div className="flex-1">
                <p className="font-medium truncate">{track.title}</p>
                <p className="text-xs text-slate-400 truncate">{track.artist}</p>
              </div>
              <button
                onClick={() => addTrack(track._id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium ml-4 whitespace-nowrap"
              >
                Add +
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 PLAYLIST TRACKS SECTION */}
      {tracks.length === 0 ? (
        <p className="text-slate-400">This playlist has no tracks yet.</p>
      ) : (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-4">Playlist tracks:</h3>
          {tracks.map(track => (
            <div key={track._id} className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-3 transition">
              <button
                onClick={() => loadTrack(track)}
                className="flex-1 text-left"
              >
                <p className="font-medium">{track.title}</p>
                <p className="text-xs text-slate-400">{track.artist}</p>
              </button>
              <div className="flex items-center gap-2 ml-4">
                <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">
                  {track.category}
                </span>
                <button
                  onClick={() => removeTrack(track._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium"
                  title="Remove from playlist"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistDetail;
