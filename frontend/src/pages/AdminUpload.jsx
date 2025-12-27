// amplify-app/frontend/src/pages/AdminUpload.jsx

import { useState } from 'react';
import { request } from '../services/api';

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [category, setCategory] = useState('music');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title.trim() || !artist.trim()) {
      setMessage('Please select a file and fill title & artist.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('audio', file);
      formData.append('title', title);
      formData.append('artist', artist);
      formData.append('category', category);

      const created = await request('/api/admin/upload-audio', {
        method: 'POST',
        body: formData,
        isFormData: true, // make sure your request() doesn’t set JSON headers
      });

      setMessage(`Uploaded: ${created.title}`);
      setFile(null);
      setTitle('');
      setArtist('');
    } catch (err) {
      console.error('Upload error:', err);
      setMessage('Upload failed. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Background effects */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-700/50">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Admin Upload
            </h1>
            <p className="text-slate-300">
              Upload tracks and podcasts for Amplify.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div className="relative">
              <label className="block text-sm font-semibold mb-3 text-slate-200">Audio File</label>
              <div className="relative group">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border-2 border-dashed border-slate-600 group-hover:border-emerald-500/50 transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600"
                />
                <div className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-r from-emerald-500/0 to-blue-500/0 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </div>
              {file && <p className="text-xs text-emerald-400 mt-2">✓ {file.name}</p>}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-slate-200">Title</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                placeholder="Enter track title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Artist */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-slate-200">Artist</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                placeholder="Enter artist name"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-slate-200">Category</label>
              <select
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="music">🎵 Music</option>
                <option value="podcast">🎙️ Podcast</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-white shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block animate-spin">⏳</span>
                  Uploading...
                </span>
              ) : (
                '⬆️ Upload'
              )}
            </button>

            {/* Message */}
            {message && (
              <div className={`p-4 rounded-lg text-sm ${message.includes('failed') ? 'bg-red-500/20 text-red-300 border border-red-500/50' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;
