// amplify-app/frontend/src/pages/PlaylistList.jsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../services/api';
import bgPlaylist from '../assets/background-img-playlist.jpg';

const PlaylistList = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Use shared request helper which attaches Authorization header from localStorage
    request('/api/playlists')
      .then(data => setPlaylists(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching playlists:', err);
        setPlaylists([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async e => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const newPlaylist = await request('/api/playlists', {
        method: 'POST',
        body: JSON.stringify({ name, description }),
      });
      setPlaylists(prev => [newPlaylist, ...prev]);
      setName('');
      setDescription('');
    } catch (err) {
      console.error('Error creating playlist:', err);
    }
  };

  // 🔥 REFRESH playlists button (manual refresh after returning from detail)
  const refreshPlaylists = () => {
    request('/api/playlists')
      .then(data => setPlaylists(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error refreshing playlists:', err));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8 pt-24 flex items-center justify-center">
        <div className="text-xl">Loading playlists...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white p-8 pt-24"
      style={{
        backgroundImage: `linear-gradient(rgba(2,6,23,0.55), rgba(30,41,59,0.1)), url(${bgPlaylist})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">Your Playlists</h1>
        <button
          onClick={refreshPlaylists}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
        >
          🔄 Refresh
        </button>
      </div>

      <form
        onSubmit={handleCreate}
        className="bg-slate-800 rounded-xl p-4 mb-8 flex flex-col gap-3 max-w-md"
      >
        <input
          type="text"
          placeholder="New playlist name"
          className="px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-emerald-500"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          className="px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-emerald-500 text-sm"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="self-start px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm font-medium"
        >
          Create playlist
        </button>
      </form>

      {playlists.length === 0 ? (
        <p className="text-slate-40">No playlists yet. Create your first one above.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map(pl => (
            <Link
              key={pl._id}
              to={`/playlists/${pl._id}`}  // ← FIXED: No state with function
              className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 cursor-pointer transition-all block group"
            >
              <h3 className="font-semibold text-lg mb-1 truncate">{pl.name}</h3>
              <p className="text-slate-400 text-sm line-clamp-2">
                {pl.description || 'No description'}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                {pl.tracks?.length || 0} tracks
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistList;
