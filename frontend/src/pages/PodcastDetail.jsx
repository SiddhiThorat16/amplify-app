// amplify-app/frontend/src/pages/PodcastDetail.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';

const PodcastDetail = () => {
  const { id } = useParams();
  const { loadTrack } = useAudio();

  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/podcasts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPodcast(data.podcast);
        setEpisodes(data.episodes || []);
      })
      .catch(err => console.error('Error fetching podcast detail:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8 pt-24 flex items-center justify-center">
        <div className="text-xl">Loading podcast...</div>
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8 pt-24 flex items-center justify-center">
        <div className="text-xl">Podcast not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{podcast.title}</h1>
        <p className="text-slate-400 mb-1">Hosted by {podcast.host}</p>
        <p className="text-slate-500 max-w-2xl">{podcast.description}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
      <div className="space-y-3">
        {episodes.map(ep => (
          <button
            key={ep._id}
            onClick={() =>
              loadTrack({
                _id: ep._id,
                title: ep.title,
                artist: podcast.host,
                category: 'podcast',
                audioUrl: ep.audioUrl,
                duration: ep.duration,
              })
            }
            className="w-full text-left bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-3 flex items-center justify-between transition"
          >
            <div>
              <p className="font-medium">{ep.title}</p>
              <p className="text-xs text-slate-400">
                Episode {ep.episodeNumber ?? ''}{' '}
                {ep.publishedAt &&
                  ` • ${new Date(ep.publishedAt).toLocaleDateString()}`}
              </p>
            </div>
            <span className="text-sm text-slate-400">
              {ep.duration ? Math.round(ep.duration / 60) + ' min' : ''}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PodcastDetail;
