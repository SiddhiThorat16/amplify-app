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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md relative z-10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-700/50"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Login to Amplify
          </h1>
          <p className="text-slate-400 text-sm">Welcome back!</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm flex items-start gap-3">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-semibold block mb-2 text-slate-200">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold block mb-2 text-slate-200">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-white shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block animate-spin">⏳</span>
              Logging in...
            </span>
          ) : (
            'Login to Amplify'
          )}
        </button>

        {/* Register Link */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors" to="/register">
            Create one now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
