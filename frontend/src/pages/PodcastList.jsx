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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 pt-24">
      <div className="relative mb-12">
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <h1 className="text-5xl font-bold relative z-10 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          🎙️ Podcasts
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {podcasts.map(podcast => (
          <Link
            key={podcast._id}
            to={`/podcasts/${podcast._id}`}
            className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Border */}
            <div className="absolute inset-0 border border-slate-700/50 group-hover:border-emerald-500/50 rounded-2xl transition-colors duration-300"></div>

            {/* Content */}
            <div className="relative p-6 h-full flex flex-col z-10">
              <div className="w-full h-40 bg-gradient-to-br from-emerald-500/30 to-blue-600/30 rounded-xl mb-4 flex items-center justify-center group-hover:from-emerald-500/50 group-hover:to-blue-600/50 transition-all duration-300 border border-emerald-500/20">
                <span className="text-5xl opacity-60 group-hover:opacity-100 transition-opacity group-hover:scale-110">
                  {podcast.title?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2 truncate group-hover:text-emerald-400 transition-colors">
                {podcast.title}
              </h3>
              <p className="text-slate-400 text-sm flex-1">{podcast.host}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Listen now</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PodcastList;
