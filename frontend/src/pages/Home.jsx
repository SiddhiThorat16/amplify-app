// amplify-app/frontend/src/pages/Home.jsx

import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto p-8">
        <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
          Amplify 🎵
        </h1>
        <p className="text-xl text-slate-300">
          Stream music & podcasts with a modern web player.
        </p>

        {user ? (
          <div className="space-y-3">
            <p className="text-lg">Welcome back, {user.name}!</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                to="/music"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-medium transition-all"
              >
                My Music
              </Link>
              <Link
                to="/playlists"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium transition-all"
              >
                Playlists
              </Link>
              <Link
                to="/podcasts"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-medium transition-all"
              >
                Podcasts
              </Link>
              <Link
                to="/recently-played"
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl font-medium transition-all"
              >
                Recently Played
              </Link>
              <Link
                to="/admin/upload"
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl font-medium transition-all"
              >
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-medium transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/login"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-medium transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl font-medium transition-all"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
