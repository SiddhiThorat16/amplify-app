// amplify-app/frontend/src/pages/PodcastList.jsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/podcasts')
      .then(res => res.json())
      .then(data => setPodcasts(data))
      .catch(err => console.error('Error fetching podcasts:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8 pt-24 flex items-center justify-center">
        <div className="text-xl">Loading podcasts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">Podcasts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.map(podcast => (
          <Link
            key={podcast._id}
            to={`/podcasts/${podcast._id}`}
            className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 cursor-pointer transition-all block group"
          >
            <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-2xl opacity-50">
                {podcast.title?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-1 truncate">
              {podcast.title}
            </h3>
            <p className="text-slate-400 text-sm">{podcast.host}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PodcastList;
