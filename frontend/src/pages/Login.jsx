// amplify-app/frontend/src/pages/Login.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);                 // calls /api/auth/login
      navigate('/');                     // redirect after login (or /music)
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-800 p-6 rounded-xl shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Login to Amplify</h1>

        {error && (
          <p className="text-sm text-red-400 bg-red-950/40 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <div className="space-y-1">
          <label className="text-sm">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-xs text-center text-slate-400">
          Don&apos;t have an account?{' '}
          <Link className="text-emerald-400 hover:underline" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
