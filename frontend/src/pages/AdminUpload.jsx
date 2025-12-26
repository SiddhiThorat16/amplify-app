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
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="w-full max-w-xl bg-slate-800 p-6 rounded-xl shadow-lg space-y-4">
        <h1 className="text-2xl font-semibold">Admin Upload</h1>
        <p className="text-slate-300 text-sm">
          Upload tracks and podcasts for Amplify.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Audio file</label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-emerald-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Artist</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-emerald-500"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:outline-none focus:border-emerald-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="music">Music</option>
              <option value="podcast">Podcast</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 rounded-lg font-medium"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>

          {message && (
            <p className="text-sm text-slate-300 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminUpload;
