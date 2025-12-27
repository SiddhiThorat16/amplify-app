// amplify-app/frontend/src/pages/Home.jsx

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import bgImg from '../assets/background-img-home.jpg';

const Home = () => {
  const { user, logout } = useAuth();
  const [searchResults, setSearchResults] = useState([]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(2,6,23,0.7), rgba(99,102,241,0.12)), url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Animated Background Particles - FIXED */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full mix-blend-multiply blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply blur-3xl animate-bounce [animation-delay:2s]"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply blur-3xl animate-ping [animation-delay:4s]"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8 max-w-2xl mx-auto p-8 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl">
          <div className="inline-block p-4 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-2xl border border-emerald-500/30">
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
              Amplify 🎵
            </h1>
          </div>
          
          <div className="space-y-4">
            <p className="text-xl md:text-2xl text-slate-200 font-light leading-relaxed">
              Stream music & podcasts with a modern web player.
            </p>
            <p className="text-lg text-slate-400">
              Discover, play, and share your favorite tracks instantly.
            </p>
          </div>

          {user ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-500/10 to-purple-500/10 p-6 rounded-2xl border border-slate-700/50">
                <p className="text-2xl font-semibold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome back, {user.name}!
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <Link
                  to="/music"
                  className="group relative bg-emerald-500/20 hover:bg-emerald-500/30 border-2 border-emerald-500/40 backdrop-blur-sm p-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
                  <span className="relative z-10 flex flex-col items-center space-y-2">
                    <span className="text-2xl">🎵</span>
                    <span>My Music</span>
                  </span>
                </Link>
                
                <Link
                  to="/playlists"
                  className="group relative bg-blue-500/20 hover:bg-blue-500/30 border-2 border-blue-500/40 backdrop-blur-sm p-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
                  <span className="relative z-10 flex flex-col items-center space-y-2">
                    <span className="text-2xl">📱</span>
                    <span>Playlists</span>
                  </span>
                </Link>
                
                <Link
                  to="/podcasts"
                  className="group relative bg-orange-500/20 hover:bg-orange-500/30 border-2 border-orange-500/40 backdrop-blur-sm p-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
                  <span className="relative z-10 flex flex-col items-center space-y-2">
                    <span className="text-2xl">🎙️</span>
                    <span>Podcasts</span>
                  </span>
                </Link>
                
                <Link
                  to="/recently-played"
                  className="group relative bg-indigo-500/20 hover:bg-indigo-500/30 border-2 border-indigo-500/40 backdrop-blur-sm p-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25 md:col-span-2"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
                  <span className="relative z-10 flex flex-col items-center space-y-2">
                    <span className="text-2xl">⏰</span>
                    <span>Recently Played</span>
                  </span>
                </Link>
                
                <div className="md:col-span-2 flex gap-4 justify-center">
                  <Link
                    to="/admin/upload"
                    className="group relative bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border-2 border-purple-500/40 backdrop-blur-sm px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>⚙️</span>
                      <span>Admin</span>
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="group relative bg-gradient-to-r from-slate-700/80 to-slate-800/80 hover:from-slate-600/80 hover:to-slate-700/80 border-2 border-slate-600/50 backdrop-blur-sm px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-slate-500/25"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
                    <span className="relative z-10">🚪 Logout</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/login"
                className="group relative bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 border-2 border-emerald-500/40 backdrop-blur-sm px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>🔑</span>
                  <span>Login</span>
                </span>
              </Link>
              <Link
                to="/register"
                className="group relative bg-gradient-to-r from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 border-2 border-purple-500/40 backdrop-blur-sm px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>🚀</span>
                  <span>Get Started</span>
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Search Section */}
      <div className="relative z-10 px-8 pb-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-200 via-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl mb-6">
            Search Your Music
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Find your favorite tracks, artists, and podcasts instantly with lightning-fast search
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <SearchBar onResults={setSearchResults} />
        </div>
        
        {searchResults.length > 0 && (
          <div className="mt-12 max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-emerald-500/20 shadow-2xl">
              <p className="text-2xl font-bold text-emerald-400 mb-8 flex items-center justify-center space-x-3">
                <span>🎯</span>
                <span>Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((track) => (
                  <div key={track._id} className="group relative bg-gradient-to-b from-slate-800/70 to-slate-900/70 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <div className="relative z-10 space-y-3">
                      <h3 className="font-bold text-xl text-white line-clamp-2 group-hover:text-emerald-400 transition-colors">{track.title}</h3>
                      <p className="text-lg text-slate-300 font-medium">{track.artist}</p>
                      <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full ${
                        track.category === 'music' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      }`}>
                        {track.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
