// amplify-app/frontend/src/App.jsx

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MiniPlayer from "./components/MiniPlayer";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Music = lazy(() => import("./pages/Music"));
const AdminUpload = lazy(() => import("./pages/AdminUpload"));
const PodcastList = lazy(() => import("./pages/PodcastList"));
const PodcastDetail = lazy(() => import("./pages/PodcastDetail"));
const PlaylistList = lazy(() => import("./pages/PlaylistList"));
const PlaylistDetail = lazy(() => import("./pages/PlaylistDetail"));
const RecentlyPlayed = lazy(() => import("./pages/RecentlyPlayed"));

function App() {
  return (
    <>
      <Suspense 
        fallback={
          <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="text-slate-400">Loading...</p>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/music"
            element={
              <ProtectedRoute>
                <Music />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/upload"
            element={
              <ProtectedRoute>
                <AdminUpload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/podcasts"
            element={
              <ProtectedRoute>
                <PodcastList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/podcasts/:id"
            element={
              <ProtectedRoute>
                <PodcastDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/playlists"
            element={
              <ProtectedRoute>
                <PlaylistList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/playlists/:id"
            element={
              <ProtectedRoute>
                <PlaylistDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recently-played"
            element={
              <ProtectedRoute>
                <RecentlyPlayed />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>

      <MiniPlayer />
    </>
  );
}

export default App;
