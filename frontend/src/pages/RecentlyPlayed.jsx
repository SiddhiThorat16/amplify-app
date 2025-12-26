// amplify-app/frontend/src/pages/RecentlyPlayed.jsx

import { useEffect, useState } from 'react';
import { request } from '../services/api';
import { useAudio } from '../context/AudioContext';

const RecentlyPlayed = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loadTrackWithResume } = useAudio();

  useEffect(() => {
    request('/api/listening-history')
      .then(data => setHistory(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error loading history:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">Recently Played</h1>

      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : history.length === 0 ? (
        <p className="text-slate-400">You haven&apos;t listened to anything yet.</p>
      ) : (
        <div className="space-y-4 max-w-4xl">
          {history.map(item => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 bg-slate-800 rounded-xl hover:bg-slate-700"
            >
              <div className="flex-1 min-w-0 mr-4">
                <p className="font-semibold truncate">{item.track.title}</p>
                <p className="text-xs text-slate-400 truncate">
                  {item.track.artist}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Last at {Math.floor(item.lastPosition / 60)}:
                  {(item.lastPosition % 60).toString().padStart(2, '0')}
                </p>
              </div>
              <button
                onClick={() => loadTrackWithResume(item.track)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-sm font-medium"
              >
                Resume ▶
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyPlayed;
