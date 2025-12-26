// amplify-app/frontend/src/App.jsx

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Music from "./pages/Music";
import AdminUpload from "./pages/AdminUpload";
import MiniPlayer from "./components/MiniPlayer";
import PodcastDetail from "./pages/PodcastDetail";
import PodcastList from "./pages/PodcastList";
import PlaylistList from "./pages/PlaylistList";
import PlaylistDetail from "./pages/PlaylistDetail";
import RecentlyPlayed from "./pages/RecentlyPlayed";

function App() {
  return (
    <>
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

      <MiniPlayer />
    </>
  );
}

export default App;
