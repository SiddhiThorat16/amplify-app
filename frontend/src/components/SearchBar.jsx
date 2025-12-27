// frontend/src/components/SearchBar.jsx

import { useState, useEffect, useCallback } from 'react';  // ✅ Import useEffect here
import { useDebounce } from '../hooks/useDebounce';
import { request } from '../services/api';

export const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const searchTracks = useCallback(async (q) => {
    if (q.length < 2) {
      onResults?.([]);
      return;
    }
    setLoading(true);
    try {
      const results = await request(`/api/tracks/search?q=${encodeURIComponent(q)}`);
      onResults?.(results);
    } catch (err) {
      onResults?.([]);
    } finally {
      setLoading(false);
    }
  }, [onResults]);

  // ✅ useEffect (not React.useEffect)
  useEffect(() => {
    searchTracks(debouncedQuery);
  }, [debouncedQuery, searchTracks]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        type="search"
        placeholder="Search music & podcasts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-6 py-3 bg-slate-800 border-2 border-slate-700 rounded-xl focus:border-emerald-500 focus:outline-none text-lg"
      />
      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400">🔍</div>
      )}
    </div>
  );
};
